import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import InstructionsPage from "./pages/Instructions";
import GeneralInformationPage from "./pages/GeneralInformation";
import QualificationQuestionsPage from "./pages/QualificationQuestions";
import ResultPage from "./pages/Result";
import { useAssessment } from "./hooks/useAssessment";

export default function App() {
  const {
    currentPage,
    currentKey,
    answers,
    status,
    totalPages,
    isLastPage,
    determinedTier,
    handleChangeAnswer,
    handleNext,
    handleBack,
    handleGoToPage,
    handleSubmit,
    handleReset,
  } = useAssessment();

  const hcpName =
    answers.q1 || answers.q2
      ? `${answers.q1 ?? ""} ${answers.q2 ?? ""}`.trim()
      : null;

  const sharedProps = {
    currentPage,
    totalPages,
    answers,
    onChangeAnswer: handleChangeAnswer,
    onNext: handleNext,
    onBack: handleBack,
  };

  function renderPage() {
    if (status === "processing" || status === "result") {
      return (
        <ResultPage
          status={status}
          determinedTier={determinedTier}
          onReset={handleReset}
        />
      );
    }

    switch (currentKey) {
      case "instructions":
        return <InstructionsPage {...sharedProps} />;

      case "general":
        return <GeneralInformationPage {...sharedProps} />;

      case "qual-1":
      case "qual-2":
      case "qual-3":
        return (
          <QualificationQuestionsPage
            {...sharedProps}
            currentKey={currentKey}
            isLastPage={isLastPage}
            onSubmit={handleSubmit}
          />
        );

      default:
        return null;
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar hcpName={hcpName} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          currentPage={currentPage}
          onGoToPage={handleGoToPage}
          status={status}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="min-h-full p-6 flex flex-col">
            <div className="max-w-4xl w-full mx-auto flex-1 flex flex-col">
              {renderPage()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
