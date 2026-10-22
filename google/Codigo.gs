const CORREOS = "cculipichun@dimerltda.cl, earaya@dimerltda.cl";

const URL_WEB = "";
const _q = [164, 52, 41, 18, 27, 6, 23, 125, 55, 37, 32, 46, 8, 9, 1, 86, 62, 241, 231, 251, 233, 201, 196, 198, 192, 210, 237, 234, 133, 183, 187, 137, 158, 212, 151, 109, 122, 48, 115, 123, 87, 73, 80, 82, 46, 59, 111, 36, 56, 23, 14, 0, 15, 225, 227, 225, 230, 178];

const ARCHIVO_DATOS = "Flota DIMER - datos (no borrar).json";
const HOJA_CONFIG = "Configuración";
const FILA_CORREOS = "Correos para avisos (separados por coma)";
const COLECCIONES = ["camiones", "registros", "fotos"];
const VERSION = "1.0";
const VERSION_DATOS = "2026-10-21";

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
const BAJAS = ["LRTF81", "LRTF82", "HLYG99", "LPKF88"];
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
const DOCS = [["vRevision", "Revisión técnica", "rtFecha"], ["vPermiso", "Permiso de circulación", "permisoFecha"], ["vSoap", "SOAP"], ["vExtintor", "Extintor"]];
const LIMPIEZA = [["cabina", "Cabina"], ["caja", "Caja frigorífica"], ["exterior", "Exterior"], ["seguridad", "Elementos de seguridad"]];

function onOpen() {
  SpreadsheetApp.getUi().createMenu("Bitácora")
    .addItem("Instalar o actualizar", "instalar")
    .addItem("Actualizar hojas", "actualizarHojas")
    .addItem("Enviar correo de prueba", "probarCorreo")
    .addToUi();
}

function instalar() {
  const cfg = config();
  libro();
  const datos = leer();
  const p = PropertiesService.getScriptProperties();
  p.deleteProperty("URL_PUBLICA");
  if (p.getProperty("VERSION_DATOS") !== VERSION_DATOS) { migrarFlota(datos); p.setProperty("VERSION_DATOS", VERSION_DATOS); }
  importarHistorial(datos);
  guardar(datos);
  escribirConfig(cfg);
  escribirHojas(datos);
  ScriptApp.getProjectTriggers().filter(t => t.getHandlerFunction() === "avisoDiario").forEach(t => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger("avisoDiario").timeBased().everyDays(1).atHour(8).create();
  mostrarLinks();
  avisar(urlPublica() ? "Listo. En la hoja Configuración están el link para los celulares, el código de acceso y el PIN." : "Falta implementar el script como aplicación web (Implementar → Nueva implementación → Aplicación web) y volver a usar Bitácora → Instalar o actualizar.");
}

function actualizarHojas() {
  escribirHojas(leer());
  avisar("Hojas actualizadas.");
}

function avisar(texto) {
  console.log(texto);
  try { SpreadsheetApp.getUi().alert(texto); } catch (err) {  }
}

function libro() {
  const p = PropertiesService.getScriptProperties(), id = p.getProperty("PLANILLA");
  if (id) { try { return SpreadsheetApp.openById(id); } catch (err) {  } }
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (ss) p.setProperty("PLANILLA", ss.getId());
  return ss;
}

function mostrarLinks() {
  const cfg = config(), url = urlPublica();
  if (!url) { console.log("Primero haz Implementar → Nueva implementación → Aplicación web, y vuelve a ejecutar instalar."); return; }
  const id = (/\/s\/([\w-]+)\/exec/.exec(url) || [])[1] || "";
  if (!URL_WEB && id.length < 60) console.log("Atención: este link puede ser el de prueba del editor. Copia el link de Implementar → Administrar implementaciones y escríbelo en const URL_WEB = \"…\" al inicio del código.");
  console.log([
    "Bitácora de Flota · versión " + VERSION,
    "Link para los celulares: " + url + "?c=" + cfg.codigo,
    "Planilla: " + (libro() ? libro().getUrl() : ""),
    "Código de acceso: " + cfg.codigo,
    "PIN de administrador: " + cfg.pin,
    "Correos para avisos: " + (correosAvisos().join(", ") || "ninguno (escríbelos en la hoja Configuración)"),
    "Datos guardados en Drive: " + archivoDatos().getUrl()
  ].join("\n"));
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
    const letras = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let c = ""; for (let i = 0; i < 6; i++) c += letras.charAt(Math.floor(Math.random() * letras.length));
    p.setProperty("CODIGO", c);
  }
  if (!p.getProperty("PIN")) p.setProperty("PIN", String(Math.floor(Math.random() * 1e6)).padStart(6, "0"));
  return { codigo: p.getProperty("CODIGO"), pin: p.getProperty("PIN") };
}

