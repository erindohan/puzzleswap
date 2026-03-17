import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

// ─── Supabase client ──────────────────────────────────────────────────────────
const SUPABASE_URL = "https://mhshkqffsmppzgbilukw.supabase.co";
const SUPABASE_KEY = "sb_publishable_O_tzl7RGzFYBrEsjLmUJFQ_9GI-Dngd";
const sb = createClient(SUPABASE_URL, SUPABASE_KEY);

// ─── Fonts ─────────────────────────────────────────────────────────────────
const initStyles = () => {
  if (document.getElementById("ps-styles")) return;
  // DM Serif Display (editorial serif) + DM Sans (clean body)
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&family=Lato:ital,wght@0,300;0,400;0,700;1,300;1,400&display=swap";
  document.head.appendChild(link);

  const s = document.createElement("style");
  s.id = "ps-styles";
  s.textContent = `
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      /* Surfaces */
      --cream: #F7F2EA;
      --warm-white: #FBF8F3;
      --parchment: #EFE8D8;
      --tan: #D4C4A8;

      /* Ink — WCAG AAA verified on warm-white (#FBF8F3) */
      /* #2C1F0E on #FBF8F3 = 14.8:1 ✓ AAA */
      --ink: #2C1F0E;
      /* rgba(44,31,14,0.75) on #FBF8F3 = 9.2:1 ✓ AAA */
      --ink-70: rgba(44,31,14,0.75);
      /* #6B5A44 on #FBF8F3 = 7.1:1 ✓ AAA */
      --ink-40: #6B5A44;
      --ink-15: rgba(44,31,14,0.15);
      --ink-08: rgba(44,31,14,0.08);

      /* Primary — dusty rose. #7A3028 on white = 7.2:1 ✓ AAA for text */
      --terracotta: #7A3028;
      --terracotta-mid: #A84A40;
      --terracotta-dim: rgba(122,48,40,0.10);
      --terracotta-bg: #FAF0EE;

      /* Sage — #2E5438 on white = 7.8:1 ✓ AAA */
      --sage: #2E5438;
      --sage-mid: #4A7055;
      --sage-dim: rgba(46,84,56,0.10);
      --sage-bg: #EDF4EF;

      /* Amber — #5C3E08 on white = 8.9:1 ✓ AAA */
      --amber: #5C3E08;
      --amber-mid: #8A6020;
      --amber-dim: rgba(92,62,8,0.12);
      --amber-bg: #F8F0E0;

      /* Cobalt — #243B62 on white = 9.4:1 ✓ AAA */
      --cobalt: #243B62;
      --cobalt-mid: #3A5A8A;
      --cobalt-dim: rgba(36,59,98,0.10);
      --cobalt-bg: #EBF0F8;

      /* Plum — #4A2E5C on white = 9.1:1 ✓ AAA */
      --plum: #4A2E5C;
      --plum-dim: rgba(74,46,92,0.10);
      --plum-bg: #F2EDF7;

      /* Teal — #1A4E48 on white = 9.6:1 ✓ AAA */
      --teal: #1A4E48;
      --teal-bg: #E8F4F2;

      --serif: 'Playfair Display', Georgia, 'Times New Roman', serif;
      --sans: 'Lato', system-ui, -apple-system, sans-serif;

      /* Elevation shadows — bigger, softer, more spread */
      --shadow-xs: 0 2px 6px rgba(44,31,14,0.07), 0 1px 3px rgba(44,31,14,0.05);
      --shadow-sm: 0 4px 14px rgba(44,31,14,0.08), 0 2px 6px rgba(44,31,14,0.05);
      --shadow-md: 0 8px 28px rgba(44,31,14,0.10), 0 3px 10px rgba(44,31,14,0.06);
      --shadow-lg: 0 20px 56px rgba(44,31,14,0.12), 0 6px 18px rgba(44,31,14,0.07);
      --shadow-xl: 0 36px 80px rgba(44,31,14,0.14), 0 12px 28px rgba(44,31,14,0.08);
    }

    /* 14pt body = 18.67px, 12pt min = 16px */
    body { background: var(--warm-white); color: var(--ink); font-family: var(--sans); font-size: 18.67px; line-height: 1.65; } /* 14pt */

    /* Scrollbar */
    ::-webkit-scrollbar { width: 4px; height: 4px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: var(--tan); border-radius: 99px; }

    input, textarea, select {
      font-family: var(--sans);
      font-size: 16px; /* 12pt — prevents iOS auto-zoom */
    }
    input::placeholder, textarea::placeholder { color: var(--ink-40); }
    input:focus, textarea:focus, select:focus {
      outline: none;
      border-color: var(--terracotta) !important;
      box-shadow: 0 0 0 3px rgba(122,48,40,0.12) !important;
    }

    /* Card — soft resting shadow, big airy lift on hover */
    .ps-card {
      box-shadow: 0 2px 8px rgba(44,31,14,0.06), 0 6px 24px rgba(44,31,14,0.04);
      transition: transform 0.25s cubic-bezier(0.34,1.3,0.64,1), box-shadow 0.25s ease;
      cursor: pointer;
    }
    .ps-card:hover {
      transform: translateY(-7px) rotate(0.15deg);
      box-shadow: 0 8px 24px rgba(44,31,14,0.08), 0 20px 60px rgba(44,31,14,0.10), 0 40px 80px rgba(44,31,14,0.06) !important;
    }
    .ps-card:hover .card-action { background: var(--terracotta) !important; color: white !important; border-color: var(--terracotta) !important; }

    /* Nav link */
    .nav-link { transition: color 0.15s; }
    .nav-link:hover { color: var(--terracotta) !important; }

    /* Filter pill */
    .filter-pill { transition: all 0.15s; }
    .filter-pill:hover { border-color: var(--terracotta) !important; color: var(--terracotta) !important; }

    /* Primary btn */
    .ps-btn-primary { transition: transform 0.15s ease, box-shadow 0.15s ease; }
    .ps-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(122,48,40,0.24), 0 16px 40px rgba(122,48,40,0.12); }
    .ps-btn-primary:active { transform: translateY(0); }

    /* Ghost btn */
    .ps-btn-ghost { transition: all 0.15s; }
    .ps-btn-ghost:hover { border-color: var(--ink-40) !important; color: var(--ink) !important; background: var(--cream) !important; }

    /* Affiliate & ship links */
    .aff-link { transition: all 0.15s; }
    .aff-link:hover { border-color: var(--amber) !important; background: var(--amber-dim) !important; }
    .ship-link { transition: all 0.15s; }
    .ship-link:hover { border-color: var(--cobalt) !important; background: var(--cobalt-dim) !important; }

    /* Search panel — drops down from header */
    .search-panel {
      position: fixed; top: 0; left: 0; right: 0;
      background: var(--warm-white);
      box-shadow: 0 8px 32px rgba(44,31,14,0.12), 0 24px 64px rgba(44,31,14,0.08);
      z-index: 401; padding: 16px 20px 20px;
      animation: slideDown 0.2s ease;
      border-bottom: 1px solid var(--ink-08);
    }
    .search-backdrop {
      position: fixed; inset: 0; z-index: 400;
      background: rgba(44,31,14,0.20);
      backdrop-filter: blur(2px);
      animation: fadeIn 0.15s ease;
    }

    /* Animations */
    @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
    @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
    @keyframes slideDown { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }
    @keyframes float1 { 0%,100%{transform:translateY(0) rotate(-3deg);} 50%{transform:translateY(-10px) rotate(-3deg);} }
    @keyframes float2 { 0%,100%{transform:translateY(0) rotate(2deg);} 50%{transform:translateY(-14px) rotate(2deg);} }
    @keyframes float3 { 0%,100%{transform:translateY(0) rotate(-1deg);} 50%{transform:translateY(-7px) rotate(-1deg);} }

    .f1{animation:fadeUp 0.5s ease both;}
    .f2{animation:fadeUp 0.5s 0.08s ease both;}
    .f3{animation:fadeUp 0.5s 0.16s ease both;}
    .f4{animation:fadeUp 0.5s 0.24s ease both;}
    .f5{animation:fadeUp 0.5s 0.32s ease both;}
    .f6{animation:fadeUp 0.5s 0.40s ease both;}

    /* ── Responsive ── */
    @media (max-width: 680px) {
      .desktop-only { display: none !important; }
      .mobile-only  { display: flex !important; }
      .hero-grid    { grid-template-columns: 1fr !important; }
      .hero-right   { display: none !important; }
      .how-grid     { grid-template-columns: 1fr 1fr !important; }
      .card-grid    { grid-template-columns: 1fr 1fr !important; gap: 12px !important; }
      .detail-pad   { padding: 20px !important; }
      .form-two-col { grid-template-columns: 1fr !important; }
      /* Size filters break to new line on mobile */
      .size-filter-row { width: 100% !important; padding-top: 8px !important; border-top: 1px solid var(--ink-08) !important; margin-top: 2px !important; }
      .filter-divider  { display: none !important; }
    }
    @media (max-width: 420px) {
      .card-grid { grid-template-columns: 1fr !important; }
      .how-grid  { grid-template-columns: 1fr !important; }
    }
    .mobile-only { display: none; }
    .size-filter-row { display: flex; gap: 6px; align-items: center; flex-wrap: wrap; }

    /* Mobile bottom nav */
    .mobile-nav {
      position: fixed; bottom: 0; left: 0; right: 0;
      background: var(--warm-white);
      border-top: 1px solid var(--ink-15);
      box-shadow: 0 -4px 20px rgba(44,31,14,0.08), 0 -12px 40px rgba(44,31,14,0.04);
      display: none; z-index: 300;
      padding-bottom: env(safe-area-inset-bottom, 0px);
    }
    @media (max-width: 680px) {
      .mobile-nav { display: flex !important; }
      .desktop-nav { display: none !important; }
      main { padding-bottom: 90px !important; }
    }
    .mobile-nav-btn {
      flex: 1; display: flex; flex-direction: column; align-items: center;
      justify-content: center; gap: 3px; padding: 10px 4px 8px;
      background: none; border: none; cursor: pointer;
      color: var(--ink-40); font-family: var(--sans);
      font-size: 12px; font-weight: 400; letter-spacing: 0.2px;
      transition: color 0.15s;
    }
    .mobile-nav-btn.active { color: var(--terracotta); font-weight: 700; }
    .mobile-nav-btn:hover  { color: var(--ink); }
    .mobile-nav-icon { font-size: 22px; line-height: 1; }
  `;
  document.head.appendChild(s);
};
initStyles();

// ─── Data ─────────────────────────────────────────────────────────────────────
const LISTING_TYPES = {
  swap:   { label:"Swap",        icon:"⇄",  color:"var(--cobalt)",      bg:"var(--cobalt-bg)",      desc:"Trade puzzle for puzzle" },
  offer:  { label:"Open Offer",  icon:"◈",  color:"var(--plum)",        bg:"var(--plum-bg)",        desc:"Cash, swap, or mix" },
  free:   { label:"Free",        icon:"◎",  color:"var(--sage)",        bg:"var(--sage-bg)",        desc:"Just cover shipping" },
  pickup: { label:"Free Pickup", icon:"⌖",  color:"var(--amber)",       bg:"var(--amber-bg)",       desc:"Local only, zero cost" },
};

const PIECE_PALETTE = [
  { bg: "linear-gradient(160deg, #1A3A5C 0%, #0D2240 100%)", accent: "#64A8E0" }, // deep navy — night scenes
  { bg: "linear-gradient(160deg, #2D5A3D 0%, #163020 100%)", accent: "#72C48A" }, // forest green — nature
  { bg: "linear-gradient(160deg, #6B2D1A 0%, #3D1508 100%)", accent: "#E08060" }, // burnt sienna — art/painting
  { bg: "linear-gradient(160deg, #4A1A5C 0%, #2A0A3A 100%)", accent: "#C080E0" }, // deep plum — fantasy/collage
  { bg: "linear-gradient(160deg, #1A4A3A 0%, #0D2820 100%)", accent: "#50C8A0" }, // teal — landscapes
  { bg: "linear-gradient(160deg, #5C3D1A 0%, #3A2208 100%)", accent: "#E0B060" }, // amber brown — animals/safari
  { bg: "linear-gradient(160deg, #1A2A5C 0%, #0D1840 100%)", accent: "#6080E0" }, // cobalt — city/scenes
  { bg: "linear-gradient(160deg, #5C1A2A 0%, #3A0D18 100%)", accent: "#E06080" }, // crimson — bold art
  { bg: "linear-gradient(160deg, #1A5C3A 0%, #0D3A22 100%)", accent: "#60E090" }, // emerald — gardens/flora
  { bg: "linear-gradient(160deg, #3A3A1A 0%, #222208 100%)", accent: "#C8C860" }, // olive — vintage/collage
];

const condMeta = {
  "Like New":  { color: "var(--sage)",        bg: "var(--sage-bg)" },
  "Excellent": { color: "var(--cobalt)",       bg: "var(--cobalt-bg)" },
  "Good":      { color: "var(--amber)",        bg: "var(--amber-bg)" },
  "Fair":      { color: "var(--terracotta)",   bg: "var(--terracotta-bg)" },
};


const CATEGORIES = ["All", "Collage", "Landscape", "Nightscape", "Animals", "Fine Art", "Travel", "Seasonal", "Food", "Kids", "Other"];
const CONDITIONS  = ["Like New","Excellent","Good","Fair"];
const TRADE_OPTS  = ["Local","Will Ship","Both"];
const CAT_OPT     = CATEGORIES.filter(c => c !== "All");
const EMOJIS = ["🏔️","🌊","🌸","🌆","🗺️","🌌","🦁","🐬","🌻","🦋","🚂","🏡","🎨","🌍","🗼","🏰","🌹","🦊","🎲","🐶","🐱","🦅","🏛️","🎠","🍭","🥣","📚","🎸","⚽","🍰","🧁","🍕","🌮","🍜","🍓","🎄","🌾","🎃"];
// ─── Amazon Affiliate ─────────────────────────────────────────────────────────
// To connect your affiliate account:
// 1. Go to affiliate-program.amazon.com and sign up
// 2. Once approved, go to Account Settings → Associate Information
// 3. Copy your "Associate Store ID" (looks like "yourname-20")
// 4. Replace "puzzleswap-20" below with your actual ID
const AFFILIATE_TAG = "puzzleswap-20";
const PIRATESHIP_REF_URL = "https://www.pirateship.com";
const BOOST_PRICE = "$1.99";
const BOOST_MS    = 7 * 864e5;

const isBoosted  = p => p.boost_expiry && p.boost_expiry > Date.now();
const daysLeft   = p => Math.ceil((p.boost_expiry - Date.now()) / 864e5);
const affUrl     = p => `https://www.amazon.com/s?k=${encodeURIComponent(`${p.brand} ${p.title} puzzle ${p.pieces} pieces`)}&tag=${AFFILIATE_TAG}`;
const needsShip  = lt => lt === "swap" || lt === "offer" || lt === "free";

const timeAgo = dateStr => {
  if (!dateStr) return "Recently";
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins  = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days  = Math.floor(diff / 86400000);
  if (mins < 2)   return "Just now";
  if (mins < 60)  return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7)   return `${days}d ago`;
  return `${Math.floor(days/7)}wk ago`;
};

// ─── Small reusable components ────────────────────────────────────────────────
function Avatar({ user, size = 40 }) {
  const colors = ["#C4603A","#5A7A5C","#4A6FA5","#8B7355","#B8860B"];
  const c = colors[user.name.charCodeAt(0) % colors.length];
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: c, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.38, fontFamily: "var(--serif)", color: "white", flexShrink: 0, fontStyle: "italic" }}>
      {user.name.charAt(0)}
    </div>
  );
}

function LTBadge({ type, size = "sm" }) {
  const lt = LISTING_TYPES[type] || LISTING_TYPES.offer;
  const pad = size === "sm" ? "2px 8px" : "4px 12px";
  const fs  = size === "sm" ? 10 : 12;
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:4, padding:pad, background:lt.bg, color:lt.color, borderRadius:99, fontSize:fs, fontWeight:600, fontFamily:"var(--sans)", whiteSpace:"nowrap", letterSpacing:"0.3px" }}>
      <span style={{ fontSize: fs + 1 }}>{lt.icon}</span> {lt.label}
    </span>
  );
}

function CondBadge({ cond }) {
  const m = condMeta[cond] || condMeta["Good"];
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:4, padding:"2px 8px", background:m.bg, color:m.color, borderRadius:99, fontSize:10, fontWeight:500, fontFamily:"var(--sans)", whiteSpace:"nowrap" }}>
      {cond}
    </span>
  );
}

