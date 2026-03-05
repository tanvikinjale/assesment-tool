import React from "react";

function ProcessingScreen() {
  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="max-w-sm w-full rounded-3xl bg-white border border-slate-200 shadow-xl p-10 text-center space-y-5">
        <div className="flex justify-center">
          <div className="h-12 w-12 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin" />
        </div>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-blue-600 mb-1">
            Processing
          </p>
          <h2 className="text-xl font-bold text-slate-900">
            Calculating clinical profile…
          </h2>
        </div>
        <p className="text-sm text-slate-400">
          Analyzing your responses to determine the appropriate HCP tier.
        </p>
      </div>
    </div>
  );
}

function ResultCard({ determinedTier, onReset }) {
  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="relative border border-slate-100 max-w-2xl w-full rounded-3xl bg-white shadow-xl p-10 overflow-hidden space-y-6">
        <div className="relative space-y-3">
         
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Outcome
          </h1>
          <p className="text-2xl font-bold text-primarySubmit bg-clip-text text-transparent">
            {determinedTier}
          </p>
        </div>
        <div className="relative flex flex-wrap items-center justify-between gap-3 pt-5 border-t border-slate-200">
          <p className="text-xs text-slate-400">
            This tier has been determined based on the information entered in the Physician HCP Tiering Tool.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ResultPage({ status, determinedTier, onReset }) {
  if (status === "processing") return <ProcessingScreen />;
  return <ResultCard determinedTier={determinedTier} onReset={onReset} />;
}
