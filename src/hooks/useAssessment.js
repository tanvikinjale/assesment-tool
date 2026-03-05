import { useState, useMemo } from "react";
import { PAGE_KEYS } from "../data/formData";

export function useAssessment() {
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState({});
  const [status, setStatus] = useState("assessment"); // assessment | processing | result

  const totalPages = PAGE_KEYS.length;
  const currentKey = PAGE_KEYS[currentPage];
  const isLastPage = currentPage === totalPages - 1;

  const determinedTier = useMemo(() => "Determined Physician · HCP Tier II", []);

  const handleChangeAnswer = (id, value) =>
    setAnswers((prev) => ({ ...prev, [id]: value }));

  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage((p) => p + 1);
  };

  const handleBack = () => {
    if (currentPage > 0) setCurrentPage((p) => p - 1);
  };

  const handleGoToPage = (index) => setCurrentPage(index);

  const handleSubmit = () => {
    setStatus("processing");
    setTimeout(() => setStatus("result"), 1800);
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentPage(0);
    setStatus("assessment");
  };

  return {
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
  };
}
