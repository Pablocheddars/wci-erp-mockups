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
const AUTOCONTROL_TODAY = [
  { location: "Cheddar's Angol", done: true, time: "07:45", score: 100, issues: 0 },
  { location: "Cheddar's Collao", done: true, time: "08:10", score: 92, issues: 1 },
  { location: "Cheddar's Barros Arana", done: false, time: null, score: null, issues: null },
  { location: "Dark Kitchen", done: true, time: "07:30", score: 88, issues: 2 },
  { location: "WCI Cocina producción", done: true, time: "07:15", score: 100, issues: 0 },
];

const AUTOCONTROL_HISTORY = [
  { date: "04/04", angol: 100, collao: 92, barana: null, dk: 88, wci: 100 },
  { date: "03/04", angol: 96, collao: 100, barana: 85, dk: 92, wci: 100 },
  { date: "02/04", angol: 100, collao: 88, barana: 92, dk: null, wci: 96 },
  { date: "01/04", angol: 92, collao: 100, barana: 100, dk: 85, wci: 100 },
  { date: "31/03", angol: 100, collao: 96, barana: 88, dk: 92, wci: 100 },
];

const TEMPLATES = [
  { id: 1, name: "Autocontrol cocina — estándar", space: "Cocina", items: 12, version: 3, active: true },
  { id: 2, name: "Autocontrol bodega", space: "Bodega", items: 8, version: 2, active: true },
  { id: 3, name: "Autocontrol salón", space: "Salón", items: 6, version: 1, active: true },
  { id: 4, name: "Autocontrol baños", space: "Baños", items: 5, version: 1, active: false },
];

const TEMPERATURES = [
  { equipment: "Cámara frío principal", location: "WCI 3er piso", readings: [{ time: "07:00", temp: -2.5, ok: true }, { time: "12:00", temp: -1.8, ok: true }, { time: "17:00", temp: 1.2, ok: false }] },
  { equipment: "Cámara frío auxiliar", location: "WCI 3er piso", readings: [{ time: "07:00", temp: -3.0, ok: true }, { time: "12:00", temp: -2.5, ok: true }, { time: "17:00", temp: -2.0, ok: true }] },
  { equipment: "Freezer cocina", location: "Cheddar's Angol", readings: [{ time: "07:00", temp: -18.5, ok: true }, { time: "12:00", temp: -17.0, ok: true }] },
];

const ACTIONS = [
  { id: "AC-042", source: "Autocontrol", location: "Dark Kitchen", item: "Tabla de corte con grietas", status: "open", assignee: "Jefe cocina DK", due: "06/04", created: "04/04" },
  { id: "AC-041", source: "Autocontrol", location: "Cheddar's Collao", item: "Termómetro no calibrado", status: "open", assignee: "Admin Collao", due: "05/04", created: "04/04" },
  { id: "AC-040", source: "Auditoría AG-012", location: "Cheddar's Angol", item: "Papas sobrecocidas — técnica", status: "resolved", assignee: "Jefe cocina Angol", due: "04/04", created: "03/04", evidence: true },
  { id: "AC-039", source: "Auditoría AG-011", location: "Dark Kitchen", item: "Mise en place desordenado", status: "overdue", assignee: "Jefe cocina DK", due: "03/04", created: "01/04" },
  { id: "AC-038", source: "Autocontrol", location: "Cheddar's Barros Arana", item: "Piso resbaloso en zona de lavado", status: "resolved", assignee: "Enc. turno B. Arana", due: "02/04", created: "01/04", evidence: true },
];

const ACTION_STATUS = {
  open: { label: "Abierta", color: B.warning, bg: B.warningBg },
  overdue: { label: "Vencida", color: B.danger, bg: B.dangerBg },
  resolved: { label: "Resuelta", color: B.success, bg: B.successBg },
  closed: { label: "Cerrada", color: B.textMuted, bg: B.surfaceHover },
};

