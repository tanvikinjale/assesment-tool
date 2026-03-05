import React from "react";

export default function QuestionField({ question, value, onChange, questionNumber, hasError }) {
  return (
    <div
      className={`rounded-2xl bg-white px-5 py-3.5 shadow-sm flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 border transition-colors ${hasError ? "border-red-300 bg-red-50/40" : "border-slate-100"}`}
      title={question.help}
    >
      {/* Question text */}
      <p className="flex-1 text-sm font-medium text-slate-800 min-w-0">
        {questionNumber !== null && (
          <span className="text-slate-400 mr-2">{questionNumber}.</span>
        )}
        {question.text}
        {question.help && (
          <span
            title={question.help}
            className="ml-2 inline-flex items-center justify-center h-4 w-4 rounded-full bg-slate-100 text-slate-400 text-[10px] font-bold cursor-help"
          >
            ?
          </span>
        )}
      </p>

      {/* Input */}
      <div className="w-full sm:w-72 shrink-0">
        {question.type === "select" ? (
          <div className="relative">
            <select
              value={value ?? ""}
              onChange={(e) => onChange(question.id, e.target.value)}
              className="block w-full appearance-none rounded-full border border-slate-300 bg-white px-4 py-2 pr-9 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-shadow cursor-pointer"
            >
              <option value="" disabled>
                {question.placeholder ?? "Select an option"}
              </option>
              {question.options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400 text-[10px]">
              ▼
            </span>
          </div>
        ) : (
          <input
            type={question.type}
            value={value ?? ""}
            onChange={(e) => onChange(question.id, e.target.value)}
            placeholder={question.placeholder}
            className="block w-full rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-shadow"
          />
        )}
      </div>
    </div>
  );
}
