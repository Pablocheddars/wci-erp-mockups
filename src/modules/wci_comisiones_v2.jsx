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

const fmt = (n) => Math.abs(n) >= 1000000 ? `$${(n / 1000000).toFixed(1)}M` : Math.abs(n) >= 1000 ? `$${(n / 1000).toFixed(0)}K` : `$${n.toLocaleString()}`;

const CHANNELS = [
  { id: "ubereats", name: "UberEats", icon: "🟢" },
  { id: "rappi", name: "Rappi", icon: "🟠" },
  { id: "pedidosya", name: "PedidosYa", icon: "🔴" },
  { id: "mp", name: "MercadoPago", icon: "💙" },
  { id: "prep", name: "Prep Ecommerce", icon: "🟡" },
];

const LEGAL_ENTITIES = [
  { id: "angol", name: "Cheddars Angol Spa", rut: "77.123.456-7", locals: ["Cheddar's Angol"] },
  { id: "brooklyn", name: "Brooklyn Spa", rut: "77.234.567-8", locals: ["Cheddar's Barros Arana"] },
  { id: "venore", name: "Venore Spa", rut: "77.345.678-9", locals: ["Cheddar's Collao"] },
  { id: "gastro", name: "Comercial Gastronómica Spa", rut: "78.456.789-0", locals: ["DK Alley Burger"] },
  { id: "mexicana", name: "Comida Mexicana Al Paso E.I.R.L.", rut: "79.789.012-3", locals: ["DK La Wera"] },
];

// Matrix: legal_entity × channel = commission %
const COMMISSION_MATRIX = {
  angol:    { ubereats: 30, rappi: 25, pedidosya: 22, mp: 3.5, prep: 0 },
  brooklyn: { ubereats: 30, rappi: 25, pedidosya: 22, mp: 4.0, prep: 0 },
  venore:   { ubereats: 30, rappi: 25, pedidosya: null, mp: 3.5, prep: 0 },
  gastro:   { ubereats: 25, rappi: 22, pedidosya: null, mp: 3.5, prep: 0 },
  mexicana: { ubereats: 28, rappi: null, pedidosya: 20, mp: 4.0, prep: 0 },
};

// Monthly sales by legal entity × channel
const MONTHLY_SALES = {
  angol:    { ubereats: 3200000, rappi: 1800000, pedidosya: 900000, mp: 1500000, prep: 200000 },
  brooklyn: { ubereats: 2100000, rappi: 1200000, pedidosya: 800000, mp: 800000, prep: 150000 },
  venore:   { ubereats: 2500000, rappi: 1400000, pedidosya: 0, mp: 1100000, prep: 180000 },
  gastro:   { ubereats: 1800000, rappi: 900000, pedidosya: 0, mp: 600000, prep: 0 },
  mexicana: { ubereats: 1200000, rappi: 0, pedidosya: 500000, mp: 400000, prep: 0 },
};

// Real charged (from bank/reconciliation) — may differ from configured
const REAL_CHARGED = {
  angol:    { ubereats: 960000, rappi: 450000, pedidosya: 198000, mp: 52500, prep: 0 },
  brooklyn: { ubereats: 630000, rappi: 312000, pedidosya: 176000, mp: 33600, prep: 0 },
  venore:   { ubereats: 750000, rappi: 364000, pedidosya: 0, mp: 38500, prep: 0 },
  gastro:   { ubereats: 450000, rappi: 198000, pedidosya: 0, mp: 22500, prep: 0 },
  mexicana: { ubereats: 348000, rappi: 0, pedidosya: 100000, mp: 17600, prep: 0 },
};

const HISTORY = [
  { date: "01/03/2026", entity: "Comercial Gastronómica", channel: "UberEats", before: 28, after: 25, user: "Pablo", note: "Negociado por volumen Dark Kitchen" },
  { date: "15/02/2026", entity: "Comida Mexicana Al Paso", channel: "PedidosYa", before: 22, after: 20, note: "Acuerdo exclusividad La Wera" },
  { date: "01/01/2026", entity: "Todas", channel: "Rappi", before: 27, after: 25, note: "Renegociación anual" },
  { date: "15/12/2025", entity: "Brooklyn Spa", channel: "MercadoPago", before: 3.5, after: 4.0, note: "MP subió tarifa" },
];