const AUDITS = [
  { id: "AG-012", type: "Gastronómica", location: "Cheddar's Angol", date: "03/04", score: 88, result: "Aprobado", auditor: "Chef Carlos" },
  { id: "AG-011", type: "BPM", location: "Dark Kitchen", date: "01/04", score: 72, result: "Observado", auditor: "Enc. calidad" },
  { id: "AG-010", type: "Gastronómica", location: "Cheddar's Collao", date: "28/03", score: 92, result: "Aprobado", auditor: "Chef Carlos" },
  { id: "AG-009", type: "BPM", location: "WCI Cocina prod.", date: "25/03", score: 95, result: "Aprobado", auditor: "Enc. calidad" },
];

const PILARES_CALIDAD = [
  { title: "BPM SEREMI", desc: "Cumplimiento normativo sanitario" },
  { title: "Planillas uso día", desc: "Registros operativos diarios obligatorios" },
  { title: "Certificados", desc: "Patentes, autorizaciones, mantenciones" },
  { title: "Descarte (RILES)", desc: "Registros COVEMAR / ECOIL, gestión residuos" },
  { title: "No Conformidad", desc: "Tracking de desperfectos de productos elaborados y simples vendidos por WCI" },
];

const NO_CONFORMIDAD = [
  { fecha: "02/04", producto: "Hamburguesa premoldeada", tipo: "elaborado", descripcion: "Textura irregular", responsable: "Carmen R.", estado: "resuelta", fechaResolucion: "04/04" },
  { fecha: "03/04", producto: "Salsa BBQ WCI", tipo: "elaborado", descripcion: "Color fuera de especificación", responsable: "Chef Marco", estado: "en gestión", fechaResolucion: "—" },
  { fecha: "04/04", producto: "Queso mozzarella (reventa)", tipo: "simple", descripcion: "Empaque dañado en cámara", responsable: "Bodega WCI", estado: "abierta", fechaResolucion: "—" },
  { fecha: "28/03", producto: "Pan hamburguesa", tipo: "simple", descripcion: "Humedad en borde inferior", responsable: "DK Alley", estado: "resuelta", fechaResolucion: "30/03" },
];

const NC_ESTADO = {
  abierta: { label: "Abierta", color: B.warning, bg: B.warningBg },
  "en gestión": { label: "En gestión", color: B.info, bg: B.infoBg },
  resuelta: { label: "Resuelta", color: B.success, bg: B.successBg },
};

