# Bitácora de Flota

App móvil (web instalable / PWA) para auditar camiones y controlar:

- **Auditorías** con checklist de 22 puntos (frenos, neumáticos, luces, motor, cabina y seguridad, documentos: revisión técnica, permiso de circulación, SOAP), cada uno OK / Obs / Falla y porcentaje de cumplimiento.
- **Mantenciones preventivas** (servicio, repuestos, próximo km y próxima fecha).
- **Mantenciones correctivas** (sistema, causa, repuestos, horas de taller, taller, costo).
- **Fallas** (sistema, severidad, camión detenido, estado Pendiente / En proceso / Cerrado).
- **Cambios de aceite** (tipo, litros, filtros, próximo cambio calculado con el intervalo de cada camión).

La pantalla de inicio avisa qué requiere atención: aceite vencido o por vencer (a 1.500 km), fallas abiertas, camiones detenidos, preventivas próximas y camiones sin auditoría en 30 días.

## Planilla Excel

En la pestaña **Planilla** se descarga un `.xlsx` con 7 hojas, todas con filtros:

| Hoja | Contenido |
|---|---|
| Flota | Patente, marca, modelo, km, estado del aceite, fallas abiertas, última auditoría |
| Auditorías | Una fila por auditoría y una columna por cada punto del checklist |
| Preventivas | Servicio, repuestos, próximo km/fecha, costo |
| Correctivas | Sistema, causa, repuestos, horas, taller, costo, fecha de cierre |
| Fallas | Sistema, severidad, camión detenido, estado, fecha de cierre |
| Cambios de aceite | Aceite, litros, filtros cambiados, próximo cambio |
| Todos los registros | Todo junto, ordenado por fecha |

## Datos

Los datos se guardan en el teléfono (funciona sin señal). Usa **Descargar respaldo** / **Restaurar respaldo** (.json) para pasar datos entre teléfonos, y descarga la planilla con frecuencia.

## Cómo usarla en el teléfono

1. Publica el repositorio con GitHub Pages: *Settings → Pages → Deploy from a branch*, elige la rama y la carpeta `/ (root)`.
2. Abre la URL en el teléfono:
   - **Android (Chrome):** menú ⋮ → *Instalar aplicación* / *Agregar a pantalla principal*.
   - **iPhone (Safari):** botón Compartir → *Agregar a inicio*.
3. Queda como una app con ícono propio y funciona sin internet después de la primera carga.

## Archivos

- `index.html` – toda la app (HTML, CSS y JS)
- `sw.js` – service worker para uso sin conexión
- `manifest.webmanifest`, `icon.svg`, `icon-*.png` – instalación como app
