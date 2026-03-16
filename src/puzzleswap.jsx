import { useState, useEffect, useRef } from "react";

// ─── Fonts ─────────────────────────────────────────────────────────────────
const initStyles = () => {
  if (document.getElementById("ps-styles")) return;
  // DM Serif Display (editorial serif) + DM Sans (clean body)
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap";
  document.head.appendChild(link);

  const s = document.createElement("style");
  s.id = "ps-styles";
  s.textContent = `
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      /* Surfaces */
      --cream: #F5EFE3;
      --warm-white: #FAF7F2;
      --parchment: #EDE4D3;
      --tan: #CDB99A;

      /* Ink */
      --ink: #1A1510;
      --ink-70: rgba(26,21,16,0.70);
      --ink-40: rgba(26,21,16,0.40);
      --ink-15: rgba(26,21,16,0.15);
      --ink-08: rgba(26,21,16,0.08);

      /* Brand colors — all punchy, all used structurally */
      --terracotta: #C85A30;
      --terracotta-mid: #E07050;
      --terracotta-dim: rgba(200,90,48,0.10);
      --terracotta-bg: #FBF0EB;

      --sage: #3D6B45;
      --sage-mid: #5A8C62;
      --sage-dim: rgba(61,107,69,0.10);
      --sage-bg: #EAF2EB;

      --amber: #B06B10;
      --amber-mid: #D4852A;
      --amber-dim: rgba(176,107,16,0.12);
      --amber-bg: #FEF3E2;

      --cobalt: #2E5FA3;
      --cobalt-mid: #4A7BC4;
      --cobalt-dim: rgba(46,95,163,0.10);
      --cobalt-bg: #EAF0FB;

      --plum: #6B3A7D;
      --plum-dim: rgba(107,58,125,0.10);
      --plum-bg: #F4EDF7;

      --serif: 'DM Serif Display', Georgia, serif;
      --sans: 'DM Sans', system-ui, sans-serif;
    }

    body { background: var(--warm-white); color: var(--ink); font-family: var(--sans); }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 4px; height: 4px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: var(--tan); border-radius: 99px; }

    input, textarea, select { font-family: var(--sans); }
    input::placeholder, textarea::placeholder { color: var(--ink-40); }
    input:focus, textarea:focus, select:focus {
      outline: none;
      border-color: var(--terracotta) !important;
      box-shadow: 0 0 0 3px rgba(196,96,58,0.10) !important;
    }

    /* Card hover */
    .ps-card {
      transition: transform 0.28s cubic-bezier(0.34,1.4,0.64,1), box-shadow 0.28s ease;
      cursor: pointer;
    }
    .ps-card:hover { transform: translateY(-8px) rotate(0.3deg); box-shadow: 0 32px 64px rgba(26,21,16,0.14) !important; }
    .ps-card:hover .card-action { background: var(--terracotta) !important; color: white !important; }

    /* Nav link */
    .nav-link { transition: color 0.15s; }
    .nav-link:hover { color: var(--terracotta) !important; }

    /* Filter pill */
    .filter-pill { transition: all 0.15s; }
    .filter-pill:hover { border-color: var(--terracotta) !important; color: var(--terracotta) !important; }

    /* Primary btn */
    .ps-btn-primary { transition: transform 0.14s ease, box-shadow 0.14s ease; }
    .ps-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(200,90,48,0.32); }
    .ps-btn-primary:active { transform: translateY(0); }

    /* Ghost btn */
    .ps-btn-ghost { transition: all 0.15s; }
    .ps-btn-ghost:hover { border-color: var(--ink) !important; color: var(--ink) !important; }

    /* Affiliate & ship links */
    .aff-link { transition: all 0.15s; }
    .aff-link:hover { border-color: var(--amber) !important; background: var(--amber-dim) !important; }
    .ship-link { transition: all 0.15s; }
    .ship-link:hover { border-color: var(--cobalt) !important; background: var(--cobalt-dim) !important; }

    /* Grain overlay for texture */
    .grain::after {
      content: '';
      position: absolute;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
      border-radius: inherit;
      pointer-events: none;
      opacity: 0.5;
    }

    /* Animations */
    @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
    @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
    @keyframes slideDown { from { opacity:0; transform:translateY(-10px); } to { opacity:1; transform:translateY(0); } }
    @keyframes float1 { 0%,100%{transform:translateY(0) rotate(-3deg);} 50%{transform:translateY(-10px) rotate(-3deg);} }
    @keyframes float2 { 0%,100%{transform:translateY(0) rotate(2deg);} 50%{transform:translateY(-14px) rotate(2deg);} }
    @keyframes float3 { 0%,100%{transform:translateY(0) rotate(-1deg);} 50%{transform:translateY(-7px) rotate(-1deg);} }
    @keyframes crownPop { 0%,100%{transform:translateY(0) scale(1);} 50%{transform:translateY(-4px) scale(1.05);} }
    @keyframes shimmer { 0%{background-position:200% 0;} 100%{background-position:-200% 0;} }

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
    }
    @media (max-width: 420px) {
      .card-grid    { grid-template-columns: 1fr !important; }
      .how-grid     { grid-template-columns: 1fr !important; }
    }
    .mobile-only { display: none; }

    /* Mobile bottom nav */
    .mobile-nav {
      position: fixed; bottom: 0; left: 0; right: 0;
      background: var(--ink);
      border-top: 1px solid rgba(255,255,255,0.08);
      display: none;
      z-index: 300;
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
      color: rgba(255,255,255,0.45); font-family: var(--sans);
      font-size: 10px; font-weight: 500; letter-spacing: 0.2px;
      transition: color 0.15s;
    }
    .mobile-nav-btn.active { color: var(--terracotta-mid); }
    .mobile-nav-btn:hover  { color: rgba(255,255,255,0.75); }
    .mobile-nav-icon { font-size: 18px; line-height: 1; }
      position: absolute;
      width: 28px;
      height: 28px;
      opacity: 0.12;
    }
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

const SEED_USERS = {
  "sarah@example.com": { id:"u1", name:"Sarah M.", email:"sarah@example.com", password:"demo", location:"Elmhurst, IL", tradeCount:12, memberSince:"Jan 2024", bio:"Landscape and impressionist puzzles only — the harder the better." },
  "tom@example.com":   { id:"u2", name:"Tom K.",   email:"tom@example.com",   password:"demo", location:"Oak Park, IL", tradeCount:4,  memberSince:"Mar 2024", bio:"" },
};


const SEED_PUZZLES = [
  { id:"p1",  userId:"u1", title:"Vintage Board Games",     brand:"White Mountain",  pieces:1000, condition:"Like New",  listingType:"swap",   category:"Collage",    description:"Dozens of classic games packed into one — Clue, Sorry, Twister, Risk and more. All pieces verified.", art:6, saves:27, posted:"1d ago",  boostExpiry: Date.now()+5*864e5, image:"🎲" },
  { id:"p2",  userId:"u2", title:"Retro Candy Labels",      brand:"White Mountain",  pieces:1000, condition:"Excellent", listingType:"offer",  category:"Collage",    description:"Wall-to-wall vintage candy wrappers — 80+ brands, pure nostalgia.", art:9, saves:19, posted:"2d ago",  boostExpiry: null, image:"🍭" },
  { id:"p3",  userId:"u1", title:"Classic Album Covers",    brand:"White Mountain",  pieces:1000, condition:"Good",      listingType:"free",   category:"Collage",    description:"Rock and pop classics wall to wall. Every inch has something to find. Just cover shipping.", art:3, saves:33, posted:"4d ago",  boostExpiry: null, image:"🎸" },
  { id:"p4",  userId:"u2", title:"Autumn Valley",           brand:"Vermont Country", pieces:1000, condition:"Like New",  listingType:"swap",   category:"Landscape",  description:"Peak fall color across rolling hills, misty morning light. One of the best I've done.", art:1, saves:8,  posted:"6d ago",  boostExpiry: null, image:"🍂" },
  { id:"p5",  userId:"u1", title:"Scottish Highlands",      brand:"Ravensburger",    pieces:1500, condition:"Excellent", listingType:"offer",  category:"Landscape",  description:"Sweeping glens, dramatic skies, heather-covered hillsides. Open to offers.", art:4, saves:12, posted:"3d ago",  boostExpiry: null, image:"🏔️" },
  { id:"p6",  userId:"u2", title:"City Lights Panorama",    brand:"Clementoni",      pieces:1000, condition:"Excellent", listingType:"swap",   category:"Nightscape", description:"Glittering downtown reflections on water. Completed twice. Open to swap + small top-up.", art:0, saves:18, posted:"4d ago",  boostExpiry: Date.now()+2*864e5, image:"🌆" },
  { id:"p7",  userId:"u1", title:"Starry Night Over Water", brand:"Eurographics",    pieces:1500, condition:"Like New",  listingType:"offer",  category:"Nightscape", description:"Deep indigo sky, moonlit reflections, Van Gogh swirls. Stunning. Open to offers.", art:6, saves:31, posted:"1wk ago", boostExpiry: null, image:"🌌" },
  { id:"p8",  userId:"u2", title:"African Wildlife",        brand:"Ravensburger",    pieces:1500, condition:"Excellent", listingType:"offer",  category:"Animals",    description:"Lions, elephants, giraffes across a golden savanna. Stunning photography.", art:5, saves:15, posted:"2d ago",  boostExpiry: null, image:"🦁" },
  { id:"p9",  userId:"u1", title:"Cottage Garden Cats",     brand:"Cobble Hill",     pieces:500,  condition:"Good",      listingType:"free",   category:"Animals",    description:"Fluffy cats among summer flowers. Easy and relaxing. Box worn, all pieces there.", art:2, saves:11, posted:"3d ago",  boostExpiry: null, image:"🐱" },
  { id:"p10", userId:"u2", title:"Monet's Water Lilies",    brand:"Cobble Hill",     pieces:750,  condition:"Like New",  listingType:"pickup", category:"Fine Art",   description:"Serene Impressionist masterpiece. Barely touched the table. Free local pickup Elmhurst.", art:1, saves:22, posted:"Today",   boostExpiry: null, image:"🌸" },
  { id:"p11", userId:"u1", title:"Van Gogh Sunflowers",     brand:"Eurographics",    pieces:1000, condition:"Excellent", listingType:"swap",   category:"Fine Art",   description:"Bold yellows and golds. Easier than Starry Night — great intro to fine art puzzles.", art:7, saves:16, posted:"5d ago",  boostExpiry: null, image:"🌻" },
  { id:"p12", userId:"u2", title:"Tuscan Hilltop Village",  brand:"Schmidt",         pieces:1500, condition:"Good",      listingType:"offer",  category:"Travel",     description:"Cobblestone alleys, terracotta rooftops, cypress trees. Charming and tricky.", art:4, saves:9,  posted:"5d ago",  boostExpiry: null, image:"🏘️" },
  { id:"p13", userId:"u1", title:"Christmas Morning",       brand:"Buffalo Games",   pieces:1000, condition:"Like New",  listingType:"swap",   category:"Seasonal",   description:"Cozy fireplace, wrapped gifts, snowy window. A holiday tradition. All pieces present.", art:2, saves:14, posted:"2d ago",  boostExpiry: null, image:"🎄" },
];

const CATEGORIES = ["All", "Collage", "Landscape", "Nightscape", "Animals", "Fine Art", "Travel", "Seasonal", "Food", "Other"];
const CONDITIONS  = ["Like New","Excellent","Good","Fair"];
const TRADE_OPTS  = ["Local","Will Ship","Both"];
const CAT_OPT     = CATEGORIES.filter(c => c !== "All");
const EMOJIS = ["🏔️","🌊","🌸","🌆","🗺️","🌌","🦁","🐬","🌻","🦋","🚂","🏡","🎨","🌍","🗼","🏰","🌹","🦊","🎲","🐶","🐱","🦅","🏛️","🎠","🍭","🥣","📚","🎸","⚽","🍰","🧁","🍕","🌮","🍜","🍓","🎄","🌾","🎃"];
const AFFILIATE_TAG      = "puzzleswap-20";
const PIRATESHIP_REF_URL = "https://www.pirateship.com?ref=puzzleswap";
const BOOST_PRICE = "$1.99";
const BOOST_MS    = 7 * 864e5;

const isBoosted  = p => p.boostExpiry && p.boostExpiry > Date.now();
const daysLeft   = p => Math.ceil((p.boostExpiry - Date.now()) / 864e5);
const affUrl     = p => `https://www.amazon.com/s?k=${encodeURIComponent(`${p.brand} ${p.title} puzzle ${p.pieces} pieces`)}&tag=${AFFILIATE_TAG}`;
const needsShip  = lt => lt === "swap" || lt === "offer" || lt === "free";

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
    <span style={{ display:"inline-flex", alignItems:"center", gap:4, padding:pad, background:lt.bg, color:lt.color, borderRadius:3, fontSize:fs, fontWeight:600, fontFamily:"var(--sans)", whiteSpace:"nowrap", letterSpacing:"0.3px" }}>
      <span style={{ fontSize: fs + 1 }}>{lt.icon}</span> {lt.label}
    </span>
  );
}