// ══════════════════════════════════════════════════════
// VISIBILIDAD AUTOCONTROLES (P13 — WCI ve locales)
// ══════════════════════════════════════════════════════
function AutocontrolWciView() {
  const doneCount = AUTOCONTROL_TODAY.filter(a => a.done).length;
  const totalLocations = AUTOCONTROL_TODAY.length;

  return (
    <div>
      {/* Today's status */}
      <Card style={{ marginBottom: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700 }}>Autocontroles hoy — {new Date().toLocaleDateString("es-CL")}</div>
          <div style={{ fontSize: 13, color: B.textMuted }}>{doneCount}/{totalLocations} completados</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {AUTOCONTROL_TODAY.map((a, i) => (
            <div key={i} style={{ width: 28, height: 28, borderRadius: 6, background: a.done ? (a.score >= 90 ? B.successBg : B.warningBg) : B.dangerBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: a.done ? (a.score >= 90 ? B.success : B.warning) : B.danger }} title={a.location}>
              {a.done ? a.score : "✗"}
            </div>
          ))}
        </div>
      </Card>

      {/* Per-location cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
        {AUTOCONTROL_TODAY.map((a, i) => (
          <Card key={i} style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            borderLeft: `4px solid ${a.done ? (a.score >= 90 ? B.success : B.warning) : B.danger}`,
            padding: "12px 18px",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: a.done ? (a.score >= 90 ? B.successBg : B.warningBg) : B.dangerBg,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {a.done
                  ? <span style={{ fontSize: 16, fontWeight: 800, color: a.score >= 90 ? B.success : B.warning }}>{a.score}</span>
                  : <span style={{ fontSize: 18, color: B.danger }}>✗</span>}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 650 }}>{a.location}</div>
                <div style={{ fontSize: 12, color: B.textMuted }}>
                  {a.done
                    ? `Completado ${a.time} · ${a.issues === 0 ? "Sin hallazgos" : `${a.issues} hallazgo${a.issues > 1 ? "s" : ""}`}`
                    : "No realizado hoy"}
                </div>
              </div>
            </div>
            {!a.done ? (
              <Btn variant="danger" style={{ fontSize: 12 }}>Enviar recordatorio</Btn>
            ) : a.issues > 0 ? (
              <Btn style={{ fontSize: 12 }}>Ver detalle</Btn>
            ) : (
              <Badge color={B.success} bg={B.successBg}>✓ OK</Badge>
            )}
          </Card>
        ))}
      </div>

      {/* History grid */}
      <Card>
        <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Historial semanal — cumplimiento por local</h4>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: font }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${B.border}`, background: "#FAFAF8" }}>
              <th style={{ padding: "8px 10px", textAlign: "left", fontSize: 11, color: B.textMuted, fontWeight: 600 }}>Fecha</th>
              {["Angol", "Collao", "B. Arana", "Dark Kitchen", "WCI"].map(l =>
                <th key={l} style={{ padding: "8px 10px", textAlign: "center", fontSize: 11, color: B.textMuted, fontWeight: 600 }}>{l}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {AUTOCONTROL_HISTORY.map((day, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${B.border}` }}>
                <td style={{ padding: "8px 10px", fontWeight: 600 }}>{day.date}</td>
                {[day.angol, day.collao, day.barana, day.dk, day.wci].map((score, si) => {
                  const color = score === null ? B.danger : score >= 90 ? B.success : B.warning;
                  return (
                    <td key={si} style={{ padding: "8px 10px", textAlign: "center" }}>
                      {score === null
                        ? <Badge color={B.danger} bg={B.dangerBg}>No hecho</Badge>
                        : <span style={{ fontWeight: 700, color }}>{score}%</span>}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ fontSize: 12, color: B.textMuted, marginTop: 10 }}>
          Cumplimiento semana: {Math.round(AUTOCONTROL_HISTORY.flatMap(d => [d.angol, d.collao, d.barana, d.dk, d.wci]).filter(s => s !== null).length / (AUTOCONTROL_HISTORY.length * 5) * 100)}% de los autocontroles realizados.
        </div>
      </Card>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// AUTOCONTROL (vista del local — P1, P2)
// ══════════════════════════════════════════════════════
function AutocontrolLocalView() {
  const items = [
    { desc: "Superficies de trabajo limpias y sanitizadas", done: true, ok: true },
    { desc: "Tablas de corte sin grietas ni manchas", done: true, ok: true },
    { desc: "Termómetro de sonda disponible y calibrado", done: true, ok: false },
    { desc: "Lavamanos con jabón y toallas descartables", done: true, ok: true },
    { desc: "Alimentos tapados y rotulados en refrigerador", done: false, ok: null },
    { desc: "Basureros con tapa y bolsa", done: false, ok: null },
  ];

  return (
    <div>
      <Card style={{ background: `${B.info}08`, border: `1px solid ${B.info}25`, marginBottom: 14 }}>
        <div style={{ fontSize: 13 }}>
          <span style={{ fontWeight: 700 }}>Referencia: así ve el local su autocontrol diario.</span>
          <span style={{ color: B.textMuted, marginLeft: 6 }}>Este es el módulo BPM de Prep (plan Plus). Funciona standalone sin WCI.</span>
        </div>
      </Card>

      <Card style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Autocontrol — Cocina inicio turno</div>
            <div style={{ fontSize: 12, color: B.textMuted }}>Cheddar's Angol · {new Date().toLocaleDateString("es-CL")} · 4/6 completados</div>
          </div>
          <div style={{ width: 50, height: 50, borderRadius: "50%", background: B.warningBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 16, fontWeight: 800, color: B.warning }}>67%</span>
          </div>
        </div>

        {items.map((item, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 12, padding: "12px 0",
            borderBottom: i < items.length - 1 ? `1px solid ${B.border}` : "none",
            opacity: item.done ? 1 : 0.6,
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8, flexShrink: 0,
              border: item.done ? `2px solid ${item.ok ? B.success : B.danger}` : `2px solid ${B.border}`,
              background: item.done ? (item.ok ? B.successBg : B.dangerBg) : "transparent",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 14, color: item.ok ? B.success : B.danger, fontWeight: 700,
            }}>
              {item.done ? (item.ok ? "✓" : "✗") : ""}
            </div>
            <div style={{ flex: 1, fontSize: 13, fontWeight: item.done ? 500 : 400, color: item.done ? B.text : B.textMuted }}>
              {item.desc}
            </div>
            {item.done && !item.ok && <Badge color={B.danger} bg={B.dangerBg}>Acción creada</Badge>}
          </div>
        ))}
      </Card>

      <div style={{ fontSize: 12, color: B.textMuted }}>Al completar: registro inmutable. Si hay "no cumple", se genera acción correctiva automática. WCI puede ver este registro desde su panel de calidad.</div>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// TEMPERATURAS (P3)
// ══════════════════════════════════════════════════════
function TemperaturasView() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
        <div style={{ fontSize: 13, color: B.textMuted }}>{TEMPERATURES.length} equipos monitoreados</div>
        <Btn variant="primary">+ Registrar lectura</Btn>
      </div>

      {TEMPERATURES.map((eq, i) => {
        const hasAlert = eq.readings.some(r => !r.ok);
        return (
          <Card key={i} style={{ marginBottom: 10, borderLeft: `4px solid ${hasAlert ? B.danger : B.success}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>🌡️ {eq.equipment}</div>
                <div style={{ fontSize: 12, color: B.textMuted }}>{eq.location}</div>
              </div>
              {hasAlert && <Badge color={B.danger} bg={B.dangerBg}>⚠️ Fuera de rango</Badge>}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {eq.readings.map((r, ri) => (
                <div key={ri} style={{
                  flex: 1, padding: "10px", borderRadius: 8, textAlign: "center",
                  background: r.ok ? B.successBg : B.dangerBg,
                  border: `1px solid ${r.ok ? B.success : B.danger}20`,
                }}>
                  <div style={{ fontSize: 11, color: B.textMuted }}>{r.time}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: r.ok ? B.success : B.danger }}>{r.temp}°C</div>
                  <div style={{ fontSize: 10, color: r.ok ? B.success : B.danger }}>{r.ok ? "Conforme" : "FUERA RANGO"}</div>
                </div>
              ))}
            </div>
          </Card>
        );
      })}

      <Card style={{ marginTop: 10 }}>
        <div style={{ fontSize: 12, color: B.textMuted }}>Historial exportable para SEREMI. Fuera de rango genera alerta inmediata.</div>
        <Btn variant="ghost" style={{ fontSize: 12, marginTop: 6 }}>📥 Exportar historial temperaturas</Btn>
      </Card>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// ACCIONES CORRECTIVAS (P4 — unificado autocontrol + auditorías)
// ══════════════════════════════════════════════════════
function AccionesView() {
  const [filter, setFilter] = useState("all");
  let items = [...ACTIONS];
  if (filter !== "all") items = items.filter(a => a.status === filter);

  const openCount = ACTIONS.filter(a => a.status === "open").length;
  const overdueCount = ACTIONS.filter(a => a.status === "overdue").length;

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 16 }}>
        {[
          { id: "all", label: "Todas", count: ACTIONS.length },
          { id: "open", label: "Abiertas", count: openCount, color: B.warning },
          { id: "overdue", label: "Vencidas", count: overdueCount, color: B.danger },
          { id: "resolved", label: "Resueltas", count: ACTIONS.filter(a => a.status === "resolved").length, color: B.success },
        ].map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)} style={{
            padding: "10px 14px", borderRadius: 8, cursor: "pointer", textAlign: "center",
            border: filter === f.id ? `2px solid ${B.accent}` : `1px solid ${B.border}`,
            background: filter === f.id ? `${B.accent}08` : B.surface, fontFamily: font,
          }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: f.color || B.text }}>{f.count}</div>
            <div style={{ fontSize: 12, color: B.textMuted }}>{f.label}</div>
          </button>
        ))}
      </div>

      {items.map(a => {
        const st = ACTION_STATUS[a.status];
        return (
          <Card key={a.id} style={{
            marginBottom: 8, display: "flex", alignItems: "center", justifyContent: "space-between",
            borderLeft: `4px solid ${st.color}`, padding: "12px 18px",
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: B.info }}>{a.id}</span>
                <Badge color={st.color} bg={st.bg}>{st.label}</Badge>
                <Badge>{a.source}</Badge>
              </div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{a.item}</div>
              <div style={{ fontSize: 12, color: B.textMuted }}>{a.location} · Asignado: {a.assignee} · Plazo: {a.due}</div>
            </div>
            <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
              {a.evidence && <Badge color={B.success} bg={B.successBg}>📷 Evidencia</Badge>}
              {a.status === "open" && <Btn style={{ fontSize: 12 }}>Revisar</Btn>}
              {a.status === "overdue" && <Btn variant="danger" style={{ fontSize: 12 }}>Escalar</Btn>}
            </div>
          </Card>
        );
      })}
    </div>
  );
}

// ══════════════════════════════════════════════════════
// AUDITORÍAS (P6-P12 — resumen, detail es el flow separado)
// ══════════════════════════════════════════════════════
function AuditoriasView() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div style={{ fontSize: 13, color: B.textMuted }}>Auditorías en terreno — exclusivo WCI. El flujo completo se abre con "Iniciar auditoría".</div>
        <Btn variant="primary">🔍 Iniciar auditoría</Btn>
      </div>

      {/* Score by location */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10, marginBottom: 16 }}>
        {[
          { location: "Angol", score: 88, trend: "↑" },
          { location: "Collao", score: 92, trend: "→" },
          { location: "B. Arana", score: 75, trend: "↓" },
          { location: "DK", score: 72, trend: "↑" },
          { location: "WCI", score: 95, trend: "→" },
        ].map(l => {
          const color = l.score >= 90 ? B.success : l.score >= 70 ? B.warning : B.danger;
          return (
            <Card key={l.location} style={{ textAlign: "center", padding: "14px" }}>
              <div style={{ fontSize: 12, color: B.textMuted, marginBottom: 6 }}>{l.location}</div>
              <div style={{ fontSize: 24, fontWeight: 800, color }}>{l.score}</div>
              <div style={{ fontSize: 12, color: B.textMuted }}>{l.trend}</div>
            </Card>
          );
        })}
      </div>

      {/* Audit list */}
      <Card style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: font }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${B.border}`, background: "#FAFAF8" }}>
              {["ID", "Tipo", "Local", "Fecha", "Auditor", "Score", "Resultado"].map(h =>
                <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontWeight: 600, color: B.textMuted, fontSize: 11 }}>{h}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {AUDITS.map(a => {
              const color = a.score >= 90 ? B.success : a.score >= 70 ? B.warning : B.danger;
              return (
                <tr key={a.id} style={{ borderBottom: `1px solid ${B.border}`, cursor: "pointer" }}
                  onMouseEnter={e => e.currentTarget.style.background = B.surfaceHover}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <td style={{ padding: "10px 12px", fontWeight: 700, color: B.info }}>{a.id}</td>
                  <td style={{ padding: "10px 12px" }}><Badge color={a.type === "Gastronómica" ? B.purple : B.info} bg={a.type === "Gastronómica" ? B.purpleBg : B.infoBg}>{a.type}</Badge></td>
                  <td style={{ padding: "10px 12px", fontWeight: 600 }}>{a.location}</td>
                  <td style={{ padding: "10px 12px", color: B.textMuted }}>{a.date}</td>
                  <td style={{ padding: "10px 12px", color: B.textMuted }}>{a.auditor}</td>
                  <td style={{ padding: "10px 12px", fontWeight: 800, color }}>{a.score}</td>
                  <td style={{ padding: "10px 12px" }}><Badge color={color} bg={`${color}15`}>{a.result}</Badge></td>
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
// 5 PILARES + NO CONFORMIDAD (Gte. Operaciones)
// ══════════════════════════════════════════════════════
function PilaresNcView() {
  return (
    <div>
      <Card style={{ marginBottom: 14, background: `${B.accent}08`, border: `1px solid ${B.accent}30` }}>
        <div style={{ fontSize: 13, lineHeight: 1.6 }}>
          <span style={{ fontWeight: 700 }}>Cinco pilares de calidad WCI.</span>
          <span style={{ color: B.textMuted, marginLeft: 6 }}>Ventaja competitiva para posicionar Prep como servicio en HORECA mediana/grande.</span>
        </div>
      </Card>

      <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10, color: B.text }}>Secciones</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 10, marginBottom: 20 }}>
        {PILARES_CALIDAD.map((p, i) => (
          <Card key={i} style={{ padding: "12px 14px" }}>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{p.title}</div>
            <div style={{ fontSize: 12, color: B.textMuted, lineHeight: 1.45 }}>{p.desc}</div>
          </Card>
        ))}
      </div>

      <Card style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "12px 16px", borderBottom: `1px solid ${B.border}`, fontSize: 14, fontWeight: 700 }}>No Conformidad — productos elaborados y simples</div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: font }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${B.border}`, background: "#FAFAF8" }}>
              {["Fecha", "Producto", "Tipo", "Descripción del desperfecto", "Responsable", "Estado", "Fecha resolución"].map(h =>
                <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontWeight: 600, color: B.textMuted, fontSize: 11 }}>{h}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {NO_CONFORMIDAD.map((row, i) => {
              const st = NC_ESTADO[row.estado];
              return (
                <tr key={i} style={{ borderBottom: `1px solid ${B.border}` }}>
                  <td style={{ padding: "10px 12px", color: B.textMuted }}>{row.fecha}</td>
                  <td style={{ padding: "10px 12px", fontWeight: 600 }}>{row.producto}</td>
                  <td style={{ padding: "10px 12px" }}><Badge>{row.tipo}</Badge></td>
                  <td style={{ padding: "10px 12px" }}>{row.descripcion}</td>
                  <td style={{ padding: "10px 12px", color: B.textMuted }}>{row.responsable}</td>
                  <td style={{ padding: "10px 12px" }}><Badge color={st.color} bg={st.bg}>{st.label}</Badge></td>
                  <td style={{ padding: "10px 12px", color: B.textMuted }}>{row.fechaResolucion}</td>
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
// PLANTILLAS (P1)
// ══════════════════════════════════════════════════════
function PlantillasView() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
        <div style={{ fontSize: 13, color: B.textMuted }}>Checklists configurables por espacio. Versionables.</div>
        <Btn variant="primary">+ Nueva plantilla</Btn>
      </div>

      {TEMPLATES.map(t => (
        <Card key={t.id} style={{ marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center", opacity: t.active ? 1 : 0.5 }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 650 }}>{t.name}</div>
            <div style={{ fontSize: 12, color: B.textMuted }}>Espacio: {t.space} · {t.items} items · v{t.version}</div>
          </div>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            {t.active ? <Badge color={B.success} bg={B.successBg}>Activa</Badge> : <Badge>Inactiva</Badge>}
            <Btn variant="ghost" style={{ fontSize: 12 }}>Editar</Btn>
          </div>
        </Card>
      ))}
    </div>
  );
}

// ══════════════════════════════════════════════════════
// REPORTES (P5 + P12)
// ══════════════════════════════════════════════════════
function ReportesView() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
      <Card>
        <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>📊 Score auditorías por local (tendencia)</h4>
        {["Angol: 85 → 88 ↑", "Collao: 90 → 92 ↑", "B. Arana: 82 → 75 ↓", "Dark Kitchen: 68 → 72 ↑", "WCI: 93 → 95 ↑"].map((l, i) => {
          const down = l.includes("↓");
          return (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid ${B.border}`, fontSize: 13 }}>
              <span style={{ fontWeight: 600 }}>{l.split(":")[0]}</span>
              <span style={{ fontWeight: 700, color: down ? B.danger : B.success }}>{l.split(":")[1]}</span>
            </div>
          );
        })}
      </Card>

      <Card>
        <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>📋 Cumplimiento autocontrol (mes)</h4>
        {[
          { local: "WCI Cocina prod.", pct: 100 },
          { local: "Cheddar's Angol", pct: 97 },
          { local: "Cheddar's Collao", pct: 93 },
          { local: "Dark Kitchen", pct: 87 },
          { local: "Cheddar's B. Arana", pct: 80 },
        ].map(l => (
          <div key={l.local} style={{ marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 3 }}>
              <span style={{ fontWeight: 600 }}>{l.local}</span>
              <span style={{ fontWeight: 700, color: l.pct >= 90 ? B.success : l.pct >= 70 ? B.warning : B.danger }}>{l.pct}%</span>
            </div>
            <div style={{ height: 6, background: B.surfaceHover, borderRadius: 3 }}>
              <div style={{ width: `${l.pct}%`, height: "100%", background: l.pct >= 90 ? B.success : l.pct >= 70 ? B.warning : B.danger, borderRadius: 3 }} />
            </div>
          </div>
        ))}
      </Card>

      <Card>
        <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>⚠️ Categorías más problemáticas</h4>
        {["Mise en place: 4 hallazgos", "Técnica cocción: 3 hallazgos", "Porciones: 2 hallazgos", "Temperaturas: 1 hallazgo"].map((c, i) => (
          <div key={i} style={{ padding: "6px 0", borderBottom: `1px solid ${B.border}`, fontSize: 13 }}>{c}</div>
        ))}
      </Card>

      <Card>
        <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>📄 Exportar</h4>
        <div style={{ fontSize: 13, color: B.textMuted, marginBottom: 12 }}>Reportes formales para SEREMI y gestión interna.</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <Btn style={{ width: "100%" }}>📄 PDF — Reporte SEREMI (auditorías + temperaturas)</Btn>
          <Btn style={{ width: "100%" }}>📊 CSV — Datos completos para análisis</Btn>
        </div>
      </Card>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// MAIN
