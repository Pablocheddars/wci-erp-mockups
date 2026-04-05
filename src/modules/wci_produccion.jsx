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

// ── Mock Data ──
const RECIPES = [
  { id: 1, name: "Salsa BBQ WCI", batch: "10 lt", yield: "9.5 lt", yieldPct: 95, ingredients: [
    { name: "Tomate", qty: 5, unit: "kg", cost: 1500, stock: 12, enough: true },
    { name: "Cebolla", qty: 2, unit: "kg", cost: 800, stock: 20, enough: true },
    { name: "Azúcar", qty: 0.5, unit: "kg", cost: 1200, stock: 3, enough: true },
    { name: "Vinagre", qty: 0.3, unit: "lt", cost: 2000, stock: 2, enough: true },
    { name: "Especias BBQ", qty: 0.2, unit: "kg", cost: 15000, stock: 0.5, enough: true },
  ], costPerUnit: 3200, zone: "cocina" },
  { id: 2, name: "Salsa criolla WCI", batch: "8 lt", yield: "7.8 lt", yieldPct: 97, ingredients: [
    { name: "Tomate", qty: 4, unit: "kg", cost: 1500, stock: 12, enough: true },
    { name: "Cebolla", qty: 3, unit: "kg", cost: 800, stock: 20, enough: true },
    { name: "Cilantro", qty: 0.3, unit: "kg", cost: 5000, stock: 0.8, enough: true },
    { name: "Limón", qty: 0.5, unit: "lt", cost: 3000, stock: 1, enough: true },
  ], costPerUnit: 2800, zone: "cocina" },
  { id: 3, name: "Cheddar cheese sauce WCI", batch: "5 lt", yield: "4.7 lt", yieldPct: 94, ingredients: [
    { name: "Queso cheddar", qty: 2, unit: "kg", cost: 8500, stock: 4, enough: true },
    { name: "Leche", qty: 2, unit: "lt", cost: 1200, stock: 5, enough: true },
    { name: "Harina", qty: 0.3, unit: "kg", cost: 850, stock: 8, enough: true },
    { name: "Mantequilla", qty: 0.2, unit: "kg", cost: 6000, stock: 1, enough: true },
  ], costPerUnit: 4100, zone: "frio" },
  { id: 4, name: "Hamburguesa WCI premoldeada", batch: "50 ud", yield: "48.5 ud", yieldPct: 97, ingredients: [
    { name: "Carne molida", qty: 7.5, unit: "kg", cost: 5200, stock: 30, enough: true },
    { name: "Cebolla", qty: 0.5, unit: "kg", cost: 800, stock: 20, enough: true },
    { name: "Pan rallado", qty: 0.3, unit: "kg", cost: 2000, stock: 1, enough: true },
    { name: "Huevo", qty: 3, unit: "ud", cost: 200, stock: 24, enough: true },
  ], costPerUnit: 820, zone: "frio" },
  { id: 5, name: "Cebolla caramelizada WCI", batch: "8 kg", yield: "6.6 kg", yieldPct: 82, ingredients: [
    { name: "Cebolla", qty: 6, unit: "kg", cost: 800, stock: 20, enough: true },
    { name: "Aceite", qty: 0.4, unit: "lt", cost: 2200, stock: 5, enough: true },
    { name: "Azúcar", qty: 0.2, unit: "kg", cost: 1200, stock: 3, enough: true },
  ], costPerUnit: 2100, zone: "cocina" },
  { id: 6, name: "Pepinos al vacío WCI", batch: "10 kg", yield: "7.8 kg", yieldPct: 78, ingredients: [
    { name: "Pepino", qty: 10, unit: "kg", cost: 1200, stock: 15, enough: true },
    { name: "Salmuera", qty: 1, unit: "lt", cost: 500, stock: 4, enough: true },
  ], costPerUnit: 1800, zone: "frio" },
];

