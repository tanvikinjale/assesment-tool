import React, { useRef, useState } from "react";
import QuestionField from "../components/QuestionField";
import { instructionsQuestions } from "../data/formData";

const CV_DUMMY_DATA = {
  q1: "Jonathan",
  q2: "Mitchell",
  q3: "Hematologist",
  q4: "sarah.jones@shire.com",
  q5: "05/03/2026",
};


function CVUpload({ uploadedFile, onFileChange, showError }) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file) => {
    if (file) onFileChange(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleRemove = () => {
    onFileChange(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className={`rounded-2xl shadow-lg px-5 py-4 flex flex-col gap-3 transition-colors bg-white `}>
      {/* Notice */}
      <div className="flex items-start gap-2.5">
        <span className="text-base mt-0.5">{showError ? "🚫" : "⚠️"}</span>
        <p className={`text-sm leading-relaxed font-medium ${showError ? "text-red-700" : "text-amber-600"}`}>
          {showError
            ? "CV upload is required before you can proceed."
            : "A CV updated within the last year is required."}
        </p>
      </div>

      {/* Upload area */}
      {!uploadedFile ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`
            cursor-pointer rounded-xl border-2 border-dashed px-6 py-8 flex flex-col items-center gap-2 transition-colors
            ${showError
              ? "border-red-300 bg-white hover:border-red-400 hover:bg-red-50"
              : isDragging
              ? "border-blue-400 bg-blue-50"
              : "border-slate-300 bg-white hover:border-blue-400 hover:bg-slate-50"
            }
          `}
        >
          <div className={`h-10 w-10 rounded-full flex items-center justify-center text-xl ${showError ? "bg-red-100 text-red-400" : "bg-slate-100 text-slate-400"}`}>
            📄
          </div>
          <p className="text-sm font-semibold text-slate-700">
            Drop CV here or{" "}
            <span className={`underline underline-offset-2 ${showError ? "text-red-600" : "text-blue-600"}`}>
              browse files
            </span>
          </p>
          <p className="text-xs text-slate-400">PDF, DOC, DOCX — max 10 MB</p>
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={(e) => handleFile(e.target.files[0])}
          />
        </div>
      ) : (
        <div className="flex items-center gap-3 rounded-xl  bg-gray-100 px-4 py-3">
          <div className="h-9 w-9 rounded-lg flex items-center justify-center  text-base shrink-0">
            📄
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-800 truncate">{uploadedFile.name}</p>
            <p className="text-xs text-slate-400 mt-0.5">
              {(uploadedFile.size / 1024).toFixed(0)} KB · Uploaded successfully
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-semibold primarySubmit">✓ Uploaded</span>
            <button
              type="button"
              onClick={handleRemove}
              className="text-slate-400 hover:text-red-500 transition-colors text-lg leading-none"
              title="Remove file"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function InstructionsPage({ currentPage, totalPages, answers, onChangeAnswer, onNext }) {
  const [touched, setTouched] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  const cvAnswer = answers["cvProvided"];
  const cvNotProvided = cvAnswer === "No";

  // Validation rules:
  // 1. CV question must be answered
  // 2. If "No", a file must be uploaded
  const missingAnswer = !cvAnswer;
  const missingFile = cvNotProvided && !uploadedFile;
  const hasError = missingAnswer || missingFile;

  const handleFileChange = (file) => {
    setUploadedFile(file);
    setTouched(false);

    if (file) {
      // Populate general information answers with dummy CV data
      Object.entries(CV_DUMMY_DATA).forEach(([id, value]) => {
        onChangeAnswer(id, value);
      });
    } else {
      // Clear general information answers when file is removed
      Object.keys(CV_DUMMY_DATA).forEach((id) => {
        onChangeAnswer(id, "");
      });
    }
  };


  const handleNext = () => {
    setTouched(true);
    if (hasError) return;
    onNext();
  };

  return (
    <div className=" overflow-hidden flex flex-col">
      <div className="flex-1 flex flex-col gap-5">
        {/* Instructions card */}
        <div className="px-5 ">
          <p className="text-xl font-bold text-black mb-3">
            Instructions
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-600 leading-relaxed">
            <li>For each physician HCP consultant, answer all HCP qualification questions based on review of the CV and other relevant sources of information.</li>
            <li>Answers must be selected from the available options in the drop-down list. If you do not know the answer, select the top-most option.</li>
            <li>After completing the questionnaire, the determined Tier will appear. Submit the completed questionnaire and store with other contract documentation.</li>
            <li>A physician HCP Consultant must provide a CV updated within the last year prior to being engaged for consulting services.</li>
          </ul>
        </div>

        {/* CV confirmation question */}
        <div className="flex flex-col gap-1.5 ">
          {instructionsQuestions.map((q) => (
            <div key={q.id}>
              <QuestionField
                question={q}
                value={answers[q.id]}
                onChange={(id, val) => {
                  onChangeAnswer(id, val);
                  // Reset file if user switches back to "Yes"
                  if (val === "Yes") setUploadedFile(null);
                  // Clear touched state on change so error re-evaluates on next click
                  setTouched(false);
                }}
                questionNumber={null}
                hasError={touched && missingAnswer}
              />
              {/* Inline error for unanswered question */}
              {touched && missingAnswer && (
                <p className="text-xs font-medium text-red-600 mt-1 ml-1 flex items-center gap-1">
                  <span>⚠</span> Please select whether the CV has been provided.
                </p>
              )}
            </div>
          ))}
        </div>

        {/* CV upload — shown only when answer is "No" */}
        {cvNotProvided && (
          <CVUpload
            uploadedFile={uploadedFile}
            onFileChange={handleFileChange}
            showError={touched && missingFile}
          />
        )}

        {/* Navigation */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 mt-auto">
          <button
            type="button"
            onClick={handleNext}
            className={`
              inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold shadow-sm transition-all active:scale-[0.98]
              ${hasError && touched
                ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
              }
            `}
          >
            Next <span className="text-base">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
