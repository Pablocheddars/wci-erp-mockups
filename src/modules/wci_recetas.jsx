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

// ── Mock Data ──
const MENU_RECIPES = [
  { id: 1, name: "Classic Burger", category: "Burgers", price: 8990, foodCost: 2650, foodCostPct: 29.5, target: 30, status: "ok", ingredients: [
    { name: "Pan hamburguesa", qty: 1, unit: "ud", cost: 250 },
    { name: "Carne molida (150g)", qty: 0.15, unit: "kg", cost: 5200 },
    { name: "Queso cheddar", qty: 0.03, unit: "kg", cost: 8500 },
    { name: "Lechuga", qty: 0.02, unit: "kg", cost: 2000 },
    { name: "Tomate", qty: 0.03, unit: "kg", cost: 1500 },
    { name: "Salsa BBQ WCI", qty: 0.03, unit: "lt", cost: 4200 },
  ]},
  { id: 2, name: "Double Cheddar", category: "Burgers", price: 11990, foodCost: 4180, foodCostPct: 34.9, target: 30, status: "over", ingredients: [
    { name: "Pan hamburguesa", qty: 1, unit: "ud", cost: 250 },
    { name: "Carne molida (150g)", qty: 0.3, unit: "kg", cost: 5200 },
    { name: "Queso cheddar", qty: 0.06, unit: "kg", cost: 8500 },
    { name: "Cheddar cheese sauce WCI", qty: 0.05, unit: "lt", cost: 5248 },
    { name: "Cebolla caramelizada", qty: 0.03, unit: "kg", cost: 3000 },
  ]},
  { id: 3, name: "Papas fritas", category: "Sides", price: 3990, foodCost: 890, foodCostPct: 22.3, target: 25, status: "ok", ingredients: [
    { name: "Papa", qty: 0.25, unit: "kg", cost: 1200 },
    { name: "Aceite vegetal", qty: 0.05, unit: "lt", cost: 2200 },
    { name: "Sal", qty: 0.005, unit: "kg", cost: 500 },
  ]},
  { id: 4, name: "Alitas BBQ", category: "Starters", price: 7990, foodCost: 2890, foodCostPct: 36.2, target: 32, status: "over", ingredients: [
    { name: "Alitas de pollo", qty: 0.3, unit: "kg", cost: 4500 },
    { name: "Salsa BBQ WCI", qty: 0.08, unit: "lt", cost: 4200 },
    { name: "Aceite vegetal", qty: 0.03, unit: "lt", cost: 2200 },
  ]},
  { id: 5, name: "Limonada", category: "Bebidas", price: 2990, foodCost: 420, foodCostPct: 14.0, target: 20, status: "ok", ingredients: [
    { name: "Limón", qty: 0.1, unit: "lt", cost: 3000 },
    { name: "Azúcar", qty: 0.03, unit: "kg", cost: 1200 },
  ]},
];

const CROSS_LOCATION = [
  { ingredient: "Queso mozzarella", angol: { theoretical: 25, real: 31, delta: "+24%" }, collao: { theoretical: 20, real: 22, delta: "+10%" }, barana: { theoretical: 18, real: 19, delta: "+6%" }, dk: { theoretical: 15, real: 16, delta: "+7%" } },
  { ingredient: "Carne molida", angol: { theoretical: 30, real: 32, delta: "+7%" }, collao: { theoretical: 25, real: 24, delta: "-4%" }, barana: { theoretical: 22, real: 25, delta: "+14%" }, dk: { theoretical: 20, real: 21, delta: "+5%" } },
  { ingredient: "Pan hamburguesa", angol: { theoretical: 200, real: 195, delta: "-3%" }, collao: { theoretical: 150, real: 148, delta: "-1%" }, barana: { theoretical: 130, real: 140, delta: "+8%" }, dk: { theoretical: 120, real: 118, delta: "-2%" } },
  { ingredient: "Aceite vegetal", angol: { theoretical: 8, real: 12, delta: "+50%" }, collao: { theoretical: 6, real: 7, delta: "+17%" }, barana: { theoretical: 5, real: 5.5, delta: "+10%" }, dk: { theoretical: 5, real: 5, delta: "0%" } },
];