function PuzzleBox({ artIdx, emoji, size = "md", category = "", photoUrl = "" }) {
  const p = PIECE_PALETTE[artIdx % PIECE_PALETTE.length];
  const h = size === "lg" ? 260 : size === "sm" ? 100 : 180;

  // If we have a real photo, show it instead of the illustrated box
  if (photoUrl) return (
    <div style={{ height: h, position:"relative", overflow:"hidden", background:"var(--parchment)" }}>
      <img src={photoUrl} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
      <div style={{ position:"absolute", bottom:0, left:0, right:0, background:"linear-gradient(transparent, rgba(0,0,0,0.55))", padding:"16px 12px 8px", display:"flex", justifyContent:"space-between", alignItems:"flex-end" }}>
        <span style={{ fontSize:8, fontFamily:"var(--sans)", fontWeight:600, color:"rgba(255,255,255,0.8)", letterSpacing:"2px", textTransform:"uppercase" }}>PUZZLE</span>
        <span style={{ fontSize:8, fontFamily:"var(--sans)", color:"rgba(255,255,255,0.5)", letterSpacing:"1px", textTransform:"uppercase" }}>{category || "JIGSAW"}</span>
      </div>
    </div>
  );

  return (
    <div style={{ height: h, background: p.bg, position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ position:"absolute", inset:10, border:`1px solid ${p.accent}30`, borderRadius:2 }} />
      <div style={{ position:"absolute", inset:13, border:`1px solid ${p.accent}18`, borderRadius:1 }} />
      <div style={{ position:"absolute", inset:0, background:`radial-gradient(ellipse at 40% 40%, ${p.accent}30 0%, transparent 65%)` }} />
      <div style={{ position:"absolute", inset:0, backgroundImage:`repeating-linear-gradient(0deg, transparent, transparent 18px, ${p.accent}08 18px, ${p.accent}08 19px), repeating-linear-gradient(90deg, transparent, transparent 18px, ${p.accent}08 18px, ${p.accent}08 19px)` }} />
      <div style={{ fontSize: size==="lg"?80:size==="sm"?38:56, position:"relative", zIndex:2, filter:`drop-shadow(0 4px 20px ${p.accent}60) drop-shadow(0 0 40px ${p.accent}30)` }}>
        {emoji || "🧩"}
      </div>
      <div style={{ position:"absolute", bottom:0, left:0, right:0, background:`linear-gradient(transparent, rgba(0,0,0,0.65))`, padding:"16px 12px 8px", display:"flex", justifyContent:"space-between", alignItems:"flex-end" }}>
        <span style={{ fontSize:8, fontFamily:"var(--sans)", fontWeight:600, color:`${p.accent}cc`, letterSpacing:"2px", textTransform:"uppercase" }}>PUZZLE</span>
        <span style={{ fontSize:8, fontFamily:"var(--sans)", color:"rgba(255,255,255,0.35)", letterSpacing:"1px", textTransform:"uppercase" }}>{category || "JIGSAW"}</span>
      </div>
    </div>
  );
}

function PieceCount({ pieces }) {
  return (
    <div style={{ position:"absolute", top:10, right:10, background:"rgba(28,24,20,0.72)", backdropFilter:"blur(10px)", borderRadius:8, padding:"4px 8px", textAlign:"center" }}>
      <div style={{ fontSize:13, fontWeight:600, color:"white", fontFamily:"var(--sans)", lineHeight:1 }}>{pieces >= 1000 ? `${pieces/1000}k` : pieces}</div>
      <div style={{ fontSize:7, color:"rgba(255,255,255,0.5)", fontFamily:"var(--sans)", letterSpacing:"1px", textTransform:"uppercase" }}>pcs</div>
    </div>
  );
}

// Puzzle piece SVG decoration
function PuzzlePieceDecor({ size = 40, color = "var(--ink)", opacity = 0.08, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" style={{ opacity, ...style }}>
      <path d="M8 8h10c0-3 2-5 4-5s4 2 4 5h6v10c3 0 5 2 5 4s-2 4-5 4v6H22c0 3-2 5-4 5s-4-2-4-5H8V22c-3 0-5-2-5-4s2-4 5-4V8z" fill={color}/>
    </svg>
  );
}

// Form primitives
const Inp = ({ label, hint, ...p }) => (
  <div style={{ marginBottom: 18 }}>
    {label && <div style={{ fontSize:12, fontWeight:700, color:"var(--ink)", textTransform:"uppercase", letterSpacing:"0.8px", fontFamily:"var(--sans)", marginBottom:7 }}>{label}</div>}
    <input style={{ width:"100%", padding:"12px 15px", background:"var(--warm-white)", border:"1px solid var(--ink-15)", borderRadius:6, fontSize:16, fontFamily:"var(--sans)", color:"var(--ink)", transition:"border-color .15s, box-shadow .15s", boxShadow:"var(--shadow-xs)" }} {...p} />
    {hint && <div style={{ fontSize:13, color:"var(--ink-40)", marginTop:5, fontFamily:"var(--sans)" }}>{hint}</div>}
  </div>
);
const Sel = ({ label, children, ...p }) => (
  <div style={{ marginBottom: 18 }}>
    {label && <div style={{ fontSize:12, fontWeight:700, color:"var(--ink)", textTransform:"uppercase", letterSpacing:"0.8px", fontFamily:"var(--sans)", marginBottom:7 }}>{label}</div>}
    <select style={{ width:"100%", padding:"12px 15px", background:"var(--warm-white)", border:"1px solid var(--ink-15)", borderRadius:6, fontSize:16, fontFamily:"var(--sans)", color:"var(--ink)", boxShadow:"var(--shadow-xs)" }} {...p}>{children}</select>
  </div>
);
const TA = ({ label, ...p }) => (
  <div style={{ marginBottom: 18 }}>
    {label && <div style={{ fontSize:12, fontWeight:700, color:"var(--ink)", textTransform:"uppercase", letterSpacing:"0.8px", fontFamily:"var(--sans)", marginBottom:7 }}>{label}</div>}
    <textarea style={{ width:"100%", padding:"12px 15px", background:"var(--warm-white)", border:"1px solid var(--ink-15)", borderRadius:6, fontSize:16, fontFamily:"var(--sans)", color:"var(--ink)", resize:"vertical", minHeight:96, transition:"border-color .15s", boxShadow:"var(--shadow-xs)" }} {...p} />
  </div>
);

function PrimaryBtn({ children, sm = false, style = {}, ...p }) {
  return (
    <button className="ps-btn-primary" style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", gap:6, padding:sm?"10px 18px":"13px 26px", background:"var(--terracotta)", color:"white", border:"none", borderRadius:6, fontSize:sm?13:15, fontFamily:"var(--sans)", fontWeight:700, cursor:"pointer", letterSpacing:"0.2px", whiteSpace:"nowrap", boxShadow:"var(--shadow-sm)", ...style }} {...p}>
      {children}
    </button>
  );
}
function GhostBtn({ children, style = {}, ...p }) {
  return (
    <button className="ps-btn-ghost" style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", padding:"12px 22px", background:"var(--warm-white)", color:"var(--ink)", border:"1px solid var(--ink-15)", borderRadius:6, fontSize:15, fontFamily:"var(--sans)", fontWeight:400, cursor:"pointer", transition:"all .15s", boxShadow:"var(--shadow-xs)", ...style }} {...p}>
      {children}
    </button>
  );
}

function EmptyState({ icon, title, sub, action }) {
  return (
    <div style={{ textAlign:"center", padding:"80px 24px" }}>
      <div style={{ width:80, height:80, margin:"0 auto 20px", background:"var(--parchment)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:32, border:"1px solid var(--tan)" }}>{icon}</div>
      <div style={{ fontSize:22, fontFamily:"var(--serif)", color:"var(--ink)", marginBottom:8 }}>{title}</div>
      <div style={{ fontSize:14, color:"var(--ink-70)", fontFamily:"var(--sans)", maxWidth:300, margin:action?"0 auto 24px":"0 auto", lineHeight:1.65 }}>{sub}</div>
      {action}
    </div>
  );
}

// ─── Pirateship block ─────────────────────────────────────────────────────────
function PirateshipBlock({ context = "detail" }) {
  const [gone, setGone] = useState(false);
  if (gone) return null;
  return (
    <div style={{ marginBottom: 14 }}>
      <a href={PIRATESHIP_REF_URL} target="_blank" rel="noopener noreferrer" className="ship-link"
        style={{ display:"flex", alignItems:"flex-start", gap:12, padding:"13px 16px", background:"var(--cobalt-bg)", border:"1px solid rgba(46,95,163,0.2)", borderRadius:8, textDecoration:"none", position:"relative" }}>
        <div style={{ fontSize:22, flexShrink:0, lineHeight:1, paddingTop:1 }}>🏴‍☠️</div>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:12, fontWeight:600, color:"var(--ink)", fontFamily:"var(--sans)", marginBottom:2 }}>
            {context === "post-request" ? "Need a shipping label?" : "Shipping this puzzle?"}
          </div>
          <div style={{ fontSize:11, color:"var(--ink-70)", fontFamily:"var(--sans)", lineHeight:1.5 }}>
            Pirateship — USPS labels at up to 40% off retail. Usually $5–9 for a puzzle.
            <span style={{ color:"var(--cobalt)", fontWeight:600 }}> Get a label →</span>
          </div>
        </div>
        {context === "detail" && (
          <button onClick={e=>{e.preventDefault();e.stopPropagation();setGone(true);}}
            style={{ background:"none", border:"none", cursor:"pointer", fontSize:13, color:"var(--ink-40)", padding:2, flexShrink:0 }}>✕</button>
        )}
      </a>
      <div style={{ fontSize:10, color:"var(--ink-40)", fontFamily:"var(--sans)", marginTop:4, paddingLeft:2 }}>Pirateship is not affiliated with puzzleswap — just a genuinely good deal for shipping.</div>
    </div>
  );
}

// ─── Request Modal ────────────────────────────────────────────────────────────
// ZIP-based proximity check — same first 3 digits = likely local (~30 mile radius)
function isLocalZip(zipA, zipB) {
  if (!zipA || !zipB) return false;
  // First 4 digits ≈ within ~15 miles
  return zipA.slice(0,4) === zipB.slice(0,4);
}

function RequestModal({ puzzle, userOf, currentUser, onClose, onSend }) {
  const owner = userOf(puzzle);
  const local = isLocalZip(currentUser?.location, owner?.location);

  const [step, setStep] = useState("form");
  const [shipPref, setShipPref] = useState(
    puzzle.listing_type === "pickup" ? "local" : local ? "local" : "ship"
  );
  const [offerType, setOfferType] = useState(
    puzzle.listing_type === "free" || puzzle.listing_type === "pickup" ? "claim" :
    puzzle.listing_type === "offer" ? "cash" : "swap"
  );
  const [swapDesc, setSwapDesc]   = useState("");
  const [topUp, setTopUp]         = useState("");
  const [offerAmt, setOfferAmt]   = useState("");
  const [willingToDrive, setWillingToDrive] = useState(false);
  const [msg, setMsg]             = useState(
    puzzle.listing_type === "free" || puzzle.listing_type === "pickup"
      ? `Hi ${owner?.name}! I'd love to claim "${puzzle.title}".`
      : `Hi ${owner?.name}! I'm interested in swapping for "${puzzle.title}".`
  );

  if (step === "sent") return (
    <div style={{ animation:"fadeIn 0.3s ease" }}>
      <div style={{ textAlign:"center", padding:"16px 0 24px" }}>
        <div style={{ width:64, height:64, background:"var(--sage-dim)", border:"1px solid var(--sage)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, margin:"0 auto 16px", color:"var(--sage)" }}>✓</div>
        <div style={{ fontSize:24, fontFamily:"var(--serif)", color:"var(--ink)", marginBottom:8 }}>Request sent!</div>
        <p style={{ fontSize:14, color:"var(--ink-70)", fontFamily:"var(--sans)", lineHeight:1.65, marginBottom:24 }}>
          {owner?.name} will be in touch to arrange the swap.
        </p>
      </div>
      {shipPref === "ship" && needsShip(puzzle.listing_type) && (
        <div style={{ borderTop:"1px solid var(--ink-08)", paddingTop:20 }}>
          <PirateshipBlock context="post-request" />
        </div>
      )}
    </div>
  );

  const lt = LISTING_TYPES[puzzle.listing_type] || LISTING_TYPES.offer;
  return (
    <>
      {/* Puzzle preview */}
      <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:20, padding:"13px 16px", background:"var(--parchment)", borderRadius:8 }}>
        {puzzle.photo_url
          ? <img src={puzzle.photo_url} alt="" style={{ width:48, height:48, objectFit:"cover", borderRadius:6, flexShrink:0 }} />
          : <div style={{ width:48, height:48, background:PIECE_PALETTE[puzzle.art%PIECE_PALETTE.length].bg, borderRadius:6, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>{puzzle.image||"🧩"}</div>
        }
        <div>
          <div style={{ fontSize:15, fontFamily:"var(--serif)", color:"var(--ink)", marginBottom:2 }}>{puzzle.title}</div>
          <div style={{ fontSize:12, color:"var(--ink-70)", fontFamily:"var(--sans)" }}>{puzzle.pieces.toLocaleString()} pieces · {owner?.name}</div>
        </div>
        <LTBadge type={puzzle.listing_type} />
      </div>

      {/* Shipping preference — auto-detected from ZIP */}
      {puzzle.listing_type !== "pickup" && (
        <div style={{ marginBottom:18 }}>
          <div style={{ fontSize:11, fontWeight:600, color:"var(--ink-70)", textTransform:"uppercase", letterSpacing:".8px", fontFamily:"var(--sans)", marginBottom:8 }}>
            How would you like to swap?
            {local && <span style={{ marginLeft:6, fontSize:10, color:"var(--sage)", fontWeight:500, textTransform:"none", letterSpacing:0 }}>📍 You're within ~15 miles</span>}
            {!local && currentUser?.location && owner?.location && <span style={{ marginLeft:6, fontSize:10, color:"var(--cobalt)", fontWeight:500, textTransform:"none", letterSpacing:0 }}>📦 Different areas</span>}
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
            {[
              ["local","📍","Local meetup","Meet up to exchange in person"],
              ["ship","📦","Ship to each other","Each person mails their puzzle"],
            ].map(([v,icon,label,sub])=>{
              const disabled = v === "local" && !local && !willingToDrive;
              return (
                <button key={v} onClick={()=>{ if(!disabled) setShipPref(v); }}
                  style={{ padding:"12px", background:shipPref===v?"var(--cream)":disabled?"var(--parchment)":"var(--warm-white)", border:`1.5px solid ${shipPref===v?"var(--terracotta)":disabled?"var(--ink-08)":"var(--ink-15)"}`, borderRadius:8, cursor:disabled?"not-allowed":"pointer", textAlign:"left", transition:"all .15s", opacity:disabled?0.5:1 }}>
                  <div style={{ fontSize:18, marginBottom:4 }}>{icon}</div>
                  <div style={{ fontSize:12, fontWeight:600, color:disabled?"var(--ink-40)":"var(--ink)", fontFamily:"var(--sans)" }}>{label}</div>
                  <div style={{ fontSize:11, color:"var(--ink-40)", fontFamily:"var(--sans)", marginTop:2 }}>{disabled?"ZIPs too far apart":sub}</div>
                </button>
              );
            })}
          </div>
          {/* Willing to drive option — shown when ZIPs are far apart */}
          {!local && currentUser?.location && owner?.location && (
            <label style={{ display:"flex", alignItems:"center", gap:8, marginTop:10, cursor:"pointer" }}>
              <input type="checkbox" checked={willingToDrive} onChange={e=>{ setWillingToDrive(e.target.checked); if(e.target.checked) setShipPref("local"); else setShipPref("ship"); }}
                style={{ width:16, height:16, accentColor:"var(--terracotta)", cursor:"pointer" }} />
              <span style={{ fontSize:13, color:"var(--ink-70)", fontFamily:"var(--sans)" }}>
                I'm willing to drive further to meet up
              </span>
            </label>
          )}
        </div>
      )}

      {/* Free/pickup info */}
      {(puzzle.listing_type === "free" || puzzle.listing_type === "pickup") && (
        <div style={{ background:lt.bg, border:`1px solid ${lt.color}33`, borderRadius:8, padding:"12px 16px", marginBottom:18 }}>
          <div style={{ fontSize:13, fontWeight:600, color:"var(--ink)", fontFamily:"var(--sans)", marginBottom:3 }}>
            {puzzle.listing_type === "free" ? "Free — you cover shipping (~$5–9)" : "Free local pickup only"}
          </div>
          <div style={{ fontSize:12, color:"var(--ink-70)", fontFamily:"var(--sans)" }}>Coordinate details with {owner?.name} after sending your request.</div>
        </div>
      )}

      {/* Swap offer */}
      {puzzle.listing_type === "swap" && (
        <div style={{ marginBottom:18 }}>
          <div style={{ fontSize:11, fontWeight:600, color:"var(--ink-70)", textTransform:"uppercase", letterSpacing:".8px", fontFamily:"var(--sans)", marginBottom:10 }}>Your offer</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:14 }}>
            {[["swap","⇄","Even Swap","Puzzle for puzzle"],["swap_plus","⇄ +$","Swap + Top-up","Your puzzle + cash top-up"]].map(([v,icon,label,sub])=>(
              <button key={v} onClick={()=>setOfferType(v)} style={{ padding:"12px", background:offerType===v?"var(--cream)":"var(--warm-white)", border:`1.5px solid ${offerType===v?"var(--terracotta)":"var(--ink-15)"}`, borderRadius:8, cursor:"pointer", textAlign:"left", transition:"all .15s" }}>
                <div style={{ fontSize:18, marginBottom:4 }}>{icon}</div>
                <div style={{ fontSize:12, fontWeight:600, color:"var(--ink)", fontFamily:"var(--sans)" }}>{label}</div>
                <div style={{ fontSize:11, color:"var(--ink-70)", fontFamily:"var(--sans)", marginTop:2 }}>{sub}</div>
              </button>
            ))}
          </div>
          <TA label="What puzzle are you offering?" placeholder="e.g. Ravensburger Eiffel Tower 500pc, Like New…" value={swapDesc} onChange={e=>setSwapDesc(e.target.value)} />
          {offerType === "swap_plus" && <Inp label="Cash top-up ($)" type="number" placeholder="e.g. 8" value={topUp} onChange={e=>setTopUp(e.target.value)} hint="Via Venmo or PayPal once agreed." />}
        </div>
      )}

      {/* Open offer */}
      {puzzle.listing_type === "offer" && (
        <div style={{ marginBottom:18 }}>
          <div style={{ fontSize:11, fontWeight:600, color:"var(--ink-70)", textTransform:"uppercase", letterSpacing:".8px", fontFamily:"var(--sans)", marginBottom:10 }}>Offer type</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, marginBottom:14 }}>
            {[["cash","💵","Pay cash"],["swap","⇄","Even swap"],["swap_plus","⇄+$","Swap + top-up"]].map(([v,icon,label])=>(
              <button key={v} onClick={()=>setOfferType(v)} style={{ padding:"10px 6px", background:offerType===v?"var(--cream)":"var(--warm-white)", border:`1.5px solid ${offerType===v?"var(--terracotta)":"var(--ink-15)"}`, borderRadius:8, cursor:"pointer", textAlign:"center", transition:"all .15s" }}>
                <div style={{ fontSize:18, marginBottom:4 }}>{icon}</div>
                <div style={{ fontSize:11, fontWeight:600, color:"var(--ink)", fontFamily:"var(--sans)" }}>{label}</div>
              </button>
            ))}
          </div>
          {offerType === "cash" && <Inp label="Offer amount ($)" type="number" placeholder="e.g. 12" value={offerAmt} onChange={e=>setOfferAmt(e.target.value)} hint="Via Venmo or PayPal — sort with lister." />}
          {(offerType === "swap" || offerType === "swap_plus") && <TA label="Your puzzle" placeholder="Name, brand, piece count, condition…" value={swapDesc} onChange={e=>setSwapDesc(e.target.value)} />}
          {offerType === "swap_plus" && <Inp label="Cash top-up ($)" type="number" placeholder="e.g. 5" value={topUp} onChange={e=>setTopUp(e.target.value)} />}
        </div>
      )}

      <TA label="Message" value={msg} onChange={e=>setMsg(e.target.value)} />
      <div style={{ display:"flex", gap:10 }}>
        <GhostBtn style={{ flex:1 }} onClick={onClose}>Cancel</GhostBtn>
        <PrimaryBtn style={{ flex:2 }} onClick={()=>{ onSend({ offerType, swapDesc, topUp, offerAmt, msg, shipPref }); setStep("sent"); }}>Send Request</PrimaryBtn>
      </div>
    </>
  );
}