const PLAN_TODAY = [
  { recipe: "Salsa BBQ WCI", batches: 2, totalQty: "20 lt", priority: 1, reason: "Pedidos: 15lt + buffer 20%", insumosOk: true, status: "pending" },
  { recipe: "Cheddar cheese sauce WCI", batches: 2, totalQty: "10 lt", priority: 2, reason: "Stock bajo (4lt), pedidos: 8lt", insumosOk: true, status: "pending" },
  { recipe: "Salsa criolla WCI", batches: 1, totalQty: "8 lt", priority: 3, reason: "Stock ok (8lt) pero pedidos próximos", insumosOk: true, status: "produced" },
  { recipe: "Hamburguesa WCI premoldeada", batches: 1, totalQty: "50 ud", priority: 4, reason: "Pedido DK: 40 ud + buffer", insumosOk: false, status: "pending" },
];

const LOTS = [
  { id: "LOT-091", product: "Salsa criolla WCI", date: "04/04", qty: "7.8 lt", waste: "0.2 lt", producedBy: "Carmen", qc: "approved", dispatched: ["Angol", "Collao"] },
  { id: "LOT-090", product: "Salsa BBQ WCI", date: "03/04", qty: "19 lt", waste: "1 lt", producedBy: "Carmen", qc: "approved", dispatched: ["Angol", "DK Alley", "B. Arana"] },
  { id: "LOT-089", product: "Cheddar cheese sauce WCI", date: "03/04", qty: "9.6 lt", waste: "0.4 lt", producedBy: "Carmen", qc: "observations", dispatched: ["Angol"] },
  { id: "LOT-088", product: "Hamburguesa WCI premoldeada", date: "02/04", qty: "96 ud", waste: "4 ud", producedBy: "Carmen", qc: "approved", dispatched: ["Angol", "Collao", "DK Alley", "DK Wera"] },
  { id: "LOT-087", product: "Salsa BBQ WCI", date: "01/04", qty: "9.5 lt", waste: "0.5 lt", producedBy: "Carmen", qc: "approved", dispatched: ["Collao", "B. Arana"] },
];

const QC_STATUS = {
  approved: { label: "Aprobado", color: B.success, bg: B.successBg },
  observations: { label: "Con observaciones", color: B.warning, bg: B.warningBg },
  rejected: { label: "Rechazado", color: B.danger, bg: B.dangerBg },
  pending: { label: "Pendiente QC", color: B.textMuted, bg: B.surfaceHover },
};

