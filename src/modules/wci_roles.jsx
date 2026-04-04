import { useState, useEffect } from "react";

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
function Btn({ children, variant = "default", onClick, style: sx = {} }) {
  const styles = { primary: { background: B.accent, color: B.primary, border: "none", fontWeight: 700 }, default: { background: B.surface, color: B.text, border: `1px solid ${B.border}`, fontWeight: 600 }, ghost: { background: "transparent", color: B.textMuted, border: "none", fontWeight: 600 } };
  return <button onClick={onClick} style={{ padding: "7px 14px", borderRadius: 8, fontSize: 13, cursor: "pointer", fontFamily: font, ...styles[variant], ...sx }}>{children}</button>;
}
function Card({ children, style: sx = {} }) {
  return <div style={{ background: B.surface, border: `1px solid ${B.border}`, borderRadius: 12, padding: "16px 20px", ...sx }}>{children}</div>;
}

// ── ACCESS LEVELS ──
// F = Full (CRUD + config), E = Edit (CRUD sin config), V = View only, X = Propio local, — = Sin acceso
const ACCESS = { F: "full", E: "edit", V: "view", X: "own", N: "none" };

const ACCESS_DISPLAY = {
  full: { label: "Full", color: "#fff", bg: B.success, desc: "CRUD + config + reportes" },
  edit: { label: "Editar", color: "#fff", bg: B.info, desc: "Crear, editar, pero no config" },
  view: { label: "Ver", color: B.text, bg: `${B.accent}30`, desc: "Solo lectura" },
  own: { label: "Propio", color: "#fff", bg: B.purple, desc: "Solo su local / sus datos" },
  none: { label: "—", color: B.textLight, bg: "transparent", desc: "Sin acceso" },
};

const ROLES = [
  { id: "ceo", name: "CEO", icon: "🧠", scope: "Red completa", desc: "Visión global, decisiones estratégicas, aprueba cambios de carta", count: 1 },
  { id: "gte_ops", name: "Gte. Operaciones", icon: "⚙️", scope: "Red completa", desc: "Operación diaria de WCI + supervisión de todos los locales", count: 1 },
  { id: "gte_admin", name: "Gte. Admin y RRHH", icon: "🏛️", scope: "Red completa", desc: "Administración, RRHH, finanzas, contratos, cumplimiento legal", count: 1 },
  { id: "enc_calidad", name: "Enc. Calidad", icon: "🔍", scope: "Red completa", desc: "BPM, auditorías, autocontroles, acciones correctivas", count: 1 },
  { id: "chef", name: "Chef Ejecutivo", icon: "👨‍🍳", scope: "Red completa", desc: "Recetas, food cost, auditorías gastronómicas, aprobación carta", count: 1 },
  { id: "enc_ux", name: "Enc. UX", icon: "⭐", scope: "Red completa", desc: "Experiencia de usuario, NPS, mystery shopper, reclamos, feedback multicanal", count: 1 },
  { id: "admin_local", name: "Admin Local", icon: "🏪", scope: "Su local", desc: "Gestión operativa del local: caja, RRHH, pedidos a WCI, inventario", count: 4 },
  { id: "bodeguero", name: "Bodeguero", icon: "📦", scope: "WCI bodega", desc: "Picking, carga, recepción, conteo físico, transferencias", count: 2 },
  { id: "repartidor", name: "Repartidor", icon: "🚛", scope: "Ruta asignada", desc: "Despacho, entrega con foto, cierre de ruta", count: 1 },
  { id: "gte_finanzas", name: "Gte. Finanzas", icon: "📊", scope: "Finanzas + Red", desc: "P&L, conciliación, CxP, CxC, comisiones, presupuestos, liquidaciones", count: 1 },
];

