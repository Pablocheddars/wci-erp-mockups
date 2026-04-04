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
function Btn({ children, variant = "default", onClick, style: sx = {}, disabled }) {
  const styles = { primary: { background: B.accent, color: B.primary, border: "none", fontWeight: 700 }, danger: { background: B.dangerBg, color: B.danger, border: `1px solid ${B.danger}30`, fontWeight: 600 }, success: { background: B.successBg, color: B.success, border: `1px solid ${B.success}30`, fontWeight: 600 }, default: { background: B.surface, color: B.text, border: `1px solid ${B.border}`, fontWeight: 600 }, ghost: { background: "transparent", color: B.textMuted, border: "none", fontWeight: 600 } };
  return <button onClick={onClick} disabled={disabled} style={{ padding: "7px 14px", borderRadius: 8, fontSize: 13, cursor: disabled ? "not-allowed" : "pointer", fontFamily: font, transition: "all 0.12s", opacity: disabled ? 0.5 : 1, ...styles[variant], ...sx }}>{children}</button>;
}
function Card({ children, style: sx = {}, onClick }) {
  return <div onClick={onClick} style={{ background: B.surface, border: `1px solid ${B.border}`, borderRadius: 12, padding: "16px 20px", ...sx }}>{children}</div>;
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
const COMPLAINTS = [
  { id: "REC-045", client: "María Soto", channel: "instagram", channelIcon: "📸", touchpoint: "Entrega", severity: "alta", location: "Cheddar's Angol", status: "assigned", assignee: "Jefe cocina Angol", sla: "2h restantes", text: "Pedí una hamburguesa sin cebolla y llegó con cebolla. Además estaba fría.", date: "04/04 14:30", source: "ManyChat webhook" },
  { id: "REC-044", client: "Juan Pérez", channel: "google", channelIcon: "⭐", touchpoint: "Consumo", severity: "media", location: "Cheddar's Collao", status: "in_progress", assignee: "Admin Collao", sla: "5h restantes", text: "La hamburguesa doble estaba buena pero las papas estaban pasadas de aceite. 3 estrellas.", date: "04/04 11:20", source: "Google Reviews API" },
  { id: "REC-043", client: "Andrea López", channel: "telefono", channelIcon: "📞", touchpoint: "Pago", severity: "alta", location: "Dark Kitchen", status: "open", assignee: null, sla: "Asignar", text: "Me cobraron doble el pedido de delivery. Quiero devolución.", date: "04/04 10:00", source: "Registro manual" },
  { id: "REC-042", client: "Carlos Muñoz", channel: "instagram", channelIcon: "📸", touchpoint: "Espera", severity: "baja", location: "Cheddar's Angol", status: "resolved", assignee: "Enc. turno", sla: "Cerrado", text: "Esperé 40 minutos por mi pedido en mesa, muy lento el servicio hoy.", date: "03/04 20:15", source: "ManyChat webhook", resolution: "Se compensó con postre. Se habló con equipo sobre tiempos." },
  { id: "REC-041", client: "Sofía Vera", channel: "presencial", channelIcon: "🏪", touchpoint: "Despedida", severity: "media", location: "Cheddar's Barros Arana", status: "closed", assignee: "Admin B. Arana", sla: "Cerrado", text: "El mesero fue descortés al pedir la cuenta.", date: "02/04 21:00", source: "Registro manual", resolution: "Disculpas al cliente vía teléfono. Capacitación equipo." },
];

const COMPLAINT_STATUS = {
  open: { label: "Ingresado", color: B.danger, bg: B.dangerBg },
  assigned: { label: "Asignado", color: B.warning, bg: B.warningBg },
  in_progress: { label: "En gestión", color: B.info, bg: B.infoBg },
  resolved: { label: "Resuelto", color: B.success, bg: B.successBg },
  closed: { label: "Cerrado", color: B.textMuted, bg: B.surfaceHover },
};

const TOUCHPOINTS = ["Llegada", "Espera", "Pedido", "Preparación", "Entrega", "Consumo", "Pago", "Despedida"];

const NPS_DATA = {
  overall: 42,
  promoters: 55, passives: 25, detractors: 20,
  byLocation: [
    { location: "Cheddar's Angol", nps: 52, promoters: 62, passives: 20, detractors: 18, trend: "+5" },
    { location: "Cheddar's Collao", nps: 45, promoters: 58, passives: 22, detractors: 20, trend: "+2" },
    { location: "Cheddar's B. Arana", nps: 35, promoters: 50, passives: 28, detractors: 22, trend: "-3" },
    { location: "Dark Kitchen (Alley)", nps: 38, promoters: 52, passives: 24, detractors: 24, trend: "+1" },
    { location: "Dark Kitchen (La Wera)", nps: 30, promoters: 45, passives: 30, detractors: 25, trend: "-5" },
  ],
  recentDetractors: [
    { score: 3, text: "Pedí delivery y llegó todo frío y revuelto. Pésimo.", date: "04/04", location: "DK La Wera" },
    { score: 4, text: "La hamburguesa estaba bien pero 40min de espera es mucho.", date: "03/04", location: "Angol" },
    { score: 2, text: "Me equivocaron el pedido dos veces. No vuelvo.", date: "02/04", location: "B. Arana" },
  ]
};

const RANKING = [
  { location: "Cheddar's Angol", nps: 52, mystery: 88, reviews: 4.3, complaints: 2, score: 82, trend: "↑" },
  { location: "Cheddar's Collao", nps: 45, mystery: 85, reviews: 4.1, complaints: 3, score: 76, trend: "→" },
  { location: "Dark Kitchen (Alley)", nps: 38, mystery: 78, reviews: 3.9, complaints: 4, score: 68, trend: "↑" },
  { location: "Cheddar's B. Arana", nps: 35, mystery: 72, reviews: 3.7, complaints: 5, score: 62, trend: "↓" },
  { location: "Dark Kitchen (La Wera)", nps: 30, mystery: 70, reviews: 3.5, complaints: 6, score: 55, trend: "↓" },
];

const MYSTERY_EVALUATIONS = [
  { id: "MS-008", location: "Cheddar's Angol", date: "01/04", evaluator: "Enc. experiencia", overall: 82, touchpoints: { Llegada: 90, Espera: 70, Pedido: 85, Preparación: 88, Entrega: 80, Consumo: 85, Pago: 82, Despedida: 75 }, weakest: "Espera", kaizen: "Optimizar tiempos entre pedido y servicio. Causa raíz: cocina saturada en horario peak." },
  { id: "MS-007", location: "Dark Kitchen", date: "25/03", evaluator: "Enc. experiencia", overall: 68, touchpoints: { Llegada: null, Espera: 60, Pedido: 75, Preparación: 72, Entrega: 55, Consumo: 70, Pago: 80, Despedida: null }, weakest: "Entrega", kaizen: "Packaging llega desordenado. Causa raíz: envases no adecuados para transporte. Acción: cambiar envases alitas." },
];

// ══════════════════════════════════════════════════════
// CRM DE RECLAMOS (P3)
// ══════════════════════════════════════════════════════
function CrmView() {
  const [selected, setSelected] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");

  let items = [...COMPLAINTS];
  if (statusFilter !== "all") items = items.filter(c => c.status === statusFilter);
  const openCount = COMPLAINTS.filter(c => ["open", "assigned", "in_progress"].includes(c.status)).length;

  if (selected) {
    const c = selected;
    const st = COMPLAINT_STATUS[c.status];
    return (
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <Btn variant="ghost" onClick={() => setSelected(null)}>← Volver</Btn>
          <h3 style={{ fontSize: 16, fontWeight: 700 }}>{c.id}</h3>
          <Badge color={st.color} bg={st.bg}>{st.label}</Badge>
          <Badge>{c.channelIcon} {c.channel}</Badge>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 14 }}>
          <div>
            <Card style={{ marginBottom: 12 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 14 }}>
                {[
                  { label: "Cliente", value: c.client },
                  { label: "Local", value: c.location },
                  { label: "Touchpoint", value: c.touchpoint },
                  { label: "Severidad", value: c.severity },
                  { label: "Canal", value: `${c.channelIcon} ${c.channel}` },
                  { label: "Fecha", value: c.date },
                ].map(f => (
                  <div key={f.label}>
                    <div style={{ fontSize: 11, color: B.textMuted }}>{f.label}</div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{f.value}</div>
                  </div>
                ))}
              </div>

              <div style={{ padding: "12px 14px", background: B.surfaceHover, borderRadius: 8, marginBottom: 12 }}>
                <div style={{ fontSize: 11, color: B.textMuted, marginBottom: 4 }}>Mensaje del cliente</div>
                <div style={{ fontSize: 14, color: B.text, lineHeight: 1.5, fontStyle: "italic" }}>"{c.text}"</div>
              </div>

              <div style={{ fontSize: 12, color: B.textLight }}>Fuente: {c.source}</div>
            </Card>

            {c.resolution && (
              <Card style={{ background: B.successBg, border: `1px solid ${B.success}20` }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: B.success, marginBottom: 4 }}>Resolución</div>
                <div style={{ fontSize: 13 }}>{c.resolution}</div>
              </Card>
            )}

            {!c.resolution && (
              <Card>
                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Registrar gestión</div>
                <textarea placeholder="¿Qué se hizo para resolver el reclamo?" style={{ width: "100%", padding: "10px 12px", border: `1px solid ${B.border}`, borderRadius: 8, fontSize: 13, fontFamily: font, minHeight: 80, resize: "vertical", marginBottom: 10 }} />
                <div style={{ display: "flex", gap: 8 }}>
                  <Btn variant="success" style={{ flex: 1 }}>✓ Marcar resuelto</Btn>
                  <Btn style={{ flex: 1 }}>Escalar</Btn>
                  <Btn variant="ghost">Reasignar</Btn>
                </div>
              </Card>
            )}
          </div>

          <div>
            <Card style={{ marginBottom: 10 }}>
              <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>SLA</h4>
              <div style={{ fontSize: 20, fontWeight: 800, color: c.sla.includes("Asignar") ? B.danger : c.sla.includes("restantes") ? B.warning : B.success }}>{c.sla}</div>
              <div style={{ fontSize: 12, color: B.textMuted, marginTop: 4 }}>
                {c.severity === "alta" ? "SLA: 4 horas" : c.severity === "media" ? "SLA: 24 horas" : "SLA: 48 horas"}
              </div>
            </Card>

            <Card style={{ marginBottom: 10 }}>
              <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Workflow</h4>
              {["Ingresado", "Asignado", "En gestión", "Resuelto", "Cerrado"].map((step, i) => {
                const statusOrder = { open: 0, assigned: 1, in_progress: 2, resolved: 3, closed: 4 };
                const current = statusOrder[c.status];
                const active = i <= current;
                return (
                  <div key={step} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0" }}>
                    <div style={{ width: 20, height: 20, borderRadius: "50%", background: active ? B.accent : B.border, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: active ? B.primary : B.textLight }}>{active ? "✓" : i + 1}</div>
                    <span style={{ fontSize: 12, fontWeight: active ? 600 : 400, color: active ? B.text : B.textMuted }}>{step}</span>
                  </div>
                );
              })}
            </Card>

            {c.assignee && (
              <Card style={{ marginBottom: 10 }}>
                <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 6 }}>Asignado a</h4>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{c.assignee}</div>
              </Card>
            )}

            {!c.assignee && (
              <Card style={{ background: B.dangerBg, border: `1px solid ${B.danger}20` }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: B.danger, marginBottom: 8 }}>⚠️ Sin asignar</div>
                <select style={{ width: "100%", padding: "8px 10px", border: `1px solid ${B.border}`, borderRadius: 8, fontSize: 13, fontFamily: font, marginBottom: 8 }}>
                  <option>Seleccionar responsable...</option>
                  <option>Jefe cocina Angol</option>
                  <option>Admin Collao</option>
                  <option>Admin B. Arana</option>
                  <option>Admin DK</option>
                  <option>Enc. experiencia</option>
                </select>
                <Btn variant="primary" style={{ width: "100%" }}>Asignar</Btn>
              </Card>
            )}

            <Card style={{ marginTop: 10 }}>
              <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 6 }}>Historial del cliente</h4>
              <div style={{ fontSize: 12, color: B.textMuted }}>2 reclamos previos (últimos 90 días)</div>
              <div style={{ fontSize: 12, color: B.warning, fontWeight: 600, marginTop: 4 }}>⚠️ Cliente recurrente</div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10, marginBottom: 16 }}>
        {[
          { id: "all", label: "Total", count: COMPLAINTS.length, color: B.text },
          { id: "open", label: "Sin asignar", count: COMPLAINTS.filter(c => c.status === "open").length, color: B.danger },
          { id: "assigned", label: "Asignados", count: COMPLAINTS.filter(c => c.status === "assigned").length, color: B.warning },
          { id: "in_progress", label: "En gestión", count: COMPLAINTS.filter(c => c.status === "in_progress").length, color: B.info },
          { id: "resolved", label: "Resueltos", count: COMPLAINTS.filter(c => ["resolved", "closed"].includes(c.status)).length, color: B.success },
        ].map(f => (
          <button key={f.id} onClick={() => setStatusFilter(f.id)} style={{
            padding: "10px 12px", borderRadius: 8, cursor: "pointer", textAlign: "center",
            border: statusFilter === f.id ? `2px solid ${B.accent}` : `1px solid ${B.border}`,
            background: statusFilter === f.id ? `${B.accent}08` : B.surface, fontFamily: font,
          }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: f.color }}>{f.count}</div>
            <div style={{ fontSize: 11, color: B.textMuted }}>{f.label}</div>
          </button>
        ))}
      </div>

      {/* Complaint list */}
      {items.map(c => {
        const st = COMPLAINT_STATUS[c.status];
        return (
          <Card key={c.id} onClick={() => setSelected(c)} style={{ marginBottom: 8, cursor: "pointer", borderLeft: `4px solid ${st.color}`, padding: "12px 18px", transition: "background 0.1s" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: B.info }}>{c.id}</span>
                  <Badge color={st.color} bg={st.bg}>{st.label}</Badge>
                  <Badge>{c.channelIcon} {c.channel}</Badge>
                  <Badge color={c.severity === "alta" ? B.danger : c.severity === "media" ? B.warning : B.textMuted} bg={c.severity === "alta" ? B.dangerBg : c.severity === "media" ? B.warningBg : B.surfaceHover}>{c.severity}</Badge>
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{c.client} — {c.location}</div>
                <div style={{ fontSize: 12, color: B.textMuted, lineHeight: 1.4 }}>Touchpoint: {c.touchpoint} · {c.date}</div>
                <div style={{ fontSize: 12, color: B.textMuted, marginTop: 2, fontStyle: "italic" }}>"{c.text.substring(0, 80)}..."</div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 12 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: c.sla.includes("Asignar") ? B.danger : B.warning }}>{c.sla}</div>
                {c.assignee && <div style={{ fontSize: 11, color: B.textMuted, marginTop: 2 }}>{c.assignee}</div>}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

// ══════════════════════════════════════════════════════
// NPS (P4)
// ══════════════════════════════════════════════════════
function NpsView() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const d = NPS_DATA;

  return (
    <div>
      {/* Overall NPS */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 14, marginBottom: 16 }}>
        <Card style={{ textAlign: "center" }}>
          <div style={{ fontSize: 12, color: B.textMuted, marginBottom: 6 }}>NPS General Red</div>
          <div style={{ fontSize: 48, fontWeight: 900, color: d.overall >= 50 ? B.success : d.overall >= 20 ? B.warning : B.danger }}>{d.overall}</div>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 8, fontSize: 12 }}>
            <span style={{ color: B.success }}>😊 {d.promoters}%</span>
            <span style={{ color: B.textMuted }}>😐 {d.passives}%</span>
            <span style={{ color: B.danger }}>😞 {d.detractors}%</span>
          </div>
        </Card>

        <Card>
          <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>NPS por local</h4>
          {d.byLocation.map(l => {
            const color = l.nps >= 50 ? B.success : l.nps >= 20 ? B.warning : B.danger;
            const isSelected = selectedLocation === l.location;
            return (
              <div key={l.location} onClick={() => setSelectedLocation(isSelected ? null : l.location)}
                style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 6, marginBottom: 4, cursor: "pointer", background: isSelected ? `${B.accent}08` : "transparent", transition: "background 0.1s" }}>
                <div style={{ width: 40, textAlign: "center" }}>
                  <span style={{ fontSize: 18, fontWeight: 800, color }}>{l.nps}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{l.location}</div>
                  <div style={{ height: 4, background: B.surfaceHover, borderRadius: 2, marginTop: 3 }}>
                    <div style={{ display: "flex", height: "100%", borderRadius: 2, overflow: "hidden" }}>
                      <div style={{ width: `${l.promoters}%`, background: B.success }} />
                      <div style={{ width: `${l.passives}%`, background: B.textLight }} />
                      <div style={{ width: `${l.detractors}%`, background: B.danger }} />
                    </div>
                  </div>
                </div>
                <Badge color={l.trend.includes("+") ? B.success : l.trend.includes("-") ? B.danger : B.textMuted} bg={l.trend.includes("+") ? B.successBg : l.trend.includes("-") ? B.dangerBg : B.surfaceHover}>{l.trend}</Badge>
              </div>
            );
          })}
        </Card>
      </div>

      {/* Detractors drill-down */}
      <Card>
        <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>😞 Detractores recientes — ¿por qué nos ponen nota baja?</h4>
        {d.recentDetractors.map((det, i) => (
          <div key={i} style={{ display: "flex", gap: 10, padding: "10px 0", borderBottom: i < d.recentDetractors.length - 1 ? `1px solid ${B.border}` : "none" }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: B.dangerBg, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: B.danger, fontSize: 16, flexShrink: 0 }}>{det.score}</div>
            <div>
              <div style={{ fontSize: 13, color: B.text, lineHeight: 1.4, fontStyle: "italic" }}>"{det.text}"</div>
              <div style={{ fontSize: 11, color: B.textMuted, marginTop: 2 }}>{det.location} · {det.date}</div>
            </div>
            <Btn variant="ghost" style={{ fontSize: 11, flexShrink: 0, alignSelf: "center" }}>Vincular a reclamo</Btn>
          </div>
        ))}
      </Card>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// MYSTERY SHOPPER + KAIZEN (P2)
