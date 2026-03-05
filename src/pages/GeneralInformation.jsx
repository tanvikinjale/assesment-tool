import React, { useState } from "react";
import QuestionField from "../components/QuestionField";
import { generalQuestions } from "../data/formData";


const ERROR_MESSAGES = {
  q1: "First name is required.",
  q2: "Last name is required.",
  q3: "Please select the HCP's specialty.",
  q4: "Staff email address is required.",
  q5: "Please enter the date in DD/MM/YYYY format.",
};

function isAnswered(value) {
  return value !== undefined && value !== null && String(value).trim() !== "";
}

export default function GeneralInformationPage({ currentPage, totalPages, answers, onChangeAnswer, onNext, onBack }) {
  const [touched, setTouched] = useState(false);

  const emptyFields = generalQuestions.filter((q) => !isAnswered(answers[q.id]));
  const hasError = emptyFields.length > 0;

  const handleNext = () => {
    setTouched(true);
    if (hasError) return;
    onNext();
  };

  return (
    <div className="overflow-hidden flex flex-col">
      
    <div className="flex-1 flex flex-col gap-2">
    <p className="text-xl font-bold text-black mb-3">
          General Information
    </p>
       
        <div className="flex flex-col gap-2">
          {generalQuestions.map((q, index) => {
            const fieldHasError = touched && !isAnswered(answers[q.id]);
            return (
              <div key={q.id} className="flex flex-col gap-1">
                <QuestionField
                  question={q}
                  value={answers[q.id]}
                  onChange={(id, val) => {
                    onChangeAnswer(id, val);
                    setTouched(false);
                  }}
                  questionNumber={index + 1}
                  hasError={fieldHasError}
                />
                {fieldHasError && (
                  <p className="text-xs font-medium text-red-600 ml-1 flex items-center gap-1">
                    <span>⚠</span> {ERROR_MESSAGES[q.id]}
                  </p>
                )}
              </div>
            );
          })}
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

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleNext}
              className={`
                inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold shadow-sm transition-all active:scale-[0.98]
                ${touched && hasError
                  ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"}
              `}
            >
              Next <span className="text-base">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
