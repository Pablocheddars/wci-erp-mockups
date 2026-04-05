import { useState, useEffect } from "react";

const B = {
  primary: "#1A1A1A", accent: "#F5C518", surface: "#FFFFFF", surfaceHover: "#F8F8F6", border: "#E8E6E1",
  text: "#1A1A1A", textMuted: "#7A7770",
  info: "#2E86DE", infoBg: "#2E86DE12",
};
const font = "'DM Sans', system-ui, sans-serif";
const serif = "'DM Serif Display', Georgia, serif";

function Card({ children, style: sx = {} }) {
  return <div style={{ background: B.surface, border: `1px solid ${B.border}`, borderRadius: 12, padding: "16px 20px", ...sx }}>{children}</div>;
}

export default function ActivoFijoModule() {
  const [tab, setTab] = useState("equipos");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function check() { setIsMobile(window.innerWidth < 900); }
    check(); window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const TABS = [
    { id: "equipos", label: "Equipos" },
    { id: "asignacion", label: "Asignación" },
    { id: "mantenciones", label: "Mantenciones" },
    { id: "reportes", label: "Reportes" },
  ];

  return (
    <div style={{ fontFamily: font, background: "#F5F4F0", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,500;0,9..40,700;0,9..40,800&family=DM+Serif+Display&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>
      <header style={{ background: B.surface, borderBottom: `1px solid ${B.border}`, position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ padding: "0 24px", height: 52, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, background: B.accent, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 16, color: B.primary, fontFamily: serif }}>C</div>
          <div style={{ lineHeight: 1.1 }}><div style={{ fontFamily: serif, fontSize: 14, fontWeight: 700 }}>Cheddar&apos;s</div><div style={{ fontSize: 9, color: B.textMuted, fontWeight: 500, letterSpacing: 1.5, textTransform: "uppercase" }}>West Coast</div></div>
        </div>
      </header>
      <main style={{ padding: isMobile ? 16 : "20px 32px", maxWidth: 1320, margin: "0 auto" }}>
        <h1 style={{ fontSize: isMobile ? 20 : 24, fontWeight: 800, fontFamily: serif, marginBottom: 8 }}>🏗️ Activo fijo</h1>
        <p style={{ fontSize: 13, color: B.textMuted, marginBottom: 16 }}>Maqueta placeholder — registro de equipos, asignación por local/responsable, mantenciones y reportes (feedback Gte. Operaciones).</p>
        <div style={{ display: "flex", gap: 2, borderBottom: `1px solid ${B.border}`, marginBottom: 20, overflowX: "auto" }}>
          {TABS.map(t => (
            <button key={t.id} type="button" onClick={() => setTab(t.id)} style={{
              padding: "10px 14px", border: "none", background: "transparent", fontSize: 13,
              fontWeight: tab === t.id ? 650 : 500, color: tab === t.id ? B.text : B.textMuted,
              borderBottom: tab === t.id ? `2px solid ${B.accent}` : "2px solid transparent",
              cursor: "pointer", fontFamily: font, whiteSpace: "nowrap",
            }}>{t.label}</button>
          ))}
        </div>
        <Card style={{ background: B.infoBg, border: `1px solid ${B.info}20` }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>Pestaña: {TABS.find(x => x.id === tab)?.label}</div>
          <div style={{ fontSize: 13, color: B.textMuted }}>Contenido mock pendiente de detalle operativo. Ver índice WCI para alcance y preguntas de validación.</div>
        </Card>
      </main>
    </div>
  );
}