// ══════════════════════════════════════════════════════
function MysteryView() {
  const [selected, setSelected] = useState(null);

  if (selected) {
    const m = selected;
    return (
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <Btn variant="ghost" onClick={() => setSelected(null)}>← Volver</Btn>
          <h3 style={{ fontSize: 16, fontWeight: 700 }}>{m.id} — {m.location}</h3>
        </div>

        {/* Journey map */}
        <Card style={{ marginBottom: 14 }}>
          <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Journey del cliente — Touchpoints</h4>
          <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
            {TOUCHPOINTS.map(tp => {
              const score = m.touchpoints[tp];
              const color = score === null ? B.textLight : score >= 80 ? B.success : score >= 60 ? B.warning : B.danger;
              const isWeakest = tp === m.weakest;
              return (
                <div key={tp} style={{ flex: 1, textAlign: "center", padding: "10px 4px", borderRadius: 8, background: score === null ? B.surfaceHover : `${color}10`, border: isWeakest ? `2px solid ${B.danger}` : `1px solid ${B.border}`, position: "relative" }}>
                  {isWeakest && <div style={{ position: "absolute", top: -8, left: "50%", transform: "translateX(-50%)", fontSize: 9, background: B.danger, color: "#fff", padding: "1px 6px", borderRadius: 4, fontWeight: 700 }}>MÁS DÉBIL</div>}
                  <div style={{ fontSize: 10, color: B.textMuted, marginBottom: 4 }}>{tp}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color }}>{score !== null ? score : "N/A"}</div>
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4 }}>
            {TOUCHPOINTS.map((_, i) => (
              <div key={i} style={{ flex: 1, height: 3, background: i < TOUCHPOINTS.length - 1 ? B.accent : "transparent", borderRadius: 2 }} />
            ))}
          </div>
        </Card>

        {/* Kaizen cycle */}
        <Card style={{ marginBottom: 14, background: B.warningBg, border: `1px solid ${B.warning}25` }}>
          <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>🔄 Ciclo Kaizen — Punto débil: {m.weakest}</h4>
          <div style={{ fontSize: 13, color: B.text, lineHeight: 1.6, marginBottom: 10 }}>{m.kaizen}</div>
          <div style={{ display: "flex", gap: 6 }}>
            {["Observar", "Analizar causa raíz", "Planificar mejora", "Implementar", "Medir"].map((step, i) => (
              <div key={i} style={{
                flex: 1, padding: "8px 4px", borderRadius: 6, textAlign: "center",
                background: i <= 2 ? B.accent : B.surface, color: i <= 2 ? B.primary : B.textMuted,
                fontSize: 11, fontWeight: 650, border: `1px solid ${B.border}`,
              }}>{step}</div>
            ))}
          </div>
        </Card>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <Card>
            <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Datos de la evaluación</h4>
            {[
              { label: "Local", value: m.location },
              { label: "Fecha", value: m.date },
              { label: "Evaluador", value: m.evaluator },
              { label: "Score general", value: `${m.overall}%` },
            ].map(f => (
              <div key={f.label} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: `1px solid ${B.border}`, fontSize: 13 }}>
                <span style={{ color: B.textMuted }}>{f.label}</span>
                <span style={{ fontWeight: 600 }}>{f.value}</span>
              </div>
            ))}
          </Card>

          <Card>
            <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Mapa de madurez</h4>
            <div style={{ fontSize: 12, color: B.textMuted, marginBottom: 8 }}>Qué touchpoints están sólidos y cuáles débiles</div>
            {Object.entries(m.touchpoints).filter(([_, v]) => v !== null).sort(([_, a], [__, b]) => b - a).map(([tp, score]) => (
              <div key={tp} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 12, width: 80, color: B.textMuted }}>{tp}</span>
                <div style={{ flex: 1, height: 8, background: B.surfaceHover, borderRadius: 4 }}>
                  <div style={{ width: `${score}%`, height: "100%", background: score >= 80 ? B.success : score >= 60 ? B.warning : B.danger, borderRadius: 4 }} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, width: 30, textAlign: "right", color: score >= 80 ? B.success : score >= 60 ? B.warning : B.danger }}>{score}</span>
              </div>
            ))}
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
        <div style={{ fontSize: 13, color: B.textMuted }}>Evaluaciones mystery shopper con journey mapping + ciclo Kaizen</div>
        <Btn variant="primary">+ Nueva evaluación</Btn>
      </div>

      {MYSTERY_EVALUATIONS.map(m => {
        const color = m.overall >= 80 ? B.success : m.overall >= 60 ? B.warning : B.danger;
        return (
          <Card key={m.id} onClick={() => setSelected(m)} style={{ marginBottom: 8, cursor: "pointer", display: "flex", alignItems: "center", gap: 14, transition: "border-color 0.12s" }}>
            <div style={{ width: 50, height: 50, borderRadius: 12, background: `${color}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontSize: 20, fontWeight: 800, color }}>{m.overall}</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{m.location}</div>
              <div style={{ fontSize: 12, color: B.textMuted }}>{m.id} · {m.date} · Por: {m.evaluator} · Punto débil: <span style={{ color: B.danger, fontWeight: 600 }}>{m.weakest}</span></div>
            </div>
            <Btn variant="ghost" style={{ fontSize: 12 }}>Ver journey →</Btn>
          </Card>
        );
      })}
    </div>
  );
}

// ══════════════════════════════════════════════════════
// RANKING (P5) + PLAN MEJORA (P6)
// ══════════════════════════════════════════════════════
function RankingView() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const lowLocations = RANKING.filter(r => r.score < 65);

  if (selectedPlan) {
    return (
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <Btn variant="ghost" onClick={() => setSelectedPlan(null)}>← Volver</Btn>
          <h3 style={{ fontSize: 16, fontWeight: 700 }}>Plan de mejora — {selectedPlan.location}</h3>
          <Badge color={B.danger} bg={B.dangerBg}>Score: {selectedPlan.score}</Badge>
        </div>

        <Card style={{ marginBottom: 14, background: B.dangerBg, border: `1px solid ${B.danger}20` }}>
          <div style={{ fontSize: 13 }}>
            <span style={{ fontWeight: 700, color: B.danger }}>Bajo umbral de experiencia (65).</span>
            <span style={{ color: B.textMuted, marginLeft: 6 }}>Este local necesita un plan de mejora con acciones específicas y re-evaluación.</span>
          </div>
        </Card>

        <Card style={{ marginBottom: 14 }}>
          <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Diagnóstico</h4>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
            {[
              { label: "NPS", value: selectedPlan.nps, color: selectedPlan.nps < 30 ? B.danger : B.warning },
              { label: "Mystery", value: selectedPlan.mystery, color: selectedPlan.mystery < 70 ? B.danger : B.warning },
              { label: "Reviews", value: selectedPlan.reviews, color: selectedPlan.reviews < 3.5 ? B.danger : B.warning },
              { label: "Reclamos/mes", value: selectedPlan.complaints, color: selectedPlan.complaints > 4 ? B.danger : B.warning },
            ].map(m => (
              <div key={m.label} style={{ padding: "10px", background: B.surfaceHover, borderRadius: 8, textAlign: "center" }}>
                <div style={{ fontSize: 11, color: B.textMuted }}>{m.label}</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: m.color }}>{m.value}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Acciones del plan</h4>
          {[
            { action: "Capacitación equipo en tiempos de servicio", responsible: "Jefe cocina", due: "10/04", status: "open" },
            { action: "Mystery shopper de seguimiento", responsible: "Enc. experiencia", due: "15/04", status: "open" },
            { action: "Cambiar packaging delivery (envases alitas)", responsible: "Gte. operaciones", due: "12/04", status: "open" },
            { action: "Re-evaluación NPS post-acciones", responsible: "Enc. experiencia", due: "30/04", status: "open" },
          ].map((a, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${B.border}` }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{a.action}</div>
                <div style={{ fontSize: 12, color: B.textMuted }}>{a.responsible} · Plazo: {a.due}</div>
              </div>
              <Badge color={B.warning} bg={B.warningBg}>{a.status === "open" ? "Pendiente" : "Hecho"}</Badge>
            </div>
          ))}
          <Btn style={{ marginTop: 10, fontSize: 12 }}>+ Agregar acción</Btn>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <Card style={{ padding: 0, overflow: "hidden", marginBottom: 14 }}>
        <div style={{ padding: "12px 16px", borderBottom: `1px solid ${B.border}`, fontSize: 12, color: B.textMuted }}>
          Score compuesto: NPS (30%) + Mystery shopper (30%) + Reviews (20%) + Reclamos inverso (20%). Pesos configurables.
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: font }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${B.border}`, background: "#FAFAF8" }}>
              {["#", "Local", "NPS", "Mystery", "Reviews", "Reclamos/mes", "Score", "Tendencia", ""].map(h =>
                <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontWeight: 600, color: B.textMuted, fontSize: 11 }}>{h}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {RANKING.map((r, i) => {
              const color = r.score >= 75 ? B.success : r.score >= 65 ? B.warning : B.danger;
              return (
                <tr key={r.location} style={{ borderBottom: `1px solid ${B.border}`, background: r.score < 65 ? B.dangerBg : "transparent" }}>
                  <td style={{ padding: "10px 12px", fontWeight: 800, color: i === 0 ? B.accent : B.textMuted }}>{i + 1}</td>
                  <td style={{ padding: "10px 12px", fontWeight: 600 }}>{r.location}</td>
                  <td style={{ padding: "10px 12px" }}>{r.nps}</td>
                  <td style={{ padding: "10px 12px" }}>{r.mystery}</td>
                  <td style={{ padding: "10px 12px" }}>⭐ {r.reviews}</td>
                  <td style={{ padding: "10px 12px" }}>{r.complaints}</td>
                  <td style={{ padding: "10px 12px", fontWeight: 800, color }}>{r.score}</td>
                  <td style={{ padding: "10px 12px", color: r.trend === "↑" ? B.success : r.trend === "↓" ? B.danger : B.textMuted }}>{r.trend}</td>
                  <td style={{ padding: "10px 12px" }}>
                    {r.score < 65 && <Btn variant="danger" onClick={() => setSelectedPlan(r)} style={{ fontSize: 11, padding: "3px 8px" }}>Plan mejora</Btn>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>

      {lowLocations.length > 0 && (
        <Card style={{ background: B.dangerBg, border: `1px solid ${B.danger}20` }}>
          <div style={{ fontSize: 13 }}>
            <span style={{ fontWeight: 700, color: B.danger }}>{lowLocations.length} local{lowLocations.length > 1 ? "es" : ""} bajo umbral (65):</span>
            <span style={{ color: B.textMuted, marginLeft: 6 }}>{lowLocations.map(l => l.location).join(", ")}. Requieren plan de mejora.</span>
          </div>
        </Card>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════
// MANYCHAT + FEEDBACK (P1, P8)
// ══════════════════════════════════════════════════════
function FeedbackView() {
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
        {/* ManyChat config */}
        <Card>
          <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>🤖 ManyChat → Prep (webhook automático)</h4>
          <div style={{ fontSize: 12, color: B.textMuted, marginBottom: 10 }}>Bot en IG DM clasifica mensajes. Reclamos se crean automáticamente en el CRM.</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[
              { label: "Consulta rutinaria", action: "Auto-respuesta por bot", pct: "65%", color: B.success },
              { label: "Reclamo", action: "Webhook → crea complaint en Prep", pct: "20%", color: B.danger },
              { label: "Feedback positivo", action: "Registra + agradece", pct: "15%", color: B.info },
            ].map(t => (
              <div key={t.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 10px", background: B.surfaceHover, borderRadius: 6 }}>
                <div>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{t.label}</span>
                  <span style={{ fontSize: 11, color: B.textMuted, marginLeft: 8 }}>{t.action}</span>
                </div>
                <Badge color={t.color} bg={`${t.color}12`}>{t.pct}</Badge>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
            <Btn style={{ fontSize: 12 }}>Configurar templates</Btn>
            <Btn variant="ghost" style={{ fontSize: 12 }}>Ver métricas bot</Btn>
          </div>
        </Card>

        {/* Feedback sources */}
        <Card>
          <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>📊 Fuentes de feedback consolidadas</h4>
          {[
            { source: "Google Reviews", icon: "⭐", count: 45, avg: "4.1", trend: "+0.2" },
            { source: "NPS propio", icon: "📊", count: 120, avg: "42", trend: "+5" },
            { source: "Instagram (ManyChat)", icon: "📸", count: 35, avg: "—", trend: "—" },
            { source: "QR propias", icon: "📱", count: 18, avg: "4.3", trend: "+0.1" },
            { source: "Apps delivery", icon: "🛵", count: 85, avg: "3.8", trend: "-0.1" },
          ].map(s => (
            <div key={s.source} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: `1px solid ${B.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 16 }}>{s.icon}</span>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{s.source}</span>
              </div>
              <div style={{ display: "flex", gap: 12, alignItems: "center", fontSize: 12 }}>
                <span style={{ color: B.textMuted }}>{s.count} este mes</span>
                <span style={{ fontWeight: 600 }}>Prom: {s.avg}</span>
                <Badge color={s.trend.includes("+") ? B.success : s.trend.includes("-") ? B.danger : B.textMuted} bg={s.trend.includes("+") ? B.successBg : s.trend.includes("-") ? B.dangerBg : B.surfaceHover}>{s.trend}</Badge>
              </div>
            </div>
          ))}
        </Card>
      </div>

      {/* Reclamos recurrentes → Kaizen */}
      <Card>
        <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>🔄 Patrones detectados — Reclamos recurrentes por touchpoint</h4>
        <div style={{ fontSize: 12, color: B.textMuted, marginBottom: 10 }}>Cuando un touchpoint acumula reclamos, se vincula automáticamente a un ciclo Kaizen.</div>
        {[
          { touchpoint: "Entrega", count: 8, issue: "Comida fría en delivery", linked: true },
          { touchpoint: "Espera", count: 5, issue: "Tiempos largos en horario peak", linked: true },
          { touchpoint: "Pago", count: 3, issue: "Cobros duplicados en apps", linked: false },
        ].map((p, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: `1px solid ${B.border}` }}>
            <div>
              <span style={{ fontSize: 13, fontWeight: 600 }}>{p.touchpoint}</span>
              <span style={{ fontSize: 12, color: B.textMuted, marginLeft: 8 }}>{p.issue}</span>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <Badge color={B.danger} bg={B.dangerBg}>{p.count} reclamos</Badge>
              {p.linked ? <Badge color={B.success} bg={B.successBg}>🔄 Kaizen activo</Badge> : <Btn variant="ghost" style={{ fontSize: 11 }}>Crear ciclo Kaizen</Btn>}
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// MAIN
// ══════════════════════════════════════════════════════
export default function ExperienciaModule() {
  const [tab, setTab] = useState("crm");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function check() { setIsMobile(window.innerWidth < 900); }
    check(); window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const openComplaints = COMPLAINTS.filter(c => ["open", "assigned", "in_progress"].includes(c.status)).length;

  const TABS = [
    { id: "crm", label: "CRM Reclamos", icon: "📩", badge: openComplaints, badgeBg: B.dangerBg, badgeColor: B.danger },
    { id: "nps", label: "NPS", icon: "📊" },
    { id: "mystery", label: "Mystery shopper", icon: "🕵️" },
    { id: "ranking", label: "Ranking + planes", icon: "🏆" },
    { id: "feedback", label: "Feedback + ManyChat", icon: "🤖" },
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
              <span key={n} style={{ padding: "6px 11px", fontSize: 13, fontWeight: 500, color: B.textMuted, borderBottom: "2px solid transparent", cursor: "pointer" }}>{n}</span>
            ))}
          </div>
        )}
      </header>

      <main style={{ padding: isMobile ? 16 : "20px 32px", maxWidth: 1320, margin: "0 auto" }}>
        <div style={{ marginBottom: 16 }}>
          <h1 style={{ fontSize: isMobile ? 20 : 24, fontWeight: 800, color: B.text, fontFamily: serif }}>⭐ Experiencia de usuario</h1>
          <p style={{ fontSize: 13, color: B.textMuted, marginTop: 2 }}>NPS: {NPS_DATA.overall} · {openComplaints} reclamos abiertos · 5 fuentes de feedback</p>
        </div>

        <TabBar tabs={TABS} active={tab} onChange={setTab} />

        {tab === "crm" && <CrmView />}
        {tab === "nps" && <NpsView />}
        {tab === "mystery" && <MysteryView />}
        {tab === "ranking" && <RankingView />}
        {tab === "feedback" && <FeedbackView />}
      </main>
    </div>
  );
}
