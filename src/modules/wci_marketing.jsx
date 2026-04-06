import { useState, useEffect } from "react";

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

const BRANDS=[{id:"cheddars",name:"Cheddar's",unit:"Unidad Cheddar's",color:"#E74C3C",active:true,type:"propia"},{id:"buffalo",name:"Buffalo Chicken",unit:"Unidad Cheddar's",color:"#E74C3C",active:true,type:"propia"},{id:"porkshop",name:"The Pork Shop",unit:"Unidad Cheddar's",color:"#E74C3C",active:true,type:"propia"},{id:"foodpxrn",name:"Food Pxrn",unit:"Unidad Cheddar's",color:"#E74C3C",active:true,type:"propia"},{id:"tori",name:"Tori Sushi",unit:"Unidad Tori Sushi",color:"#2E86DE",active:true,type:"propia"},{id:"shibuya",name:"Shibuya Express",unit:"Unidad Tori Sushi",color:"#2E86DE",active:true,type:"propia"},{id:"kiri",name:"Kiri Pokes",unit:"Unidad Tori Sushi",color:"#2E86DE",active:true,type:"propia"},{id:"smarteats",name:"Smart Eats",unit:"Unidad Tori Sushi",color:"#2E86DE",active:true,type:"propia"},{id:"brown",name:"Brown Sweet Factory",unit:"Unidad Sweet/Burger",color:"#8E44AD",active:true,type:"propia"},{id:"fatty",name:"Fatty Patty",unit:"Unidad Sweet/Burger",color:"#8E44AD",active:true,type:"propia"},{id:"bigfat",name:"Big Fat",unit:"—",color:"#AEABA4",active:false,type:"propia"},{id:"samai",name:"Clínica Samai",unit:"—",color:"#28A745",active:true,type:"externo"}];
const activeBrands=BRANDS.filter(b=>b.active);
const TEAM=[{id:"ashly",name:"Ashly Arias",role:"Coordinadora / Planner",short:"AA",color:B.accent,tasksWeek:4,capacityWeek:6,completed:28,onTime:92,approvedFirst:88,avgRounds:1.2,campaigns:12},{id:"diego",name:"Diego Vallejo",role:"Redactor creativo",short:"DV",color:B.info,tasksWeek:7,capacityWeek:8,completed:42,onTime:85,approvedFirst:78,avgRounds:1.5,campaigns:12},{id:"josef",name:"Josef Fuenmayor",role:"Diseño gráfico",short:"JF",color:B.purple,tasksWeek:6,capacityWeek:6,completed:35,onTime:80,approvedFirst:82,avgRounds:1.3,campaigns:10},{id:"marco",name:"Marco Bahamonde",role:"Audiovisual",short:"MB",color:"#E74C3C",tasksWeek:5,capacityWeek:5,completed:22,onTime:75,approvedFirst:70,avgRounds:1.8,campaigns:8},{id:"kathya",name:"Kathya Saavedra",role:"Experiencia cliente",short:"KS",color:B.success,tasksWeek:1,capacityWeek:3,completed:8,onTime:95,approvedFirst:100,avgRounds:1.0,campaigns:11,isExperience:true}];
const NETWORKS=[{id:"ig",name:"Instagram",icon:"📸"},{id:"tiktok",name:"TikTok",icon:"🎵"}];
const CONTENT_TYPES=[{id:"reel",name:"Reel"},{id:"carrusel",name:"Carrusel"},{id:"post",name:"Post"},{id:"historia",name:"Historia"}];

const CAMPAIGNS=[{id:1,name:"Burger del Día Fatty Patty",brand:"fatty",origin:"joaquin",status:"publicada",idea:"Promocionar precios más bajos en burgers, generar engagement con conceposting",startDate:"01/04",endDate:"10/04",networks:["ig","tiktok"],pieces:6,piecesReady:6,piecesApproved:6},{id:2,name:"Lanzamiento Tori Sushi RRSS",brand:"tori",origin:"pablo",status:"en_produccion",idea:"Debut de Tori en redes, posicionar como sushi premium de Conce",startDate:"02/04",endDate:"30/04",networks:["ig","tiktok"],pieces:12,piecesReady:5,piecesApproved:3},{id:3,name:"Bingo Cheddar's Abril",brand:"cheddars",origin:"equipo",status:"en_produccion",idea:"Evento semanal domingos, generar comunidad presencial",startDate:"06/04",endDate:"27/04",networks:["ig"],pieces:8,piecesReady:2,piecesApproved:2},{id:4,name:"Martes de Amigas Cheddar's",brand:"cheddars",origin:"joaquin",status:"aprobada",idea:"Evento recurrente martes, target mujeres jóvenes, happy hour + animación",startDate:"08/04",endDate:"29/04",networks:["ig","tiktok"],pieces:8,piecesReady:0,piecesApproved:0},{id:5,name:"Puntos Fidelización Cross-Brand",brand:"cheddars",origin:"pablo",status:"propuesta",idea:"Promover programa de puntos válido en Cheddar's + Buffalo + Pork Shop",startDate:"15/04",endDate:"30/04",networks:["ig"],pieces:4,piecesReady:0,piecesApproved:0},{id:6,name:"Samai Lanzamiento Redes",brand:"samai",origin:"externo",status:"evaluada",idea:"Posicionar clínica dental en IG, presentar equipo médico",startDate:"26/01",endDate:"28/02",networks:["ig"],pieces:10,piecesReady:10,piecesApproved:10}];
const CAMPAIGN_STATUS={propuesta:{label:"Propuesta",color:B.purple,bg:B.purpleBg},aprobada:{label:"Aprobada",color:B.info,bg:B.infoBg},en_produccion:{label:"En producción",color:B.warning,bg:B.warningBg},publicada:{label:"Publicada",color:B.success,bg:B.successBg},evaluada:{label:"Evaluada",color:B.textMuted,bg:B.surfaceHover}};
const EFEMERIDES=[
  { id: 1, date: "07/04", name: "Día Mundial de la Salud", brands: ["samai"], hasCampaign: false },
  { id: 2, date: "13/04", name: "Día del Beso", brands: ["cheddars", "fatty"], hasCampaign: false },
  { id: 3, date: "22/04", name: "Día de la Tierra", brands: ["smarteats", "kiri"], hasCampaign: false },
  { id: 4, date: "01/05", name: "Día del Trabajador", brands: ["cheddars", "tori", "brown"], hasCampaign: false },
  { id: 5, date: "10/05", name: "Día de la Madre", brands: ["cheddars", "tori", "brown", "samai"], hasCampaign: false },
];

const CALENDAR_ITEMS=[{id:1,date:"07/04",brand:"cheddars",network:"ig",type:"reel",title:"Bingo recap domingo",assignedTo:"marco",status:"en_progreso",campaign:3},{id:2,date:"07/04",brand:"tori",network:"ig",type:"carrusel",title:"Tartar Roll producto",assignedTo:"josef",status:"aprobada",campaign:2},{id:3,date:"07/04",brand:"tori",network:"tiktok",type:"reel",title:"Preparación sushi POV",assignedTo:"marco",status:"en_progreso",campaign:2},{id:4,date:"08/04",brand:"cheddars",network:"ig",type:"carrusel",title:"Martes de Amigas anuncio",assignedTo:"josef",status:"pendiente",campaign:4},{id:5,date:"08/04",brand:"cheddars",network:"tiktok",type:"reel",title:"Martes de Amigas video",assignedTo:"marco",status:"pendiente",campaign:4},{id:6,date:"08/04",brand:"fatty",network:"ig",type:"post",title:"Burger del Día martes",assignedTo:"diego",status:"aprobada",campaign:1},{id:7,date:"09/04",brand:"tori",network:"ig",type:"post",title:"Curiosidad sushi miércoles",assignedTo:"diego",status:"pendiente",campaign:2},{id:8,date:"09/04",brand:"samai",network:"ig",type:"carrusel",title:"Dra. Daniela perfil",assignedTo:"josef",status:"en_revision",campaign:6},{id:9,date:"10/04",brand:"cheddars",network:"ig",type:"post",title:"Happy hour jueves",assignedTo:"diego",status:"pendiente",campaign:3},{id:10,date:"10/04",brand:"buffalo",network:"ig",type:"carrusel",title:"Wings 12u promo",assignedTo:"josef",status:"pendiente",campaign:null},{id:11,date:"11/04",brand:"tori",network:"ig",type:"carrusel",title:"Roll California viernes",assignedTo:"josef",status:"pendiente",campaign:2},{id:12,date:"11/04",brand:"cheddars",network:"tiktok",type:"reel",title:"Stand up recap",assignedTo:"marco",status:"pendiente",campaign:null},{id:20,date:"01/04",brand:"cheddars",network:"ig",type:"post",title:"Abril llegó a Cheddar's",assignedTo:"diego",status:"publicada",campaign:null},{id:21,date:"02/04",brand:"fatty",network:"ig",type:"carrusel",title:"Burger del Día lanzamiento",assignedTo:"josef",status:"publicada",campaign:1},{id:22,date:"03/04",brand:"tori",network:"ig",type:"historia",title:"Coming soon Tori Sushi",assignedTo:"josef",status:"publicada",campaign:2},{id:23,date:"05/04",brand:"cheddars",network:"tiktok",type:"reel",title:"Recap stand up viernes",assignedTo:"marco",status:"publicada",campaign:null},{id:30,date:"14/04",brand:"cheddars",network:"ig",type:"carrusel",title:"Puntos fidelización explicado",assignedTo:"josef",status:"pendiente",campaign:5},{id:31,date:"15/04",brand:"tori",network:"tiktok",type:"reel",title:"Sushi challenge TikTok",assignedTo:"marco",status:"pendiente",campaign:2},{id:32,date:"16/04",brand:"buffalo",network:"ig",type:"post",title:"Wings Wednesday promo",assignedTo:"diego",status:"pendiente",campaign:null},{id:33,date:"17/04",brand:"brown",network:"ig",type:"carrusel",title:"Brownie Box nueva presentación",assignedTo:"josef",status:"pendiente",campaign:null},{id:34,date:"18/04",brand:"cheddars",network:"ig",type:"reel",title:"Recap Martes Amigas 2",assignedTo:"marco",status:"pendiente",campaign:4},{id:40,date:"21/04",brand:"tori",network:"ig",type:"carrusel",title:"Menú ejecutivo lanzamiento",assignedTo:"josef",status:"pendiente",campaign:2},{id:41,date:"22/04",brand:"smarteats",network:"ig",type:"post",title:"Día de la Tierra Smart Eats",assignedTo:"diego",status:"pendiente",campaign:null},{id:42,date:"24/04",brand:"cheddars",network:"tiktok",type:"reel",title:"Behind the scenes cocina",assignedTo:"marco",status:"pendiente",campaign:null},{id:50,date:"28/04",brand:"cheddars",network:"ig",type:"post",title:"Cierre de mes agradecimiento",assignedTo:"diego",status:"pendiente",campaign:null},{id:51,date:"29/04",brand:"tori",network:"ig",type:"carrusel",title:"Tori mayo preview",assignedTo:"josef",status:"pendiente",campaign:2},{id:52,date:"30/04",brand:"fatty",network:"tiktok",type:"reel",title:"Fatty Patty mayo teaser",assignedTo:"marco",status:"pendiente",campaign:null}];
const CAL_STATUS={pendiente:{label:"Pendiente",color:B.textMuted,bg:B.surfaceHover},en_progreso:{label:"En progreso",color:B.info,bg:B.infoBg},en_revision:{label:"En revisión",color:B.warning,bg:B.warningBg},aprobada:{label:"Aprobada",color:B.success,bg:B.successBg},publicada:{label:"Publicada",color:B.textLight,bg:B.surfaceHover}};

const TASKS = [
  {
    id: 1,
    title: "Campaña Martes de Amigas — Semana 1",
    brand: "cheddars",
    campaign: 4,
    deadline: "08/04",
    priority: "alta",
    status: "en_progreso",
    assignedTo: "josef",
    type: "Diseño",
    description: "Primera semana de la campaña Martes de Amigas. Necesitamos carrusel + reel + coordinación DJ.",
    subtasks: [
      { id: "1a", title: "Escribir caption Martes de Amigas", assignedTo: "diego", done: true, type: "Copy" },
      { id: "1b", title: "Diseño carrusel Martes Amigas", assignedTo: "josef", done: false, type: "Diseño", attachments: [] },
      { id: "1c", title: "Reel Martes de Amigas", assignedTo: "marco", done: false, type: "Video" },
      { id: "1d", title: "Coordinar DJ con local", assignedTo: "ashly", done: true, type: "Coordinación" },
    ],
    attachments: [{ name: "brief_martes_amigas.pdf", size: "1.2 MB", icon: "📄" }],
  },
  {
    id: 2,
    title: "Lanzamiento Tori Sushi — Contenido semana 2",
    brand: "tori",
    campaign: 2,
    deadline: "11/04",
    priority: "alta",
    status: "en_progreso",
    assignedTo: "marco",
    type: "Video",
    description: "Segundo batch de contenido para posicionar Tori en redes.",
    subtasks: [
      { id: "2a", title: "Caption Tartar Roll", assignedTo: "diego", done: true, type: "Copy" },
      { id: "2b", title: "Diseño carrusel Tartar Roll", assignedTo: "josef", done: true, type: "Diseño", attachments: [{ name: "tartar_roll_v2.psd", size: "12.4 MB", icon: "🖼️" }] },
      { id: "2c", title: "Edición reel sushi POV", assignedTo: "marco", done: false, type: "Video" },
      { id: "2d", title: "Caption curiosidad sushi", assignedTo: "diego", done: false, type: "Copy" },
      { id: "2e", title: "Carrusel Roll California", assignedTo: "josef", done: false, type: "Diseño" },
      { id: "2f", title: "Coordinar fotos producto en local", assignedTo: "ashly", done: false, type: "Coordinación" },
    ],
    attachments: [
      { name: "tori_brand_guidelines.pdf", size: "3.8 MB", icon: "📄" },
      { name: "fotos_producto_raw.zip", size: "45 MB", icon: "📦" },
    ],
  },
  {
    id: 3,
    title: "Bingo Cheddar's — Recap domingo",
    brand: "cheddars",
    campaign: 3,
    deadline: "07/04",
    priority: "media",
    status: "en_revision",
    assignedTo: "marco",
    type: "Video",
    description: "Recap del bingo del domingo para publicar el lunes.",
    subtasks: [
      { id: "3a", title: "Caption Bingo recap", assignedTo: "diego", done: true, type: "Copy" },
      { id: "3b", title: "Portada reel Bingo", assignedTo: "josef", done: true, type: "Diseño", attachments: [{ name: "portada_bingo_abril.png", size: "2.1 MB", icon: "🖼️" }] },
      { id: "3c", title: "Edición video Bingo recap", assignedTo: "marco", done: true, type: "Video", attachments: [{ name: "bingo_recap_final.mp4", size: "28 MB", icon: "🎬" }] },
    ],
    attachments: [],
  },
  {
    id: 4,
    title: "Carrusel Dra. Daniela — Samai",
    brand: "samai",
    campaign: 6,
    deadline: "09/04",
    priority: "media",
    status: "en_revision",
    assignedTo: "josef",
    type: "Diseño",
    description: "Presentación de la Dra. Daniela para el IG de Clínica Samai.",
    subtasks: [
      { id: "4a", title: "Caption presentación doctora", assignedTo: "diego", done: true, type: "Copy" },
      { id: "4b", title: "Diseño carrusel Dra. Daniela", assignedTo: "josef", done: true, type: "Diseño", attachments: [{ name: "daniela_carrusel_v2.psd", size: "8.5 MB", icon: "🖼️" }] },
    ],
    attachments: [{ name: "foto_dra_daniela.jpg", size: "4.2 MB", icon: "🖼️" }],
  },
  {
    id: 5,
    title: "Burger del Día Fatty Patty — Cierre",
    brand: "fatty",
    campaign: 1,
    deadline: "10/04",
    priority: "baja",
    status: "completada",
    assignedTo: "diego",
    type: "Copy",
    description: "Últimas piezas de la campaña Burger del Día.",
    subtasks: [
      { id: "5a", title: "Caption burger del día martes", assignedTo: "diego", done: true, type: "Copy" },
      { id: "5b", title: "Diseño post burger martes", assignedTo: "josef", done: true, type: "Diseño" },
      { id: "5c", title: "Edición reel conceposting", assignedTo: "marco", done: true, type: "Video" },
    ],
    attachments: [],
  },
  {
    id: 6,
    title: "Wings Wednesday — Buffalo Chicken",
    brand: "buffalo",
    campaign: null,
    deadline: "09/04",
    priority: "baja",
    status: "por_hacer",
    assignedTo: "josef",
    type: "Diseño",
    description: "Carrusel promocional de Wings 12u para el miércoles.",
    subtasks: [
      { id: "6a", title: "Caption Wings Wednesday", assignedTo: "diego", done: false, type: "Copy" },
      { id: "6b", title: "Diseño carrusel Wings promo", assignedTo: "josef", done: false, type: "Diseño" },
    ],
    attachments: [],
  },
  {
    id: 7,
    title: "Review DMs Cheddar's — Semanal",
    brand: "cheddars",
    campaign: null,
    deadline: "11/04",
    priority: "media",
    status: "en_progreso",
    assignedTo: "kathya",
    type: "Experiencia",
    description: "Revisión semanal de DMs de Cheddar's IG. Reportar feedback relevante.",
    subtasks: [
      { id: "7a", title: "Revisar DMs y clasificar", assignedTo: "kathya", done: false, type: "Experiencia" },
      { id: "7b", title: "Reportar feedback negativo al equipo", assignedTo: "kathya", done: false, type: "Experiencia" },
    ],
    attachments: [],
  },
  {
    id: 8,
    title: "Puntos Fidelización Cross-Brand",
    brand: "cheddars",
    campaign: 5,
    deadline: "14/04",
    priority: "baja",
    status: "por_hacer",
    assignedTo: "diego",
    type: "Copy",
    description: "Promover programa de puntos. Pendiente aprobación de idea en Campañas.",
    subtasks: [
      { id: "8a", title: "Caption puntos fidelización", assignedTo: "diego", done: false, type: "Copy" },
      { id: "8b", title: "Diseño carrusel explicativo", assignedTo: "josef", done: false, type: "Diseño" },
    ],
    attachments: [],
  },
];
const TASK_STATUS_ORDER=["por_hacer","en_progreso","en_revision","completada"];
const TASK_STATUS={por_hacer:{label:"Por hacer",color:B.textMuted},en_progreso:{label:"En progreso",color:B.info},en_revision:{label:"En revisión",color:B.warning},completada:{label:"Completada",color:B.success}};
const PRIORITY={alta:{label:"Alta",color:B.danger,bg:B.dangerBg},media:{label:"Media",color:B.warning,bg:B.warningBg},baja:{label:"Baja",color:B.textMuted,bg:B.surfaceHover}};

