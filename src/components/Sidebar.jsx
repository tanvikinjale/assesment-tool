import React from "react";
import { NAV_STEPS } from "../data/formData";

export default function Sidebar({ currentPage, onGoToPage, status }) {
  const isResult = status === "result" || status === "processing";

  return (
    <aside className="w-52 shrink-0 bg-white border-r border-slate-200 flex flex-col pt-6 pb-4 overflow-y-auto">

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
              relative flex items-center text-left px-6 py-2.5 transition-all border-l-[5px]
              ${isActive
                ? "border-l-blue-500 bg-blue-50/60"
                : "border-l-transparent hover:bg-slate-50 cursor-pointer"
              }
              ${isResult ? "cursor-default" : ""}
            `}
          >
            <span className={`
              text-sm leading-snug transition-colors
              ${isActive ? "font-semibold text-black" : ""}
              ${isCompleted && !isActive ? "font-normal text-slate-500" : ""}
              ${!isActive && !isCompleted ? "font-normal text-slate-400" : ""}
            `}>
              {step.label}
            </span>
          </button>
        );
      })}

      {/* Result step */}
      <button
        disabled
        className={`
          relative flex items-center text-left px-6 py-2.5 border-l-2 transition-all
          ${status === "result"
            ? "border-l-emerald-500 bg-emerald-50/60"
            : "border-l-transparent cursor-default"
          }
        `}
      >
        <span className={`text-sm leading-snug ${status === "result" ? "font-semibold text-emerald-600" : "font-normal text-slate-300"}`}>
          Result
        </span>
      </button>

      <div className="flex-1" />
    </aside>
  );
}
