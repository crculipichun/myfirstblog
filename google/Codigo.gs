// ARCHIVO GENERADO por google/armar.py desde google/fuente/: no lo edites a mano.
/**
 * Bitácora de Flota: planilla de Google que recibe las auditorías de los celulares
 * y publica un panel web (se puede incrustar en Odoo).
 *
 * Instalación (una vez), en una planilla de Google Sheets:
 *   1. Extensiones → Apps Script. Borra lo que aparece, pega este archivo completo y guarda.
 *   2. Implementar → Nueva implementación → tipo "Aplicación web".
 *      Ejecutar como: Yo.  Quién tiene acceso: Cualquier usuario.  → Implementar y autoriza.
 *   3. Vuelve a la planilla y recárgala: menú Bitácora → Instalar o actualizar.
 *   4. La hoja "Configuración" muestra el link para los celulares, el del panel web, el código y el PIN.
 *
 * Al pegar una versión nueva de este archivo: Implementar → Administrar implementaciones → lápiz →
 * Versión: Nueva versión → Implementar (el link no cambia). Luego Bitácora → Instalar o actualizar.
 *
 * Los datos originales se guardan en la hoja oculta "_datos"; las demás hojas se vuelven a armar
 * con cada envío, así que se corrigen desde la app (las ediciones a mano se pierden).
 */

const HOJA_DATOS = "_datos";
const HOJA_CONFIG = "Configuración";
const COLECCIONES = ["camiones", "registros"];
const VERSION_DATOS = "2026-10-21"; // sube este valor para volver a aplicar FLOTA_INICIAL sobre la flota guardada

