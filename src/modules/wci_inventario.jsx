import { useState, useEffect } from "react";

const B = {
  primary: "#1A1A1A", accent: "#F5C518", accentHover: "#E0B315",
  surface: "#FFFFFF", surfaceHover: "#F8F8F6", border: "#E8E6E1",
  text: "#1A1A1A", textMuted: "#7A7770", textLight: "#AEABA4",
  danger: "#DC3545", dangerBg: "#DC354512", success: "#28A745", successBg: "#28A74512",
  warning: "#E67E00", warningBg: "#E67E0012", infoBg: "#2E86DE10",
};

const font = "'DM Sans', system-ui, sans-serif";
const serif = "'DM Serif Display', Georgia, serif";

// ── Shared Components ──
function Badge({ children, color = B.textMuted, bg = B.surfaceHover }) {
  return <span style={{ fontSize: 11, fontWeight: 650, color, background: bg, padding: "2px 8px", borderRadius: 10, whiteSpace: "nowrap" }}>{children}</span>;
}

function StatusBadge({ status }) {
  const map = {
    ok: { label: "OK", color: B.success, bg: B.successBg },
    bajo: { label: "Bajo", color: B.warning, bg: B.warningBg },
    critico: { label: "Crítico", color: B.danger, bg: B.dangerBg },
    sin_stock: { label: "Sin stock", color: B.danger, bg: B.dangerBg },
  };
  const s = map[status] || map.ok;
  return <Badge color={s.color} bg={s.bg}>{s.label}</Badge>;
}

function Btn({ children, variant = "default", onClick, style: sx = {}, disabled }) {
  const styles = {
    primary: { background: B.accent, color: B.primary, border: "none", fontWeight: 700 },
    danger: { background: B.dangerBg, color: B.danger, border: `1px solid ${B.danger}30`, fontWeight: 600 },
    default: { background: B.surface, color: B.text, border: `1px solid ${B.border}`, fontWeight: 600 },
    ghost: { background: "transparent", color: B.textMuted, border: "none", fontWeight: 600 },
  };
  return (
    <button onClick={onClick} disabled={disabled} style={{
      padding: "7px 14px", borderRadius: 8, fontSize: 13, cursor: disabled ? "not-allowed" : "pointer",
      fontFamily: font, transition: "all 0.12s", opacity: disabled ? 0.5 : 1,
      ...styles[variant], ...sx,
    }}>{children}</button>
  );
}

function Card({ children, style: sx = {} }) {
  return <div style={{ background: B.surface, border: `1px solid ${B.border}`, borderRadius: 12, padding: "16px 20px", ...sx }}>{children}</div>;
}

function TabBar({ tabs, active, onChange }) {
  return (
    <div style={{ display: "flex", gap: 2, borderBottom: `1px solid ${B.border}`, marginBottom: 20, overflowX: "auto", flexShrink: 0 }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => onChange(t.id)} style={{
          padding: "10px 14px", border: "none", background: "transparent",
          fontSize: 13, fontWeight: active === t.id ? 650 : 500,
          color: active === t.id ? B.text : B.textMuted,
          borderBottom: active === t.id ? `2px solid ${B.accent}` : "2px solid transparent",
          cursor: "pointer", fontFamily: font, whiteSpace: "nowrap",
          transition: "all 0.12s",
        }}>
          {t.icon && <span style={{ marginRight: 6 }}>{t.icon}</span>}
          {t.label}
          {t.badge != null && <span style={{
            marginLeft: 6, fontSize: 10, fontWeight: 700,
            background: t.badgeColor || B.dangerBg, color: t.badgeTextColor || B.danger,
            padding: "1px 6px", borderRadius: 8,
          }}>{t.badge}</span>}
        </button>
      ))}
    </div>
  );
}

function SearchInput({ value, onChange, placeholder }) {
  return (
    <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={{
      padding: "8px 12px", border: `1px solid ${B.border}`, borderRadius: 8,
      fontSize: 13, fontFamily: font, outline: "none", width: "100%", maxWidth: 280,
      transition: "border 0.15s", background: B.surface,
    }} onFocus={e => e.target.style.borderColor = B.accent} onBlur={e => e.target.style.borderColor = B.border} />
  );
}

function Select({ value, onChange, options, style: sx = {} }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)} style={{
      padding: "8px 12px", border: `1px solid ${B.border}`, borderRadius: 8,
      fontSize: 13, fontFamily: font, background: B.surface, outline: "none",
      cursor: "pointer", ...sx,
    }}>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}

