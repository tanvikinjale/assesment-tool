import React from "react";
import QuestionField from "../components/QuestionField";
import {
  qualifications1to5,
  qualifications6to10,
  qualifications11to14,
} from "../data/formData";

const CONFIG = {
  "qual-1": {
    questions: qualifications1to5,
  },
  "qual-2": {
    questions: qualifications6to10,
  },
  "qual-3": {
    questions: qualifications11to14,
  },
};

export default function QualificationQuestionsPage({
  currentKey,
  currentPage,
  totalPages,
  answers,
  onChangeAnswer,
  onNext,
  onBack,
  isLastPage,
  onSubmit,
}) {
  const { kicker, title, description, questions } = CONFIG[currentKey];

  return (
    <div className="overflow-hidden flex flex-col">    
      <div className="flex-1 flex flex-col gap-4">
      <p className="text-xl font-bold text-black mb-3">
          Physician HCP Qualification Questions
      </p>
        <div className="flex flex-col gap-3">
          {questions.map((q) => (
            <QuestionField
              key={q.id}
              question={q}
              value={answers[q.id]}
              onChange={onChangeAnswer}
              questionNumber={q.number}
            />
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            ← Previous
          </button>

          {!isLastPage ? (
            <button
              type="button"
              onClick={onNext}
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 text-white px-6 py-2.5 text-sm font-semibold shadow-sm hover:bg-blue-700 active:scale-[0.98] transition-all"
            >
              Next <span className="text-base">→</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onSubmit}
              className="inline-flex items-center gap-2 rounded-full bg-primarySubmit text-white px-6 py-2.5 text-sm font-semibold shadow-sm hover:bg-emerald-700 active:scale-[0.98] transition-all"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
