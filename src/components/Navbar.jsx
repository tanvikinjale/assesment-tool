import React from "react";

export default function Navbar({ hcpName }) {
  return (
    <header className="h-14 bg-white border-b border-slate-200 flex items-center px-6 gap-4 z-30 shadow-sm">
      {/* Logo */}
      <div className="flex items-center gap-2.5 mr-4">
        <div className="h-7 w-7 rounded-lg bg-blue-600 flex items-center justify-center shadow-sm">
          <svg viewBox="0 0 20 20" fill="white" className="h-4 w-4">
            <path d="M9 2a7 7 0 100 14A7 7 0 009 2zm1 10H8v-2h2v2zm0-4H8V6h2v2z" />
          </svg>
        </div>
        <span className="text-sm font-bold tracking-tight text-slate-900">
          HCP<span className="text-blue-600">Tier</span>
        </span>
      </div>

      <div className="h-5 w-px bg-slate-200" />

      <p className="hidden sm:block text-xs font-medium text-slate-400 tracking-wide">
        Physician Tiering Assessment Tool
      </p>

      <div className="flex-1" />

      {hcpName && (
        <div className="flex items-center gap-2 bg-slate-100 rounded-full px-3 py-1 text-xs font-semibold text-slate-600">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          {hcpName}
        </div>
      )}

      <div className="h-7 w-7 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-xs font-bold text-blue-600">
        S
      </div>
    </header>
  );
}
