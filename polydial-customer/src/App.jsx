import { useState, useEffect, useRef } from "react";

/* ══════════════════════════════════════════════
   GLOBAL STYLES
══════════════════════════════════════════════ */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;900&family=Amiri:wght@400;700&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --sand: #F7F1E3; --sand-dark: #EDE3CC;
      --amber: #C8780A; --amber-light: #F0A500; --amber-bg: #FDF5E0;
      --teal: #0D6B5E; --teal-light: #14907F; --teal-bg: #E4F2EF;
      --dark: #1C1206; --mid: #4A3720; --muted: #8C7658;
      --border: #DDD0B8; --white: #FFFDF6;
      --red: #B03030; --red-bg: #FCEAEA;
      --green: #1A7A4A; --green-bg: #E6F5EE;
      --shadow: 0 2px 16px rgba(28,18,6,0.08);
      --radius: 16px; --radius-sm: 10px;
      font-family: 'Cairo','Amiri',sans-serif;
    }
    body { background: var(--sand); color: var(--dark); }
    .app-wrap { max-width:420px; margin:0 auto; min-height:100vh; background:var(--white); display:flex; flex-direction:column; }

    .app-header { background:var(--teal); padding:14px 18px 10px; display:flex; align-items:center; justify-content:space-between; position:sticky; top:0; z-index:100; }
    .app-header::after { content:''; position:absolute; bottom:-8px; left:0; right:0; height:8px; background:linear-gradient(180deg,rgba(13,107,94,.15) 0%,transparent 100%); }
    .header-logo { display:flex; align-items:center; gap:8px; }
    .header-logo-mark { width:34px; height:34px; background:var(--amber-light); border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:900; color:var(--dark); }
    .header-logo-text { color:#fff; font-size:17px; font-weight:700; line-height:1.1; }
    .header-logo-sub { color:rgba(255,255,255,.6); font-size:10px; font-weight:400; display:block; }
    .header-rest-badge { display:flex; align-items:center; gap:6px; background:rgba(255,255,255,.12); border:1px solid rgba(255,255,255,.2); border-radius:20px; padding:4px 10px 4px 6px; }
    .header-rest-dot { width:6px; height:6px; border-radius:50%; background:#4ADE80; flex-shrink:0; }
    .header-rest-emoji { font-size:16px; }
    .header-rest-name { color:#fff; font-size:12px; font-weight:600; }
    .lang-toggle { background:rgba(255,255,255,.15); border:1px solid rgba(255,255,255,.25); color:#fff; font-family:'Cairo',sans-serif; font-size:12px; font-weight:700; padding:5px 12px; border-radius:20px; cursor:pointer; transition:background .2s; }
    .lang-toggle:hover { background:rgba(255,255,255,.25); }

    .screen { flex:1; overflow-y:auto; padding-bottom:80px; }
    .screen-pad { padding:20px 18px; }

    .bottom-nav { position:sticky; bottom:0; background:var(--white); border-top:1px solid var(--border); display:flex; z-index:99; box-shadow:0 -4px 20px rgba(28,18,6,.06); }
    .nav-btn { flex:1; display:flex; flex-direction:column; align-items:center; gap:3px; padding:10px 0 8px; background:none; border:none; cursor:pointer; color:var(--muted); font-family:'Cairo',sans-serif; font-size:10px; font-weight:500; transition:color .2s; position:relative; }
    .nav-btn.active { color:var(--teal); }
    .nav-btn.active::after { content:''; position:absolute; top:0; left:20%; right:20%; height:2px; background:var(--teal); border-radius:0 0 3px 3px; }
    .nav-icon { font-size:20px; line-height:1; }

    .auth-screen { min-height:100vh; background:linear-gradient(160deg,var(--teal) 0%,#0A4D44 55%,var(--dark) 100%); display:flex; flex-direction:column; align-items:center; justify-content:center; padding:40px 24px; position:relative; overflow:hidden; }
    .auth-ornament { position:absolute; width:280px; height:280px; border-radius:50%; border:1px solid rgba(255,255,255,.06); top:-80px; right:-80px; }
    .auth-ornament2 { position:absolute; width:200px; height:200px; border-radius:50%; border:1px solid rgba(240,165,0,.15); bottom:60px; left:-60px; }
    .auth-logo-wrap { margin-bottom:28px; text-align:center; }
    .auth-logo-icon { width:72px; height:72px; background:var(--amber-light); border-radius:22px; display:flex; align-items:center; justify-content:center; font-size:36px; font-weight:900; color:var(--dark); margin:0 auto 12px; box-shadow:0 8px 30px rgba(240,165,0,.4); }
    .auth-logo-name { font-size:28px; font-weight:900; color:#fff; }
    .auth-logo-tagline { font-size:13px; color:rgba(255,255,255,.6); margin-top:4px; }
    .auth-rest-brand { display:flex; align-items:center; gap:10px; background:rgba(255,255,255,.1); border:1px solid rgba(255,255,255,.2); border-radius:14px; padding:10px 16px; margin-bottom:18px; }
    .auth-rest-brand-emoji { font-size:28px; }
    .auth-rest-brand-name { color:#fff; font-size:15px; font-weight:700; }
    .auth-rest-brand-sub { color:rgba(255,255,255,.6); font-size:11px; }
    .auth-powered { text-align:center; margin-top:14px; font-size:11px; color:rgba(255,255,255,.4); }
    .auth-powered span { color:rgba(255,255,255,.7); font-weight:600; }
    .auth-card { background:var(--white); border-radius:24px; padding:28px 24px; width:100%; max-width:360px; box-shadow:0 20px 60px rgba(0,0,0,.25); }
    .auth-title { font-size:20px; font-weight:700; color:var(--dark); margin-bottom:4px; }
    .auth-subtitle { font-size:13px; color:var(--muted); margin-bottom:22px; }
    .input-group { margin-bottom:14px; }
    .input-label { font-size:12px; font-weight:600; color:var(--mid); margin-bottom:6px; display:block; }
    .input-field { width:100%; padding:12px 14px; border:1.5px solid var(--border); border-radius:var(--radius-sm); background:var(--sand); font-family:'Cairo',sans-serif; font-size:14px; color:var(--dark); outline:none; transition:border-color .2s,box-shadow .2s; }
    .input-field:focus { border-color:var(--teal); box-shadow:0 0 0 3px rgba(13,107,94,.1); }
    .input-field::placeholder { color:var(--muted); font-size:13px; }
    .btn-primary { width:100%; padding:14px; background:var(--teal); border:none; border-radius:var(--radius-sm); color:#fff; font-family:'Cairo',sans-serif; font-size:15px; font-weight:700; cursor:pointer; transition:all .2s; margin-top:4px; }
    .btn-primary:hover { background:var(--teal-light); transform:translateY(-1px); }
    .btn-primary:disabled { opacity:.5; cursor:not-allowed; transform:none; }
    .btn-outline { width:100%; padding:12px; background:transparent; border:1.5px solid var(--border); border-radius:var(--radius-sm); color:var(--mid); font-family:'Cairo',sans-serif; font-size:14px; font-weight:600; cursor:pointer; transition:all .2s; margin-top:8px; }
    .btn-outline:hover { border-color:var(--teal); color:var(--teal); }
    .otp-row { display:flex; gap:10px; justify-content:center; margin:20px 0; }
    .otp-box { width:52px; height:58px; border:1.5px solid var(--border); border-radius:12px; background:var(--sand); font-family:'Cairo',sans-serif; font-size:22px; font-weight:700; color:var(--dark); text-align:center; outline:none; transition:border-color .2s; }
    .otp-box:focus { border-color:var(--teal); box-shadow:0 0 0 3px rgba(13,107,94,.1); }
    .otp-resend { text-align:center; font-size:12px; color:var(--muted); margin-top:12px; }
    .otp-resend a { color:var(--amber); font-weight:600; cursor:pointer; }

    .key-screen { min-height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:40px 24px; background:linear-gradient(160deg,var(--teal) 0%,#0A4D44 55%,var(--dark) 100%); }
    .key-spinner { width:52px; height:52px; border:3px solid rgba(255,255,255,.2); border-top-color:var(--amber-light); border-radius:50%; animation:spin .8s linear infinite; margin-bottom:20px; }
    @keyframes spin { to { transform:rotate(360deg) } }
    .key-status-text { color:rgba(255,255,255,.8); font-size:14px; font-weight:500; }
    .key-error-icon { font-size:52px; margin-bottom:16px; }
    .key-error-title { color:#fff; font-size:20px; font-weight:700; margin-bottom:8px; text-align:center; }
    .key-error-sub { color:rgba(255,255,255,.6); font-size:13px; text-align:center; max-width:280px; line-height:1.6; }
    .key-error-code { margin-top:20px; background:rgba(0,0,0,.3); border-radius:10px; padding:10px 18px; font-size:11px; color:rgba(255,255,255,.4); font-family:monospace; }

    .rest-banner { background:linear-gradient(135deg,var(--teal) 0%,#0A4D44 100%); padding:18px; display:flex; align-items:center; gap:14px; position:relative; overflow:hidden; }
    .rest-banner::after { content:''; position:absolute; top:-30px; right:-30px; width:100px; height:100px; border-radius:50%; background:rgba(240,165,0,.12); }
    .rest-emoji-wrap { width:52px; height:52px; background:rgba(255,255,255,.15); border-radius:14px; display:flex; align-items:center; justify-content:center; font-size:26px; flex-shrink:0; }
    .rest-name { color:#fff; font-size:17px; font-weight:700; }
    .rest-meta { color:rgba(255,255,255,.7); font-size:12px; margin-top:2px; display:flex; gap:10px; }

    .mode-tabs { display:flex; margin:16px 16px 0; background:var(--sand-dark); border-radius:12px; padding:4px; }
    .mode-tab { flex:1; padding:9px; text-align:center; border-radius:9px; border:none; background:transparent; cursor:pointer; font-family:'Cairo',sans-serif; font-size:12px; font-weight:600; color:var(--muted); transition:all .2s; }
    .mode-tab.active { background:var(--white); color:var(--teal); box-shadow:var(--shadow); }

    .mic-section { text-align:center; padding:28px 20px 20px; background:var(--sand); }
    .mic-label { font-size:14px; color:var(--mid); margin-bottom:22px; font-weight:500; }
    .mic-btn-wrap { position:relative; display:inline-block; }
    .mic-pulse { position:absolute; inset:-14px; border-radius:50%; background:rgba(13,107,94,.12); animation:pulse 1.8s ease-out infinite; }
    .mic-pulse2 { position:absolute; inset:-28px; border-radius:50%; background:rgba(13,107,94,.06); animation:pulse 1.8s ease-out infinite .5s; }
    @keyframes pulse { 0%{transform:scale(.9);opacity:0} 50%{opacity:1} 100%{transform:scale(1.4);opacity:0} }
    .mic-btn { width:80px; height:80px; border-radius:50%; background:var(--teal); border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:32px; position:relative; z-index:1; box-shadow:0 6px 24px rgba(13,107,94,.4); transition:all .2s; }
    .mic-btn:hover { background:var(--teal-light); transform:scale(1.05); }
    .mic-btn.listening { background:var(--red); box-shadow:0 6px 24px rgba(176,48,48,.4); }
    .mic-hint { font-size:11px; color:var(--muted); margin-top:18px; }
    .waveform { display:flex; align-items:center; justify-content:center; gap:4px; height:40px; margin:12px 0; }
    .wave-bar { width:4px; background:var(--teal); border-radius:4px; animation:wave .8s ease-in-out infinite; }
    @keyframes wave { 0%,100%{height:8px} 50%{height:32px} }

    .chat-area { padding:14px 16px; display:flex; flex-direction:column; gap:10px; }
    .bubble-wrap { display:flex; align-items:flex-end; gap:8px; }
    .bubble-wrap.user { flex-direction:row-reverse; }
    .bubble-avatar { width:28px; height:28px; border-radius:50%; flex-shrink:0; display:flex; align-items:center; justify-content:center; font-size:14px; }
    .avatar-ai { background:var(--teal-bg); }
    .avatar-user { background:var(--amber-bg); }
    .bubble { max-width:78%; padding:10px 14px; border-radius:16px; font-size:13px; line-height:1.55; }
    .bubble-ai { background:var(--teal-bg); color:var(--dark); border-bottom-right-radius:4px; }
    .bubble-user { background:var(--teal); color:#fff; border-bottom-left-radius:4px; }
    .bubble-time { font-size:10px; opacity:.55; margin-top:3px; }
    [dir="rtl"] .bubble-ai { border-bottom-right-radius:16px; border-bottom-left-radius:4px; }
    [dir="rtl"] .bubble-user { border-bottom-left-radius:16px; border-bottom-right-radius:4px; }

    .cart-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:12px; }
    .cart-title { font-size:15px; font-weight:700; color:var(--dark); }
    .cart-count { background:var(--amber-bg); color:var(--amber); font-size:11px; font-weight:700; padding:2px 8px; border-radius:20px; }
    .cart-item { background:var(--white); border:1px solid var(--border); border-radius:var(--radius-sm); padding:12px 14px; margin-bottom:8px; display:flex; align-items:center; gap:12px; }
    .cart-item-emoji { font-size:26px; flex-shrink:0; }
    .cart-item-info { flex:1; }
    .cart-item-name { font-size:13px; font-weight:600; color:var(--dark); }
    .cart-item-mods { font-size:11px; color:var(--muted); margin-top:2px; }
    .qty-ctrl { display:flex; align-items:center; gap:8px; }
    .qty-btn { width:26px; height:26px; border-radius:50%; border:1.5px solid var(--border); background:var(--white); display:flex; align-items:center; justify-content:center; font-size:14px; cursor:pointer; font-weight:700; color:var(--mid); transition:all .15s; }
    .qty-btn:hover { border-color:var(--teal); color:var(--teal); }
    .qty-val { font-size:14px; font-weight:700; min-width:18px; text-align:center; }
    .divider { height:1px; background:var(--border); margin:12px 0; }
    .price-row { display:flex; justify-content:space-between; font-size:13px; color:var(--muted); margin-bottom:6px; }
    .price-row.total { color:var(--dark); font-size:16px; font-weight:700; margin-top:8px; }
    .pay-chips { display:flex; gap:8px; flex-wrap:wrap; margin-top:8px; }
    .pay-chip { padding:8px 14px; border-radius:20px; border:1.5px solid var(--border); font-family:'Cairo',sans-serif; font-size:12px; font-weight:600; cursor:pointer; transition:all .15s; display:flex; align-items:center; gap:5px; }
    .pay-chip.selected { border-color:var(--teal); background:var(--teal-bg); color:var(--teal); }
    .btn-confirm { width:100%; padding:15px; background:linear-gradient(135deg,var(--amber-light),var(--amber)); border:none; border-radius:var(--radius-sm); color:var(--dark); font-family:'Cairo',sans-serif; font-size:16px; font-weight:800; cursor:pointer; box-shadow:0 4px 16px rgba(200,120,10,.35); transition:all .2s; margin-top:14px; }
    .btn-confirm:hover { transform:translateY(-2px); }

    .confirmed-screen { padding:36px 24px; text-align:center; }
    .confirmed-icon { width:80px; height:80px; border-radius:50%; background:var(--green-bg); margin:0 auto 20px; display:flex; align-items:center; justify-content:center; font-size:38px; box-shadow:0 0 0 10px rgba(26,122,74,.08); }
    .confirmed-title { font-size:22px; font-weight:800; color:var(--dark); margin-bottom:6px; }
    .confirmed-sub { font-size:13px; color:var(--muted); margin-bottom:28px; }
    .order-id-badge { display:inline-flex; align-items:center; gap:8px; background:var(--amber-bg); border:1px solid var(--amber); border-radius:20px; padding:8px 18px; font-size:14px; font-weight:700; color:var(--amber); margin-bottom:20px; }
    .tracker { display:flex; align-items:center; justify-content:center; margin:0 0 28px; }
    .track-step { display:flex; flex-direction:column; align-items:center; gap:4px; }
    .track-dot { width:34px; height:34px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:16px; border:2px solid var(--border); background:var(--white); }
    .track-dot.done { background:var(--green-bg); border-color:var(--green); }
    .track-dot.active { background:var(--teal-bg); border-color:var(--teal); animation:trackPulse 1.5s infinite; }
    @keyframes trackPulse { 0%,100%{box-shadow:0 0 0 0 rgba(13,107,94,.3)} 50%{box-shadow:0 0 0 6px rgba(13,107,94,0)} }
    .track-label { font-size:10px; color:var(--muted); text-align:center; max-width:60px; }
    .track-line { width:32px; height:2px; background:var(--border); margin-bottom:20px; flex-shrink:0; }
    .track-line.done { background:var(--green); }

    .section-title { font-size:14px; font-weight:700; color:var(--mid); padding:14px 16px 8px; }
    .rest-card { margin:0 16px 12px; background:var(--white); border:1px solid var(--border); border-radius:var(--radius); overflow:hidden; box-shadow:var(--shadow); transition:transform .15s; cursor:pointer; }
    .rest-card:hover { transform:translateY(-2px); }
    .rest-card-header { height:90px; display:flex; align-items:center; justify-content:center; position:relative; }
    .rest-badge { position:absolute; top:8px; right:8px; background:rgba(0,0,0,.5); color:#fff; font-size:10px; font-weight:600; padding:3px 8px; border-radius:10px; }
    .rest-badge.open { background:rgba(26,122,74,.85); }
    .rest-card-body { padding:12px 14px; }
    .rest-card-name { font-size:15px; font-weight:700; color:var(--dark); }
    .rest-card-meta { display:flex; gap:12px; margin-top:6px; flex-wrap:wrap; }
    .rest-chip { font-size:11px; color:var(--muted); }

    .order-card { margin:0 16px 12px; background:var(--white); border:1px solid var(--border); border-radius:var(--radius); padding:14px; box-shadow:var(--shadow); }
    .order-card-top { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px; }
    .order-rest-name { font-size:14px; font-weight:700; color:var(--dark); }
    .order-id-small { font-size:11px; color:var(--muted); margin-top:2px; }
    .status-badge { font-size:11px; font-weight:600; padding:4px 10px; border-radius:20px; }
    .status-delivered { background:var(--green-bg); color:var(--green); }
    .status-preparing { background:var(--amber-bg); color:var(--amber); }
    .status-on-the-way { background:var(--teal-bg); color:var(--teal); }
    .status-cancelled { background:var(--red-bg); color:var(--red); }
    .order-items { font-size:12px; color:var(--muted); border-top:1px solid var(--border); padding-top:8px; margin-top:8px; }
    .order-footer { display:flex; justify-content:space-between; align-items:center; margin-top:10px; }
    .order-total { font-size:14px; font-weight:700; color:var(--teal); }
    .order-actions { display:flex; gap:6px; }
    .btn-sm { padding:6px 12px; border-radius:8px; font-family:'Cairo',sans-serif; font-size:11px; font-weight:600; cursor:pointer; transition:all .15s; }
    .btn-sm-teal { background:var(--teal-bg); color:var(--teal); border:1px solid rgba(13,107,94,.2); }
    .btn-sm-outline { background:transparent; color:var(--mid); border:1px solid var(--border); }
    .btn-sm-teal:hover { background:var(--teal); color:#fff; }

    .modal-overlay { position:fixed; inset:0; background:rgba(0,0,0,.5); z-index:200; display:flex; align-items:flex-end; justify-content:center; }
    .modal-sheet { background:var(--white); border-radius:24px 24px 0 0; width:100%; max-width:420px; max-height:80vh; overflow-y:auto; padding:20px 16px 40px; }
    .modal-handle { width:40px; height:4px; background:var(--border); border-radius:4px; margin:0 auto 18px; }
    .modal-title { font-size:16px; font-weight:700; margin-bottom:16px; color:var(--dark); }

    .complaint-types { display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:16px; }
    .complaint-type-btn { padding:12px 10px; border-radius:var(--radius-sm); border:1.5px solid var(--border); background:var(--white); cursor:pointer; text-align:center; font-family:'Cairo',sans-serif; font-size:12px; font-weight:600; color:var(--mid); transition:all .15s; }
    .complaint-type-btn.selected { border-color:var(--teal); background:var(--teal-bg); color:var(--teal); }
    .complaint-type-emoji { font-size:20px; display:block; margin-bottom:4px; }
    textarea { width:100%; padding:12px 14px; border:1.5px solid var(--border); border-radius:var(--radius-sm); background:var(--sand); font-family:'Cairo',sans-serif; font-size:13px; color:var(--dark); resize:vertical; outline:none; min-height:90px; }
    textarea:focus { border-color:var(--teal); }
    .complaint-item { background:var(--white); border:1px solid var(--border); border-radius:var(--radius-sm); padding:12px 14px; margin-bottom:8px; }
    .complaint-item-top { display:flex; justify-content:space-between; margin-bottom:4px; }
    .complaint-type-label { font-size:12px; font-weight:600; color:var(--mid); }
    .resolve-badge { font-size:10px; padding:3px 8px; border-radius:10px; font-weight:600; }
    .resolved { background:var(--green-bg); color:var(--green); }
    .pending-badge { background:var(--amber-bg); color:var(--amber); }
    .complaint-desc { font-size:12px; color:var(--muted); }

    .profile-hero { background:linear-gradient(135deg,var(--teal),#0A4D44); padding:28px 24px 32px; text-align:center; }
    .profile-avatar { width:72px; height:72px; border-radius:50%; background:var(--amber-light); margin:0 auto 12px; display:flex; align-items:center; justify-content:center; font-size:30px; border:3px solid rgba(255,255,255,.3); }
    .profile-name { font-size:20px; font-weight:700; color:#fff; }
    .profile-phone { font-size:13px; color:rgba(255,255,255,.65); margin-top:4px; }
    .profile-menu { padding:16px; }
    .profile-menu-item { display:flex; align-items:center; gap:14px; padding:14px 12px; border-radius:var(--radius-sm); cursor:pointer; transition:background .15s; }
    .profile-menu-item:hover { background:var(--sand); }
    .menu-icon { font-size:20px; width:32px; text-align:center; }
    .menu-label { flex:1; font-size:14px; font-weight:500; color:var(--dark); }
    .menu-arrow { font-size:12px; color:var(--muted); }
    .menu-divider { height:1px; background:var(--border); margin:4px 0; }

    .mode-info-pill { display:inline-flex; align-items:center; gap:6px; background:var(--teal-bg); border:1px solid rgba(13,107,94,.2); border-radius:20px; padding:5px 12px; font-size:11px; color:var(--teal); font-weight:600; }

    .empty-state { text-align:center; padding:48px 24px; }
    .empty-icon { font-size:52px; margin-bottom:14px; }
    .empty-title { font-size:16px; font-weight:700; color:var(--mid); margin-bottom:6px; }
    .empty-sub { font-size:13px; color:var(--muted); }

    .iframe-watermark { text-align:center; padding:10px; font-size:10px; color:var(--muted); border-top:1px solid var(--border); }
    .iframe-watermark a { color:var(--teal); font-weight:600; text-decoration:none; }

    .info-banner { margin:12px 16px 0; background:var(--teal-bg); border:1px solid rgba(13,107,94,.2); border-radius:var(--radius-sm); padding:10px 14px; font-size:12px; color:var(--teal); display:flex; align-items:center; gap:8px; }

    .toast { position:fixed; top:80px; left:50%; transform:translateX(-50%); background:var(--dark); color:#fff; padding:10px 20px; border-radius:20px; font-size:13px; font-weight:500; z-index:999; box-shadow:0 4px 20px rgba(0,0,0,.3); animation:toastIn .3s ease; white-space:nowrap; }
    @keyframes toastIn { from{opacity:0;transform:translateX(-50%) translateY(-10px)} to{opacity:1;transform:translateX(-50%) translateY(0)} }

    select { width:100%; padding:11px 14px; border:1.5px solid var(--border); border-radius:var(--radius-sm); background:var(--sand); font-family:'Cairo',sans-serif; font-size:13px; color:var(--dark); outline:none; cursor:pointer; }
    ::-webkit-scrollbar { width:4px; }
    ::-webkit-scrollbar-thumb { background:var(--border); border-radius:4px; }
  `}</style>
);

/* ══════════════════════════════════════════════
   MOCK RESTAURANT REGISTRY
   In production: stored in DB, validated server-side
   rk = restaurant key  (iframe embed on restaurant website)
   pk = PolyDial key    (direct PolyDial links / campaigns)
══════════════════════════════════════════════ */
const RESTAURANT_REGISTRY = {
  "rk_pizza_misr_a1b2c3":    { id:1, name:{ar:"بيتزا مصر",en:"Pizza Misr"},           emoji:"🍕", cuisine:{ar:"بيتزا · إيطالي",en:"Pizza · Italian"},    time:"30-45", rating:4.7, min:80,  open:true,  allowedOrigins:["pizzamisr.com","www.pizzamisr.com"] },
  "rk_shawarma_ahram_d4e5f6": { id:2, name:{ar:"شاورما الأهرام",en:"Shawarma Al-Ahram"},emoji:"🌯", cuisine:{ar:"شاورما · مشويات",en:"Shawarma · Grill"},  time:"20-30", rating:4.5, min:60,  open:true,  allowedOrigins:["ahramshawarma.com"] },
  "rk_nile_sushi_g7h8i9":    { id:3, name:{ar:"سوشي النيل",en:"Nile Sushi"},           emoji:"🍱", cuisine:{ar:"سوشي · ياباني",en:"Sushi · Japanese"},    time:"40-55", rating:4.8, min:120, open:false, allowedOrigins:["nilesushi.eg"] },
  "rk_koshari_aseel_j0k1l2": { id:4, name:{ar:"كشري الأصيل",en:"Koshari Al-Aseel"},   emoji:"🍜", cuisine:{ar:"كشري · مصري",en:"Koshari · Egyptian"},    time:"15-25", rating:4.9, min:30,  open:true,  allowedOrigins:["koshari-aseel.com"] },
};

const POLYDIAL_KEYS = new Set(["pk_polydial_web_main","pk_polydial_campaign_eid","pk_polydial_affiliate_001"]);
const RESTAURANTS_LIST = Object.values(RESTAURANT_REGISTRY);

const ALL_ORDERS = [
  { id:"PD-2847", restId:1, rest:{ar:"بيتزا مصر",en:"Pizza Misr"},            status:"delivered", items:[{ar:"بيتزا مارغريتا × 1",en:"Margherita × 1"},{ar:"بيبسي × 2",en:"Pepsi × 2"}],           total:175, date:"أمس",          emoji:"🍕" },
  { id:"PD-2801", restId:2, rest:{ar:"شاورما الأهرام",en:"Shawarma Al-Ahram"},status:"preparing",  items:[{ar:"شاورما دجاج × 2",en:"Chicken Shawarma × 2"}],                                        total:90,  date:"اليوم ١٢:٣٠", emoji:"🌯" },
  { id:"PD-2756", restId:4, rest:{ar:"كشري الأصيل",en:"Koshari Al-Aseel"},    status:"cancelled",  items:[{ar:"كشري كبير × 1",en:"Large Koshari × 1"}],                                              total:45,  date:"٣ مايو",       emoji:"🍜" },
  { id:"PD-2700", restId:1, rest:{ar:"بيتزا مصر",en:"Pizza Misr"},            status:"delivered",  items:[{ar:"بيتزا بيبروني × 2",en:"Pepperoni × 2"},{ar:"عصير مانجو",en:"Mango Juice"}],          total:230, date:"١ مايو",        emoji:"🍕" },
];

const CART_DEFAULTS = [
  { id:1, name:{ar:"بيتزا مارغريتا",en:"Margherita Pizza"}, mods:{ar:"وسط · جبنة إضافية",en:"Medium · Extra Cheese"}, price:95, emoji:"🍕", qty:1 },
  { id:2, name:{ar:"بيبسي",en:"Pepsi"}, mods:{ar:"٣٣٠ مل",en:"330ml"}, price:20, emoji:"🥤", qty:2 },
];

const AI_CHAT = [
  { role:"ai",   ar:"أهلاً! أنا بولي، مساعدك لطلب الأكل 🎉 إيه اللي تحب تطلبه النهارده؟", en:"Hey! I'm Poly, your ordering assistant 🎉 What would you like today?" },
  { role:"user", ar:"عايز بيتزا مارغريتا", en:"I want a margherita pizza" },
  { role:"ai",   ar:"تمام! حجم صغير ولا وسط ولا كبير؟", en:"Great! Small, medium, or large?" },
  { role:"user", ar:"وسط", en:"Medium" },
  { role:"ai",   ar:"ممتاز! تحب جبنة إضافية؟", en:"Perfect! Extra cheese?" },
  { role:"user", ar:"آه جبنة إضافية", en:"Yes, extra cheese" },
  { role:"ai",   ar:"👌 وسط مارغريتا + جبنة إضافية. تحب مشروب معاها؟", en:"👌 Medium margherita + extra cheese. Want a drink?" },
];

/* ══════════════════════════════════════════════
   TRANSLATIONS
══════════════════════════════════════════════ */
const T = {
  ar: {
    appName:"بولي دايل", tagline:"اطلب أكلك بصوتك",
    phone:"رقم الموبايل", phonePH:"+20 1XX XXX XXXX", sendOtp:"أرسل كود التحقق",
    otpTitle:"أدخل كود التحقق", otpSub:"تم إرسال كود لـ ", verifyOtp:"تحقق وكمّل",
    resendIn:"أعد الإرسال بعد ", sec:" ثانية",
    nameTitle:"أهلاً! إيه اسمك؟", nameLabel:"الاسم الكامل", namePH:"اكتب اسمك", nameSub:"سنستخدم اسمك في المحادثات",
    continue:"كمّل",
    tapMic:"اضغط وتكلم، بولي هيفهم طلبك", listening:"بسمعك...", stopListening:"اضغط للإيقاف",
    viewCart:"شوف الطلب", yourOrder:"طلبك", confirmOrder:"تأكيد الطلب",
    delivery:"توصيل", subtotal:"المجموع", total:"الإجمالي",
    cash:"كاش", card:"كارت", instapay:"إنستاباي",
    address:"عنوان التوصيل", addressPH:"اكتب عنوانك",
    payMethod:"طريقة الدفع", notes:"ملاحظات للمطعم", notesPH:"مثال: بدون بصل",
    orderConfirmed:"تم تأكيد طلبك! 🎉", orderSub:"جاري تحضير طلبك",
    orderId:"رقم الطلب", estTime:"وقت التوصيل المتوقع", trackOrder:"تتبع طلبك",
    singleMode:"مطعم محدد", discoverMode:"اكتشف مطاعم",
    nearYou:"مطاعم قريبة منك", open:"مفتوح", closed:"مغلق", mins:"دقيقة",
    orders:"طلباتي", ordersFromRest:"طلباتك هنا",
    noOrders:"مفيش طلبات لحد دلوقتي", startFirst:"إبدأ طلبك الأول",
    reorder:"أعد الطلب", viewConv:"شوف المحادثة", convTitle:"المحادثة مع بولي",
    historyFiltered:"بيعرض طلباتك من هذا المطعم فقط",
    complaints:"الشكاوى", yourComplaints:"شكاواك السابقة",
    complaintType:"نوع الشكوى", complaintDesc:"تفاصيل الشكوى",
    complaintPH:"اشرح المشكلة...", submitComplaint:"إرسل الشكوى",
    selectOrder:"اختار الطلب",
    profile:"حسابي", addresses:"عناوين التوصيل", payment:"وسائل الدفع",
    notifications:"الإشعارات", language:"اللغة", signOut:"تسجيل الخروج",
    home:"الرئيسية", history:"التاريخ",
    egp:"ج.م", step1:"تأكيد", step2:"تحضير", step3:"في الطريق", step4:"وصل",
    toastReorder:"تم إضافة الطلب للسلة ✓", toastComplaint:"تم إرسال الشكوى ✓",
    wrongOrder:"طلب غلط", lateDelivery:"تأخير التوصيل", foodQuality:"جودة الأكل",
    driverIssue:"مشكلة مع الديليفري", other:"أخرى",
    resolved:"تم الحل", pending:"قيد المراجعة", ETA:"٣٠-٤٥",
    validating:"جاري التحقق...",
    keyInvalid:"رابط غير صالح", keyInvalidSub:"الرابط ده مش صح أو انتهت صلاحيته. تواصل مع المطعم.",
    keyOriginMismatch:"وصول غير مصرح به", keyOriginMismatchSub:"الرابط ده مش مسموح يُستخدم من الموقع ده.",
    poweredBy:"بتشغيل", modeIframe:"وضع إطار المطعم", modePolydial:"وضع بولي دايل المباشر", modeDemo:"وضع المعاينة",
    items:"عناصر", back:"رجوع", newOrder:"طلب جديد",
  },
  en: {
    appName:"PolyDial", tagline:"Order food with your voice",
    phone:"Mobile number", phonePH:"+20 1XX XXX XXXX", sendOtp:"Send OTP",
    otpTitle:"Enter OTP", otpSub:"We sent a code to ", verifyOtp:"Verify & Continue",
    resendIn:"Resend in ", sec:"s",
    nameTitle:"Welcome! What's your name?", nameLabel:"Full Name", namePH:"Type your name", nameSub:"We'll use your name in conversations",
    continue:"Continue",
    tapMic:"Tap and speak, Poly will understand your order", listening:"Listening...", stopListening:"Tap to stop",
    viewCart:"View Order", yourOrder:"Your Order", confirmOrder:"Confirm Order",
    delivery:"Delivery", subtotal:"Subtotal", total:"Total",
    cash:"Cash", card:"Card", instapay:"InstaPay",
    address:"Delivery Address", addressPH:"Enter your address",
    payMethod:"Payment Method", notes:"Notes for restaurant", notesPH:"e.g. No onions",
    orderConfirmed:"Order Confirmed! 🎉", orderSub:"Your order is being prepared",
    orderId:"Order ID", estTime:"Estimated delivery time", trackOrder:"Track Your Order",
    singleMode:"Specific Restaurant", discoverMode:"Discover",
    nearYou:"Restaurants Near You", open:"Open", closed:"Closed", mins:"min",
    orders:"My Orders", ordersFromRest:"Your Orders Here",
    noOrders:"No orders yet", startFirst:"Place your first order",
    reorder:"Reorder", viewConv:"View Chat", convTitle:"Conversation with Poly",
    historyFiltered:"Showing orders from this restaurant only",
    complaints:"Complaints", yourComplaints:"Your Previous Complaints",
    complaintType:"Complaint Type", complaintDesc:"Complaint Details",
    complaintPH:"Describe the issue...", submitComplaint:"Submit Complaint",
    selectOrder:"Select Order",
    profile:"My Account", addresses:"Delivery Addresses", payment:"Payment Methods",
    notifications:"Notifications", language:"Language", signOut:"Sign Out",
    home:"Home", history:"History",
    egp:"EGP", step1:"Confirmed", step2:"Preparing", step3:"On Way", step4:"Arrived",
    toastReorder:"Order added to cart ✓", toastComplaint:"Complaint submitted ✓",
    wrongOrder:"Wrong Order", lateDelivery:"Late Delivery", foodQuality:"Food Quality",
    driverIssue:"Driver Issue", other:"Other",
    resolved:"Resolved", pending:"Pending", ETA:"30-45",
    validating:"Verifying restaurant...",
    keyInvalid:"Invalid Link", keyInvalidSub:"This link is invalid or has expired. Please contact the restaurant.",
    keyOriginMismatch:"Unauthorized Access", keyOriginMismatchSub:"This link is not authorized for use on this website.",
    poweredBy:"Powered by", modeIframe:"Restaurant iframe mode", modePolydial:"PolyDial direct mode", modeDemo:"Preview / demo mode",
    items:"items", back:"Back", newOrder:"New Order",
  },
};

/* ══════════════════════════════════════════════
   KEY RESOLUTION HOOK
   Reads ?rk= or ?pk= from URL, simulates backend validation
══════════════════════════════════════════════ */
function useAppKey() {
  const [keyState, setKeyState]   = useState("loading"); // loading | valid | invalid | origin_mismatch
  const [appMode, setAppMode]     = useState(null);       // "iframe" | "polydial" | "demo"
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const rk = params.get("rk");
    const pk = params.get("pk");

    // Simulates a 600ms async call to POST /api/validate-key
    const timer = setTimeout(() => {
      if (rk) {
        // ─ RESTAURANT IFRAME MODE ─
        const rec = RESTAURANT_REGISTRY[rk];
        if (!rec) { setKeyState("invalid"); return; }

        // Origin check — in production enforced server-side via Referer + CORS.
        // Client-side check here for demo; bypass on localhost/sandbox.
        const origin = window.location.hostname;
        const isSandbox = ["localhost","127.0.0.1",""].includes(origin) || origin.includes("claude.ai");
        if (!isSandbox && !rec.allowedOrigins.includes(origin)) {
          setKeyState("origin_mismatch"); return;
        }

        setRestaurant(rec);
        setAppMode("iframe");
        setKeyState("valid");

      } else if (pk) {
        // ─ POLYDIAL DIRECT MODE ─
        if (!POLYDIAL_KEYS.has(pk)) { setKeyState("invalid"); return; }
        setAppMode("polydial");
        setKeyState("valid");

      } else {
        // ─ NO KEY: DEMO / PREVIEW ─
        setAppMode("demo");
        setKeyState("valid");
      }
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  return { keyState, appMode, restaurant };
}

/* ══════════════════════════════════════════════
   DEMO KEY SWITCHER (shown in demo mode only)
══════════════════════════════════════════════ */
function DemoSwitcher({ lang }) {
  const keys = [
    { label: lang==="ar" ? "🧪 وضع المعاينة (بدون مفتاح)" : "🧪 Preview (no key)", url: "?" },
    { label: lang==="ar" ? "🍕 iframe: بيتزا مصر"           : "🍕 iframe: Pizza Misr",           url: "?rk=rk_pizza_misr_a1b2c3" },
    { label: lang==="ar" ? "🌯 iframe: شاورما الأهرام"       : "🌯 iframe: Shawarma Al-Ahram",    url: "?rk=rk_shawarma_ahram_d4e5f6" },
    { label: lang==="ar" ? "🍜 iframe: كشري الأصيل"          : "🍜 iframe: Koshari Al-Aseel",     url: "?rk=rk_koshari_aseel_j0k1l2" },
    { label: lang==="ar" ? "🌐 بولي دايل مباشر"              : "🌐 PolyDial direct",              url: "?pk=pk_polydial_web_main" },
    { label: lang==="ar" ? "🔒 مفتاح غير صالح"               : "🔒 Invalid key",                 url: "?rk=rk_INVALID_KEY" },
  ];
  return (
    <div style={{margin:"16px 16px 0",background:"#fffbe6",border:"1px dashed var(--amber)",borderRadius:"var(--radius-sm)",padding:"12px 14px"}}>
      <div style={{fontSize:11,fontWeight:700,color:"var(--amber)",marginBottom:8}}>
        {lang==="ar" ? "🧪 لوحة تجريبية — اختر مفتاح لتجربة الأوضاع المختلفة" : "🧪 Demo panel — pick a key to test different modes"}
      </div>
      <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
        {keys.map((k,i) => (
          <button key={i} onClick={() => window.location.href = k.url}
            style={{padding:"5px 10px",borderRadius:8,border:"1px solid var(--border)",background:"var(--white)",fontFamily:"'Cairo',sans-serif",fontSize:11,cursor:"pointer",color:"var(--mid)"}}>
            {k.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN APP
══════════════════════════════════════════════ */
export default function App() {
  const { keyState, appMode, restaurant } = useAppKey();

  const [lang, setLang]         = useState("ar");
  const [screen, setScreen]     = useState("phone");
  const [tab, setTab]           = useState("home");
  const [discoverMode, setDiscoverMode] = useState(false);
  const [voiceState, setVoiceState]     = useState("idle");
  const [showCart, setShowCart]         = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [cart, setCart]       = useState(CART_DEFAULTS.map(i => ({...i})));
  const [payment, setPayment] = useState("cash");
  const [phone, setPhone]     = useState("");
  const [otp, setOtp]         = useState(["","","",""]);
  const [name, setName]       = useState("");
  const [otpTimer, setOtpTimer] = useState(30);
  const [convModal, setConvModal]             = useState(null);
  const [selectedComplaintType, setSelectedComplaintType] = useState(null);
  const [complaintText, setComplaintText]     = useState("");
  const [toast, setToast]     = useState(null);
  const [selectedOrder, setSelectedOrder]     = useState("");
  const otpRefs = [useRef(), useRef(), useRef(), useRef()];

  const l   = T[lang];
  const dir = lang === "ar" ? "rtl" : "ltr";
  const isIframe = appMode === "iframe";

  // Scoped data
  const activeRest   = isIframe ? restaurant : RESTAURANT_REGISTRY["rk_pizza_misr_a1b2c3"];
  const visibleOrders = isIframe ? ALL_ORDERS.filter(o => o.restId === restaurant?.id) : ALL_ORDERS;

  useEffect(() => {
    if (screen === "otp" && otpTimer > 0) {
      const t = setTimeout(() => setOtpTimer(v => v-1), 1000);
      return () => clearTimeout(t);
    }
  }, [otpTimer, screen]);

  const showToast = msg => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const handleOtpChange = (i, val) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...otp]; next[i] = val.slice(-1); setOtp(next);
    if (val && i < 3) otpRefs[i+1].current?.focus();
  };
  const handleOtpKey = (i, e) => {
    if (e.key==="Backspace" && !otp[i] && i>0) otpRefs[i-1].current?.focus();
  };
  const qtyChange = (id, delta) =>
    setCart(prev => prev.map(i => i.id===id ? {...i, qty:Math.max(1,i.qty+delta)} : i));
  const cartTotal = cart.reduce((s,i) => s+i.price*i.qty, 0);

  const statusBadge = status => {
    const map = {
      delivered:    {cls:"status-delivered",   ar:"تم التوصيل", en:"Delivered" },
      preparing:    {cls:"status-preparing",   ar:"قيد التحضير",en:"Preparing" },
      "on-the-way": {cls:"status-on-the-way",  ar:"في الطريق",  en:"On the Way"},
      cancelled:    {cls:"status-cancelled",   ar:"ملغي",       en:"Cancelled" },
    };
    const s = map[status]||map.delivered;
    return <span className={`status-badge ${s.cls}`}>{lang==="ar"?s.ar:s.en}</span>;
  };

  /* ── KEY VALIDATION SCREENS ── */
  if (keyState === "loading") return (
    <div dir={dir}><GlobalStyles />
      <div className="key-screen">
        <div className="key-spinner" />
        <div className="key-status-text">{l.validating}</div>
      </div>
    </div>
  );

  if (keyState === "invalid") return (
    <div dir={dir}><GlobalStyles />
      <div className="key-screen">
        <div className="key-error-icon">🔒</div>
        <div className="key-error-title">{l.keyInvalid}</div>
        <div className="key-error-sub">{l.keyInvalidSub}</div>
        <div className="key-error-code">ERR_KEY_NOT_FOUND</div>
      </div>
    </div>
  );

  if (keyState === "origin_mismatch") return (
    <div dir={dir}><GlobalStyles />
      <div className="key-screen">
        <div className="key-error-icon">🚫</div>
        <div className="key-error-title">{l.keyOriginMismatch}</div>
        <div className="key-error-sub">{l.keyOriginMismatchSub}</div>
        <div className="key-error-code">ERR_ORIGIN_NOT_ALLOWED · {window.location.hostname}</div>
      </div>
    </div>
  );

  /* ── AUTH: PHONE ── */
  if (screen === "phone") return (
    <div dir={dir}><GlobalStyles />
      <div className="auth-screen">
        <div className="auth-ornament"/><div className="auth-ornament2"/>
        <div className="auth-logo-wrap">
          <div className="auth-logo-icon">ب</div>
          <div className="auth-logo-name">{l.appName}</div>
          <div className="auth-logo-tagline">{l.tagline}</div>
        </div>
        {isIframe && restaurant && (
          <div className="auth-rest-brand">
            <div className="auth-rest-brand-emoji">{restaurant.emoji}</div>
            <div>
              <div className="auth-rest-brand-name">{lang==="ar"?restaurant.name.ar:restaurant.name.en}</div>
              <div className="auth-rest-brand-sub">{lang==="ar"?restaurant.cuisine.ar:restaurant.cuisine.en}</div>
            </div>
          </div>
        )}
        <div className="auth-card">
          <div className="auth-title">{lang==="ar"?"مرحباً 👋":"Welcome 👋"}</div>
          <div className="auth-subtitle">{lang==="ar"?"أدخل رقم موبايلك عشان تبدأ":"Enter your mobile number to get started"}</div>
          <div className="input-group">
            <label className="input-label">{l.phone}</label>
            <input className="input-field" placeholder={l.phonePH} value={phone}
              onChange={e => setPhone(e.target.value)} type="tel" dir="ltr"/>
          </div>
          <button className="btn-primary" disabled={phone.length<10}
            onClick={() => {setScreen("otp"); setOtpTimer(30);}}>{l.sendOtp}</button>
          <button className="btn-outline" style={{fontSize:13}} onClick={() => setLang(v => v==="ar"?"en":"ar")}>
            {lang==="ar"?"Switch to English":"التحويل للعربية"}
          </button>
        </div>
        {isIframe && <div className="auth-powered">{l.poweredBy} <span>{l.appName}</span></div>}
      </div>
    </div>
  );

  /* ── AUTH: OTP ── */
  if (screen === "otp") return (
    <div dir={dir}><GlobalStyles />
      <div className="auth-screen">
        <div className="auth-ornament"/><div className="auth-ornament2"/>
        <div className="auth-logo-wrap">
          <div className="auth-logo-icon">ب</div>
          <div className="auth-logo-name">{l.appName}</div>
        </div>
        <div className="auth-card">
          <div style={{textAlign:"center",fontSize:32,marginBottom:8}}>📱</div>
          <div className="auth-title" style={{textAlign:"center"}}>{l.otpTitle}</div>
          <div className="auth-subtitle" style={{textAlign:"center"}}>{l.otpSub}<strong>{phone}</strong></div>
          <div className="otp-row" dir="ltr">
            {otp.map((v,i) => (
              <input key={i} ref={otpRefs[i]} className="otp-box" maxLength={1}
                value={v} onChange={e => handleOtpChange(i,e.target.value)}
                onKeyDown={e => handleOtpKey(i,e)} inputMode="numeric"/>
            ))}
          </div>
          <button className="btn-primary" disabled={otp.join("").length<4}
            onClick={() => setScreen("name")}>{l.verifyOtp}</button>
          <div className="otp-resend">
            {otpTimer>0
              ? <>{l.resendIn}<strong>{otpTimer}</strong>{l.sec}</>
              : <a onClick={() => setOtpTimer(30)}>{lang==="ar"?"أعد إرسال الكود":"Resend code"}</a>}
          </div>
          <button className="btn-outline" onClick={() => setScreen("phone")} style={{marginTop:10}}>
            {lang==="ar"?"تغيير الرقم":"Change number"}
          </button>
        </div>
      </div>
    </div>
  );

  /* ── AUTH: NAME ── */
  if (screen === "name") return (
    <div dir={dir}><GlobalStyles />
      <div className="auth-screen">
        <div className="auth-ornament"/><div className="auth-ornament2"/>
        <div className="auth-logo-wrap">
          <div className="auth-logo-icon">ب</div>
          <div className="auth-logo-name">{l.appName}</div>
        </div>
        <div className="auth-card">
          <div style={{textAlign:"center",fontSize:36,marginBottom:8}}>🙌</div>
          <div className="auth-title" style={{textAlign:"center"}}>{l.nameTitle}</div>
          <div className="auth-subtitle" style={{textAlign:"center"}}>{l.nameSub}</div>
          <div className="input-group">
            <label className="input-label">{l.nameLabel}</label>
            <input className="input-field" placeholder={l.namePH} value={name} onChange={e => setName(e.target.value)}/>
          </div>
          <button className="btn-primary" disabled={name.trim().length<2}
            onClick={() => setScreen("main")}>{l.continue} ✨</button>
        </div>
        {isIframe && <div className="auth-powered">{l.poweredBy} <span>{l.appName}</span></div>}
      </div>
    </div>
  );

  /* ══════════════════════════════════════════════
     MAIN APP SHELL
  ══════════════════════════════════════════════ */
  return (
    <div dir={dir}>
      <GlobalStyles/>
      {toast && <div className="toast">{toast}</div>}

      {/* Conversation Modal */}
      {convModal && (
        <div className="modal-overlay" onClick={() => setConvModal(null)}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()}>
            <div className="modal-handle"/>
            <div className="modal-title">{l.convTitle} — {convModal.id}</div>
            <div className="chat-area">
              {AI_CHAT.map((msg,i) => (
                <div key={i} className={`bubble-wrap ${msg.role==="user"?"user":""}`}>
                  <div className={`bubble-avatar ${msg.role==="ai"?"avatar-ai":"avatar-user"}`}>
                    {msg.role==="ai"?"🤖":"👤"}
                  </div>
                  <div className={`bubble ${msg.role==="ai"?"bubble-ai":"bubble-user"}`}>
                    {lang==="ar"?msg.ar:msg.en}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="app-wrap">

        {/* ── HEADER ── */}
        <header className="app-header" style={{position:"relative"}}>
          <div className="header-logo">
            <div className="header-logo-mark">ب</div>
            <div className="header-logo-text">
              {l.appName}
              <span className="header-logo-sub">
                {isIframe && restaurant
                  ? (lang==="ar"?restaurant.name.ar:restaurant.name.en)
                  : l.tagline}
              </span>
            </div>
          </div>
          {/* Live status badge — iframe only */}
          {isIframe && restaurant && (
            <div className="header-rest-badge">
              <div className="header-rest-dot" style={{background: restaurant.open?"#4ADE80":"#F87171"}}/>
              <span className="header-rest-emoji">{restaurant.emoji}</span>
              <span className="header-rest-name">{restaurant.open?l.open:l.closed}</span>
            </div>
          )}
          <button className="lang-toggle" onClick={() => setLang(v => v==="ar"?"en":"ar")}>
            {lang==="ar"?"EN":"ع"}
          </button>
        </header>

        {/* Demo mode: show key switcher */}
        {appMode === "demo" && tab === "home" && <DemoSwitcher lang={lang}/>}

        {/* ════════ HOME ════════ */}
        {tab === "home" && (
          <div className="screen">
            {/* Mode toggle — hidden in iframe mode */}
            {!isIframe && (
              <div className="mode-tabs">
                <button className={`mode-tab ${!discoverMode?"active":""}`} onClick={() => setDiscoverMode(false)}>
                  🍽 {l.singleMode}
                </button>
                <button className={`mode-tab ${discoverMode?"active":""}`} onClick={() => setDiscoverMode(true)}>
                  🔍 {l.discoverMode}
                </button>
              </div>
            )}

            {/* ─ ORDER FLOW ─ */}
            {(!discoverMode || isIframe) && !showCart && !orderConfirmed && (
              <>
                <div className="rest-banner">
                  <div className="rest-emoji-wrap">{activeRest?.emoji||"🍽"}</div>
                  <div>
                    <div className="rest-name">{lang==="ar"?activeRest?.name.ar:activeRest?.name.en}</div>
                    <div className="rest-meta">
                      <span>⭐ {activeRest?.rating}</span>
                      <span>🕐 {activeRest?.time} {l.mins}</span>
                    </div>
                  </div>
                </div>
                <div className="chat-area">
                  {AI_CHAT.map((msg,i) => (
                    <div key={i} className={`bubble-wrap ${msg.role==="user"?"user":""}`}>
                      <div className={`bubble-avatar ${msg.role==="ai"?"avatar-ai":"avatar-user"}`}>
                        {msg.role==="ai"?"🤖":"👤"}
                      </div>
                      <div className={`bubble ${msg.role==="ai"?"bubble-ai":"bubble-user"}`}>
                        {lang==="ar"?msg.ar:msg.en}
                        <div className="bubble-time">{msg.role==="ai"?"بولي":name||(lang==="ar"?"أنت":"You")}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mic-section">
                  {voiceState==="listening" ? (
                    <>
                      <div className="waveform">
                        {[...Array(9)].map((_,i) => <div key={i} className="wave-bar" style={{animationDelay:`${i*.1}s`}}/>)}
                      </div>
                      <p className="mic-label" style={{color:"var(--red)"}}>{l.listening}</p>
                    </>
                  ) : <p className="mic-label">{l.tapMic}</p>}
                  <div className="mic-btn-wrap">
                    {voiceState==="listening" && <><div className="mic-pulse"/><div className="mic-pulse2"/></>}
                    <button className={`mic-btn ${voiceState==="listening"?"listening":""}`}
                      onClick={() => setVoiceState(v => v==="idle"?"listening":"idle")}>
                      {voiceState==="listening"?"⏹":"🎙"}
                    </button>
                  </div>
                  <div className="mic-hint">{voiceState==="listening"?l.stopListening:""}</div>
                </div>
                {cart.length > 0 && (
                  <div style={{padding:"0 16px 16px"}}>
                    <button className="btn-confirm" onClick={() => setShowCart(true)}>
                      🛒 {l.viewCart} ({cart.reduce((s,i)=>s+i.qty,0)}) — {cartTotal} {l.egp}
                    </button>
                  </div>
                )}
              </>
            )}

            {/* ─ CART ─ */}
            {(!discoverMode || isIframe) && showCart && !orderConfirmed && (
              <div className="screen-pad">
                <button className="btn-outline" style={{width:"auto",padding:"8px 16px",marginBottom:16}}
                  onClick={() => setShowCart(false)}>← {l.back}</button>
                <div className="cart-header">
                  <span className="cart-title">{l.yourOrder}</span>
                  <span className="cart-count">{cart.reduce((s,i)=>s+i.qty,0)} {l.items}</span>
                </div>
                {cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-emoji">{item.emoji}</div>
                    <div className="cart-item-info">
                      <div className="cart-item-name">{lang==="ar"?item.name.ar:item.name.en}</div>
                      <div className="cart-item-mods">{lang==="ar"?item.mods.ar:item.mods.en}</div>
                    </div>
                    <div>
                      <div className="qty-ctrl">
                        <button className="qty-btn" onClick={() => qtyChange(item.id,-1)}>−</button>
                        <span className="qty-val">{item.qty}</span>
                        <button className="qty-btn" onClick={() => qtyChange(item.id,1)}>+</button>
                      </div>
                      <div style={{textAlign:"center",fontWeight:700,color:"var(--teal)",fontSize:13,marginTop:4}}>{item.price*item.qty}</div>
                    </div>
                  </div>
                ))}
                <div className="divider"/>
                <div className="price-row"><span>{l.subtotal}</span><span>{cartTotal} {l.egp}</span></div>
                <div className="price-row"><span>{l.delivery}</span><span>25 {l.egp}</span></div>
                <div className="price-row total"><span>{l.total}</span><span>{cartTotal+25} {l.egp}</span></div>
                <div className="divider"/>
                <div className="input-group">
                  <label className="input-label">{l.address}</label>
                  <input className="input-field" placeholder={l.addressPH}/>
                </div>
                <div className="input-group">
                  <label className="input-label">{l.payMethod}</label>
                  <div className="pay-chips">
                    {[["cash","💵",l.cash],["card","💳",l.card],["instapay","📱",l.instapay]].map(([key,icon,lbl]) => (
                      <button key={key} className={`pay-chip ${payment===key?"selected":""}`} onClick={() => setPayment(key)}>
                        {icon} {lbl}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="input-group">
                  <label className="input-label">{l.notes}</label>
                  <input className="input-field" placeholder={l.notesPH}/>
                </div>
                <button className="btn-confirm" onClick={() => setOrderConfirmed(true)}>
                  ✅ {l.confirmOrder} — {cartTotal+25} {l.egp}
                </button>
              </div>
            )}

            {/* ─ ORDER CONFIRMED ─ */}
            {(!discoverMode || isIframe) && orderConfirmed && (
              <div className="confirmed-screen">
                <div className="confirmed-icon">✅</div>
                <div className="confirmed-title">{l.orderConfirmed}</div>
                <div className="confirmed-sub">{l.orderSub}</div>
                <div className="order-id-badge">🧾 {l.orderId}: <strong>PD-2901</strong></div>
                <div style={{fontSize:13,color:"var(--muted)",marginBottom:20}}>
                  ⏱ {l.estTime}: <strong>{l.ETA} {l.mins}</strong>
                </div>
                <div className="tracker">
                  {[{icon:"✅",label:l.step1,done:true,active:false},{icon:"👨‍🍳",label:l.step2,done:false,active:true},{icon:"🛵",label:l.step3,done:false,active:false},{icon:"🏠",label:l.step4,done:false,active:false}].map((step,i) => (
                    <div key={i} style={{display:"flex",alignItems:"center"}}>
                      <div className="track-step">
                        <div className={`track-dot ${step.done?"done":step.active?"active":""}`}>{step.icon}</div>
                        <div className="track-label">{step.label}</div>
                      </div>
                      {i<3 && <div className={`track-line ${step.done?"done":""}`}/>}
                    </div>
                  ))}
                </div>
                <button className="btn-primary" onClick={() => {setOrderConfirmed(false);setShowCart(false);setTab("history");}}>
                  {l.trackOrder}
                </button>
                <button className="btn-outline" onClick={() => {setOrderConfirmed(false);setShowCart(false);}}>
                  {l.newOrder}
                </button>
              </div>
            )}

            {/* ─ DISCOVER MODE (PolyDial/demo only) ─ */}
            {discoverMode && !isIframe && (
              <>
                <div className="mic-section" style={{paddingTop:20,paddingBottom:20}}>
                  <p className="mic-label">{lang==="ar"?"قول إيه اللي تحب تاكله وهنقترح عليك مطاعم":"Tell us what you want to eat and we'll suggest restaurants"}</p>
                  <div className="mic-btn-wrap">
                    {voiceState==="listening"&&<><div className="mic-pulse"/><div className="mic-pulse2"/></>}
                    <button className={`mic-btn ${voiceState==="listening"?"listening":""}`}
                      onClick={() => setVoiceState(v => v==="idle"?"listening":"idle")}>
                      {voiceState==="listening"?"⏹":"🎙"}
                    </button>
                  </div>
                </div>
                <div className="section-title">📍 {l.nearYou}</div>
                {RESTAURANTS_LIST.map(r => (
                  <div key={r.id} className="rest-card" onClick={() => setDiscoverMode(false)}>
                    <div className="rest-card-header" style={{background:`linear-gradient(135deg,hsl(${r.id*50},50%,25%),hsl(${r.id*50+30},60%,18%))`}}>
                      <span style={{fontSize:44}}>{r.emoji}</span>
                      <span className={`rest-badge ${r.open?"open":""}`}>{r.open?l.open:l.closed}</span>
                    </div>
                    <div className="rest-card-body">
                      <div className="rest-card-name">{lang==="ar"?r.name.ar:r.name.en}</div>
                      <div className="rest-card-meta">
                        <span className="rest-chip">⭐ {r.rating}</span>
                        <span className="rest-chip">🕐 {r.time} {l.mins}</span>
                        <span className="rest-chip">🛒 {r.min} {l.egp}</span>
                      </div>
                      <div style={{fontSize:12,color:"var(--muted)",marginTop:4}}>{lang==="ar"?r.cuisine.ar:r.cuisine.en}</div>
                    </div>
                  </div>
                ))}
              </>
            )}

            {/* Iframe: "Powered by" watermark */}
            {isIframe && (
              <div className="iframe-watermark">
                {l.poweredBy} <a href="https://polydial.eg" target="_blank" rel="noreferrer">{l.appName}</a>
              </div>
            )}
          </div>
        )}

        {/* ════════ HISTORY ════════ */}
        {tab === "history" && (
          <div className="screen">
            <div className="section-title">📋 {isIframe?l.ordersFromRest:l.orders}</div>
            {/* Iframe: scoped notice */}
            {isIframe && (
              <div className="info-banner">
                <span>🔒</span> {l.historyFiltered}
              </div>
            )}
            {visibleOrders.length===0 ? (
              <div className="empty-state">
                <div className="empty-icon">🛍</div>
                <div className="empty-title">{l.noOrders}</div>
                <div className="empty-sub">{l.startFirst}</div>
              </div>
            ) : visibleOrders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-card-top">
                  <div>
                    <div className="order-rest-name">{order.emoji} {lang==="ar"?order.rest.ar:order.rest.en}</div>
                    <div className="order-id-small">#{order.id} · {order.date}</div>
                  </div>
                  {statusBadge(order.status)}
                </div>
                <div className="order-items">
                  {order.items.map((item,i) => <div key={i}>{lang==="ar"?item.ar:item.en}</div>)}
                </div>
                <div className="order-footer">
                  <div className="order-total">{order.total} {l.egp}</div>
                  <div className="order-actions">
                    <button className="btn-sm btn-sm-outline" onClick={() => setConvModal(order)}>💬 {l.viewConv}</button>
                    <button className="btn-sm btn-sm-teal" onClick={() => showToast(l.toastReorder)}>🔄 {l.reorder}</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ════════ COMPLAINTS ════════ */}
        {tab === "complaints" && (
          <div className="screen screen-pad">
            <div style={{fontSize:15,fontWeight:700,marginBottom:16}}>🚨 {l.complaints}</div>
            <div className="input-group">
              <label className="input-label">{l.selectOrder}</label>
              <select value={selectedOrder} onChange={e => setSelectedOrder(e.target.value)}>
                <option value="">{lang==="ar"?"اختار طلب...":"Choose an order..."}</option>
                {visibleOrders.map(o => (
                  <option key={o.id} value={o.id}>#{o.id} — {lang==="ar"?o.rest.ar:o.rest.en}</option>
                ))}
              </select>
            </div>
            <div className="input-group">
              <label className="input-label">{l.complaintType}</label>
              <div className="complaint-types">
                {[["wrong","❌",l.wrongOrder],["late","⏰",l.lateDelivery],["quality","🍽",l.foodQuality],["driver","🛵",l.driverIssue],["other","💬",l.other]].map(([key,icon,lbl]) => (
                  <button key={key} className={`complaint-type-btn ${selectedComplaintType===key?"selected":""}`}
                    onClick={() => setSelectedComplaintType(key)}>
                    <span className="complaint-type-emoji">{icon}</span>{lbl}
                  </button>
                ))}
              </div>
            </div>
            <div className="input-group">
              <label className="input-label">{l.complaintDesc}</label>
              <textarea placeholder={l.complaintPH} value={complaintText} onChange={e => setComplaintText(e.target.value)}/>
            </div>
            <button className="btn-primary"
              disabled={!selectedOrder||!selectedComplaintType||complaintText.length<5}
              onClick={() => {showToast(l.toastComplaint);setComplaintText("");setSelectedComplaintType(null);setSelectedOrder("");}}>
              {l.submitComplaint}
            </button>
            <div style={{marginTop:20}}>
              <div style={{fontSize:13,fontWeight:700,color:"var(--mid)",marginBottom:10}}>{l.yourComplaints}</div>
              {[
                {type:lang==="ar"?"تأخير التوصيل":"Late Delivery", desc:lang==="ar"?"وصل متأخر ساعة":"Arrived 1hr late", resolved:true,  ordId:"PD-2847"},
                {type:lang==="ar"?"طلب غلط":"Wrong Order",         desc:lang==="ar"?"بيتزا غلط":"Wrong pizza",          resolved:false, ordId:"PD-2700"},
              ].filter(c => !isIframe||visibleOrders.some(o=>o.id===c.ordId)).map((c,i) => (
                <div key={i} className="complaint-item">
                  <div className="complaint-item-top">
                    <span className="complaint-type-label">{c.type} · #{c.ordId}</span>
                    <span className={`resolve-badge ${c.resolved?"resolved":"pending-badge"}`}>
                      {c.resolved?l.resolved:l.pending}
                    </span>
                  </div>
                  <div className="complaint-desc">{c.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════════ PROFILE ════════ */}
        {tab === "profile" && (
          <div className="screen">
            <div className="profile-hero">
              <div className="profile-avatar">👤</div>
              <div className="profile-name">{name||(lang==="ar"?"مستخدم بولي":"PolyDial User")}</div>
              <div className="profile-phone">{phone||"+20 100 000 0000"}</div>
            </div>
            <div className="profile-menu">
              {[["📍",l.addresses],["💳",l.payment],["🔔",l.notifications]].map(([icon,lbl]) => (
                <div key={lbl} className="profile-menu-item">
                  <span className="menu-icon">{icon}</span>
                  <span className="menu-label">{lbl}</span>
                  <span className="menu-arrow">{lang==="ar"?"‹":"›"}</span>
                </div>
              ))}
              <div className="menu-divider"/>
              <div className="profile-menu-item" onClick={() => setLang(v => v==="ar"?"en":"ar")}>
                <span className="menu-icon">🌐</span>
                <span className="menu-label">{l.language}</span>
                <span style={{fontSize:12,color:"var(--teal)",fontWeight:700}}>{lang==="ar"?"العربية":"English"}</span>
              </div>
              <div className="menu-divider"/>
              {/* Mode indicator */}
              <div style={{padding:"10px 12px",display:"flex",alignItems:"center",gap:10}}>
                <div className="mode-info-pill">
                  {isIframe ? "🔗" : appMode==="polydial" ? "🌐" : "🧪"}
                  &nbsp;
                  {isIframe ? `${l.modeIframe} · ${lang==="ar"?restaurant?.name.ar:restaurant?.name.en}`
                    : appMode==="polydial" ? l.modePolydial
                    : l.modeDemo}
                </div>
              </div>
              <div className="menu-divider"/>
              <div className="profile-menu-item" onClick={() => setScreen("phone")} style={{color:"var(--red)"}}>
                <span className="menu-icon">🚪</span>
                <span className="menu-label" style={{color:"var(--red)"}}>{l.signOut}</span>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Nav */}
        <nav className="bottom-nav">
          {[["home","🏠",l.home],["history","📋",l.history],["complaints","🚨",l.complaints],["profile","👤",l.profile]].map(([id,icon,lbl]) => (
            <button key={id} className={`nav-btn ${tab===id?"active":""}`} onClick={() => setTab(id)}>
              <span className="nav-icon">{icon}</span>
              <span>{lbl}</span>
            </button>
          ))}
        </nav>

      </div>
    </div>
  );
}