const MODULES = [
  { id: "dashboard", name: "Dashboard", icon: "📊", category: "General" },
  { id: "inventario", name: "Inventario", icon: "📦", category: "Operaciones WCI" },
  { id: "compras", name: "Compras", icon: "🧾", category: "Operaciones WCI" },
  { id: "pedidos", name: "Pedidos entrantes", icon: "📋", category: "Operaciones WCI" },
  { id: "catalogo", name: "Catálogo + precios", icon: "🏷️", category: "Operaciones WCI" },
  { id: "despacho", name: "Despacho + rutas", icon: "🚛", category: "Operaciones WCI" },
  { id: "produccion", name: "Producción", icon: "👩‍🍳", category: "Operaciones WCI" },
  { id: "facturacion", name: "Facturación DTE", icon: "📄", category: "Operaciones WCI" },
  { id: "recetas", name: "Recetas + food cost", icon: "📖", category: "Marca" },
  { id: "calidad", name: "Calidad (BPM)", icon: "✅", category: "Marca" },
  { id: "experiencia", name: "Experiencia", icon: "⭐", category: "Marca" },
  { id: "finanzas", name: "Finanzas (P&L)", icon: "💰", category: "Finanzas" },
  { id: "comisiones", name: "Comisiones", icon: "📊", category: "Finanzas" },
  { id: "cxp", name: "CxP", icon: "💸", category: "Finanzas" },
  { id: "cxc", name: "CxC", icon: "💰", category: "Finanzas" },
  { id: "rrhh", name: "RRHH", icon: "👥", category: "Gestión" },
  { id: "pedir_wci", name: "Pedir a WCI (local)", icon: "🛒", category: "Local" },
  { id: "portal", name: "Portal trabajador", icon: "📱", category: "Local" },
];

// Matrix: role × module = access level
const MATRIX = {
  // CEO: ve todo full
  ceo: { dashboard: "full", inventario: "full", compras: "full", pedidos: "full", catalogo: "full", despacho: "full", produccion: "full", facturacion: "full", recetas: "full", calidad: "full", experiencia: "full", finanzas: "full", comisiones: "full", cxp: "full", cxc: "full", rrhh: "full", pedir_wci: "view", portal: "none" },

  // Gte Ops: casi todo full, no config precios
  gte_ops: { dashboard: "full", inventario: "full", compras: "full", pedidos: "full", catalogo: "edit", despacho: "full", produccion: "full", facturacion: "edit", recetas: "edit", calidad: "full", experiencia: "full", finanzas: "view", comisiones: "view", cxp: "edit", cxc: "edit", rrhh: "full", pedir_wci: "view", portal: "none" },

  // Gte Admin y RRHH: RRHH full, finanzas full, operaciones view/edit
  gte_admin: { dashboard: "full", inventario: "view", compras: "view", pedidos: "view", catalogo: "view", despacho: "view", produccion: "view", facturacion: "full", recetas: "view", calidad: "view", experiencia: "edit", finanzas: "full", comisiones: "full", cxp: "full", cxc: "full", rrhh: "full", pedir_wci: "none", portal: "none" },

  // Enc Calidad: calidad full, resto view
  enc_calidad: { dashboard: "view", inventario: "none", compras: "none", pedidos: "none", catalogo: "none", despacho: "none", produccion: "view", facturacion: "none", recetas: "view", calidad: "full", experiencia: "edit", finanzas: "none", comisiones: "none", cxp: "none", cxc: "none", rrhh: "none", pedir_wci: "none", portal: "own" },

  // Chef Ejecutivo: recetas full, calidad gastronomica, produccion
  chef: { dashboard: "view", inventario: "view", compras: "none", pedidos: "none", catalogo: "edit", despacho: "none", produccion: "full", facturacion: "none", recetas: "full", calidad: "edit", experiencia: "view", finanzas: "none", comisiones: "none", cxp: "none", cxc: "none", rrhh: "none", pedir_wci: "none", portal: "own" },

  // Enc UX: experiencia full, calidad edit, ve dashboard y recetas
  enc_ux: { dashboard: "view", inventario: "none", compras: "none", pedidos: "none", catalogo: "none", despacho: "none", produccion: "none", facturacion: "none", recetas: "view", calidad: "edit", experiencia: "full", finanzas: "none", comisiones: "none", cxp: "none", cxc: "none", rrhh: "none", pedir_wci: "none", portal: "own" },

  // Admin Local: su local, pide a WCI, RRHH propio
  admin_local: { dashboard: "own", inventario: "own", compras: "none", pedidos: "none", catalogo: "none", despacho: "none", produccion: "none", facturacion: "none", recetas: "view", calidad: "own", experiencia: "own", finanzas: "own", comisiones: "none", cxp: "none", cxc: "none", rrhh: "own", pedir_wci: "edit", portal: "none" },

  // Bodeguero: inventario WCI, picking, recepción, conteo
  bodeguero: { dashboard: "none", inventario: "edit", compras: "none", pedidos: "view", catalogo: "none", despacho: "edit", produccion: "view", facturacion: "none", recetas: "none", calidad: "none", experiencia: "none", finanzas: "none", comisiones: "none", cxp: "none", cxc: "none", rrhh: "none", pedir_wci: "none", portal: "own" },

  // Repartidor: despacho (entregar), portal
  repartidor: { dashboard: "none", inventario: "none", compras: "none", pedidos: "none", catalogo: "none", despacho: "own", produccion: "none", facturacion: "none", recetas: "none", calidad: "none", experiencia: "none", finanzas: "none", comisiones: "none", cxp: "none", cxc: "none", rrhh: "none", pedir_wci: "none", portal: "own" },

  // Gte Finanzas: finanzas full, CxP, CxC, comisiones, ve compras y facturas
  gte_finanzas: { dashboard: "view", inventario: "none", compras: "view", pedidos: "none", catalogo: "none", despacho: "none", produccion: "none", facturacion: "view", recetas: "none", calidad: "none", experiencia: "none", finanzas: "full", comisiones: "full", cxp: "full", cxc: "full", rrhh: "view", pedir_wci: "none", portal: "none" },
};

