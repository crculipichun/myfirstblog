/**
 * Bitácora de Flota: la planilla de Google que recibe las auditorías de los celulares.
 *
 * Instalación (una vez), en una planilla nueva de Google Sheets:
 *   1. Extensiones → Apps Script. Borra lo que aparece, pega este archivo completo y guarda.
 *   2. Implementar → Nueva implementación → tipo "Aplicación web".
 *      Ejecutar como: Yo.  Quién tiene acceso: Cualquier usuario.  → Implementar y autoriza.
 *   3. Vuelve a la planilla y recárgala: menú Bitácora → Instalar o actualizar.
 *   4. La hoja "Configuración" muestra el link para los celulares, el código de acceso y el PIN.
 *
 * Los datos originales se guardan en la hoja oculta "_datos"; las demás hojas se vuelven a armar
 * con cada envío, así que se corrigen desde la app (las ediciones a mano se pierden).
 */

const HOJA_DATOS = "_datos";
const HOJA_CONFIG = "Configuración";
const COLECCIONES = ["camiones", "registros"];

// Copia de FLOTA_INICIAL de index.html: solo se usa para llenar la planilla la primera vez
const FLOTA_INICIAL = [{"id":"cam-1","interno":"1","patente":"STFF54","marca":"Mitsubishi","modelo":"Fuso Canter 413","tipoCamion":"Camioneta frigorífica","anio":2023,"intervalo":10000},
  {"id":"cam-2","interno":"2","patente":"STFG40","marca":"Mitsubishi","modelo":"Fuso Canter 413","tipoCamion":"Camioneta frigorífica","anio":2023,"intervalo":10000},
  {"id":"cam-3","interno":"3","patente":"STFF52","marca":"Mitsubishi","modelo":"Fuso Canter 413","tipoCamion":"Camioneta frigorífica","anio":2023,"intervalo":10000},
  {"id":"cam-4","interno":"4","patente":"SSYL78","marca":"Mitsubishi","modelo":"Fuso Canter 413","tipoCamion":"Camioneta frigorífica","anio":2023,"intervalo":10000},
  {"id":"cam-5","interno":"5","patente":"SSYL59","marca":"Mitsubishi","modelo":"Fuso Canter 413","tipoCamion":"Camioneta frigorífica","anio":2023,"intervalo":10000},
  {"id":"cam-6","interno":"6","patente":"VZTR73","marca":"Kia","modelo":"Frontier 2,5","tipoCamion":"Camioneta frigorífica","anio":2026,"intervalo":10000},
  {"id":"cam-7","interno":"7","patente":"STFF53","marca":"Mitsubishi","modelo":"Fuso Canter 413","tipoCamion":"Camioneta frigorífica","anio":2023,"intervalo":10000},
  {"id":"cam-8","interno":"8","patente":"SSYL80","marca":"Mitsubishi","modelo":"Fuso Canter 413","tipoCamion":"Camioneta frigorífica","anio":2023,"intervalo":10000},
  {"id":"cam-9","interno":"9","patente":"STFG52","marca":"Mitsubishi","modelo":"Fuso Canter 413","tipoCamion":"Camioneta frigorífica","anio":2023,"intervalo":10000},
  {"id":"cam-10","interno":"10","patente":"STFG41","marca":"Mitsubishi","modelo":"Fuso Canter 413","tipoCamion":"Camioneta frigorífica","anio":2023,"intervalo":10000},
  {"id":"cam-11","interno":"11","patente":"KWJV95","marca":"Kia","modelo":"Frontier 2,5","tipoCamion":"Camioneta frigorífica","anio":2019,"intervalo":10000},
  {"id":"cam-12","interno":"12","patente":"VYWC61","marca":"Kia","modelo":"Frontier 2,5","tipoCamion":"Camioneta frigorífica","anio":2026,"intervalo":10000},
  {"id":"cam-13","interno":"13","patente":"LRTF87","marca":"Kia","modelo":"Frontier 2,5","tipoCamion":"Camioneta frigorífica","anio":2020,"intervalo":10000},
  {"id":"cam-14","interno":"14","patente":"VRWD34","marca":"Kia","modelo":"Frontier 2,5","tipoCamion":"Camioneta frigorífica","anio":2026,"intervalo":10000},
  {"id":"cam-15","interno":"15","patente":"VRWD44","marca":"Kia","modelo":"Frontier 2,5","tipoCamion":"Camioneta frigorífica","anio":2026,"intervalo":10000},
  {"id":"cam-16","interno":"16","patente":"VRWD33","marca":"Kia","modelo":"Frontier 2,5","tipoCamion":"Camioneta frigorífica","anio":2026,"intervalo":10000},
  {"id":"cam-17","interno":"17","patente":"VZTR58","marca":"Hyundai","modelo":"Porter","tipoCamion":"Camioneta frigorífica","anio":2026,"intervalo":10000},
  {"id":"cam-815","interno":"815","patente":"RFBF71","marca":"Mitsubishi","modelo":"Fuso 815","tipoCamion":"Camioneta frigorífica","anio":2021,"intervalo":10000}];

