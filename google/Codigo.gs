const CORREOS = "cculipichun@dimerltda.cl, earaya@dimerltda.cl";

const URL_WEB = "";
const PANEL_WEB = "";
const _q = [164, 52, 41, 18, 27, 6, 23, 125, 55, 37, 32, 46, 8, 9, 1, 86, 62, 241, 231, 251, 233, 201, 196, 198, 192, 210, 237, 234, 133, 183, 187, 137, 158, 212, 151, 109, 122, 48, 115, 123, 87, 73, 80, 82, 46, 59, 111, 36, 56, 23, 14, 0, 15, 225, 227, 225, 230, 178];

const ARCHIVO_DATOS = "Flota DIMER - datos (no borrar).json";
const COLECCIONES = ["camiones", "registros"];
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

function instalar() {
  const cfg = config();
  const datos = leer();
  const p = PropertiesService.getScriptProperties();
  p.deleteProperty("URL_PUBLICA");
  if (p.getProperty("VERSION_DATOS") !== VERSION_DATOS) { migrarFlota(datos); p.setProperty("VERSION_DATOS", VERSION_DATOS); }
  importarHistorial(datos);
  guardar(datos);
  ScriptApp.getProjectTriggers().filter(t => t.getHandlerFunction() === "avisoDiario").forEach(t => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger("avisoDiario").timeBased().everyDays(1).atHour(8).create();
  mostrarLinks();
}

function mostrarLinks() {
  const cfg = config(), url = urlPublica();
  if (!url) { console.log("Primero haz Implementar → Nueva implementación → Aplicación web, y vuelve a ejecutar instalar."); return; }
  const panel = PANEL_WEB || url + "?vista=panel&c=" + cfg.codigo;
  const id = (/\/s\/([\w-]+)\/exec/.exec(url) || [])[1] || "";
  if (!URL_WEB && id.length < 60) console.log("Atención: este link puede ser el de prueba del editor. Copia el link de Implementar → Administrar implementaciones y escríbelo en const URL_WEB = \"…\" al inicio del código.");
  console.log([
    "Link para los celulares: " + url + "?c=" + cfg.codigo,
    "Panel web: " + panel,
    "Para Odoo: <iframe src=\"" + panel + "\" style=\"width:100%;height:1600px;border:0\"></iframe>",
    "JSON: " + url + "?vista=json&c=" + cfg.codigo,
    "Código de acceso: " + cfg.codigo,
    "PIN de administrador: " + cfg.pin,
    "Correos para avisos: " + (correosAvisos().join(", ") || "ninguno (escríbelos en la línea CORREOS al inicio del código)"),
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

function correosAvisos() {
  return String(CORREOS || "").split(/[,;\s]+/).map(x => x.trim()).filter(x => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(x));
}

const esGrave = r => !!r.detenido || /alta|cr[ií]tica|grave/i.test(r.severidad || "");

function enviarCorreo(asunto, filas, intro) {
  const para = correosAvisos();
  if (!para.length) return false;
  const url = urlPublica();
  const panel = PANEL_WEB || (url ? url + "?vista=panel&c=" + config().codigo : "");
  const celda = "padding:8px 10px;border-bottom:1px solid #e3e8ec;text-align:left;font:14px Arial,sans-serif";
  const html = '<div style="font:14px Arial,sans-serif;color:#26313b"><h2 style="color:#3c4650;margin:0 0 8px">' + asunto + "</h2><p>" + intro + "</p>" +
    '<table style="border-collapse:collapse"><tr>' + ["N°", "Patente", "Aviso", "Detalle"].map(t => '<th style="' + celda + ';color:#6b7783">' + t + "</th>").join("") + "</tr>" +
    filas.map(f => '<tr style="background:' + (f.fondo || "#fff") + '">' + [f.interno, f.patente, f.aviso, f.detalle].map(x => '<td style="' + celda + '">' + escHtml(x) + "</td>").join("") + "</tr>").join("") +
    "</table>" + (panel ? '<p><a href="' + panel + '">Abrir el panel de flota</a></p>' : "") + "</div>";
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
  console.log(ok ? "Correo enviado a: " + correosAvisos().join(", ") : "Escribe al menos un correo en la línea CORREOS al inicio del código.");
}

function doGet(e) {
  const q = (e && e.parameter) || {};
  if (q.vista === "panel" || q.vista === "json") {
    if (!igual(q.c, config().codigo)) {
      Utilities.sleep(1000);
      if (q.vista === "json" && /^[A-Za-z_$][\w$]{0,40}$/.test(q.callback || "")) return ContentService.createTextOutput(q.callback + "(" + JSON.stringify({ error: "codigo" }) + ");").setMimeType(ContentService.MimeType.JAVASCRIPT);
      return q.vista === "json" ? salida({ error: "codigo" })
        : HtmlService.createHtmlOutput("<p style='font:16px system-ui;padding:24px'>Falta el código de acceso en el link (…&amp;c=CODIGO). Pídeselo al administrador.</p>");
    }
    const r = resumen(leer());
    if (q.vista === "json" && /^[A-Za-z_$][\w$]{0,40}$/.test(q.callback || "")) return ContentService.createTextOutput(q.callback + "(" + JSON.stringify(r) + ");").setMimeType(ContentService.MimeType.JAVASCRIPT);
    if (q.vista === "json") return salida(r);
    const js = x => JSON.stringify(x).replace(/</g, "\\u003c");
    const html = PANEL_HTML.replace('const SERVIDOR_FIJO = "", CODIGO_FIJO = "";', () => "const SERVIDOR_FIJO = " + js(urlPublica()) + ", CODIGO_FIJO = " + js(String(q.c)) + ";")
      .replace("let DATOS = null;", () => "let DATOS = " + js(r) + ";");
    return HtmlService.createHtmlOutput(html).setTitle("Panel de Flota")
      .addMetaTag("viewport", "width=device-width, initial-scale=1")
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }
  return salida({ app: "bitacora-flota", v: _q.length });
}

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
    const cambios = Array.isArray(req.cambios) ? req.cambios : [], fallasNuevas = [];
    cambios.forEach(c => {
      if (COLECCIONES.indexOf(c.col) < 0) return;
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
      try { avisarFallasNuevas(fallasNuevas, datos); revisarVencimientos(datos); } catch (err) { console.error(err); }
    }
    return salida({
      datos: datos, admin: admin, rechazados: rechazados,
      planilla: { planilla: "", ultima: Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd'T'HH:mm:ss"), pendiente: false }
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

function archivoDatos() {
  const p = PropertiesService.getScriptProperties(), id = p.getProperty("ARCHIVO_DATOS");
  if (id) { try { const f = DriveApp.getFileById(id); if (!f.isTrashed()) return f; } catch (err) {  } }
  const f = DriveApp.createFile(ARCHIVO_DATOS, JSON.stringify({ camiones: [], registros: [] }), "application/json");
  p.setProperty("ARCHIVO_DATOS", f.getId());
  return f;
}

function leer() {
  const datos = { camiones: [], registros: [] };
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
      detenido: !!r.detenido, grave: esGrave(r), estado: v(r.estado), origen: r.origen || "Registro", responsable: v(r.responsable) })),
    mantenciones: C.mantenciones(),
    auditorias: C.regs.filter(r => r.tipo === "semanal" || r.tipo === "auditoria").slice(0, 400).map(r => ({ fecha: r.fecha, tipo: r.tipo === "semanal" ? "Semanal" : "Mensual",
      interno: C.interno(r), patente: C.pat(r), camionId: r.camionId, km: n(r.km), responsable: v(r.responsable), detalle: titulo(r), fallasResumen: v(r.fallasResumen) }))
  };
}

const PANEL_HTML = "<!doctype html>\n<html lang=\"es\">\n<head>\n<meta charset=\"utf-8\">\n<meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n<title>Panel de Flota DIMER</title>\n<style>\n:root {\n  --bg: #f4f6f8; --surface: #ffffff; --surface-2: #f7f9fa; --ink: #26313b; --muted: #6b7783; --line: #e3e8ec;\n  --head: #3c4650;\n  --ok: #2e7d4f; --ok-bg: rgba(76, 175, 106, .16); --warn: #9a6a00; --warn-bg: rgba(242, 184, 40, .20); --bad: #b3363a; --bad-bg: rgba(226, 92, 92, .16);\n  --info: #2f5f8f; --info-bg: rgba(84, 140, 200, .14);\n  --f: \"Segoe UI\", system-ui, -apple-system, Roboto, \"Helvetica Neue\", Arial, sans-serif;\n}\n* { box-sizing: border-box; }\nbody { margin: 0; background: var(--bg); color: var(--ink); font: 400 14px/1.45 var(--f); }\n.wrap { max-width: 1500px; margin: 0 auto; padding-left: max(16px, env(safe-area-inset-left, 0px)); padding-right: max(16px, env(safe-area-inset-right, 0px)); }\nheader { background: var(--surface); border-bottom: 1px solid var(--line); }\nheader .wrap { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; padding-block: 12px; }\n.marca { width: 38px; height: 38px; flex: none; }\nh1 { margin: 0; font-size: 20px; font-weight: 700; color: var(--head); }\n.sub { color: var(--muted); font-size: 13px; }\n.sp { flex: 1; }\nbutton { font: inherit; color: inherit; }\n.btn { border: 1px solid var(--line); background: var(--surface); border-radius: 8px; padding: 8px 14px; font-weight: 600; cursor: pointer; }\n.btn:hover { border-color: var(--muted); }\nmain { padding-block: 20px 48px; display: grid; gap: 28px; }\nmain > * { min-width: 0; }\nh2 { margin: 0; font-size: 20px; font-weight: 600; color: var(--head); }\n.nota { margin: 4px 0 0; color: var(--muted); font-size: 13px; max-width: 120ch; }\n.kpis { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; }\n.kpi { background: var(--surface); border: 1px solid var(--line); border-radius: 10px; padding: 12px 14px; display: grid; gap: 2px; }\n.kpi b { font-size: 26px; font-weight: 700; font-variant-numeric: tabular-nums; }\n.kpi span { color: var(--muted); font-size: 12.5px; line-height: 1.25; }\n.tools { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; margin-top: 10px; }\n.tools input { flex: 1 1 220px; max-width: 360px; min-height: 36px; padding: 7px 12px; border-radius: 8px; border: 1px solid var(--line); background: var(--surface); color: var(--ink); font: inherit; }\n.chip { border: 1px solid var(--line); background: var(--surface); border-radius: 999px; padding: 6px 12px; font-weight: 600; font-size: 13px; cursor: pointer; }\n.chip[aria-pressed=\"true\"] { background: var(--head); color: #fff; border-color: var(--head); }\n.tabla { background: var(--surface); border: 1px solid var(--line); border-radius: 10px; overflow: auto; max-height: 78vh; margin-top: 10px; }\ntable { border-collapse: separate; border-spacing: 0; width: 100%; font-size: 13.5px; }\nth { position: sticky; top: 0; z-index: 2; background: var(--surface); text-align: right; font-weight: 600; color: var(--head); padding: 12px; border-bottom: 1px solid var(--line); white-space: nowrap; cursor: pointer; user-select: none; }\nth.izq, td.izq { text-align: left; }\nth:hover { color: var(--info); }\nth .flecha { font-size: 11px; margin-left: 4px; }\ntd { padding: 10px 12px; border-bottom: 1px solid var(--line); text-align: right; white-space: nowrap; font-variant-numeric: tabular-nums; }\ntbody tr:last-child td { border-bottom: 0; }\ntbody tr.fila { cursor: pointer; }\ntbody tr.fila:hover td { filter: brightness(.97); }\ntbody tr.sel td { box-shadow: inset 0 2px 0 var(--info), inset 0 -2px 0 var(--info); }\ntd.d-ok { background: #d6f0dd; color: #1d5e36; } td.d-am1 { background: #fff3b0; color: #6b5200; } td.d-am2 { background: #ffd84d; color: #4d3a00; font-weight: 600; } td.d-bad { background: #f6b3b3; color: #7a1418; font-weight: 600; }\ntd.f-leve { background: #fde2e2; color: #8a1c20; } td.f-grave { background: #e45b5b; color: #fff; font-weight: 700; }\ntd.f-grave .muted { color: inherit; }\ntd[class*=\"d-\"] .muted { color: inherit; opacity: .8; }\n.d-ok .ind { color: #1d7f47; } .d-am1 .ind, .d-am2 .ind { color: #8a6500; } .d-bad .ind { color: #a3161b; }\n.leyenda { display: flex; gap: 14px; flex-wrap: wrap; font-size: 12.5px; color: var(--muted); margin-top: 6px; }\n.leyenda span::before { content: \"\"; display: inline-block; width: 12px; height: 12px; border-radius: 3px; margin-right: 5px; vertical-align: -2px; background: var(--c); }\n.det-grid div.d-ok { background: #d6f0dd; } .det-grid div.d-am1 { background: #fff3b0; } .det-grid div.d-am2 { background: #ffd84d; } .det-grid div.d-bad { background: #f6b3b3; }\n.ind { font-size: 10px; margin-right: 3px; }\ntd.txt { white-space: normal; min-width: 200px; max-width: 420px; text-align: left; }\n.plate { display: inline-block; border: 1.5px solid var(--head); border-radius: 4px; padding: 0 6px; font: 600 12.5px/1.5 ui-monospace, Menlo, Consolas, monospace; letter-spacing: .04em; background: #fff; color: #111; }\n.pill { display: inline-block; font-size: 12px; font-weight: 600; padding: 2px 9px; border-radius: 999px; background: var(--surface-2); color: var(--ink); border: 1px solid var(--line); }\n.muted { color: var(--muted); }\n.det { background: var(--surface); border: 1px solid var(--line); border-radius: 10px; padding: 16px; display: grid; gap: 12px; margin-top: 10px; }\n.det-top { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }\n.det-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 10px; }\n.det-grid div { background: var(--surface-2); border-radius: 8px; padding: 10px 12px; }\n.det-grid b { display: block; font-size: 12px; color: var(--muted); font-weight: 600; margin-bottom: 2px; }\n.vacio { padding: 18px; color: var(--muted); text-align: left; }\n.err { background: var(--bad-bg); color: var(--bad); padding: 10px 14px; border-radius: 8px; }\n#msg:empty { display: none; }\n</style>\n</head>\n<body>\n<header><div class=\"wrap\"><svg class=\"marca\" viewBox=\"0 0 512 512\" aria-hidden=\"true\"><rect width=\"512\" height=\"512\" rx=\"110\" fill=\"#ffffff\"/><rect x=\"28\" y=\"128\" width=\"330\" height=\"232\" rx=\"20\" fill=\"#3c4650\"/><path d=\"M366 196h70c10 0 18 5 23 13l33 52c4 6 6 13 6 20v67c0 7-6 12-12 12H366z\" fill=\"#3c4650\"/><path d=\"M392 216h40c5 0 9 2 12 6l26 40c2 3 0 7-4 7h-74z\" fill=\"#d7dee4\"/><rect x=\"20\" y=\"350\" width=\"478\" height=\"22\" rx=\"8\" fill=\"#2a333b\"/><circle cx=\"112\" cy=\"384\" r=\"46\" fill=\"#1f272e\"/><circle cx=\"112\" cy=\"384\" r=\"18\" fill=\"#d7dee4\"/><circle cx=\"416\" cy=\"384\" r=\"46\" fill=\"#1f272e\"/><circle cx=\"416\" cy=\"384\" r=\"18\" fill=\"#d7dee4\"/><g fill=\"none\" stroke=\"#ffffff\"><path d=\"M235.4 304.6A74 74 0 1 1 264.5 263.2\" stroke-width=\"18\" stroke-linecap=\"round\"/><path d=\"M235.4 304.6Q242.8 319.4 263.6 319.4\" stroke-width=\"18\" stroke-linecap=\"round\"/><path d=\"M193.0 244.0L193.0 199.6M193.0 224.0L184.8 215.9M193.0 224.0L201.2 215.9M193.0 211.1L187.0 205.2M193.0 211.1L199.0 205.2M193.0 244.0L154.5 221.8M175.7 234.0L164.5 237.0M175.7 234.0L172.7 222.9M164.5 227.6L156.4 229.8M164.5 227.6L162.4 219.4M193.0 244.0L154.5 266.2M175.7 254.0L172.7 265.1M175.7 254.0L164.5 251.0M164.5 260.4L162.4 268.6M164.5 260.4L156.4 258.2M193.0 244.0L193.0 288.4M193.0 264.0L201.2 272.1M193.0 264.0L184.8 272.1M193.0 276.9L199.0 282.8M193.0 276.9L187.0 282.8M193.0 244.0L231.5 266.2M210.3 254.0L221.5 251.0M210.3 254.0L213.3 265.1M221.5 260.4L229.6 258.2M221.5 260.4L223.6 268.6M193.0 244.0L231.5 221.8M210.3 234.0L213.3 222.9M210.3 234.0L221.5 237.0M221.5 227.6L223.6 219.4M221.5 227.6L229.6 229.8\" stroke-width=\"8.64\" stroke-linecap=\"round\"/></g></svg><h1>Panel de Flota</h1><span class=\"sub\" id=\"act\"></span><span class=\"sp\"></span><button class=\"btn\" id=\"btn-act\" type=\"button\">Actualizar</button></div></header>\n<main class=\"wrap\">\n  <div id=\"msg\"></div>\n  <section class=\"kpis\" id=\"kpis\"></section>\n  <section>\n    <h2>Camiones</h2>\n    <p class=\"nota\">Toca el título de una columna para ordenar; toca una fila para ver el detalle.</p>\n    <div class=\"leyenda\"><b>Revisión técnica y permiso de circulación:</b><span style=\"--c:#d6f0dd\">Vigente (más de 60 días)</span><span style=\"--c:#fff3b0\">Vence en 31 a 60 días</span><span style=\"--c:#ffd84d\">Vence en 30 días o menos</span><span style=\"--c:#f6b3b3\">Vencido</span></div>\n    <div class=\"leyenda\"><b>Fallas abiertas:</b><span style=\"--c:#fde2e2\">Leve</span><span style=\"--c:#e45b5b\">Grave (el camión no puede trabajar, o severidad alta o crítica)</span></div>\n    <div class=\"tools\"><input id=\"q\" type=\"search\" placeholder=\"Buscar por N°, patente o código\" aria-label=\"Buscar camión\"><span id=\"chips\"></span></div>\n    <div class=\"tabla\" id=\"t-camiones\"></div>\n    <div id=\"detalle\"></div>\n  </section>\n  <section>\n    <h2 id=\"t2\"></h2>\n    <p class=\"nota\" id=\"n2\"></p>\n    <div class=\"tools\" id=\"tabs\"></div>\n    <div class=\"tabla\" id=\"t-registros\"></div>\n  </section>\n</main>\n<script>\n\"use strict\";\nconst _q = [164, 52, 41, 18, 27, 6, 23, 125, 55, 37, 32, 46, 8, 9, 1, 86, 62, 241, 231, 251, 233, 201, 196, 198, 192, 210, 237, 234, 133, 183, 187, 137, 158, 212, 151, 109, 122, 48, 115, 123, 87, 73, 80, 82, 46, 59, 111, 36, 56, 23, 14, 0, 15, 225, 227, 225, 230, 178];\nconst _r = a => String.fromCharCode(...a.map((n, i) => n ^ ((i * 7 + 13) & 255)));\n(() => { const m = document.createElement(\"meta\"); m.name = \"copyright\"; m.content = _r(_q); document.head.appendChild(m); })();\nconst PARAM = new URLSearchParams(location.search);\nconst leerLocal = k => { try { return localStorage.getItem(k) || \"\"; } catch (e) { return \"\"; } };\nconst guardarLocal = (k, x) => { try { localStorage.setItem(k, x); } catch (e) {} };\nconst SERVIDOR_FIJO = \"\", CODIGO_FIJO = \"\";\nconst SERVIDOR = (PARAM.get(\"u\") || SERVIDOR_FIJO || leerLocal(\"panel_u\")).trim(), CODIGO = (PARAM.get(\"c\") || CODIGO_FIJO || leerLocal(\"panel_c\")).trim();\nlet DATOS = null;\nconst UI = { q: \"\", estado: \"\", sel: null, tab: \"fallas\", orden: {} };\nconst $ = s => document.querySelector(s);\nconst esc = v => String(v == null ? \"\" : v).replace(/[&<>\"']/g, c => ({ \"&\": \"&amp;\", \"<\": \"&lt;\", \">\": \"&gt;\", '\"': \"&quot;\", \"'\": \"&#39;\" }[c]));\nconst miles = n => n == null || n === \"\" ? \"–\" : Number(n).toLocaleString(\"es-CL\");\nconst fF = s => s && /^\\d{4}-\\d{2}-\\d{2}/.test(s) ? s.slice(0, 10).split(\"-\").reverse().join(\"-\") : (s || \"–\");\nconst pill = t => `<span class=\"pill\">${esc(t)}</span>`;\nconst fallaColor = (graves, total) => !total ? null : graves ? [\"f-grave\", graves === 1 ? \"1 falla grave\" : graves + \" fallas graves\"] : [\"f-leve\", total === 1 ? \"1 falla leve\" : total + \" fallas leves\"];\nconst IND = { \"d-ok\": \"●\", \"d-am1\": \"●\", \"d-am2\": \"▲\", \"d-bad\": \"✖\" };\nconst docColor = d => d == null ? null : d < 0 ? [\"d-bad\", \"vencido hace \" + -d + \" día\" + (d === -1 ? \"\" : \"s\")] : d <= 30 ? [\"d-am2\", \"vence en \" + d + \" día\" + (d === 1 ? \"\" : \"s\")]\n  : d <= 60 ? [\"d-am1\", \"vence en \" + d + \" días\"] : [\"d-ok\", \"vigente, faltan \" + d + \" días\"];\n\n\nconst COL_CAMIONES = [\n  { t: \"N°\", izq: 1, v: c => c.interno, orden: c => { const m = /^([A-Z]*)(\\d+)$/i.exec(String(c.interno)); return m ? (m[1] ? 1e6 : 0) + Number(m[2]) : 1e9; }, f: c => `<b>${esc(c.interno || \"–\")}</b>` },\n  { t: \"Patente\", izq: 1, v: c => c.patente, f: c => `<span class=\"plate\">${esc(c.patente)}</span>` },\n  { t: \"Vehículo\", izq: 1, v: c => c.vehiculo, f: c => `${esc(c.vehiculo)} <span class=\"muted\">${esc(c.anio)}</span>` },\n  { t: \"Estado\", izq: 1, v: c => ({ Detenido: 0, Revisar: 1, Operativo: 2 })[c.estado], f: c => esc(c.estado) },\n  { t: \"Odómetro\", v: c => c.km, f: c => c.km == null ? \"–\" : miles(c.km) + \" km\" },\n  { t: \"Km 30 días\", v: c => c.km30, f: c => c.km30 == null ? \"–\" : miles(c.km30) },\n  { t: \"Faltan mant.\", v: c => c.faltaMant,\n    f: c => c.faltaMant == null ? \"–\" : c.faltaMant <= 0 ? \"atrasada \" + miles(-c.faltaMant) : miles(c.faltaMant) + \" km\" },\n  { t: \"Rev. técnica\", v: c => c.rt.dias, color: c => docColor(c.rt.dias), f: c => c.rt.vence ? `${fF(c.rt.vence)} <span class=\"muted\">(${c.rt.dias < 0 ? \"vencida\" : c.rt.dias + \" d\"})</span>` : \"sin dato\" },\n  { t: \"Permiso circ.\", v: c => c.permiso.dias, color: c => docColor(c.permiso.dias), f: c => c.permiso.vence ? `${fF(c.permiso.vence)} <span class=\"muted\">(${c.permiso.dias < 0 ? \"vencido\" : c.permiso.dias + \" d\"})</span>` : \"sin dato\" },\n  { t: \"Fallas abiertas\", v: c => c.fallasAbiertas, color: c => fallaColor(c.fallasGraves, c.fallasAbiertas), f: c => !c.fallasAbiertas ? \"0\" : miles(c.fallasAbiertas) + (c.fallasGraves ? \" (\" + c.fallasGraves + \" grave\" + (c.fallasGraves === 1 ? \"\" : \"s\") + \")\" : \" leve\" + (c.fallasAbiertas === 1 ? \"\" : \"s\")) },\n  { t: \"Fallas 90 días\", v: c => c.fallas90, f: c => miles(c.fallas90) },\n  { t: \"Mant. 12 meses\", v: c => c.mant12, f: c => miles(c.mant12) },\n  { t: \"% limpieza\", v: c => c.limpiezaPct, f: c => c.limpiezaPct == null ? \"–\" : c.limpiezaPct + \" %\" },\n  { t: \"Últ. semanal\", v: c => c.diasSemanal, f: c => c.diasSemanal == null ? \"nunca\" : c.diasSemanal === 0 ? \"hoy\" : \"hace \" + c.diasSemanal + \" d\" },\n  { t: \"Últ. mensual\", v: c => c.diasMensual, f: c => c.diasMensual == null ? \"nunca\" : c.diasMensual === 0 ? \"hoy\" : \"hace \" + c.diasMensual + \" d\" },\n  { t: \"Deshielo\", v: c => c.deshielo ? 1 : 0, f: c => c.diasMensual == null ? \"–\" : c.deshielo ? \"necesita\" : \"no\" }\n];\n\nfunction tabla(id, filas, cols, opts) {\n  const o = UI.orden[id] || {};\n  if (o.i != null) {\n    const c = cols[o.i], clave = c.orden || c.v;\n    filas = filas.slice().sort((a, b) => {\n      const x = clave(a), y = clave(b);\n      if (x == null || x === \"\") return 1; if (y == null || y === \"\") return -1;\n      return (typeof x === \"number\" && typeof y === \"number\" ? x - y : String(x).localeCompare(String(y), \"es\", { numeric: true })) * o.dir;\n    });\n  }\n  const head = cols.map((c, i) => `<th class=\"${c.izq ? \"izq\" : \"\"}\" data-orden=\"${id}:${i}\">${esc(c.t)}${o.i === i ? `<span class=\"flecha\">${o.dir > 0 ? \"▲\" : \"▼\"}</span>` : \"\"}</th>`).join(\"\");\n  const cuerpo = filas.length ? filas.map(r => `<tr class=\"${opts.fila ? \"fila\" : \"\"} ${opts.sel && opts.sel(r) ? \"sel\" : \"\"}\" ${opts.fila ? `data-id=\"${esc(r.id)}\"` : \"\"}>${cols.map((c, i) => {\n    const col = c.color ? c.color(r) : null;\n    return `<td class=\"${c.izq ? \"izq\" : \"\"} ${c.txt ? \"txt\" : \"\"} ${col ? col[0] : \"\"}\" ${col ? `title=\"${esc(col[1])}\"` : \"\"}>${col && IND[col[0]] ? `<span class=\"ind\">${IND[col[0]]}</span>` : \"\"}${c.f ? c.f(r) : esc(c.v(r))}</td>`;\n  }).join(\"\")}</tr>`).join(\"\") : `<tr><td class=\"vacio\" colspan=\"${cols.length}\">${opts.vacio}</td></tr>`;\n  $(\"#\" + id).innerHTML = `<table><thead><tr>${head}</tr></thead><tbody>${cuerpo}</tbody></table>`;\n}\n\nfunction kpis() {\n  const k = DATOS.kpi;\n  const t = (v, l) => `<div class=\"kpi\"><b>${v}</b><span>${l}</span></div>`;\n  $(\"#kpis\").innerHTML = [\n    t(k.operativos + \"/\" + k.total, \"Operativos\", \"ok\"),\n    t(k.detenidos, \"Detenidos\", k.detenidos ? \"bad\" : \"\"),\n    t(k.fallas, \"Fallas abiertas\", k.fallas ? \"bad\" : \"\"),\n    t(k.deshielo, \"Necesitan deshielo\", k.deshielo ? \"warn\" : \"\"),\n    t(k.mantencion, \"Mantención próxima o atrasada\", k.mantencion ? \"warn\" : \"\"),\n    t(k.docsVencidos, \"Documentos vencidos\" + (k.docsPorVencer ? \" · \" + k.docsPorVencer + \" vencen en 60 días\" : \"\"), k.docsVencidos ? \"bad\" : k.docsPorVencer ? \"warn\" : \"\"),\n    t(k.semanalAlDia + \"/\" + k.total, \"Auditoría semanal al día\", k.semanalAlDia < k.total ? \"warn\" : \"ok\"),\n    t(k.mensualAlDia + \"/\" + k.total, \"Auditoría mensual al día\", k.mensualAlDia < k.total ? \"warn\" : \"ok\")\n  ].join(\"\");\n}\n\nfunction camionesFiltrados() {\n  const q = UI.q.toUpperCase().replace(/[^A-Z0-9]/g, \"\");\n  return DATOS.camiones.filter(c => (!UI.estado || c.estado === UI.estado) &&\n    (!q || String(c.interno).toUpperCase() === q || c.patente.replace(/[^A-Z0-9]/g, \"\").includes(q) || String(c.codigoAnterior).toUpperCase() === q));\n}\n\nfunction camiones() {\n  if (!DATOS) return;\n  $(\"#chips\").innerHTML = [\"\", \"Detenido\", \"Revisar\", \"Operativo\"].map(e => `<button class=\"chip\" data-estado=\"${e}\" aria-pressed=\"${UI.estado === e}\">${e || \"Todos\"}${e ? \" · \" + DATOS.camiones.filter(c => c.estado === e).length : \"\"}</button>`).join(\" \");\n  tabla(\"t-camiones\", camionesFiltrados(), COL_CAMIONES, { fila: true, sel: c => c.id === UI.sel, vacio: \"No hay camiones con ese filtro.\" });\n}\n\nfunction detalle() {\n  const c = DATOS.camiones.find(x => x.id === UI.sel);\n  if (!c) { $(\"#detalle\").innerHTML = \"\"; return; }\n  const s = c.ultSemanal, l = s ? Object.entries(s.limpieza || {}) : [];\n  const nombres = { cabina: \"Cabina\", caja: \"Caja frigorífica\", exterior: \"Exterior\", seguridad: \"Seguridad\" };\n  $(\"#detalle\").innerHTML = `<div class=\"det\">\n    <div class=\"det-top\"><b style=\"font-size:22px\">N° ${esc(c.interno || \"–\")}</b><span class=\"plate\" style=\"font-size:15px\">${esc(c.patente)}</span><b>${esc(c.vehiculo)}</b>\n      <span class=\"muted\">${esc(c.tipo)} ${esc(c.anio)}${c.codigoAnterior ? \" · código anterior \" + esc(c.codigoAnterior) : \"\"}</span>${pill(c.estado)}<span class=\"sp\"></span><button class=\"btn\" data-cerrar>Cerrar</button></div>\n    <div class=\"det-grid\">\n      <div><b>Odómetro</b>${c.km == null ? \"–\" : miles(c.km) + \" km\"}</div>\n      <div><b>Próxima mantención</b>${c.proxMant == null ? \"–\" : miles(c.proxMant) + \" km\"}</div>\n      <div class=\"${(docColor(c.rt.dias) || [\"\"])[0]}\"><b>Revisión técnica</b>${c.rt.fecha ? \"Hecha \" + esc(fF(c.rt.fecha)) + \" · \" : \"\"}vence ${esc(fF(c.rt.vence))}</div>\n      <div class=\"${(docColor(c.permiso.dias) || [\"\"])[0]}\"><b>Permiso de circulación</b>${c.permiso.fecha ? \"Pagado \" + esc(fF(c.permiso.fecha)) + \" · \" : \"\"}vence ${esc(fF(c.permiso.vence))}</div>\n      <div><b>Última auditoría semanal</b>${s ? esc(fF(s.fecha)) + \" · \" + esc(s.responsable) + (l.length ? \"<br>\" + l.map(([k, v]) => esc(nombres[k] || k) + \": \" + pill(v)).join(\" \") : \"\") : \"–\"}</div>\n      <div><b>Última auditoría mensual</b>${c.ultMensual ? esc(fF(c.ultMensual.fecha)) + \" · \" + esc(c.ultMensual.responsable) : \"–\"}</div>\n    </div>\n    <span class=\"muted\">Las listas de abajo muestran solo este camión.</span></div>`;\n}\n\nconst COL_FALLAS = [\n  { t: \"Fecha\", izq: 1, v: f => f.fecha, f: f => fF(f.fecha) }, { t: \"N°\", izq: 1, v: f => f.interno, f: f => `<b>${esc(f.interno || \"–\")}</b>` },\n  { t: \"Patente\", izq: 1, v: f => f.patente, f: f => `<span class=\"plate\">${esc(f.patente)}</span>` }, { t: \"Sistema\", izq: 1, v: f => f.sistema },\n  { t: \"Descripción\", izq: 1, txt: 1, v: f => f.descripcion || \"–\" }, { t: \"Gravedad\", izq: 1, v: f => f.grave ? 1 : 0, color: f => f.estado === \"Cerrado\" ? null : f.grave ? [\"f-grave\", \"falla grave\"] : [\"f-leve\", \"falla leve\"], f: f => f.grave ? \"Grave\" : \"Leve\" },\n  { t: \"Detenido\", izq: 1, v: f => f.detenido ? 1 : 0, f: f => f.detenido ? \"sí\" : \"no\" },\n  { t: \"Estado\", izq: 1, v: f => f.estado, f: f => pill(f.estado) }, { t: \"Origen\", izq: 1, v: f => f.origen }, { t: \"Reportó\", izq: 1, v: f => f.responsable }\n];\nconst LISTAS = {\n  fallas: { t: \"Fallas abiertas\", n: \"Fallas reportadas en auditorías o por el administrador que todavía no se cierran.\", filas: () => DATOS.fallas.filter(f => f.estado !== \"Cerrado\"), cols: COL_FALLAS },\n  todas: { t: \"Todas las fallas\", n: \"Historial completo de fallas.\", filas: () => DATOS.fallas, cols: COL_FALLAS },\n  mantenciones: { t: \"Mantenciones\", n: \"Mantenciones del historial de la empresa y las informadas en las auditorías mensuales.\", filas: () => DATOS.mantenciones, cols: [\n    { t: \"Entrada\", izq: 1, v: m => m.fecha, f: m => fF(m.fecha) }, { t: \"Salida\", izq: 1, v: m => m.salida, f: m => fF(m.salida) },\n    { t: \"N°\", izq: 1, v: m => m.interno, f: m => `<b>${esc(m.interno || \"–\")}</b>` }, { t: \"Patente\", izq: 1, v: m => m.patente, f: m => `<span class=\"plate\">${esc(m.patente)}</span>` },\n    { t: \"Taller\", izq: 1, v: m => m.taller }, { t: \"Tipo\", izq: 1, v: m => m.tipo, f: m => pill(m.tipo) },\n    { t: \"Km\", v: m => m.km, f: m => miles(m.km) }, { t: \"Paquete\", izq: 1, v: m => m.paquete }, { t: \"Servicio\", izq: 1, txt: 1, v: m => m.servicio },\n    { t: \"Causas y observaciones\", izq: 1, txt: 1, v: m => m.obs }] },\n  auditorias: { t: \"Auditorías\", n: \"Auditorías semanales y mensuales enviadas por los choferes.\", filas: () => DATOS.auditorias, cols: [\n    { t: \"Fecha\", izq: 1, v: a => a.fecha, f: a => fF(a.fecha) }, { t: \"Tipo\", izq: 1, v: a => a.tipo, f: a => pill(a.tipo) },\n    { t: \"N°\", izq: 1, v: a => a.interno, f: a => `<b>${esc(a.interno || \"–\")}</b>` }, { t: \"Patente\", izq: 1, v: a => a.patente, f: a => `<span class=\"plate\">${esc(a.patente)}</span>` },\n    { t: \"Odómetro\", v: a => a.km, f: a => miles(a.km) }, { t: \"Responsable\", izq: 1, v: a => a.responsable }, { t: \"Detalle\", izq: 1, txt: 1, v: a => a.detalle },\n    { t: \"Fallas\", izq: 1, txt: 1, v: a => a.fallasResumen || \"–\" }] }\n};\n\nfunction registros() {\n  if (!DATOS) return;\n  const L = LISTAS[UI.tab], sel = DATOS.camiones.find(x => x.id === UI.sel);\n  $(\"#t2\").textContent = L.t + (sel ? \" · N° \" + sel.interno : \"\");\n  $(\"#n2\").textContent = L.n + \" Toca el título de una columna para ordenar.\";\n  $(\"#tabs\").innerHTML = Object.entries(LISTAS).map(([k, x]) => `<button class=\"chip\" data-tab=\"${k}\" aria-pressed=\"${UI.tab === k}\">${x.t}</button>`).join(\" \") + (sel ? ` <button class=\"chip\" data-cerrar>Ver todos los camiones</button>` : \"\");\n  tabla(\"t-registros\", L.filas().filter(r => !UI.sel || r.camionId === UI.sel), L.cols, { vacio: \"No hay registros en esta lista.\" });\n}\n\nfunction pintar() {\n  if (!DATOS) return;\n  $(\"#act\").textContent = \"Actualizado \" + DATOS.actualizado.replace(/^(\\d{4})-(\\d{2})-(\\d{2})/, \"$3-$2-$1\");\n  kpis(); camiones(); detalle(); registros();\n}\n\nfunction aviso(t) { $(\"#msg\").innerHTML = t ? `<div class=\"err\">${esc(t)}</div>` : \"\"; }\n\nfunction jsonp(url) {\n  return new Promise((ok, mal) => {\n    const nombre = \"_p\" + Date.now(), s = document.createElement(\"script\");\n    const fin = () => { delete window[nombre]; s.remove(); clearTimeout(t); };\n    const t = setTimeout(() => { fin(); mal(new Error(\"tiempo\")); }, 20000);\n    window[nombre] = d => { fin(); ok(d); };\n    s.onerror = () => { fin(); mal(new Error(\"red\")); };\n    s.src = url + \"&callback=\" + nombre;\n    document.head.appendChild(s);\n  });\n}\n\nasync function actualizar() {\n  if (window.google && google.script && google.script.run) {\n    $(\"#btn-act\").textContent = \"Actualizando…\";\n    google.script.run\n      .withSuccessHandler(d => { DATOS = d; aviso(\"\"); $(\"#btn-act\").textContent = \"Actualizar\"; pintar(); })\n      .withFailureHandler(e => { aviso(\"No se pudo actualizar: \" + (e && e.message || \"\")); $(\"#btn-act\").textContent = \"Actualizar\"; })\n      .datosPanel(CODIGO);\n    return;\n  }\n  if (!/^https:\\/\\/script\\.google\\.com\\/.+\\/exec$/.test(SERVIDOR) || !CODIGO) { aviso(\"Falta el link del script y el código de acceso: escríbelos en SERVIDOR_FIJO y CODIGO_FIJO dentro de este archivo.\"); return; }\n  $(\"#btn-act\").textContent = \"Actualizando…\";\n  try {\n    const base = SERVIDOR + \"?vista=json&c=\" + encodeURIComponent(CODIGO);\n    let d;\n    try { d = await (await fetch(base, { redirect: \"follow\" })).json(); }\n    catch (e1) { d = await jsonp(base); }\n    if (d.error === \"codigo\") { aviso(\"El código de acceso del link no es correcto.\"); return; }\n    if (!d.camiones) { aviso(\"El script no devolvió los datos del panel. Revisa que esté implementado con la última versión.\"); return; }\n    DATOS = d; guardarLocal(\"panel_u\", SERVIDOR); guardarLocal(\"panel_c\", CODIGO); aviso(\"\"); pintar();\n  } catch (e) {\n    aviso(\"No se pudo conectar con el script. Revisa que la implementación tenga acceso para «Cualquier usuario» y que el link sea el de Implementar → Administrar implementaciones.\");\n  } finally { $(\"#btn-act\").textContent = \"Actualizar\"; }\n}\n\ndocument.addEventListener(\"click\", e => {\n  const th = e.target.closest(\"th[data-orden]\");\n  if (th) { const [id, i] = th.dataset.orden.split(\":\"), o = UI.orden[id] || {}; UI.orden[id] = { i: Number(i), dir: o.i === Number(i) ? -o.dir : 1 }; id === \"t-camiones\" ? camiones() : registros(); return; }\n  const f = e.target.closest(\"tr.fila\"); if (f) { UI.sel = UI.sel === f.dataset.id ? null : f.dataset.id; pintar(); if (UI.sel) $(\"#detalle\").scrollIntoView({ behavior: \"smooth\", block: \"nearest\" }); return; }\n  const est = e.target.closest(\"[data-estado]\"); if (est) { UI.estado = est.dataset.estado; camiones(); return; }\n  const tab = e.target.closest(\"[data-tab]\"); if (tab) { UI.tab = tab.dataset.tab; registros(); return; }\n  if (e.target.closest(\"[data-cerrar]\")) { UI.sel = null; pintar(); return; }\n  if (e.target.closest(\"#btn-act\")) actualizar();\n});\n$(\"#q\").addEventListener(\"input\", e => { UI.q = e.target.value; camiones(); });\nif (DATOS) pintar(); else actualizar();\nsetInterval(actualizar, 5 * 60 * 1000);\n</script>\n</body>\n</html>\n";
