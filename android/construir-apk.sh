#!/bin/sh
# Construye Bitacora-Flota.apk sin Android Studio.
# Requiere: Java (JDK 17+), python3, curl, unzip, npm (solo para bajar aapt2 y la librería de Excel).
set -eu
cd "$(dirname "$0")"
H=.herramientas            # se descargan una vez
B=.construccion            # archivos temporales
SALIDA=Bitacora-Flota.apk
CLAVE="${FIRMA_CLAVE:-bitacora-flota}"
mkdir -p "$H"
rm -rf "$B"; mkdir -p "$B/clases" "$B/res/mipmap-xxxhdpi" "$B/assets/www"

baja() { [ -s "$H/$1" ] || { echo "Descargando $1..."; curl -fsSL -o "$H/$1" "$2"; }; }
baja android-all.jar https://repo.maven.apache.org/maven2/org/robolectric/android-all/14-robolectric-10818077/android-all-14-robolectric-10818077.jar
baja dx.jar https://repo.maven.apache.org/maven2/com/jakewharton/android/repackaged/dalvik-dx/16.0.1/dalvik-dx-16.0.1.jar
baja apksig.jar https://repo.maven.apache.org/maven2/com/android/tools/build/apksig/2.3.0/apksig-2.3.0.jar
if [ ! -x "$H/aapt2" ]; then
  echo "Descargando aapt2..."
  (cd "$H" && npm pack aaptjs3@2.0.2 --silent >/dev/null && tar xzf aaptjs3-2.0.2.tgz package/bin/x64/linux/aapt2 && mv package/bin/x64/linux/aapt2 . && rm -rf package aaptjs3-2.0.2.tgz && chmod +x aapt2)
fi
if [ ! -s "$H/xlsx.full.min.js" ]; then
  (cd "$H" && npm pack xlsx@0.18.5 --silent >/dev/null && tar xzf xlsx-0.18.5.tgz package/dist/xlsx.full.min.js && mv package/dist/xlsx.full.min.js . && rm -rf package xlsx-0.18.5.tgz)
fi

# 1. Página: la misma index.html, con la librería de Excel incluida para que funcione sin internet
# SERVIDOR y CODIGO (opcionales) dejan el APK conectado de fábrica: los choferes solo lo instalan.
#   SERVIDOR=https://mi-flota.ngrok-free.dev/ CODIGO=ABC123 ./construir-apk.sh
sed -e 's#https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js#xlsx.full.min.js#' \
    -e "s#const SERVIDOR_FIJO = \"\", CODIGO_FIJO = \"\";#const SERVIDOR_FIJO = \"${SERVIDOR:-}\", CODIGO_FIJO = \"${CODIGO:-}\";#" \
    ../index.html > "$B/assets/www/index.html"
cp "$H/xlsx.full.min.js" ../icon.svg "$B/assets/www/"
cp ../icon-192.png "$B/res/mipmap-xxxhdpi/ic_launcher.png"
cp -r res/values "$B/res/"

# 2. Recursos y manifiesto
"$H/aapt2" compile --dir "$B/res" -o "$B/res.zip"
"$H/aapt2" link -o "$B/base.apk" -I "$H/android-all.jar" --manifest AndroidManifest.xml -A "$B/assets" \
  --min-sdk-version 24 --target-sdk-version 34 --version-code "${VERSION_CODE:-5}" --version-name "${VERSION_NAME:-1.4}" "$B/res.zip"

# 3. Código Java -> dex
javac -nowarn -Xlint:-options --release 8 -cp "$H/android-all.jar" -d "$B/clases" src/cl/bitacoraflota/MainActivity.java
java -cp "$H/dx.jar" com.android.dx.command.Main --dex --min-sdk-version=24 --output="$B/classes.dex" "$B/clases"
(cd "$B" && cp base.apk con-dex.apk && zip -q -j con-dex.apk classes.dex)
python3 herramientas/alinear.py "$B/con-dex.apk" "$B/sin-firma.apk"

# 4. Firma
if [ ! -s firma-bitacora.p12 ]; then
  keytool -genkeypair -keystore firma-bitacora.p12 -storetype PKCS12 -storepass "$CLAVE" -alias bitacora \
    -keyalg RSA -keysize 2048 -validity 10000 -dname "CN=Bitacora de Flota, C=CL" >/dev/null 2>&1
fi
javac -nowarn -cp "$H/apksig.jar" -d "$B" herramientas/Firmar.java
rm -f "$SALIDA"
java --add-exports java.base/sun.security.x509=ALL-UNNAMED --add-exports java.base/sun.security.util=ALL-UNNAMED -cp "$B:$H/apksig.jar" Firmar "$B/sin-firma.apk" "$SALIDA" firma-bitacora.p12 "$CLAVE" bitacora
echo "Listo: $(pwd)/$SALIDA"