export default function ComisionesV2() {
  const [view, setView] = useState("config");
  const [editingCell, setEditingCell] = useState(null); // "entityId-channelId"
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function check() { setIsMobile(window.innerWidth < 900); }
    check(); window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Totals
  let totalSales = 0, totalConfigured = 0, totalReal = 0;
  LEGAL_ENTITIES.forEach(le => {
    CHANNELS.forEach(ch => {
      const sales = MONTHLY_SALES[le.id]?.[ch.id] || 0;
      const pct = COMMISSION_MATRIX[le.id]?.[ch.id];
      const real = REAL_CHARGED[le.id]?.[ch.id] || 0;
      totalSales += sales;
      if (pct !== null && pct > 0) totalConfigured += Math.round(sales * pct / 100);
      totalReal += real;
    });
  });
  const totalDiff = totalReal - totalConfigured;

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
        <div style={{ marginBottom: 16 }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, fontFamily: serif }}>📊 Finanzas → Comisiones</h1>
          <p style={{ fontSize: 13, color: B.textMuted, marginTop: 2 }}>Comisión por razón social × canal. Cada contrato es independiente.</p>
        </div>

        {/* Summary */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 16 }}>
          <Card style={{ padding: "12px 16px", textAlign: "center" }}>
            <div style={{ fontSize: 12, color: B.textMuted }}>Ventas con comisión (marzo)</div>
            <div style={{ fontSize: 22, fontWeight: 800 }}>{fmt(totalSales)}</div>
          </Card>
          <Card style={{ padding: "12px 16px", textAlign: "center" }}>
            <div style={{ fontSize: 12, color: B.textMuted }}>Comisión esperada</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: B.danger }}>{fmt(totalConfigured)}</div>
          </Card>
          <Card style={{ padding: "12px 16px", textAlign: "center" }}>
            <div style={{ fontSize: 12, color: B.textMuted }}>Comisión real cobrada</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: B.danger }}>{fmt(totalReal)}</div>
          </Card>
          <Card style={{ padding: "12px 16px", textAlign: "center" }}>
            <div style={{ fontSize: 12, color: B.textMuted }}>Diferencia</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: totalDiff > 5000 ? B.danger : totalDiff < -5000 ? B.success : B.success }}>
              {totalDiff > 0 ? "+" : ""}{fmt(totalDiff)}
            </div>
          </Card>
        </div>

        {/* Sub-nav */}
        <div style={{ display: "flex", gap: 2, borderBottom: `1px solid ${B.border}`, marginBottom: 20 }}>
          {[
            { id: "config", label: "⚙️ Matriz de comisiones" },
            { id: "tracking", label: "🔍 Seguimiento real vs config" },
            { id: "analysis", label: "📈 Análisis + historial" },
          ].map(t => (
            <button key={t.id} onClick={() => setView(t.id)} style={{
              padding: "10px 14px", border: "none", background: "transparent", fontSize: 13,
              fontWeight: view === t.id ? 650 : 500, color: view === t.id ? B.text : B.textMuted,
              borderBottom: view === t.id ? `2px solid ${B.accent}` : "2px solid transparent",
              cursor: "pointer", fontFamily: font,
            }}>{t.label}</button>
          ))}
        </div>

        {/* ═══ CONFIG: MATRIX ═══ */}
        {view === "config" && (
          <div>
            <Card style={{ marginBottom: 14, background: B.infoBg, border: `1px solid ${B.info}20` }}>
              <div style={{ fontSize: 13 }}>
                <span style={{ fontWeight: 600 }}>Matriz razón social × canal.</span>
                <span style={{ color: B.textMuted, marginLeft: 6 }}>Cada celda es la comisión % de ese contrato específico. Click en cualquier celda para editar. "—" = canal no activo para esa razón social.</span>
              </div>
            </Card>

            <Card style={{ padding: 0, overflow: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: font, minWidth: 800 }}>
                <thead>
                  <tr style={{ borderBottom: `2px solid ${B.border}`, background: "#FAFAF8" }}>
                    <th style={{ padding: "10px 12px", textAlign: "left", fontWeight: 700, color: B.text, fontSize: 12, minWidth: 200 }}>Razón social</th>
                    {CHANNELS.map(ch => (
                      <th key={ch.id} style={{ padding: "10px 8px", textAlign: "center", fontWeight: 600, color: B.textMuted, fontSize: 11, minWidth: 100 }}>
                        <div>{ch.icon}</div>
                        <div>{ch.name}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {LEGAL_ENTITIES.map(le => (
                    <tr key={le.id} style={{ borderBottom: `1px solid ${B.border}` }}>
                      <td style={{ padding: "10px 12px" }}>
                        <div style={{ fontWeight: 600 }}>{le.name}</div>
                        <div style={{ fontSize: 11, color: B.textMuted }}>{le.rut} · {le.locals.join(", ")}</div>
                      </td>
                      {CHANNELS.map(ch => {
                        const pct = COMMISSION_MATRIX[le.id]?.[ch.id];
                        const cellKey = `${le.id}-${ch.id}`;
                        const isEditing = editingCell === cellKey;
                        const isNull = pct === null;
                        const isZero = pct === 0;

                        return (
                          <td key={ch.id} style={{ padding: "6px 4px", textAlign: "center" }}>
                            {isEditing ? (
                              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}>
                                <input type="number" defaultValue={pct || ""} step="0.5" autoFocus style={{
                                  width: 50, padding: "6px 4px", border: `2px solid ${B.accent}`,
                                  borderRadius: 6, fontSize: 14, fontWeight: 700, fontFamily: font, textAlign: "center",
                                }} />
                                <span style={{ fontSize: 11, color: B.textMuted }}>%</span>
                                <button onClick={() => setEditingCell(null)} style={{ border: "none", background: B.accent, color: B.primary, borderRadius: 4, padding: "4px 6px", cursor: "pointer", fontSize: 10, fontWeight: 700 }}>✓</button>
                              </div>
                            ) : (
                              <button onClick={() => setEditingCell(cellKey)} style={{
                                border: "none", cursor: "pointer", fontFamily: font,
                                padding: "8px 12px", borderRadius: 8, width: "100%",
                                background: isNull ? "transparent" : isZero ? B.successBg : `${B.danger}${Math.min(Math.round(pct * 2), 30).toString(16).padStart(2, "0")}`,
                                fontSize: 15, fontWeight: 800,
                                color: isNull ? B.textLight : isZero ? B.success : B.danger,
                                transition: "background 0.1s",
                              }}
                                onMouseEnter={e => { if (!isNull) e.currentTarget.style.outline = `2px solid ${B.accent}`; }}
                                onMouseLeave={e => e.currentTarget.style.outline = "none"}>
                                {isNull ? "—" : isZero ? "0%" : `${pct}%`}
                              </button>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>

            <div style={{ fontSize: 12, color: B.textMuted, marginTop: 10 }}>
              Tabla en DB: <code style={{ background: B.surfaceHover, padding: "1px 4px", borderRadius: 3 }}>channel_commissions</code> con <code style={{ background: B.surfaceHover, padding: "1px 4px", borderRadius: 3 }}>legal_entity_id + channel_id + commission_pct + effective_from</code>
            </div>
          </div>
        )}

        {/* ═══ TRACKING ═══ */}
        {view === "tracking" && (
          <div>
            {totalDiff > 5000 && (
              <Card style={{ background: B.dangerBg, border: `1px solid ${B.danger}20`, marginBottom: 14 }}>
                <div style={{ fontSize: 13 }}>
                  <span style={{ fontWeight: 700, color: B.danger }}>⚠️ Diferencia detectada:</span>
                  <span style={{ color: B.textMuted, marginLeft: 6 }}>Nos cobraron {fmt(totalDiff)} más de lo esperado. Ver desglose por razón social abajo.</span>
                </div>
              </Card>
            )}

            {LEGAL_ENTITIES.map(le => {
              const entityChannels = CHANNELS.filter(ch => COMMISSION_MATRIX[le.id]?.[ch.id] !== null && COMMISSION_MATRIX[le.id]?.[ch.id] > 0);
              if (entityChannels.length === 0) return null;

              let entityExpected = 0, entityReal = 0;
              entityChannels.forEach(ch => {
                const sales = MONTHLY_SALES[le.id]?.[ch.id] || 0;
                const pct = COMMISSION_MATRIX[le.id]?.[ch.id] || 0;
                entityExpected += Math.round(sales * pct / 100);
                entityReal += REAL_CHARGED[le.id]?.[ch.id] || 0;
              });
              const entityDiff = entityReal - entityExpected;
              const hasDiff = Math.abs(entityDiff) > 1000;

              return (
                <Card key={le.id} style={{ marginBottom: 12, padding: 0, overflow: "hidden", border: hasDiff ? `1px solid ${B.warning}40` : `1px solid ${B.border}` }}>
                  <div style={{ padding: "10px 16px", background: hasDiff ? B.warningBg : "#FAFAF8", borderBottom: `1px solid ${B.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <span style={{ fontSize: 14, fontWeight: 700 }}>{le.name}</span>
                      <span style={{ fontSize: 12, color: B.textMuted, marginLeft: 8 }}>{le.rut} · {le.locals.join(", ")}</span>
                    </div>
                    <div style={{ display: "flex", gap: 12, fontSize: 12 }}>
                      <span style={{ color: B.textMuted }}>Esperado: {fmt(entityExpected)}</span>
                      <span style={{ color: B.danger, fontWeight: 600 }}>Real: {fmt(entityReal)}</span>
                      {hasDiff && <Badge color={entityDiff > 0 ? B.danger : B.success} bg={entityDiff > 0 ? B.dangerBg : B.successBg}>{entityDiff > 0 ? "+" : ""}{fmt(entityDiff)}</Badge>}
                      {!hasDiff && <Badge color={B.success} bg={B.successBg}>✓ OK</Badge>}
                    </div>
                  </div>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: font }}>
                    <thead>
                      <tr style={{ borderBottom: `1px solid ${B.border}` }}>
                        {["Canal", "Ventas", "Comisión config.", "Esperado", "Real cobrado", "% real", "Δ"].map(h =>
                          <th key={h} style={{ padding: "8px 12px", textAlign: h === "Canal" ? "left" : "right", fontWeight: 600, color: B.textMuted, fontSize: 11 }}>{h}</th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {entityChannels.map(ch => {
                        const sales = MONTHLY_SALES[le.id]?.[ch.id] || 0;
                        const pct = COMMISSION_MATRIX[le.id]?.[ch.id] || 0;
                        const expected = Math.round(sales * pct / 100);
                        const real = REAL_CHARGED[le.id]?.[ch.id] || 0;
                        const realPct = sales > 0 ? (real / sales * 100).toFixed(1) : "0.0";
                        const diff = real - expected;
                        const cellDiff = Math.abs(diff) > 500;

                        return (
                          <tr key={ch.id} style={{ borderBottom: `1px solid ${B.border}`, background: cellDiff ? `${B.warning}06` : "transparent" }}>
                            <td style={{ padding: "8px 12px", fontWeight: 600 }}>{ch.icon} {ch.name}</td>
                            <td style={{ padding: "8px 12px", textAlign: "right" }}>{fmt(sales)}</td>
                            <td style={{ padding: "8px 12px", textAlign: "right", color: B.textMuted }}>{pct}%</td>
                            <td style={{ padding: "8px 12px", textAlign: "right", color: B.textMuted }}>{fmt(expected)}</td>
                            <td style={{ padding: "8px 12px", textAlign: "right", fontWeight: 700, color: B.danger }}>{fmt(real)}</td>
                            <td style={{ padding: "8px 12px", textAlign: "right", fontWeight: 700, color: parseFloat(realPct) > pct ? B.danger : B.success }}>{realPct}%</td>
                            <td style={{ padding: "8px 12px", textAlign: "right" }}>
                              {cellDiff
                                ? <Badge color={diff > 0 ? B.danger : B.success} bg={diff > 0 ? B.dangerBg : B.successBg}>{diff > 0 ? "+" : ""}{fmt(diff)}</Badge>
                                : <Badge color={B.success} bg={B.successBg}>✓</Badge>}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </Card>
              );
            })}
          </div>
        )}

        {/* ═══ ANALYSIS ═══ */}
        {view === "analysis" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
              {/* By platform total */}
              <Card>
                <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>💸 Total pagado por plataforma (marzo)</h4>
                {CHANNELS.filter(ch => {
                  let total = 0;
                  LEGAL_ENTITIES.forEach(le => { total += REAL_CHARGED[le.id]?.[ch.id] || 0; });
                  return total > 0;
                }).sort((a, b) => {
                  let tA = 0, tB = 0;
                  LEGAL_ENTITIES.forEach(le => { tA += REAL_CHARGED[le.id]?.[a.id] || 0; tB += REAL_CHARGED[le.id]?.[b.id] || 0; });
                  return tB - tA;
                }).map(ch => {
                  let total = 0, sales = 0;
                  LEGAL_ENTITIES.forEach(le => { total += REAL_CHARGED[le.id]?.[ch.id] || 0; sales += MONTHLY_SALES[le.id]?.[ch.id] || 0; });
                  const maxTotal = 2400000;
                  return (
                    <div key={ch.id} style={{ marginBottom: 10 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 3 }}>
                        <span style={{ fontWeight: 600 }}>{ch.icon} {ch.name}</span>
                        <span style={{ fontWeight: 700, color: B.danger }}>{fmt(total)} <span style={{ fontWeight: 400, color: B.textMuted }}>({(total / sales * 100).toFixed(1)}% prom.)</span></span>
                      </div>
                      <div style={{ height: 8, background: B.surfaceHover, borderRadius: 4 }}>
                        <div style={{ width: `${(total / maxTotal) * 100}%`, height: "100%", background: B.danger, borderRadius: 4, opacity: 0.7 }} />
                      </div>
                    </div>
                  );
                })}
              </Card>

              {/* By entity total */}
              <Card>
                <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>🏢 Total pagado por razón social</h4>
                {LEGAL_ENTITIES.map(le => {
                  let total = 0, sales = 0;
                  CHANNELS.forEach(ch => { total += REAL_CHARGED[le.id]?.[ch.id] || 0; sales += MONTHLY_SALES[le.id]?.[ch.id] || 0; });
                  if (total === 0) return null;
                  return (
                    <div key={le.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: `1px solid ${B.border}` }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>{le.name}</div>
                        <div style={{ fontSize: 11, color: B.textMuted }}>{le.locals.join(", ")}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: B.danger }}>{fmt(total)}</div>
                        <div style={{ fontSize: 11, color: B.textMuted }}>{sales > 0 ? (total / sales * 100).toFixed(1) : 0}% de ventas</div>
                      </div>
                    </div>
                  );
                })}
              </Card>
            </div>

            {/* Comparison between entities for same platform */}
            <Card style={{ marginBottom: 14 }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>🔎 ¿Quién paga más por la misma plataforma?</h4>
              <div style={{ fontSize: 12, color: B.textMuted, marginBottom: 10 }}>Comparar comisiones entre razones sociales para detectar oportunidades de negociación.</div>
              {CHANNELS.filter(ch => {
                const pcts = LEGAL_ENTITIES.map(le => COMMISSION_MATRIX[le.id]?.[ch.id]).filter(p => p !== null && p > 0);
                return new Set(pcts).size > 1;
              }).map(ch => {
                const entities = LEGAL_ENTITIES.filter(le => COMMISSION_MATRIX[le.id]?.[ch.id] !== null && COMMISSION_MATRIX[le.id]?.[ch.id] > 0);
                const sorted = [...entities].sort((a, b) => (COMMISSION_MATRIX[a.id]?.[ch.id] || 0) - (COMMISSION_MATRIX[b.id]?.[ch.id] || 0));
                const minPct = COMMISSION_MATRIX[sorted[0].id]?.[ch.id] || 0;
                const maxPct = COMMISSION_MATRIX[sorted[sorted.length - 1].id]?.[ch.id] || 0;

                return (
                  <div key={ch.id} style={{ marginBottom: 12, padding: "10px 14px", background: B.surfaceHover, borderRadius: 8 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                      <span style={{ fontSize: 14, fontWeight: 700 }}>{ch.icon} {ch.name}</span>
                      <Badge color={maxPct - minPct > 3 ? B.warning : B.success} bg={maxPct - minPct > 3 ? B.warningBg : B.successBg}>
                        Rango: {minPct}% — {maxPct}% (Δ {maxPct - minPct}pp)
                      </Badge>
                    </div>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {sorted.map(le => {
                        const pct = COMMISSION_MATRIX[le.id]?.[ch.id] || 0;
                        const isBest = pct === minPct;
                        const isWorst = pct === maxPct && maxPct !== minPct;
                        return (
                          <div key={le.id} style={{
                            padding: "6px 10px", borderRadius: 6, fontSize: 12,
                            background: isBest ? B.successBg : isWorst ? B.dangerBg : B.surface,
                            border: `1px solid ${isBest ? B.success : isWorst ? B.danger : B.border}20`,
                          }}>
                            <span style={{ fontWeight: 600 }}>{le.locals[0]}</span>
                            <span style={{ fontWeight: 800, marginLeft: 6, color: isBest ? B.success : isWorst ? B.danger : B.text }}>{pct}%</span>
                            {isBest && <span style={{ fontSize: 10, marginLeft: 4, color: B.success }}>mejor</span>}
                            {isWorst && <span style={{ fontSize: 10, marginLeft: 4, color: B.danger }}>negociar</span>}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </Card>

            {/* History */}
            <Card>
              <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>📜 Historial de cambios</h4>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: font }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${B.border}`, background: "#FAFAF8" }}>
                    {["Fecha", "Razón social", "Canal", "Antes", "Después", "Δ", "Nota"].map(h =>
                      <th key={h} style={{ padding: "8px 10px", textAlign: "left", fontWeight: 600, color: B.textMuted, fontSize: 11 }}>{h}</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {HISTORY.map((h, i) => (
                    <tr key={i} style={{ borderBottom: `1px solid ${B.border}` }}>
                      <td style={{ padding: "8px 10px", color: B.textMuted }}>{h.date}</td>
                      <td style={{ padding: "8px 10px", fontWeight: 600 }}>{h.entity}</td>
                      <td style={{ padding: "8px 10px" }}>{CHANNELS.find(c => c.name === h.channel)?.icon} {h.channel}</td>
                      <td style={{ padding: "8px 10px", color: B.textMuted, textDecoration: "line-through" }}>{h.before}%</td>
                      <td style={{ padding: "8px 10px", fontWeight: 700, color: h.after < h.before ? B.success : B.danger }}>{h.after}%</td>
                      <td style={{ padding: "8px 10px" }}>
                        <Badge color={h.after < h.before ? B.success : B.danger} bg={h.after < h.before ? B.successBg : B.dangerBg}>
                          {h.after < h.before ? "↓" : "↑"} {Math.abs(h.after - h.before)}pp
                        </Badge>
                      </td>
                      <td style={{ padding: "8px 10px", fontSize: 12, color: B.textMuted }}>{h.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
