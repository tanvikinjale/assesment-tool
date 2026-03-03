import React, { useMemo, useState } from "react";

const specialtyOptions = [
  "Allergist",
  "Endocrinologist",
  "Gastroenterologist",
  "Hematologist",
  "Pediatrician",
  "General Practitioner",
  "Not Applicable",
  "Other",
];

const page2Options = {
  q6: [
    "Non-Licensed or Non-Board Certified",
    "Licensed or Board Certified in Specialty",
    "Multiple Board Certifications or Licensures",
  ],
  q7: ["1 to 3 years", "4 to 8 years", "9 to 15 years", "16+ years"],
  q8: ["N/A", "Less than 50%", "More than 50%"],
  q9: ["Yes", "No"],
  q10: [
    "None",
    "Adjunct Faculty",
    "Associate Professor",
    "Professor",
    "Department Head/Chairman/Dean",
  ],
};

const page3Options = {
  q11: ["0 to 1", "2 to 5", "6 to 10", "11+"],
  q12: ["0", "1 to 5", "6 to 15", "16+"],
  q13: [
    "No",
    "Yes - Reviewer",
    "Yes - Reviewer of 2+ Major Journals",
    "Yes - Editor/Editorial Board",
  ],
  q14: ["0", "1 to 4", "5 to 7", "8 to 10", "11+"],
  q15: ["N/A", "Sub-Investigator/Co-Investigator", "Principal Investigator"],
};

const page4Options = {
  q16: ["Yes", "No"],
  q17: ["N/A", "Local/Regional", "National/International"],
  q18: ["Yes", "No"],
  q19: ["N/A", "Local/Regional", "National/International"],
};

