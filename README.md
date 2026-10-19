# Bitácora de Flota

App móvil (web instalable / PWA) para auditar camiones y controlar:

- **Auditorías** con checklist de 22 puntos (frenos, neumáticos, luces, motor, cabina y seguridad, documentos: revisión técnica, permiso de circulación, SOAP), cada uno OK / Obs / Falla y porcentaje de cumplimiento.
- **Mantenciones preventivas** (servicio, repuestos, próximo km y próxima fecha).
- **Mantenciones correctivas** (sistema, causa, repuestos, horas de taller, taller, costo).
- **Fallas** (sistema, severidad, camión detenido, estado Pendiente / En proceso / Cerrado).
- **Cambios de aceite** (tipo, litros, filtros, próximo cambio calculado con el intervalo de cada camión).
- **Lecturas de odómetro y horómetro**, desde la ficha del camión con un solo botón.

Cada camión tiene su **ficha**: patente, N° interno, tipo, marca, modelo, año, color, VIN / N° chasis, N° motor, odómetro, horómetro, intervalo de aceite, estanque, medida de neumáticos, conductor, faena y vencimientos de revisión técnica, permiso de circulación, SOAP y extintor (con aviso 30 días antes).

La flota de la empresa (N° 1 al 17 y 815) viene cargada desde el inicio. **Solo el administrador** puede agregar, editar o borrar camiones; los demás usuarios registran auditorías, mantenciones, fallas, aceite y lecturas de odómetro.

La pantalla de inicio avisa qué requiere atención: aceite vencido o por vencer (a 1.500 km), fallas abiertas, camiones detenidos, preventivas próximas y camiones sin auditoría en 30 días.

## La planilla Excel en el computador (recomendado)

El computador de la oficina o taller guarda la planilla `Bitacora_Flota.xlsx`, y cada registro hecho en un celular se agrega solo.

**Instalar (una vez):**
1. Instala Python desde https://www.python.org/downloads/ (en Windows marca **"Add python.exe to PATH"**).
2. Descarga este repositorio en el computador (botón verde *Code → Download ZIP* en GitHub) y descomprímelo.

**Usar cada día:**
1. Abre la carpeta `servidor` y haz doble clic en **`Iniciar Bitacora.bat`** (en Mac/Linux: `./iniciar.sh`). La primera vez instala lo necesario.
   Si Windows pregunta por el Firewall, permite el acceso en **redes privadas**.
2. La ventana muestra la dirección para los celulares, por ejemplo `http://192.168.1.23:8080`. Ábrela en el celular, conectado al **mismo Wi-Fi** que el computador, y agrégala a la pantalla de inicio.
3. La ventana también muestra el **PIN de administrador**. En el celular del administrador: pestaña **Planilla → Administrador**, escribe el PIN y toca *Entrar*. Para cambiarlo: `servidor.py --pin 1234`.
4. Deja la ventana abierta. La planilla queda en `Documentos\Bitacora Flota\Bitacora_Flota.xlsx`.
   Para usar otra carpeta (por ejemplo una de OneDrive): `servidor.py --carpeta "C:\ruta\a\la\carpeta"`.

**Bueno saber:**
- **Sin señal o fuera del Wi-Fi:** los registros quedan guardados en el celular y se envían solos al volver a la red del computador. Arriba se ve el estado: *"PC · planilla al día"* o *"Sin PC · 3 por enviar"*. Deja la app abierta en el celular cuando salgas a terreno; sin conexión al computador no se puede volver a cargar.
- **Si tienes el Excel abierto**, Windows no deja modificarlo. La app avisa *"cierra el Excel"* y la planilla se actualiza sola en cuanto lo cierres.
- La planilla se **vuelve a generar** con cada registro. Para corregir datos usa la app; los cambios hechos a mano en el Excel se pierden. Para hacer tus propios cálculos, usa otra hoja o archivo que lea de esta planilla.
- Los datos originales quedan en `datos_bitacora.json`, en la misma carpeta. Respalda esa carpeta.

### Hojas de la planilla

| Hoja | Contenido |
|---|---|
| Flota | Ficha completa de cada camión: odómetro, horómetro, VIN, conductor, estado del aceite, fallas abiertas, última auditoría, vencimientos |
| Auditorías | Una fila por auditoría y una columna por cada punto del checklist |
| Preventivas | Servicio, repuestos, próximo km/fecha, costo |
| Correctivas | Sistema, causa, repuestos, horas, taller, costo, fecha de cierre |
| Fallas | Sistema, severidad, camión detenido, estado, fecha de cierre |
| Cambios de aceite | Aceite, litros, filtros cambiados, próximo cambio |
| Odómetro | Historial de lecturas de odómetro y horómetro |
| Todos los registros | Todo junto, ordenado por fecha |

## App Android (APK)

1. Copia `Bitacora-Flota.apk` al celular y ábrelo. Android pedirá permitir *instalar apps de origen desconocido* para el administrador de archivos o el navegador: acéptalo.
2. Abre **Bitácora Flota**, ve a **Planilla → Computador con la planilla**, escribe la dirección que muestra la ventana del computador (por ejemplo `192.168.1.23:8080`) y toca *Conectar*.
3. La app funciona sin internet: los registros quedan en el celular y se envían solos al volver al Wi-Fi del computador.

Para volver a generar el APK (Linux o macOS, con Java 17+, Python 3 y npm): `android/construir-apk.sh`. Guarda el archivo `android/firma-bitacora.p12`: para instalar una versión nueva encima de la anterior, sin perder datos, el APK tiene que firmarse con la misma llave.

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
- `android/` – app Android (abre la misma página) y `construir-apk.sh` para generar el APK
