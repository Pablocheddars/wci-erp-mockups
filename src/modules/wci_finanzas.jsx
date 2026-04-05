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
  const styles = { primary: { background: B.accent, color: B.primary, border: "none", fontWeight: 700 }, danger: { background: B.dangerBg, color: B.danger, border: `1px solid ${B.danger}30`, fontWeight: 600 }, default: { background: B.surface, color: B.text, border: `1px solid ${B.border}`, fontWeight: 600 }, ghost: { background: "transparent", color: B.textMuted, border: "none", fontWeight: 600 } };
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
        </button>
      ))}
    </div>
  );
}

const fmt = (n) => {
  if (Math.abs(n) >= 1000000) return `$${(n / 1000000).toFixed(1)}M`;
  if (Math.abs(n) >= 1000) return `$${(n / 1000).toFixed(0)}K`;
  return `$${n.toLocaleString()}`;
};

// ── Mock Data ──
const PNL_WCI = { revenue: 4850000, cogs: 3200000, production: 480000, fixed: 2800000, get gross() { return this.revenue - this.cogs - this.production; }, get net() { return this.gross - this.fixed; } };
Object.defineProperty(PNL_WCI, 'gross', { get() { return this.revenue - this.cogs - this.production; } });
Object.defineProperty(PNL_WCI, 'net', { get() { return this.gross - this.fixed; } });

const LOCALS = [
  { name: "Cheddar's Angol", grossSales: 12500000, commissions: 1875000, netRevenue: 10625000, cogsWci: 2100000, cogsOther: 850000, personnel: 3200000, otherCosts: 800000, get margin() { return this.netRevenue - this.cogsWci - this.cogsOther - this.personnel - this.otherCosts; }, foodCostPct: 27.8, fcTarget: 30, budget: { sales: 13000000, fc: 30, personnel: 3200000 } },
  { name: "Cheddar's Collao", grossSales: 9800000, commissions: 1470000, netRevenue: 8330000, cogsWci: 1650000, cogsOther: 620000, personnel: 2800000, otherCosts: 650000, get margin() { return this.netRevenue - this.cogsWci - this.cogsOther - this.personnel - this.otherCosts; }, foodCostPct: 27.3, fcTarget: 30, budget: { sales: 10000000, fc: 30, personnel: 2800000 } },
  { name: "Cheddar's B. Arana", grossSales: 7200000, commissions: 1080000, netRevenue: 6120000, cogsWci: 1250000, cogsOther: 480000, personnel: 2400000, otherCosts: 500000, get margin() { return this.netRevenue - this.cogsWci - this.cogsOther - this.personnel - this.otherCosts; }, foodCostPct: 28.3, fcTarget: 30, budget: { sales: 8000000, fc: 30, personnel: 2400000 } },
  { name: "Dark Kitchen", grossSales: 5500000, commissions: 1650000, netRevenue: 3850000, cogsWci: 980000, cogsOther: 320000, personnel: 1600000, otherCosts: 400000, get margin() { return this.netRevenue - this.cogsWci - this.cogsOther - this.personnel - this.otherCosts; }, foodCostPct: 33.8, fcTarget: 32, budget: { sales: 6000000, fc: 32, personnel: 1600000 } },
];

const BANK_TXS = [
  { date: "04/04", desc: "Transferencia Cheddar's Angol — Pago F-1038", amount: 420000, type: "ingreso", matched: true, matchRef: "CxC F-1038" },
  { date: "04/04", desc: "Transferencia Distribuidora Lagos — Pago factura", amount: -485000, type: "egreso", matched: true, matchRef: "CxP #4521" },
  { date: "03/04", desc: "Transferencia Dark Kitchen — Pago F-1035", amount: 275000, type: "ingreso", matched: true, matchRef: "CxC F-1035" },
  { date: "03/04", desc: "Pago remuneraciones marzo", amount: -3800000, type: "egreso", matched: true, matchRef: "RRHH Marzo" },
  { date: "02/04", desc: "Depósito efectivo local Angol", amount: 850000, type: "ingreso", matched: false, matchRef: null },
  { date: "02/04", desc: "Transferencia desconocida", amount: 125000, type: "ingreso", matched: false, matchRef: null },
  { date: "01/04", desc: "Transferencia Carnes del Sur — Pago factura", amount: -320000, type: "egreso", matched: true, matchRef: "CxP #891" },
];

