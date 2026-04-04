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
function Card({ children, style: sx = {} }) {
  return <div style={{ background: B.surface, border: `1px solid ${B.border}`, borderRadius: 12, padding: "16px 20px", ...sx }}>{children}</div>;
}

const RESPONSE_TYPES = [
  { value: "boolean", label: "Cumple / No cumple", icon: "✓✗" },
  { value: "numeric", label: "Valor numérico", icon: "123" },
  { value: "photo", label: "Solo foto", icon: "📷" },
  { value: "text", label: "Texto libre", icon: "📝" },
];

const INITIAL_CATEGORIES = [
  {
    id: "cat-1", name: "Higiene personal", weight: 25, expanded: true,
    items: [
      { id: "i-1", desc: "Uniforme completo y limpio (cofia, delantal, zapatos cerrados)", responseType: "boolean", weight: 8, photoOnFail: true },
      { id: "i-2", desc: "Manos lavadas y uñas cortas, sin esmalte ni joyas", responseType: "boolean", weight: 8, photoOnFail: true },
      { id: "i-3", desc: "Uso correcto de guantes al manipular alimentos listos", responseType: "boolean", weight: 5, photoOnFail: false },
      { id: "i-4", desc: "Cabello recogido y cubierto", responseType: "boolean", weight: 4, photoOnFail: false },
    ]
  },
  {
    id: "cat-2", name: "Superficies y equipos", weight: 30, expanded: false,
    items: [
      { id: "i-5", desc: "Mesones de trabajo limpios y sanitizados", responseType: "boolean", weight: 8, photoOnFail: true },
      { id: "i-6", desc: "Tablas de corte en buen estado, sin grietas", responseType: "boolean", weight: 7, photoOnFail: true },
      { id: "i-7", desc: "Equipos de cocción limpios (plancha, freidora, horno)", responseType: "boolean", weight: 8, photoOnFail: true },
      { id: "i-8", desc: "Campana extractora limpia y funcionando", responseType: "boolean", weight: 4, photoOnFail: false },
      { id: "i-9", desc: "Lavaplatos limpio, sin acumulación de vajilla", responseType: "boolean", weight: 3, photoOnFail: false },
    ]
  },
  {
    id: "cat-3", name: "Almacenamiento", weight: 25, expanded: false,
    items: [
      { id: "i-10", desc: "Alimentos tapados y rotulados con fecha", responseType: "boolean", weight: 8, photoOnFail: true },
      { id: "i-11", desc: "Separación correcta: crudos abajo, cocidos arriba", responseType: "boolean", weight: 7, photoOnFail: true },
      { id: "i-12", desc: "Temperatura cámara frío (-2°C a 2°C)", responseType: "numeric", weight: 6, photoOnFail: false, min: -5, max: 2, unit: "°C" },
      { id: "i-13", desc: "FIFO respetado en refrigerador y bodega", responseType: "boolean", weight: 4, photoOnFail: false },
    ]
  },
  {
    id: "cat-4", name: "Limpieza general", weight: 20, expanded: false,
    items: [
      { id: "i-14", desc: "Pisos limpios y secos (sin riesgo de caída)", responseType: "boolean", weight: 5, photoOnFail: true },
      { id: "i-15", desc: "Basureros con tapa, bolsa y no rebalsados", responseType: "boolean", weight: 5, photoOnFail: false },
      { id: "i-16", desc: "Lavamanos con jabón, alcohol gel y toallas descartables", responseType: "boolean", weight: 5, photoOnFail: true },
      { id: "i-17", desc: "Zona de lavado limpia y ordenada", responseType: "boolean", weight: 3, photoOnFail: false },
      { id: "i-18", desc: "Sin presencia de plagas o evidencia de plagas", responseType: "boolean", weight: 2, photoOnFail: true },
    ]
  },
];

