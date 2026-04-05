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

// ── Shared ──
function Badge({ children, color = B.textMuted, bg = B.surfaceHover }) {
  return <span style={{ fontSize: 11, fontWeight: 650, color, background: bg, padding: "2px 8px", borderRadius: 10, whiteSpace: "nowrap" }}>{children}</span>;
}
function Btn({ children, variant = "default", onClick, style: sx = {}, disabled }) {
  const styles = {
    primary: { background: B.accent, color: B.primary, border: "none", fontWeight: 700 },
    danger: { background: B.dangerBg, color: B.danger, border: `1px solid ${B.danger}30`, fontWeight: 600 },
    success: { background: B.successBg, color: B.success, border: `1px solid ${B.success}30`, fontWeight: 600 },
    default: { background: B.surface, color: B.text, border: `1px solid ${B.border}`, fontWeight: 600 },
    ghost: { background: "transparent", color: B.textMuted, border: "none", fontWeight: 600 },
  };
  return <button onClick={onClick} disabled={disabled} style={{ padding: "7px 14px", borderRadius: 8, fontSize: 13, cursor: disabled ? "not-allowed" : "pointer", fontFamily: font, transition: "all 0.12s", opacity: disabled ? 0.5 : 1, ...styles[variant], ...sx }}>{children}</button>;
}
function Card({ children, style: sx = {} }) {
  return <div style={{ background: B.surface, border: `1px solid ${B.border}`, borderRadius: 12, padding: "16px 20px", ...sx }}>{children}</div>;
}
function TabBar({ tabs, active, onChange }) {
  return (
    <div style={{ display: "flex", gap: 2, borderBottom: `1px solid ${B.border}`, marginBottom: 20, overflowX: "auto" }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => onChange(t.id)} style={{
          padding: "10px 14px", border: "none", background: "transparent",
          fontSize: 13, fontWeight: active === t.id ? 650 : 500,
          color: active === t.id ? B.text : B.textMuted,
          borderBottom: active === t.id ? `2px solid ${B.accent}` : "2px solid transparent",
          cursor: "pointer", fontFamily: font, whiteSpace: "nowrap",
        }}>
          {t.icon && <span style={{ marginRight: 6 }}>{t.icon}</span>}
          {t.label}
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
const SUPPLIERS = [
  { id: 1, name: "Distribuidora Lagos", rut: "76.543.210-1", contact: "Juan Lagos", phone: "+56 9 1234 5678", creditDays: 30, status: "activo", ocCount: 24, completeness: 94, onTime: 88 },
  { id: 2, name: "Carnes del Sur", rut: "77.891.234-5", contact: "Pedro Muñoz", phone: "+56 9 8765 4321", creditDays: 0, status: "activo", ocCount: 18, completeness: 97, onTime: 92 },
  { id: 3, name: "Agrícola Don Pedro", rut: "78.123.456-7", contact: "María Soto", phone: "+56 9 5555 1234", creditDays: 15, status: "activo", ocCount: 12, completeness: 85, onTime: 78 },
  { id: 4, name: "Envases Express", rut: "79.456.789-0", contact: "Carlos Vega", phone: "+56 9 4444 5555", creditDays: 30, status: "activo", ocCount: 6, completeness: 100, onTime: 95 },
];

const OC_LIST = [
  { id: "OC-047", supplier: "Distribuidora Lagos", date: "03/04", total: 485000, items: 8, status: "enviada", deliveryDate: "05/04" },
  { id: "OC-046", supplier: "Carnes del Sur", date: "02/04", total: 320000, items: 4, status: "recibida", deliveryDate: "03/04" },
  { id: "OC-045", supplier: "Agrícola Don Pedro", date: "01/04", total: 125000, items: 6, status: "recibida_parcial", deliveryDate: "02/04" },
  { id: "OC-044", supplier: "Envases Express", date: "29/03", total: 89000, items: 3, status: "recibida", deliveryDate: "01/04" },
];

const INVOICES = [
  { id: 1, folio: "4521", supplier: "Distribuidora Lagos", date: "04/04", total: 485000, source: "sii", status: "por_recepcionar", items: 8, dueDate: "04/05" },
  { id: 2, folio: "891", supplier: "Carnes del Sur", date: "03/04", total: 320000, source: "pdf_claude", status: "recepcionada", items: 4, dueDate: "03/04" },
  { id: 3, folio: "2201", supplier: "Agrícola Don Pedro", date: "02/04", total: 125000, source: "manual", status: "recepcionada_parcial", items: 6, dueDate: "17/04" },
  { id: 4, folio: "1102", supplier: "Distribuidora Lagos", date: "28/03", total: 412000, source: "sii", status: "recepcionada", items: 7, dueDate: "28/04" },
];

const SOURCE_LABELS = {
  sii: { label: "SII automático", color: B.success, bg: B.successBg, icon: "🔄" },
  pdf_claude: { label: "PDF + IA", color: B.info, bg: B.infoBg, icon: "🤖" },
  manual: { label: "Manual", color: B.textMuted, bg: B.surfaceHover, icon: "✏️" },
};

const STATUS_MAP = {
  por_recepcionar: { label: "Por recepcionar", color: B.warning, bg: B.warningBg },
  recepcionada: { label: "Recepcionada", color: B.success, bg: B.successBg },
  recepcionada_parcial: { label: "Parcial", color: B.purple, bg: B.purpleBg },
  enviada: { label: "Enviada", color: B.info, bg: B.infoBg },
  borrador: { label: "Borrador", color: B.textMuted, bg: B.surfaceHover },
  pagada: { label: "Pagada", color: B.success, bg: B.successBg },
};

const INSUMO_CATEGORIES_COMPRAS = ["Carnes", "Lácteos", "Secos", "Verduras", "Salsas", "Bebidas", "Envases", "Desechables", "Limpieza"];
const INSUMO_UNITS_COMPRAS = ["kg", "lt", "ud", "caja", "botella"];
const INV_ZONE_OPTS = [
  { value: "seca", label: "🏭 Bodega seca" },
  { value: "frio", label: "❄️ Cámara frío" },
  { value: "cocina", label: "🍳 Cocina producción" },
];

const INSUMOS_MAESTRO = [
  "Queso mozzarella", "Harina", "Aceite vegetal", "Pollo entero", "Tomate", "Salsa BBQ WCI", "Cebolla", "Pan hamburguesa", "Envase delivery 750ml", "Carne molida",
];

function createDemoFacturaLines() {
  return [
    { id: 1, glosa: "Qso Mozzarella Sta Rosa 5K", mappedName: null, qty: "30 kg", price: "$6.500", total: "$195.000" },
    { id: 2, glosa: "Pllo Entero S/M", mappedName: "Pollo entero", qty: "40 kg", price: "$3.800", total: "$152.000" },
    { id: 3, glosa: "HARINA SELECTA 25K", mappedName: "Harina", qty: "25 kg", price: "$850", total: "$21.250" },
  ];
}

function MapBadge({ mappedName }) {
  if (mappedName) {
    return (
      <span style={{ fontSize: 10, fontWeight: 650, color: B.success, background: B.successBg, padding: "2px 8px", borderRadius: 8, whiteSpace: "nowrap", display: "inline-block", maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis" }}>
        ✓ Mapeado → {mappedName}
      </span>
    );
  }
  return (
    <span style={{ fontSize: 10, fontWeight: 650, color: B.warning, background: B.warningBg, padding: "2px 8px", borderRadius: 8, whiteSpace: "nowrap" }}>
      ⚠️ No mapeado
    </span>
  );
}

function InvoiceLinesWithMapping({ lines, setLines }) {
  const [mapRowId, setMapRowId] = useState(null);
  const [createRowId, setCreateRowId] = useState(null);
  const [mapPick, setMapPick] = useState("");
  const [cName, setCName] = useState("");
  const [cCat, setCCat] = useState("Lácteos");
  const [cUnit, setCUnit] = useState("kg");
  const [cZone, setCZone] = useState("frio");
  const [cMin, setCMin] = useState("0");

  function openMap(row) {
    setCreateRowId(null);
    setMapRowId(row.id);
    setMapPick(row.mappedName || "");
  }

  function openCreate(row) {
    setMapRowId(null);
    setCreateRowId(row.id);
    setCName(row.glosa);
    setCCat("Lácteos");
    setCUnit("kg");
    setCZone("frio");
    setCMin("0");
  }

  function applyMap(rowId) {
    if (!mapPick) return;
    setLines(prev => prev.map(l => l.id === rowId ? { ...l, mappedName: mapPick } : l));
    setMapRowId(null);
    setMapPick("");
  }

  function applyCreate(rowId) {
    const n = cName.trim();
    if (!n) return;
    setLines(prev => prev.map(l => l.id === rowId ? { ...l, mappedName: n } : l));
    setCreateRowId(null);
  }

  return (
    <div>
      <Card style={{ background: B.infoBg, border: `1px solid ${B.info}22`, marginBottom: 12 }}>
        <div style={{ fontSize: 13, color: B.text, lineHeight: 1.55 }}>
          Cada glosa de proveedor se mapea una sola vez a un insumo del sistema. Las próximas facturas del mismo proveedor con la misma glosa se mapean automáticamente.
        </div>
      </Card>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: font, border: `1px solid ${B.border}`, borderRadius: 8, overflow: "hidden" }}>
        <thead>
          <tr style={{ background: "#FAFAF8", borderBottom: `1px solid ${B.border}` }}>
            {["Glosa proveedor", "Mapeo a insumo", "Cantidad", "Precio", "Total"].map(h => (
              <th key={h} style={{ padding: "8px 12px", textAlign: "left", fontSize: 12, color: B.textMuted, fontWeight: 600 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {lines.map(row => {
            const unmapped = !row.mappedName;
            const rowBg = unmapped ? `${B.warning}0D` : "transparent";
            return (
              <tr key={row.id} style={{ borderBottom: `1px solid ${B.border}` }}>
                <td style={{
                  padding: "10px 12px", color: B.textMuted, fontStyle: "italic", verticalAlign: "top",
                  background: rowBg, borderLeft: unmapped ? `3px solid ${B.warning}` : `3px solid transparent`,
                }}>{row.glosa}</td>
                <td style={{ padding: "10px 12px", verticalAlign: "top", minWidth: 200, background: rowBg }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start" }}>
                    <MapBadge mappedName={row.mappedName} />
                    {unmapped && mapRowId !== row.id && createRowId !== row.id && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        <Btn variant="default" style={{ fontSize: 11, padding: "5px 10px" }} onClick={() => openMap(row)}>Mapear a insumo existente</Btn>
                        <Btn variant="default" style={{ fontSize: 11, padding: "5px 10px" }} onClick={() => openCreate(row)}>🆕 Crear insumo nuevo</Btn>
                      </div>
                    )}
                    {mapRowId === row.id && (
                      <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%", maxWidth: 280 }}>
                        <Select value={mapPick} onChange={setMapPick} options={[{ value: "", label: "Buscar insumo…" }, ...INSUMOS_MAESTRO.map(n => ({ value: n, label: n }))]} style={{ width: "100%" }} />
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                          <Btn variant="primary" style={{ fontSize: 11, padding: "5px 10px" }} onClick={() => applyMap(row.id)}>Aplicar mapeo</Btn>
                          <Btn variant="ghost" style={{ fontSize: 11, padding: "5px 10px" }} onClick={() => { setMapRowId(null); setMapPick(""); }}>Cancelar</Btn>
                        </div>
                      </div>
                    )}
                    {createRowId === row.id && (
                      <div style={{
                        width: "100%", maxWidth: 340, padding: 10, borderRadius: 8,
                        border: `1px solid ${B.border}`, background: B.surfaceHover,
                      }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: B.textMuted, marginBottom: 8 }}>Crear insumo y mapear glosa</div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                          <div style={{ gridColumn: "1 / -1" }}>
                            <label style={{ fontSize: 10, color: B.textMuted, display: "block", marginBottom: 2 }}>Nombre</label>
                            <input value={cName} onChange={e => setCName(e.target.value)} style={{ width: "100%", padding: "6px 8px", border: `1px solid ${B.border}`, borderRadius: 6, fontSize: 12, fontFamily: font }} />
                          </div>
                          <div>
                            <label style={{ fontSize: 10, color: B.textMuted, display: "block", marginBottom: 2 }}>Categoría</label>
                            <Select value={cCat} onChange={setCCat} options={INSUMO_CATEGORIES_COMPRAS.map(c => ({ value: c, label: c }))} style={{ width: "100%", fontSize: 12 }} />
                          </div>
                          <div>
                            <label style={{ fontSize: 10, color: B.textMuted, display: "block", marginBottom: 2 }}>Unidad</label>
                            <Select value={cUnit} onChange={setCUnit} options={INSUMO_UNITS_COMPRAS.map(u => ({ value: u, label: u }))} style={{ width: "100%", fontSize: 12 }} />
                          </div>
                          <div>
                            <label style={{ fontSize: 10, color: B.textMuted, display: "block", marginBottom: 2 }}>Zona</label>
                            <Select value={cZone} onChange={setCZone} options={INV_ZONE_OPTS} style={{ width: "100%", fontSize: 12 }} />
                          </div>
                          <div>
                            <label style={{ fontSize: 10, color: B.textMuted, display: "block", marginBottom: 2 }}>Stock mín.</label>
                            <input type="number" min={0} value={cMin} onChange={e => setCMin(e.target.value)} style={{ width: "100%", padding: "6px 8px", border: `1px solid ${B.border}`, borderRadius: 6, fontSize: 12, fontFamily: font }} />
                          </div>
                        </div>
                        <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                          <Btn variant="primary" style={{ fontSize: 11, padding: "5px 12px" }} onClick={() => applyCreate(row.id)}>Crear y mapear</Btn>
                          <Btn variant="ghost" style={{ fontSize: 11, padding: "5px 10px" }} onClick={() => setCreateRowId(null)}>Cancelar</Btn>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
                <td style={{ padding: "10px 12px", verticalAlign: "top", background: rowBg }}>{row.qty}</td>
                <td style={{ padding: "10px 12px", verticalAlign: "top", background: rowBg }}>{row.price}</td>
                <td style={{ padding: "10px 12px", fontWeight: 600, verticalAlign: "top", background: rowBg }}>{row.total}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// P1: ÓRDENES DE COMPRA
// ══════════════════════════════════════════════════════
function OrdenesCompra() {
  const [creating, setCreating] = useState(false);
  const suggestedItems = [
    { name: "Queso mozzarella", stock: 0, min: 10, weeklyUse: 25, unit: "kg", lastPrice: 6500, sugQty: 30, supplier: "Distribuidora Lagos" },
    { name: "Pollo entero", stock: 3, min: 15, weeklyUse: 30, unit: "kg", lastPrice: 3800, sugQty: 40, supplier: "Carnes del Sur" },
    { name: "Carne molida", stock: 5, min: 20, weeklyUse: 25, unit: "kg", lastPrice: 5200, sugQty: 30, supplier: "Carnes del Sur" },
    { name: "Harina", stock: 8, min: 20, weeklyUse: 15, unit: "kg", lastPrice: 850, sugQty: 25, supplier: "Distribuidora Lagos" },
    { name: "Pan hamburguesa", stock: 50, min: 100, weeklyUse: 80, unit: "ud", lastPrice: 250, sugQty: 150, supplier: "Distribuidora Lagos" },
  ];

  if (creating) {
    const supplierItems = suggestedItems.filter(i => i.supplier === "Distribuidora Lagos");
    return (
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <Btn variant="ghost" onClick={() => setCreating(false)}>← Volver</Btn>
          <h3 style={{ fontSize: 16, fontWeight: 700 }}>Nueva OC — Distribuidora Lagos</h3>
        </div>

        {/* Suggestion banner */}
        <Card style={{ background: `${B.accent}08`, border: `1px solid ${B.accent}30`, marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
            <span style={{ fontSize: 18 }}>💡</span>
            <span style={{ color: B.text, fontWeight: 600 }}>Sugerencia automática:</span>
            <span style={{ color: B.textMuted }}>{supplierItems.length} items de este proveedor están bajo mínimo. Pre-cargados abajo.</span>
          </div>
        </Card>

        <Card style={{ padding: 0, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: font }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${B.border}`, background: "#FAFAF8" }}>
                {["Item", "Stock actual", "Mín.", "Consumo/sem", "Últ. precio", "Cantidad", "Subtotal", ""].map(h =>
                  <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontWeight: 600, color: B.textMuted, fontSize: 12 }}>{h}</th>
                )}
              </tr>
            </thead>
            <tbody>
              {supplierItems.map((item, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${B.border}` }}>
                  <td style={{ padding: "10px 12px", fontWeight: 600 }}>{item.name}</td>
                  <td style={{ padding: "10px 12px", color: item.stock === 0 ? B.danger : B.warning, fontWeight: 600 }}>{item.stock} {item.unit}</td>
                  <td style={{ padding: "10px 12px", color: B.textMuted }}>{item.min}</td>
                  <td style={{ padding: "10px 12px", color: B.textMuted }}>{item.weeklyUse} {item.unit}</td>
                  <td style={{ padding: "10px 12px", color: B.textMuted }}>${item.lastPrice.toLocaleString()}</td>
                  <td style={{ padding: "10px 12px" }}>
                    <input type="number" defaultValue={item.sugQty} style={{ width: 70, padding: "6px 8px", border: `1px solid ${B.border}`, borderRadius: 6, fontSize: 14, fontWeight: 700, fontFamily: font, textAlign: "center" }} />
                    <span style={{ fontSize: 11, color: B.textMuted, marginLeft: 4 }}>{item.unit}</span>
                  </td>
                  <td style={{ padding: "10px 12px", fontWeight: 600 }}>${(item.sugQty * item.lastPrice).toLocaleString()}</td>
                  <td style={{ padding: "10px 12px" }}><Btn variant="ghost" style={{ color: B.danger, padding: 4, fontSize: 14 }}>✕</Btn></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ padding: "12px 16px", borderTop: `1px solid ${B.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Btn>+ Agregar item</Btn>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 12, color: B.textMuted }}>Total estimado</div>
                <div style={{ fontSize: 20, fontWeight: 800 }}>${(supplierItems.reduce((s, i) => s + i.sugQty * i.lastPrice, 0)).toLocaleString()}</div>
              </div>
              <Btn variant="primary" style={{ padding: "10px 20px" }}>📤 Enviar OC</Btn>
            </div>
          </div>
        </Card>

        <Card style={{ marginTop: 12 }}>
          <div style={{ fontSize: 13, color: B.textMuted }}>
            <span style={{ fontWeight: 600 }}>Fecha entrega esperada:</span> 06/04/2026 ·
            <span style={{ fontWeight: 600, marginLeft: 8 }}>Forma de envío:</span> Genera PDF descargable para WhatsApp/email
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div>
      {/* Alert: items to order */}
      {suggestedItems.length > 0 && (
        <Card style={{ background: B.warningBg, border: `1px solid ${B.warning}25`, marginBottom: 14, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
            <span style={{ fontSize: 18 }}>⚠️</span>
            <span style={{ fontWeight: 600, color: B.text }}>{suggestedItems.length} items bajo mínimo</span>
            <span style={{ color: B.textMuted }}>necesitan reposición</span>
          </div>
          <Btn variant="primary" onClick={() => setCreating(true)}>Crear OC</Btn>
        </Card>
      )}

      {/* OC list */}
      <Card style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${B.border}` }}>
          <h3 style={{ fontSize: 14, fontWeight: 700 }}>Órdenes de compra</h3>
          <Btn variant="primary" onClick={() => setCreating(true)}>+ Nueva OC</Btn>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: font }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${B.border}`, background: "#FAFAF8" }}>
              {["OC #", "Proveedor", "Fecha", "Entrega", "Items", "Total", "Estado"].map(h =>
                <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontWeight: 600, color: B.textMuted, fontSize: 12 }}>{h}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {OC_LIST.map(oc => {
              const st = STATUS_MAP[oc.status] || STATUS_MAP.borrador;
              return (
                <tr key={oc.id} style={{ borderBottom: `1px solid ${B.border}`, cursor: "pointer" }}
                  onMouseEnter={e => e.currentTarget.style.background = B.surfaceHover}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <td style={{ padding: "10px 14px", fontWeight: 700, color: B.info }}>{oc.id}</td>
                  <td style={{ padding: "10px 14px", fontWeight: 600 }}>{oc.supplier}</td>
                  <td style={{ padding: "10px 14px", color: B.textMuted }}>{oc.date}</td>
                  <td style={{ padding: "10px 14px", color: B.textMuted }}>{oc.deliveryDate}</td>
                  <td style={{ padding: "10px 14px", color: B.textMuted }}>{oc.items}</td>
                  <td style={{ padding: "10px 14px", fontWeight: 600 }}>${oc.total.toLocaleString()}</td>
                  <td style={{ padding: "10px 14px" }}><Badge color={st.color} bg={st.bg}>{st.label}</Badge></td>
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
// P2: INGRESO DE FACTURAS (3 niveles)
// ══════════════════════════════════════════════════════
function FacturasIngreso() {
  const [mode, setMode] = useState(null);
  const [pdfLines, setPdfLines] = useState(createDemoFacturaLines);
  const [siiLines, setSiiLines] = useState(createDemoFacturaLines);
  const [manualLines, setManualLines] = useState(createDemoFacturaLines);
  const pendingCount = INVOICES.filter(i => i.status === "por_recepcionar").length;

  if (mode === "sii") {
    return (
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <Btn variant="ghost" onClick={() => setMode(null)}>← Volver</Btn>
          <h3 style={{ fontSize: 16, fontWeight: 700 }}>🔄 Factura importada desde SII — revisión de líneas</h3>
        </div>
        <Card>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 12 }}>
            <div><label style={{ fontSize: 11, color: B.textMuted }}>Proveedor</label><div style={{ fontSize: 13, fontWeight: 600, padding: "6px 0" }}>Distribuidora Lagos</div></div>
            <div><label style={{ fontSize: 11, color: B.textMuted }}>RUT</label><div style={{ fontSize: 13, fontWeight: 600, padding: "6px 0" }}>76.543.210-1</div></div>
            <div><label style={{ fontSize: 11, color: B.textMuted }}>Folio</label><div style={{ fontSize: 13, fontWeight: 600, padding: "6px 0" }}>4521</div></div>
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: B.textMuted, marginBottom: 8 }}>Líneas de la factura (mapeo a insumos)</div>
          <InvoiceLinesWithMapping lines={siiLines} setLines={setSiiLines} />
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 14 }}>
            <Btn variant="ghost">Descartar</Btn>
            <Btn variant="primary">Confirmar factura</Btn>
          </div>
        </Card>
      </div>
    );
  }

  if (mode === "pdf") {
    return (
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <Btn variant="ghost" onClick={() => setMode(null)}>← Volver</Btn>
          <h3 style={{ fontSize: 16, fontWeight: 700 }}>🤖 Ingresar factura con PDF + IA</h3>
        </div>
        <Card>
          <div style={{ border: `2px dashed ${B.accent}`, borderRadius: 12, padding: "40px 20px", textAlign: "center", marginBottom: 16, cursor: "pointer", background: `${B.accent}05` }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>📄</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: B.text }}>Arrastra el PDF de la factura aquí</div>
            <div style={{ fontSize: 12, color: B.textMuted, marginTop: 4 }}>o haz click para seleccionar archivo</div>
          </div>
          <Card style={{ background: B.infoBg, border: `1px solid ${B.info}20` }}>
            <div style={{ fontSize: 13, color: B.text }}>
              <span style={{ fontWeight: 600 }}>¿Cómo funciona?</span> Claude API analiza el PDF y extrae automáticamente: proveedor, RUT, folio, líneas con cantidades y precios. Tú revisas, corriges si es necesario, y confirmas.
            </div>
          </Card>
          {/* Simulated extracted data */}
          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: B.textMuted, marginBottom: 8 }}>Vista previa extraída por IA:</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 12 }}>
              <div><label style={{ fontSize: 11, color: B.textMuted }}>Proveedor</label><div style={{ fontSize: 13, fontWeight: 600, padding: "6px 0" }}>Distribuidora Lagos</div></div>
              <div><label style={{ fontSize: 11, color: B.textMuted }}>RUT</label><div style={{ fontSize: 13, fontWeight: 600, padding: "6px 0" }}>76.543.210-1</div></div>
              <div><label style={{ fontSize: 11, color: B.textMuted }}>Folio</label><div style={{ fontSize: 13, fontWeight: 600, padding: "6px 0" }}>4522</div></div>
            </div>
            <InvoiceLinesWithMapping lines={pdfLines} setLines={setPdfLines} />
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 14 }}>
              <Btn variant="ghost">Descartar</Btn>
              <Btn variant="primary">Confirmar factura</Btn>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (mode === "manual") {
    return (
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <Btn variant="ghost" onClick={() => setMode(null)}>← Volver</Btn>
          <h3 style={{ fontSize: 16, fontWeight: 700 }}>✏️ Ingreso manual de factura</h3>
        </div>
        <Card>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, marginBottom: 16 }}>
            {[
              { label: "Proveedor", type: "select" },
              { label: "Folio", type: "text", placeholder: "Ej: 4522" },
              { label: "Fecha factura", type: "date" },
              { label: "Fecha vencimiento", type: "date" },
            ].map(f => (
              <div key={f.label}>
                <label style={{ fontSize: 12, fontWeight: 600, color: B.textMuted, display: "block", marginBottom: 4 }}>{f.label}</label>
                {f.type === "select"
                  ? <Select value="" onChange={() => { }} options={[{ value: "", label: "Seleccionar..." }, ...SUPPLIERS.map(s => ({ value: s.id, label: s.name }))]} style={{ width: "100%" }} />
                  : <input type={f.type} placeholder={f.placeholder} style={{ width: "100%", padding: "8px 12px", border: `1px solid ${B.border}`, borderRadius: 8, fontSize: 13, fontFamily: font }} />
                }
              </div>
            ))}
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Líneas de la factura (mapeo a insumos)</div>
          <InvoiceLinesWithMapping lines={manualLines} setLines={setManualLines} />
          <Btn style={{ marginTop: 12 }}>+ Agregar línea</Btn>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 16 }}>
            <Btn variant="ghost">Cancelar</Btn>
            <Btn variant="primary">Guardar factura</Btn>
          </div>
        </Card>
      </div>
    );
  }

  // Main view: invoice list + entry methods
  return (
    <div>
      {/* 3 entry methods */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
        {[
          { icon: "🔄", title: "SII Automático", desc: "Facturas se importan automáticamente desde el SII", action: "Ver ejemplo líneas", color: B.success, onClick: () => setMode("sii") },
          { icon: "🤖", title: "PDF + IA", desc: "Sube el PDF y Claude extrae los datos", action: "Subir PDF", color: B.info, onClick: () => setMode("pdf") },
          { icon: "✏️", title: "Manual", desc: "Tipea los datos de la factura", action: "Ingresar", color: B.textMuted, onClick: () => setMode("manual") },
        ].map((m, i) => (
          <Card key={i} style={{ cursor: "pointer", transition: "border-color 0.12s" }}
            onClick={m.onClick}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 22 }}>{m.icon}</span>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", color: m.color }}>Plan {["A", "B", "C"][i]}</div>
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: B.text }}>{m.title}</div>
            <div style={{ fontSize: 12, color: B.textMuted, marginTop: 2, marginBottom: 10 }}>{m.desc}</div>
            <Btn variant={i === 0 ? "success" : "default"} style={{ fontSize: 12, width: "100%" }}>{m.action}</Btn>
          </Card>
        ))}
      </div>

      {/* Invoices table */}
      <Card style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${B.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700 }}>Facturas</h3>
            {pendingCount > 0 && <Badge color={B.warning} bg={B.warningBg}>{pendingCount} por recepcionar</Badge>}
          </div>
          <SearchInput value="" onChange={() => { }} placeholder="Buscar folio, proveedor..." />
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: font }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${B.border}`, background: "#FAFAF8" }}>
              {["Folio", "Proveedor", "Fecha", "Origen", "Items", "Total", "Vence", "Estado"].map(h =>
                <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontWeight: 600, color: B.textMuted, fontSize: 12 }}>{h}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {INVOICES.map(inv => {
              const src = SOURCE_LABELS[inv.source];
              const st = STATUS_MAP[inv.status];
              return (
                <tr key={inv.id} style={{ borderBottom: `1px solid ${B.border}`, cursor: "pointer" }}
                  onMouseEnter={e => e.currentTarget.style.background = B.surfaceHover}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <td style={{ padding: "10px 14px", fontWeight: 700 }}>#{inv.folio}</td>
                  <td style={{ padding: "10px 14px", fontWeight: 600 }}>{inv.supplier}</td>
                  <td style={{ padding: "10px 14px", color: B.textMuted }}>{inv.date}</td>
                  <td style={{ padding: "10px 14px" }}><Badge color={src.color} bg={src.bg}>{src.icon} {src.label}</Badge></td>
                  <td style={{ padding: "10px 14px", color: B.textMuted }}>{inv.items}</td>
                  <td style={{ padding: "10px 14px", fontWeight: 600 }}>${inv.total.toLocaleString()}</td>
                  <td style={{ padding: "10px 14px", color: B.textMuted }}>{inv.dueDate}</td>
                  <td style={{ padding: "10px 14px" }}><Badge color={st.color} bg={st.bg}>{st.label}</Badge></td>
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
// P3: RECEPCIÓN CON CHECKLIST
// ══════════════════════════════════════════════════════
function RecepcionView() {
  const [selected, setSelected] = useState(null);
  const pending = INVOICES.filter(i => i.status === "por_recepcionar");

  const checklistItems = [
    { name: "Queso mozzarella", expected: 30, unit: "kg", zone: "frio" },
    { name: "Harina", expected: 25, unit: "kg", zone: "seca" },
    { name: "Pan hamburguesa", expected: 150, unit: "ud", zone: "seca" },
    { name: "Aceite vegetal", expected: 20, unit: "lt", zone: "seca" },
  ];

  if (selected) {
    return (
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <Btn variant="ghost" onClick={() => setSelected(null)}>← Volver</Btn>
          <h3 style={{ fontSize: 16, fontWeight: 700 }}>Recepción — Factura #{selected.folio}</h3>
          <Badge color={SOURCE_LABELS[selected.source].color} bg={SOURCE_LABELS[selected.source].bg}>{SOURCE_LABELS[selected.source].label}</Badge>
        </div>

        <Card style={{ background: B.infoBg, border: `1px solid ${B.info}20`, marginBottom: 14 }}>
          <div style={{ fontSize: 13 }}>
            <span style={{ fontWeight: 600 }}>Proveedor:</span> {selected.supplier} · <span style={{ fontWeight: 600 }}>Total factura:</span> ${selected.total.toLocaleString()} · <span style={{ fontWeight: 600 }}>{selected.items} items</span>
          </div>
        </Card>

        <Card style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "10px 16px", background: "#FAFAF8", borderBottom: `1px solid ${B.border}`, fontSize: 12, fontWeight: 600, color: B.textMuted }}>
            Checklist de recepción — marcar cada item
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: font }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${B.border}` }}>
                {["Item", "Esperado", "Zona destino", "Estado", "Qty recibida", "Observación"].map(h =>
                  <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontWeight: 600, color: B.textMuted, fontSize: 12 }}>{h}</th>
                )}
              </tr>
            </thead>
            <tbody>
              {checklistItems.map((item, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${B.border}` }}>
                  <td style={{ padding: "10px 12px", fontWeight: 600 }}>{item.name}</td>
                  <td style={{ padding: "10px 12px", color: B.textMuted }}>{item.expected} {item.unit}</td>
                  <td style={{ padding: "10px 12px" }}>
                    <Select value={item.zone} onChange={() => { }} options={[
                      { value: "seca", label: "🏭 Bodega seca" }, { value: "frio", label: "❄️ Cámara frío" },
                    ]} />
                  </td>
                  <td style={{ padding: "10px 12px" }}>
                    <div style={{ display: "flex", gap: 4 }}>
                      {[
                        { label: "✓", title: "Conforme", color: B.success },
                        { label: "½", title: "Parcial", color: B.warning },
                        { label: "✗", title: "No llegó", color: B.danger },
                      ].map((s, si) => (
                        <button key={si} title={s.title} style={{
                          width: 30, height: 30, borderRadius: 6,
                          border: si === 0 ? `2px solid ${s.color}` : `1px solid ${B.border}`,
                          background: si === 0 ? `${s.color}15` : "transparent",
                          cursor: "pointer", fontSize: 13, fontWeight: 700, color: s.color,
                        }}>{s.label}</button>
                      ))}
                    </div>
                  </td>
                  <td style={{ padding: "10px 12px" }}>
                    <input type="number" defaultValue={item.expected} style={{ width: 70, padding: "6px 8px", border: `1px solid ${B.border}`, borderRadius: 6, fontSize: 13, fontFamily: font, textAlign: "center" }} />
                  </td>
                  <td style={{ padding: "10px 12px" }}>
                    <input placeholder="Motivo / nota" style={{ width: "100%", padding: "6px 8px", border: `1px solid ${B.border}`, borderRadius: 6, fontSize: 12, fontFamily: font }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ padding: "12px 16px", borderTop: `1px solid ${B.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Btn>+ Agregar línea extra (no facturado)</Btn>
            <div style={{ display: "flex", gap: 8 }}>
              <Btn variant="ghost">Cancelar</Btn>
              <Btn variant="primary">Confirmar recepción</Btn>
            </div>
          </div>
        </Card>

        <div style={{ fontSize: 12, color: B.textMuted, marginTop: 10 }}>
          Al confirmar: stock sube en zona asignada, supply_movements registrado, costo promedio ponderado se recalcula.
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ fontSize: 13, color: B.textMuted, marginBottom: 14 }}>{pending.length} facturas pendientes de recepción</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {pending.length === 0 ? (
          <Card style={{ textAlign: "center", padding: "40px", color: B.textMuted }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>✅</div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Todo recepcionado</div>
            <div style={{ fontSize: 13, marginTop: 4 }}>No hay facturas pendientes de recepción</div>
          </Card>
        ) : (
          pending.map(inv => (
            <Card key={inv.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }} onClick={() => setSelected(inv)}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: B.warning }} />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 650 }}>Factura #{inv.folio} — {inv.supplier}</div>
                  <div style={{ fontSize: 12, color: B.textMuted }}>{inv.items} items · ${inv.total.toLocaleString()} · {inv.date}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <Badge color={SOURCE_LABELS[inv.source].color} bg={SOURCE_LABELS[inv.source].bg}>{SOURCE_LABELS[inv.source].icon} {SOURCE_LABELS[inv.source].label}</Badge>
                <Btn variant="primary" style={{ fontSize: 12 }}>Recepcionar</Btn>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Exception: receipt without invoice */}
      <Card style={{ marginTop: 16, border: `1px dashed ${B.border}` }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: B.text }}>¿Llegó mercadería sin factura?</div>
            <div style={{ fontSize: 12, color: B.textMuted }}>Registra la recepción con costos estimados. Cuando la factura aparezca, se vincula automáticamente.</div>
          </div>
          <Btn>Recepción sin factura</Btn>
        </div>
      </Card>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// P5: PROVEEDORES
// ══════════════════════════════════════════════════════
function ProveedoresView() {
  const [selected, setSelected] = useState(null);

  if (selected) {
    const s = selected;
    return (
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <Btn variant="ghost" onClick={() => setSelected(null)}>← Volver</Btn>
          <h3 style={{ fontSize: 16, fontWeight: 700 }}>{s.name}</h3>
          <Badge color={B.success} bg={B.successBg}>{s.status}</Badge>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
          <Card>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: B.textMuted, marginBottom: 10 }}>Datos</h4>
            {[["RUT", s.rut], ["Contacto", s.contact], ["Teléfono", s.phone], ["Crédito", s.creditDays > 0 ? `${s.creditDays} días` : "Contado"]].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid ${B.border}`, fontSize: 13 }}>
                <span style={{ color: B.textMuted }}>{k}</span>
                <span style={{ fontWeight: 600 }}>{v}</span>
              </div>
            ))}
          </Card>
          <Card>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: B.textMuted, marginBottom: 10 }}>Evaluación</h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
              {[
                { label: "OC este mes", value: s.ocCount },
                { label: "% completo", value: `${s.completeness}%`, color: s.completeness >= 90 ? B.success : B.warning },
                { label: "% a tiempo", value: `${s.onTime}%`, color: s.onTime >= 90 ? B.success : B.warning },
              ].map(m => (
                <div key={m.label} style={{ textAlign: "center", padding: 10, background: B.surfaceHover, borderRadius: 8 }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: m.color || B.text }}>{m.value}</div>
                  <div style={{ fontSize: 11, color: B.textMuted }}>{m.label}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <h4 style={{ fontSize: 13, fontWeight: 700 }}>Productos vinculados (mapeo de glosas)</h4>
            <Btn style={{ fontSize: 12 }}>+ Vincular producto</Btn>
          </div>
          <div style={{ fontSize: 12, color: B.textMuted, marginBottom: 8 }}>Primera vez se mapea manual. Después el sistema auto-matchea por glosa.</div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: font }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${B.border}`, background: "#FAFAF8" }}>
                {["Supply", "Glosa del proveedor", "Unidad compra", "Últ. precio", "Auto-match"].map(h =>
                  <th key={h} style={{ padding: "8px 12px", textAlign: "left", fontSize: 12, color: B.textMuted, fontWeight: 600 }}>{h}</th>
                )}
              </tr>
            </thead>
            <tbody>
              {[
                { supply: "Queso mozzarella", glosa: "QUESILLO MOZZ. 5KG", unit: "Bolsa 5kg", price: "$32.500", auto: true },
                { supply: "Harina", glosa: "HARINA SELECTA 25K", unit: "Saco 25kg", price: "$21.250", auto: true },
                { supply: "Aceite vegetal", glosa: "ACEITE VEG CHEF 20L", unit: "Bidón 20lt", price: "$44.000", auto: false },
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${B.border}` }}>
                  <td style={{ padding: "8px 12px", fontWeight: 600 }}>{row.supply}</td>
                  <td style={{ padding: "8px 12px", fontStyle: "italic", color: B.textMuted }}>{row.glosa}</td>
                  <td style={{ padding: "8px 12px" }}>{row.unit}</td>
                  <td style={{ padding: "8px 12px" }}>{row.price}</td>
                  <td style={{ padding: "8px 12px" }}>{row.auto ? <Badge color={B.success} bg={B.successBg}>Auto</Badge> : <Badge>Manual</Badge>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
        <SearchInput value="" onChange={() => { }} placeholder="Buscar proveedor..." />
        <Btn variant="primary">+ Nuevo proveedor</Btn>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {SUPPLIERS.map(s => (
          <Card key={s.id} style={{ cursor: "pointer", transition: "border-color 0.12s" }} onClick={() => setSelected(s)}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700 }}>{s.name}</div>
                <div style={{ fontSize: 12, color: B.textMuted }}>{s.rut} · {s.contact}</div>
              </div>
              <Badge color={B.success} bg={B.successBg}>{s.status}</Badge>
            </div>
            <div style={{ display: "flex", gap: 12, fontSize: 12 }}>
              <span style={{ color: B.textMuted }}><span style={{ fontWeight: 600 }}>{s.ocCount}</span> OC</span>
              <span style={{ color: s.completeness >= 90 ? B.success : B.warning }}>{s.completeness}% completo</span>
              <span style={{ color: s.onTime >= 90 ? B.success : B.warning }}>{s.onTime}% a tiempo</span>
              <span style={{ color: B.textMuted }}>{s.creditDays > 0 ? `${s.creditDays}d crédito` : "Contado"}</span>
            </div>
          </Card>
        ))}
      </div>
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
        <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>📊 Gasto por proveedor</h4>
        {SUPPLIERS.map((s, i) => {
          const amounts = [485000, 320000, 125000, 89000];
          const max = 485000;
          return (
            <div key={s.id} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 3 }}>
                <span style={{ fontWeight: 600 }}>{s.name}</span>
                <span style={{ fontWeight: 700 }}>${amounts[i].toLocaleString()}</span>
              </div>
              <div style={{ height: 8, background: B.surfaceHover, borderRadius: 4, overflow: "hidden" }}>
                <div style={{ width: `${(amounts[i] / max) * 100}%`, height: "100%", background: B.accent, borderRadius: 4, transition: "width 0.3s" }} />
              </div>
            </div>
          );
        })}
      </Card>

      <Card>
        <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>📈 Evolución precio — Top items</h4>
        {[
          { name: "Queso mozzarella", prices: [6200, 6350, 6500], trend: "+4.8%" },
          { name: "Pollo entero", prices: [3500, 3600, 3800], trend: "+8.6%" },
          { name: "Carne molida", prices: [5000, 5100, 5200], trend: "+4.0%" },
        ].map(item => (
          <div key={item.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: `1px solid ${B.border}` }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>{item.name}</span>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 12, color: B.textMuted }}>{item.prices.map(p => `$${p.toLocaleString()}`).join(" → ")}</span>
              <Badge color={B.danger} bg={B.dangerBg}>↑ {item.trend}</Badge>
            </div>
          </div>
        ))}
      </Card>

      <Card>
        <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>📋 OC pendientes de recepción</h4>
        {OC_LIST.filter(o => o.status === "enviada").map(oc => (
          <div key={oc.id} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${B.border}`, fontSize: 13 }}>
            <div>
              <span style={{ fontWeight: 700, color: B.info }}>{oc.id}</span>
              <span style={{ color: B.textMuted, marginLeft: 8 }}>{oc.supplier}</span>
            </div>
            <div>
              <span style={{ color: B.textMuted }}>Entrega: {oc.deliveryDate}</span>
              <span style={{ fontWeight: 600, marginLeft: 12 }}>${oc.total.toLocaleString()}</span>
            </div>
          </div>
        ))}
        {OC_LIST.filter(o => o.status === "enviada").length === 0 && (
          <div style={{ textAlign: "center", color: B.textMuted, padding: 20, fontSize: 13 }}>Todas las OC recibidas ✅</div>
        )}
      </Card>

      <Card>
        <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>🔄 Comparativa precios entre proveedores</h4>
        <div style={{ fontSize: 12, color: B.textMuted, marginBottom: 8 }}>Productos disponibles en más de un proveedor</div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: font }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${B.border}` }}>
              {["Item", "Proveedor 1", "Proveedor 2", "Δ"].map(h =>
                <th key={h} style={{ padding: "6px 8px", textAlign: "left", color: B.textMuted, fontWeight: 600 }}>{h}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {[
              { item: "Aceite vegetal", p1: "Lagos $2.200/lt", p2: "Don Pedro $2.350/lt", delta: "-6.4%", better: 1 },
              { item: "Cebolla", p1: "Don Pedro $800/kg", p2: "Lagos $850/kg", delta: "-5.9%", better: 1 },
            ].map((r, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${B.border}` }}>
                <td style={{ padding: "6px 8px", fontWeight: 600 }}>{r.item}</td>
                <td style={{ padding: "6px 8px", background: r.better === 1 ? B.successBg : "transparent" }}>{r.p1}</td>
                <td style={{ padding: "6px 8px", background: r.better === 2 ? B.successBg : "transparent" }}>{r.p2}</td>
                <td style={{ padding: "6px 8px" }}><Badge color={B.success} bg={B.successBg}>{r.delta}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// MAIN
// ══════════════════════════════════════════════════════
export default function ComprasModule() {
  const [tab, setTab] = useState("oc");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function check() { setIsMobile(window.innerWidth < 900); }
    check(); window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const pendingInvoices = INVOICES.filter(i => i.status === "por_recepcionar").length;

  const TABS = [
    { id: "oc", label: "Órdenes de compra", icon: "📤" },
    { id: "facturas", label: "Facturas", icon: "🧾", badge: pendingInvoices > 0 ? pendingInvoices : null, badgeBg: B.warningBg, badgeColor: B.warning },
    { id: "recepcion", label: "Recepción", icon: "📥", badge: pendingInvoices > 0 ? pendingInvoices : null },
    { id: "proveedores", label: "Proveedores", icon: "🏢" },
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

      {/* Header */}
      <header style={{ background: B.surface, borderBottom: `1px solid ${B.border}`, position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ padding: "0 24px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, background: B.accent, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 16, color: B.primary, fontFamily: serif }}>C</div>
            <div style={{ lineHeight: 1.1 }}>
              <div style={{ fontFamily: serif, fontSize: 14, fontWeight: 700, color: B.text }}>Cheddar's</div>
              <div style={{ fontSize: 9, color: B.textMuted, fontWeight: 500, letterSpacing: 1.5, textTransform: "uppercase" }}>West Coast</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 16, cursor: "pointer" }}>🔔</span>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: B.accent, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 12, color: B.primary }}>PF</div>
          </div>
        </div>
        {!isMobile && (
          <div style={{ padding: "0 24px", display: "flex", gap: 2, borderTop: `1px solid ${B.border}`, height: 40, alignItems: "center" }}>
            {["Dashboard", "Inventario", "Compras", "Pedidos", "Despacho", "Producción", "Calidad", "Finanzas", "Catálogo", "Más"].map(n => (
              <span key={n} style={{ padding: "6px 11px", fontSize: 13, fontWeight: n === "Compras" ? 650 : 500, color: n === "Compras" ? B.text : B.textMuted, borderBottom: n === "Compras" ? `2px solid ${B.accent}` : "2px solid transparent", cursor: "pointer" }}>{n}</span>
            ))}
          </div>
        )}
      </header>

      <main style={{ padding: isMobile ? 16 : "20px 32px", maxWidth: 1320, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <h1 style={{ fontSize: isMobile ? 20 : 24, fontWeight: 800, color: B.text, fontFamily: serif }}>🧾 Compras</h1>
            <p style={{ fontSize: 13, color: B.textMuted, marginTop: 2 }}>{SUPPLIERS.length} proveedores · {pendingInvoices} recepciones pendientes</p>
          </div>
        </div>

        <TabBar tabs={TABS} active={tab} onChange={setTab} />

        {tab === "oc" && <OrdenesCompra />}
        {tab === "facturas" && <FacturasIngreso />}
        {tab === "recepcion" && <RecepcionView />}
        {tab === "proveedores" && <ProveedoresView />}
        {tab === "reportes" && <ReportesView />}
      </main>
    </div>
  );
}