// Copia de FLOTA_INICIAL de index.html (N° de la lista de choferes; revisión técnica y permiso de la planilla "Estado de Flota")
const FLOTA_INICIAL = [
  {"id":"cam-1","interno":"1","patente":"STFF54","marca":"Mitsubishi","modelo":"Fuso Canter 413","tipoCamion":"Camioneta frigorífica","anio":2023,"intervalo":10000,"codigoAnterior":"B1","rtFecha":"2025-08-07","vRevision":"2027-07-31","permisoFecha":"2026-03-30","vPermiso":"2027-03-31"},
  {"id":"cam-2","interno":"2","patente":"STFG40","marca":"Mitsubishi","modelo":"Fuso Canter 413","tipoCamion":"Camioneta frigorífica","anio":2023,"intervalo":10000,"codigoAnterior":"B2","rtFecha":"2026-02-28","vRevision":"2028-02-28","permisoFecha":"2026-03-30","vPermiso":"2027-03-31"},
  {"id":"cam-3","interno":"3","patente":"STFF52","marca":"Mitsubishi","modelo":"Fuso Canter 413","tipoCamion":"Camioneta frigorífica","anio":2023,"intervalo":10000,"codigoAnterior":"B3","rtFecha":"2025-08-06","vRevision":"2027-05-31","permisoFecha":"2026-03-30","vPermiso":"2027-03-31"},
  {"id":"cam-4","interno":"4","patente":"SSYL78","marca":"Mitsubishi","modelo":"Fuso Canter 413","tipoCamion":"Camioneta frigorífica","anio":2023,"intervalo":10000,"codigoAnterior":"4","rtFecha":"Homologado","vRevision":"2026-11-30","permisoFecha":"2026-03-30","vPermiso":"2027-03-31"},
  {"id":"cam-5","interno":"5","patente":"SSYL59","marca":"Mitsubishi","modelo":"Fuso Canter 413","tipoCamion":"Camioneta frigorífica","anio":2023,"intervalo":10000,"codigoAnterior":"5","rtFecha":"2026-01-31","vRevision":"2028-01-30","permisoFecha":"2026-03-30","vPermiso":"2027-03-31"},
  {"id":"cam-6","interno":"6","patente":"VZTR73","marca":"Kia","modelo":"Frontier 2,5","tipoCamion":"Camioneta frigorífica","anio":2026,"intervalo":10000},
  {"id":"cam-7","interno":"7","patente":"STFF53","marca":"Mitsubishi","modelo":"Fuso Canter 413","tipoCamion":"Camioneta frigorífica","anio":2023,"intervalo":10000,"codigoAnterior":"B4","rtFecha":"2025-08-08","vRevision":"2027-06-30","permisoFecha":"2026-03-30","vPermiso":"2027-03-31"},
  {"id":"cam-8","interno":"8","patente":"SSYL80","marca":"Mitsubishi","modelo":"Fuso Canter 413","tipoCamion":"Camioneta frigorífica","anio":2023,"intervalo":10000,"codigoAnterior":"8","rtFecha":"2026-03-23","vRevision":"2028-02-28","permisoFecha":"2026-03-30","vPermiso":"2027-03-31"},
  {"id":"cam-9","interno":"9","patente":"STFG52","marca":"Mitsubishi","modelo":"Fuso Canter 413","tipoCamion":"Camioneta frigorífica","anio":2023,"intervalo":10000,"codigoAnterior":"B7","rtFecha":"2025-12-16","vRevision":"2026-06-30","permisoFecha":"2025-09-30","vPermiso":"2026-09-30"},
  {"id":"cam-10","interno":"10","patente":"STFG41","marca":"Mitsubishi","modelo":"Fuso Canter 413","tipoCamion":"Camioneta frigorífica","anio":2023,"intervalo":10000,"codigoAnterior":"B5","rtFecha":"2026-01-08","vRevision":"2027-02-14","permisoFecha":"2025-09-30","vPermiso":"2026-09-30"},
  {"id":"cam-11","interno":"11","patente":"KWJV95","marca":"Kia","modelo":"Frontier 2,5","tipoCamion":"Camioneta frigorífica","anio":2019,"intervalo":10000,"codigoAnterior":"11","rtFecha":"2025-08-31","vRevision":"2026-08-31","permisoFecha":"2026-03-30","vPermiso":"2027-03-31"},
  {"id":"cam-12","interno":"12","patente":"VYWC61","marca":"Kia","modelo":"Frontier 2,5","tipoCamion":"Camioneta frigorífica","anio":2026,"intervalo":10000},
  {"id":"cam-13","interno":"13","patente":"LPKF87","marca":"Kia","modelo":"Frontier 2,5","tipoCamion":"Camioneta frigorífica","anio":2020,"intervalo":10000,"codigoAnterior":"6","rtFecha":"2025-01-13","vRevision":"2026-10-31","permisoFecha":"2026-03-30","vPermiso":"2027-03-31"},
  {"id":"cam-14","interno":"14","patente":"VRWD34","marca":"Kia","modelo":"Frontier 2,5","tipoCamion":"Camioneta frigorífica","anio":2026,"intervalo":10000,"codigoAnterior":"14","rtFecha":"Homologado","vRevision":"2028-07-31","permisoFecha":"2026-02-13","vPermiso":"2026-08-31"},
  {"id":"cam-15","interno":"15","patente":"VRWD44","marca":"Kia","modelo":"Frontier 2,5","tipoCamion":"Camioneta frigorífica","anio":2026,"intervalo":10000,"codigoAnterior":"15","rtFecha":"Homologado","vRevision":"2028-07-31","permisoFecha":"2026-02-13","vPermiso":"2026-08-31"},
  {"id":"cam-16","interno":"16","patente":"VRWD33","marca":"Kia","modelo":"Frontier 2,5","tipoCamion":"Camioneta frigorífica","anio":2026,"intervalo":10000,"codigoAnterior":"16","rtFecha":"Homologado","vRevision":"2028-07-31","permisoFecha":"2026-02-13","vPermiso":"2026-08-31"},
  {"id":"cam-17","interno":"17","patente":"VZTR58","marca":"Hyundai","modelo":"Porter","tipoCamion":"Camioneta frigorífica","anio":2026,"intervalo":10000},
  {"id":"cam-815","interno":"815","patente":"RFBF71","marca":"Mitsubishi","modelo":"Fuso 815","tipoCamion":"Camioneta frigorífica","anio":2021,"intervalo":10000,"codigoAnterior":"815","rtFecha":"2026-04-10","vRevision":"2026-10-10","permisoFecha":"2025-09-30","vPermiso":"2026-09-30"}
];
// Patentes dadas de baja (en rojo en la planilla "Estado de Flota"): se quitan de la flota
const BAJAS = ["LRTF81", "LRTF82", "HLYG99", "LPKF88"];
// Historial de mantenciones de la planilla "Estado de Flota" (solo camiones activos):
// [N° fila, patente, taller, fecha entrada, fecha salida, P/C, km, paquete, causas y observaciones, servicio si difiere del paquete]
const HISTORIAL = [
  [1,"STFG52","Kaufmann","2023-11-08","","P",20103,"P01","Cambio de Aceite y Filtros"],
  [2,"STFG41","Kaufmann","2023-11-22","","P",20805,"P01","Cambio de Aceite y Filtros"],
  [15,"STFG52","Juan Nuñez","2024-12-06","","P",40471,"P01","Cambio de Aceite y Filtros"],
  [16,"STFG52","Juan Nuñez","2024-12-06","","P",40471,"P02","Cambio de Pastillas de Freno Traseras y Delanteras"],
  [18,"STFG41","Juan Nuñez","2025-02-05","","P",42226,"P01","Cambio de Aceite y Filtros"],
  [21,"SSYL80","Kaufmann","2025-03-01","2025-03-01","P",20500,"P01","Cambio de Aceite y Filtros"],
  [22,"SSYL78","Kaufmann","2025-03-01","2025-03-01","P",20500,"P01","Cambio de Aceite y Filtros"],
  [27,"LPKF87","","2025-05-14","2025-05-14","P",null,"P02","Frenos Total"],
  [28,"KWJV95","","2025-05-19","2025-05-19","C",null,"C05","2 Cilindros"],
  [29,"KWJV95","","2025-05-19","2025-05-19","P",null,"P02","Balatas y Pastillas"],
  [30,"SSYL78","","2025-06-05","2025-06-05","P",null,"P01","2 Juegos de Pastillas"],
  [31,"SSYL78","","2025-06-05","2025-06-05","P",null,"P02","Cambio de Aceite y Filtros"],
  [32,"KWJV95","","2025-06-23","2025-06-23","P",null,"P04","Regulación de Cambios"],
  [33,"STFG40","","2025-07-07","2025-07-07","P",null,"P01","Cambio de Aceite y Filtros"],
  [37,"STFG40","Juan Nuñez","2025-08-10","2025-08-10","P",null,"P01","Cambio de Aceite y Filtros"],
  [40,"LPKF87","","2025-08-18","2025-08-18","P",147980,"P01","Cambio de Aceite y Filtros"],
  [43,"STFG41","RECC (Rodrigo Caro)","2025-08-21","","P",null,"P00","Scanner, diagnóstico y reparación ENG SYS/ENG OIL, trabajo en terreno"],
  [46,"LPKF87","Juan Nuñez","2025-08-24","2025-08-24","P",null,"P01","Servicio de lubricación, cambio de aceite motor y filtros (aire, aceite)"],
  [47,"LPKF87","Juan Nuñez","2025-08-24","2025-08-24","P",null,"P02","Reparar frenos traseros, cambio patines de freno, retenes, engrase de rodamientos, regulación freno de mano, cambio pastillas de freno y vieletas"],
  [48,"LPKF87","Juan Nuñez","2025-08-24","2025-08-24","C",null,"C07","Desmontar caja de cambio, cambio kit de embrague, disco, prensa y rodamientos, cambio kit distribución, correa alternador y rodamiento guía"],
  [50,"STFG41","RECC (Rodrigo Caro)","2025-09-04","","P",null,"P00","Scanner, cambio kit filtro PCV, trabajo en terreno (El Salto)"],
  [52,"SSYL59","","2025-09-08","2025-09-08","P",49050,"P01","Cambio de Aceite y Filtros"],
  [53,"STFG40","Juan Nuñez","2025-09-11","2025-09-11","P",null,"P02","Cambio de Pastillas de Freno Traseras y Delanteras"],
  [54,"KWJV95","Juan Nuñez","2025-09-11","2025-09-11","P",null,"P06","Desmontar caja de cambio, cambio de caja, cambio de aceite caja, chequeo general"],
  [55,"STFF54","Juan Nuñez","2025-09-11","2025-09-11","P",null,"P02","Cambio de Pastillas de Freno Traseras y Delanteras"],
  [56,"SSYL59","Juan Nuñez","2025-09-11","2025-09-11","P",49054,"P01","Cambio de Aceite y Filtros"],
  [57,"RFBF71","Juan Nuñez","2025-09-12","2025-09-12","P",null,"P01","Cambio de Aceite y Filtros"],
  [58,"STFF54","Juan Nuñez","2025-09-22","2025-09-22","P",null,"P01","Cambio de Aceite y Filtros"],
  [59,"STFF53","Juan Nuñez","2025-09-22","2025-09-22","P",null,"P01","Cambio de Aceite y Filtros"],
  [61,"RFBF71","Juan Nuñez","2025-10-03","2025-10-03","P",159850,"P01","Cambio de Aceite y Filtros"],
  [62,"STFF54","Juan Nuñez","2025-10-03","2025-10-03","P",47219,"P01","Cambio de Aceite y Filtros"],
  [63,"STFF53","Juan Nuñez","2025-10-03","2025-10-03","P",73023,"P01","Cambio de Aceite y Filtros"],
  [64,"STFF53","Juan Nuñez","2025-10-03","2025-10-03","P",73023,"P02","Cambio de Pastillas de Freno Traseras y Delanteras"],
  [66,"STFG41","Juan Nuñez","2025-10-03","2025-10-03","P",60507,"P01","Cambio de Aceite y Filtros"],
  [69,"STFG52","Juan Nuñez","2025-10-03","2025-10-03","P",64394,"P01","Cambio de Aceite y Filtros"],
  [70,"SSYL80","Juan Nuñez","2025-10-04","2025-10-04","P",null,"P01","Cambio de Aceite y Filtros"],
  [75,"SSYL80","RECC (Rodrigo Caro)","2025-10-09","2025-10-09","P",37558,"P00","Scanner, cambio kit filtro PCV"],
  [77,"SSYL78","Juan Nuñez","2025-10-09","2025-10-09","P",null,"P02","Pastillas de Freno"],
  [78,"STFF53","Juan Nuñez","2025-10-13","2025-10-13","P",74368,"P02","Cambio de Pastillas de Freno Traseras y Delanteras"],
  [79,"STFG40","Juan Nuñez","2025-10-14","2025-10-14","P",80412,"P01","Cambio de Aceite y Filtros"],
  [80,"RFBF71","Juan Nuñez","2025-10-16","2025-10-16","P",160800,"P00","Chequeo general"],
  [82,"STFF53","Juan Nuñez","2025-10-16","2025-10-16","P",80403,"P01","Cambio de Aceite y Filtros"],
  [83,"SSYL78","Juan Nuñez","2025-11-05","2025-11-05","P",38405,"P01","Cambio de Aceite y Filtros"],
  [84,"STFF52","Juan Nuñez","2025-11-11","2025-11-11","P",82000,"P01","Cambio de Aceite y Filtros"],
  [85,"KWJV95","Juan Nuñez","2025-11-12","2025-11-12","P",93360,"P01","Cambio de Aceite y Filtros"],
  [86,"KWJV95","Juan Nuñez","2025-11-12","2025-11-12","P",93360,"P03","Cambio de bieletas"],
  [89,"RFBF71","Juan Nuñez","2025-11-25","2025-11-25","P",null,"P02","Cambio de Pastillas de Freno Traseras y Delanteras"],
  [90,"LPKF87","Juan Nuñez","2026-01-24","2026-01-24","P",158162,"P01","Cambio de Aceite y Filtros"],
  [91,"STFG41","Juan Nuñez","2026-02-26","2026-02-26","P",72101,"P01","Cambio de Aceite y Filtros"],
  [92,"SSYL80","Juan Nuñez","2026-03-03","2026-03-03","P",48150,"P01","Cambio de Aceite y Filtros"],
  [93,"STFF54","Juan Nuñez","2026-03-07","2026-03-07","P",53265,"P01","Cambio de Aceite y Filtros"],
  [94,"STFF52","Juan Nuñez","2026-03-20","2026-03-20","P",94900,"P01","Cambio de Aceite y Filtros"],
  [95,"STFG40","Juan Nuñez","2026-03-23","2026-03-23","P",91662,"P01","Cambio de Aceite y Filtros"],
  [96,"SSYL59","Juan Nuñez","2026-03-24","2026-03-24","P",60907,"P01","Cambio de Aceite y Filtros"],
  [97,"RFBF71","Juan Nuñez","","","P",175167,"P01","Cambio de Aceite y Filtros"],
  [100,"STFG52","Juan Nuñez","","","P",76112,"P01","Cambio de Aceite y Filtros"],
  [101,"VRWD44","RECC (Rodrigo Caro)","2026-04-23","2026-04-23","P",null,"P01",""],
  [102,"VRWD33","RECC (Rodrigo Caro)","2026-04-23","2026-04-23","P",null,"P01",""],
  [103,"STFF52","RECC (Rodrigo Caro)","2026-04-23","2026-04-23","C",null,"C01",""],
  [104,"SSYL80","RECC (Rodrigo Caro)","2026-04-23","2026-04-23","P",null,"P01","Scanner y cambio de sensores DPF","Escáner y Reparación de Códigos y/o Filtros"],
  [105,"SSYL80","RECC (Rodrigo Caro)","2026-04-23","2026-04-23","C",null,"C01","Cambio de DPF"],
  [106,"VRWD34","RECC (Rodrigo Caro)","2026-04-30","2026-04-30","P",null,"P01",""],
  [107,"VRWD44","RECC (Rodrigo Caro)","2026-04-30","2026-04-30","P",null,"P01",""],
  [108,"VRWD33","RECC (Rodrigo Caro)","2026-04-30","2026-04-30","P",null,"P01",""],
  [109,"STFF53","RECC (Rodrigo Caro)","2026-05-19","2026-05-19","C",null,"C01","Reparación DPF y reparación de bocina"],
  [110,"SSYL59","RECC (Rodrigo Caro)","2026-05-19","2026-05-19","C",null,"C01","Reparación DPF"],
  [111,"SSYL59","Juan Nuñez","2026-05-24","2026-05-24","C",63180,"C02","Cambio pastillas de freno delantera, cambio pastillas de freno trasera"],
  [112,"SSYL78","Juan Nuñez","2026-05-24","2026-05-24","C",47774,"C02","Cambio pastillas de freno delantera"],
  [113,"RFBF71","Juan Nuñez","2026-05-24","2026-05-24","P",189934,"P01","Servicio de lubricación, cambio de aceite motor y filtros"],
  [114,"LPKF87","RECC (Rodrigo Caro)","2026-05-28","2026-05-28","C",null,"C02","Cambio travesaño soporte cremallera de dirección","Sistema de Dirección y caja de Dirección"],
  [115,"SSYL78","RECC (Rodrigo Caro)","2026-05-28","2026-05-28","C",null,"C01","Scanner y diagnóstico, desmontado lavado químico manual de DPF"],
  [116,"LPKF87","Juan Nuñez","2026-05-29","2026-05-29","P",null,"P01","Balanceo y alineación preventivo","Sistema de Dirección y caja de Dirección"],
  [117,"RFBF71","Juan Nuñez","2026-05-27","2026-05-27","P",189934,"P01","Cambio de Aceite y Filtros"],
  [118,"KWJV95","Juan Nuñez","2026-05-27","2026-05-27","P",102456,"P01","Cambio de Aceite y Filtros"],
  [119,"KWJV95","Juan Nuñez","2026-06-09","2026-06-09","P",102556,"P01","Cambio de kit de embrague"],
  [122,"STFF53","Juan Nuñez","2026-06-14","2026-06-14","P",90629,"P01","Cambio de Aceite y Filtros"],
  [123,"SSYL78","Juan Nuñez","2026-06-14","2026-06-14","P",49464,"P01","Cambio de Aceite y Filtros"],
  [124,"SSYL80","RECC (Rodrigo Caro)","2026-06-24","2026-06-24","P",55000,"P01","Cambio de Aceite y Filtros"],
  [125,"SSYL59","RECC (Rodrigo Caro)","2026-08-06","2026-08-06","C",null,"C01","Parches de fibra de vidrio y reparación interna",""],
  [126,"STFG40","RECC (Rodrigo Caro)","2026-08-06","2026-08-06","P",null,"P01","Escáner y diagnóstico","Escáner y Reparación de Códigos y/o Filtros"],
  [127,"SSYL78","Juan Nuñez","2026-08-21","2026-08-21","P",49464,"P01","Se rellenó aceite el día 20 de agosto"]
];