const APPROVALS=[{id:1,title:"Carrusel Tartar Roll",brand:"tori",network:"ig",type:"carrusel",date:"07/04",campaign:"Lanzamiento Tori Sushi RRSS",caption:"Tartar Roll 🥢\n\nNori frito en panko, con tartar de atún fresco, salsa Tori y cebollín.\nRelleno de palta y camarón apanado 🥑🍤\n\nPide el tuyo en www.Torisushi.cl 📞",assignedTo:"josef",submittedBy:"diego",round:1,status:"pendiente",thumbnail:{bg:"#2E86DE20",label:"Carrusel 5 slides"}},{id:2,title:"Reel sushi POV",brand:"tori",network:"tiktok",type:"reel",date:"07/04",campaign:"Lanzamiento Tori Sushi RRSS",caption:"¿Alguna vez viste cómo se prepara tu roll favorito? 👀🍣\n\nAsí nace la magia en Tori Sushi ✨\n\nPide en www.Torisushi.cl",assignedTo:"marco",submittedBy:"diego",round:1,status:"pendiente",thumbnail:{bg:"#8E44AD20",label:"Video 00:32"}},{id:3,title:"Carrusel Dra. Daniela",brand:"samai",network:"ig",type:"carrusel",date:"09/04",campaign:"Samai Lanzamiento Redes",caption:"Conozcamos a Daniela.\nEspecialista en Implantología Bucomaxilofacial 🦷\n\nEncargada de devolver función, armonía y bienestar.",assignedTo:"josef",submittedBy:"diego",round:2,status:"cambios",feedback:"Ajustar colores al branding de Samai, logo más grande en slide 1",thumbnail:{bg:"#28A74520",label:"Carrusel 4 slides"}}];
const APPROVAL_HISTORY=[{id:10,title:"Burger del Día martes",brand:"fatty",result:"aprobada",round:1,date:"05/04",approvedBy:"Joaquín"},{id:11,title:"Caption Bingo recap",brand:"cheddars",result:"aprobada",round:1,date:"04/04",approvedBy:"Pablo"},{id:12,title:"Post San Valentín Cheddar's",brand:"cheddars",result:"aprobada",round:2,date:"11/02",approvedBy:"Joaquín"},{id:13,title:"Reel Fiesta Semáforo",brand:"cheddars",result:"aprobada",round:1,date:"12/02",approvedBy:"Pablo"},{id:14,title:"Carrusel Fatty Vibes",brand:"fatty",result:"aprobada",round:1,date:"01/03",approvedBy:"Joaquín"}];

const LIBRARY=[{id:1,title:"Burger del Día Fatty Patty",brand:"fatty",network:"ig",type:"carrusel",date:"02/04",campaign:"Burger del Día Fatty Patty",bg:"#8E44AD15"},{id:2,title:"Conceposting burgers vs copucha",brand:"cheddars",network:"ig",type:"post",date:"31/03",campaign:null,bg:"#E74C3C15"},{id:3,title:"Encuesta ubicación food truck",brand:"cheddars",network:"ig",type:"post",date:"17/03",campaign:null,bg:"#E74C3C15"},{id:4,title:"Programa de puntos cross-brand",brand:"cheddars",network:"ig",type:"carrusel",date:"13/03",campaign:"Puntos Fidelización",bg:"#E74C3C15"},{id:5,title:"Bingo domingos recap",brand:"cheddars",network:"ig",type:"reel",date:"21/02",campaign:"Bingo Cheddar's",bg:"#E74C3C15"},{id:6,title:"Fiesta Semáforo San Valentín",brand:"cheddars",network:"ig",type:"reel",date:"13/02",campaign:null,bg:"#E74C3C15"},{id:7,title:"Promo 14F parejas",brand:"cheddars",network:"ig",type:"carrusel",date:"11/02",campaign:null,bg:"#E74C3C15"},{id:8,title:"Martes de Amigas invitación",brand:"cheddars",network:"ig",type:"reel",date:"17/02",campaign:"Martes de Amigas",bg:"#E74C3C15"},{id:9,title:"Presentación Dra. Daniela v1",brand:"samai",network:"ig",type:"carrusel",date:"26/01",campaign:"Samai Lanzamiento",bg:"#28A74515"},{id:10,title:"Historias destacadas Samai",brand:"samai",network:"ig",type:"historia",date:"26/01",campaign:"Samai Lanzamiento",bg:"#28A74515"},{id:11,title:"Tartar Roll lanzamiento",brand:"tori",network:"ig",type:"carrusel",date:"16/03",campaign:"Lanzamiento Tori Sushi",bg:"#2E86DE15"},{id:12,title:"Sushi POV preparación",brand:"tori",network:"tiktok",type:"reel",date:"20/03",campaign:"Lanzamiento Tori Sushi",bg:"#2E86DE15"},{id:13,title:"Wings Wednesday promo",brand:"buffalo",network:"ig",type:"post",date:"05/03",campaign:null,bg:"#E74C3C15"},{id:14,title:"Brownie Box nueva caja",brand:"brown",network:"ig",type:"carrusel",date:"28/02",campaign:null,bg:"#8E44AD15"},{id:15,title:"Fatty Smash Burger hero",brand:"fatty",network:"tiktok",type:"reel",date:"15/03",campaign:null,bg:"#8E44AD15"}];

const SOCIAL_ACCOUNTS = [
  { id: "cheddars_ig", brand: "cheddars", network: "ig", handle: "@cheddars.cl", followers: 4820, followersLastMonth: 4350, postsMonth: 18, reachAvg: 3200, impressionsAvg: 8500, engagementRate: 4.8, bestDay: "Viernes", bestHour: "19:00" },
  { id: "cheddars_tt", brand: "cheddars", network: "tiktok", handle: "@cheddars.cl", followers: 1250, followersLastMonth: 890, postsMonth: 8, reachAvg: 12000, impressionsAvg: 28000, engagementRate: 7.2, bestDay: "Sábado", bestHour: "21:00" },
  { id: "tori_ig", brand: "tori", network: "ig", handle: "@torisushi.cl", followers: 620, followersLastMonth: 0, postsMonth: 5, reachAvg: 1800, impressionsAvg: 4200, engagementRate: 6.1, bestDay: "Lunes", bestHour: "13:00" },
  { id: "tori_tt", brand: "tori", network: "tiktok", handle: "@torisushi.cl", followers: 180, followersLastMonth: 0, postsMonth: 3, reachAvg: 8500, impressionsAvg: 19000, engagementRate: 9.3, bestDay: "Miércoles", bestHour: "20:00" },
  { id: "fatty_ig", brand: "fatty", network: "ig", handle: "@fattypatty.cl", followers: 3100, followersLastMonth: 2800, postsMonth: 12, reachAvg: 2400, impressionsAvg: 5800, engagementRate: 3.9, bestDay: "Martes", bestHour: "12:00" },
  { id: "buffalo_ig", brand: "buffalo", network: "ig", handle: "@buffalochicken.cl", followers: 850, followersLastMonth: 780, postsMonth: 4, reachAvg: 1100, impressionsAvg: 2800, engagementRate: 3.2, bestDay: "Jueves", bestHour: "18:00" },
  { id: "brown_ig", brand: "brown", network: "ig", handle: "@brownsweetfactory", followers: 1900, followersLastMonth: 1750, postsMonth: 6, reachAvg: 1500, impressionsAvg: 3600, engagementRate: 4.1, bestDay: "Viernes", bestHour: "15:00" },
  { id: "samai_ig", brand: "samai", network: "ig", handle: "@clinicasamai", followers: 320, followersLastMonth: 0, postsMonth: 7, reachAvg: 900, impressionsAvg: 2100, engagementRate: 5.5, bestDay: "Lunes", bestHour: "10:00" },
];

const TOP_POSTS = [
  { id: 1, brand: "cheddars", network: "ig", type: "reel", title: "Fiesta Semáforo San Valentín", date: "13/02", reach: 18500, likes: 842, comments: 127, shares: 95, saves: 210, engagement: 8.2 },
  { id: 2, brand: "cheddars", network: "tiktok", type: "reel", title: "Burger challenge 60 segundos", date: "25/02", reach: 45000, likes: 3200, comments: 280, shares: 520, saves: 0, engagement: 11.4 },
  { id: 3, brand: "cheddars", network: "ig", type: "carrusel", title: "Martes de Amigas recap", date: "17/02", reach: 8200, likes: 520, comments: 85, shares: 42, saves: 115, engagement: 6.1 },
  { id: 4, brand: "fatty", network: "ig", type: "carrusel", title: "Burger del Día precios nuevos", date: "02/04", reach: 6800, likes: 380, comments: 62, shares: 28, saves: 89, engagement: 5.8 },
  { id: 5, brand: "tori", network: "tiktok", type: "reel", title: "Preparación sushi POV", date: "05/04", reach: 22000, likes: 1800, comments: 190, shares: 310, saves: 0, engagement: 10.5 },
  { id: 6, brand: "brown", network: "ig", type: "post", title: "Brownie Box nueva caja", date: "28/02", reach: 4200, likes: 290, comments: 35, shares: 18, saves: 65, engagement: 4.8 },
  { id: 7, brand: "samai", network: "ig", type: "carrusel", title: "Dra. Daniela presentación", date: "26/01", reach: 2800, likes: 180, comments: 22, shares: 15, saves: 42, engagement: 5.1 },
];

const CAMPAIGN_RESULTS = [
  { campaignId: 1, name: "Burger del Día Fatty Patty", brand: "fatty", totalReach: 28500, totalImpressions: 68000, totalEngagement: 1850, engagementRate: 5.2, newFollowers: 85, clicks: 320, salesAttributed: 1800000, newClients: 22, costHours: 18, pieces: 6 },
  { campaignId: 6, name: "Samai Lanzamiento Redes", brand: "samai", totalReach: 12000, totalImpressions: 31000, totalEngagement: 920, engagementRate: 5.8, newFollowers: 320, clicks: 180, salesAttributed: 0, newClients: 0, costHours: 24, pieces: 10 },
];

const CONTENT_BENCHMARK = [
  { type: "reel", network: "ig", avgReach: 8500, avgEngagement: 6.2, avgLikes: 480, count: 12 },
  { type: "carrusel", network: "ig", avgReach: 4200, avgEngagement: 4.8, avgLikes: 320, count: 18 },
  { type: "post", network: "ig", avgReach: 2800, avgEngagement: 3.1, avgLikes: 180, count: 10 },
  { type: "historia", network: "ig", avgReach: 1500, avgEngagement: 2.2, avgLikes: 0, count: 8 },
  { type: "reel", network: "tiktok", avgReach: 22000, avgEngagement: 9.8, avgLikes: 1800, count: 6 },
];

const getBrand=id=>BRANDS.find(b=>b.id===id)||{name:id,color:B.textMuted};
const getPerson=id=>TEAM.find(t=>t.id===id)||{name:id,short:"?",color:B.textMuted};
function approvalMatchesTask(a,t){if(a.taskId!=null&&Number(a.taskId)===t.id)return true;return a.title===t.title;}
function computePendingApprovalsUnion(){const approvalPending=APPROVALS.filter(a=>a.status==="pendiente"||a.status==="cambios");const enRev=TASKS.filter(t=>t.status==="en_revision");const orphanApprovals=approvalPending.filter(a=>!enRev.some(t=>approvalMatchesTask(a,t)));return{approvalPending,enRev,orphanApprovals,pendingCount:enRev.length+orphanApprovals.length};}
const loadPct=(tasks,cap)=>cap>0?Math.round(tasks/cap*100):0;
const loadColor=pct=>pct>100?B.danger:pct>=85?B.warning:B.success;

