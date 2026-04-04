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
  const styles = { primary: { background: B.accent, color: B.primary, border: "none", fontWeight: 700 }, danger: { background: B.dangerBg, color: B.danger, border: `1px solid ${B.danger}30`, fontWeight: 600 }, default: { background: B.surface, color: B.text, border: `1px solid ${B.border}`, fontWeight: 600 }, ghost: { background: "transparent", color: B.textMuted, border: "none", fontWeight: 600 } };
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
function SearchInput({ value, onChange, placeholder }) {
  return <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={{ padding: "8px 12px", border: `1px solid ${B.border}`, borderRadius: 8, fontSize: 13, fontFamily: font, outline: "none", width: "100%", maxWidth: 280, background: B.surface }} onFocus={e => e.target.style.borderColor = B.accent} onBlur={e => e.target.style.borderColor = B.border} />;
}

// ── Mock Data ──
const CATALOG = [
  { id: 1, name: "Queso mozzarella", section: "distribucion", family: "Lácteos", itemType: "supply", saleUnit: "kg", stockUnit: "kg", factor: 1, cost: 6500, margin: 15, price: 7475, stock: 45, min: 10, status: "ok", visible: ["all"], monthlySales: 120, lastMonth: 105 },
  { id: 2, name: "Pollo entero", section: "distribucion", family: "Carnes", itemType: "supply", saleUnit: "kg", stockUnit: "kg", factor: 1, cost: 3800, margin: 20, price: 4560, stock: 18, min: 15, status: "bajo", visible: ["all"], monthlySales: 95, lastMonth: 90 },
  { id: 3, name: "Carne molida", section: "distribucion", family: "Carnes", itemType: "supply", saleUnit: "kg", stockUnit: "kg", factor: 1, cost: 5200, margin: 18, price: 6136, stock: 30, min: 20, status: "ok", visible: ["all"], monthlySales: 85, lastMonth: 88 },
  { id: 4, name: "Harina", section: "distribucion", family: "Secos", itemType: "supply", saleUnit: "kg", stockUnit: "kg", factor: 1, cost: 850, margin: 25, price: 1063, stock: 8, min: 20, status: "bajo", visible: ["all"], monthlySales: 50, lastMonth: 48 },
  { id: 5, name: "Pan hamburguesa", section: "distribucion", family: "Secos", itemType: "supply", saleUnit: "ud", stockUnit: "ud", factor: 1, cost: 250, margin: 30, price: 325, stock: 200, min: 100, status: "ok", visible: ["cheddars"], monthlySales: 600, lastMonth: 550 },
  { id: 6, name: "Salsa BBQ WCI", section: "produccion", family: "Elaborados WCI", itemType: "ingredient", saleUnit: "lt", stockUnit: "lt", factor: 1, cost: 3200, margin: 31, price: 4192, stock: 6, min: 5, status: "ok", visible: ["all"], monthlySales: 24, lastMonth: 20 },
  { id: 7, name: "Salsa criolla WCI", section: "produccion", family: "Elaborados WCI", itemType: "ingredient", saleUnit: "lt", stockUnit: "lt", factor: 1, cost: 2800, margin: 35, price: 3780, stock: 8, min: 5, status: "ok", visible: ["all"], monthlySales: 18, lastMonth: 22 },
  { id: 8, name: "Aceite vegetal", section: "distribucion", family: "Secos", itemType: "supply", saleUnit: "lt", stockUnit: "lt", factor: 1, cost: 2200, margin: 12, price: 2464, stock: 45, min: 10, status: "ok", visible: ["all"], monthlySales: 32, lastMonth: 35 },
  { id: 9, name: "Envase delivery 750ml", section: "distribucion", family: "Envases", itemType: "supply", saleUnit: "ud", stockUnit: "ud", factor: 1, cost: 180, margin: 40, price: 252, stock: 200, min: 150, status: "ok", visible: ["all"], monthlySales: 480, lastMonth: 420 },
  { id: 10, name: "Cheddar cheese sauce WCI", section: "produccion", family: "Elaborados WCI", itemType: "ingredient", saleUnit: "lt", stockUnit: "lt", factor: 1, cost: 4100, margin: 28, price: 5248, stock: 4, min: 5, status: "bajo", visible: ["cheddars"], monthlySales: 15, lastMonth: 12 },
];

