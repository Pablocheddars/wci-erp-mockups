import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

const LS_REVIEWER = "wci_reviewer_name";

const B = {
  primary: "#1A1A1A", accent: "#F5C518", surface: "#FFFFFF", surfaceHover: "#F8F8F6", border: "#E8E6E1",
  text: "#1A1A1A", textMuted: "#7A7770", textLight: "#AEABA4",
  danger: "#DC3545", dangerBg: "#DC354512", success: "#28A745", successBg: "#28A74512",
  warning: "#E67E00", warningBg: "#E67E0012", info: "#2E86DE", infoBg: "#2E86DE12",
  purple: "#8E44AD", purpleBg: "#8E44AD12",
};
const font = "'DM Sans', system-ui, sans-serif";
const serif = "'DM Serif Display', Georgia, serif";

function Badge({ children, color = B.textMuted, bg = B.surfaceHover }) {
  return <span style={{ fontSize: 11, fontWeight: 650, color, background: bg, padding: "2px 8px", borderRadius: 10, whiteSpace: "nowrap" }}>{children}</span>;
}
function Card({ children, style: sx = {}, onClick }) {
  return <div onClick={onClick} style={{ background: B.surface, border: `1px solid ${B.border}`, borderRadius: 12, padding: "16px 20px", ...sx }}>{children}</div>;
}