function DashboardView({ efemerides, onNavigate }) {
  const pendingApprovals = APPROVALS.filter((a) => a.status === "pendiente").length;
  const efemsNocamp = efemerides.filter((e) => !e.hasCampaign).length;
  return (
<div><div style={{display:"grid",gridTemplateColumns:"repeat(5, 1fr)",gap:10,marginBottom:16}}><Card><div style={{fontSize:11,color:B.textMuted,fontWeight:600}}>Piezas publicadas (mes)</div><div style={{fontSize:22,fontWeight:800,color:B.text}}>47</div><div style={{fontSize:11,color:B.success}}>+12 vs mes anterior</div></Card><Card><div style={{fontSize:11,color:B.textMuted,fontWeight:600}}>% a tiempo</div><div style={{fontSize:22,fontWeight:800,color:B.success}}>81%</div><div style={{fontSize:11,color:B.textMuted}}>38/47 entregas</div></Card><Card><div style={{fontSize:11,color:B.textMuted,fontWeight:600}}>Aprobadas 1ra vez</div><div style={{fontSize:22,fontWeight:800,color:B.info}}>68%</div><div style={{fontSize:11,color:B.textMuted}}>32/47 piezas</div></Card><Card><div style={{fontSize:11,color:B.textMuted,fontWeight:600}}>Marcas activas</div><div style={{fontSize:22,fontWeight:800,color:B.purple}}>{activeBrands.length}</div><div style={{fontSize:11,color:B.textMuted}}>+ 1 pausada</div></Card><Card><div style={{fontSize:11,color:B.textMuted,fontWeight:600}}>Campañas activas</div><div style={{fontSize:22,fontWeight:800,color:B.warning}}>{CAMPAIGNS.filter(c=>["en_produccion","aprobada"].includes(c.status)).length}</div><div style={{fontSize:11,color:B.textMuted}}>+ {CAMPAIGNS.filter(c=>c.status==="propuesta").length} propuesta</div></Card></div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}><Card><h3 style={{fontSize:14,fontWeight:700,marginBottom:12}}>Carga equipo esta semana</h3>{TEAM.map(t=>{const pct=loadPct(t.tasksWeek,t.capacityWeek);const c=loadColor(pct);return<div key={t.id} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:`1px solid ${B.border}`}}><div style={{width:28,height:28,borderRadius:"50%",background:t.color,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:10,color:"#fff",flexShrink:0}}>{t.short}</div><div style={{flex:1}}><div style={{fontSize:13,fontWeight:600}}>{t.name}</div><div style={{fontSize:11,color:B.textMuted}}>{t.role}{t.isExperience?" · Mod. 11":""}</div></div><div style={{width:60,height:6,background:B.surfaceHover,borderRadius:3,overflow:"hidden"}}><div style={{width:`${Math.min(pct,100)}%`,height:"100%",background:c,borderRadius:3}}/></div><div style={{fontSize:12,fontWeight:700,color:c,minWidth:55,textAlign:"right"}}>{t.tasksWeek}/{t.capacityWeek}</div></div>})}</Card><div><Card style={{marginBottom:14}}><h3 style={{fontSize:14,fontWeight:700,marginBottom:12}}>Próximas publicaciones</h3>{CALENDAR_ITEMS.filter(c=>["07/04","08/04"].includes(c.date)).slice(0,5).map(item=>{const br=getBrand(item.brand);const st=CAL_STATUS[item.status];return<div key={item.id} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:`1px solid ${B.border}`}}><div style={{width:6,height:6,borderRadius:"50%",background:br.color,flexShrink:0}}/><div style={{flex:1,fontSize:12,fontWeight:600}}>{item.title}</div><Badge color={br.color} bg={`${br.color}15`}>{br.name}</Badge><span style={{fontSize:11,color:B.textMuted}}>{item.date}</span><Badge color={st.color} bg={st.bg}>{st.label}</Badge></div>})}</Card><Card style={{border:`1px solid ${B.danger}20`}}><h3 style={{fontSize:14,fontWeight:700,color:B.danger,marginBottom:10}}>Alertas</h3>{[{text:`${pendingApprovals} piezas esperando aprobación`,severity:"alta"},{text:"1 tarea vencida (Portada reel Bingo — Josef)",severity:"alta"},{text:`${efemsNocamp} efemérides próximas sin campaña`,severity:"media",onClick:()=>onNavigate("calendario",{openEfemerides:true})},{text:"Marco al 100% de capacidad esta semana",severity:"media"},{text:"Kathya: 3 DMs negativos en Cheddar's IG",severity:"baja"}].map((a,i)=><div key={i} role={a.onClick?"button":undefined} tabIndex={a.onClick?0:undefined} onClick={()=>a.onClick?.()} onKeyDown={(e)=>{if(!a.onClick)return;if(e.key==="Enter"||e.key===" "){e.preventDefault();a.onClick();}}} onMouseEnter={(e)=>{if(a.onClick)e.currentTarget.style.background=B.surfaceHover}} onMouseLeave={(e)=>{e.currentTarget.style.background="transparent"}} style={{display:"flex",gap:8,padding:"6px 0",borderBottom:`1px solid ${B.border}`,alignItems:"flex-start",cursor:a.onClick?"pointer":"default",borderRadius:4}}><div style={{width:8,height:8,borderRadius:"50%",background:a.severity==="alta"?B.danger:a.severity==="media"?B.warning:B.info,marginTop:4,flexShrink:0}}/><div style={{fontSize:12,color:B.text,lineHeight:1.4}}>{a.text}</div></div>)}</Card></div></div></div>
  );
}