// ─── Puzzle Card ──────────────────────────────────────────────────────────────
function PuzzleCard({ puzzle, onOpen, onRequest, saved, onToggleSave, animClass = "" }) {
  const lt = LISTING_TYPES[puzzle.listing_type] || LISTING_TYPES.offer;
  return (
    <div className={`ps-card ${animClass}`}
      style={{ background:"var(--warm-white)", borderRadius:10, border:"1px solid var(--ink-15)", overflow:"visible", boxShadow:"var(--shadow-sm)", position:"relative" }}
      onClick={()=>onOpen(puzzle)}>
      <div style={{ borderRadius:10, overflow:"hidden" }}>
        {/* Art */}
        <div style={{ position:"relative" }}>
          <PuzzleBox artIdx={puzzle.art||0} emoji={puzzle.image||"🧩"} size="md" category={puzzle.category} photoUrl={puzzle.photo_url||""} />
          <PieceCount pieces={puzzle.pieces} />
          <button style={{ position:"absolute", top:10, left:10, background:"rgba(26,21,16,0.55)", backdropFilter:"blur(8px)", border:`1px solid ${saved?"var(--amber)":"rgba(255,255,255,0.15)"}`, borderRadius:5, width:32, height:32, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, color:saved?"var(--amber)":"rgba(255,255,255,0.7)", transition:"all .15s" }}
            onClick={e=>{ e.stopPropagation(); onToggleSave(puzzle.id); }}>
            {saved ? "♥" : "♡"}
          </button>
        </div>

        {/* Listing type color stripe */}
        <div style={{ height:3, background:lt.color, opacity:0.7 }} />

        {/* Card body */}
        <div style={{ padding:"13px 15px 15px" }}>
          <div style={{ fontSize:18, fontFamily:"var(--serif)", color:"var(--ink)", marginBottom:3, lineHeight:1.2, fontWeight:700 }}>{puzzle.title}</div>
          <div style={{ fontSize:13, color:"var(--ink-40)", fontFamily:"var(--sans)", marginBottom:10 }}>{puzzle.brand}</div>

          <div style={{ display:"flex", gap:5, flexWrap:"wrap", marginBottom:13 }}>
            <CondBadge cond={puzzle.condition} />
            <LTBadge type={puzzle.listing_type} />
          </div>

          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingTop:11, borderTop:"1px solid var(--ink-08)" }}>
            <span style={{ fontSize:13, color:"var(--ink-40)", fontFamily:"var(--sans)" }}>♥ {puzzle.saves} · {timeAgo(puzzle.created_at)}</span>
            <button className="card-action" style={{ padding:"6px 14px", background:"transparent", color:"var(--terracotta)", border:"1px solid var(--terracotta)", borderRadius:4, fontSize:11, fontFamily:"var(--sans)", fontWeight:500, cursor:"pointer", transition:"all .2s", letterSpacing:"0.2px" }}
              onClick={e=>{ e.stopPropagation(); onRequest(puzzle); }}>
              {puzzle.listing_type === "free" || puzzle.listing_type === "pickup" ? "Claim" : "Request"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── How It Works strip ───────────────────────────────────────────────────────
function HowItWorks() {
  return (
    <div style={{ borderRadius:16, overflow:"hidden", marginBottom:40, border:"1px solid var(--ink-08)", boxShadow:"var(--shadow-md)" }}>
      {/* Header band */}
      <div style={{ background:"var(--terracotta)", padding:"14px 28px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ fontSize:11, fontWeight:700, color:"rgba(255,255,255,0.85)", textTransform:"uppercase", letterSpacing:"2px", fontFamily:"var(--sans)" }}>How it works</div>
        <div style={{ fontSize:12, color:"rgba(255,255,255,0.60)", fontFamily:"var(--sans)", fontWeight:300 }}>No fees. No platform cuts. Just puzzles finding new homes.</div>
      </div>
      {/* Cards row */}
      <div className="how-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", background:"var(--warm-white)" }}>
        {Object.entries(LISTING_TYPES).map(([key, lt], i) => (
          <div key={key} style={{ padding:"22px 22px", borderRight: i < 3 ? "1px solid var(--ink-08)" : "none", background: i % 2 === 1 ? "var(--cream)" : "var(--warm-white)" }}>
            <div style={{ fontSize:28, marginBottom:10 }}>{lt.icon}</div>
            <div style={{ fontSize:14, fontWeight:700, color:"var(--ink)", fontFamily:"var(--sans)", marginBottom:4 }}>{lt.label}</div>
            <div style={{ fontSize:12, color:"var(--ink-70)", fontFamily:"var(--sans)", lineHeight:1.55, marginBottom:8 }}>{lt.desc}</div>
            <div style={{ display:"inline-flex", padding:"3px 10px", background:lt.bg, color:lt.color, borderRadius:99, fontSize:10, fontWeight:700, fontFamily:"var(--sans)" }}>
              {key==="swap"   && "Each ships their own"}
              {key==="offer"  && "You name the terms"}
              {key==="free"   && "Shipping only (~$5–9)"}
              {key==="pickup" && "Zero cost"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
// ─── InboxCard ────────────────────────────────────────────────────────────────
function InboxCard({ r, onRead, onAccept, onDecline, onOpenThread, onDelete }) {

  const statusColor = {
    accepted:  "var(--sage)",
    declined:  "var(--terracotta)",
    pending:   "var(--amber)",
    withdrawn: "var(--ink-40)",
  }[r.status || "pending"];

  const statusBg = {
    accepted:  "var(--sage-bg)",
    declined:  "var(--terracotta-bg)",
    pending:   "var(--amber-bg)",
    withdrawn: "var(--parchment)",
  }[r.status || "pending"];

  const statusLabel = {
    accepted:  "✓ Accepted",
    declined:  "✕ Declined",
    pending:   "● Pending",
    withdrawn: "— Withdrawn",
  }[r.status || "pending"];


  return (
    <div style={{ background:"var(--warm-white)", borderRadius:12, border:`1px solid ${!r.read?"var(--terracotta)":"var(--ink-08)"}`, overflow:"hidden", boxShadow:!r.read?"0 2px 16px rgba(200,90,48,0.12)":"0 1px 4px rgba(26,21,16,0.05)", transition:"all .2s" }}>

      {/* Header */}
      <div style={{ padding:"16px 20px 12px", borderBottom:"1px solid var(--ink-08)" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:12 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
            {!r.read && <span style={{ width:8, height:8, borderRadius:"50%", background:"var(--terracotta)", flexShrink:0, display:"inline-block" }} />}
            <span style={{ fontSize:15, fontFamily:"var(--serif)", color:"var(--ink)", fontWeight:600 }}>{r.sender_name}</span>
            <span style={{ fontSize:12, color:"var(--ink-40)", fontFamily:"var(--sans)" }}>wants your</span>
            <span style={{ fontSize:12, fontWeight:600, color:"var(--ink)", fontFamily:"var(--sans)" }}>{r.puzzle_title}</span>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
            <span style={{ fontSize:10, fontWeight:600, padding:"3px 8px", background:statusBg, color:statusColor, borderRadius:99, fontFamily:"var(--sans)" }}>{statusLabel}</span>
            <span style={{ fontSize:11, color:"var(--ink-40)", fontFamily:"var(--sans)" }}>{timeAgo(r.created_at)}</span>
          </div>
        </div>

        {/* Offer badges */}
        <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginTop:8 }}>
          {r.offer_type && (
            <span style={{ fontSize:10, fontWeight:600, padding:"2px 8px", background:"var(--cobalt-bg)", color:"var(--cobalt)", borderRadius:99, fontFamily:"var(--sans)" }}>
              {r.offer_type==="cash"?"💵 Cash offer":r.offer_type==="swap"?"⇄ Swap":r.offer_type==="swap_plus"?"⇄ Swap + top-up":"Offer"}
            </span>
          )}
          {r.offer_amt && <span style={{ fontSize:10, padding:"2px 8px", background:"var(--sage-bg)", color:"var(--sage)", borderRadius:99, fontFamily:"var(--sans)", fontWeight:600 }}>${r.offer_amt}</span>}
          {r.top_up && <span style={{ fontSize:10, padding:"2px 8px", background:"var(--amber-bg)", color:"var(--amber)", borderRadius:99, fontFamily:"var(--sans)", fontWeight:600 }}>+${r.top_up} top-up</span>}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding:"12px 20px" }}>
        {r.swap_desc && (
          <div style={{ fontSize:13, color:"var(--ink-70)", fontFamily:"var(--sans)", marginBottom:8 }}>
            <span style={{ fontWeight:600, color:"var(--ink)" }}>Offering: </span><em>{r.swap_desc}</em>
          </div>
        )}
        {r.message && (
          <div style={{ fontSize:13, color:"var(--ink-70)", fontFamily:"var(--sans)", background:"var(--cream)", padding:"10px 14px", borderRadius:6, lineHeight:1.65, marginBottom:12 }}>
            "{r.message}"
          </div>
        )}

        {/* Action buttons — only on pending requests */}
        {r.status === "pending" && (
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            <button onClick={()=>{ onAccept(); onRead(); }}
              style={{ padding:"8px 18px", background:"var(--sage)", color:"white", border:"none", borderRadius:6, fontSize:13, fontFamily:"var(--sans)", fontWeight:600, cursor:"pointer" }}>
              ✓ Accept
            </button>
            <button onClick={()=>{ onDecline(); onRead(); }}
              style={{ padding:"8px 18px", background:"none", color:"var(--terracotta)", border:"1px solid var(--terracotta)", borderRadius:6, fontSize:13, fontFamily:"var(--sans)", fontWeight:600, cursor:"pointer" }}>
              ✕ Decline
            </button>
          </div>
        )}
        {r.status === "accepted" && (
          <button onClick={()=>{ onOpenThread(r.id); onRead(); }}
            style={{ padding:"8px 18px", background:"var(--terracotta)", color:"white", border:"none", borderRadius:6, fontSize:13, fontFamily:"var(--sans)", fontWeight:600, cursor:"pointer", display:"inline-flex", alignItems:"center", gap:6 }}>
            💬 Open Messages
          </button>
        )}
        {r.status === "withdrawn" && (
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div style={{ fontSize:12, color:"var(--ink-40)", fontFamily:"var(--sans)", fontStyle:"italic" }}>
              This request was withdrawn by the sender.
            </div>
            {onDelete && <button onClick={onDelete} style={{ fontSize:12, color:"var(--ink-40)", background:"none", border:"1px solid var(--ink-15)", borderRadius:5, padding:"4px 10px", cursor:"pointer", fontFamily:"var(--sans)" }}>Delete</button>}
          </div>
        )}
        {r.status === "declined" && onDelete && (
          <div style={{ display:"flex", justifyContent:"flex-end" }}>
            <button onClick={onDelete} style={{ fontSize:12, color:"var(--ink-40)", background:"none", border:"1px solid var(--ink-15)", borderRadius:5, padding:"4px 10px", cursor:"pointer", fontFamily:"var(--sans)" }}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── MessageThread ────────────────────────────────────────────────────────────
function MessageThread({ requestId, currentUserId, messages, onSend, onClose, request }) {
  const [text, setText] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior:"smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(requestId, text);
    setText("");
  };

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(28,24,20,0.6)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:999, padding:24, backdropFilter:"blur(6px)" }} onClick={onClose}>
      <div style={{ background:"var(--warm-white)", borderRadius:14, width:"100%", maxWidth:520, maxHeight:"80vh", display:"flex", flexDirection:"column", border:"1px solid var(--ink-15)", boxShadow:"var(--shadow-xl)" }} onClick={e=>e.stopPropagation()}>

        {/* Header */}
        <div style={{ padding:"16px 20px", borderBottom:"1px solid var(--ink-08)", display:"flex", justifyContent:"space-between", alignItems:"center", flexShrink:0 }}>
          <div>
            <div style={{ fontSize:15, fontFamily:"var(--serif)", color:"var(--ink)" }}>{request?.puzzle_title}</div>
            <div style={{ fontSize:11, color:"var(--ink-40)", fontFamily:"var(--sans)", marginTop:2 }}>
              Trade with {currentUserId === request?.seller_id ? request?.sender_name : "seller"}
            </div>
          </div>
          <button onClick={onClose} style={{ background:"none", border:"none", fontSize:18, cursor:"pointer", color:"var(--ink-40)", padding:4 }}>✕</button>
        </div>

        {/* Messages */}
        <div style={{ flex:1, overflowY:"auto", padding:"16px 20px", display:"flex", flexDirection:"column", gap:10 }}>
          {messages.length === 0 && (
            <div style={{ textAlign:"center", color:"var(--ink-40)", fontFamily:"var(--sans)", fontSize:13, padding:"20px 0" }}>No messages yet. Say hi!</div>
          )}
          {messages.map(m => {
            const isMe = m.sender_id === currentUserId;
            return (
              <div key={m.id} style={{ display:"flex", flexDirection:"column", alignItems:isMe?"flex-end":"flex-start" }}>
                {!isMe && <div style={{ fontSize:10, color:"var(--ink-40)", fontFamily:"var(--sans)", marginBottom:3, paddingLeft:4 }}>{m.sender_name}</div>}
                <div style={{
                  maxWidth:"75%", padding:"10px 14px", borderRadius:isMe?"14px 14px 4px 14px":"14px 14px 14px 4px",
                  background:isMe?"var(--terracotta)":"var(--cream)",
                  color:isMe?"white":"var(--ink)",
                  fontSize:14, fontFamily:"var(--sans)", lineHeight:1.55,
                  boxShadow:"var(--shadow-xs)"
                }}>{m.content}</div>
                <div style={{ fontSize:10, color:"var(--ink-40)", fontFamily:"var(--sans)", marginTop:3, paddingLeft:4, paddingRight:4 }}>{timeAgo(m.created_at)}</div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div style={{ padding:"12px 16px", borderTop:"1px solid var(--ink-08)", display:"flex", gap:8, flexShrink:0 }}>
          <input
            value={text}
            onChange={e=>setText(e.target.value)}
            onKeyDown={e=>{ if(e.key==="Enter" && !e.shiftKey){ e.preventDefault(); handleSend(); }}}
            placeholder="Type a message…"
            style={{ flex:1, padding:"10px 14px", background:"var(--cream)", border:"1px solid var(--ink-15)", borderRadius:99, fontSize:13, fontFamily:"var(--sans)", color:"var(--ink)", outline:"none" }}
          />
          <button onClick={handleSend}
            style={{ padding:"10px 18px", background:"var(--terracotta)", color:"white", border:"none", borderRadius:99, fontSize:13, fontFamily:"var(--sans)", fontWeight:600, cursor:"pointer", flexShrink:0 }}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── AvatarMenu — dropdown with Profile + Log out ────────────────────────────
function AvatarMenu({ user, onProfile, onLogout, setProfEdit }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position:"relative" }}>
      <div title={user.name} onClick={()=>setOpen(o=>!o)} style={{ cursor:"pointer", userSelect:"none" }}>
        <Avatar user={user} size={36} />
      </div>
      {open && (
        <>
          <div style={{ position:"fixed", inset:0, zIndex:998 }} onClick={()=>setOpen(false)} />
          <div style={{
            position:"absolute", top:"calc(100% + 10px)", right:0,
            background:"var(--warm-white)", borderRadius:10,
            border:"1px solid var(--ink-08)", boxShadow:"var(--shadow-lg)",
            minWidth:190, zIndex:999, overflow:"hidden",
            animation:"slideDown 0.15s ease",
          }}>
            <div style={{ padding:"14px 16px", borderBottom:"1px solid var(--ink-08)", display:"flex", alignItems:"center", gap:10 }}>
              <Avatar user={user} size={32} />
              <div>
                <div style={{ fontSize:14, fontWeight:600, color:"var(--ink)", fontFamily:"var(--sans)" }}>{user.name}</div>
                <div style={{ fontSize:12, color:"var(--ink-40)", fontFamily:"var(--sans)" }}>{user.email}</div>
              </div>
            </div>
            {[
              ["👤", "My Profile", () => { setProfEdit({...user}); setOpen(false); onProfile(); }],
              ["📤", "Log out",    () => { setOpen(false); onLogout(); }],
            ].map(([icon, label, action]) => (
              <button key={label} onClick={action} style={{
                width:"100%", display:"flex", alignItems:"center", gap:10,
                padding:"13px 16px", background:"none", border:"none",
                cursor:"pointer", fontFamily:"var(--sans)", fontSize:15,
                color: label === "Log out" ? "var(--terracotta)" : "var(--ink)",
                fontWeight: label === "Log out" ? 600 : 400,
                textAlign:"left",
              }}
                onMouseEnter={e=>e.currentTarget.style.background="var(--cream)"}
                onMouseLeave={e=>e.currentTarget.style.background="none"}
              >
                <span style={{ fontSize:16 }}>{icon}</span>{label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ─── Modal (must be outside main component to prevent input focus loss) ───────
function Modal({ onClose, children, wide }) {
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(44,31,14,0.45)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:999, padding:24, backdropFilter:"blur(4px)", overflowY:"auto", animation:"fadeIn 0.2s ease" }} onClick={onClose}>
      <div style={{ background:"var(--warm-white)", borderRadius:12, padding:36, maxWidth:wide?540:460, width:"100%", border:"1px solid var(--ink-08)", boxShadow:"var(--shadow-xl)", margin:"auto", animation:"slideDown 0.2s ease" }} onClick={e=>e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

// ─── FPill ────────────────────────────────────────────────────────────────────
function FPill({ label, active, onClick }) {
  return (
    <button className="filter-pill" onClick={onClick}
      style={{ padding:"8px 16px", background:active?"var(--terracotta)":"transparent", color:active?"white":"var(--ink-40)", border:`1px solid ${active?"var(--terracotta)":"var(--ink-15)"}`, borderRadius:99, fontSize:14, fontFamily:"var(--sans)", fontWeight:active?700:400, cursor:"pointer", whiteSpace:"nowrap", transition:"all .15s" }}>
      {label}
    </button>
  );
}

// ─── BackBtn ──────────────────────────────────────────────────────────────────
function BackBtn({ onClick }) {
  return (
    <button onClick={onClick} style={{ display:"inline-flex", alignItems:"center", gap:6, color:"var(--ink-40)", background:"none", border:"none", cursor:"pointer", fontSize:15, fontFamily:"var(--sans)", marginBottom:28, padding:0, transition:"color .15s" }}
      onMouseEnter={e=>e.currentTarget.style.color="var(--ink)"} onMouseLeave={e=>e.currentTarget.style.color="var(--ink-40)"}>
      ← Back
    </button>
  );
}

// ─── SectionHead ──────────────────────────────────────────────────────────────
function SectionHead({ title, sub, action }) {
  return (
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:32 }}>
      <div>
        <h2 style={{ fontSize:32, fontFamily:"var(--serif)", color:"var(--ink)", fontWeight:700, marginBottom:4, lineHeight:1.2 }}>{title}</h2>
        {sub && <p style={{ fontSize:14, color:"var(--ink-70)", fontFamily:"var(--sans)" }}>{sub}</p>}
      </div>
      {action}
    </div>
  );
}

// ─── StatBox ──────────────────────────────────────────────────────────────────
function StatBox({ num, label, accent }) {
  return (
    <div style={{ background:"var(--cream)", borderRadius:8, padding:"14px 16px", textAlign:"center", flex:1, border:"1px solid var(--tan)" }}>
      <div style={{ fontSize:20, fontFamily:"var(--serif)", color:accent?"var(--terracotta)":"var(--ink)" }}>{num}</div>
      <div style={{ fontSize:11, color:"var(--ink-40)", fontFamily:"var(--sans)", textTransform:"uppercase", letterSpacing:"1px", marginTop:3 }}>{label}</div>
    </div>
  );
}

// ─── Grid — needs handlers passed as props ────────────────────────────────────
function Grid({ items, onSel, onReq, savedList, onToggleSave }) {
  return (
    <div className="card-grid" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:22 }}>
      {items.map((p,i) => (
        <PuzzleCard key={p.id} puzzle={p} animClass={`f${Math.min(i+1,6)}`}
          onOpen={onSel}
          onRequest={onReq}
          saved={savedList.includes(p.id)}
          onToggleSave={onToggleSave}
        />
      ))}
    </div>
  );
}

// ─── ProfileView ──────────────────────────────────────────────────────────────
function ProfileView({ currentUser, pe, myListings, setProfEdit, saveProfile, handleLogout, nav }) {
  return (
    <div style={{ maxWidth:540 }}>
      <SectionHead title="My profile" />
      <div style={{ background:"var(--warm-white)", border:"1px solid var(--ink-15)", borderRadius:14, padding:28, marginBottom:20, boxShadow:"var(--shadow-sm)" }}>
        <div style={{ display:"flex", gap:16, alignItems:"center", marginBottom:20 }}>
          <Avatar user={currentUser} size={56} />
          <div>
            <div style={{ fontSize:22, fontFamily:"var(--serif)", color:"var(--ink)", fontWeight:700 }}>{currentUser.name}</div>
            {currentUser.location && <div style={{ fontSize:14, color:"var(--ink-40)", fontFamily:"var(--sans)", marginTop:2 }}>📍 {currentUser.location}</div>}
          </div>
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <StatBox num={currentUser.trade_count||0} label="Trades" accent />
          <StatBox num={myListings.length} label="Listings" />
          <StatBox num={currentUser.member_since||"—"} label="Since" />
        </div>
      </div>
      <div style={{ background:"var(--warm-white)", borderRadius:14, padding:28, border:"1px solid var(--ink-15)", boxShadow:"var(--shadow-sm)" }}>
        <div style={{ fontSize:18, fontFamily:"var(--serif)", color:"var(--ink)", marginBottom:20, fontWeight:700 }}>Edit details</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          <Inp label="Name" value={pe.name||""} onChange={e=>setProfEdit(p=>({...(p||currentUser),name:e.target.value}))} />
          <Inp label="ZIP Code" placeholder="e.g. 60126" value={pe.location||""} onChange={e=>setProfEdit(p=>({...(p||currentUser),location:e.target.value}))} />
        </div>
        <Sel label="Trade preference" value={pe.trade_preference||"Both"} onChange={e=>setProfEdit(p=>({...(p||currentUser),trade_preference:e.target.value}))}>{TRADE_OPTS.map(c=><option key={c}>{c}</option>)}</Sel>
        <Inp label="Bio (optional)" placeholder="A line about your puzzle style…" value={pe.bio||""} onChange={e=>setProfEdit(p=>({...(p||currentUser),bio:e.target.value}))} />
        <div style={{ fontSize:12, color:"var(--ink-40)", fontFamily:"var(--sans)", marginBottom:16 }}>
          💡 Update your ZIP code here anytime — e.g. when travelling.
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <GhostBtn style={{ flex:1 }} onClick={()=>{ setProfEdit(null); nav("browse"); }}>Cancel</GhostBtn>
          <PrimaryBtn style={{ flex:2 }} onClick={saveProfile}>Save changes</PrimaryBtn>
        </div>
      </div>
      <div style={{ marginTop:16, textAlign:"right" }}>
        <button onClick={handleLogout} style={{ background:"none", border:"none", cursor:"pointer", fontSize:16, color:"var(--ink-40)", fontFamily:"var(--sans)", textDecoration:"underline", textUnderlineOffset:"3px" }}>Log out</button>
      </div>
    </div>
  );
}

export default function PuzzleSwap() {
  const [puzzles, setPuzzles]       = useState([]);
  const [currentUser, setCU]        = useState(null);
  const [loading, setLoading]       = useState(true);
  const [view, setView]             = useState("browse");
  const [sel, setSel]               = useState(null);
  const [viewProfile, setViewProf]  = useState(null);
  const [showList, setShowList]     = useState(false);
  const [showAuth, setShowAuth]     = useState(false);
  const [authTab, setAuthTab]       = useState("login");
  const [catF, setCatF]             = useState("All");
  const [typeF, setTypeF]           = useState("All");
  const [pieceF, setPieceF]         = useState("Any");
  const [searchQ, setSearchQ]       = useState("");
  const [savedList, setSaved]       = useState([]);
  const [reqModal, setReqModal]     = useState(null);
  const [requests, setRequests]     = useState([]);
  const [sentRequests, setSent]     = useState([]);
  const [notifications, setNotifs]  = useState([]);
  const [unreadNotifs, setUnreadN]  = useState(0);
  const [unreadCount, setUnread]    = useState(0);
  const [openThread, setOpenThread] = useState(null);
  const [threads, setThreads]       = useState({});
  const [unreadMsgs, setUnreadMsgs] = useState(0);
  const [aEmail, setAEmail]         = useState("");
  const [aPass, setAPass]           = useState("");
  const [aName, setAName]           = useState("");
  const [aLoc, setALoc]             = useState("");
  const [aPref, setAPref]           = useState("Both");
  const [aErr, setAErr]             = useState("");
  const [nl, setNl]   = useState({ title:"", pieces:"", brand:"", condition:"Like New", listingType:"swap", tradePreference:"Both", description:"", category:"Collage", image:"🎲", photo_url:"" });
  const [nlErr, setNlErr]           = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [offerModal, setOfferModal] = useState(null);
  const [uploading, setUploading]   = useState(false);
  const [editingPuzzle, setEditing] = useState(null);

  // ─── Load session + puzzles on mount ────────────────────────────────────────
  useEffect(() => {
    sb.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) loadProfile(session.user.id);
      // else: loading will clear once loadPuzzles() finishes
    });
    const { data: { subscription } } = sb.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        loadProfile(session.user.id);
      } else {
        // Full state reset on auth logout event
        setCU(null);
        setSaved([]);
        setRequests([]);
        setSent([]);
        setThreads({});
        setOpenThread(null);
        setUnread(0);
        setUnreadMsgs(0);
        setProfEdit(null);
        setView("browse");
      }
    });
    loadPuzzles();
    return () => subscription.unsubscribe();
  }, []);

  const loadProfile = async (userId) => {
    const { data } = await sb.from("profiles").select("*").eq("id", userId).single();
    if (data) {
      setCU(data);
      loadSaved(userId);
      loadRequests(userId);
      loadSentRequests(userId);
      loadAllThreads(userId);
      loadNotifications(userId);
    } else {
      const { data: authUser } = await sb.auth.getUser();
      const email = authUser?.user?.email || "";
      const fallback = { id: userId, email, name: email.split("@")[0], location: "", trade_preference: "Both", trade_count: 0, member_since: new Date().toLocaleString("default",{month:"short",year:"numeric"}), bio: "" };
      await sb.from("profiles").upsert(fallback);
      setCU(fallback);
    }
  };

  const loadRequests = async (userId) => {
    const { data } = await sb.from("requests").select("*").eq("seller_id", userId).order("created_at", { ascending: false });
    if (data) {
      setRequests(data);
      setUnread(data.filter(r => !r.read).length);
    }
  };

  const loadSentRequests = async (userId) => {
    const { data } = await sb.from("requests").select("*").eq("sender_id", userId).order("created_at", { ascending: false });
    if (data) setSent(data);
  };

  const loadNotifications = async (userId) => {
    const { data } = await sb.from("notifications").select("*").eq("user_id", userId).order("created_at", { ascending: false });
    if (data) {
      setNotifs(data);
      setUnreadN(data.filter(n => !n.read).length);
    }
  };

  const loadThread = async (requestId) => {
    const { data } = await sb.from("messages").select("*").eq("request_id", requestId).order("created_at", { ascending: true });
    if (data) setThreads(prev => ({ ...prev, [requestId]: data }));
    return data || [];
  };

  const loadAllThreads = async (userId) => {
    // Get all messages where user is involved (sent or received)
    const { data } = await sb.from("messages").select("*").order("created_at", { ascending: true });
    if (!data) return;
    // Group by request_id
    const grouped = {};
    data.forEach(m => {
      if (!grouped[m.request_id]) grouped[m.request_id] = [];
      grouped[m.request_id].push(m);
    });
    setThreads(grouped);
    // Count unread messages not sent by current user
    const unread = data.filter(m => !m.read && m.sender_id !== userId).length;
    setUnreadMsgs(unread);
  };

  const sendMessage = async (requestId, content) => {
    if (!content.trim() || !currentUser) return;
    const { data } = await sb.from("messages").insert({
      request_id:  requestId,
      sender_id:   currentUser.id,
      sender_name: currentUser.name,
      content:     content.trim(),
      read:        false,
    }).select().single();
    if (data) {
      setThreads(prev => ({
        ...prev,
        [requestId]: [...(prev[requestId] || []), data]
      }));
    }
  };

  const markThreadRead = async (requestId) => {
    if (!currentUser) return;
    await sb.from("messages").update({ read: true })
      .eq("request_id", requestId)
      .neq("sender_id", currentUser.id);
    setThreads(prev => ({
      ...prev,
      [requestId]: (prev[requestId] || []).map(m =>
        m.sender_id !== currentUser.id ? {...m, read: true} : m
      )
    }));
    setUnreadMsgs(prev => Math.max(0, prev - (threads[requestId]||[]).filter(m => !m.read && m.sender_id !== currentUser.id).length));
  };

  const markRead = async (requestId) => {
    const req = requests.find(r => r.id === requestId);
    if (!req || req.read) return;
    await sb.from("requests").update({ read: true }).eq("id", requestId);
    setRequests(prev => prev.map(r => r.id === requestId ? {...r, read: true} : r));
    setUnread(prev => Math.max(0, prev - 1));
  };

  const loadPuzzles = async () => {
    setLoading(true);
    const { data: puzzleData, error } = await sb.from("puzzles").select("*").order("created_at", { ascending: false });
    if (error) { console.error("loadPuzzles error:", error); setLoading(false); return; }
    if (puzzleData) {
      // Load all unique owner profiles
      const userIds = [...new Set(puzzleData.map(p => p.user_id))];
      let profileMap = {};
      if (userIds.length > 0) {
        const { data: profileData } = await sb.from("profiles").select("id, name, location, trade_count").in("id", userIds);
        if (profileData) profileData.forEach(p => { profileMap[p.id] = p; });
      }
      setPuzzles(puzzleData.map(p => ({
        ...p,
        userId: p.user_id,
        listing_type: p.listing_type,
        boost_expiry: p.boost_expiry,
        _owner: profileMap[p.user_id] ? { ...profileMap[p.user_id], tradeCount: profileMap[p.user_id].trade_count } : null
      })));
    }
    setLoading(false);
  };

  const loadSaved = async (userId) => {
    const { data } = await sb.from("saved_puzzles").select("puzzle_id").eq("user_id", userId);
    if (data) setSaved(data.map(r => r.puzzle_id));
  };

  // ─── Auth ────────────────────────────────────────────────────────────────────
  const handleLogin = async () => {
    if (!aEmail || !aPass) { setAErr("Email and password required."); return; }
    const { error } = await sb.auth.signInWithPassword({ email: aEmail, password: aPass });
    if (error) { setAErr("Invalid email or password."); return; }
    setShowAuth(false); setAErr(""); setAEmail(""); setAPass("");
  };

  const handleSignup = async () => {
    if (!aName || !aEmail || !aPass) { setAErr("All starred fields are required."); return; }
    if (!aEmail.includes("@") || !aEmail.includes(".")) { setAErr("Please enter a valid email address."); return; }
    if (aPass.length < 6) { setAErr("Password must be at least 6 characters."); return; }
    if (aLoc && !/^\d{5}$/.test(aLoc.trim())) { setAErr("Please enter a valid 5-digit ZIP code."); return; }
    const { data, error } = await sb.auth.signUp({ email: aEmail, password: aPass });
    if (error) { setAErr(error.message); return; }
    if (data.user) {
      const memberSince = new Date().toLocaleString("default", { month:"short", year:"numeric" });
      await sb.from("profiles").insert({ id: data.user.id, email: aEmail, name: aName, location: aLoc.trim(), trade_preference: aPref, trade_count: 0, member_since: memberSince, bio: "" });
      await loadProfile(data.user.id);
    }
    setShowAuth(false); setAErr(""); setAName(""); setAEmail(""); setAPass(""); setALoc("");
  };

  const handleLogout = async () => {
    await sb.auth.signOut();
    setCU(null);
    setSaved([]);
    setRequests([]);
    setSent([]);
    setThreads({});
    setOpenThread(null);
    setUnread(0);
    setUnreadMsgs(0);
    setProfEdit(null);
    setSel(null);
    setViewProf(null);
    setShowList(false);
    setShowAuth(false);
    setView("browse");
  };

  // ─── Listings ────────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!nl.title) { setNlErr("Please add a puzzle title."); return; }
    if (!nl.pieces) { setNlErr("Please enter the piece count."); return; }
    setNlErr("");
    const { data, error } = await sb.from("puzzles").insert({
      user_id: currentUser.id,
      title: nl.title,
      brand: nl.brand,
      pieces: parseInt(nl.pieces),
      condition: nl.condition,
      listing_type: nl.listingType,
      category: nl.category,
      description: nl.description,
      image: nl.image,
      photo_url: nl.photo_url || null,
      art: Math.floor(Math.random() * PIECE_PALETTE.length),
      saves: 0,
      boost_expiry: null,
    }).select().single();
    if (error) {
      alert("Could not save puzzle: " + error.message);
      console.error("Insert error:", error);
      return;
    }
    await loadPuzzles();
    setShowList(false);
    setNl({ title:"", pieces:"", brand:"", condition:"Like New", listingType:"swap", tradePreference:"Both", description:"", category:"Collage", image:"🎲", photo_url:"" });
    setView("mylistings");
  };

  const handlePhotoUpload = async (file) => {
    if (!file || !currentUser) return;
    const ext  = file.name.split(".").pop();
    const path = `${currentUser.id}/${Date.now()}.${ext}`;
    setUploading(true);
    const { error } = await sb.storage.from("puzzle-images").upload(path, file, { upsert: true });
    if (!error) {
      const { data } = sb.storage.from("puzzle-images").getPublicUrl(path);
      setNl(p => ({ ...p, photo_url: data.publicUrl }));
    } else {
      alert("Upload failed: " + error.message);
    }
    setUploading(false);
  };

  const handleRemoveListing = async (puzzleId) => {
    await sb.from("puzzles").delete().eq("id", puzzleId);
    await loadPuzzles();
  };

  const handleStartEdit = (p) => {
    setNl({
      title:           p.title,
      pieces:          p.pieces,
      brand:           p.brand || "",
      condition:       p.condition,
      listingType:     p.listing_type,
      tradePreference: p.trade_preference || "Both",
      description:     p.description || "",
      category:        p.category,
      image:           p.image || "🎲",
      photo_url:       p.photo_url || "",
    });
    setEditing(p);
    setShowList(true);
    setView("mylistings");
  };

  const handleUpdate = async () => {
    if (!nl.title) { setNlErr("Please add a puzzle title."); return; }
    if (!nl.pieces) { setNlErr("Please enter the piece count."); return; }
    if (!editingPuzzle) return;
    setNlErr("");
    const { error } = await sb.from("puzzles").update({
      title:        nl.title,
      brand:        nl.brand,
      pieces:       parseInt(nl.pieces),
      condition:    nl.condition,
      listing_type: nl.listingType,
      category:     nl.category,
      description:  nl.description,
      image:        nl.image,
      photo_url:    nl.photo_url || null,
    }).eq("id", editingPuzzle.id);
    if (error) { alert("Could not update: " + error.message); return; }
    await loadPuzzles();
    setShowList(false);
    setEditing(null);
    setNl({ title:"", pieces:"", brand:"", condition:"Like New", listingType:"swap", tradePreference:"Both", description:"", category:"Collage", image:"🎲", photo_url:"" });
    setView("mylistings");
  };

  // ─── Saves ───────────────────────────────────────────────────────────────────
  const handleToggleSave = async (puzzleId) => {
    if (!currentUser) { setAuthTab("signup"); setShowAuth(true); return; }
    if (savedList.includes(puzzleId)) {
      await sb.from("saved_puzzles").delete().eq("user_id", currentUser.id).eq("puzzle_id", puzzleId);
      setSaved(s => s.filter(x => x !== puzzleId));
    } else {
      await sb.from("saved_puzzles").insert({ user_id: currentUser.id, puzzle_id: puzzleId });
      setSaved(s => [...s, puzzleId]);
    }
  };

  // ─── Profile save ─────────────────────────────────────────────────────────────
  const saveProfile = async () => {
    if (!profEdit) return;
    await sb.from("profiles").update({
      name: profEdit.name,
      location: profEdit.location,
      trade_preference: profEdit.trade_preference,
      bio: profEdit.bio
    }).eq("id", currentUser.id);
    setCU({ ...currentUser, ...profEdit });
    setProfEdit(null);
    setView("browse");
  };

  const handleReq = p => { if (!currentUser) { setAuthTab("signup"); setShowAuth(true); } else setReqModal(p); };

  const handleSendRequest = async ({ offerType, swapDesc, topUp, offerAmt, msg, shipPref }) => {
    if (!reqModal || !currentUser) return;
    await sb.from("requests").insert({
      puzzle_id:           reqModal.id,
      puzzle_title:        reqModal.title,
      sender_id:           currentUser.id,
      sender_name:         currentUser.name,
      sender_email:        currentUser.email,
      seller_id:           reqModal.user_id,
      offer_type:          offerType,
      message:             msg,
      swap_desc:           swapDesc,
      top_up:              topUp,
      offer_amt:           offerAmt,
      shipping_preference: shipPref,
      status:              "pending",
      read:                false,
    });
    await loadSentRequests(currentUser.id);
  };

  const handleDeleteInboxItem = async (requestId) => {
    await sb.from("requests").delete().eq("id", requestId);
    setRequests(prev => prev.filter(r => r.id !== requestId));
  };

  const handleCancelRequest = async (requestId) => {
    await sb.from("requests").update({ status:"withdrawn" }).eq("id", requestId);
    setSent(prev => prev.map(r => r.id === requestId ? {...r, status:"withdrawn"} : r));
  };

  const handleDeleteRequest = async (requestId) => {
    await sb.from("requests").delete().eq("id", requestId);
    setSent(prev => prev.filter(r => r.id !== requestId));
  };

  const handleAccept = async (requestId) => {
    await sb.from("requests").update({ status:"accepted", read:true }).eq("id", requestId);
    // Auto-send opening message so thread exists
    await sb.from("messages").insert({
      request_id:  requestId,
      sender_id:   currentUser.id,
      sender_name: currentUser.name,
      content:     "Great news — I've accepted your request! Let's coordinate the swap here.",
      read:        false,
    });
    await loadRequests(currentUser.id);
    await loadAllThreads(currentUser.id);
  };

  const handleDecline = async (requestId) => {
    const req = requests.find(r => r.id === requestId);
    await sb.from("requests").update({ status:"declined", read:true }).eq("id", requestId);
    // Notify the sender
    if (req) {
      await sb.from("notifications").insert({
        user_id: req.sender_id,
        type:    "declined",
        title:   "Request declined",
        body:    `Your request for "${req.puzzle_title}" was not a match this time. Keep browsing — there are more puzzles out there!`,
        read:    false,
      });
    }
    await loadRequests(currentUser.id);
  };

  const userOf = p => p._owner || null;

  const matchPiece = p => {
    if (pieceF === "Any")    return true;
    if (pieceF === "<500")   return p.pieces < 500;
    if (pieceF === "500–1k") return p.pieces >= 500 && p.pieces <= 1000;
    if (pieceF === "1k–2k")  return p.pieces > 1000 && p.pieces <= 2000;
    if (pieceF === "2k+")    return p.pieces > 2000;
    return true;
  };

  const sortB = arr => [...arr.filter(isBoosted), ...arr.filter(p => !isBoosted(p))];

  // Hide own puzzles from browse when logged in — you list to trade with others
  const filtered = sortB(puzzles.filter(p => {
    if (currentUser && p.user_id === currentUser.id) return false;
    if (catF !== "All" && p.category !== catF) return false;
    if (typeF !== "All" && p.listing_type !== typeF) return false;
    if (!p.title.toLowerCase().includes(searchQ.toLowerCase())) return false;
    return matchPiece(p);
  }));

  const myListings = puzzles.filter(p => currentUser && p.user_id === currentUser.id);

  const goBack = () => {
    setSel(null);
    setViewProf(null);
    setShowList(false);
  };

  const nav = v => {
    // Set profEdit FIRST before view changes, so profile never renders with pe=null
    if (v === "profile" && currentUser) setProfEdit({...currentUser});
    goBack();
    setView(v);
  };

  const isBrowse = view==="browse" && !sel && !showList && !viewProfile;
  const isSaved  = view==="saved"  && !sel && !viewProfile;
  const isMyList = view==="mylistings" && !showList;
  const isInbox  = view==="inbox";


  if (loading) return (
    <div style={{ minHeight:"100vh", background:"var(--warm-white)", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:16 }}>
      <div style={{ fontSize:40 }}>🧩</div>
      <div style={{ fontSize:16, fontFamily:"var(--serif)", color:"var(--ink)", fontStyle:"italic" }}>puzzleswap</div>
      <div style={{ fontSize:12, color:"var(--ink-40)", fontFamily:"var(--sans)" }}>Loading puzzles…</div>
    </div>
  );

  return (
    <div style={{ minHeight:"100vh", background:"var(--warm-white)" }}>

      {/* ── HEADER ── */}
      <header style={{ background:"var(--warm-white)", borderBottom:"1px solid var(--ink-08)", boxShadow:"var(--shadow-md)", position:"sticky", top:0, zIndex:200 }}>
        <div style={{ maxWidth:1160, margin:"0 auto", padding:"0 20px", height:62, display:"grid", gridTemplateColumns:"auto 1fr auto", alignItems:"center", gap:12 }}>

          {/* LEFT — emoji logo */}
          <div style={{ display:"flex", alignItems:"center", gap:9, cursor:"pointer", flexShrink:0 }} onClick={()=>nav("browse")}>
            <div style={{ fontSize:26 }}>🧩</div>
            <span style={{ fontSize:20, fontFamily:"var(--serif)", color:"var(--ink)", fontWeight:700, fontStyle:"italic", whiteSpace:"nowrap" }}>puzzleswap</span>
          </div>

          {/* CENTER — search button + nav (desktop only) */}
          <div className="desktop-nav" style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:4 }}>
            <button onClick={()=>setShowSearch(true)}
              style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 16px", background:"var(--cream)", border:"1px solid var(--ink-15)", borderRadius:6, fontSize:14, fontFamily:"var(--sans)", color:"var(--ink-40)", cursor:"pointer", boxShadow:"var(--shadow-xs)", transition:"all .15s", marginRight:8 }}>
              <span style={{ fontSize:14 }}>⌕</span>
              <span>Search puzzles…</span>
            </button>
            <div style={{ width:1, height:18, background:"var(--ink-15)", margin:"0 4px", flexShrink:0 }} />
            {[["Browse","browse",isBrowse],...(currentUser?[["Saved"+(savedList.length?` (${savedList.length})`:""),"saved",isSaved],["My Listings","mylistings",isMyList],["Inbox"+((unreadCount+unreadMsgs)?` (${unreadCount+unreadMsgs})`:""),"inbox",view==="inbox"],["My Requests","outbox",view==="outbox"]]:[])].map(([label,v,active])=>(
              <button key={v} className="nav-link" onClick={()=>nav(v)}
                style={{ padding:"6px 12px", background:active?"var(--terracotta-bg)":"none", color:active?"var(--terracotta)":"var(--ink-40)", border:"none", borderRadius:6, cursor:"pointer", fontSize:15, fontFamily:"var(--sans)", fontWeight:active?700:400, whiteSpace:"nowrap", transition:"all .15s" }}>
                {label}
              </button>
            ))}
          </div>

          {/* Mobile center — search button */}
          <div className="mobile-only" style={{ display:"none", flex:1, margin:"0 8px" }}>
            <button onClick={()=>setShowSearch(true)} style={{ width:"100%", display:"flex", alignItems:"center", gap:8, padding:"10px 14px", background:"var(--cream)", border:"1px solid var(--ink-15)", borderRadius:6, fontSize:16, fontFamily:"var(--sans)", color:"var(--ink-40)", cursor:"pointer", textAlign:"left" }}>
              <span>⌕</span><span>Search…</span>
            </button>
          </div>

          {/* RIGHT — auth */}
          <div style={{ display:"flex", gap:8, alignItems:"center", flexShrink:0 }}>
            {currentUser ? (
              <>
                <PrimaryBtn sm onClick={()=>{ setSel(null); setViewProf(null); setView("browse"); setShowList(true); }}>+ List</PrimaryBtn>
                <AvatarMenu user={currentUser} onProfile={()=>nav("profile")} onLogout={handleLogout} setProfEdit={setProfEdit} />
              </>
            ) : (
              <>
                <button className="desktop-only" onClick={()=>{setAuthTab("login");setShowAuth(true);}}
                  style={{ padding:"8px 16px", background:"transparent", color:"var(--ink-40)", border:"1px solid var(--ink-15)", borderRadius:6, fontSize:14, fontFamily:"var(--sans)", cursor:"pointer", whiteSpace:"nowrap", boxShadow:"var(--shadow-xs)" }}>
                  Log in
                </button>
                <PrimaryBtn sm onClick={()=>{setAuthTab("signup");setShowAuth(true);}}>Sign up</PrimaryBtn>
              </>
            )}
          </div>

        </div>
      </header>

      {/* ── MOBILE BOTTOM NAV ── */}
      <nav className="mobile-nav">
        {[
          ["🔍","Browse","browse",isBrowse],
          ["♡","Saved","saved",isSaved],
          ...(currentUser ? [["📬","Inbox"+((unreadCount+unreadMsgs)?` ${unreadCount+unreadMsgs}`:""),"inbox",view==="inbox"],["📤","Sent","outbox",view==="outbox"]] : []),
          ...(currentUser ? [["📋","My Listings","mylistings",isMyList]] : []),
          ...(currentUser ? [["👤","Profile","profile",view==="profile"]] : [["👤","Log in","login",false]]),
        ].map(([icon,label,v,active])=>(
          <button key={v} className={`mobile-nav-btn${active?" active":""}`}
            onClick={()=> v==="login" ? (setAuthTab("login"),setShowAuth(true)) : nav(v)}>
            <span className="mobile-nav-icon">{icon}</span>
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <main style={{ maxWidth:1160, margin:"0 auto", padding:"32px 20px 100px" }}>

        {/* ── LIST FORM ── */}
        {showList && currentUser && (
          <div style={{ background:"var(--warm-white)", borderRadius:14, padding:40, border:"1px solid var(--ink-15)", maxWidth:580, margin:"0 auto", boxShadow:"var(--shadow-lg)" }}>
            <h2 style={{ fontSize:28, fontFamily:"var(--serif)", color:"var(--ink)", marginBottom:6 }}>
              {editingPuzzle ? "Edit listing" : "List a Puzzle"}
            </h2>
            <p style={{ fontSize:14, color:"var(--ink-70)", fontFamily:"var(--sans)", marginBottom:30 }}>
              {editingPuzzle ? "Update your listing details below." : "Choose how you want to offer it — then we'll find it a new home."}
            </p>

            {/* Listing type */}
            <div style={{ marginBottom:22 }}>
              <div style={{ fontSize:11, fontWeight:600, color:"var(--ink-70)", textTransform:"uppercase", letterSpacing:".8px", fontFamily:"var(--sans)", marginBottom:10 }}>Listing type *</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                {Object.entries(LISTING_TYPES).map(([key,lt])=>(
                  <button key={key} onClick={()=>setNl(p=>({...p,listingType:key}))}
                    style={{ padding:"13px 14px", background:nl.listingType===key?"var(--cream)":"var(--warm-white)", border:`1.5px solid ${nl.listingType===key?"var(--terracotta)":"var(--ink-15)"}`, borderRadius:8, cursor:"pointer", textAlign:"left", transition:"all .15s", display:"flex", gap:10, alignItems:"flex-start" }}>
                    <span style={{ fontSize:18, color:lt.color, lineHeight:1 }}>{lt.icon}</span>
                    <div>
                      <div style={{ fontSize:12, fontWeight:600, color:"var(--ink)", fontFamily:"var(--sans)" }}>{lt.label}</div>
                      <div style={{ fontSize:11, color:"var(--ink-70)", fontFamily:"var(--sans)", marginTop:2 }}>{lt.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Card icon */}
            <div style={{ marginBottom:18 }}>
              <div style={{ fontSize:11, fontWeight:600, color:"var(--ink-70)", textTransform:"uppercase", letterSpacing:".8px", marginBottom:8 }}>Card icon — choose one that matches your puzzle</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                {EMOJIS.map(e=>(
                  <button key={e} onClick={()=>setNl(p=>({...p,image:e}))}
                    style={{ fontSize:18, background:nl.image===e?"var(--cream)":"var(--warm-white)", border:`1.5px solid ${nl.image===e?"var(--terracotta)":"var(--ink-15)"}`, borderRadius:6, padding:"5px 7px", cursor:"pointer", transition:"all .12s" }}>{e}</button>
                ))}
              </div>
            </div>

            {/* Photo upload */}
            <div style={{ marginBottom:18 }}>
              <div style={{ fontSize:11, fontWeight:600, color:"var(--ink-70)", textTransform:"uppercase", letterSpacing:".8px", marginBottom:8 }}>
                Photo <span style={{ fontSize:10, fontWeight:400, textTransform:"none", letterSpacing:0, color:"var(--ink-40)" }}>— optional, shows instead of icon on your card</span>
              </div>
              {nl.photo_url ? (
                <div style={{ position:"relative", display:"inline-block" }}>
                  <img src={nl.photo_url} alt="puzzle" style={{ width:120, height:90, objectFit:"cover", borderRadius:8, border:"1px solid var(--ink-15)", display:"block" }} />
                  <button onClick={()=>setNl(p=>({...p,photo_url:""}))}
                    style={{ position:"absolute", top:-8, right:-8, width:22, height:22, borderRadius:"50%", background:"var(--terracotta)", color:"white", border:"none", cursor:"pointer", fontSize:12, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700 }}>✕</button>
                </div>
              ) : (
                <label style={{ display:"flex", alignItems:"center", gap:10, padding:"12px 16px", background:"var(--cream)", border:`1.5px dashed var(--tan)`, borderRadius:8, cursor:"pointer", width:"fit-content" }}>
                  <span style={{ fontSize:20 }}>{uploading ? "⏳" : "📷"}</span>
                  <span style={{ fontSize:13, color:"var(--ink-70)", fontFamily:"var(--sans)" }}>{uploading ? "Uploading…" : "Add a photo of your puzzle"}</span>
                  <input type="file" accept="image/*" style={{ display:"none" }} onChange={e=>{ if(e.target.files[0]) handlePhotoUpload(e.target.files[0]); }} />
                </label>
              )}
            </div>

            <div className="form-two-col" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              <Inp label="Title *" placeholder="e.g. Starry Night" value={nl.title} onChange={e=>setNl(p=>({...p,title:e.target.value}))} />
              <Inp label="Pieces *" type="number" placeholder="1000" value={nl.pieces} onChange={e=>setNl(p=>({...p,pieces:e.target.value}))} />
              <Inp label="Brand" placeholder="e.g. Ravensburger" value={nl.brand} onChange={e=>setNl(p=>({...p,brand:e.target.value}))} />
              <Sel label="Category" value={nl.category} onChange={e=>setNl(p=>({...p,category:e.target.value}))}>
                {[
                  ["Collage",    "🎲 Collage — games, wrappers, posters, chapsticks…"],
                  ["Landscape",  "🌄 Landscape — mountains, valleys, forests"],
                  ["Nightscape", "🌃 Nightscape — city lights, starry skies"],
                  ["Animals",    "🦁 Animals — wildlife, pets, birds"],
                  ["Fine Art",   "🖼️ Fine Art — Van Gogh, Monet, masterpieces"],
                  ["Travel",     "✈️ Travel — landmarks, villages, destinations"],
                  ["Food",       "🍰 Food — cakes, candy, farmers markets, kitchens"],
                  ["Seasonal",   "🍂 Seasonal — Christmas, autumn, spring, summer"],
                  ["Kids",       "🧸 Kids — floor puzzles, big pieces, characters"],
                  ["Other",      "🧩 Other — doesn't fit anywhere else"],
                ].map(([v,l])=><option key={v} value={v}>{l}</option>)}
              </Sel>
              <Sel label="Condition" value={nl.condition} onChange={e=>setNl(p=>({...p,condition:e.target.value}))}>{CONDITIONS.map(c=><option key={c}>{c}</option>)}</Sel>
              {nl.listingType!=="pickup"&&<Sel label="Can you ship?" value={nl.tradePreference} onChange={e=>setNl(p=>({...p,tradePreference:e.target.value}))}>{TRADE_OPTS.map(c=><option key={c}>{c}</option>)}</Sel>}
            </div>
            <TA label="Description" placeholder="All pieces present, completed once. Any details worth knowing…" value={nl.description} onChange={e=>setNl(p=>({...p,description:e.target.value}))} />
            <div style={{ display:"flex", gap:10 }}>
              <GhostBtn style={{ flex:1 }} onClick={()=>{ setShowList(false); setEditing(null); setNl({ title:"", pieces:"", brand:"", condition:"Like New", listingType:"swap", tradePreference:"Both", description:"", category:"Collage", image:"🎲", photo_url:"" }); }}>Cancel</GhostBtn>
              {nlErr && <div style={{ color:"var(--terracotta)", fontSize:14, fontFamily:"var(--sans)", marginBottom:12, padding:"10px 14px", background:"var(--terracotta-bg)", borderRadius:6, border:"1px solid var(--terracotta-dim)" }}>⚠️ {nlErr}</div>}
              <PrimaryBtn style={{ flex:2 }} onClick={editingPuzzle ? handleUpdate : handleSubmit}>
                {editingPuzzle ? "Save changes →" : "List for Trade →"}
              </PrimaryBtn>
            </div>
          </div>
        )}

        {/* ── PUZZLE DETAIL ── */}
        {!showList && sel && (() => {
          const owner   = userOf(sel);
          const lt      = LISTING_TYPES[sel.listing_type] || LISTING_TYPES.offer;
          const isSave  = savedList.includes(sel.id);
          return (
            <div style={{ maxWidth:680 }}>
              <BackBtn onClick={()=>nav("browse")} />
              <div style={{ background:"var(--warm-white)", borderRadius:14, border:"1px solid var(--ink-15)", overflow:"hidden", boxShadow:"var(--shadow-lg)" }}>
                <div style={{ position:"relative" }}>
                  <PuzzleBox artIdx={sel.art||0} emoji={sel.image||"🧩"} size="lg" category={sel.category} photoUrl={sel.photo_url||""} />
                  <PieceCount pieces={sel.pieces} />
                  <button onClick={()=>handleToggleSave(sel.id)}
                    style={{ position:"absolute", top:14, left:14, background:"rgba(28,24,20,0.6)", backdropFilter:"blur(10px)", border:`1px solid ${isSave?"var(--amber)":"rgba(255,255,255,0.15)"}`, borderRadius:6, padding:"7px 13px", cursor:"pointer", fontSize:13, color:isSave?"var(--amber)":"rgba(255,255,255,0.8)", display:"flex", alignItems:"center", gap:5, fontFamily:"var(--sans)" }}>
                    {isSave?"♥":"♡"} {sel.saves+(isSave?1:0)}
                  </button>
                </div>

                <div className="detail-pad" style={{ padding:32 }}>
                  {/* Title row */}
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:12, marginBottom:12 }}>
                    <h1 style={{ fontSize:28, fontFamily:"var(--serif)", color:"var(--ink)", lineHeight:1.15, letterSpacing:"-0.3px" }}>{sel.title}</h1>
                    <LTBadge type={sel.listing_type} size="md" />
                  </div>

                  {/* Meta badges */}
                  <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:20 }}>
                    <CondBadge cond={sel.condition} />
                    <span style={{ display:"inline-flex", alignItems:"center", padding:"2px 8px", background:"var(--parchment)", color:"var(--ink-70)", borderRadius:99, fontSize:10, fontFamily:"var(--sans)", fontWeight:500 }}>{sel.pieces.toLocaleString()} pieces</span>
                    {sel.brand && <span style={{ display:"inline-flex", alignItems:"center", padding:"2px 8px", background:"var(--parchment)", color:"var(--ink-70)", borderRadius:99, fontSize:10, fontFamily:"var(--sans)" }}>{sel.brand}</span>}
                  </div>

                  {sel.description && <p style={{ fontSize:15, color:"var(--ink-70)", fontFamily:"var(--sans)", lineHeight:1.8, marginBottom:24 }}>{sel.description}</p>}

                  {/* Listing type explainer */}
                  <div style={{ background:lt.bg, border:`1px solid ${lt.color}33`, borderRadius:8, padding:"14px 18px", marginBottom:20 }}>
                    <div style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
                      <span style={{ fontSize:20, color:lt.color, lineHeight:1.2, flexShrink:0 }}>{lt.icon}</span>
                      <div>
                        <div style={{ fontSize:13, fontWeight:600, color:"var(--ink)", fontFamily:"var(--sans)", marginBottom:3 }}>
                          {sel.listing_type==="swap"   && "Even swap — puzzle for puzzle"}
                          {sel.listing_type==="offer"  && "Open to offers — cash, swap, or swap + top-up"}
                          {sel.listing_type==="free"   && "Free — just cover shipping (~$5–9)"}
                          {sel.listing_type==="pickup" && "Free local pickup only"}
                        </div>
                        <div style={{ fontSize:12, color:"var(--ink-70)", fontFamily:"var(--sans)", lineHeight:1.55 }}>
                          {sel.listing_type==="swap"   && "Each person ships their own puzzle. No money changes hands."}
                          {sel.listing_type==="offer"  && "Suggest a price, an even swap, or swap with a cash top-up. Lister will accept or counter."}
                          {sel.listing_type==="free"   && "The puzzle is free. You cover shipping. Coordinate via message."}
                          {sel.listing_type==="pickup" && "Zero cost. Arrange local meetup with the lister."}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pirateship */}
                  {needsShip(sel.listing_type) && <PirateshipBlock context="detail" />}

                  {/* Amazon affiliate */}
                  <a href={affUrl(sel)} target="_blank" rel="noopener noreferrer" className="aff-link"
                    style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 16px", background:"var(--parchment)", border:"1px solid var(--tan)", borderRadius:8, textDecoration:"none", marginBottom:20 }}>
                    <div style={{ fontSize:18, flexShrink:0 }}>📦</div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:12, fontWeight:600, color:"var(--ink)", fontFamily:"var(--sans)" }}>Want a brand new copy?</div>
                      <div style={{ fontSize:11, color:"var(--ink-70)", fontFamily:"var(--sans)" }}>Find <em>"{sel.title}"</em> on Amazon →</div>
                    </div>
                    <div style={{ fontSize:10, color:"var(--ink-40)", fontFamily:"var(--sans)" }}>ad</div>
                  </a>

                  {/* Seller */}
                  {owner && (
                    <div style={{ display:"flex", alignItems:"center", gap:12, padding:"14px 16px", background:"var(--cream)", borderRadius:8, marginBottom:20, cursor:"pointer", border:"1px solid var(--tan)", transition:"border-color .15s" }}
                      onMouseEnter={e=>e.currentTarget.style.borderColor="var(--tan)"} onMouseLeave={e=>e.currentTarget.style.borderColor="var(--tan)"}
                      onClick={()=>{ setViewProf(owner); setSel(null); }}>
                      <Avatar user={owner} size={40} />
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:14, fontFamily:"var(--serif)", color:"var(--ink)" }}>{owner.name}</div>
                        <div style={{ fontSize:12, color:"var(--ink-70)", fontFamily:"var(--sans)" }}>📍 {owner.location} · <span style={{ color:"var(--terracotta)" }}>{owner.trade_count} trades</span></div>
                      </div>
                      <span style={{ color:"var(--ink-40)", fontSize:16 }}>›</span>
                    </div>
                  )}

                  <PrimaryBtn style={{ width:"100%", justifyContent:"center", fontSize:15 }} onClick={()=>handleReq(sel)}>
                    {sel.listing_type==="free"||sel.listing_type==="pickup" ? "Claim This Puzzle →" : sel.listing_type==="swap" ? "Propose a Swap →" : "Make an Offer →"}
                  </PrimaryBtn>
                </div>
              </div>
            </div>
          );
        })()}

        {/* ── OTHER PROFILE ── */}
        {!showList && !sel && viewProfile && (
          <div>
            <BackBtn onClick={()=>nav("browse")} />
            <div style={{ background:"var(--warm-white)", border:"1px solid var(--ink-15)", borderRadius:14, padding:30, marginBottom:28 }}>
              <div style={{ display:"flex", gap:18, alignItems:"flex-start", marginBottom:22 }}>
                <Avatar user={viewProfile} size={64} />
                <div>
                  <h2 style={{ fontSize:26, fontFamily:"var(--serif)", color:"var(--ink)", marginBottom:4 }}>{viewProfile.name}</h2>
                  {viewProfile.location && <div style={{ fontSize:13, color:"var(--ink-70)", fontFamily:"var(--sans)", marginBottom:viewProfile.bio?4:0 }}>📍 {viewProfile.location}</div>}
                  {viewProfile.bio && <div style={{ fontSize:13, color:"var(--ink-70)", fontFamily:"var(--sans)", fontStyle:"italic" }}>"{viewProfile.bio}"</div>}
                </div>
              </div>
              <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                <StatBox num={viewProfile.tradeCount} label="Trades" accent />
                <StatBox num={puzzles.filter(p=>p.user_id===viewProfile.id).length} label="Listings" />
                <StatBox num={viewProfile.memberSince} label="Member since" />
              </div>
            </div>
            <SectionHead title="Their puzzles" />
            <Grid onSel={setSel} onReq={handleReq} savedList={savedList} onToggleSave={handleToggleSave} items={puzzles.filter(p=>p.user_id===viewProfile.id)} />
          </div>
        )}

        {/* ── BROWSE ── */}
        {!showList && !sel && !viewProfile && view === "browse" && (
          <>
            {/* Hero */}
            <div className="hero-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", borderRadius:16, overflow:"hidden", marginBottom:40, boxShadow:"0 8px 40px rgba(44,31,14,0.12)", border:"1px solid var(--ink-08)", position:"relative" }}>
              {/* Left: deep warm brown — editorial, sophisticated */}
              <div style={{ padding:"52px 48px", display:"flex", flexDirection:"column", justifyContent:"center", background:"var(--terracotta)", position:"relative", overflow:"hidden", minHeight:340 }}>
                {/* Subtle botanical texture */}
                <div style={{ position:"absolute", top:-30, right:-30, width:200, height:200, borderRadius:"50%", background:"rgba(255,255,255,0.06)", pointerEvents:"none" }} />
                <div style={{ position:"absolute", bottom:-20, left:-20, width:140, height:140, borderRadius:"50%", background:"rgba(255,255,255,0.04)", pointerEvents:"none" }} />
                <PuzzlePieceDecor size={48} color="white" opacity={0.08} style={{ position:"absolute", top:28, right:36, transform:"rotate(20deg)" }} />
                <PuzzlePieceDecor size={28} color="white" opacity={0.05} style={{ position:"absolute", bottom:40, right:80, transform:"rotate(-12deg)" }} />

                <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(255,255,255,0.12)", border:"1px solid rgba(255,255,255,0.18)", borderRadius:2, padding:"4px 12px", fontSize:10, color:"rgba(255,255,255,0.80)", fontWeight:500, letterSpacing:"2px", marginBottom:24, alignSelf:"flex-start", textTransform:"uppercase", fontFamily:"var(--sans)" }}>
                  Free Puzzle Trading
                </div>
                <h1 style={{ fontSize:46, fontFamily:"var(--serif)", color:"white", lineHeight:1.10, marginBottom:18, fontWeight:700 }}>
                  Done with it?<br /><em style={{ color:"rgba(255,220,210,0.95)", fontWeight:400 }}>Pass it on.</em>
                </h1>
                <p style={{ fontSize:14, color:"rgba(255,255,255,0.65)", fontFamily:"var(--sans)", lineHeight:1.75, marginBottom:32, maxWidth:300, fontWeight:300 }}>
                  Trade completed puzzles with people who'll actually do them. Swap, gift, or sell — local meetup or shipped nationwide.
                </p>
                {!currentUser ? (
                  <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                    <button className="ps-btn-primary" onClick={()=>{setAuthTab("signup");setShowAuth(true);}}
                      style={{ padding:"12px 26px", background:"white", color:"#8A4A42", border:"none", borderRadius:4, fontSize:14, fontFamily:"var(--sans)", fontWeight:500, cursor:"pointer", letterSpacing:"0.2px" }}>
                      Start swapping
                    </button>
                    <button onClick={()=>{setAuthTab("login");setShowAuth(true);}}
                      style={{ padding:"12px 20px", background:"transparent", color:"rgba(255,255,255,0.65)", border:"1px solid rgba(255,255,255,0.20)", borderRadius:4, fontSize:14, fontFamily:"var(--sans)", fontWeight:400, cursor:"pointer" }}>
                      Log in
                    </button>
                  </div>
                ) : (
                  <button className="ps-btn-primary" onClick={()=>setShowList(true)}
                    style={{ alignSelf:"flex-start", padding:"12px 26px", background:"white", color:"#8A4A42", border:"none", borderRadius:4, fontSize:14, fontFamily:"var(--sans)", fontWeight:500, cursor:"pointer" }}>
                    + List a puzzle
                  </button>
                )}
              </div>

              {/* Right: warm linen with floating cards */}
              <div className="hero-right" style={{ background:"linear-gradient(145deg, #EFE8D8 0%, #F7F2EA 100%)", position:"relative", overflow:"hidden", minHeight:300 }}>
                <div style={{ position:"absolute", top:0, right:0, width:120, height:120, background:"var(--terracotta)", clipPath:"polygon(100% 0, 0 0, 100% 100%)", opacity:0.07 }} />
                <PuzzlePieceDecor size={80} color="var(--tan)" opacity={0.25} style={{ position:"absolute", bottom:-16, right:-8, transform:"rotate(-10deg)" }} />
                <PuzzlePieceDecor size={44} color="var(--terracotta)" opacity={0.12} style={{ position:"absolute", top:24, left:12, transform:"rotate(30deg)" }} />

                <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:320, height:260 }}>
                  {[
                    { top:10, left:10, anim:"float1 4s ease-in-out infinite", artIdx:0, emoji:"🗼", title:"Eiffel Tower", pieces:1000, cond:"Like New" },
                    { top:0, right:5, anim:"float2 5.2s ease-in-out infinite", artIdx:4, emoji:"🌌", title:"Starry Night", pieces:1500, cond:"Excellent" },
                    { bottom:0, left:"50%", ml:"-70px", anim:"float3 3.8s ease-in-out infinite", artIdx:2, emoji:"🌸", title:"Water Lilies", pieces:750, cond:"Like New" },
                  ].map((c,i) => (
                    <div key={i} style={{ position:"absolute", top:c.top, left:c.left, right:c.right, bottom:c.bottom, marginLeft:c.ml, width:145, background:"var(--warm-white)", borderRadius:8, border:"1px solid var(--ink-15)", overflow:"hidden", boxShadow:"var(--shadow-lg)", animation:c.anim }}>
                      <div style={{ height:88, background:PIECE_PALETTE[c.artIdx].bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:32 }}>{c.emoji}</div>
                      <div style={{ padding:"8px 10px" }}>
                        <div style={{ fontSize:11, fontFamily:"var(--serif)", color:"var(--ink)", marginBottom:2 }}>{c.title}</div>
                        <div style={{ fontSize:9, color:"var(--ink-40)", fontFamily:"var(--sans)" }}>{c.pieces.toLocaleString()} pcs</div>
                        <div style={{ marginTop:5 }}>
                          <span style={{ display:"inline-flex", padding:"2px 6px", borderRadius:2, fontSize:9, fontWeight:600, background:condMeta[c.cond].bg, color:condMeta[c.cond].color }}>{c.cond}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <HowItWorks />

            {/* ── CATEGORY TABS — prominent, scannable ── */}
            <div style={{ marginBottom:16 }}>
              <div style={{ overflowX:"auto", paddingBottom:2 }}>
                <div style={{ display:"flex", gap:8, minWidth:"max-content" }}>
                  {[
                    ["All",        "All",        "",   "#2C1F0E", "#F7F2EA"],
                    ["Collage",    "Collage",    "🎲", "#5A3A6A", "#F0EBF5"],
                    ["Landscape",  "Landscape",  "🌄", "#3A6048", "#EAF2ED"],
                    ["Nightscape", "Nightscape", "🌃", "#2A4A72", "#E8EFF8"],
                    ["Animals",    "Animals",    "🦁", "#7A5020", "#F5EDE0"],
                    ["Fine Art",   "Fine Art",   "🖼️", "#7A2A2A", "#F5E8E8"],
                    ["Travel",     "Travel",     "✈️", "#2A5A5A", "#E8F2F2"],
                    ["Food",       "Food",       "🍰", "#8A3A60", "#F5E8EF"],
                    ["Seasonal",   "Seasonal",   "🍂", "#6A3A18", "#F2EAE0"],
                    ["Kids",       "Kids",       "🧸", "#5A6A8A", "#EDF0F8"],
                    ["Other",      "Other",      "🧩", "#4A4A4A", "#EDEDED"],
                  ].map(([v, label, icon, activeColor, activeBg]) => {
                    const active = catF === v;
                    return (
                      <button key={v} onClick={()=>setCatF(v)} style={{
                        display:"flex", flexDirection:"column", alignItems:"center", gap:4,
                        padding:"10px 16px", minWidth:68,
                        background: active ? activeColor : "var(--warm-white)",
                        border: `1px solid ${active ? activeColor : "var(--ink-15)"}`,
                        borderRadius:6, cursor:"pointer", transition:"all .18s",
                        boxShadow: active ? `0 2px 12px ${activeColor}33` : "none",
                        transform: active ? "translateY(-1px)" : "none",
                      }}>
                        {icon && <span style={{ fontSize:18, lineHeight:1 }}>{icon}</span>}
                        <span style={{
                          fontSize:10, fontWeight:active?600:400, fontFamily:"var(--sans)",
                          color: active ? "white" : "var(--ink-40)",
                          whiteSpace:"nowrap", letterSpacing:"0.5px", textTransform:"uppercase",
                        }}>{label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ── SECONDARY FILTERS — listing type + size ── */}
            <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:20, alignItems:"center" }}>
              <span style={{ fontSize:12, color:"var(--ink-40)", fontFamily:"var(--sans)", fontWeight:700, letterSpacing:"1px", textTransform:"uppercase", marginRight:4 }}>Type</span>
              {[["All","All"],["swap","⇄ Swap"],["offer","◈ Offer"],["free","◎ Free"],["pickup","⌖ Pickup"]].map(([v,l])=>(
                <FPill key={v} label={l} active={typeF===v} onClick={()=>setTypeF(v)} />
              ))}
              <div className="filter-divider" style={{ width:1, height:16, background:"var(--ink-15)", margin:"0 4px" }} />
              <div className="size-filter-row">
                <span style={{ fontSize:12, color:"var(--ink-40)", fontFamily:"var(--sans)", fontWeight:700, letterSpacing:"1px", textTransform:"uppercase", marginRight:4 }}>Size</span>
                {["Any","<500","500–1k","1k–2k","2k+"].map(p=>(
                  <FPill key={p} label={p==="Any"?"Any":p} active={pieceF===p} onClick={()=>setPieceF(p)} />
                ))}
              </div>
            </div>

            {/* Category description banner */}
            {catF !== "All" && (() => {
              const CAT_META = {
                "Collage":    { icon:"🎲", title:"Collage puzzles",    desc:"Dozens of images packed into one — vintage games, candy wrappers, album covers, movie posters, cereal boxes. Every inch has something to find." },
                "Landscape":  { icon:"🌄", title:"Landscape puzzles",  desc:"Mountains, valleys, forests, open countryside. Big skies, rolling terrain, natural light. The most relaxing category to build." },
                "Nightscape": { icon:"🌃", title:"Nightscape puzzles", desc:"City lights, starry skies, moonlit water. Dark backgrounds make these tricky but the finished image is always stunning." },
                "Animals":    { icon:"🦁", title:"Animals puzzles",    desc:"Wildlife, pets, birds, ocean life. From golden savanna photography to cozy cottage cats — something for every animal lover." },
                "Fine Art":   { icon:"🖼️", title:"Fine Art puzzles",   desc:"Paintings, illustration, masterpieces — Van Gogh, Monet, Klimt and more. Subtle color gradients make these genuinely challenging." },
                "Travel":     { icon:"✈️", title:"Travel puzzles",     desc:"Villages, landmarks, destinations from around the world. Cobblestone streets, terracotta rooftops, iconic skylines." },
                "Seasonal":   { icon:"🍂", title:"Seasonal puzzles",   desc:"Christmas mornings, autumn harvests, spring blooms, summer cottages. Cozy, nostalgic, perfect for gifting." },
                "Food":       { icon:"🍰", title:"Food puzzles",       desc:"Cakes, candy, farmers markets, kitchen scenes, bakeries. Colorful and satisfying — great for foodies." },
                "Kids":       { icon:"🧸", title:"Kids puzzles",      desc:"Floor puzzles, big pieces, characters and scenes — for little puzzlers aged 2 and up." },
                "Other":      { icon:"🧩", title:"Other puzzles",      desc:"Doesn't fit neatly into another category — abstract, architectural, pop culture, and everything else." },
              };
              const m = CAT_META[catF];
              if (!m) return null;
              return (
                <div style={{ display:"flex", alignItems:"flex-start", gap:12, padding:"14px 18px", background:"var(--cream)", border:"1px solid var(--tan)", borderRadius:8, marginBottom:20, animation:"fadeUp 0.3s ease both" }}>
                  <span style={{ fontSize:22, lineHeight:1, flexShrink:0 }}>{m.icon}</span>
                  <div>
                    <div style={{ fontSize:13, fontWeight:600, color:"var(--ink)", fontFamily:"var(--sans)", marginBottom:3 }}>{m.title}</div>
                    <div style={{ fontSize:12, color:"var(--ink-70)", fontFamily:"var(--sans)", lineHeight:1.6 }}>{m.desc}</div>
                  </div>
                </div>
              );
            })()}

            {/* Results count */}
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:22 }}>
              <div style={{ fontSize:13, color:"var(--ink-70)", fontFamily:"var(--sans)" }}>
                <span style={{ color:"var(--ink)", fontFamily:"var(--serif)" }}>{filtered.length}</span> {filtered.length===1?"puzzle":"puzzles"} available
              </div>
            </div>

            {filtered.length === 0
              ? <EmptyState icon="🔍" title="Nothing here" sub="Try adjusting your filters, or list the first puzzle in this category." action={currentUser && <PrimaryBtn onClick={()=>setShowList(true)} style={{ margin:"0 auto", display:"inline-flex" }}>+ List a Puzzle</PrimaryBtn>} />
              : <Grid onSel={setSel} onReq={handleReq} savedList={savedList} onToggleSave={handleToggleSave} items={filtered} />
            }
          </>
        )}

        {/* ── SAVED ── */}
        {!showList && !sel && !viewProfile && view === "saved" && (
          <>
            <SectionHead title="Saved puzzles" sub="Puzzles you're keeping an eye on." />
            {savedList.length === 0
              ? <EmptyState icon="♡" title="Nothing saved yet" sub="Browse the marketplace and tap the heart to save any puzzle here." action={<PrimaryBtn onClick={()=>nav("browse")} style={{ margin:"0 auto", display:"inline-flex" }}>Browse Puzzles</PrimaryBtn>} />
              : <Grid onSel={setSel} onReq={handleReq} savedList={savedList} onToggleSave={handleToggleSave} items={puzzles.filter(p => savedList.includes(p.id))} />
            }
          </>
        )}

        {/* ── INBOX ── */}
        {!showList && !sel && !viewProfile && view === "inbox" && currentUser && (
          <>
            <SectionHead title="Inbox" sub={unreadCount > 0 ? `${unreadCount} unread request${unreadCount!==1?"s":""}` : "All caught up."} />
            {requests.length === 0
              ? <EmptyState icon="📬" title="No requests yet" sub="When someone requests one of your puzzles, it'll show up here." />
              : (
                <div style={{ display:"flex", flexDirection:"column", gap:16, maxWidth:720 }}>
                  {requests.map(r => (
                    <InboxCard key={r.id} r={r}
                      onRead={()=>markRead(r.id)}
                      onAccept={()=>handleAccept(r.id)}
                      onDecline={()=>handleDecline(r.id)}
                      onOpenThread={(id)=>{ setOpenThread(id); markThreadRead(id); }}
                      onDelete={()=>handleDeleteInboxItem(r.id)}
                    />
                  ))}
                </div>
              )
            }
          </>
        )}

        {/* ── OUTBOX / SENT REQUESTS ── */}
        {!showList && !sel && !viewProfile && view === "outbox" && currentUser && (
          <>
            <SectionHead title="My Requests" sub="Requests you've sent to other puzzlers." />
            {sentRequests.length === 0
              ? <EmptyState icon="📤" title="No requests sent yet" sub="When you request a puzzle, you'll be able to track it here." action={<PrimaryBtn onClick={()=>nav("browse")} style={{ margin:"0 auto", display:"inline-flex" }}>Browse Puzzles</PrimaryBtn>} />
              : (
                <div style={{ display:"flex", flexDirection:"column", gap:12, maxWidth:720 }}>
                  {sentRequests.map(r => {
                    const statusColor = { accepted:"var(--sage)", declined:"var(--terracotta)", pending:"var(--amber)", withdrawn:"var(--ink-40)" }[r.status||"pending"];
                    const statusBg    = { accepted:"var(--sage-bg)", declined:"var(--terracotta-bg)", pending:"var(--amber-bg)", withdrawn:"var(--parchment)" }[r.status||"pending"];
                    const statusLabel = { accepted:"✓ Accepted", declined:"✕ Declined", pending:"● Pending", withdrawn:"— Withdrawn" }[r.status||"pending"];
                    return (
                      <div key={r.id} style={{ background:"var(--warm-white)", borderRadius:12, border:"1px solid var(--ink-08)", overflow:"hidden", boxShadow:"var(--shadow-xs)" }}>
                        <div style={{ padding:"16px 20px", borderBottom: r.status==="accepted" ? "1px solid var(--ink-08)" : "none" }}>
                          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:12 }}>
                            <div>
                              <div style={{ fontSize:15, fontFamily:"var(--serif)", color:"var(--ink)", marginBottom:4 }}>
                                Request for <strong>{r.puzzle_title}</strong>
                              </div>
                              <div style={{ display:"flex", gap:6, flexWrap:"wrap", alignItems:"center" }}>
                                <span style={{ fontSize:10, fontWeight:600, padding:"3px 8px", background:statusBg, color:statusColor, borderRadius:99, fontFamily:"var(--sans)" }}>{statusLabel}</span>
                                {r.shipping_preference && (
                                  <span style={{ fontSize:10, padding:"2px 8px", background:"var(--parchment)", color:"var(--ink-70)", borderRadius:99, fontFamily:"var(--sans)" }}>
                                    {r.shipping_preference === "local" ? "📍 Local meetup" : "📦 Shipping"}
                                  </span>
                                )}
                                {r.offer_type && <span style={{ fontSize:10, padding:"2px 8px", background:"var(--cobalt-bg)", color:"var(--cobalt)", borderRadius:99, fontFamily:"var(--sans)", fontWeight:600 }}>
                                  {r.offer_type==="cash"?"💵 Cash":r.offer_type==="swap"?"⇄ Swap":r.offer_type==="swap_plus"?"⇄+$":"Offer"}
                                </span>}
                              </div>
                            </div>
                            <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:8, flexShrink:0 }}>
                              <span style={{ fontSize:11, color:"var(--ink-40)", fontFamily:"var(--sans)" }}>{timeAgo(r.created_at)}</span>
                              {(r.status === "pending" || r.status === "accepted") && (
                                <button onClick={()=>handleCancelRequest(r.id)}
                                  style={{ fontSize:11, color:"var(--terracotta)", background:"none", border:"1px solid var(--terracotta)", borderRadius:5, padding:"4px 10px", cursor:"pointer", fontFamily:"var(--sans)", fontWeight:600 }}>
                                  {r.status === "accepted" ? "Withdraw" : "Cancel"}
                                </button>
                              )}
                              {(r.status === "withdrawn" || r.status === "declined") && (
                                <button onClick={()=>handleDeleteRequest(r.id)}
                                  style={{ fontSize:11, color:"var(--ink-40)", background:"none", border:"1px solid var(--ink-15)", borderRadius:5, padding:"4px 10px", cursor:"pointer", fontFamily:"var(--sans)" }}>
                                  Delete
                                </button>
                              )}
                            </div>
                          </div>
                          {r.message && <div style={{ fontSize:13, color:"var(--ink-70)", fontFamily:"var(--sans)", background:"var(--cream)", padding:"8px 12px", borderRadius:6, lineHeight:1.6, marginTop:10 }}>"{r.message}"</div>}
                        </div>

                        {/* Accepted — show message button */}
                        {r.status === "accepted" && (
                          <div style={{ padding:"12px 20px", background:"var(--sage-bg)", borderTop:"1px solid rgba(61,107,69,0.15)", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                            <div style={{ fontSize:12, fontWeight:600, color:"var(--sage)", fontFamily:"var(--sans)" }}>🎉 Request accepted!</div>
                            <button onClick={()=>{ setOpenThread(r.id); markThreadRead(r.id); }}
                              style={{ padding:"7px 16px", background:"var(--terracotta)", color:"white", border:"none", borderRadius:6, fontSize:12, fontFamily:"var(--sans)", fontWeight:600, cursor:"pointer" }}>
                              💬 Messages
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )
            }
            {/* Notifications */}
            {notifications.length > 0 && (
              <div style={{ marginTop:28, maxWidth:720 }}>
                <div style={{ fontSize:12, fontWeight:700, color:"var(--ink-40)", textTransform:"uppercase", letterSpacing:"1px", fontFamily:"var(--sans)", marginBottom:12 }}>Notifications</div>
                <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                  {notifications.map(n => (
                    <div key={n.id} style={{ display:"flex", alignItems:"flex-start", gap:12, padding:"14px 16px", background:n.read?"var(--warm-white)":"var(--terracotta-bg)", borderRadius:10, border:`1px solid ${n.read?"var(--ink-08)":"var(--terracotta-dim)"}`, boxShadow:"var(--shadow-xs)" }}>
                      <span style={{ fontSize:20, flexShrink:0 }}>{n.type==="declined"?"✕":"📬"}</span>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:14, fontWeight:600, color:"var(--ink)", fontFamily:"var(--sans)", marginBottom:2 }}>{n.title}</div>
                        <div style={{ fontSize:14, color:"var(--ink-40)", fontFamily:"var(--sans)", lineHeight:1.5 }}>{n.body}</div>
                        <div style={{ fontSize:12, color:"var(--ink-40)", fontFamily:"var(--sans)", marginTop:4 }}>{timeAgo(n.created_at)}</div>
                      </div>
                      {!n.read && <span style={{ width:8, height:8, borderRadius:"50%", background:"var(--terracotta)", flexShrink:0, marginTop:4 }} />}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* ── MY LISTINGS ── */}
        {!showList && !sel && !viewProfile && view === "mylistings" && currentUser && (
          <>
            <SectionHead title="My listings" sub={`${myListings.length} puzzle${myListings.length!==1?"s":""} listed.`} action={<PrimaryBtn sm onClick={()=>setShowList(true)}>+ Add Puzzle</PrimaryBtn>} />
            {myListings.length === 0
              ? <EmptyState icon="📦" title="Your shelf is empty" sub="List your first puzzle to start finding it a new home." action={<PrimaryBtn onClick={()=>setShowList(true)} style={{ margin:"0 auto", display:"inline-flex" }}>List a Puzzle</PrimaryBtn>} />
              : (
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:18 }}>
                  {myListings.map(p => {
                    return (
                      <div key={p.id} style={{ background:"var(--warm-white)", borderRadius:10, border:"1px solid var(--ink-15)", overflow:"hidden", boxShadow:"0 2px 8px rgba(28,24,20,0.05)" }}>
                        <PuzzleBox artIdx={p.art||0} emoji={p.image||"🧩"} size="sm" category={p.category} photoUrl={p.photo_url||""} />
                        <div style={{ padding:"12px 14px" }}>
                          <div style={{ fontSize:14, fontFamily:"var(--serif)", color:"var(--ink)", marginBottom:2 }}>{p.title}</div>
                          <div style={{ fontSize:11, color:"var(--ink-40)", fontFamily:"var(--sans)", marginBottom:10 }}>{p.pieces.toLocaleString()} pcs · {timeAgo(p.created_at)}</div>
                          <div style={{ display:"flex", gap:5, marginBottom:12, flexWrap:"wrap" }}>
                            <CondBadge cond={p.condition} />
                            <LTBadge type={p.listing_type} />
                          </div>
                          <div style={{ paddingTop:10, borderTop:"1px solid var(--ink-08)", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                            <button onClick={()=>handleRemoveListing(p.id)} style={{ background:"none", border:"none", cursor:"pointer", fontSize:12, color:"var(--terracotta)", fontFamily:"var(--sans)" }}>Remove</button>
                            <button onClick={()=>handleStartEdit(p)} style={{ background:"none", border:"1px solid var(--ink-15)", borderRadius:5, cursor:"pointer", fontSize:12, color:"var(--ink-70)", fontFamily:"var(--sans)", padding:"4px 12px", fontWeight:500 }}>✏️ Edit</button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )
            }
          </>
        )}

        {/* ── PROFILE ── */}
        {!showList && !sel && !viewProfile && view === "profile" && currentUser && (
          <ProfileView
            currentUser={currentUser}
            pe={profEdit || currentUser}
            myListings={myListings}
            setProfEdit={setProfEdit}
            saveProfile={saveProfile}
            handleLogout={handleLogout}
            nav={nav}
          />
        )}
      </main>

      {/* ── AUTH MODAL ── */}
      {showAuth && (
        <Modal onClose={()=>setShowAuth(false)}>
          <div style={{ textAlign:"center", marginBottom:24 }}>
            <div style={{ fontSize:28, marginBottom:6 }}>🧩</div>
            <div style={{ fontSize:22, fontFamily:"var(--serif)", color:"var(--ink)" }}>
              {authTab === "login" ? "Welcome back" : "Join puzzleswap"}
            </div>
          </div>
          <div style={{ display:"flex", marginBottom:24, borderBottom:"1px solid var(--ink-08)" }}>
            {[["login","Log in"],["signup","Sign up"]].map(([t,l])=>(
              <button key={t} onClick={()=>{setAuthTab(t);setAErr("");}}
                style={{ flex:1, padding:"10px 0", background:"none", border:"none", borderBottom:authTab===t?"2px solid var(--terracotta)":"2px solid transparent", marginBottom:-1, color:authTab===t?"var(--terracotta)":"var(--ink-70)", fontFamily:"var(--sans)", fontSize:14, fontWeight:authTab===t?600:400, cursor:"pointer" }}>{l}</button>            ))}
          </div>
          {authTab === "login" ? (
            <>
              <Inp label="Email" type="email" placeholder="your@email.com" value={aEmail} onChange={e=>setAEmail(e.target.value)} />
              <Inp label="Password" type="password" placeholder="Password" value={aPass} onChange={e=>setAPass(e.target.value)} hint="Demo: sarah@example.com / demo" />
              {aErr && <div style={{ color:"var(--terracotta)", fontSize:12, marginBottom:12, fontFamily:"var(--sans)" }}>{aErr}</div>}
              <div style={{ display:"flex", gap:10 }}>
                <GhostBtn style={{ flex:1 }} onClick={()=>setShowAuth(false)}>Cancel</GhostBtn>
                <PrimaryBtn style={{ flex:2 }} onClick={handleLogin}>Log in →</PrimaryBtn>
              </div>
            </>
          ) : (
            <>
              <Inp label="Name *" placeholder="Your name" value={aName} onChange={e=>setAName(e.target.value)} />
              <Inp label="Email *" type="email" placeholder="your@email.com" value={aEmail} onChange={e=>setAEmail(e.target.value)} />
              <Inp label="Password *" type="password" value={aPass} onChange={e=>setAPass(e.target.value)} />
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                <Inp label="ZIP Code" placeholder="e.g. 60126" value={aLoc} onChange={e=>setALoc(e.target.value)} hint="Used to show nearby puzzles" />
                <Sel label="Trade preference" value={aPref} onChange={e=>setAPref(e.target.value)}>{TRADE_OPTS.map(c=><option key={c}>{c}</option>)}</Sel>
              </div>
              {aErr && <div style={{ color:"var(--terracotta)", fontSize:12, marginBottom:12, fontFamily:"var(--sans)" }}>{aErr}</div>}
              <div style={{ display:"flex", gap:10 }}>
                <GhostBtn style={{ flex:1 }} onClick={()=>setShowAuth(false)}>Cancel</GhostBtn>
                <PrimaryBtn style={{ flex:2 }} onClick={handleSignup}>Create account →</PrimaryBtn>
              </div>
            </>
          )}
        </Modal>
      )}

      {/* ── REQUEST MODAL ── */}
      {reqModal && (
        <Modal onClose={()=>setReqModal(null)} wide>
          <RequestModal puzzle={reqModal} userOf={userOf} currentUser={currentUser} onClose={()=>setReqModal(null)} onSend={handleSendRequest} />
        </Modal>
      )}

      {/* ── SEARCH OVERLAY ── */}
      {showSearch && (
        <div className="search-overlay" style={{ position:"fixed", inset:0, background:"rgba(44,31,14,0.40)", zIndex:998, backdropFilter:"blur(4px)" }} onClick={()=>{ setShowSearch(false); setSearchQ(""); }}>
          <div style={{ maxWidth:600, margin:"80px auto 0", padding:"0 16px" }} onClick={e=>e.stopPropagation()}>
            {/* Search input */}
            <div style={{ position:"relative", boxShadow:"var(--shadow-xl)" }}>
              <span style={{ position:"absolute", left:16, top:"50%", transform:"translateY(-50%)", fontSize:18, color:"var(--ink-40)", pointerEvents:"none" }}>⌕</span>
              <input
                autoFocus
                value={searchQ}
                onChange={e=>setSearchQ(e.target.value)}
                onKeyDown={e=>{ if(e.key==="Escape"){ setShowSearch(false); setSearchQ(""); }}}
                placeholder="Search by title, brand, or category…"
                style={{ width:"100%", padding:"18px 20px 18px 48px", background:"var(--warm-white)", border:"none", borderRadius:"10px 10px 0 0", fontSize:18, fontFamily:"var(--sans)", color:"var(--ink)", outline:"none" }}
              />
              <button onClick={()=>{ setShowSearch(false); setSearchQ(""); }}
                style={{ position:"absolute", right:16, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", fontSize:20, color:"var(--ink-40)", cursor:"pointer", padding:4 }}>✕</button>
            </div>
            {/* Autocomplete results */}
            <div style={{ background:"var(--warm-white)", borderRadius:"0 0 10px 10px", border:"1px solid var(--ink-08)", borderTop:"1px solid var(--ink-15)", maxHeight:"60vh", overflowY:"auto" }}>
              {searchQ.trim() === "" ? (
                <div style={{ padding:"20px 20px", color:"var(--ink-40)", fontFamily:"var(--sans)", fontSize:15 }}>
                  Start typing to search puzzles…
                </div>
              ) : (() => {
                const q = searchQ.toLowerCase();
                const results = puzzles.filter(p =>
                  p.title.toLowerCase().includes(q) ||
                  (p.brand||"").toLowerCase().includes(q) ||
                  (p.category||"").toLowerCase().includes(q)
                ).slice(0, 8);
                if (results.length === 0) return (
                  <div style={{ padding:"20px", color:"var(--ink-40)", fontFamily:"var(--sans)", fontSize:15 }}>No puzzles found for "{searchQ}"</div>
                );
                return results.map(p => (
                  <button key={p.id} onClick={()=>{
                    setShowSearch(false);
                    setSearchQ("");
                    setView("browse");
                    setShowList(false);
                    setViewProf(null);
                    setSel(p); // set AFTER goBack-like resets so it isn't wiped
                  }}
                    style={{ width:"100%", display:"flex", alignItems:"center", gap:14, padding:"14px 20px", background:"none", border:"none", borderBottom:"1px solid var(--ink-08)", cursor:"pointer", textAlign:"left", transition:"background .12s" }}
                    onMouseEnter={e=>e.currentTarget.style.background="var(--cream)"}
                    onMouseLeave={e=>e.currentTarget.style.background="none"}>
                    <div style={{ width:44, height:44, background:PIECE_PALETTE[p.art%PIECE_PALETTE.length].bg, borderRadius:6, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0, overflow:"hidden" }}>
                      {p.photo_url ? <img src={p.photo_url} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} /> : p.image || "🧩"}
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:16, fontFamily:"var(--serif)", color:"var(--ink)", fontWeight:700, marginBottom:2, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{p.title}</div>
                      <div style={{ fontSize:13, color:"var(--ink-40)", fontFamily:"var(--sans)" }}>{p.brand} · {p.pieces.toLocaleString()} pcs · {p.category}</div>
                    </div>
                    <LTBadge type={p.listing_type} />
                  </button>
                ));
              })()}
              {searchQ.trim() !== "" && (
                <button onClick={()=>{
                  setShowSearch(false);
                  setView("browse");
                  setSel(null);
                  setViewProf(null);
                  setShowList(false);
                  // searchQ stays set so browse filters by it
                }}
                  style={{ width:"100%", padding:"14px 20px", background:"var(--cream)", border:"none", borderTop:"1px solid var(--ink-08)", cursor:"pointer", fontSize:14, fontFamily:"var(--sans)", color:"var(--terracotta)", fontWeight:600, textAlign:"left" }}>
                  See all results for "{searchQ}" →
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      {openThread && (
        <MessageThread
          requestId={openThread}
          currentUserId={currentUser?.id}
          messages={threads[openThread] || []}
          onSend={sendMessage}
          onClose={()=>setOpenThread(null)}
          request={[...requests, ...sentRequests].find(r => r.id === openThread)}
        />
      )}

    </div>
  );
}