// Detailed permissions per role (what they can DO, not just see)
const ROLE_DETAILS = {
  ceo: [
    "Ve dashboard con KPIs de toda la red",
    "Aprueba cambios de carta (workflow)",
    "Configura precios y márgenes en Catálogo",
    "Ve P&L de todos los locales + WCI",
    "Configura comisiones por razón social × canal",
    "Ve y gestiona RRHH de toda la red",
    "Acceso a CEO Command Center (futuro)",
  ],
  gte_ops: [
    "Gestiona inventario WCI completo (3 zonas)",
    "Crea y envía órdenes de compra a proveedores",
    "Confirma pedidos entrantes de locales",
    "Programa y gestiona rutas de despacho",
    "Supervisa producción (plan, registro, QC)",
    "Gestiona reclamos post-entrega",
    "Supervisa autocontroles de todos los locales",
    "Asigna acciones correctivas",
    "Gestiona CxP (pagos a proveedores) y CxC (cobros a locales)",
    "Gestiona dotación y turnos de toda la red",
  ],
  gte_admin: [
    "Gestiona RRHH de toda la red: dotación, turnos, contratos, evaluaciones",
    "Gestiona liquidaciones y relación con Previred",
    "Supervisa capacitaciones y certificaciones legales",
    "Ve y gestiona P&L de todos los locales + WCI",
    "Gestiona presupuestos (budget) de toda la red",
    "Gestiona conciliación bancaria",
    "Gestiona CxP (pagos a proveedores) y CxC (cobros a locales)",
    "Configura y monitorea comisiones por razón social × canal",
    "Gestiona facturación DTE y notas de crédito",
    "Supervisa tesorería y cierres de caja",
    "Gestiona contratos con proveedores y plataformas",
    "Supervisa experiencia de usuario y reclamos",
    "Ve módulos operativos en lectura para contexto",
  ],
  enc_calidad: [
    "Crea y edita plantillas de autocontrol (BPM)",
    "Ejecuta auditorías en terreno (gastronómica, BPM)",
    "Ve autocontroles de todos los locales",
    "Crea y asigna acciones correctivas",
    "Gestiona reclamos de experiencia",
    "Exporta reportes SEREMI",
  ],
  chef: [
    "Crea y edita recetas (BOM, porciones, fichas técnicas)",
    "Controla food cost (target vs real)",
    "Ve comparativa cross-location de consumo",
    "Propone y aprueba cambios de carta",
    "Ejecuta auditorías gastronómicas en terreno",
    "Supervisa producción de elaborados WCI",
    "Edita catálogo de productos",
  ],
  enc_ux: [
    "Gestiona CRM de reclamos (asignación, SLA, workflow, cierre)",
    "Administra encuestas NPS propias",
    "Ejecuta y analiza evaluaciones mystery shopper",
    "Diseña journey maps y detecta touchpoints débiles",
    "Lidera ciclos Kaizen por touchpoint problemático",
    "Consolida feedback multicanal (Google, IG, apps, QR)",
    "Configura ManyChat (clasificación de DMs, webhook al CRM)",
    "Gestiona ranking de locales por experiencia",
    "Crea planes de mejora para locales bajo umbral",
    "Edita módulo de calidad (reclamos de experiencia)",
  ],
  admin_local: [
    "Ve inventario de SU local",
    "Arma y envía pedidos a WCI",
    "Recepciona mercadería de WCI",
    "Ejecuta autocontrol diario de su local",
    "Ve reclamos de su local",
    "Ve P&L de su local (no otros)",
    "Gestiona turnos y asistencia de su local",
    "Gestiona cierre de caja de su local",
    "Sube documentos de empleados de su local",
  ],
  bodeguero: [
    "Ve stock de WCI (3 zonas)",
    "Ejecuta picking de pedidos confirmados",
    "Registra conteo físico",
    "Recibe mercadería de proveedores",
    "Registra transferencias entre zonas",
    "Ve pedidos confirmados (para picking)",
    "Carga vehículo con checklist",
  ],
  repartidor: [
    "Ve su ruta asignada (paradas + items)",
    "Marca entregas con foto",
    "Reporta incidencias en ruta",
    "Cierra ruta al volver",
    "Accede a Portal Trabajador (su info)",
  ],
  gte_finanzas: [
    "Ve P&L de todos los locales + WCI",
    "Gestiona presupuestos (budget vs real)",
    "Gestiona conciliación bancaria",
    "Gestiona CxP (pagos a proveedores)",
    "Gestiona CxC (cobros a locales)",
    "Configura y monitorea comisiones por razón social × canal",
    "Ve facturas emitidas y NC",
    "Ve compras (facturas de proveedores)",
    "Ve RRHH (para liquidaciones y costo de personal)",
    "Gestiona flujo de caja y proyecciones",
    "Supervisa tesorería y cierres de caja de locales",
  ],
};