function CalendarioView({ efemerides, setEfemerides, efemeridesPanelOpen, setEfemeridesPanelOpen }) {
  const [brandFilter, setBrandFilter] = useState("todas");
  const [networkFilter, setNetworkFilter] = useState("todas");
  const [viewMode, setViewMode] = useState("mes");
  const [currentMonth, setCurrentMonth] = useState(3);
  const [currentYear, setCurrentYear] = useState(2026);
  const [selectedDate, setSelectedDate] = useState(7);
  const [backFromView, setBackFromView] = useState("mes");
  const [newEfeDate, setNewEfeDate] = useState("");
  const [newEfeName, setNewEfeName] = useState("");
  const [newEfeBrands, setNewEfeBrands] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editDate, setEditDate] = useState("");
  const [editName, setEditName] = useState("");
  const [editBrands, setEditBrands] = useState([]);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [linkToast, setLinkToast] = useState(null);

  useEffect(() => {
    if (!linkToast) return undefined;
    const t = setTimeout(() => setLinkToast(null), 2600);
    return () => clearTimeout(t);
  }, [linkToast]);

  const pad2 = (n) => String(n).padStart(2, "0");
  const toKeyFromDate = (dt) => `${pad2(dt.getDate())}/${pad2(dt.getMonth() + 1)}`;
  const trunc = (s, n = 20) => (s.length <= n ? s : s.slice(0, n) + "…");
  const MONTH_NAMES = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const WEEKDAYS_LONG = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const WEEK_HEADERS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

  let items = CALENDAR_ITEMS;
  if (brandFilter !== "todas") items = items.filter((i) => i.brand === brandFilter);
  if (networkFilter !== "todas") items = items.filter((i) => i.network === networkFilter);

  const itemsForKey = (key) => items.filter((i) => i.date === key);

  const netChip = (id) => (id === "tiktok" ? "🎵" : "📸");

  const openDay = (dt, from) => {
    setCurrentYear(dt.getFullYear());
    setCurrentMonth(dt.getMonth());
    setSelectedDate(dt.getDate());
    setBackFromView(from);
    setViewMode("dia");
  };

  const shiftMonth = (dir) => {
    const d = new Date(currentYear, currentMonth + dir, 1);
    setCurrentYear(d.getFullYear());
    setCurrentMonth(d.getMonth());
  };

  const shiftWeek = (dir) => {
    const d = new Date(currentYear, currentMonth, selectedDate);
    d.setDate(d.getDate() + dir * 7);
    setCurrentYear(d.getFullYear());
    setCurrentMonth(d.getMonth());
    setSelectedDate(d.getDate());
  };

  const onViewToggle = (mode) => {
    if (mode === "dia" && viewMode !== "dia") setBackFromView(viewMode === "semana" ? "semana" : "mes");
    setViewMode(mode);
  };

  const toggleBtn = (mode, label) => (
    <button
      key={mode}
      type="button"
      onClick={() => onViewToggle(mode)}
      style={{
        padding: "6px 14px",
        borderRadius: 6,
        border: "none",
        fontSize: 13,
        fontWeight: viewMode === mode ? 700 : 500,
        background: viewMode === mode ? B.surface : "transparent",
        color: viewMode === mode ? B.text : B.textMuted,
        cursor: "pointer",
        fontFamily: font,
        boxShadow: viewMode === mode ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
      }}
    >
      {label}
    </button>
  );

  const first = new Date(currentYear, currentMonth, 1);
  const lead = (first.getDay() + 6) % 7;
  const gridStart = new Date(currentYear, currentMonth, 1 - lead);
  const monthCells = [];
  for (let i = 0; i < 42; i++) {
    const c = new Date(gridStart);
    c.setDate(gridStart.getDate() + i);
    monthCells.push(c);
  }

  const isToday = (dt) => dt.getDate() === 7 && dt.getMonth() === 3 && dt.getFullYear() === 2026;
  const inViewMonth = (dt) => dt.getMonth() === currentMonth && dt.getFullYear() === currentYear;

  const focus = new Date(currentYear, currentMonth, selectedDate);
  const wkStart = new Date(focus);
  wkStart.setDate(focus.getDate() - ((focus.getDay() + 6) % 7));
  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    const x = new Date(wkStart);
    x.setDate(wkStart.getDate() + i);
    weekDays.push(x);
  }

  const weekLabelEnd = weekDays[6];
  const weekTitle =
    wkStart.getMonth() === weekLabelEnd.getMonth()
      ? `${pad2(wkStart.getDate())} — ${pad2(weekLabelEnd.getDate())} ${MONTH_NAMES[wkStart.getMonth()]} ${wkStart.getFullYear()}`
      : `${pad2(wkStart.getDate())} ${MONTH_NAMES[wkStart.getMonth()].slice(0, 3)} — ${pad2(weekLabelEnd.getDate())} ${MONTH_NAMES[weekLabelEnd.getMonth()]} ${weekLabelEnd.getFullYear()}`;

  const dayFocus = new Date(currentYear, currentMonth, selectedDate);
  const dayKey = `${pad2(selectedDate)}/${pad2(currentMonth + 1)}`;
  const dayItems = itemsForKey(dayKey);
  const dayEfem = efemerides.find((e) => e.date === dayKey);

  const navArrow = (onClick, dir) => (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: 32,
        height: 32,
        borderRadius: 8,
        border: `1px solid ${B.border}`,
        background: B.surface,
        cursor: "pointer",
        fontFamily: font,
        fontSize: 16,
        color: B.text,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {dir < 0 ? "←" : "→"}
    </button>
  );

  const renderItemCard = (item, opts) => {
    const br = getBrand(item.brand);
    const st = CAL_STATUS[item.status];
    const net = NETWORKS.find((n) => n.id === item.network);
    const person = getPerson(item.assignedTo);
    const typeName = CONTENT_TYPES.find((t) => t.id === item.type)?.name ?? item.type;
    const camp = item.campaign != null ? CAMPAIGNS.find((c) => c.id === item.campaign)?.name ?? `#${item.campaign}` : null;
    const compact = opts?.compact;
    return (
      <div
        key={item.id}
        style={{
          padding: compact ? "8px 10px" : "12px 14px",
          marginBottom: compact ? 8 : 10,
          borderRadius: 8,
          border: `1px solid ${B.border}`,
          background: B.surface,
        }}
      >
        <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: compact ? 6 : 8, flexWrap: "wrap" }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: br.color, flexShrink: 0 }} />
          <span style={{ fontSize: compact ? 11 : 12, color: br.color, fontWeight: 700 }}>{br.name}</span>
          <Badge color={B.textMuted} bg={B.surfaceHover}>
            {net?.icon} {net?.name}
          </Badge>
          <Badge color={B.textMuted} bg={B.surfaceHover}>{typeName}</Badge>
        </div>
        <div style={{ fontSize: compact ? 12 : 14, fontWeight: 600, lineHeight: 1.35, marginBottom: compact ? 6 : 8 }}>{item.title}</div>
        <div style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div
              style={{
                width: compact ? 22 : 26,
                height: compact ? 22 : 26,
                borderRadius: "50%",
                background: person.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: compact ? 8 : 9,
                fontWeight: 800,
                color: "#fff",
              }}
            >
              {person.short}
            </div>
            {!compact && <span style={{ fontSize: 13, color: B.text }}>{person.name}</span>}
          </div>
          <Badge color={st.color} bg={st.bg}>{st.label}</Badge>
        </div>
        {!compact && (
          <div style={{ fontSize: 12, color: B.textMuted, marginTop: 8 }}>
            Campaña: {camp ?? "—"}
          </div>
        )}
      </div>
    );
  };

  const efeSortValue = (d) => {
    const p = String(d || "").split("/");
    if (p.length < 2) return 0;
    const day = Number(p[0]);
    const mo = Number(p[1]);
    if (!day || !mo) return 0;
    return mo * 100 + day;
  };
  const efemeridesSorted = [...efemerides].sort((a, b) => efeSortValue(a.date) - efeSortValue(b.date));

  const addEfemeride = () => {
    if (!newEfeDate.trim() || !newEfeName.trim() || newEfeBrands.length === 0) return;
    setEfemerides((prev) => {
      const nid = prev.reduce((m, e) => Math.max(m, e.id || 0), 0) + 1;
      return [
        ...prev,
        { id: nid, date: newEfeDate.trim(), name: newEfeName.trim(), brands: [...newEfeBrands], hasCampaign: false },
      ];
    });
    setNewEfeDate("");
    setNewEfeName("");
    setNewEfeBrands([]);
  };

  const saveEditEfe = (id) => {
    if (!editDate.trim() || !editName.trim()) return;
    setEfemerides((prev) =>
      prev.map((e) => (e.id === id ? { ...e, date: editDate.trim(), name: editName.trim(), brands: [...editBrands] } : e))
    );
    setEditingId(null);
  };

  const removeEfe = (id) => {
    setEfemerides((prev) => prev.filter((e) => e.id !== id));
    setDeleteConfirmId(null);
    if (editingId === id) setEditingId(null);
  };

  const linkCampaignMock = (id) => {
    setEfemerides((prev) => prev.map((e) => (e.id === id ? { ...e, hasCampaign: true } : e)));
    setLinkToast("Campaña vinculada");
  };

  const toggleNewBrand = (bid) => {
    setNewEfeBrands((prev) => (prev.includes(bid) ? prev.filter((x) => x !== bid) : [...prev, bid]));
  };

  const toggleEditBrand = (bid) => {
    setEditBrands((prev) => (prev.includes(bid) ? prev.filter((x) => x !== bid) : [...prev, bid]));
  };

  return (
    <div style={{ display: "flex", alignItems: "stretch", gap: 0 }}>
      <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 2, background: B.surfaceHover, borderRadius: 8, padding: 2 }}>
          {toggleBtn("mes", "Mes")}
          {toggleBtn("semana", "Semana")}
          {toggleBtn("dia", "Día")}
        </div>
        <Select
          value={brandFilter}
          onChange={setBrandFilter}
          options={[{ value: "todas", label: "Todas las marcas" }, ...activeBrands.map((b) => ({ value: b.id, label: b.name }))]}
        />
        <Select
          value={networkFilter}
          onChange={setNetworkFilter}
          options={[{ value: "todas", label: "Todas las redes" }, ...NETWORKS.map((n) => ({ value: n.id, label: `${n.icon} ${n.name}` }))]}
        />
        <Btn variant="default" onClick={() => setEfemeridesPanelOpen((v) => !v)} style={{ fontSize: 12 }}>
          📅 Efemérides ({efemerides.length})
        </Btn>
        <div style={{ flex: 1 }} />
        {viewMode === "mes" && (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {navArrow(() => shiftMonth(-1), -1)}
            <div style={{ fontSize: 15, fontWeight: 700, color: B.text, minWidth: 140, textAlign: "center" }}>
              {MONTH_NAMES[currentMonth]} {currentYear}
            </div>
            {navArrow(() => shiftMonth(1), 1)}
          </div>
        )}
        {viewMode === "semana" && (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {navArrow(() => shiftWeek(-1), -1)}
            <div style={{ fontSize: 14, fontWeight: 700, color: B.text, minWidth: 200, textAlign: "center" }}>{weekTitle}</div>
            {navArrow(() => shiftWeek(1), 1)}
          </div>
        )}
      </div>

      {viewMode === "mes" && (
        <Card style={{ padding: 0, overflow: "hidden" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              borderBottom: `1px solid ${B.border}`,
              background: "#FAFAF8",
            }}
          >
            {WEEK_HEADERS.map((h) => (
              <div key={h} style={{ padding: "10px 8px", fontSize: 11, fontWeight: 700, color: B.textMuted, textAlign: "center" }}>
                {h}
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
            {monthCells.map((cell, idx) => {
              const key = toKeyFromDate(cell);
              const dayItems = itemsForKey(key);
              const efem = efemerides.find((e) => e.date === key);
              const chips = [];
              if (efem) {
                chips.push({
                  key: `ef-${key}`,
                  el: (
                    <div
                      key={`ef-${key}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        openDay(cell, "mes");
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        fontSize: 10,
                        fontWeight: 600,
                        padding: "3px 5px",
                        borderRadius: 4,
                        background: B.warningBg,
                        color: B.warning,
                        borderLeft: `3px solid ${B.warning}`,
                        cursor: "pointer",
                        overflow: "hidden",
                      }}
                    >
                      <span style={{ flexShrink: 0 }}>📅</span>
                      <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{trunc(efem.name, 18)}</span>
                    </div>
                  ),
                });
              }
              dayItems.forEach((item) => {
                const br = getBrand(item.brand);
                chips.push({
                  key: `it-${item.id}`,
                  el: (
                    <div
                      key={item.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        openDay(cell, "mes");
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        fontSize: 10,
                        fontWeight: 600,
                        padding: "3px 5px",
                        borderRadius: 4,
                        background: B.surfaceHover,
                        borderLeft: `3px solid ${br.color}`,
                        cursor: "pointer",
                        minWidth: 0,
                      }}
                    >
                      <span style={{ flexShrink: 0 }}>{netChip(item.network)}</span>
                      <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: B.text }}>{trunc(item.title)}</span>
                    </div>
                  ),
                });
              });
              const visible = chips.slice(0, 3);
              const more = chips.length - 3;
              const today = isToday(cell);
              const outside = !inViewMonth(cell);
              return (
                <div
                  key={idx}
                  role="button"
                  tabIndex={0}
                  onClick={() => openDay(cell, "mes")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openDay(cell, "mes");
                    }
                  }}
                  style={{
                    minHeight: 90,
                    borderRight: (idx + 1) % 7 === 0 ? "none" : `1px solid ${B.border}`,
                    borderBottom: idx < 35 ? `1px solid ${B.border}` : "none",
                    padding: "6px 6px 8px",
                    opacity: outside ? 0.3 : 1,
                    background: today ? `${B.accent}14` : "transparent",
                    borderLeft: today ? `3px solid ${B.accent}` : "3px solid transparent",
                    cursor: "pointer",
                    boxSizing: "border-box",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = B.surfaceHover;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = today ? `${B.accent}14` : "transparent";
                  }}
                >
                  <div style={{ fontSize: 12, fontWeight: 700, color: outside ? B.textMuted : B.text, marginBottom: 4 }}>{cell.getDate()}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    {visible.map((c) => c.el)}
                    {more > 0 && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openDay(cell, "mes");
                        }}
                        style={{
                          border: "none",
                          background: "transparent",
                          color: B.info,
                          fontSize: 10,
                          fontWeight: 700,
                          cursor: "pointer",
                          textAlign: "left",
                          padding: "2px 0",
                          fontFamily: font,
                        }}
                      >
                        +{more} más
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {viewMode === "semana" && (
        <Card style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(0, 1fr))", minHeight: 420 }}>
            {weekDays.map((dt, di) => {
              const k = toKeyFromDate(dt);
              const colItems = itemsForKey(k);
              const efem = efemerides.find((e) => e.date === k);
              return (
                <div key={di} style={{ borderRight: di < 6 ? `1px solid ${B.border}` : "none", display: "flex", flexDirection: "column", minWidth: 0 }}>
                  <button
                    type="button"
                    onClick={() => openDay(dt, "semana")}
                    style={{
                      padding: "10px 10px",
                      border: "none",
                      borderBottom: `1px solid ${B.border}`,
                      background: "#FAFAF8",
                      cursor: "pointer",
                      textAlign: "left",
                      fontFamily: font,
                    }}
                  >
                    <div style={{ fontSize: 11, fontWeight: 700, color: B.textMuted }}>{WEEK_HEADERS[di]}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: B.text }}>
                      {pad2(dt.getDate())} {MONTH_NAMES[dt.getMonth()].slice(0, 3)}
                    </div>
                    {efem && (
                      <div style={{ fontSize: 10, color: B.warning, fontWeight: 600, marginTop: 4 }}>📅 {efem.name}</div>
                    )}
                  </button>
                  <div style={{ padding: 8, flex: 1, overflow: "auto" }}>
                    {colItems.length === 0 && !efem && (
                      <div style={{ fontSize: 11, color: B.textLight, textAlign: "center", padding: 8 }}>Sin publicaciones</div>
                    )}
                    {colItems.map((item) => renderItemCard(item, { compact: true }))}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {viewMode === "dia" && (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, flexWrap: "wrap" }}>
            <Btn
              variant="ghost"
              onClick={() => setViewMode(backFromView)}
              style={{ fontSize: 13 }}
            >
              {backFromView === "semana" ? "← Volver a semana" : "← Volver a mes"}
            </Btn>
            <h2 style={{ fontSize: 17, fontWeight: 800, color: B.text, fontFamily: font }}>
              {WEEKDAYS_LONG[dayFocus.getDay()]} {pad2(selectedDate)} de {MONTH_NAMES[currentMonth]}, {currentYear}
            </h2>
          </div>
          {dayEfem && (
            <Card
              style={{
                marginBottom: 12,
                background: B.warningBg,
                border: `1px solid ${B.warning}33`,
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 700, color: B.warning, display: "flex", alignItems: "center", gap: 8 }}>
                <span>📅</span>
                <span>{dayEfem.name}</span>
              </div>
              <div style={{ fontSize: 12, color: B.textMuted, marginTop: 6 }}>
                Marcas:{" "}
                {dayEfem.brands.map((bid) => {
                  const br = getBrand(bid);
                  return (
                    <span key={bid} style={{ marginRight: 4, display: "inline-block" }}>
                      <Badge color={br.color} bg={`${br.color}12`}>{br.name}</Badge>
                    </span>
                  );
                })}
              </div>
            </Card>
          )}
          {dayItems.length === 0 && !dayEfem && (
            <Card style={{ textAlign: "center", padding: 32 }}>
              <div style={{ fontSize: 13, color: B.textMuted }}>Sin publicaciones este día</div>
            </Card>
          )}
          {dayItems.map((item) => renderItemCard(item, { compact: false }))}
        </div>
      )}
      </div>
      {efemeridesPanelOpen && (
        <aside
          style={{
            width: 340,
            flexShrink: 0,
            background: B.surface,
            borderLeft: `1px solid ${B.border}`,
            padding: "14px 16px 20px",
            overflowY: "auto",
            maxHeight: "min(720px, calc(100vh - 140px))",
            alignSelf: "flex-start",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, gap: 8 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: B.text }}>📅 Gestión Efemérides</div>
            <Btn variant="ghost" onClick={() => setEfemeridesPanelOpen(false)} style={{ fontSize: 12 }}>
              Cerrar
            </Btn>
          </div>
          {linkToast && (
            <div style={{ marginBottom: 10 }}>
              <Badge color={B.success} bg={B.successBg}>
                {linkToast}
              </Badge>
            </div>
          )}
          <Card style={{ marginBottom: 12, padding: "12px 14px" }}>
            <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 8, color: B.textMuted }}>Agregar efeméride</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: B.textMuted, marginBottom: 4 }}>Fecha (DD/MM)</div>
            <input
              value={newEfeDate}
              onChange={(e) => setNewEfeDate(e.target.value)}
              placeholder="07/04"
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "7px 10px",
                borderRadius: 8,
                border: `1px solid ${B.border}`,
                fontFamily: font,
                fontSize: 13,
                marginBottom: 8,
              }}
            />
            <div style={{ fontSize: 11, fontWeight: 600, color: B.textMuted, marginBottom: 4 }}>Nombre</div>
            <input
              value={newEfeName}
              onChange={(e) => setNewEfeName(e.target.value)}
              placeholder="Nombre del día"
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "7px 10px",
                borderRadius: 8,
                border: `1px solid ${B.border}`,
                fontFamily: font,
                fontSize: 13,
                marginBottom: 8,
              }}
            />
            <div style={{ fontSize: 11, fontWeight: 600, color: B.textMuted, marginBottom: 6 }}>Marcas</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 10, maxHeight: 140, overflowY: "auto" }}>
              {activeBrands.map((b) => (
                <label key={b.id} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, cursor: "pointer" }}>
                  <input type="checkbox" checked={newEfeBrands.includes(b.id)} onChange={() => toggleNewBrand(b.id)} />
                  <span>{b.name}</span>
                </label>
              ))}
            </div>
            <Btn variant="primary" onClick={addEfemeride} style={{ fontSize: 12 }}>
              Agregar
            </Btn>
          </Card>
          <div style={{ fontSize: 12, fontWeight: 700, color: B.textMuted, marginBottom: 8 }}>Registro ({efemeridesSorted.length})</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {efemeridesSorted.map((e) => (
              <Card key={e.id} style={{ padding: "10px 12px" }}>
                {editingId === e.id ? (
                  <div>
                    <input
                      value={editDate}
                      onChange={(ev) => setEditDate(ev.target.value)}
                      style={{
                        width: "100%",
                        boxSizing: "border-box",
                        padding: "6px 8px",
                        borderRadius: 6,
                        border: `1px solid ${B.border}`,
                        fontFamily: font,
                        fontSize: 12,
                        marginBottom: 6,
                      }}
                    />
                    <input
                      value={editName}
                      onChange={(ev) => setEditName(ev.target.value)}
                      style={{
                        width: "100%",
                        boxSizing: "border-box",
                        padding: "6px 8px",
                        borderRadius: 6,
                        border: `1px solid ${B.border}`,
                        fontFamily: font,
                        fontSize: 12,
                        marginBottom: 6,
                      }}
                    />
                    <div style={{ display: "flex", flexDirection: "column", gap: 3, marginBottom: 8, maxHeight: 100, overflowY: "auto" }}>
                      {activeBrands.map((b) => (
                        <label key={b.id} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, cursor: "pointer" }}>
                          <input type="checkbox" checked={editBrands.includes(b.id)} onChange={() => toggleEditBrand(b.id)} />
                          {b.name}
                        </label>
                      ))}
                    </div>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      <Btn variant="primary" style={{ fontSize: 11 }} onClick={() => saveEditEfe(e.id)}>
                        Guardar
                      </Btn>
                      <Btn variant="default" style={{ fontSize: 11 }} onClick={() => setEditingId(null)}>
                        Cancelar
                      </Btn>
                    </div>
                  </div>
                ) : (
                  <>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "flex-start" }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: B.text }}>{e.date}</div>
                        <div style={{ fontSize: 13, fontWeight: 600, marginTop: 2 }}>{e.name}</div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 6 }}>
                          {e.brands.map((bid) => {
                            const br = getBrand(bid);
                            return (
                              <Badge key={bid} color={br.color} bg={`${br.color}12`}>
                                {br.name}
                              </Badge>
                            );
                          })}
                        </div>
                        <div style={{ marginTop: 6 }}>
                          {e.hasCampaign ? (
                            <Badge color={B.success} bg={B.successBg}>
                              Con campaña
                            </Badge>
                          ) : (
                            <Badge color={B.danger} bg={B.dangerBg}>
                              Sin campaña
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
                        <button
                          type="button"
                          title="Editar"
                          onClick={() => {
                            setEditingId(e.id);
                            setEditDate(e.date);
                            setEditName(e.name);
                            setEditBrands([...e.brands]);
                          }}
                          style={{
                            border: `1px solid ${B.border}`,
                            background: B.surfaceHover,
                            borderRadius: 6,
                            cursor: "pointer",
                            padding: "4px 8px",
                            fontSize: 12,
                            fontFamily: font,
                          }}
                        >
                          ✏️
                        </button>
                        <button
                          type="button"
                          title="Eliminar"
                          onClick={() => setDeleteConfirmId(e.id)}
                          style={{
                            border: `1px solid ${B.border}`,
                            background: B.surfaceHover,
                            borderRadius: 6,
                            cursor: "pointer",
                            padding: "4px 8px",
                            fontSize: 12,
                            fontFamily: font,
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                    {deleteConfirmId === e.id && (
                      <div
                        style={{
                          marginTop: 10,
                          padding: 8,
                          borderRadius: 8,
                          background: B.dangerBg,
                          border: `1px solid ${B.danger}33`,
                          fontSize: 12,
                        }}
                      >
                        ¿Eliminar esta efeméride?
                        <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                          <Btn variant="danger" style={{ fontSize: 11 }} onClick={() => removeEfe(e.id)}>
                            Sí, eliminar
                          </Btn>
                          <Btn variant="default" style={{ fontSize: 11 }} onClick={() => setDeleteConfirmId(null)}>
                            No
                          </Btn>
                        </div>
                      </div>
                    )}
                    {!e.hasCampaign && (
                      <div style={{ marginTop: 10 }}>
                        <Btn variant="default" style={{ fontSize: 11 }} onClick={() => linkCampaignMock(e.id)}>
                          📣 Crear campaña
                        </Btn>
                      </div>
                    )}
                  </>
                )}
              </Card>
            ))}
          </div>
        </aside>
      )}
    </div>
  );
}

function CampanasView() {
  const [expanded, setExpanded] = useState(null);
  const [filter, setFilter] = useState("todas");
  let camps = CAMPAIGNS;
  if (filter !== "todas") camps = camps.filter((c) => c.status === filter);
  const engagementRateColor = (rate) => {
    if (rate >= 6) return B.success;
    if (rate >= 4) return B.warning;
    return B.danger;
  };
  const fmt = (n) => n.toLocaleString();
  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 14, justifyContent: "space-between", flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: 6 }}>
          {[{ id: "todas", label: "Todas" }, ...Object.entries(CAMPAIGN_STATUS).map(([k, v]) => ({ id: k, label: v.label }))].map((f) => (
            <Btn key={f.id} variant={filter === f.id ? "primary" : "default"} onClick={() => setFilter(f.id)} style={{ fontSize: 12 }}>
              {f.label}
            </Btn>
          ))}
        </div>
        <Btn variant="primary">+ Nueva campaña</Btn>
      </div>
      {camps.map((c) => {
        const br = getBrand(c.brand);
        const st = CAMPAIGN_STATUS[c.status];
        const isExp = expanded === c.id;
        const progress = c.pieces > 0 ? Math.round((c.piecesApproved / c.pieces) * 100) : 0;
        const resultado =
          (c.status === "publicada" || c.status === "evaluada") ? CAMPAIGN_RESULTS.find((r) => r.campaignId === c.id) : null;
        return (
          <Card
            key={c.id}
            style={{ marginBottom: 10, cursor: "pointer", borderLeft: `4px solid ${br.color}` }}
            onClick={() => setExpanded(isExp ? null : c.id)}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 10, color: B.textMuted }}>{isExp ? "▼" : "▶"}</span>
                  <span style={{ fontSize: 15, fontWeight: 700 }}>{c.name}</span>
                  <Badge color={st.color} bg={st.bg}>
                    {st.label}
                  </Badge>
                  {br.type === "externo" && (
                    <Badge color={B.success} bg={B.successBg}>
                      Externo
                    </Badge>
                  )}
                </div>
                <div style={{ fontSize: 12, color: B.textMuted }}>
                  {br.name} · {c.networks.map((n) => NETWORKS.find((nn) => nn.id === n)?.icon).join(" ")} · {c.startDate} — {c.endDate}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 11, color: B.textMuted }}>Progreso</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 60, height: 6, background: B.surfaceHover, borderRadius: 3, overflow: "hidden" }}>
                    <div style={{ width: `${progress}%`, height: "100%", background: st.color, borderRadius: 3 }} />
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700 }}>
                    {c.piecesApproved}/{c.pieces}
                  </span>
                </div>
              </div>
            </div>
            {isExp && (
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${B.border}` }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: B.textMuted, marginBottom: 6 }}>Idea</div>
                    <div style={{ fontSize: 13, lineHeight: 1.5 }}>{c.idea}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: B.textMuted, marginTop: 10, marginBottom: 4 }}>Origen</div>
                    <Badge>
                      {c.origin === "joaquin"
                        ? "Joaquín"
                        : c.origin === "pablo"
                          ? "Pablo"
                          : c.origin === "equipo"
                            ? "Propuesta equipo"
                            : "Cliente externo"}
                    </Badge>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: B.textMuted, marginBottom: 6 }}>Pipeline</div>
                    {["Propuesta", "Idea aprobada", "En producción", "Material aprobado", "Programación", "Publicada"].map((step, si) => {
                      const stepMap = { propuesta: 0, aprobada: 1, en_produccion: 2, publicada: 5, evaluada: 5 };
                      const current = stepMap[c.status] ?? 0;
                      const pubOrEval = c.status === "publicada" || c.status === "evaluada";
                      const done = si <= 2 ? si <= current : si <= 4 ? pubOrEval : current >= 5;
                      return (
                        <div key={si} style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 0" }}>
                          <div
                            style={{
                              width: 18,
                              height: 18,
                              borderRadius: "50%",
                              background: done ? B.success : B.surfaceHover,
                              border: `1.5px solid ${done ? B.success : B.border}`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 10,
                              color: done ? "#fff" : B.textLight,
                              fontWeight: 700,
                            }}
                          >
                            {done ? "✓" : si + 1}
                          </div>
                          <span style={{ fontSize: 12, fontWeight: done ? 600 : 400, color: done ? B.text : B.textMuted }}>{step}</span>
                        </div>
                      );
                    })}
                    <div style={{ fontSize: 12, fontWeight: 700, color: B.textMuted, marginTop: 10, marginBottom: 4 }}>Piezas</div>
                    <div style={{ fontSize: 12, color: B.textMuted }}>
                      {c.piecesReady} listas · {c.piecesApproved} aprobadas · {c.pieces - c.piecesReady} pendientes
                    </div>
                  </div>
                </div>
                {resultado && (
                  <>
                    <div style={{ borderTop: `1px solid ${B.border}`, marginTop: 12, paddingTop: 12 }}>
                      <div style={{ fontSize: 13, fontWeight: 700 }}>📈 Resultados</div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginTop: 8 }}>
                      <Card style={{ padding: "10px 14px" }}>
                        <div style={{ fontSize: 11, color: B.textMuted }}>Alcance total</div>
                        <div style={{ fontSize: 18, fontWeight: 800 }}>{fmt(resultado.totalReach)}</div>
                      </Card>
                      <Card style={{ padding: "10px 14px" }}>
                        <div style={{ fontSize: 11, color: B.textMuted }}>Impresiones</div>
                        <div style={{ fontSize: 18, fontWeight: 800 }}>{fmt(resultado.totalImpressions)}</div>
                      </Card>
                      <Card style={{ padding: "10px 14px" }}>
                        <div style={{ fontSize: 11, color: B.textMuted }}>Engagement</div>
                        <div style={{ fontSize: 18, fontWeight: 800 }}>{fmt(resultado.totalEngagement)}</div>
                      </Card>
                      <Card style={{ padding: "10px 14px" }}>
                        <div style={{ fontSize: 11, color: B.textMuted }}>Engagement rate</div>
                        <div style={{ fontSize: 18, fontWeight: 800, color: engagementRateColor(resultado.engagementRate) }}>
                          {resultado.engagementRate}%
                        </div>
                      </Card>
                      <Card style={{ padding: "10px 14px" }}>
                        <div style={{ fontSize: 11, color: B.textMuted }}>Nuevos followers</div>
                        <div style={{ fontSize: 18, fontWeight: 800, color: B.success }}>+{fmt(resultado.newFollowers)}</div>
                      </Card>
                      <Card style={{ padding: "10px 14px" }}>
                        <div style={{ fontSize: 11, color: B.textMuted }}>Clicks</div>
                        <div style={{ fontSize: 18, fontWeight: 800 }}>{fmt(resultado.clicks)}</div>
                      </Card>
                    </div>
                    {resultado.salesAttributed > 0 && (
                      <Card
                        style={{
                          marginTop: 8,
                          padding: "10px 14px",
                          border: `1px solid ${B.success}30`,
                          background: B.successBg,
                        }}
                      >
                        <div style={{ fontSize: 16, fontWeight: 800, color: B.success }}>
                          Ventas atribuidas: ${(resultado.salesAttributed / 1000000).toFixed(1)}M
                        </div>
                        <div style={{ fontSize: 12, color: B.textMuted, marginTop: 4 }}>+{resultado.newClients} clientes nuevos</div>
                        <div style={{ marginTop: 8 }}>
                          <Badge color={B.info} bg={B.infoBg}>
                            Conecta con Módulo 17 Comercial
                          </Badge>
                        </div>
                      </Card>
                    )}
                    <div style={{ fontSize: 12, color: B.textMuted, marginTop: 8 }}>
                      {resultado.pieces} piezas en {resultado.costHours} horas de trabajo
                    </div>
                  </>
                )}
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}

function TareasView() {
  const TASK_SUBTYPES = ["Copy", "Diseño", "Video", "Coordinación", "Experiencia"];
  const REF_YEAR = 2026;
  const todayRef = new Date(REF_YEAR, 3, 6);

  const parseDdMm = (s) => {
    const p = String(s || "").split("/");
    if (p.length < 2) return null;
    const d = Number(p[0]);
    const m = Number(p[1]);
    if (!d || !m) return null;
    return new Date(REF_YEAR, m - 1, d);
  };

  const startOfDay = (dt) => new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());

  const deadlineTone = (deadlineStr) => {
    const dt = parseDdMm(deadlineStr);
    if (!dt) return B.textMuted;
    const t0 = startOfDay(todayRef).getTime();
    const t1 = startOfDay(dt).getTime();
    if (t1 < t0) return B.danger;
    if (t1 === t0) return B.warning;
    return B.textMuted;
  };

  const subtaskProgress = (task) => {
    const list = task.subtasks || [];
    const total = list.length;
    const done = list.filter((s) => s.done).length;
    return { done, total, pct: total ? done / total : 0 };
  };

  const progressFillColor = (pct) => {
    if (pct >= 1) return B.success;
    if (pct > 0.5) return B.info;
    return B.warning;
  };

  const uniqueSubtaskAssignees = (task) => {
    const seen = new Set();
    const out = [];
    for (const s of task.subtasks || []) {
      if (!seen.has(s.assignedTo)) {
        seen.add(s.assignedTo);
        out.push(s.assignedTo);
      }
    }
    return out;
  };

  const attachmentCount = (task) => {
    let n = (task.attachments || []).length;
    for (const s of task.subtasks || []) n += (s.attachments || []).length;
    return n;
  };

  const taskMatchesPersonFilter = (task, fid) => {
    if (fid === "todos") return true;
    if (task.assignedTo === fid) return true;
    return (task.subtasks || []).some((s) => s.assignedTo === fid);
  };

  const [tasks, setTasks] = useState(() => JSON.parse(JSON.stringify(TASKS)));
  const [view, setView] = useState("kanban");
  const [assignedFilter, setAssignedFilter] = useState("todos");
  const [brandFilter, setBrandFilter] = useState("todas");
  const [selectedId, setSelectedId] = useState(null);
  const [showNewForm, setShowNewForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newBrand, setNewBrand] = useState(activeBrands[0]?.id || "cheddars");
  const [newCampaign, setNewCampaign] = useState("");
  const [newDeadline, setNewDeadline] = useState("");
  const [newPriority, setNewPriority] = useState("media");
  const [newDescription, setNewDescription] = useState("");
  const [newSubtasks, setNewSubtasks] = useState([{ title: "", assignedTo: TEAM[0]?.id || "diego", type: "Copy" }]);

  const activeCampaignOptions = CAMPAIGNS.filter((c) => ["en_produccion", "aprobada"].includes(c.status));

  let filtered = tasks.filter((t) => taskMatchesPersonFilter(t, assignedFilter));
  if (brandFilter !== "todas") filtered = filtered.filter((t) => t.brand === brandFilter);

  const selectedTask = selectedId != null ? tasks.find((t) => t.id === selectedId) : null;

  useEffect(() => {
    if (selectedId == null) return;
    const t = tasks.find((x) => x.id === selectedId);
    if (!t) {
      setSelectedId(null);
      return;
    }
    const okPerson =
      assignedFilter === "todos" ||
      t.assignedTo === assignedFilter ||
      (t.subtasks || []).some((s) => s.assignedTo === assignedFilter);
    const okBrand = brandFilter === "todas" || t.brand === brandFilter;
    if (!okPerson || !okBrand) setSelectedId(null);
  }, [tasks, selectedId, assignedFilter, brandFilter]);

  const openDetail = (id) => {
    setSelectedId(id);
  };

  const toggleSubtaskDone = (taskId, subId) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId) return t;
        return {
          ...t,
          subtasks: (t.subtasks || []).map((s) => (s.id === subId ? { ...s, done: !s.done } : s)),
        };
      })
    );
  };

  const resetNewForm = () => {
    setNewTitle("");
    setNewBrand(activeBrands[0]?.id || "cheddars");
    setNewCampaign("");
    setNewDeadline("");
    setNewPriority("media");
    setNewDescription("");
    setNewSubtasks([{ title: "", assignedTo: TEAM[0]?.id || "diego", type: "Copy" }]);
  };

  const createTask = () => {
    if (!newTitle.trim()) return;
    const nextId = tasks.reduce((m, t) => Math.max(m, t.id), 0) + 1;
    const validSubs = newSubtasks.filter((s) => s.title.trim());
    const subtasks = validSubs.map((s, i) => ({
      id: `${nextId}${String.fromCharCode(97 + i)}`,
      title: s.title.trim(),
      assignedTo: s.assignedTo,
      done: false,
      type: s.type,
      attachments: [],
    }));
    const first = subtasks[0];
    setTasks((prev) => [
      ...prev,
      {
        id: nextId,
        title: newTitle.trim(),
        brand: newBrand,
        campaign: newCampaign === "" ? null : Number(newCampaign),
        deadline: newDeadline.trim() || "—",
        priority: newPriority,
        status: "por_hacer",
        assignedTo: first?.assignedTo || "diego",
        type: first?.type || "Copy",
        description: newDescription.trim() || "",
        subtasks,
        attachments: [],
      },
    ]);
    setShowNewForm(false);
    resetNewForm();
  };

  const renderProgressBar = (done, total, styleWrap = {}) => {
    const pct = total ? done / total : 0;
    return (
      <div style={{ marginTop: 6, ...styleWrap }}>
        <div style={{ fontSize: 10, color: B.textMuted, marginBottom: 4, fontWeight: 600 }}>
          {done}/{total} subtareas
        </div>
        <div style={{ height: 4, borderRadius: 2, background: B.surfaceHover, overflow: "hidden" }}>
          <div style={{ width: `${Math.round(pct * 100)}%`, height: "100%", background: progressFillColor(pct), borderRadius: 2 }} />
        </div>
      </div>
    );
  };

  const renderKanbanCard = (task, status) => {
    const br = getBrand(task.brand);
    const pr = PRIORITY[task.priority];
    const { done, total } = subtaskProgress(task);
    const attN = attachmentCount(task);
    const assignees = uniqueSubtaskAssignees(task);
    const dlColor = deadlineTone(task.deadline);
    return (
      <div
        key={task.id}
        role="button"
        tabIndex={0}
        onClick={() => openDetail(task.id)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openDetail(task.id);
          }
        }}
        style={{
          background: B.surface,
          border: `1px solid ${B.border}`,
          borderLeft: `3px solid ${br.color}`,
          borderRadius: 10,
          padding: "12px 14px",
          marginBottom: 8,
          cursor: "pointer",
          textAlign: "left",
          fontFamily: font,
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.3, marginBottom: 8, display: "flex", alignItems: "flex-start", gap: 6 }}>
          {status === "en_revision" && (
            <span style={{ fontSize: 11, lineHeight: 1.3, opacity: 0.65 }} aria-hidden="true">
              👁️
            </span>
          )}
          <span style={{ flex: 1, minWidth: 0 }}>{task.title}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: br.color, flexShrink: 0 }} />
          <span style={{ fontSize: 11, color: br.color, fontWeight: 600 }}>{br.name}</span>
        </div>
        {renderProgressBar(done, total)}
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
            {assignees.map((pid) => {
              const p = getPerson(pid);
              return (
                <div
                  key={pid}
                  title={p.name}
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    background: p.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 7,
                    fontWeight: 800,
                    color: "#fff",
                  }}
                >
                  {p.short}
                </div>
              );
            })}
          </div>
          <span style={{ fontSize: 11, fontWeight: 600, color: dlColor }}>{task.deadline}</span>
          <Badge color={pr.color} bg={pr.bg}>
            {pr.label}
          </Badge>
          {attN > 0 && (
            <span style={{ fontSize: 11, color: B.textMuted, fontWeight: 600 }}>
              📎 {attN}
            </span>
          )}
        </div>
      </div>
    );
  };

  const renderDetailPanel = () => {
    if (!selectedTask) return null;
    const br = getBrand(selectedTask.brand);
    const camp = selectedTask.campaign != null ? CAMPAIGNS.find((c) => c.id === selectedTask.campaign) : null;
    const st = TASK_STATUS[selectedTask.status];
    const pr = PRIORITY[selectedTask.priority];
    const { done, total, pct } = subtaskProgress(selectedTask);

    return (
      <Card
        style={{
          marginTop: 14,
          borderTop: `3px solid ${br.color}`,
          padding: "18px 20px",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "flex-start", marginBottom: 14 }}>
          <div style={{ flex: "1 1 220px", minWidth: 0 }}>
            <div style={{ fontSize: 11, color: B.textMuted, fontWeight: 600, marginBottom: 4 }}>Título</div>
            <input
              disabled
              value={selectedTask.title}
              readOnly
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "8px 10px",
                borderRadius: 8,
                border: `1px solid ${B.border}`,
                fontSize: 14,
                fontWeight: 700,
                fontFamily: font,
                background: B.surfaceHover,
                color: B.text,
              }}
            />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: br.color }} />
              <Badge color={br.color} bg={`${br.color}12`}>
                {br.name}
              </Badge>
            </div>
            {camp && <Badge>{camp.name}</Badge>}
            {!camp && <Badge color={B.textMuted} bg={B.surfaceHover}>Sin campaña</Badge>}
            <Badge color={deadlineTone(selectedTask.deadline)} bg={B.surfaceHover}>
              📅 {selectedTask.deadline}
            </Badge>
            <Badge color={pr.color} bg={pr.bg}>
              {pr.label}
            </Badge>
            <Badge color={st.color} bg={`${st.color}15`}>
              {st.label}
            </Badge>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <Btn variant="default" onClick={() => setSelectedId(null)}>
              Cerrar
            </Btn>
          </div>
        </div>

        <div style={{ fontSize: 12, fontWeight: 700, color: B.textMuted, marginBottom: 6 }}>Descripción</div>
        <div
          style={{
            background: B.surfaceHover,
            padding: 12,
            borderRadius: 8,
            fontSize: 13,
            lineHeight: 1.5,
            color: B.text,
            marginBottom: 18,
          }}
        >
          {selectedTask.description || "—"}
        </div>

        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Subtareas</div>
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 12, color: B.textMuted, marginBottom: 6, fontWeight: 600 }}>
            {done} de {total} completadas
          </div>
          <div style={{ height: 4, borderRadius: 2, background: B.surfaceHover, overflow: "hidden", maxWidth: 280 }}>
            <div style={{ width: `${Math.round(pct * 100)}%`, height: "100%", background: progressFillColor(pct), borderRadius: 2 }} />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {(selectedTask.subtasks || []).map((s) => {
            const p = getPerson(s.assignedTo);
            return (
              <div
                key={s.id}
                style={{
                  border: `1px solid ${B.border}`,
                  borderRadius: 8,
                  padding: "10px 12px",
                  background: B.surface,
                }}
              >
                <label style={{ display: "flex", gap: 10, alignItems: "flex-start", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={!!s.done}
                    onChange={() => toggleSubtaskDone(selectedTask.id, s.id)}
                    style={{ marginTop: 3, width: 16, height: 16, flexShrink: 0 }}
                  />
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        textDecoration: s.done ? "line-through" : "none",
                        color: s.done ? B.textLight : B.text,
                      }}
                    >
                      {s.done ? "✓ " : ""}
                      {s.title}
                    </span>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 6, alignItems: "center" }}>
                      <Badge color={B.textMuted} bg={B.surfaceHover}>
                        {s.type}
                      </Badge>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <div
                          style={{
                            width: 22,
                            height: 22,
                            borderRadius: "50%",
                            background: p.color,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 9,
                            fontWeight: 800,
                            color: "#fff",
                          }}
                        >
                          {p.short}
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 600, color: B.textMuted }}>{p.name.split(" ")[0]}</span>
                      </div>
                    </div>
                    {(s.attachments || []).length > 0 && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
                        {(s.attachments || []).map((f, fi) => (
                          <span
                            key={fi}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 6,
                              padding: "4px 8px",
                              borderRadius: 8,
                              background: B.surfaceHover,
                              fontSize: 11,
                              border: `1px solid ${B.border}`,
                            }}
                          >
                            <span>{f.icon}</span>
                            <span style={{ fontWeight: 600 }}>{f.name}</span>
                            <span style={{ color: B.textMuted }}>{f.size}</span>
                            <button
                              type="button"
                              onClick={(e) => e.preventDefault()}
                              style={{
                                border: "none",
                                background: "transparent",
                                cursor: "pointer",
                                color: B.textMuted,
                                fontSize: 12,
                                padding: "0 2px",
                                fontFamily: font,
                              }}
                              aria-label="Quitar adjunto (mock)"
                            >
                              ✕
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </span>
                </label>
              </div>
            );
          })}
        </div>

        <div style={{ fontSize: 13, fontWeight: 700, marginTop: 20, marginBottom: 8 }}>Adjuntos</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
          {(selectedTask.attachments || []).map((f, fi) => (
            <div key={fi} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12 }}>
              <span style={{ fontSize: 16 }}>{f.icon}</span>
              <span style={{ fontWeight: 600 }}>{f.name}</span>
              <span style={{ color: B.textMuted }}>{f.size}</span>
            </div>
          ))}
        </div>
        <div
          style={{
            border: `2px dashed ${B.border}`,
            borderRadius: 8,
            padding: "14px 16px",
            color: B.textMuted,
            fontSize: 12,
            textAlign: "center",
            background: B.surface,
          }}
        >
          📎 Adjuntar archivo
        </div>
      </Card>
    );
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 14, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: 2, background: B.surfaceHover, borderRadius: 8, padding: 2 }}>
          {[
            { id: "kanban", label: "Kanban" },
            { id: "lista", label: "Lista" },
          ].map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => setView(v.id)}
              style={{
                padding: "6px 14px",
                borderRadius: 6,
                border: "none",
                fontSize: 13,
                fontWeight: view === v.id ? 700 : 500,
                background: view === v.id ? B.surface : "transparent",
                color: view === v.id ? B.text : B.textMuted,
                cursor: "pointer",
                fontFamily: font,
                boxShadow: view === v.id ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
              }}
            >
              {v.label}
            </button>
          ))}
        </div>
        <Select
          value={assignedFilter}
          onChange={setAssignedFilter}
          options={[{ value: "todos", label: "Todo el equipo" }, ...TEAM.map((t) => ({ value: t.id, label: t.name }))]}
        />
        <Select
          value={brandFilter}
          onChange={setBrandFilter}
          options={[{ value: "todas", label: "Todas las marcas" }, ...activeBrands.map((b) => ({ value: b.id, label: b.name }))]}
        />
        <div style={{ flex: 1 }} />
        <Btn
          variant="primary"
          onClick={() => {
            setShowNewForm((v) => !v);
            setSelectedId(null);
          }}
        >
          + Nueva tarea
        </Btn>
      </div>

      {showNewForm && (
        <Card
          style={{
            marginBottom: 16,
            background: B.surfaceHover,
            border: `2px dashed ${B.accent}`,
            borderRadius: 12,
            padding: "18px 20px",
          }}
        >
          <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 14 }}>Nueva tarea</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: B.textMuted, marginBottom: 4 }}>Título *</div>
              <input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Título de la tarjeta"
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  padding: "8px 10px",
                  borderRadius: 8,
                  border: `1px solid ${B.border}`,
                  fontFamily: font,
                  fontSize: 13,
                }}
              />
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: B.textMuted, marginBottom: 4 }}>Marca</div>
              <Select
                value={newBrand}
                onChange={setNewBrand}
                options={activeBrands.map((b) => ({ value: b.id, label: b.name }))}
                style={{ width: "100%" }}
              />
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: B.textMuted, marginBottom: 4 }}>Campaña vinculada</div>
              <Select
                value={newCampaign}
                onChange={setNewCampaign}
                options={[{ value: "", label: "Sin campaña" }, ...activeCampaignOptions.map((c) => ({ value: String(c.id), label: c.name }))]}
                style={{ width: "100%" }}
              />
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: B.textMuted, marginBottom: 4 }}>Fecha límite (DD/MM)</div>
              <input
                value={newDeadline}
                onChange={(e) => setNewDeadline(e.target.value)}
                placeholder="12/04"
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  padding: "8px 10px",
                  borderRadius: 8,
                  border: `1px solid ${B.border}`,
                  fontFamily: font,
                  fontSize: 13,
                }}
              />
            </div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: B.textMuted, marginBottom: 6 }}>Prioridad</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {(["alta", "media", "baja"]).map((p) => {
                const pr = PRIORITY[p];
                return (
                  <Btn
                    key={p}
                    variant={newPriority === p ? "primary" : "default"}
                    onClick={() => setNewPriority(p)}
                    style={{ fontSize: 12 }}
                  >
                    {pr.label}
                  </Btn>
                );
              })}
            </div>
          </div>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: B.textMuted, marginBottom: 4 }}>Descripción</div>
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              rows={3}
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "8px 10px",
                borderRadius: 8,
                border: `1px solid ${B.border}`,
                fontFamily: font,
                fontSize: 13,
                resize: "vertical",
              }}
            />
          </div>
          <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Subtareas</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 12 }}>
            {newSubtasks.map((row, idx) => (
              <div key={idx} style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "flex-end" }}>
                <input
                  value={row.title}
                  onChange={(e) => {
                    const next = [...newSubtasks];
                    next[idx] = { ...next[idx], title: e.target.value };
                    setNewSubtasks(next);
                  }}
                  placeholder="Título subtarea"
                  style={{
                    flex: "1 1 180px",
                    minWidth: 120,
                    padding: "8px 10px",
                    borderRadius: 8,
                    border: `1px solid ${B.border}`,
                    fontFamily: font,
                    fontSize: 13,
                  }}
                />
                <Select
                  value={row.assignedTo}
                  onChange={(v) => {
                    const next = [...newSubtasks];
                    next[idx] = { ...next[idx], assignedTo: v };
                    setNewSubtasks(next);
                  }}
                  options={TEAM.map((t) => ({ value: t.id, label: t.name }))}
                />
                <Select
                  value={row.type}
                  onChange={(v) => {
                    const next = [...newSubtasks];
                    next[idx] = { ...next[idx], type: v };
                    setNewSubtasks(next);
                  }}
                  options={TASK_SUBTYPES.map((t) => ({ value: t, label: t }))}
                />
                <Btn
                  variant="ghost"
                  onClick={() => setNewSubtasks((prev) => prev.filter((_, i) => i !== idx))}
                  style={{ fontSize: 12 }}
                  disabled={newSubtasks.length <= 1}
                >
                  ✕
                </Btn>
              </div>
            ))}
            <Btn
              variant="default"
              onClick={() => setNewSubtasks((prev) => [...prev, { title: "", assignedTo: TEAM[0]?.id || "diego", type: "Copy" }])}
              style={{ fontSize: 12, alignSelf: "flex-start" }}
            >
              + Agregar subtarea
            </Btn>
          </div>
          <div
            style={{
              border: `2px dashed ${B.border}`,
              borderRadius: 8,
              padding: "16px 18px",
              color: B.textMuted,
              fontSize: 12,
              textAlign: "center",
              marginBottom: 14,
              background: B.surface,
            }}
          >
            📎 Zona de adjuntos (mock)
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Btn variant="primary" onClick={createTask} disabled={!newTitle.trim()}>
              Crear tarea
            </Btn>
            <Btn
              variant="default"
              onClick={() => {
                setShowNewForm(false);
                resetNewForm();
              }}
            >
              Cancelar
            </Btn>
          </div>
        </Card>
      )}

      {view === "kanban" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
            {TASK_STATUS_ORDER.map((status) => {
              const st = TASK_STATUS[status];
              const colTasks = filtered.filter((t) => t.status === status);
              return (
                <div key={status} style={{ background: B.surfaceHover, borderRadius: 12, padding: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10, padding: "0 4px" }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: st.color }} />
                    <span style={{ fontSize: 13, fontWeight: 700 }}>{st.label}</span>
                    <span style={{ fontSize: 11, color: B.textMuted, marginLeft: "auto" }}>{colTasks.length}</span>
                  </div>
                  {status === "en_revision" && (
                    <div style={{ fontSize: 10, color: B.textMuted, marginBottom: 8, padding: "0 4px" }}>Visible en Aprobaciones</div>
                  )}
                  {colTasks.map((task) => renderKanbanCard(task, status))}
                </div>
              );
            })}
          </div>
          {renderDetailPanel()}
        </div>
      )}

      {view === "lista" && (
        <div>
          <Card style={{ padding: 0, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: font }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${B.border}`, background: "#FAFAF8" }}>
                  {["Tarea", "Marca", "Subtareas", "Equipo", "Deadline", "Prioridad", "Estado"].map((h) => (
                    <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontWeight: 600, color: B.textMuted, fontSize: 12 }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((task) => {
                  const br = getBrand(task.brand);
                  const st = TASK_STATUS[task.status];
                  const pr = PRIORITY[task.priority];
                  const { done, total } = subtaskProgress(task);
                  const assignees = uniqueSubtaskAssignees(task);
                  const active = selectedId === task.id;
                  return (
                    <tr
                      key={task.id}
                      onClick={() => openDetail(task.id)}
                      style={{
                        borderBottom: `1px solid ${B.border}`,
                        cursor: "pointer",
                        background: active ? B.surfaceHover : "transparent",
                      }}
                      onMouseEnter={(e) => {
                        if (!active) e.currentTarget.style.background = B.surfaceHover;
                      }}
                      onMouseLeave={(e) => {
                        if (!active) e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <td style={{ padding: "10px 14px", fontWeight: 600, borderLeft: `3px solid ${br.color}` }}>{task.title}</td>
                      <td style={{ padding: "10px 14px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <div style={{ width: 6, height: 6, borderRadius: "50%", background: br.color }} />
                          <span style={{ fontSize: 12, fontWeight: 600, color: br.color }}>{br.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: "10px 14px", minWidth: 140 }}>
                        <div style={{ fontSize: 11, color: B.textMuted, fontWeight: 600, marginBottom: 4 }}>
                          {done}/{total}
                        </div>
                        <div style={{ height: 4, borderRadius: 2, background: B.surfaceHover, overflow: "hidden", maxWidth: 120 }}>
                          <div
                            style={{
                              width: `${total ? Math.round((done / total) * 100) : 0}%`,
                              height: "100%",
                              background: progressFillColor(total ? done / total : 0),
                              borderRadius: 2,
                            }}
                          />
                        </div>
                      </td>
                      <td style={{ padding: "10px 14px" }}>
                        <div style={{ display: "flex", gap: 3 }}>
                          {assignees.map((pid) => {
                            const p = getPerson(pid);
                            return (
                              <div
                                key={pid}
                                style={{
                                  width: 18,
                                  height: 18,
                                  borderRadius: "50%",
                                  background: p.color,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: 7,
                                  fontWeight: 800,
                                  color: "#fff",
                                }}
                              >
                                {p.short}
                              </div>
                            );
                          })}
                        </div>
                      </td>
                      <td style={{ padding: "10px 14px", fontSize: 12, fontWeight: 600, color: deadlineTone(task.deadline) }}>{task.deadline}</td>
                      <td style={{ padding: "10px 14px" }}>
                        <Badge color={pr.color} bg={pr.bg}>
                          {pr.label}
                        </Badge>
                      </td>
                      <td style={{ padding: "10px 14px" }}>
                        <Badge color={st.color} bg={`${st.color}15`}>
                          {st.label}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
          {renderDetailPanel()}
        </div>
      )}
    </div>
  );
}

function AprobacionesView() {
  const [subTab, setSubTab] = useState("pendientes");
  const { approvalPending, enRev, orphanApprovals, pendingCount } = computePendingApprovalsUnion();
  const totalH = APPROVAL_HISTORY.length;
  const firstTimeRate = Math.round((APPROVAL_HISTORY.filter((h) => h.round === 1).length / totalH) * 100);
  const enRevSorted = [...enRev].sort((a, b) => a.id - b.id);

  const fullApprovalCard = (a) => {
    const br = getBrand(a.brand);
    const net = NETWORKS.find((n) => n.id === a.network);
    const person = getPerson(a.assignedTo);
    return (
      <Card key={`apv-${a.id}`} style={{ marginBottom: 12, borderLeft: a.status === "cambios" ? `4px solid ${B.warning}` : `4px solid ${B.info}` }}>
        <div style={{ display: "flex", gap: 16 }}>
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: 8,
              background: a.thumbnail.bg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              border: `1px solid ${B.border}`,
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 24, marginBottom: 4 }}>{a.type === "reel" ? "🎬" : a.type === "carrusel" ? "📸" : "📄"}</div>
              <div style={{ fontSize: 10, color: B.textMuted, fontWeight: 600 }}>{a.thumbnail.label}</div>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
              <span style={{ fontSize: 15, fontWeight: 700 }}>{a.title}</span>
              {a.status === "cambios" && (
                <Badge color={B.warning} bg={B.warningBg}>
                  Cambios pedidos
                </Badge>
              )}
              {a.status === "pendiente" && (
                <Badge color={B.info} bg={B.infoBg}>
                  Pendiente
                </Badge>
              )}
              <span style={{ fontSize: 11, color: B.textMuted }}>Ronda {a.round}</span>
            </div>
            <div style={{ display: "flex", gap: 6, marginBottom: 8, flexWrap: "wrap" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: br.color, flexShrink: 0, marginTop: 4 }} />
              <Badge color={br.color} bg={`${br.color}12`}>
                {br.name}
              </Badge>
              <Badge>
                {net?.icon} {net?.name}
              </Badge>
              <Badge>{a.type}</Badge>
              <Badge>📅 {a.date}</Badge>
            </div>
            <div style={{ fontSize: 12, color: B.textMuted, marginBottom: 4 }}>Campaña: {a.campaign}</div>
            <div style={{ background: B.surfaceHover, borderRadius: 8, padding: "10px 12px", marginBottom: 8 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: B.textMuted, marginBottom: 4 }}>Caption</div>
              <div style={{ fontSize: 12, lineHeight: 1.5, whiteSpace: "pre-line" }}>{a.caption}</div>
            </div>
            {a.feedback && (
              <div style={{ background: B.warningBg, borderRadius: 8, padding: "8px 12px", marginBottom: 8, border: `1px solid ${B.warning}20` }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: B.warning, marginBottom: 2 }}>Feedback anterior</div>
                <div style={{ fontSize: 12, color: B.text }}>{a.feedback}</div>
              </div>
            )}
            <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
              <Btn variant="success">Aprobar</Btn>
              <Btn variant="default">Pedir cambios</Btn>
              <Btn variant="danger">Rechazar</Btn>
              <div style={{ flex: 1 }} />
              <div style={{ fontSize: 11, color: B.textMuted }}>
                Enviado por {a.submittedBy} · Diseño: {person.name.split(" ")[0]}
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  };

  const simplifiedFromTaskCard = (task) => {
    const br = getBrand(task.brand);
    const person = getPerson(task.assignedTo);
    const camp = task.campaign != null ? CAMPAIGNS.find((c) => c.id === task.campaign) : null;
    return (
      <Card key={`tsk-apr-${task.id}`} style={{ marginBottom: 12, borderLeft: `4px solid ${B.warning}` }}>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>{task.title}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: br.color, flexShrink: 0 }} />
          <Badge color={br.color} bg={`${br.color}12`}>
            {br.name}
          </Badge>
          <Badge>{task.type}</Badge>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: person.color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 10,
              fontWeight: 800,
              color: "#fff",
              flexShrink: 0,
            }}
          >
            {person.short}
          </div>
          <span style={{ fontSize: 13, fontWeight: 600 }}>{person.name}</span>
        </div>
        {camp && <div style={{ fontSize: 12, color: B.textMuted, marginBottom: 6 }}>Campaña vinculada: {camp.name}</div>}
        <div style={{ fontSize: 12, color: B.textMuted, marginBottom: 12 }}>Deadline: {task.deadline}</div>
        <div
          style={{
            border: `1px dashed ${B.border}`,
            borderRadius: 8,
            padding: "14px 16px",
            marginBottom: 12,
            display: "flex",
            alignItems: "center",
            gap: 10,
            color: B.textMuted,
            fontSize: 12,
            background: B.surfaceHover,
          }}
        >
          <span style={{ fontSize: 16 }} aria-hidden="true">
            📎
          </span>
          <span>El equipo puede adjuntar archivos aquí</span>
        </div>
        <textarea
          placeholder="Caption pendiente — Diego puede agregarlo aquí"
          rows={4}
          style={{
            width: "100%",
            boxSizing: "border-box",
            border: `1px solid ${B.border}`,
            borderRadius: 8,
            padding: "10px 12px",
            fontSize: 12,
            fontFamily: font,
            marginBottom: 12,
            resize: "vertical",
            background: B.surface,
          }}
        />
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Btn variant="success">Aprobar</Btn>
          <Btn variant="default">Pedir cambios</Btn>
          <Btn variant="danger">Rechazar</Btn>
        </div>
      </Card>
    );
  };

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 16 }}>
        <Card>
          <div style={{ fontSize: 11, color: B.textMuted }}>Pendientes</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: pendingCount > 0 ? B.danger : B.success }}>{pendingCount}</div>
        </Card>
        <Card>
          <div style={{ fontSize: 11, color: B.textMuted }}>Aprobadas 1ra vez</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: B.info }}>{firstTimeRate}%</div>
        </Card>
        <Card>
          <div style={{ fontSize: 11, color: B.textMuted }}>Total aprobadas (mes)</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: B.success }}>{totalH}</div>
        </Card>
      </div>
      <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
        <Btn variant={subTab === "pendientes" ? "primary" : "default"} onClick={() => setSubTab("pendientes")} style={{ fontSize: 12 }}>
          Pendientes ({pendingCount})
        </Btn>
        <Btn variant={subTab === "historial" ? "primary" : "default"} onClick={() => setSubTab("historial")} style={{ fontSize: 12 }}>
          Historial
        </Btn>
      </div>
      {subTab === "pendientes" && (
        <div>
          {enRevSorted.map((task) => {
            const matched = approvalPending.find((a) => approvalMatchesTask(a, task));
            return matched ? fullApprovalCard(matched) : simplifiedFromTaskCard(task);
          })}
          {orphanApprovals.map((a) => fullApprovalCard(a))}
          <Card style={{ marginTop: 4, background: B.infoBg, border: `1px solid ${B.info}25` }}>
            <div style={{ fontSize: 13, color: B.text, lineHeight: 1.55 }}>
              {`💡 Las tareas aparecen aquí automáticamente cuando el equipo las mueve a 'En revisión' en el tablero de Tareas. Joaquín o Pablo aprueban, piden cambios, o rechazan. Si se piden cambios, la tarea vuelve a 'En progreso'.`}
            </div>
          </Card>
        </div>
      )}
      {subTab === "historial" && (
        <Card style={{ padding: 0, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: font }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${B.border}`, background: "#FAFAF8" }}>
                {["Pieza", "Marca", "Resultado", "Ronda", "Fecha", "Aprobado por"].map((h) => (
                  <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontWeight: 600, color: B.textMuted, fontSize: 12 }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {APPROVAL_HISTORY.map((h) => {
                const br = getBrand(h.brand);
                return (
                  <tr key={h.id} style={{ borderBottom: `1px solid ${B.border}` }}>
                    <td style={{ padding: "10px 14px", fontWeight: 600 }}>{h.title}</td>
                    <td style={{ padding: "10px 14px" }}>
                      <Badge color={br.color} bg={`${br.color}12`}>
                        {br.name}
                      </Badge>
                    </td>
                    <td style={{ padding: "10px 14px" }}>
                      <Badge color={B.success} bg={B.successBg}>
                        {h.result}
                      </Badge>
                    </td>
                    <td style={{ padding: "10px 14px" }}>
                      {h.round === 1 ? (
                        <Badge color={B.info} bg={B.infoBg}>
                          1ra vez
                        </Badge>
                      ) : (
                        <span style={{ color: B.textMuted }}>Ronda {h.round}</span>
                      )}
                    </td>
                    <td style={{ padding: "10px 14px", color: B.textMuted }}>{h.date}</td>
                    <td style={{ padding: "10px 14px" }}>{h.approvedBy}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}

function EquipoView(){const[subTab,setSubTab]=useState("rendimiento");const brandUnits=[{name:"Unidad Cheddar's",color:"#E74C3C",brands:BRANDS.filter(b=>b.unit==="Unidad Cheddar's")},{name:"Unidad Tori Sushi",color:"#2E86DE",brands:BRANDS.filter(b=>b.unit==="Unidad Tori Sushi")},{name:"Unidad Sweet/Burger",color:"#8E44AD",brands:BRANDS.filter(b=>b.unit==="Unidad Sweet/Burger")}];const standalone=BRANDS.filter(b=>b.unit==="—");return<div><div style={{display:"flex",gap:6,marginBottom:16}}>{[{id:"rendimiento",label:"Rendimiento"},{id:"carga",label:"Carga semanal"},{id:"cuentas",label:"Cuentas"}].map(s=><Btn key={s.id} variant={subTab===s.id?"primary":"default"} onClick={()=>setSubTab(s.id)} style={{fontSize:12}}>{s.label}</Btn>)}</div>{subTab==="rendimiento"&&<div style={{display:"grid",gridTemplateColumns:"repeat(5, 1fr)",gap:10}}>{TEAM.map(t=><Card key={t.id} style={{textAlign:"center"}}><div style={{width:44,height:44,borderRadius:"50%",background:t.color,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:16,color:"#fff",margin:"0 auto 8px"}}>{t.short}</div><div style={{fontSize:14,fontWeight:700}}>{t.name.split(" ")[0]}</div><div style={{fontSize:11,color:B.textMuted,marginBottom:10}}>{t.role}</div>{t.isExperience?<><div style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderTop:`1px solid ${B.border}`}}><span style={{fontSize:11,color:B.textMuted}}>Campañas</span><span style={{fontSize:13,fontWeight:700}}>{t.campaigns}</span></div><div style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderTop:`1px solid ${B.border}`}}><span style={{fontSize:11,color:B.textMuted}}>Entregas</span><span style={{fontSize:13,fontWeight:700}}>{t.completed}</span></div><div style={{marginTop:6}}><Badge color={B.success} bg={B.successBg}>Experiencia · Mod. 11</Badge></div></>:<><div style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderTop:`1px solid ${B.border}`}}><span style={{fontSize:11,color:B.textMuted}}>Completadas</span><span style={{fontSize:13,fontWeight:700}}>{t.completed}</span></div><div style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderTop:`1px solid ${B.border}`}}><span style={{fontSize:11,color:B.textMuted}}>% a tiempo</span><span style={{fontSize:13,fontWeight:700,color:t.onTime>=85?B.success:B.warning}}>{t.onTime}%</span></div><div style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderTop:`1px solid ${B.border}`}}><span style={{fontSize:11,color:B.textMuted}}>Aprob. 1ra</span><span style={{fontSize:13,fontWeight:700,color:t.approvedFirst>=80?B.success:B.warning}}>{t.approvedFirst}%</span></div><div style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderTop:`1px solid ${B.border}`}}><span style={{fontSize:11,color:B.textMuted}}>Rondas prom.</span><span style={{fontSize:13,fontWeight:700}}>{t.avgRounds}</span></div></>}</Card>)}</div>}{subTab==="carga"&&<Card><h3 style={{fontSize:14,fontWeight:700,marginBottom:14}}>Carga semanal — Semana 07-11 Abril</h3>{TEAM.map(t=>{const pct=loadPct(t.tasksWeek,t.capacityWeek);const c=loadColor(pct);const myTasks=TASKS.filter(tk=>tk.assignedTo===t.id&&tk.status!=="completada");return<div key={t.id} style={{padding:"12px 0",borderBottom:`1px solid ${B.border}`}}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}><div style={{width:28,height:28,borderRadius:"50%",background:t.color,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:10,color:"#fff",flexShrink:0}}>{t.short}</div><div style={{flex:1}}><span style={{fontSize:13,fontWeight:700}}>{t.name}</span><span style={{fontSize:11,color:B.textMuted,marginLeft:8}}>{t.role}</span></div><div style={{width:100,height:8,background:B.surfaceHover,borderRadius:4,overflow:"hidden"}}><div style={{width:`${Math.min(pct,100)}%`,height:"100%",background:c,borderRadius:4}}/></div><Badge color={c} bg={`${c}15`}>{t.tasksWeek}/{t.capacityWeek} ({pct}%)</Badge></div>{myTasks.length>0&&<div style={{marginLeft:38,display:"flex",gap:4,flexWrap:"wrap"}}>{myTasks.map(tk=><span key={tk.id} style={{fontSize:10,padding:"2px 8px",borderRadius:6,background:`${getBrand(tk.brand).color}10`,color:getBrand(tk.brand).color,fontWeight:600}}>{tk.title}</span>)}</div>}</div>})}</Card>}{subTab==="cuentas"&&<div><div style={{fontSize:13,fontWeight:700,color:B.textMuted,marginBottom:10}}>Marcas propias — 3 unidades</div><div style={{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:12,marginBottom:16}}>{brandUnits.map(unit=><Card key={unit.name} style={{borderLeft:`4px solid ${unit.color}`}}><div style={{fontSize:14,fontWeight:700,marginBottom:10}}>{unit.name}</div>{unit.brands.map(br=><div key={br.id} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderTop:`1px solid ${B.border}`}}><div style={{width:8,height:8,borderRadius:"50%",background:br.active?br.color:B.textLight}}/><span style={{fontSize:12,fontWeight:600,flex:1,color:br.active?B.text:B.textLight}}>{br.name}</span>{!br.active&&<Badge color={B.textLight} bg={B.surfaceHover}>Pausada</Badge>}</div>)}</Card>)}</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>{standalone.map(br=><Card key={br.id} style={{borderLeft:`4px solid ${br.color}`,opacity:br.active?1:0.6}}><div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:14,fontWeight:700}}>{br.name}</span>{br.type==="externo"&&<Badge color={B.success} bg={B.successBg}>Cliente externo</Badge>}{!br.active&&<Badge color={B.textLight} bg={B.surfaceHover}>Pausada</Badge>}</div>{br.id==="samai"&&<div style={{fontSize:12,color:B.textMuted,marginTop:6}}>Clínica dental · IG · Gestión RRSS completa</div>}{br.id==="bigfat"&&<div style={{fontSize:12,color:B.textLight,marginTop:6}}>Marca shelveada — canales Slack creados, sin actividad</div>}</Card>)}</div></div>}</div>}

