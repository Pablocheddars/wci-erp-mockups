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
function Btn({ children, variant = "default", onClick, style: sx = {}, disabled }) {
  const styles = { primary: { background: B.accent, color: B.primary, border: "none", fontWeight: 700 }, danger: { background: B.dangerBg, color: B.danger, border: `1px solid ${B.danger}30`, fontWeight: 600 }, default: { background: B.surface, color: B.text, border: `1px solid ${B.border}`, fontWeight: 600 }, ghost: { background: "transparent", color: B.textMuted, border: "none", fontWeight: 600 } };
  return <button onClick={onClick} disabled={disabled} style={{ padding: "7px 14px", borderRadius: 8, fontSize: 13, cursor: disabled ? "not-allowed" : "pointer", fontFamily: font, transition: "all 0.12s", opacity: disabled ? 0.5 : 1, ...styles[variant], ...sx }}>{children}</button>;
}
function Card({ children, style: sx = {} }) {
  return <div style={{ background: B.surface, border: `1px solid ${B.border}`, borderRadius: 12, padding: "16px 20px", ...sx }}>{children}</div>;
}
function TabBar({ tabs, active, onChange }) {
  return <div style={{ display: "flex", gap: 2, borderBottom: `1px solid ${B.border}`, marginBottom: 20, overflowX: "auto", flexShrink: 0 }}>{tabs.map(t => <button key={t.id} onClick={() => onChange(t.id)} style={{ padding: "10px 14px", border: "none", background: "transparent", fontSize: 13, fontWeight: active === t.id ? 650 : 500, color: active === t.id ? B.text : B.textMuted, borderBottom: active === t.id ? `2px solid ${B.accent}` : "2px solid transparent", cursor: "pointer", fontFamily: font, whiteSpace: "nowrap", transition: "all 0.12s" }}>{t.icon && <span style={{ marginRight: 6 }}>{t.icon}</span>}{t.label}{t.badge != null && <span style={{ marginLeft: 6, fontSize: 10, fontWeight: 700, background: t.badgeColor || B.dangerBg, color: t.badgeTextColor || B.danger, padding: "1px 6px", borderRadius: 8 }}>{t.badge}</span>}</button>)}</div>;
}
function Select({ value, onChange, options, style: sx = {} }) {
  return <select value={value} onChange={e => onChange(e.target.value)} style={{ padding: "8px 12px", border: `1px solid ${B.border}`, borderRadius: 8, fontSize: 13, fontFamily: font, background: B.surface, outline: "none", cursor: "pointer", ...sx }}>{options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select>;
}

const BRAND_UNITS = [
  { id: "u_cheddars", name: "Unidad Cheddar's", madre: "Cheddar's", subs: ["Buffalo Chicken", "The Pork Shop", "Food Pxrn"], color: "#E74C3C" },
  { id: "u_tori", name: "Unidad Tori Sushi", madre: "Tori Sushi", subs: ["Shibuya Express", "Kiri Pokes", "Smart Eats"], color: "#2E86DE" },
  { id: "u_sweet", name: "Unidad Sweet/Burger", madre: "Brown Sweet Factory", subs: ["Fatty Patty"], color: "#8E44AD" },
];
const BRANDS = [
  { id: "cheddars", name: "Cheddar's", unit: "u_cheddars", isMadre: true, activeClients: 520, newMonth: 38, churnedMonth: 12, avgTicket: 9800, freqMonth: 2.4 },
  { id: "buffalo", name: "Buffalo Chicken", unit: "u_cheddars", isMadre: false, activeClients: 65, newMonth: 12, churnedMonth: 3, avgTicket: 7200, freqMonth: 1.6, penetration: 8 },
  { id: "porkshop", name: "The Pork Shop", unit: "u_cheddars", isMadre: false, activeClients: 42, newMonth: 8, churnedMonth: 2, avgTicket: 8500, freqMonth: 1.3, penetration: 5 },
  { id: "foodpxrn", name: "Food Pxrn", unit: "u_cheddars", isMadre: false, activeClients: 35, newMonth: 6, churnedMonth: 4, avgTicket: 12500, freqMonth: 1.1, penetration: 4 },
  { id: "tori", name: "Tori Sushi", unit: "u_tori", isMadre: true, activeClients: 380, newMonth: 28, churnedMonth: 15, avgTicket: 14200, freqMonth: 1.8 },
  { id: "shibuya", name: "Shibuya Express", unit: "u_tori", isMadre: false, activeClients: 85, newMonth: 15, churnedMonth: 5, avgTicket: 8800, freqMonth: 1.9, penetration: 12 },
  { id: "kiri", name: "Kiri Pokes", unit: "u_tori", isMadre: false, activeClients: 55, newMonth: 10, churnedMonth: 6, avgTicket: 7600, freqMonth: 1.4, penetration: 8 },
  { id: "smarteats", name: "Smart Eats", unit: "u_tori", isMadre: false, activeClients: 40, newMonth: 7, churnedMonth: 8, avgTicket: 6500, freqMonth: 1.2, penetration: 6 },
  { id: "brownsweet", name: "Brown Sweet Factory", unit: "u_sweet", isMadre: true, activeClients: 180, newMonth: 14, churnedMonth: 8, avgTicket: 5200, freqMonth: 1.5 },
  { id: "fattypatty", name: "Fatty Patty", unit: "u_sweet", isMadre: false, activeClients: 120, newMonth: 11, churnedMonth: 7, avgTicket: 8900, freqMonth: 1.7, penetration: 22 },
];
const totalActive = BRANDS.reduce((s, b) => s + b.activeClients, 0);
const totalNew = BRANDS.reduce((s, b) => s + b.newMonth, 0);
const totalChurned = BRANDS.reduce((s, b) => s + b.churnedMonth, 0);
const CHURN_RISK = [
  { id: 1, name: "Carlos Muñoz", brand: "Cheddar's", lastVisit: "12 días", pattern: "Semanal", clv: 285000, signal: "Frecuencia", risk: 82 },
  { id: 2, name: "María Sepúlveda", brand: "Tori Sushi", lastVisit: "18 días", pattern: "Quincenal", clv: 420000, signal: "Ticket ↓", risk: 75 },
  { id: 3, name: "Pedro Lagos", brand: "Cheddar's + BC", lastVisit: "21 días", pattern: "Semanal", clv: 380000, signal: "Mono-marca", risk: 71 },
  { id: 4, name: "Ana Riquelme", brand: "Shibuya Express", lastVisit: "9 días", pattern: "Semanal", clv: 195000, signal: "Frecuencia", risk: 68 },
  { id: 5, name: "Luis Contreras", brand: "Brown Sweet", lastVisit: "25 días", pattern: "Quincenal", clv: 140000, signal: "Frecuencia", risk: 65 },
];
const CAMPAIGNS = [
  { id: 1, name: "2x1 Buffalo Chicken", brand: "Buffalo Chicken", type: "Promo precio", status: "activa", start: "01/04", end: "15/04", ventaBruta: 1800000, margen: -120000, newClients: 22 },
  { id: 2, name: "Combo Familiar Cheddar's", brand: "Cheddar's", type: "Promo precio", status: "activa", start: "28/03", end: "10/04", ventaBruta: 3200000, margen: 640000, newClients: 15 },
  { id: 3, name: "Shibuya Poke Day", brand: "Shibuya Express", type: "Evento", status: "evaluada", start: "22/03", end: "22/03", ventaBruta: 890000, margen: 210000, newClients: 35 },
  { id: 4, name: "Puntos dobles Tori", brand: "Tori Sushi", type: "Fidelización", status: "planificada", start: "15/04", end: "30/04", ventaBruta: 0, margen: 0, newClients: 0 },
];
const PRODUCT_MIX = [
  { name: "Burger Clásica Cheddar's", brand: "Cheddar's", volume: 420, margin: 38, quadrant: "estrella" },
  { name: "Combo Familiar", brand: "Cheddar's", volume: 280, margin: 24, quadrant: "vaca" },
  { name: "Chirashi Premium", brand: "Tori Sushi", volume: 95, margin: 45, quadrant: "oportunidad" },
  { name: "Roll California", brand: "Tori Sushi", volume: 310, margin: 22, quadrant: "vaca" },
  { name: "Buffalo Wings 12u", brand: "Buffalo Chicken", volume: 180, margin: 42, quadrant: "estrella" },
  { name: "Poke Bowl Salmón", brand: "Kiri Pokes", volume: 75, margin: 35, quadrant: "oportunidad" },
  { name: "Brownie Box", brand: "Brown Sweet", volume: 210, margin: 52, quadrant: "estrella" },
  { name: "Pulled Pork Sandwich", brand: "The Pork Shop", volume: 45, margin: 18, quadrant: "problema" },
  { name: "Smart Bowl Quinoa", brand: "Smart Eats", volume: 30, margin: 28, quadrant: "problema" },
  { name: "Fatty Smash Burger", brand: "Fatty Patty", volume: 195, margin: 32, quadrant: "estrella" },
];
const QUADRANT_COLORS = {
  estrella: { color: B.success, bg: B.successBg, label: "⭐ Estrella", desc: "Alto vol + alto margen" },
  vaca: { color: B.warning, bg: B.warningBg, label: "🐄 Vaca", desc: "Alto vol + bajo margen" },
  oportunidad: { color: B.info, bg: B.infoBg, label: "💎 Oportunidad", desc: "Bajo vol + alto margen" },
  problema: { color: B.danger, bg: B.dangerBg, label: "⚠️ Problema", desc: "Bajo vol + bajo margen" },
};

function DashboardView() {
  const [period, setPeriod] = useState("hoy");
  const [local, setLocal] = useState("todos");
  const [brand, setBrand] = useState("todas");

  const LOCALES = [
    { value: "todos", label: "Todos los locales" },
    { value: "angol", label: "Angol" },
    { value: "spedro", label: "San Pedro" },
    { value: "chillan", label: "Chillán" },
    { value: "chiguayante", label: "Chiguayante" },
  ];

  const now = new Date();
  const dayName = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"][now.getDay()];
  const hora = now.getHours();
  const diaDelMes = now.getDate();

  const DATA_BY_PERIOD = {
    hoy: {
      venta: 4250000, ventaComp: 3890000, compLabel: `vs ${dayName} pasado a las ${hora}:00`,
      meta: 4600000, metaComp: 4600000,
      ticket: 9200, ticketComp: 8800,
      transacciones: 462, transComp: 442,
      channels: [
        { name: "Salón", pct: 38, amount: 1615000 },
        { name: "Delivery", pct: 34, amount: 1445000 },
        { name: "Mesón", pct: 18, amount: 765000 },
        { name: "Ecommerce", pct: 10, amount: 425000 },
      ],
    },
    semana: {
      venta: 28500000, ventaComp: 26200000, compLabel: `vs sem. pasada al día ${now.getDay()} ${hora}:00`,
      meta: 32000000, metaComp: 32000000,
      ticket: 9400, ticketComp: 9100,
      transacciones: 3032, transComp: 2878,
      channels: [
        { name: "Salón", pct: 36, amount: 10260000 },
        { name: "Delivery", pct: 35, amount: 9975000 },
        { name: "Mesón", pct: 17, amount: 4845000 },
        { name: "Ecommerce", pct: 12, amount: 3420000 },
      ],
    },
    mes: {
      venta: 92000000, ventaComp: 84500000, compLabel: `vs mes pasado al día ${diaDelMes} ${hora}:00`,
      meta: 85000000, metaComp: 85000000,
      ticket: 9200, ticketComp: 8950,
      transacciones: 10000, transComp: 9441,
      channels: [
        { name: "Salón", pct: 37, amount: 34040000 },
        { name: "Delivery", pct: 34, amount: 31280000 },
        { name: "Mesón", pct: 17, amount: 15640000 },
        { name: "Ecommerce", pct: 12, amount: 11040000 },
      ],
    },
  };

  const d = DATA_BY_PERIOD[period];
  const pctChange = (curr, prev) => prev > 0 ? Math.round((curr - prev) / prev * 100) : 0;
  const deltaLabel = (curr, prev) => {
    const pct = pctChange(curr, prev);
    const arrow = pct >= 0 ? "↑" : "↓";
    const color = pct >= 0 ? B.success : B.danger;
    return { pct, arrow, color, text: `${arrow} ${Math.abs(pct)}%` };
  };

  const ventaDelta = deltaLabel(d.venta, d.ventaComp);
  const ticketDelta = deltaLabel(d.ticket, d.ticketComp);
  const transDelta = deltaLabel(d.transacciones, d.transComp);

  const periodLabels = { hoy: "hoy", semana: "esta semana", mes: "este mes" };

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 2, background: B.surfaceHover, borderRadius: 8, padding: 2 }}>
          {[{ id: "hoy", label: "Hoy" }, { id: "semana", label: "Semana" }, { id: "mes", label: "Mes" }].map(p => (
            <button key={p.id} onClick={() => setPeriod(p.id)} style={{
              padding: "6px 14px", borderRadius: 6, border: "none", fontSize: 13, fontWeight: period === p.id ? 700 : 500,
              background: period === p.id ? B.surface : "transparent", color: period === p.id ? B.text : B.textMuted,
              cursor: "pointer", fontFamily: font, boxShadow: period === p.id ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
            }}>{p.label}</button>
          ))}
        </div>
        <Select value={local} onChange={setLocal} options={LOCALES} />
        <Select value={brand} onChange={setBrand} options={[{ value: "todas", label: "Todas las marcas" }, ...BRANDS.map(b => ({ value: b.id, label: b.name }))]} />
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: 11, color: B.textMuted }}>Comparando: {d.compLabel}</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 16 }}>
        <Card>
          <div style={{ fontSize: 11, color: B.textMuted, fontWeight: 600, marginBottom: 4 }}>Venta {periodLabels[period]}</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: B.text }}>${(d.venta / 1e6).toFixed(1)}M</div>
            <span style={{ fontSize: 12, fontWeight: 700, color: ventaDelta.color }}>{ventaDelta.text}</span>
          </div>
          <div style={{ fontSize: 11, color: B.textMuted, marginTop: 2 }}>{d.compLabel}</div>
        </Card>
        <Card>
          <div style={{ fontSize: 11, color: B.textMuted, fontWeight: 600, marginBottom: 4 }}>vs meta</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: d.venta / d.meta >= 0.9 ? B.success : B.warning }}>{Math.round(d.venta / d.meta * 100)}%</div>
          </div>
          <div style={{ fontSize: 11, color: B.textMuted, marginTop: 2 }}>Meta: ${(d.meta / 1e6).toFixed(0)}M</div>
        </Card>
        <Card>
          <div style={{ fontSize: 11, color: B.textMuted, fontWeight: 600, marginBottom: 4 }}>Ticket promedio</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: B.purple }}>${d.ticket.toLocaleString()}</div>
            <span style={{ fontSize: 12, fontWeight: 700, color: ticketDelta.color }}>{ticketDelta.text}</span>
          </div>
          <div style={{ fontSize: 11, color: B.textMuted, marginTop: 2 }}>{d.compLabel}</div>
        </Card>
        <Card>
          <div style={{ fontSize: 11, color: B.textMuted, fontWeight: 600, marginBottom: 4 }}>Transacciones</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: B.info }}>{d.transacciones.toLocaleString()}</div>
            <span style={{ fontSize: 12, fontWeight: 700, color: transDelta.color }}>{transDelta.text}</span>
          </div>
          <div style={{ fontSize: 11, color: B.textMuted, marginTop: 2 }}>{d.compLabel}</div>
        </Card>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <Card>
          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Venta por canal {periodLabels[period]}</h3>
          {d.channels.map(ch => (
            <div key={ch.name} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: `1px solid ${B.border}` }}>
              <div style={{ width: 80, fontSize: 13, fontWeight: 600 }}>{ch.name}</div>
              <div style={{ flex: 1, height: 8, background: B.surfaceHover, borderRadius: 4, overflow: "hidden" }}>
                <div style={{ width: `${ch.pct}%`, height: "100%", background: B.accent, borderRadius: 4 }} />
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, minWidth: 70, textAlign: "right" }}>${(ch.amount / 1e6).toFixed(1)}M</div>
              <div style={{ fontSize: 11, color: B.textMuted, minWidth: 35 }}>{ch.pct}%</div>
            </div>
          ))}
        </Card>

        <Card>
          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Campañas activas</h3>
          {CAMPAIGNS.filter(c => c.status === "activa").map(c => (
            <div key={c.id} style={{ padding: "10px 0", borderBottom: `1px solid ${B.border}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{c.name}</div>
                  <div style={{ fontSize: 11, color: B.textMuted }}>{c.brand} · {c.start} — {c.end}</div>
                </div>
                <Badge color={c.margen >= 0 ? B.success : B.danger} bg={c.margen >= 0 ? B.successBg : B.dangerBg}>
                  Margen: ${(c.margen / 1000).toFixed(0)}k
                </Badge>
              </div>
            </div>
          ))}
        </Card>

        <Card>
          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Ranking marcas ({period === "hoy" ? "hoy" : period === "semana" ? "semana" : "mes"})</h3>
          {[...BRANDS].sort((a, b) => (b.activeClients * b.avgTicket * b.freqMonth) - (a.activeClients * a.avgTicket * a.freqMonth)).slice(0, 6).map((br, i) => {
            const ingreso = br.activeClients * br.avgTicket * br.freqMonth;
            return (
              <div key={br.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", borderBottom: `1px solid ${B.border}` }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: B.accent, background: B.primary, padding: "2px 7px", borderRadius: 4, minWidth: 22, textAlign: "center" }}>{i + 1}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{br.name}</div>
                  <div style={{ fontSize: 11, color: B.textMuted }}>{br.activeClients} clientes · ${br.avgTicket.toLocaleString()} ticket</div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700 }}>${(ingreso / 1e6).toFixed(1)}M</div>
              </div>
            );
          })}
        </Card>

        <Card style={{ border: `1px solid ${B.danger}20` }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: B.danger, marginBottom: 12 }}>⚠️ Alertas</h3>
          {[
            { text: "Smart Eats: más clientes perdidos que ganados (-1 neto)", severity: "alta" },
            { text: "Campaña 2x1 Buffalo: margen negativo -$120k", severity: "alta" },
            { text: "Tori Sushi: 15 clientes perdidos este mes (mayor churn del grupo)", severity: "media" },
            { text: "Food Pxrn: penetración sobre Cheddar's solo 4%", severity: "baja" },
          ].map((a, i) => (
            <div key={i} style={{ display: "flex", gap: 8, padding: "8px 0", borderBottom: `1px solid ${B.border}`, alignItems: "flex-start" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: a.severity === "alta" ? B.danger : a.severity === "media" ? B.warning : B.info, marginTop: 4, flexShrink: 0 }} />
              <div style={{ fontSize: 12, color: B.text, lineHeight: 1.4 }}>{a.text}</div>
            </div>
          ))}
        </Card>
      </div>

      {/* Rentabilidad — integrado en dashboard */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginTop: 14 }}>
        <Card>
          <div style={{ fontSize: 11, color: B.textMuted, fontWeight: 600 }}>Venta bruta {periodLabels[period]}</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: B.text }}>${(d.venta / 1e6).toFixed(1)}M</div>
        </Card>
        <Card>
          <div style={{ fontSize: 11, color: B.textMuted, fontWeight: 600 }}>Ingreso neto</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: B.info }}>${(d.venta * 0.85 / 1e6).toFixed(1)}M</div>
          <div style={{ fontSize: 11, color: B.textMuted }}>Post comisiones</div>
        </Card>
        <Card>
          <div style={{ fontSize: 11, color: B.textMuted, fontWeight: 600 }}>Margen contribución</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: B.success }}>${(d.venta * 0.34 / 1e6).toFixed(1)}M</div>
          <div style={{ fontSize: 11, color: B.textMuted }}>Lo que realmente queda</div>
        </Card>
      </div>

      {/* Product mix matrix */}
      <Card style={{ marginTop: 14, padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "12px 20px", borderBottom: `1px solid ${B.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontSize: 14, fontWeight: 700 }}>Mix de productos por rentabilidad</h3>
          <div style={{ display: "flex", gap: 6 }}>
            {Object.entries(QUADRANT_COLORS).map(([key, q]) => {
              const count = PRODUCT_MIX.filter(p => p.quadrant === key).length;
              return <span key={key} style={{ fontSize: 11, fontWeight: 600, color: q.color, background: q.bg, padding: "2px 8px", borderRadius: 10 }}>{q.label.split(" ")[0]} {count}</span>;
            })}
          </div>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: font }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${B.border}`, background: "#FAFAF8" }}>
              {["Producto", "Marca", "Vol/mes", "Margen %", "Cuadrante"].map(h => (
                <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontWeight: 600, color: B.textMuted, fontSize: 12 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...PRODUCT_MIX].sort((a, b) => (b.volume * b.margin) - (a.volume * a.margin)).map((p, i) => {
              const q = QUADRANT_COLORS[p.quadrant];
              return (
                <tr key={i} style={{ borderBottom: `1px solid ${B.border}` }}
                  onMouseEnter={e => e.currentTarget.style.background = B.surfaceHover}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <td style={{ padding: "10px 14px", fontWeight: 600 }}>{p.name}</td>
                  <td style={{ padding: "10px 14px", color: B.textMuted }}>{p.brand}</td>
                  <td style={{ padding: "10px 14px", fontWeight: 700 }}>{p.volume}</td>
                  <td style={{ padding: "10px 14px", fontWeight: 700, color: p.margin >= 35 ? B.success : p.margin >= 25 ? B.text : B.danger }}>{p.margin}%</td>
                  <td style={{ padding: "10px 14px" }}><Badge color={q.color} bg={q.bg}>{q.label}</Badge></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

function ClientesView() {
  const [subTab, setSubTab] = useState("salud");
  return <div>
    <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>{[{ id: "salud", label: "Salud base" },{ id: "churn", label: "Churn" },{ id: "onboarding", label: "Onboarding" },{ id: "retención", label: "Retención" }].map(s => <Btn key={s.id} variant={subTab === s.id ? "primary" : "default"} onClick={() => setSubTab(s.id)} style={{ fontSize: 12 }}>{s.label}</Btn>)}</div>
    {subTab === "salud" && <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 16 }}>
        <Card><div style={{ fontSize: 11, color: B.textMuted }}>Clientes activos</div><div style={{ fontSize: 24, fontWeight: 800, color: B.success }}>{totalActive.toLocaleString()}</div><div style={{ fontSize: 11, color: B.textMuted }}>Últimos 30 días</div></Card>
        <Card><div style={{ fontSize: 11, color: B.textMuted }}>Nuevos este mes</div><div style={{ fontSize: 24, fontWeight: 800, color: B.info }}>{totalNew}</div><div style={{ fontSize: 11, color: B.textMuted }}>Primera compra</div></Card>
        <Card><div style={{ fontSize: 11, color: B.textMuted }}>Perdidos</div><div style={{ fontSize: 24, fontWeight: 800, color: B.danger }}>{totalChurned}</div><div style={{ fontSize: 11, color: B.textMuted }}>No volvieron</div></Card>
        <Card><div style={{ fontSize: 11, color: B.textMuted }}>Neto mes</div><div style={{ fontSize: 24, fontWeight: 800, color: totalNew-totalChurned > 0 ? B.success : B.danger }}>+{totalNew-totalChurned}</div><div style={{ fontSize: 11, color: B.textMuted }}>Bola de nieve {totalNew-totalChurned > 0 ? "↑" : "↓"}</div></Card>
      </div>
      <Card style={{ padding: 0, overflow: "hidden" }}><div style={{ padding: "12px 20px", background: "#FAFAF8", borderBottom: `1px solid ${B.border}` }}><h3 style={{ fontSize: 14, fontWeight: 700 }}>Clientes activos por marca</h3></div><table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: font }}><thead><tr style={{ borderBottom: `1px solid ${B.border}`, background: "#FAFAF8" }}>{["Marca","Activos","Nuevos","Perdidos","Neto","Ticket prom.","Freq/mes"].map(h => <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontWeight: 600, color: B.textMuted, fontSize: 12 }}>{h}</th>)}</tr></thead><tbody>{BRANDS.map(br => { const neto = br.newMonth - br.churnedMonth; return <tr key={br.id} style={{ borderBottom: `1px solid ${B.border}` }} onMouseEnter={e => e.currentTarget.style.background = B.surfaceHover} onMouseLeave={e => e.currentTarget.style.background = "transparent"}><td style={{ padding: "10px 14px", fontWeight: 600 }}>{br.isMadre ? "" : "  ↳ "}{br.name}</td><td style={{ padding: "10px 14px", fontWeight: 700 }}>{br.activeClients}</td><td style={{ padding: "10px 14px", color: B.success, fontWeight: 600 }}>+{br.newMonth}</td><td style={{ padding: "10px 14px", color: B.danger, fontWeight: 600 }}>-{br.churnedMonth}</td><td style={{ padding: "10px 14px", fontWeight: 700, color: neto > 0 ? B.success : neto < 0 ? B.danger : B.textMuted }}>{neto > 0 ? "+" : ""}{neto}</td><td style={{ padding: "10px 14px", color: B.textMuted }}>${br.avgTicket.toLocaleString()}</td><td style={{ padding: "10px 14px", color: B.textMuted }}>{br.freqMonth}x</td></tr>; })}</tbody></table></Card>
      <Card style={{ marginTop: 14, background: B.infoBg, border: `1px solid ${B.info}22` }}><div style={{ fontSize: 12, color: B.text, lineHeight: 1.5 }}><strong>Fuente:</strong> <code style={{ fontSize: 11, background: "#fff", padding: "1px 4px", borderRadius: 3 }}>customer_brands</code> + <code style={{ fontSize: 11, background: "#fff", padding: "1px 4px", borderRadius: 3 }}>orders</code> + <code style={{ fontSize: 11, background: "#fff", padding: "1px 4px", borderRadius: 3 }}>loyalty_config</code>. Activo = compró en últimos 30 días.</div></Card>
    </div>}
    {subTab === "churn" && <div>
      <Card style={{ marginBottom: 14, background: B.dangerBg, border: `1px solid ${B.danger}20` }}><div style={{ fontSize: 13, lineHeight: 1.6, color: B.text }}><strong>Detección temprana:</strong> el sistema aprende el ritmo de cada cliente y detecta desviaciones. No usa umbrales fijos.</div></Card>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 16 }}>
        <Card><div style={{ fontSize: 11, color: B.textMuted }}>Clientes en riesgo</div><div style={{ fontSize: 22, fontWeight: 800, color: B.danger }}>{CHURN_RISK.length}</div></Card>
        <Card><div style={{ fontSize: 11, color: B.textMuted }}>CLV en riesgo</div><div style={{ fontSize: 22, fontWeight: 800, color: B.danger }}>${(CHURN_RISK.reduce((s,c) => s+c.clv, 0)/1e6).toFixed(1)}M</div></Card>
        <Card><div style={{ fontSize: 11, color: B.textMuted }}>Tasa recuperación</div><div style={{ fontSize: 22, fontWeight: 800, color: B.warning }}>38%</div></Card>
      </div>
      <Card style={{ padding: 0, overflow: "hidden" }}><table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: font }}><thead><tr style={{ borderBottom: `1px solid ${B.border}`, background: "#FAFAF8" }}>{["Cliente","Marca","Últ. visita","Patrón","Señal","CLV anual","Riesgo",""].map(h => <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontWeight: 600, color: B.textMuted, fontSize: 12 }}>{h}</th>)}</tr></thead><tbody>{CHURN_RISK.map(c => <tr key={c.id} style={{ borderBottom: `1px solid ${B.border}` }}><td style={{ padding: "10px 14px", fontWeight: 600 }}>{c.name}</td><td style={{ padding: "10px 14px", color: B.textMuted }}>{c.brand}</td><td style={{ padding: "10px 14px", color: B.danger, fontWeight: 600 }}>{c.lastVisit}</td><td style={{ padding: "10px 14px", color: B.textMuted }}>{c.pattern}</td><td style={{ padding: "10px 14px" }}><Badge color={B.warning} bg={B.warningBg}>{c.signal}</Badge></td><td style={{ padding: "10px 14px", fontWeight: 700 }}>${(c.clv/1000).toFixed(0)}k</td><td style={{ padding: "10px 14px" }}><div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 40, height: 6, background: B.surfaceHover, borderRadius: 3, overflow: "hidden" }}><div style={{ width: `${c.risk}%`, height: "100%", background: c.risk > 70 ? B.danger : B.warning, borderRadius: 3 }} /></div><span style={{ fontSize: 11, fontWeight: 700, color: c.risk > 70 ? B.danger : B.warning }}>{c.risk}%</span></div></td><td style={{ padding: "10px 14px" }}><Btn variant="primary" style={{ fontSize: 11, padding: "4px 10px" }}>Acción</Btn></td></tr>)}</tbody></table></Card>
    </div>}
    {subTab === "onboarding" && <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 16 }}>
        <Card><div style={{ fontSize: 11, color: B.textMuted }}>Nuevos este mes</div><div style={{ fontSize: 22, fontWeight: 800, color: B.info }}>{totalNew}</div></Card>
        <Card><div style={{ fontSize: 11, color: B.textMuted }}>Conversión 1ra→2da</div><div style={{ fontSize: 22, fontWeight: 800, color: B.warning }}>41%</div></Card>
        <Card><div style={{ fontSize: 11, color: B.textMuted }}>Pendientes 2da visita</div><div style={{ fontSize: 22, fontWeight: 800, color: B.purple }}>38</div></Card>
        <Card><div style={{ fontSize: 11, color: B.textMuted }}>Mejor canal retención</div><div style={{ fontSize: 22, fontWeight: 800, color: B.success }}>Salón</div><div style={{ fontSize: 11, color: B.textMuted }}>52% repite</div></Card>
      </div>
      <Card><h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Funnel de onboarding</h3>{[{ step: "1er contacto", count: 180, pct: 100 },{ step: "1ra compra", count: totalNew, pct: Math.round(totalNew/180*100) },{ step: "2da compra", count: Math.round(totalNew*0.41), pct: Math.round(totalNew*0.41/180*100) },{ step: "3ra compra", count: Math.round(totalNew*0.28), pct: Math.round(totalNew*0.28/180*100) },{ step: "Recurrente", count: Math.round(totalNew*0.18), pct: Math.round(totalNew*0.18/180*100) }].map((s,i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: `1px solid ${B.border}` }}><div style={{ width: 120, fontSize: 13, fontWeight: 600 }}>{s.step}</div><div style={{ flex: 1, height: 10, background: B.surfaceHover, borderRadius: 5, overflow: "hidden" }}><div style={{ width: `${s.pct}%`, height: "100%", background: B.accent, borderRadius: 5 }} /></div><div style={{ fontSize: 14, fontWeight: 700, minWidth: 40, textAlign: "right" }}>{s.count}</div><div style={{ fontSize: 11, color: B.textMuted, minWidth: 35 }}>{s.pct}%</div></div>)}</Card>
    </div>}
    {subTab === "retención" && <Card><h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Playbook de retención</h3><div style={{ fontSize: 13, color: B.textMuted, marginBottom: 16 }}>Cada acción registra resultado: ¿el cliente volvió dentro de 30 días?</div><table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: font }}><thead><tr style={{ borderBottom: `1px solid ${B.border}`, background: "#FAFAF8" }}>{["Tipo acción","Ejecutadas","Recuperados","Tasa","Costo prom.","CLV recuperado"].map(h => <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontWeight: 600, color: B.textMuted, fontSize: 12 }}>{h}</th>)}</tr></thead><tbody>{[{ type: "Oferta personalizada", exec: 12, recov: 6, rate: 50, cost: 3500, clv: 1800000 },{ type: "Contacto directo", exec: 8, recov: 2, rate: 25, cost: 0, clv: 560000 },{ type: "Invitación evento", exec: 5, recov: 2, rate: 40, cost: 5000, clv: 420000 },{ type: "Cross-brand promo", exec: 3, recov: 1, rate: 33, cost: 2000, clv: 195000 }].map((a,i) => <tr key={i} style={{ borderBottom: `1px solid ${B.border}` }}><td style={{ padding: "10px 14px", fontWeight: 600 }}>{a.type}</td><td style={{ padding: "10px 14px" }}>{a.exec}</td><td style={{ padding: "10px 14px", color: B.success, fontWeight: 600 }}>{a.recov}</td><td style={{ padding: "10px 14px" }}><Badge color={a.rate >= 40 ? B.success : B.warning} bg={a.rate >= 40 ? B.successBg : B.warningBg}>{a.rate}%</Badge></td><td style={{ padding: "10px 14px", color: B.textMuted }}>{a.cost > 0 ? `$${a.cost.toLocaleString()}` : "Gratis"}</td><td style={{ padding: "10px 14px", fontWeight: 700 }}>${(a.clv/1e6).toFixed(1)}M</td></tr>)}</tbody></table></Card>}
  </div>;
}

function CrossBrandView() {
  return <div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 20 }}>
      {BRAND_UNITS.map(unit => { const madre = BRANDS.find(b => b.name === unit.madre); const subs = BRANDS.filter(b => unit.subs.includes(b.name)); return <Card key={unit.id} style={{ borderLeft: `4px solid ${unit.color}` }}><div style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>{unit.name}</div><div style={{ fontSize: 12, color: unit.color, fontWeight: 600, marginBottom: 6 }}>🟢 {unit.madre} — {madre?.activeClients} clientes</div>{subs.map(sub => { const pen = sub.penetration || 0; const gap = madre.activeClients - sub.activeClients; const hl = sub.name === "Buffalo Chicken" || sub.name === "Shibuya Express"; return <div key={sub.id} style={{ padding: "6px 0", borderTop: `1px solid ${B.border}` }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontSize: 12, fontWeight: hl ? 700 : 500, color: hl ? B.warning : B.textMuted }}>{hl ? "🔥 " : "↳ "}{sub.name}</span><Badge color={pen < 10 ? B.danger : pen < 20 ? B.warning : B.success} bg={pen < 10 ? B.dangerBg : pen < 20 ? B.warningBg : B.successBg}>{pen}%</Badge></div><div style={{ fontSize: 11, color: B.textMuted }}>{sub.activeClients} clientes · Gap: {gap} potenciales</div><div style={{ height: 4, background: B.surfaceHover, borderRadius: 2, marginTop: 4 }}><div style={{ width: `${pen}%`, height: "100%", background: hl ? B.warning : B.textLight, borderRadius: 2 }} /></div></div>; })}</Card>; })}
    </div>
    <Card style={{ border: `1px solid ${B.warning}30`, marginBottom: 14 }}><h3 style={{ fontSize: 14, fontWeight: 700, color: B.warning, marginBottom: 12 }}>🔥 Submarcas prioritarias</h3><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>{[{ name: "Buffalo Chicken", madre: "Cheddar's", pen: 8, target: 20, gap: 455, activeClients: 65, avgTicket: 7200 },{ name: "Shibuya Express", madre: "Tori Sushi", pen: 12, target: 20, gap: 295, activeClients: 85, avgTicket: 8800 }].map(sub => <div key={sub.name} style={{ padding: "12px 16px", background: B.surfaceHover, borderRadius: 10 }}><div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{sub.name}</div><div style={{ fontSize: 12, color: B.textMuted, marginBottom: 8 }}>{sub.pen}% penetración sobre {sub.madre} → Meta: {sub.target}% en 6 meses</div><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}><div><div style={{ fontSize: 11, color: B.textMuted }}>Gap</div><div style={{ fontSize: 16, fontWeight: 800, color: B.danger }}>{sub.gap}</div></div><div><div style={{ fontSize: 11, color: B.textMuted }}>Activos</div><div style={{ fontSize: 16, fontWeight: 800 }}>{sub.activeClients}</div></div><div><div style={{ fontSize: 11, color: B.textMuted }}>Ticket</div><div style={{ fontSize: 16, fontWeight: 800 }}>${(sub.avgTicket/1000).toFixed(1)}k</div></div></div><div style={{ marginTop: 10, padding: "8px 12px", background: B.surface, borderRadius: 8, border: `1px solid ${B.border}` }}><div style={{ fontSize: 12, fontWeight: 600, color: B.text }}>Pipeline: con 10% conversión = {Math.round(sub.gap*0.1)} clientes nuevos sin costo de adquisición</div></div></div>)}</div></Card>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
      <Card><div style={{ fontSize: 11, color: B.textMuted }}>Mono-marca</div><div style={{ fontSize: 22, fontWeight: 800, color: B.danger }}>72%</div><div style={{ fontSize: 11, color: B.textMuted }}>Solo compran en 1 marca</div></Card>
      <Card><div style={{ fontSize: 11, color: B.textMuted }}>Multi-marca</div><div style={{ fontSize: 22, fontWeight: 800, color: B.success }}>28%</div><div style={{ fontSize: 11, color: B.textMuted }}>Compran en 2+ marcas</div></Card>
      <Card><div style={{ fontSize: 11, color: B.textMuted }}>CLV multi vs mono</div><div style={{ fontSize: 22, fontWeight: 800, color: B.purple }}>2.8x</div><div style={{ fontSize: 11, color: B.textMuted }}>Multi-marca vale casi 3x más</div></Card>
    </div>
  </div>;
}

function CampanasView() {
  const SM = { activa: { color: B.success, bg: B.successBg }, evaluada: { color: B.info, bg: B.infoBg }, planificada: { color: B.purple, bg: B.purpleBg }, finalizada: { color: B.textMuted, bg: B.surfaceHover } };
  return <div>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}><Select value="all" onChange={() => {}} options={[{ value: "all", label: "Todas las marcas" }, ...BRANDS.map(b => ({ value: b.id, label: b.name }))]} /><Btn variant="primary">+ Nueva campaña</Btn></div>
    <Card style={{ padding: 0, overflow: "hidden" }}><table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: font }}><thead><tr style={{ borderBottom: `1px solid ${B.border}`, background: "#FAFAF8" }}>{["Campaña","Marca","Tipo","Período","Estado","Venta bruta","Margen","Clientes nuevos"].map(h => <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontWeight: 600, color: B.textMuted, fontSize: 12 }}>{h}</th>)}</tr></thead><tbody>{CAMPAIGNS.map(c => { const st = SM[c.status]; return <tr key={c.id} style={{ borderBottom: `1px solid ${B.border}`, cursor: "pointer" }} onMouseEnter={e => e.currentTarget.style.background = B.surfaceHover} onMouseLeave={e => e.currentTarget.style.background = "transparent"}><td style={{ padding: "10px 14px", fontWeight: 600 }}>{c.name}</td><td style={{ padding: "10px 14px", color: B.textMuted }}>{c.brand}</td><td style={{ padding: "10px 14px" }}><Badge>{c.type}</Badge></td><td style={{ padding: "10px 14px", color: B.textMuted, fontSize: 12 }}>{c.start} — {c.end}</td><td style={{ padding: "10px 14px" }}><Badge color={st.color} bg={st.bg}>{c.status}</Badge></td><td style={{ padding: "10px 14px", fontWeight: 600 }}>{c.ventaBruta > 0 ? `$${(c.ventaBruta/1e6).toFixed(1)}M` : "—"}</td><td style={{ padding: "10px 14px", fontWeight: 700, color: c.margen > 0 ? B.success : c.margen < 0 ? B.danger : B.textMuted }}>{c.margen !== 0 ? `$${(c.margen/1000).toFixed(0)}k` : "—"}</td><td style={{ padding: "10px 14px", color: c.newClients > 0 ? B.success : B.textMuted, fontWeight: 600 }}>{c.newClients > 0 ? `+${c.newClients}` : "—"}</td></tr>; })}</tbody></table></Card>
    <Card style={{ marginTop: 14, background: `${B.accent}08`, border: `1px solid ${B.accent}35` }}><div style={{ fontSize: 13, lineHeight: 1.6 }}><strong>Evaluación por margen, no por volumen.</strong> Cada campaña se mide por margen de contribución real. La campaña 2x1 Buffalo trae volumen pero destruye margen.</div></Card>
  </div>;
}

function RentabilidadView() {
  const [qf, setQf] = useState("all");
  let filtered = [...PRODUCT_MIX]; if (qf !== "all") filtered = filtered.filter(p => p.quadrant === qf);
  return <div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 16 }}>
      <Card><div style={{ fontSize: 11, color: B.textMuted }}>Venta bruta mes</div><div style={{ fontSize: 22, fontWeight: 800, color: B.purple }}>$92M</div></Card>
      <Card><div style={{ fontSize: 11, color: B.textMuted }}>Ingreso neto</div><div style={{ fontSize: 22, fontWeight: 800, color: B.info }}>$78M</div><div style={{ fontSize: 11, color: B.textMuted }}>Post comisiones</div></Card>
      <Card><div style={{ fontSize: 11, color: B.textMuted }}>Margen contribución</div><div style={{ fontSize: 22, fontWeight: 800, color: B.success }}>$31M</div><div style={{ fontSize: 11, color: B.textMuted }}>Lo que realmente queda</div></Card>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 16 }}>{Object.entries(QUADRANT_COLORS).map(([key, q]) => { const count = PRODUCT_MIX.filter(p => p.quadrant === key).length; const isA = qf === key; return <button key={key} onClick={() => setQf(isA ? "all" : key)} style={{ padding: "10px 14px", borderRadius: 10, cursor: "pointer", fontFamily: font, textAlign: "left", border: isA ? `2px solid ${q.color}` : `1px solid ${B.border}`, background: isA ? q.bg : B.surface }}><div style={{ fontSize: 13, fontWeight: 700, color: q.color }}>{q.label}</div><div style={{ fontSize: 11, color: B.textMuted }}>{q.desc}</div><div style={{ fontSize: 16, fontWeight: 800, color: q.color, marginTop: 4 }}>{count}</div></button>; })}</div>
    <Card style={{ padding: 0, overflow: "hidden" }}><table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: font }}><thead><tr style={{ borderBottom: `1px solid ${B.border}`, background: "#FAFAF8" }}>{["Producto","Marca","Volumen/mes","Margen %","Cuadrante"].map(h => <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontWeight: 600, color: B.textMuted, fontSize: 12 }}>{h}</th>)}</tr></thead><tbody>{filtered.sort((a,b) => (b.volume*b.margin)-(a.volume*a.margin)).map((p,i) => { const q = QUADRANT_COLORS[p.quadrant]; return <tr key={i} style={{ borderBottom: `1px solid ${B.border}` }} onMouseEnter={e => e.currentTarget.style.background = B.surfaceHover} onMouseLeave={e => e.currentTarget.style.background = "transparent"}><td style={{ padding: "10px 14px", fontWeight: 600 }}>{p.name}</td><td style={{ padding: "10px 14px", color: B.textMuted }}>{p.brand}</td><td style={{ padding: "10px 14px", fontWeight: 700 }}>{p.volume}</td><td style={{ padding: "10px 14px", fontWeight: 700, color: p.margin >= 35 ? B.success : p.margin >= 25 ? B.text : B.danger }}>{p.margin}%</td><td style={{ padding: "10px 14px" }}><Badge color={q.color} bg={q.bg}>{q.label}</Badge></td></tr>; })}</tbody></table></Card>
    <Card style={{ marginTop: 14, background: B.infoBg, border: `1px solid ${B.info}22` }}><div style={{ fontSize: 12, color: B.text, lineHeight: 1.5 }}><strong>Fuente:</strong> <code style={{ fontSize: 11, background: "#fff", padding: "1px 4px", borderRadius: 3 }}>order_items</code> × <code style={{ fontSize: 11, background: "#fff", padding: "1px 4px", borderRadius: 3 }}>bom_items</code> × <code style={{ fontSize: 11, background: "#fff", padding: "1px 4px", borderRadius: 3 }}>supply_cost_log</code> vs <code style={{ fontSize: 11, background: "#fff", padding: "1px 4px", borderRadius: 3 }}>products.price</code>.</div></Card>
  </div>;
}

function ReporteView() {
  const secs = [{ title: "Salud base de clientes", status: "ok", metrics: `${totalActive} activos · +${totalNew-totalChurned} neto · 41% conversión 1ra→2da` },{ title: "Performance campañas", status: "warning", metrics: "3 activas · 1 con margen negativo (Buffalo 2x1) · $640k margen Combo Familiar" },{ title: "Cross-brand y submarcas", status: "danger", metrics: "72% mono-marca · Buffalo 8% pen. · Shibuya 12% pen. · Meta: 20% en 6 meses" },{ title: "Ingreso rentable", status: "ok", metrics: "$92M venta → $78M neto → $31M margen · 38% en productos estrella" },{ title: "Retención", status: "warning", metrics: "47 clientes en riesgo · $6.2M CLV · 38% tasa recuperación" }];
  const sc = { ok: B.success, warning: B.warning, danger: B.danger };
  return <div>
    <Card style={{ marginBottom: 14 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><div><h3 style={{ fontSize: 16, fontWeight: 700, fontFamily: serif }}>Reporte Comercial Integrado</h3><div style={{ fontSize: 12, color: B.textMuted, marginTop: 2 }}>Abril 2026 · Generado automáticamente</div></div><div style={{ display: "flex", gap: 8 }}><Btn variant="primary">📥 Exportar PDF</Btn><Btn>Compartir con CEO</Btn></div></div></Card>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
      <Card><div style={{ fontSize: 11, color: B.textMuted }}>Score comercial</div><div style={{ fontSize: 28, fontWeight: 800, color: B.warning }}>7.2<span style={{ fontSize: 14, color: B.textMuted }}>/10</span></div><div style={{ fontSize: 11, color: B.success }}>+0.4 vs mes anterior</div></Card>
      <Card><div style={{ fontSize: 11, color: B.textMuted }}>Meta venta mes</div><div style={{ fontSize: 28, fontWeight: 800 }}>$85M</div><div style={{ fontSize: 11, color: B.textMuted }}>Avance: $92M (108%)</div></Card>
    </div>
    {secs.map((s,i) => <Card key={i} style={{ marginBottom: 10, borderLeft: `4px solid ${sc[s.status]}` }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><div><div style={{ fontSize: 14, fontWeight: 700 }}>{s.title}</div><div style={{ fontSize: 12, color: B.textMuted, marginTop: 4, lineHeight: 1.4 }}>{s.metrics}</div></div><div style={{ width: 12, height: 12, borderRadius: "50%", background: sc[s.status], flexShrink: 0 }} /></div></Card>)}
    <Card style={{ marginTop: 14, background: `${B.purple}08`, border: `1px solid ${B.purple}22` }}><div style={{ fontSize: 12, lineHeight: 1.5 }}><strong>↗ Conexión Agente CEO:</strong> Este reporte alimenta directamente al Agente CEO para su briefing ejecutivo. Las decisiones quedan en <code style={{ fontSize: 11, background: "#fff", padding: "1px 4px", borderRadius: 3 }}>agent_decisions</code> para aprendizaje futuro.</div></Card>
  </div>;
}

export default function ComercialModule() {
  const [tab, setTab] = useState("dashboard");
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => { function check() { setIsMobile(window.innerWidth < 900); } check(); window.addEventListener("resize", check); return () => window.removeEventListener("resize", check); }, []);
  const TABS = [{ id: "dashboard", label: "Dashboard", icon: "📊" },{ id: "clientes", label: "Clientes", icon: "👥", badge: CHURN_RISK.length, badgeColor: B.dangerBg, badgeTextColor: B.danger },{ id: "crossbrand", label: "Cross-Brand", icon: "🔗" },{ id: "campanas", label: "Campañas", icon: "📣" },{ id: "reporte", label: "Reporte", icon: "📄" }];
  return <div style={{ fontFamily: font, background: "#F5F4F0", minHeight: "100vh" }}>
    <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&family=DM+Serif+Display&display=swap');*{box-sizing:border-box;margin:0;padding:0}input:focus,select:focus{outline:none;border-color:${B.accent} !important}::-webkit-scrollbar{width:5px;height:5px}::-webkit-scrollbar-thumb{background:#d4d2cd;border-radius:3px}`}</style>
    <header style={{ background: B.surface, borderBottom: `1px solid ${B.border}`, position: "sticky", top: 0, zIndex: 100 }}>
      <div style={{ padding: "0 24px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between" }}><div style={{ display: "flex", alignItems: "center", gap: 10 }}><div style={{ width: 32, height: 32, background: B.accent, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 16, color: B.primary, fontFamily: serif }}>C</div><div style={{ lineHeight: 1.1 }}><div style={{ fontFamily: serif, fontSize: 14, fontWeight: 700, color: B.text }}>Cheddar's</div><div style={{ fontSize: 9, color: B.textMuted, fontWeight: 500, letterSpacing: 1.5, textTransform: "uppercase" }}>West Coast</div></div></div><div style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ fontSize: 16, cursor: "pointer" }}>🔔</span><div style={{ width: 30, height: 30, borderRadius: "50%", background: B.accent, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 12, color: B.primary }}>PF</div></div></div>
      {!isMobile && <div style={{ padding: "0 24px", display: "flex", gap: 2, borderTop: `1px solid ${B.border}`, height: 40, alignItems: "center" }}>{["Dashboard","Inventario","Compras","Pedidos","Despacho","Producción","Calidad","Finanzas","Comercial","Más"].map(n => <span key={n} style={{ padding: "6px 11px", fontSize: 13, fontWeight: n === "Comercial" ? 650 : 500, color: n === "Comercial" ? B.text : B.textMuted, borderBottom: n === "Comercial" ? `2px solid ${B.accent}` : "2px solid transparent", cursor: "pointer" }}>{n}</span>)}</div>}
    </header>
    <main style={{ padding: isMobile ? 16 : "20px 32px", maxWidth: 1320, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}><div><h1 style={{ fontSize: isMobile ? 20 : 24, fontWeight: 800, color: B.text, fontFamily: serif }}>🤝 Comercial</h1><p style={{ fontSize: 13, color: B.textMuted, marginTop: 2 }}>10 marcas · {totalActive} clientes activos · Función objetivo: maximizar utilidad</p></div></div>
      <TabBar tabs={TABS} active={tab} onChange={setTab} />
      {tab === "dashboard" && <DashboardView />}
      {tab === "clientes" && <ClientesView />}
      {tab === "crossbrand" && <CrossBrandView />}
      {tab === "campanas" && <CampanasView />}
      {tab === "reporte" && <ReporteView />}
    </main>
  </div>;
}