function CondBadge({ cond }) {
  const m = condMeta[cond] || condMeta["Good"];
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:4, padding:"2px 8px", background:m.bg, color:m.color, borderRadius:3, fontSize:10, fontWeight:500, fontFamily:"var(--sans)", whiteSpace:"nowrap" }}>
      {cond}
    </span>
  );
}

// The main visual — a proper illustrated puzzle box
function PuzzleBox({ artIdx, emoji, size = "md" }) {
  const p = PIECE_PALETTE[artIdx % PIECE_PALETTE.length];
  const h = size === "lg" ? 260 : size === "sm" ? 100 : 180;
  return (
    <div style={{ height: h, background: p.bg, position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Inner mat/mount border — real puzzle boxes have this */}
      <div style={{ position:"absolute", inset:10, border:`1px solid ${p.accent}30`, borderRadius:2 }} />
      <div style={{ position:"absolute", inset:13, border:`1px solid ${p.accent}18`, borderRadius:1 }} />
      {/* Radial glow */}
      <div style={{ position:"absolute", inset:0, background:`radial-gradient(ellipse at 40% 40%, ${p.accent}30 0%, transparent 65%)` }} />
      {/* Fine crosshatch texture */}
      <div style={{ position:"absolute", inset:0, backgroundImage:`repeating-linear-gradient(0deg, transparent, transparent 18px, ${p.accent}08 18px, ${p.accent}08 19px), repeating-linear-gradient(90deg, transparent, transparent 18px, ${p.accent}08 18px, ${p.accent}08 19px)` }} />
      {/* Emoji subject */}
      <div style={{ fontSize: size==="lg"?80:size==="sm"?38:56, position:"relative", zIndex:2, filter:`drop-shadow(0 4px 20px ${p.accent}60) drop-shadow(0 0 40px ${p.accent}30)` }}>
        {emoji || "🧩"}
      </div>
      {/* Bottom label strip */}
      <div style={{ position:"absolute", bottom:0, left:0, right:0, background:`linear-gradient(transparent, rgba(0,0,0,0.65))`, padding:"16px 12px 8px", display:"flex", justifyContent:"space-between", alignItems:"flex-end" }}>
        <span style={{ fontSize:8, fontFamily:"var(--sans)", fontWeight:600, color:`${p.accent}cc`, letterSpacing:"2px", textTransform:"uppercase" }}>PUZZLE</span>
        <span style={{ fontSize:8, fontFamily:"var(--sans)", color:"rgba(255,255,255,0.35)", letterSpacing:"1px" }}>JIGSAW</span>
      </div>
    </div>
  );
}

function PieceCount({ pieces }) {
  return (
    <div style={{ position:"absolute", top:10, right:10, background:"rgba(28,24,20,0.72)", backdropFilter:"blur(10px)", borderRadius:4, padding:"4px 8px", textAlign:"center" }}>
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
  <div style={{ marginBottom: 16 }}>
    {label && <div style={{ fontSize:11, fontWeight:600, color:"var(--ink-70)", textTransform:"uppercase", letterSpacing:"0.8px", fontFamily:"var(--sans)", marginBottom:6 }}>{label}</div>}
    <input style={{ width:"100%", padding:"11px 14px", background:"var(--warm-white)", border:"1px solid var(--ink-15)", borderRadius:6, fontSize:14, fontFamily:"var(--sans)", color:"var(--ink)", transition:"border-color .15s, box-shadow .15s" }} {...p} />
    {hint && <div style={{ fontSize:11, color:"var(--ink-40)", marginTop:4, fontFamily:"var(--sans)" }}>{hint}</div>}
  </div>
);
const Sel = ({ label, children, ...p }) => (
  <div style={{ marginBottom: 16 }}>
    {label && <div style={{ fontSize:11, fontWeight:600, color:"var(--ink-70)", textTransform:"uppercase", letterSpacing:"0.8px", fontFamily:"var(--sans)", marginBottom:6 }}>{label}</div>}
    <select style={{ width:"100%", padding:"11px 14px", background:"var(--warm-white)", border:"1px solid var(--ink-15)", borderRadius:6, fontSize:14, fontFamily:"var(--sans)", color:"var(--ink)" }} {...p}>{children}</select>
  </div>
);
const TA = ({ label, ...p }) => (
  <div style={{ marginBottom: 16 }}>
    {label && <div style={{ fontSize:11, fontWeight:600, color:"var(--ink-70)", textTransform:"uppercase", letterSpacing:"0.8px", fontFamily:"var(--sans)", marginBottom:6 }}>{label}</div>}
    <textarea style={{ width:"100%", padding:"11px 14px", background:"var(--warm-white)", border:"1px solid var(--ink-15)", borderRadius:6, fontSize:14, fontFamily:"var(--sans)", color:"var(--ink)", resize:"vertical", minHeight:88, transition:"border-color .15s" }} {...p} />
  </div>
);

function PrimaryBtn({ children, sm = false, style = {}, ...p }) {
  return (
    <button className="ps-btn-primary" style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", gap:7, padding:sm?"9px 18px":"14px 26px", background:"var(--terracotta)", color:"white", border:"none", borderRadius:6, fontSize:sm?12:14, fontFamily:"var(--sans)", fontWeight:600, cursor:"pointer", letterSpacing:"0.2px", whiteSpace:"nowrap", ...style }} {...p}>
      {children}
    </button>
  );
}
function GhostBtn({ children, style = {}, ...p }) {
  return (
    <button className="ps-btn-ghost" style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", padding:"12px 20px", background:"transparent", color:"var(--ink-70)", border:"1px solid var(--ink-15)", borderRadius:6, fontSize:14, fontFamily:"var(--sans)", fontWeight:500, cursor:"pointer", transition:"all .15s", ...style }} {...p}>
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
      <div style={{ fontSize:10, color:"var(--ink-40)", fontFamily:"var(--sans)", marginTop:4, paddingLeft:2 }}>puzzleswap may earn a referral fee — never affects your price.</div>
    </div>
  );
}

// ─── Request Modal ────────────────────────────────────────────────────────────
function RequestModal({ puzzle, userOf, onClose }) {
  const owner = userOf(puzzle);
  const [step, setStep] = useState("form");
  const [offerType, setOfferType] = useState("swap");
  const [swapDesc, setSwapDesc] = useState("");
  const [topUp, setTopUp] = useState("");
  const [offerAmt, setOfferAmt] = useState("");
  const [msg, setMsg] = useState(
    puzzle.listingType === "free" || puzzle.listingType === "pickup"
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
      {needsShip(puzzle.listingType) && (
        <div style={{ borderTop:"1px solid var(--ink-08)", paddingTop:20 }}>
          <PirateshipBlock context="post-request" />
        </div>
      )}
    </div>
  );

  const lt = LISTING_TYPES[puzzle.listingType] || LISTING_TYPES.offer;
  return (
    <>
      {/* Puzzle preview */}
      <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:22, padding:"14px 16px", background:"var(--parchment)", borderRadius:8 }}>
        <div style={{ width:52, height:52, background:PIECE_PALETTE[puzzle.art%PIECE_PALETTE.length].bg, borderRadius:6, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, flexShrink:0 }}>{puzzle.image||"🧩"}</div>
        <div>
          <div style={{ fontSize:15, fontFamily:"var(--serif)", color:"var(--ink)", marginBottom:2 }}>{puzzle.title}</div>
          <div style={{ fontSize:12, color:"var(--ink-70)", fontFamily:"var(--sans)" }}>{puzzle.pieces.toLocaleString()} pieces · {owner?.name}</div>
        </div>
        <LTBadge type={puzzle.listingType} />
      </div>

      {/* Free/pickup */}
      {(puzzle.listingType === "free" || puzzle.listingType === "pickup") && (
        <div style={{ background:lt.bg, border:`1px solid ${lt.color}33`, borderRadius:8, padding:"12px 16px", marginBottom:18 }}>
          <div style={{ fontSize:13, fontWeight:600, color:"var(--ink)", fontFamily:"var(--sans)", marginBottom:3 }}>
            {puzzle.listingType === "free" ? "Free — you cover shipping (~$5–9)" : "Free local pickup only"}
          </div>
          <div style={{ fontSize:12, color:"var(--ink-70)", fontFamily:"var(--sans)" }}>Coordinate the details with {owner?.name} after sending your request.</div>
        </div>
      )}

      {/* Swap offer */}
      {puzzle.listingType === "swap" && (
        <div style={{ marginBottom:18 }}>
          <div style={{ fontSize:11, fontWeight:600, color:"var(--ink-70)", textTransform:"uppercase", letterSpacing:".8px", fontFamily:"var(--sans)", marginBottom:10 }}>Your offer</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:14 }}>
            {[["swap","⇄","Even Swap","Puzzle for puzzle — each ships their own"],["swap_plus","⇄ +$","Swap + Top-up","Your puzzle plus a cash difference"]].map(([v,icon,label,sub])=>(
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
      {puzzle.listingType === "offer" && (
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
          {offerType === "cash" && <Inp label="Offer amount ($)" type="number" placeholder="e.g. 12" value={offerAmt} onChange={e=>setOfferAmt(e.target.value)} hint="Payment via Venmo or PayPal — sort with lister." />}
          {(offerType === "swap" || offerType === "swap_plus") && <TA label="Your puzzle" placeholder="Name, brand, piece count, condition…" value={swapDesc} onChange={e=>setSwapDesc(e.target.value)} />}
          {offerType === "swap_plus" && <Inp label="Cash top-up ($)" type="number" placeholder="e.g. 5" value={topUp} onChange={e=>setTopUp(e.target.value)} />}
        </div>
      )}

      <TA label="Message" value={msg} onChange={e=>setMsg(e.target.value)} />
      <div style={{ display:"flex", gap:10 }}>
        <GhostBtn style={{ flex:1 }} onClick={onClose}>Cancel</GhostBtn>
        <PrimaryBtn style={{ flex:2 }} onClick={()=>setStep("sent")}>Send Request</PrimaryBtn>
      </div>
    </>
  );
}

// ─── Boost Modal ──────────────────────────────────────────────────────────────
function BoostModal({ puzzle, onClose, onBoost }) {
  const [state, setState] = useState("idle"); // idle | paying | done
  const go = () => { setState("paying"); setTimeout(()=>{ setState("done"); setTimeout(()=>{ onBoost(puzzle.id); onClose(); }, 1500); }, 1200); };
  if (state === "done") return (
    <div style={{ textAlign:"center", padding:"20px 0" }}>
      <div style={{ fontSize:48, marginBottom:12 }}>👑</div>
      <div style={{ fontSize:24, fontFamily:"var(--serif)", color:"var(--ink)", marginBottom:8 }}>Boosted for 7 days</div>
      <div style={{ fontSize:14, color:"var(--ink-70)", fontFamily:"var(--sans)" }}>Your listing now sits above all others in browse and search.</div>
    </div>
  );
  return (
    <>
      <div style={{ background:"var(--parchment)", borderRadius:10, overflow:"hidden", marginBottom:22, border:"1px solid var(--tan)" }}>
        <PuzzleBox artIdx={puzzle.art||0} emoji={puzzle.image||"🧩"} size="sm" />
        <div style={{ padding:"10px 14px" }}>
          <div style={{ fontSize:14, fontFamily:"var(--serif)", color:"var(--ink)" }}>{puzzle.title}</div>
          <div style={{ fontSize:11, color:"var(--ink-70)", fontFamily:"var(--sans)", marginTop:2 }}>{puzzle.pieces.toLocaleString()} pieces</div>
        </div>
      </div>
      <div style={{ fontSize:22, fontFamily:"var(--serif)", color:"var(--ink)", marginBottom:6 }}>Boost this listing</div>
      <p style={{ fontSize:14, color:"var(--ink-70)", fontFamily:"var(--sans)", lineHeight:1.65, marginBottom:18 }}>Your puzzle will appear at the top of all browse results and searches for 7 days with a gold crown.</p>
      <div style={{ background:"var(--cream)", borderRadius:8, padding:"14px 16px", marginBottom:20, border:"1px solid var(--tan)" }}>
        {["👑  Pinned above all other listings","📈  First in every filter & category","✨  Gold crown badge on your card","⏱  Active for exactly 7 days"].map(t=>(
          <div key={t} style={{ fontSize:13, color:"var(--ink-70)", fontFamily:"var(--sans)", marginBottom:6 }}>{t}</div>
        ))}
      </div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
        <span style={{ fontSize:13, color:"var(--ink-70)", fontFamily:"var(--sans)" }}>One-time boost</span>
        <span style={{ fontSize:26, fontFamily:"var(--serif)", color:"var(--terracotta)" }}>{BOOST_PRICE}</span>
      </div>
      <div style={{ display:"flex", gap:10 }}>
        <GhostBtn style={{ flex:1 }} onClick={onClose}>Cancel</GhostBtn>
        <PrimaryBtn style={{ flex:2 }} onClick={go}>{state==="paying"?"Processing…":`Pay ${BOOST_PRICE} & Boost`}</PrimaryBtn>
      </div>
      <div style={{ textAlign:"center", marginTop:10, fontSize:10, color:"var(--ink-40)", fontFamily:"var(--sans)" }}>Payments via Stripe · Secure</div>
    </>
  );
}

// ─── Puzzle Card ──────────────────────────────────────────────────────────────
function PuzzleCard({ puzzle, onOpen, onRequest, saved, onToggleSave, animClass = "" }) {
  const boosted = isBoosted(puzzle);
  const lt = LISTING_TYPES[puzzle.listingType] || LISTING_TYPES.offer;
  return (
    <div className={`ps-card ${animClass}`}
      style={{ background:"var(--warm-white)", borderRadius:10, border:`1px solid ${boosted?"var(--amber)":"var(--ink-15)"}`, overflow:"visible", boxShadow: boosted ? "0 4px 24px rgba(176,107,16,0.20)" : "0 2px 12px rgba(26,21,16,0.06)", position:"relative" }}
      onClick={()=>onOpen(puzzle)}>
      {boosted && (
        <div className="crown-anim" style={{ position:"absolute", top:-11, left:"50%", transform:"translateX(-50%)", background:"var(--amber)", borderRadius:99, padding:"2px 10px", fontSize:10, fontWeight:700, color:"white", fontFamily:"var(--sans)", whiteSpace:"nowrap", boxShadow:"0 2px 10px rgba(176,107,16,0.4)", zIndex:10, letterSpacing:"0.3px" }}>
          👑 FEATURED
        </div>
      )}
      <div style={{ borderRadius:10, overflow:"hidden" }}>
        {/* Art */}
        <div style={{ position:"relative" }}>
          <PuzzleBox artIdx={puzzle.art||0} emoji={puzzle.image||"🧩"} size="md" />
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
          <div style={{ fontSize:16, fontFamily:"var(--serif)", color:"var(--ink)", marginBottom:2, lineHeight:1.25 }}>{puzzle.title}</div>
          <div style={{ fontSize:11, color:"var(--ink-40)", fontFamily:"var(--sans)", marginBottom:10 }}>{puzzle.brand}</div>

          <div style={{ display:"flex", gap:5, flexWrap:"wrap", marginBottom:13 }}>
            <CondBadge cond={puzzle.condition} />
            <LTBadge type={puzzle.listingType} />
          </div>

          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingTop:11, borderTop:"1px solid var(--ink-08)" }}>
            <span style={{ fontSize:10, color:"var(--ink-40)", fontFamily:"var(--sans)" }}>♥ {puzzle.saves} · {puzzle.posted}</span>
            <button className="card-action" style={{ padding:"7px 14px", background:"var(--parchment)", color:"var(--ink)", border:"none", borderRadius:4, fontSize:11, fontFamily:"var(--sans)", fontWeight:600, cursor:"pointer", transition:"all .2s" }}
              onClick={e=>{ e.stopPropagation(); onRequest(puzzle); }}>
              {puzzle.listingType === "free" || puzzle.listingType === "pickup" ? "Claim" : "Request"} →
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
    <div style={{ borderRadius:12, overflow:"hidden", marginBottom:40, border:"1px solid var(--ink-15)", boxShadow:"0 4px 20px rgba(26,21,16,0.06)" }}>
      {/* Header band */}
      <div style={{ background:"var(--terracotta)", padding:"14px 28px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ fontSize:11, fontWeight:700, color:"rgba(255,255,255,0.85)", textTransform:"uppercase", letterSpacing:"2px", fontFamily:"var(--sans)" }}>How it works</div>
        <div style={{ fontSize:11, color:"rgba(255,255,255,0.55)", fontFamily:"var(--sans)" }}>No fees. No platform cuts. Just puzzles finding new homes.</div>
      </div>
      {/* Cards row */}
      <div className="how-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", background:"var(--warm-white)" }}>
        {Object.entries(LISTING_TYPES).map(([key, lt], i) => (
          <div key={key} style={{ padding:"20px 22px", borderRight: i < 3 ? "1px solid var(--ink-08)" : "none", background: i % 2 === 1 ? "var(--cream)" : "var(--warm-white)" }}>
            <div style={{ fontSize:26, marginBottom:10, color:lt.color }}>{lt.icon}</div>
            <div style={{ fontSize:14, fontWeight:600, color:"var(--ink)", fontFamily:"var(--sans)", marginBottom:4 }}>{lt.label}</div>
            <div style={{ fontSize:12, color:"var(--ink-70)", fontFamily:"var(--sans)", lineHeight:1.55, marginBottom:8 }}>{lt.desc}</div>
            <div style={{ display:"inline-flex", padding:"3px 8px", background:lt.bg, color:lt.color, borderRadius:3, fontSize:10, fontWeight:600, fontFamily:"var(--sans)" }}>
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
// ─── Modal (must be outside main component to prevent input focus loss) ───────
function Modal({ onClose, children, wide }) {
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(28,24,20,0.6)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:999, padding:24, backdropFilter:"blur(6px)", overflowY:"auto", animation:"fadeIn 0.2s ease" }} onClick={onClose}>
      <div style={{ background:"var(--warm-white)", borderRadius:12, padding:32, maxWidth:wide?520:440, width:"100%", border:"1px solid var(--ink-15)", boxShadow:"0 40px 80px rgba(28,24,20,0.25)", margin:"auto", animation:"slideDown 0.25s ease" }} onClick={e=>e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

export default function PuzzleSwap() {
  const [users, setUsers]           = useState(SEED_USERS);
  const [puzzles, setPuzzles]       = useState(SEED_PUZZLES);
  const [currentUser, setCU]        = useState(null);
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
  const [boostModal, setBoostModal] = useState(null);
  const [aEmail, setAEmail]         = useState("");
  const [aPass, setAPass]           = useState("");
  const [aName, setAName]           = useState("");
  const [aLoc, setALoc]             = useState("");
  const [aPref, setAPref]           = useState("Both");
  const [aErr, setAErr]             = useState("");
  const [nl, setNl] = useState({ title:"", pieces:"", brand:"", condition:"Like New", listingType:"swap", tradePreference:"Both", description:"", category:"Collage", image:"🧩" });
  const [profEdit, setProfEdit]     = useState(null);

  const userOf  = p => Object.values(users).find(u => u.id === p.userId);
  const enrich  = arr => arr.map(p => ({ ...p, _owner: userOf(p) }));
  const sortB   = arr => [...arr.filter(isBoosted), ...arr.filter(p => !isBoosted(p))];

  const matchPiece = p => {
    if (pieceF === "Any")    return true;
    if (pieceF === "<500")   return p.pieces < 500;
    if (pieceF === "500–1k") return p.pieces >= 500 && p.pieces <= 1000;
    if (pieceF === "1k–2k")  return p.pieces > 1000 && p.pieces <= 2000;
    if (pieceF === "2k+")    return p.pieces > 2000;
    return true;
  };

  const filtered = sortB(enrich(puzzles.filter(p => {
    if (currentUser && p.userId === currentUser.id) return false;
    if (catF !== "All" && p.category !== catF) return false;
    if (typeF !== "All" && p.listingType !== typeF) return false;
    if (!p.title.toLowerCase().includes(searchQ.toLowerCase())) return false;
    return matchPiece(p);
  })));

  const myListings = enrich(puzzles.filter(p => currentUser && p.userId === currentUser.id));

  const goBack = () => { setSel(null); setViewProf(null); setShowList(false); };
  const nav    = v  => { setView(v); goBack(); };

  const handleLogin = () => {
    const u = users[aEmail];
    if (!u || u.password !== aPass) { setAErr("Invalid email or password."); return; }
    setCU({...u}); setShowAuth(false); setAErr(""); setAEmail(""); setAPass("");
  };
  const handleSignup = () => {
    if (!aName || !aEmail || !aPass) { setAErr("All starred fields are required."); return; }
    if (users[aEmail]) { setAErr("Account already exists."); return; }
    const u = { id:"u"+Date.now(), name:aName, email:aEmail, password:aPass, location:aLoc, tradePreference:aPref, tradeCount:0, memberSince:new Date().toLocaleString("default",{month:"short",year:"numeric"}), bio:"" };
    setUsers(prev=>({...prev,[aEmail]:u})); setCU({...u}); setShowAuth(false); setAErr(""); setAName(""); setAEmail(""); setAPass(""); setALoc("");
  };
  const handleSubmit = () => {
    if (!nl.title || !nl.pieces) return;
    const p = { ...nl, id:"p"+Date.now(), userId:currentUser.id, pieces:parseInt(nl.pieces), posted:"Just now", saves:0, art:Math.floor(Math.random()*PIECE_PALETTE.length), boostExpiry:null };
    setPuzzles(prev=>[p,...prev]); setShowList(false);
    setNl({ title:"", pieces:"", brand:"", condition:"Like New", listingType:"swap", tradePreference:"Both", description:"", category:"Collage", image:"🧩" });
    setView("mylistings");
  };
  const handleReq   = p => { if (!currentUser) { setAuthTab("signup"); setShowAuth(true); } else setReqModal(p); };
  const applyBoost  = id => { setPuzzles(p => p.map(x => x.id===id ? {...x,boostExpiry:Date.now()+BOOST_MS} : x)); };
  const saveProfile = () => { if (!profEdit) return; setCU({...profEdit}); setUsers(p=>({...p,[profEdit.email]:profEdit})); setProfEdit(null); };

  const isBrowse = view==="browse" && !sel && !showList && !viewProfile;
  const isSaved  = view==="saved"  && !sel && !viewProfile;
  const isMyList = view==="mylistings" && !showList;

  // Filter pill
  const FPill = ({label, active, onClick}) => (
    <button className="filter-pill" onClick={onClick}
      style={{ padding:"7px 15px", background:active?"var(--terracotta)":"transparent", color:active?"white":"var(--ink-70)", border:`1px solid ${active?"var(--terracotta)":"var(--ink-15)"}`, borderRadius:99, fontSize:12, fontFamily:"var(--sans)", fontWeight:active?600:400, cursor:"pointer", whiteSpace:"nowrap", transition:"all .15s" }}>
      {label}
    </button>
  );

  const BackBtn = ({ onClick }) => (
    <button onClick={onClick} style={{ display:"inline-flex", alignItems:"center", gap:6, color:"var(--ink-70)", background:"none", border:"none", cursor:"pointer", fontSize:13, fontFamily:"var(--sans)", marginBottom:28, padding:0 }}
      onMouseEnter={e=>e.currentTarget.style.color="var(--ink)"} onMouseLeave={e=>e.currentTarget.style.color="var(--ink-70)"}>
      ← Back
    </button>
  );

  const SectionHead = ({ title, sub, action }) => (
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:32 }}>
      <div>
        <h2 style={{ fontSize:30, fontFamily:"var(--serif)", color:"var(--ink)", letterSpacing:"-0.3px", marginBottom:4 }}>{title}</h2>
        {sub && <p style={{ fontSize:14, color:"var(--ink-70)", fontFamily:"var(--sans)" }}>{sub}</p>}
      </div>
      {action}
    </div>
  );

  const Grid = ({ items }) => (
    <div className="card-grid" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:22 }}>
      {items.map((p,i) => (
        <PuzzleCard key={p.id} puzzle={p} animClass={`f${Math.min(i+1,6)}`}
          onOpen={setSel} onRequest={handleReq}
          saved={savedList.includes(p.id)}
          onToggleSave={id=>setSaved(s=>s.includes(id)?s.filter(x=>x!==id):[...s,id])}
        />
      ))}
    </div>
  );

  const StatBox = ({ num, label, accent }) => (
    <div style={{ background:"var(--cream)", borderRadius:8, padding:"14px 16px", textAlign:"center", flex:1, border:"1px solid var(--tan)" }}>
      <div style={{ fontSize:20, fontFamily:"var(--serif)", color:accent?"var(--terracotta)":"var(--ink)" }}>{num}</div>
      <div style={{ fontSize:10, color:"var(--ink-40)", fontFamily:"var(--sans)", textTransform:"uppercase", letterSpacing:"1px", marginTop:3 }}>{label}</div>
    </div>
  );
  return (
    <div style={{ minHeight:"100vh", background:"var(--warm-white)" }}>

      {/* ── HEADER ── */}
      <header style={{ background:"var(--ink)", borderBottom:"1px solid rgba(255,255,255,0.08)", position:"sticky", top:0, zIndex:200 }}>
        <div style={{ maxWidth:1160, margin:"0 auto", padding:"0 20px", height:58, display:"grid", gridTemplateColumns:"auto 1fr auto", alignItems:"center", gap:12 }}>

          {/* LEFT — logo */}
          <div style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer", flexShrink:0 }} onClick={()=>nav("browse")}>
            <div style={{ fontSize:20 }}>🧩</div>
            <span style={{ fontSize:17, fontFamily:"var(--serif)", color:"white", letterSpacing:"-0.3px", fontStyle:"italic", whiteSpace:"nowrap" }}>puzzleswap</span>
          </div>

          {/* CENTER — search + nav (desktop only) */}
          <div className="desktop-nav" style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:4 }}>
            {/* Search */}
            <div style={{ position:"relative", marginRight:4 }}>
              <span style={{ position:"absolute", left:11, top:"50%", transform:"translateY(-50%)", fontSize:13, color:"rgba(255,255,255,0.28)", userSelect:"none", pointerEvents:"none" }}>⌕</span>
              <input
                style={{ width:200, padding:"7px 14px 7px 30px", background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.10)", borderRadius:99, fontSize:12, fontFamily:"var(--sans)", color:"white", outline:"none", transition:"width .2s ease, background .15s" }}
                placeholder="Search puzzles…"
                value={searchQ}
                onChange={e=>setSearchQ(e.target.value)}
                onFocus={e=>{ e.target.style.width="260px"; e.target.style.background="rgba(255,255,255,0.11)"; }}
                onBlur={e=>{ e.target.style.width="200px"; e.target.style.background="rgba(255,255,255,0.07)"; }}
              />
            </div>
            <div style={{ width:1, height:18, background:"rgba(255,255,255,0.10)", margin:"0 4px", flexShrink:0 }} />
            {/* Nav links */}
            {[["Browse","browse",isBrowse],...(currentUser?[["Saved"+(savedList.length?` (${savedList.length})`:""),"saved",isSaved],["My Listings","mylistings",isMyList]]:[])].map(([label,v,active])=>(
              <button key={v} className="nav-link" onClick={()=>nav(v)}
                style={{ padding:"6px 11px", background:active?"rgba(255,255,255,0.09)":"none", color:active?"white":"rgba(255,255,255,0.48)", border:"none", borderRadius:6, cursor:"pointer", fontSize:12, fontFamily:"var(--sans)", fontWeight:active?600:400, whiteSpace:"nowrap", transition:"all .15s" }}>
                {label}
              </button>
            ))}
          </div>

          {/* Mobile center — search bar only */}
          <div className="mobile-only" style={{ display:"none", flex:1, margin:"0 8px" }}>
            <div style={{ position:"relative", width:"100%" }}>
              <span style={{ position:"absolute", left:11, top:"50%", transform:"translateY(-50%)", fontSize:13, color:"rgba(255,255,255,0.28)", pointerEvents:"none" }}>⌕</span>
              <input
                style={{ width:"100%", padding:"8px 14px 8px 30px", background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:99, fontSize:13, fontFamily:"var(--sans)", color:"white", outline:"none" }}
                placeholder="Search…"
                value={searchQ}
                onChange={e=>setSearchQ(e.target.value)}
              />
            </div>
          </div>

          {/* RIGHT — auth */}
          <div style={{ display:"flex", gap:8, alignItems:"center", flexShrink:0 }}>
            {currentUser ? (
              <>
                <PrimaryBtn sm onClick={()=>{ setShowList(true); goBack(); setView("browse"); }}>+ List</PrimaryBtn>
                <div title={currentUser.name} style={{ cursor:"pointer" }} onClick={()=>{ setView("profile"); setProfEdit({...currentUser}); goBack(); }}>
                  <Avatar user={currentUser} size={32} />
                </div>
              </>
            ) : (
              <>
                <button className="desktop-only" onClick={()=>{setAuthTab("login");setShowAuth(true);}}
                  style={{ padding:"7px 14px", background:"transparent", color:"rgba(255,255,255,0.60)", border:"1px solid rgba(255,255,255,0.14)", borderRadius:6, fontSize:13, fontFamily:"var(--sans)", cursor:"pointer", whiteSpace:"nowrap" }}>
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
          <div style={{ background:"var(--warm-white)", borderRadius:14, padding:40, border:"1px solid var(--ink-15)", maxWidth:580, margin:"0 auto", boxShadow:"0 20px 60px rgba(28,24,20,0.10)" }}>
            <h2 style={{ fontSize:28, fontFamily:"var(--serif)", color:"var(--ink)", marginBottom:6 }}>List a Puzzle</h2>
            <p style={{ fontSize:14, color:"var(--ink-70)", fontFamily:"var(--sans)", marginBottom:30 }}>Choose how you want to offer it — then we'll find it a new home.</p>

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
                  ["Other",      "🧩 Other — doesn't fit anywhere else"],
                ].map(([v,l])=><option key={v} value={v}>{l}</option>)}
              </Sel>
              <Sel label="Condition" value={nl.condition} onChange={e=>setNl(p=>({...p,condition:e.target.value}))}>{CONDITIONS.map(c=><option key={c}>{c}</option>)}</Sel>
              {nl.listingType!=="pickup"&&<Sel label="Can you ship?" value={nl.tradePreference} onChange={e=>setNl(p=>({...p,tradePreference:e.target.value}))}>{TRADE_OPTS.map(c=><option key={c}>{c}</option>)}</Sel>}
            </div>
            <TA label="Description" placeholder="All pieces present, completed once. Any details worth knowing…" value={nl.description} onChange={e=>setNl(p=>({...p,description:e.target.value}))} />
            <div style={{ display:"flex", gap:10 }}>
              <GhostBtn style={{ flex:1 }} onClick={()=>setShowList(false)}>Cancel</GhostBtn>
              <PrimaryBtn style={{ flex:2 }} onClick={handleSubmit}>List for Trade →</PrimaryBtn>
            </div>
          </div>
        )}

        {/* ── PUZZLE DETAIL ── */}
        {!showList && sel && (() => {
          const owner   = userOf(sel);
          const lt      = LISTING_TYPES[sel.listingType] || LISTING_TYPES.offer;
          const boosted = isBoosted(sel);
          const isSave  = savedList.includes(sel.id);
          return (
            <div style={{ maxWidth:680 }}>
              <BackBtn onClick={goBack} />
              <div style={{ background:"var(--warm-white)", borderRadius:14, border:`1px solid ${boosted?"var(--amber)":"var(--ink-15)"}`, overflow:"hidden", boxShadow:"0 20px 60px rgba(28,24,20,0.10)" }}>
                {boosted && (
                  <div style={{ background:"var(--amber-dim)", borderBottom:"1px solid rgba(176,107,16,0.2)", padding:"8px 24px", display:"flex", alignItems:"center", gap:8 }}>
                    <span>👑</span>
                    <span style={{ fontSize:12, fontWeight:600, color:"var(--amber)", fontFamily:"var(--sans)" }}>Featured listing · {daysLeft(sel)} days remaining</span>
                  </div>
                )}
                <div style={{ position:"relative" }}>
                  <PuzzleBox artIdx={sel.art||0} emoji={sel.image||"🧩"} size="lg" />
                  <PieceCount pieces={sel.pieces} />
                  <button onClick={()=>setSaved(s=>s.includes(sel.id)?s.filter(x=>x!==sel.id):[...s,sel.id])}
                    style={{ position:"absolute", top:14, left:14, background:"rgba(28,24,20,0.6)", backdropFilter:"blur(10px)", border:`1px solid ${isSave?"var(--amber)":"rgba(255,255,255,0.15)"}`, borderRadius:6, padding:"7px 13px", cursor:"pointer", fontSize:13, color:isSave?"var(--amber)":"rgba(255,255,255,0.8)", display:"flex", alignItems:"center", gap:5, fontFamily:"var(--sans)" }}>
                    {isSave?"♥":"♡"} {sel.saves+(isSave?1:0)}
                  </button>
                </div>

                <div className="detail-pad" style={{ padding:32 }}>
                  {/* Title row */}
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:12, marginBottom:12 }}>
                    <h1 style={{ fontSize:28, fontFamily:"var(--serif)", color:"var(--ink)", lineHeight:1.15, letterSpacing:"-0.3px" }}>{sel.title}</h1>
                    <LTBadge type={sel.listingType} size="md" />
                  </div>

                  {/* Meta badges */}
                  <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:20 }}>
                    <CondBadge cond={sel.condition} />
                    <span style={{ display:"inline-flex", alignItems:"center", padding:"2px 8px", background:"var(--parchment)", color:"var(--ink-70)", borderRadius:3, fontSize:10, fontFamily:"var(--sans)", fontWeight:500 }}>{sel.pieces.toLocaleString()} pieces</span>
                    {sel.brand && <span style={{ display:"inline-flex", alignItems:"center", padding:"2px 8px", background:"var(--parchment)", color:"var(--ink-70)", borderRadius:3, fontSize:10, fontFamily:"var(--sans)" }}>{sel.brand}</span>}
                  </div>

                  {sel.description && <p style={{ fontSize:15, color:"var(--ink-70)", fontFamily:"var(--sans)", lineHeight:1.8, marginBottom:24 }}>{sel.description}</p>}

                  {/* Listing type explainer */}
                  <div style={{ background:lt.bg, border:`1px solid ${lt.color}33`, borderRadius:8, padding:"14px 18px", marginBottom:20 }}>
                    <div style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
                      <span style={{ fontSize:20, color:lt.color, lineHeight:1.2, flexShrink:0 }}>{lt.icon}</span>
                      <div>
                        <div style={{ fontSize:13, fontWeight:600, color:"var(--ink)", fontFamily:"var(--sans)", marginBottom:3 }}>
                          {sel.listingType==="swap"   && "Even swap — puzzle for puzzle"}
                          {sel.listingType==="offer"  && "Open to offers — cash, swap, or swap + top-up"}
                          {sel.listingType==="free"   && "Free — just cover shipping (~$5–9)"}
                          {sel.listingType==="pickup" && "Free local pickup only"}
                        </div>
                        <div style={{ fontSize:12, color:"var(--ink-70)", fontFamily:"var(--sans)", lineHeight:1.55 }}>
                          {sel.listingType==="swap"   && "Each person ships their own puzzle. No money changes hands."}
                          {sel.listingType==="offer"  && "Suggest a price, an even swap, or swap with a cash top-up. Lister will accept or counter."}
                          {sel.listingType==="free"   && "The puzzle is free. You cover shipping. Coordinate via message."}
                          {sel.listingType==="pickup" && "Zero cost. Arrange local meetup with the lister."}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pirateship */}
                  {needsShip(sel.listingType) && <PirateshipBlock context="detail" />}

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
                        <div style={{ fontSize:12, color:"var(--ink-70)", fontFamily:"var(--sans)" }}>📍 {owner.location} · <span style={{ color:"var(--terracotta)" }}>{owner.tradeCount} trades</span></div>
                      </div>
                      <span style={{ color:"var(--ink-40)", fontSize:16 }}>›</span>
                    </div>
                  )}

                  <PrimaryBtn style={{ width:"100%", justifyContent:"center", fontSize:15 }} onClick={()=>handleReq(sel)}>
                    {sel.listingType==="free"||sel.listingType==="pickup" ? "Claim This Puzzle →" : sel.listingType==="swap" ? "Propose a Swap →" : "Make an Offer →"}
                  </PrimaryBtn>
                </div>
              </div>
            </div>
          );
        })()}

        {/* ── OTHER PROFILE ── */}
        {!showList && !sel && viewProfile && (
          <div>
            <BackBtn onClick={goBack} />
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
                <StatBox num={puzzles.filter(p=>p.userId===viewProfile.id).length} label="Listings" />
                <StatBox num={viewProfile.memberSince} label="Member since" />
              </div>
            </div>
            <SectionHead title="Their puzzles" />
            <Grid items={enrich(puzzles.filter(p=>p.userId===viewProfile.id))} />
          </div>
        )}

        {/* ── BROWSE ── */}
        {!showList && !sel && !viewProfile && view === "browse" && (
          <>
            {/* Hero */}
            <div className="hero-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", borderRadius:16, overflow:"hidden", marginBottom:40, boxShadow:"0 12px 56px rgba(26,21,16,0.18)", position:"relative" }}>
              {/* Left: deep ink */}
              <div style={{ padding:"48px 44px", display:"flex", flexDirection:"column", justifyContent:"center", background:"var(--ink)", position:"relative", overflow:"hidden", minHeight:320 }}>
                {/* Background decoration */}
                <div style={{ position:"absolute", top:-60, right:-40, width:220, height:220, borderRadius:"50%", background:"rgba(200,90,48,0.08)", pointerEvents:"none" }} />
                <div style={{ position:"absolute", bottom:-40, left:-30, width:160, height:160, borderRadius:"50%", background:"rgba(200,90,48,0.05)", pointerEvents:"none" }} />
                <PuzzlePieceDecor size={52} color="white" opacity={0.06} style={{ position:"absolute", top:24, right:32, transform:"rotate(20deg)" }} />

                <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"var(--terracotta-dim)", border:"1px solid rgba(200,90,48,0.25)", borderRadius:3, padding:"4px 10px", fontSize:10, color:"var(--terracotta-mid)", fontWeight:700, letterSpacing:"1.5px", marginBottom:22, alignSelf:"flex-start", textTransform:"uppercase" }}>
                  Free Puzzle Trading
                </div>
                <h1 style={{ fontSize:46, fontFamily:"var(--serif)", color:"white", lineHeight:1.04, letterSpacing:"-1.5px", marginBottom:16 }}>
                  Done with it?<br /><em style={{ color:"var(--terracotta-mid)" }}>Pass it on.</em>
                </h1>
                <p style={{ fontSize:15, color:"rgba(255,255,255,0.55)", fontFamily:"var(--sans)", lineHeight:1.7, marginBottom:30, maxWidth:310, fontWeight:300 }}>
                  Trade your completed puzzles with people who'll actually do them. Swap, gift, or sell — local or shipped nationwide.
                </p>
                {!currentUser ? (
                  <div style={{ display:"flex", gap:10 }}>
                    <PrimaryBtn onClick={()=>{setAuthTab("signup");setShowAuth(true);}}>Start swapping →</PrimaryBtn>
                    <button className="ps-btn-ghost" onClick={()=>{setAuthTab("login");setShowAuth(true);}} style={{ padding:"12px 20px", background:"transparent", color:"rgba(255,255,255,0.6)", border:"1px solid rgba(255,255,255,0.15)", borderRadius:6, fontSize:14, fontFamily:"var(--sans)", fontWeight:500, cursor:"pointer" }}>Log in</button>
                  </div>
                ) : (
                  <PrimaryBtn style={{ alignSelf:"flex-start" }} onClick={()=>setShowList(true)}>+ List a puzzle</PrimaryBtn>
                )}
                {/* Stats row */}
                <div style={{ display:"flex", gap:28, marginTop:32 }}>
                  {[["147","puzzles listed"],["83","active traders"],["12","trades this week"]].map(([n,l])=>(
                    <div key={l}>
                      <div style={{ fontSize:22, fontFamily:"var(--serif)", color:"white" }}>{n}</div>
                      <div style={{ fontSize:11, color:"rgba(255,255,255,0.35)", fontFamily:"var(--sans)" }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: cream with floating puzzle cards — hidden on mobile */}
              <div className="hero-right" style={{ background:"var(--cream)", position:"relative", overflow:"hidden", minHeight:300 }}>
                {/* Diagonal terracotta accent strip top-right */}
                <div style={{ position:"absolute", top:0, right:0, width:140, height:140, background:"var(--terracotta)", clipPath:"polygon(100% 0, 0 0, 100% 100%)", opacity:0.12 }} />
                <div style={{ position:"absolute", bottom:0, left:0, width:100, height:100, background:"var(--sage)", clipPath:"polygon(0 100%, 0 0, 100% 100%)", opacity:0.10 }} />
                <PuzzlePieceDecor size={80} style={{ position:"absolute", bottom:-16, right:-8, transform:"rotate(-10deg)" }} />
                <PuzzlePieceDecor size={48} style={{ position:"absolute", top:24, left:14, transform:"rotate(30deg)" }} />

                <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:320, height:260 }}>
                  {[
                    { top:10, left:10, anim:"float1 4s ease-in-out infinite", artIdx:0, emoji:"🗼", title:"Eiffel Tower", pieces:1000, cond:"Like New" },
                    { top:0, right:5, anim:"float2 5.2s ease-in-out infinite", artIdx:4, emoji:"🌌", title:"Starry Night", pieces:1500, cond:"Excellent" },
                    { bottom:0, left:"50%", ml:"-70px", anim:"float3 3.8s ease-in-out infinite", artIdx:2, emoji:"🌸", title:"Water Lilies", pieces:750, cond:"Like New" },
                  ].map((c,i) => (
                    <div key={i} style={{ position:"absolute", top:c.top, left:c.left, right:c.right, bottom:c.bottom, marginLeft:c.ml, width:145, background:"var(--warm-white)", borderRadius:8, border:"1px solid var(--ink-15)", overflow:"hidden", boxShadow:"0 16px 40px rgba(26,21,16,0.14)", animation:c.anim }}>
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
                    ["All",        "All",        ""],
                    ["Collage",    "Collage",    "🎲"],
                    ["Landscape",  "Landscape",  "🌄"],
                    ["Nightscape", "Nightscape", "🌃"],
                    ["Animals",    "Animals",    "🦁"],
                    ["Fine Art",   "Fine Art",   "🖼️"],
                    ["Travel",     "Travel",     "✈️"],
                    ["Food",       "Food",       "🍰"],
                    ["Seasonal",   "Seasonal",   "🍂"],
                    ["Other",      "Other",      "🧩"],
                  ].map(([v, label, icon]) => {
                    const active = catF === v;
                    return (
                      <button key={v} onClick={()=>setCatF(v)} style={{
                        display:"flex", flexDirection:"column", alignItems:"center", gap:5,
                        padding:"12px 18px", minWidth:72,
                        background: active ? "var(--ink)" : "var(--cream)",
                        border: `1.5px solid ${active ? "var(--ink)" : "var(--tan)"}`,
                        borderRadius:10, cursor:"pointer", transition:"all .15s",
                        boxShadow: active ? "0 4px 16px rgba(26,21,16,0.18)" : "none",
                      }}>
                        {icon && <span style={{ fontSize:20, lineHeight:1 }}>{icon}</span>}
                        <span style={{
                          fontSize:11, fontWeight:600, fontFamily:"var(--sans)",
                          color: active ? "white" : "var(--ink-70)",
                          letterSpacing:"0.1px", whiteSpace:"nowrap",
                        }}>{label}</span>
                        {active && v !== "All" && (
                          <span style={{ width:4, height:4, borderRadius:"50%", background:"var(--terracotta)", display:"block" }} />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ── SECONDARY FILTERS — listing type + size ── */}
            <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:20, alignItems:"center" }}>
              <span style={{ fontSize:10, color:"var(--ink-40)", fontFamily:"var(--sans)", fontWeight:700, letterSpacing:"1px", textTransform:"uppercase", marginRight:4 }}>Type</span>
              {[["All","All"],["swap","⇄ Swap"],["offer","◈ Offer"],["free","◎ Free"],["pickup","⌖ Pickup"]].map(([v,l])=>(
                <FPill key={v} label={l} active={typeF===v} onClick={()=>setTypeF(v)} />
              ))}
              <div style={{ width:1, height:16, background:"var(--ink-15)", margin:"0 4px" }} />
              <span style={{ fontSize:10, color:"var(--ink-40)", fontFamily:"var(--sans)", fontWeight:700, letterSpacing:"1px", textTransform:"uppercase", marginRight:4 }}>Size</span>
              {["Any","<500","500–1k","1k–2k","2k+"].map(p=>(
                <FPill key={p} label={p==="Any"?"Any":p} active={pieceF===p} onClick={()=>setPieceF(p)} />
              ))}
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
                {filtered.some(isBoosted) && <span style={{ marginLeft:8, color:"var(--amber)", fontSize:11 }}>· 👑 featured listings first</span>}
              </div>
            </div>

            {filtered.length === 0
              ? <EmptyState icon="🔍" title="Nothing here" sub="Try adjusting your filters, or list the first puzzle in this category." action={currentUser && <PrimaryBtn onClick={()=>setShowList(true)} style={{ margin:"0 auto", display:"inline-flex" }}>+ List a Puzzle</PrimaryBtn>} />
              : <Grid items={filtered} />
            }
          </>
        )}

        {/* ── SAVED ── */}
        {!showList && !sel && !viewProfile && view === "saved" && (
          <>
            <SectionHead title="Saved puzzles" sub="Puzzles you're keeping an eye on." />
            {savedList.length === 0
              ? <EmptyState icon="♡" title="Nothing saved yet" sub="Browse the marketplace and tap the heart to save any puzzle here." action={<PrimaryBtn onClick={()=>nav("browse")} style={{ margin:"0 auto", display:"inline-flex" }}>Browse Puzzles</PrimaryBtn>} />
              : <Grid items={enrich(puzzles.filter(p=>savedList.includes(p.id)))} />
            }
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
                    const boosted = isBoosted(p);
                    return (
                      <div key={p.id} style={{ background:"var(--warm-white)", borderRadius:10, border:`1px solid ${boosted?"var(--amber)":"var(--ink-15)"}`, overflow:"hidden", boxShadow:boosted?"0 4px 20px rgba(176,107,16,0.15)":"0 2px 8px rgba(28,24,20,0.05)" }}>
                        {boosted && (
                          <div style={{ background:"var(--amber-dim)", padding:"6px 14px", display:"flex", alignItems:"center", gap:6, borderBottom:"1px solid rgba(176,107,16,0.15)" }}>
                            <span>👑</span>
                            <span style={{ fontSize:11, fontWeight:600, color:"var(--amber)", fontFamily:"var(--sans)" }}>Featured · {daysLeft(p)}d left</span>
                          </div>
                        )}
                        <PuzzleBox artIdx={p.art||0} emoji={p.image||"🧩"} size="sm" />
                        <div style={{ padding:"12px 14px" }}>
                          <div style={{ fontSize:14, fontFamily:"var(--serif)", color:"var(--ink)", marginBottom:2 }}>{p.title}</div>
                          <div style={{ fontSize:11, color:"var(--ink-40)", fontFamily:"var(--sans)", marginBottom:10 }}>{p.pieces.toLocaleString()} pcs · {p.posted}</div>
                          <div style={{ display:"flex", gap:5, marginBottom:12, flexWrap:"wrap" }}>
                            <CondBadge cond={p.condition} />
                            <LTBadge type={p.listingType} />
                          </div>
                          <div style={{ paddingTop:10, borderTop:"1px solid var(--ink-08)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                            <button onClick={()=>setPuzzles(prev=>prev.filter(x=>x.id!==p.id))} style={{ background:"none", border:"none", cursor:"pointer", fontSize:12, color:"var(--terracotta)", fontFamily:"var(--sans)" }}>Remove</button>
                            {!boosted
                              ? <button className="ps-btn-ghost" onClick={()=>setBoostModal(p)} style={{ display:"flex", alignItems:"center", gap:4, padding:"5px 12px", background:"none", color:"var(--ink-70)", border:"1px solid var(--ink-15)", borderRadius:5, fontSize:11, fontFamily:"var(--sans)", fontWeight:600, cursor:"pointer" }}>👑 Boost · {BOOST_PRICE}</button>
                              : <span style={{ fontSize:11, color:"var(--amber)", fontFamily:"var(--sans)" }}>✓ Active</span>
                            }
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
        {!showList && !sel && !viewProfile && view === "profile" && currentUser && profEdit && (
          <div style={{ maxWidth:540 }}>
            <SectionHead title="My profile" />
            <div style={{ background:"var(--warm-white)", border:"1px solid var(--ink-15)", borderRadius:14, padding:28, marginBottom:20 }}>
              <div style={{ display:"flex", gap:16, alignItems:"center", marginBottom:20 }}>
                <Avatar user={currentUser} size={56} />
                <div>
                  <div style={{ fontSize:22, fontFamily:"var(--serif)", color:"var(--ink)" }}>{currentUser.name}</div>
                  {currentUser.location && <div style={{ fontSize:13, color:"var(--ink-70)", fontFamily:"var(--sans)" }}>📍 {currentUser.location}</div>}
                </div>
              </div>
              <div style={{ display:"flex", gap:10 }}>
                <StatBox num={currentUser.tradeCount} label="Trades" accent />
                <StatBox num={myListings.length} label="Listings" />
                <StatBox num={currentUser.memberSince} label="Since" />
              </div>
            </div>
            <div style={{ background:"var(--warm-white)", borderRadius:14, padding:28, border:"1px solid var(--ink-15)" }}>
              <div style={{ fontSize:16, fontFamily:"var(--serif)", color:"var(--ink)", marginBottom:20 }}>Edit details</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                <Inp label="Name" value={profEdit.name} onChange={e=>setProfEdit(p=>({...p,name:e.target.value}))} />
                <Inp label="Location" placeholder="City, State" value={profEdit.location||""} onChange={e=>setProfEdit(p=>({...p,location:e.target.value}))} />
              </div>
              <Sel label="Trade preference" value={profEdit.tradePreference||"Both"} onChange={e=>setProfEdit(p=>({...p,tradePreference:e.target.value}))}>{TRADE_OPTS.map(c=><option key={c}>{c}</option>)}</Sel>
              <Inp label="Bio (optional)" placeholder="A line about your puzzle style…" value={profEdit.bio||""} onChange={e=>setProfEdit(p=>({...p,bio:e.target.value}))} />
              <div style={{ display:"flex", gap:10 }}>
                <GhostBtn style={{ flex:1 }} onClick={()=>{setProfEdit(null);setView("browse");}}>Cancel</GhostBtn>
                <PrimaryBtn style={{ flex:2 }} onClick={saveProfile}>Save changes</PrimaryBtn>
              </div>
            </div>
            <div style={{ marginTop:14, textAlign:"right" }}>
              <button onClick={()=>{setCU(null);setView("browse");}} style={{ background:"none", border:"none", cursor:"pointer", fontSize:13, color:"var(--ink-40)", fontFamily:"var(--sans)" }}>Log out</button>
            </div>
          </div>
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
                <Inp label="Location" placeholder="City, State" value={aLoc} onChange={e=>setALoc(e.target.value)} />
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
          <RequestModal puzzle={reqModal} userOf={userOf} onClose={()=>setReqModal(null)} />
        </Modal>
      )}

      {/* ── BOOST MODAL ── */}
      {boostModal && (
        <Modal onClose={()=>setBoostModal(null)}>
          <BoostModal puzzle={boostModal} onClose={()=>setBoostModal(null)} onBoost={applyBoost} />
        </Modal>
      )}
    </div>
  );
}