function BibliotecaView() {
  const [typeFilter, setTypeFilter] = useState("todos");
  const [search, setSearch] = useState("");
  const [expandedBrands, setExpandedBrands] = useState([]);

  let items = LIBRARY;
  if (typeFilter !== "todos") items = items.filter((i) => i.type === typeFilter);
  const q = search.trim().toLowerCase();
  if (q) items = items.filter((i) => i.title.toLowerCase().includes(q));

  const toggleBrand = (id) => {
    setExpandedBrands((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const typeIcon = (t) => (t === "reel" ? "🎬" : t === "carrusel" ? "📸" : t === "historia" ? "📱" : "📄");
  const typeLabel = (t) => CONTENT_TYPES.find((c) => c.id === t)?.name ?? t;

  const pieceCard = (item) => (
    <Card key={item.id} style={{ padding: 0, overflow: "hidden", background: B.surface }}>
      <div style={{ height: 120, background: item.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 28, marginBottom: 4 }}>{typeIcon(item.type)}</div>
          <div style={{ fontSize: 10, color: B.textMuted, fontWeight: 600 }}>{typeLabel(item.type)}</div>
        </div>
      </div>
      <div style={{ padding: "10px 14px" }}>
        <div style={{ fontSize: 12, fontWeight: 600, lineHeight: 1.3, marginBottom: 6 }}>{item.title}</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 10, color: B.textMuted, fontWeight: 600 }}>{typeLabel(item.type)}</span>
          <span style={{ fontSize: 10, color: B.textMuted }}>{item.date}</span>
        </div>
      </div>
    </Card>
  );

  const sections = [
    { label: "Unidad Cheddar's", match: (b) => b.unit === "Unidad Cheddar's" && b.type !== "externo" },
    { label: "Unidad Tori Sushi", match: (b) => b.unit === "Unidad Tori Sushi" && b.type !== "externo" },
    { label: "Unidad Sweet/Burger", match: (b) => b.unit === "Unidad Sweet/Burger" && b.type !== "externo" },
    { label: "Clientes externos", match: (b) => b.type === "externo" },
  ];

  const brandIdsWithItems = new Set(items.map((i) => i.brand));

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
        <input
          type="search"
          placeholder="Buscar por título…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "8px 12px",
            border: `1px solid ${B.border}`,
            borderRadius: 8,
            fontSize: 13,
            fontFamily: font,
            background: B.surface,
            minWidth: 200,
            flex: "1 1 200px",
            maxWidth: 320,
          }}
        />
        <Select
          value={typeFilter}
          onChange={setTypeFilter}
          options={[{ value: "todos", label: "Todos los tipos" }, ...CONTENT_TYPES.map((t) => ({ value: t.id, label: t.name }))]}
        />
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: 12, color: B.textMuted, alignSelf: "center", fontWeight: 600 }}>{items.length} piezas</span>
      </div>

      {items.length === 0 && (
        <Card style={{ textAlign: "center", padding: 40 }}>
          <div style={{ fontSize: 13, color: B.textMuted }}>Sin piezas con estos filtros</div>
        </Card>
      )}

      {sections.map((sec, si) => {
        const brandsInSection = activeBrands.filter((b) => sec.match(b) && brandIdsWithItems.has(b.id));
        if (brandsInSection.length === 0) return null;
        const prevHad = sections.slice(0, si).some((s) => activeBrands.some((b) => s.match(b) && brandIdsWithItems.has(b.id)));
        return (
          <div key={sec.label}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: B.textMuted,
                textTransform: "uppercase",
                letterSpacing: 1,
                marginTop: prevHad ? 20 : 0,
                marginBottom: 8,
              }}
            >
              {sec.label}
            </div>
            {brandsInSection.map((b) => {
              const isOpen = expandedBrands.includes(b.id);
              const brandItems = items.filter((i) => i.brand === b.id);
              const count = brandItems.length;
              return (
                <div key={b.id} style={{ marginBottom: 10 }}>
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => toggleBrand(b.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleBrand(b.id);
                      }
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      background: isOpen ? B.surfaceHover : B.surface,
                      border: `1px solid ${B.border}`,
                      borderRadius: isOpen ? "10px 10px 0 0" : 10,
                      borderBottom: isOpen ? "none" : `1px solid ${B.border}`,
                      padding: "12px 16px",
                      cursor: "pointer",
                      fontFamily: font,
                    }}
                    onMouseEnter={(e) => {
                      if (!isOpen) e.currentTarget.style.background = B.surfaceHover;
                    }}
                    onMouseLeave={(e) => {
                      if (!isOpen) e.currentTarget.style.background = B.surface;
                    }}
                  >
                    <span style={{ fontSize: 18, lineHeight: 1 }}>{isOpen ? "📂" : "📁"}</span>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: b.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 14, fontWeight: 700, color: B.text, flex: 1 }}>{b.name}</span>
                    <Badge color={B.textMuted} bg={B.surfaceHover}>
                      {count} {count === 1 ? "pieza" : "piezas"}
                    </Badge>
                    {b.type === "externo" && (
                      <Badge color={B.success} bg={B.successBg}>
                        Cliente externo
                      </Badge>
                    )}
                    <span style={{ fontSize: 12, color: B.textMuted, width: 18, textAlign: "center" }}>{isOpen ? "▼" : "▶"}</span>
                  </div>
                  {isOpen && (
                    <div
                      style={{
                        background: B.surfaceHover,
                        padding: "12px 16px",
                        borderRadius: "0 0 10px 10px",
                        border: `1px solid ${B.border}`,
                        borderTop: "none",
                      }}
                    >
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>{brandItems.map(pieceCard)}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

function MetricasView() {
  const [subTab, setSubTab] = useState("rrss");
  const [sortAccountsBy, setSortAccountsBy] = useState("followers");

  const fmtNum = (n) => n.toLocaleString("es-CL");

  const engagementColor = (rate) => {
    if (rate >= 6) return B.success;
    if (rate >= 4) return B.warning;
    return B.danger;
  };

  const totalFollowers = SOCIAL_ACCOUNTS.reduce((s, a) => s + a.followers, 0);
  const accountCount = SOCIAL_ACCOUNTS.length;
  const totalGrowth = SOCIAL_ACCOUNTS.reduce((s, a) => s + (a.followers - a.followersLastMonth), 0);
  const baseLast = SOCIAL_ACCOUNTS.reduce((s, a) => s + a.followersLastMonth, 0);
  const growthPct = baseLast > 0 ? (totalGrowth / baseLast) * 100 : 0;

  const totalPosts = SOCIAL_ACCOUNTS.reduce((s, a) => s + a.postsMonth, 0);
  const weightedEng =
    totalPosts > 0
      ? SOCIAL_ACCOUNTS.reduce((s, a) => s + a.engagementRate * a.postsMonth, 0) / totalPosts
      : 0;

  const reachMonthTotal = SOCIAL_ACCOUNTS.reduce((s, a) => s + a.reachAvg * a.postsMonth, 0);

  const sortedAccounts = [...SOCIAL_ACCOUNTS].sort((a, b) =>
    sortAccountsBy === "followers" ? b.followers - a.followers : b.engagementRate - a.engagementRate
  );

  const topPostsSorted = [...TOP_POSTS].sort((a, b) => b.engagement - a.engagement);

  const maxBenchReach = Math.max(...CONTENT_BENCHMARK.map((b) => b.avgReach), 1);
  const maxBenchEng = Math.max(...CONTENT_BENCHMARK.map((b) => b.avgEngagement), 1);
  const bestEngIdx = CONTENT_BENCHMARK.reduce((bi, b, i, arr) => (b.avgEngagement > arr[bi].avgEngagement ? i : bi), 0);

  const subTabs = [
    { id: "rrss", label: "RRSS" },
    { id: "benchmark", label: "Benchmark" },
  ];

  return (
    <div>
      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
        {subTabs.map((t) => (
          <Btn key={t.id} variant={subTab === t.id ? "primary" : "default"} onClick={() => setSubTab(t.id)} style={{ fontSize: 12 }}>
            {t.label}
          </Btn>
        ))}
      </div>

      {subTab === "rrss" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 18 }}>
            <Card>
              <div style={{ fontSize: 11, color: B.textMuted, fontWeight: 600 }}>Total followers</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: B.text }}>{fmtNum(totalFollowers)}</div>
              <div style={{ fontSize: 11, color: B.textMuted }}>en {accountCount} cuentas</div>
            </Card>
            <Card>
              <div style={{ fontSize: 11, color: B.textMuted, fontWeight: 600 }}>Crecimiento mes</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: totalGrowth >= 0 ? B.success : B.danger }}>
                {totalGrowth >= 0 ? "+" : ""}
                {fmtNum(totalGrowth)}
              </div>
              <div style={{ fontSize: 11, color: totalGrowth >= 0 ? B.success : B.danger }}>
                {growthPct >= 0 ? "+" : ""}
                {growthPct.toFixed(1)}% vs mes anterior
              </div>
            </Card>
            <Card>
              <div style={{ fontSize: 11, color: B.textMuted, fontWeight: 600 }}>Engagement rate prom.</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: B.text }}>{weightedEng.toFixed(1)}%</div>
              <div style={{ fontSize: 11, color: B.textMuted }}>ponderado por posts</div>
            </Card>
            <Card>
              <div style={{ fontSize: 11, color: B.textMuted, fontWeight: 600 }}>Alcance total mes</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: B.text }}>{fmtNum(reachMonthTotal)}</div>
              <div style={{ fontSize: 11, color: B.textMuted }}>Σ alcance × posts</div>
            </Card>
          </div>

          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10, flexWrap: "wrap" }}>
            <span style={{ fontSize: 12, color: B.textMuted, fontWeight: 600 }}>Ordenar cuentas:</span>
            <Btn variant={sortAccountsBy === "followers" ? "primary" : "default"} style={{ fontSize: 12 }} onClick={() => setSortAccountsBy("followers")}>
              Seguidores
            </Btn>
            <Btn variant={sortAccountsBy === "engagement" ? "primary" : "default"} style={{ fontSize: 12 }} onClick={() => setSortAccountsBy("engagement")}>
              Engagement
            </Btn>
          </div>

          <Card style={{ padding: 0, overflow: "hidden", marginBottom: 18 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: font }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${B.border}`, background: "#FAFAF8" }}>
                  {["Marca", "Red", "Handle", "Followers", "Crecimiento", "Posts/mes", "Alcance prom.", "Engagement", "Mejor día/hora"].map((h) => (
                    <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontWeight: 600, color: B.textMuted, fontSize: 11 }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sortedAccounts.map((a) => {
                  const br = getBrand(a.brand);
                  const net = NETWORKS.find((n) => n.id === a.network);
                  const delta = a.followers - a.followersLastMonth;
                  const pct = a.followersLastMonth > 0 ? (delta / a.followersLastMonth) * 100 : null;
                  const isNew = a.followersLastMonth === 0;
                  return (
                    <tr key={a.id} style={{ borderBottom: `1px solid ${B.border}` }}>
                      <td style={{ padding: "10px 12px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div style={{ width: 8, height: 8, borderRadius: "50%", background: br.color, flexShrink: 0 }} />
                          <span style={{ fontWeight: 600 }}>{br.name}</span>
                          {isNew && (
                            <Badge color={B.info} bg={B.infoBg}>
                              Nueva
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td style={{ padding: "10px 12px" }}>{net?.icon}</td>
                      <td style={{ padding: "10px 12px", color: B.textMuted }}>{a.handle}</td>
                      <td style={{ padding: "10px 12px", fontWeight: 700 }}>{fmtNum(a.followers)}</td>
                      <td style={{ padding: "10px 12px" }}>
                        {!isNew && (
                          <Badge color={delta >= 0 ? B.success : B.danger} bg={delta >= 0 ? B.successBg : B.dangerBg}>
                            {delta >= 0 ? "+" : ""}
                            {fmtNum(delta)} ({pct >= 0 ? "+" : ""}
                            {pct != null ? pct.toFixed(1) : 0}%)
                          </Badge>
                        )}
                        {isNew && <span style={{ color: B.textLight }}>—</span>}
                      </td>
                      <td style={{ padding: "10px 12px" }}>{a.postsMonth}</td>
                      <td style={{ padding: "10px 12px" }}>{fmtNum(a.reachAvg)}</td>
                      <td style={{ padding: "10px 12px" }}>
                        <span style={{ fontWeight: 700, color: engagementColor(a.engagementRate) }}>{a.engagementRate}%</span>
                      </td>
                      <td style={{ padding: "10px 12px", color: B.textMuted, fontSize: 11 }}>
                        {a.bestDay} · {a.bestHour}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>

          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>Top posts del mes</h3>
          <Card style={{ padding: 0, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: font }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${B.border}`, background: "#FAFAF8" }}>
                  {["Post", "Marca", "Red", "Tipo", "Fecha", "Alcance", "Likes", "Comments", "Shares", "Engagement"].map((h) => (
                    <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontWeight: 600, color: B.textMuted, fontSize: 11 }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {topPostsSorted.map((p) => {
                  const br = getBrand(p.brand);
                  const net = NETWORKS.find((n) => n.id === p.network);
                  const typeName = CONTENT_TYPES.find((t) => t.id === p.type)?.name ?? p.type;
                  return (
                    <tr
                      key={p.id}
                      style={{ borderBottom: `1px solid ${B.border}` }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = B.surfaceHover;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <td style={{ padding: "10px 12px", fontWeight: 600, maxWidth: 200 }}>{p.title}</td>
                      <td style={{ padding: "10px 12px" }}>
                        <Badge color={br.color} bg={`${br.color}12`}>
                          {br.name}
                        </Badge>
                      </td>
                      <td style={{ padding: "10px 12px" }}>{net?.icon}</td>
                      <td style={{ padding: "10px 12px" }}>{typeName}</td>
                      <td style={{ padding: "10px 12px", color: B.textMuted }}>{p.date}</td>
                      <td style={{ padding: "10px 12px" }}>{fmtNum(p.reach)}</td>
                      <td style={{ padding: "10px 12px" }}>{fmtNum(p.likes)}</td>
                      <td style={{ padding: "10px 12px" }}>{fmtNum(p.comments)}</td>
                      <td style={{ padding: "10px 12px" }}>{fmtNum(p.shares)}</td>
                      <td style={{ padding: "10px 12px", fontWeight: 700, color: engagementColor(p.engagement) }}>{p.engagement}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        </div>
      )}

      {subTab === "benchmark" && (
        <div>
          <p style={{ fontSize: 13, color: B.textMuted, marginBottom: 16, lineHeight: 1.5 }}>
            ¿Qué tipo de contenido funciona mejor? Comparativa por formato y red.
          </p>
          <Card style={{ padding: 0, overflow: "hidden", marginBottom: 14 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: font }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${B.border}`, background: "#FAFAF8" }}>
                  {["Tipo", "Red", "Posts", "Alcance prom.", "Rel. alcance", "Engagement", "Rel. engagement", "Likes prom."].map((h) => (
                    <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontWeight: 600, color: B.textMuted, fontSize: 11 }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CONTENT_BENCHMARK.map((row, idx) => {
                  const typeName = CONTENT_TYPES.find((t) => t.id === row.type)?.name ?? row.type;
                  const net = NETWORKS.find((n) => n.id === row.network);
                  const reachW = (row.avgReach / maxBenchReach) * 100;
                  const engW = (row.avgEngagement / maxBenchEng) * 100;
                  const highlight = idx === bestEngIdx;
                  return (
                    <tr
                      key={`${row.type}-${row.network}`}
                      style={{
                        borderBottom: `1px solid ${B.border}`,
                        background: highlight ? B.successBg : "transparent",
                      }}
                    >
                      <td style={{ padding: "10px 12px", fontWeight: 600 }}>{typeName}</td>
                      <td style={{ padding: "10px 12px" }}>{net?.icon}</td>
                      <td style={{ padding: "10px 12px" }}>{row.count}</td>
                      <td style={{ padding: "10px 12px", minWidth: 100 }}>{fmtNum(row.avgReach)}</td>
                      <td style={{ padding: "10px 12px", width: 120 }}>
                        <div style={{ height: 8, background: B.surfaceHover, borderRadius: 4, overflow: "hidden" }}>
                          <div style={{ width: `${reachW}%`, height: "100%", background: B.info, borderRadius: 4 }} />
                        </div>
                      </td>
                      <td style={{ padding: "10px 12px" }}>{row.avgEngagement}%</td>
                      <td style={{ padding: "10px 12px", width: 120 }}>
                        <div style={{ height: 8, background: B.surfaceHover, borderRadius: 4, overflow: "hidden" }}>
                          <div style={{ width: `${engW}%`, height: "100%", background: B.success, borderRadius: 4 }} />
                        </div>
                      </td>
                      <td style={{ padding: "10px 12px" }}>{fmtNum(row.avgLikes)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
          <Card>
            <div style={{ fontSize: 13, fontWeight: 700, color: B.text, lineHeight: 1.5 }}>
              Hallazgo: Los Reels en TikTok tienen 3.2x más alcance y 2x más engagement que los carruseles en IG. Priorizar video corto para
              campañas de awareness.
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

export default function MarketingModule(){const[tab,setTab]=useState("dashboard");const[isMobile,setIsMobile]=useState(false);const[efemerides,setEfemerides]=useState(()=>EFEMERIDES.map((e)=>({...e,brands:[...e.brands]})));const[efemeridesPanelOpen,setEfemeridesPanelOpen]=useState(false);const onNavigate=(tid,opts)=>{setTab(tid);if(opts?.openEfemerides)setEfemeridesPanelOpen(true)};useEffect(()=>{if(tab!=="calendario")setEfemeridesPanelOpen(false)},[tab]);useEffect(()=>{function check(){setIsMobile(window.innerWidth<900)}check();window.addEventListener("resize",check);return()=>window.removeEventListener("resize",check)},[]);const pendingApprovals=computePendingApprovalsUnion().pendingCount;const TABS=[{id:"dashboard",label:"Tablero",icon:"📊"},{id:"calendario",label:"Calendario",icon:"📅"},{id:"campanas",label:"Campañas",icon:"📣"},{id:"tareas",label:"Tareas",icon:"✅"},{id:"aprobaciones",label:"Aprobaciones",icon:"👁️",badge:pendingApprovals,badgeColor:B.dangerBg,badgeTextColor:B.danger},{id:"equipo",label:"Equipo",icon:"👥"},{id:"biblioteca",label:"Biblioteca",icon:"📂"},{id:"metricas",label:"Métricas",icon:"📈"}];return<div style={{fontFamily:font,background:"#F5F4F0",minHeight:"100vh"}}><style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&family=DM+Serif+Display&display=swap');*{box-sizing:border-box;margin:0;padding:0}input:focus,select:focus{outline:none;border-color:${B.accent} !important}::-webkit-scrollbar{width:5px;height:5px}::-webkit-scrollbar-thumb{background:#d4d2cd;border-radius:3px}`}</style><header style={{background:B.surface,borderBottom:`1px solid ${B.border}`,position:"sticky",top:0,zIndex:100}}><div style={{padding:"0 24px",height:52,display:"flex",alignItems:"center",justifyContent:"space-between"}}><div style={{display:"flex",alignItems:"center",gap:10}}><div style={{width:32,height:32,background:B.accent,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:16,color:B.primary,fontFamily:serif}}>C</div><div style={{lineHeight:1.1}}><div style={{fontFamily:serif,fontSize:14,fontWeight:700,color:B.text}}>Cheddar's</div><div style={{fontSize:9,color:B.textMuted,fontWeight:500,letterSpacing:1.5,textTransform:"uppercase"}}>West Coast</div></div></div><div style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:16,cursor:"pointer"}}>🔔</span><div style={{width:30,height:30,borderRadius:"50%",background:B.accent,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:12,color:B.primary}}>PF</div></div></div>{!isMobile&&<div style={{padding:"0 24px",display:"flex",gap:2,borderTop:`1px solid ${B.border}`,height:40,alignItems:"center"}}>{["Dashboard","Inventario","Compras","Pedidos","Despacho","Producción","Calidad","Finanzas","Comercial","Marketing","Más"].map(n=><span key={n} style={{padding:"6px 11px",fontSize:13,fontWeight:n==="Marketing"?650:500,color:n==="Marketing"?B.text:B.textMuted,borderBottom:n==="Marketing"?`2px solid ${B.accent}`:"2px solid transparent",cursor:"pointer"}}>{n}</span>)}</div>}</header><main style={{padding:isMobile?16:"20px 32px",maxWidth:1320,margin:"0 auto"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}><div><h1 style={{fontSize:isMobile?20:24,fontWeight:800,color:B.text,fontFamily:serif}}>📣 Marketing Operativo</h1><p style={{fontSize:13,color:B.textMuted,marginTop:2}}>{activeBrands.length} cuentas activas · 5 personas · IG + TikTok</p></div></div><TabBar tabs={TABS} active={tab} onChange={setTab}/>{tab==="dashboard"&&<DashboardView efemerides={efemerides} onNavigate={onNavigate} />}{tab==="calendario"&&<CalendarioView efemerides={efemerides} setEfemerides={setEfemerides} efemeridesPanelOpen={efemeridesPanelOpen} setEfemeridesPanelOpen={setEfemeridesPanelOpen} />}{tab==="campanas"&&<CampanasView/>}{tab==="tareas"&&<TareasView/>}{tab==="aprobaciones"&&<AprobacionesView/>}{tab==="equipo"&&<EquipoView/>}{tab==="biblioteca"&&<BibliotecaView/>}{tab==="metricas"&&<MetricasView/>}</main></div>}
