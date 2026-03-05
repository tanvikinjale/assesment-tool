// ─── Specialty options ────────────────────────────────────────
export const specialtyOptions = [
  "Allergist",
  "Endocrinologist",
  "Gastroenterologist",
  "Hematologist",
  "Pediatrician",
  "General Practitioner",
  "Not Applicable",
  "Other",
];

export const instructionsQuestions = [
  {
    id: "cvProvided",
    text: "CV provided (updated within the last year)",
    type: "select",
    options: ["Yes", "No"],
  },
];

// ─── General information page ─────────────────────────────────
export const generalQuestions = [
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
    text: "Please indicate the date on which this tiering tool is being completed.",
    type: "date",
    placeholder: "DD/MM/YYYY",
  },
];

// ─── Qualification questions 1–5 ─────────────────────────────
export const qualifications1to5 = [
  {
    id: "q6",
    number: 1,
    text: "What is the current Licensure/Board Certification of the HCP?",
    type: "select",
    options: [
      "Non-Licensed or Non-Board Certified",
      "Licensed or Board Certified in Specialty",
      "Multiple Board Certifications or Licensures",
    ],
  },
  {
    id: "q7",
    number: 2,
    text: "How many years has the HCP been practicing medicine?",
    type: "select",
    options: ["1 to 3 years", "4 to 8 years", "9 to 15 years", "16+ years"],
    help: "e.g., years since receipt of M.D./D.O. If the HCP has received multiple advanced degrees, select the date of the earliest received.",
  },
  {
    id: "q8",
    number: 3,
    text: "What percentage of the HCP's professional time is involved in direct patient care?",
    type: "select",
    options: ["N/A", "Less than 50%", "More than 50%"],
  },
  {
    id: "q9",
    number: 4,
    text: "Does the HCP possess additional specialized certifications? (e.g., fellowships, credentialing, etc.)",
    type: "select",
    options: ["Yes", "No"],
  },
  {
    id: "q10",
    number: 5,
    text: "Does the HCP currently hold faculty/academic appointments? If so, at what level?",
    type: "select",
    options: [
      "None",
      "Adjunct Faculty",
      "Associate Professor",
      "Professor",
      "Department Head/Chairman/Dean",
    ],
    help: "The HCP holds an appointment as an academic dept. chair, full professor, assistant professor, visiting lecturer, etc.",
  },
];

// ─── Qualification questions 6–10 ────────────────────────────
export const qualifications6to10 = [
  {
    id: "q11",
    number: 6,
    text: "How many scientific or medical education presentations has the HCP performed in the last 7 years?",
    type: "select",
    options: ["0 to 1", "2 to 5", "6 to 10", "11+"],
    help: "Academic/university teaching or poster presentations are not to be considered here.",
  },
  {
    id: "q12",
    number: 7,
    text: "How many peer reviewed publications has the HCP authored in the last 7 years?",
    type: "select",
    options: ["0", "1 to 5", "6 to 15", "16+"],
    help: "Abstracts and posters are not to be considered here.",
  },
  {
    id: "q13",
    number: 8,
    text: "Is the HCP a member of any editorial boards or does he/she conduct peer review of manuscripts on behalf of journals?",
    type: "select",
    options: [
      "No",
      "Yes - Reviewer",
      "Yes - Reviewer of 2+ Major Journals",
      "Yes - Editor/Editorial Board",
    ],
  },
  {
    id: "q14",
    number: 9,
    text: "How many clinical or pre-clinical trials/research has the HCP conducted in the last 7 years?",
    type: "select",
    options: ["0", "1 to 4", "5 to 7", "8 to 10", "11+"],
  },
  {
    id: "q15",
    number: 10,
    text: "If the answer to question 9 is greater than 0, what was the role of greatest responsibility held by the HCP in any trial(s) within the last 7 years?",
    type: "select",
    options: ["N/A", "Sub-Investigator/Co-Investigator", "Principal Investigator"],
  },
];

// ─── Qualification questions 11–14 ───────────────────────────
export const qualifications11to14 = [
  {
    id: "q16",
    number: 11,
    text: "Has the HCP been a department head/chair within a healthcare institution within the last 7 years?",
    type: "select",
    options: ["Yes", "No"],
    help: "If the HCP is a head of a medical department at a hospital or medical center, select Yes.",
  },
  {
    id: "q17",
    number: 12,
    text: 'If the answer to question 11 is "Yes", were/are the institutions/organizations local/regional or national/international?',
    type: "select",
    options: ["N/A", "Local/Regional", "National/International"],
  },
  {
    id: "q18",
    number: 13,
    text: "Has the HCP held senior leadership positions within a professional medical organization within the last 7 years?",
    type: "select",
    options: ["Yes", "No"],
  },
  {
    id: "q19",
    number: 14,
    text: 'If the answer to question 13 is "Yes", were/are the institutions/organizations local/regional or national/international?',
    type: "select",
    options: ["N/A", "Local/Regional", "National/International"],
  },
];

// ─── Navigation ───────────────────────────────────────────────
export const NAV_STEPS = [
  { key: "instructions", label: "Instructions" },
  { key: "general",      label: "General Information" },
  { key: "qual-1",       label: "Qualifications 1–5" },
  { key: "qual-2",       label: "Qualifications 6–10" },
  { key: "qual-3",       label: "Qualifications 11–14" },
];

export const PAGE_KEYS = ["instructions", "general", "qual-1", "qual-2", "qual-3"];