const CARTA_CHANGES = [
  { id: 1, type: "Nuevo producto", name: "Smash Burger", proposedBy: "Chef Carlos", date: "02/04", status: "pending", price: 9990, foodCost: 2800 },
  { id: 2, type: "Cambio precio", name: "Double Cheddar", proposedBy: "Gte. comercial", date: "01/04", status: "approved", priceFrom: 10990, priceTo: 11990 },
  { id: 3, type: "Cambio receta", name: "Alitas BBQ", proposedBy: "Chef Carlos", date: "28/03", status: "approved", note: "Más salsa, menos aceite" },
  { id: 4, type: "Desactivar", name: "Nachos Supreme", proposedBy: "Gte. comercial", date: "25/03", status: "rejected", note: "Aún tiene demanda" },
];

const COST_ALERTS = [
  { ingredient: "Carne molida", change: "+8.6%", costBefore: 4800, costAfter: 5200, recipesAffected: 3, fcImpact: "29.5% → 32.1%", recipes: ["Classic Burger", "Double Cheddar", "Hamburguesa WCI"] },
  { ingredient: "Queso cheddar", change: "+5.0%", costBefore: 8100, costAfter: 8500, recipesAffected: 2, fcImpact: "34.9% → 36.2%", recipes: ["Double Cheddar", "Cheddar cheese sauce WCI"] },
];

