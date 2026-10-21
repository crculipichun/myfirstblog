const DERECHOS = "© 2026 Cristian Culipichun. Todos los derechos reservados.";

const HOJA_DATOS = "_datos";
const HOJA_CONFIG = "Configuración";
const COLECCIONES = ["camiones", "registros"];
const VERSION_DATOS = "2026-10-21";

const FLOTA_INICIAL = __FLOTA__;
const BAJAS = ["LRTF81", "LRTF82", "HLYG99", "LPKF88"];
const HISTORIAL = __HISTORIAL__;

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
  SpreadsheetApp.getUi().createMenu("Bitácora").addItem("Instalar o actualizar", "instalar").addItem("Enviar correo de prueba", "probarCorreo").addItem("Cambiar link de la aplicación web", "cambiarLink").addToUi();
}

function instalar() {
  const cfg = config();
  const datos = leer();
  const p = PropertiesService.getScriptProperties();
  if (p.getProperty("VERSION_DATOS") !== VERSION_DATOS) { migrarFlota(datos); p.setProperty("VERSION_DATOS", VERSION_DATOS); }
  importarHistorial(datos);
  guardar(datos);
  quitarHojasAntiguas();
  escribirConfig(cfg);
  ScriptApp.getProjectTriggers().filter(t => t.getHandlerFunction() === "avisoDiario").forEach(t => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger("avisoDiario").timeBased().everyDays(1).atHour(8).create();
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

function quitarHojasAntiguas() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ["Flota", "Documentos", "Auditorías", "Auditorías semanales", "Auditorías mensuales", "Mantenciones", "Preventivas", "Correctivas", "Fallas", "Cambios de aceite", "Odómetro", "Todos los registros"]
    .forEach(nombre => { const h = ss.getSheetByName(nombre); if (h && ss.getSheets().length > 1) ss.deleteSheet(h); });
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
  const propia = PropertiesService.getScriptProperties().getProperty("URL_PUBLICA");
  const u = (propia || ScriptApp.getService().getUrl() || "").trim();
  return u.replace(/^https:\/\/script\.google\.com\/a\/macros\/[^/]+\//, "https://script.google.com/macros/").replace(/^https:\/\/script\.google\.com\/a\/[^/]+\/macros\//, "https://script.google.com/macros/").replace(/\/(dev|exec)(\?.*)?$/, "/exec");
}

function cambiarLink() {
  const ui = SpreadsheetApp.getUi();
  const r = ui.prompt("Link de la aplicación web", "Pega el link que termina en /exec (Implementar → Administrar implementaciones). Déjalo vacío para usar el automático.", ui.ButtonSet.OK_CANCEL);
  if (r.getSelectedButton() !== ui.Button.OK) return;
  const t = r.getResponseText().trim();
  const p = PropertiesService.getScriptProperties();
  if (!t) p.deleteProperty("URL_PUBLICA");
  else if (/^https:\/\/script\.google\.com\/.*\/s\/[\w-]+\/(exec|dev)/.test(t)) p.setProperty("URL_PUBLICA", t.split("?")[0]);
  else { ui.alert("Ese link no es de una aplicación web de Apps Script."); return; }
  escribirConfig(config());
  ui.alert("Listo. La hoja Configuración usa ahora: " + urlPublica());
}

function escribirConfig(cfg) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const h = ss.getSheetByName(HOJA_CONFIG) || ss.insertSheet(HOJA_CONFIG);
  const url = urlPublica();
  const falta = "Primero implementa el script como aplicación web (paso 2) y vuelve a usar Bitácora → Instalar o actualizar.";
  const panel = url ? url + "?vista=panel&c=" + cfg.codigo : falta;
  const previos = textoCorreos();
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
    [FILA_CORREOS, previos]
  ]);
  h.getRange("B9").setBackground("#fff3b0").setNote("Escribe aquí los correos que reciben los avisos, separados por coma.");
  h.getRange("A1").setFontSize(14).setFontWeight("bold");
  h.getRange("A2:A9").setFontWeight("bold");
  h.setColumnWidth(1, 420); h.setColumnWidth(2, 720);
  h.getRange("B2:B9").setWrap(true);
}

const FILA_CORREOS = "Correos para avisos (separados por coma)";

function textoCorreos() {
  const h = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(HOJA_CONFIG);
  if (!h || h.getLastRow() < 1) return "";
  const fila = h.getRange(1, 1, h.getLastRow(), 2).getValues().find(f => f[0] === FILA_CORREOS);
  return fila ? String(fila[1] || "") : "";
}

function correosAvisos() {
  return textoCorreos().split(/[,;\s]+/).map(x => x.trim()).filter(x => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(x));
}

const esGrave = r => !!r.detenido || /alta|cr[ií]tica|grave/i.test(r.severidad || "");

function enviarCorreo(asunto, filas, intro) {
  const para = correosAvisos();
  if (!para.length) return false;
  const url = urlPublica();
  const panel = url ? url + "?vista=panel&c=" + config().codigo : "";
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
  SpreadsheetApp.getUi().alert(ok ? "Correo enviado a: " + correosAvisos().join(", ") : "Escribe al menos un correo en la hoja Configuración, fila «" + FILA_CORREOS + "».");
}

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
  return salida({ app: "bitacora-flota", derechos: DERECHOS });
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
    try { datos[f[0]].push(JSON.parse(f[2])); } catch (err) {  }
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

const PANEL_HTML = __PANEL__;