// ── Mock Data ──
const ZONES = [
  { id: "seca", name: "Bodega seca", icon: "🏭" },
  { id: "frio", name: "Cámara frío", icon: "❄️" },
  { id: "cocina", name: "Cocina producción", icon: "🍳" },
];

const CATEGORIES = ["Todas", "Carnes", "Lácteos", "Secos", "Verduras", "Salsas", "Bebidas", "Envases", "Desechables", "Limpieza"];

const STOCK_DATA = [
  { id: 1, name: "Queso mozzarella", category: "Lácteos", zone: "frio", qty: 0, unit: "kg", min: 10, cost: 6500, weeklyUse: 25, status: "sin_stock" },
  { id: 2, name: "Harina", category: "Secos", zone: "seca", qty: 8, unit: "kg", min: 20, cost: 850, weeklyUse: 15, status: "bajo" },
  { id: 3, name: "Aceite vegetal", category: "Secos", zone: "seca", qty: 45, unit: "lt", min: 10, cost: 2200, weeklyUse: 8, status: "ok" },
  { id: 4, name: "Pollo entero", category: "Carnes", zone: "frio", qty: 3, unit: "kg", min: 15, cost: 3800, weeklyUse: 30, status: "critico" },
  { id: 5, name: "Tomate", category: "Verduras", zone: "frio", qty: 12, unit: "kg", min: 8, cost: 1500, weeklyUse: 10, status: "ok" },
  { id: 6, name: "Salsa BBQ WCI", category: "Salsas", zone: "cocina", qty: 6, unit: "lt", min: 5, cost: 4200, weeklyUse: 4, status: "ok" },
  { id: 7, name: "Cebolla", category: "Verduras", zone: "seca", qty: 20, unit: "kg", min: 10, cost: 800, weeklyUse: 12, status: "ok" },
  { id: 8, name: "Pan hamburguesa", category: "Secos", zone: "seca", qty: 50, unit: "ud", min: 100, cost: 250, weeklyUse: 80, status: "bajo" },
  { id: 9, name: "Envase delivery 750ml", category: "Envases", zone: "seca", qty: 200, unit: "ud", min: 150, cost: 180, weeklyUse: 120, status: "ok" },
  { id: 10, name: "Carne molida", category: "Carnes", zone: "frio", qty: 5, unit: "kg", min: 20, cost: 5200, weeklyUse: 25, status: "critico" },
];

const MOVEMENTS = [
  { id: 1, date: "04/04 09:15", item: "Queso mozzarella", qty: -8, type: "venta", user: "Sistema", ref: "Despacho #142", zone: "frio" },
  { id: 2, date: "04/04 08:30", item: "Harina", qty: +50, type: "compra", user: "María", ref: "Factura #4501", zone: "seca" },
  { id: 3, date: "03/04 17:00", item: "Salsa BBQ WCI", qty: +10, type: "produccion", user: "Carmen", ref: "Lote #089", zone: "cocina" },
  { id: 4, date: "03/04 14:20", item: "Pollo entero", qty: -5, type: "transferencia", user: "Jorge", ref: "Frio → Cocina", zone: "frio" },
  { id: 5, date: "03/04 11:00", item: "Carne molida", qty: -2, type: "merma", user: "Jorge", ref: "Contaminación", zone: "frio" },
  { id: 6, date: "03/04 09:00", item: "Pan hamburguesa", qty: -30, type: "venta", user: "Sistema", ref: "Despacho #141", zone: "seca" },
  { id: 7, date: "02/04 16:45", item: "Aceite vegetal", qty: +20, type: "compra", user: "María", ref: "Factura #4498", zone: "seca" },
  { id: 8, date: "02/04 10:00", item: "Tomate", qty: -3, type: "ajuste", user: "Jorge", ref: "Conteo físico", zone: "frio" },
];

const TYPE_COLORS = {
  compra: { color: B.success, label: "Compra" },
  venta: { color: "#2E86DE", label: "Venta" },
  transferencia: { color: "#8E44AD", label: "Transfer." },
  merma: { color: B.danger, label: "Merma" },
  ajuste: { color: B.warning, label: "Ajuste" },
  produccion: { color: "#27AE60", label: "Producción" },
};