const TIPOS = { auditoria: "Auditoría", preventiva: "Mant. preventiva", correctiva: "Mant. correctiva", falla: "Falla", aceite: "Cambio de aceite", odometro: "Lectura de odómetro" };
const FILTROS = [["fAceite", "Filtro de aceite"], ["fAire", "Filtro de aire"], ["fComb", "Filtro de combustible"], ["fSep", "Separador de agua"]];
const DOCS = [["vRevision", "Revisión técnica"], ["vPermiso", "Permiso de circulación"], ["vSoap", "SOAP"], ["vExtintor", "Extintor"]];

function onOpen() {
  SpreadsheetApp.getUi().createMenu("Bitácora").addItem("Instalar o actualizar", "instalar").addToUi();
}

/** Crea el código de acceso y el PIN, carga la flota y arma las hojas. Se puede repetir sin perder datos. */
function instalar() {
  const cfg = config();
  const datos = leer();
  if (!datos.camiones.length) {
    datos.camiones = FLOTA_INICIAL.map(c => Object.assign({}, c, { creado: Date.now() }));
    guardar(datos);
  }
  reconstruir(datos);
  escribirConfig(cfg);
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
  const link = url ? url + "?c=" + cfg.codigo : "Primero implementa el script como aplicación web (paso 2) y vuelve a usar Bitácora → Instalar o actualizar.";
  h.clear();
  h.getRange(1, 1, 6, 2).setValues([
    ["Bitácora de Flota", ""],
    ["Link para los celulares (pégalo en la app: Ajustes y conexión)", link],
    ["Código de acceso", cfg.codigo],
    ["PIN de administrador (agrega y edita camiones; no lo compartas)", cfg.pin],
    ["Para cambiar el código o el PIN", "Apps Script → Configuración del proyecto → Propiedades del script: CODIGO y PIN"],
    ["Para abrir en Excel", "Archivo → Descargar → Microsoft Excel (.xlsx)"]
  ]);
  h.getRange("A1").setFontSize(14).setFontWeight("bold");
  h.getRange("A2:A6").setFontWeight("bold");
  h.setColumnWidth(1, 380); h.setColumnWidth(2, 620);
  h.getRange("B2:B6").setWrap(true);
}