export default function PlantillaEditor() {
  const [templateName, setTemplateName] = useState("Autocontrol cocina — estándar");
  const [space, setSpace] = useState("Cocina");
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [editingItem, setEditingItem] = useState(null);
  const [addingTo, setAddingTo] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function check() { setIsMobile(window.innerWidth < 900); }
    check(); window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const totalWeight = categories.reduce((s, c) => s + c.weight, 0);
  const totalItems = categories.reduce((s, c) => s + c.items.length, 0);

  const toggleCategory = (catId) => {
    setCategories(prev => prev.map(c => c.id === catId ? { ...c, expanded: !c.expanded } : c));
  };

  const removeItem = (catId, itemId) => {
    setCategories(prev => prev.map(c => c.id === catId ? { ...c, items: c.items.filter(i => i.id !== itemId) } : c));
  };

  const moveItem = (catId, itemId, dir) => {
    setCategories(prev => prev.map(c => {
      if (c.id !== catId) return c;
      const idx = c.items.findIndex(i => i.id === itemId);
      if ((dir === -1 && idx === 0) || (dir === 1 && idx === c.items.length - 1)) return c;
      const newItems = [...c.items];
      [newItems[idx], newItems[idx + dir]] = [newItems[idx + dir], newItems[idx]];
      return { ...c, items: newItems };
    }));
  };

  return (
    <div style={{ fontFamily: font, background: "#F5F4F0", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&family=DM+Serif+Display&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input:focus, select:focus, textarea:focus { outline: none; border-color: ${B.accent} !important; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: #d4d2cd; border-radius: 3px; }
      `}</style>

      {/* Header */}
      <header style={{ background: B.surface, borderBottom: `1px solid ${B.border}`, position: "sticky", top: 0, zIndex: 100, padding: "0 24px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Btn variant="ghost" style={{ padding: "4px 8px", fontSize: 16 }}>←</Btn>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700 }}>Editar plantilla</div>
            <div style={{ fontSize: 11, color: B.textMuted }}>v3 · {totalItems} items · Peso total: {totalWeight}%</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Btn variant="ghost">Vista previa</Btn>
          <Btn variant="ghost">Descartar</Btn>
          <Btn variant="primary">Guardar plantilla</Btn>
        </div>
      </header>

      <main style={{ padding: isMobile ? 16 : "20px 32px", maxWidth: 960, margin: "0 auto" }}>

        {/* Template metadata */}
        <Card style={{ marginBottom: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 14 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: B.textMuted, display: "block", marginBottom: 4 }}>Nombre de la plantilla</label>
              <input value={templateName} onChange={e => setTemplateName(e.target.value)} style={{
                width: "100%", padding: "8px 12px", border: `1px solid ${B.border}`, borderRadius: 8,
                fontSize: 14, fontWeight: 600, fontFamily: font,
              }} />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: B.textMuted, display: "block", marginBottom: 4 }}>Espacio</label>
              <select value={space} onChange={e => setSpace(e.target.value)} style={{
                width: "100%", padding: "8px 12px", border: `1px solid ${B.border}`, borderRadius: 8,
                fontSize: 13, fontFamily: font, background: B.surface,
              }}>
                {["Cocina", "Bodega", "Salón", "Baños", "Producción"].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: B.textMuted, display: "block", marginBottom: 4 }}>Estado</label>
              <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                <Badge color={B.success} bg={B.successBg}>Activa</Badge>
                <Badge>v3</Badge>
              </div>
            </div>
          </div>
        </Card>

        {/* Weight validation */}
        {totalWeight !== 100 && (
          <Card style={{ background: B.dangerBg, border: `1px solid ${B.danger}20`, marginBottom: 14 }}>
            <div style={{ fontSize: 13, color: B.danger, fontWeight: 600 }}>
              ⚠️ El peso total de las categorías es {totalWeight}% — debe sumar 100%.
            </div>
          </Card>
        )}

        {/* Categories */}
        {categories.map((cat, ci) => (
          <div key={cat.id} style={{ marginBottom: 12 }}>
            {/* Category header */}
            <div
              onClick={() => toggleCategory(cat.id)}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "12px 16px", background: B.surface, border: `1px solid ${B.border}`,
                borderRadius: cat.expanded ? "12px 12px 0 0" : 12, cursor: "pointer",
                transition: "background 0.1s",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 12, color: B.textLight, transition: "transform 0.2s", transform: cat.expanded ? "rotate(90deg)" : "rotate(0)" }}>▶</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: B.text }}>{cat.name}</span>
                <Badge>{cat.items.length} items</Badge>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }} onClick={e => e.stopPropagation()}>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <label style={{ fontSize: 11, color: B.textMuted }}>Peso:</label>
                  <input type="number" value={cat.weight} onChange={e => {
                    const val = parseInt(e.target.value) || 0;
                    setCategories(prev => prev.map(c => c.id === cat.id ? { ...c, weight: val } : c));
                  }} style={{
                    width: 50, padding: "4px 6px", border: `1px solid ${B.border}`, borderRadius: 4,
                    fontSize: 13, fontWeight: 700, fontFamily: font, textAlign: "center",
                  }} />
                  <span style={{ fontSize: 11, color: B.textMuted }}>%</span>
                </div>
                <Btn variant="ghost" style={{ color: B.danger, padding: "2px 6px", fontSize: 14 }}
                  onClick={() => setCategories(prev => prev.filter(c => c.id !== cat.id))}>🗑</Btn>
              </div>
            </div>

            {/* Category items */}
            {cat.expanded && (
              <div style={{ border: `1px solid ${B.border}`, borderTop: "none", borderRadius: "0 0 12px 12px", overflow: "hidden" }}>
                {cat.items.map((item, ii) => (
                  <div key={item.id} style={{
                    display: "flex", alignItems: "flex-start", gap: 10, padding: "12px 16px",
                    borderBottom: ii < cat.items.length - 1 ? `1px solid ${B.border}` : "none",
                    background: editingItem === item.id ? `${B.accent}06` : "transparent",
                  }}>
                    {/* Drag handle + order */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "center", flexShrink: 0, paddingTop: 2 }}>
                      <button onClick={() => moveItem(cat.id, item.id, -1)} style={{ border: "none", background: "transparent", cursor: "pointer", fontSize: 10, color: B.textLight, padding: 0, lineHeight: 1 }}>▲</button>
                      <span style={{ fontSize: 11, color: B.textLight, fontWeight: 600 }}>{ii + 1}</span>
                      <button onClick={() => moveItem(cat.id, item.id, 1)} style={{ border: "none", background: "transparent", cursor: "pointer", fontSize: 10, color: B.textLight, padding: 0, lineHeight: 1 }}>▼</button>
                    </div>

                    {/* Item content */}
                    <div style={{ flex: 1 }}>
                      {editingItem === item.id ? (
                        /* Edit mode */
                        <div>
                          <textarea defaultValue={item.desc} style={{
                            width: "100%", padding: "8px 10px", border: `1px solid ${B.accent}`,
                            borderRadius: 8, fontSize: 13, fontFamily: font, minHeight: 50, resize: "vertical", marginBottom: 8,
                          }} />
                          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                            <div>
                              <label style={{ fontSize: 10, color: B.textMuted }}>Tipo respuesta</label>
                              <select defaultValue={item.responseType} style={{ display: "block", padding: "5px 8px", border: `1px solid ${B.border}`, borderRadius: 6, fontSize: 12, fontFamily: font }}>
                                {RESPONSE_TYPES.map(r => <option key={r.value} value={r.value}>{r.icon} {r.label}</option>)}
                              </select>
                            </div>
                            <div>
                              <label style={{ fontSize: 10, color: B.textMuted }}>Peso</label>
                              <input type="number" defaultValue={item.weight} style={{ display: "block", width: 50, padding: "5px 8px", border: `1px solid ${B.border}`, borderRadius: 6, fontSize: 12, fontFamily: font, textAlign: "center" }} />
                            </div>
                            {item.responseType === "numeric" && (
                              <>
                                <div>
                                  <label style={{ fontSize: 10, color: B.textMuted }}>Mín</label>
                                  <input type="number" defaultValue={item.min} style={{ display: "block", width: 50, padding: "5px 8px", border: `1px solid ${B.border}`, borderRadius: 6, fontSize: 12, fontFamily: font, textAlign: "center" }} />
                                </div>
                                <div>
                                  <label style={{ fontSize: 10, color: B.textMuted }}>Máx</label>
                                  <input type="number" defaultValue={item.max} style={{ display: "block", width: 50, padding: "5px 8px", border: `1px solid ${B.border}`, borderRadius: 6, fontSize: 12, fontFamily: font, textAlign: "center" }} />
                                </div>
                                <div>
                                  <label style={{ fontSize: 10, color: B.textMuted }}>Unidad</label>
                                  <input type="text" defaultValue={item.unit} style={{ display: "block", width: 40, padding: "5px 8px", border: `1px solid ${B.border}`, borderRadius: 6, fontSize: 12, fontFamily: font, textAlign: "center" }} />
                                </div>
                              </>
                            )}
                            <div style={{ marginTop: 12 }}>
                              <label style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, cursor: "pointer" }}>
                                <input type="checkbox" defaultChecked={item.photoOnFail} />
                                Foto obligatoria en "no cumple"
                              </label>
                            </div>
                          </div>
                          <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                            <Btn variant="primary" onClick={() => setEditingItem(null)} style={{ fontSize: 12, padding: "5px 12px" }}>Guardar</Btn>
                            <Btn variant="ghost" onClick={() => setEditingItem(null)} style={{ fontSize: 12, padding: "5px 12px" }}>Cancelar</Btn>
                          </div>
                        </div>
                      ) : (
                        /* View mode */
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 500, color: B.text, lineHeight: 1.4 }}>{item.desc}</div>
                          <div style={{ display: "flex", gap: 6, marginTop: 4, flexWrap: "wrap" }}>
                            <Badge color={B.info} bg={B.infoBg}>
                              {RESPONSE_TYPES.find(r => r.value === item.responseType)?.icon} {RESPONSE_TYPES.find(r => r.value === item.responseType)?.label}
                            </Badge>
                            <Badge>Peso: {item.weight}</Badge>
                            {item.photoOnFail && <Badge color={B.warning} bg={B.warningBg}>📷 Foto si falla</Badge>}
                            {item.responseType === "numeric" && <Badge color={B.purple} bg={B.purpleBg}>Rango: {item.min} — {item.max} {item.unit}</Badge>}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    {editingItem !== item.id && (
                      <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
                        <button onClick={() => setEditingItem(item.id)} style={{ border: "none", background: "transparent", cursor: "pointer", fontSize: 14, padding: 4, color: B.textMuted }} title="Editar">✏️</button>
                        <button onClick={() => removeItem(cat.id, item.id)} style={{ border: "none", background: "transparent", cursor: "pointer", fontSize: 14, padding: 4, color: B.danger }} title="Eliminar">🗑</button>
                      </div>
                    )}
                  </div>
                ))}

                {/* Add item */}
                {addingTo === cat.id ? (
                  <div style={{ padding: "12px 16px", background: `${B.accent}06`, borderTop: `1px solid ${B.border}` }}>
                    <textarea placeholder="Descripción del nuevo item..." autoFocus style={{
                      width: "100%", padding: "8px 10px", border: `1px solid ${B.accent}`,
                      borderRadius: 8, fontSize: 13, fontFamily: font, minHeight: 50, resize: "vertical", marginBottom: 8,
                    }} />
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <select style={{ padding: "5px 8px", border: `1px solid ${B.border}`, borderRadius: 6, fontSize: 12, fontFamily: font }}>
                        {RESPONSE_TYPES.map(r => <option key={r.value} value={r.value}>{r.icon} {r.label}</option>)}
                      </select>
                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <label style={{ fontSize: 11, color: B.textMuted }}>Peso:</label>
                        <input type="number" defaultValue={5} style={{ width: 45, padding: "5px 6px", border: `1px solid ${B.border}`, borderRadius: 6, fontSize: 12, fontFamily: font, textAlign: "center" }} />
                      </div>
                      <label style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, cursor: "pointer" }}>
                        <input type="checkbox" defaultChecked />
                        📷 Foto si falla
                      </label>
                      <div style={{ flex: 1 }} />
                      <Btn variant="primary" onClick={() => setAddingTo(null)} style={{ fontSize: 12, padding: "5px 12px" }}>Agregar</Btn>
                      <Btn variant="ghost" onClick={() => setAddingTo(null)} style={{ fontSize: 12, padding: "5px 12px" }}>Cancelar</Btn>
                    </div>
                  </div>
                ) : (
                  <button onClick={() => setAddingTo(cat.id)} style={{
                    width: "100%", padding: "10px 16px", border: "none", borderTop: `1px solid ${B.border}`,
                    background: "transparent", cursor: "pointer", fontFamily: font,
                    fontSize: 13, color: B.accent, fontWeight: 600, textAlign: "left",
                    transition: "background 0.1s",
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = B.surfaceHover}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                    + Agregar item a {cat.name}
                  </button>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Add category */}
        <Card style={{ border: `2px dashed ${B.border}`, textAlign: "center", padding: 14, marginBottom: 20, cursor: "pointer" }}
          onClick={() => {
            const newId = `cat-${Date.now()}`;
            setCategories(prev => [...prev, { id: newId, name: "Nueva categoría", weight: 0, expanded: true, items: [] }]);
          }}>
          <span style={{ fontSize: 13, color: B.accent, fontWeight: 700 }}>+ Agregar categoría</span>
        </Card>

        {/* Summary footer */}
        <Card style={{ background: B.surfaceHover }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 13 }}>
              <span style={{ fontWeight: 700 }}>{categories.length} categorías</span>
              <span style={{ color: B.textMuted, margin: "0 8px" }}>·</span>
              <span style={{ fontWeight: 700 }}>{totalItems} items</span>
              <span style={{ color: B.textMuted, margin: "0 8px" }}>·</span>
              <span style={{ fontWeight: 700, color: totalWeight === 100 ? B.success : B.danger }}>Peso: {totalWeight}%</span>
              {totalWeight !== 100 && <span style={{ color: B.danger, marginLeft: 6, fontSize: 12 }}>(debe ser 100%)</span>}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <Btn variant="ghost">Vista previa</Btn>
              <Btn variant="primary" disabled={totalWeight !== 100}>Guardar plantilla</Btn>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
