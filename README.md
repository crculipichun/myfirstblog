# Bitácora de Flota

App móvil para auditar las camionetas frigoríficas de la flota (Mitsubishi Fuso Canter 413, Kia Frontier 2,5, Hyundai Porter) y **panel web** con el estado de cada camión, que se puede incrustar en Odoo.

## Para los choferes

Eligen el camión (por N°, patente o código anterior como "B1") y el tipo de auditoría:

**Auditoría semanal**: odómetro, responsable, orden y limpieza (cabina, caja frigorífica, exterior, extintor/triángulos/botiquín: Bien / Regular / Mal), fallas y observaciones.

**Auditoría mensual**: odómetro, próxima mantención (km), responsable, ¿necesita deshielo?, fallas, **documentos** (vencimiento de revisión técnica y permiso de circulación, precargados para confirmar o actualizar) y **mantenciones hechas** desde la última auditoría (paquete de mantenimiento, taller, fechas de entrada y salida, km y qué se hizo).

Si reportan una falla, eligen qué falla, la describen y dicen si la camioneta puede seguir trabajando (si no, queda *Detenida*). Cada falla y cada mantención quedan como registros propios.

## Panel web

Una página con todo lo importante de la flota, sin abrir el Excel:
- Resumen: operativos, detenidos, fallas abiertas, deshielo pendiente, mantención próxima, documentos vencidos y cuántos camiones tienen la auditoría semanal y mensual al día.
- Tabla de camiones: odómetro, próxima mantención y km que faltan, revisión técnica, permiso de circulación, deshielo, fallas, última auditoría semanal y mensual, estado. Tocando un camión se ve su detalle y sus registros.
- Listas de fallas abiertas, mantenciones (con las columnas de la planilla de mantenciones de la empresa) y auditorías.

El link del panel está en la hoja **Configuración** de la planilla. Se actualiza solo cada 5 minutos.

**Incrustarlo en Odoo:** en el sitio web de Odoo, *Editar → bloques → Código incrustado (Embed Code)* y pega el `<iframe …>` de la hoja Configuración. Para abrirlo desde un menú de Odoo, crea una *Acción de URL* con el link del panel. Para importar los datos a otro programa (Odoo, Power BI) está el link **JSON** de la misma hoja.

## Datos cargados

La flota usa los N° de la lista de choferes. De la planilla *Estado de Flota* se cargaron, por patente: revisión técnica (fecha y vencimiento), permiso de circulación (pago y vencimiento), el código anterior (B1, B2…) y 81 mantenciones históricas. Los camiones en rojo (LRTF81, LRTF82, HLYG99, LPKF88) están de baja y no se cargaron.

**El administrador** (con PIN) ve además el panel completo de la app, con avisos de deshielo pendiente, mantención a 1.000 km o atrasada y documentos por vencer, y puede agregar o editar camiones y registrar mantenciones, fallas, cambios de aceite y lecturas de odómetro.

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
- **Para instalar una versión nueva de `Codigo.gs`:** pégala completa en Apps Script, guarda, y en **Implementar → Administrar implementaciones → editar (lápiz) → Versión: Nueva versión → Implementar** (el link no cambia). Después **Bitácora → Instalar o actualizar**.
- `google/Codigo.gs` se arma con `python3 google/armar.py` desde `google/fuente/` (plantilla, panel web e historial). No lo edites a mano.

## Alternativa: planilla en un computador

Si prefieres que la planilla sea un archivo Excel en un computador, usa el programa de la carpeta `servidor` (requiere Python):
1. Instala Python desde https://www.python.org/downloads/ (en Windows marca **"Add python.exe to PATH"**) y descarga este repositorio (*Code → Download ZIP*).
2. En la carpeta `servidor` abre **`Iniciar Bitacora.bat`**. La ventana muestra el link para los celulares, el código de acceso y el PIN. La planilla queda en `Documentos\Bitacora Flota\Bitacora_Flota.xlsx`.
3. Para recibir datos fuera del Wi-Fi de la oficina se usa ngrok (gratis): abre **`Configurar internet.bat`** y pega tu Authtoken y tu dominio de https://dashboard.ngrok.com.

El computador tiene que estar encendido con el programa abierto, y la planilla no se actualiza mientras esté abierta en Excel. Esta alternativa no tiene el panel web ni las hojas de auditorías semanales y mantenciones.

### Hojas de la planilla de Google

| Hoja | Contenido |
|---|---|
| Flota | Un camión por fila: N°, patente, modelo, odómetro, próxima mantención y km que faltan, deshielo, vencimientos de revisión técnica y permiso, últimas auditorías, fallas abiertas, estado y la ficha completa |
| Documentos | Revisión técnica y permiso de circulación de cada camión: fecha, vencimiento, estado y días que faltan |
| Auditorías semanales | Odómetro, responsable, orden y limpieza punto por punto, fallas |
| Auditorías mensuales | Odómetro, próxima mantención, deshielo, vencimientos informados, mantenciones informadas, fallas |
| Mantenciones | Las mismas columnas de la planilla de mantenciones de la empresa: taller, fechas, tipo, km, paquete, servicio, causas y observaciones |
| Fallas | Cada falla: sistema, descripción, si el camión quedó detenido, estado y de dónde vino |
| Cambios de aceite, Odómetro, Todos los registros | Lo que registra el administrador |

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
- `google/Codigo.gs` – script para la planilla de Google Drive y el panel web (generado por `google/armar.py` desde `google/fuente/`)
- `sw.js` – service worker para uso sin conexión
- `manifest.webmanifest`, `icon.svg`, `icon-*.png` – instalación como app
- `servidor/servidor.py` – programa del computador: entrega la app a los celulares y escribe la planilla Excel
- `servidor/Iniciar Bitacora.bat`, `servidor/iniciar.sh` – accesos para iniciarlo
- `servidor/Configurar internet.bat` – guarda el Authtoken y el dominio de ngrok
- `android/` – app Android (abre la misma página) y `construir-apk.sh` para generar el APK
