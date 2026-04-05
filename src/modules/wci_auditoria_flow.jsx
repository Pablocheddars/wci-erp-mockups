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
function Btn({ children, variant = "default", onClick, style: sx = {}, disabled }) {
  const styles = { primary: { background: B.accent, color: B.primary, border: "none", fontWeight: 700 }, danger: { background: B.dangerBg, color: B.danger, border: `1px solid ${B.danger}30`, fontWeight: 600 }, success: { background: B.successBg, color: B.success, border: `1px solid ${B.success}30`, fontWeight: 600 }, default: { background: B.surface, color: B.text, border: `1px solid ${B.border}`, fontWeight: 600 }, ghost: { background: "transparent", color: B.textMuted, border: "none", fontWeight: 600 } };
  return <button onClick={onClick} disabled={disabled} style={{ padding: "7px 14px", borderRadius: 8, fontSize: 13, cursor: disabled ? "not-allowed" : "pointer", fontFamily: font, transition: "all 0.12s", opacity: disabled ? 0.5 : 1, ...styles[variant], ...sx }}>{children}</button>;
}
function Card({ children, style: sx = {} }) {
  return <div style={{ background: B.surface, border: `1px solid ${B.border}`, borderRadius: 12, padding: "16px 20px", ...sx }}>{children}</div>;
}

const TEMPLATES = [
  { id: 1, name: "Auditoría gastronómica estándar", type: "gastronomica", items: 16, lastUsed: "03/04" },
  { id: 2, name: "Auditoría BPM cocina", type: "bpm", items: 24, lastUsed: "01/04" },
  { id: 3, name: "Auditoría experiencia", type: "experiencia", items: 12, lastUsed: "28/03" },
];

const LOCATIONS = [
  { id: 1, name: "Cheddar's Angol", lastAudit: "03/04", lastScore: 88 },
  { id: 2, name: "Cheddar's Collao", lastAudit: "28/03", lastScore: 92 },
  { id: 3, name: "Cheddar's Barros Arana", lastAudit: "25/03", lastScore: 75 },
  { id: 4, name: "Dark Kitchen", lastAudit: "01/04", lastScore: 72 },
  { id: 5, name: "WCI Cocina producción", lastAudit: "02/04", lastScore: 95 },
];

const CHECKLIST_CATEGORIES = [
  {
    name: "Porciones",
    weight: 30,
    items: [
      { id: 1, desc: "Gramaje de carne en hamburguesas (150g ± 5g)", weight: 10 },
      { id: 2, desc: "Porción de queso en cada plato según ficha técnica", weight: 8 },
      { id: 3, desc: "Cantidad de salsa BBQ en alitas (80ml ± 10ml)", weight: 6 },
      { id: 4, desc: "Porción de papas fritas (250g ± 15g)", weight: 6 },
    ]
  },
  {
    name: "Presentación",
    weight: 25,
    items: [
      { id: 5, desc: "Montaje del plato según foto de referencia", weight: 8 },
      { id: 6, desc: "Limpieza del borde del plato antes de servir", weight: 5 },
      { id: 7, desc: "Color y aspecto visual del producto terminado", weight: 6 },
      { id: 8, desc: "Envases de delivery correctamente sellados y etiquetados", weight: 6 },
    ]
  },
  {
    name: "Técnica",
    weight: 25,
    items: [
      { id: 9, desc: "Temperatura del aceite para fritura (170-180°C)", weight: 7 },
      { id: 10, desc: "Punto de cocción de la carne (según estándar del plato)", weight: 8 },
      { id: 11, desc: "Tiempos de preparación dentro de rango aceptable", weight: 5 },
      { id: 12, desc: "Uso correcto de equipos (plancha, freidora, horno)", weight: 5 },
    ]
  },
  {
    name: "Mise en place",
    weight: 20,
    items: [
      { id: 13, desc: "Estación de trabajo organizada y limpia", weight: 5 },
      { id: 14, desc: "Ingredientes mise en place preparados antes del servicio", weight: 5 },
      { id: 15, desc: "Rotulado y fechado de preparaciones", weight: 5 },
      { id: 16, desc: "Refrigeración correcta de mise en place", weight: 5 },
    ]
  },
];

