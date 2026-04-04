import { useState, useEffect } from "react";

const B = {
  primary: "#1A1A1A", accent: "#F5C518", surface: "#FFFFFF", surfaceHover: "#F8F8F6", border: "#E8E6E1",
  text: "#1A1A1A", textMuted: "#7A7770", textLight: "#AEABA4",
  danger: "#DC3545", dangerBg: "#DC354512", success: "#28A745", successBg: "#28A74512",
  warning: "#E67E00", warningBg: "#E67E0012", info: "#2E86DE", infoBg: "#2E86DE12",
};
const font = "'DM Sans', system-ui, sans-serif";
const serif = "'DM Serif Display', Georgia, serif";

function Badge({ children, color = B.textMuted, bg = B.surfaceHover }) {
  return <span style={{ fontSize: 11, fontWeight: 650, color, background: bg, padding: "2px 8px", borderRadius: 10, whiteSpace: "nowrap" }}>{children}</span>;
}
function Btn({ children, variant = "default", onClick, style: sx = {} }) {
  const styles = { primary: { background: B.accent, color: B.primary, border: "none", fontWeight: 700 }, danger: { background: B.dangerBg, color: B.danger, border: `1px solid ${B.danger}30`, fontWeight: 600 }, success: { background: B.successBg, color: B.success, border: `1px solid ${B.success}30`, fontWeight: 600 }, default: { background: B.surface, color: B.text, border: `1px solid ${B.border}`, fontWeight: 600 }, ghost: { background: "transparent", color: B.textMuted, border: "none", fontWeight: 600 } };
  return <button onClick={onClick} style={{ padding: "7px 14px", borderRadius: 8, fontSize: 13, cursor: "pointer", fontFamily: font, ...styles[variant], ...sx }}>{children}</button>;
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

const fmt = (n) => Math.abs(n) >= 1000000 ? `$${(n / 1000000).toFixed(1)}M` : Math.abs(n) >= 1000 ? `$${(n / 1000).toFixed(0)}K` : `$${n.toLocaleString()}`;

// ── CxP Data ──
const CXP = [
  { id: 1, folio: "#4521", supplier: "Distribuidora Lagos", date: "04/04", due: "04/05", total: 485000, paid: 0, status: "pending", aging: "0-30" },
  { id: 2, folio: "#4498", supplier: "Distribuidora Lagos", date: "28/03", due: "28/04", total: 412000, paid: 200000, status: "partial", aging: "0-30" },
  { id: 3, folio: "#891", supplier: "Carnes del Sur", date: "03/04", due: "03/04", total: 320000, paid: 320000, status: "paid", aging: "0-30" },
  { id: 4, folio: "#2201", supplier: "Agrícola Don Pedro", date: "15/03", due: "30/03", total: 125000, paid: 0, status: "overdue", aging: "0-30", overdueDays: 5 },
  { id: 5, folio: "#1102", supplier: "Distribuidora Lagos", date: "01/03", due: "01/04", total: 380000, paid: 380000, status: "paid", aging: "0-30" },
  { id: 6, folio: "#780", supplier: "Envases Express", date: "20/02", due: "20/03", total: 89000, paid: 0, status: "overdue", aging: "30-60", overdueDays: 15 },
];

// ── CxC Data ──
const CXC = [
  { id: 1, folio: "F-1042", client: "Cheddar's Angol", date: "05/04", due: "12/04", total: 385000, paid: 0, status: "pending", aging: "0-7", type: "propio" },
  { id: 2, folio: "F-1041", client: "Dark Kitchen (Alley)", date: "05/04", due: "12/04", total: 180000, paid: 0, status: "pending", aging: "0-7", type: "operador" },
  { id: 3, folio: "F-1040", client: "Dark Kitchen (La Wera)", date: "05/04", due: "12/04", total: 95000, paid: 0, status: "pending", aging: "0-7", type: "operador" },
  { id: 4, folio: "F-1038", client: "Cheddar's Angol", date: "03/04", due: "10/04", total: 420000, paid: 420000, status: "paid", aging: "0-7", type: "propio" },
  { id: 5, folio: "F-1035", client: "Cheddar's Collao", date: "01/04", due: "08/04", total: 245000, paid: 0, status: "pending", aging: "0-7", type: "propio" },
  { id: 6, folio: "F-1030", client: "Dark Kitchen (Alley)", date: "25/03", due: "01/04", total: 310000, paid: 0, status: "overdue", aging: "7-15", overdueDays: 3, type: "operador" },
  { id: 7, folio: "F-1025", client: "Dark Kitchen (La Wera)", date: "18/03", due: "25/03", total: 185000, paid: 0, status: "overdue", aging: "7-15", overdueDays: 10, type: "operador" },
];

const STATUS_MAP = {
  pending: { label: "Pendiente", color: B.warning, bg: B.warningBg },
  partial: { label: "Parcial", color: B.info, bg: B.infoBg },
  paid: { label: "Pagada", color: B.success, bg: B.successBg },
  overdue: { label: "Vencida", color: B.danger, bg: B.dangerBg },
};

// ══════════════════════════════════════════════════════
// CXP VIEW
// ══════════════════════════════════════════════════════
function CxpView() {
  const [payingId, setPayingId] = useState(null);
  const [filter, setFilter] = useState("all");

  const totalPending = CXP.filter(i => i.status !== "paid").reduce((s, i) => s + i.total - i.paid, 0);
  const overdueCount = CXP.filter(i => i.status === "overdue").length;
  const overdueTotal = CXP.filter(i => i.status === "overdue").reduce((s, i) => s + i.total - i.paid, 0);

  let items = [...CXP];
  if (filter === "pending") items = items.filter(i => i.status === "pending" || i.status === "partial");
  if (filter === "overdue") items = items.filter(i => i.status === "overdue");
  if (filter === "paid") items = items.filter(i => i.status === "paid");

  // Aging summary
  const aging = {
    "0-30": CXP.filter(i => i.status !== "paid" && i.aging === "0-30").reduce((s, i) => s + i.total - i.paid, 0),
    "30-60": CXP.filter(i => i.status !== "paid" && i.aging === "30-60").reduce((s, i) => s + i.total - i.paid, 0),
    "60-90": 0,
    "90+": 0,
  };

  return (
    <div>
      {/* Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 16 }}>
        <Card style={{ padding: "12px 16px", textAlign: "center" }}>
          <div style={{ fontSize: 12, color: B.textMuted }}>Total por pagar</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: B.danger }}>{fmt(totalPending)}</div>
        </Card>
        <Card style={{ padding: "12px 16px", textAlign: "center" }}>
          <div style={{ fontSize: 12, color: B.textMuted }}>Facturas vencidas</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: overdueCount > 0 ? B.danger : B.success }}>{overdueCount}</div>
        </Card>
        <Card style={{ padding: "12px 16px", textAlign: "center" }}>
          <div style={{ fontSize: 12, color: B.textMuted }}>Monto vencido</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: B.danger }}>{fmt(overdueTotal)}</div>
        </Card>
        <Card style={{ padding: "12px 16px", textAlign: "center" }}>
          <div style={{ fontSize: 12, color: B.textMuted }}>Proveedores con deuda</div>
          <div style={{ fontSize: 22, fontWeight: 800 }}>{new Set(CXP.filter(i => i.status !== "paid").map(i => i.supplier)).size}</div>
        </Card>
      </div>

      {/* Aging bars */}
      <Card style={{ marginBottom: 14 }}>
        <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>Aging de deuda</h4>
        <div style={{ display: "flex", gap: 8 }}>
          {Object.entries(aging).map(([range, amount]) => (
            <div key={range} style={{ flex: 1, padding: "10px", borderRadius: 8, background: amount > 0 ? (range === "0-30" ? B.successBg : range === "30-60" ? B.warningBg : B.dangerBg) : B.surfaceHover, textAlign: "center" }}>
              <div style={{ fontSize: 11, color: B.textMuted }}>{range} días</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: amount > 0 ? (range === "0-30" ? B.success : range === "30-60" ? B.warning : B.danger) : B.textLight }}>{fmt(amount)}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Filters */}
      <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
        {[{ id: "all", label: "Todas" }, { id: "pending", label: "Pendientes" }, { id: "overdue", label: `Vencidas (${overdueCount})` }, { id: "paid", label: "Pagadas" }].map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)} style={{
            padding: "6px 12px", borderRadius: 6, fontSize: 12, fontWeight: filter === f.id ? 650 : 500,
            border: filter === f.id ? `2px solid ${B.accent}` : `1px solid ${B.border}`,
            background: filter === f.id ? `${B.accent}08` : B.surface, cursor: "pointer", fontFamily: font,
            color: filter === f.id ? B.text : B.textMuted,
          }}>{f.label}</button>
        ))}
      </div>

      {/* Table */}
      <Card style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: font }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${B.border}`, background: "#FAFAF8" }}>
              {["Factura", "Proveedor", "Fecha", "Vencimiento", "Total", "Pagado", "Saldo", "Estado", ""].map(h =>
                <th key={h} style={{ padding: "10px 10px", textAlign: "left", fontWeight: 600, color: B.textMuted, fontSize: 11 }}>{h}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {items.map(inv => {
              const st = STATUS_MAP[inv.status];
              const saldo = inv.total - inv.paid;
              return (
                <tr key={inv.id} style={{ borderBottom: `1px solid ${B.border}`, background: inv.status === "overdue" ? B.dangerBg : "transparent" }}>
                  <td style={{ padding: "10px 10px", fontWeight: 700 }}>{inv.folio}</td>
                  <td style={{ padding: "10px 10px", fontWeight: 600 }}>{inv.supplier}</td>
                  <td style={{ padding: "10px 10px", color: B.textMuted }}>{inv.date}</td>
                  <td style={{ padding: "10px 10px", color: inv.status === "overdue" ? B.danger : B.textMuted, fontWeight: inv.status === "overdue" ? 700 : 400 }}>
                    {inv.due} {inv.overdueDays ? <span style={{ fontSize: 11 }}>({inv.overdueDays}d mora)</span> : ""}
                  </td>
                  <td style={{ padding: "10px 10px" }}>{fmt(inv.total)}</td>
                  <td style={{ padding: "10px 10px", color: inv.paid > 0 ? B.success : B.textLight }}>{fmt(inv.paid)}</td>
                  <td style={{ padding: "10px 10px", fontWeight: 700, color: saldo > 0 ? B.danger : B.success }}>{fmt(saldo)}</td>
                  <td style={{ padding: "10px 10px" }}><Badge color={st.color} bg={st.bg}>{st.label}</Badge></td>
                  <td style={{ padding: "10px 10px" }}>
                    {inv.status !== "paid" && (
                      payingId === inv.id ? (
                        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                          <input type="number" defaultValue={saldo} style={{ width: 80, padding: "5px 6px", border: `1px solid ${B.accent}`, borderRadius: 6, fontSize: 12, fontFamily: font, textAlign: "center" }} />
                          <Btn variant="primary" onClick={() => setPayingId(null)} style={{ fontSize: 11, padding: "4px 8px" }}>✓</Btn>
                          <Btn variant="ghost" onClick={() => setPayingId(null)} style={{ fontSize: 11, padding: "4px 4px" }}>✗</Btn>
                        </div>
                      ) : (
                        <Btn onClick={() => setPayingId(inv.id)} style={{ fontSize: 11, padding: "4px 10px" }}>Registrar pago</Btn>
                      )
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>

      {/* By supplier */}
      <Card style={{ marginTop: 14 }}>
        <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>Deuda por proveedor</h4>
        {[...new Set(CXP.filter(i => i.status !== "paid").map(i => i.supplier))].map(supplier => {
          const supplierItems = CXP.filter(i => i.supplier === supplier && i.status !== "paid");
          const total = supplierItems.reduce((s, i) => s + i.total - i.paid, 0);
          return (
            <div key={supplier} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: `1px solid ${B.border}` }}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>{supplier}</span>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ fontSize: 12, color: B.textMuted }}>{supplierItems.length} facturas</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: B.danger }}>{fmt(total)}</span>
              </div>
            </div>
          );
        })}
      </Card>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// CXC VIEW
// ══════════════════════════════════════════════════════
function CxcView() {
  const [collectingId, setCollectingId] = useState(null);
  const [filter, setFilter] = useState("all");

  const totalPending = CXC.filter(i => i.status !== "paid").reduce((s, i) => s + i.total - i.paid, 0);
  const overdueCount = CXC.filter(i => i.status === "overdue").length;
  const overdueTotal = CXC.filter(i => i.status === "overdue").reduce((s, i) => s + i.total - i.paid, 0);
  const overdueOperadores = CXC.filter(i => i.status === "overdue" && i.type === "operador");

  let items = [...CXC];
  if (filter === "pending") items = items.filter(i => i.status === "pending");
  if (filter === "overdue") items = items.filter(i => i.status === "overdue");
  if (filter === "paid") items = items.filter(i => i.status === "paid");

  const aging = {
    "0-7": CXC.filter(i => i.status !== "paid" && i.aging === "0-7").reduce((s, i) => s + i.total - i.paid, 0),
    "7-15": CXC.filter(i => i.status !== "paid" && i.aging === "7-15").reduce((s, i) => s + i.total - i.paid, 0),
    "15-30": 0,
    "30+": 0,
  };

  return (
    <div>
      {/* Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 16 }}>
        <Card style={{ padding: "12px 16px", textAlign: "center" }}>
          <div style={{ fontSize: 12, color: B.textMuted }}>Total por cobrar</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: B.info }}>{fmt(totalPending)}</div>
        </Card>
        <Card style={{ padding: "12px 16px", textAlign: "center" }}>
          <div style={{ fontSize: 12, color: B.textMuted }}>Facturas vencidas</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: overdueCount > 0 ? B.danger : B.success }}>{overdueCount}</div>
        </Card>
        <Card style={{ padding: "12px 16px", textAlign: "center" }}>
          <div style={{ fontSize: 12, color: B.textMuted }}>Monto vencido</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: B.danger }}>{fmt(overdueTotal)}</div>
        </Card>
        <Card style={{ padding: "12px 16px", textAlign: "center" }}>
          <div style={{ fontSize: 12, color: B.textMuted }}>DSO (días promedio cobro)</div>
          <div style={{ fontSize: 22, fontWeight: 800 }}>8.5</div>
        </Card>
      </div>

      {/* Overdue operators warning */}
      {overdueOperadores.length > 0 && (
        <Card style={{ background: B.dangerBg, border: `1px solid ${B.danger}20`, marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 13 }}>
              <span style={{ fontWeight: 700, color: B.danger }}>⚠️ {overdueOperadores.length} facturas vencidas de operadores.</span>
              <span style={{ color: B.textMuted, marginLeft: 6 }}>Operadores con mora pueden ser bloqueados para nuevos pedidos.</span>
            </div>
            <Btn variant="danger" style={{ fontSize: 12 }}>Bloquear pedidos</Btn>
          </div>
        </Card>
      )}

      {/* Aging */}
      <Card style={{ marginBottom: 14 }}>
        <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>Aging de cobros</h4>
        <div style={{ display: "flex", gap: 8 }}>
          {Object.entries(aging).map(([range, amount]) => (
            <div key={range} style={{ flex: 1, padding: "10px", borderRadius: 8, background: amount > 0 ? (range === "0-7" ? B.successBg : range === "7-15" ? B.warningBg : B.dangerBg) : B.surfaceHover, textAlign: "center" }}>
              <div style={{ fontSize: 11, color: B.textMuted }}>{range} días</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: amount > 0 ? (range === "0-7" ? B.success : range === "7-15" ? B.warning : B.danger) : B.textLight }}>{fmt(amount)}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Filters */}
      <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
        {[{ id: "all", label: "Todas" }, { id: "pending", label: "Pendientes" }, { id: "overdue", label: `Vencidas (${overdueCount})` }, { id: "paid", label: "Cobradas" }].map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)} style={{
            padding: "6px 12px", borderRadius: 6, fontSize: 12, fontWeight: filter === f.id ? 650 : 500,
            border: filter === f.id ? `2px solid ${B.accent}` : `1px solid ${B.border}`,
            background: filter === f.id ? `${B.accent}08` : B.surface, cursor: "pointer", fontFamily: font,
            color: filter === f.id ? B.text : B.textMuted,
          }}>{f.label}</button>
        ))}
      </div>

      {/* Table */}
      <Card style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: font }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${B.border}`, background: "#FAFAF8" }}>
              {["Factura", "Local", "Tipo", "Fecha", "Vence", "Total", "Cobrado", "Saldo", "Estado", ""].map(h =>
                <th key={h} style={{ padding: "10px 8px", textAlign: "left", fontWeight: 600, color: B.textMuted, fontSize: 11 }}>{h}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {items.map(inv => {
              const st = STATUS_MAP[inv.status];
              const saldo = inv.total - inv.paid;
              return (
                <tr key={inv.id} style={{ borderBottom: `1px solid ${B.border}`, background: inv.status === "overdue" ? B.dangerBg : "transparent" }}>
                  <td style={{ padding: "10px 8px", fontWeight: 700, color: B.info }}>{inv.folio}</td>
                  <td style={{ padding: "10px 8px", fontWeight: 600 }}>{inv.client}</td>
                  <td style={{ padding: "10px 8px" }}>
                    <Badge color={inv.type === "propio" ? B.success : B.info} bg={inv.type === "propio" ? B.successBg : B.infoBg}>
                      {inv.type === "propio" ? "Propio" : "Operador"}
                    </Badge>
                  </td>
                  <td style={{ padding: "10px 8px", color: B.textMuted }}>{inv.date}</td>
                  <td style={{ padding: "10px 8px", color: inv.status === "overdue" ? B.danger : B.textMuted, fontWeight: inv.status === "overdue" ? 700 : 400 }}>
                    {inv.due} {inv.overdueDays ? <span style={{ fontSize: 11 }}>({inv.overdueDays}d)</span> : ""}
                  </td>
                  <td style={{ padding: "10px 8px" }}>{fmt(inv.total)}</td>
                  <td style={{ padding: "10px 8px", color: inv.paid > 0 ? B.success : B.textLight }}>{fmt(inv.paid)}</td>
                  <td style={{ padding: "10px 8px", fontWeight: 700, color: saldo > 0 ? B.info : B.success }}>{fmt(saldo)}</td>
                  <td style={{ padding: "10px 8px" }}><Badge color={st.color} bg={st.bg}>{st.label}</Badge></td>
                  <td style={{ padding: "10px 8px" }}>
                    {inv.status !== "paid" && (
                      collectingId === inv.id ? (
                        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                          <input type="number" defaultValue={saldo} style={{ width: 80, padding: "5px 6px", border: `1px solid ${B.accent}`, borderRadius: 6, fontSize: 12, fontFamily: font, textAlign: "center" }} />
                          <Btn variant="primary" onClick={() => setCollectingId(null)} style={{ fontSize: 11, padding: "4px 8px" }}>✓</Btn>
                          <Btn variant="ghost" onClick={() => setCollectingId(null)} style={{ fontSize: 11, padding: "4px 4px" }}>✗</Btn>
                        </div>
                      ) : (
                        <div style={{ display: "flex", gap: 4 }}>
                          <Btn onClick={() => setCollectingId(inv.id)} style={{ fontSize: 11, padding: "4px 8px" }}>Cobrar</Btn>
                          {inv.status === "overdue" && <Btn variant="ghost" style={{ fontSize: 11, padding: "4px 6px" }}>📧</Btn>}
                        </div>
                      )
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>

      {/* Mora policy */}
      <Card style={{ marginTop: 14 }}>
        <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Política de mora</h4>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, fontSize: 12 }}>
          <div style={{ padding: "10px 12px", background: B.surfaceHover, borderRadius: 8 }}>
            <div style={{ fontWeight: 700, color: B.text, marginBottom: 4 }}>Locales propios (Cheddar's)</div>
            <div style={{ color: B.textMuted }}>Recordatorio a 3/7/15 días de mora. Alerta sin bloqueo — son nuestros.</div>
          </div>
          <div style={{ padding: "10px 12px", background: B.surfaceHover, borderRadius: 8 }}>
            <div style={{ fontWeight: 700, color: B.text, marginBottom: 4 }}>Operadores (Dark Kitchen, futuros)</div>
            <div style={{ color: B.textMuted }}>Recordatorio a 3/7 días. A 15 días: posible bloqueo de pedidos hasta regularizar.</div>
          </div>
        </div>
      </Card>

      {/* By client */}
      <Card style={{ marginTop: 14 }}>
        <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>Deuda por local</h4>
        {[...new Set(CXC.filter(i => i.status !== "paid").map(i => i.client))].map(client => {
          const clientItems = CXC.filter(i => i.client === client && i.status !== "paid");
          const total = clientItems.reduce((s, i) => s + i.total - i.paid, 0);
          const isOverdue = clientItems.some(i => i.status === "overdue");
          const type = clientItems[0]?.type;
          return (
            <div key={client} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: `1px solid ${B.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{client}</span>
                <Badge color={type === "propio" ? B.success : B.info} bg={type === "propio" ? B.successBg : B.infoBg}>{type}</Badge>
                {isOverdue && <Badge color={B.danger} bg={B.dangerBg}>Con mora</Badge>}
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ fontSize: 12, color: B.textMuted }}>{clientItems.length} facturas</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: B.info }}>{fmt(total)}</span>
              </div>
            </div>
          );
        })}
      </Card>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// MAIN
// ══════════════════════════════════════════════════════
export default function CxModule() {
  const [module, setModule] = useState("cxp");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function check() { setIsMobile(window.innerWidth < 900); }
    check(); window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const cxpOverdue = CXP.filter(i => i.status === "overdue").length;
  const cxcOverdue = CXC.filter(i => i.status === "overdue").length;

  return (
    <div style={{ fontFamily: font, background: "#F5F4F0", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&family=DM+Serif+Display&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input:focus { outline: none; border-color: ${B.accent} !important; }
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
            <span style={{ fontSize: 16 }}>🔔</span>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: B.accent, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 12, color: B.primary }}>PF</div>
          </div>
        </div>
        {!isMobile && (
          <div style={{ padding: "0 24px", display: "flex", gap: 2, borderTop: `1px solid ${B.border}`, height: 40, alignItems: "center" }}>
            {["Dashboard", "Inventario", "Compras", "Pedidos", "Despacho", "Producción", "Calidad", "Finanzas", "Catálogo", "Más"].map(n => (
              <span key={n} style={{ padding: "6px 11px", fontSize: 13, fontWeight: n === "Finanzas" ? 650 : 500, color: n === "Finanzas" ? B.text : B.textMuted, borderBottom: n === "Finanzas" ? `2px solid ${B.accent}` : "2px solid transparent", cursor: "pointer" }}>{n}</span>
            ))}
          </div>
        )}
      </header>

      <main style={{ padding: isMobile ? 16 : "20px 32px", maxWidth: 1320, margin: "0 auto" }}>
        {/* Module toggle */}
        <div style={{ display: "flex", gap: 0, marginBottom: 20 }}>
          <button onClick={() => setModule("cxp")} style={{
            flex: 1, padding: "14px", borderRadius: "12px 0 0 12px", cursor: "pointer", fontFamily: font,
            border: `2px solid ${module === "cxp" ? B.accent : B.border}`,
            background: module === "cxp" ? `${B.accent}10` : B.surface,
            borderRight: module === "cxp" ? `2px solid ${B.accent}` : "none",
          }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: module === "cxp" ? B.text : B.textMuted }}>💸 Cuentas por Pagar</div>
            <div style={{ fontSize: 12, color: B.textMuted }}>Lo que WCI debe a proveedores {cxpOverdue > 0 && <Badge color={B.danger} bg={B.dangerBg}>{cxpOverdue} vencidas</Badge>}</div>
          </button>
          <button onClick={() => setModule("cxc")} style={{
            flex: 1, padding: "14px", borderRadius: "0 12px 12px 0", cursor: "pointer", fontFamily: font,
            border: `2px solid ${module === "cxc" ? B.accent : B.border}`,
            background: module === "cxc" ? `${B.accent}10` : B.surface,
            borderLeft: module === "cxc" ? `2px solid ${B.accent}` : "none",
          }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: module === "cxc" ? B.text : B.textMuted }}>💰 Cuentas por Cobrar</div>
            <div style={{ fontSize: 12, color: B.textMuted }}>Lo que locales deben a WCI {cxcOverdue > 0 && <Badge color={B.danger} bg={B.dangerBg}>{cxcOverdue} vencidas</Badge>}</div>
          </button>
        </div>

        {module === "cxp" && <CxpView />}
        {module === "cxc" && <CxcView />}
      </main>
    </div>
  );
}
