# Bitácora de Flota

App móvil para auditar las camionetas frigoríficas de la flota (Mitsubishi Fuso Canter 413, Kia Frontier 2,5, Hyundai Porter).

**Para los choferes es una sola pantalla:** eligen el camión (por N° o patente) y completan 4 datos:
1. Odómetro (km)
2. Próxima mantención (km), que viene precargada con la última informada
3. Responsable de la auditoría (el celular lo recuerda)
4. ¿Necesita deshielo? Sí / No

Tocan **Enviar auditoría** y llega a la planilla Excel del computador.

**El administrador** (con PIN) ve además el panel completo, con avisos de deshielo pendiente y de mantención a 1.000 km o atrasada, y puede registrar:
- **Mantenciones preventivas** (servicio, repuestos, próximo km y próxima fecha).
- **Mantenciones correctivas** (sistema, causa, repuestos, horas de taller, taller, costo).
- **Fallas** (sistema, severidad, camión detenido, estado Pendiente / En proceso / Cerrado).
- **Cambios de aceite** (tipo, litros, filtros, próximo cambio calculado con el intervalo de cada camión).
- **Lecturas de odómetro y horómetro**, desde la ficha del camión con un solo botón.

Cada camión tiene su **ficha**: patente, N° interno, tipo, marca, modelo, año, color, VIN / N° chasis, N° motor, odómetro, horómetro, intervalo de aceite, estanque, medida de neumáticos, conductor, faena y vencimientos de revisión técnica, permiso de circulación, SOAP y extintor (con aviso 30 días antes).

La flota de la empresa (N° 1 al 17 y 815) viene cargada desde el inicio. **Solo el administrador** puede agregar, editar o borrar camiones; los choferes solo ven la pantalla de auditoría.

La pantalla de inicio del administrador avisa qué requiere atención: deshielo pendiente (con botón *Hecho*), mantención próxima o atrasada, aceite por vencer, fallas abiertas, camiones detenidos y camiones sin auditoría en 30 días.

## La planilla Excel en el computador (recomendado)

El computador de la oficina o taller guarda la planilla `Bitacora_Flota.xlsx`. **Cualquier celular, desde cualquier lugar con internet**, envía sus registros y se agregan solos a esa planilla.

**Instalar (una vez):**
1. Instala Python desde https://www.python.org/downloads/ (en Windows marca **"Add python.exe to PATH"**).
2. Descarga este repositorio en el computador (botón verde *Code → Download ZIP* en GitHub) y descomprímelo.
3. **Conexión por internet (gratis, con ngrok):**
   1. Crea una cuenta en https://dashboard.ngrok.com/signup
   2. Copia tu *Authtoken* en https://dashboard.ngrok.com/get-started/your-authtoken
   3. Crea tu dominio fijo gratuito en https://dashboard.ngrok.com/domains (botón *New Domain*). Queda algo como `mi-flota.ngrok-free.dev`.
   4. En la carpeta `servidor`, haz doble clic en **`Configurar internet.bat`**, pega el Authtoken y el dominio. Se guardan para siempre.

**Usar cada día:**
1. En la carpeta `servidor`, haz doble clic en **`Iniciar Bitacora.bat`** (en Mac/Linux: `./iniciar.sh`). Si Windows pregunta por el Firewall, permite el acceso.
2. La ventana muestra:
   - el **link para los celulares**, por ejemplo `https://mi-flota.ngrok-free.dev/?c=K7PQ3M`. Envíalo por WhatsApp a todos los que van a registrar;
   - el **código de acceso** (`K7PQ3M`), que va incluido en el link;
   - el **PIN de administrador**, solo para quien agrega y edita camiones.
3. Deja la ventana abierta mientras se trabaje. La planilla queda en `Documentos\Bitacora Flota\Bitacora_Flota.xlsx`.
   Para usar otra carpeta (por ejemplo una de OneDrive): `servidor.py --carpeta "C:\ruta\a\la\carpeta"`.

**En cada celular:**
- **Android con el APK:** abre la app → **Ajustes y conexión**, pega el link y toca *Conectar*.
- **Cualquier celular (Android o iPhone) sin APK:** abre el link en Chrome o Safari. La primera vez ngrok muestra un aviso: toca *Visit Site*. Luego agrégala a la pantalla de inicio (Chrome: menú ⋮ → *Instalar aplicación*; Safari: Compartir → *Agregar a inicio*).
- **Administrador:** en la pantalla del chofer toca **Ajustes y conexión → Administrador**, escribe el PIN y toca *Entrar*. Para cambiar el PIN: `servidor.py --pin 1234`. Para cambiar el código de acceso: `servidor.py --codigo NUEVO` (los celulares tendrán que ingresar el nuevo).