const CASH_REGISTERS = [
  { location: "Cheddar's Angol", theoretical: 485000, declared: 482000, diff: -3000, status: "closed", deposited: false },
  { location: "Cheddar's Collao", theoretical: 320000, declared: 321500, diff: 1500, status: "closed", deposited: true },
  { location: "Cheddar's B. Arana", theoretical: 210000, declared: null, diff: null, status: "open", deposited: false },
  { location: "Dark Kitchen", theoretical: 0, declared: 0, diff: 0, status: "closed", deposited: true },
];

// ══════════════════════════════════════════════════════
// P1+P2+P3: P&L
// ══════════════════════════════════════════════════════
function PnlView() {
  const [view, setView] = useState("compare"); // compare, wci, local
  const [selectedLocal, setSelectedLocal] = useState(null);

  function PnlLine({ label, value, indent = 0, bold = false, color = B.text, borderTop = false }) {
    return (
      <div style={{ display: "flex", justifyContent: "space-between", padding: `${bold ? 10 : 7}px 0`, borderTop: borderTop ? `2px solid ${B.text}` : "none", borderBottom: `1px solid ${B.border}`, paddingLeft: indent * 20 }}>
        <span style={{ fontSize: 13, fontWeight: bold ? 800 : indent > 0 ? 400 : 600, color: indent > 0 ? B.textMuted : B.text }}>{label}</span>
        <span style={{ fontSize: 13, fontWeight: bold ? 800 : 600, color }}>{fmt(value)}</span>
      </div>
    );
  }

  if (selectedLocal) {
    const l = selectedLocal;
    const totalCogs = l.cogsWci + l.cogsOther;
    const margin = l.netRevenue - totalCogs - l.personnel - l.otherCosts;
    return (
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <Btn variant="ghost" onClick={() => setSelectedLocal(null)}>← Volver</Btn>
          <h3 style={{ fontSize: 16, fontWeight: 700 }}>P&L — {l.name}</h3>
          <Badge>Marzo 2026</Badge>
        </div>
        <Card>
          <PnlLine label="Ventas brutas" value={l.grossSales} />
          <PnlLine label="Comisiones apps (UberEats, Rappi, etc.)" value={-l.commissions} indent={1} color={B.danger} />
          <PnlLine label="Ingresos netos" value={l.netRevenue} bold />
          <div style={{ height: 8 }} />
          <PnlLine label="Costos insumos — compras a WCI" value={-l.cogsWci} indent={1} color={B.danger} />
          <PnlLine label="Costos insumos — otros proveedores" value={-l.cogsOther} indent={1} color={B.danger} />
          <PnlLine label="Total costo insumos" value={-totalCogs} />
          <PnlLine label="Food cost %" value={`${l.foodCostPct}%`} indent={1} color={l.foodCostPct > l.fcTarget ? B.danger : B.success} />
          <div style={{ height: 8 }} />
          <PnlLine label="Personal" value={-l.personnel} color={B.danger} />
          <PnlLine label="Otros costos" value={-l.otherCosts} indent={1} color={B.danger} />
          <div style={{ height: 4 }} />
          <PnlLine label="Margen operativo" value={margin} bold borderTop color={margin >= 0 ? B.success : B.danger} />
          <PnlLine label="Margen %" value={`${(margin / l.netRevenue * 100).toFixed(1)}%`} indent={1} color={margin >= 0 ? B.success : B.danger} />
        </Card>
        <Card style={{ marginTop: 12, background: B.infoBg, border: `1px solid ${B.info}20` }}>
          <div style={{ fontSize: 12, color: B.textMuted }}>
            <span style={{ fontWeight: 600 }}>Nota:</span> Las compras a WCI son un gasto real del local. Ingresos netos = ventas brutas - comisiones de apps.
          </div>
        </Card>
      </div>
    );
  }

  if (view === "wci") {
    const gross = PNL_WCI.revenue - PNL_WCI.cogs - PNL_WCI.production;
    const net = gross - PNL_WCI.fixed;
    return (
      <div>
        <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
          {["compare", "wci"].map(v => (
            <button key={v} onClick={() => setView(v)} style={{ padding: "6px 14px", borderRadius: 6, fontSize: 13, fontWeight: view === v ? 650 : 500, border: view === v ? `2px solid ${B.accent}` : `1px solid ${B.border}`, background: view === v ? `${B.accent}08` : B.surface, cursor: "pointer", fontFamily: font, color: view === v ? B.text : B.textMuted }}>
              {v === "compare" ? "Comparativo red" : "P&L WCI"}
            </button>
          ))}
        </div>
        <Card>
          <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>P&L West Coast Industries — Marzo 2026</h4>
          <PnlLine label="Ingresos (facturación a locales)" value={PNL_WCI.revenue} />
          <PnlLine label="Costo de compras (proveedores)" value={-PNL_WCI.cogs} indent={1} color={B.danger} />
          <PnlLine label="Costo de producción (elaborados)" value={-PNL_WCI.production} indent={1} color={B.danger} />
          <PnlLine label="Margen bruto" value={gross} bold />
          <div style={{ height: 8 }} />
          <PnlLine label="Costos fijos (personal, arriendo, servicios)" value={-PNL_WCI.fixed} color={B.danger} />
          <div style={{ height: 4 }} />
          <PnlLine label="Resultado operativo" value={net} bold borderTop color={net >= 0 ? B.success : B.danger} />
          <PnlLine label="Margen %" value={`${(net / PNL_WCI.revenue * 100).toFixed(1)}%`} indent={1} color={net >= 0 ? B.success : B.danger} />
        </Card>
        <Card style={{ marginTop: 12, background: B.infoBg, border: `1px solid ${B.info}20` }}>
          <div style={{ fontSize: 12, color: B.textMuted }}>
            <span style={{ fontWeight: 600 }}>WCI ve a los locales como clientes.</span> No hay eliminación intra-grupo. Los ingresos de WCI son las compras de los locales.
          </div>
        </Card>
      </div>
    );
  }

  // Compare view
  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        {["compare", "wci"].map(v => (
          <button key={v} onClick={() => setView(v)} style={{ padding: "6px 14px", borderRadius: 6, fontSize: 13, fontWeight: view === v ? 650 : 500, border: view === v ? `2px solid ${B.accent}` : `1px solid ${B.border}`, background: view === v ? `${B.accent}08` : B.surface, cursor: "pointer", fontFamily: font, color: view === v ? B.text : B.textMuted }}>
            {v === "compare" ? "Comparativo red" : "P&L WCI"}
          </button>
        ))}
      </div>

      <Card style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "12px 16px", borderBottom: `1px solid ${B.border}`, fontSize: 12, color: B.textMuted }}>
          Todos los P&L lado a lado. Click en un local para ver detalle completo.
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: font }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${B.border}`, background: "#FAFAF8" }}>
              {["", "Ventas brutas", "Comisiones", "Ingreso neto", "Costo insumos", "FC %", "Personal", "Margen", "Margen %"].map(h =>
                <th key={h} style={{ padding: "10px 10px", textAlign: h === "" ? "left" : "right", fontWeight: 600, color: B.textMuted, fontSize: 11 }}>{h}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {LOCALS.map(l => {
              const totalCogs = l.cogsWci + l.cogsOther;
              const margin = l.netRevenue - totalCogs - l.personnel - l.otherCosts;
              const marginPct = (margin / l.netRevenue * 100).toFixed(1);
              return (
                <tr key={l.name} onClick={() => setSelectedLocal(l)} style={{ borderBottom: `1px solid ${B.border}`, cursor: "pointer" }}
                  onMouseEnter={e => e.currentTarget.style.background = B.surfaceHover}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <td style={{ padding: "10px 10px", fontWeight: 600 }}>{l.name}</td>
                  <td style={{ padding: "10px 10px", textAlign: "right" }}>{fmt(l.grossSales)}</td>
                  <td style={{ padding: "10px 10px", textAlign: "right", color: B.danger }}>{fmt(-l.commissions)}</td>
                  <td style={{ padding: "10px 10px", textAlign: "right", fontWeight: 700 }}>{fmt(l.netRevenue)}</td>
                  <td style={{ padding: "10px 10px", textAlign: "right", color: B.danger }}>{fmt(-totalCogs)}</td>
                  <td style={{ padding: "10px 10px", textAlign: "right", fontWeight: 700, color: l.foodCostPct > l.fcTarget ? B.danger : B.success }}>{l.foodCostPct}%</td>
                  <td style={{ padding: "10px 10px", textAlign: "right", color: B.danger }}>{fmt(-l.personnel)}</td>
                  <td style={{ padding: "10px 10px", textAlign: "right", fontWeight: 800, color: margin >= 0 ? B.success : B.danger }}>{fmt(margin)}</td>
                  <td style={{ padding: "10px 10px", textAlign: "right", fontWeight: 700, color: margin >= 0 ? B.success : B.danger }}>{marginPct}%</td>
                </tr>
              );
            })}
            {/* WCI row */}
            <tr style={{ background: `${B.accent}08`, borderBottom: `2px solid ${B.text}` }} onClick={() => setView("wci")}>
              <td style={{ padding: "10px 10px", fontWeight: 700, cursor: "pointer" }}>WCI</td>
              <td style={{ padding: "10px 10px", textAlign: "right", fontWeight: 700 }}>{fmt(PNL_WCI.revenue)}</td>
              <td style={{ padding: "10px 10px", textAlign: "right" }}>—</td>
              <td style={{ padding: "10px 10px", textAlign: "right", fontWeight: 700 }}>{fmt(PNL_WCI.revenue)}</td>
              <td style={{ padding: "10px 10px", textAlign: "right", color: B.danger }}>{fmt(-(PNL_WCI.cogs + PNL_WCI.production))}</td>
              <td style={{ padding: "10px 10px", textAlign: "right" }}>—</td>
              <td style={{ padding: "10px 10px", textAlign: "right", color: B.danger }}>{fmt(-PNL_WCI.fixed)}</td>
              <td style={{ padding: "10px 10px", textAlign: "right", fontWeight: 800, color: B.success }}>{fmt(PNL_WCI.revenue - PNL_WCI.cogs - PNL_WCI.production - PNL_WCI.fixed)}</td>
              <td style={{ padding: "10px 10px", textAlign: "right", fontWeight: 700, color: B.success }}>{((PNL_WCI.revenue - PNL_WCI.cogs - PNL_WCI.production - PNL_WCI.fixed) / PNL_WCI.revenue * 100).toFixed(1)}%</td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// P5: BUDGET
// ══════════════════════════════════════════════════════
function BudgetView() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
        <div style={{ fontSize: 13, color: B.textMuted }}>Budget vs real — Marzo 2026. Sistema sugiere basado en mes anterior.</div>
        <Btn variant="primary">Editar budget abril</Btn>
      </div>

      <Card style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: font }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${B.border}`, background: "#FAFAF8" }}>
              {["Local", "Budget ventas", "Real ventas", "Δ", "Budget FC%", "Real FC%", "Δ", "Budget personal", "Real personal"].map(h =>
                <th key={h} style={{ padding: "10px 8px", textAlign: "right", fontWeight: 600, color: B.textMuted, fontSize: 11, ...(h === "Local" ? { textAlign: "left" } : {}) }}>{h}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {LOCALS.map(l => {
              const salesDelta = ((l.grossSales / l.budget.sales - 1) * 100).toFixed(0);
              const fcDelta = (l.foodCostPct - l.budget.fc).toFixed(1);
              return (
                <tr key={l.name} style={{ borderBottom: `1px solid ${B.border}` }}>
                  <td style={{ padding: "10px 8px", fontWeight: 600 }}>{l.name}</td>
                  <td style={{ padding: "10px 8px", textAlign: "right", color: B.textMuted }}>{fmt(l.budget.sales)}</td>
                  <td style={{ padding: "10px 8px", textAlign: "right", fontWeight: 600 }}>{fmt(l.grossSales)}</td>
                  <td style={{ padding: "10px 8px", textAlign: "right" }}>
                    <Badge color={salesDelta >= 0 ? B.success : B.danger} bg={salesDelta >= 0 ? B.successBg : B.dangerBg}>{salesDelta >= 0 ? "+" : ""}{salesDelta}%</Badge>
                  </td>
                  <td style={{ padding: "10px 8px", textAlign: "right", color: B.textMuted }}>{l.budget.fc}%</td>
                  <td style={{ padding: "10px 8px", textAlign: "right", fontWeight: 600, color: l.foodCostPct > l.budget.fc ? B.danger : B.success }}>{l.foodCostPct}%</td>
                  <td style={{ padding: "10px 8px", textAlign: "right" }}>
                    <Badge color={parseFloat(fcDelta) <= 0 ? B.success : B.danger} bg={parseFloat(fcDelta) <= 0 ? B.successBg : B.dangerBg}>{parseFloat(fcDelta) > 0 ? "+" : ""}{fcDelta}</Badge>
                  </td>
                  <td style={{ padding: "10px 8px", textAlign: "right", color: B.textMuted }}>{fmt(l.budget.personnel)}</td>
                  <td style={{ padding: "10px 8px", textAlign: "right", fontWeight: 600 }}>{fmt(l.personnel)}</td>
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
// P6+P8: VENTAS VS INGRESOS + PRESUPUESTO DE CAJA
// ══════════════════════════════════════════════════════
function CashflowView() {
  const [section, setSection] = useState("sales");

  if (section === "cashflow") {
    return (
      <div>
        <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
          <button onClick={() => setSection("sales")} style={{ padding: "6px 14px", borderRadius: 6, fontSize: 13, fontWeight: 500, border: `1px solid ${B.border}`, background: B.surface, cursor: "pointer", fontFamily: font, color: B.textMuted }}>Ventas vs ingresos</button>
          <button onClick={() => setSection("cashflow")} style={{ padding: "6px 14px", borderRadius: 6, fontSize: 13, fontWeight: 650, border: `2px solid ${B.accent}`, background: `${B.accent}08`, cursor: "pointer", fontFamily: font }}>Ppto. caja</button>
        </div>

        <div style={{ fontSize: 13, color: B.textMuted, marginBottom: 12 }}>Presupuesto de caja — Ingresos − Egresos por día</div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 14 }}>
          {[
            { label: "Caja actual (todas)", value: fmt(8500000), color: B.text },
            { label: "Proyección 30 días", value: fmt(6200000), color: B.warning },
            { label: "Mínimo recomendado", value: fmt(5000000), color: B.textMuted },
          ].map(c => (
            <Card key={c.label} style={{ padding: "12px 16px", textAlign: "center" }}>
              <div style={{ fontSize: 12, color: B.textMuted }}>{c.label}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: c.color }}>{c.value}</div>
            </Card>
          ))}
        </div>

        <Card>
          <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>Proyección por período</h4>
          {[
            { period: "7 días", inflows: 2800000, outflows: 1950000 },
            { period: "15 días", inflows: 5200000, outflows: 4100000 },
            { period: "30 días", inflows: 9800000, outflows: 8500000 },
          ].map(p => (
            <div key={p.period} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: `1px solid ${B.border}` }}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>{p.period}</span>
              <div style={{ display: "flex", gap: 16, fontSize: 13 }}>
                <span style={{ color: B.success }}>Entradas: {fmt(p.inflows)}</span>
                <span style={{ color: B.danger }}>Salidas: {fmt(p.outflows)}</span>
                <span style={{ fontWeight: 700, color: p.inflows - p.outflows >= 0 ? B.success : B.danger }}>Neto: {fmt(p.inflows - p.outflows)}</span>
              </div>
            </div>
          ))}
          <div style={{ fontSize: 12, color: B.textMuted, marginTop: 8 }}>Proyección basada en CxC vencimientos + CxP programados.</div>
        </Card>
      </div>
    );
  }

  // Sales vs Revenue
  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        <button onClick={() => setSection("sales")} style={{ padding: "6px 14px", borderRadius: 6, fontSize: 13, fontWeight: 650, border: `2px solid ${B.accent}`, background: `${B.accent}08`, cursor: "pointer", fontFamily: font }}>Ventas vs ingresos</button>
        <button onClick={() => setSection("cashflow")} style={{ padding: "6px 14px", borderRadius: 6, fontSize: 13, fontWeight: 500, border: `1px solid ${B.border}`, background: B.surface, cursor: "pointer", fontFamily: font, color: B.textMuted }}>Ppto. caja</button>
      </div>

      <Card style={{ marginBottom: 14, background: B.warningBg, border: `1px solid ${B.warning}25` }}>
        <div style={{ fontSize: 13 }}>
          <span style={{ fontWeight: 700 }}>Ventas ≠ Ingresos.</span>
          <span style={{ color: B.textMuted, marginLeft: 6 }}>Las comisiones de delivery apps se descuentan antes de calcular el P&L. El ingreso neto es lo que realmente entra.</span>
        </div>
      </Card>

      <Card style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: font }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${B.border}`, background: "#FAFAF8" }}>
              {["Local", "Venta bruta", "Comisiones", "% comisión", "Ingreso neto", "Diferencia"].map(h =>
                <th key={h} style={{ padding: "10px 12px", textAlign: h === "Local" ? "left" : "right", fontWeight: 600, color: B.textMuted, fontSize: 11 }}>{h}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {LOCALS.map(l => (
              <tr key={l.name} style={{ borderBottom: `1px solid ${B.border}` }}>
                <td style={{ padding: "10px 12px", fontWeight: 600 }}>{l.name}</td>
                <td style={{ padding: "10px 12px", textAlign: "right" }}>{fmt(l.grossSales)}</td>
                <td style={{ padding: "10px 12px", textAlign: "right", color: B.danger }}>{fmt(-l.commissions)}</td>
                <td style={{ padding: "10px 12px", textAlign: "right", color: B.warning }}>{(l.commissions / l.grossSales * 100).toFixed(0)}%</td>
                <td style={{ padding: "10px 12px", textAlign: "right", fontWeight: 700 }}>{fmt(l.netRevenue)}</td>
                <td style={{ padding: "10px 12px", textAlign: "right", color: B.danger }}>{fmt(l.grossSales - l.netRevenue)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card style={{ marginTop: 14 }}>
        <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>Desglose comisiones por plataforma</h4>
        {[
          { platform: "UberEats", pct: "30%", total: 2100000 },
          { platform: "Rappi", pct: "25%", total: 1200000 },
          { platform: "PedidosYa", pct: "22%", total: 650000 },
          { platform: "MercadoPago", pct: "3.5%", total: 125000 },
        ].map(p => (
          <div key={p.platform} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid ${B.border}`, fontSize: 13 }}>
            <span style={{ fontWeight: 600 }}>{p.platform}</span>
            <div style={{ display: "flex", gap: 16 }}>
              <span style={{ color: B.textMuted }}>Comisión: {p.pct}</span>
              <span style={{ color: B.danger, fontWeight: 600 }}>{fmt(-p.total)}</span>
            </div>
          </div>
        ))}
        <div style={{ fontSize: 12, color: B.textMuted, marginTop: 8 }}>Datos para negociar mejores tasas con cada plataforma.</div>
      </Card>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// P9: CONCILIACIÓN BANCARIA