const PAQUETES = {
  P00: "Escáner y Reparación de Códigos y/o Filtros", P01: "Aceite y Filtros (Racor, Aceite, Polen, Petróleo, Aire)",
  P02: "Sistema de Frenos (Discos, Pastillas, Líquido de Freno)", P03: "Suspensión (Amortiguadores, Resortes y Componentes)",
  P04: "Sistema de Dirección y caja de Dirección", P06: "Caja de Cambios (Aceite y Funcionamiento)",
  C01: "Escáner y Reparación de Códigos y/o Filtros", C02: "Sistema de Frenos (Discos, Pastillas, Líquido de Freno)",
  C05: "Inyectores, Cilindros, Bujías, Bobinas", C07: "Falla de Transmisión", C08: "Falla de Frenos (Freno de Mano o Principales)",
  C09: "Fugas (Hidráulica o de Combustible)"
};
const TIPOS = { semanal: "Auditoría semanal", auditoria: "Auditoría mensual", mantencion: "Mantención", preventiva: "Mant. preventiva", correctiva: "Mant. correctiva", falla: "Falla", aceite: "Cambio de aceite", odometro: "Lectura de odómetro" };
const FILTROS = [["fAceite", "Filtro de aceite"], ["fAire", "Filtro de aire"], ["fComb", "Filtro de combustible"], ["fSep", "Separador de agua"]];
const DOCS = [["vRevision", "Revisión técnica", "rtFecha"], ["vPermiso", "Permiso de circulación", "permisoFecha"], ["vSoap", "SOAP"], ["vExtintor", "Extintor"]];
const LIMPIEZA = [["cabina", "Cabina"], ["caja", "Caja frigorífica"], ["exterior", "Exterior"], ["seguridad", "Elementos de seguridad"]];

function onOpen() {
  SpreadsheetApp.getUi().createMenu("Bitácora").addItem("Instalar o actualizar", "instalar").addToUi();
}

/** Crea el código de acceso y el PIN, carga la flota y el historial y arma las hojas. Se puede repetir sin perder datos. */
function instalar() {
  const cfg = config();
  const datos = leer();
  const p = PropertiesService.getScriptProperties();
  if (p.getProperty("VERSION_DATOS") !== VERSION_DATOS) { migrarFlota(datos); p.setProperty("VERSION_DATOS", VERSION_DATOS); }
  importarHistorial(datos);
  guardar(datos);
  reconstruir(datos);
  escribirConfig(cfg);
}

const norm = p => String(p || "").toUpperCase().replace(/[^A-Z0-9]/g, "");

function migrarFlota(datos) {
  FLOTA_INICIAL.forEach(f => {
    const c = datos.camiones.find(x => x.id === f.id || norm(x.patente) === f.patente || (f.patente === "LPKF87" && norm(x.patente) === "LRTF87"));
    if (!c) { datos.camiones.push(Object.assign({}, f, { creado: Date.now() })); return; }
    ["patente", "codigoAnterior", "rtFecha", "vRevision", "permisoFecha", "vPermiso"].forEach(k => { if (f[k] !== undefined) c[k] = f[k]; });
    ["interno", "marca", "modelo", "anio", "tipoCamion", "intervalo"].forEach(k => { if (c[k] === undefined || c[k] === "") c[k] = f[k]; });
  });
  datos.camiones = datos.camiones.filter(c => BAJAS.indexOf(norm(c.patente)) < 0);
}

function importarHistorial(datos) {
  const ids = {}; datos.registros.forEach(r => { ids[r.id] = true; });
  HISTORIAL.forEach(h => {
    const id = "hist-" + h[0];
    if (ids[id]) return;
    const c = datos.camiones.find(x => norm(x.patente) === h[1]);
    if (!c) return;
    datos.registros.push({ id: id, creado: Date.now(), tipo: "mantencion", camionId: c.id, patente: h[1], taller: h[2], fecha: h[3], fechaSalida: h[4],
      tipoMant: h[5] === "C" ? "Correctivo" : "Preventivo", km: h[6], paquete: (h[5] === "C" ? "Correctivo " : "Preventivo ") + h[7].slice(1),
      servicio: h.length > 9 ? h[9] : PAQUETES[h[7]] || "", descripcion: h[8], estado: "Cerrado", origen: "Planilla Estado de Flota (fila " + h[0] + ")" });
  });
}

function config() {
  const p = PropertiesService.getScriptProperties();
  if (!p.getProperty("CODIGO")) {
    const letras = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // sin 0/O ni 1/I para que no se confundan
    let c = ""; for (let i = 0; i < 6; i++) c += letras.charAt(Math.floor(Math.random() * letras.length));
    p.setProperty("CODIGO", c);
  }
  if (!p.getProperty("PIN")) p.setProperty("PIN", String(Math.floor(Math.random() * 1e6)).padStart(6, "0"));
  return { codigo: p.getProperty("CODIGO"), pin: p.getProperty("PIN") };
}

function escribirConfig(cfg) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const h = ss.getSheetByName(HOJA_CONFIG) || ss.insertSheet(HOJA_CONFIG);
  const url = ScriptApp.getService().getUrl();
  const falta = "Primero implementa el script como aplicación web (paso 2) y vuelve a usar Bitácora → Instalar o actualizar.";
  const panel = url ? url + "?vista=panel&c=" + cfg.codigo : falta;
  h.clear();
  h.getRange(1, 1, 9, 2).setValues([
    ["Bitácora de Flota", ""],
    ["Link para los celulares (pégalo en la app: Ajustes y conexión)", url ? url + "?c=" + cfg.codigo : falta],
    ["Panel web (ábrelo en el navegador o incrústalo en Odoo)", panel],
    ["Código para incrustar el panel en Odoo (bloque «Código incrustado» del sitio web)", url ? '<iframe src="' + panel + '" style="width:100%;height:1600px;border:0"></iframe>' : falta],
    ["Datos en JSON para otros programas (Odoo, Power BI…)", url ? url + "?vista=json&c=" + cfg.codigo : falta],
    ["Código de acceso", cfg.codigo],
    ["PIN de administrador (agrega y edita camiones; no lo compartas)", cfg.pin],
    ["Para cambiar el código o el PIN", "Apps Script → Configuración del proyecto → Propiedades del script: CODIGO y PIN"],
    ["Para abrir en Excel", "Archivo → Descargar → Microsoft Excel (.xlsx)"]
  ]);
  h.getRange("A1").setFontSize(14).setFontWeight("bold");
  h.getRange("A2:A9").setFontWeight("bold");
  h.setColumnWidth(1, 420); h.setColumnWidth(2, 720);
  h.getRange("B2:B9").setWrap(true);
}

