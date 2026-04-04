import { useState, useEffect } from "react";

const B = {
  primary: "#1A1A1A", accent: "#F5C518", accentHover: "#E0B315",
  surface: "#FFFFFF", surfaceHover: "#F8F8F6", border: "#E8E6E1",
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
  const styles = { primary: { background: B.accent, color: B.primary, border: "none", fontWeight: 700 }, danger: { background: B.dangerBg, color: B.danger, border: `1px solid ${B.danger}30`, fontWeight: 600 }, success: { background: B.successBg, color: B.success, border: `1px solid ${B.success}30`, fontWeight: 600 }, default: { background: B.surface, color: B.text, border: `1px solid ${B.border}`, fontWeight: 600 }, ghost: { background: "transparent", color: B.textMuted, border: "none", fontWeight: 600 } };
  return <button onClick={onClick} style={{ padding: "7px 14px", borderRadius: 8, fontSize: 13, cursor: "pointer", fontFamily: font, transition: "all 0.12s", ...styles[variant], ...sx }}>{children}</button>;
}
function Card({ children, style: sx = {} }) {
  return <div style={{ background: B.surface, border: `1px solid ${B.border}`, borderRadius: 12, padding: "16px 20px", ...sx }}>{children}</div>;
}
function TabBar({ tabs, active, onChange }) {
  return (
    <div style={{ display: "flex", gap: 2, borderBottom: `1px solid ${B.border}`, marginBottom: 20, overflowX: "auto" }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => onChange(t.id)} style={{
          padding: "10px 14px", border: "none", background: "transparent", fontSize: 13,
          fontWeight: active === t.id ? 650 : 500, color: active === t.id ? B.text : B.textMuted,
          borderBottom: active === t.id ? `2px solid ${B.accent}` : "2px solid transparent",
          cursor: "pointer", fontFamily: font, whiteSpace: "nowrap",
        }}>
          {t.icon && <span style={{ marginRight: 6 }}>{t.icon}</span>}{t.label}
          {t.badge != null && <span style={{ marginLeft: 6, fontSize: 10, fontWeight: 700, background: t.badgeBg || B.dangerBg, color: t.badgeColor || B.danger, padding: "1px 6px", borderRadius: 8 }}>{t.badge}</span>}
        </button>
      ))}
    </div>
  );
}

const ROUTE_STATUS = {
  planning: { label: "Planificando", color: B.info, bg: B.infoBg },
  loading: { label: "Cargando", color: B.purple, bg: B.purpleBg },
  in_transit: { label: "En ruta", color: B.warning, bg: B.warningBg },
  completed: { label: "Completada", color: B.success, bg: B.successBg },
};

const STOP_STATUS = {
  pending: { label: "Pendiente", color: B.textMuted, bg: B.surfaceHover },
  delivered: { label: "Entregado", color: B.success, bg: B.successBg },
  received: { label: "Recepcionado", color: B.success, bg: B.successBg },
  partial: { label: "Parcial", color: B.warning, bg: B.warningBg },
  incident: { label: "Incidencia", color: B.danger, bg: B.dangerBg },
  awaiting: { label: "Espera recepción", color: B.info, bg: B.infoBg },
};

const ROUTES = [
  { id: "RUTA-024", date: "05/04", driver: "Carlos Vega", status: "planning", stops: 4, totalItems: 41, totalValue: 905000 },
  { id: "RUTA-023", date: "03/04", driver: "Carlos Vega", status: "completed", stops: 3, totalItems: 35, totalValue: 780000, departed: "08:30", returned: "12:15" },
  { id: "RUTA-022", date: "01/04", driver: "Carlos Vega", status: "completed", stops: 4, totalItems: 38, totalValue: 850000, departed: "08:15", returned: "13:00" },
];

const STOPS = [
  { order: 1, client: "Cheddar's Barros Arana", orderId: "PED-085", items: 10, total: 310000, status: "pending", distance: "4.2 km", eta: "~20 min" },
  { order: 2, client: "Dark Kitchen (Alley Burger)", orderId: "PED-087", items: 6, total: 180000, status: "pending", distance: "2.1 km", eta: "~10 min" },
  { order: 3, client: "Dark Kitchen (La Wera)", orderId: "PED-086", items: 4, total: 95000, status: "pending", distance: "0 km", eta: "misma ubicación" },
  { order: 4, client: "Cheddar's Angol", orderId: "PED-089", items: 12, total: 385000, status: "pending", distance: "retorno", eta: "~15 min" },
];