// ══════════════════════════════════════════════════════
// P1: RECETAS DE PRODUCCIÓN
// ══════════════════════════════════════════════════════
function RecetasView() {
  const [selected, setSelected] = useState(null);

  if (selected) {
    const r = selected;
    const totalCost = r.ingredients.reduce((s, i) => s + i.qty * i.cost, 0);
    return (
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <Btn variant="ghost" onClick={() => setSelected(null)}>← Volver</Btn>
          <h3 style={{ fontSize: 16, fontWeight: 700 }}>{r.name}</h3>
          <Badge color={B.purple} bg={B.purpleBg}>Elaborado WCI</Badge>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
          <Card>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: B.textMuted, marginBottom: 10 }}>Datos del batch</h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[
                { label: "Batch estándar", value: r.batch },
                { label: "Rendimiento", value: `${r.yield} (${r.yieldPct}%)` },
                { label: "Costo por unidad", value: `$${r.costPerUnit.toLocaleString()}/lt` },
                { label: "Costo total batch", value: `$${totalCost.toLocaleString()}` },
                { label: "Zona destino", value: r.zone === "frio" ? "❄️ Cámara frío" : "🍳 Cocina prod." },
              ].map(m => (
                <div key={m.label} style={{ padding: "8px 10px", background: B.surfaceHover, borderRadius: 6 }}>
                  <div style={{ fontSize: 11, color: B.textMuted }}>{m.label}</div>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{m.value}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: B.textMuted, marginBottom: 10 }}>BOM (Bill of Materials)</h4>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: font }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${B.border}` }}>
                  {["Insumo", "Qty/batch", "Costo unit.", "Subtotal"].map(h =>
                    <th key={h} style={{ padding: "6px 8px", textAlign: "left", fontSize: 11, color: B.textMuted, fontWeight: 600 }}>{h}</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {r.ingredients.map((ing, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${B.border}` }}>
                    <td style={{ padding: "6px 8px", fontWeight: 600 }}>{ing.name}</td>
                    <td style={{ padding: "6px 8px" }}>{ing.qty} {ing.unit}</td>
                    <td style={{ padding: "6px 8px", color: B.textMuted }}>${ing.cost.toLocaleString()}</td>
                    <td style={{ padding: "6px 8px", fontWeight: 600 }}>${(ing.qty * ing.cost).toLocaleString()}</td>
                  </tr>
                ))}
                <tr style={{ background: B.surfaceHover }}>
                  <td colSpan={3} style={{ padding: "6px 8px", fontWeight: 700 }}>Total batch</td>
                  <td style={{ padding: "6px 8px", fontWeight: 800 }}>${totalCost.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </Card>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <Btn>Editar receta</Btn>
          <Btn variant="ghost">Ver lotes producidos</Btn>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
        <div style={{ fontSize: 13, color: B.textMuted }}>{RECIPES.length} recetas de producción digitalizadas</div>
        <Btn variant="primary">+ Nueva receta</Btn>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {RECIPES.map(r => {
          const totalCost = r.ingredients.reduce((s, i) => s + i.qty * i.cost, 0);
          return (
            <Card key={r.id} style={{ cursor: "pointer", transition: "border-color 0.12s" }} onClick={() => setSelected(r)}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                <div style={{ fontSize: 15, fontWeight: 700 }}>{r.name}</div>
                <Badge color={B.purple} bg={B.purpleBg}>Elaborado</Badge>
              </div>
              <div style={{ fontSize: 12, color: B.textMuted, marginBottom: 6 }}>
                Batch: {r.batch} → Rinde: {r.yield} ({r.yieldPct}%) · Zona: {r.zone === "frio" ? "❄️ Frío" : "🍳 Cocina"}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                <span style={{ color: B.textMuted }}>{r.ingredients.length} insumos</span>
                <span style={{ fontWeight: 700 }}>Costo: ${r.costPerUnit.toLocaleString()}/u · Batch: ${totalCost.toLocaleString()}</span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// P2+P3: PLANIFICACIÓN + VERIFICACIÓN INSUMOS
// ══════════════════════════════════════════════════════
function PlanView() {
  return (
    <div>
      <Card style={{ marginBottom: 14, background: `${B.accent}08`, border: `1px solid ${B.accent}30` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 13 }}>
            <span style={{ fontWeight: 700 }}>Plan del día — Viernes 04/04</span>
            <span style={{ color: B.textMuted, marginLeft: 8 }}>Generado a partir de pedidos confirmados + stock actual + buffer 20%</span>
          </div>
          <Btn variant="primary">Confirmar plan</Btn>
        </div>
      </Card>
      <Card style={{ marginBottom: 14, background: B.infoBg, border: `1px solid ${B.info}20` }}>
        <div style={{ fontSize: 13, color: B.textMuted }}><span style={{ fontWeight: 600, color: B.text }}>Rendimiento configurable por receta</span> — varía según producto (p. ej. BBQ 95%, hamburguesa 97%, pepinos al vacío 78%).</div>
      </Card>

      {PLAN_TODAY.map((item, i) => {
        const recipe = RECIPES.find(r => r.name === item.recipe);
        return (
          <Card key={i} style={{
            marginBottom: 10,
            borderLeft: `4px solid ${!item.insumosOk ? B.danger : item.status === "produced" ? B.success : B.accent}`,
            opacity: item.status === "produced" ? 0.6 : 1,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, textDecoration: item.status === "produced" ? "line-through" : "none" }}>{item.recipe}</span>
                  <Badge color={B.text} bg={B.surfaceHover}>Prioridad {item.priority}</Badge>
                  {item.status === "produced" && <Badge color={B.success} bg={B.successBg}>✓ Producido</Badge>}
                </div>
                <div style={{ fontSize: 12, color: B.textMuted, marginTop: 2 }}>{item.reason}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 18, fontWeight: 800 }}>{item.totalQty}</div>
                <div style={{ fontSize: 11, color: B.textMuted }}>{item.batches} batch{item.batches > 1 ? "es" : ""}</div>
              </div>
            </div>

            {/* Insumos check */}
            {recipe && (
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {recipe.ingredients.map((ing, ii) => {
                  const needed = ing.qty * (item.batches || 1);
                  const enough = ing.stock >= needed;
                  return (
                    <span key={ii} style={{
                      padding: "4px 8px", borderRadius: 6, fontSize: 11, fontWeight: 600,
                      background: enough ? B.successBg : B.dangerBg,
                      color: enough ? B.success : B.danger,
                    }}>
                      {enough ? "✓" : "✗"} {ing.name}: {needed}{ing.unit} (hay {ing.stock})
                    </span>
                  );
                })}
              </div>
            )}

            {!item.insumosOk && (
              <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
                <Btn variant="danger" style={{ fontSize: 12 }}>Transferir insumos faltantes</Btn>
                <Btn style={{ fontSize: 12 }}>Pedir a proveedor</Btn>
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}

// ══════════════════════════════════════════════════════
// P4: REGISTRAR PRODUCCIÓN DEL DÍA
// ══════════════════════════════════════════════════════
function RegistrarView() {
  return (
    <div>
      <Card style={{ marginBottom: 14, background: B.infoBg, border: `1px solid ${B.info}20` }}>
        <div style={{ fontSize: 13 }}>
          <span style={{ fontWeight: 600 }}>Lista completa del día.</span>
          <span style={{ color: B.textMuted, marginLeft: 6 }}>Marca cada producto como producido con cantidad real + merma. Puedes registrar todo al final del día.</span>
        </div>
      </Card>

      <Card style={{ marginBottom: 14 }}>
        <h4 style={{ fontSize: 13, fontWeight: 700, color: B.textMuted, marginBottom: 10 }}>Etiqueta térmica estandarizada (pre-elaborado)</h4>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 8, fontSize: 12 }}>
          {["LOT ID", "Producto", "Fecha producción", "Fecha vencimiento", "Cantidad", "Zona destino", "Responsable", "QR trazabilidad"].map(f => (
            <div key={f} style={{ padding: "8px 10px", background: B.surfaceHover, borderRadius: 6, fontWeight: 600 }}>{f}</div>
          ))}
        </div>
        <div style={{ fontSize: 12, color: B.textMuted, marginTop: 10 }}>Formato pre-elaborado impreso con impresora de etiquetas</div>
      </Card>

      <Card style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: font }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${B.border}`, background: "#FAFAF8" }}>
              {["", "Producto", "Planificado", "Qty real", "Merma", "Zona destino", "Estado"].map(h =>
                <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontWeight: 600, color: B.textMuted, fontSize: 11 }}>{h}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {PLAN_TODAY.map((item, i) => {
              const recipe = RECIPES.find(r => r.name === item.recipe);
              const done = item.status === "produced";
              return (
                <tr key={i} style={{ borderBottom: `1px solid ${B.border}`, background: done ? `${B.success}06` : "transparent" }}>
                  <td style={{ padding: "10px 12px" }}>
                    <button style={{
                      width: 28, height: 28, borderRadius: 6,
                      border: done ? `2px solid ${B.success}` : `2px solid ${B.border}`,
                      background: done ? B.successBg : "transparent",
                      cursor: "pointer", fontSize: 14, color: B.success,
                    }}>{done ? "✓" : ""}</button>
                  </td>
                  <td style={{ padding: "10px 12px", fontWeight: 600, textDecoration: done ? "line-through" : "none" }}>{item.recipe}</td>
                  <td style={{ padding: "10px 12px", color: B.textMuted }}>{item.totalQty}</td>
                  <td style={{ padding: "10px 12px" }}>
                    <input type="text" defaultValue={done ? "7.8 lt" : ""} placeholder="0" style={{
                      width: 75, padding: "6px 8px", border: `1px solid ${B.border}`,
                      borderRadius: 6, fontSize: 14, fontWeight: 700, fontFamily: font, textAlign: "center",
                    }} />
                  </td>
                  <td style={{ padding: "10px 12px" }}>
                    <input type="text" defaultValue={done ? "0.2 lt" : ""} placeholder="0" style={{
                      width: 65, padding: "6px 8px", border: `1px solid ${B.border}`,
                      borderRadius: 6, fontSize: 13, fontFamily: font, textAlign: "center", color: B.danger,
                    }} />
                  </td>
                  <td style={{ padding: "10px 12px" }}>
                    <select defaultValue={recipe?.zone || "frio"} style={{
                      padding: "6px 8px", border: `1px solid ${B.border}`, borderRadius: 6,
                      fontSize: 12, fontFamily: font, background: B.surface,
                    }}>
                      <option value="frio">❄️ Cámara frío</option>
                      <option value="seca">🏭 Bodega seca</option>
                      <option value="cocina">🍳 Cocina prod.</option>
                    </select>
                  </td>
                  <td style={{ padding: "10px 12px" }}>
                    {done ? <Badge color={B.success} bg={B.successBg}>Registrado</Badge> : <Badge>Pendiente</Badge>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div style={{ padding: "12px 16px", borderTop: `1px solid ${B.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 12, color: B.textMuted }}>Al cerrar: insumos se descuentan de cocina producción, elaborados se suman a zona destino.</div>
          <Btn variant="primary">Cerrar producción del día</Btn>
        </div>
      </Card>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// P5: CHECK DE CALIDAD
// ══════════════════════════════════════════════════════
function CalidadView() {
  const [reviewing, setReviewing] = useState(null);
  const pendingQc = LOTS.filter(l => l.qc === "pending");

  if (reviewing) {
    return (
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <Btn variant="ghost" onClick={() => setReviewing(null)}>← Volver</Btn>
          <h3 style={{ fontSize: 16, fontWeight: 700 }}>Check de calidad — {reviewing.id}</h3>
        </div>

        <Card style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 13, marginBottom: 12 }}>
            <span style={{ fontWeight: 600 }}>{reviewing.product}</span> · {reviewing.qty} · Producido por {reviewing.producedBy} · {reviewing.date}
          </div>

          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>Verificación</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
            {["Apariencia (color + olor)", "Temperatura", "Sabor", "Textura"].map(c => (
              <div key={c} style={{ padding: "12px", border: `1px solid ${B.border}`, borderRadius: 8 }}>
                <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>{c}</div>
                <div style={{ display: "flex", gap: 6 }}>
                  {[
                    { label: "✓ OK", color: B.success },
                    { label: "⚠️ Obs.", color: B.warning },
                    { label: "✗ Falla", color: B.danger },
                  ].map((opt, oi) => (
                    <button key={oi} style={{
                      flex: 1, padding: "8px 4px", borderRadius: 6,
                      border: oi === 0 ? `2px solid ${opt.color}` : `1px solid ${B.border}`,
                      background: oi === 0 ? `${opt.color}12` : "transparent",
                      cursor: "pointer", fontSize: 12, fontWeight: 600, color: opt.color, fontFamily: font,
                    }}>{opt.label}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: B.textMuted, display: "block", marginBottom: 4 }}>Observaciones</label>
            <textarea placeholder="Notas de calidad..." style={{
              width: "100%", padding: "8px 12px", border: `1px solid ${B.border}`,
              borderRadius: 8, fontSize: 13, fontFamily: font, minHeight: 60, resize: "vertical",
            }} />
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <Btn variant="success" style={{ flex: 1, textAlign: "center" }}>✓ Aprobado</Btn>
            <Btn style={{ flex: 1, textAlign: "center" }}>⚠️ Con observaciones</Btn>
            <Btn variant="danger" style={{ flex: 1, textAlign: "center" }}>✗ Rechazado (merma total)</Btn>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <div style={{ fontSize: 13, color: B.textMuted, marginBottom: 10 }}>Cada lote pasa por verificación post-producción. Rechazado = merma completa con valorización.</div>
      <Card style={{ marginBottom: 14, background: B.surfaceHover, border: `1px solid ${B.border}` }}>
        <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 6 }}>Umbrales QC (score ponderado)</div>
        <div style={{ fontSize: 12, color: B.textMuted }}>Aprobado ≥90% · Observado 70–89% · Reprobado &lt;70%</div>
      </Card>

      <Card style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: font }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${B.border}`, background: "#FAFAF8" }}>
              {["Lote", "Producto", "Fecha", "Cantidad", "Merma", "Producido por", "QC", ""].map(h =>
                <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontWeight: 600, color: B.textMuted, fontSize: 11 }}>{h}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {LOTS.map(lot => {
              const st = QC_STATUS[lot.qc];
              return (
                <tr key={lot.id} style={{ borderBottom: `1px solid ${B.border}` }}
                  onMouseEnter={e => e.currentTarget.style.background = B.surfaceHover}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <td style={{ padding: "10px 12px", fontWeight: 700, color: B.info }}>{lot.id}</td>
                  <td style={{ padding: "10px 12px", fontWeight: 600 }}>{lot.product}</td>
                  <td style={{ padding: "10px 12px", color: B.textMuted }}>{lot.date}</td>
                  <td style={{ padding: "10px 12px" }}>{lot.qty}</td>
                  <td style={{ padding: "10px 12px", color: B.danger }}>{lot.waste}</td>
                  <td style={{ padding: "10px 12px", color: B.textMuted }}>{lot.producedBy}</td>
                  <td style={{ padding: "10px 12px" }}><Badge color={st.color} bg={st.bg}>{st.label}</Badge></td>
                  <td style={{ padding: "10px 12px" }}>
                    <Btn variant="ghost" style={{ fontSize: 12 }} onClick={() => setReviewing(lot)}>Revisar</Btn>
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
// P6: TRAZABILIDAD
// ══════════════════════════════════════════════════════
function TrazabilidadView() {
  return (
    <div>
      <div style={{ fontSize: 13, color: B.textMuted, marginBottom: 14 }}>Si hay un problema con un producto, se rastrea qué locales recibieron ese lote.</div>

      <Card style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: font }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${B.border}`, background: "#FAFAF8" }}>
              {["Lote", "Producto", "Fecha", "Cantidad", "QC", "Despachado a"].map(h =>
                <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontWeight: 600, color: B.textMuted, fontSize: 11 }}>{h}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {LOTS.map(lot => {
              const st = QC_STATUS[lot.qc];
              return (
                <tr key={lot.id} style={{ borderBottom: `1px solid ${B.border}` }}
                  onMouseEnter={e => e.currentTarget.style.background = B.surfaceHover}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <td style={{ padding: "10px 12px", fontWeight: 700, color: B.info }}>{lot.id}</td>
                  <td style={{ padding: "10px 12px", fontWeight: 600 }}>{lot.product}</td>
                  <td style={{ padding: "10px 12px", color: B.textMuted }}>{lot.date}</td>
                  <td style={{ padding: "10px 12px" }}>{lot.qty}</td>
                  <td style={{ padding: "10px 12px" }}><Badge color={st.color} bg={st.bg}>{st.label}</Badge></td>
                  <td style={{ padding: "10px 12px" }}>
                    <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                      {lot.dispatched.map(l => <Badge key={l}>{l}</Badge>)}
                    </div>
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
// P7: REPORTES
// ══════════════════════════════════════════════════════
function ReportesView() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
      <Card>
        <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>📊 Volumen por producto (mes)</h4>
        {RECIPES.map(r => {
          const vol = Math.round(Math.random() * 60 + 20);
          return (
            <div key={r.id} style={{ marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 3 }}>
                <span style={{ fontWeight: 600 }}>{r.name}</span>
                <span style={{ fontWeight: 700 }}>{vol} {r.batch.split(" ")[1]}</span>
              </div>
              <div style={{ height: 6, background: B.surfaceHover, borderRadius: 3 }}>
                <div style={{ width: `${(vol / 80) * 100}%`, height: "100%", background: B.accent, borderRadius: 3 }} />
              </div>
            </div>
          );
        })}
      </Card>

      <Card>
        <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>🎯 Rendimiento real vs teórico</h4>
        {RECIPES.map(r => (
          <div key={r.id} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${B.border}`, fontSize: 13 }}>
            <span style={{ fontWeight: 600 }}>{r.name}</span>
            <div>
              <span style={{ color: B.textMuted }}>Teórico: {r.yieldPct}%</span>
              <span style={{ fontWeight: 700, marginLeft: 10, color: B.success }}>Real: {r.yieldPct - Math.round(Math.random() * 3)}%</span>
            </div>
          </div>
        ))}
      </Card>

      <Card>
        <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>🗑️ Merma de producción</h4>
        {[
          { product: "Salsa BBQ WCI", waste: "2.5 lt", cost: "$8,000", pct: "5.2%" },
          { product: "Hamburguesas", waste: "8 ud", cost: "$6,560", pct: "4.0%" },
          { product: "Cheese sauce", waste: "0.8 lt", cost: "$3,280", pct: "4.2%" },
          { product: "Salsa criolla", waste: "0.4 lt", cost: "$1,120", pct: "2.5%" },
        ].map((r, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: `1px solid ${B.border}`, fontSize: 13 }}>
            <span style={{ fontWeight: 600 }}>{r.product}</span>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <span style={{ color: B.textMuted }}>{r.waste}</span>
              <span style={{ color: B.danger, fontWeight: 600 }}>{r.cost}</span>
              <Badge color={parseFloat(r.pct) > 5 ? B.danger : B.warning} bg={parseFloat(r.pct) > 5 ? B.dangerBg : B.warningBg}>{r.pct}</Badge>
            </div>
          </div>
        ))}
      </Card>

      <Card>
        <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>💰 Costo producción por lote</h4>
        {LOTS.slice(0, 4).map(lot => {
          const recipe = RECIPES.find(r => r.name === lot.product);
          const cost = recipe ? recipe.ingredients.reduce((s, i) => s + i.qty * i.cost, 0) : 0;
          return (
            <div key={lot.id} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid ${B.border}`, fontSize: 13 }}>
              <div>
                <span style={{ fontWeight: 700, color: B.info }}>{lot.id}</span>
                <span style={{ color: B.textMuted, marginLeft: 8 }}>{lot.product}</span>
              </div>
              <span style={{ fontWeight: 700 }}>${cost.toLocaleString()}</span>
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
export default function ProduccionModule() {
  const [tab, setTab] = useState("plan");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function check() { setIsMobile(window.innerWidth < 900); }
    check(); window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const TABS = [
    { id: "plan", label: "Plan del día", icon: "📋" },
    { id: "registrar", label: "Registrar", icon: "✅" },
    { id: "calidad", label: "Check calidad", icon: "🔍" },
    { id: "recetas", label: "Recetas", icon: "📖" },
    { id: "lotes", label: "Trazabilidad", icon: "🔗" },
    { id: "reportes", label: "Reportes", icon: "📊" },
  ];

  return (
    <div style={{ fontFamily: font, background: "#F5F4F0", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&family=DM+Serif+Display&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input:focus, select:focus, textarea:focus { outline: none; border-color: ${B.accent} !important; }
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
              <span key={n} style={{ padding: "6px 11px", fontSize: 13, fontWeight: n === "Producción" ? 650 : 500, color: n === "Producción" ? B.text : B.textMuted, borderBottom: n === "Producción" ? `2px solid ${B.accent}` : "2px solid transparent", cursor: "pointer" }}>{n}</span>
            ))}
          </div>
        )}
      </header>

      <main style={{ padding: isMobile ? 16 : "20px 32px", maxWidth: 1320, margin: "0 auto" }}>
        <div style={{ marginBottom: 16 }}>
          <h1 style={{ fontSize: isMobile ? 20 : 24, fontWeight: 800, color: B.text, fontFamily: serif }}>👩‍🍳 Producción</h1>
          <p style={{ fontSize: 13, color: B.textMuted, marginTop: 2 }}>{RECIPES.length} recetas · {LOTS.length} lotes esta semana · {PLAN_TODAY.filter(p => p.status === "pending").length} pendientes hoy · Rendimiento configurable por receta · Etiqueta térmica estandarizada</p>
        </div>

        <TabBar tabs={TABS} active={tab} onChange={setTab} />

        {tab === "plan" && <PlanView />}
        {tab === "registrar" && <RegistrarView />}
        {tab === "calidad" && <CalidadView />}
        {tab === "recetas" && <RecetasView />}
        {tab === "lotes" && <TrazabilidadView />}
        {tab === "reportes" && <ReportesView />}
      </main>
    </div>
  );
}