const PAGES = [
  {
    key: "instructions",
    headerKicker: "Assessment",
    headerTitle: "Physician HCP Tiering Tool - Global (including US)",
    headerDescription: "",
    body: (
      <div className="space-y-3 text-sm leading-relaxed text-slate-700">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
          Instructions
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            For each physician HCP consultant, answer all HCP qualification
            questions based on review of the CV and other relevant sources of
            information.
          </li>
          <li>
            Answers must be selected from the available options in the
            drop-down list for each question. If you do not know the answer for
            a given question, select the top-most option from the drop-down
            list.
          </li>
          <li>
            After completing the questionnaire, the determined Tier for the
            Physician HCP Consultant will appear at the bottom of the tool.
            Submit the completed questionnaire and store with other contract
            documentation.
          </li>
          <li>
            A physician HCP Consultant must provide a CV, updated within the
            last year, prior to being engaged for consulting services. Please
            confirm that such a CV has been provided below.
          </li>
        </ul>
      </div>
    ),
    questions: [
      {
        id: "cvProvided",
        text: "CV provided (updated within the last year)",
        type: "select",
        options: ["Yes", "No"],
      },
    ],
  },
  {
    key: "general",
    headerKicker: "General information",
    headerTitle: "HCP and staff details.",
    headerDescription:
      "Please provide your basic details to continue with the assessment.",
    questions: [
      {
        id: "q1",
        text: "Please indicate the first name of the HCP for which this tiering tool is being completed.",
        type: "text",
        placeholder: "First name",
      },
      {
        id: "q2",
        text: "Please indicate the last name of the HCP for which this tiering tool is being completed.",
        type: "text",
        placeholder: "Last name",
      },
      {
        id: "q3",
        text: "Please indicate the HCP's specialty.",
        type: "select",
        options: specialtyOptions,
        placeholder: "Select specialty",
      },
      {
        id: "q4",
        text: "Please indicate the email address of the Shire staff member completing this tiering tool.",
        type: "email",
        placeholder: "name@example.com",
      },
      {
        id: "q5",
        text: "Please indicate the date on which this tiering tool is being completed. (DD/MM/YYYY)",
        type: "text",
        placeholder: "DD/MM/YYYY",
      },
    ],
  },
  {
    key: "qual-1",
    headerKicker: "Physician HCP Qualification Questions",
    headerTitle: "Qualifications (1–5)",
    headerDescription: "Select the best option for each question.",
    questions: [
      {
        id: "q6",
        displayNumber: 1,
        text: "What is the current Licensure/Board Certification of the HCP?",
        type: "select",
        options: page2Options.q6,
      },
      {
        id: "q7",
        displayNumber: 2,
        text: "How many years has the HCP been practicing medicine?",
        type: "select",
        options: page2Options.q7,
        help: "e.g., years since receipt of M.D./D.O. If HCP has received multiple types of advanced degrees, select the date of the earliest received.",
      },
      {
        id: "q8",
        displayNumber: 3,
        text: "What percentage of the HCPs professional time is involved in direct patient care?",
        type: "select",
        options: page2Options.q8,
      },
      {
        id: "q9",
        displayNumber: 4,
        text: "Does the HCP possess additional specialized certifications? (e.g., fellowships, credentialing, etc.)",
        type: "select",
        options: page2Options.q9,
      },
      {
        id: "q10",
        displayNumber: 5,
        text: "Does the HCP currently hold faculty/academic appointments? If so, at what level?",
        type: "select",
        options: page2Options.q10,
        help: "The HCP holds an appointment as a academic dept. chair, full professor, assistant professor, visiting lecturer, etc.",
      },
    ],
  },
  {
    key: "qual-2",
    headerKicker: "Physician HCP Qualification Questions",
    headerTitle: "Qualifications (6–10)",
    headerDescription: "Select the best option for each question.",
    questions: [
      {
        id: "q11",
        displayNumber: 6,
        text: "How many scientific or medical education presentations has the HCP performed in the last 7 years? (e.g., Abstract Presentations, Speaking at Medical Conferences, etc.)",
        type: "select",
        options: page3Options.q11,
        help: "Academic/university teaching or instructor roles or poster presentations are not to be considered here.",
      },
      {
        id: "q12",
        displayNumber: 7,
        text: "How many peer reviewed publications has the HCP authored in the last 7 years?",
        type: "select",
        options: page3Options.q12,
        help: "Peer review is the evaluation of research methods and data analysis by leading experts in the same field in order to maintain or enhance the quality of the work or performance in that field. Examples of peer reviewed journals include: New England Journal of Medicine, American Journal of Surgical Pathology, International Journal of Health Sciences. Abstracts and Posters are not to be considered here.",
      },
      {
        id: "q13",
        displayNumber: 8,
        text: "Is the HCP a member of any editorial boards or does he/she conduct any peer review of manuscripts on behalf of journals?",
        type: "select",
        options: page3Options.q13,
      },
      {
        id: "q14",
        displayNumber: 9,
        text: "How many clinical or pre-clinical trials/research has the HCP conducted in the last 7 years?",
        type: "select",
        options: page3Options.q14,
      },
      {
        id: "q15",
        displayNumber: 10,
        text: "If the answer to question 9 is greater than 0, what was the role of greatest responsibility held by the HCP in any trial(s) within the last 7 years?",
        type: "select",
        options: page3Options.q15,
      },
    ],
  },
  {
    key: "qual-3",
    headerKicker: "Physician HCP Qualification Questions",
    headerTitle: "Qualifications (11–14)",
    headerDescription: "Select the best option for each question.",
    questions: [
      {
        id: "q16",
        displayNumber: 11,
        text: "Has the HCP been a department head/chair within a healthcare institution within the last 7 years?",
        type: "select",
        options: page4Options.q16,
        help: "If the the HCP is a head of a medical department (e.g., cardiology, hematology) at a hospital or medical center, select Yes. Healthcare institutions may also include international medical organizations, many of which dictate treatment paradigm (tx) guidelines (e.g., World Federation of Hemophilia, European Society for Medical Oncology). If an HCP is a leadership/chair within these organizations, you may select Yes.",
      },
      {
        id: "q17",
        displayNumber: 12,
        text: "If the answer to question 11 is \"Yes\", were/are the institutions/organizations local/regional, or national/international?",
        type: "select",
        options: page4Options.q17,
        help: "Below are examples of institutions at each level: National/International: World Federation of Hemophilia, European Society for Medical Oncology. Local/Regional: University Clinic Heidelberg, Centro Tumori (Rome)",
      },
      {
        id: "q18",
        displayNumber: 13,
        text: "Has the HCP held senior leadership positions within a professional medical organization within the last 7 years?",
        type: "select",
        options: page4Options.q18,
      },
      {
        id: "q19",
        displayNumber: 14,
        text: "If the answer to question 13 is \"Yes\", were/are the institutions/organizations local/regional, or national/international?",
        type: "select",
        options: page4Options.q19,
      },
    ],
  },
];

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState({});
  const [status, setStatus] = useState("assessment"); // assessment | processing | result

  const totalPages = PAGES.length;
  const page = PAGES[currentPage];

  const pageNumberLabel = `${currentPage + 1} / ${totalPages}`;
  const isLastPage = currentPage === totalPages - 1;

  const determinedTier = useMemo(
    () => "Determined Physician · HCP Tier II",
    []
  );

  const handleChangeAnswer = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage((p) => p + 1);
  };

  const handleSubmit = () => {
    setStatus("processing");
    setTimeout(() => {
      setStatus("result");
    }, 1800);
  };

  if (status === "processing") {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
          <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-sky-200/70 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 -left-24 h-[28rem] w-[28rem] rounded-full bg-indigo-200/40 blur-3xl" />

          <div className="relative max-w-md w-full rounded-3xl bg-white border border-slate-200 shadow-[0_20px_60px_rgba(2,6,23,0.12)] p-10 text-center space-y-6">
          <div className="flex justify-center">
            <div className="h-12 w-12 border-4 border-primaryNext/40 border-t-primaryNext rounded-full animate-spin" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-primaryNext">
              Processing
            </p>
            <h1 className="text-2xl font-semibold tracking-tight">
              Calculating your clinical profile…
            </h1>
          </div>
          <p className="text-sm text-slate-500">
            We’re analyzing your responses to build a personalized clinical
            confidence snapshot.
          </p>
          </div>
        </div>
      </div>
    );
  }

  if (status === "result") {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
          <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-sky-200/70 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 -left-24 h-[28rem] w-[28rem] rounded-full bg-emerald-200/40 blur-3xl" />

          <div className="relative max-w-2xl w-full rounded-3xl bg-white border border-slate-200 shadow-[0_20px_60px_rgba(2,6,23,0.12)] p-10 space-y-8">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-500">
              Assessment Result
            </p>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Tiering outcome
            </h1>
            <p className="text-3xl sm:text-4xl font-semibold tracking-tight bg-gradient-to-r from-emerald-500 via-sky-500 to-emerald-400 bg-clip-text text-transparent">
              {determinedTier}
            </p>
          </div>

          <div className="grid gap-4 text-sm text-slate-600">
            <p>
              Your responses show a strong commitment to patient safety,
              continuous learning, and calm decision-making under pressure. You
              consistently bring structure and ownership to complex clinical
              situations.
            </p>
            <p>
              As a Tier II Determined Physician, you lean into difficult cases,
              advocate for patients, and maintain clarity even when information
              is incomplete.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200">
            <p className="text-xs text-slate-500/90">
              Thank you for completing this assessment.
            </p>
            <button
              type="button"
              onClick={() => {
                setAnswers({});
                setCurrentPage(0);
                setStatus("assessment");
              }}
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-1.5 text-xs font-medium text-slate-700 hover:border-slate-400 hover:bg-slate-50 transition-colors"
            >
              Retake assessment
            </button>
          </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="relative min-h-screen flex justify-center bg-white px-4 py-4 overflow-hidden">
        <div className="pointer-events-none absolute -top-28 -right-28 h-[34rem] w-[34rem] rounded-full bg-sky-200/70 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-36 -left-32 h-[34rem] w-[34rem] rounded-full bg-indigo-200/40 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-slate-50/60 to-white" />

        <div className="max-w-5xl w-full">
          <main className="relative min-h-[88vh] flex flex-col rounded-3xl bg-white/90 border border-slate-200 shadow-[0_20px_60px_rgba(2,6,23,0.12)] overflow-hidden">
            <div className="relative px-6 sm:px-8 pt-7 pb-6 border-b border-slate-100">
              <div className="absolute inset-0 bg-gradient-to-b from-sky-100 via-white to-white" />
              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primaryNext/80">
                  {page.headerKicker}
                </p>
                <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
                  <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                    {page.headerTitle}
                  </h1>
                  <span className="text-xs font-medium text-slate-600">
                    Page {pageNumberLabel}
                  </span>
                </div>
                {page.headerDescription && (
                  <p className="mt-2 text-sm text-slate-600 max-w-3xl">
                    {page.headerDescription}
                  </p>
                )}
              </div>
            </div>

            <div className="flex-1 p-4 sm:p-6 flex flex-col gap-4">
              {page.body && (
                <div className="rounded-2xl bg-white px-4 py-4 sm:px-5 shadow-sm">
                  {page.body}
                </div>
              )}

              <div className="flex-1 space-y-3">
                {page.questions.map((q, index) => {
                  const number =
                    page.key === "general"
                      ? index + 1
                      : typeof q.displayNumber === "number"
                      ? q.displayNumber
                      : null;

                  return (
                    <div
                      key={q.id}
                      className="rounded-2xl bg-white px-4 py-3 sm:px-5 sm:py-3.5 shadow-sm"
                      title={q.help}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                        <p className="flex-1 text-sm sm:text-base font-medium text-slate-900">
                          {number !== null && (
                            <span className="text-slate-900 mr-2">
                              {number}.
                            </span>
                          )}
                          {q.text}
                        </p>

                        <div className="w-full sm:w-64 md:w-72 lg:w-80">
                          {q.type === "select" ? (
                            <div className="relative">
                              <select
                                value={answers[q.id] ?? ""}
                                onChange={(e) =>
                                  handleChangeAnswer(q.id, e.target.value)
                                }
                                className="block w-full appearance-none rounded-full border border-slate-300 bg-white px-4 py-2 pr-9 text-sm text-slate-900 shadow-sm focus:border-primaryNext focus:outline-none focus:ring-4 focus:ring-primaryNext/15"
                              >
                                <option value="" disabled>
                                  {q.placeholder ?? "Select"}
                                </option>
                                {q.options.map((opt) => (
                                  <option key={opt} value={opt}>
                                    {opt}
                                  </option>
                                ))}
                              </select>
                              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400 text-xs">
                                ▼
                              </span>
                            </div>
                          ) : (
                            <input
                              type={q.type}
                              value={answers[q.id] ?? ""}
                              onChange={(e) =>
                                handleChangeAnswer(q.id, e.target.value)
                              }
                              placeholder={q.placeholder}
                              className="block w-full rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm focus:border-primaryNext focus:outline-none focus:ring-4 focus:ring-primaryNext/15"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              

              <div className="flex flex-wrap items-center justify-end gap-3 pt-3">
                {currentPage > 0 && (
                  <button
                    type="button"
                    onClick={() => setCurrentPage((p) => p - 1)}
                    className="text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors"
                  >
                    Previous
                  </button>
                )}

                {!isLastPage ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-primaryNext px-6 py-2 text-sm font-semibold text-white shadow-sm hover:brightness-110 transition-[filter,transform] active:scale-[0.98]"
                  >
                    <span>Next</span>
                    <span className="text-base leading-none">→</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="inline-flex items-center justify-center rounded-full bg-primarySubmit px-6 py-2 text-sm font-semibold text-white shadow-sm hover:brightness-110 transition-[filter,transform] active:scale-[0.98]"
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;