/* ---------- Comunicación con la app ---------- */
function doGet() {
  return salida({ app: "bitacora-flota" });
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

/* ---------- Hojas visibles (las mismas columnas que la planilla Excel de la app) ---------- */
function fecha(s) {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(s || "");
  return m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : "";
}
function patente(p) { return (String(p || "").toUpperCase().replace(/[^A-Z0-9]/g, "").match(/.{1,2}/g) || []).join("·"); }
function n(v) { return typeof v === "number" && isFinite(v) ? v : null; }
function v(x) { return x === null || x === undefined ? "" : x; }
function sn(b) { return b ? "Sí" : "No"; }

function titulo(r) {
  switch (r.tipo) {
    case "auditoria": return "Auditoría" + (r.fallas ? " · " + r.fallas + " falla" + (r.fallas === 1 ? "" : "s") : "") + " · " + (r.deshielo ? (r.deshieloHecho ? "deshielo hecho" : "necesita deshielo") : "sin deshielo");
    case "preventiva": return r.servicio || "Mantención preventiva";
    case "correctiva": return (r.sistema || "Correctiva") + (r.causa ? ": " + r.causa : "");
    case "falla": return "Falla " + String(r.severidad || "").toLowerCase() + " · " + (r.sistema || "");
    case "aceite": return "Aceite " + (r.tipoAceite || "") + (r.litros ? " · " + r.litros + " L" : "");
    case "odometro": return "Lectura de odómetro" + (r.horometro ? " · " + r.horometro + " h" : "");
  }
  return TIPOS[r.tipo] || r.tipo || "";
}

function reconstruir(d) {
  const camiones = {}; d.camiones.forEach(c => { camiones[c.id] = c; });
  const regs = d.registros.slice().sort((a, b) => (b.fecha || "").localeCompare(a.fecha || "") || (b.km || 0) - (a.km || 0) || (b.creado || 0) - (a.creado || 0));
  const hoy = new Date(); hoy.setHours(0, 0, 0, 0);
  const de = (cid, tipo) => regs.find(r => r.camionId === cid && r.tipo === tipo);
  const abiertas = cid => regs.filter(r => r.camionId === cid && r.tipo === "falla" && r.estado !== "Cerrado");
  const kmDe = c => { let m = n(c.km); regs.forEach(r => { if (r.camionId === c.id && n(r.km) !== null && (m === null || r.km > m)) m = r.km; }); return m; };
  const horoDe = c => { let m = n(c.horometro); regs.forEach(r => { if (r.camionId === c.id && n(r.horometro) !== null && (m === null || r.horometro > m)) m = r.horometro; }); return m; };
  const aceite = c => {
    const u = de(c.id, "aceite");
    if (!u || n(u.proximoKm) === null) return { u: u, rest: null, estado: "Sin registro" };
    const rest = u.proximoKm - (kmDe(c) || 0);
    return { u: u, rest: rest, estado: rest <= 0 ? "Vencido" : rest <= 1500 ? "Por vencer" : "Al día" };
  };
  const mantencion = c => {
    const u = regs.find(r => r.camionId === c.id && r.tipo === "auditoria" && n(r.proximaMant) !== null);
    return u ? { prox: u.proximaMant, falta: u.proximaMant - (kmDe(c) || 0) } : { prox: null, falta: null };
  };
  const deshielo = c => { const a = de(c.id, "auditoria"); return !!(a && a.deshielo && !a.deshieloHecho); };
  const docVencido = c => DOCS.some(([k]) => { const f = fecha(c[k]); return f && f < hoy; });
  const estado = c => {
    const f = abiertas(c.id);
    if (f.some(x => x.detenido)) return "Detenido";
    const mt = mantencion(c);
    if (f.length || ["Vencido", "Por vencer"].indexOf(aceite(c).estado) >= 0 || docVencido(c) || deshielo(c) || (mt.falta !== null && mt.falta <= 0)) return "Revisar";
    return "Operativo";
  };
  const pat = r => patente((camiones[r.camionId] || {}).patente || r.patente);
  const interno = r => (camiones[r.camionId] || {}).interno || "";
  const vehiculo = r => { const c = camiones[r.camionId] || {}; return [c.marca, c.modelo].filter(Boolean).join(" "); };
  const base = r => [fecha(r.fecha), pat(r), v(r.km)];
  const ordenInt = (a, b) => (Number(a.interno) || 1e9) - (Number(b.interno) || 1e9) || patente(a.patente).localeCompare(patente(b.patente));

  const hojas = [];
  hojas.push(["Flota", ["N° interno", "Patente", "Tipo", "Marca", "Modelo", "Año", "Odómetro (km)", "Próxima mantención (km)", "Km para mantención", "Necesita deshielo", "Última auditoría", "Responsable última auditoría", "Estado",
    "Horómetro (h)", "Conductor", "Faena / centro de costo", "Intervalo aceite (km)", "Último cambio aceite", "Km último cambio", "Próximo cambio (km)", "Km restantes", "Estado aceite", "Fallas abiertas",
    ...DOCS.map(([, l]) => "Vence " + l), "Color", "VIN / N° chasis", "N° motor", "Estanque (L)", "Neumáticos", "Notas"],
    d.camiones.slice().sort(ordenInt).map(c => {
      const a = aceite(c), au = de(c.id, "auditoria"), mt = mantencion(c);
      return [v(c.interno), patente(c.patente), v(c.tipoCamion), v(c.marca), v(c.modelo), v(c.anio), v(kmDe(c)), v(mt.prox), v(mt.falta), au ? sn(deshielo(c)) : "", au ? fecha(au.fecha) : "", au ? v(au.responsable) : "", estado(c),
        v(horoDe(c)), v(c.conductor), v(c.faena), v(c.intervalo), a.u ? fecha(a.u.fecha) : "", a.u ? v(a.u.km) : "", a.u ? v(a.u.proximoKm) : "", v(a.rest), a.estado, abiertas(c.id).length,
        ...DOCS.map(([k]) => fecha(c[k])), v(c.color), v(c.vin), v(c.motor), v(c.estanque), v(c.neumaticos), v(c.notas)];
    })]);
  hojas.push(["Auditorías", ["Fecha", "N° interno", "Patente", "Vehículo", "Odómetro (km)", "Próxima mantención (km)", "Km para mantención", "Responsable", "Necesita deshielo", "Deshielo realizado", "Fallas reportadas", "Detalle de fallas"],
    regs.filter(r => r.tipo === "auditoria").map(r => [fecha(r.fecha), interno(r), pat(r), vehiculo(r), v(r.km), v(r.proximaMant),
      n(r.proximaMant) !== null && n(r.km) !== null ? r.proximaMant - r.km : "", v(r.responsable), sn(r.deshielo), fecha(r.deshieloHecho), r.fallas || 0, v(r.fallasResumen)])]);
  hojas.push(["Fallas", ["Fecha", "Patente", "Odómetro (km)", "N° interno", "Reportado por", "Origen", "Sistema", "Severidad", "Camión detenido", "Estado", "Fecha cierre", "Descripción"],
    regs.filter(r => r.tipo === "falla").map(r => [...base(r), interno(r), v(r.responsable), r.origen || "Registro", v(r.sistema), v(r.severidad), sn(r.detenido), v(r.estado), fecha(r.cerrado), v(r.descripcion)])]);
  hojas.push(["Preventivas", ["Fecha", "Patente", "Odómetro (km)", "Responsable", "Servicio", "Repuestos", "Próximo (km)", "Próxima fecha", "Costo CLP", "Estado", "Observaciones"],
    regs.filter(r => r.tipo === "preventiva").map(r => [...base(r), v(r.responsable), v(r.servicio), v(r.repuestos), v(r.proximoKm), fecha(r.proximaFecha), v(r.costo), v(r.estado), v(r.descripcion)])]);
  hojas.push(["Correctivas", ["Fecha", "Patente", "Odómetro (km)", "Responsable", "Sistema", "Causa", "Repuestos", "Horas taller", "Taller", "Costo CLP", "Estado", "Fecha cierre", "Observaciones"],
    regs.filter(r => r.tipo === "correctiva").map(r => [...base(r), v(r.responsable), v(r.sistema), v(r.causa), v(r.repuestos), v(r.horas), v(r.taller), v(r.costo), v(r.estado), fecha(r.cerrado), v(r.descripcion)])]);
  hojas.push(["Cambios de aceite", ["Fecha", "Patente", "Odómetro (km)", "Responsable", "Aceite", "Litros", ...FILTROS.map(([, l]) => l), "Próximo cambio (km)", "Costo CLP", "Observaciones"],
    regs.filter(r => r.tipo === "aceite").map(r => [...base(r), v(r.responsable), v(r.tipoAceite), v(r.litros), ...FILTROS.map(([k]) => sn(r[k])), v(r.proximoKm), v(r.costo), v(r.descripcion)])]);
  hojas.push(["Odómetro", ["Fecha", "Patente", "Odómetro (km)", "Horómetro (h)", "Responsable", "Observaciones"],
    regs.filter(r => r.tipo === "odometro").map(r => [...base(r), v(r.horometro), v(r.responsable), v(r.descripcion)])]);
  hojas.push(["Todos los registros", ["Fecha", "Tipo", "Patente", "Odómetro (km)", "Responsable", "Detalle", "Estado", "Costo CLP", "Observaciones"],
    regs.map(r => [fecha(r.fecha), TIPOS[r.tipo] || v(r.tipo), pat(r), v(r.km), v(r.responsable), titulo(r), v(r.estado), v(r.costo), v(r.descripcion)])]);

  const ss = SpreadsheetApp.getActiveSpreadsheet();
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
        if (/^Fecha|Última auditoría|Último cambio|Vence |Próxima fecha|realizado/.test(t)) col.setNumberFormat("dd-mm-yyyy");
        else if (/Costo/.test(t)) col.setNumberFormat("$#,##0");
        else if (/km|Km/.test(t)) col.setNumberFormat("#,##0");
      });
      h.getRange(1, 1, filas.length + 1, cab.length).createFilter();
    }
    h.autoResizeColumns(1, cab.length);
  });
  const sobra = ss.getSheetByName("Hoja 1") || ss.getSheetByName("Sheet1");
  if (sobra && sobra.getLastRow() === 0 && ss.getSheets().length > 1) ss.deleteSheet(sobra);
}