const CLIENT_PRICES = [
  { client: "Cheddar's (propios)", type: "base", note: "Precio base — margen estándar" },
  { client: "Dark Kitchen", type: "override", note: "+5% margen adicional sobre base" },
];

const PRICE_HISTORY = [
  { date: "04/04", item: "Queso mozzarella", priceBefore: 7250, priceAfter: 7475, marginBefore: 12, marginAfter: 15, user: "Pablo", reason: "Costo subió $200/kg" },
  { date: "01/04", item: "Pollo entero", priceBefore: 4370, priceAfter: 4560, marginBefore: 18, marginAfter: 20, user: "Pablo", reason: "Ajuste trimestral" },
  { date: "28/03", item: "Salsa BBQ WCI", priceBefore: 3900, priceAfter: 4192, marginBefore: 25, marginAfter: 31, user: "Pablo", reason: "Subió insumo tomate" },
  { date: "25/03", item: "Envase delivery 750ml", priceBefore: 252, priceAfter: 252, marginBefore: 40, marginAfter: 40, user: "Sistema", reason: "Sin cambio (absorber)" },
  { date: "20/03", item: "Carne molida", priceBefore: 5980, priceAfter: 6136, marginBefore: 18, marginAfter: 18, user: "Pablo", reason: "Mantener margen — costo subió" },
];

const FIXED_COSTS = 2800000; // monthly