**Bueno saber:**
- **El computador debe estar encendido** con el programa abierto para recibir datos. Si está apagado o un celular no tiene señal, los registros quedan guardados en el celular y se envían solos cuando se puede. Arriba se ve el estado: *"PC · planilla al día"* o *"Sin PC · 3 por enviar"*.
- Solo los celulares con el **código de acceso** pueden enviar o ver datos. Si alguien deja la empresa, cambia el código.
- **Si tienes el Excel abierto**, Windows no deja modificarlo. La app avisa *"cierra el Excel"* y la planilla se actualiza sola en cuanto lo cierres. Para evitarlo, trabaja en tu propio Excel conectado con Power Query (ver más abajo).
- La planilla se **vuelve a generar** con cada registro. Para corregir datos usa la app; los cambios hechos a mano en el Excel se pierden.
- Los datos originales quedan en `datos_bitacora.json`, en la misma carpeta. Respalda esa carpeta.
- Sin ngrok el programa funciona igual, pero solo para celulares en el mismo Wi-Fi que el computador (link `http://192.168…`).

### Hojas de la planilla

| Hoja | Contenido |
|---|---|
| Flota | Un camión por fila: N°, patente, modelo, odómetro, próxima mantención, km que faltan, si necesita deshielo, última auditoría y su responsable; luego la ficha completa |
| Auditorías | Fecha, N°, patente, vehículo, odómetro, próxima mantención, km que faltan, responsable, necesita deshielo y fecha en que se hizo |
| Preventivas | Servicio, repuestos, próximo km/fecha, costo |
| Correctivas | Sistema, causa, repuestos, horas, taller, costo, fecha de cierre |
| Fallas | Sistema, severidad, camión detenido, estado, fecha de cierre |
| Cambios de aceite | Aceite, litros, filtros cambiados, próximo cambio |
| Odómetro | Historial de lecturas de odómetro y horómetro |
| Todos los registros | Todo junto, ordenado por fecha |

## App Android (APK)

1. Copia `Bitacora-Flota.apk` al celular y ábrelo. Android pedirá permitir *instalar apps de origen desconocido* para el administrador de archivos o el navegador: acéptalo.
2. Abre **Bitácora Flota**, toca **Ajustes y conexión**, pega el link que muestra la ventana del computador y toca *Conectar*.
3. La app funciona sin señal: los registros quedan en el celular y se envían solos cuando vuelve la conexión.

Para volver a generar el APK (Linux o macOS, con Java 17+, Python 3 y npm): `android/construir-apk.sh`. Para que salga ya conectado al computador, sin que los choferes configuren nada: `SERVIDOR=https://mi-flota.ngrok-free.dev/ CODIGO=ABC123 android/construir-apk.sh` (usa el mismo código que el computador: `servidor.py --codigo ABC123`). Guarda el archivo `android/firma-bitacora.p12`: para instalar una versión nueva encima de la anterior, sin perder datos, el APK tiene que firmarse con la misma llave.

## Usar tu propio Excel

Si ya tienes una planilla con tu formato, conéctala a `Bitacora_Flota.xlsx` con **Power Query**, que viene incluido en Excel. Tu archivo conserva su diseño, sus fórmulas y sus gráficos, y se actualiza con los datos de la app.

1. Abre tu Excel y ve a **Datos → Obtener datos → De un archivo → De un libro de Excel**.
2. Elige `Documentos\Bitacora Flota\Bitacora_Flota.xlsx`.
3. Marca la hoja que necesitas (por ejemplo *Fallas* o *Cambios de aceite*) y toca **Transformar datos**. Ahí puedes quitar columnas, cambiarles el nombre, filtrar por camión o fechas y ordenarlas como en tu planilla.
4. Toca **Cerrar y cargar en…** y elige la hoja y la celda de tu archivo donde deben quedar los datos.
5. Para que se actualice sola: **Datos → Consultas y conexiones**, clic derecho en la consulta → **Propiedades** → marca *Actualizar al abrir el archivo* y *Actualizar cada 5 minutos*. También puedes tocar **Datos → Actualizar todo** cuando quieras.

Así puedes tener tu propio Excel abierto todo el día: Power Query lee una copia, y la planilla de la app se sigue actualizando sin quedar bloqueada.

## Sin computador (solo el celular)

También se puede publicar con GitHub Pages (*Settings → Pages → Deploy from a branch*, carpeta `/ (root)`) y abrir esa URL en el celular. En ese caso los datos quedan **solo en ese teléfono** y el Excel se descarga desde la pestaña **Planilla**. Usa **Descargar / Restaurar respaldo** para pasar datos entre teléfonos.

## Archivos

- `index.html` – toda la app (HTML, CSS y JS)
- `sw.js` – service worker para uso sin conexión
- `manifest.webmanifest`, `icon.svg`, `icon-*.png` – instalación como app
- `servidor/servidor.py` – programa del computador: entrega la app a los celulares y escribe la planilla Excel
- `servidor/Iniciar Bitacora.bat`, `servidor/iniciar.sh` – accesos para iniciarlo
- `servidor/Configurar internet.bat` – guarda el Authtoken y el dominio de ngrok
- `android/` – app Android (abre la misma página) y `construir-apk.sh` para generar el APK