// ══════════════════════════════════════════════════════
export default function CalidadModule() {
  const [tab, setTab] = useState("autocontroles");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function check() { setIsMobile(window.innerWidth < 900); }
    check(); window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const overdueActions = ACTIONS.filter(a => a.status === "overdue").length;
  const notDone = AUTOCONTROL_TODAY.filter(a => !a.done).length;

  const TABS = [
    { id: "autocontroles", label: "Autocontroles", icon: "✅", badge: notDone > 0 ? notDone : null, badgeBg: B.dangerBg, badgeColor: B.danger },
    { id: "pilares", label: "Pilares + NC", icon: "📑" },
    { id: "auditorias", label: "Auditorías", icon: "🔍" },
    { id: "temperaturas", label: "Temperaturas", icon: "🌡️" },
    { id: "acciones", label: "Acciones", icon: "⚡", badge: overdueActions > 0 ? overdueActions : null, badgeBg: B.dangerBg, badgeColor: B.danger },
    { id: "local", label: "Vista local (ref.)", icon: "🏪" },
    { id: "plantillas", label: "Plantillas", icon: "⚙️" },
    { id: "reportes", label: "Reportes", icon: "📊" },
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
              <span key={n} style={{ padding: "6px 11px", fontSize: 13, fontWeight: n === "Calidad" ? 650 : 500, color: n === "Calidad" ? B.text : B.textMuted, borderBottom: n === "Calidad" ? `2px solid ${B.accent}` : "2px solid transparent", cursor: "pointer" }}>{n}</span>
            ))}
          </div>
        )}
      </header>

      <main style={{ padding: isMobile ? 16 : "20px 32px", maxWidth: 1320, margin: "0 auto" }}>
        <div style={{ marginBottom: 16 }}>
          <h1 style={{ fontSize: isMobile ? 20 : 24, fontWeight: 800, color: B.text, fontFamily: serif }}>✅ Calidad (BPM)</h1>
          <p style={{ fontSize: 13, color: B.textMuted, marginTop: 2 }}>Autocontrol diario (Prep Plus) + Auditorías en terreno (WCI) + Temperaturas + Acciones correctivas · 5 secciones: BPM SEREMI, Planillas día, Certificados, Descarte RILES, No Conformidad · Ventaja competitiva para posicionar Prep como servicio en HORECA mediana/grande</p>
        </div>

        <TabBar tabs={TABS} active={tab} onChange={setTab} />

        {tab === "autocontroles" && <AutocontrolWciView />}
        {tab === "pilares" && <PilaresNcView />}
        {tab === "auditorias" && <AuditoriasView />}
        {tab === "temperaturas" && <TemperaturasView />}
        {tab === "acciones" && <AccionesView />}
        {tab === "local" && <AutocontrolLocalView />}
        {tab === "plantillas" && <PlantillasView />}
        {tab === "reportes" && <ReportesView />}
      </main>
    </div>
  );
}
