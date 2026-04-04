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
          {t.badge != null && <span style={{ marginLeft: 6, fontSize: 10, fontWeight: 700, background: t.badgeBg || B.dangerBg, color: t.badgeColor || B.danger, padding: "1px 6px", borderRadius: 8 }}>{t.badge}</span>}
        </button>
      ))}
    </div>
  );
}

const fmt = (n) => Math.abs(n) >= 1000000 ? `$${(n / 1000000).toFixed(1)}M` : Math.abs(n) >= 1000 ? `$${(n / 1000).toFixed(0)}K` : `$${n.toLocaleString()}`;

const LOCATIONS = [
  { name: "Cheddar's Angol", headcount: 12, budget: 14, cost: 3200000 },
  { name: "Cheddar's Collao", headcount: 10, budget: 12, cost: 2800000 },
  { name: "Cheddar's B. Arana", headcount: 9, budget: 10, cost: 2400000 },
  { name: "Dark Kitchen", headcount: 6, budget: 8, cost: 1600000 },
  { name: "WCI Operaciones", headcount: 5, budget: 5, cost: 2200000 },
];

const EMPLOYEES = [
  { id: 1, name: "Carmen Rojas", rut: "18.234.567-8", role: "Jefe de cocina", location: "Cheddar's Angol", contract: "indefinido", salary: 850000, startDate: "15/03/2024", status: "activo", attendance: 97, evals: 4.2 },
  { id: 2, name: "Pedro Muñoz", rut: "19.345.678-9", role: "Cocinero", location: "Cheddar's Angol", contract: "indefinido", salary: 550000, startDate: "01/06/2024", status: "activo", attendance: 92, evals: 3.8 },
  { id: 3, name: "María Soto", rut: "20.456.789-0", role: "Enc. turno", location: "Cheddar's Collao", contract: "indefinido", salary: 650000, startDate: "10/01/2025", status: "activo", attendance: 98, evals: 4.5 },
  { id: 4, name: "Carlos Vega", rut: "17.567.890-1", role: "Repartidor", location: "WCI Operaciones", contract: "plazo fijo", salary: 480000, startDate: "01/02/2026", status: "activo", attendance: 88, evals: 3.5, contractEnd: "01/08/2026" },
  { id: 5, name: "Ana Torres", rut: "21.678.901-2", role: "Cajera", location: "Cheddar's B. Arana", contract: "indefinido", salary: 480000, startDate: "15/08/2025", status: "licencia", attendance: 85, evals: 3.2 },
  { id: 6, name: "Diego Flores", rut: "22.789.012-3", role: "Cocinero", location: "Dark Kitchen", contract: "indefinido", salary: 520000, startDate: "01/11/2025", status: "activo", attendance: 94, evals: 4.0 },
];

const ATTENDANCE_TODAY = [
  { location: "Cheddar's Angol", expected: 8, present: 7, late: 1, absent: 1, absentName: "Pedro Muñoz (sin aviso)" },
  { location: "Cheddar's Collao", expected: 6, present: 6, late: 0, absent: 0 },
  { location: "Cheddar's B. Arana", expected: 5, present: 4, late: 1, absent: 1, absentName: "Ana Torres (licencia)" },
  { location: "Dark Kitchen", expected: 4, present: 4, late: 0, absent: 0 },
  { location: "WCI Operaciones", expected: 3, present: 3, late: 0, absent: 0 },
];

const TRAININGS = [
  { name: "Manipulación de alimentos", type: "legal", validity: "12 meses", expiring: 3, expired: 1, total: 42 },
  { name: "Prevención de riesgos", type: "legal", validity: "24 meses", expiring: 0, expired: 0, total: 42 },
  { name: "Servicio al cliente Cheddar's", type: "interna", validity: "N/A", expiring: null, expired: null, total: 35 },
  { name: "Técnica de cocina nivel 1", type: "interna", validity: "N/A", expiring: null, expired: null, total: 18 },
  { name: "Protocolo delivery", type: "interna", validity: "N/A", expiring: null, expired: null, total: 6 },
];

