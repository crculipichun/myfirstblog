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
const FLOTA_INICIAL = __FLOTA__;
// Patentes dadas de baja (en rojo en la planilla "Estado de Flota"): se quitan de la flota
const BAJAS = ["LRTF81", "LRTF82", "HLYG99", "LPKF88"];
// Historial de mantenciones de la planilla "Estado de Flota" (solo camiones activos):
// [N° fila, patente, taller, fecha entrada, fecha salida, P/C, km, paquete, causas y observaciones, servicio si difiere del paquete]
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
const PANEL_HTML = __PANEL__;
