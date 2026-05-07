import { useState, useEffect, useRef } from "react";

/* ══════════════════════════════════════════════
   GLOBAL STYLES
══════════════════════════════════════════════ */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;900&family=Amiri:wght@400;700&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --teal:#0D6B5E; --teal-light:#14907F; --teal-bg:#E4F2EF; --teal-mid:#0A5248;
      --amber:#C8780A; --amber-light:#F0A500; --amber-bg:#FDF5E0; --amber-pale:#FFFBF0;
      --sand:#F7F1E3; --sand-dark:#EDE3CC;
      --dark:#1C1206; --mid:#4A3720; --muted:#8C7658; --light-muted:#C4B49A;
      --border:#DDD0B8; --border-light:#EDE3CC;
      --white:#FFFDF6; --white2:#FFFFFF;
      --red:#B03030; --red-bg:#FCEAEA; --red-light:#FCF0F0;
      --green:#1A7A4A; --green-bg:#E6F5EE; --green-light:#F0FAF5;
      --blue:#1A5A9A; --blue-bg:#E6F0FA;
      --sidebar-bg:#0F2219;
      --shadow-sm:0 1px 4px rgba(28,18,6,.07);
      --shadow:0 2px 16px rgba(28,18,6,.09);
      --shadow-lg:0 8px 32px rgba(28,18,6,.14);
      --radius:14px; --radius-sm:9px; --radius-xs:6px;
      font-family:'Cairo','Amiri',sans-serif;
    }
    html,body,#root { height:100%; background:var(--sand); }
    * { scrollbar-width:thin; scrollbar-color:var(--border) transparent; }
    *::-webkit-scrollbar { width:5px; height:5px; }
    *::-webkit-scrollbar-thumb { background:var(--border); border-radius:4px; }
    input,select,textarea { font-family:'Cairo',sans-serif; }
    button { font-family:'Cairo',sans-serif; }

    .portal-wrap { display:flex; height:100vh; overflow:hidden; }

    /* ── SIDEBAR ── */
    .sidebar { width:240px; min-width:240px; background:var(--sidebar-bg); display:flex; flex-direction:column; height:100vh; overflow:hidden; position:relative; }
    .sidebar-logo { padding:20px 18px 14px; display:flex; align-items:center; gap:10px; border-bottom:1px solid rgba(255,255,255,.07); }
    .sidebar-logo-mark { width:36px; height:36px; background:var(--amber-light); border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:900; color:var(--dark); flex-shrink:0; }
    .sidebar-logo-text { color:#fff; font-size:16px; font-weight:700; line-height:1; }
    .sidebar-logo-sub { color:rgba(255,255,255,.4); font-size:10px; font-weight:400; display:block; margin-top:2px; }
    .sidebar-rest { padding:14px 16px 12px; border-bottom:1px solid rgba(255,255,255,.07); }
    .sidebar-rest-label { font-size:10px; color:rgba(255,255,255,.3); font-weight:600; text-transform:uppercase; letter-spacing:.06em; margin-bottom:8px; }
    .sidebar-rest-card { display:flex; align-items:center; gap:10px; background:rgba(255,255,255,.06); border-radius:var(--radius-sm); padding:9px 11px; cursor:pointer; transition:background .15s; }
    .sidebar-rest-card:hover { background:rgba(255,255,255,.1); }
    .sidebar-rest-emoji { font-size:22px; width:34px; height:34px; background:rgba(255,255,255,.08); border-radius:8px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
    .sidebar-rest-name { color:#fff; font-size:13px; font-weight:700; line-height:1.2; }
    .sidebar-rest-status { display:flex; align-items:center; gap:4px; margin-top:3px; }
    .status-dot { width:5px; height:5px; border-radius:50%; background:#4ADE80; }
    .status-dot.closed { background:#F87171; }
    .sidebar-rest-status-text { font-size:11px; color:rgba(255,255,255,.5); }
    .sidebar-nav { padding:12px 10px; flex:1; overflow-y:auto; }
    .nav-section-label { font-size:10px; color:rgba(255,255,255,.25); font-weight:700; letter-spacing:.07em; text-transform:uppercase; padding:8px 8px 4px; }
    .nav-item { display:flex; align-items:center; gap:10px; padding:9px 10px; border-radius:var(--radius-xs); cursor:pointer; color:rgba(255,255,255,.55); font-size:13px; font-weight:500; transition:all .15s; margin-bottom:2px; position:relative; }
    .nav-item:hover { background:rgba(255,255,255,.07); color:rgba(255,255,255,.85); }
    .nav-item.active { background:rgba(13,107,94,.45); color:#fff; }
    .nav-item.active::before { content:''; position:absolute; inset-inline-start:0; top:6px; bottom:6px; width:3px; background:var(--amber-light); border-radius:0 3px 3px 0; }
    .nav-icon { font-size:16px; width:20px; text-align:center; flex-shrink:0; }
    .nav-badge { margin-inline-start:auto; background:var(--amber-light); color:var(--dark); font-size:10px; font-weight:800; padding:2px 7px; border-radius:10px; min-width:20px; text-align:center; }
    .nav-badge.red { background:var(--red); color:#fff; }
    .sidebar-bottom { padding:14px 14px 20px; border-top:1px solid rgba(255,255,255,.07); }
    .sidebar-user { display:flex; align-items:center; gap:10px; }
    .sidebar-avatar { width:34px; height:34px; border-radius:50%; background:var(--teal); display:flex; align-items:center; justify-content:center; font-size:14px; color:#fff; font-weight:700; flex-shrink:0; }
    .sidebar-user-name { color:#fff; font-size:12px; font-weight:600; }
    .sidebar-user-role { color:rgba(255,255,255,.4); font-size:10px; }
    .sidebar-lang-btn { margin-inline-start:auto; background:rgba(255,255,255,.08); border:none; color:rgba(255,255,255,.6); font-family:'Cairo',sans-serif; font-size:11px; font-weight:700; padding:4px 9px; border-radius:10px; cursor:pointer; transition:all .15s; }
    .sidebar-lang-btn:hover { background:rgba(255,255,255,.14); color:#fff; }

    /* ── MAIN CONTENT ── */
    .main { flex:1; display:flex; flex-direction:column; overflow:hidden; background:var(--sand); }
    .topbar { background:var(--white); border-bottom:1px solid var(--border); padding:0 24px; height:58px; display:flex; align-items:center; justify-content:space-between; flex-shrink:0; box-shadow:var(--shadow-sm); }
    .topbar-title { font-size:17px; font-weight:700; color:var(--dark); display:flex; align-items:center; gap:8px; }
    .topbar-actions { display:flex; align-items:center; gap:10px; }
    .topbar-live { display:flex; align-items:center; gap:6px; background:var(--green-bg); border:1px solid rgba(26,122,74,.2); border-radius:20px; padding:5px 12px; font-size:12px; font-weight:600; color:var(--green); }
    .topbar-live-dot { width:6px; height:6px; border-radius:50%; background:var(--green); animation:livePulse 1.5s infinite; }
    @keyframes livePulse { 0%,100%{opacity:1} 50%{opacity:.3} }
    .btn-icon { width:36px; height:36px; border-radius:var(--radius-xs); border:1px solid var(--border); background:var(--white); cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:16px; transition:all .15s; color:var(--mid); }
    .btn-icon:hover { background:var(--sand); border-color:var(--teal); }
    .notif-wrap { position:relative; }
    .notif-dot { position:absolute; top:6px; inset-inline-end:6px; width:7px; height:7px; border-radius:50%; background:var(--red); border:2px solid var(--white); }
    .page-content { flex:1; overflow-y:auto; padding:20px 24px; }

    /* ── KPI CARDS ── */
    .kpi-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:20px; }
    .kpi-card { background:var(--white); border-radius:var(--radius); border:1px solid var(--border); padding:16px 18px; display:flex; align-items:flex-start; gap:14px; box-shadow:var(--shadow-sm); transition:transform .15s; }
    .kpi-card:hover { transform:translateY(-1px); box-shadow:var(--shadow); }
    .kpi-icon { width:44px; height:44px; border-radius:var(--radius-sm); display:flex; align-items:center; justify-content:center; font-size:20px; flex-shrink:0; }
    .kpi-icon.amber { background:var(--amber-bg); }
    .kpi-icon.teal  { background:var(--teal-bg); }
    .kpi-icon.green { background:var(--green-bg); }
    .kpi-icon.blue  { background:var(--blue-bg); }
    .kpi-label { font-size:11px; color:var(--muted); font-weight:600; margin-bottom:4px; }
    .kpi-value { font-size:24px; font-weight:800; color:var(--dark); line-height:1; }
    .kpi-sub { font-size:11px; color:var(--muted); margin-top:4px; }
    .kpi-trend { font-size:11px; font-weight:600; }
    .kpi-trend.up { color:var(--green); }
    .kpi-trend.down { color:var(--red); }

    /* ── SECTION CARDS ── */
    .card { background:var(--white); border-radius:var(--radius); border:1px solid var(--border); box-shadow:var(--shadow-sm); overflow:hidden; }
    .card-header { padding:14px 18px; border-bottom:1px solid var(--border-light); display:flex; align-items:center; justify-content:space-between; }
    .card-title { font-size:14px; font-weight:700; color:var(--dark); }
    .card-body { padding:16px 18px; }
    .view-all { font-size:12px; color:var(--teal); font-weight:600; cursor:pointer; background:none; border:none; }
    .view-all:hover { text-decoration:underline; }

    /* ── CHARTS ── */
    .chart-wrap { padding:16px 18px; }
    .chart-bars { display:flex; align-items:flex-end; gap:8px; height:120px; }
    .chart-bar-group { display:flex; flex-direction:column; align-items:center; gap:4px; flex:1; }
    .chart-bar { width:100%; background:var(--teal); border-radius:4px 4px 0 0; transition:height .4s; min-height:4px; }
    .chart-bar:hover { background:var(--teal-light); }
    .chart-bar.amber { background:var(--amber-light); }
    .chart-bar-label { font-size:10px; color:var(--muted); }
    .chart-bar-val { font-size:10px; font-weight:700; color:var(--dark); }
    .chart-legend { display:flex; gap:14px; padding:0 18px 14px; }
    .chart-legend-item { display:flex; align-items:center; gap:5px; font-size:11px; color:var(--muted); }
    .legend-dot { width:8px; height:8px; border-radius:2px; }

    /* ── LIVE ORDERS MINI ── */
    .live-order-item { display:flex; align-items:center; gap:12px; padding:10px 0; border-bottom:1px solid var(--border-light); }
    .live-order-item:last-child { border-bottom:none; }
    .live-order-id { font-size:12px; font-weight:700; color:var(--dark); min-width:60px; }
    .live-order-rest-name { font-size:12px; color:var(--muted); flex:1; }
    .live-order-time { font-size:11px; color:var(--muted); min-width:40px; text-align:end; }
    .live-order-amount { font-size:13px; font-weight:700; color:var(--teal); min-width:60px; text-align:end; }

    /* ── STATUS BADGES ── */
    .badge { display:inline-flex; align-items:center; gap:4px; font-size:11px; font-weight:600; padding:3px 9px; border-radius:20px; }
    .badge-new       { background:#EEF6FF; color:#1A5A9A; }
    .badge-preparing { background:var(--amber-bg); color:var(--amber); }
    .badge-onway     { background:var(--teal-bg); color:var(--teal); }
    .badge-delivered { background:var(--green-bg); color:var(--green); }
    .badge-cancelled { background:var(--red-bg); color:var(--red); }
    .badge-dot { width:5px; height:5px; border-radius:50%; background:currentColor; }

    /* ── ORDERS PAGE ── */
    .filter-bar { display:flex; align-items:center; gap:8px; margin-bottom:16px; flex-wrap:wrap; }
    .filter-tab { padding:8px 16px; border-radius:20px; border:1px solid var(--border); background:var(--white); cursor:pointer; font-family:'Cairo',sans-serif; font-size:12px; font-weight:600; color:var(--muted); transition:all .15s; }
    .filter-tab.active { background:var(--teal); border-color:var(--teal); color:#fff; }
    .filter-tab-count { background:rgba(255,255,255,.25); border-radius:10px; padding:1px 6px; font-size:10px; margin-inline-start:4px; }
    .filter-tab:not(.active) .filter-tab-count { background:var(--border-light); color:var(--muted); }
    .search-input-wrap { margin-inline-start:auto; position:relative; }
    .search-input { padding:8px 12px 8px 34px; border:1px solid var(--border); border-radius:20px; background:var(--white); font-family:'Cairo',sans-serif; font-size:12px; color:var(--dark); outline:none; width:200px; transition:border-color .2s; }
    .search-input:focus { border-color:var(--teal); }
    .search-icon { position:absolute; inset-inline-start:11px; top:50%; transform:translateY(-50%); font-size:14px; color:var(--muted); pointer-events:none; }
    [dir="rtl"] .search-input { padding:8px 34px 8px 12px; }
    [dir="rtl"] .search-icon { inset-inline-start:auto; inset-inline-end:11px; }

    .order-table-wrap { overflow-x:auto; }
    .order-table { width:100%; border-collapse:collapse; }
    .order-table th { text-align:start; padding:10px 14px; font-size:11px; font-weight:700; color:var(--muted); background:var(--sand); border-bottom:1px solid var(--border); white-space:nowrap; }
    .order-table td { padding:12px 14px; font-size:13px; color:var(--dark); border-bottom:1px solid var(--border-light); vertical-align:middle; }
    .order-table tr:last-child td { border-bottom:none; }
    .order-table tr:hover td { background:rgba(247,241,227,.5); }
    .order-customer { display:flex; align-items:center; gap:8px; }
    .order-avatar { width:28px; height:28px; border-radius:50%; background:var(--teal-bg); display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:700; color:var(--teal); flex-shrink:0; }
    .order-name { font-size:12px; font-weight:600; color:var(--dark); }
    .order-phone { font-size:11px; color:var(--muted); }
    .order-items-preview { font-size:12px; color:var(--muted); max-width:160px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
    .order-actions-wrap { display:flex; gap:5px; }
    .btn-action { padding:5px 10px; border-radius:var(--radius-xs); border:1px solid; font-family:'Cairo',sans-serif; font-size:11px; font-weight:600; cursor:pointer; transition:all .15s; white-space:nowrap; }
    .btn-action-teal  { background:var(--teal-bg); color:var(--teal); border-color:rgba(13,107,94,.2); }
    .btn-action-teal:hover  { background:var(--teal); color:#fff; }
    .btn-action-amber { background:var(--amber-bg); color:var(--amber); border-color:rgba(200,120,10,.2); }
    .btn-action-amber:hover { background:var(--amber-light); color:var(--dark); }
    .btn-action-outline { background:transparent; color:var(--mid); border-color:var(--border); }
    .btn-action-outline:hover { border-color:var(--teal); color:var(--teal); }
    .btn-action-red { background:var(--red-bg); color:var(--red); border-color:rgba(176,48,48,.2); }
    .btn-action-red:hover { background:var(--red); color:#fff; }

    /* ── ORDER DETAIL MODAL ── */
    .modal-overlay { position:fixed; inset:0; background:rgba(28,18,6,.5); z-index:300; display:flex; align-items:center; justify-content:center; padding:20px; }
    .modal-box { background:var(--white); border-radius:var(--radius); width:100%; max-width:500px; max-height:85vh; overflow-y:auto; box-shadow:var(--shadow-lg); }
    .modal-header { padding:18px 20px 14px; border-bottom:1px solid var(--border); display:flex; align-items:center; justify-content:space-between; }
    .modal-title { font-size:16px; font-weight:700; color:var(--dark); }
    .modal-close { width:30px; height:30px; border-radius:50%; border:1px solid var(--border); background:var(--white); cursor:pointer; font-size:16px; display:flex; align-items:center; justify-content:center; color:var(--muted); transition:all .15s; }
    .modal-close:hover { background:var(--red-bg); border-color:var(--red); color:var(--red); }
    .modal-body { padding:20px; }
    .detail-row { display:flex; justify-content:space-between; align-items:center; padding:8px 0; border-bottom:1px solid var(--border-light); font-size:13px; }
    .detail-row:last-child { border-bottom:none; }
    .detail-label { color:var(--muted); }
    .detail-val { font-weight:600; color:var(--dark); }
    .order-item-line { display:flex; justify-content:space-between; align-items:center; padding:7px 10px; background:var(--sand); border-radius:var(--radius-xs); margin-bottom:5px; font-size:13px; }
    .timeline-step { display:flex; gap:12px; padding-bottom:16px; position:relative; }
    .timeline-step::before { content:''; position:absolute; inset-inline-start:11px; top:24px; bottom:0; width:1px; background:var(--border); }
    .timeline-step:last-child::before { display:none; }
    .timeline-dot { width:24px; height:24px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:11px; flex-shrink:0; }
    .timeline-dot.done { background:var(--green-bg); border:1.5px solid var(--green); }
    .timeline-dot.active { background:var(--teal-bg); border:1.5px solid var(--teal); }
    .timeline-dot.pending { background:var(--sand-dark); border:1.5px solid var(--border); }
    .timeline-text { font-size:12px; }
    .timeline-label { font-weight:600; color:var(--dark); }
    .timeline-time { color:var(--muted); margin-top:2px; }

    /* ── MENU PAGE ── */
    .menu-layout { display:grid; grid-template-columns:200px 1fr; gap:16px; align-items:start; }
    .cat-sidebar .card-body { padding:8px; }
    .cat-item { display:flex; align-items:center; gap:8px; padding:9px 10px; border-radius:var(--radius-xs); cursor:pointer; transition:background .15s; font-size:13px; font-weight:500; color:var(--mid); }
    .cat-item:hover { background:var(--sand); }
    .cat-item.active { background:var(--teal-bg); color:var(--teal); font-weight:700; }
    .cat-item-emoji { font-size:16px; }
    .cat-item-count { margin-inline-start:auto; font-size:10px; font-weight:700; color:var(--muted); }
    .menu-items-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); gap:12px; }
    .menu-item-card { background:var(--white); border:1px solid var(--border); border-radius:var(--radius); overflow:hidden; transition:transform .15s,box-shadow .15s; cursor:pointer; }
    .menu-item-card:hover { transform:translateY(-2px); box-shadow:var(--shadow); }
    .menu-item-img { height:90px; display:flex; align-items:center; justify-content:center; font-size:38px; position:relative; }
    .menu-item-badge { position:absolute; top:8px; inset-inline-end:8px; font-size:9px; font-weight:700; padding:2px 7px; border-radius:10px; }
    .badge-popular { background:var(--amber-bg); color:var(--amber); }
    .badge-new-item { background:var(--teal-bg); color:var(--teal); }
    .badge-unavail { background:var(--red-bg); color:var(--red); }
    .menu-item-body { padding:10px 12px; }
    .menu-item-name { font-size:13px; font-weight:700; color:var(--dark); margin-bottom:3px; }
    .menu-item-desc { font-size:11px; color:var(--muted); line-height:1.4; margin-bottom:8px; }
    .menu-item-footer { display:flex; align-items:center; justify-content:space-between; }
    .menu-item-price { font-size:14px; font-weight:800; color:var(--teal); }
    .toggle-wrap { display:flex; }
    .toggle { width:32px; height:18px; background:var(--border); border-radius:10px; border:none; cursor:pointer; position:relative; transition:background .2s; }
    .toggle.on { background:var(--teal); }
    .toggle::after { content:''; position:absolute; top:2px; inset-inline-start:2px; width:14px; height:14px; border-radius:50%; background:#fff; transition:inset-inline-start .2s; }
    .toggle.on::after { inset-inline-start:16px; }

    /* ── CONVERSATIONS PAGE ── */
    .conv-layout { display:grid; grid-template-columns:300px 1fr; gap:0; height:calc(100vh - 138px); }
    .conv-list { border-inline-end:1px solid var(--border); overflow-y:auto; background:var(--white); border-radius:var(--radius) 0 0 var(--radius); }
    .conv-item { display:flex; gap:10px; padding:12px 14px; cursor:pointer; transition:background .15s; border-bottom:1px solid var(--border-light); }
    .conv-item:hover { background:var(--sand); }
    .conv-item.active { background:var(--teal-bg); }
    .conv-avatar { width:36px; height:36px; border-radius:50%; background:var(--teal); display:flex; align-items:center; justify-content:center; font-size:14px; font-weight:700; color:#fff; flex-shrink:0; }
    .conv-meta { flex:1; overflow:hidden; }
    .conv-name { font-size:13px; font-weight:700; color:var(--dark); display:flex; align-items:center; justify-content:space-between; }
    .conv-time { font-size:10px; color:var(--muted); font-weight:400; }
    .conv-preview { font-size:11px; color:var(--muted); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin-top:2px; }
    .conv-order-badge { background:var(--amber-bg); color:var(--amber); font-size:10px; font-weight:600; padding:2px 7px; border-radius:10px; margin-top:4px; display:inline-block; }
    .conv-detail { background:var(--white); border-radius:0 var(--radius) var(--radius) 0; display:flex; flex-direction:column; overflow:hidden; }
    .conv-detail-header { padding:12px 16px; border-bottom:1px solid var(--border); display:flex; align-items:center; gap:12px; flex-shrink:0; }
    .conv-detail-name { font-size:14px; font-weight:700; color:var(--dark); }
    .conv-detail-sub { font-size:11px; color:var(--muted); }
    .conv-messages { flex:1; overflow-y:auto; padding:14px 16px; display:flex; flex-direction:column; gap:10px; }
    .chat-bubble-wrap { display:flex; align-items:flex-end; gap:6px; }
    .chat-bubble-wrap.user { flex-direction:row-reverse; }
    .chat-bubble-avatar { width:24px; height:24px; border-radius:50%; background:var(--teal-bg); display:flex; align-items:center; justify-content:center; font-size:12px; flex-shrink:0; }
    .chat-bubble { max-width:75%; padding:9px 13px; border-radius:14px; font-size:12px; line-height:1.55; }
    .chat-bubble-ai { background:var(--teal-bg); color:var(--dark); border-bottom-right-radius:4px; }
    .chat-bubble-user { background:var(--teal); color:#fff; border-bottom-left-radius:4px; }
    [dir="rtl"] .chat-bubble-ai { border-bottom-right-radius:14px; border-bottom-left-radius:4px; }
    [dir="rtl"] .chat-bubble-user { border-bottom-left-radius:14px; border-bottom-right-radius:4px; }
    .chat-time { font-size:10px; opacity:.55; margin-top:3px; }
    .conv-order-summary { margin:14px 16px; padding:12px 14px; background:var(--amber-pale); border:1px solid rgba(200,120,10,.2); border-radius:var(--radius-sm); }
    .conv-order-summary-title { font-size:12px; font-weight:700; color:var(--amber); margin-bottom:8px; }
    .conv-order-item { display:flex; justify-content:space-between; font-size:12px; color:var(--mid); padding:3px 0; }
    .conv-order-total { display:flex; justify-content:space-between; font-size:13px; font-weight:700; color:var(--dark); padding-top:6px; border-top:1px solid rgba(200,120,10,.2); margin-top:4px; }

    /* ── COMPLAINTS PAGE ── */
    .complaints-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
    .complaint-card { background:var(--white); border:1px solid var(--border); border-radius:var(--radius); padding:14px 16px; }
    .complaint-card-top { display:flex; align-items:center; justify-content:space-between; margin-bottom:8px; }
    .complaint-type-tag { display:flex; align-items:center; gap:6px; font-size:12px; font-weight:700; color:var(--dark); }
    .complaint-body { font-size:12px; color:var(--muted); margin-bottom:10px; line-height:1.5; }
    .complaint-footer { display:flex; align-items:center; justify-content:space-between; }
    .complaint-order-ref { font-size:11px; color:var(--muted); }
    .complaint-actions { display:flex; gap:6px; }

    /* ── SETTINGS PAGE ── */
    .settings-layout { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
    .input-group { margin-bottom:14px; }
    .input-label { font-size:12px; font-weight:700; color:var(--mid); margin-bottom:6px; display:block; }
    .input-field { width:100%; padding:10px 13px; border:1.5px solid var(--border); border-radius:var(--radius-xs); background:var(--sand); font-family:'Cairo',sans-serif; font-size:13px; color:var(--dark); outline:none; transition:border-color .2s; }
    .input-field:focus { border-color:var(--teal); box-shadow:0 0 0 3px rgba(13,107,94,.08); }
    .hours-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px 14px; }
    .hours-row { display:flex; align-items:center; gap:8px; font-size:12px; }
    .day-label { width:55px; color:var(--mid); font-weight:600; flex-shrink:0; }
    .btn-primary { padding:10px 20px; background:var(--teal); border:none; border-radius:var(--radius-xs); color:#fff; font-family:'Cairo',sans-serif; font-size:13px; font-weight:700; cursor:pointer; transition:all .2s; }
    .btn-primary:hover { background:var(--teal-light); }
    .btn-outline-main { padding:10px 20px; background:transparent; border:1.5px solid var(--border); border-radius:var(--radius-xs); color:var(--mid); font-family:'Cairo',sans-serif; font-size:13px; font-weight:600; cursor:pointer; transition:all .2s; }
    .btn-outline-main:hover { border-color:var(--teal); color:var(--teal); }

    /* ── ADD MENU ITEM MODAL ── */
    .add-btn-fab { position:fixed; bottom:28px; inset-inline-end:28px; width:52px; height:52px; border-radius:50%; background:var(--teal); border:none; color:#fff; font-size:26px; cursor:pointer; box-shadow:var(--shadow-lg); display:flex; align-items:center; justify-content:center; transition:all .2s; z-index:100; }
    .add-btn-fab:hover { background:var(--teal-light); transform:scale(1.07); }

    /* ── EMPTY STATE ── */
    .empty-state { text-align:center; padding:40px 20px; }
    .empty-state-icon { font-size:44px; margin-bottom:12px; }
    .empty-state-title { font-size:15px; font-weight:700; color:var(--mid); margin-bottom:5px; }
    .empty-state-sub { font-size:12px; color:var(--muted); }

    /* ── TOAST ── */
    .toast { position:fixed; top:72px; inset-inline-start:50%; transform:translateX(-50%); background:var(--dark); color:#fff; padding:10px 20px; border-radius:20px; font-size:13px; font-weight:500; z-index:500; box-shadow:var(--shadow-lg); animation:toastIn .3s ease; white-space:nowrap; }
    @keyframes toastIn { from{opacity:0;transform:translateX(-50%) translateY(-10px)} to{opacity:1;transform:translateX(-50%) translateY(0)} }

    /* ── HELPERS ── */
    .flex { display:flex; }
    .gap-8 { gap:8px; }
    .gap-12 { gap:12px; }
    .align-center { align-items:center; }
    .justify-between { justify-content:space-between; }
    .text-muted { color:var(--muted); font-size:12px; }
    .font-bold { font-weight:700; }
    .mt-4 { margin-top:4px; }
    .mt-8 { margin-top:8px; }
    .mt-12 { margin-top:12px; }
    .mb-8 { margin-bottom:8px; }
    .mb-12 { margin-bottom:12px; }
    .mb-16 { margin-bottom:16px; }
    .grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
  `}</style>
);

/* ══════════════════════════════════════════════
   MOCK DATA
══════════════════════════════════════════════ */
const ORDERS = [
  { id:"PD-2901", customer:{name:{ar:"أحمد محمد",en:"Ahmed Mohamed"},    phone:"0100-234-5678", initials:"أح" }, items:[{ar:"بيتزا مارغريتا × 1",en:"Margherita × 1"},{ar:"بيبسي × 2",en:"Pepsi × 2"}], total:135, status:"preparing", time:"12:35", address:{ar:"مدينة نصر، شارع عباس",en:"Nasr City, Abbas St."}, payment:"cash",  note:{ar:"",en:""} },
  { id:"PD-2902", customer:{name:{ar:"سارة علي",en:"Sara Ali"},           phone:"0111-345-6789", initials:"سع" }, items:[{ar:"شاورما دجاج × 2",en:"Chicken Shawarma × 2"},{ar:"عصير × 1",en:"Juice × 1"}],       total:110, status:"new",      time:"12:41", address:{ar:"المهندسين، شارع جامعة الدول",en:"Mohandeseen, Arab League St."}, payment:"instapay", note:{ar:"حار جداً",en:"Extra spicy"} },
  { id:"PD-2900", customer:{name:{ar:"محمود حسن",en:"Mahmoud Hassan"},    phone:"0120-456-7890", initials:"مح" }, items:[{ar:"كشري كبير × 2",en:"Large Koshari × 2"}],                                             total:90,  status:"onway",    time:"12:10", address:{ar:"الزمالك، شارع ٢٦ يوليو",en:"Zamalek, 26 July St."}, payment:"card",     note:{ar:"",en:""} },
  { id:"PD-2899", customer:{name:{ar:"نور إبراهيم",en:"Nour Ibrahim"},    phone:"0155-567-8901", initials:"نإ" }, items:[{ar:"بيتزا بيبروني × 1",en:"Pepperoni × 1"}],                                            total:115, status:"delivered", time:"11:50", address:{ar:"مصر الجديدة",en:"Heliopolis"}, payment:"cash",     note:{ar:"",en:""} },
  { id:"PD-2898", customer:{name:{ar:"كريم فاروق",en:"Karim Farouk"},     phone:"0100-678-9012", initials:"كف" }, items:[{ar:"سوشي مكس × 1",en:"Sushi Mix × 1"},{ar:"مياه × 2",en:"Water × 2"}],                 total:200, status:"cancelled", time:"11:20", address:{ar:"التجمع الخامس",en:"New Cairo"}, payment:"card",     note:{ar:"",en:""} },
  { id:"PD-2897", customer:{name:{ar:"هبة عبدالله",en:"Heba Abdullah"},   phone:"0115-789-0123", initials:"هع" }, items:[{ar:"شاورما لحم × 1",en:"Meat Shawarma × 1"},{ar:"عصير برتقال",en:"OJ"}],                total:95,  status:"delivered", time:"11:05", address:{ar:"المقطم",en:"Mokattam"}, payment:"instapay", note:{ar:"",en:""} },
];

const MENU_CATEGORIES = [
  { id:"all",    label:{ar:"الكل",en:"All"},         emoji:"🍽",  count:12 },
  { id:"pizza",  label:{ar:"بيتزا",en:"Pizza"},      emoji:"🍕",  count:4 },
  { id:"shawarma",label:{ar:"شاورما",en:"Shawarma"}, emoji:"🌯",  count:3 },
  { id:"drinks", label:{ar:"مشروبات",en:"Drinks"},   emoji:"🥤",  count:3 },
  { id:"extras", label:{ar:"إضافات",en:"Extras"},    emoji:"🍟",  count:2 },
];

const MENU_ITEMS = [
  { id:1, cat:"pizza",   name:{ar:"بيتزا مارغريتا",en:"Margherita Pizza"},   desc:{ar:"صلصة طماطم، موزاريلا، ريحان",en:"Tomato sauce, mozzarella, basil"}, price:95,  emoji:"🍕",  available:true,  tag:"popular" },
  { id:2, cat:"pizza",   name:{ar:"بيتزا بيبروني",en:"Pepperoni Pizza"},     desc:{ar:"بيبروني، موزاريلا، فلفل",en:"Pepperoni, mozzarella, peppers"},       price:115, emoji:"🍕",  available:true,  tag:"popular" },
  { id:3, cat:"pizza",   name:{ar:"بيتزا خضار",en:"Veggie Pizza"},           desc:{ar:"خضار مشكلة، صلصة خضراء",en:"Mixed vegetables, green sauce"},         price:90,  emoji:"🍕",  available:true,  tag:"" },
  { id:4, cat:"pizza",   name:{ar:"بيتزا دجاج",en:"Chicken Pizza"},          desc:{ar:"دجاج مشوي، فلفل، جبنة",en:"Grilled chicken, peppers, cheese"},       price:105, emoji:"🍕",  available:false, tag:"" },
  { id:5, cat:"shawarma",name:{ar:"شاورما دجاج",en:"Chicken Shawarma"},      desc:{ar:"دجاج، خضار، صلصة ثوم",en:"Chicken, veggies, garlic sauce"},           price:55,  emoji:"🌯",  available:true,  tag:"popular" },
  { id:6, cat:"shawarma",name:{ar:"شاورما لحم",en:"Meat Shawarma"},          desc:{ar:"لحم عجل، صلصة خاصة",en:"Veal, special sauce"},                       price:65,  emoji:"🌯",  available:true,  tag:"" },
  { id:7, cat:"shawarma",name:{ar:"بلاتة مشكلة",en:"Mixed Plate"},          desc:{ar:"لحم ودجاج + أرز",en:"Meat & chicken + rice"},                          price:85,  emoji:"🌯",  available:true,  tag:"new" },
  { id:8, cat:"drinks",  name:{ar:"بيبسي",en:"Pepsi"},                       desc:{ar:"٣٣٠ مل مبردة",en:"330ml chilled"},                                     price:20,  emoji:"🥤",  available:true,  tag:"" },
  { id:9, cat:"drinks",  name:{ar:"عصير مانجو",en:"Mango Juice"},            desc:{ar:"طازج ١٠٠٪",en:"100% fresh"},                                          price:30,  emoji:"🍹",  available:true,  tag:"" },
  { id:10,cat:"drinks",  name:{ar:"مياه معدنية",en:"Water"},                 desc:{ar:"٥٠٠ مل",en:"500ml"},                                                  price:10,  emoji:"💧",  available:true,  tag:"" },
  { id:11,cat:"extras",  name:{ar:"صوص ثوم",en:"Garlic Sauce"},              desc:{ar:"٨٠ جرام",en:"80g"},                                                   price:15,  emoji:"🫙",  available:true,  tag:"" },
  { id:12,cat:"extras",  name:{ar:"خبز ثوم",en:"Garlic Bread"},              desc:{ar:"٤ قطع",en:"4 pieces"},                                                price:25,  emoji:"🍞",  available:true,  tag:"new" },
];

const CONVERSATIONS = [
  { id:1, customer:{name:{ar:"أحمد محمد",en:"Ahmed Mohamed"}, initials:"أح", phone:"0100-234-5678"}, orderId:"PD-2901", time:"12:41", orderStatus:"preparing",
    messages:[
      { role:"ai",   ar:"أهلاً أحمد! أنا بولي مساعدك 🎉 إيه اللي تحب تطلبه؟", en:"Hey Ahmed! I'm Poly your assistant 🎉 What would you like?" },
      { role:"user", ar:"بيتزا مارغريتا من فضلك", en:"Margherita pizza please" },
      { role:"ai",   ar:"تمام! حجم إيه؟ صغير ٦٥ج، وسط ٩٥ج، كبير ١٢٠ج", en:"Sure! What size? Small 65EGP, Medium 95EGP, Large 120EGP" },
      { role:"user", ar:"وسط", en:"Medium" },
      { role:"ai",   ar:"ممتاز ✅ جبنة إضافية؟ +١٥ج", en:"Great ✅ Extra cheese? +15EGP" },
      { role:"user", ar:"لا شكراً. وكمان بيبسي ٢", en:"No thanks. And 2 Pepsis" },
      { role:"ai",   ar:"تمام! المجموع: بيتزا وسط ٩٥ج + بيبسي × ٢ = ٤٠ج = إجمالي ١٣٥ج. توصيل عنوانك؟", en:"Done! Total: Medium pizza 95EGP + Pepsi ×2 = 40EGP = Total 135EGP. Delivery address?" },
      { role:"user", ar:"مدينة نصر، شارع عباس", en:"Nasr City, Abbas St." },
      { role:"ai",   ar:"تأكيد الطلب: مارغريتا وسط + بيبسي × ٢، توصيل مدينة نصر. تدفع كاش ولا بطاقة؟", en:"Confirming: Medium Margherita + Pepsi ×2, deliver to Nasr City. Cash or card?" },
      { role:"user", ar:"كاش", en:"Cash" },
      { role:"ai",   ar:"✅ تم تأكيد طلبك! رقم الطلب PD-2901. وقت التوصيل ٣٠-٤٠ دقيقة", en:"✅ Order confirmed! Order #PD-2901. Delivery time 30-40 minutes" },
    ],
    orderItems:[{ar:"بيتزا مارغريتا وسط",en:"Medium Margherita"},{ar:"بيبسي × ٢",en:"Pepsi × 2"}],
    orderTotal:135
  },
  { id:2, customer:{name:{ar:"سارة علي",en:"Sara Ali"}, initials:"سع", phone:"0111-345-6789"}, orderId:"PD-2902", time:"12:38", orderStatus:"new",
    messages:[
      { role:"ai",   ar:"أهلاً سارة! إيه اللي تطلبيه النهارده؟", en:"Hey Sara! What would you like today?" },
      { role:"user", ar:"عايزة شاورما دجاج ٢ وعصير", en:"I want 2 chicken shawarmas and a juice" },
      { role:"ai",   ar:"ممتاز! عصير إيه؟ مانجو ٣٠ج أو برتقال ٢٥ج؟", en:"Great! What juice? Mango 30EGP or Orange 25EGP?" },
      { role:"user", ar:"مانجو", en:"Mango" },
      { role:"ai",   ar:"المجموع: شاورما × ٢ = ١١٠ج + مانجو ٣٠ج = ١٤٠ج. هل حار عادي ولا تحبي أكتر؟", en:"Total: Shawarma ×2 = 110EGP + Mango 30EGP = 140EGP. Regular spicy or extra?" },
      { role:"user", ar:"حار جداً", en:"Extra spicy" },
      { role:"ai",   ar:"✅ تم! إجمالي ١٤٠ج. ما هو عنوانك؟", en:"✅ Done! Total 140EGP. What's your address?" },
    ],
    orderItems:[{ar:"شاورما دجاج × ٢",en:"Chicken Shawarma × 2"},{ar:"عصير مانجو",en:"Mango Juice"}],
    orderTotal:110
  },
  { id:3, customer:{name:{ar:"محمود حسن",en:"Mahmoud Hassan"}, initials:"مح", phone:"0120-456-7890"}, orderId:"PD-2900", time:"12:15", orderStatus:"onway",
    messages:[
      { role:"ai",   ar:"أهلاً! أنا بولي، قولي إيه اللي تحبه", en:"Hey! I'm Poly, tell me what you'd like" },
      { role:"user", ar:"كشري كبير عدد ٢", en:"2 large koshari" },
      { role:"ai",   ar:"تمام! ٢ كشري كبير = ٩٠ج. عنوانك؟", en:"Sure! 2 Large Koshari = 90EGP. Your address?" },
    ],
    orderItems:[{ar:"كشري كبير × ٢",en:"Large Koshari × 2"}],
    orderTotal:90
  },
];

const COMPLAINTS_DATA = [
  { id:"C-0012", orderId:"PD-2847", type:{ar:"تأخير التوصيل",en:"Late Delivery"},   emoji:"⏰", desc:{ar:"وصل الطلب بعد ٧٥ دقيقة والوقت المتوقع كان ٣٠ دقيقة",en:"Order arrived after 75 mins, expected 30 mins"}, status:"pending",  customer:{ar:"أحمد محمد",en:"Ahmed Mohamed"},  date:"٥ مايو" },
  { id:"C-0011", orderId:"PD-2801", type:{ar:"طلب غلط",en:"Wrong Order"},           emoji:"❌", desc:{ar:"جالي شاورما لحم بدل دجاج",en:"Received meat shawarma instead of chicken"},                                 status:"resolved", customer:{ar:"سارة علي",en:"Sara Ali"},           date:"٤ مايو" },
  { id:"C-0010", orderId:"PD-2756", type:{ar:"جودة الأكل",en:"Food Quality"},       emoji:"🍽", desc:{ar:"البيتزا وصلت باردة",en:"Pizza arrived cold"},                                                                status:"resolved", customer:{ar:"كريم فاروق",en:"Karim Farouk"},      date:"٣ مايو" },
  { id:"C-0009", orderId:"PD-2700", type:{ar:"مشكلة مع الديليفري",en:"Driver Issue"},emoji:"🛵",desc:{ar:"السائق كان غير محترم",en:"Driver was rude"},                                                                  status:"pending",  customer:{ar:"هبة عبدالله",en:"Heba Abdullah"},  date:"١ مايو" },
];

const REVENUE_WEEK = [
  { day:{ar:"إثن",en:"Mon"}, val:1240, orders:12 },
  { day:{ar:"ثلا",en:"Tue"}, val:1580, orders:16 },
  { day:{ar:"أرب",en:"Wed"}, val:1090, orders:10 },
  { day:{ar:"خمي",en:"Thu"}, val:1870, orders:19 },
  { day:{ar:"جمع",en:"Fri"}, val:2340, orders:24 },
  { day:{ar:"سبت",en:"Sat"}, val:2820, orders:29 },
  { day:{ar:"أحد",en:"Sun"}, val:1950, orders:20 },
];

/* ══════════════════════════════════════════════
   TRANSLATIONS
══════════════════════════════════════════════ */
const T = {
  ar:{
    dashboard:"لوحة التحكم", orders:"الطلبات", menu:"قائمة الطعام",
    conversations:"المحادثات", complaints:"الشكاوى", settings:"الإعدادات",
    liveOrders:"طلبات نشطة", todayRevenue:"إيرادات اليوم", todayOrders:"طلبات اليوم",
    avgOrder:"متوسط الطلب", weekRevenue:"إيرادات الأسبوع", recentOrders:"آخر الطلبات",
    viewAll:"عرض الكل", egp:"ج.م",
    allOrders:"الكل", newOrders:"جديد", preparingOrders:"قيد التحضير",
    onWayOrders:"في الطريق", deliveredOrders:"تم التوصيل", cancelledOrders:"ملغي",
    customer:"العميل", items:"الأصناف", total:"الإجمالي", status:"الحالة",
    time:"الوقت", actions:"إجراءات",
    accept:"قبول", prepare:"تحضير", dispatch:"إرسال", complete:"تسليم", cancel:"إلغاء",
    viewOrder:"تفاصيل", viewChat:"المحادثة",
    orderDetail:"تفاصيل الطلب", orderTimeline:"مراحل الطلب",
    address:"العنوان", payment:"الدفع", notes:"ملاحظات",
    close:"إغلاق", printOrder:"طباعة",
    categories:"الفئات", addItem:"إضافة صنف", available:"متاح", unavailable:"غير متاح",
    popular:"الأكثر طلباً", newTag:"جديد",
    toggleOn:"تفعيل", toggleOff:"تعطيل", edit:"تعديل",
    convTitle:"المحادثات مع العملاء", orderSummary:"ملخص الطلب",
    complaintTitle:"الشكاوى الواردة", resolved:"تم الحل", pending:"قيد المراجعة",
    resolve:"حل الشكوى", reply:"رد",
    restProfile:"بيانات المطعم", openingHours:"مواعيد العمل",
    save:"حفظ", cancel2:"إلغاء",
    notifs:"الإشعارات", integrations:"التكاملات",
    sun:"أحد", mon:"إثن", tue:"ثلا", wed:"أرب", thu:"خمي", fri:"جمع", sat:"سبت",
    poweredBy:"مدعوم من بولي دايل",
    confirmStep:"تأكيد", prepStep:"تحضير", wayStep:"في الطريق", doneStep:"تم التوصيل",
    trendUp:"مقارنة بالأمس", trendOrders:"طلب",
    searchOrders:"بحث في الطلبات...", menuSearch:"بحث في القائمة...",
    addItemModal:"إضافة صنف جديد", itemName:"اسم الصنف", itemDesc:"الوصف",
    itemPrice:"السعر", itemCat:"الفئة", itemEmoji:"أيقونة", saveItem:"حفظ الصنف",
    restName:"اسم المطعم", restCuisine:"نوع المطبخ", restPhone:"رقم التواصل",
    restAddress:"العنوان الكامل", restMinOrder:"الحد الأدنى للطلب", restDeliveryFee:"رسوم التوصيل",
    open:"مفتوح", closed:"مغلق",
  },
  en:{
    dashboard:"Dashboard", orders:"Orders", menu:"Menu",
    conversations:"Conversations", complaints:"Complaints", settings:"Settings",
    liveOrders:"Live Orders", todayRevenue:"Today's Revenue", todayOrders:"Today's Orders",
    avgOrder:"Avg. Order", weekRevenue:"This Week Revenue", recentOrders:"Recent Orders",
    viewAll:"View All", egp:"EGP",
    allOrders:"All", newOrders:"New", preparingOrders:"Preparing",
    onWayOrders:"On Way", deliveredOrders:"Delivered", cancelledOrders:"Cancelled",
    customer:"Customer", items:"Items", total:"Total", status:"Status",
    time:"Time", actions:"Actions",
    accept:"Accept", prepare:"Prepare", dispatch:"Dispatch", complete:"Delivered", cancel:"Cancel",
    viewOrder:"Details", viewChat:"Chat",
    orderDetail:"Order Details", orderTimeline:"Order Timeline",
    address:"Address", payment:"Payment", notes:"Notes",
    close:"Close", printOrder:"Print",
    categories:"Categories", addItem:"Add Item", available:"Available", unavailable:"Unavailable",
    popular:"Popular", newTag:"New",
    toggleOn:"Enable", toggleOff:"Disable", edit:"Edit",
    convTitle:"Customer Conversations", orderSummary:"Order Summary",
    complaintTitle:"Incoming Complaints", resolved:"Resolved", pending:"Pending Review",
    resolve:"Resolve", reply:"Reply",
    restProfile:"Restaurant Profile", openingHours:"Opening Hours",
    save:"Save", cancel2:"Cancel",
    notifs:"Notifications", integrations:"Integrations",
    sun:"Sun", mon:"Mon", tue:"Tue", wed:"Wed", thu:"Thu", fri:"Fri", sat:"Sat",
    poweredBy:"Powered by PolyDial",
    confirmStep:"Confirmed", prepStep:"Preparing", wayStep:"On the Way", doneStep:"Delivered",
    trendUp:"vs yesterday", trendOrders:"orders",
    searchOrders:"Search orders...", menuSearch:"Search menu...",
    addItemModal:"Add New Item", itemName:"Item Name", itemDesc:"Description",
    itemPrice:"Price", itemCat:"Category", itemEmoji:"Icon", saveItem:"Save Item",
    restName:"Restaurant Name", restCuisine:"Cuisine Type", restPhone:"Contact Phone",
    restAddress:"Full Address", restMinOrder:"Min. Order", restDeliveryFee:"Delivery Fee",
    open:"Open", closed:"Closed",
  }
};

/* ══════════════════════════════════════════════
   REVENUE CHART (SVG)
══════════════════════════════════════════════ */
function RevenueChart({ data, lang }) {
  const maxVal = Math.max(...data.map(d => d.val));
  const H = 100;
  return (
    <div>
      <div style={{display:"flex",gap:"6px",alignItems:"flex-end",height:H+20,paddingBottom:20,position:"relative"}}>
        {data.map((d, i) => {
          const barH = Math.max(6, (d.val / maxVal) * H);
          const isToday = i === 5;
          return (
            <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4,height:"100%",justifyContent:"flex-end"}}>
              <div title={`${d.val} EGP`} style={{
                width:"100%",height:barH,
                background: isToday ? "var(--amber-light)" : "var(--teal)",
                borderRadius:"4px 4px 0 0",transition:"height .4s",cursor:"pointer",
                opacity: isToday ? 1 : 0.75
              }}/>
              <div style={{fontSize:10,color:"var(--muted)",position:"absolute",bottom:0}}>{d.day[lang]}</div>
            </div>
          );
        })}
      </div>
      <div style={{display:"flex",gap:14,marginTop:8}}>
        <div style={{display:"flex",alignItems:"center",gap:5,fontSize:11,color:"var(--muted)"}}>
          <div style={{width:10,height:10,borderRadius:2,background:"var(--teal)",opacity:.75}}/>
          {lang==="ar"?"أيام الأسبوع":"Weekdays"}
        </div>
        <div style={{display:"flex",alignItems:"center",gap:5,fontSize:11,color:"var(--muted)"}}>
          <div style={{width:10,height:10,borderRadius:2,background:"var(--amber-light)"}}/>
          {lang==="ar"?"أمس":"Yesterday"}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   STATUS BADGE HELPER
══════════════════════════════════════════════ */
function StatusBadge({ status, lang }) {
  const map = {
    new:       { cls:"badge-new",       ar:"جديد",          en:"New" },
    preparing: { cls:"badge-preparing", ar:"قيد التحضير",   en:"Preparing" },
    onway:     { cls:"badge-onway",     ar:"في الطريق",     en:"On the Way" },
    delivered: { cls:"badge-delivered", ar:"تم التوصيل",    en:"Delivered" },
    cancelled: { cls:"badge-cancelled", ar:"ملغي",           en:"Cancelled" },
  };
  const s = map[status] || map.new;
  return (
    <span className={`badge ${s.cls}`}>
      <span className="badge-dot"/>
      {lang==="ar" ? s.ar : s.en}
    </span>
  );
}

/* ══════════════════════════════════════════════
   ORDER DETAIL MODAL
══════════════════════════════════════════════ */
function OrderDetailModal({ order, lang, onClose, onStatusChange }) {
  if (!order) return null;
  const l = T[lang];
  const steps = [
    { key:"confirmed", label:l.confirmStep, icon:"✅" },
    { key:"preparing", label:l.prepStep,    icon:"👨‍🍳" },
    { key:"onway",     label:l.wayStep,     icon:"🛵" },
    { key:"delivered", label:l.doneStep,    icon:"🏠" },
  ];
  const stepIdx = { new:0, preparing:1, onway:2, delivered:3, cancelled:-1 };
  const current = stepIdx[order.status] ?? 0;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">{l.orderDetail} — <span style={{color:"var(--teal)"}}>{order.id}</span></div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          {/* Customer info */}
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16,padding:"12px 14px",background:"var(--sand)",borderRadius:"var(--radius-sm)"}}>
            <div className="order-avatar" style={{width:38,height:38,fontSize:14}}>
              {order.customer.initials}
            </div>
            <div>
              <div style={{fontSize:14,fontWeight:700,color:"var(--dark)"}}>{lang==="ar"?order.customer.name.ar:order.customer.name.en}</div>
              <div style={{fontSize:12,color:"var(--muted)"}}>{order.customer.phone}</div>
            </div>
            <StatusBadge status={order.status} lang={lang}/>
          </div>

          {/* Items */}
          <div style={{marginBottom:14}}>
            {order.items.map((item, i) => (
              <div key={i} className="order-item-line">
                <span>{lang==="ar" ? item.ar : item.en}</span>
              </div>
            ))}
            <div style={{display:"flex",justifyContent:"space-between",padding:"8px 10px",fontWeight:700,fontSize:14,color:"var(--dark)"}}>
              <span>{l.total}</span>
              <span style={{color:"var(--teal)"}}>{order.total} {l.egp}</span>
            </div>
          </div>

          {/* Details */}
          {[
            [l.address,  lang==="ar"?order.address.ar:order.address.en],
            [l.payment,  order.payment],
            ...(order.note?.ar ? [[l.notes, lang==="ar"?order.note.ar:order.note.en]] : []),
            [l.time,     order.time],
          ].map(([lbl, val]) => (
            <div key={lbl} className="detail-row">
              <span className="detail-label">{lbl}</span>
              <span className="detail-val">{val}</span>
            </div>
          ))}

          {/* Timeline */}
          {order.status !== "cancelled" && (
            <div style={{marginTop:16}}>
              <div style={{fontSize:12,fontWeight:700,color:"var(--mid)",marginBottom:12}}>{l.orderTimeline}</div>
              {steps.map((step, i) => (
                <div key={step.key} className="timeline-step">
                  <div className={`timeline-dot ${i < current ? "done" : i === current ? "active" : "pending"}`}>
                    {step.icon}
                  </div>
                  <div className="timeline-text">
                    <div className="timeline-label" style={{color: i <= current ? "var(--dark)" : "var(--muted)"}}>{step.label}</div>
                    {i <= current && <div className="timeline-time">{order.time}</div>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Actions */}
          <div style={{display:"flex",gap:8,marginTop:20}}>
            {order.status === "new" && (
              <button className="btn-primary" style={{flex:1}} onClick={() => onStatusChange(order.id,"preparing")}>{l.accept}</button>
            )}
            {order.status === "preparing" && (
              <button className="btn-primary" style={{flex:1}} onClick={() => onStatusChange(order.id,"onway")}>{l.dispatch}</button>
            )}
            {order.status === "onway" && (
              <button className="btn-primary" style={{flex:1}} onClick={() => onStatusChange(order.id,"delivered")}>{l.complete}</button>
            )}
            <button className="btn-outline-main" style={{flex:1}} onClick={onClose}>{l.close}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   ADD MENU ITEM MODAL
══════════════════════════════════════════════ */
function AddItemModal({ lang, onClose, onSave }) {
  const l = T[lang];
  const [form, setForm] = useState({ name:"", desc:"", price:"", cat:"pizza", emoji:"🍕" });
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">{l.addItemModal}</div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="grid-2">
            <div className="input-group" style={{gridColumn:"1/-1"}}>
              <label className="input-label">{l.itemName}</label>
              <input className="input-field" value={form.name} onChange={e => setForm({...form,name:e.target.value})} placeholder={lang==="ar"?"مثال: بيتزا مارغريتا":"e.g. Margherita Pizza"}/>
            </div>
            <div className="input-group" style={{gridColumn:"1/-1"}}>
              <label className="input-label">{l.itemDesc}</label>
              <input className="input-field" value={form.desc} onChange={e => setForm({...form,desc:e.target.value})} placeholder={lang==="ar"?"وصف مختصر":"Brief description"}/>
            </div>
            <div className="input-group">
              <label className="input-label">{l.itemPrice} ({l.egp})</label>
              <input className="input-field" type="number" value={form.price} onChange={e => setForm({...form,price:e.target.value})} placeholder="0"/>
            </div>
            <div className="input-group">
              <label className="input-label">{l.itemEmoji}</label>
              <input className="input-field" value={form.emoji} onChange={e => setForm({...form,emoji:e.target.value})} style={{fontSize:20}}/>
            </div>
            <div className="input-group" style={{gridColumn:"1/-1"}}>
              <label className="input-label">{l.itemCat}</label>
              <select className="input-field" value={form.cat} onChange={e => setForm({...form,cat:e.target.value})}>
                {MENU_CATEGORIES.filter(c=>c.id!=="all").map(c => (
                  <option key={c.id} value={c.id}>{c.emoji} {c.label[lang]}</option>
                ))}
              </select>
            </div>
          </div>
          <div style={{display:"flex",gap:8,marginTop:8}}>
            <button className="btn-primary" style={{flex:1}} onClick={() => { onSave(form); onClose(); }}
              disabled={!form.name || !form.price}>{l.saveItem}</button>
            <button className="btn-outline-main" style={{flex:1}} onClick={onClose}>{l.cancel2}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   DASHBOARD VIEW
══════════════════════════════════════════════ */
function DashboardView({ lang, orders, onViewAllOrders, setTab }) {
  const l = T[lang];
  const liveCount = orders.filter(o => ["new","preparing","onway"].includes(o.status)).length;

  return (
    <div>
      {/* KPI Cards */}
      <div className="kpi-grid">
        {[
          { icon:"🔔", label:l.liveOrders,    val:liveCount, sub:`${orders.filter(o=>o.status==="new").length} ${lang==="ar"?"بانتظار القبول":"awaiting acceptance"}`, trend:null,  iconCls:"amber" },
          { icon:"💰", label:l.todayRevenue,  val:`${orders.filter(o=>o.status==="delivered").reduce((s,o)=>s+o.total,0)} ${l.egp}`, sub:lang==="ar"?"↑ ١٢٪ مقارنة بالأمس":"↑ 12% vs yesterday", trend:"up",  iconCls:"teal"  },
          { icon:"📦", label:l.todayOrders,   val:orders.length, sub:`${orders.filter(o=>o.status==="delivered").length} ${lang==="ar"?"مكتملة":"completed"}`, trend:"up",  iconCls:"green" },
          { icon:"📊", label:l.avgOrder,      val:`${Math.round(orders.reduce((s,o)=>s+o.total,0)/orders.length)} ${l.egp}`, sub:lang==="ar"?"↓ ٣٪ مقارنة بالأمس":"↓ 3% vs yesterday", trend:"down", iconCls:"blue"  },
        ].map((kpi, i) => (
          <div key={i} className="kpi-card">
            <div className={`kpi-icon ${kpi.iconCls}`}>{kpi.icon}</div>
            <div>
              <div className="kpi-label">{kpi.label}</div>
              <div className="kpi-value">{kpi.val}</div>
              {kpi.trend && <div className={`kpi-trend ${kpi.trend}`}>{kpi.sub}</div>}
              {!kpi.trend && <div className="kpi-sub">{kpi.sub}</div>}
            </div>
          </div>
        ))}
      </div>

      {/* Charts + Live Orders */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 380px",gap:16,marginBottom:16}}>
        <div className="card">
          <div className="card-header">
            <span className="card-title">📈 {l.weekRevenue}</span>
          </div>
          <div className="chart-wrap">
            <RevenueChart data={REVENUE_WEEK} lang={lang}/>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">🔴 {l.recentOrders}</span>
            <button className="view-all" onClick={() => setTab("orders")}>{l.viewAll}</button>
          </div>
          <div className="card-body" style={{padding:"8px 16px"}}>
            {orders.slice(0,5).map(order => (
              <div key={order.id} className="live-order-item">
                <div>
                  <div className="live-order-id">{order.id}</div>
                  <div style={{fontSize:11,color:"var(--muted)"}}>{order.time}</div>
                </div>
                <div style={{flex:1,paddingInline:"8px"}}>
                  <div style={{fontSize:12,fontWeight:600,color:"var(--dark)"}}>{lang==="ar"?order.customer.name.ar:order.customer.name.en}</div>
                  <div className="order-items-preview">{order.items.map(i=>lang==="ar"?i.ar:i.en).join("، ")}</div>
                </div>
                <StatusBadge status={order.status} lang={lang}/>
                <div className="live-order-amount">{order.total} {l.egp}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   ORDERS VIEW
══════════════════════════════════════════════ */
function OrdersView({ lang, orders, setOrders, showToast }) {
  const l = T[lang];
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [detailOrder, setDetailOrder] = useState(null);

  const statusChange = (id, newStatus) => {
    setOrders(prev => prev.map(o => o.id===id ? {...o, status:newStatus} : o));
    setDetailOrder(prev => prev?.id===id ? {...prev, status:newStatus} : prev);
    showToast(lang==="ar"?"✓ تم تحديث حالة الطلب":"✓ Order status updated");
  };

  const filters = [
    { key:"all",       label:l.allOrders,       count:orders.length },
    { key:"new",       label:l.newOrders,       count:orders.filter(o=>o.status==="new").length },
    { key:"preparing", label:l.preparingOrders, count:orders.filter(o=>o.status==="preparing").length },
    { key:"onway",     label:l.onWayOrders,     count:orders.filter(o=>o.status==="onway").length },
    { key:"delivered", label:l.deliveredOrders, count:orders.filter(o=>o.status==="delivered").length },
    { key:"cancelled", label:l.cancelledOrders, count:orders.filter(o=>o.status==="cancelled").length },
  ];

  const visible = orders.filter(o =>
    (filter === "all" || o.status === filter) &&
    (search === "" || o.id.includes(search) || (lang==="ar"?o.customer.name.ar:o.customer.name.en).includes(search))
  );

  const nextAction = (status, id) => {
    if (status==="new")       return <button className="btn-action btn-action-teal"  onClick={e=>{e.stopPropagation();statusChange(id,"preparing")}}>{l.accept}</button>;
    if (status==="preparing") return <button className="btn-action btn-action-amber" onClick={e=>{e.stopPropagation();statusChange(id,"onway")}}>{l.dispatch}</button>;
    if (status==="onway")     return <button className="btn-action btn-action-teal"  onClick={e=>{e.stopPropagation();statusChange(id,"delivered")}}>{l.complete}</button>;
    return null;
  };

  return (
    <div>
      {detailOrder && <OrderDetailModal order={detailOrder} lang={lang} onClose={() => setDetailOrder(null)} onStatusChange={statusChange}/>}

      <div className="filter-bar">
        {filters.map(f => (
          <button key={f.key} className={`filter-tab ${filter===f.key?"active":""}`} onClick={() => setFilter(f.key)}>
            {f.label}
            <span className="filter-tab-count">{f.count}</span>
          </button>
        ))}
        <div className="search-input-wrap">
          <span className="search-icon">🔍</span>
          <input className="search-input" placeholder={l.searchOrders} value={search} onChange={e => setSearch(e.target.value)}/>
        </div>
      </div>

      <div className="card">
        <div className="order-table-wrap">
          <table className="order-table">
            <thead>
              <tr>
                <th>#{lang==="ar"?"الطلب":"Order"}</th>
                <th>{l.customer}</th>
                <th>{l.items}</th>
                <th>{l.total}</th>
                <th>{l.status}</th>
                <th>{l.time}</th>
                <th>{l.actions}</th>
              </tr>
            </thead>
            <tbody>
              {visible.length === 0 ? (
                <tr><td colSpan={7}>
                  <div className="empty-state">
                    <div className="empty-state-icon">📭</div>
                    <div className="empty-state-title">{lang==="ar"?"لا توجد طلبات":"No orders found"}</div>
                  </div>
                </td></tr>
              ) : visible.map(order => (
                <tr key={order.id} style={{cursor:"pointer"}} onClick={() => setDetailOrder(order)}>
                  <td><strong style={{color:"var(--teal)",fontSize:13}}>{order.id}</strong></td>
                  <td>
                    <div className="order-customer">
                      <div className="order-avatar">{order.customer.initials}</div>
                      <div>
                        <div className="order-name">{lang==="ar"?order.customer.name.ar:order.customer.name.en}</div>
                        <div className="order-phone">{order.customer.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="order-items-preview">{order.items.map(i=>lang==="ar"?i.ar:i.en).join("، ")}</div>
                  </td>
                  <td><strong style={{color:"var(--teal)"}}>{order.total} {l.egp}</strong></td>
                  <td><StatusBadge status={order.status} lang={lang}/></td>
                  <td><span style={{fontSize:12,color:"var(--muted)"}}>{order.time}</span></td>
                  <td>
                    <div className="order-actions-wrap" onClick={e => e.stopPropagation()}>
                      {nextAction(order.status, order.id)}
                      <button className="btn-action btn-action-outline" onClick={e => {e.stopPropagation(); setDetailOrder(order);}}>{l.viewOrder}</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   MENU VIEW
══════════════════════════════════════════════ */
function MenuView({ lang, showToast }) {
  const l = T[lang];
  const [activeCat, setActiveCat] = useState("all");
  const [items, setItems]         = useState(MENU_ITEMS);
  const [search, setSearch]       = useState("");
  const [showAdd, setShowAdd]     = useState(false);

  const toggle = (id) => {
    setItems(prev => prev.map(i => i.id===id ? {...i, available:!i.available} : i));
    showToast(lang==="ar"?"✓ تم تحديث التوفر":"✓ Availability updated");
  };
  const save = (form) => {
    setItems(prev => [...prev, {id:Date.now(), cat:form.cat, name:{ar:form.name,en:form.name}, desc:{ar:form.desc,en:form.desc}, price:+form.price, emoji:form.emoji, available:true, tag:"new"}]);
    showToast(lang==="ar"?"✓ تم إضافة الصنف":"✓ Item added");
  };

  const visible = items.filter(i =>
    (activeCat==="all" || i.cat===activeCat) &&
    (search==="" || (lang==="ar"?i.name.ar:i.name.en).includes(search))
  );

  return (
    <div>
      {showAdd && <AddItemModal lang={lang} onClose={() => setShowAdd(false)} onSave={save}/>}

      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
        <div className="search-input-wrap" style={{marginInlineStart:0}}>
          <span className="search-icon">🔍</span>
          <input className="search-input" style={{width:220}} placeholder={l.menuSearch} value={search} onChange={e=>setSearch(e.target.value)}/>
        </div>
        <button className="btn-primary" style={{display:"flex",alignItems:"center",gap:6}} onClick={() => setShowAdd(true)}>
          ＋ {l.addItem}
        </button>
      </div>

      <div className="menu-layout">
        {/* Category sidebar */}
        <div className="cat-sidebar card" style={{position:"sticky",top:0}}>
          <div className="card-header"><span className="card-title">{l.categories}</span></div>
          <div className="card-body" style={{padding:8}}>
            {MENU_CATEGORIES.map(cat => (
              <div key={cat.id} className={`cat-item ${activeCat===cat.id?"active":""}`} onClick={() => setActiveCat(cat.id)}>
                <span className="cat-item-emoji">{cat.emoji}</span>
                <span>{cat.label[lang]}</span>
                <span className="cat-item-count">{cat.id==="all"?items.length:items.filter(i=>i.cat===cat.id).length}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Items grid */}
        <div>
          {visible.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">🍽</div>
              <div className="empty-state-title">{lang==="ar"?"لا توجد أصناف":"No items found"}</div>
            </div>
          ) : (
            <div className="menu-items-grid">
              {visible.map(item => (
                <div key={item.id} className="menu-item-card" style={{opacity:item.available?1:0.65}}>
                  <div className="menu-item-img" style={{background: item.available ? "var(--sand)" : "var(--border-light)"}}>
                    <span style={{fontSize:42}}>{item.emoji}</span>
                    {item.tag === "popular" && <span className="menu-item-badge badge-popular">{l.popular}</span>}
                    {item.tag === "new"     && <span className="menu-item-badge badge-new-item">{l.newTag}</span>}
                    {!item.available        && <span className="menu-item-badge badge-unavail">{l.unavailable}</span>}
                  </div>
                  <div className="menu-item-body">
                    <div className="menu-item-name">{lang==="ar"?item.name.ar:item.name.en}</div>
                    <div className="menu-item-desc">{lang==="ar"?item.desc.ar:item.desc.en}</div>
                    <div className="menu-item-footer">
                      <span className="menu-item-price">{item.price} {l.egp}</span>
                      <button
                        className={`toggle ${item.available?"on":""}`}
                        title={item.available?l.toggleOff:l.toggleOn}
                        onClick={() => toggle(item.id)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   CONVERSATIONS VIEW
══════════════════════════════════════════════ */
function ConversationsView({ lang }) {
  const l = T[lang];
  const [activeConv, setActiveConv] = useState(CONVERSATIONS[0]);
  const bottomRef = useRef();
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:"smooth" }); }, [activeConv]);

  const statusColor = { preparing:"var(--amber)", new:"var(--blue)", onway:"var(--teal)", delivered:"var(--green)" };

  return (
    <div className="card conv-layout">
      {/* List */}
      <div className="conv-list">
        <div style={{padding:"12px 14px",borderBottom:"1px solid var(--border-light)",fontSize:13,fontWeight:700,color:"var(--mid)"}}>
          {l.convTitle}
        </div>
        {CONVERSATIONS.map(conv => (
          <div key={conv.id} className={`conv-item ${activeConv?.id===conv.id?"active":""}`} onClick={() => setActiveConv(conv)}>
            <div className="conv-avatar">{conv.customer.initials}</div>
            <div className="conv-meta">
              <div className="conv-name">
                {lang==="ar"?conv.customer.name.ar:conv.customer.name.en}
                <span className="conv-time">{conv.time}</span>
              </div>
              <div className="conv-preview">{lang==="ar"?conv.messages[conv.messages.length-1].ar:conv.messages[conv.messages.length-1].en}</div>
              <span className="conv-order-badge">#{conv.orderId}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Detail */}
      <div className="conv-detail">
        {activeConv ? (
          <>
            <div className="conv-detail-header">
              <div className="conv-avatar">{activeConv.customer.initials}</div>
              <div>
                <div className="conv-detail-name">{lang==="ar"?activeConv.customer.name.ar:activeConv.customer.name.en}</div>
                <div className="conv-detail-sub">{activeConv.customer.phone} · {activeConv.orderId}</div>
              </div>
              <StatusBadge status={activeConv.orderStatus} lang={lang}/>
            </div>

            {/* Order summary strip */}
            <div className="conv-order-summary">
              <div className="conv-order-summary-title">🧾 {l.orderSummary}</div>
              {activeConv.orderItems.map((item, i) => (
                <div key={i} className="conv-order-item">
                  <span>{lang==="ar"?item.ar:item.en}</span>
                </div>
              ))}
              <div className="conv-order-total">
                <span>{l.total}</span>
                <span>{activeConv.orderTotal} {l.egp}</span>
              </div>
            </div>

            <div className="conv-messages">
              {activeConv.messages.map((msg, i) => (
                <div key={i} className={`chat-bubble-wrap ${msg.role==="user"?"user":""}`}>
                  <div className={`chat-bubble-avatar ${msg.role==="ai"?"":"" }`} style={{background:msg.role==="ai"?"var(--teal-bg)":"var(--amber-bg)"}}>
                    {msg.role==="ai"?"🤖":"👤"}
                  </div>
                  <div className={`chat-bubble ${msg.role==="ai"?"chat-bubble-ai":"chat-bubble-user"}`}>
                    {lang==="ar"?msg.ar:msg.en}
                  </div>
                </div>
              ))}
              <div ref={bottomRef}/>
            </div>
          </>
        ) : (
          <div className="empty-state" style={{margin:"auto"}}>
            <div className="empty-state-icon">💬</div>
            <div className="empty-state-title">{lang==="ar"?"اختر محادثة":"Select a conversation"}</div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   COMPLAINTS VIEW
══════════════════════════════════════════════ */
function ComplaintsView({ lang, showToast }) {
  const l = T[lang];
  const [complaints, setComplaints] = useState(COMPLAINTS_DATA);

  const resolve = (id) => {
    setComplaints(prev => prev.map(c => c.id===id ? {...c, status:"resolved"} : c));
    showToast(lang==="ar"?"✓ تم حل الشكوى":"✓ Complaint resolved");
  };

  return (
    <div>
      <div style={{display:"flex",gap:10,marginBottom:16,flexWrap:"wrap"}}>
        {[
          { label:lang==="ar"?"الكل":"All",              val:complaints.length,                              bg:"var(--sand)",      color:"var(--mid)" },
          { label:lang==="ar"?"قيد المراجعة":"Pending",  val:complaints.filter(c=>c.status==="pending").length,  bg:"var(--amber-bg)", color:"var(--amber)" },
          { label:lang==="ar"?"تم الحل":"Resolved",       val:complaints.filter(c=>c.status==="resolved").length, bg:"var(--green-bg)", color:"var(--green)" },
        ].map((item, i) => (
          <div key={i} style={{background:item.bg,border:"1px solid var(--border)",borderRadius:"var(--radius-sm)",padding:"10px 16px",minWidth:100}}>
            <div style={{fontSize:11,color:"var(--muted)",marginBottom:4}}>{item.label}</div>
            <div style={{fontSize:22,fontWeight:800,color:item.color}}>{item.val}</div>
          </div>
        ))}
      </div>

      <div className="complaints-grid">
        {complaints.map(c => (
          <div key={c.id} className="complaint-card">
            <div className="complaint-card-top">
              <div className="complaint-type-tag">
                <span style={{fontSize:18}}>{c.emoji}</span>
                {lang==="ar"?c.type.ar:c.type.en}
              </div>
              <span className={`badge ${c.status==="resolved"?"badge-delivered":"badge-preparing"}`}>
                <span className="badge-dot"/>
                {c.status==="resolved" ? l.resolved : l.pending}
              </span>
            </div>
            <div className="complaint-body">{lang==="ar"?c.desc.ar:c.desc.en}</div>
            <div style={{fontSize:11,color:"var(--muted)",marginBottom:10}}>
              {lang==="ar"?c.customer.ar:c.customer.en} · #{c.orderId} · {c.date}
            </div>
            <div className="complaint-actions">
              {c.status==="pending" && (
                <button className="btn-action btn-action-teal" onClick={() => resolve(c.id)}>{l.resolve}</button>
              )}
              <button className="btn-action btn-action-outline">{l.reply}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   SETTINGS VIEW
══════════════════════════════════════════════ */
function SettingsView({ lang, showToast }) {
  const l = T[lang];
  const [isOpen, setIsOpen] = useState(true);
  const days = [l.sun,l.mon,l.tue,l.wed,l.thu,l.fri,l.sat];
  const [hours, setHours] = useState(days.map((d,i) => ({ day:d, from:"09:00", to:"23:00", enabled: i !== 0 })));

  return (
    <div>
      <div className="settings-layout">
        {/* Restaurant Profile */}
        <div className="card">
          <div className="card-header"><span className="card-title">🏪 {l.restProfile}</span></div>
          <div className="card-body">
            {[
              [l.restName,        lang==="ar"?"بيتزا مصر":"Pizza Misr"],
              [l.restCuisine,     lang==="ar"?"بيتزا · إيطالي":"Pizza · Italian"],
              [l.restPhone,       "+20 100 123 4567"],
              [l.restAddress,     lang==="ar"?"القاهرة، مصر الجديدة":"Heliopolis, Cairo"],
              [l.restMinOrder,    "80"],
              [l.restDeliveryFee, "25"],
            ].map(([lbl, val]) => (
              <div key={lbl} className="input-group">
                <label className="input-label">{lbl}</label>
                <input className="input-field" defaultValue={val}/>
              </div>
            ))}
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
              <span style={{fontSize:13,fontWeight:600,color:"var(--mid)"}}>{lang==="ar"?"حالة المطعم":"Restaurant Status"}</span>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <button className={`toggle ${isOpen?"on":""}`} onClick={() => setIsOpen(v=>!v)}/>
                <span style={{fontSize:12,fontWeight:600,color: isOpen ? "var(--green)" : "var(--red)"}}>
                  {isOpen ? l.open : l.closed}
                </span>
              </div>
            </div>
            <button className="btn-primary" onClick={() => showToast(lang==="ar"?"✓ تم الحفظ":"✓ Saved")}>{l.save}</button>
          </div>
        </div>

        {/* Opening Hours */}
        <div className="card">
          <div className="card-header"><span className="card-title">🕐 {l.openingHours}</span></div>
          <div className="card-body">
            {hours.map((h, i) => (
              <div key={i} className="hours-row" style={{marginBottom:10}}>
                <button className={`toggle ${h.enabled?"on":""}`} style={{flexShrink:0}}
                  onClick={() => setHours(prev => prev.map((item,j) => j===i ? {...item, enabled:!item.enabled} : item))}/>
                <span className="day-label" style={{color:h.enabled?"var(--dark)":"var(--muted)"}}>{h.day}</span>
                <input type="time" value={h.from} disabled={!h.enabled}
                  onChange={e => setHours(prev => prev.map((item,j) => j===i ? {...item,from:e.target.value} : item))}
                  style={{padding:"4px 8px",border:"1px solid var(--border)",borderRadius:"var(--radius-xs)",fontSize:12,background:"var(--sand)",flex:1,fontFamily:"'Cairo',sans-serif",opacity:h.enabled?1:.5}}/>
                <span style={{fontSize:11,color:"var(--muted)"}}>–</span>
                <input type="time" value={h.to} disabled={!h.enabled}
                  onChange={e => setHours(prev => prev.map((item,j) => j===i ? {...item,to:e.target.value} : item))}
                  style={{padding:"4px 8px",border:"1px solid var(--border)",borderRadius:"var(--radius-xs)",fontSize:12,background:"var(--sand)",flex:1,fontFamily:"'Cairo',sans-serif",opacity:h.enabled?1:.5}}/>
              </div>
            ))}
            <button className="btn-primary" style={{marginTop:8}} onClick={() => showToast(lang==="ar"?"✓ تم حفظ المواعيد":"✓ Hours saved")}>{l.save}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN APP
══════════════════════════════════════════════ */
export default function App() {
  const [lang, setLang]   = useState("ar");
  const [tab, setTab]     = useState("dashboard");
  const [orders, setOrders] = useState(ORDERS);
  const [toast, setToast] = useState(null);

  const l   = T[lang];
  const dir = lang==="ar" ? "rtl" : "ltr";

  const showToast = msg => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const liveCount = orders.filter(o => ["new","preparing","onway"].includes(o.status)).length;
  const newCount  = orders.filter(o => o.status === "new").length;
  const compCount = COMPLAINTS_DATA.filter(c => c.status === "pending").length;

  const navItems = [
    { id:"dashboard",     icon:"📊", label:l.dashboard,     badge:null },
    { id:"orders",        icon:"📦", label:l.orders,         badge:liveCount, badgeCls:"" },
    { id:"menu",          icon:"🍽", label:l.menu,           badge:null },
    { id:"conversations", icon:"💬", label:l.conversations,  badge:null },
    { id:"complaints",    icon:"🚨", label:l.complaints,     badge:compCount, badgeCls:"red" },
    { id:"settings",      icon:"⚙️", label:l.settings,       badge:null },
  ];

  const titles = {
    dashboard:     `📊 ${l.dashboard}`,
    orders:        `📦 ${l.orders}`,
    menu:          `🍽 ${l.menu}`,
    conversations: `💬 ${l.convTitle}`,
    complaints:    `🚨 ${l.complaintTitle}`,
    settings:      `⚙️ ${l.settings}`,
  };

  return (
    <div dir={dir} style={{height:"100vh"}}>
      <GlobalStyles/>
      {toast && <div className="toast">{toast}</div>}

      <div className="portal-wrap">
        {/* ── SIDEBAR ── */}
        <aside className="sidebar">
          <div className="sidebar-logo">
            <div className="sidebar-logo-mark">ب</div>
            <div>
              <div className="sidebar-logo-text">PolyDial</div>
              <span className="sidebar-logo-sub">{lang==="ar"?"لوحة المطاعم":"Restaurant Portal"}</span>
            </div>
          </div>

          <div className="sidebar-rest">
            <div className="sidebar-rest-label">{lang==="ar"?"مطعمك":"Your Restaurant"}</div>
            <div className="sidebar-rest-card">
              <div className="sidebar-rest-emoji">🍕</div>
              <div>
                <div className="sidebar-rest-name">{lang==="ar"?"بيتزا مصر":"Pizza Misr"}</div>
                <div className="sidebar-rest-status">
                  <div className="status-dot"/>
                  <span className="sidebar-rest-status-text">{l.open}</span>
                </div>
              </div>
            </div>
          </div>

          <nav className="sidebar-nav">
            <div className="nav-section-label">{lang==="ar"?"القائمة الرئيسية":"Main"}</div>
            {navItems.map(item => (
              <div key={item.id} className={`nav-item ${tab===item.id?"active":""}`} onClick={() => setTab(item.id)}>
                <span className="nav-icon">{item.icon}</span>
                <span>{item.label}</span>
                {item.badge > 0 && <span className={`nav-badge ${item.badgeCls||""}`}>{item.badge}</span>}
              </div>
            ))}
          </nav>

          <div className="sidebar-bottom">
            <div className="sidebar-user">
              <div className="sidebar-avatar">أح</div>
              <div>
                <div className="sidebar-user-name">{lang==="ar"?"أحمد المدير":"Ahmed (Admin)"}</div>
                <div className="sidebar-user-role">{lang==="ar"?"مدير المطعم":"Restaurant Manager"}</div>
              </div>
              <button className="sidebar-lang-btn" onClick={() => setLang(v => v==="ar"?"en":"ar")}>
                {lang==="ar"?"EN":"ع"}
              </button>
            </div>
          </div>
        </aside>

        {/* ── MAIN ── */}
        <main className="main">
          {/* Topbar */}
          <div className="topbar">
            <div className="topbar-title">{titles[tab]}</div>
            <div className="topbar-actions">
              {liveCount > 0 && (
                <div className="topbar-live">
                  <div className="topbar-live-dot"/>
                  {liveCount} {lang==="ar"?"طلبات نشطة":"live orders"}
                </div>
              )}
              {newCount > 0 && (
                <div style={{background:"var(--red-bg)",border:"1px solid rgba(176,48,48,.2)",borderRadius:20,padding:"5px 12px",fontSize:12,fontWeight:600,color:"var(--red)"}}>
                  🔔 {newCount} {lang==="ar"?"جديدة":"new"}
                </div>
              )}
              <div className="notif-wrap">
                <button className="btn-icon" title={lang==="ar"?"الإشعارات":"Notifications"}>🔔</button>
                {newCount > 0 && <div className="notif-dot"/>}
              </div>
              <button className="btn-icon" title={lang==="ar"?"طباعة":"Print"}>🖨</button>
            </div>
          </div>

          {/* Page content */}
          <div className="page-content">
            {tab === "dashboard"     && <DashboardView      lang={lang} orders={orders} setTab={setTab}/>}
            {tab === "orders"        && <OrdersView         lang={lang} orders={orders} setOrders={setOrders} showToast={showToast}/>}
            {tab === "menu"          && <MenuView           lang={lang} showToast={showToast}/>}
            {tab === "conversations" && <ConversationsView  lang={lang}/>}
            {tab === "complaints"    && <ComplaintsView     lang={lang} showToast={showToast}/>}
            {tab === "settings"      && <SettingsView       lang={lang} showToast={showToast}/>}

            {/* Footer */}
            <div style={{textAlign:"center",padding:"20px 0 4px",fontSize:11,color:"var(--light-muted)"}}>
              {l.poweredBy} · PolyDial v1.0
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