/* ---------- Comunicación con la app y con otros programas ---------- */
function doGet(e) {
  const q = (e && e.parameter) || {};
  if (q.vista === "panel" || q.vista === "json") {
    if (!igual(q.c, config().codigo)) {
      Utilities.sleep(1000);
      return q.vista === "json" ? salida({ error: "codigo" })
        : HtmlService.createHtmlOutput("<p style='font:16px system-ui;padding:24px'>Falta el código de acceso en el link (…&amp;c=CODIGO). Cópialo de la hoja Configuración.</p>");
    }
    const r = resumen(leer());
    if (q.vista === "json") return salida(r);
    const datosJs = JSON.stringify(r).replace(/</g, "\\u003c"), codigoJs = JSON.stringify(String(q.c)).replace(/</g, "\\u003c");
    const html = PANEL_HTML.replace("__DATOS__", () => datosJs).replace("__CODIGO__", () => codigoJs);
    return HtmlService.createHtmlOutput(html).setTitle("Panel de Flota")
      .addMetaTag("viewport", "width=device-width, initial-scale=1")
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }
  return salida({ app: "bitacora-flota" });
}

/** El panel lo llama para actualizarse sin recargar la página. */
function datosPanel(codigo) {
  if (!igual(codigo, config().codigo)) throw new Error("Código de acceso incorrecto");
  return resumen(leer());
}