// ══════════════════════════════════════════════════════════════
// P1: CONSULTAR STOCK
// ══════════════════════════════════════════════════════════════
function StockView() {
  const [search, setSearch] = useState("");
  const [zone, setZone] = useState("all");
  const [cat, setCat] = useState("Todas");
  const [sort, setSort] = useState("status");
  const [selected, setSelected] = useState(null);

  let items = [...STOCK_DATA];
  if (zone !== "all") items = items.filter(i => i.zone === zone);
  if (cat !== "Todas") items = items.filter(i => i.category === cat);
  if (search) items = items.filter(i => i.name.toLowerCase().includes(search.toLowerCase()));
  if (sort === "status") items.sort((a, b) => {
    const order = { sin_stock: 0, critico: 1, bajo: 2, ok: 3 };
    return order[a.status] - order[b.status];
  });
  if (sort === "name") items.sort((a, b) => a.name.localeCompare(b.name));
  if (sort === "qty") items.sort((a, b) => a.qty - b.qty);

  const alertCount = STOCK_DATA.filter(i => i.status !== "ok").length;

  return (
    <div>
      {/* Zone summary cards */}
      <div style={{ display: "flex", gap: 10, marginBottom: 16, overflowX: "auto" }}>
        <button onClick={() => setZone("all")} style={{
          flex: 1, minWidth: 140, padding: "12px 16px", borderRadius: 10, cursor: "pointer",
          border: zone === "all" ? `2px solid ${B.accent}` : `1px solid ${B.border}`,
          background: zone === "all" ? `${B.accent}08` : B.surface, fontFamily: font, textAlign: "left",
        }}>
          <div style={{ fontSize: 12, color: B.textMuted, fontWeight: 500 }}>Todas las zonas</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: B.text }}>{STOCK_DATA.length}</div>
          <div style={{ fontSize: 11, color: B.textMuted }}>items · {alertCount} alertas</div>
        </button>
        {ZONES.map(z => {
          const zItems = STOCK_DATA.filter(i => i.zone === z.id);
          const zAlerts = zItems.filter(i => i.status !== "ok").length;
          return (
            <button key={z.id} onClick={() => setZone(z.id)} style={{
              flex: 1, minWidth: 140, padding: "12px 16px", borderRadius: 10, cursor: "pointer",
              border: zone === z.id ? `2px solid ${B.accent}` : `1px solid ${B.border}`,
              background: zone === z.id ? `${B.accent}08` : B.surface, fontFamily: font, textAlign: "left",
            }}>
              <div style={{ fontSize: 12, color: B.textMuted, fontWeight: 500 }}>{z.icon} {z.name}</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: B.text }}>{zItems.length}</div>
              <div style={{ fontSize: 11, color: zAlerts > 0 ? B.danger : B.textMuted }}>{zAlerts > 0 ? `${zAlerts} alertas` : "Sin alertas"}</div>
            </button>
          );
        })}
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap", alignItems: "center" }}>
        <SearchInput value={search} onChange={setSearch} placeholder="Buscar item..." />
        <Select value={cat} onChange={setCat} options={CATEGORIES.map(c => ({ value: c, label: c }))} />
        <Select value={sort} onChange={setSort} options={[
          { value: "status", label: "Ordenar: Estado" },
          { value: "name", label: "Ordenar: Nombre" },
          { value: "qty", label: "Ordenar: Cantidad" },
        ]} />
        <div style={{ flex: 1 }} />
        <Btn variant="ghost" style={{ fontSize: 12 }}>📥 Exportar CSV</Btn>
      </div>

      {/* Table */}
      <Card style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: font }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${B.border}`, background: "#FAFAF8" }}>
              {["Item", "Zona", "Cantidad", "Mín.", "Estado", "Consumo/sem", "Costo unit."].map(h => (
                <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontWeight: 600, color: B.textMuted, fontSize: 12 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} onClick={() => setSelected(selected === item.id ? null : item.id)}
                style={{ borderBottom: `1px solid ${B.border}`, cursor: "pointer", background: selected === item.id ? `${B.accent}06` : "transparent", transition: "background 0.1s" }}
                onMouseEnter={e => { if (selected !== item.id) e.currentTarget.style.background = B.surfaceHover; }}
                onMouseLeave={e => { if (selected !== item.id) e.currentTarget.style.background = "transparent"; }}
              >
                <td style={{ padding: "10px 14px", fontWeight: 600, color: B.text }}>{item.name}<br /><span style={{ fontSize: 11, fontWeight: 400, color: B.textMuted }}>{item.category}</span></td>
                <td style={{ padding: "10px 14px", color: B.textMuted }}>{ZONES.find(z => z.id === item.zone)?.icon} {ZONES.find(z => z.id === item.zone)?.name}</td>
                <td style={{ padding: "10px 14px", fontWeight: 700, color: item.qty === 0 ? B.danger : B.text }}>{item.qty} {item.unit}</td>
                <td style={{ padding: "10px 14px", color: B.textMuted }}>{item.min} {item.unit}</td>
                <td style={{ padding: "10px 14px" }}><StatusBadge status={item.status} /></td>
                <td style={{ padding: "10px 14px", color: B.textMuted }}>{item.weeklyUse} {item.unit}</td>
                <td style={{ padding: "10px 14px", color: B.textMuted }}>${item.cost.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Detail panel */}
      {selected && (() => {
        const item = STOCK_DATA.find(i => i.id === selected);
        const daysLeft = item.weeklyUse > 0 ? Math.round((item.qty / item.weeklyUse) * 7) : "∞";
        return (
          <Card style={{ marginTop: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: B.text }}>{item.name}</h3>
                <span style={{ fontSize: 12, color: B.textMuted }}>{item.category} · {ZONES.find(z => z.id === item.zone)?.name}</span>
              </div>
              <StatusBadge status={item.status} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
              {[
                { label: "Stock actual", value: `${item.qty} ${item.unit}` },
                { label: "Stock mínimo", value: `${item.min} ${item.unit}` },
                { label: "Consumo semanal", value: `${item.weeklyUse} ${item.unit}` },
                { label: "Días restantes", value: daysLeft === "∞" ? "∞" : `${daysLeft} días` },
              ].map(m => (
                <div key={m.label} style={{ padding: "10px 12px", background: B.surfaceHover, borderRadius: 8 }}>
                  <div style={{ fontSize: 11, color: B.textMuted, marginBottom: 2 }}>{m.label}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: B.text }}>{m.value}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <Btn variant="primary">Pedir a proveedor</Btn>
              <Btn>Transferir</Btn>
              <Btn>Registrar merma</Btn>
              <Btn variant="ghost">Ver movimientos</Btn>
            </div>
          </Card>
        );
      })()}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// P2: TRANSFERENCIA ENTRE ZONAS
// ══════════════════════════════════════════════════════════════
function TransferView() {
  const [from, setFrom] = useState("seca");
  const [to, setTo] = useState("cocina");
  const [items, setItems] = useState([
    { name: "Harina", qty: 5, unit: "kg", available: 8 },
    { name: "Aceite vegetal", qty: 3, unit: "lt", available: 45 },
  ]);

  const presets = [
    { label: "Mise en place diario", items: "Harina 5kg, Aceite 3lt, Cebolla 4kg" },
    { label: "Producción salsas", items: "Tomate 8kg, Cebolla 3kg, Aceite 2lt" },
  ];

  return (
    <div>
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <Card style={{ flex: 1, minWidth: 200 }}>
          <div style={{ fontSize: 12, color: B.textMuted, fontWeight: 500, marginBottom: 6 }}>Zona origen</div>
          <Select value={from} onChange={setFrom} options={ZONES.map(z => ({ value: z.id, label: `${z.icon} ${z.name}` }))} style={{ width: "100%" }} />
        </Card>
        <div style={{ display: "flex", alignItems: "center", fontSize: 24, color: B.textLight, padding: "0 8px" }}>→</div>
        <Card style={{ flex: 1, minWidth: 200 }}>
          <div style={{ fontSize: 12, color: B.textMuted, fontWeight: 500, marginBottom: 6 }}>Zona destino</div>
          <Select value={to} onChange={setTo} options={ZONES.filter(z => z.id !== from).map(z => ({ value: z.id, label: `${z.icon} ${z.name}` }))} style={{ width: "100%" }} />
        </Card>
      </div>

      {/* Quick presets */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: B.textMuted, marginBottom: 8 }}>⚡ Transferencias rápidas</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {presets.map((p, i) => (
            <button key={i} style={{
              padding: "8px 14px", borderRadius: 8, border: `1px solid ${B.border}`,
              background: B.surface, cursor: "pointer", fontFamily: font, textAlign: "left",
              transition: "border-color 0.12s",
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = B.accent}
              onMouseLeave={e => e.currentTarget.style.borderColor = B.border}
            >
              <div style={{ fontSize: 13, fontWeight: 600, color: B.text }}>{p.label}</div>
              <div style={{ fontSize: 11, color: B.textMuted, marginTop: 2 }}>{p.items}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Items to transfer */}
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: B.text }}>Items a transferir</h3>
          <Btn>+ Agregar item</Btn>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: font }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${B.border}` }}>
              {["Item", "Disponible", "Cantidad a transferir", ""].map(h => (
                <th key={h} style={{ padding: "8px 12px", textAlign: "left", fontWeight: 600, color: B.textMuted, fontSize: 12 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${B.border}` }}>
                <td style={{ padding: "10px 12px", fontWeight: 600 }}>{item.name}</td>
                <td style={{ padding: "10px 12px", color: B.textMuted }}>{item.available} {item.unit}</td>
                <td style={{ padding: "10px 12px" }}>
                  <input type="number" value={item.qty} style={{
                    width: 80, padding: "6px 10px", border: `1px solid ${B.border}`,
                    borderRadius: 6, fontSize: 14, fontWeight: 700, fontFamily: font, textAlign: "center",
                  }} readOnly />
                  <span style={{ fontSize: 12, color: B.textMuted, marginLeft: 6 }}>{item.unit}</span>
                </td>
                <td style={{ padding: "10px 12px", textAlign: "right" }}>
                  <Btn variant="ghost" style={{ color: B.danger, fontSize: 16, padding: 4 }}>✕</Btn>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 14 }}>
          <Btn variant="ghost">Cancelar</Btn>
          <Btn variant="primary">Confirmar transferencia</Btn>
        </div>
      </Card>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// P3: TOMA DE INVENTARIO (CONTEO FÍSICO)
// ══════════════════════════════════════════════════════════════
function CountView() {
  const [zone, setZone] = useState("frio");
  const [counting, setCounting] = useState(false);

  const countItems = STOCK_DATA.filter(i => i.zone === zone).map(i => ({
    ...i, counted: i.qty + Math.floor(Math.random() * 6 - 3),
  }));

  return (
    <div>
      {!counting ? (
        <Card>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: B.text, marginBottom: 12 }}>Iniciar conteo físico</h3>
          <div style={{ fontSize: 13, color: B.textMuted, marginBottom: 16 }}>Selecciona la zona a contar. El sistema generará la lista con el stock teórico. Puedes hacer conteos parciales.</div>
          <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
            {ZONES.map(z => (
              <button key={z.id} onClick={() => setZone(z.id)} style={{
                flex: 1, padding: "16px", borderRadius: 10, cursor: "pointer",
                border: zone === z.id ? `2px solid ${B.accent}` : `1px solid ${B.border}`,
                background: zone === z.id ? `${B.accent}08` : B.surface,
                fontFamily: font, textAlign: "center",
              }}>
                <div style={{ fontSize: 28 }}>{z.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: B.text, marginTop: 6 }}>{z.name}</div>
                <div style={{ fontSize: 12, color: B.textMuted }}>{STOCK_DATA.filter(i => i.zone === z.id).length} items</div>
              </button>
            ))}
          </div>
          <Btn variant="primary" onClick={() => setCounting(true)}>Iniciar conteo</Btn>
        </Card>
      ) : (
        <Card style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "14px 20px", background: B.surfaceHover, borderBottom: `1px solid ${B.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <span style={{ fontSize: 14, fontWeight: 700, color: B.text }}>{ZONES.find(z => z.id === zone)?.icon} {ZONES.find(z => z.id === zone)?.name}</span>
              <span style={{ fontSize: 12, color: B.textMuted, marginLeft: 10 }}>{countItems.length} items</span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <Btn variant="ghost" onClick={() => setCounting(false)}>Cancelar</Btn>
              <Btn variant="primary">Confirmar conteo</Btn>
            </div>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: font }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${B.border}`, background: "#FAFAF8" }}>
                {["Item", "Stock teórico", "Conteo real", "Diferencia", ""].map(h => (
                  <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontWeight: 600, color: B.textMuted, fontSize: 12 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {countItems.map(item => {
                const diff = item.counted - item.qty;
                const pct = item.qty > 0 ? Math.abs(Math.round((diff / item.qty) * 100)) : 0;
                const diffColor = pct < 5 ? B.success : pct < 15 ? B.warning : B.danger;
                return (
                  <tr key={item.id} style={{ borderBottom: `1px solid ${B.border}` }}>
                    <td style={{ padding: "10px 14px", fontWeight: 600 }}>{item.name}<br /><span style={{ fontSize: 11, fontWeight: 400, color: B.textMuted }}>{item.category}</span></td>
                    <td style={{ padding: "10px 14px", color: B.textMuted }}>{item.qty} {item.unit}</td>
                    <td style={{ padding: "10px 14px" }}>
                      <input type="number" defaultValue={item.counted} style={{
                        width: 80, padding: "8px 10px", border: `1px solid ${B.border}`,
                        borderRadius: 8, fontSize: 16, fontWeight: 700, fontFamily: font,
                        textAlign: "center",
                      }} />
                    </td>
                    <td style={{ padding: "10px 14px" }}>
                      <span style={{ fontWeight: 700, color: diffColor }}>
                        {diff > 0 ? "+" : ""}{diff} {item.unit}
                      </span>
                      <span style={{ fontSize: 11, color: diffColor, marginLeft: 6 }}>({pct}%)</span>
                    </td>
                    <td style={{ padding: "10px 14px" }}>
                      <div style={{ width: 10, height: 10, borderRadius: "50%", background: diffColor }} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// P4: REGISTRO DE MERMA
// ══════════════════════════════════════════════════════════════
function WasteView() {
  const motivos = ["Vencimiento", "Daño", "Contaminación", "Rotura", "Otro"];
  return (
    <Card>
      <h3 style={{ fontSize: 15, fontWeight: 700, color: B.text, marginBottom: 16 }}>Registrar merma</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, color: B.textMuted, display: "block", marginBottom: 4 }}>Item</label>
          <Select value="" onChange={() => { }} options={[{ value: "", label: "Seleccionar item..." }, ...STOCK_DATA.map(i => ({ value: i.id, label: `${i.name} (${i.qty} ${i.unit})` }))]} style={{ width: "100%" }} />
        </div>
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, color: B.textMuted, display: "block", marginBottom: 4 }}>Zona</label>
          <Select value="frio" onChange={() => { }} options={ZONES.map(z => ({ value: z.id, label: `${z.icon} ${z.name}` }))} style={{ width: "100%" }} />
        </div>
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, color: B.textMuted, display: "block", marginBottom: 4 }}>Cantidad perdida</label>
          <div style={{ display: "flex", gap: 6 }}>
            <input type="number" placeholder="0" style={{ flex: 1, padding: "8px 12px", border: `1px solid ${B.border}`, borderRadius: 8, fontSize: 14, fontWeight: 700, fontFamily: font }} />
            <span style={{ alignSelf: "center", color: B.textMuted, fontSize: 13 }}>kg</span>
          </div>
        </div>
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, color: B.textMuted, display: "block", marginBottom: 4 }}>Motivo</label>
          <Select value="" onChange={() => { }} options={[{ value: "", label: "Seleccionar motivo..." }, ...motivos.map(m => ({ value: m, label: m }))]} style={{ width: "100%" }} />
        </div>
      </div>

      <div style={{ marginBottom: 14 }}>
        <label style={{ fontSize: 12, fontWeight: 600, color: B.textMuted, display: "block", marginBottom: 4 }}>Foto evidencia (opcional)</label>
        <div style={{
          border: `2px dashed ${B.border}`, borderRadius: 10, padding: "24px", textAlign: "center",
          cursor: "pointer", color: B.textMuted, fontSize: 13, transition: "border-color 0.15s",
        }}>
          📷 Arrastra una foto o haz click para subir
        </div>
      </div>

      {/* Cost preview */}
      <Card style={{ background: B.dangerBg, border: `1px solid ${B.danger}20`, marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 12, color: B.danger, fontWeight: 600 }}>Costo estimado de merma</div>
            <div style={{ fontSize: 11, color: B.textMuted, marginTop: 2 }}>Cantidad × costo promedio ponderado → alimenta P&L</div>
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: B.danger }}>$0</div>
        </div>
      </Card>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
        <Btn variant="ghost">Cancelar</Btn>
        <Btn variant="danger">Confirmar merma</Btn>
      </div>
    </Card>
  );
}

// ══════════════════════════════════════════════════════════════
// P5: ALERTAS DE STOCK BAJO
// ══════════════════════════════════════════════════════════════
function AlertsView() {
  const alerts = STOCK_DATA.filter(i => i.status !== "ok").sort((a, b) => {
    const order = { sin_stock: 0, critico: 1, bajo: 2 };
    return order[a.status] - order[b.status];
  });

  return (
    <div>
      <div style={{ fontSize: 13, color: B.textMuted, marginBottom: 14 }}>{alerts.length} items requieren atención</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {alerts.map(item => {
          const daysLeft = item.weeklyUse > 0 ? Math.round((item.qty / item.weeklyUse) * 7) : "∞";
          return (
            <Card key={item.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px" }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: item.status === "sin_stock" || item.status === "critico" ? B.danger : B.warning, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 650, color: B.text }}>{item.name}</div>
                <div style={{ fontSize: 12, color: B.textMuted }}>
                  {item.qty} {item.unit} de {item.min} mín. · Consumo: {item.weeklyUse} {item.unit}/sem · {daysLeft === 0 ? "Sin stock" : `~${daysLeft} días`}
                </div>
              </div>
              <StatusBadge status={item.status} />
              <div style={{ display: "flex", gap: 6 }}>
                <Btn variant="primary" style={{ fontSize: 12, padding: "5px 10px" }}>Pedir</Btn>
                <Btn variant="ghost" style={{ fontSize: 12, padding: "5px 10px" }}>Descartar</Btn>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// P6: HISTORIAL DE MOVIMIENTOS
// ══════════════════════════════════════════════════════════════
function HistoryView() {
  const [typeFilter, setTypeFilter] = useState("all");
  let filtered = [...MOVEMENTS];
  if (typeFilter !== "all") filtered = filtered.filter(m => m.type === typeFilter);

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap", alignItems: "center" }}>
        <SearchInput value="" onChange={() => { }} placeholder="Buscar item..." />
        <Select value={typeFilter} onChange={setTypeFilter} options={[
          { value: "all", label: "Todos los tipos" },
          ...Object.entries(TYPE_COLORS).map(([k, v]) => ({ value: k, label: v.label })),
        ]} />
        <Select value="all" onChange={() => { }} options={[{ value: "all", label: "Todas las zonas" }, ...ZONES.map(z => ({ value: z.id, label: z.name }))]} />
        <div style={{ flex: 1 }} />
        <Btn variant="ghost" style={{ fontSize: 12 }}>📥 Exportar CSV</Btn>
      </div>

      <Card style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: font }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${B.border}`, background: "#FAFAF8" }}>
              {["Fecha", "Item", "Tipo", "Cantidad", "Usuario", "Referencia"].map(h => (
                <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontWeight: 600, color: B.textMuted, fontSize: 12 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(m => {
              const tc = TYPE_COLORS[m.type];
              return (
                <tr key={m.id} style={{ borderBottom: `1px solid ${B.border}` }}
                  onMouseEnter={e => e.currentTarget.style.background = B.surfaceHover}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <td style={{ padding: "10px 14px", color: B.textMuted, whiteSpace: "nowrap" }}>{m.date}</td>
                  <td style={{ padding: "10px 14px", fontWeight: 600, color: B.text }}>{m.item}</td>
                  <td style={{ padding: "10px 14px" }}><Badge color={tc.color} bg={`${tc.color}15`}>{tc.label}</Badge></td>
                  <td style={{ padding: "10px 14px", fontWeight: 700, color: m.qty > 0 ? B.success : B.danger }}>{m.qty > 0 ? "+" : ""}{m.qty}</td>
                  <td style={{ padding: "10px 14px", color: B.textMuted }}>{m.user}</td>
                  <td style={{ padding: "10px 14px" }}><span style={{ color: "#2E86DE", cursor: "pointer", fontSize: 12 }}>{m.ref}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// P7: CONFIGURACIÓN
// ══════════════════════════════════════════════════════════════
function ConfigView() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
      <Card>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: B.text, marginBottom: 12 }}>🏭 Zonas (Warehouses)</h3>
        {ZONES.map(z => (
          <div key={z.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${B.border}` }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>{z.icon} {z.name}</span>
            <Btn variant="ghost" style={{ fontSize: 12, padding: "4px 8px" }}>Editar</Btn>
          </div>
        ))}
        <Btn style={{ marginTop: 10, fontSize: 12 }}>+ Agregar zona</Btn>
      </Card>

      <Card>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: B.text, marginBottom: 12 }}>📂 Categorías</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {CATEGORIES.slice(1).map(c => (
            <Badge key={c} color={B.text} bg={B.surfaceHover}>{c}</Badge>
          ))}
        </div>
        <Btn style={{ marginTop: 10, fontSize: 12 }}>+ Agregar categoría</Btn>
      </Card>

      <Card>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: B.text, marginBottom: 12 }}>📏 Unidades de medida</h3>
        {["kg", "lt", "ud", "caja", "botella"].map(u => (
          <div key={u} style={{ padding: "6px 0", borderBottom: `1px solid ${B.border}`, fontSize: 13 }}>
            <span style={{ fontWeight: 600 }}>{u}</span>
          </div>
        ))}
        <Btn style={{ marginTop: 10, fontSize: 12 }}>+ Agregar unidad</Btn>
      </Card>

      <Card>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: B.text, marginBottom: 12 }}>⚡ Presets de transferencia</h3>
        <div style={{ fontSize: 13, color: B.textMuted, marginBottom: 8 }}>Transferencias frecuentes con items y cantidades predefinidas.</div>
        {["Mise en place diario", "Producción salsas"].map(p => (
          <div key={p} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${B.border}` }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>{p}</span>
            <Btn variant="ghost" style={{ fontSize: 12, padding: "4px 8px" }}>Editar</Btn>
          </div>
        ))}
        <Btn style={{ marginTop: 10, fontSize: 12 }}>+ Crear preset</Btn>
      </Card>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// MAIN: INVENTARIO MODULE
// ══════════════════════════════════════════════════════════════
export default function InventarioModule() {
  const [tab, setTab] = useState("stock");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function check() { setIsMobile(window.innerWidth < 900); }
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const alertCount = STOCK_DATA.filter(i => i.status !== "ok").length;

  const TABS = [
    { id: "stock", label: "Stock", icon: "📦" },
    { id: "transfers", label: "Transferencias", icon: "🔄" },
    { id: "count", label: "Conteo físico", icon: "📝" },
    { id: "waste", label: "Merma", icon: "🗑️" },
    { id: "alerts", label: "Alertas", icon: "⚠️", badge: alertCount, badgeColor: B.dangerBg, badgeTextColor: B.danger },
    { id: "history", label: "Movimientos", icon: "📜" },
    { id: "config", label: "Configuración", icon: "⚙️" },
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

      {/* Simulated header bar */}
      <header style={{
        background: B.surface, borderBottom: `1px solid ${B.border}`,
        position: "sticky", top: 0, zIndex: 100,
      }}>
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
        {/* Simulated nav with Inventario active */}
        {!isMobile && (
          <div style={{ padding: "0 24px", display: "flex", gap: 2, borderTop: `1px solid ${B.border}`, height: 40, alignItems: "center" }}>
            {["Dashboard", "Inventario", "Compras", "Pedidos", "Despacho", "Producción", "Calidad", "Finanzas", "Catálogo", "Más"].map(n => (
              <span key={n} style={{
                padding: "6px 11px", fontSize: 13, fontWeight: n === "Inventario" ? 650 : 500,
                color: n === "Inventario" ? B.text : B.textMuted,
                borderBottom: n === "Inventario" ? `2px solid ${B.accent}` : "2px solid transparent",
                cursor: "pointer",
              }}>{n}</span>
            ))}
          </div>
        )}
      </header>

      {/* Content */}
      <main style={{ padding: isMobile ? 16 : "20px 32px", maxWidth: 1320, margin: "0 auto" }}>
        {/* Page title */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <h1 style={{ fontSize: isMobile ? 20 : 24, fontWeight: 800, color: B.text, fontFamily: serif }}>📦 Inventario</h1>
            <p style={{ fontSize: 13, color: B.textMuted, marginTop: 2 }}>3 zonas · {STOCK_DATA.length} items · {alertCount} alertas activas</p>
          </div>
        </div>

        {/* Process tabs */}
        <TabBar tabs={TABS} active={tab} onChange={setTab} />

        {/* Tab content */}
        {tab === "stock" && <StockView />}
        {tab === "transfers" && <TransferView />}
        {tab === "count" && <CountView />}
        {tab === "waste" && <WasteView />}
        {tab === "alerts" && <AlertsView />}
        {tab === "history" && <HistoryView />}
        {tab === "config" && <ConfigView />}
      </main>
    </div>
  );
}