const NOTES = {
  inventario: { what: "WCI tiene 3 zonas: bodega seca, cámara de frío, cocina de producción. Stock por zona con transferencias.", poc: "Datos mock. En producción se conecta a supplies, warehouse_items, supply_movements existentes.", validate: ["¿Las 3 zonas cubren todos los espacios reales?", "¿Transferencias entre zonas — flujo claro?", "¿Merma valorizada como proceso diario o semanal?", "¿Conteo físico semanal o mensual?"], decision: "Cada zona = warehouse en Supabase. default_warehouse_id define destino por insumo.", roles: ["Gte. Operaciones (full)", "Bodeguero (edita)", "Jefe cocina local (ve su inventario en Prep)"] },
  compras: { what: "WCI compra a proveedores. Modelo: factura primero, recepción después (abastella). 3 niveles de ingreso de factura.", poc: "SII automático, PDF+IA, manual son mocks. En producción: SII API, Claude API para PDF, formulario.", validate: ["¿OC → Factura → Recepción es el flujo correcto?", "¿Sugerencia automática de items bajo mínimo es útil?", "¿Mapeo de glosas del proveedor es necesario?", "¿Recepción sin factura se usa en la práctica?"], decision: "Costeo promedio ponderado se recalcula al recepcionar.", roles: ["Gte. Operaciones (full — crea OC)", "Bodeguero (recepciona)"] },
  pedidos: { what: "Locales piden a WCI. WCI confirma según stock disponible (= físico − reservado − stock mínimo), consolida, y hace picking por zona.", poc: "Vista local es referencia (vivirá en Prep). Picking mobile-first es el corazón.", validate: ["¿Ventanas de entrega reflejan realidad?", "¿Hora de corte (20:00 día anterior) es correcta?", "¿Stock disponible = físico − reservado − stock mínimo es lógica correcta?", "¿Picking por zona (frío primero) tiene sentido?", "¿Falta algún local?", "¿El stock mínimo por producto está bien como concepto?"], decision: "Al confirmar → reservas de stock. Fuera de ventana = urgente con aprobación.", roles: ["Gte. Operaciones (confirma)", "Bodeguero (picking)", "Admin local (pide desde Prep)"] },
  catalogo: { what: "Lo que WCI vende: distribución (reventa) + producción (elaborados propios). Margen variable por producto.", poc: "Simulación de márgenes vs costos fijos es clave — permite saber si WCI cubre sus costos.", validate: ["¿Productos reflejan lo que WCI realmente vende?", "¿Margen variable vs fijo tiene sentido?", "¿Simulación costos fijos es útil?", "¿Visibilidad por cliente se usa?"], decision: "Precio = costo × (1 + margen%). Alerta cuando insumo sube: absorber o mantener margen.", roles: ["CEO (precios)", "Chef (catálogo)", "Gte. Operaciones (ve)"] },
  despacho: { what: "Pedidos confirmados → ruta con paradas → carga inversa en auto del repartidor → entrega con foto → cierre. Reclamos post-entrega generan NC.", poc: "Vista del repartidor es mobile-first. Foto de entrega es opcional por ahora.", validate: ["¿1-2 rutas/día es realista?", "¿Carga inversa se entiende?", "¿Foto de entrega es necesaria?", "¿Flujo reclamos → NC es correcto?", "¿Quién maneja el vehículo?"], decision: "Repartidor usa auto propio. Foto de kilometraje inicio/fin de ruta para control bencina. Stock WCI baja al despachar. Stock local sube al confirmar recepción. Auto-confirm 48h.", roles: ["Gte. Operaciones (rutas)", "Bodeguero (carga)", "Repartidor (entrega)"] },
  produccion: { what: "Elaborados propios: salsas, hamburguesas premoldeadas. Plan inteligente, registro, QC, trazabilidad por lotes.", poc: "Plan calcula: demanda pedidos + buffer 20%. Etiqueta térmica estandarizada con campos LOT, fechas, QR, etc.", validate: ["¿Recetas de ejemplo son correctas?", "¿Rendimiento variable por receta (p. ej. 78–97%) es realista?", "¿QC (Apariencia color+olor, temp, sabor, textura) cubre todo?", "¿Trazabilidad por lotes es necesaria?", "¿La etiqueta tiene toda la info?"], decision: "Rendimiento configurable por receta, no fijo. Etiqueta térmica estandarizada. Picking sugiere FIFO. Insumos bajan de cocina, elaborados suben a destino.", roles: ["Gte. Operaciones (supervisa)", "Chef (recetas, QC)"] },
  facturacion: { what: "1 factura = 1 despacho, vía Ingefactura API. NC por recepción parcial, rechazo o reclamo.", poc: "Mock de Ingefactura. En producción se conecta a API real.", validate: ["¿1 factura por despacho es correcto?", "¿Razones sociales están todas?", "¿Falta guía de despacho o boleta?"], decision: "Factura al RUT del local. NC referencia factura original y ajusta CxC.", roles: ["Gte. Finanzas (gestiona)", "Admin local (ve en Prep)"] },
  recetas: { what: "Recetas del menú con food cost dinámico. Cross-location: ¿cada local consume lo que debería según ventas?", poc: "FC calculado con costos reales. Cross-location detecta desperdicio o robo.", validate: ["¿Platos e ingredientes son correctos?", "¿Targets FC (30% burgers) son realistas?", "¿Cross-location es clara?", "¿Workflow carta tiene sentido?", "¿Quién propone y quién aprueba?"], decision: "FC = costo real × porción. Consumo teórico = ventas × porción. Desviación = problema.", roles: ["Chef (full)", "CEO (aprueba carta)", "Admin local (ve)"] },
  calidad: { what: "Split: autocontrol diario (Prep Plus genérico) + auditorías en terreno (WCI exclusivo). Acciones correctivas compartidas. 5 secciones: BPM SEREMI, Planillas día, Certificados, Descarte RILES, No Conformidad.", poc: "Editor de plantillas y flujo de auditoría son sub-componentes separados que se abren desde aquí.", validate: ["¿Categorías autocontrol cubren todo?", "¿Frecuencia auditorías es realista?", "¿Criterios QC son correctos?", "¿Umbrales score (≥90% / 70–89% / <70%) son adecuados?", "¿Necesitan reportes SEREMI?"], decision: "Autocontrol = Prep Plus genérico. Auditorías = WCI exclusivo. Ambos generan acciones.", roles: ["Enc. Calidad (full)", "Chef (auditoría gastro)", "Admin local (autocontrol)"] },
  experiencia: { what: "CRM reclamos con SLA, NPS propio, mystery shopper con journey mapping y Kaizen, ranking locales.", poc: "ManyChat webhook clasifica DMs de IG y crea tickets automáticos en el CRM.", validate: ["¿Touchpoints journey son correctos?", "¿SLA por severidad (4h/24h/48h) son realistas?", "¿Workflow reclamos tiene sentido?", "¿Mystery shopper lo hace interno o externo?", "¿Ranking con score compuesto sirve?", "¿Falta algún canal de feedback?"], decision: "Reclamos recurrentes por touchpoint → ciclo Kaizen automático.", roles: ["Enc. UX (full)", "Gte. Operaciones (escala)", "Admin local (ve su local)"] },
  finanzas: { what: "P&L por local + WCI sin eliminación intra-grupo. Budget. Ventas brutas vs ingresos netos. Presupuesto de caja (ingresos − egresos por día). Conciliación bancaria.", poc: "Números mock pero estructura real. Clave: ventas ≠ ingresos (comisiones apps se descuentan).", validate: ["¿Estructura P&L es correcta?", "¿Sin eliminación intra-grupo tiene sentido?", "¿Conciliación bancaria se entiende?", "¿Cierres de caja con tolerancia son necesarios?"], decision: "Compras del local a WCI = gasto real del local = ingreso real de WCI. No se consolida.", roles: ["Gte. Finanzas (full)", "CEO (ve todo)", "Admin local (ve su P&L)"] },
  comisiones: { what: "Comisiones de apps por razón social × canal. Cada contrato es independiente.", poc: "Matriz razón social × canal es el modelo real. Seguimiento compara cobrado vs configurado.", validate: ["¿5 razones sociales y locales son correctos?", "¿Porcentajes son realistas?", "¿Faltan plataformas?", "¿Comparación real vs config es útil?", "¿Simulador de negociación sirve?"], decision: "Tabla channel_commissions: legal_entity_id + channel_id + commission_pct + effective_from.", roles: ["CEO (configura)", "Gte. Finanzas (monitorea)"] },
  cxp_cxc: { what: "CxP = deuda a proveedores. CxC = deuda de locales a WCI. Aging, pagos parciales, mora.", poc: "Operadores con mora pueden ser bloqueados para pedidos. Locales propios solo alertas.", validate: ["¿Plazos proveedores (30d/contado) son correctos?", "¿Plazos cobro locales (7d) son correctos?", "¿Bloqueo operadores morosos tiene sentido?"], decision: "CxP desde facturas proveedores. CxC desde facturas a locales. NC ajustan CxC.", roles: ["Gte. Finanzas (full)", "Gte. Operaciones (edita)"] },
  rrhh: { what: "RRHH centralizado: dotación, asistencia, turnos cross-location. Cada local registra vía Portal Trabajador.", poc: "Liquidaciones = placeholder honesto (Previred pendiente). Turnos son grilla editable.", validate: ["¿Cargos reflejan estructura real?", "¿Dotación presupuestada es correcta?", "¿Capacitaciones legales son las que exige la ley?", "¿Qué info falta de cada empleado?"], decision: "Empleados ya existen en Prep. WCI agrega vista cross-location.", roles: ["Gte. Operaciones (full)", "Gte. Admin/RRHH (full)", "Admin local (su local)"] },
  activo_fijo: { what: "Registro y control de equipos de operaciones (hornos, freidoras, cámaras, vehículos, etc.) asociados a responsables por local.", poc: "Módulo nuevo solicitado por Gte. Operaciones. Permite llevar la cuenta de activos, programar mantenciones, y asociar cada equipo a un responsable.", validate: ["¿Qué equipos son los más críticos de trackear?", "¿Las mantenciones son preventivas o solo correctivas?", "¿Necesitan depreciación contable o solo control operativo?", "¿Cada equipo se asocia a un local o a una persona?"], decision: "Activo fijo como módulo de Operaciones, no de Finanzas. Foco en control operativo, no contable.", roles: ["Gte. Operaciones (full)", "Admin local (ve equipos de su local)"] },
  roles: { what: "Quién ve qué. 9 roles WCI + Admin Local. Niveles: Full, Editar, Ver, Propio (RLS), Sin acceso.", poc: "Propuesta inicial — se ajusta según feedback de esta validación.", validate: ["¿9 roles cubren a todos?", "¿Falta o sobra alguno?", "¿Niveles de acceso por módulo son correctos?", "¿Admin Local ve suficiente?", "¿Enc. UX debería ver calidad?"], decision: "'Propio' = RLS filtra por organization_id.", roles: ["CEO (define)", "Todos (validan su acceso)"] },
};