function doPost(e) {
  let req;
  try { req = JSON.parse(e.postData.contents); } catch (err) { return salida({ error: "formato" }); }
  const cfg = config();
  const codigoOk = igual(req.codigo, cfg.codigo);
  if (req.accion === "estado") return salida({ app: "bitacora-flota", codigoOk: codigoOk });
  if (!codigoOk) { Utilities.sleep(1000); return salida({ error: "codigo" }); }
  const admin = igual(req.pin, cfg.pin);
  if (req.accion === "admin") { if (!admin) Utilities.sleep(1000); return salida({ ok: admin }); }
  if (req.accion !== "sync") return salida({ error: "accion" });

  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const datos = leer();
    let rechazados = 0;
    const cambios = Array.isArray(req.cambios) ? req.cambios : [];
    cambios.forEach(c => {
      if (COLECCIONES.indexOf(c.col) < 0) return;
      if (c.col === "camiones" && !admin) { rechazados++; return; } // solo el administrador toca camiones
      const arr = datos[c.col];
      const id = c.op === "set" ? c.doc && c.doc.id : c.id;
      if (typeof id !== "string") return;
      const i = arr.findIndex(x => x.id === id);
      if (c.op === "set") { if (i >= 0) arr[i] = c.doc; else arr.push(c.doc); }
      else if (c.op === "delete" && i >= 0) arr.splice(i, 1);
    });
    if (cambios.length) { guardar(datos); reconstruir(datos); }
    return salida({
      datos: datos, admin: admin, rechazados: rechazados,
      planilla: { planilla: SpreadsheetApp.getActiveSpreadsheet().getUrl(), ultima: Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd'T'HH:mm:ss"), pendiente: false }
    });
  } catch (err) {
    return salida({ error: "interno", mensaje: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function salida(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function igual(dado, esperado) {
  return typeof dado === "string" && !!esperado && dado.trim().toUpperCase() === String(esperado).toUpperCase();
}

/* ---------- Datos (hoja oculta _datos: colección | id | json) ---------- */
function hojaDatos() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let h = ss.getSheetByName(HOJA_DATOS);
  if (!h) { h = ss.insertSheet(HOJA_DATOS); h.hideSheet(); }
  return h;
}

function leer() {
  const datos = { camiones: [], registros: [] };
  const h = hojaDatos();
  if (h.getLastRow() < 1) return datos;
  h.getRange(1, 1, h.getLastRow(), 3).getValues().forEach(f => {
    if (!datos[f[0]]) return;
    try { datos[f[0]].push(JSON.parse(f[2])); } catch (err) { /* fila dañada: se ignora */ }
  });
  return datos;
}

function guardar(datos) {
  const h = hojaDatos();
  const filas = [];
  COLECCIONES.forEach(col => datos[col].forEach(x => filas.push([col, x.id, JSON.stringify(x)])));
  h.clearContents();
  if (filas.length) h.getRange(1, 1, filas.length, 3).setValues(filas);
}

/* ---------- Cálculos (los mismos que muestra la app) ---------- */
function fecha(s) {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(s || "");
  return m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : "";
}
function patente(p) { return (norm(p).match(/.{1,2}/g) || []).join("·"); }
function n(v) { return typeof v === "number" && isFinite(v) ? v : null; }
function v(x) { return x === null || x === undefined ? "" : x; }
function sn(b) { return b ? "Sí" : "No"; }
// Orden de los N°: primero los números (1, 2… 815), después los que tienen letras
function claveInterno(c) { const m = /^([A-Z]*)(\d+)$/i.exec(String(c.interno || "")); return m ? [m[1].toUpperCase(), Number(m[2])] : ["~", 0]; }
function ordenInterno(a, b) { const x = claveInterno(a), y = claveInterno(b); return x[0].localeCompare(y[0]) || x[1] - y[1] || norm(a.patente).localeCompare(norm(b.patente)); }

function titulo(r) {
  const fallas = r.fallas ? " · " + r.fallas + " falla" + (r.fallas === 1 ? "" : "s") : "";
  switch (r.tipo) {
    case "semanal": return "Auditoría semanal" + fallas + (r.limpieza ? " · limpieza " + resumenLimpieza(r.limpieza) : "");
    case "auditoria": return "Auditoría mensual" + fallas + " · " + (r.deshielo ? (r.deshieloHecho ? "deshielo hecho" : "necesita deshielo") : "sin deshielo");
    case "mantencion": return (r.paquete || "Mantención") + (r.servicio ? " · " + r.servicio : "");
    case "preventiva": return r.servicio || "Mantención preventiva";
    case "correctiva": return (r.sistema || "Correctiva") + (r.causa ? ": " + r.causa : "");
    case "falla": return "Falla " + String(r.severidad || "").toLowerCase() + " · " + (r.sistema || "");
    case "aceite": return "Aceite " + (r.tipoAceite || "") + (r.litros ? " · " + r.litros + " L" : "");
    case "odometro": return "Lectura de odómetro" + (r.horometro ? " · " + r.horometro + " h" : "");
  }
  return TIPOS[r.tipo] || r.tipo || "";
}
function resumenLimpieza(l) {
  const vals = LIMPIEZA.map(([k]) => l[k]).filter(Boolean);
  const mal = vals.filter(x => x === "Mal").length, reg = vals.filter(x => x === "Regular").length;
  return mal ? mal + " mal" : reg ? reg + " regular" : vals.length ? "bien" : "";
}

function calculos(d) {
  const camiones = {}; d.camiones.forEach(c => { camiones[c.id] = c; });
  const regs = d.registros.slice().sort((a, b) => (b.fecha || "").localeCompare(a.fecha || "") || (b.km || 0) - (a.km || 0) || (b.creado || 0) - (a.creado || 0));
  const hoy = new Date(); hoy.setHours(0, 0, 0, 0);
  const de = (cid, tipo) => regs.find(r => r.camionId === cid && r.tipo === tipo);
  const C = {
    camiones: camiones, regs: regs, hoy: hoy, de: de,
    abiertas: cid => regs.filter(r => r.camionId === cid && r.tipo === "falla" && r.estado !== "Cerrado"),
    kmDe: c => { let m = n(c.km); regs.forEach(r => { if (r.camionId === c.id && n(r.km) !== null && (m === null || r.km > m)) m = r.km; }); return m; },
    horoDe: c => { let m = n(c.horometro); regs.forEach(r => { if (r.camionId === c.id && n(r.horometro) !== null && (m === null || r.horometro > m)) m = r.horometro; }); return m; },
    // Un vencimiento actualizado en la auditoría mensual manda sobre el de la ficha
    docDe: (c, k) => { const a = regs.find(r => r.camionId === c.id && r.tipo === "auditoria" && r[k]); return a ? a[k] : c[k] || ""; },
    estadoDoc: s => {
      const f = fecha(s); if (!f) return { estado: "Sin dato", nivel: "info", dias: null };
      const dias = Math.round((f - hoy) / 864e5);
      return dias < 0 ? { estado: "Vencido", nivel: "bad", dias: dias } : dias <= 30 ? { estado: "Por vencer", nivel: "warn", dias: dias } : { estado: "Vigente", nivel: "ok", dias: dias };
    },
    pat: r => patente((camiones[r.camionId] || {}).patente || r.patente),
    interno: r => (camiones[r.camionId] || {}).interno || "",
    vehiculo: r => { const c = camiones[r.camionId] || {}; return [c.marca, c.modelo].filter(Boolean).join(" "); }
  };
  C.aceite = c => {
    const u = de(c.id, "aceite");
    if (!u || n(u.proximoKm) === null) return { u: u, rest: null, estado: "Sin registro" };
    const rest = u.proximoKm - (C.kmDe(c) || 0);
    return { u: u, rest: rest, estado: rest <= 0 ? "Vencido" : rest <= 1500 ? "Por vencer" : "Al día" };
  };
  C.mantencion = c => {
    const u = regs.find(r => r.camionId === c.id && r.tipo === "auditoria" && n(r.proximaMant) !== null);
    if (!u) return { prox: null, falta: null, nivel: "info" };
    const falta = u.proximaMant - (C.kmDe(c) || 0);
    return { prox: u.proximaMant, falta: falta, nivel: falta <= 0 ? "bad" : falta <= 1000 ? "warn" : "ok" };
  };
  C.deshielo = c => { const a = de(c.id, "auditoria"); return !!(a && a.deshielo && !a.deshieloHecho); };
  C.estado = c => {
    const f = C.abiertas(c.id);
    if (f.some(x => x.detenido)) return "Detenido";
    const mt = C.mantencion(c);
    const docMal = DOCS.some(([k]) => C.estadoDoc(C.docDe(c, k)).nivel === "bad");
    if (f.length || ["Vencido", "Por vencer"].indexOf(C.aceite(c).estado) >= 0 || docMal || C.deshielo(c) || mt.nivel === "bad") return "Revisar";
    return "Operativo";
  };
  // Las mantenciones antiguas (preventiva/correctiva del administrador) se muestran con las columnas de la planilla de mantenciones
  C.mantenciones = () => regs.filter(r => ["mantencion", "preventiva", "correctiva"].indexOf(r.tipo) >= 0).map(r => ({
    fecha: r.fecha || "", salida: r.fechaSalida || (r.tipo !== "mantencion" ? r.cerrado || "" : ""), interno: C.interno(r), patente: C.pat(r), camionId: r.camionId,
    taller: r.taller || "", tipo: r.tipoMant || (r.tipo === "correctiva" ? "Correctivo" : "Preventivo"), km: n(r.km),
    paquete: r.paquete || "", servicio: r.servicio || r.sistema || "", obs: [r.descripcion, r.causa, r.repuestos].filter(Boolean).join(" · "), origen: r.origen || "App"
  }));
  return C;
}

/** Lo que muestra el panel web y entrega ?vista=json. */
function resumen(d) {
  const C = calculos(d);
  const camiones = d.camiones.slice().sort(ordenInterno).map(c => {
    const sem = C.de(c.id, "semanal"), men = C.de(c.id, "auditoria"), mt = C.mantencion(c);
    const doc = k => { const vence = C.docDe(c, k); return Object.assign({ vence: vence }, C.estadoDoc(vence)); };
    return {
      id: c.id, interno: v(c.interno), codigoAnterior: v(c.codigoAnterior), patente: patente(c.patente), vehiculo: [c.marca, c.modelo].filter(Boolean).join(" "), anio: v(c.anio), tipo: v(c.tipoCamion),
      km: C.kmDe(c), proxMant: mt.prox, faltaMant: mt.falta, mantNivel: mt.nivel,
      rt: Object.assign(doc("vRevision"), { fecha: v(c.rtFecha) }), permiso: Object.assign(doc("vPermiso"), { fecha: v(c.permisoFecha) }),
      deshielo: C.deshielo(c), fallasAbiertas: C.abiertas(c.id).length, estado: C.estado(c),
      ultSemanal: sem ? { fecha: sem.fecha, responsable: v(sem.responsable), limpieza: sem.limpieza || {} } : null,
      ultMensual: men ? { fecha: men.fecha, responsable: v(men.responsable) } : null
    };
  });
  const lim = (s, k) => { const f = fecha(s); return f && (C.hoy - f) / 864e5 <= k; };
  const docs = camiones.reduce((a, c) => { [c.rt, c.permiso].forEach(x => { if (x.nivel === "bad") a.vencidos++; else if (x.nivel === "warn") a.porVencer++; }); return a; }, { vencidos: 0, porVencer: 0 });
  return {
    actualizado: Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm"),
    kpi: {
      total: camiones.length, operativos: camiones.filter(c => c.estado === "Operativo").length, revisar: camiones.filter(c => c.estado === "Revisar").length,
      detenidos: camiones.filter(c => c.estado === "Detenido").length, fallas: camiones.reduce((a, c) => a + c.fallasAbiertas, 0),
      docsVencidos: docs.vencidos, docsPorVencer: docs.porVencer, deshielo: camiones.filter(c => c.deshielo).length,
      mantencion: camiones.filter(c => c.mantNivel === "bad" || c.mantNivel === "warn").length,
      semanalAlDia: camiones.filter(c => c.ultSemanal && lim(c.ultSemanal.fecha, 7)).length,
      mensualAlDia: camiones.filter(c => c.ultMensual && lim(c.ultMensual.fecha, 31)).length
    },
    camiones: camiones,
    fallas: C.regs.filter(r => r.tipo === "falla").map(r => ({ fecha: r.fecha, interno: C.interno(r), patente: C.pat(r), camionId: r.camionId, sistema: v(r.sistema), descripcion: v(r.descripcion),
      detenido: !!r.detenido, estado: v(r.estado), origen: r.origen || "Registro", responsable: v(r.responsable) })),
    mantenciones: C.mantenciones(),
    auditorias: C.regs.filter(r => r.tipo === "semanal" || r.tipo === "auditoria").slice(0, 400).map(r => ({ fecha: r.fecha, tipo: r.tipo === "semanal" ? "Semanal" : "Mensual",
      interno: C.interno(r), patente: C.pat(r), camionId: r.camionId, km: n(r.km), responsable: v(r.responsable), detalle: titulo(r), fallasResumen: v(r.fallasResumen) }))
  };
}

/* ---------- Hojas de la planilla ---------- */
function reconstruir(d) {
  const C = calculos(d), regs = C.regs;
  const base = r => [fecha(r.fecha), C.pat(r), v(r.km)];
  const hojas = [];
  hojas.push(["Flota", ["N° interno", "Patente", "Tipo", "Marca", "Modelo", "Año", "Odómetro (km)", "Próxima mantención (km)", "Km para mantención", "Necesita deshielo", "Vence revisión técnica", "Vence permiso de circulación",
    "Última auditoría semanal", "Última auditoría mensual", "Responsable última auditoría", "Fallas abiertas", "Estado", "Código anterior",
    "Horómetro (h)", "Conductor", "Faena / centro de costo", "Intervalo aceite (km)", "Último cambio aceite", "Próximo cambio aceite (km)", "Estado aceite", "Vence SOAP", "Vence extintor",
    "Color", "VIN / N° chasis", "N° motor", "Estanque (L)", "Neumáticos", "Notas"],
    d.camiones.slice().sort(ordenInterno).map(c => {
      const a = C.aceite(c), sem = C.de(c.id, "semanal"), men = C.de(c.id, "auditoria"), mt = C.mantencion(c), ult = [sem, men].filter(Boolean).sort((x, y) => (y.fecha || "").localeCompare(x.fecha || ""))[0];
      return [v(c.interno), patente(c.patente), v(c.tipoCamion), v(c.marca), v(c.modelo), v(c.anio), v(C.kmDe(c)), v(mt.prox), v(mt.falta), men ? sn(C.deshielo(c)) : "",
        fecha(C.docDe(c, "vRevision")), fecha(C.docDe(c, "vPermiso")), sem ? fecha(sem.fecha) : "", men ? fecha(men.fecha) : "", ult ? v(ult.responsable) : "", C.abiertas(c.id).length, C.estado(c), v(c.codigoAnterior),
        v(C.horoDe(c)), v(c.conductor), v(c.faena), v(c.intervalo), a.u ? fecha(a.u.fecha) : "", a.u ? v(a.u.proximoKm) : "", a.estado, fecha(C.docDe(c, "vSoap")), fecha(C.docDe(c, "vExtintor")),
        v(c.color), v(c.vin), v(c.motor), v(c.estanque), v(c.neumaticos), v(c.notas)];
    })]);
  hojas.push(["Documentos", ["N° interno", "Patente", "Vehículo", "Revisión técnica: fecha", "Revisión técnica: vence", "Revisión técnica: estado", "Días", "Permiso de circulación: fecha", "Permiso de circulación: vence", "Permiso: estado", "Días "],
    d.camiones.slice().sort(ordenInterno).map(c => {
      const rt = C.docDe(c, "vRevision"), pe = C.docDe(c, "vPermiso"), ert = C.estadoDoc(rt), epe = C.estadoDoc(pe);
      return [v(c.interno), patente(c.patente), [c.marca, c.modelo].filter(Boolean).join(" "), fecha(c.rtFecha) || v(c.rtFecha), fecha(rt), ert.estado, v(ert.dias), fecha(c.permisoFecha) || v(c.permisoFecha), fecha(pe), epe.estado, v(epe.dias)];
    })]);
  hojas.push(["Auditorías semanales", ["Fecha", "N° interno", "Patente", "Vehículo", "Odómetro (km)", "Responsable", ...LIMPIEZA.map(([, l]) => l), "Fallas reportadas", "Detalle de fallas", "Observaciones"],
    regs.filter(r => r.tipo === "semanal").map(r => [fecha(r.fecha), C.interno(r), C.pat(r), C.vehiculo(r), v(r.km), v(r.responsable), ...LIMPIEZA.map(([k]) => v((r.limpieza || {})[k])), r.fallas || 0, v(r.fallasResumen), v(r.descripcion)])]);
  hojas.push(["Auditorías mensuales", ["Fecha", "N° interno", "Patente", "Vehículo", "Odómetro (km)", "Próxima mantención (km)", "Km para mantención", "Responsable", "Necesita deshielo", "Deshielo realizado",
    "Vence revisión técnica", "Vence permiso de circulación", "Mantenciones informadas", "Fallas reportadas", "Detalle de fallas"],
    regs.filter(r => r.tipo === "auditoria").map(r => [fecha(r.fecha), C.interno(r), C.pat(r), C.vehiculo(r), v(r.km), v(r.proximaMant),
      n(r.proximaMant) !== null && n(r.km) !== null ? r.proximaMant - r.km : "", v(r.responsable), sn(r.deshielo), fecha(r.deshieloHecho), fecha(r.vRevision), fecha(r.vPermiso), r.mantenciones || 0, r.fallas || 0, v(r.fallasResumen)])]);
  hojas.push(["Mantenciones", ["N° interno", "Patente", "Taller", "Fecha entrada", "Fecha salida", "Tipo", "Kilometraje del odómetro", "Paquete de mantenimiento", "Servicios de mantenimiento", "Causas y observaciones", "Origen"],
    C.mantenciones().map(m => [m.interno, m.patente, m.taller, fecha(m.fecha), fecha(m.salida), m.tipo, v(m.km), m.paquete, m.servicio, m.obs, m.origen])]);
  hojas.push(["Fallas", ["Fecha", "N° interno", "Patente", "Odómetro (km)", "Reportado por", "Origen", "Sistema", "Severidad", "Camión detenido", "Estado", "Fecha cierre", "Descripción"],
    regs.filter(r => r.tipo === "falla").map(r => [fecha(r.fecha), C.interno(r), C.pat(r), v(r.km), v(r.responsable), r.origen || "Registro", v(r.sistema), v(r.severidad), sn(r.detenido), v(r.estado), fecha(r.cerrado), v(r.descripcion)])]);
  hojas.push(["Cambios de aceite", ["Fecha", "Patente", "Odómetro (km)", "Responsable", "Aceite", "Litros", ...FILTROS.map(([, l]) => l), "Próximo cambio (km)", "Costo CLP", "Observaciones"],
    regs.filter(r => r.tipo === "aceite").map(r => [...base(r), v(r.responsable), v(r.tipoAceite), v(r.litros), ...FILTROS.map(([k]) => sn(r[k])), v(r.proximoKm), v(r.costo), v(r.descripcion)])]);
  hojas.push(["Odómetro", ["Fecha", "Patente", "Odómetro (km)", "Horómetro (h)", "Responsable", "Observaciones"],
    regs.filter(r => r.tipo === "odometro").map(r => [...base(r), v(r.horometro), v(r.responsable), v(r.descripcion)])]);
  hojas.push(["Todos los registros", ["Fecha", "Tipo", "N° interno", "Patente", "Odómetro (km)", "Responsable", "Detalle", "Estado", "Costo CLP", "Observaciones"],
    regs.map(r => [fecha(r.fecha), TIPOS[r.tipo] || v(r.tipo), C.interno(r), C.pat(r), v(r.km), v(r.responsable), titulo(r), v(r.estado), v(r.costo), v(r.descripcion)])]);

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ["Auditorías", "Preventivas", "Correctivas"].forEach(nombre => { const h = ss.getSheetByName(nombre); if (h) ss.deleteSheet(h); }); // reemplazadas por las hojas de arriba
  hojas.forEach(([nombre, cab, filas], i) => {
    const h = ss.getSheetByName(nombre) || ss.insertSheet(nombre, i);
    if (h.getFilter()) h.getFilter().remove();
    h.clear();
    h.getRange(1, 1, 1, cab.length).setValues([cab]).setFontWeight("bold").setBackground("#F2A900").setFontColor("#1D1500").setWrap(true).setVerticalAlignment("middle");
    h.setFrozenRows(1);
    if (filas.length) {
      h.getRange(2, 1, filas.length, cab.length).setValues(filas);
      cab.forEach((t, j) => {
        const col = h.getRange(2, j + 1, filas.length, 1);
        if (/^Fecha|Última auditoría|Último cambio|Vence |vence|: fecha|realizado/.test(t)) col.setNumberFormat("dd-mm-yyyy");
        else if (/Costo/.test(t)) col.setNumberFormat("$#,##0");
        else if (/km|Km|Kilometraje/.test(t)) col.setNumberFormat("#,##0");
      });
      h.getRange(1, 1, filas.length + 1, cab.length).createFilter();
    }
    h.autoResizeColumns(1, cab.length);
  });
  const sobra = ss.getSheetByName("Hoja 1") || ss.getSheetByName("Sheet1");
  if (sobra && sobra.getLastRow() === 0 && ss.getSheets().length > 1) ss.deleteSheet(sobra);
}

/* ---------- Panel web ---------- */
const PANEL_HTML = "<!doctype html>\n<html lang=\"es\">\n<head>\n<meta charset=\"utf-8\">\n<meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n<title>Panel de Flota</title>\n<style>\n/* Panel para mirar la flota de un vistazo (también dentro de Odoo): resumen arriba, tabla de camiones, detalle y listas abajo. */\n:root {\n  --bg: #eef1f4; --surface: #ffffff; --surface-2: #f5f7f9; --ink: #16202b; --muted: #5a6776; --line: #d6dde4;\n  --accent: #f2a900; --accent-ink: #1d1500; --bar: #16202b; --bar-ink: #e9eef3;\n  --ok: #1d7f47; --ok-bg: #e2f3e9; --warn: #9a5c00; --warn-bg: #fdf0d6; --bad: #b8282a; --bad-bg: #fbe3e2; --info: #2b5c8f; --info-bg: #e2ecf6;\n  --f-body: system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n  --f-cond: \"Barlow Condensed\", \"Roboto Condensed\", \"Arial Narrow\", system-ui, sans-serif;\n  --f-mono: ui-monospace, \"SFMono-Regular\", Menlo, Consolas, monospace;\n}\n@media (prefers-color-scheme: dark) {\n  :root { --bg: #0e141b; --surface: #17202a; --surface-2: #1d2833; --ink: #e6ecf2; --muted: #95a3b3; --line: #2a3643; --accent: #ffb81c; --bar: #0a0f15;\n    --ok: #4cc785; --ok-bg: #12301f; --warn: #f2ab45; --warn-bg: #352610; --bad: #f2716d; --bad-bg: #3a1716; --info: #7db3ea; --info-bg: #142a40; color-scheme: dark; }\n}\n* { box-sizing: border-box; }\nbody { margin: 0; background: var(--bg); color: var(--ink); font: 400 14px/1.45 var(--f-body); }\nheader { background: var(--bar); color: var(--bar-ink); padding: 14px max(16px, env(safe-area-inset-left, 0px)); }\n.wrap { max-width: 1400px; margin: 0 auto; padding-left: max(16px, env(safe-area-inset-left, 0px)); padding-right: max(16px, env(safe-area-inset-right, 0px)); }\nheader .wrap { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; padding: 0; }\nh1 { margin: 0; font: 700 22px/1 var(--f-cond); letter-spacing: .03em; text-transform: uppercase; }\n.sub { color: #93a1b1; font-size: 13px; }\n.sp { flex: 1; }\nbutton { font: inherit; color: inherit; }\n.btn { border: 1px solid var(--line); background: var(--surface); border-radius: 8px; padding: 8px 14px; font-weight: 600; cursor: pointer; }\nheader .btn { background: var(--accent); color: var(--accent-ink); border-color: var(--accent); }\nmain { padding-block: 18px 40px; display: grid; gap: 20px; }\nh2 { margin: 0; font: 700 18px/1.1 var(--f-cond); text-transform: uppercase; letter-spacing: .05em; }\n.kpis { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 10px; }\n.kpi { background: var(--surface); border: 1px solid var(--line); border-radius: 10px; padding: 12px 14px; display: grid; gap: 4px; }\n.kpi b { font: 700 28px/1 var(--f-cond); font-variant-numeric: tabular-nums; }\n.kpi span { color: var(--muted); font-size: 12.5px; line-height: 1.25; }\n.kpi.bad b { color: var(--bad); } .kpi.warn b { color: var(--warn); } .kpi.ok b { color: var(--ok); }\n.tools { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }\n.tools input { flex: 1 1 220px; min-height: 38px; padding: 8px 12px; border-radius: 8px; border: 1px solid var(--line); background: var(--surface); color: var(--ink); font: inherit; }\n.chip { border: 1px solid var(--line); background: var(--surface); border-radius: 999px; padding: 7px 12px; font-weight: 600; font-size: 13px; cursor: pointer; }\n.chip[aria-pressed=\"true\"] { background: var(--ink); color: var(--bg); border-color: var(--ink); }\n.card { background: var(--surface); border: 1px solid var(--line); border-radius: 10px; }\n.scroll { overflow-x: auto; }\ntable { border-collapse: collapse; width: 100%; font-size: 13px; }\nth { text-align: left; font-size: 11.5px; text-transform: uppercase; letter-spacing: .05em; color: var(--muted); font-weight: 700; padding: 10px; border-bottom: 1px solid var(--line); white-space: nowrap; position: sticky; top: 0; background: var(--surface); }\ntd { padding: 9px 10px; border-bottom: 1px solid var(--line); vertical-align: top; }\ntr:last-child td { border-bottom: 0; }\ntbody tr.fila { cursor: pointer; } tbody tr.fila:hover { background: var(--surface-2); }\ntbody tr.sel { background: var(--info-bg); }\n.num { font-family: var(--f-mono); font-variant-numeric: tabular-nums; white-space: nowrap; }\n.r { text-align: right; }\n.n { font: 700 16px/1 var(--f-cond); }\n.plate { display: inline-block; background: #fff; color: #111; border: 2px solid #111; border-radius: 4px; padding: 1px 6px; font: 700 12.5px/1.2 var(--f-mono); letter-spacing: .05em; white-space: nowrap; }\n.pill { display: inline-block; font-size: 11.5px; font-weight: 700; padding: 3px 8px; border-radius: 999px; white-space: nowrap; background: var(--surface-2); color: var(--muted); }\n.pill.ok { background: var(--ok-bg); color: var(--ok); } .pill.warn { background: var(--warn-bg); color: var(--warn); } .pill.bad { background: var(--bad-bg); color: var(--bad); } .pill.info { background: var(--info-bg); color: var(--info); }\n.muted { color: var(--muted); } .small { font-size: 12px; }\n.det { padding: 16px; display: grid; gap: 14px; }\n.det-top { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }\n.det-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 10px; }\n.det-grid div { background: var(--surface-2); border-radius: 8px; padding: 10px; }\n.det-grid b { display: block; font-size: 11.5px; text-transform: uppercase; letter-spacing: .05em; color: var(--muted); margin-bottom: 2px; }\n.tabs { display: flex; gap: 6px; flex-wrap: wrap; }\n.vacio { padding: 18px; color: var(--muted); }\n.err { background: var(--bad-bg); color: var(--bad); padding: 10px 14px; border-radius: 8px; }\n</style>\n</head>\n<body>\n<header><div class=\"wrap\"><h1>Panel de Flota</h1><span class=\"sub\" id=\"act\"></span><span class=\"sp\"></span><button class=\"btn\" id=\"btn-act\" type=\"button\">Actualizar</button></div></header>\n<main class=\"wrap\">\n  <div id=\"msg\"></div>\n  <section class=\"kpis\" id=\"kpis\"></section>\n  <section style=\"display:grid;gap:10px\">\n    <div class=\"tools\"><h2 style=\"margin-right:8px\">Camiones</h2>\n      <input id=\"q\" type=\"search\" placeholder=\"Buscar por N° o patente\" aria-label=\"Buscar camión\">\n      <span id=\"chips\"></span></div>\n    <div class=\"card scroll\"><table><thead><tr>\n      <th>N°</th><th>Patente</th><th>Vehículo</th><th class=\"r\">Odómetro</th><th class=\"r\">Próx. mantención</th><th class=\"r\">Faltan</th>\n      <th>Rev. técnica</th><th>Permiso circ.</th><th>Deshielo</th><th class=\"r\">Fallas</th><th>Últ. semanal</th><th>Últ. mensual</th><th>Estado</th>\n    </tr></thead><tbody id=\"flota\"></tbody></table></div>\n  </section>\n  <section id=\"detalle\"></section>\n  <section style=\"display:grid;gap:10px\">\n    <div class=\"tools\"><h2 style=\"margin-right:8px\">Registros</h2><span class=\"tabs\" id=\"tabs\"></span><span class=\"sp\"></span><span class=\"muted small\" id=\"filtro-reg\"></span></div>\n    <div class=\"card scroll\" id=\"lista\"></div>\n  </section>\n</main>\n<script>\n\"use strict\";\nlet DATOS = __DATOS__;\nconst CODIGO = __CODIGO__;\nconst UI = { q: \"\", estado: \"\", sel: null, tab: \"fallas\" };\nconst $ = s => document.querySelector(s);\nconst esc = v => String(v == null ? \"\" : v).replace(/[&<>\"']/g, c => ({ \"&\": \"&amp;\", \"<\": \"&lt;\", \">\": \"&gt;\", '\"': \"&quot;\", \"'\": \"&#39;\" }[c]));\nconst miles = n => n == null || n === \"\" ? \"—\" : Number(n).toLocaleString(\"es-CL\");\nconst km = n => n == null || n === \"\" ? \"—\" : miles(n) + \" km\";\nconst fF = s => s && /^\\d{4}-\\d{2}-\\d{2}/.test(s) ? s.slice(0, 10).split(\"-\").reverse().join(\"-\") : (s || \"—\");\nconst pill = (t, nivel) => `<span class=\"pill ${nivel || \"\"}\">${esc(t)}</span>`;\nconst nivelEstado = e => e === \"Detenido\" ? \"bad\" : e === \"Revisar\" ? \"warn\" : \"ok\";\nconst hace = s => { if (!s) return \"—\"; const d = Math.round((new Date() - new Date(s + \"T00:00:00\")) / 864e5); return d <= 0 ? \"Hoy\" : d === 1 ? \"Ayer\" : \"Hace \" + d + \" días\"; };\n\nfunction doc(x) {\n  if (!x || !x.vence) return pill(\"Sin dato\", \"info\");\n  const txt = x.nivel === \"bad\" ? \"Vencido\" : x.nivel === \"warn\" ? \"En \" + x.dias + \" días\" : \"Vigente\";\n  return `<span class=\"num\">${fF(x.vence)}</span><br>${pill(txt, x.nivel)}`;\n}\n\nfunction kpis() {\n  const k = DATOS.kpi;\n  const t = (v, l, cls) => `<div class=\"kpi ${cls || \"\"}\"><b>${v}</b><span>${l}</span></div>`;\n  $(\"#kpis\").innerHTML = [\n    t(k.operativos + \"/\" + k.total, \"Operativos\", \"ok\"),\n    t(k.detenidos, \"Detenidos\", k.detenidos ? \"bad\" : \"\"),\n    t(k.fallas, \"Fallas abiertas\", k.fallas ? \"bad\" : \"\"),\n    t(k.deshielo, \"Necesitan deshielo\", k.deshielo ? \"warn\" : \"\"),\n    t(k.mantencion, \"Mantención próxima o atrasada\", k.mantencion ? \"warn\" : \"\"),\n    t(k.docsVencidos, \"Documentos vencidos\" + (k.docsPorVencer ? \" · \" + k.docsPorVencer + \" vence\" + (k.docsPorVencer === 1 ? \"\" : \"n\") + \" en 30 días\" : \"\"), k.docsVencidos ? \"bad\" : k.docsPorVencer ? \"warn\" : \"\"),\n    t(k.semanalAlDia + \"/\" + k.total, \"Con auditoría semanal (7 días)\", k.semanalAlDia < k.total ? \"warn\" : \"ok\"),\n    t(k.mensualAlDia + \"/\" + k.total, \"Con auditoría mensual (31 días)\", k.mensualAlDia < k.total ? \"warn\" : \"ok\")\n  ].join(\"\");\n}\n\nfunction camionesFiltrados() {\n  const q = UI.q.toUpperCase().replace(/[^A-Z0-9]/g, \"\");\n  return DATOS.camiones.filter(c => (!UI.estado || c.estado === UI.estado) &&\n    (!q || String(c.interno).toUpperCase() === q || c.patente.replace(/[^A-Z0-9]/g, \"\").includes(q) || String(c.codigoAnterior).toUpperCase() === q));\n}\n\nfunction flota() {\n  const est = [\"\", \"Detenido\", \"Revisar\", \"Operativo\"];\n  $(\"#chips\").innerHTML = est.map(e => `<button class=\"chip\" data-estado=\"${e}\" aria-pressed=\"${UI.estado === e}\">${e || \"Todos\"}${e ? \" · \" + DATOS.camiones.filter(c => c.estado === e).length : \"\"}</button>`).join(\" \");\n  const cams = camionesFiltrados();\n  $(\"#flota\").innerHTML = cams.length ? cams.map(c => `<tr class=\"fila ${UI.sel === c.id ? \"sel\" : \"\"}\" data-id=\"${esc(c.id)}\">\n    <td class=\"n\">${esc(c.interno || \"—\")}</td><td><span class=\"plate\">${esc(c.patente)}</span></td><td>${esc(c.vehiculo)}<div class=\"muted small\">${esc(c.anio)}${c.codigoAnterior ? \" · cód. \" + esc(c.codigoAnterior) : \"\"}</div></td>\n    <td class=\"r num\">${km(c.km)}</td><td class=\"r num\">${km(c.proxMant)}</td>\n    <td class=\"r\">${c.faltaMant == null ? \"—\" : pill(c.faltaMant <= 0 ? \"Atrasada \" + miles(-c.faltaMant) : miles(c.faltaMant) + \" km\", c.mantNivel)}</td>\n    <td>${doc(c.rt)}</td><td>${doc(c.permiso)}</td>\n    <td>${c.ultMensual ? (c.deshielo ? pill(\"Necesita\", \"bad\") : pill(\"No\", \"ok\")) : \"—\"}</td>\n    <td class=\"r\">${c.fallasAbiertas ? pill(c.fallasAbiertas, \"bad\") : \"0\"}</td>\n    <td>${c.ultSemanal ? hace(c.ultSemanal.fecha) : pill(\"Nunca\", \"warn\")}</td><td>${c.ultMensual ? hace(c.ultMensual.fecha) : pill(\"Nunca\", \"warn\")}</td>\n    <td>${pill(c.estado, nivelEstado(c.estado))}</td></tr>`).join(\"\")\n    : `<tr><td colspan=\"13\" class=\"vacio\">No hay camiones con ese filtro.</td></tr>`;\n}\n\nfunction detalle() {\n  const c = DATOS.camiones.find(x => x.id === UI.sel);\n  if (!c) { $(\"#detalle\").innerHTML = \"\"; return; }\n  const s = c.ultSemanal, l = s ? Object.entries(s.limpieza || {}) : [];\n  $(\"#detalle\").innerHTML = `<div class=\"card det\">\n    <div class=\"det-top\"><span class=\"n\" style=\"font-size:26px\">N° ${esc(c.interno || \"—\")}</span><span class=\"plate\" style=\"font-size:16px\">${esc(c.patente)}</span>\n      <b>${esc(c.vehiculo)}</b><span class=\"muted\">${esc(c.tipo)} ${esc(c.anio)}</span>${pill(c.estado, nivelEstado(c.estado))}<span class=\"sp\"></span><button class=\"btn\" data-cerrar>Cerrar</button></div>\n    <div class=\"det-grid\">\n      <div><b>Odómetro</b><span class=\"num\">${km(c.km)}</span></div>\n      <div><b>Próxima mantención</b><span class=\"num\">${km(c.proxMant)}</span></div>\n      <div><b>Revisión técnica</b>${c.rt.fecha ? \"Hecha: \" + esc(fF(c.rt.fecha)) + \"<br>\" : \"\"}${doc(c.rt)}</div>\n      <div><b>Permiso de circulación</b>${c.permiso.fecha ? \"Pagado: \" + esc(fF(c.permiso.fecha)) + \"<br>\" : \"\"}${doc(c.permiso)}</div>\n      <div><b>Última semanal</b>${s ? esc(fF(s.fecha)) + \" · \" + esc(s.responsable) + (l.length ? \"<br>\" + l.map(([k, v]) => esc(k) + \": \" + pill(v, v === \"Mal\" ? \"bad\" : v === \"Regular\" ? \"warn\" : \"ok\")).join(\" \") : \"\") : \"—\"}</div>\n      <div><b>Última mensual</b>${c.ultMensual ? esc(fF(c.ultMensual.fecha)) + \" · \" + esc(c.ultMensual.responsable) : \"—\"}</div>\n    </div>\n    <span class=\"muted small\">Abajo, los registros quedan filtrados para este camión.</span></div>`;\n}\n\nfunction lista() {\n  const t = [[\"fallas\", \"Fallas abiertas\"], [\"mantenciones\", \"Mantenciones\"], [\"auditorias\", \"Auditorías\"], [\"todasFallas\", \"Todas las fallas\"]];\n  $(\"#tabs\").innerHTML = t.map(([k, l]) => `<button class=\"chip\" data-tab=\"${k}\" aria-pressed=\"${UI.tab === k}\">${l}</button>`).join(\" \");\n  const sel = DATOS.camiones.find(x => x.id === UI.sel);\n  $(\"#filtro-reg\").innerHTML = sel ? `Solo N° ${esc(sel.interno)} · <button class=\"chip\" data-cerrar>Ver todos</button>` : \"\";\n  const deCam = r => !UI.sel || r.camionId === UI.sel;\n  const cam = r => `<td class=\"n\">${esc(r.interno || \"—\")}</td><td><span class=\"plate\">${esc(r.patente)}</span></td>`;\n  let cab, filas;\n  if (UI.tab === \"mantenciones\") {\n    const ms = DATOS.mantenciones.filter(deCam);\n    cab = \"<th>Fecha entrada</th><th>Salida</th><th>N°</th><th>Patente</th><th>Taller</th><th>Tipo</th><th class='r'>Km</th><th>Paquete</th><th>Servicio</th><th>Causas y observaciones</th>\";\n    filas = ms.map(m => `<tr><td class=\"num\">${fF(m.fecha)}</td><td class=\"num\">${fF(m.salida)}</td>${cam(m)}<td>${esc(m.taller || \"—\")}</td><td>${pill(m.tipo, m.tipo === \"Correctivo\" ? \"warn\" : \"info\")}</td><td class=\"r num\">${miles(m.km)}</td><td>${esc(m.paquete)}</td><td>${esc(m.servicio)}</td><td>${esc(m.obs)}</td></tr>`);\n  } else if (UI.tab === \"auditorias\") {\n    const as = DATOS.auditorias.filter(deCam);\n    cab = \"<th>Fecha</th><th>Tipo</th><th>N°</th><th>Patente</th><th class='r'>Odómetro</th><th>Responsable</th><th>Detalle</th><th>Fallas</th>\";\n    filas = as.map(a => `<tr><td class=\"num\">${fF(a.fecha)}</td><td>${pill(a.tipo, a.tipo === \"Semanal\" ? \"info\" : \"\")}</td>${cam(a)}<td class=\"r num\">${km(a.km)}</td><td>${esc(a.responsable)}</td><td>${esc(a.detalle)}</td><td>${esc(a.fallasResumen || \"—\")}</td></tr>`);\n  } else {\n    const fs = DATOS.fallas.filter(f => deCam(f) && (UI.tab === \"todasFallas\" || f.estado !== \"Cerrado\"));\n    cab = \"<th>Fecha</th><th>N°</th><th>Patente</th><th>Sistema</th><th>Descripción</th><th>Detenido</th><th>Estado</th><th>Origen</th><th>Reportó</th>\";\n    filas = fs.map(f => `<tr><td class=\"num\">${fF(f.fecha)}</td>${cam(f)}<td>${esc(f.sistema)}</td><td>${esc(f.descripcion || \"—\")}</td><td>${f.detenido ? pill(\"Sí\", \"bad\") : \"No\"}</td><td>${pill(f.estado, f.estado === \"Cerrado\" ? \"ok\" : \"warn\")}</td><td>${esc(f.origen)}</td><td>${esc(f.responsable)}</td></tr>`);\n  }\n  $(\"#lista\").innerHTML = filas.length ? `<table><thead><tr>${cab}</tr></thead><tbody>${filas.join(\"\")}</tbody></table>` : `<div class=\"vacio\">No hay registros${UI.sel ? \" de este camión\" : \"\"} en esta lista.</div>`;\n}\n\nfunction pintar() {\n  $(\"#act\").textContent = \"Actualizado \" + DATOS.actualizado.replace(/^(\\d{4})-(\\d{2})-(\\d{2})/, \"$3-$2-$1\");\n  kpis(); flota(); detalle(); lista();\n}\n\nfunction actualizar() {\n  if (!(window.google && google.script && google.script.run)) { location.reload(); return; }\n  $(\"#btn-act\").textContent = \"Actualizando…\";\n  google.script.run\n    .withSuccessHandler(d => { DATOS = d; $(\"#msg\").innerHTML = \"\"; $(\"#btn-act\").textContent = \"Actualizar\"; pintar(); })\n    .withFailureHandler(e => { $(\"#msg\").innerHTML = `<div class=\"err\">No se pudo actualizar: ${esc(e && e.message)}</div>`; $(\"#btn-act\").textContent = \"Actualizar\"; })\n    .datosPanel(CODIGO);\n}\n\ndocument.addEventListener(\"click\", e => {\n  const f = e.target.closest(\"tr.fila\"); if (f) { UI.sel = UI.sel === f.dataset.id ? null : f.dataset.id; pintar(); if (UI.sel) $(\"#detalle\").scrollIntoView({ behavior: \"smooth\", block: \"nearest\" }); return; }\n  const est = e.target.closest(\"[data-estado]\"); if (est) { UI.estado = est.dataset.estado; flota(); return; }\n  const tab = e.target.closest(\"[data-tab]\"); if (tab) { UI.tab = tab.dataset.tab; lista(); return; }\n  if (e.target.closest(\"[data-cerrar]\")) { UI.sel = null; pintar(); return; }\n  if (e.target.closest(\"#btn-act\")) actualizar();\n});\n$(\"#q\").addEventListener(\"input\", e => { UI.q = e.target.value; flota(); });\npintar();\nsetInterval(actualizar, 5 * 60 * 1000);\n</script>\n</body>\n</html>\n";