// ══════════════════════════════════════════════════════
function ConciliacionView() {
  const [classifying, setClassifying] = useState(null);
  const matched = BANK_TXS.filter(t => t.matched).length;
  const total = BANK_TXS.length;
  const pct = Math.round((matched / total) * 100);

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 14 }}>
        <Card style={{ padding: "12px 16px", textAlign: "center" }}>
          <div style={{ fontSize: 12, color: B.textMuted }}>% Conciliado</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: pct >= 90 ? B.success : B.warning }}>{pct}%</div>
        </Card>
        <Card style={{ padding: "12px 16px", textAlign: "center" }}>
          <div style={{ fontSize: 12, color: B.textMuted }}>Matched</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: B.success }}>{matched}/{total}</div>
        </Card>
        <Card style={{ padding: "12px 16px", textAlign: "center" }}>
          <div style={{ fontSize: 12, color: B.textMuted }}>Sin match</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: total - matched > 0 ? B.warning : B.success }}>{total - matched}</div>
        </Card>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
        <div style={{ fontSize: 13, color: B.textMuted }}>Extracto bancario vs transacciones Prep. Match automático por monto + fecha.</div>
        <Btn variant="primary">📥 Importar extracto (CSV)</Btn>
      </div>

      <Card style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: font }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${B.border}`, background: "#FAFAF8" }}>
              {["Fecha", "Descripción banco", "Monto", "Match", "Referencia Prep", ""].map(h =>
                <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontWeight: 600, color: B.textMuted, fontSize: 11 }}>{h}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {BANK_TXS.map((tx, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${B.border}`, background: !tx.matched ? B.warningBg : "transparent" }}>
                <td style={{ padding: "10px 12px", color: B.textMuted }}>{tx.date}</td>
                <td style={{ padding: "10px 12px", fontWeight: 500 }}>{tx.desc}</td>
                <td style={{ padding: "10px 12px", fontWeight: 700, color: tx.amount >= 0 ? B.success : B.danger }}>
                  {tx.amount >= 0 ? "+" : ""}{fmt(tx.amount)}
                </td>
                <td style={{ padding: "10px 12px" }}>
                  {tx.matched
                    ? <Badge color={B.success} bg={B.successBg}>✓ Matched</Badge>
                    : <Badge color={B.warning} bg={B.warningBg}>Sin match</Badge>}
                </td>
                <td style={{ padding: "10px 12px", fontSize: 12, color: tx.matched ? B.info : B.textMuted }}>
                  {tx.matchRef || "—"}
                </td>
                <td style={{ padding: "10px 12px" }}>
                  {!tx.matched && (
                    classifying === i ? (
                      <div style={{ display: "flex", gap: 4 }}>
                        <select style={{ padding: "4px 6px", border: `1px solid ${B.border}`, borderRadius: 4, fontSize: 11, fontFamily: font }}>
                          <option>Tipo...</option>
                          <option>CxC cobro</option>
                          <option>CxP pago</option>
                          <option>Depósito efectivo</option>
                          <option>Otro ingreso</option>
                          <option>Otro gasto</option>
                        </select>
                        <Btn variant="primary" onClick={() => setClassifying(null)} style={{ fontSize: 11, padding: "3px 8px" }}>OK</Btn>
                      </div>
                    ) : (
                      <Btn onClick={() => setClassifying(i)} style={{ fontSize: 11, padding: "3px 8px" }}>Clasificar</Btn>
                    )
                  )}
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
// P10: TESORERÍA
// ══════════════════════════════════════════════════════
function TesoreriaView() {
  return (
    <div>
      <div style={{ fontSize: 13, color: B.textMuted, marginBottom: 14 }}>Vista centralizada de cajas de todos los locales. Cierres diarios: declarado vs teórico.</div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {CASH_REGISTERS.map((cr, i) => {
          const diffColor = cr.diff === null ? B.textMuted : Math.abs(cr.diff) <= 1000 ? B.success : Math.abs(cr.diff) <= 5000 ? B.warning : B.danger;
          return (
            <Card key={i} style={{ borderLeft: `4px solid ${cr.status === "open" ? B.danger : cr.deposited ? B.success : B.warning}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 14, fontWeight: 700 }}>{cr.location}</span>
                    {cr.status === "open" && <Badge color={B.danger} bg={B.dangerBg}>⚠️ Caja abierta</Badge>}
                    {cr.status === "closed" && cr.deposited && <Badge color={B.success} bg={B.successBg}>✓ Cerrada + depositada</Badge>}
                    {cr.status === "closed" && !cr.deposited && <Badge color={B.warning} bg={B.warningBg}>Cerrada — depósito pendiente</Badge>}
                  </div>
                  <div style={{ display: "flex", gap: 16, fontSize: 13, color: B.textMuted }}>
                    <span>Teórico: {fmt(cr.theoretical)}</span>
                    {cr.declared !== null && <span>Declarado: {fmt(cr.declared)}</span>}
                    {cr.diff !== null && (
                      <span style={{ fontWeight: 700, color: diffColor }}>
                        Diferencia: {cr.diff > 0 ? "+" : ""}{fmt(cr.diff)}
                        {Math.abs(cr.diff) > 3000 && " ⚠️"}
                      </span>
                    )}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  {cr.status === "open" && <Btn variant="danger" style={{ fontSize: 12 }}>Enviar recordatorio</Btn>}
                  {cr.status === "closed" && !cr.deposited && <Btn style={{ fontSize: 12 }}>Registrar depósito</Btn>}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Card style={{ marginTop: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700 }}>Alertas activas</div>
            <div style={{ fontSize: 12, color: B.textMuted, marginTop: 2 }}>Caja no cerrada, faltante sobre tolerancia, depósito pendiente</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 12 }}>
            <span style={{ color: B.danger }}>🔴 B. Arana: caja no cerrada</span>
            <span style={{ color: B.warning }}>🟡 Angol: depósito pendiente ($482.000)</span>
            <span style={{ color: B.warning }}>🟡 Angol: faltante $3.000 (sobre tolerancia $2.000)</span>
          </div>
        </div>
      </Card>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// MAIN
// ══════════════════════════════════════════════════════
export default function FinanzasModule() {
  const [tab, setTab] = useState("pnl");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function check() { setIsMobile(window.innerWidth < 900); }
    check(); window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const TABS = [
    { id: "pnl", label: "P&L", icon: "📊" },
    { id: "budget", label: "Budget", icon: "🎯" },
    { id: "cashflow", label: "Ventas + ppto. caja", icon: "💰" },
    { id: "conciliacion", label: "Conciliación", icon: "🏦" },
    { id: "tesoreria", label: "Tesorería", icon: "💵" },
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
              <span key={n} style={{ padding: "6px 11px", fontSize: 13, fontWeight: n === "Finanzas" ? 650 : 500, color: n === "Finanzas" ? B.text : B.textMuted, borderBottom: n === "Finanzas" ? `2px solid ${B.accent}` : "2px solid transparent", cursor: "pointer" }}>{n}</span>
            ))}
          </div>
        )}
      </header>

      <main style={{ padding: isMobile ? 16 : "20px 32px", maxWidth: 1320, margin: "0 auto" }}>
        <div style={{ marginBottom: 16 }}>
          <h1 style={{ fontSize: isMobile ? 20 : 24, fontWeight: 800, color: B.text, fontFamily: serif }}>📊 Finanzas</h1>
          <p style={{ fontSize: 13, color: B.textMuted, marginTop: 2 }}>P&L WCI + {LOCALS.length} locales · Budget · Conciliación bancaria · Tesorería</p>
        </div>

        <TabBar tabs={TABS} active={tab} onChange={setTab} />

        {tab === "pnl" && <PnlView />}
        {tab === "budget" && <BudgetView />}
        {tab === "cashflow" && <CashflowView />}
        {tab === "conciliacion" && <ConciliacionView />}
        {tab === "tesoreria" && <TesoreriaView />}
      </main>
    </div>
  );
}
