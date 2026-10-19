# Bitácora de Flota

App móvil para auditar las camionetas frigoríficas de la flota (Mitsubishi Fuso Canter 413, Kia Frontier 2,5, Hyundai Porter).

**Para los choferes es una sola pantalla:** eligen el camión (por N° o patente) y completan 4 datos:
1. Odómetro (km)
2. Próxima mantención (km), que viene precargada con la última informada
3. Responsable de la auditoría (el celular lo recuerda)
4. ¿Necesita deshielo? Sí / No
5. ¿Tiene fallas? Si dice Sí, elige qué falla (equipo de frío, motor, frenos, neumáticos, luces, etc.), la describe y responde si la camioneta puede seguir trabajando. Puede reportar varias fallas.

Toca **Enviar auditoría** y llega a la **planilla de Google Drive**. Cada falla queda además en la hoja *Fallas*, en estado Pendiente, para seguirla hasta que se repare. Si la camioneta no puede seguir trabajando, queda marcada como *Detenida*.

**El administrador** (con PIN) ve además el panel completo, con avisos de deshielo pendiente y de mantención a 1.000 km o atrasada, y puede registrar:
- **Mantenciones preventivas** (servicio, repuestos, próximo km y próxima fecha).
- **Mantenciones correctivas** (sistema, causa, repuestos, horas de taller, taller, costo).
- **Fallas** (sistema, severidad, camión detenido, estado Pendiente / En proceso / Cerrado).
- **Cambios de aceite** (tipo, litros, filtros, próximo cambio calculado con el intervalo de cada camión).
- **Lecturas de odómetro y horómetro**, desde la ficha del camión con un solo botón.

Cada camión tiene su **ficha**: patente, N° interno, tipo, marca, modelo, año, color, VIN / N° chasis, N° motor, odómetro, horómetro, intervalo de aceite, estanque, medida de neumáticos, conductor, faena y vencimientos de revisión técnica, permiso de circulación, SOAP y extintor (con aviso 30 días antes).

La flota de la empresa (N° 1 al 17 y 815) viene cargada desde el inicio. **Solo el administrador** puede agregar, editar o borrar camiones; los choferes solo ven la pantalla de auditoría.

La pantalla de inicio del administrador avisa qué requiere atención: deshielo pendiente (con botón *Hecho*), mantención próxima o atrasada, aceite por vencer, fallas abiertas, camiones detenidos y camiones sin auditoría en 30 días.

## Planilla en Google Drive (recomendado)

Los celulares envían las auditorías directo a una planilla de Google Sheets en tu Drive. Es gratis, no necesita un computador encendido ni pagar dominios, y funciona desde cualquier lugar con internet.

**Instalar (una vez, unos 10 minutos):**
1. En https://sheets.google.com crea una **planilla en blanco** y ponle un nombre, por ejemplo *Bitácora de Flota*.
2. Menú **Extensiones → Apps Script**. Borra el texto que aparece, pega todo el contenido de [`google/Codigo.gs`](google/Codigo.gs) y guarda (ícono de disquete).
3. Botón **Implementar → Nueva implementación**. En el engranaje elige **Aplicación web**:
   - *Ejecutar como:* **Yo**
   - *Quién tiene acceso:* **Cualquier usuario**

   Toca **Implementar** y autoriza con tu cuenta. Google mostrará "Google no verificó esta app": toca *Configuración avanzada → Ir a … (no seguro)*. Es tu propio script.
4. Vuelve a la planilla y **recárgala**. Aparece el menú **Bitácora**: toca **Bitácora → Instalar o actualizar**.
5. Se crean las hojas, la flota de 18 camionetas y la hoja **Configuración** con:
   - el **link para los celulares**,
   - el **código de acceso** (va incluido en el link),
   - el **PIN de administrador**.

**En cada celular:**
- **Android (APK):** abre la app → **Ajustes y conexión**, pega el link de la hoja Configuración y toca *Conectar*.
- **iPhone u otro celular:** activa GitHub Pages en este repositorio (*Settings → Pages → Deploy from a branch*, elige la rama y la carpeta `/ (root)`) y abre `https://crculipichun.github.io/myfirstblog/?u=LINK&c=CODIGO`, con el link (sin `?c=…`) y el código de la hoja Configuración. Después agrégala a la pantalla de inicio.
- **Administrador:** en la app, **Ajustes y conexión → Administrador**, escribe el PIN.

**Bueno saber:**
- Sin señal, las auditorías quedan guardadas en el celular y se envían solas cuando vuelve la conexión. Arriba se ve el estado: *"Planilla al día"* o *"Sin conexión · 3 por enviar"*.
- Las hojas visibles se vuelven a armar con cada envío. Corrige los datos desde la app: los cambios hechos a mano en esas hojas se pierden. Los datos originales están en la hoja oculta `_datos`; no la borres.
- Para abrirla en Excel: **Archivo → Descargar → Microsoft Excel (.xlsx)**.
- Para cambiar el código de acceso o el PIN: en Apps Script, **Configuración del proyecto → Propiedades del script**, edita `CODIGO` o `PIN` y vuelve a usar **Bitácora → Instalar o actualizar**.
- Si cambias el código de `Codigo.gs`: **Implementar → Administrar implementaciones → editar (lápiz) → Versión: Nueva versión**, para que el link siga siendo el mismo.