// ══════════════════════════════════════════════════════
// RECETAS + FOOD COST (P1, P2, P3, P4)
// ══════════════════════════════════════════════════════
function RecetasView() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("all");

  let recipes = [...MENU_RECIPES];
  if (filter === "over") recipes = recipes.filter(r => r.status === "over");

  if (selected) {
    const r = selected;
    const totalCost = r.ingredients.reduce((s, i) => s + i.qty * i.cost, 0);
    return (
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <Btn variant="ghost" onClick={() => setSelected(null)}>← Volver</Btn>
          <h3 style={{ fontSize: 16, fontWeight: 700 }}>{r.name}</h3>
          <Badge>{r.category}</Badge>
          {r.status === "over" && <Badge color={B.danger} bg={B.dangerBg}>Food cost sobre target</Badge>}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 14 }}>
          <Card>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: B.textMuted, marginBottom: 10 }}>Ingredientes (porción estándar)</h4>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: font }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${B.border}` }}>
                  {["Ingrediente", "Cantidad", "Costo unit.", "Subtotal"].map(h =>
                    <th key={h} style={{ padding: "8px 10px", textAlign: "left", fontSize: 11, color: B.textMuted, fontWeight: 600 }}>{h}</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {r.ingredients.map((ing, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${B.border}` }}>
                    <td style={{ padding: "8px 10px", fontWeight: 600 }}>{ing.name}</td>
                    <td style={{ padding: "8px 10px" }}>{ing.qty} {ing.unit}</td>
                    <td style={{ padding: "8px 10px", color: B.textMuted }}>${ing.cost.toLocaleString()}/{ing.unit}</td>
                    <td style={{ padding: "8px 10px", fontWeight: 600 }}>${Math.round(ing.qty * ing.cost).toLocaleString()}</td>
                  </tr>
                ))}
                <tr style={{ background: B.surfaceHover }}>
                  <td colSpan={3} style={{ padding: "8px 10px", fontWeight: 700 }}>Food cost total</td>
                  <td style={{ padding: "8px 10px", fontWeight: 800, color: r.status === "over" ? B.danger : B.success }}>${totalCost.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>

            {/* Portion photo placeholder */}
            <div style={{ marginTop: 14, border: `1px dashed ${B.border}`, borderRadius: 10, padding: 20, textAlign: "center", color: B.textMuted }}>
              <span style={{ fontSize: 24 }}>📷</span>
              <div style={{ fontSize: 12, marginTop: 4 }}>Ficha técnica visual — foto porción estándar</div>
              <div style={{ fontSize: 11, color: B.textLight }}>Referencia para auditorías gastronómicas</div>
            </div>
          </Card>

          <div>
            <Card style={{ marginBottom: 10 }}>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: B.textMuted, marginBottom: 10 }}>Métricas</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { label: "Precio venta", value: `$${r.price.toLocaleString()}` },
                  { label: "Food cost", value: `$${r.foodCost.toLocaleString()}`, color: r.status === "over" ? B.danger : B.text },
                  { label: "Food cost %", value: `${r.foodCostPct}%`, color: r.status === "over" ? B.danger : B.success },
                  { label: "Target %", value: `${r.target}%` },
                  { label: "Margen bruto", value: `$${(r.price - r.foodCost).toLocaleString()}` },
                ].map(m => (
                  <div key={m.label} style={{ display: "flex", justifyContent: "space-between", padding: "6px 10px", background: B.surfaceHover, borderRadius: 6 }}>
                    <span style={{ fontSize: 12, color: B.textMuted }}>{m.label}</span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: m.color || B.text }}>{m.value}</span>
                  </div>
                ))}
              </div>
            </Card>

            {r.status === "over" && (
              <Card style={{ background: B.dangerBg, border: `1px solid ${B.danger}20` }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: B.danger, marginBottom: 6 }}>⚠️ Sobre target ({r.foodCostPct}% vs {r.target}%)</div>
                <div style={{ fontSize: 12, color: B.textMuted }}>Opciones: subir precio, ajustar porción, cambiar ingrediente, absorber.</div>
              </Card>
            )}
          </div>
        </div>
      </div>
    );
  }

  const overCount = MENU_RECIPES.filter(r => r.status === "over").length;
  const avgFc = Math.round(MENU_RECIPES.reduce((s, r) => s + r.foodCostPct, 0) / MENU_RECIPES.length * 10) / 10;

  return (
    <div>
      {/* Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 16 }}>
        <Card style={{ padding: "12px 16px" }}>
          <div style={{ fontSize: 12, color: B.textMuted }}>Recetas activas</div>
          <div style={{ fontSize: 22, fontWeight: 800 }}>{MENU_RECIPES.length}</div>
        </Card>
        <Card style={{ padding: "12px 16px" }}>
          <div style={{ fontSize: 12, color: B.textMuted }}>Food cost promedio</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: avgFc > 30 ? B.warning : B.success }}>{avgFc}%</div>
        </Card>
        <Card style={{ padding: "12px 16px" }}>
          <div style={{ fontSize: 12, color: B.textMuted }}>Sobre target</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: overCount > 0 ? B.danger : B.success }}>{overCount}</div>
        </Card>
        <Card style={{ padding: "12px 16px" }}>
          <div style={{ fontSize: 12, color: B.textMuted }}>Alertas de costo</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: B.warning }}>{COST_ALERTS.length}</div>
        </Card>
      </div>

      {/* Filter */}
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        {[{ id: "all", label: "Todas" }, { id: "over", label: `⚠️ Sobre target (${overCount})` }].map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)} style={{
            padding: "6px 14px", borderRadius: 6, fontSize: 13, fontWeight: filter === f.id ? 650 : 500,
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
              {["Plato", "Categoría", "Precio", "Food cost", "FC %", "Target", "Estado", "Tendencia"].map(h =>
                <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontWeight: 600, color: B.textMuted, fontSize: 11 }}>{h}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {recipes.map(r => {
              const fcColor = r.foodCostPct > r.target ? B.danger : r.foodCostPct > r.target - 3 ? B.warning : B.success;
              return (
                <tr key={r.id} style={{ borderBottom: `1px solid ${B.border}`, cursor: "pointer" }}
                  onMouseEnter={e => e.currentTarget.style.background = B.surfaceHover}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  onClick={() => setSelected(r)}>
                  <td style={{ padding: "10px 12px", fontWeight: 600 }}>{r.name}</td>
                  <td style={{ padding: "10px 12px", color: B.textMuted }}>{r.category}</td>
                  <td style={{ padding: "10px 12px" }}>${r.price.toLocaleString()}</td>
                  <td style={{ padding: "10px 12px" }}>${r.foodCost.toLocaleString()}</td>
                  <td style={{ padding: "10px 12px", fontWeight: 700, color: fcColor }}>{r.foodCostPct}%</td>
                  <td style={{ padding: "10px 12px", color: B.textMuted }}>{r.target}%</td>
                  <td style={{ padding: "10px 12px" }}>
                    {r.status === "over"
                      ? <Badge color={B.danger} bg={B.dangerBg}>Sobre target</Badge>
                      : <Badge color={B.success} bg={B.successBg}>OK</Badge>}
                  </td>
                  <td style={{ padding: "10px 12px", fontSize: 12, color: B.textMuted }}>↑ 2.1% vs mes ant.</td>
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
// P6: COMPARATIVA CROSS-LOCATION
// ══════════════════════════════════════════════════════
function CrossLocationView() {
  return (
    <div>
      <Card style={{ marginBottom: 14, background: B.infoBg, border: `1px solid ${B.info}20` }}>
        <div style={{ fontSize: 13 }}>
          <span style={{ fontWeight: 600 }}>Consumo teórico</span> (ventas × porción estándar) vs <span style={{ fontWeight: 600 }}>consumo real</span> (supply_movements). Desviación alta = desperdicio, porciones grandes, o robo.
        </div>
      </Card>

      <Card style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: font }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${B.border}`, background: "#FAFAF8" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", fontWeight: 600, color: B.textMuted, fontSize: 11 }}>Ingrediente</th>
              {["Angol", "Collao", "B. Arana", "Dark Kitchen"].map(l =>
                <th key={l} style={{ padding: "10px 12px", textAlign: "center", fontWeight: 600, color: B.textMuted, fontSize: 11 }}>{l}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {CROSS_LOCATION.map((row, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${B.border}` }}>
                <td style={{ padding: "10px 12px", fontWeight: 600 }}>{row.ingredient}</td>
                {[row.angol, row.collao, row.barana, row.dk].map((loc, li) => {
                  const pct = parseFloat(loc.delta);
                  const color = Math.abs(pct) < 10 ? B.success : Math.abs(pct) < 20 ? B.warning : B.danger;
                  return (
                    <td key={li} style={{ padding: "10px 12px", textAlign: "center" }}>
                      <div style={{ fontSize: 12, color: B.textMuted }}>T:{loc.theoretical} / R:{loc.real}</div>
                      <div style={{ fontSize: 13, fontWeight: 700, color }}>{loc.delta}</div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card style={{ marginTop: 14, background: B.dangerBg, border: `1px solid ${B.danger}20` }}>
        <div style={{ fontSize: 13 }}>
          <span style={{ fontWeight: 700, color: B.danger }}>🔍 Detección:</span>
          <span style={{ color: B.text, marginLeft: 6 }}>Angol gasta 24% más queso mozzarella que lo teórico y 50% más aceite vegetal. Requiere revisión de porciones o procesos.</span>
        </div>
      </Card>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// P7: APROBACIÓN DE CARTA
// ══════════════════════════════════════════════════════
function CartaView() {
  const CHANGE_STATUS = {
    pending: { label: "Pendiente", color: B.warning, bg: B.warningBg },
    approved: { label: "Aprobado", color: B.success, bg: B.successBg },
    rejected: { label: "Rechazado", color: B.danger, bg: B.dangerBg },
  };

  return (
    <div>
      <div style={{ fontSize: 13, color: B.textMuted, marginBottom: 14 }}>Nuevos productos, cambios de receta/precio/disponibilidad pasan por aprobación del chef ejecutivo. Aprobado → aplica a todos los locales.</div>

      {CARTA_CHANGES.map(c => {
        const st = CHANGE_STATUS[c.status];
        return (
          <Card key={c.id} style={{ marginBottom: 8, borderLeft: `4px solid ${st.color}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <Badge color={B.purple} bg={B.purpleBg}>{c.type}</Badge>
                  <span style={{ fontSize: 15, fontWeight: 700 }}>{c.name}</span>
                  <Badge color={st.color} bg={st.bg}>{st.label}</Badge>
                </div>
                <div style={{ fontSize: 12, color: B.textMuted }}>
                  Propuesto por {c.proposedBy} · {c.date}
                  {c.price && <> · Precio: ${c.price.toLocaleString()}</>}
                  {c.priceFrom && <> · ${c.priceFrom.toLocaleString()} → ${c.priceTo.toLocaleString()}</>}
                  {c.note && <> · {c.note}</>}
                  {c.foodCost && <> · FC: ${c.foodCost.toLocaleString()} ({Math.round(c.foodCost / c.price * 100)}%)</>}
                </div>
              </div>
              {c.status === "pending" && (
                <div style={{ display: "flex", gap: 6 }}>
                  <Btn variant="success" style={{ fontSize: 12, padding: "5px 10px" }}>✓ Aprobar</Btn>
                  <Btn style={{ fontSize: 12, padding: "5px 10px" }}>✎ Ajustar</Btn>
                  <Btn variant="danger" style={{ fontSize: 12, padding: "5px 10px" }}>✗ Rechazar</Btn>
                </div>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
}

// ══════════════════════════════════════════════════════
// P8: ALERTAS DE COSTO
// ══════════════════════════════════════════════════════
function AlertasCostoView() {
  return (
    <div>
      <div style={{ fontSize: 13, color: B.textMuted, marginBottom: 14 }}>Cuando un insumo sube, el sistema calcula el impacto en todas las recetas que lo usan.</div>

      {COST_ALERTS.map((a, i) => (
        <Card key={i} style={{ marginBottom: 10, border: `1px solid ${B.warning}30` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700 }}>{a.ingredient} <Badge color={B.danger} bg={B.dangerBg}>{a.change}</Badge></div>
              <div style={{ fontSize: 12, color: B.textMuted }}>Costo: ${a.costBefore.toLocaleString()} → ${a.costAfter.toLocaleString()} · {a.recipesAffected} recetas afectadas · Food cost: {a.fcImpact}</div>
            </div>
          </div>
          <div style={{ fontSize: 12, fontWeight: 600, color: B.textMuted, marginBottom: 6 }}>Recetas afectadas:</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
            {a.recipes.map(r => <Badge key={r}>{r}</Badge>)}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <Btn style={{ fontSize: 12 }}>Absorber</Btn>
            <Btn variant="primary" style={{ fontSize: 12 }}>Subir precios</Btn>
            <Btn style={{ fontSize: 12 }}>Ajustar recetas</Btn>
          </div>
        </Card>
      ))}
    </div>
  );
}

// ══════════════════════════════════════════════════════
// P9: AUDITORÍA GASTRONÓMICA
// ══════════════════════════════════════════════════════
function AuditoriaView() {
  const audits = [
    { id: "AG-012", location: "Cheddar's Angol", date: "03/04", score: 88, result: "Aprobado", items: ["Porciones ✓", "Presentación ✓", "Técnica ⚠️ Papas sobrecocidas", "Mise en place ✓"] },
    { id: "AG-011", location: "Dark Kitchen", date: "01/04", score: 72, result: "Observado", items: ["Porciones ⚠️ Queso excedido", "Presentación ✓", "Técnica ⚠️ Tiempos irregulares", "Mise en place ✗ Desordenado"] },
    { id: "AG-010", location: "Cheddar's Collao", date: "28/03", score: 92, result: "Aprobado", items: ["Porciones ✓", "Presentación ✓", "Técnica ✓", "Mise en place ✓"] },
  ];

  return (
    <div>
      <Card style={{ marginBottom: 14, background: B.infoBg, border: `1px solid ${B.info}20` }}>
        <div style={{ fontSize: 13 }}>
          <span style={{ fontWeight: 600 }}>Auditoría del chef ejecutivo.</span>
          <span style={{ color: B.textMuted, marginLeft: 6 }}>Mín. 1x/semana por cocina. Checklist configurable: porciones, presentación, técnica, mise en place. Mismo componente que BPM.</span>
        </div>
      </Card>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
        <div style={{ fontSize: 13, color: B.textMuted }}>{audits.length} auditorías recientes</div>
        <Btn variant="primary">+ Nueva auditoría</Btn>
      </div>

      {audits.map(a => {
        const scoreColor = a.score >= 80 ? B.success : a.score >= 60 ? B.warning : B.danger;
        return (
          <Card key={a.id} style={{ marginBottom: 8, display: "flex", gap: 16, alignItems: "flex-start" }}>
            <div style={{ width: 56, height: 56, borderRadius: 12, background: `${scoreColor}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontSize: 20, fontWeight: 800, color: scoreColor }}>{a.score}</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 14, fontWeight: 700 }}>{a.location}</span>
                <Badge color={scoreColor} bg={`${scoreColor}15`}>{a.result}</Badge>
                <span style={{ fontSize: 12, color: B.textMuted }}>{a.id} · {a.date}</span>
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {a.items.map((item, i) => {
                  const isOk = item.includes("✓");
                  const isFail = item.includes("✗");
                  return (
                    <span key={i} style={{
                      padding: "3px 8px", borderRadius: 6, fontSize: 11, fontWeight: 600,
                      background: isOk ? B.successBg : isFail ? B.dangerBg : B.warningBg,
                      color: isOk ? B.success : isFail ? B.danger : B.warning,
                    }}>{item}</span>
                  );
                })}
              </div>
            </div>
            <Btn variant="ghost" style={{ fontSize: 12 }}>Ver detalle</Btn>
          </Card>
        );
      })}
    </div>
  );
}

// ══════════════════════════════════════════════════════
// MAIN
// ══════════════════════════════════════════════════════
export default function RecetasModule() {
  const [tab, setTab] = useState("recetas");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function check() { setIsMobile(window.innerWidth < 900); }
    check(); window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const overCount = MENU_RECIPES.filter(r => r.status === "over").length;
  const pendingCarta = CARTA_CHANGES.filter(c => c.status === "pending").length;

  const TABS = [
    { id: "recetas", label: "Recetas + food cost", icon: "📖" },
    { id: "cross", label: "Cross-location", icon: "📊" },
    { id: "carta", label: "Cambios de carta", icon: "📝", badge: pendingCarta > 0 ? pendingCarta : null, badgeBg: B.warningBg, badgeColor: B.warning },
    { id: "alertas", label: "Alertas costo", icon: "⚠️", badge: COST_ALERTS.length, badgeBg: B.dangerBg, badgeColor: B.danger },
    { id: "auditoria", label: "Auditoría chef", icon: "👨‍🍳" },
  ];

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
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 16, cursor: "pointer" }}>🔔</span>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: B.accent, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 12, color: B.primary }}>PF</div>
          </div>
        </div>
        {!isMobile && (
          <div style={{ padding: "0 24px", display: "flex", gap: 2, borderTop: `1px solid ${B.border}`, height: 40, alignItems: "center" }}>
            {["Dashboard", "Inventario", "Compras", "Pedidos", "Despacho", "Producción", "Calidad", "Finanzas", "Catálogo", "Más"].map(n => (
              <span key={n} style={{ padding: "6px 11px", fontSize: 13, fontWeight: 500, color: B.textMuted, borderBottom: "2px solid transparent", cursor: "pointer" }}>{n}</span>
            ))}
          </div>
        )}
      </header>

      <main style={{ padding: isMobile ? 16 : "20px 32px", maxWidth: 1320, margin: "0 auto" }}>
        <div style={{ marginBottom: 16 }}>
          <h1 style={{ fontSize: isMobile ? 20 : 24, fontWeight: 800, color: B.text, fontFamily: serif }}>📖 Recetas + food cost</h1>
          <p style={{ fontSize: 13, color: B.textMuted, marginTop: 2 }}>{MENU_RECIPES.length} recetas · {overCount} sobre target · Food cost promedio {Math.round(MENU_RECIPES.reduce((s, r) => s + r.foodCostPct, 0) / MENU_RECIPES.length * 10) / 10}%</p>
        </div>

        <TabBar tabs={TABS} active={tab} onChange={setTab} />

        {tab === "recetas" && <RecetasView />}
        {tab === "cross" && <CrossLocationView />}
        {tab === "carta" && <CartaView />}
        {tab === "alertas" && <AlertasCostoView />}
        {tab === "auditoria" && <AuditoriaView />}
      </main>
    </div>
  );
}
