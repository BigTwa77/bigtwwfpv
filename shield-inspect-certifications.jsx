import React, { useState } from "react";
import {
  ChevronLeft,
  Phone,
  Mail,
  MapPin,
  Building2,
  ShieldCheck,
  Gauge,
  Plus,
  Upload,
  ChevronRight,
  BadgeCheck,
  AlertTriangle,
  Clock,
} from "lucide-react";

// Shared tokens with the rest of Shield Inspect AI:
// bg #17191B | panel #24282B | raised #2E3336 | orange #FF6A13 | pass #3FAE6B | fail #E5484D

function LogoMark({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 160 160">
      <defs>
        <clipPath id="lm-clip">
          <path d="M80 8 L138 30 L138 75 C138 107 114 130 80 145 C46 130 22 107 22 75 L22 30 Z" />
        </clipPath>
      </defs>
      <path
        d="M80 8 L138 30 L138 75 C138 107 114 130 80 145 C46 130 22 107 22 75 L22 30 Z"
        fill="#1D2022"
        stroke="#3A4045"
        strokeWidth="3.5"
      />
      <g clipPath="url(#lm-clip)">
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

function SectionLabel({ children, action }) {
  return (
    <div className="flex items-center justify-between mb-2 px-0.5">
      <div className="flex items-center gap-2">
        <span className="w-1 h-3.5 bg-[#FF6A13]" />
        <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#8B939A]">{children}</h2>
      </div>
      {action}
    </div>
  );
}

function statusStyle(status) {
  if (status === "valid") return { bg: "bg-[#3FAE6B]/15", text: "text-[#3FAE6B]", label: "Valid", Icon: BadgeCheck };
  if (status === "expiring")
    return { bg: "bg-[#FF6A13]/15", text: "text-[#FF6A13]", label: "Expiring Soon", Icon: Clock };
  return { bg: "bg-[#E5484D]/15", text: "text-[#E5484D]", label: "Expired", Icon: AlertTriangle };
}

function CertRow({ title, sub, certNo, date, dueLabel, dueDate, status }) {
  const s = statusStyle(status);
  const { Icon } = s;
  return (
    <button className="w-full flex items-center gap-3 px-3.5 py-3 border-b border-[#3A4045] last:border-0 active:bg-[#2E3336]">
      <div className="w-9 h-9 flex items-center justify-center bg-[#1D2022] border border-[#3A4045] shrink-0">
        <Gauge size={15} className="text-[#8B939A]" />
      </div>
      <div className="flex-1 text-left min-w-0">
        <p className="text-[12px] font-bold leading-tight truncate">{title}</p>
        <p className="text-[9.5px] text-[#8B939A] mt-0.5">{sub} &middot; {certNo}</p>
        <p className="text-[9px] text-[#5C6368] mt-0.5 font-mono">
          {dueLabel} {dueDate}
        </p>
      </div>
      <div className={`flex items-center gap-1 px-2 py-1 text-[9px] font-bold uppercase tracking-wider shrink-0 ${s.bg} ${s.text}`}>
        <Icon size={10} />
        {s.label}
      </div>
    </button>
  );
}

export default function CertificationsProfile() {
  const [tab, setTab] = useState("inspector"); // inspector | equipment

  return (
    <div className="min-h-screen w-full flex items-start justify-center bg-[#0E1011] py-6 px-3">
      <div className="w-full max-w-[420px] bg-[#17191B] text-[#ECE9E3] font-sans rounded-[28px] overflow-hidden border border-[#2E3336] shadow-2xl flex flex-col">
        <div className="h-1.5 w-full bg-[#0E1011]" />

        {/* HEADER */}
        <header className="bg-[#1D2022] border-b border-[#2E3336] px-4 pt-4 pb-3">
          <div className="flex items-center gap-3">
            <button className="w-8 h-8 flex items-center justify-center bg-[#24282B] border border-[#3A4045]">
              <ChevronLeft size={16} />
            </button>
            <div className="flex items-center gap-2">
              <LogoMark size={26} />
              <div>
                <p className="text-[13px] font-extrabold uppercase tracking-[0.1em] leading-none">
                  Profile &amp; Certifications
                </p>
                <p className="text-[9.5px] text-[#8B939A] mt-1 uppercase tracking-wide">
                  Shield Inspect AI
                </p>
              </div>
            </div>
          </div>
        </header>

        <main className="px-4 py-4 flex-1 bg-[#17191B] space-y-5">
          {/* INSPECTOR CARD */}
          <div className="relative bg-[#24282B] border border-[#3A4045] p-3.5 flex items-center gap-3">
            <div className="w-14 h-14 bg-[#1D2022] border border-[#3A4045] flex items-center justify-center shrink-0">
              <span className="text-[16px] font-extrabold text-[#8B939A]">AZ</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-bold leading-tight">Antz</p>
              <p className="text-[10.5px] text-[#8B939A] mt-0.5">Casual Site Supervisor &middot; Coating Inspector</p>
              <div className="flex items-center gap-1.5 mt-1.5">
                <ShieldCheck size={12} className="text-[#3FAE6B]" />
                <span className="text-[9.5px] font-semibold uppercase tracking-wide text-[#3FAE6B]">
                  NACE Level 2 &middot; Active
                </span>
              </div>
            </div>
            <ChevronRight size={15} className="text-[#8B939A] shrink-0" />
          </div>

          {/* CONTACT INFORMATION */}
          <div>
            <SectionLabel>Contact Information</SectionLabel>
            <div className="bg-[#24282B] border border-[#3A4045] divide-y divide-[#3A4045]">
              <div className="flex items-center gap-3 px-3.5 py-3">
                <Phone size={14} className="text-[#FF6A13] shrink-0" />
                <div>
                  <p className="text-[9.5px] uppercase tracking-wide text-[#8B939A]">Inspector Mobile</p>
                  <p className="text-[12.5px] font-mono mt-0.5">Tap to view</p>
                </div>
              </div>
              <div className="flex items-center gap-3 px-3.5 py-3">
                <Mail size={14} className="text-[#FF6A13] shrink-0" />
                <div>
                  <p className="text-[9.5px] uppercase tracking-wide text-[#8B939A]">Inspector Email</p>
                  <p className="text-[12.5px] font-mono mt-0.5">Tap to view</p>
                </div>
              </div>
              <div className="flex items-center gap-3 px-3.5 py-3">
                <Building2 size={14} className="text-[#FF6A13] shrink-0" />
                <div>
                  <p className="text-[9.5px] uppercase tracking-wide text-[#8B939A]">Powerlift Industries</p>
                  <p className="text-[12.5px] mt-0.5">Head Office &middot; Perth WA</p>
                </div>
              </div>
              <div className="flex items-center gap-3 px-3.5 py-3">
                <MapPin size={14} className="text-[#FF6A13] shrink-0" />
                <div>
                  <p className="text-[9.5px] uppercase tracking-wide text-[#8B939A]">Current Site</p>
                  <p className="text-[12.5px] mt-0.5">Tom Price Processing Site &middot; Pilbara, WA</p>
                </div>
              </div>
            </div>
          </div>

          {/* CERTIFICATIONS TABS */}
          <div>
            <SectionLabel
              action={
                <button className="flex items-center gap-1 text-[9.5px] uppercase tracking-wide text-[#FF6A13] font-semibold">
                  <Plus size={11} /> Add
                </button>
              }
            >
              Certifications
            </SectionLabel>

            <div className="flex gap-1.5 mb-2.5">
              <button
                onClick={() => setTab("inspector")}
                className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-wide border ${
                  tab === "inspector"
                    ? "bg-[#FF6A13] text-[#1A1C1D] border-[#FF6A13]"
                    : "bg-[#1D2022] text-[#8B939A] border-[#3A4045]"
                }`}
              >
                Inspector Certs
              </button>
              <button
                onClick={() => setTab("equipment")}
                className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-wide border ${
                  tab === "equipment"
                    ? "bg-[#FF6A13] text-[#1A1C1D] border-[#FF6A13]"
                    : "bg-[#1D2022] text-[#8B939A] border-[#3A4045]"
                }`}
              >
                Equipment Calibration
              </button>
            </div>

            <div className="bg-[#24282B] border border-[#3A4045]">
              {tab === "inspector" ? (
                <>
                  <CertRow
                    title="NACE Coating Inspector &mdash; Level 2"
                    sub="NACE International"
                    certNo="Cert #48213"
                    dueLabel="Expires"
                    dueDate="Mar 2027"
                    status="valid"
                  />
                  <CertRow
                    title="Working at Heights"
                    sub="Site Safe WA"
                    certNo="Cert #WH-9042"
                    dueLabel="Expires"
                    dueDate="Sep 2026"
                    status="expiring"
                  />
                  <CertRow
                    title="Confined Space Entry"
                    sub="Site Safe WA"
                    certNo="Cert #CS-3310"
                    dueLabel="Expired"
                    dueDate="Jun 2026"
                    status="expired"
                  />
                </>
              ) : (
                <>
                  <CertRow
                    title="Elcometer 456 DFT Gauge"
                    sub="Serial EL-22841"
                    certNo="Cal #C-7731"
                    dueLabel="Next Due"
                    dueDate="Nov 2026"
                    status="valid"
                  />
                  <CertRow
                    title="Testex Profile Gauge"
                    sub="Serial TX-1187"
                    certNo="Cal #C-6620"
                    dueLabel="Next Due"
                    dueDate="Aug 2026"
                    status="expiring"
                  />
                  <CertRow
                    title="Bresle Salt Test Kit"
                    sub="Serial BR-0552"
                    certNo="Cal #C-5510"
                    dueLabel="Next Due"
                    dueDate="Jul 2026"
                    status="expired"
                  />
                  <CertRow
                    title="Digital Hygrometer / Logger"
                    sub="Serial HG-3391"
                    certNo="Cal #C-8802"
                    dueLabel="Next Due"
                    dueDate="Jan 2027"
                    status="valid"
                  />
                </>
              )}
            </div>

            <button className="w-full flex items-center justify-center gap-2 bg-[#1D2022] border border-dashed border-[#3A4045] py-2.5 mt-2.5 active:border-[#FF6A13]">
              <Upload size={13} className="text-[#8B939A]" />
              <span className="text-[10.5px] font-semibold uppercase tracking-wide text-[#8B939A]">
                Upload Calibration Certificate
              </span>
            </button>

            <p className="text-[9.5px] text-[#8B939A] mt-2.5 leading-relaxed">
              Expired or expiring equipment is automatically flagged on any
              inspection that uses it, so a report can't go out on
              out-of-cal gear without a warning.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