const LOAD_CHECKLIST = [
  { local: "Cheddar's Angol", items: ["Queso mozz. 15kg", "Pollo 20kg", "Carne molida 15kg", "Pan hamb. 100ud", "Harina 10kg", "Salsa BBQ 5lt"], note: "Cargar último (primera entrega al volver)" },
  { local: "Dark Kitchen (La Wera)", items: ["Salsa criolla 3lt", "Envases 100ud", "Carne molida 5kg", "Queso mozz. 8kg"], note: "Tercera parada" },
  { local: "Dark Kitchen (Alley Burger)", items: ["Pollo 15kg", "Pan hamb. 90ud", "Carne molida 10kg", "Cheddar sauce 4lt", "Envases 80ud", "Aceite 5lt"], note: "Segunda parada" },
  { local: "Cheddar's Barros Arana", items: ["Queso mozz. 12kg", "Pollo 20kg", "Harina 15kg", "Carne molida 15kg", "Pan hamb. 80ud"], note: "Cargar primero (primera parada)" },
];

const CLAIMS = [
  { id: "REC-003", date: "03/04", client: "Cheddar's Collao", orderId: "PED-082", item: "Pollo entero", qty: 3, unit: "kg", reason: "Mal olor al abrir envasado", status: "open", photo: true },
  { id: "REC-002", date: "28/03", client: "Dark Kitchen", orderId: "PED-075", item: "Queso mozzarella", qty: 2, unit: "kg", reason: "Llegó descongelado", status: "approved", photo: true, resolution: "NC parcial $13,000" },
  { id: "REC-001", date: "22/03", client: "Cheddar's Angol", orderId: "PED-070", item: "Pan hamburguesa", qty: 20, unit: "ud", reason: "Aplastados en transporte", status: "rejected", photo: true, resolution: "No procede — embalaje correcto" },
];

