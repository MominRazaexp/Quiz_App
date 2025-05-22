import React from "react";
import Button from "./Button";
import { ResultInterface } from "../Interface/interface";

export default function ResultCard({
  totalQ,
  corrected,
  handleReStartQuiz,
  handleStartQuiz,
}: ResultInterface) {
  return (
    <div className="px-4 py-4 bg-white rounded-lg  flex flex-col items-center  text-black  shadow-2xl border-gray-200 border-2">
      <h1 className=" text-sm sm:text-xl font-bold">Here is Your Score</h1>
      <span className="text-sm sm:text-lg mt-10">{`You have Corrected ${corrected} out of ${totalQ}`}</span>
      <span className="text-sm sm:text-lg mt-3">{`Percentage: ${(
        (corrected / totalQ) *
        100
      ).toFixed(0)}%`}</span>
      <div className="flex gap-3 justify-around mt-5 ">
        <Button btnAction={handleStartQuiz} btnName="Start New Quiz" />
        <Button btnAction={handleReStartQuiz} btnName="Restart Quiz" />
      </div>
    </div>
  );
}
