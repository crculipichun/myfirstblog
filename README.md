# Bitácora de Flota

App móvil para auditar las camionetas frigoríficas de la flota (Mitsubishi Fuso Canter 413, Kia Frontier 2,5, Hyundai Porter) y **panel web** con el estado de cada camión, que se puede incrustar en Odoo.

## Para los choferes

Eligen el camión (por N°, patente o código anterior como "B1") y el tipo de auditoría:

**Auditoría semanal**: odómetro, responsable, orden y limpieza (cabina, caja frigorífica, exterior, extintor/triángulos/botiquín: Bien / Regular / Mal), fallas y observaciones.

**Auditoría mensual**: odómetro, próxima mantención (km), responsable, ¿necesita deshielo?, fallas, **documentos** (vencimiento de revisión técnica y permiso de circulación, precargados para confirmar o actualizar) y **mantenciones hechas** desde la última auditoría (paquete de mantenimiento, taller, fechas de entrada y salida, km y qué se hizo).

Si reportan una falla, eligen qué falla, la describen y dicen si la camioneta puede seguir trabajando (si no, queda *Detenida*). Cada falla y cada mantención quedan como registros propios.

## Panel web

Una página con todo lo importante de la flota: se ordena tocando el título de cada columna y al tocar un camión se ve su detalle. Solo tienen color:
- **Revisión técnica y permiso de circulación:** verde vigente, amarillo claro si vencen en 31 a 60 días, amarillo fuerte si vencen en 30 días o menos, rojo si están vencidos.
- **Fallas abiertas:** rojo claro si son leves, rojo fuerte si son graves (el camión no puede seguir trabajando, o severidad alta o crítica).
- Resumen: operativos, detenidos, fallas abiertas, deshielo pendiente, mantención próxima, documentos vencidos y cuántos camiones tienen la auditoría semanal y mensual al día.
- Tabla de camiones: odómetro, próxima mantención y km que faltan, revisión técnica, permiso de circulación, deshielo, fallas, última auditoría semanal y mensual, estado. Tocando un camión se ve su detalle y sus registros.
- Listas de fallas abiertas, mantenciones (con las columnas de la planilla de mantenciones de la empresa) y auditorías.

El link del panel aparece al ejecutar `instalar` en Apps Script. Se actualiza solo cada 5 minutos.

## Avisos por correo

Los correos que reciben los avisos van en la primera línea del código (`const CORREOS = "…"`), separados por coma. Ejecutando la función `probarCorreo` en Apps Script se comprueba que lleguen. Los correos salen desde la cuenta de Google dueña del script.

- **Fallas nuevas:** apenas un chofer las envía (una sola vez por falla), marcadas como leves o graves.
- **Documentos:** cuando a la revisión técnica o al permiso de circulación les quedan 30 días y cuando vencen.
- **Mantención / cambio de aceite:** cuando faltan 1.000 km para la próxima mantención y cuando se pasa.

Cada aviso se envía una sola vez; los de documentos y mantención se revisan con cada auditoría y además todos los días a las 8:00. La primera vez llega un solo correo con todo lo que ya esté por vencer o vencido.

**Incrustarlo en Odoo:** en el sitio web de Odoo, *Editar → bloques → Código incrustado (Embed Code)* y pega el `<iframe …>` que muestra `instalar`. Para abrirlo desde un menú de Odoo, crea una *Acción de URL* con el link del panel. Para importar los datos a otro programa (Odoo, Power BI) está el link **JSON**.

## Datos cargados

La flota usa los N° de la lista de choferes. De la planilla *Estado de Flota* se cargaron, por patente: revisión técnica (fecha y vencimiento), permiso de circulación (pago y vencimiento), el código anterior (B1, B2…) y 81 mantenciones históricas. Los camiones en rojo (LRTF81, LRTF82, HLYG99, LPKF88) están de baja y no se cargaron.

**El administrador** (con PIN) ve además el panel completo de la app, con avisos de deshielo pendiente, mantención a 1.000 km o atrasada y documentos por vencer, y puede agregar o editar camiones y registrar mantenciones, fallas, cambios de aceite y lecturas de odómetro.

## Instalación (Google, gratis, sin planilla)

Los datos se guardan en un archivo de Google Drive que el script crea solo (*Flota DIMER - datos (no borrar).json*); todo se mira en el panel web.

1. Entra a https://script.google.com y toca **Nuevo proyecto**. Ponle de nombre *Flota DIMER*.
2. Borra el texto que aparece, pega todo el contenido de [`google/Codigo.gs`](google/Codigo.gs) y guarda. En la primera línea escribe los correos para los avisos.
3. **Implementar → Nueva implementación → Aplicación web**, con *Ejecutar como:* **Yo** y *Quién tiene acceso:* **Cualquier usuario**. Toca **Implementar** y autoriza.
4. Arriba, en la lista de funciones, elige **instalar** y toca **Ejecutar**. El *Registro de ejecución* muestra el link para los celulares, el link del panel web, el código para Odoo, el link JSON, el código de acceso y el PIN de administrador. Para volver a verlos, ejecuta **mostrarLinks**.

**En cada celular:**
- **Android (APK):** abre la app → **Ajustes y conexión**, pega el link para los celulares y toca *Conectar*.
- **iPhone u otro celular:** activa GitHub Pages en este repositorio (*Settings → Pages*) y abre `https://crculipichun.github.io/myfirstblog/?u=LINK&c=CODIGO`.
- **Administrador:** en la app, **Ajustes y conexión → Administrador**, escribe el PIN. Ahí también está el botón **Abrir panel web**.

**Bueno saber:**
- Sin señal, las auditorías quedan guardadas en el celular y se envían solas cuando vuelve la conexión.
- No borres el archivo *Flota DIMER - datos (no borrar).json* de tu Drive: ahí están todos los registros.
- Para cambiar el código de acceso o el PIN: en Apps Script, **Configuración del proyecto → Propiedades del script**, edita `CODIGO` o `PIN`.
- **Para instalar una versión nueva de `Codigo.gs`:** pégala completa en Apps Script, guarda, y en **Implementar → Administrar implementaciones → lápiz → Versión: Nueva versión → Implementar** (el link no cambia). Después ejecuta **instalar**.

## App Android (APK)

1. Copia `Bitacora-Flota.apk` al celular y ábrelo. Android pedirá permitir *instalar apps de origen desconocido* para el administrador de archivos o el navegador: acéptalo.
2. Abre **Bitácora Flota**, toca **Ajustes y conexión**, pega el link para los celulares y toca *Conectar*.
3. La app funciona sin señal: los registros quedan en el celular y se envían solos cuando vuelve la conexión.

Para volver a generar el APK (Linux o macOS, con Java 17+, Python 3 y npm): `android/construir-apk.sh`. Para que salga ya conectado: `SERVIDOR=https://script.google.com/macros/s/…/exec CODIGO=ABC123 android/construir-apk.sh`. Guarda el archivo `android/firma-bitacora.p12`: para instalar una versión nueva encima de la anterior, sin perder datos, el APK tiene que firmarse con la misma llave.

## Archivos

- `index.html` – toda la app (HTML, CSS y JS)
- `google/Codigo.gs` – script de Google con el panel web y los avisos
- `sw.js` – service worker para uso sin conexión
- `manifest.webmanifest`, `icon.svg`, `icon-*.png` – instalación como app
- `android/` – app Android (abre la misma página) y `construir-apk.sh` para generar el APK
