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
  const styles = { primary: { background: B.accent, color: B.primary, border: "none", fontWeight: 700 }, danger: { background: B.dangerBg, color: B.danger, border: `1px solid ${B.danger}30`, fontWeight: 600 }, default: { background: B.surface, color: B.text, border: `1px solid ${B.border}`, fontWeight: 600 }, ghost: { background: "transparent", color: B.textMuted, border: "none", fontWeight: 600 } };
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
function SearchInput({ value, onChange, placeholder }) {
  return <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={{ padding: "8px 12px", border: `1px solid ${B.border}`, borderRadius: 8, fontSize: 13, fontFamily: font, outline: "none", width: "100%", maxWidth: 280, background: B.surface }} onFocus={e => e.target.style.borderColor = B.accent} onBlur={e => e.target.style.borderColor = B.border} />;
}
function Select({ value, onChange, options, style: sx = {} }) {
  return <select value={value} onChange={e => onChange(e.target.value)} style={{ padding: "8px 12px", border: `1px solid ${B.border}`, borderRadius: 8, fontSize: 13, fontFamily: font, background: B.surface, outline: "none", cursor: "pointer", ...sx }}>{options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select>;
}

const SII_STATUS = {
  accepted: { label: "Aceptada SII", color: B.success, bg: B.successBg },
  pending: { label: "Pendiente SII", color: B.warning, bg: B.warningBg },
  rejected: { label: "Rechazada SII", color: B.danger, bg: B.dangerBg },
};

const INVOICES = [
  { id: 1, folio: "F-1042", type: "Factura", client: "Cheddar's Angol", rut: "77.123.456-7", date: "05/04", dispatch: "RUTA-024", order: "PED-089", items: 12, subtotal: 323529, tax: 61471, total: 385000, sii: "accepted", pdf: true },
  { id: 2, folio: "F-1041", type: "Factura", client: "Dark Kitchen (Alley Burger)", rut: "78.456.789-0", date: "05/04", dispatch: "RUTA-024", order: "PED-087", items: 6, subtotal: 151261, tax: 28739, total: 180000, sii: "pending", pdf: true },
  { id: 3, folio: "F-1040", type: "Factura", client: "Dark Kitchen (La Wera)", rut: "79.789.012-3", date: "05/04", dispatch: "RUTA-024", order: "PED-086", items: 4, subtotal: 79832, tax: 15168, total: 95000, sii: "accepted", pdf: true },
  { id: 4, folio: "F-1039", type: "Factura", client: "Cheddar's Barros Arana", rut: "77.234.567-8", date: "05/04", dispatch: "RUTA-024", order: "PED-085", items: 10, subtotal: 260504, tax: 49496, total: 310000, sii: "accepted", pdf: true },
  { id: 5, folio: "F-1038", type: "Factura", client: "Cheddar's Angol", rut: "77.123.456-7", date: "03/04", dispatch: "RUTA-023", order: "PED-084", items: 14, subtotal: 352941, tax: 67059, total: 420000, sii: "accepted", pdf: true },
  { id: 6, folio: "F-1037", type: "Factura", client: "Cheddar's Collao", rut: "77.345.678-9", date: "03/04", dispatch: "RUTA-023", order: "PED-083", items: 9, subtotal: 205882, tax: 39118, total: 245000, sii: "accepted", pdf: true },
];

const CREDIT_NOTES = [
  { id: 1, folio: "NC-015", refInvoice: "F-1035", client: "Cheddar's Collao", date: "03/04", reason: "Reclamo post-entrega: pollo mal estado 3kg", total: 13680, sii: "accepted" },
  { id: 2, folio: "NC-014", refInvoice: "F-1030", client: "Dark Kitchen", date: "28/03", reason: "Recepción parcial: faltaron 2kg queso", total: 14950, sii: "accepted" },
];

const LEGAL_ENTITIES = [
  { name: "Cheddars Angol Spa", rut: "77.123.456-7", giro: "Restaurantes", address: "O'Higgins 123, Angol", ingefactura: true },
  { name: "Brooklyn Spa", rut: "77.234.567-8", giro: "Restaurantes", address: "Barros Arana 456, Concepción", ingefactura: true },
  { name: "Venore Spa", rut: "77.345.678-9", giro: "Restaurantes", address: "Collao 789, Concepción", ingefactura: true },
  { name: "Comercial Gastronómica Spa", rut: "78.456.789-0", giro: "Comida rápida", address: "Los Ángeles 321", ingefactura: true },
  { name: "Comida Mexicana Al Paso E.I.R.L.", rut: "79.789.012-3", giro: "Comida rápida", address: "Los Ángeles 321", ingefactura: false },
];

// ══════════════════════════════════════════════════════
// P1+P2: FACTURAS EMITIDAS
// ══════════════════════════════════════════════════════
function FacturasView() {
  const [search, setSearch] = useState("");
  const [siiFilter, setSiiFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  let items = [...INVOICES];
  if (siiFilter !== "all") items = items.filter(i => i.sii === siiFilter);
  if (search) items = items.filter(i => i.folio.toLowerCase().includes(search.toLowerCase()) || i.client.toLowerCase().includes(search.toLowerCase()));

  if (selected) {
    const inv = selected;
    const sii = SII_STATUS[inv.sii];
    return (
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <Btn variant="ghost" onClick={() => setSelected(null)}>← Volver</Btn>
          <h3 style={{ fontSize: 16, fontWeight: 700 }}>{inv.folio}</h3>
          <Badge color={sii.color} bg={sii.bg}>{sii.label}</Badge>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 14 }}>
          <Card>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 16 }}>
              {[
                { label: "Cliente", value: inv.client },
                { label: "RUT", value: inv.rut },
                { label: "Fecha emisión", value: inv.date },
                { label: "Despacho", value: inv.dispatch },
                { label: "Pedido", value: inv.order },
                { label: "Items", value: inv.items },
              ].map(f => (
                <div key={f.label}>
                  <div style={{ fontSize: 11, color: B.textMuted }}>{f.label}</div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{f.value}</div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: `1px solid ${B.border}`, paddingTop: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}>
                <span style={{ color: B.textMuted }}>Subtotal (neto)</span>
                <span>${inv.subtotal.toLocaleString()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}>
                <span style={{ color: B.textMuted }}>IVA (19%)</span>
                <span>${inv.tax.toLocaleString()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15, fontWeight: 800, paddingTop: 8, borderTop: `1px solid ${B.border}` }}>
                <span>Total</span>
                <span>${inv.total.toLocaleString()}</span>
              </div>
            </div>
          </Card>

          <div>
            <Card style={{ marginBottom: 10 }}>
              <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>Acciones</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <Btn style={{ width: "100%", justifyContent: "flex-start", display: "flex", gap: 8 }}>📄 Descargar PDF</Btn>
                <Btn style={{ width: "100%", justifyContent: "flex-start", display: "flex", gap: 8 }}>🔗 Ver pedido {inv.order}</Btn>
                <Btn style={{ width: "100%", justifyContent: "flex-start", display: "flex", gap: 8 }}>🚛 Ver despacho {inv.dispatch}</Btn>
                <Btn variant="danger" style={{ width: "100%", justifyContent: "flex-start", display: "flex", gap: 8 }}>📝 Emitir nota de crédito</Btn>
              </div>
            </Card>

            <Card>
              <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Estado SII</h4>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: sii.color }} />
                <span style={{ fontSize: 13, fontWeight: 600, color: sii.color }}>{sii.label}</span>
              </div>
              <div style={{ fontSize: 12, color: B.textMuted }}>Emitida vía Ingefactura API. DTE electrónico, sin documentos impresos.</div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  const monthTotal = INVOICES.reduce((s, i) => s + i.total, 0);
  const pendingSii = INVOICES.filter(i => i.sii === "pending").length;

  return (
    <div>
      {/* Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 16 }}>
        <Card style={{ padding: "12px 16px" }}>
          <div style={{ fontSize: 12, color: B.textMuted }}>Facturas este mes</div>
          <div style={{ fontSize: 22, fontWeight: 800 }}>{INVOICES.length}</div>
        </Card>
        <Card style={{ padding: "12px 16px" }}>
          <div style={{ fontSize: 12, color: B.textMuted }}>Total facturado</div>
          <div style={{ fontSize: 22, fontWeight: 800 }}>${(monthTotal / 1000000).toFixed(1)}M</div>
        </Card>
        <Card style={{ padding: "12px 16px" }}>
          <div style={{ fontSize: 12, color: B.textMuted }}>Pendientes SII</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: pendingSii > 0 ? B.warning : B.success }}>{pendingSii}</div>
        </Card>
        <Card style={{ padding: "12px 16px" }}>
          <div style={{ fontSize: 12, color: B.textMuted }}>NC emitidas</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: B.danger }}>{CREDIT_NOTES.length}</div>
        </Card>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 8, marginBottom: 14, alignItems: "center" }}>
        <SearchInput value={search} onChange={setSearch} placeholder="Buscar folio o cliente..." />
        <Select value={siiFilter} onChange={setSiiFilter} options={[
          { value: "all", label: "Todos los estados SII" },
          { value: "accepted", label: "✓ Aceptada" },
          { value: "pending", label: "⏳ Pendiente" },
          { value: "rejected", label: "✗ Rechazada" },
        ]} />
      </div>

      {/* Emission note */}
      <Card style={{ background: B.infoBg, border: `1px solid ${B.info}20`, marginBottom: 14 }}>
        <div style={{ fontSize: 13 }}>
          <span style={{ fontWeight: 600 }}>Emisión automática:</span>
          <span style={{ color: B.textMuted, marginLeft: 6 }}>1 factura = 1 despacho. Se genera automáticamente al iniciar ruta vía Ingefactura API. No hay documentos impresos.</span>
        </div>
      </Card>

      {/* Table */}
      <Card style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: font }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${B.border}`, background: "#FAFAF8" }}>
              {["Folio", "Cliente", "RUT", "Fecha", "Despacho", "Items", "Total", "SII", ""].map(h =>
                <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontWeight: 600, color: B.textMuted, fontSize: 11 }}>{h}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {items.map(inv => {
              const sii = SII_STATUS[inv.sii];
              return (
                <tr key={inv.id} style={{ borderBottom: `1px solid ${B.border}`, cursor: "pointer" }}
                  onMouseEnter={e => e.currentTarget.style.background = B.surfaceHover}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  onClick={() => setSelected(inv)}>
                  <td style={{ padding: "10px 12px", fontWeight: 700, color: B.info }}>{inv.folio}</td>
                  <td style={{ padding: "10px 12px", fontWeight: 600 }}>{inv.client}</td>
                  <td style={{ padding: "10px 12px", color: B.textMuted, fontSize: 12 }}>{inv.rut}</td>
                  <td style={{ padding: "10px 12px", color: B.textMuted }}>{inv.date}</td>
                  <td style={{ padding: "10px 12px" }}><Badge color={B.info} bg={B.infoBg}>{inv.dispatch}</Badge></td>
                  <td style={{ padding: "10px 12px", color: B.textMuted }}>{inv.items}</td>
                  <td style={{ padding: "10px 12px", fontWeight: 700 }}>${inv.total.toLocaleString()}</td>
                  <td style={{ padding: "10px 12px" }}><Badge color={sii.color} bg={sii.bg}>{sii.label}</Badge></td>
                  <td style={{ padding: "10px 12px" }}>{inv.pdf && <Btn variant="ghost" style={{ fontSize: 11, padding: "2px 6px" }}>📄 PDF</Btn>}</td>
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
// P3: NOTAS DE CRÉDITO
// ══════════════════════════════════════════════════════
function NotasCreditoView() {
  return (
    <div>
      <div style={{ fontSize: 13, color: B.textMuted, marginBottom: 14 }}>NC se generan por: recepción parcial, rechazo de items, o reclamo post-entrega aprobado. Siempre referencia la factura original.</div>

      <Card style={{ padding: 0, overflow: "hidden", marginBottom: 14 }}>
        <div style={{ padding: "12px 16px", borderBottom: `1px solid ${B.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontSize: 14, fontWeight: 700 }}>Notas de crédito emitidas</h3>
          <Btn variant="danger" style={{ fontSize: 12 }}>+ Emitir NC manual</Btn>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: font }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${B.border}`, background: "#FAFAF8" }}>
              {["NC Folio", "Factura ref.", "Cliente", "Fecha", "Motivo", "Total", "SII"].map(h =>
                <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontWeight: 600, color: B.textMuted, fontSize: 11 }}>{h}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {CREDIT_NOTES.map(nc => {
              const sii = SII_STATUS[nc.sii];
              return (
                <tr key={nc.id} style={{ borderBottom: `1px solid ${B.border}` }}
                  onMouseEnter={e => e.currentTarget.style.background = B.surfaceHover}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <td style={{ padding: "10px 12px", fontWeight: 700, color: B.danger }}>{nc.folio}</td>
                  <td style={{ padding: "10px 12px" }}><Badge color={B.info} bg={B.infoBg}>{nc.refInvoice}</Badge></td>
                  <td style={{ padding: "10px 12px", fontWeight: 600 }}>{nc.client}</td>
                  <td style={{ padding: "10px 12px", color: B.textMuted }}>{nc.date}</td>
                  <td style={{ padding: "10px 12px", fontSize: 12, color: B.textMuted }}>{nc.reason}</td>
                  <td style={{ padding: "10px 12px", fontWeight: 700, color: B.danger }}>-${nc.total.toLocaleString()}</td>
                  <td style={{ padding: "10px 12px" }}><Badge color={sii.color} bg={sii.bg}>{sii.label}</Badge></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>

      {/* Flow explanation */}
      <Card>
        <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>Flujo de emisión de NC</h4>
        <div style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 12, color: B.textMuted, flexWrap: "wrap" }}>
          {["Recepción parcial / Rechazo / Reclamo aprobado", "→", "Genera NC referenciando factura original", "→", "Envía a Ingefactura API", "→", "NC vinculada a factura + pedido", "→", "Ajusta CxC automáticamente"].map((step, i) => (
            <span key={i} style={{ padding: step === "→" ? 0 : "6px 10px", background: step === "→" ? "transparent" : B.surfaceHover, borderRadius: 6, fontWeight: step === "→" ? 400 : 600, color: step === "→" ? B.textLight : B.text }}>{step}</span>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// P4: VISTA LOCAL (referencia)
// ══════════════════════════════════════════════════════
function VistaLocalRef() {
  return (
    <div>
      <Card style={{ background: `${B.accent}08`, border: `1px solid ${B.accent}30`, marginBottom: 14 }}>
        <div style={{ fontSize: 13 }}>
          <span style={{ fontWeight: 700 }}>Referencia: así ve el local sus facturas de WCI.</span>
          <span style={{ color: B.textMuted, marginLeft: 6 }}>Esta vista vive en Prep (CxP del local), no en WCI. Las facturas aparecen automáticamente.</span>
        </div>
      </Card>

      <Card style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "12px 16px", borderBottom: `1px solid ${B.border}` }}>
          <h3 style={{ fontSize: 14, fontWeight: 700 }}>Facturas de WCI — Cheddar's Angol</h3>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: font }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${B.border}`, background: "#FAFAF8" }}>
              {["Folio", "Fecha", "Items", "Total", "PDF", "Estado pago"].map(h =>
                <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontWeight: 600, color: B.textMuted, fontSize: 12 }}>{h}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {[
              { folio: "F-1042", date: "05/04", items: 12, total: 385000, paid: false },
              { folio: "F-1038", date: "03/04", items: 14, total: 420000, paid: false },
              { folio: "F-1032", date: "01/04", items: 11, total: 340000, paid: true },
            ].map((inv, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${B.border}` }}>
                <td style={{ padding: "10px 14px", fontWeight: 700 }}>{inv.folio}</td>
                <td style={{ padding: "10px 14px", color: B.textMuted }}>{inv.date}</td>
                <td style={{ padding: "10px 14px", color: B.textMuted }}>{inv.items}</td>
                <td style={{ padding: "10px 14px", fontWeight: 700 }}>${inv.total.toLocaleString()}</td>
                <td style={{ padding: "10px 14px" }}><Btn variant="ghost" style={{ fontSize: 11, padding: "2px 6px" }}>📄 Descargar</Btn></td>
                <td style={{ padding: "10px 14px" }}>
                  {inv.paid ? <Badge color={B.success} bg={B.successBg}>Pagada</Badge> : <Badge color={B.warning} bg={B.warningBg}>Pendiente</Badge>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <div style={{ fontSize: 12, color: B.textMuted, marginTop: 10 }}>Estas facturas alimentan automáticamente las CxP del local sin intervención manual.</div>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// P5: CONFIGURACIÓN
// ══════════════════════════════════════════════════════
function ConfigView() {
  return (
    <div>
      {/* WCI emisor */}
      <Card style={{ marginBottom: 14 }}>
        <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>🏢 WCI como emisor</h4>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          {[
            { label: "Razón social", value: "West Coast Industries Spa" },
            { label: "RUT", value: "76.999.888-7" },
            { label: "Giro", value: "Distribución de alimentos" },
            { label: "Dirección", value: "O'Higgins 123, 3er piso, Angol" },
            { label: "Ingefactura API", value: "✓ Configurada" },
            { label: "Estado", value: "Activo" },
          ].map(f => (
            <div key={f.label}>
              <div style={{ fontSize: 11, color: B.textMuted }}>{f.label}</div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{f.value}</div>
            </div>
          ))}
        </div>
        <Btn style={{ marginTop: 10, fontSize: 12 }}>Editar datos emisor</Btn>
      </Card>

      {/* Client legal entities */}
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <h4 style={{ fontSize: 14, fontWeight: 700 }}>👥 Razones sociales de clientes (receptores)</h4>
          <div style={{ fontSize: 12, color: B.textMuted }}>La factura se emite al RUT de cada local</div>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: font }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${B.border}`, background: "#FAFAF8" }}>
              {["Razón social", "RUT", "Giro", "Dirección", "Ingefactura"].map(h =>
                <th key={h} style={{ padding: "8px 12px", textAlign: "left", fontWeight: 600, color: B.textMuted, fontSize: 11 }}>{h}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {LEGAL_ENTITIES.map((le, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${B.border}` }}
                onMouseEnter={e => e.currentTarget.style.background = B.surfaceHover}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <td style={{ padding: "8px 12px", fontWeight: 600 }}>{le.name}</td>
                <td style={{ padding: "8px 12px", color: B.textMuted }}>{le.rut}</td>
                <td style={{ padding: "8px 12px", color: B.textMuted, fontSize: 12 }}>{le.giro}</td>
                <td style={{ padding: "8px 12px", color: B.textMuted, fontSize: 12 }}>{le.address}</td>
                <td style={{ padding: "8px 12px" }}>
                  {le.ingefactura ? <Badge color={B.success} bg={B.successBg}>✓ OK</Badge> : <Badge color={B.danger} bg={B.dangerBg}>✗ Falta</Badge>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ fontSize: 12, color: B.textMuted, marginTop: 10 }}>Las legal entities se gestionan desde Configuración → Razones Sociales (ya existe en Prep).</div>
      </Card>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// MAIN
// ══════════════════════════════════════════════════════
export default function FacturacionModule() {
  const [tab, setTab] = useState("facturas");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function check() { setIsMobile(window.innerWidth < 900); }
    check(); window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const TABS = [
    { id: "facturas", label: "Facturas emitidas", icon: "📄" },
    { id: "nc", label: "Notas de crédito", icon: "📝" },
    { id: "local", label: "Vista local (ref.)", icon: "🏪" },
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
              <span key={n} style={{ padding: "6px 11px", fontSize: 13, fontWeight: n === "Más" ? 500 : 500, color: B.textMuted, borderBottom: "2px solid transparent", cursor: "pointer" }}>{n}</span>
            ))}
          </div>
        )}
      </header>

      <main style={{ padding: isMobile ? 16 : "20px 32px", maxWidth: 1320, margin: "0 auto" }}>
        <div style={{ marginBottom: 16 }}>
          <h1 style={{ fontSize: isMobile ? 20 : 24, fontWeight: 800, color: B.text, fontFamily: serif }}>📄 Facturación DTE</h1>
          <p style={{ fontSize: 13, color: B.textMuted, marginTop: 2 }}>{INVOICES.length} facturas emitidas · {CREDIT_NOTES.length} NC · Integración Ingefactura</p>
        </div>

        <TabBar tabs={TABS} active={tab} onChange={setTab} />

        {tab === "facturas" && <FacturasView />}
        {tab === "nc" && <NotasCreditoView />}
        {tab === "local" && <VistaLocalRef />}
        {tab === "config" && <ConfigView />}
      </main>
    </div>
  );
}