export default function RolesMatrix() {
  const [viewMode, setViewMode] = useState("matrix"); // matrix | byRole
  const [selectedRole, setSelectedRole] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [highlightModule, setHighlightModule] = useState(null);

  useEffect(() => {
    function check() { setIsMobile(window.innerWidth < 900); }
    check(); window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Role detail view
  if (selectedRole) {
    const role = ROLES.find(r => r.id === selectedRole);
    const perms = ROLE_DETAILS[selectedRole] || [];
    const moduleAccess = MATRIX[selectedRole] || {};

    return (
      <div style={{ fontFamily: font, background: "#F5F4F0", minHeight: "100vh" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&family=DM+Serif+Display&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          ::-webkit-scrollbar { width: 5px; }
          ::-webkit-scrollbar-thumb { background: #d4d2cd; border-radius: 3px; }
        `}</style>

        <header style={{ background: B.surface, borderBottom: `1px solid ${B.border}`, padding: "0 24px", height: 52, display: "flex", alignItems: "center", gap: 10 }}>
          <Btn variant="ghost" onClick={() => setSelectedRole(null)} style={{ padding: "4px 8px", fontSize: 16 }}>←</Btn>
          <span style={{ fontSize: 22 }}>{role.icon}</span>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>{role.name}</div>
            <div style={{ fontSize: 11, color: B.textMuted }}>{role.scope} · {role.count} persona{role.count > 1 ? "s" : ""}</div>
          </div>
        </header>

        <main style={{ padding: "20px 32px", maxWidth: 960, margin: "0 auto" }}>
          <Card style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 13, color: B.textMuted }}>{role.desc}</div>
          </Card>

          {/* Module access */}
          <Card style={{ marginBottom: 14 }}>
            <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Módulos</h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
              {MODULES.map(mod => {
                const level = moduleAccess[mod.id] || "none";
                const a = ACCESS_DISPLAY[level];
                if (level === "none") return (
                  <div key={mod.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 10px", borderRadius: 6, opacity: 0.3 }}>
                    <span style={{ fontSize: 14 }}>{mod.icon}</span>
                    <span style={{ fontSize: 13, color: B.textLight }}>{mod.name}</span>
                    <span style={{ fontSize: 11, color: B.textLight, marginLeft: "auto" }}>—</span>
                  </div>
                );
                return (
                  <div key={mod.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 10px", borderRadius: 6, background: `${a.bg}15` }}>
                    <span style={{ fontSize: 14 }}>{mod.icon}</span>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{mod.name}</span>
                    <span style={{ marginLeft: "auto" }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: a.bg === "transparent" ? B.textLight : "#fff", background: a.bg, padding: "2px 8px", borderRadius: 6 }}>{a.label}</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Detailed permissions */}
          <Card>
            <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>¿Qué puede hacer concretamente?</h4>
            {perms.map((p, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "6px 0", borderBottom: i < perms.length - 1 ? `1px solid ${B.border}` : "none" }}>
                <span style={{ color: B.success, fontWeight: 700, flexShrink: 0 }}>✓</span>
                <span style={{ fontSize: 13, lineHeight: 1.4 }}>{p}</span>
              </div>
            ))}
          </Card>
        </main>
      </div>
    );
  }

  // Main view
  return (
    <div style={{ fontFamily: font, background: "#F5F4F0", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&family=DM+Serif+Display&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-thumb { background: #d4d2cd; border-radius: 3px; }
      `}</style>

      <header style={{ background: B.surface, borderBottom: `1px solid ${B.border}`, position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ padding: "0 24px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, background: B.accent, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 16, color: B.primary, fontFamily: serif }}>C</div>
            <div style={{ lineHeight: 1.1 }}><div style={{ fontFamily: serif, fontSize: 14, fontWeight: 700 }}>Cheddar's</div><div style={{ fontSize: 9, color: B.textMuted, fontWeight: 500, letterSpacing: 1.5, textTransform: "uppercase" }}>West Coast</div></div>
          </div>
        </div>
      </header>

      <main style={{ padding: isMobile ? 12 : "20px 32px", maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ marginBottom: 16 }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, fontFamily: serif }}>🔐 Roles y permisos</h1>
          <p style={{ fontSize: 13, color: B.textMuted, marginTop: 2 }}>{ROLES.length} roles · {ROLES.reduce((s, r) => s + r.count, 0)} personas totales · {MODULES.length} módulos</p>
        </div>

        {/* View toggle */}
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          <button onClick={() => setViewMode("matrix")} style={{ padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: viewMode === "matrix" ? 700 : 500, border: viewMode === "matrix" ? `2px solid ${B.accent}` : `1px solid ${B.border}`, background: viewMode === "matrix" ? `${B.accent}08` : B.surface, cursor: "pointer", fontFamily: font, color: viewMode === "matrix" ? B.text : B.textMuted }}>📊 Matriz completa</button>
          <button onClick={() => setViewMode("byRole")} style={{ padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: viewMode === "byRole" ? 700 : 500, border: viewMode === "byRole" ? `2px solid ${B.accent}` : `1px solid ${B.border}`, background: viewMode === "byRole" ? `${B.accent}08` : B.surface, cursor: "pointer", fontFamily: font, color: viewMode === "byRole" ? B.text : B.textMuted }}>👤 Por rol</button>
        </div>

        {/* Legend */}
        <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
          {Object.entries(ACCESS_DISPLAY).map(([key, a]) => (
            <div key={key} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12 }}>
              <span style={{ display: "inline-block", width: 24, height: 18, borderRadius: 4, background: a.bg, border: key === "none" ? `1px solid ${B.border}` : "none", textAlign: "center", fontSize: 10, fontWeight: 700, color: a.color, lineHeight: "18px" }}>{a.label.charAt(0)}</span>
              <span style={{ color: B.textMuted }}>{a.label} — {a.desc}</span>
            </div>
          ))}
        </div>

        {viewMode === "matrix" && (
          <Card style={{ padding: 0, overflow: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: font, minWidth: 1100 }}>
              <thead>
                <tr style={{ borderBottom: `2px solid ${B.border}`, background: "#FAFAF8" }}>
                  <th style={{ padding: "8px 10px", textAlign: "left", fontWeight: 700, color: B.text, fontSize: 12, minWidth: 140, position: "sticky", left: 0, background: "#FAFAF8", zIndex: 1 }}>Módulo</th>
                  {ROLES.map(r => (
                    <th key={r.id} onClick={() => setSelectedRole(r.id)} style={{ padding: "6px 4px", textAlign: "center", fontWeight: 600, color: B.textMuted, fontSize: 10, minWidth: 65, cursor: "pointer", transition: "background 0.1s" }}
                      onMouseEnter={e => e.currentTarget.style.background = `${B.accent}15`}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                      <div style={{ fontSize: 16 }}>{r.icon}</div>
                      <div style={{ marginTop: 2, lineHeight: 1.2 }}>{r.name}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(() => {
                  let lastCategory = "";
                  return MODULES.map(mod => {
                    const showCategory = mod.category !== lastCategory;
                    lastCategory = mod.category;
                    return [
                      showCategory && (
                        <tr key={`cat-${mod.category}`}>
                          <td colSpan={ROLES.length + 1} style={{ padding: "8px 10px", fontSize: 11, fontWeight: 700, color: B.textMuted, background: B.surfaceHover, letterSpacing: 0.5, textTransform: "uppercase" }}>{mod.category}</td>
                        </tr>
                      ),
                      <tr key={mod.id} style={{ borderBottom: `1px solid ${B.border}`, background: highlightModule === mod.id ? `${B.accent}06` : "transparent" }}
                        onMouseEnter={() => setHighlightModule(mod.id)}
                        onMouseLeave={() => setHighlightModule(null)}>
                        <td style={{ padding: "8px 10px", fontWeight: 600, fontSize: 12, position: "sticky", left: 0, background: highlightModule === mod.id ? `${B.accent}06` : B.surface, zIndex: 1 }}>
                          <span style={{ marginRight: 6 }}>{mod.icon}</span>{mod.name}
                        </td>
                        {ROLES.map(role => {
                          const level = MATRIX[role.id]?.[mod.id] || "none";
                          const a = ACCESS_DISPLAY[level];
                          return (
                            <td key={role.id} style={{ padding: "4px 2px", textAlign: "center" }}>
                              <div style={{
                                display: "inline-block", padding: "4px 6px", borderRadius: 4, fontSize: 10, fontWeight: 700,
                                color: a.color, background: a.bg,
                                border: level === "none" ? `1px solid ${B.border}` : "none",
                                minWidth: 40,
                              }}>{a.label}</div>
                            </td>
                          );
                        })}
                      </tr>
                    ];
                  }).flat().filter(Boolean);
                })()}
              </tbody>
            </table>
          </Card>
        )}

        {viewMode === "byRole" && (
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 10 }}>
            {ROLES.map(role => {
              const moduleAccess = MATRIX[role.id] || {};
              const accessibleCount = Object.values(moduleAccess).filter(v => v !== "none").length;
              const fullCount = Object.values(moduleAccess).filter(v => v === "full").length;

              return (
                <Card key={role.id} onClick={() => setSelectedRole(role.id)} style={{ cursor: "pointer", transition: "border-color 0.12s", padding: "14px 18px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 10 }}>
                    <span style={{ fontSize: 28 }}>{role.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 15, fontWeight: 700 }}>{role.name}</div>
                      <div style={{ fontSize: 12, color: B.textMuted }}>{role.scope} · {role.count} persona{role.count > 1 ? "s" : ""}</div>
                      <div style={{ fontSize: 12, color: B.textMuted, marginTop: 2 }}>{role.desc}</div>
                    </div>
                  </div>

                  {/* Mini access bar */}
                  <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                    {MODULES.map(mod => {
                      const level = moduleAccess[mod.id] || "none";
                      const a = ACCESS_DISPLAY[level];
                      if (level === "none") return null;
                      return (
                        <span key={mod.id} style={{
                          padding: "2px 6px", borderRadius: 4, fontSize: 10, fontWeight: 600,
                          color: a.color, background: a.bg,
                        }}>{mod.icon} {a.label}</span>
                      );
                    })}
                  </div>

                  <div style={{ fontSize: 11, color: B.textMuted, marginTop: 8 }}>
                    {accessibleCount} módulos · {fullCount} con acceso full
                    <span style={{ float: "right", color: B.accent, fontWeight: 600 }}>Ver detalle →</span>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* Access notes */}
        <Card style={{ marginTop: 16 }}>
          <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>Notas de implementación</h4>
          {[
            { note: "\"Propio\" = RLS filtra automáticamente por organization_id del usuario. Solo ve datos de su local.", color: B.purple },
            { note: "Roles de local (Jefe cocina, Enc. turno, Cajero) viven en Prep, no en WCI. El Admin Local es el puente entre ambos.", color: B.info },
            { note: "Gte. Operaciones tiene acceso full a operaciones pero solo lectura en finanzas. Gte. Finanzas al revés.", color: B.warning },
            { note: "Enc. UX gestiona toda la experiencia de usuario cross-location: CRM reclamos, NPS, mystery shopper, Kaizen, ManyChat.", color: B.success },
            { note: "Chef, Enc. Calidad y Enc. UX son cross-location pero solo en sus áreas. No ven finanzas ni operaciones WCI.", color: B.success },
            { note: "Bodeguero y Repartidor son roles WCI específicos. No existen en locales normales de Prep.", color: B.textMuted },
          ].map((n, i) => (
            <div key={i} style={{ display: "flex", gap: 8, padding: "6px 0", borderBottom: i < 5 ? `1px solid ${B.border}` : "none" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: n.color, flexShrink: 0, marginTop: 5 }} />
              <span style={{ fontSize: 13, color: B.text, lineHeight: 1.4 }}>{n.note}</span>
            </div>
          ))}
        </Card>
      </main>
    </div>
  );
}
