import React, { useState } from "react";
import {
  ClipboardList,
  Camera,
  History,
  Database,
  FileText,
  Wifi,
  WifiOff,
  Factory,
  CheckCircle2,
  XCircle,
  Settings,
  LayoutDashboard,
  ChevronRight,
  Clock,
  Image as ImageIcon,
  AlertTriangle,
} from "lucide-react";

// ---- Design tokens ----
// bg-charcoal   #17191B
// panel-steel   #24282B
// panel-raised  #2E3336
// safety-orange #FF6A13
// text-primary  #ECE9E3
// text-secondary#8B939A
// pass-green    #3FAE6B
// fail-red      #E5484D

function LogoMark({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 160 160">
      <defs>
        <clipPath id="lm-clip-dash">
          <path d="M80 8 L138 30 L138 75 C138 107 114 130 80 145 C46 130 22 107 22 75 L22 30 Z" />
        </clipPath>
      </defs>
      <path
        d="M80 8 L138 30 L138 75 C138 107 114 130 80 145 C46 130 22 107 22 75 L22 30 Z"
        fill="#1D2022"
        stroke="#3A4045"
        strokeWidth="3.5"
      />
      <g clipPath="url(#lm-clip-dash)">
        <rect x="-20" y="95" width="200" height="10" fill="#FF6A13" transform="rotate(-28 80 100)" opacity="0.9" />
      </g>
      <g stroke="#FF6A13" strokeWidth="2.6" fill="none">
        <circle cx="80" cy="66" r="19" />
        <line x1="80" y1="41" x2="80" y2="50" />
        <line x1="80" y1="82" x2="80" y2="91" />
        <line x1="55" y1="66" x2="64" y2="66" />
        <line x1="96" y1="66" x2="105" y2="66" />
      </g>
      <circle cx="80" cy="66" r="4.4" fill="#FF6A13" />
      <g transform="translate(80,107)">
        <circle r="14" fill="#FF6A13" />
        <path d="M-6.5 0 L-2 5 L7.5 -6.5" stroke="#1A1C1D" strokeWidth="3.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

const HAZARD_STRIPE = {
  backgroundImage:
    "repeating-linear-gradient(135deg, #FF6A13 0px, #FF6A13 10px, #1A1C1D 10px, #1A1C1D 20px)",
};

function GaugeRing({ value, size = 92, sub }) {
  const stroke = 9;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  const color = value >= 85 ? "#3FAE6B" : value >= 60 ? "#FF6A13" : "#E5484D";
  return (
    <div className="relative flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="#3A4045" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-mono text-xl font-bold text-[#ECE9E3] leading-none">{value}%</span>
        <span className="text-[9.5px] uppercase tracking-wider text-[#8B939A] mt-1">{sub}</span>
      </div>
    </div>
  );
}

function SectionLabel({ children, right }) {
  return (
    <div className="flex items-center justify-between mb-2 px-0.5">
      <div className="flex items-center gap-2">
        <span className="w-1 h-3.5 bg-[#FF6A13]" />
        <h2 className="text-[11.5px] font-bold uppercase tracking-[0.14em] text-[#8B939A]">
          {children}
        </h2>
      </div>
      {right}
    </div>
  );
}

// A single full-width tappable row — used for both nav-style entries
// (Asset Database, Reports) and list items (Previous Inspections,
// Recent Activity). One consistent shape instead of several card styles.
function NavRow({ icon: Icon, iconColor = "#FF6A13", title, sub, trailing }) {
  return (
    <button className="w-full flex items-center gap-3 px-3.5 py-3.5 border-b border-[#3A4045] last:border-0 active:bg-[#2E3336]">
      <div className="w-10 h-10 flex items-center justify-center bg-[#1D2022] border border-[#3A4045] shrink-0">
        <Icon size={16} style={{ color: iconColor }} />
      </div>
      <div className="flex-1 min-w-0 text-left">
        <p className="text-[13px] font-bold leading-tight">{title}</p>
        {sub && <p className="text-[10.5px] text-[#8B939A] mt-0.5 leading-snug">{sub}</p>}
      </div>
      {trailing || <ChevronRight size={16} className="text-[#8B939A] shrink-0" />}
    </button>
  );
}

const inspections = [
  { id: "INS-2291", date: "Jul 18", client: "Rio Ferrum Ops", asset: "Tank T-204", status: "pass" },
  { id: "INS-2288", date: "Jul 17", client: "Karratha Iron", asset: "Pipeline PL-11", status: "fail" },
];

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Inspections", icon: ClipboardList },
  { name: "Assets", icon: Factory },
  { name: "Reports", icon: FileText },
  { name: "Settings", icon: Settings },
];

function StatusPill({ status }) {
  const pass = status === "pass";
  return (
    <div
      className={`flex items-center gap-1 px-2 py-1 text-[10px] font-bold uppercase tracking-wider shrink-0 ${
        pass ? "bg-[#3FAE6B]/15 text-[#3FAE6B]" : "bg-[#E5484D]/15 text-[#E5484D]"
      }`}
    >
      {pass ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
      {status}
    </div>
  );
}

export default function ShieldInspectDashboard() {
  const [active, setActive] = useState("Dashboard");
  const [synced, setSynced] = useState(true);
  const failedCount = 3;

  return (
    <div className="min-h-screen w-full flex items-start justify-center bg-[#0E1011] py-6 px-3">
      <div className="w-full max-w-[420px] bg-[#17191B] text-[#ECE9E3] font-sans rounded-[28px] overflow-hidden border border-[#2E3336] shadow-2xl relative">
        <div className="h-1.5 w-full bg-[#0E1011]" />

        {/* ---------------- HEADER ---------------- */}
        <header className="relative bg-[#1D2022] border-b border-[#2E3336] px-4 pt-4 pb-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <LogoMark size={32} />
              <div className="min-w-0">
                <p className="text-[13px] font-extrabold uppercase tracking-[0.12em] leading-none truncate">
                  Shield Inspect <span className="text-[#FF6A13]">AI</span>
                </p>
                <p className="text-[10.5px] text-[#8B939A] mt-1 uppercase tracking-wide truncate">
                  Antz &middot; NACE Level 2
                </p>
              </div>
            </div>
            <button
              onClick={() => setSynced((s) => !s)}
              className="flex items-center gap-1.5 bg-[#24282B] border border-[#3A4045] px-2.5 py-2 shrink-0"
            >
              {synced ? (
                <Wifi size={13} className="text-[#3FAE6B]" />
              ) : (
                <WifiOff size={13} className="text-[#E5484D]" />
              )}
              <span className="text-[9.5px] uppercase tracking-wider text-[#8B939A]">
                {synced ? "Synced" : "Offline"}
              </span>
            </button>
          </div>

          <button className="w-full mt-3 flex items-center justify-between bg-[#24282B] border border-[#3A4045] px-3 py-2.5">
            <div className="flex items-center gap-2 min-w-0">
              <Factory size={13} className="text-[#FF6A13] shrink-0" />
              <span className="text-[12px] font-semibold tracking-wide truncate">Tom Price Processing Site</span>
            </div>
            <ChevronRight size={14} className="text-[#8B939A] shrink-0" />
          </button>
        </header>

        {/* ---------------- MAIN CONTENT ---------------- */}
        <main className="px-4 py-4 space-y-5 bg-[#17191B]">

          {/* NEW INSPECTION - primary CTA */}
          <button className="w-full relative overflow-hidden active:scale-[0.98] transition-transform">
            <div className="h-[3px] w-full" style={HAZARD_STRIPE} />
            <div className="bg-[#FF6A13] px-4 py-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center w-11 h-11 bg-black/15 shrink-0">
                  <ClipboardList size={20} className="text-[#1A1C1D] absolute -translate-x-1 -translate-y-1" strokeWidth={2.3} />
                  <Camera size={16} className="text-[#1A1C1D] absolute translate-x-1.5 translate-y-1.5" strokeWidth={2.3} />
                </div>
                <div className="text-left">
                  <p className="text-[15px] font-extrabold uppercase tracking-wide text-[#1A1C1D] leading-tight">
                    New Inspection
                  </p>
                  <p className="text-[10.5px] text-[#1A1C1D]/70 uppercase tracking-wider">
                    Start coating assessment
                  </p>
                </div>
              </div>
              <ChevronRight size={20} className="text-[#1A1C1D]" strokeWidth={2.5} />
            </div>
            <div className="h-[3px] w-full" style={HAZARD_STRIPE} />
          </button>

          {/* ACTION REQUIRED — surfaced above everything else it affects */}
          {failedCount > 0 && (
            <button className="w-full flex items-center gap-3 bg-[#E5484D]/10 border border-[#E5484D]/40 px-3.5 py-3 active:bg-[#E5484D]/15">
              <AlertTriangle size={16} className="text-[#E5484D] shrink-0" />
              <span className="flex-1 text-left text-[12px] font-semibold text-[#E5484D]">
                {failedCount} failed inspection{failedCount > 1 ? "s" : ""} need action
              </span>
              <ChevronRight size={15} className="text-[#E5484D] shrink-0" />
            </button>
          )}

          {/* STATS WIDGET */}
          <div>
            <SectionLabel>Inspection Statistics</SectionLabel>
            <div className="bg-[#24282B] border border-[#3A4045] p-4">
              <div className="flex items-center gap-4">
                <GaugeRing value={82} sub="Pass Rate" />
                <div className="flex flex-col gap-3 flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[11.5px] text-[#8B939A] uppercase tracking-wide">Completed</span>
                    <span className="font-mono text-lg font-bold">47</span>
                  </div>
                  <div className="h-px bg-[#3A4045]" />
                  <div className="flex items-center justify-between">
                    <span className="text-[11.5px] text-[#8B939A] uppercase tracking-wide">Pending</span>
                    <span className="font-mono text-lg font-bold text-[#FF6A13]">6</span>
                  </div>
                  <div className="h-px bg-[#3A4045]" />
                  <div className="flex items-center justify-between">
                    <span className="text-[11.5px] text-[#8B939A] uppercase tracking-wide">Failed</span>
                    <span className="font-mono text-lg font-bold text-[#E5484D]">{failedCount}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PREVIOUS INSPECTIONS */}
          <div>
            <SectionLabel right={<History size={14} className="text-[#8B939A]" />}>
              Previous Inspections
            </SectionLabel>
            <div className="bg-[#24282B] border border-[#3A4045] divide-y divide-[#3A4045]">
              {inspections.map((insp) => (
                <button
                  key={insp.id}
                  className="w-full flex items-center justify-between px-3.5 py-3.5 active:bg-[#2E3336]"
                >
                  <div className="text-left min-w-0">
                    <p className="text-[13px] font-semibold truncate">{insp.asset}</p>
                    <p className="text-[11px] text-[#8B939A] mt-0.5">
                      {insp.client} &middot; {insp.date}
                    </p>
                  </div>
                  <StatusPill status={insp.status} />
                </button>
              ))}
              <button className="w-full flex items-center justify-center gap-1.5 px-3.5 py-3 text-[11px] font-semibold uppercase tracking-wide text-[#FF6A13]">
                View All Inspections
                <ChevronRight size={13} />
              </button>
            </div>
          </div>

          {/* MANAGE — single consistent row style, no cramped icon grid */}
          <div>
            <SectionLabel>Manage</SectionLabel>
            <div className="bg-[#24282B] border border-[#3A4045]">
              <NavRow
                icon={Database}
                title="Asset Database"
                sub="Search corrosion history by structure"
              />
              <NavRow
                icon={FileText}
                title="Reports"
                sub="31 submitted &middot; 12 completed &middot; 4 drafts"
              />
            </div>
          </div>

          {/* RECENT ACTIVITY — trimmed to the essentials */}
          <div>
            <SectionLabel>Recent Activity</SectionLabel>
            <div className="bg-[#24282B] border border-[#3A4045] divide-y divide-[#3A4045]">
              <div className="flex items-start gap-2.5 px-3.5 py-3.5">
                <CheckCircle2 size={15} className="text-[#3FAE6B] mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <p className="text-[12.5px] leading-snug">
                    Inspection <span className="font-mono">INS-2291</span> completed &mdash; Tank T-204
                  </p>
                  <p className="text-[10.5px] text-[#8B939A] mt-1 flex items-center gap-1">
                    <Clock size={9} /> 2 hrs ago
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 px-3.5 py-3.5">
                <ImageIcon size={15} className="text-[#FF6A13] mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <p className="text-[12.5px] leading-snug">14 photos uploaded &mdash; Pipeline PL-11</p>
                  <p className="text-[10.5px] text-[#8B939A] mt-1 flex items-center gap-1">
                    <Clock size={9} /> Yesterday
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="h-2" />
        </main>

        {/* ---------------- BOTTOM NAV ---------------- */}
        <nav className="sticky bottom-0 bg-[#1D2022] border-t border-[#2E3336] px-1 py-2 flex items-center justify-between">
          {navItems.map(({ name, icon: Icon }) => {
            const isActive = active === name;
            return (
              <button
                key={name}
                onClick={() => setActive(name)}
                className="relative flex-1 flex flex-col items-center gap-1 py-1.5"
              >
                <Icon
                  size={19}
                  strokeWidth={isActive ? 2.4 : 1.8}
                  className={isActive ? "text-[#FF6A13]" : "text-[#8B939A]"}
                />
                <span
                  className={`text-[9px] uppercase tracking-wide ${
                    isActive ? "text-[#FF6A13] font-bold" : "text-[#8B939A]"
                  }`}
                >
                  {name}
                </span>
                {isActive && (
                  <span className="absolute top-0 w-1 h-1 bg-[#FF6A13]" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