const GUIDES = {
  nacho: { name: "Nacho (Jefe de BI)", icon: "📊", intro: "Revisá todo con doble lente: 1) ¿los flujos operativos tienen sentido? y 2) ¿los datos que generan permiten armar inteligencia de negocio, dashboards y reportes?", priority: [
    { id: "pedidos", why: "Flujo core — ¿ventanas, confirmación, picking, stock disponible = físico − reservado − stock mínimo tiene sentido? ¿Qué métricas se podrían sacar?" },
    { id: "finanzas", why: "Estructura P&L, modelo sin eliminación intra-grupo. ¿Permite armar dashboards de rentabilidad por local, producto, período?" },
    { id: "comisiones", why: "Matriz razón social × canal. ¿Genera data para analizar impacto real de comisiones? ¿Tracking real vs config es útil?" },
    { id: "inventario", why: "3 zonas, transferencias, merma. ¿Los movimientos generan data para rotación, forecast, y detección de pérdidas?" },
    { id: "compras", why: "OC → factura → recepción. ¿El flujo cierra bien? ¿Evolución de precios de insumos es accionable?" },
    { id: "recetas", why: "Cross-location teórico vs real es pura BI. ¿Detecta patrones de desperdicio? ¿Food cost targets son realistas?" },
    { id: "produccion", why: "Plan inteligente + trazabilidad. ¿El rendimiento real vs teórico por lote es medible? ¿Sirve para optimizar?" },
    { id: "despacho", why: "Rutas, entregas, tiempos, reclamos. ¿Se puede medir eficiencia logística? ¿Los reclamos por tipo/local generan insights?" },
    { id: "experiencia", why: "NPS + ranking + reclamos por touchpoint. ¿Permite correlacionar experiencia con ventas? ¿Los datos de ManyChat son útiles?" },
    { id: "calidad", why: "Scores de auditorías y autocontroles. ¿Son comparables entre locales y períodos? ¿Se puede rankear calidad?" },
    { id: "catalogo", why: "Simulación de márgenes, evolución precios, productos sin movimiento. ¿Permite análisis de pricing?" },
    { id: "rrhh", why: "Dotación, rotación, horas extra, asistencia. ¿Los datos permiten correlacionar RRHH con productividad?" },
    { id: "roles", why: "¿Los 9 roles cubren a todos? ¿Falta un rol de BI/analytics con acceso de lectura a todo?" },
  ], skip: "Revisá todo — tu mirada transversal es clave. Si un flujo no genera datos útiles para reportes, es un problema de diseño." },
  gte_ops: { name: "Gte. Operaciones", icon: "⚙️", intro: "Tu foco: ¿los flujos operativos reflejan el día a día real de WCI y los locales?", priority: [
    { id: "pedidos", why: "Corazón de la operación — ventanas, cortes, picking, confirmación" },
    { id: "inventario", why: "¿Las 3 zonas cubren todo? ¿Transferencias correctas?" },
    { id: "compras", why: "¿OC → factura → recepción funciona?" },
    { id: "despacho", why: "Ruta, carga inversa, entrega con foto, reclamos" },
    { id: "produccion", why: "¿Plan inteligente es útil? ¿Trazabilidad es necesaria?" },
    { id: "calidad", why: "¿Autocontroles y auditorías cubren lo que necesitan?" },
    { id: "rrhh", why: "Dotación, turnos, asistencia cross-location" },
  ], skip: "No te preocupes por comisiones por razón social o estructura P&L — eso lo ve Finanzas." },
};