// ══════════════════════════════════════════════════════
// CATÁLOGO VIEW (P1, P4, P5)
// ══════════════════════════════════════════════════════
function CatalogoView() {
  const [search, setSearch] = useState("");
  const [section, setSection] = useState("all");
  const [family, setFamily] = useState("all");
  const [selected, setSelected] = useState(null);

  let items = [...CATALOG];
  if (section !== "all") items = items.filter(i => i.section === section);
  if (family !== "all") items = items.filter(i => i.family === family);
  if (search) items = items.filter(i => i.name.toLowerCase().includes(search.toLowerCase()));

  const families = [...new Set(CATALOG.map(i => i.family))];

  return (
    <div>
      {/* Section toggle */}
      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        {[
          { id: "all", label: "Todo", count: CATALOG.length },
          { id: "distribucion", label: "🚛 Distribución", count: CATALOG.filter(i => i.section === "distribucion").length },
          { id: "produccion", label: "👩‍🍳 Producción WCI", count: CATALOG.filter(i => i.section === "produccion").length },
        ].map(s => (
          <button key={s.id} onClick={() => setSection(s.id)} style={{
            padding: "10px 18px", borderRadius: 8, cursor: "pointer",
            border: section === s.id ? `2px solid ${B.accent}` : `1px solid ${B.border}`,
            background: section === s.id ? `${B.accent}08` : B.surface,
            fontFamily: font, fontSize: 13, fontWeight: section === s.id ? 700 : 500,
            color: section === s.id ? B.text : B.textMuted,
          }}>
            {s.label} <span style={{ fontSize: 11, opacity: 0.6, marginLeft: 4 }}>{s.count}</span>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap", alignItems: "center" }}>
        <SearchInput value={search} onChange={setSearch} placeholder="Buscar producto..." />
        <Select value={family} onChange={setFamily} options={[{ value: "all", label: "Todas las familias" }, ...families.map(f => ({ value: f, label: f }))]} />
        <div style={{ flex: 1 }} />
        <Btn variant="primary">+ Nuevo producto</Btn>
      </div>

      {/* Table */}
      <Card style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: font }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${B.border}`, background: "#FAFAF8" }}>
              {["Producto", "Tipo", "Familia", "Costo", "Margen", "Precio venta", "Stock", "Visibilidad"].map(h =>
                <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontWeight: 600, color: B.textMuted, fontSize: 11 }}>{h}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {items.map(item => {
              const stockColor = item.stock === 0 ? B.danger : item.stock <= item.min ? B.warning : B.success;
              return (
                <tr key={item.id} onClick={() => setSelected(selected === item.id ? null : item.id)}
                  style={{ borderBottom: `1px solid ${B.border}`, cursor: "pointer", background: selected === item.id ? `${B.accent}06` : "transparent" }}
                  onMouseEnter={e => { if (selected !== item.id) e.currentTarget.style.background = B.surfaceHover; }}
                  onMouseLeave={e => { if (selected !== item.id) e.currentTarget.style.background = "transparent"; }}>
                  <td style={{ padding: "10px 12px", fontWeight: 600 }}>{item.name}</td>
                  <td style={{ padding: "10px 12px" }}><Badge color={item.section === "produccion" ? B.purple : B.info} bg={item.section === "produccion" ? B.purpleBg : B.infoBg}>{item.section === "produccion" ? "Elaborado" : "Reventa"}</Badge></td>
                  <td style={{ padding: "10px 12px", color: B.textMuted }}>{item.family}</td>
                  <td style={{ padding: "10px 12px", color: B.textMuted }}>${item.cost.toLocaleString()}</td>
                  <td style={{ padding: "10px 12px", fontWeight: 600 }}>{item.margin}%</td>
                  <td style={{ padding: "10px 12px", fontWeight: 700 }}>${item.price.toLocaleString()}</td>
                  <td style={{ padding: "10px 12px" }}><span style={{ fontWeight: 600, color: stockColor }}>{item.stock}</span> <span style={{ fontSize: 11, color: B.textMuted }}>{item.saleUnit}</span></td>
                  <td style={{ padding: "10px 12px" }}>
                    {item.visible.includes("all") ? <Badge color={B.success} bg={B.successBg}>Todos</Badge> : <Badge color={B.info} bg={B.infoBg}>Solo Cheddar's</Badge>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>

      {/* Detail panel */}
      {selected && (() => {
        const item = CATALOG.find(i => i.id === selected);
        return (
          <Card style={{ marginTop: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 700 }}>{item.name}</h3>
                <div style={{ fontSize: 12, color: B.textMuted }}>{item.family} · {item.section === "produccion" ? "Elaborado WCI" : "Distribución"} · Apunta a {item.itemType}</div>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <Btn style={{ fontSize: 12 }}>Editar</Btn>
                <Btn variant="ghost" style={{ fontSize: 12 }}>Ver historial precios</Btn>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10, marginBottom: 14 }}>
              {[
                { label: "Costo (prom. pond.)", value: `$${item.cost.toLocaleString()}` },
                { label: "Margen", value: `${item.margin}%` },
                { label: "Precio venta", value: `$${item.price.toLocaleString()}` },
                { label: "Unidad venta", value: `${item.saleUnit} (factor: ${item.factor})` },
                { label: "Ventas mes", value: `${item.monthlySales} ${item.saleUnit}` },
              ].map(m => (
                <div key={m.label} style={{ padding: "10px 12px", background: B.surfaceHover, borderRadius: 8 }}>
                  <div style={{ fontSize: 11, color: B.textMuted, marginBottom: 2 }}>{m.label}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: B.text }}>{m.value}</div>
                </div>
              ))}
            </div>
            {/* Visibility config */}
            <div style={{ display: "flex", gap: 16, alignItems: "center", padding: "10px 0", borderTop: `1px solid ${B.border}` }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: B.textMuted }}>Visible para:</span>
              {["Cheddar's propios", "Dark Kitchen"].map(c => (
                <label key={c} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, cursor: "pointer" }}>
                  <input type="checkbox" defaultChecked={item.visible.includes("all") || (c === "Cheddar's propios" && item.visible.includes("cheddars"))} />
                  {c}
                </label>
              ))}
            </div>
          </Card>
        );
      })()}
    </div>
  );
}

// ══════════════════════════════════════════════════════
// PRECIOS (P2, P3, P6)
// ══════════════════════════════════════════════════════
function PreciosView() {
  const totalRevenue = CATALOG.reduce((s, i) => s + i.price * i.monthlySales, 0);
  const totalCost = CATALOG.reduce((s, i) => s + i.cost * i.monthlySales, 0);
  const grossMargin = totalRevenue - totalCost;
  const coversFixed = grossMargin > FIXED_COSTS;
  const avgMargin = Math.round(CATALOG.reduce((s, i) => s + i.margin, 0) / CATALOG.length);

  return (
    <div>
      {/* Simulation card */}
      <Card style={{ marginBottom: 14, background: coversFixed ? B.successBg : B.dangerBg, border: `1px solid ${coversFixed ? B.success : B.danger}25` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: B.text }}>Simulación mensual con márgenes actuales</div>
            <div style={{ fontSize: 12, color: B.textMuted, marginTop: 2 }}>Basado en volumen del último mes</div>
          </div>
          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            {[
              { label: "Ingreso", value: `$${(totalRevenue / 1000000).toFixed(1)}M` },
              { label: "Costo", value: `$${(totalCost / 1000000).toFixed(1)}M` },
              { label: "Margen bruto", value: `$${(grossMargin / 1000000).toFixed(1)}M` },
              { label: "Costos fijos", value: `$${(FIXED_COSTS / 1000000).toFixed(1)}M` },
            ].map(m => (
              <div key={m.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 11, color: B.textMuted }}>{m.label}</div>
                <div style={{ fontSize: 16, fontWeight: 800 }}>{m.value}</div>
              </div>
            ))}
            <div style={{ textAlign: "center", padding: "8px 16px", background: coversFixed ? B.success : B.danger, borderRadius: 8 }}>
              <div style={{ fontSize: 11, color: "#fff" }}>{coversFixed ? "Cubre ✓" : "No cubre ✗"}</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#fff" }}>{coversFixed ? "+" : ""}{((grossMargin - FIXED_COSTS) / 1000).toFixed(0)}K</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Margin editor table */}
      <Card style={{ padding: 0, overflow: "hidden", marginBottom: 14 }}>
        <div style={{ padding: "12px 16px", borderBottom: `1px solid ${B.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontSize: 14, fontWeight: 700 }}>Márgenes por producto</h3>
          <div style={{ fontSize: 12, color: B.textMuted }}>Margen promedio ponderado: <span style={{ fontWeight: 700, color: B.text }}>{avgMargin}%</span></div>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: font }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${B.border}`, background: "#FAFAF8" }}>
              {["Producto", "Costo actual", "Margen %", "Precio venta", "Vol. mensual", "Ingreso mensual", "Contribución"].map(h =>
                <th key={h} style={{ padding: "9px 12px", textAlign: "left", fontWeight: 600, color: B.textMuted, fontSize: 11 }}>{h}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {CATALOG.map(item => {
              const revenue = item.price * item.monthlySales;
              const contrib = (item.price - item.cost) * item.monthlySales;
              return (
                <tr key={item.id} style={{ borderBottom: `1px solid ${B.border}` }}
                  onMouseEnter={e => e.currentTarget.style.background = B.surfaceHover}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <td style={{ padding: "9px 12px", fontWeight: 600 }}>{item.name}</td>
                  <td style={{ padding: "9px 12px", color: B.textMuted }}>${item.cost.toLocaleString()}</td>
                  <td style={{ padding: "9px 12px" }}>
                    <input type="number" defaultValue={item.margin} style={{ width: 55, padding: "5px 8px", border: `1px solid ${B.border}`, borderRadius: 6, fontSize: 13, fontWeight: 700, fontFamily: font, textAlign: "center" }} />
                    <span style={{ fontSize: 11, color: B.textMuted, marginLeft: 2 }}>%</span>
                  </td>
                  <td style={{ padding: "9px 12px", fontWeight: 700 }}>${item.price.toLocaleString()}</td>
                  <td style={{ padding: "9px 12px", color: B.textMuted }}>{item.monthlySales} {item.saleUnit}</td>
                  <td style={{ padding: "9px 12px", fontWeight: 600 }}>${(revenue / 1000).toFixed(0)}K</td>
                  <td style={{ padding: "9px 12px", fontWeight: 600, color: B.success }}>${(contrib / 1000).toFixed(0)}K</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div style={{ padding: "12px 16px", borderTop: `1px solid ${B.border}`, display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <Btn variant="ghost">Descartar cambios</Btn>
          <Btn variant="primary">Recalcular y guardar</Btn>
        </div>
      </Card>

      {/* Client pricing */}
      <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>Precios diferenciados por cliente</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {CLIENT_PRICES.map((cp, i) => (
          <Card key={i}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{cp.client}</div>
              <Badge color={cp.type === "base" ? B.success : B.warning} bg={cp.type === "base" ? B.successBg : B.warningBg}>{cp.type === "base" ? "Precio base" : "Override"}</Badge>
            </div>
            <div style={{ fontSize: 12, color: B.textMuted }}>{cp.note}</div>
            {cp.type === "override" && (
              <div style={{ marginTop: 8 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: B.textMuted, marginBottom: 4 }}>Overrides activos:</div>
                {["Queso mozzarella: +5% → $7,849", "Carne molida: +5% → $6,443"].map((o, oi) => (
                  <div key={oi} style={{ fontSize: 12, padding: "4px 0", borderBottom: `1px solid ${B.border}` }}>{o}</div>
                ))}
                <Btn style={{ fontSize: 11, marginTop: 6 }}>Editar overrides</Btn>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// ALERTAS DE COSTO (P6)
// ══════════════════════════════════════════════════════
function AlertasCostoView() {
  const alerts = [
    { item: "Queso mozzarella", costBefore: 6300, costAfter: 6500, change: "+3.2%", affected: 1, currentMargin: 15, newMarginIfAbsorb: 11.8, status: "pending" },
    { item: "Pollo entero", costBefore: 3500, costAfter: 3800, change: "+8.6%", affected: 1, currentMargin: 20, newMarginIfAbsorb: 13.4, status: "resolved" },
  ];

  return (
    <div>
      <div style={{ fontSize: 13, color: B.textMuted, marginBottom: 14 }}>Cuando un insumo sube de precio, el sistema alerta y ofrece opciones.</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {alerts.map((a, i) => (
          <Card key={i} style={{ border: a.status === "pending" ? `1px solid ${B.warning}40` : `1px solid ${B.border}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700 }}>{a.item}</div>
                <div style={{ fontSize: 12, color: B.textMuted }}>Costo: ${a.costBefore.toLocaleString()} → ${a.costAfter.toLocaleString()} (<span style={{ color: B.danger, fontWeight: 600 }}>{a.change}</span>)</div>
              </div>
              {a.status === "pending"
                ? <Badge color={B.warning} bg={B.warningBg}>Pendiente</Badge>
                : <Badge color={B.success} bg={B.successBg}>Resuelto</Badge>}
            </div>
            {a.status === "pending" && (
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <Btn style={{ flex: 1, textAlign: "center" }}>
                  <div style={{ fontWeight: 700 }}>Absorber</div>
                  <div style={{ fontSize: 11, color: B.textMuted, fontWeight: 400 }}>Margen baja a {a.newMarginIfAbsorb}%</div>
                </Btn>
                <Btn variant="primary" style={{ flex: 1, textAlign: "center" }}>
                  <div style={{ fontWeight: 700 }}>Mantener margen</div>
                  <div style={{ fontSize: 11, fontWeight: 400 }}>Precio sube proporcionalmente</div>
                </Btn>
                <Btn style={{ flex: 1, textAlign: "center" }}>
                  <div style={{ fontWeight: 700 }}>Ajuste manual</div>
                  <div style={{ fontSize: 11, color: B.textMuted, fontWeight: 400 }}>Definir margen/precio</div>
                </Btn>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// HISTORIAL PRECIOS (P8 - nuevo v3)
// ══════════════════════════════════════════════════════
function HistorialView() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14, alignItems: "center" }}>
        <div style={{ fontSize: 13, color: B.textMuted }}>Registro de cada cambio de precio — para auditoría y disputas de CxC.</div>
        <Btn variant="ghost" style={{ fontSize: 12 }}>📥 Exportar CSV</Btn>
      </div>
      <Card style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: font }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${B.border}`, background: "#FAFAF8" }}>
              {["Fecha", "Producto", "Precio anterior", "Precio nuevo", "Margen ant.", "Margen nuevo", "Usuario", "Motivo"].map(h =>
                <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontWeight: 600, color: B.textMuted, fontSize: 11 }}>{h}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {PRICE_HISTORY.map((p, i) => {
              const up = p.priceAfter > p.priceBefore;
              const same = p.priceAfter === p.priceBefore;
              return (
                <tr key={i} style={{ borderBottom: `1px solid ${B.border}` }}
                  onMouseEnter={e => e.currentTarget.style.background = B.surfaceHover}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <td style={{ padding: "10px 12px", color: B.textMuted }}>{p.date}</td>
                  <td style={{ padding: "10px 12px", fontWeight: 600 }}>{p.item}</td>
                  <td style={{ padding: "10px 12px", color: B.textMuted }}>${p.priceBefore.toLocaleString()}</td>
                  <td style={{ padding: "10px 12px", fontWeight: 700, color: same ? B.textMuted : up ? B.danger : B.success }}>${p.priceAfter.toLocaleString()} {!same && (up ? "↑" : "↓")}</td>
                  <td style={{ padding: "10px 12px", color: B.textMuted }}>{p.marginBefore}%</td>
                  <td style={{ padding: "10px 12px", fontWeight: 600 }}>{p.marginAfter}%</td>
                  <td style={{ padding: "10px 12px", color: B.textMuted }}>{p.user}</td>
                  <td style={{ padding: "10px 12px", fontSize: 12, color: B.textMuted }}>{p.reason}</td>
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
// REPORTES (P7)
// ══════════════════════════════════════════════════════
function ReportesView() {
  const sorted = [...CATALOG].sort((a, b) => b.monthlySales * b.price - a.monthlySales * a.price);
  const byContrib = [...CATALOG].sort((a, b) => (b.price - b.cost) * b.monthlySales - (a.price - a.cost) * a.monthlySales);
  const noMovement = CATALOG.filter(i => i.monthlySales < 5);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
      <Card>
        <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>💰 Más vendidos (por ingreso)</h4>
        {sorted.slice(0, 5).map((item, i) => {
          const rev = item.price * item.monthlySales;
          return (
            <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderBottom: `1px solid ${B.border}` }}>
              <span style={{ fontWeight: 700, color: B.accent, width: 20, fontSize: 13 }}>{i + 1}</span>
              <span style={{ flex: 1, fontSize: 13, fontWeight: 600 }}>{item.name}</span>
              <span style={{ fontSize: 13, fontWeight: 700 }}>${(rev / 1000).toFixed(0)}K</span>
            </div>
          );
        })}
      </Card>

      <Card>
        <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>🏆 Más rentables (por contribución)</h4>
        {byContrib.slice(0, 5).map((item, i) => {
          const contrib = (item.price - item.cost) * item.monthlySales;
          return (
            <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderBottom: `1px solid ${B.border}` }}>
              <span style={{ fontWeight: 700, color: B.success, width: 20, fontSize: 13 }}>{i + 1}</span>
              <span style={{ flex: 1, fontSize: 13, fontWeight: 600 }}>{item.name}</span>
              <span style={{ fontSize: 12, color: B.textMuted, marginRight: 8 }}>{item.margin}%</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: B.success }}>${(contrib / 1000).toFixed(0)}K</span>
            </div>
          );
        })}
      </Card>

      <Card>
        <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>💤 Sin movimiento</h4>
        {noMovement.length === 0 ? (
          <div style={{ fontSize: 13, color: B.textMuted, textAlign: "center", padding: 20 }}>Todos los productos tienen movimiento ✅</div>
        ) : noMovement.map(item => (
          <div key={item.id} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid ${B.border}`, fontSize: 13 }}>
            <span style={{ fontWeight: 600 }}>{item.name}</span>
            <span style={{ color: B.danger }}>{item.monthlySales} {item.saleUnit}/mes</span>
          </div>
        ))}
      </Card>

      <Card>
        <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>📊 Margen promedio por familia</h4>
        {[...new Set(CATALOG.map(i => i.family))].map(f => {
          const fItems = CATALOG.filter(i => i.family === f);
          const avgM = Math.round(fItems.reduce((s, i) => s + i.margin, 0) / fItems.length);
          const totalRev = fItems.reduce((s, i) => s + i.price * i.monthlySales, 0);
          return (
            <div key={f} style={{ marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 3 }}>
                <span style={{ fontWeight: 600 }}>{f}</span>
                <span><span style={{ fontWeight: 700 }}>{avgM}%</span> <span style={{ color: B.textMuted, fontSize: 11 }}>· ${(totalRev / 1000).toFixed(0)}K/mes</span></span>
              </div>
              <div style={{ height: 6, background: B.surfaceHover, borderRadius: 3 }}>
                <div style={{ width: `${avgM * 2}%`, height: "100%", background: avgM >= 25 ? B.success : avgM >= 15 ? B.accent : B.warning, borderRadius: 3 }} />
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
export default function CatalogoModule() {
  const [tab, setTab] = useState("catalogo");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function check() { setIsMobile(window.innerWidth < 900); }
    check(); window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const costAlerts = 1;

  const TABS = [
    { id: "catalogo", label: "Catálogo", icon: "🏷️" },
    { id: "precios", label: "Precios + simulación", icon: "💰" },
    { id: "alertas", label: "Alertas de costo", icon: "⚠️", badge: costAlerts, badgeBg: B.warningBg, badgeColor: B.warning },
    { id: "historial", label: "Historial precios", icon: "📜" },
    { id: "reportes", label: "Reportes", icon: "📊" },
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
              <span key={n} style={{ padding: "6px 11px", fontSize: 13, fontWeight: n === "Catálogo" ? 650 : 500, color: n === "Catálogo" ? B.text : B.textMuted, borderBottom: n === "Catálogo" ? `2px solid ${B.accent}` : "2px solid transparent", cursor: "pointer" }}>{n}</span>
            ))}
          </div>
        )}
      </header>

      <main style={{ padding: isMobile ? 16 : "20px 32px", maxWidth: 1320, margin: "0 auto" }}>
        <div style={{ marginBottom: 16 }}>
          <h1 style={{ fontSize: isMobile ? 20 : 24, fontWeight: 800, color: B.text, fontFamily: serif }}>🏷️ Catálogo + precios</h1>
          <p style={{ fontSize: 13, color: B.textMuted, marginTop: 2 }}>{CATALOG.length} productos · {CATALOG.filter(i => i.section === "produccion").length} elaborados WCI · {CATALOG.filter(i => i.section === "distribucion").length} distribución</p>
        </div>

        <TabBar tabs={TABS} active={tab} onChange={setTab} />

        {tab === "catalogo" && <CatalogoView />}
        {tab === "precios" && <PreciosView />}
        {tab === "alertas" && <AlertasCostoView />}
        {tab === "historial" && <HistorialView />}
        {tab === "reportes" && <ReportesView />}
      </main>
    </div>
  );
}