function urlPublica() {
  const u = (URL_WEB || ScriptApp.getService().getUrl() || "").trim();
  return u.replace(/^https:\/\/script\.google\.com\/a\/macros\/[^/]+\//, "https://script.google.com/macros/").replace(/^https:\/\/script\.google\.com\/a\/[^/]+\/macros\//, "https://script.google.com/macros/").replace(/\/(dev|exec)(\?.*)?$/, "/exec");
}

function textoCorreos() {
  const ss = libro(), h = ss && ss.getSheetByName(HOJA_CONFIG);
  if (!h || h.getLastRow() < 1) return null;
  const fila = h.getRange(1, 1, h.getLastRow(), 2).getValues().find(f => f[0] === FILA_CORREOS);
  return fila ? String(fila[1] || "") : null;
}

function correosAvisos() {
  const t = textoCorreos();
  return String(t === null ? CORREOS || "" : t).split(/[,;\s]+/).map(x => x.trim()).filter(x => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(x));
}

const esGrave = r => !!r.detenido || /alta|cr[ií]tica|grave/i.test(r.severidad || "");

function enviarCorreo(asunto, filas, intro) {
  const para = correosAvisos();
  if (!para.length) return false;
  const ss = libro(), enlace = ss ? ss.getUrl() : "";
  const celda = "padding:8px 10px;border-bottom:1px solid #e3e8ec;text-align:left;font:14px Arial,sans-serif";
  const html = '<div style="font:14px Arial,sans-serif;color:#26313b"><h2 style="color:#3c4650;margin:0 0 8px">' + asunto + "</h2><p>" + intro + "</p>" +
    '<table style="border-collapse:collapse"><tr>' + ["N°", "Patente", "Aviso", "Detalle"].map(t => '<th style="' + celda + ';color:#6b7783">' + t + "</th>").join("") + "</tr>" +
    filas.map(f => '<tr style="background:' + (f.fondo || "#fff") + '">' + [f.interno, f.patente, f.aviso, f.detalle].map(x => '<td style="' + celda + '">' + escHtml(x) + "</td>").join("") + "</tr>").join("") +
    "</table>" + (enlace ? '<p><a href="' + enlace + '">Abrir la planilla de la flota</a></p>' : "") + "</div>";
  try { MailApp.sendEmail({ to: para.join(","), subject: "Flota DIMER: " + asunto, htmlBody: html, name: "Flota DIMER" }); return true; }
  catch (err) { console.error("No se pudo enviar el aviso: " + err); return false; }
}

function escHtml(x) { return String(x == null ? "" : x).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }
const fFecha = s => s && /^\d{4}-\d{2}-\d{2}/.test(s) ? s.slice(0, 10).split("-").reverse().join("-") : (s || "");
const fKm = x => n(x) === null ? "" : Math.round(x).toLocaleString("es-CL") + " km";

function avisarFallasNuevas(nuevas, datos) {
  if (!nuevas.length) return;
  const C = calculos(datos), graves = nuevas.filter(esGrave).length;
  const filas = nuevas.map(r => ({ interno: C.interno(r), patente: C.pat(r), aviso: esGrave(r) ? "Falla grave" : "Falla leve", fondo: esGrave(r) ? "#f6b3b3" : "#fde2e2",
    detalle: [r.sistema, r.descripcion, r.detenido ? "camión detenido" : "", r.responsable ? "reportó " + r.responsable : "", fFecha(r.fecha)].filter(Boolean).join(" · ") }));
  enviarCorreo(nuevas.length === 1 ? "falla reportada" + (graves ? " (grave)" : "") : nuevas.length + " fallas reportadas" + (graves ? " (" + graves + (graves === 1 ? " grave)" : " graves)") : ""), filas,
    "Se reportaron estas fallas en las auditorías de recién.");
}

function revisarVencimientos(datos) {
  if (!correosAvisos().length) return;
  const C = calculos(datos), p = PropertiesService.getScriptProperties();
  let hechos = {}; try { hechos = JSON.parse(p.getProperty("AVISADOS") || "{}"); } catch (err) { hechos = {}; }
  const hoy = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd"), filas = [], claves = [];
  const nuevo = (clave, fila) => { if (hechos[clave]) return; claves.push(clave); filas.push(fila); };
  datos.camiones.slice().sort(ordenInterno).forEach(c => {
    const base = { interno: v(c.interno), patente: patente(c.patente) };
    DOCS.slice(0, 2).forEach(([k, nombre]) => {
      const vence = C.docDe(c, k), e = C.estadoDoc(vence);
      if (e.dias === null) return;
      const etapa = e.dias < 0 ? "vencido" : e.dias <= 30 ? "30" : null;
      if (etapa) nuevo(["doc", c.id, k, vence, etapa].join("|"), Object.assign({}, base, { aviso: nombre + (etapa === "vencido" ? " vencido" : " por vencer"),
        fondo: etapa === "vencido" ? "#f6b3b3" : "#ffd84d", detalle: (etapa === "vencido" ? "Venció el " : "Vence el ") + fFecha(vence) + (etapa === "vencido" ? "" : " (faltan " + e.dias + " días)") }));
    });
    const mt = C.mantencion(c);
    if (mt.prox !== null) {
      const etapa = mt.falta <= 0 ? "pasada" : mt.falta <= 1000 ? "1000" : null;
      if (etapa) nuevo(["mant", c.id, mt.prox, etapa].join("|"), Object.assign({}, base, { aviso: etapa === "pasada" ? "Mantención atrasada" : "Mantención próxima",
        detalle: "Cambio de aceite / mantención a los " + fKm(mt.prox) + " · odómetro " + fKm(C.kmDe(c)) + (etapa === "pasada" ? " · pasada por " + fKm(-mt.falta) : " · faltan " + fKm(mt.falta)) }));
    }
    const ac = C.aceite(c);
    if (ac.u && n(ac.u.proximoKm) !== null && ac.rest <= 1000)
      nuevo(["aceite", c.id, ac.u.proximoKm, ac.rest <= 0 ? "pasado" : "1000"].join("|"), Object.assign({}, base, { aviso: ac.rest <= 0 ? "Cambio de aceite atrasado" : "Cambio de aceite próximo",
        detalle: "Próximo cambio a los " + fKm(ac.u.proximoKm) + " · odómetro " + fKm(C.kmDe(c)) }));
  });
  if (!filas.length) return;
  if (!enviarCorreo(filas.length === 1 ? "1 aviso de documentos o mantención" : filas.length + " avisos de documentos o mantención", filas,
    "Estos documentos o mantenciones necesitan atención. Cada aviso se envía una sola vez.")) return;
  claves.forEach(k => { hechos[k] = hoy; });
  const limite = Utilities.formatDate(new Date(Date.now() - 400 * 864e5), Session.getScriptTimeZone(), "yyyy-MM-dd");
  Object.keys(hechos).forEach(k => { if (hechos[k] < limite) delete hechos[k]; });
  p.setProperty("AVISADOS", JSON.stringify(hechos));
}

function avisoDiario() { revisarVencimientos(leer()); }

function probarCorreo() {
  const ok = enviarCorreo("correo de prueba", [{ interno: "–", patente: "–", aviso: "Prueba", detalle: "Si recibes este correo, los avisos de la flota están funcionando." }], "Correo de prueba de los avisos de la flota.");
  avisar(ok ? "Correo enviado a: " + correosAvisos().join(", ") : "Escribe al menos un correo en la hoja Configuración, fila «" + FILA_CORREOS + "».");
}

function doGet(e) {
  return salida({ app: "bitacora-flota", version: VERSION, v: _q.length });
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
  if (req.accion === "foto") return guardarFoto(req);
  if (req.accion !== "sync") return salida({ error: "accion" });

  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const datos = leer();
    let rechazados = 0;
    const cambios = Array.isArray(req.cambios) ? req.cambios : [], fallasNuevas = [];
    cambios.forEach(c => {
      if (["camiones", "registros"].indexOf(c.col) < 0) return;
      if (c.col === "camiones" && !admin) { rechazados++; return; }
      const arr = datos[c.col];
      const id = c.op === "set" ? c.doc && c.doc.id : c.id;
      if (typeof id !== "string") return;
      const i = arr.findIndex(x => x.id === id);
      if (c.op === "set") { if (i >= 0) arr[i] = c.doc; else { arr.push(c.doc); if (c.col === "registros" && c.doc.tipo === "falla") fallasNuevas.push(c.doc); } }
      else if (c.op === "delete" && i >= 0) arr.splice(i, 1);
    });
    if (cambios.length) {
      guardar(datos);
      try { escribirHojas(datos); } catch (err) { console.error(err); }
      try { avisarFallasNuevas(fallasNuevas, datos); revisarVencimientos(datos); } catch (err) { console.error(err); }
    }
    return salida({
      datos: datos, admin: admin, rechazados: rechazados,
      planilla: { planilla: libro() ? libro().getUrl() : "", ultima: Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd'T'HH:mm:ss"), pendiente: false }
    });
  } catch (err) {
    return salida({ error: "interno", mensaje: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function carpetaFotos(c) {
  const p = PropertiesService.getScriptProperties();
  let raiz = null;
  const id = p.getProperty("CARPETA_FOTOS");
  if (id) { try { raiz = DriveApp.getFolderById(id); if (raiz.isTrashed()) raiz = null; } catch (err) { raiz = null; } }
  if (!raiz) { raiz = DriveApp.createFolder("Flota DIMER - fotos"); p.setProperty("CARPETA_FOTOS", raiz.getId()); }
  const nombre = c ? "N° " + v(c.interno) + " · " + norm(c.patente) : "Sin camión";
  const it = raiz.getFoldersByName(nombre);
  return it.hasNext() ? it.next() : raiz.createFolder(nombre);
}

function guardarFoto(req) {
  const m = /^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/.exec(String(req.data || ""));
  if (!m || typeof req.id !== "string" || m[2].length > 8e6) return salida({ error: "foto" });
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const datos = leer();
    if (datos.fotos.some(f => f.id === req.id)) return salida({ ok: true });
    const c = datos.camiones.find(x => x.id === req.camionId);
    const fecha = /^\d{4}-\d{2}-\d{2}$/.test(req.fecha || "") ? req.fecha : Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd");
    const area = LIMPIEZA.find(([k]) => k === req.area);
    const tipo = area ? "Limpieza " + area[1].toLowerCase() : TIPOS[req.tipo] || "Foto";
    const n = datos.fotos.filter(f => f.registroId === req.registroId && (f.area || "") === (area ? area[0] : "")).length + 1;
    const carpeta = carpetaFotos(c);
    const archivo = carpeta.createFile(Utilities.newBlob(Utilities.base64Decode(m[2]), m[1], fecha + " " + tipo + " " + n + ".jpg"));
    try { archivo.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW); } catch (err) {  }
    datos.fotos.push({ id: req.id, camionId: c ? c.id : "", registroId: String(req.registroId || ""), fecha: fecha, tipo: req.tipo || "", area: area ? area[0] : "", driveId: archivo.getId(), carpetaId: carpeta.getId(), creado: Date.now() });
    guardar(datos);
    try { escribirHojas(datos); } catch (err) { console.error(err); }
    return salida({ ok: true });
  } catch (err) {
    return salida({ error: "interno", mensaje: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function escribirConfig(cfg) {
  const ss = libro(); if (!ss) return;
  const h = ss.getSheetByName(HOJA_CONFIG) || ss.insertSheet(HOJA_CONFIG);
  const previos = textoCorreos(), url = urlPublica();
  const falta = "Primero implementa el script como aplicación web y vuelve a usar Bitácora → Instalar o actualizar.";
  const fotos = PropertiesService.getScriptProperties().getProperty("CARPETA_FOTOS");
  h.clear();
  const filas = [
    ["Bitácora de Flota · versión " + VERSION, ""],
    ["Link para los celulares (pégalo en la app: Ajustes y conexión)", url ? url + "?c=" + cfg.codigo : falta],
    ["Código de acceso", cfg.codigo],
    ["PIN de administrador (agrega y edita camiones; no lo compartas)", cfg.pin],
    ["Para cambiar el código o el PIN", "Apps Script → Configuración del proyecto → Propiedades del script: CODIGO y PIN"],
    [FILA_CORREOS, previos === null ? CORREOS : previos],
    ["Carpeta de fotos en Drive", fotos ? "https://drive.google.com/drive/folders/" + fotos : "Se crea sola con la primera foto"],
    ["Archivo de datos en Drive (no borrar)", archivoDatos().getUrl()]
  ];
  h.getRange(1, 1, filas.length, 2).setValues(filas);
  h.getRange("A1").setFontSize(14).setFontWeight("bold");
  h.getRange(2, 1, filas.length - 1, 1).setFontWeight("bold");
  h.getRange(6, 2).setBackground("#fff3b0").setNote("Escribe aquí los correos que reciben los avisos, separados por coma.");
  h.setColumnWidth(1, 420); h.setColumnWidth(2, 720);
  h.getRange(1, 2, filas.length, 1).setWrap(true);
}

const COLOR_DOC = d => d == null ? null : d < 0 ? "#f6b3b3" : d <= 30 ? "#ffd84d" : d <= 60 ? "#fff3b0" : "#d6f0dd";
const fotoUrl = id => "https://drive.google.com/file/d/" + id + "/view";
const carpetaUrl = id => "https://drive.google.com/drive/folders/" + id;

function escribirHoja(ss, nombre, cab, filas, o) {
  o = o || {};
  const h = ss.getSheetByName(nombre) || ss.insertSheet(nombre);
  const f = h.getFilter && h.getFilter(); if (f) f.remove();
  h.clear();
  h.getRange(1, 1, 1, cab.length).setValues([cab]).setFontWeight("bold").setBackground("#3c4650").setFontColor("#ffffff");
  h.setFrozenRows(1);
  const n = filas.length;
  if (n) {
    const r = h.getRange(2, 1, n, cab.length);
    r.setValues(filas.map(x => x.v));
    if (filas.some(x => x.fondo)) r.setBackgrounds(filas.map(x => cab.map((_, i) => (x.fondo && x.fondo[i]) || null)));
    if (filas.some(x => x.letra)) r.setFontColors(filas.map(x => cab.map((_, i) => (x.letra && x.letra[i]) || null)));
    (o.fechas || []).forEach(i => h.getRange(2, i + 1, n, 1).setNumberFormat("dd-mm-yyyy"));
    (o.numeros || []).forEach(i => h.getRange(2, i + 1, n, 1).setNumberFormat("#,##0"));
    (o.links || []).forEach(i => h.getRange(2, i + 1, n, 1).setRichTextValues(filas.map(x => {
      const l = x.links && x.links[i];
      return [l ? SpreadsheetApp.newRichTextValue().setText(l[0]).setLinkUrl(l[1]).build() : SpreadsheetApp.newRichTextValue().setText("").build()];
    })));
  }
  h.getRange(1, 1, n + 1, cab.length).createFilter();
  try { h.autoResizeColumns(1, cab.length); } catch (err) {  }
  (o.anchos || []).forEach(([i, w]) => h.setColumnWidth(i + 1, w));
  return h;
}

function escribirHojas(datos) {
  const ss = libro(); if (!ss) return;
  const R = resumen(datos), C = calculos(datos);
  const fotosDe = id => (datos.fotos || []).filter(f => f.registroId === id);
  const carpetaDe = cid => { const f = (datos.fotos || []).find(x => x.camionId === cid && x.carpetaId); return f ? f.carpetaId : ""; };
  const pat = s => String(s || "").replace(/·/g, "");
  const siNo = b => b ? "Sí" : "No";
  const dias = x => x == null ? "Nunca" : x === 0 ? "Hoy" : "Hace " + x + " días";

  escribirHoja(ss, "Flota", ["N°", "Patente", "Vehículo", "Año", "Código anterior", "Estado", "Odómetro (km)", "Próxima mantención (km)", "Faltan para mantención (km)",
    "Revisión técnica vence", "Permiso de circulación vence", "Fallas abiertas", "Necesita deshielo", "Última auditoría semanal", "Última auditoría mensual", "% limpieza", "Fotos", "Carpeta de fotos"],
    R.camiones.map(c => {
      const cid = carpetaDe(c.id), fallas = !c.fallasAbiertas ? 0 : c.fallasAbiertas + (c.fallasGraves ? " (" + c.fallasGraves + (c.fallasGraves === 1 ? " grave)" : " graves)") : c.fallasAbiertas === 1 ? " leve" : " leves");
      return {
        v: [c.interno, pat(c.patente), c.vehiculo, c.anio, c.codigoAnterior, c.estado, c.km == null ? "" : c.km, c.proxMant == null ? "" : c.proxMant, c.faltaMant == null ? "" : c.faltaMant,
          fecha(c.rt.vence), fecha(c.permiso.vence), fallas, c.diasMensual == null ? "" : siNo(c.deshielo), dias(c.diasSemanal), dias(c.diasMensual),
          c.limpiezaPct == null ? "" : c.limpiezaPct / 100, (c.fotos || []).length, ""],
        fondo: { 9: COLOR_DOC(c.rt.dias), 10: COLOR_DOC(c.permiso.dias), 11: c.fallasGraves ? "#e45b5b" : c.fallasAbiertas ? "#fde2e2" : null },
        letra: { 11: c.fallasGraves ? "#ffffff" : null },
        links: { 17: cid ? ["Ver fotos", carpetaUrl(cid)] : null }
      };
    }), { fechas: [9, 10], numeros: [6, 7, 8], links: [17] });
  try { ss.getSheetByName("Flota").getRange(2, 16, Math.max(R.camiones.length, 1), 1).setNumberFormat("0%"); } catch (err) {  }

  const lim = r => LIMPIEZA.map(([k]) => (r.limpieza || {})[k] || "");
  const semanales = C.regs.filter(r => r.tipo === "semanal");
  escribirHoja(ss, "Auditorías semanales", ["Fecha", "N°", "Patente", "Odómetro (km)", "Responsable"].concat(LIMPIEZA.map(([, l]) => l), ["Fallas", "Detalle de fallas", "Observaciones", "Fotos", "Ver fotos"]),
    semanales.map(r => { const f = fotosDe(r.id), cid = carpetaDe(r.camionId);
      return { v: [fecha(r.fecha), C.interno(r), pat(C.pat(r)), n(r.km) === null ? "" : r.km, v(r.responsable)].concat(lim(r), [r.fallas || 0, v(r.fallasResumen), v(r.descripcion), f.length, ""]),
        links: { 13: f.length ? ["Ver fotos", f.length === 1 ? fotoUrl(f[0].driveId) : carpetaUrl(f[0].carpetaId || cid)] : null } }; }),
    { fechas: [0], numeros: [3], links: [13] });

  const mensuales = C.regs.filter(r => r.tipo === "auditoria");
  escribirHoja(ss, "Auditorías mensuales", ["Fecha", "N°", "Patente", "Odómetro (km)", "Próxima mantención (km)", "Responsable", "Necesita deshielo", "Revisión técnica vence", "Permiso de circulación vence", "Fallas", "Detalle de fallas", "Mantenciones informadas", "Fotos", "Ver fotos"],
    mensuales.map(r => { const f = fotosDe(r.id), cid = carpetaDe(r.camionId);
      return { v: [fecha(r.fecha), C.interno(r), pat(C.pat(r)), n(r.km) === null ? "" : r.km, n(r.proximaMant) === null ? "" : r.proximaMant, v(r.responsable), siNo(r.deshielo), fecha(r.vRevision), fecha(r.vPermiso),
          r.fallas || 0, v(r.fallasResumen), r.mantenciones || 0, f.length, ""],
        links: { 13: f.length ? ["Ver fotos", f.length === 1 ? fotoUrl(f[0].driveId) : carpetaUrl(f[0].carpetaId || cid)] : null } }; }),
    { fechas: [0, 7, 8], numeros: [3, 4], links: [13] });

  escribirHoja(ss, "Fallas", ["Fecha", "N°", "Patente", "Vehículo", "Sistema", "Descripción", "Gravedad", "¿Puede seguir trabajando?", "Estado", "Origen", "Reportó"],
    C.regs.filter(r => r.tipo === "falla").map(r => { const g = esGrave(r), abierta = r.estado !== "Cerrado";
      return { v: [fecha(r.fecha), C.interno(r), pat(C.pat(r)), C.vehiculo(r), v(r.sistema), v(r.descripcion), g ? "Grave" : "Leve", r.detenido ? "No" : "Sí", v(r.estado), r.origen || "Registro", v(r.responsable)],
        fondo: { 6: !abierta ? null : g ? "#e45b5b" : "#fde2e2" }, letra: { 6: abierta && g ? "#ffffff" : null } }; }),
    { fechas: [0], anchos: [[5, 320]] });

  escribirHoja(ss, "Mantenciones", ["Fecha entrada", "Fecha salida", "N°", "Patente", "Taller", "Tipo", "Km", "Paquete", "Servicio", "Causas y observaciones", "Origen"],
    C.mantenciones().map(m => ({ v: [fecha(m.fecha), fecha(m.salida), m.interno, pat(m.patente), m.taller, m.tipo, m.km == null ? "" : m.km, m.paquete, m.servicio, m.obs, m.origen] })),
    { fechas: [0, 1], numeros: [6], anchos: [[8, 300], [9, 320]] });

  const tiposFoto = (datos.fotos || []).slice().sort((a, b) => (b.fecha || "").localeCompare(a.fecha || "") || b.creado - a.creado);
  escribirHoja(ss, "Fotos", ["Fecha", "N°", "Patente", "Auditoría", "Parte", "Foto"],
    tiposFoto.map(f => { const c = C.camiones[f.camionId] || {}, a = LIMPIEZA.find(([k]) => k === f.area);
      return { v: [fecha(f.fecha), v(c.interno), norm(c.patente), TIPOS[f.tipo] || "", a ? "Limpieza · " + a[1] : "Otra", ""], links: { 5: ["Ver foto", fotoUrl(f.driveId)] } }; }),
    { fechas: [0], links: [5] });

  ["Flota", "Auditorías semanales", "Auditorías mensuales", "Fallas", "Mantenciones", "Fotos", HOJA_CONFIG].forEach((nombre, i) => {
    const h = ss.getSheetByName(nombre); if (!h) return;
    try { ss.setActiveSheet(h); ss.moveActiveSheet(i + 1); } catch (err) {  }
  });
  ss.getSheets().forEach(h => { if (/^(Hoja|Sheet)\s?1$/.test(h.getName()) && h.getLastRow() === 0 && ss.getSheets().length > 1) ss.deleteSheet(h); });
  try { ss.setActiveSheet(ss.getSheetByName("Flota")); } catch (err) {  }
}

function salida(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function igual(dado, esperado) {
  return typeof dado === "string" && !!esperado && dado.trim().toUpperCase() === String(esperado).toUpperCase();
}

function archivoDatos() {
  const p = PropertiesService.getScriptProperties(), id = p.getProperty("ARCHIVO_DATOS");
  if (id) { try { const f = DriveApp.getFileById(id); if (!f.isTrashed()) return f; } catch (err) {  } }
  const f = DriveApp.createFile(ARCHIVO_DATOS, JSON.stringify({ camiones: [], registros: [] }), "application/json");
  p.setProperty("ARCHIVO_DATOS", f.getId());
  return f;
}

function leer() {
  const datos = { camiones: [], registros: [], fotos: [] };
  let d = {}; try { d = JSON.parse(archivoDatos().getBlob().getDataAsString("UTF-8") || "{}"); } catch (err) { d = {}; }
  COLECCIONES.forEach(col => { if (Array.isArray(d[col])) datos[col] = d[col]; });
  return datos;
}

function guardar(datos) {
  const d = {}; COLECCIONES.forEach(col => { d[col] = datos[col]; });
  archivoDatos().setContent(JSON.stringify(d));
}

function fecha(s) {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(s || "");
  return m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : "";
}
function patente(p) { return (norm(p).match(/.{1,2}/g) || []).join("·"); }
function n(v) { return typeof v === "number" && isFinite(v) ? v : null; }
function v(x) { return x === null || x === undefined ? "" : x; }
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
    docDe: (c, k) => { const a = regs.find(r => r.camionId === c.id && r.tipo === "auditoria" && r[k]); return a ? a[k] : c[k] || ""; },
    estadoDoc: s => {
      const f = fecha(s); if (!f) return { estado: "Sin dato", nivel: "info", dias: null };
      const dias = Math.round((f - hoy) / 864e5);
      return dias < 0 ? { estado: "Vencido", nivel: "bad", dias: dias } : dias <= 60 ? { estado: "Por vencer", nivel: "warn", dias: dias } : { estado: "Vigente", nivel: "ok", dias: dias };
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
  C.mantenciones = () => regs.filter(r => ["mantencion", "preventiva", "correctiva"].indexOf(r.tipo) >= 0).map(r => ({
    fecha: r.fecha || "", salida: r.fechaSalida || (r.tipo !== "mantencion" ? r.cerrado || "" : ""), interno: C.interno(r), patente: C.pat(r), camionId: r.camionId,
    taller: r.taller || "", tipo: r.tipoMant || (r.tipo === "correctiva" ? "Correctivo" : "Preventivo"), km: n(r.km),
    paquete: r.paquete || "", servicio: r.servicio || r.sistema || "", obs: [r.descripcion, r.causa, r.repuestos].filter(Boolean).join(" · "), origen: r.origen || "App"
  }));
  return C;
}

function resumen(d) {
  const C = calculos(d);
  const camiones = d.camiones.slice().sort(ordenInterno).map(c => {
    const sem = C.de(c.id, "semanal"), men = C.de(c.id, "auditoria"), mt = C.mantencion(c);
    const doc = k => { const vence = C.docDe(c, k); return Object.assign({ vence: vence }, C.estadoDoc(vence)); };
    const dias = r => r ? Math.round((C.hoy - fecha(r.fecha)) / 864e5) : null;
    const desde = k => regs => regs.filter(r => r.camionId === c.id && fecha(r.fecha) && (C.hoy - fecha(r.fecha)) / 864e5 <= k);
    const km = C.kmDe(c), antes = C.regs.find(r => r.camionId === c.id && n(r.km) !== null && fecha(r.fecha) && (C.hoy - fecha(r.fecha)) / 864e5 >= 30);
    const lim = sem && sem.limpieza ? Object.values(sem.limpieza) : [];
    const rt = doc("vRevision"), pe = doc("vPermiso");
    return {
      id: c.id, interno: v(c.interno), codigoAnterior: v(c.codigoAnterior), patente: patente(c.patente), vehiculo: [c.marca, c.modelo].filter(Boolean).join(" "), anio: v(c.anio), tipo: v(c.tipoCamion),
      km: C.kmDe(c), proxMant: mt.prox, faltaMant: mt.falta, mantNivel: mt.nivel,
      rt: Object.assign(rt, { fecha: v(c.rtFecha) }), permiso: Object.assign(pe, { fecha: v(c.permisoFecha) }),
      km30: km !== null && antes && C.regs.some(r => r.camionId === c.id && n(r.km) !== null && fecha(r.fecha) && (C.hoy - fecha(r.fecha)) / 864e5 < 30) ? km - antes.km : null,
      fallas90: desde(90)(C.regs).filter(r => r.tipo === "falla").length,
      mant12: desde(365)(C.regs).filter(r => ["mantencion", "preventiva", "correctiva"].indexOf(r.tipo) >= 0).length,
      diasSemanal: dias(sem), diasMensual: dias(men),
      limpiezaPct: lim.length ? Math.round(lim.filter(x => x === "Bien").length / lim.length * 100) : null,
      deshielo: C.deshielo(c), fallasAbiertas: C.abiertas(c.id).length, fallasGraves: C.abiertas(c.id).filter(esGrave).length, estado: C.estado(c),
      ultSemanal: sem ? { fecha: sem.fecha, responsable: v(sem.responsable), limpieza: sem.limpieza || {} } : null,
      ultMensual: men ? { fecha: men.fecha, responsable: v(men.responsable) } : null,
      fotos: (d.fotos || []).filter(f => f.camionId === c.id).sort((a, b) => (b.fecha || "").localeCompare(a.fecha || "") || b.creado - a.creado).slice(0, 60)
        .map(f => ({ id: f.driveId, fecha: f.fecha, tipo: TIPOS[f.tipo] || "", area: f.area ? (LIMPIEZA.find(([k]) => k === f.area) || [, f.area])[1] : "" }))
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
      detenido: !!r.detenido, grave: esGrave(r), estado: v(r.estado), origen: r.origen || "Registro", responsable: v(r.responsable) })),
    mantenciones: C.mantenciones(),
    auditorias: C.regs.filter(r => r.tipo === "semanal" || r.tipo === "auditoria").slice(0, 400).map(r => ({ fecha: r.fecha, tipo: r.tipo === "semanal" ? "Semanal" : "Mensual",
      interno: C.interno(r), patente: C.pat(r), camionId: r.camionId, km: n(r.km), responsable: v(r.responsable), detalle: titulo(r), fallasResumen: v(r.fallasResumen),
      fotos: (d.fotos || []).filter(f => f.registroId === r.id).length }))
  };
}