const MODULES = [
  { cat: "Operaciones WCI", color: B.info, items: [
    { id: "inventario", icon: "📦", name: "Inventario", p: 7, tabs: ["Stock 3 zonas", "Transferencias", "Conteo", "Merma", "Alertas", "Movimientos", "Config"] },
    { id: "compras", icon: "🧾", name: "Compras", p: 7, tabs: ["OC", "Facturas 3 niveles", "Recepción", "Proveedores", "Reportes"] },
    { id: "pedidos", icon: "📋", name: "Pedidos", p: 10, tabs: ["Panel WCI", "Consolidar", "Picking", "Vista local", "Ventanas", "Reportes"] },
    { id: "catalogo", icon: "🏷️", name: "Catálogo", p: 8, tabs: ["Catálogo", "Precios", "Alertas", "Historial", "Reportes"] },
    { id: "despacho", icon: "🚛", name: "Despacho", p: 8, tabs: ["Rutas", "Cargar", "Entregar", "Recepción", "Cierre", "Reclamos"] },
    { id: "produccion", icon: "👩‍🍳", name: "Producción", p: 7, tabs: ["Plan", "Registrar", "QC", "BOM", "Trazabilidad", "Reportes"] },
    { id: "facturacion", icon: "📄", name: "Facturación", p: 5, tabs: ["Facturas", "NC", "Vista local", "Config"] },
    { id: "activo_fijo", icon: "🏗️", name: "Activo Fijo", p: 4, tabs: ["Equipos", "Asignación", "Mantenciones", "Reportes"] },
  ]},
  { cat: "Marca", color: B.purple, items: [
    { id: "recetas", icon: "📖", name: "Recetas + FC", p: 9, tabs: ["Recetas", "Cross-location", "Carta", "Alertas", "Auditoría"] },
    { id: "calidad", icon: "✅", name: "Calidad BPM", p: 8, tabs: ["Autocontroles", "Pilares + NC", "Auditorías", "Temperaturas", "Acciones", "Plantillas", "Reportes"] },
    { id: "experiencia", icon: "⭐", name: "Experiencia", p: 8, tabs: ["CRM", "NPS", "Mystery", "Ranking", "ManyChat"] },
  ]},
  { cat: "Finanzas", color: B.success, items: [
    { id: "finanzas", icon: "💰", name: "Finanzas", p: 10, tabs: ["P&L", "Budget", "Ventas", "Ppto. caja", "Conciliación", "Tesorería"] },
    { id: "comisiones", icon: "📊", name: "Comisiones", p: 3, tabs: ["Matriz", "Seguimiento", "Análisis"] },
    { id: "cxp_cxc", icon: "💸", name: "CxP + CxC", p: 10, tabs: ["CxP", "CxC"] },
  ]},
  { cat: "Gestión", color: B.warning, items: [
    { id: "rrhh", icon: "👥", name: "RRHH", p: 8, tabs: ["Dotación", "Asistencia", "Turnos", "Liquidaciones", "Capacitaciones", "Reportes"] },
    { id: "roles", icon: "🔐", name: "Roles", p: 0, tabs: ["Matriz", "Por rol"] },
  ]},
];

function responseGlyph(response) {
  if (response === "si") return "✓";
  if (response === "no") return "✗";
  return "~";
}

