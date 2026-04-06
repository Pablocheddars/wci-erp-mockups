import { useState, useEffect, Fragment } from "react";

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
  const styles = { primary: { background: B.accent, color: B.primary, border: "none", fontWeight: 700 }, danger: { background: B.dangerBg, color: B.danger, border: `1px solid ${B.danger}30`, fontWeight: 600 }, default: { background: B.surface, color: B.text, border: `1px solid ${B.border}`, fontWeight: 600 }, ghost: { background: "transparent", color: B.textMuted, border: "none", fontWeight: 600 }, success: { background: B.successBg, color: B.success, border: `1px solid ${B.success}30`, fontWeight: 600 } };
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