// ══════════════════════════════════════════════════════
// P1: DOTACIÓN
// ══════════════════════════════════════════════════════
function DotacionView() {
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [locationFilter, setLocationFilter] = useState("all");
  const totalHead = LOCATIONS.reduce((s, l) => s + l.headcount, 0);
  const totalBudget = LOCATIONS.reduce((s, l) => s + l.budget, 0);
  const totalCost = LOCATIONS.reduce((s, l) => s + l.cost, 0);

  let employees = [...EMPLOYEES];
  if (locationFilter !== "all") employees = employees.filter(e => e.location === locationFilter);

  if (selectedEmp) {
    const e = selectedEmp;
    return (
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <Btn variant="ghost" onClick={() => setSelectedEmp(null)}>← Volver</Btn>
          <h3 style={{ fontSize: 16, fontWeight: 700 }}>{e.name}</h3>
          <Badge color={e.status === "activo" ? B.success : B.warning} bg={e.status === "activo" ? B.successBg : B.warningBg}>{e.status}</Badge>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <Card>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: B.textMuted, marginBottom: 10 }}>Datos personales</h4>
            {[
              ["Nombre", e.name], ["RUT", e.rut], ["Cargo", e.role], ["Local", e.location],
              ["Contrato", e.contract], ["Ingreso", e.startDate], ["Sueldo bruto", fmt(e.salary)],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: `1px solid ${B.border}`, fontSize: 13 }}>
                <span style={{ color: B.textMuted }}>{k}</span>
                <span style={{ fontWeight: 600 }}>{v}</span>
              </div>
            ))}
            {e.contractEnd && (
              <div style={{ marginTop: 8, padding: "8px 10px", background: B.warningBg, borderRadius: 6, fontSize: 12 }}>
                <span style={{ fontWeight: 600, color: B.warning }}>⚠️ Plazo fijo:</span> Vence {e.contractEnd}
              </div>
            )}
          </Card>

          <div>
            <Card style={{ marginBottom: 10 }}>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: B.textMuted, marginBottom: 10 }}>Métricas</h4>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div style={{ padding: "10px", background: B.surfaceHover, borderRadius: 8, textAlign: "center" }}>
                  <div style={{ fontSize: 11, color: B.textMuted }}>Asistencia</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: e.attendance >= 95 ? B.success : e.attendance >= 85 ? B.warning : B.danger }}>{e.attendance}%</div>
                </div>
                <div style={{ padding: "10px", background: B.surfaceHover, borderRadius: 8, textAlign: "center" }}>
                  <div style={{ fontSize: 11, color: B.textMuted }}>Evaluación</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: e.evals >= 4.0 ? B.success : e.evals >= 3.0 ? B.warning : B.danger }}>{e.evals}/5</div>
                </div>
              </div>
            </Card>

            <Card style={{ marginBottom: 10 }}>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: B.textMuted, marginBottom: 8 }}>Documentos</h4>
              {["Contrato de trabajo", "Anexo sueldo marzo 2026", "Certificado manipulación alimentos"].map((d, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid ${B.border}`, fontSize: 12 }}>
                  <span>{d}</span>
                  <Btn variant="ghost" style={{ fontSize: 11, padding: "2px 6px" }}>📄 Ver</Btn>
                </div>
              ))}
              <Btn style={{ marginTop: 8, fontSize: 12, width: "100%" }}>+ Subir documento</Btn>
            </Card>

            <Card>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: B.textMuted, marginBottom: 8 }}>Capacitaciones</h4>
              {[
                { name: "Manipulación alimentos", date: "15/01/2026", expires: "15/01/2027", status: "ok" },
                { name: "Prevención riesgos", date: "01/03/2025", expires: "01/03/2027", status: "ok" },
              ].map((c, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: `1px solid ${B.border}`, fontSize: 12 }}>
                  <span>{c.name}</span>
                  <Badge color={c.status === "ok" ? B.success : B.danger} bg={c.status === "ok" ? B.successBg : B.dangerBg}>
                    {c.status === "ok" ? `✓ Vigente hasta ${c.expires}` : "Vencido"}
                  </Badge>
                </div>
              ))}
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Headcount by location */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10, marginBottom: 16 }}>
        {LOCATIONS.map(l => {
          const fill = l.headcount / l.budget;
          return (
            <Card key={l.name} style={{ padding: "12px 14px", cursor: "pointer" }} onClick={() => setLocationFilter(l.name === locationFilter ? "all" : l.name)}>
              <div style={{ fontSize: 12, color: B.textMuted, marginBottom: 4 }}>{l.name}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                <span style={{ fontSize: 22, fontWeight: 800 }}>{l.headcount}</span>
                <span style={{ fontSize: 12, color: B.textMuted }}>/ {l.budget}</span>
              </div>
              <div style={{ height: 4, background: B.surfaceHover, borderRadius: 2, marginTop: 6 }}>
                <div style={{ width: `${fill * 100}%`, height: "100%", background: fill >= 0.9 ? B.success : fill >= 0.7 ? B.warning : B.danger, borderRadius: 2 }} />
              </div>
              <div style={{ fontSize: 11, color: B.textMuted, marginTop: 4 }}>{fmt(l.cost)}/mes</div>
            </Card>
          );
        })}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div style={{ fontSize: 13, color: B.textMuted }}>
          {totalHead}/{totalBudget} personas · Costo total: {fmt(totalCost)}/mes
          {locationFilter !== "all" && <> · Filtrando: <Badge>{locationFilter}</Badge> <Btn variant="ghost" onClick={() => setLocationFilter("all")} style={{ fontSize: 11 }}>✗ Limpiar</Btn></>}
        </div>
        <Btn variant="primary">+ Nuevo empleado</Btn>
      </div>

      {/* Employee table */}
      <Card style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: font }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${B.border}`, background: "#FAFAF8" }}>
              {["Nombre", "RUT", "Cargo", "Local", "Contrato", "Asistencia", "Eval.", "Estado"].map(h =>
                <th key={h} style={{ padding: "10px 10px", textAlign: "left", fontWeight: 600, color: B.textMuted, fontSize: 11 }}>{h}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {employees.map(e => (
              <tr key={e.id} onClick={() => setSelectedEmp(e)} style={{ borderBottom: `1px solid ${B.border}`, cursor: "pointer" }}
                onMouseEnter={ev => ev.currentTarget.style.background = B.surfaceHover}
                onMouseLeave={ev => ev.currentTarget.style.background = "transparent"}>
                <td style={{ padding: "10px 10px", fontWeight: 600 }}>{e.name}</td>
                <td style={{ padding: "10px 10px", color: B.textMuted, fontSize: 12 }}>{e.rut}</td>
                <td style={{ padding: "10px 10px" }}>{e.role}</td>
                <td style={{ padding: "10px 10px", color: B.textMuted }}>{e.location}</td>
                <td style={{ padding: "10px 10px" }}>
                  <Badge color={e.contract === "plazo fijo" ? B.warning : B.textMuted} bg={e.contract === "plazo fijo" ? B.warningBg : B.surfaceHover}>{e.contract}</Badge>
                </td>
                <td style={{ padding: "10px 10px", fontWeight: 600, color: e.attendance >= 95 ? B.success : e.attendance >= 85 ? B.warning : B.danger }}>{e.attendance}%</td>
                <td style={{ padding: "10px 10px", fontWeight: 600 }}>{e.evals}</td>
                <td style={{ padding: "10px 10px" }}>
                  <Badge color={e.status === "activo" ? B.success : B.warning} bg={e.status === "activo" ? B.successBg : B.warningBg}>{e.status}</Badge>
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
// P2: ASISTENCIA CROSS-LOCATION
// ══════════════════════════════════════════════════════
function AsistenciaView() {
  return (
    <div>
      <Card style={{ marginBottom: 14, background: B.infoBg, border: `1px solid ${B.info}20` }}>
        <div style={{ fontSize: 13 }}>
          <span style={{ fontWeight: 600 }}>Vista WCI.</span>
          <span style={{ color: B.textMuted, marginLeft: 6 }}>Cada local registra asistencia vía Portal Trabajador (PIN+GPS / Face ID). Aquí ves el consolidado en tiempo real.</span>
        </div>
      </Card>

      {ATTENDANCE_TODAY.map((a, i) => {
        const allPresent = a.present === a.expected;
        return (
          <Card key={i} style={{ marginBottom: 8, borderLeft: `4px solid ${allPresent ? B.success : a.absent > 0 ? B.danger : B.warning}`, padding: "12px 18px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>{a.location}</div>
                <div style={{ fontSize: 12, color: B.textMuted }}>
                  Esperados: {a.expected} · Presentes: <span style={{ fontWeight: 600, color: B.success }}>{a.present}</span>
                  {a.late > 0 && <> · Atrasos: <span style={{ fontWeight: 600, color: B.warning }}>{a.late}</span></>}
                  {a.absent > 0 && <> · Ausentes: <span style={{ fontWeight: 600, color: B.danger }}>{a.absent}</span></>}
                </div>
                {a.absentName && <div style={{ fontSize: 12, color: B.danger, marginTop: 2 }}>⚠️ {a.absentName}</div>}
              </div>
              <div style={{ display: "flex", gap: 4 }}>
                {Array.from({ length: a.expected }).map((_, pi) => (
                  <div key={pi} style={{
                    width: 12, height: 12, borderRadius: "50%",
                    background: pi < a.present ? (pi < a.present - a.late ? B.success : B.warning) : B.danger,
                  }} />
                ))}
              </div>
            </div>
          </Card>
        );
      })}

      <Card style={{ marginTop: 14 }}>
        <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>Asistencia mensual por local</h4>
        {LOCATIONS.map(l => {
          const pct = l.name === "WCI Operaciones" ? 99 : l.name === "Cheddar's Collao" ? 96 : l.name === "Cheddar's Angol" ? 94 : l.name === "Dark Kitchen" ? 93 : 88;
          return (
            <div key={l.name} style={{ marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 3 }}>
                <span style={{ fontWeight: 600 }}>{l.name}</span>
                <span style={{ fontWeight: 700, color: pct >= 95 ? B.success : pct >= 90 ? B.warning : B.danger }}>{pct}%</span>
              </div>
              <div style={{ height: 6, background: B.surfaceHover, borderRadius: 3 }}>
                <div style={{ width: `${pct}%`, height: "100%", background: pct >= 95 ? B.success : pct >= 90 ? B.warning : B.danger, borderRadius: 3 }} />
              </div>
            </div>
          );
        })}
      </Card>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// P3: TURNOS
// ══════════════════════════════════════════════════════
function TurnosView() {
  const days = ["Lun 7", "Mar 8", "Mié 9", "Jue 10", "Vie 11", "Sáb 12", "Dom 13"];
  const shifts = [
    { name: "Carmen R.", role: "J. cocina", shifts: ["08-17", "08-17", "08-17", "08-17", "08-17", "10-19", "libre"] },
    { name: "Pedro M.", role: "Cocinero", shifts: ["10-19", "10-19", "libre", "10-19", "10-19", "10-19", "10-19"] },
    { name: "Luis G.", role: "Ayudante", shifts: ["08-14", "08-14", "08-14", "libre", "08-14", "08-17", "08-14"] },
    { name: "Sofía V.", role: "Cajera", shifts: ["11-20", "11-20", "11-20", "11-20", "libre", "11-20", "11-20"] },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div>
          <span style={{ fontSize: 14, fontWeight: 700 }}>Semana 7-13 abril 2026</span>
          <span style={{ fontSize: 12, color: B.textMuted, marginLeft: 8 }}>Cheddar's Angol</span>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <select style={{ padding: "6px 10px", border: `1px solid ${B.border}`, borderRadius: 6, fontSize: 12, fontFamily: font }}>
            {LOCATIONS.map(l => <option key={l.name}>{l.name}</option>)}
          </select>
          <Btn variant="primary" style={{ fontSize: 12 }}>Publicar semana</Btn>
        </div>
      </div>

      <Card style={{ padding: 0, overflow: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: font, minWidth: 700 }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${B.border}`, background: "#FAFAF8" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", fontWeight: 600, color: B.textMuted, fontSize: 11, minWidth: 130 }}>Empleado</th>
              {days.map(d => <th key={d} style={{ padding: "10px 6px", textAlign: "center", fontWeight: 600, color: B.textMuted, fontSize: 11 }}>{d}</th>)}
              <th style={{ padding: "10px 8px", textAlign: "center", fontWeight: 600, color: B.textMuted, fontSize: 11 }}>Hrs/sem</th>
            </tr>
          </thead>
          <tbody>
            {shifts.map((s, i) => {
              const totalHrs = s.shifts.filter(sh => sh !== "libre").reduce((sum, sh) => {
                const [start, end] = sh.split("-").map(Number);
                return sum + (end - start);
              }, 0);
              return (
                <tr key={i} style={{ borderBottom: `1px solid ${B.border}` }}>
                  <td style={{ padding: "8px 12px" }}>
                    <div style={{ fontWeight: 600 }}>{s.name}</div>
                    <div style={{ fontSize: 11, color: B.textMuted }}>{s.role}</div>
                  </td>
                  {s.shifts.map((sh, di) => (
                    <td key={di} style={{ padding: "6px 4px", textAlign: "center" }}>
                      <div style={{
                        padding: "6px 4px", borderRadius: 6, fontSize: 12, fontWeight: 600,
                        background: sh === "libre" ? "transparent" : `${B.accent}10`,
                        color: sh === "libre" ? B.textLight : B.text,
                        border: sh === "libre" ? `1px dashed ${B.border}` : `1px solid ${B.accent}30`,
                        cursor: "pointer",
                      }}>{sh}</div>
                    </td>
                  ))}
                  <td style={{ padding: "8px 8px", textAlign: "center", fontWeight: 700, color: totalHrs > 45 ? B.danger : B.text }}>{totalHrs}h</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>

      <div style={{ fontSize: 12, color: B.textMuted, marginTop: 8 }}>Click en una celda para editar el turno. Horas extras (sobre 45h/sem) se marcan en rojo.</div>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// P4: LIQUIDACIONES
// ══════════════════════════════════════════════════════
function LiquidacionesView() {
  return (
    <div>
      <Card style={{ background: B.warningBg, border: `1px solid ${B.warning}25`, marginBottom: 14 }}>
        <div style={{ fontSize: 13 }}>
          <span style={{ fontWeight: 700, color: B.warning }}>🚧 En desarrollo.</span>
          <span style={{ color: B.textMuted, marginLeft: 6 }}>Integración con Previred pendiente (email enviado). Hoy las liquidaciones se gestionan en planilla externa. La idea es que el sistema calcule sueldo base + horas extra + descuentos y genere la liquidación.</span>
        </div>
      </Card>

      <Card>
        <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Lo que viene</h4>
        {[
          { step: "Sueldo base del contrato", status: "ready", note: "Ya está en employees.salary" },
          { step: "Horas extra calculadas automáticamente", status: "ready", note: "Asistencia registra hora entrada/salida" },
          { step: "Descuentos legales (AFP, Salud, Seguro cesantía)", status: "pending", note: "Requiere integración Previred" },
          { step: "Bonos y gratificaciones", status: "pending", note: "Configurar por local/cargo" },
          { step: "Generación de liquidación PDF", status: "pending", note: "Firmada digitalmente" },
          { step: "Carga a Previred", status: "pending", note: "API o archivo plano" },
        ].map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: `1px solid ${B.border}` }}>
            <div style={{ width: 24, height: 24, borderRadius: "50%", background: s.status === "ready" ? B.successBg : B.surfaceHover, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: s.status === "ready" ? B.success : B.textLight, fontWeight: 700 }}>
              {s.status === "ready" ? "✓" : i + 1}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{s.step}</div>
              <div style={{ fontSize: 11, color: B.textMuted }}>{s.note}</div>
            </div>
            <Badge color={s.status === "ready" ? B.success : B.textMuted} bg={s.status === "ready" ? B.successBg : B.surfaceHover}>
              {s.status === "ready" ? "Listo" : "Pendiente"}
            </Badge>
          </div>
        ))}
      </Card>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// P7: CAPACITACIONES
// ══════════════════════════════════════════════════════
function CapacitacionesView() {
  const expiringCount = TRAININGS.reduce((s, t) => s + (t.expiring || 0), 0);
  const expiredCount = TRAININGS.reduce((s, t) => s + (t.expired || 0), 0);

  return (
    <div>
      {(expiredCount > 0 || expiringCount > 0) && (
        <Card style={{ background: B.dangerBg, border: `1px solid ${B.danger}20`, marginBottom: 14 }}>
          <div style={{ fontSize: 13 }}>
            {expiredCount > 0 && <span style={{ fontWeight: 700, color: B.danger }}>🔴 {expiredCount} certificación vencida. </span>}
            {expiringCount > 0 && <span style={{ fontWeight: 700, color: B.warning }}>🟡 {expiringCount} por vencer en 30 días. </span>}
            <span style={{ color: B.textMuted }}>Certificaciones legales vencidas impiden trabajar.</span>
          </div>
        </Card>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
        <div style={{ fontSize: 13, color: B.textMuted }}>{TRAININGS.length} capacitaciones registradas</div>
        <Btn variant="primary">+ Nueva capacitación</Btn>
      </div>

      {TRAININGS.map((t, i) => (
        <Card key={i} style={{ marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 14, fontWeight: 700 }}>{t.name}</span>
              <Badge color={t.type === "legal" ? B.danger : B.info} bg={t.type === "legal" ? B.dangerBg : B.infoBg}>{t.type === "legal" ? "Legal obligatoria" : "Interna"}</Badge>
            </div>
            <div style={{ fontSize: 12, color: B.textMuted }}>
              {t.total} personas capacitadas · Vigencia: {t.validity}
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {t.expired > 0 && <Badge color={B.danger} bg={B.dangerBg}>🔴 {t.expired} vencida</Badge>}
            {t.expiring > 0 && <Badge color={B.warning} bg={B.warningBg}>🟡 {t.expiring} por vencer</Badge>}
            {!t.expired && !t.expiring && t.type === "legal" && <Badge color={B.success} bg={B.successBg}>✓ Todo vigente</Badge>}
            <Btn variant="ghost" style={{ fontSize: 12 }}>Ver detalle</Btn>
          </div>
        </Card>
      ))}
    </div>
  );
}

// ══════════════════════════════════════════════════════
// P8: REPORTES
// ══════════════════════════════════════════════════════
function ReportesView() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
      <Card>
        <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>📊 Horas extra por local</h4>
        {[
          { local: "Cheddar's Angol", hrs: 32, cost: 180000 },
          { local: "Dark Kitchen", hrs: 18, cost: 95000 },
          { local: "Cheddar's Collao", hrs: 12, cost: 65000 },
          { local: "Cheddar's B. Arana", hrs: 8, cost: 42000 },
          { local: "WCI", hrs: 5, cost: 35000 },
        ].map(l => (
          <div key={l.local} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid ${B.border}`, fontSize: 13 }}>
            <span style={{ fontWeight: 600 }}>{l.local}</span>
            <div><span style={{ color: B.warning, fontWeight: 600 }}>{l.hrs}h</span> <span style={{ color: B.textMuted }}>({fmt(l.cost)})</span></div>
          </div>
        ))}
      </Card>

      <Card>
        <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>🔄 Rotación por local (últimos 12 meses)</h4>
        {[
          { local: "Dark Kitchen", pct: 45, exits: 3 },
          { local: "Cheddar's B. Arana", pct: 33, exits: 3 },
          { local: "Cheddar's Angol", pct: 17, exits: 2 },
          { local: "Cheddar's Collao", pct: 10, exits: 1 },
          { local: "WCI", pct: 0, exits: 0 },
        ].map(l => (
          <div key={l.local} style={{ marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 3 }}>
              <span style={{ fontWeight: 600 }}>{l.local}</span>
              <span style={{ fontWeight: 700, color: l.pct > 30 ? B.danger : l.pct > 15 ? B.warning : B.success }}>{l.pct}% <span style={{ fontWeight: 400, color: B.textMuted }}>({l.exits} salidas)</span></span>
            </div>
            <div style={{ height: 6, background: B.surfaceHover, borderRadius: 3 }}>
              <div style={{ width: `${Math.min(l.pct, 100)}%`, height: "100%", background: l.pct > 30 ? B.danger : l.pct > 15 ? B.warning : B.success, borderRadius: 3 }} />
            </div>
          </div>
        ))}
      </Card>

      <Card>
        <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>📋 Ausentismo por tipo</h4>
        {[
          { type: "Licencia médica", days: 12, pct: "2.8%" },
          { type: "Permiso personal", days: 5, pct: "1.2%" },
          { type: "Falta injustificada", days: 3, pct: "0.7%" },
          { type: "Vacaciones", days: 18, pct: "4.2%" },
        ].map(a => (
          <div key={a.type} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid ${B.border}`, fontSize: 13 }}>
            <span>{a.type}</span>
            <div><span style={{ fontWeight: 600 }}>{a.days} días</span> <span style={{ color: B.textMuted }}>({a.pct})</span></div>
          </div>
        ))}
      </Card>

      <Card>
        <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>💰 Costo RRHH por local / empleado</h4>
        {LOCATIONS.map(l => (
          <div key={l.name} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid ${B.border}`, fontSize: 13 }}>
            <span style={{ fontWeight: 600 }}>{l.name}</span>
            <div>
              <span style={{ fontWeight: 700 }}>{fmt(l.cost)}</span>
              <span style={{ color: B.textMuted, marginLeft: 8 }}>({fmt(Math.round(l.cost / l.headcount))}/persona)</span>
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
export default function RrhhModule() {
  const [tab, setTab] = useState("dotacion");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function check() { setIsMobile(window.innerWidth < 900); }
    check(); window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const expiredTrainings = TRAININGS.reduce((s, t) => s + (t.expired || 0), 0);

  const TABS = [
    { id: "dotacion", label: "Dotación", icon: "👥" },
    { id: "asistencia", label: "Asistencia", icon: "⏰" },
    { id: "turnos", label: "Turnos", icon: "📅" },
    { id: "liquidaciones", label: "Liquidaciones", icon: "💰" },
    { id: "capacitaciones", label: "Capacitaciones", icon: "🎓", badge: expiredTrainings > 0 ? expiredTrainings : null, badgeBg: B.dangerBg, badgeColor: B.danger },
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
            <span style={{ fontSize: 16 }}>🔔</span>
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
          <h1 style={{ fontSize: isMobile ? 20 : 24, fontWeight: 800, color: B.text, fontFamily: serif }}>👥 RRHH</h1>
          <p style={{ fontSize: 13, color: B.textMuted, marginTop: 2 }}>
            {LOCATIONS.reduce((s, l) => s + l.headcount, 0)} empleados · {LOCATIONS.length} locaciones · Costo total: {fmt(LOCATIONS.reduce((s, l) => s + l.cost, 0))}/mes
          </p>
        </div>

        <TabBar tabs={TABS} active={tab} onChange={setTab} />

        {tab === "dotacion" && <DotacionView />}
        {tab === "asistencia" && <AsistenciaView />}
        {tab === "turnos" && <TurnosView />}
        {tab === "liquidaciones" && <LiquidacionesView />}
        {tab === "capacitaciones" && <CapacitacionesView />}
        {tab === "reportes" && <ReportesView />}
      </main>
    </div>
  );
}