export default function AuditoriaFlow() {
  const [step, setStep] = useState("select"); // select, audit, review, done
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [responses, setResponses] = useState({});
  const [notes, setNotes] = useState({});
  const [photos, setPhotos] = useState({});
  const [currentCategory, setCurrentCategory] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function check() { setIsMobile(window.innerWidth < 900); }
    check(); window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const setResponse = (itemId, value) => setResponses(prev => ({ ...prev, [itemId]: value }));
  const setNote = (itemId, value) => setNotes(prev => ({ ...prev, [itemId]: value }));
  const setPhoto = (itemId) => setPhotos(prev => ({ ...prev, [itemId]: true }));

  const allItems = CHECKLIST_CATEGORIES.flatMap(c => c.items);
  const answeredCount = Object.keys(responses).length;
  const totalItems = allItems.length;
  const progress = totalItems > 0 ? Math.round((answeredCount / totalItems) * 100) : 0;

  // Calculate score
  const calculateScore = () => {
    let totalWeight = 0;
    let earnedWeight = 0;
    allItems.forEach(item => {
      totalWeight += item.weight;
      const r = responses[item.id];
      if (r === "pass") earnedWeight += item.weight;
      else if (r === "partial") earnedWeight += item.weight * 0.5;
    });
    return totalWeight > 0 ? Math.round((earnedWeight / totalWeight) * 100) : 0;
  };

  // ── STEP 1: SELECT ──
  if (step === "select") {
    return (
      <div style={{ fontFamily: font, background: "#F5F4F0", minHeight: "100vh" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&family=DM+Serif+Display&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          ::-webkit-scrollbar { width: 5px; }
          ::-webkit-scrollbar-thumb { background: #d4d2cd; border-radius: 3px; }
        `}</style>

        <header style={{ background: B.surface, borderBottom: `1px solid ${B.border}`, padding: "0 24px", height: 52, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, background: B.accent, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 16, color: B.primary, fontFamily: serif }}>C</div>
          <div style={{ lineHeight: 1.1 }}><div style={{ fontFamily: serif, fontSize: 14, fontWeight: 700 }}>Cheddar's</div><div style={{ fontSize: 9, color: B.textMuted, fontWeight: 500, letterSpacing: 1.5, textTransform: "uppercase" }}>West Coast</div></div>
        </header>

        <main style={{ padding: isMobile ? 16 : "24px 32px", maxWidth: 800, margin: "0 auto" }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, fontFamily: serif, marginBottom: 4 }}>🔍 Nueva auditoría</h1>
          <p style={{ fontSize: 13, color: B.textMuted, marginBottom: 24 }}>Selecciona la cocina a auditar y la plantilla a usar.</p>

          {/* Select location */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10, color: B.text }}>1. ¿Qué cocina vas a auditar?</div>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 8 }}>
              {LOCATIONS.map(loc => {
                const isSelected = selectedLocation?.id === loc.id;
                const scoreColor = loc.lastScore >= 90 ? B.success : loc.lastScore >= 70 ? B.warning : B.danger;
                return (
                  <button key={loc.id} onClick={() => setSelectedLocation(loc)} style={{
                    padding: "14px 16px", borderRadius: 10, cursor: "pointer", textAlign: "left",
                    border: isSelected ? `2px solid ${B.accent}` : `1px solid ${B.border}`,
                    background: isSelected ? `${B.accent}08` : B.surface, fontFamily: font,
                    transition: "all 0.12s",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ fontSize: 14, fontWeight: 650, color: B.text }}>{loc.name}</div>
                      <div style={{ width: 36, height: 36, borderRadius: 8, background: `${scoreColor}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: 14, fontWeight: 800, color: scoreColor }}>{loc.lastScore}</span>
                      </div>
                    </div>
                    <div style={{ fontSize: 11, color: B.textMuted, marginTop: 4 }}>Última auditoría: {loc.lastAudit} · Score: {loc.lastScore}%</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Select template */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10, color: B.text }}>2. ¿Qué plantilla usar?</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {TEMPLATES.map(tpl => {
                const isSelected = selectedTemplate?.id === tpl.id;
                return (
                  <button key={tpl.id} onClick={() => setSelectedTemplate(tpl)} style={{
                    padding: "14px 16px", borderRadius: 10, cursor: "pointer", textAlign: "left",
                    border: isSelected ? `2px solid ${B.accent}` : `1px solid ${B.border}`,
                    background: isSelected ? `${B.accent}08` : B.surface, fontFamily: font,
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                  }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 650, color: B.text }}>{tpl.name}</div>
                      <div style={{ fontSize: 11, color: B.textMuted, marginTop: 2 }}>{tpl.items} items · Último uso: {tpl.lastUsed}</div>
                    </div>
                    <Badge color={tpl.type === "gastronomica" ? B.purple : tpl.type === "bpm" ? B.info : B.success} bg={tpl.type === "gastronomica" ? `${B.purple}12` : tpl.type === "bpm" ? B.infoBg : B.successBg}>{tpl.type}</Badge>
                  </button>
                );
              })}
            </div>
          </div>

          <Btn variant="primary" disabled={!selectedLocation || !selectedTemplate}
            onClick={() => setStep("audit")}
            style={{ width: "100%", padding: 14, fontSize: 15 }}>
            Iniciar auditoría →
          </Btn>
        </main>
      </div>
    );
  }

  // ── STEP 2: EXECUTE AUDIT ──
  if (step === "audit") {
    const cat = CHECKLIST_CATEGORIES[currentCategory];
    const catAnswered = cat.items.filter(i => responses[i.id]).length;

    return (
      <div style={{ fontFamily: font, background: "#F5F4F0", minHeight: "100vh" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&family=DM+Serif+Display&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          textarea:focus { outline: none; border-color: ${B.accent} !important; }
          ::-webkit-scrollbar { width: 5px; }
          ::-webkit-scrollbar-thumb { background: #d4d2cd; border-radius: 3px; }
        `}</style>

        {/* Sticky header with progress */}
        <header style={{ background: B.surface, borderBottom: `1px solid ${B.border}`, position: "sticky", top: 0, zIndex: 100 }}>
          <div style={{ padding: "10px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Btn variant="ghost" onClick={() => {
                if (currentCategory > 0) setCurrentCategory(currentCategory - 1);
                else if (confirm("¿Salir? Puedes retomar después.")) setStep("select");
              }} style={{ padding: "4px 8px" }}>←</Btn>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: B.text }}>{selectedLocation?.name}</div>
                <div style={{ fontSize: 11, color: B.textMuted }}>{selectedTemplate?.name}</div>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 13, fontWeight: 700 }}>{answeredCount}/{totalItems}</div>
              <div style={{ fontSize: 11, color: B.textMuted }}>{progress}%</div>
            </div>
          </div>
          {/* Progress bar */}
          <div style={{ height: 4, background: B.border }}>
            <div style={{ width: `${progress}%`, height: "100%", background: B.accent, transition: "width 0.3s" }} />
          </div>
          {/* Category tabs */}
          <div style={{ display: "flex", overflowX: "auto", borderTop: `1px solid ${B.border}` }}>
            {CHECKLIST_CATEGORIES.map((c, i) => {
              const catDone = c.items.filter(item => responses[item.id]).length;
              const allDone = catDone === c.items.length;
              return (
                <button key={i} onClick={() => setCurrentCategory(i)} style={{
                  padding: "10px 16px", border: "none", background: "transparent",
                  fontSize: 12, fontWeight: currentCategory === i ? 700 : 500,
                  color: currentCategory === i ? B.text : B.textMuted,
                  borderBottom: currentCategory === i ? `2px solid ${B.accent}` : "2px solid transparent",
                  cursor: "pointer", fontFamily: font, whiteSpace: "nowrap",
                  position: "relative",
                }}>
                  {allDone && <span style={{ color: B.success, marginRight: 4 }}>✓</span>}
                  {c.name}
                  <span style={{ fontSize: 10, color: B.textLight, marginLeft: 4 }}>{catDone}/{c.items.length}</span>
                </button>
              );
            })}
          </div>
        </header>

        <main style={{ padding: isMobile ? 12 : "16px 24px", maxWidth: 800, margin: "0 auto" }}>
          {/* Category header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 800, color: B.text }}>{cat.name}</div>
              <div style={{ fontSize: 12, color: B.textMuted }}>Peso en score: {cat.weight}% · {catAnswered}/{cat.items.length} respondidos</div>
            </div>
          </div>

          {/* Checklist items */}
          {cat.items.map(item => {
            const response = responses[item.id];
            const hasNote = notes[item.id];
            const hasPhoto = photos[item.id];
            const showNote = response === "fail" || response === "partial" || hasNote;

            return (
              <Card key={item.id} style={{
                marginBottom: 10,
                borderLeft: response ? `4px solid ${response === "pass" ? B.success : response === "partial" ? B.warning : B.danger}` : `4px solid ${B.border}`,
                padding: "14px 16px",
              }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: B.text, marginBottom: 10, lineHeight: 1.4 }}>
                  {item.desc}
                  <span style={{ fontSize: 10, color: B.textLight, marginLeft: 8 }}>({item.weight} pts)</span>
                </div>

                {/* Response buttons */}
                <div style={{ display: "flex", gap: 8, marginBottom: showNote ? 10 : 0 }}>
                  {[
                    { value: "pass", label: "✓ Cumple", color: B.success },
                    { value: "partial", label: "⚠ Parcial", color: B.warning },
                    { value: "fail", label: "✗ No cumple", color: B.danger },
                  ].map(opt => (
                    <button key={opt.value} onClick={() => setResponse(item.id, opt.value)} style={{
                      flex: 1, padding: "12px 8px", borderRadius: 8,
                      border: response === opt.value ? `2px solid ${opt.color}` : `1px solid ${B.border}`,
                      background: response === opt.value ? `${opt.color}12` : "transparent",
                      cursor: "pointer", fontSize: 13, fontWeight: 650, color: response === opt.value ? opt.color : B.textMuted,
                      fontFamily: font, transition: "all 0.12s",
                    }}>{opt.label}</button>
                  ))}
                </div>

                {/* Note + photo for partial/fail */}
                {showNote && (
                  <div style={{ marginTop: 8 }}>
                    <textarea
                      placeholder={response === "fail" ? "Describe el problema (obligatorio)..." : "Nota opcional..."}
                      value={notes[item.id] || ""}
                      onChange={e => setNote(item.id, e.target.value)}
                      style={{
                        width: "100%", padding: "8px 12px", border: `1px solid ${response === "fail" ? B.danger : B.border}`,
                        borderRadius: 8, fontSize: 13, fontFamily: font, minHeight: 50, resize: "vertical",
                        background: response === "fail" ? `${B.danger}05` : B.surface,
                      }}
                    />
                    <div style={{ display: "flex", gap: 8, marginTop: 6, alignItems: "center" }}>
                      <button onClick={() => setPhoto(item.id)} style={{
                        padding: "6px 12px", borderRadius: 6, fontSize: 12, fontFamily: font,
                        border: `1px solid ${response === "fail" ? B.danger : B.border}`,
                        background: hasPhoto ? B.successBg : "transparent",
                        color: hasPhoto ? B.success : response === "fail" ? B.danger : B.textMuted,
                        cursor: "pointer", fontWeight: 600,
                      }}>
                        📷 {hasPhoto ? "Foto adjunta ✓" : response === "fail" ? "Foto obligatoria" : "Agregar foto"}
                      </button>
                      {response === "fail" && !hasPhoto && (
                        <span style={{ fontSize: 11, color: B.danger, fontWeight: 600 }}>⚠ Foto requerida para "No cumple"</span>
                      )}
                    </div>
                  </div>
                )}
              </Card>
            );
          })}

          {/* Navigation */}
          <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
            {currentCategory > 0 && (
              <Btn onClick={() => setCurrentCategory(currentCategory - 1)} style={{ flex: 1, padding: 12 }}>
                ← {CHECKLIST_CATEGORIES[currentCategory - 1].name}
              </Btn>
            )}
            {currentCategory < CHECKLIST_CATEGORIES.length - 1 ? (
              <Btn variant="primary" onClick={() => setCurrentCategory(currentCategory + 1)} style={{ flex: 1, padding: 12 }}>
                {CHECKLIST_CATEGORIES[currentCategory + 1].name} →
              </Btn>
            ) : (
              <Btn variant="primary" onClick={() => setStep("review")} disabled={answeredCount < totalItems}
                style={{ flex: 1, padding: 12, fontSize: 15 }}>
                {answeredCount < totalItems ? `Faltan ${totalItems - answeredCount} items` : "Revisar y cerrar →"}
              </Btn>
            )}
          </div>
        </main>
      </div>
    );
  }

  // ── STEP 3: REVIEW ──
  if (step === "review") {
    const score = calculateScore();
    const scoreColor = score >= 90 ? B.success : score >= 70 ? B.warning : B.danger;
    const result = score >= 90 ? "Aprobado" : score >= 70 ? "Observado" : "Reprobado";
    const failItems = allItems.filter(i => responses[i.id] === "fail");
    const partialItems = allItems.filter(i => responses[i.id] === "partial");

    return (
      <div style={{ fontFamily: font, background: "#F5F4F0", minHeight: "100vh" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&family=DM+Serif+Display&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          ::-webkit-scrollbar { width: 5px; }
          ::-webkit-scrollbar-thumb { background: #d4d2cd; border-radius: 3px; }
        `}</style>

        <header style={{ background: B.surface, borderBottom: `1px solid ${B.border}`, padding: "0 20px", height: 52, display: "flex", alignItems: "center", gap: 10 }}>
          <Btn variant="ghost" onClick={() => setStep("audit")} style={{ padding: "4px 8px" }}>← Volver a editar</Btn>
          <div style={{ fontSize: 14, fontWeight: 700 }}>Revisión — {selectedLocation?.name}</div>
        </header>

        <main style={{ padding: isMobile ? 16 : "24px 32px", maxWidth: 800, margin: "0 auto" }}>
          {/* Score card */}
          <Card style={{ textAlign: "center", marginBottom: 20, padding: "28px 20px" }}>
            <div style={{
              width: 90, height: 90, borderRadius: "50%", margin: "0 auto 14px",
              background: `${scoreColor}15`, border: `4px solid ${scoreColor}`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ fontSize: 32, fontWeight: 900, color: scoreColor }}>{score}</span>
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: scoreColor, marginBottom: 4 }}>{result}</div>
            <div style={{ fontSize: 13, color: B.textMuted }}>
              {selectedLocation?.name} · {selectedTemplate?.name} · {new Date().toLocaleDateString("es-CL")}
            </div>
          </Card>

          {/* Category breakdown */}
          <Card style={{ marginBottom: 14 }}>
            <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Desglose por categoría</h4>
            {CHECKLIST_CATEGORIES.map(cat => {
              const catItems = cat.items;
              const catPass = catItems.filter(i => responses[i.id] === "pass").length;
              const catPartial = catItems.filter(i => responses[i.id] === "partial").length;
              const catFail = catItems.filter(i => responses[i.id] === "fail").length;
              const catScore = Math.round(((catPass + catPartial * 0.5) / catItems.length) * 100);
              const catColor = catScore >= 90 ? B.success : catScore >= 70 ? B.warning : B.danger;

              return (
                <div key={cat.name} style={{ marginBottom: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{cat.name} <span style={{ color: B.textLight, fontWeight: 400 }}>({cat.weight}%)</span></span>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <span style={{ fontSize: 11, color: B.success }}>✓{catPass}</span>
                      <span style={{ fontSize: 11, color: B.warning }}>⚠{catPartial}</span>
                      <span style={{ fontSize: 11, color: B.danger }}>✗{catFail}</span>
                      <span style={{ fontSize: 14, fontWeight: 800, color: catColor }}>{catScore}%</span>
                    </div>
                  </div>
                  <div style={{ height: 6, background: B.surfaceHover, borderRadius: 3 }}>
                    <div style={{ width: `${catScore}%`, height: "100%", background: catColor, borderRadius: 3, transition: "width 0.3s" }} />
                  </div>
                </div>
              );
            })}
          </Card>

          {/* Issues found */}
          {(failItems.length > 0 || partialItems.length > 0) && (
            <Card style={{ marginBottom: 14 }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Hallazgos</h4>

              {failItems.length > 0 && (
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: B.danger, marginBottom: 6 }}>✗ No cumple ({failItems.length})</div>
                  {failItems.map(item => (
                    <div key={item.id} style={{ padding: "8px 12px", background: B.dangerBg, borderRadius: 8, marginBottom: 4, fontSize: 13 }}>
                      <div style={{ fontWeight: 600, color: B.text }}>{item.desc}</div>
                      {notes[item.id] && <div style={{ fontSize: 12, color: B.textMuted, marginTop: 2 }}>📝 {notes[item.id]}</div>}
                      {photos[item.id] && <div style={{ fontSize: 11, color: B.info, marginTop: 2 }}>📷 Foto adjunta</div>}
                    </div>
                  ))}
                </div>
              )}

              {partialItems.length > 0 && (
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: B.warning, marginBottom: 6 }}>⚠ Parcial ({partialItems.length})</div>
                  {partialItems.map(item => (
                    <div key={item.id} style={{ padding: "8px 12px", background: B.warningBg, borderRadius: 8, marginBottom: 4, fontSize: 13 }}>
                      <div style={{ fontWeight: 600, color: B.text }}>{item.desc}</div>
                      {notes[item.id] && <div style={{ fontSize: 12, color: B.textMuted, marginTop: 2 }}>📝 {notes[item.id]}</div>}
                    </div>
                  ))}
                </div>
              )}
            </Card>
          )}

          {/* Auto-generated corrective actions */}
          {failItems.length > 0 && (
            <Card style={{ marginBottom: 14 }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Acciones correctivas a crear</h4>
              <div style={{ fontSize: 12, color: B.textMuted, marginBottom: 10 }}>Se crean automáticamente para cada "No cumple". Asigna responsable y plazo.</div>
              {failItems.map(item => (
                <div key={item.id} style={{ display: "flex", gap: 10, alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${B.border}` }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{item.desc}</div>
                    <div style={{ fontSize: 11, color: B.textMuted }}>{notes[item.id]}</div>
                  </div>
                  <select style={{ padding: "6px 10px", border: `1px solid ${B.border}`, borderRadius: 6, fontSize: 12, fontFamily: font }}>
                    <option>Responsable...</option>
                    <option>Jefe de cocina</option>
                    <option>Enc. turno</option>
                    <option>Admin local</option>
                  </select>
                  <input type="date" style={{ padding: "6px 10px", border: `1px solid ${B.border}`, borderRadius: 6, fontSize: 12, fontFamily: font }} />
                </div>
              ))}
            </Card>
          )}

          {/* Actions */}
          <div style={{ display: "flex", gap: 8 }}>
            <Btn variant="ghost" onClick={() => setStep("audit")} style={{ flex: 1, padding: 12 }}>← Seguir editando</Btn>
            <Btn variant="primary" onClick={() => setStep("done")} style={{ flex: 2, padding: 14, fontSize: 15 }}>
              🔒 Cerrar auditoría (inmutable)
            </Btn>
          </div>
          <div style={{ fontSize: 11, color: B.textMuted, textAlign: "center", marginTop: 8 }}>
            Al cerrar, el registro queda inmutable. No se puede editar después. Retención mínima 2 años.
          </div>
        </main>
      </div>
    );
  }

  // ── STEP 4: DONE ──
  if (step === "done") {
    const score = calculateScore();
    const scoreColor = score >= 90 ? B.success : score >= 70 ? B.warning : B.danger;
    const result = score >= 90 ? "Aprobado" : score >= 70 ? "Observado" : "Reprobado";
    const failItems = allItems.filter(i => responses[i.id] === "fail");

    return (
      <div style={{ fontFamily: font, background: "#F5F4F0", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&family=DM+Serif+Display&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
        `}</style>

        <Card style={{ maxWidth: 480, width: "100%", textAlign: "center", padding: "40px 32px" }}>
          <div style={{
            width: 80, height: 80, borderRadius: "50%", margin: "0 auto 16px",
            background: `${scoreColor}15`, border: `3px solid ${scoreColor}`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontSize: 28, fontWeight: 900, color: scoreColor }}>{score}</span>
          </div>

          <div style={{ fontSize: 22, fontWeight: 800, color: B.text, marginBottom: 4 }}>Auditoría cerrada</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: scoreColor, marginBottom: 8 }}>{result}</div>
          <div style={{ fontSize: 13, color: B.textMuted, marginBottom: 20 }}>
            {selectedLocation?.name} · {new Date().toLocaleDateString("es-CL")}
            <br />Registro inmutable · ID: AG-013
          </div>

          {failItems.length > 0 && (
            <div style={{ background: B.warningBg, borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 13, color: B.text }}>
              <span style={{ fontWeight: 700 }}>{failItems.length} acciones correctivas</span> creadas y asignadas.
            </div>
          )}

          <div style={{ display: "flex", gap: 8 }}>
            <Btn style={{ flex: 1 }}>📄 Exportar PDF</Btn>
            <Btn variant="primary" onClick={() => { setStep("select"); setResponses({}); setNotes({}); setPhotos({}); setCurrentCategory(0); }}
              style={{ flex: 1 }}>Nueva auditoría</Btn>
          </div>
        </Card>
      </div>
    );
  }

  return null;
}
