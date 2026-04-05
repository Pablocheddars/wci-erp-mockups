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
function Select({ value, onChange, options, style: sx = {} }) {
  return <select value={value} onChange={e => onChange(e.target.value)} style={{ padding: "8px 12px", border: `1px solid ${B.border}`, borderRadius: 8, fontSize: 13, fontFamily: font, background: B.surface, outline: "none", cursor: "pointer", ...sx }}>{options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select>;
}

const STATUS = {
  draft: { label: "Borrador", color: B.textMuted, bg: B.surfaceHover },
  sent: { label: "Enviado", color: B.info, bg: B.infoBg },
  confirmed: { label: "Confirmado", color: B.success, bg: B.successBg },
  picking: { label: "En picking", color: B.purple, bg: B.purpleBg },
  dispatched: { label: "Despachado", color: B.warning, bg: B.warningBg },
  delivered: { label: "Entregado", color: B.success, bg: B.successBg },
};

const ORDERS = [
  { id: "PED-089", client: "Cheddar's Angol", clientShort: "Angol", date: "04/04", delivery: "05/04", items: 12, total: 385000, status: "sent" },
  { id: "PED-088", client: "Cheddar's Collao", clientShort: "Collao", date: "04/04", delivery: "05/04", items: 9, total: 245000, status: "sent" },
  { id: "PED-087", client: "Dark Kitchen (Alley Burger)", clientShort: "DK Alley", date: "04/04", delivery: "05/04", items: 6, total: 180000, status: "confirmed" },
  { id: "PED-086", client: "Dark Kitchen (La Wera)", clientShort: "DK Wera", date: "03/04", delivery: "05/04", items: 4, total: 95000, status: "confirmed" },
  { id: "PED-085", client: "Cheddar's Barros Arana", clientShort: "B. Arana", date: "03/04", delivery: "05/04", items: 10, total: 310000, status: "picking" },
  { id: "PED-084", client: "Cheddar's Angol", clientShort: "Angol", date: "01/04", delivery: "03/04", items: 14, total: 420000, status: "delivered" },
];

const ORDER_ITEMS_DETAIL = [
  { name: "Queso mozzarella", qty: 15, unit: "kg", price: 6500, stockWci: 45, reserved: 20, stockMinimo: 5, available: 45 - 20 - 5, status: "ok" },
  { name: "Pollo entero", qty: 20, unit: "kg", price: 3800, stockWci: 18, reserved: 10, stockMinimo: 3, available: 18 - 10 - 3, status: "short" },
  { name: "Carne molida", qty: 15, unit: "kg", price: 5200, stockWci: 30, reserved: 5, stockMinimo: 2, available: 30 - 5 - 2, status: "ok" },
  { name: "Pan hamburguesa", qty: 100, unit: "ud", price: 250, stockWci: 200, reserved: 80, stockMinimo: 50, available: 200 - 80 - 50, status: "ok" },
  { name: "Harina", qty: 10, unit: "kg", price: 850, stockWci: 8, reserved: 0, stockMinimo: 2, available: 8 - 0 - 2, status: "short" },
  { name: "Salsa BBQ WCI", qty: 5, unit: "lt", price: 4200, stockWci: 6, reserved: 3, stockMinimo: 1, available: 6 - 3 - 1, status: "short" },
];

const CATALOG_ITEMS = [
  { name: "Queso mozzarella", category: "Lácteos", unit: "kg", price: 6500, stockLocal: 2, min: 10, weeklyUse: 8, suggested: 15 },
  { name: "Pollo entero", category: "Carnes", unit: "kg", price: 3800, stockLocal: 5, min: 15, weeklyUse: 12, suggested: 20 },
  { name: "Carne molida", category: "Carnes", unit: "kg", price: 5200, stockLocal: 3, min: 10, weeklyUse: 10, suggested: 15 },
  { name: "Pan hamburguesa", category: "Secos", unit: "ud", price: 250, stockLocal: 30, min: 100, weeklyUse: 80, suggested: 100 },
  { name: "Harina", category: "Secos", unit: "kg", price: 850, stockLocal: 4, min: 10, weeklyUse: 6, suggested: 10 },
  { name: "Aceite vegetal", category: "Secos", unit: "lt", price: 2200, stockLocal: 15, min: 10, weeklyUse: 4, suggested: 0 },
  { name: "Salsa BBQ WCI", category: "Elaborados", unit: "lt", price: 4200, stockLocal: 1, min: 5, weeklyUse: 3, suggested: 5 },
  { name: "Envase delivery 750ml", category: "Envases", unit: "ud", price: 180, stockLocal: 80, min: 100, weeklyUse: 60, suggested: 100 },
];

// ══════════════════════════════════════════════════════
// WCI: PANEL DE PEDIDOS ENTRANTES
// ══════════════════════════════════════════════════════
function PedidosPanel() {
  const [selected, setSelected] = useState(null);
  const pendingCount = ORDERS.filter(o => o.status === "sent").length;
  const tomorrowOrders = ORDERS.filter(o => o.delivery === "05/04");

  if (selected) {
    const order = selected;
    return (
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <Btn variant="ghost" onClick={() => setSelected(null)}>← Volver</Btn>
          <h3 style={{ fontSize: 16, fontWeight: 700 }}>{order.id} — {order.client}</h3>
          <Badge color={STATUS[order.status].color} bg={STATUS[order.status].bg}>{STATUS[order.status].label}</Badge>
        </div>

        <Card style={{ background: B.infoBg, border: `1px solid ${B.info}20`, marginBottom: 14 }}>
          <div style={{ fontSize: 13 }}>
            <span style={{ fontWeight: 600 }}>Entrega:</span> {order.delivery} · <span style={{ fontWeight: 600 }}>Items:</span> {order.items} · <span style={{ fontWeight: 600 }}>Total estimado:</span> ${order.total.toLocaleString()}
          </div>
        </Card>

        <Card style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "10px 16px", background: "#FAFAF8", borderBottom: `1px solid ${B.border}`, fontSize: 12, fontWeight: 600, color: B.textMuted, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
            <span>Stock disponible = Físico − Reservado − Stock mínimo</span>
            <span style={{ color: B.danger }}>🔴 = no alcanza</span>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: font }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${B.border}` }}>
                {["Item", "Pedido", "Stock WCI", "Reservado", "Mín.", "Disponible", "Acción", "Qty confirm.", "Motivo"].map(h =>
                  <th key={h} style={{ padding: "9px 12px", textAlign: "left", fontWeight: 600, color: B.textMuted, fontSize: 11 }}>{h}</th>
                )}
              </tr>
            </thead>
            <tbody>
              {ORDER_ITEMS_DETAIL.map((item, i) => {
                const isShort = item.available < item.qty;
                return (
                  <tr key={i} style={{ borderBottom: `1px solid ${B.border}`, background: isShort ? B.dangerBg : "transparent" }}>
                    <td style={{ padding: "9px 12px", fontWeight: 600 }}>{item.name}</td>
                    <td style={{ padding: "9px 12px" }}>{item.qty} {item.unit}</td>
                    <td style={{ padding: "9px 12px", color: B.textMuted }}>{item.stockWci}</td>
                    <td style={{ padding: "9px 12px", color: B.purple }}>{item.reserved}</td>
                    <td style={{ padding: "9px 12px", color: B.textMuted }}>{item.stockMinimo}</td>
                    <td style={{ padding: "9px 12px", fontWeight: 700, color: isShort ? B.danger : B.success }}>{item.available}</td>
                    <td style={{ padding: "9px 12px" }}>
                      <div style={{ display: "flex", gap: 3 }}>
                        {[{ l: "✓", t: "Confirmar", c: B.success }, { l: "✎", t: "Ajustar", c: B.warning }, { l: "✗", t: "Rechazar", c: B.danger }].map((a, ai) => (
                          <button key={ai} title={a.t} style={{
                            width: 28, height: 28, borderRadius: 6,
                            border: ai === 0 ? `2px solid ${a.c}` : `1px solid ${B.border}`,
                            background: ai === 0 ? `${a.c}15` : "transparent",
                            cursor: "pointer", fontSize: 12, fontWeight: 700, color: a.c,
                          }}>{a.l}</button>
                        ))}
                      </div>
                    </td>
                    <td style={{ padding: "9px 12px" }}>
                      <input type="number" defaultValue={isShort ? item.available : item.qty} style={{
                        width: 65, padding: "5px 8px", border: `1px solid ${isShort ? B.danger : B.border}`,
                        borderRadius: 6, fontSize: 13, fontWeight: 700, fontFamily: font, textAlign: "center",
                      }} />
                    </td>
                    <td style={{ padding: "9px 12px" }}>
                      {isShort && <input defaultValue="Stock insuficiente" style={{
                        width: "100%", padding: "5px 8px", border: `1px solid ${B.border}`,
                        borderRadius: 6, fontSize: 11, fontFamily: font, color: B.textMuted,
                      }} />}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div style={{ padding: "12px 16px", borderTop: `1px solid ${B.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 12, color: B.textMuted }}>Al confirmar se crean reservas de stock. El local recibe notificación con detalle de ajustes.</div>
            <div style={{ display: "flex", gap: 8 }}>
              <Btn variant="ghost">Cancelar</Btn>
              <Btn variant="primary">Confirmar pedido</Btn>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div>
      {/* Summary cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 16 }}>
        {[
          { label: "Por confirmar", value: pendingCount, color: B.warning, icon: "⏳" },
          { label: "Confirmados", value: ORDERS.filter(o => o.status === "confirmed").length, color: B.success, icon: "✅" },
          { label: "En picking", value: ORDERS.filter(o => o.status === "picking").length, color: B.purple, icon: "📦" },
          { label: "Despacho mañana", value: tomorrowOrders.length, color: B.info, icon: "🚛" },
        ].map(c => (
          <Card key={c.label} style={{ padding: "12px 16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
              <span style={{ fontSize: 16 }}>{c.icon}</span>
              <span style={{ fontSize: 12, color: B.textMuted, fontWeight: 500 }}>{c.label}</span>
            </div>
            <div style={{ fontSize: 24, fontWeight: 800, color: c.color }}>{c.value}</div>
          </Card>
        ))}
      </div>

      {/* Cutoff alert */}
      <Card style={{ background: B.warningBg, border: `1px solid ${B.warning}25`, marginBottom: 14, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
          <span style={{ fontSize: 18 }}>⏰</span>
          <span style={{ fontWeight: 600, color: B.text }}>Corte para entrega del martes 08/04:</span>
          <span style={{ color: B.textMuted }}>domingo 20:00 — quedan 38 horas</span>
        </div>
      </Card>

      {/* Orders table */}
      <Card style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: font }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${B.border}`, background: "#FAFAF8" }}>
              {["Pedido", "Local", "Enviado", "Entrega", "Items", "Total", "Estado", ""].map(h =>
                <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontWeight: 600, color: B.textMuted, fontSize: 12 }}>{h}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {ORDERS.map(o => {
              const st = STATUS[o.status];
              return (
                <tr key={o.id} style={{ borderBottom: `1px solid ${B.border}`, cursor: "pointer" }}
                  onMouseEnter={e => e.currentTarget.style.background = B.surfaceHover}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  onClick={() => o.status === "sent" && setSelected(o)}>
                  <td style={{ padding: "10px 14px", fontWeight: 700, color: B.info }}>{o.id}</td>
                  <td style={{ padding: "10px 14px", fontWeight: 600 }}>{o.client}</td>
                  <td style={{ padding: "10px 14px", color: B.textMuted }}>{o.date}</td>
                  <td style={{ padding: "10px 14px", color: B.textMuted }}>{o.delivery}</td>
                  <td style={{ padding: "10px 14px", color: B.textMuted }}>{o.items}</td>
                  <td style={{ padding: "10px 14px", fontWeight: 600 }}>${o.total.toLocaleString()}</td>
                  <td style={{ padding: "10px 14px" }}><Badge color={st.color} bg={st.bg}>{st.label}</Badge></td>
                  <td style={{ padding: "10px 14px" }}>
                    {o.status === "sent" && <Btn variant="primary" style={{ fontSize: 12, padding: "4px 10px" }}>Confirmar</Btn>}
                  </td>
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
// WCI: CONSOLIDAR DESPACHO
// ══════════════════════════════════════════════════════
function ConsolidarView() {
  const confirmed = ORDERS.filter(o => ["confirmed", "picking"].includes(o.status));
  const consolidado = [
    { name: "Queso mozzarella", total: 35, unit: "kg", byLocal: [{ local: "Angol", qty: 15 }, { local: "DK Alley", qty: 12 }, { local: "DK Wera", qty: 8 }], stockWci: 45, enough: true },
    { name: "Pollo entero", total: 55, unit: "kg", byLocal: [{ local: "Angol", qty: 20 }, { local: "Collao", qty: 15 }, { local: "B. Arana", qty: 20 }], stockWci: 48, enough: false },
    { name: "Carne molida", total: 40, unit: "kg", byLocal: [{ local: "Angol", qty: 15 }, { local: "Collao", qty: 10 }, { local: "B. Arana", qty: 15 }], stockWci: 50, enough: true },
    { name: "Pan hamburguesa", total: 350, unit: "ud", byLocal: [{ local: "Angol", qty: 100 }, { local: "Collao", qty: 80 }, { local: "DK Alley", qty: 90 }, { local: "B. Arana", qty: 80 }], stockWci: 400, enough: true },
  ];

  return (
    <div>
      <Card style={{ marginBottom: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700 }}>Despacho: Sábado 05/04</div>
          <div style={{ fontSize: 13, color: B.textMuted }}>{confirmed.length} pedidos confirmados · {confirmed.reduce((s, o) => s + o.items, 0)} items totales</div>
        </div>
        <Btn variant="primary">Generar picking lists</Btn>
      </Card>

      {/* By local */}
      <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8, color: B.text }}>Por local</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10, marginBottom: 20 }}>
        {confirmed.map(o => (
          <Card key={o.id} style={{ padding: "12px 16px" }}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>{o.clientShort}</div>
            <div style={{ fontSize: 12, color: B.textMuted }}>{o.items} items · ${o.total.toLocaleString()}</div>
            <Badge color={STATUS[o.status].color} bg={STATUS[o.status].bg}>{STATUS[o.status].label}</Badge>
          </Card>
        ))}
      </div>

      {/* Consolidated view */}
      <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8, color: B.text }}>Consolidado — total por item</div>
      <Card style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: font }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${B.border}`, background: "#FAFAF8" }}>
              {["Item", "Total requerido", "Stock WCI", "Cubre?", "Detalle por local"].map(h =>
                <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontWeight: 600, color: B.textMuted, fontSize: 12 }}>{h}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {consolidado.map((item, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${B.border}`, background: !item.enough ? B.dangerBg : "transparent" }}>
                <td style={{ padding: "10px 14px", fontWeight: 600 }}>{item.name}</td>
                <td style={{ padding: "10px 14px", fontWeight: 700 }}>{item.total} {item.unit}</td>
                <td style={{ padding: "10px 14px", color: B.textMuted }}>{item.stockWci} {item.unit}</td>
                <td style={{ padding: "10px 14px" }}>
                  {item.enough
                    ? <Badge color={B.success} bg={B.successBg}>✓ Sí</Badge>
                    : <Badge color={B.danger} bg={B.dangerBg}>✗ Faltan {item.total - item.stockWci} {item.unit}</Badge>}
                </td>
                <td style={{ padding: "10px 14px", fontSize: 12, color: B.textMuted }}>
                  {item.byLocal.map(l => `${l.local}: ${l.qty}`).join(" · ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// WCI: PICKING
// ══════════════════════════════════════════════════════
function PickingView() {
  const [activeLocal, setActiveLocal] = useState("Angol");
  const locals = ["Angol", "Collao", "DK Alley", "DK Wera", "B. Arana"];

  const pickingItems = [
    { name: "Queso mozzarella", qty: 15, unit: "kg", zone: "❄️ Cámara frío", picked: true },
    { name: "Pollo entero", qty: 20, unit: "kg", zone: "❄️ Cámara frío", picked: true },
    { name: "Carne molida", qty: 15, unit: "kg", zone: "❄️ Cámara frío", picked: false },
    { name: "Harina", qty: 10, unit: "kg", zone: "🏭 Bodega seca", picked: false },
    { name: "Pan hamburguesa", qty: 100, unit: "ud", zone: "🏭 Bodega seca", picked: false },
    { name: "Salsa BBQ WCI", qty: 5, unit: "lt", zone: "🍳 Cocina prod.", picked: false },
  ];

  const pickedCount = pickingItems.filter(i => i.picked).length;

  return (
    <div>
      <Card style={{ marginBottom: 14, background: B.infoBg, border: `1px solid ${B.info}20` }}>
        <div style={{ fontSize: 13, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 18 }}>📱</span>
          <span style={{ fontWeight: 600 }}>Vista mobile-first.</span>
          <span style={{ color: B.textMuted }}>El bodeguero usa esto desde el celular en la bodega. Items agrupados por zona para recorrer en orden.</span>
        </div>
      </Card>

      {/* Local selector */}
      <div style={{ display: "flex", gap: 6, marginBottom: 14, overflowX: "auto" }}>
        {locals.map(l => (
          <button key={l} onClick={() => setActiveLocal(l)} style={{
            padding: "8px 16px", borderRadius: 20,
            border: activeLocal === l ? `2px solid ${B.accent}` : `1px solid ${B.border}`,
            background: activeLocal === l ? `${B.accent}15` : B.surface,
            fontWeight: activeLocal === l ? 700 : 500, fontSize: 13,
            cursor: "pointer", fontFamily: font, whiteSpace: "nowrap",
            color: activeLocal === l ? B.text : B.textMuted,
          }}>{l}</button>
        ))}
      </div>

      {/* Progress */}
      <Card style={{ marginBottom: 14, padding: "12px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 700 }}>Picking — {activeLocal}</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: pickedCount === pickingItems.length ? B.success : B.text }}>{pickedCount} / {pickingItems.length}</span>
        </div>
        <div style={{ height: 8, background: B.surfaceHover, borderRadius: 4, overflow: "hidden" }}>
          <div style={{ width: `${(pickedCount / pickingItems.length) * 100}%`, height: "100%", background: pickedCount === pickingItems.length ? B.success : B.accent, borderRadius: 4, transition: "width 0.3s" }} />
        </div>
      </Card>

      {/* Picking items grouped by zone */}
      {["❄️ Cámara frío", "🏭 Bodega seca", "🍳 Cocina prod."].map(zone => {
        const zoneItems = pickingItems.filter(i => i.zone === zone);
        if (zoneItems.length === 0) return null;
        return (
          <div key={zone} style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: B.textMuted, marginBottom: 6, letterSpacing: 0.5, textTransform: "uppercase" }}>{zone}</div>
            {zoneItems.map((item, i) => (
              <Card key={i} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                marginBottom: 6, padding: "14px 18px",
                opacity: item.picked ? 0.5 : 1,
                background: item.picked ? B.surfaceHover : B.surface,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <button style={{
                    width: 36, height: 36, borderRadius: 8,
                    border: item.picked ? `2px solid ${B.success}` : `2px solid ${B.border}`,
                    background: item.picked ? B.successBg : "transparent",
                    cursor: "pointer", fontSize: 18,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>{item.picked ? "✓" : ""}</button>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 650, color: B.text, textDecoration: item.picked ? "line-through" : "none" }}>{item.name}</div>
                    <div style={{ fontSize: 13, color: B.textMuted }}>{item.zone}</div>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 20, fontWeight: 800 }}>{item.qty}</div>
                  <div style={{ fontSize: 12, color: B.textMuted }}>{item.unit}</div>
                </div>
              </Card>
            ))}
          </div>
        );
      })}

      <div style={{ display: "flex", gap: 8 }}>
        <Btn variant="primary" style={{ flex: 1, padding: "12px", fontSize: 15 }}>✓ Picking completo — Listo para despacho</Btn>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// VISTA LOCAL: "PEDIR A WCI"
// ══════════════════════════════════════════════════════
function VistaLocal() {
  const [step, setStep] = useState("catalog");

  if (step === "review") {
    const selectedItems = CATALOG_ITEMS.filter(i => i.suggested > 0);
    return (
      <div>
        <Card style={{ background: `${B.accent}08`, border: `1px solid ${B.accent}30`, marginBottom: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 13 }}>
            <span style={{ fontWeight: 700 }}>Así ve el local su pedido antes de enviar.</span>
            <span style={{ color: B.textMuted, marginLeft: 6 }}>Próxima entrega: Sábado 05/04 · Corte: Hoy 20:00</span>
          </div>
          <Badge color={B.warning} bg={B.warningBg}>⏰ 6h para el corte</Badge>
        </Card>

        <Card style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "10px 16px", background: "#FAFAF8", borderBottom: `1px solid ${B.border}`, fontSize: 12, color: B.textMuted, fontWeight: 600 }}>
            Resumen del pedido — {selectedItems.length} items
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: font }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${B.border}` }}>
                {["Item", "Cantidad", "Precio WCI", "Subtotal"].map(h =>
                  <th key={h} style={{ padding: "9px 14px", textAlign: "left", fontWeight: 600, color: B.textMuted, fontSize: 12 }}>{h}</th>
                )}
              </tr>
            </thead>
            <tbody>
              {selectedItems.map((item, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${B.border}` }}>
                  <td style={{ padding: "9px 14px", fontWeight: 600 }}>{item.name}</td>
                  <td style={{ padding: "9px 14px" }}>{item.suggested} {item.unit}</td>
                  <td style={{ padding: "9px 14px", color: B.textMuted }}>${item.price.toLocaleString()}/{item.unit}</td>
                  <td style={{ padding: "9px 14px", fontWeight: 600 }}>${(item.suggested * item.price).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ padding: "14px 16px", borderTop: `1px solid ${B.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Btn variant="ghost" onClick={() => setStep("catalog")}>← Editar pedido</Btn>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 12, color: B.textMuted }}>Total pedido</div>
                <div style={{ fontSize: 22, fontWeight: 800 }}>${selectedItems.reduce((s, i) => s + i.suggested * i.price, 0).toLocaleString()}</div>
              </div>
              <Btn variant="primary" style={{ padding: "12px 24px", fontSize: 14 }}>📤 Enviar pedido</Btn>
            </div>
          </div>
        </Card>

        <div style={{ fontSize: 12, color: B.textMuted, marginTop: 8 }}>
          Después del corte (hoy 20:00) ya no podrás editar. WCI puede ajustar cantidades si el stock no alcanza.
        </div>
      </div>
    );
  }

  if (step === "tracking") {
    return (
      <div>
        <Card style={{ background: `${B.accent}08`, border: `1px solid ${B.accent}30`, marginBottom: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 700 }}>Vista del local: seguimiento de pedidos</div>
        </Card>
        {[
          { id: "PED-084", date: "01/04", delivery: "03/04", total: 420000, status: "delivered", items: 14 },
          { id: "PED-079", date: "28/03", delivery: "01/04", total: 355000, status: "delivered", items: 11 },
        ].map(o => (
          <Card key={o.id} style={{ marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{o.id}</div>
              <div style={{ fontSize: 12, color: B.textMuted }}>{o.items} items · ${o.total.toLocaleString()} · Entrega: {o.delivery}</div>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <Badge color={STATUS[o.status].color} bg={STATUS[o.status].bg}>{STATUS[o.status].label}</Badge>
              <Btn variant="ghost" style={{ fontSize: 12 }}>🔄 Repetir</Btn>
            </div>
          </Card>
        ))}
        <Card style={{ marginTop: 12, padding: "12px 16px" }}>
          <div style={{ fontSize: 13, color: B.textMuted }}>
            <span style={{ fontWeight: 600 }}>Gasto mensual a WCI:</span> $1.195.000 · <span style={{ fontWeight: 600 }}>Promedio por pedido:</span> $387.500
          </div>
        </Card>
      </div>
    );
  }

  // Catalog / armar pedido
  return (
    <div>
      <Card style={{ background: `${B.accent}08`, border: `1px solid ${B.accent}30`, marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 13 }}>
            <span style={{ fontWeight: 700 }}>Así ve el local la página "Pedir a WCI".</span>
            <span style={{ color: B.textMuted, marginLeft: 6 }}>Próxima entrega: Sábado 05/04</span>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <Btn variant="ghost" onClick={() => setStep("tracking")} style={{ fontSize: 12 }}>Ver mis pedidos</Btn>
          </div>
        </div>
      </Card>

      {/* Suggestion banner */}
      <Card style={{ background: B.warningBg, border: `1px solid ${B.warning}25`, marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
          <span style={{ fontSize: 18 }}>💡</span>
          <span style={{ fontWeight: 600 }}>Pedido sugerido:</span>
          <span style={{ color: B.textMuted }}>{CATALOG_ITEMS.filter(i => i.suggested > 0).length} items bajo mínimo pre-cargados con cantidad sugerida basada en consumo + stock actual.</span>
        </div>
      </Card>

      <Card style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: font }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${B.border}`, background: "#FAFAF8" }}>
              {["Item", "Categoría", "Stock local", "Mín.", "Consumo/sem", "Precio WCI", "Cantidad", "Subtotal"].map(h =>
                <th key={h} style={{ padding: "9px 12px", textAlign: "left", fontWeight: 600, color: B.textMuted, fontSize: 11 }}>{h}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {CATALOG_ITEMS.map((item, i) => {
              const isLow = item.stockLocal < item.min;
              return (
                <tr key={i} style={{ borderBottom: `1px solid ${B.border}`, background: isLow && item.suggested > 0 ? `${B.warning}06` : "transparent" }}>
                  <td style={{ padding: "9px 12px", fontWeight: 600 }}>{item.name}</td>
                  <td style={{ padding: "9px 12px", color: B.textMuted, fontSize: 12 }}>{item.category}</td>
                  <td style={{ padding: "9px 12px", fontWeight: 600, color: isLow ? B.danger : B.text }}>{item.stockLocal} {item.unit}</td>
                  <td style={{ padding: "9px 12px", color: B.textMuted }}>{item.min}</td>
                  <td style={{ padding: "9px 12px", color: B.textMuted }}>{item.weeklyUse} {item.unit}</td>
                  <td style={{ padding: "9px 12px", color: B.textMuted }}>${item.price.toLocaleString()}</td>
                  <td style={{ padding: "9px 12px" }}>
                    <input type="number" defaultValue={item.suggested} style={{
                      width: 65, padding: "6px 8px", border: `1px solid ${item.suggested > 0 ? B.accent : B.border}`,
                      borderRadius: 6, fontSize: 14, fontWeight: 700, fontFamily: font, textAlign: "center",
                      background: item.suggested > 0 ? `${B.accent}08` : "transparent",
                    }} />
                  </td>
                  <td style={{ padding: "9px 12px", fontWeight: item.suggested > 0 ? 700 : 400, color: item.suggested > 0 ? B.text : B.textLight }}>
                    ${(item.suggested * item.price).toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div style={{ padding: "12px 16px", borderTop: `1px solid ${B.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 12, color: B.textMuted }}>Nota opcional para WCI:</div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 12, color: B.textMuted }}>Total</div>
              <div style={{ fontSize: 20, fontWeight: 800 }}>${CATALOG_ITEMS.reduce((s, i) => s + i.suggested * i.price, 0).toLocaleString()}</div>
            </div>
            <Btn variant="primary" onClick={() => setStep("review")}>Revisar pedido →</Btn>
          </div>
        </div>
      </Card>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// CONFIG: VENTANAS DE ENTREGA
// ══════════════════════════════════════════════════════
function ConfigView() {
  const windows = [
    { client: "Cheddar's Angol", days: ["Martes", "Viernes"], cutoff: "Día anterior 20:00" },
    { client: "Cheddar's Collao", days: ["Martes", "Viernes"], cutoff: "Día anterior 20:00" },
    { client: "Cheddar's Barros Arana", days: ["Miércoles"], cutoff: "Lunes 20:00" },
    { client: "Dark Kitchen", days: ["Martes", "Jueves", "Sábado"], cutoff: "Día anterior 18:00" },
  ];

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
        {windows.map((w, i) => (
          <Card key={i}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{w.client}</div>
              <Btn variant="ghost" style={{ fontSize: 12, padding: "4px 8px" }}>Editar</Btn>
            </div>
            <div style={{ fontSize: 13, color: B.textMuted, marginBottom: 4 }}>
              <span style={{ fontWeight: 600 }}>Días de entrega:</span> {w.days.join(", ")}
            </div>
            <div style={{ fontSize: 13, color: B.textMuted }}>
              <span style={{ fontWeight: 600 }}>Hora de corte:</span> {w.cutoff}
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>📅 Días bloqueados (feriados)</h4>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
          {["01/05 — Día del Trabajo", "21/05 — Glorias Navales", "29/06 — San Pedro y San Pablo"].map(d => (
            <Badge key={d} color={B.text} bg={B.surfaceHover}>{d} ✕</Badge>
          ))}
        </div>
        <Btn style={{ fontSize: 12 }}>+ Agregar feriado</Btn>
      </Card>

      <Card style={{ marginTop: 14 }}>
        <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>⚡ Pedidos urgentes</h4>
        <div style={{ fontSize: 13, color: B.textMuted }}>Los pedidos fuera de ventana requieren aprobación del gte. operaciones. Se muestran con badge "Urgente" en el panel.</div>
      </Card>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// HISTORIAL
// ══════════════════════════════════════════════════════
function HistorialView() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
      <Card>
        <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>📊 Volumen por local</h4>
        {[
          { local: "Cheddar's Angol", total: 1850000, pct: 100 },
          { local: "Cheddar's Collao", total: 1200000, pct: 65 },
          { local: "Dark Kitchen", total: 980000, pct: 53 },
          { local: "Cheddar's B. Arana", total: 750000, pct: 40 },
        ].map(l => (
          <div key={l.local} style={{ marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 3 }}>
              <span style={{ fontWeight: 600 }}>{l.local}</span>
              <span style={{ fontWeight: 700 }}>${l.total.toLocaleString()}</span>
            </div>
            <div style={{ height: 6, background: B.surfaceHover, borderRadius: 3 }}>
              <div style={{ width: `${l.pct}%`, height: "100%", background: B.accent, borderRadius: 3 }} />
            </div>
          </div>
        ))}
      </Card>

      <Card>
        <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>🏆 Items más pedidos</h4>
        {["Queso mozzarella — 120 kg", "Pollo entero — 95 kg", "Carne molida — 85 kg", "Pan hamburguesa — 600 ud", "Harina — 50 kg"].map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderBottom: `1px solid ${B.border}`, fontSize: 13 }}>
            <span style={{ fontWeight: 700, color: B.accent, width: 20 }}>{i + 1}</span>
            <span style={{ fontWeight: 500 }}>{item}</span>
          </div>
        ))}
      </Card>

      <Card>
        <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>📉 Tasa ajuste/rechazo</h4>
        {[
          { label: "Confirmados sin cambio", pct: 78, color: B.success },
          { label: "Ajustados (qty)", pct: 18, color: B.warning },
          { label: "Rechazados (item)", pct: 4, color: B.danger },
        ].map(r => (
          <div key={r.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: `1px solid ${B.border}`, fontSize: 13 }}>
            <span>{r.label}</span>
            <span style={{ fontWeight: 700, color: r.color }}>{r.pct}%</span>
          </div>
        ))}
      </Card>

      <Card>
        <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>📈 Tendencia demanda</h4>
        <div style={{ fontSize: 13, color: B.textMuted, marginBottom: 8 }}>Consolidado para planificar compras WCI</div>
        {["Queso mozzarella: ↑ 12% vs mes anterior", "Pollo entero: → estable", "Pan hamburguesa: ↑ 8%", "Carne molida: ↓ 5%"].map((t, i) => (
          <div key={i} style={{ padding: "5px 0", borderBottom: `1px solid ${B.border}`, fontSize: 13 }}>{t}</div>
        ))}
      </Card>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// MAIN
// ══════════════════════════════════════════════════════
export default function PedidosModule() {
  const [tab, setTab] = useState("panel");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function check() { setIsMobile(window.innerWidth < 900); }
    check(); window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const pendingCount = ORDERS.filter(o => o.status === "sent").length;

  const TABS = [
    { id: "panel", label: "Pedidos entrantes", icon: "📋", badge: pendingCount, badgeBg: B.warningBg, badgeColor: B.warning },
    { id: "consolidar", label: "Consolidar", icon: "📦" },
    { id: "picking", label: "Picking", icon: "✅" },
    { id: "local", label: "Vista local", icon: "🏪" },
    { id: "config", label: "Ventanas", icon: "⚙️" },
    { id: "historial", label: "Reportes", icon: "📊" },
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
            <div style={{ lineHeight: 1.1 }}><div style={{ fontFamily: serif, fontSize: 14, fontWeight: 700, color: B.text }}>Cheddar's</div><div style={{ fontSize: 9, color: B.textMuted, fontWeight: 500, letterSpacing: 1.5, textTransform: "uppercase" }}>West Coast</div></div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 16, cursor: "pointer" }}>🔔</span>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: B.accent, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 12, color: B.primary }}>PF</div>
          </div>
        </div>
        {!isMobile && (
          <div style={{ padding: "0 24px", display: "flex", gap: 2, borderTop: `1px solid ${B.border}`, height: 40, alignItems: "center" }}>
            {["Dashboard", "Inventario", "Compras", "Pedidos", "Despacho", "Producción", "Calidad", "Finanzas", "Catálogo", "Más"].map(n => (
              <span key={n} style={{ padding: "6px 11px", fontSize: 13, fontWeight: n === "Pedidos" ? 650 : 500, color: n === "Pedidos" ? B.text : B.textMuted, borderBottom: n === "Pedidos" ? `2px solid ${B.accent}` : "2px solid transparent", cursor: "pointer" }}>{n}</span>
            ))}
          </div>
        )}
      </header>

      <main style={{ padding: isMobile ? 16 : "20px 32px", maxWidth: 1320, margin: "0 auto" }}>
        <div style={{ marginBottom: 16 }}>
          <h1 style={{ fontSize: isMobile ? 20 : 24, fontWeight: 800, color: B.text, fontFamily: serif }}>📋 Pedidos entrantes</h1>
          <p style={{ fontSize: 13, color: B.textMuted, marginTop: 2 }}>{ORDERS.length} pedidos · {pendingCount} por confirmar · Próximo despacho: Sábado 05/04 · Stock mínimo configurable por producto para evitar quiebres de stock</p>
        </div>

        <TabBar tabs={TABS} active={tab} onChange={setTab} />

        {tab === "panel" && <PedidosPanel />}
        {tab === "consolidar" && <ConsolidarView />}
        {tab === "picking" && <PickingView />}
        {tab === "local" && <VistaLocal />}
        {tab === "config" && <ConfigView />}
        {tab === "historial" && <HistorialView />}
      </main>
    </div>
  );
}
