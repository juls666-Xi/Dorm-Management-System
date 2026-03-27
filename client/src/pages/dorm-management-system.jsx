import { useState, useEffect, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0b0f1a;
    --surface: #131929;
    --surface2: #1a2236;
    --border: #1e2d47;
    --teal: #00d4aa;
    --teal-dim: rgba(0,212,170,0.12);
    --amber: #f5a623;
    --amber-dim: rgba(245,166,35,0.12);
    --rose: #ff5f7e;
    --rose-dim: rgba(255,95,126,0.12);
    --blue: #4d9fff;
    --blue-dim: rgba(77,159,255,0.12);
    --violet: #a78bfa;
    --violet-dim: rgba(167,139,250,0.12);
    --text: #e8edf5;
    --text-muted: #6b7fa3;
    --text-dim: #3d4f6e;
    --syne: 'Syne', sans-serif;
    --dm: 'DM Sans', sans-serif;
  }

  body { background: var(--bg); font-family: var(--dm); color: var(--text); overflow: hidden; }

  .app { display: flex; height: 100vh; width: 100vw; overflow: hidden; }

  /* SIDEBAR */
  .sidebar {
    width: 240px; min-width: 240px; background: var(--surface); border-right: 1px solid var(--border);
    display: flex; flex-direction: column; padding: 24px 0; position: relative; z-index: 10;
  }
  .sidebar-logo {
    padding: 0 20px 24px; border-bottom: 1px solid var(--border);
    font-family: var(--syne); font-weight: 800; font-size: 18px; letter-spacing: -0.5px;
    display: flex; align-items: center; gap: 10px;
  }
  .logo-icon {
    width: 32px; height: 32px; background: var(--teal); border-radius: 8px;
    display: flex; align-items: center; justify-content: center; font-size: 16px;
    flex-shrink: 0;
  }
  .logo-text { color: var(--text); }
  .logo-sub { font-size: 10px; font-weight: 400; color: var(--text-muted); font-family: var(--dm); letter-spacing: 0.5px; }

  .sidebar-nav { flex: 1; padding: 16px 12px; display: flex; flex-direction: column; gap: 2px; overflow-y: auto; }
  .nav-section { font-size: 10px; font-weight: 600; color: var(--text-dim); letter-spacing: 1.2px; text-transform: uppercase; padding: 12px 8px 6px; font-family: var(--syne); }

  .nav-btn {
    display: flex; align-items: center; gap: 10px; padding: 9px 12px; border-radius: 8px;
    border: none; background: none; color: var(--text-muted); cursor: pointer;
    font-family: var(--dm); font-size: 13.5px; font-weight: 500; text-align: left; width: 100%;
    transition: all 0.15s ease; position: relative;
  }
  .nav-btn:hover { background: var(--surface2); color: var(--text); }
  .nav-btn.active { background: var(--teal-dim); color: var(--teal); }
  .nav-btn.active .nav-icon { color: var(--teal); }
  .nav-icon { font-size: 16px; flex-shrink: 0; width: 20px; text-align: center; }
  .nav-badge {
    margin-left: auto; background: var(--rose); color: white; font-size: 10px;
    font-weight: 700; padding: 1px 6px; border-radius: 99px; line-height: 16px;
  }

  .sidebar-footer { padding: 16px 12px; border-top: 1px solid var(--border); }
  .user-card {
    display: flex; align-items: center; gap: 10px; padding: 8px 10px; border-radius: 8px;
    background: var(--surface2); cursor: pointer;
  }
  .user-avatar {
    width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, var(--teal), var(--blue));
    display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; color: #0b0f1a; flex-shrink: 0;
  }
  .user-name { font-size: 13px; font-weight: 600; color: var(--text); }
  .user-role { font-size: 11px; color: var(--text-muted); }

  /* MAIN */
  .main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
  .topbar {
    height: 60px; background: var(--surface); border-bottom: 1px solid var(--border);
    display: flex; align-items: center; padding: 0 28px; gap: 16px; flex-shrink: 0;
  }
  .topbar-title { font-family: var(--syne); font-weight: 700; font-size: 18px; flex: 1; }
  .topbar-search {
    display: flex; align-items: center; gap: 8px; background: var(--surface2); border: 1px solid var(--border);
    border-radius: 8px; padding: 6px 14px; min-width: 220px;
  }
  .topbar-search input {
    background: none; border: none; outline: none; font-family: var(--dm); font-size: 13px; color: var(--text);
    width: 160px;
  }
  .topbar-search input::placeholder { color: var(--text-dim); }
  .topbar-actions { display: flex; align-items: center; gap: 8px; }
  .icon-btn {
    width: 36px; height: 36px; border-radius: 8px; border: 1px solid var(--border);
    background: var(--surface2); color: var(--text-muted); cursor: pointer; font-size: 16px;
    display: flex; align-items: center; justify-content: center; transition: all 0.15s;
  }
  .icon-btn:hover { color: var(--teal); border-color: var(--teal); }

  .content { flex: 1; overflow-y: auto; padding: 28px; scrollbar-width: thin; scrollbar-color: var(--border) transparent; }

  /* CARDS */
  .stat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 28px; }
  .stat-card {
    background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 20px;
    position: relative; overflow: hidden; transition: transform 0.2s, border-color 0.2s;
  }
  .stat-card:hover { transform: translateY(-2px); border-color: var(--text-dim); }
  .stat-card::before {
    content: ''; position: absolute; top: 0; right: 0; width: 80px; height: 80px;
    border-radius: 50%; opacity: 0.07; transform: translate(20px, -20px);
  }
  .stat-card.teal::before { background: var(--teal); border: 1px solid var(--teal); }
  .stat-card.amber::before { background: var(--amber); }
  .stat-card.rose::before { background: var(--rose); }
  .stat-card.blue::before { background: var(--blue); }
  .stat-label { font-size: 11.5px; font-weight: 500; color: var(--text-muted); letter-spacing: 0.3px; margin-bottom: 10px; }
  .stat-val { font-family: var(--syne); font-size: 28px; font-weight: 800; letter-spacing: -1px; }
  .stat-card.teal .stat-val { color: var(--teal); }
  .stat-card.amber .stat-val { color: var(--amber); }
  .stat-card.rose .stat-val { color: var(--rose); }
  .stat-card.blue .stat-val { color: var(--blue); }
  .stat-sub { font-size: 12px; color: var(--text-muted); margin-top: 6px; }
  .stat-icon { position: absolute; top: 18px; right: 18px; font-size: 22px; opacity: 0.7; }

  /* SECTION */
  .section-title { font-family: var(--syne); font-weight: 700; font-size: 15px; color: var(--text); margin-bottom: 14px; }
  .card { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; overflow: hidden; }

  /* TABLE */
  .table-wrap { overflow-x: auto; }
  table { width: 100%; border-collapse: collapse; font-size: 13.5px; }
  th { padding: 12px 16px; text-align: left; font-size: 11px; font-weight: 600; letter-spacing: 0.8px; text-transform: uppercase; color: var(--text-dim); border-bottom: 1px solid var(--border); background: var(--surface2); font-family: var(--syne); }
  td { padding: 13px 16px; border-bottom: 1px solid var(--border); color: var(--text); vertical-align: middle; }
  tr:last-child td { border-bottom: none; }
  tr:hover td { background: var(--surface2); }

  /* BADGES */
  .badge {
    display: inline-flex; align-items: center; gap: 4px; padding: 3px 10px; border-radius: 99px;
    font-size: 11px; font-weight: 600; letter-spacing: 0.3px;
  }
  .badge.teal { background: var(--teal-dim); color: var(--teal); }
  .badge.amber { background: var(--amber-dim); color: var(--amber); }
  .badge.rose { background: var(--rose-dim); color: var(--rose); }
  .badge.blue { background: var(--blue-dim); color: var(--blue); }
  .badge.violet { background: var(--violet-dim); color: var(--violet); }
  .badge.gray { background: rgba(107,127,163,0.15); color: var(--text-muted); }

  /* BUTTONS */
  .btn {
    display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: 8px;
    font-family: var(--dm); font-size: 13px; font-weight: 600; cursor: pointer; border: none;
    transition: all 0.15s; text-decoration: none;
  }
  .btn-teal { background: var(--teal); color: #0b0f1a; }
  .btn-teal:hover { background: #00e6b8; }
  .btn-ghost { background: var(--surface2); color: var(--text); border: 1px solid var(--border); }
  .btn-ghost:hover { border-color: var(--teal); color: var(--teal); }
  .btn-rose { background: var(--rose-dim); color: var(--rose); border: 1px solid rgba(255,95,126,0.2); }
  .btn-sm { padding: 5px 12px; font-size: 12px; }

  /* GRID LAYOUTS */
  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; }
  .three-col { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .main-side { display: grid; grid-template-columns: 1fr 360px; gap: 16px; }

  /* ROOM GRID */
  .room-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 10px; padding: 16px; }
  .room-cell {
    border-radius: 10px; padding: 12px 8px; text-align: center; cursor: pointer;
    border: 2px solid transparent; transition: all 0.15s; font-size: 12px; font-weight: 600;
  }
  .room-cell:hover { transform: scale(1.04); }
  .room-cell.occupied { background: var(--teal-dim); border-color: rgba(0,212,170,0.3); color: var(--teal); }
  .room-cell.vacant { background: var(--surface2); border-color: var(--border); color: var(--text-muted); }
  .room-cell.maintenance { background: var(--amber-dim); border-color: rgba(245,166,35,0.3); color: var(--amber); }
  .room-cell.reserved { background: var(--violet-dim); border-color: rgba(167,139,250,0.3); color: var(--violet); }
  .room-num { font-family: var(--syne); font-size: 15px; font-weight: 800; display: block; margin-bottom: 4px; }
  .room-tag { font-size: 10px; opacity: 0.8; }

  /* LOG LIST */
  .log-item { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-bottom: 1px solid var(--border); }
  .log-item:last-child { border-bottom: none; }
  .log-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
  .log-dot.entry { background: var(--teal); }
  .log-dot.exit { background: var(--rose); }
  .log-dot.alert { background: var(--amber); box-shadow: 0 0 0 3px var(--amber-dim); }
  .log-name { font-size: 13.5px; font-weight: 600; color: var(--text); }
  .log-sub { font-size: 12px; color: var(--text-muted); }
  .log-time { font-size: 11.5px; color: var(--text-dim); margin-left: auto; font-family: var(--syne); }

  /* MAINTENANCE */
  .req-card {
    background: var(--surface2); border: 1px solid var(--border); border-radius: 12px; padding: 16px;
    margin-bottom: 10px; display: flex; align-items: flex-start; gap: 14px; transition: border-color 0.2s;
  }
  .req-card:hover { border-color: var(--text-dim); }
  .req-icon { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
  .req-title { font-size: 14px; font-weight: 600; color: var(--text); margin-bottom: 4px; }
  .req-sub { font-size: 12px; color: var(--text-muted); }
  .req-meta { margin-left: auto; text-align: right; flex-shrink: 0; }

  /* PROGRESS BAR */
  .progress-bar { height: 6px; background: var(--surface2); border-radius: 99px; overflow: hidden; margin-top: 8px; }
  .progress-fill { height: 100%; border-radius: 99px; transition: width 0.8s ease; }

  /* FORM ELEMENTS */
  .form-group { margin-bottom: 14px; }
  .form-label { font-size: 12px; font-weight: 600; color: var(--text-muted); margin-bottom: 6px; display: block; letter-spacing: 0.3px; }
  .form-input {
    width: 100%; background: var(--surface2); border: 1px solid var(--border); border-radius: 8px;
    padding: 9px 14px; font-family: var(--dm); font-size: 13.5px; color: var(--text); outline: none;
    transition: border-color 0.15s;
  }
  .form-input:focus { border-color: var(--teal); }
  select.form-input { cursor: pointer; }
  textarea.form-input { resize: vertical; min-height: 80px; }

  /* PAYMENT */
  .payment-card {
    background: linear-gradient(135deg, #1a2236 0%, #0f1a2e 100%); border: 1px solid var(--border);
    border-radius: 16px; padding: 24px; position: relative; overflow: hidden;
  }
  .payment-card::before {
    content: ''; position: absolute; top: -40px; right: -40px; width: 160px; height: 160px;
    background: radial-gradient(circle, rgba(0,212,170,0.15) 0%, transparent 70%); pointer-events: none;
  }
  .payment-amount { font-family: var(--syne); font-size: 36px; font-weight: 800; color: var(--teal); letter-spacing: -2px; }
  .payment-period { font-size: 13px; color: var(--text-muted); margin-top: 4px; }

  /* EVENTS */
  .event-card {
    background: var(--surface2); border: 1px solid var(--border); border-radius: 12px;
    padding: 16px; margin-bottom: 10px; display: flex; gap: 14px; align-items: flex-start;
    cursor: pointer; transition: all 0.15s;
  }
  .event-card:hover { border-color: var(--teal); transform: translateX(3px); }
  .event-date-box {
    background: var(--teal-dim); border: 1px solid rgba(0,212,170,0.2); border-radius: 10px;
    padding: 10px 14px; text-align: center; flex-shrink: 0; min-width: 56px;
  }
  .event-month { font-size: 10px; font-weight: 600; color: var(--teal); letter-spacing: 0.5px; text-transform: uppercase; }
  .event-day { font-family: var(--syne); font-size: 22px; font-weight: 800; color: var(--teal); line-height: 1.1; }

  /* INVENTORY */
  .inv-card {
    background: var(--surface2); border: 1px solid var(--border); border-radius: 12px; padding: 16px;
    transition: all 0.15s;
  }
  .inv-card:hover { border-color: var(--text-dim); }
  .inv-icon { font-size: 28px; margin-bottom: 10px; }
  .inv-name { font-size: 14px; font-weight: 600; color: var(--text); margin-bottom: 4px; }
  .inv-count { font-family: var(--syne); font-size: 24px; font-weight: 800; }
  .inv-status { font-size: 11.5px; color: var(--text-muted); margin-top: 4px; }

  /* ALERT BANNER */
  .alert-banner {
    background: var(--rose-dim); border: 1px solid rgba(255,95,126,0.3); border-radius: 10px;
    padding: 12px 16px; display: flex; align-items: center; gap: 12px; margin-bottom: 16px;
    font-size: 13px; color: var(--rose);
  }

  /* ANIMATIONS */
  @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
  .fade-in { animation: fadeIn 0.3s ease forwards; }
  @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
  .live-dot { width: 8px; height: 8px; background: var(--teal); border-radius: 50%; display: inline-block; animation: pulse 1.5s infinite; }

  /* SCROLLBAR */
  ::-webkit-scrollbar { width: 5px; height: 5px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 99px; }

  /* FLOOR PLAN LEGEND */
  .legend { display: flex; gap: 16px; padding: 12px 16px; border-top: 1px solid var(--border); flex-wrap: wrap; }
  .legend-item { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--text-muted); }
  .legend-dot { width: 10px; height: 10px; border-radius: 3px; }

  /* CHART BARS */
  .bar-chart { display: flex; align-items: flex-end; gap: 6px; height: 80px; padding: 0 16px 12px; }
  .bar { flex: 1; border-radius: 4px 4px 0 0; min-height: 4px; transition: height 0.5s ease; position: relative; }
  .bar:hover::after { content: attr(data-val); position: absolute; top: -22px; left: 50%; transform: translateX(-50%); font-size: 10px; color: var(--text); white-space: nowrap; }
  .bar-labels { display: flex; gap: 6px; padding: 0 16px 8px; }
  .bar-label { flex: 1; text-align: center; font-size: 10px; color: var(--text-dim); }

  /* MISC */
  .divider { height: 1px; background: var(--border); margin: 16px 0; }
  .flex-row { display: flex; align-items: center; gap: 10px; }
  .ml-auto { margin-left: auto; }
  .p16 { padding: 16px; }
  .p20 { padding: 20px; }
  .mb16 { margin-bottom: 16px; }
  .mb8 { margin-bottom: 8px; }
  .text-muted { color: var(--text-muted); font-size: 13px; }
  .fw600 { font-weight: 600; }
  .fs13 { font-size: 13px; }

  /* MODAL */
  .modal-overlay {
    position: fixed; inset: 0; background: rgba(11,15,26,0.8); z-index: 100;
    display: flex; align-items: center; justify-content: center; animation: fadeIn 0.2s ease;
  }
  .modal {
    background: var(--surface); border: 1px solid var(--border); border-radius: 16px;
    padding: 28px; width: 480px; max-width: 95vw; animation: fadeIn 0.25s ease;
  }
  .modal-title { font-family: var(--syne); font-size: 18px; font-weight: 700; margin-bottom: 20px; }
`;

// === DATA ===
const ROOMS = [
  ...Array.from({ length: 24 }, (_, i) => ({
    num: `${Math.floor(i / 8) + 1}0${(i % 8) + 1}`,
    status: i % 7 === 0 ? "maintenance" : i % 5 === 0 ? "vacant" : i % 11 === 0 ? "reserved" : "occupied",
    occupant: i % 5 !== 0 && i % 7 !== 0 && i % 11 !== 0 ? `Student ${i + 1}` : null,
  })),
];

const ENTRY_LOG = [
  { id: 1, name: "Maria Santos", room: "101", type: "entry", method: "QR Code", time: "8:42 AM", alert: false },
  { id: 2, name: "James Reyes", room: "205", type: "entry", method: "ID Card", time: "8:51 AM", alert: false },
  { id: 3, name: "⚠ Unknown", room: "—", type: "alert", method: "No Auth", time: "9:03 AM", alert: true },
  { id: 4, name: "Ana Cruz", room: "118", type: "exit", method: "QR Code", time: "9:15 AM", alert: false },
  { id: 5, name: "Carlos Delos Santos", room: "312", type: "entry", method: "Face ID", time: "9:22 AM", alert: false },
  { id: 6, name: "Louie Tan", room: "207", type: "exit", method: "ID Card", time: "9:38 AM", alert: false },
  { id: 7, name: "⚠ Tailgating", room: "Entry B", type: "alert", method: "Sensor", time: "9:45 AM", alert: true },
];

const MAINTENANCE_REQS = [
  { id: 1, icon: "🚿", title: "Broken shower head", room: "204", student: "Ana Cruz", priority: "High", status: "In Progress", submitted: "Mar 22", category: "Plumbing" },
  { id: 2, icon: "💡", title: "Flickering light in hallway", room: "Floor 2", student: "James Reyes", priority: "Medium", status: "Pending", submitted: "Mar 23", category: "Electrical" },
  { id: 3, icon: "🪑", title: "Broken desk chair", room: "118", student: "Maria Santos", priority: "Low", status: "Resolved", submitted: "Mar 20", category: "Furniture" },
  { id: 4, icon: "❄️", title: "AC not cooling", room: "311", student: "Louis Tan", priority: "High", status: "Pending", submitted: "Mar 24", category: "Electrical" },
  { id: 5, icon: "🚪", title: "Door lock malfunction", room: "107", student: "Carlos D.", priority: "High", status: "In Progress", submitted: "Mar 24", category: "Security" },
];

const PAYMENTS = [
  { id: "INV-2401", name: "Maria Santos", room: "101", amount: 8500, type: "Rent", due: "Apr 1", status: "Paid" },
  { id: "INV-2402", name: "James Reyes", room: "205", amount: 8500, type: "Rent", due: "Apr 1", status: "Pending" },
  { id: "INV-2403", name: "Ana Cruz", room: "118", amount: 1200, type: "Utilities", due: "Mar 31", status: "Overdue" },
  { id: "INV-2404", name: "Carlos D.", room: "312", amount: 500, type: "Penalty", due: "Mar 28", status: "Pending" },
  { id: "INV-2405", name: "Louie Tan", room: "207", amount: 8500, type: "Rent", due: "Apr 1", status: "Paid" },
];

const EVENTS = [
  { id: 1, title: "Dorm Orientation Night", date: "Mar 28", day: "28", month: "Mar", type: "Academic", time: "6:00 PM", venue: "Common Room A", rsvp: 42 },
  { id: 2, title: "Easter Egg Hunt 🥚", date: "Mar 30", day: "30", month: "Mar", type: "Social", time: "10:00 AM", venue: "Dorm Courtyard", rsvp: 18 },
  { id: 3, title: "Fire Drill & Safety Briefing", date: "Apr 2", day: "02", month: "Apr", type: "Emergency", time: "8:00 AM", venue: "Entire Building", rsvp: 0, mandatory: true },
  { id: 4, title: "Movie Night: Studio Ghibli Marathon", date: "Apr 5", day: "05", month: "Apr", type: "Social", time: "7:00 PM", venue: "Lounge B", rsvp: 31 },
];

const INVENTORY = [
  { id: 1, icon: "🧺", name: "Washers", total: 8, available: 3, status: "ok" },
  { id: 2, icon: "💨", name: "Dryers", total: 6, available: 1, status: "low" },
  { id: 3, icon: "🍳", name: "Stoves", total: 4, available: 4, status: "ok" },
  { id: 4, icon: "🧊", name: "Refrigerators", total: 3, available: 3, status: "ok" },
  { id: 5, icon: "🖥️", name: "Study Tables", total: 20, available: 7, status: "ok" },
  { id: 6, icon: "📺", name: "TV Sets", total: 4, available: 4, status: "ok" },
  { id: 7, icon: "🔌", name: "Extension Cords", total: 12, available: 2, status: "low" },
  { id: 8, icon: "🧹", name: "Vacuum Cleaners", total: 3, available: 0, status: "replace" },
];

const NAVS = [
  { id: "dashboard", label: "Dashboard", icon: "⊞", section: "OVERVIEW" },
  { id: "rooms", label: "Room Allocation", icon: "🏠", section: null, badge: null },
  { id: "entry", label: "Entry & Attendance", icon: "🔐", section: null, badge: "2" },
  { id: "maintenance", label: "Maintenance", icon: "🔧", section: "MODULES", badge: "4" },
  { id: "payments", label: "Fee & Payments", icon: "💳", section: null },
  { id: "events", label: "Events & Notices", icon: "📅", section: null },
  { id: "inventory", label: "Inventory", icon: "📦", section: null },
];

// === COMPONENTS ===

function StatusBadge({ status }) {
  const map = { Occupied: "teal", Vacant: "gray", Maintenance: "amber", Reserved: "violet",
    "In Progress": "blue", Pending: "amber", Resolved: "teal", Paid: "teal", Overdue: "rose",
    High: "rose", Medium: "amber", Low: "teal" };
  const cls = map[status] || "gray";
  return <span className={`badge ${cls}`}>{status}</span>;
}

function Dashboard() {
  const bars = [65, 80, 72, 90, 85, 78, 93];
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  return (
    <div className="fade-in">
      <div className="alert-banner">
        <span>⚠️</span>
        <span><strong>Security Alert:</strong> 2 unauthorized access attempts detected today — Entry Gate B & 3rd Floor corridor.</span>
        <button className="btn btn-rose btn-sm ml-auto">Review</button>
      </div>

      <div className="stat-grid">
        <div className="stat-card teal">
          <div className="stat-icon">🏠</div>
          <div className="stat-label">Occupancy Rate</div>
          <div className="stat-val">87%</div>
          <div className="stat-sub">↑ 3% from last month</div>
        </div>
        <div className="stat-card amber">
          <div className="stat-icon">🔧</div>
          <div className="stat-label">Pending Requests</div>
          <div className="stat-val">12</div>
          <div className="stat-sub">4 marked high priority</div>
        </div>
        <div className="stat-card rose">
          <div className="stat-icon">💳</div>
          <div className="stat-label">Overdue Payments</div>
          <div className="stat-val">₱18.4K</div>
          <div className="stat-sub">From 7 residents</div>
        </div>
        <div className="stat-card blue">
          <div className="stat-icon">👥</div>
          <div className="stat-label">Residents Today</div>
          <div className="stat-val">198</div>
          <div className="stat-sub"><span className="live-dot"></span> Live count</div>
        </div>
      </div>

      <div className="main-side">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="card">
            <div className="p16 flex-row" style={{ borderBottom: "1px solid var(--border)" }}>
              <span className="section-title" style={{ margin: 0 }}>Today's Entry Traffic</span>
              <span className="ml-auto text-muted fs13">Wed, Mar 25</span>
            </div>
            <div style={{ padding: "20px 16px 8px" }}>
              <div className="bar-chart">
                {bars.map((h, i) => (
                  <div key={i} className="bar" data-val={`${h} entries`}
                    style={{ height: `${h}%`, background: i === 6 ? "var(--teal)" : "var(--surface2)", border: "1px solid var(--border)" }} />
                ))}
              </div>
              <div className="bar-labels">{days.map((d, i) => <div key={i} className="bar-label">{d}</div>)}</div>
            </div>
            <div className="legend">
              <div className="legend-item"><div className="legend-dot" style={{ background: "var(--teal)" }} />Today</div>
              <div className="legend-item"><div className="legend-dot" style={{ background: "var(--surface2)", border: "1px solid var(--border)" }} />Previous days</div>
            </div>
          </div>

          <div className="card">
            <div className="p16" style={{ borderBottom: "1px solid var(--border)" }}>
              <span className="section-title" style={{ margin: 0 }}>Recent Maintenance Requests</span>
            </div>
            <div className="p16" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {MAINTENANCE_REQS.slice(0, 3).map(r => (
                <div key={r.id} className="req-card" style={{ margin: 0 }}>
                  <div className="req-icon" style={{ background: r.priority === "High" ? "var(--rose-dim)" : r.priority === "Medium" ? "var(--amber-dim)" : "var(--teal-dim)" }}>{r.icon}</div>
                  <div>
                    <div className="req-title">{r.title}</div>
                    <div className="req-sub">Room {r.room} · {r.category}</div>
                  </div>
                  <div className="req-meta ml-auto">
                    <StatusBadge status={r.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="card">
            <div className="p16" style={{ borderBottom: "1px solid var(--border)" }}>
              <span className="section-title" style={{ margin: 0 }}>Room Overview</span>
            </div>
            <div className="p16" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[{ label: "Occupied", val: 87, count: 174, color: "var(--teal)" }, { label: "Vacant", val: 8, count: 16, color: "var(--text-dim)" }, { label: "Maintenance", val: 3, count: 6, color: "var(--amber)" }, { label: "Reserved", val: 2, count: 4, color: "var(--violet)" }].map(r => (
                <div key={r.label}>
                  <div className="flex-row mb8">
                    <span className="fs13 fw600">{r.label}</span>
                    <span className="ml-auto text-muted">{r.count} rooms</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${r.val}%`, background: r.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="p16" style={{ borderBottom: "1px solid var(--border)" }}>
              <span className="section-title" style={{ margin: 0 }}>Upcoming Events</span>
            </div>
            <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
              {EVENTS.slice(0, 3).map(ev => (
                <div key={ev.id} className="flex-row" style={{ padding: "8px 0", borderBottom: "1px solid var(--border)" }}>
                  <div style={{ background: "var(--teal-dim)", borderRadius: 8, padding: "6px 10px", textAlign: "center", minWidth: 44 }}>
                    <div style={{ fontSize: 9, color: "var(--teal)", fontWeight: 700, textTransform: "uppercase" }}>{ev.month}</div>
                    <div style={{ fontFamily: "var(--syne)", fontSize: 18, fontWeight: 800, color: "var(--teal)", lineHeight: 1.1 }}>{ev.day}</div>
                  </div>
                  <div>
                    <div className="fs13 fw600">{ev.title}</div>
                    <div className="text-muted" style={{ fontSize: 11 }}>{ev.time} · {ev.venue}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Rooms() {
  const [filter, setFilter] = useState("all");
  const counts = { all: ROOMS.length, occupied: ROOMS.filter(r => r.status === "occupied").length, vacant: ROOMS.filter(r => r.status === "vacant").length, maintenance: ROOMS.filter(r => r.status === "maintenance").length };
  const filtered = filter === "all" ? ROOMS : ROOMS.filter(r => r.status === filter);
  return (
    <div className="fade-in">
      <div className="flex-row mb16">
        {["all", "occupied", "vacant", "maintenance", "reserved"].map(f => (
          <button key={f} className={`btn btn-sm ${filter === f ? "btn-teal" : "btn-ghost"}`} onClick={() => setFilter(f)} style={{ textTransform: "capitalize" }}>
            {f} {f === "all" ? `(${ROOMS.length})` : ""}
          </button>
        ))}
        <button className="btn btn-teal btn-sm ml-auto">+ Allocate Room</button>
      </div>

      <div className="two-col" style={{ marginBottom: 16 }}>
        <div className="card">
          <div className="p16" style={{ borderBottom: "1px solid var(--border)" }}>
            <span className="section-title" style={{ margin: 0 }}>Floor Plan — Building A</span>
          </div>
          <div className="room-grid">
            {filtered.map(r => (
              <div key={r.num} className={`room-cell ${r.status}`}>
                <span className="room-num">{r.num}</span>
                <span className="room-tag">{r.status === "occupied" ? "●" : r.status === "vacant" ? "○" : r.status === "maintenance" ? "⚙" : "◆"}</span>
              </div>
            ))}
          </div>
          <div className="legend">
            <div className="legend-item"><div className="legend-dot" style={{ background: "var(--teal-dim)", border: "1px solid var(--teal)" }} />Occupied</div>
            <div className="legend-item"><div className="legend-dot" style={{ background: "var(--surface2)", border: "1px solid var(--border)" }} />Vacant</div>
            <div className="legend-item"><div className="legend-dot" style={{ background: "var(--amber-dim)", border: "1px solid var(--amber)" }} />Maintenance</div>
            <div className="legend-item"><div className="legend-dot" style={{ background: "var(--violet-dim)", border: "1px solid var(--violet)" }} />Reserved</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="card">
            <div className="p16" style={{ borderBottom: "1px solid var(--border)" }}>
              <span className="section-title" style={{ margin: 0 }}>Roommate Match Request</span>
            </div>
            <div className="p16">
              <div className="form-group">
                <label className="form-label">Student ID</label>
                <input className="form-input" placeholder="Enter student ID" />
              </div>
              <div className="form-group">
                <label className="form-label">Gender Preference</label>
                <select className="form-input">
                  <option>Same gender</option>
                  <option>Co-ed</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Special Needs</label>
                <select className="form-input">
                  <option>None</option>
                  <option>Accessibility required</option>
                  <option>Ground floor preferred</option>
                  <option>Quiet room</option>
                </select>
              </div>
              <button className="btn btn-teal" style={{ width: "100%" }}>Find Match & Assign</button>
            </div>
          </div>

          <div className="card p16">
            <div className="section-title">Room Swap Request</div>
            <div className="form-group">
              <label className="form-label">From Room</label>
              <input className="form-input" placeholder="e.g. 204" />
            </div>
            <div className="form-group">
              <label className="form-label">To Room</label>
              <select className="form-input">
                <option>Select vacant room</option>
                {ROOMS.filter(r => r.status === "vacant").map(r => <option key={r.num}>{r.num}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Reason</label>
              <textarea className="form-input" placeholder="Reason for swap..." style={{ minHeight: 60 }} />
            </div>
            <button className="btn btn-ghost" style={{ width: "100%" }}>Submit Swap Request</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Entry() {
  return (
    <div className="fade-in">
      <div className="alert-banner">
        <span style={{ fontSize: 18 }}>🚨</span>
        <span><strong>2 Active Alerts:</strong> Unauthorized access attempts detected. Security notified.</span>
      </div>

      <div className="stat-grid" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
        <div className="stat-card teal"><div className="stat-icon">✅</div><div className="stat-label">Entries Today</div><div className="stat-val">93</div></div>
        <div className="stat-card rose"><div className="stat-icon">🚨</div><div className="stat-label">Security Alerts</div><div className="stat-val">2</div></div>
        <div className="stat-card blue"><div className="stat-icon">🏠</div><div className="stat-label">Currently In Dorm</div><div className="stat-val">174</div></div>
      </div>

      <div className="two-col">
        <div className="card">
          <div className="p16 flex-row" style={{ borderBottom: "1px solid var(--border)" }}>
            <span className="section-title" style={{ margin: 0 }}>Live Access Log</span>
            <span className="ml-auto flex-row" style={{ gap: 6 }}><span className="live-dot" /><span className="text-muted">Live</span></span>
          </div>
          <div>
            {ENTRY_LOG.map(log => (
              <div key={log.id} className="log-item">
                <div className={`log-dot ${log.type}`} />
                <div>
                  <div className="log-name">{log.name}</div>
                  <div className="log-sub">{log.alert ? "Security Event" : `Room ${log.room}`} · {log.method}</div>
                </div>
                <div style={{ marginLeft: "auto", textAlign: "right" }}>
                  {log.alert && <div className="badge rose" style={{ marginBottom: 4 }}>ALERT</div>}
                  <div className="log-time">{log.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="card p16">
            <div className="section-title">Authentication Methods</div>
            {[{ label: "QR Code Scan", pct: 48, color: "var(--teal)" }, { label: "ID Card Swipe", pct: 32, color: "var(--blue)" }, { label: "Facial Recognition", pct: 20, color: "var(--violet)" }].map(m => (
              <div key={m.label} style={{ marginBottom: 14 }}>
                <div className="flex-row mb8"><span className="fs13 fw600">{m.label}</span><span className="ml-auto text-muted">{m.pct}%</span></div>
                <div className="progress-bar"><div className="progress-fill" style={{ width: `${m.pct}%`, background: m.color }} /></div>
              </div>
            ))}
          </div>

          <div className="card p16">
            <div className="section-title">Manual Override</div>
            <div className="form-group">
              <label className="form-label">Student ID / Name</label>
              <input className="form-input" placeholder="Search resident..." />
            </div>
            <div className="form-group">
              <label className="form-label">Gate</label>
              <select className="form-input"><option>Main Entrance</option><option>Entry Gate A</option><option>Entry Gate B</option><option>Back Gate</option></select>
            </div>
            <div className="flex-row">
              <button className="btn btn-teal" style={{ flex: 1 }}>✅ Grant Entry</button>
              <button className="btn btn-rose" style={{ flex: 1 }}>❌ Deny</button>
            </div>
          </div>

          <div className="card p16">
            <div className="section-title">Curfew Settings</div>
            <div className="flex-row" style={{ marginBottom: 10 }}>
              <span className="fs13">Weekday Curfew</span>
              <span className="ml-auto badge teal">10:00 PM</span>
            </div>
            <div className="flex-row">
              <span className="fs13">Weekend Curfew</span>
              <span className="ml-auto badge amber">11:30 PM</span>
            </div>
            <button className="btn btn-ghost btn-sm" style={{ width: "100%", marginTop: 12 }}>Edit Schedule</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Maintenance() {
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const filtered = filter === "All" ? MAINTENANCE_REQS : MAINTENANCE_REQS.filter(r => r.status === filter);
  return (
    <div className="fade-in">
      <div className="flex-row mb16">
        {["All", "Pending", "In Progress", "Resolved"].map(f => (
          <button key={f} className={`btn btn-sm ${filter === f ? "btn-teal" : "btn-ghost"}`} onClick={() => setFilter(f)}>{f}</button>
        ))}
        <button className="btn btn-teal btn-sm ml-auto" onClick={() => setShowForm(true)}>+ New Request</button>
      </div>

      <div className="main-side">
        <div>
          {filtered.map(r => (
            <div key={r.id} className="req-card">
              <div className="req-icon" style={{ background: r.priority === "High" ? "var(--rose-dim)" : r.priority === "Medium" ? "var(--amber-dim)" : "var(--teal-dim)", fontSize: 22 }}>{r.icon}</div>
              <div style={{ flex: 1 }}>
                <div className="flex-row mb8">
                  <span className="req-title">{r.title}</span>
                  <StatusBadge status={r.priority} />
                </div>
                <div className="req-sub">Room {r.room} · Submitted by {r.student} · {r.submitted}</div>
                <div className="flex-row" style={{ marginTop: 10, gap: 8 }}>
                  <span className={`badge ${r.category === "Plumbing" ? "blue" : r.category === "Electrical" ? "amber" : r.category === "Furniture" ? "teal" : "rose"}`}>{r.category}</span>
                </div>
              </div>
              <div className="req-meta">
                <StatusBadge status={r.status} />
                <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 4 }}>
                  <button className="btn btn-ghost btn-sm">Update</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="card p16">
            <div className="section-title">Request Summary</div>
            {[{ label: "Total Requests", val: 12 }, { label: "High Priority", val: 4 }, { label: "In Progress", val: 3 }, { label: "Resolved This Month", val: 18 }].map(s => (
              <div key={s.label} className="flex-row" style={{ padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
                <span className="fs13 text-muted">{s.label}</span>
                <span className="ml-auto fw600" style={{ fontFamily: "var(--syne)" }}>{s.val}</span>
              </div>
            ))}
          </div>
          <div className="card p16">
            <div className="section-title">Assigned Staff</div>
            {[{ name: "Ramon Dela Cruz", role: "Plumber", status: "On-call" }, { name: "Ben Torres", role: "Electrician", status: "Active" }, { name: "Aling Nora", role: "Housekeeping", status: "Active" }].map(s => (
              <div key={s.name} className="flex-row" style={{ padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
                <div>
                  <div className="fs13 fw600">{s.name}</div>
                  <div className="text-muted" style={{ fontSize: 11 }}>{s.role}</div>
                </div>
                <span className={`ml-auto badge ${s.status === "Active" ? "teal" : "amber"}`}>{s.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-title">🔧 Submit Maintenance Request</div>
            <div className="form-group"><label className="form-label">Category</label><select className="form-input"><option>Plumbing</option><option>Electrical</option><option>Furniture</option><option>Security</option><option>Other</option></select></div>
            <div className="form-group"><label className="form-label">Room Number</label><input className="form-input" placeholder="e.g. 204" /></div>
            <div className="form-group"><label className="form-label">Issue Description</label><textarea className="form-input" placeholder="Describe the issue in detail..." /></div>
            <div className="form-group"><label className="form-label">Priority</label><select className="form-input"><option>Low</option><option>Medium</option><option>High</option></select></div>
            <div className="flex-row" style={{ gap: 10, marginTop: 8 }}>
              <button className="btn btn-teal" style={{ flex: 1 }}>Submit Request</button>
              <button className="btn btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Payments() {
  return (
    <div className="fade-in">
      <div className="stat-grid" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
        <div className="stat-card teal"><div className="stat-icon">✅</div><div className="stat-label">Collected This Month</div><div className="stat-val">₱1.24M</div><div className="stat-sub">From 146 residents</div></div>
        <div className="stat-card amber"><div className="stat-icon">⏳</div><div className="stat-label">Pending Payments</div><div className="stat-val">₱42K</div><div className="stat-sub">14 transactions</div></div>
        <div className="stat-card rose"><div className="stat-icon">🚨</div><div className="stat-label">Overdue</div><div className="stat-val">₱18.4K</div><div className="stat-sub">7 residents</div></div>
      </div>

      <div className="two-col">
        <div className="card">
          <div className="p16 flex-row" style={{ borderBottom: "1px solid var(--border)" }}>
            <span className="section-title" style={{ margin: 0 }}>Payment Ledger</span>
            <button className="btn btn-ghost btn-sm ml-auto">Export CSV</button>
          </div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Invoice</th><th>Resident</th><th>Amount</th><th>Type</th><th>Due Date</th><th>Status</th><th></th></tr></thead>
              <tbody>
                {PAYMENTS.map(p => (
                  <tr key={p.id}>
                    <td style={{ fontFamily: "var(--syne)", fontSize: 12, color: "var(--text-muted)" }}>{p.id}</td>
                    <td><div className="fw600">{p.name}</div><div className="text-muted" style={{ fontSize: 11 }}>Room {p.room}</div></td>
                    <td style={{ fontFamily: "var(--syne)", fontWeight: 700, color: p.status === "Overdue" ? "var(--rose)" : "var(--text)" }}>₱{p.amount.toLocaleString()}</td>
                    <td><span className="badge gray">{p.type}</span></td>
                    <td className="text-muted">{p.due}</td>
                    <td><StatusBadge status={p.status} /></td>
                    <td><button className="btn btn-ghost btn-sm">Receipt</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="payment-card">
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 8 }}>Monthly Rate</div>
            <div className="payment-amount">₱8,500</div>
            <div className="payment-period">Standard double room · March 2025</div>
            <div className="divider" />
            <div className="flex-row"><span className="text-muted">Utilities</span><span className="ml-auto fw600">₱1,200</span></div>
            <div className="flex-row" style={{ marginTop: 8 }}><span className="text-muted">Total Due</span><span className="ml-auto fw600" style={{ color: "var(--teal)", fontFamily: "var(--syne)", fontSize: 18 }}>₱9,700</span></div>
          </div>

          <div className="card p16">
            <div className="section-title">Process Payment</div>
            <div className="form-group"><label className="form-label">Resident / Invoice ID</label><input className="form-input" placeholder="Search..." /></div>
            <div className="form-group"><label className="form-label">Payment Method</label>
              <select className="form-input"><option>GCash</option><option>Maya</option><option>Bank Transfer</option><option>Cash</option><option>Credit Card</option></select>
            </div>
            <div className="form-group"><label className="form-label">Amount</label><input className="form-input" placeholder="₱0.00" /></div>
            <div className="form-group"><label className="form-label">Reference No.</label><input className="form-input" placeholder="Transaction reference..." /></div>
            <button className="btn btn-teal" style={{ width: "100%" }}>💳 Process & Generate Receipt</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Events() {
  const [rsvps, setRsvps] = useState({});
  const toggle = (id) => setRsvps(prev => ({ ...prev, [id]: !prev[id] }));
  return (
    <div className="fade-in">
      <div className="flex-row mb16">
        <div>
          <div style={{ fontFamily: "var(--syne)", fontSize: 13, fontWeight: 700, color: "var(--text-muted)" }}>UPCOMING DORM EVENTS</div>
        </div>
        <button className="btn btn-teal btn-sm ml-auto">+ Post Announcement</button>
      </div>

      <div className="two-col">
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {EVENTS.map(ev => (
            <div key={ev.id} className="event-card">
              <div className="event-date-box">
                <div className="event-month">{ev.month}</div>
                <div className="event-day">{ev.day}</div>
              </div>
              <div style={{ flex: 1 }}>
                <div className="flex-row mb8">
                  <span className="fw600" style={{ fontSize: 14 }}>{ev.title}</span>
                  {ev.mandatory && <span className="badge rose">MANDATORY</span>}
                </div>
                <div className="text-muted" style={{ fontSize: 12, marginBottom: 8 }}>⏰ {ev.time} · 📍 {ev.venue}</div>
                <div className="flex-row">
                  <span className={`badge ${ev.type === "Social" ? "blue" : ev.type === "Academic" ? "violet" : "rose"}`}>{ev.type}</span>
                  {!ev.mandatory && <span className="text-muted" style={{ fontSize: 11 }}>👥 {ev.rsvp + (rsvps[ev.id] ? 1 : 0)} going</span>}
                </div>
              </div>
              {!ev.mandatory && (
                <button className={`btn btn-sm ${rsvps[ev.id] ? "btn-teal" : "btn-ghost"}`} onClick={() => toggle(ev.id)}>
                  {rsvps[ev.id] ? "✓ RSVP'd" : "RSVP"}
                </button>
              )}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="card p16">
            <div className="section-title">📢 Post Announcement</div>
            <div className="form-group"><label className="form-label">Title</label><input className="form-input" placeholder="Announcement title..." /></div>
            <div className="form-group"><label className="form-label">Message</label><textarea className="form-input" placeholder="Write your message..." style={{ minHeight: 100 }} /></div>
            <div className="form-group"><label className="form-label">Priority</label>
              <select className="form-input"><option>Normal</option><option>Important</option><option>🚨 Emergency</option></select>
            </div>
            <div className="form-group"><label className="form-label">Recipients</label>
              <select className="form-input"><option>All Residents</option><option>Floor 1</option><option>Floor 2</option><option>Floor 3</option></select>
            </div>
            <button className="btn btn-teal" style={{ width: "100%" }}>📤 Send Announcement</button>
          </div>

          <div className="card p16">
            <div className="section-title">Recent Notices</div>
            {[{ icon: "🔔", title: "Water interruption on Mar 26, 8–10 AM", time: "Today" }, { icon: "📋", title: "Monthly room inspection on Apr 3", time: "Mar 23" }, { icon: "🏆", title: "Dorm cleanest room awards announced", time: "Mar 20" }].map((n, i) => (
              <div key={i} className="flex-row" style={{ padding: "10px 0", borderBottom: "1px solid var(--border)", alignItems: "flex-start" }}>
                <span style={{ fontSize: 18 }}>{n.icon}</span>
                <div>
                  <div className="fs13 fw600" style={{ lineHeight: 1.4 }}>{n.title}</div>
                  <div className="text-muted" style={{ fontSize: 11 }}>{n.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Inventory() {
  return (
    <div className="fade-in">
      <div className="flex-row mb16">
        <div className="alert-banner" style={{ flex: 1, margin: 0 }}>
          <span>⚠️</span>
          <span>3 items need attention: <strong>Dryers</strong> (low), <strong>Extension Cords</strong> (low), <strong>Vacuum Cleaners</strong> (needs replacement)</span>
        </div>
        <button className="btn btn-teal btn-sm" style={{ marginLeft: 12, flexShrink: 0 }}>+ Add Item</button>
      </div>

      <div className="three-col" style={{ marginBottom: 24 }}>
        {INVENTORY.map(item => (
          <div key={item.id} className="inv-card">
            <div className="inv-icon">{item.icon}</div>
            <div className="inv-name">{item.name}</div>
            <div className="inv-count" style={{ color: item.status === "replace" ? "var(--rose)" : item.status === "low" ? "var(--amber)" : "var(--teal)" }}>
              {item.available}<span style={{ fontSize: 14, fontWeight: 400, color: "var(--text-muted)", fontFamily: "var(--dm)" }}>/{item.total}</span>
            </div>
            <div className="progress-bar" style={{ marginTop: 10 }}>
              <div className="progress-fill" style={{ width: `${(item.available / item.total) * 100}%`, background: item.status === "replace" ? "var(--rose)" : item.status === "low" ? "var(--amber)" : "var(--teal)" }} />
            </div>
            <div className="inv-status">{item.available} available of {item.total} total</div>
            {item.status !== "ok" && (
              <span className={`badge ${item.status === "replace" ? "rose" : "amber"}`} style={{ marginTop: 10 }}>{item.status === "replace" ? "🔴 Replace" : "🟡 Low Stock"}</span>
            )}
          </div>
        ))}
      </div>

      <div className="two-col">
        <div className="card">
          <div className="p16" style={{ borderBottom: "1px solid var(--border)" }}>
            <span className="section-title" style={{ margin: 0 }}>Borrow / Return Log</span>
          </div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Item</th><th>Resident</th><th>Room</th><th>Borrowed</th><th>Status</th></tr></thead>
              <tbody>
                {[{ item: "🔌 Extension Cord", name: "Maria S.", room: "101", date: "Mar 24", status: "Out" }, { item: "🧺 Wash Basket", name: "James R.", room: "205", date: "Mar 25", status: "Out" }, { item: "📺 Portable TV", name: "Ana C.", room: "118", date: "Mar 23", status: "Returned" }, { item: "🔌 Extension Cord", name: "Carlos D.", room: "312", date: "Mar 22", status: "Returned" }].map((b, i) => (
                  <tr key={i}>
                    <td className="fw600">{b.item}</td>
                    <td>{b.name}</td>
                    <td className="text-muted">{b.room}</td>
                    <td className="text-muted">{b.date}</td>
                    <td><span className={`badge ${b.status === "Out" ? "amber" : "teal"}`}>{b.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card p16">
          <div className="section-title">Request Item / Report Issue</div>
          <div className="form-group"><label className="form-label">Item</label>
            <select className="form-input"><option>Select item...</option>{INVENTORY.map(i => <option key={i.id}>{i.icon} {i.name}</option>)}</select>
          </div>
          <div className="form-group"><label className="form-label">Action</label>
            <select className="form-input"><option>Borrow</option><option>Return</option><option>Report Damage</option><option>Request Replacement</option></select>
          </div>
          <div className="form-group"><label className="form-label">Notes</label>
            <textarea className="form-input" placeholder="Any additional notes..." style={{ minHeight: 70 }} />
          </div>
          <button className="btn btn-teal" style={{ width: "100%" }}>Submit Request</button>
        </div>
      </div>
    </div>
  );
}

const PAGE_COMPONENTS = { dashboard: Dashboard, rooms: Rooms, entry: Entry, maintenance: Maintenance, payments: Payments, events: Events, inventory: Inventory };
const PAGE_TITLES = { dashboard: "Overview Dashboard", rooms: "Room Allocation", entry: "Entry & Attendance", maintenance: "Maintenance Requests", payments: "Fee & Payments", events: "Events & Announcements", inventory: "Inventory Tracking" };

export default function App() {
  const [page, setPage] = useState("dashboard");
  const PageComponent = PAGE_COMPONENTS[page];
  let lastSection = null;

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <div className="sidebar">
          <div className="sidebar-logo">
            <div className="logo-icon">🏢</div>
            <div>
              <div className="logo-text">DormOS</div>
              <div className="logo-sub">Management Platform</div>
            </div>
          </div>

          <div className="sidebar-nav">
            {NAVS.map(nav => {
              const showSection = nav.section && nav.section !== lastSection;
              if (nav.section) lastSection = nav.section;
              return (
                <div key={nav.id}>
                  {showSection && <div className="nav-section">{nav.section}</div>}
                  <button className={`nav-btn ${page === nav.id ? "active" : ""}`} onClick={() => setPage(nav.id)}>
                    <span className="nav-icon">{nav.icon}</span>
                    {nav.label}
                    {nav.badge && <span className="nav-badge">{nav.badge}</span>}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="sidebar-footer">
            <div className="user-card">
              <div className="user-avatar">AA</div>
              <div>
                <div className="user-name">Admin Account</div>
                <div className="user-role">Dorm Manager</div>
              </div>
            </div>
          </div>
        </div>

        <div className="main">
          <div className="topbar">
            <div className="topbar-title">{PAGE_TITLES[page]}</div>
            <div className="topbar-search">
              <span style={{ color: "var(--text-dim)" }}>🔍</span>
              <input placeholder="Search residents, rooms..." />
            </div>
            <div className="topbar-actions">
              <button className="icon-btn" title="Notifications">🔔</button>
              <button className="icon-btn" title="Settings">⚙️</button>
            </div>
          </div>
          <div className="content">
            <PageComponent key={page} />
          </div>
        </div>
      </div>
    </>
  );
}
