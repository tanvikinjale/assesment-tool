import React from "react";
import { NAV_STEPS } from "../data/formData";

export default function Sidebar({ currentPage, onGoToPage, status }) {
  const isResult = status === "result" || status === "processing";

  return (
    <aside className="w-56 shrink-0 bg-slate-50 border-r border-slate-200 flex flex-col py-6 px-3 gap-1 overflow-y-auto">

      {NAV_STEPS.map((step, index) => {
        const isActive = currentPage === index && !isResult;
        const isCompleted = currentPage > index || isResult;

        return (
          <button
            key={step.key}
            type="button"
            onClick={() => !isResult && onGoToPage(index)}
            disabled={isResult}
            className={`
              flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all
              ${isActive ? "bg-blue-600 text-white shadow-sm" : ""}
              ${!isActive && !isResult ? "hover:bg-slate-100 cursor-pointer text-slate-500" : ""}
              ${isResult ? "cursor-default text-slate-400" : ""}
              ${isCompleted && !isActive && !isResult ? "text-slate-600" : ""}
            `}
          >
            {/* Circle indicator */}
            <div className={`
              h-6 w-6 rounded-full shrink-0 flex items-center justify-center text-[11px] font-bold border-2 transition-all
              ${isActive ? "bg-white/20 border-white/40 text-white" : ""}
              ${isCompleted && !isActive ? "bg-emerald-50 border-emerald-300 text-emerald-600" : ""}
              ${!isActive && !isCompleted ? "bg-white border-slate-200 text-slate-400" : ""}
            `}>
              {isCompleted && !isActive ? (
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                  <path d="M2 6l3 3 5-5" />
                </svg>
              ) : (
                index + 1
              )}
            </div>

            <div className="min-w-0">
              <p className={`text-xs font-semibold leading-tight truncate ${isActive ? "text-white" : ""}`}>
                {step.label}
              </p>
              {isActive && (
                <p className="text-[10px] text-white/70 mt-0.5">In progress</p>
              )}
              {isCompleted && !isActive && (
                <p className="text-[10px] text-emerald-500 mt-0.5">Completed</p>
              )}
            </div>
          </button>
        );
      })}

      {/* Result step */}
      <div className={`flex items-center gap-3 rounded-xl px-3 py-2.5 mt-1 transition-all
        ${status === "result" ? "bg-emerald-500 text-white shadow-sm" : "text-slate-300"}
      `}>
        <div className={`h-6 w-6 rounded-full shrink-0 flex items-center justify-center text-[11px] font-bold border-2
          ${status === "result" ? "bg-white/20 border-white/40 text-white" : "bg-white border-slate-200 text-slate-300"}
        `}>
          ✓
        </div>
        <div>
          <p className="text-xs font-semibold leading-tight">Result</p>
          {status === "result" && (
            <p className="text-[10px] text-white/70 mt-0.5">Complete</p>
          )}
        </div>
      </div>

      <div className="flex-1" />
    </aside>
  );
}
