import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { useState } from "react";

import AppIndex from "./modules/wci_app_index";
import Inventario from "./modules/wci_inventario";
import Compras from "./modules/wci_compras";
import Pedidos from "./modules/wci_pedidos";
import Catalogo from "./modules/wci_catalogo";
import Despacho from "./modules/wci_despacho";
import Produccion from "./modules/wci_produccion";
import Facturacion from "./modules/wci_facturacion";
import Recetas from "./modules/wci_recetas";
import Calidad from "./modules/wci_calidad";
import AuditoriaFlow from "./modules/wci_auditoria_flow";
import PlantillaEditor from "./modules/wci_plantilla_editor";
import Experiencia from "./modules/wci_experiencia";
import Finanzas from "./modules/wci_finanzas";
import Comisiones from "./modules/wci_comisiones_v2";
import CxpCxc from "./modules/wci_cxp_cxc";
import Rrhh from "./modules/wci_rrhh";
import Roles from "./modules/wci_roles";
import ActivoFijo from "./modules/wci_activo_fijo";
import Comercial from "./modules/wci_comercial";

const MODULES = [
  { path: "/inventario", name: "Inventario", icon: "📦", component: Inventario },
  { path: "/compras", name: "Compras", icon: "🧾", component: Compras },
  { path: "/pedidos", name: "Pedidos", icon: "📋", component: Pedidos },
  { path: "/catalogo", name: "Catálogo", icon: "🏷️", component: Catalogo },
  { path: "/despacho", name: "Despacho", icon: "🚛", component: Despacho },
  { path: "/produccion", name: "Producción", icon: "👩‍🍳", component: Produccion },
  { path: "/facturacion", name: "Facturación", icon: "📄", component: Facturacion },
  { path: "/recetas", name: "Recetas", icon: "📖", component: Recetas },
  { path: "/calidad", name: "Calidad", icon: "✅", component: Calidad },
  { path: "/auditoria", name: "Auditoría", icon: "🔍", component: AuditoriaFlow },
  { path: "/plantillas", name: "Plantillas", icon: "⚙️", component: PlantillaEditor },
  { path: "/experiencia", name: "Experiencia", icon: "⭐", component: Experiencia },
  { path: "/finanzas", name: "Finanzas", icon: "💰", component: Finanzas },
  { path: "/comisiones", name: "Comisiones", icon: "📊", component: Comisiones },
  { path: "/cxp-cxc", name: "CxP / CxC", icon: "💸", component: CxpCxc },
  { path: "/rrhh", name: "RRHH", icon: "👥", component: Rrhh },
  { path: "/roles", name: "Roles", icon: "🔐", component: Roles },
  { path: "/activo-fijo", name: "Activo fijo", icon: "🏗️", component: ActivoFijo },
  { path: "/comercial", name: "Comercial", icon: "🤝", component: Comercial },
];

function FloatingNav() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  if (location.pathname === "/") return null;

  return (
    <>
      <Link to="/" style={{
        position: "fixed", bottom: 20, left: 20, zIndex: 9999,
        width: 48, height: 48, borderRadius: 12,
        background: "#1A1A1A", color: "#F5C518",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 22, textDecoration: "none",
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
      }}>🏠</Link>

      <button onClick={() => setOpen(!open)} style={{
        position: "fixed", bottom: 20, right: 20, zIndex: 9999,
        width: 48, height: 48, borderRadius: 12,
        background: "#1A1A1A", color: "#F5C518",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 20, border: "none", cursor: "pointer",
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
      }}>{open ? "✕" : "☰"}</button>

      {open && (
        <div style={{
          position: "fixed", bottom: 78, right: 20, zIndex: 9998,
          background: "#fff", borderRadius: 16, padding: "12px",
          boxShadow: "0 8px 40px rgba(0,0,0,0.2)",
          maxHeight: "70vh", overflowY: "auto", width: 240,
          fontFamily: "'DM Sans', system-ui, sans-serif",
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#7A7770", padding: "4px 8px", marginBottom: 4 }}>MÓDULOS</div>
          {MODULES.map(m => {
            const isActive = location.pathname === m.path;
            return (
              <Link key={m.path} to={m.path} onClick={() => setOpen(false)} style={{
                display: "flex", alignItems: "center", gap: 8, padding: "8px 10px",
                borderRadius: 8, textDecoration: "none", color: "#1A1A1A",
                background: isActive ? "#F5C51820" : "transparent",
                fontWeight: isActive ? 700 : 500, fontSize: 13,
              }}>
                <span style={{ fontSize: 16 }}>{m.icon}</span>
                {m.name}
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <FloatingNav />
      <Routes>
        <Route path="/" element={<AppIndex />} />
        {MODULES.map(m => (
          <Route key={m.path} path={m.path} element={<m.component />} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}