## Alternativa: planilla en un computador

Si prefieres que la planilla sea un archivo Excel en un computador, usa el programa de la carpeta `servidor` (requiere Python):
1. Instala Python desde https://www.python.org/downloads/ (en Windows marca **"Add python.exe to PATH"**) y descarga este repositorio (*Code → Download ZIP*).
2. En la carpeta `servidor` abre **`Iniciar Bitacora.bat`**. La ventana muestra el link para los celulares, el código de acceso y el PIN. La planilla queda en `Documentos\Bitacora Flota\Bitacora_Flota.xlsx`.
3. Para recibir datos fuera del Wi-Fi de la oficina se usa ngrok (gratis): abre **`Configurar internet.bat`** y pega tu Authtoken y tu dominio de https://dashboard.ngrok.com.

El computador tiene que estar encendido con el programa abierto, y la planilla no se actualiza mientras esté abierta en Excel.

### Hojas de la planilla (iguales en Google y en el computador)

| Hoja | Contenido |
|---|---|
| Flota | Un camión por fila: N°, patente, modelo, odómetro, próxima mantención, km que faltan, si necesita deshielo, última auditoría y su responsable; luego la ficha completa |
| Auditorías | Fecha, N°, patente, vehículo, odómetro, próxima mantención, km que faltan, responsable, necesita deshielo, fecha en que se hizo y fallas reportadas |
| Preventivas | Servicio, repuestos, próximo km/fecha, costo |
| Correctivas | Sistema, causa, repuestos, horas, taller, costo, fecha de cierre |
| Fallas | Cada falla, venga de una auditoría o del administrador: sistema, descripción, si el camión quedó detenido, estado y fecha de cierre |
| Cambios de aceite | Aceite, litros, filtros cambiados, próximo cambio |
| Odómetro | Historial de lecturas de odómetro y horómetro |
| Todos los registros | Todo junto, ordenado por fecha |

## App Android (APK)

1. Copia `Bitacora-Flota.apk` al celular y ábrelo. Android pedirá permitir *instalar apps de origen desconocido* para el administrador de archivos o el navegador: acéptalo.
2. Abre **Bitácora Flota**, toca **Ajustes y conexión**, pega el link de la hoja Configuración de la planilla y toca *Conectar*.
3. La app funciona sin señal: los registros quedan en el celular y se envían solos cuando vuelve la conexión.

Para volver a generar el APK (Linux o macOS, con Java 17+, Python 3 y npm): `android/construir-apk.sh`. Para que salga ya conectado, sin que los choferes configuren nada: `SERVIDOR=https://script.google.com/macros/s/…/exec CODIGO=ABC123 android/construir-apk.sh`, con el link (sin `?c=…`) y el código de la hoja Configuración. Guarda el archivo `android/firma-bitacora.p12`: para instalar una versión nueva encima de la anterior, sin perder datos, el APK tiene que firmarse con la misma llave.

## Usar tu propio Excel

Si ya tienes una planilla con tu formato, conéctala con **Power Query** (Excel → *Datos → Obtener datos*). Tu archivo conserva su diseño, sus fórmulas y sus gráficos.

- **Con la planilla de Google:** descarga la planilla como .xlsx en una carpeta fija (por ejemplo, cada mañana) y conecta tu Excel a ese archivo con *Datos → Obtener datos → De un archivo → De un libro de Excel*. Luego toca *Actualizar todo* cuando descargues una nueva. Google también permite *Archivo → Compartir → Publicar en la web* para leerla desde Excel con *Datos → Desde la Web*, pero así cualquiera con ese link ve los datos.
- **Con la planilla del computador:** *Datos → Obtener datos → De un archivo → De un libro de Excel* → `Documentos\Bitacora Flota\Bitacora_Flota.xlsx`. Elige la hoja, toca **Transformar datos** para quitar o renombrar columnas, y **Cerrar y cargar en…** la hoja que quieras. En *Consultas y conexiones → Propiedades* marca *Actualizar al abrir el archivo* y *Actualizar cada 5 minutos*.

## Sin computador (solo el celular)

También se puede publicar con GitHub Pages (*Settings → Pages → Deploy from a branch*, carpeta `/ (root)`) y abrir esa URL en el celular. En ese caso los datos quedan **solo en ese teléfono** y el Excel se descarga desde la pestaña **Planilla**. Usa **Descargar / Restaurar respaldo** para pasar datos entre teléfonos.

## Archivos

- `index.html` – toda la app (HTML, CSS y JS)
- `google/Codigo.gs` – script para la planilla de Google Drive
- `sw.js` – service worker para uso sin conexión
- `manifest.webmanifest`, `icon.svg`, `icon-*.png` – instalación como app
- `servidor/servidor.py` – programa del computador: entrega la app a los celulares y escribe la planilla Excel
- `servidor/Iniciar Bitacora.bat`, `servidor/iniciar.sh` – accesos para iniciarlo
- `servidor/Configurar internet.bat` – guarda el Authtoken y el dominio de ngrok
- `android/` – app Android (abre la misma página) y `construir-apk.sh` para generar el APK