// ══════════════════════════════════════════════════════
// P1: ARMAR RUTA
// ══════════════════════════════════════════════════════
function ArmarRutaView() {
  const [selectedRoute, setSelectedRoute] = useState(null);
  const planningRoute = ROUTES.find(r => r.status === "planning");

  if (selectedRoute) {
    return (
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <Btn variant="ghost" onClick={() => setSelectedRoute(null)}>← Volver</Btn>
          <h3 style={{ fontSize: 16, fontWeight: 700 }}>{selectedRoute.id} — {selectedRoute.date}</h3>
          <Badge color={ROUTE_STATUS[selectedRoute.status].color} bg={ROUTE_STATUS[selectedRoute.status].bg}>{ROUTE_STATUS[selectedRoute.status].label}</Badge>
        </div>

        <Card style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 13 }}>
              <span style={{ fontWeight: 600 }}>Conductor:</span> {selectedRoute.driver} · <span style={{ fontWeight: 600 }}>{selectedRoute.stops} paradas</span> · <span style={{ fontWeight: 600 }}>${selectedRoute.totalValue.toLocaleString()}</span> total
            </div>
            {selectedRoute.status === "planning" && <Btn variant="primary">🚛 Iniciar despacho</Btn>}
          </div>
        </Card>

        {/* Sortable stops */}
        <div style={{ fontSize: 12, fontWeight: 600, color: B.textMuted, marginBottom: 8, letterSpacing: 0.5, textTransform: "uppercase" }}>Orden de paradas (arrastra para reordenar)</div>
        {STOPS.map((stop, i) => (
          <Card key={i} style={{ marginBottom: 8, display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", borderLeft: `4px solid ${i === 0 ? B.accent : B.border}` }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: B.surfaceHover, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, color: B.text, flexShrink: 0 }}>{stop.order}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{stop.client}</div>
              <div style={{ fontSize: 12, color: B.textMuted }}>{stop.orderId} · {stop.items} items · ${stop.total.toLocaleString()}</div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{ fontSize: 12, color: B.textMuted }}>{stop.distance}</div>
              <div style={{ fontSize: 11, color: B.textLight }}>{stop.eta}</div>
            </div>
            <Badge color={STOP_STATUS[stop.status].color} bg={STOP_STATUS[stop.status].bg}>{STOP_STATUS[stop.status].label}</Badge>
            {selectedRoute.status === "planning" && <span style={{ cursor: "grab", fontSize: 16, color: B.textLight }}>⋮⋮</span>}
          </Card>
        ))}

        {selectedRoute.status === "planning" && (
          <Card style={{ marginTop: 12, border: `1px dashed ${B.border}`, textAlign: "center", padding: 14 }}>
            <div style={{ fontSize: 13, color: B.textMuted }}>¿Muchos pedidos? Puedes crear un segundo viaje.</div>
            <Btn style={{ marginTop: 6, fontSize: 12 }}>+ Agregar viaje 2</Btn>
          </Card>
        )}
      </div>
    );
  }

  return (
    <div>
      {planningRoute && (
        <Card style={{ background: `${B.accent}08`, border: `1px solid ${B.accent}30`, marginBottom: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 13 }}>
            <span style={{ fontWeight: 700 }}>Ruta en planificación:</span>
            <span style={{ color: B.textMuted, marginLeft: 6 }}>{planningRoute.id} · {planningRoute.date} · {planningRoute.stops} paradas · ${planningRoute.totalValue.toLocaleString()}</span>
          </div>
          <Btn variant="primary" onClick={() => setSelectedRoute(planningRoute)}>Abrir ruta</Btn>
        </Card>
      )}

      <Card style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "12px 16px", borderBottom: `1px solid ${B.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontSize: 14, fontWeight: 700 }}>Historial de rutas</h3>
          <Btn variant="primary">+ Nueva ruta</Btn>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: font }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${B.border}`, background: "#FAFAF8" }}>
              {["Ruta", "Fecha", "Conductor", "Paradas", "Items", "Total", "Salida", "Retorno", "Estado"].map(h =>
                <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontWeight: 600, color: B.textMuted, fontSize: 11 }}>{h}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {ROUTES.map(r => {
              const st = ROUTE_STATUS[r.status];
              return (
                <tr key={r.id} style={{ borderBottom: `1px solid ${B.border}`, cursor: "pointer" }}
                  onMouseEnter={e => e.currentTarget.style.background = B.surfaceHover}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  onClick={() => setSelectedRoute(r)}>
                  <td style={{ padding: "10px 12px", fontWeight: 700, color: B.info }}>{r.id}</td>
                  <td style={{ padding: "10px 12px" }}>{r.date}</td>
                  <td style={{ padding: "10px 12px", color: B.textMuted }}>{r.driver}</td>
                  <td style={{ padding: "10px 12px" }}>{r.stops}</td>
                  <td style={{ padding: "10px 12px", color: B.textMuted }}>{r.totalItems}</td>
                  <td style={{ padding: "10px 12px", fontWeight: 600 }}>${r.totalValue.toLocaleString()}</td>
                  <td style={{ padding: "10px 12px", color: B.textMuted }}>{r.departed || "—"}</td>
                  <td style={{ padding: "10px 12px", color: B.textMuted }}>{r.returned || "—"}</td>
                  <td style={{ padding: "10px 12px" }}><Badge color={st.color} bg={st.bg}>{st.label}</Badge></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// P3: CARGAR VEHÍCULO
// ══════════════════════════════════════════════════════
function CargarView() {
  return (
    <div>
      <Card style={{ marginBottom: 14, background: B.infoBg, border: `1px solid ${B.info}20` }}>
        <div style={{ fontSize: 13 }}>
          <span style={{ fontWeight: 600 }}>Orden de carga = inverso a la ruta.</span>
          <span style={{ color: B.textMuted, marginLeft: 6 }}>Lo que se entrega último se carga primero (queda al fondo del vehículo).</span>
        </div>
      </Card>

      {LOAD_CHECKLIST.map((local, i) => (
        <Card key={i} style={{ marginBottom: 8, borderLeft: `4px solid ${i === 0 ? B.accent : B.border}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{i + 1}. {local.local}</div>
              <div style={{ fontSize: 11, color: B.info, fontWeight: 500 }}>{local.note}</div>
            </div>
            <Badge>{local.items.length} items</Badge>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {local.items.map((item, ii) => (
              <label key={ii} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 10px", background: B.surfaceHover, borderRadius: 6, cursor: "pointer", fontSize: 13 }}>
                <input type="checkbox" />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </Card>
      ))}

      <Btn variant="primary" style={{ width: "100%", padding: 14, marginTop: 8, fontSize: 15 }}>✓ Carga completa — Iniciar ruta</Btn>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// P4: ENTREGAR (mobile-first)
// ══════════════════════════════════════════════════════
function EntregarView() {
  const [currentStop, setCurrentStop] = useState(0);
  const stop = STOPS[currentStop];

  return (
    <div>
      <Card style={{ marginBottom: 14, background: B.infoBg, border: `1px solid ${B.info}20` }}>
        <div style={{ fontSize: 13, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 18 }}>📱</span>
          <span style={{ fontWeight: 600 }}>Vista del repartidor (mobile-first).</span>
          <span style={{ color: B.textMuted }}>Un hito por local: marcar entregado + foto opcional.</span>
        </div>
      </Card>

      {/* Progress */}
      <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
        {STOPS.map((s, i) => (
          <div key={i} onClick={() => setCurrentStop(i)} style={{
            flex: 1, height: 6, borderRadius: 3, cursor: "pointer",
            background: i < currentStop ? B.success : i === currentStop ? B.accent : B.border,
            transition: "background 0.2s",
          }} />
        ))}
      </div>
      <div style={{ fontSize: 12, color: B.textMuted, marginBottom: 14, textAlign: "center" }}>Parada {currentStop + 1} de {STOPS.length}</div>

      {/* Current stop */}
      <Card style={{ padding: "24px", textAlign: "center", marginBottom: 12 }}>
        <div style={{ fontSize: 12, color: B.textMuted, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Siguiente entrega</div>
        <div style={{ fontSize: 22, fontWeight: 800, color: B.text, marginBottom: 4 }}>{stop.client}</div>
        <div style={{ fontSize: 13, color: B.textMuted, marginBottom: 16 }}>{stop.orderId} · {stop.items} items · ${stop.total.toLocaleString()}</div>

        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 20, flexWrap: "wrap" }}>
          {["Queso mozz. 15kg", "Pollo 20kg", "Carne molida 15kg", "Pan hamb. 100ud"].map((item, i) => (
            <span key={i} style={{ padding: "6px 12px", background: B.surfaceHover, borderRadius: 6, fontSize: 13 }}>{item}</span>
          ))}
        </div>

        {/* Photo upload */}
        <div style={{
          border: `2px dashed ${B.border}`, borderRadius: 12, padding: "20px",
          marginBottom: 16, cursor: "pointer", color: B.textMuted, fontSize: 13,
        }}>
          📷 Tomar foto de entrega (opcional)
        </div>

        <Btn variant="primary" style={{ width: "100%", padding: 16, fontSize: 16 }}
          onClick={() => currentStop < STOPS.length - 1 && setCurrentStop(currentStop + 1)}>
          ✓ Marcar entregado{currentStop < STOPS.length - 1 ? " → Siguiente parada" : " → Cerrar ruta"}
        </Btn>
      </Card>

      {/* Incident option */}
      <div style={{ textAlign: "center" }}>
        <Btn variant="ghost" style={{ color: B.danger, fontSize: 12 }}>⚠️ Reportar incidencia (local cerrado, rechazo, etc.)</Btn>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// P5: RECEPCIÓN POR LOCAL + P7 STOCK
// ══════════════════════════════════════════════════════
function RecepcionLocalView() {
  const deliveries = [
    { id: "ENT-089", client: "Cheddar's Angol", date: "05/04 11:30", items: 12, total: 385000, status: "awaiting" },
    { id: "ENT-087", client: "Dark Kitchen (Alley)", date: "05/04 10:15", items: 6, total: 180000, status: "received" },
    { id: "ENT-085", client: "Cheddar's Barros Arana", date: "05/04 09:40", items: 10, total: 310000, status: "partial" },
  ];

  return (
    <div>
      <Card style={{ marginBottom: 14, background: B.infoBg, border: `1px solid ${B.info}20` }}>
        <div style={{ fontSize: 13 }}>
          <span style={{ fontWeight: 600 }}>Flujo de stock:</span>
          <span style={{ color: B.textMuted, marginLeft: 6 }}>Al despachar → stock WCI baja. Al confirmar recepción → stock local sube. Auto-confirma en 48h si el local no responde.</span>
        </div>
      </Card>

      {deliveries.map((d, i) => {
        const st = STOP_STATUS[d.status];
        return (
          <Card key={i} style={{ marginBottom: 8, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: st.color, flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 650 }}>{d.client}</div>
                <div style={{ fontSize: 12, color: B.textMuted }}>{d.id} · {d.items} items · ${d.total.toLocaleString()} · {d.date}</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Badge color={st.color} bg={st.bg}>{st.label}</Badge>
              {d.status === "awaiting" && <Btn style={{ fontSize: 12 }}>Enviar recordatorio</Btn>}
              {d.status === "partial" && <Btn variant="danger" style={{ fontSize: 12 }}>Ver diferencias</Btn>}
            </div>
          </Card>
        );
      })}

      <Card style={{ marginTop: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: B.text, marginBottom: 8 }}>Efecto en stock al despachar RUTA-024</div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: font }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${B.border}` }}>
              {["Item", "Qty despachada", "Stock WCI antes", "Stock WCI después", "Tipo movimiento"].map(h =>
                <th key={h} style={{ padding: "8px 10px", textAlign: "left", fontWeight: 600, color: B.textMuted, fontSize: 11 }}>{h}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {[
              { item: "Queso mozzarella", qty: 35, before: 45, after: 10 },
              { item: "Pollo entero", qty: 55, before: 48, after: -7 },
              { item: "Carne molida", qty: 40, before: 50, after: 10 },
            ].map((r, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${B.border}` }}>
                <td style={{ padding: "8px 10px", fontWeight: 600 }}>{r.item}</td>
                <td style={{ padding: "8px 10px", color: B.danger, fontWeight: 600 }}>-{r.qty}</td>
                <td style={{ padding: "8px 10px", color: B.textMuted }}>{r.before}</td>
                <td style={{ padding: "8px 10px", fontWeight: 700, color: r.after < 0 ? B.danger : B.text }}>{r.after}</td>
                <td style={{ padding: "8px 10px" }}><Badge color={B.info} bg={B.infoBg}>venta (despacho)</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// P8: RECLAMOS POST-ENTREGA
// ══════════════════════════════════════════════════════
function ReclamosView() {
  const [selected, setSelected] = useState(null);

  const CLAIM_STATUS = {
    open: { label: "Abierto", color: B.warning, bg: B.warningBg },
    approved: { label: "Aprobado", color: B.success, bg: B.successBg },
    rejected: { label: "Rechazado", color: B.danger, bg: B.dangerBg },
    resolved: { label: "Resuelto", color: B.success, bg: B.successBg },
  };

  if (selected) {
    const c = selected;
    const st = CLAIM_STATUS[c.status];
    return (
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <Btn variant="ghost" onClick={() => setSelected(null)}>← Volver</Btn>
          <h3 style={{ fontSize: 16, fontWeight: 700 }}>{c.id}</h3>
          <Badge color={st.color} bg={st.bg}>{st.label}</Badge>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 14 }}>
          <Card>
            <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Detalle del reclamo</h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
              {[
                { label: "Local", value: c.client },
                { label: "Pedido", value: c.orderId },
                { label: "Item", value: c.item },
                { label: "Cantidad", value: `${c.qty} ${c.unit}` },
                { label: "Fecha reclamo", value: c.date },
                { label: "Motivo", value: c.reason },
              ].map(f => (
                <div key={f.label}>
                  <div style={{ fontSize: 11, color: B.textMuted, marginBottom: 2 }}>{f.label}</div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{f.value}</div>
                </div>
              ))}
            </div>

            {c.photo && (
              <div style={{ border: `1px solid ${B.border}`, borderRadius: 8, padding: 20, textAlign: "center", background: B.surfaceHover, marginBottom: 14 }}>
                <span style={{ fontSize: 24 }}>📷</span>
                <div style={{ fontSize: 12, color: B.textMuted, marginTop: 4 }}>Foto evidencia adjunta</div>
              </div>
            )}

            {c.status === "open" && (
              <div style={{ display: "flex", gap: 8 }}>
                <Btn variant="success" style={{ flex: 1 }}>✓ Aprobar — Generar NC</Btn>
                <Btn variant="danger" style={{ flex: 1 }}>✗ Rechazar</Btn>
              </div>
            )}
            {c.resolution && (
              <Card style={{ background: c.status === "approved" ? B.successBg : B.dangerBg, border: "none", marginTop: 10 }}>
                <div style={{ fontSize: 13 }}><span style={{ fontWeight: 600 }}>Resolución:</span> {c.resolution}</div>
              </Card>
            )}
          </Card>

          <div>
            <Card style={{ marginBottom: 10 }}>
              <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Si se aprueba</h4>
              <div style={{ fontSize: 12, color: B.textMuted, lineHeight: 1.6 }}>
                1. Genera NC parcial vía Ingefactura<br />
                2. Ajusta CxC del local<br />
                3. WCI decide: ¿item vuelve o es merma?<br />
                4. Si vuelve → stock WCI sube al recibir<br />
                5. Si merma → se registra con valorización
              </div>
            </Card>
            <Card>
              <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Historial reclamos — {c.client}</h4>
              <div style={{ fontSize: 12, color: B.textMuted }}>3 reclamos en últimos 90 días</div>
              <div style={{ fontSize: 12, color: B.warning, fontWeight: 600, marginTop: 4 }}>⚠️ Por encima del promedio</div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ fontSize: 13, color: B.textMuted, marginBottom: 14 }}>Reclamos post-recepción. El local ya confirmó pero encontró un problema después.</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {CLAIMS.map(c => {
          const st = CLAIM_STATUS[c.status];
          return (
            <Card key={c.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}
              onClick={() => setSelected(c)}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: st.color, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 650 }}>{c.id} — {c.client}</div>
                  <div style={{ fontSize: 12, color: B.textMuted }}>{c.item} · {c.qty} {c.unit} · {c.reason} · {c.date}</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {c.photo && <span style={{ fontSize: 14 }}>📷</span>}
                <Badge color={st.color} bg={st.bg}>{st.label}</Badge>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// P6: CIERRE DE RUTA
// ══════════════════════════════════════════════════════
function CierreView() {
  return (
    <Card>
      <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>Cierre de ruta — RUTA-023 (03/04)</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 16 }}>
        {[
          { label: "Salida", value: "08:30" },
          { label: "Retorno", value: "12:15" },
          { label: "Duración total", value: "3h 45min" },
          { label: "Incidencias", value: "0" },
        ].map(m => (
          <div key={m.label} style={{ padding: "12px", background: B.surfaceHover, borderRadius: 8, textAlign: "center" }}>
            <div style={{ fontSize: 11, color: B.textMuted }}>{m.label}</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: B.text }}>{m.value}</div>
          </div>
        ))}
      </div>

      <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Detalle por parada</div>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: font }}>
        <thead>
          <tr style={{ borderBottom: `1px solid ${B.border}`, background: "#FAFAF8" }}>
            {["#", "Local", "Llegada", "Salida", "Tiempo", "Estado", "Foto"].map(h =>
              <th key={h} style={{ padding: "8px 12px", textAlign: "left", fontWeight: 600, color: B.textMuted, fontSize: 11 }}>{h}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {[
            { n: 1, local: "B. Arana", llegada: "09:05", salida: "09:20", tiempo: "15 min", status: "delivered", photo: true },
            { n: 2, local: "DK Alley", llegada: "09:40", salida: "09:50", tiempo: "10 min", status: "delivered", photo: true },
            { n: 3, local: "DK Wera", llegada: "09:50", salida: "09:55", tiempo: "5 min", status: "delivered", photo: false },
          ].map(s => (
            <tr key={s.n} style={{ borderBottom: `1px solid ${B.border}` }}>
              <td style={{ padding: "8px 12px", fontWeight: 700 }}>{s.n}</td>
              <td style={{ padding: "8px 12px", fontWeight: 600 }}>{s.local}</td>
              <td style={{ padding: "8px 12px", color: B.textMuted }}>{s.llegada}</td>
              <td style={{ padding: "8px 12px", color: B.textMuted }}>{s.salida}</td>
              <td style={{ padding: "8px 12px" }}>{s.tiempo}</td>
              <td style={{ padding: "8px 12px" }}><Badge color={B.success} bg={B.successBg}>Entregado</Badge></td>
              <td style={{ padding: "8px 12px" }}>{s.photo ? "📷" : "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

// ══════════════════════════════════════════════════════
// MAIN
// ══════════════════════════════════════════════════════
export default function DespachoModule() {
  const [tab, setTab] = useState("rutas");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function check() { setIsMobile(window.innerWidth < 900); }
    check(); window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const openClaims = CLAIMS.filter(c => c.status === "open").length;

  const TABS = [
    { id: "rutas", label: "Rutas", icon: "🚛" },
    { id: "cargar", label: "Cargar vehículo", icon: "📦" },
    { id: "entregar", label: "Entregar", icon: "📍" },
    { id: "recepcion", label: "Recepción + stock", icon: "✅" },
    { id: "cierre", label: "Cierre ruta", icon: "🏁" },
    { id: "reclamos", label: "Reclamos", icon: "⚠️", badge: openClaims > 0 ? openClaims : null, badgeBg: B.warningBg, badgeColor: B.warning },
  ];

  return (
    <div style={{ fontFamily: font, background: "#F5F4F0", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&family=DM+Serif+Display&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input:focus, select:focus { outline: none; border-color: ${B.accent} !important; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-thumb { background: #d4d2cd; border-radius: 3px; }
      `}</style>

      <header style={{ background: B.surface, borderBottom: `1px solid ${B.border}`, position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ padding: "0 24px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, background: B.accent, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 16, color: B.primary, fontFamily: serif }}>C</div>
            <div style={{ lineHeight: 1.1 }}><div style={{ fontFamily: serif, fontSize: 14, fontWeight: 700 }}>Cheddar's</div><div style={{ fontSize: 9, color: B.textMuted, fontWeight: 500, letterSpacing: 1.5, textTransform: "uppercase" }}>West Coast</div></div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 16, cursor: "pointer" }}>🔔</span>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: B.accent, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 12, color: B.primary }}>PF</div>
          </div>
        </div>
        {!isMobile && (
          <div style={{ padding: "0 24px", display: "flex", gap: 2, borderTop: `1px solid ${B.border}`, height: 40, alignItems: "center" }}>
            {["Dashboard", "Inventario", "Compras", "Pedidos", "Despacho", "Producción", "Calidad", "Finanzas", "Catálogo", "Más"].map(n => (
              <span key={n} style={{ padding: "6px 11px", fontSize: 13, fontWeight: n === "Despacho" ? 650 : 500, color: n === "Despacho" ? B.text : B.textMuted, borderBottom: n === "Despacho" ? `2px solid ${B.accent}` : "2px solid transparent", cursor: "pointer" }}>{n}</span>
            ))}
          </div>
        )}
      </header>

      <main style={{ padding: isMobile ? 16 : "20px 32px", maxWidth: 1320, margin: "0 auto" }}>
        <div style={{ marginBottom: 16 }}>
          <h1 style={{ fontSize: isMobile ? 20 : 24, fontWeight: 800, color: B.text, fontFamily: serif }}>🚛 Despacho + rutas</h1>
          <p style={{ fontSize: 13, color: B.textMuted, marginTop: 2 }}>{ROUTES.length} rutas · {openClaims} reclamos abiertos</p>
        </div>

        <TabBar tabs={TABS} active={tab} onChange={setTab} />

        {tab === "rutas" && <ArmarRutaView />}
        {tab === "cargar" && <CargarView />}
        {tab === "entregar" && <EntregarView />}
        {tab === "recepcion" && <RecepcionLocalView />}
        {tab === "cierre" && <CierreView />}
        {tab === "reclamos" && <ReclamosView />}
      </main>
    </div>
  );
}