function ReviewerNameModal({ onPick, showOther, setShowOther, otherDraft, setOtherDraft, onSaveOther, font, B, Card }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(26,26,26,0.5)", zIndex: 10000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, fontFamily: font }}>
      <Card style={{ maxWidth: 380, width: "100%", padding: "24px 22px" }}>
        <div style={{ fontSize: 17, fontWeight: 800, marginBottom: 16, color: B.text }}>¿Quién eres?</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <button type="button" onClick={() => onPick("Nacho")} style={{ padding: "12px 16px", borderRadius: 10, border: `1px solid ${B.border}`, background: B.surfaceHover, cursor: "pointer", fontFamily: font, fontSize: 15, fontWeight: 700 }}>Nacho</button>
          <button type="button" onClick={() => onPick("Yefersson")} style={{ padding: "12px 16px", borderRadius: 10, border: `1px solid ${B.border}`, background: B.surfaceHover, cursor: "pointer", fontFamily: font, fontSize: 15, fontWeight: 700 }}>Yefersson</button>
          {!showOther ? (
            <button type="button" onClick={() => setShowOther(true)} style={{ padding: "12px 16px", borderRadius: 10, border: `1px dashed ${B.border}`, background: B.surface, cursor: "pointer", fontFamily: font, fontSize: 15, fontWeight: 600, color: B.textMuted }}>Otro</button>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <input value={otherDraft} onChange={e => setOtherDraft(e.target.value)} placeholder="Tu nombre" style={{ padding: "10px 12px", borderRadius: 8, border: `1px solid ${B.border}`, fontFamily: font, fontSize: 14 }} />
              <button type="button" onClick={onSaveOther} style={{ padding: "10px 16px", borderRadius: 10, border: "none", background: B.primary, color: B.accent, cursor: "pointer", fontFamily: font, fontSize: 14, fontWeight: 700 }}>Continuar</button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

function ModuleDetailView({ selectedModule, mod, n, reviewerName, onBack, navigate, font, B, Card, Badge }) {
  const [feedbackRows, setFeedbackRows] = useState([]);
  const [generalComments, setGeneralComments] = useState([]);
  const [questionDrafts, setQuestionDrafts] = useState({});
  const [generalDraft, setGeneralDraft] = useState("");
  const [loadingFb, setLoadingFb] = useState(true);
  const [fbError, setFbError] = useState(null);
  const [savingGeneral, setSavingGeneral] = useState(false);

  const loadModuleFeedback = useCallback(async () => {
    setLoadingFb(true);
    setFbError(null);
    const [fbRes, gcRes] = await Promise.all([
      supabase.from("wci_review_feedback").select("*").eq("module_id", selectedModule),
      supabase.from("wci_review_comments").select("*").eq("module_id", selectedModule).order("created_at", { ascending: false }),
    ]);
    if (fbRes.error) setFbError(fbRes.error.message);
    else setFeedbackRows(fbRes.data || []);
    if (!fbRes.error && gcRes.error) setFbError(gcRes.error.message);
    if (!gcRes.error) setGeneralComments(gcRes.data || []);
    setLoadingFb(false);
  }, [selectedModule]);

  useEffect(() => { loadModuleFeedback(); }, [loadModuleFeedback]);

  const feedbackForIndex = i => feedbackRows.filter(r => r.question_index === i);

  async function saveQuestionResponse(i, response) {
    if (!reviewerName) return;
    const commentText = (questionDrafts[i] || "").trim();
    const { error } = await supabase.from("wci_review_feedback").upsert(
      {
        module_id: selectedModule,
        question_index: i,
        reviewer_name: reviewerName,
        response,
        comment: commentText || null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "module_id,question_index,reviewer_name" }
    );
    if (error) setFbError(error.message);
    else await loadModuleFeedback();
  }

  async function submitGeneralComment() {
    const text = generalDraft.trim();
    if (!text || !reviewerName) return;
    setSavingGeneral(true);
    setFbError(null);
    const { error } = await supabase.from("wci_review_comments").insert({
      module_id: selectedModule,
      reviewer_name: reviewerName,
      comment: text,
    });
    setSavingGeneral(false);
    if (error) setFbError(error.message);
    else {
      setGeneralDraft("");
      await loadModuleFeedback();
    }
  }

  const btnCompact = { padding: "4px 8px", fontSize: 11, fontWeight: 700, borderRadius: 6, border: "none", cursor: "pointer", fontFamily: font, whiteSpace: "nowrap" };

  return (
    <div style={{ fontFamily: font, background: "#F5F4F0", minHeight: "100vh" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&family=DM+Serif+Display&display=swap');*{box-sizing:border-box;margin:0;padding:0}::-webkit-scrollbar{width:5px}::-webkit-scrollbar-thumb{background:#d4d2cd;border-radius:3px}`}</style>
      <header style={{ background: B.surface, borderBottom: `1px solid ${B.border}`, padding: "0 24px", height: 52, display: "flex", alignItems: "center", gap: 12 }}>
        <button type="button" onClick={onBack} style={{ border: "none", background: "transparent", cursor: "pointer", fontSize: 16, padding: "4px 8px", fontFamily: font, color: B.textMuted }}>← Volver</button>
        <span style={{ fontSize: 24 }}>{mod?.icon}</span>
        <div style={{ fontSize: 16, fontWeight: 700 }}>{mod?.name}</div>
      </header>
      <main style={{ padding: "20px 32px", maxWidth: 900, margin: "0 auto" }}>
        <Card style={{ background: `${B.accent}08`, border: `1px solid ${B.accent}30`, marginBottom: 14 }}>
          <div style={{ display: "flex", gap: 10 }}><span style={{ fontSize: 20 }}>🧪</span><div><div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>Proof of Concept — datos de ejemplo</div><div style={{ fontSize: 13, color: B.textMuted, lineHeight: 1.5 }}>{n?.poc}</div></div></div>
        </Card>
        <Card style={{ marginBottom: 14 }}><h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>¿Qué es?</h4><div style={{ fontSize: 13, lineHeight: 1.6 }}>{n?.what}</div></Card>
        <Card style={{ marginBottom: 14 }}><h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>Pantallas</h4><div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{mod?.tabs?.map((t, i) => <div key={i} style={{ padding: "8px 14px", background: B.surfaceHover, borderRadius: 8, fontSize: 13, fontWeight: 600, border: `1px solid ${B.border}` }}>{t}</div>)}</div></Card>
        {n?.validate && (
          <Card style={{ marginBottom: 14, border: `1px solid ${B.warning}30` }}>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: B.warning, marginBottom: 10 }}>❓ Preguntas para validar</h4>
            {fbError && <div style={{ fontSize: 12, color: B.danger, marginBottom: 10 }}>{fbError}</div>}
            {loadingFb && <div style={{ fontSize: 12, color: B.textMuted, marginBottom: 8 }}>Cargando respuestas…</div>}
            {n.validate.map((q, i) => (
              <div key={i} style={{ padding: "10px 0", borderBottom: i < n.validate.length - 1 ? `1px solid ${B.border}` : "none" }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "flex-start", justifyContent: "space-between" }}>
                  <div style={{ flex: "1 1 240px", minWidth: 0 }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      <span style={{ color: B.warning, fontWeight: 700 }}>{i + 1}.</span>
                      <span style={{ fontSize: 13, lineHeight: 1.5 }}>{q}</span>
                    </div>
                    {feedbackForIndex(i).length > 0 && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
                        {feedbackForIndex(i).map(row => (
                          <Badge key={`${row.reviewer_name}-${row.question_index}-${row.updated_at}`} color={B.text} bg={B.surfaceHover}>
                            {row.reviewer_name}: {responseGlyph(row.response)}{row.comment ? ` - ${row.comment}` : ""}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
                    <input
                      value={questionDrafts[i] ?? ""}
                      onChange={e => setQuestionDrafts(d => ({ ...d, [i]: e.target.value }))}
                      placeholder="Comentario..."
                      disabled={!reviewerName}
                      style={{ width: 130, maxWidth: "100%", padding: "4px 8px", fontSize: 12, borderRadius: 6, border: `1px solid ${B.border}`, fontFamily: font, background: reviewerName ? B.surface : B.surfaceHover }}
                    />
                    <button type="button" disabled={!reviewerName} onClick={() => saveQuestionResponse(i, "si")} style={{ ...btnCompact, background: B.successBg, color: B.success }}>✓ Sí</button>
                    <button type="button" disabled={!reviewerName} onClick={() => saveQuestionResponse(i, "no")} style={{ ...btnCompact, background: B.dangerBg, color: B.danger }}>✗ No</button>
                    <button type="button" disabled={!reviewerName} onClick={() => saveQuestionResponse(i, "parcial")} style={{ ...btnCompact, background: `${B.accent}40`, color: B.warning }}>~ Parcial</button>
                  </div>
                </div>
              </div>
            ))}
            <div style={{ marginTop: 18, paddingTop: 16, borderTop: `1px solid ${B.border}` }}>
              <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 8, color: B.text }}>Comentario general</h4>
              <textarea
                value={generalDraft}
                onChange={e => setGeneralDraft(e.target.value)}
                placeholder="Observaciones sobre el módulo…"
                disabled={!reviewerName}
                rows={3}
                style={{ width: "100%", padding: "10px 12px", fontSize: 13, borderRadius: 8, border: `1px solid ${B.border}`, fontFamily: font, resize: "vertical", marginBottom: 8, background: reviewerName ? B.surface : B.surfaceHover }}
              />
              <button
                type="button"
                disabled={!reviewerName || !generalDraft.trim() || savingGeneral}
                onClick={submitGeneralComment}
                style={{ padding: "8px 16px", borderRadius: 8, border: "none", background: B.primary, color: B.accent, cursor: reviewerName && generalDraft.trim() ? "pointer" : "default", fontFamily: font, fontSize: 13, fontWeight: 700, opacity: reviewerName && generalDraft.trim() ? 1 : 0.5 }}
              >
                {savingGeneral ? "Enviando…" : "Enviar"}
              </button>
              {generalComments.length > 0 && (
                <div style={{ marginTop: 14 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: B.textMuted, marginBottom: 8 }}>Comentarios</div>
                  {generalComments.map(c => (
                    <Card key={c.id ?? `${c.reviewer_name}-${c.created_at}`} style={{ marginBottom: 8, padding: "12px 14px" }}>
                      <Badge color={B.text} bg={`${B.accent}35`}>{c.reviewer_name}</Badge>
                      <div style={{ fontSize: 13, lineHeight: 1.5, marginTop: 8, color: B.text }}>{c.comment}</div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </Card>
        )}
        {n?.decision && <Card style={{ marginBottom: 14 }}><h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>🏗️ Decisión de diseño</h4><div style={{ fontSize: 13, lineHeight: 1.5 }}>{n.decision}</div></Card>}
        {n?.roles && <Card><h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>👥 Roles</h4><div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{n.roles.map((r, i) => <Badge key={i} color={B.text} bg={B.surfaceHover}>{r}</Badge>)}</div></Card>}
        <button
          type="button"
          onClick={() => navigate("/" + selectedModule.replaceAll("_", "-"))}
          style={{
            width: "100%",
            marginTop: 16,
            padding: 16,
            borderRadius: 12,
            border: "none",
            cursor: "pointer",
            fontFamily: font,
            fontSize: 16,
            fontWeight: 800,
            background: "#F5C518",
            color: "#000",
          }}
        >
          🚀 Abrir maqueta interactiva
        </button>
      </main>
    </div>
  );
}

export default function WciAppIndex() {
  const [view, setView] = useState("index");
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const [reviewerName, setReviewerName] = useState("");
  const [nameModalOpen, setNameModalOpen] = useState(false);
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherNameDraft, setOtherNameDraft] = useState("");

  useEffect(() => { function c() { setIsMobile(window.innerWidth < 900); } c(); window.addEventListener("resize", c); return () => window.removeEventListener("resize", c); }, []);

  useEffect(() => {
    try {
      const s = localStorage.getItem(LS_REVIEWER);
      if (s) {
        setReviewerName(s);
        setNameModalOpen(false);
      } else {
        setNameModalOpen(true);
      }
    } catch {
      setNameModalOpen(true);
    }
  }, []);

  function persistReviewer(name) {
    const t = String(name).trim();
    if (!t) return;
    localStorage.setItem(LS_REVIEWER, t);
    setReviewerName(t);
    setNameModalOpen(false);
    setShowOtherInput(false);
    setOtherNameDraft("");
  }

  const allMods = MODULES.flatMap(c => c.items);

  const nameModal = nameModalOpen && (
    <ReviewerNameModal
      font={font}
      B={B}
      Card={Card}
      showOther={showOtherInput}
      setShowOther={setShowOtherInput}
      otherDraft={otherNameDraft}
      setOtherDraft={setOtherNameDraft}
      onPick={persistReviewer}
      onSaveOther={() => persistReviewer(otherNameDraft)}
    />
  );

  if (view === "module" && selectedModule) {
    const mod = allMods.find(m => m.id === selectedModule);
    const n = NOTES[selectedModule];
    return (
      <>
        {nameModal}
        <ModuleDetailView
          selectedModule={selectedModule}
          mod={mod}
          n={n}
          reviewerName={reviewerName}
          onBack={() => { setView("index"); setSelectedModule(null); }}
          navigate={navigate}
          font={font}
          B={B}
          Card={Card}
          Badge={Badge}
        />
      </>
    );
  }

  if (view === "guide" && selectedGuide) {
    const g = GUIDES[selectedGuide];
    return (
      <>
        {nameModal}
      <div style={{ fontFamily: font, background: "#F5F4F0", minHeight: "100vh" }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&family=DM+Serif+Display&display=swap');*{box-sizing:border-box;margin:0;padding:0}::-webkit-scrollbar{width:5px}::-webkit-scrollbar-thumb{background:#d4d2cd;border-radius:3px}`}</style>
        <header style={{ background: B.surface, borderBottom: `1px solid ${B.border}`, padding: "0 24px", height: 52, display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={() => { setView("index"); setSelectedGuide(null); }} style={{ border: "none", background: "transparent", cursor: "pointer", fontSize: 16, padding: "4px 8px", fontFamily: font, color: B.textMuted }}>← Volver</button>
          <span style={{ fontSize: 28 }}>{g.icon}</span>
          <div style={{ fontSize: 16, fontWeight: 700 }}>Guía — {g.name}</div>
        </header>
        <main style={{ padding: "20px 32px", maxWidth: 900, margin: "0 auto" }}>
          <Card style={{ marginBottom: 16, background: `${B.accent}08`, border: `1px solid ${B.accent}30` }}><div style={{ fontSize: 14, lineHeight: 1.6 }}>{g.intro}</div></Card>
          <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 12 }}>Módulos a revisar (en orden)</h3>
          {g.priority.map((pm, i) => {
            const mod = allMods.find(m => m.id === pm.id);
            const n = NOTES[pm.id];
            return (
              <Card key={i} onClick={() => { setSelectedModule(pm.id); setView("module"); }} style={{ marginBottom: 10, cursor: "pointer", borderLeft: `4px solid ${B.accent}`, padding: "14px 18px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <span style={{ fontSize: 12, fontWeight: 800, color: B.accent, background: B.primary, padding: "2px 8px", borderRadius: 4 }}>{i + 1}</span>
                      <span style={{ fontSize: 18 }}>{mod?.icon}</span>
                      <span style={{ fontSize: 15, fontWeight: 700 }}>{mod?.name}</span>
                    </div>
                    <div style={{ fontSize: 13, color: B.textMuted, lineHeight: 1.5 }}>{pm.why}</div>
                    {n?.validate && <div style={{ fontSize: 12, color: B.warning, marginTop: 6 }}>❓ {n.validate.length} preguntas para validar</div>}
                  </div>
                  <span style={{ color: B.accent, fontWeight: 600, fontSize: 13 }}>Ver →</span>
                </div>
              </Card>
            );
          })}
          <Card style={{ marginTop: 16, background: B.surfaceHover }}><div style={{ fontSize: 13, color: B.textMuted }}><span style={{ fontWeight: 700 }}>No te preocupes por:</span> {g.skip}</div></Card>
        </main>
      </div>
      </>
    );
  }

  return (
    <>
      {nameModal}
    <div style={{ fontFamily: font, background: "#F5F4F0", minHeight: "100vh" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&family=DM+Serif+Display&display=swap');*{box-sizing:border-box;margin:0;padding:0}::-webkit-scrollbar{width:5px;height:5px}::-webkit-scrollbar-thumb{background:#d4d2cd;border-radius:3px}`}</style>
      <header style={{ background: B.primary, padding: "0 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 0 24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
            <div style={{ width: 44, height: 44, background: B.accent, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 22, color: B.primary, fontFamily: serif }}>C</div>
            <div><div style={{ fontFamily: serif, fontSize: 22, fontWeight: 700, color: "#fff" }}>West Coast Industries — ERP</div><div style={{ fontSize: 11, color: "#ffffff70", letterSpacing: 2, textTransform: "uppercase" }}>Proof of Concept · Abril 2026</div></div>
          </div>
          <div style={{ fontSize: 13, color: "#ffffffBB", lineHeight: 1.6, maxWidth: 550 }}>Maquetas interactivas para validación. Cada módulo tiene datos de ejemplo, botones funcionales, y preguntas para el reviewer.</div>
          <div style={{ display: "flex", gap: 20, marginTop: 16 }}>
            {[{ l: "Módulos", v: allMods.length }, { l: "Procesos", v: allMods.reduce((s, m) => s + (m.p || 0), 0) }, { l: "Pendientes", v: 5 }].map(s => <div key={s.l}><div style={{ fontSize: 26, fontWeight: 900, color: B.accent }}>{s.v}</div><div style={{ fontSize: 11, color: "#ffffff70" }}>{s.l}</div></div>)}
          </div>
        </div>
      </header>
      <main style={{ padding: isMobile ? 16 : "20px 32px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: -12, marginBottom: 24 }}>
          {Object.entries(GUIDES).map(([k, g]) => (
            <Card key={k} onClick={() => { setSelectedGuide(k); setView("guide"); }} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", border: `2px solid ${B.accent}30` }}>
              <span style={{ fontSize: 28 }}>{g.icon}</span>
              <div><div style={{ fontSize: 15, fontWeight: 700 }}>Guía para {g.name}</div><div style={{ fontSize: 12, color: B.textMuted }}>{g.priority.length} módulos prioritarios · Click para ver qué revisar</div></div>
              <span style={{ marginLeft: "auto", color: B.accent, fontWeight: 700 }}>→</span>
            </Card>
          ))}
        </div>
        {MODULES.map(cat => (
          <div key={cat.cat} style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <div style={{ width: 4, height: 18, borderRadius: 2, background: cat.color }} />
              <h2 style={{ fontSize: 15, fontWeight: 800 }}>{cat.cat}</h2>
              <Badge>{cat.items.length}</Badge>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(280px, 1fr))", gap: 10 }}>
              {cat.items.map(mod => (
                <Card key={mod.id} onClick={() => { setSelectedModule(mod.id); setView("module"); }} style={{ cursor: "pointer", padding: "14px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: 20 }}>{mod.icon}</span>
                    <span style={{ fontSize: 14, fontWeight: 700 }}>{mod.name}</span>
                    <span style={{ marginLeft: "auto" }}><Badge color={B.success} bg={B.successBg}>{mod.p}p</Badge></span>
                  </div>
                  <div style={{ fontSize: 12, color: B.textMuted, lineHeight: 1.4, marginBottom: 8 }}>{NOTES[mod.id]?.what?.substring(0, 80)}...</div>
                  <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                    {mod.tabs?.slice(0, 3).map((t, i) => <span key={i} style={{ padding: "1px 5px", background: B.surfaceHover, borderRadius: 3, fontSize: 10, color: B.textMuted }}>{t}</span>)}
                    {(mod.tabs?.length || 0) > 3 && <span style={{ fontSize: 10, color: B.textLight }}>+{mod.tabs.length - 3}</span>}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
        <Card style={{ opacity: 0.5, marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6 }}>Pendientes (segunda tanda)</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["🏪 Portal franquiciado", "🤝 Comercial", "📣 Marketing", "🎯 Command Center", "📊 Dashboard"].map(p => <span key={p} style={{ padding: "4px 8px", background: B.surfaceHover, borderRadius: 6, fontSize: 12 }}>{p}</span>)}
          </div>
        </Card>
        <div style={{ textAlign: "center", padding: "8px 0 16px", fontSize: 11, color: B.textLight }}>WCI ERP · Cheddar's Group · Prep · Abril 2026</div>
      </main>
    </div>
    </>
  );
}
