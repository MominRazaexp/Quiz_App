"use client";
import { StarIcon } from "lucide-react";
import Button from "@/components/Button";
import ResultCard from "@/components/ResultCard";
import Choice from "@/components/Choice";
import ProgressBar from "@/components/ProgressBar";
import useQuizLogic from "@/customHooks/useQuizLogic";

export default function QuestionsView() {
  const {
    totalQ,
    currentQ,
    corrected,
    currentQCount,
    choices,
    selectedChoice,
    answerFlag,
    isAnswerd,
    isShowingResult,
    currentScore,
    maxScore,
    minScore,
    progress,
    handleAnswer,
    handleNextQ,
    handleStartQuiz,
    handleReStartQuiz,
    handleResult,
  } = useQuizLogic();


  return (
    <div className="flex justify-center items-center w-full min-h-screen sm:px-4">
      {isShowingResult ? (
        <ResultCard
          totalQ={totalQ}
          corrected={corrected}
          handleReStartQuiz={handleReStartQuiz}
          handleStartQuiz={handleStartQuiz}
        />
      ) : (
        <div className="bg-white rounded-lg sm:px-4 sm:py-6 flex flex-col  text-black w-full max-w-3xl pb-4  sm:shadow-2xl sm:border-gray-200 sm:border-2">
          <div
            style={{ width: `${progress}%` }}
            className={`bg-gray-500 absolute top-0 sm:relative sm:mt-1  h-3`}
          ></div>

          <div className="flex flex-col px-4 sm:px-10">
            <h1 className="text-xl sm:text-2xl md:text-3xl  mt-10">{`Question ${currentQCount} of ${totalQ}`}</h1>
            <span className=" text-gray-400">{currentQ.category}</span>
            <div className=" flex">
              <StarIcon className="w-4 h-4 sm:w-6 sm:h-6 text-black fill-black " />
              <StarIcon
                className={`w-4 h-4 sm:w-6 sm:h-6 ${
                  currentQ.difficulty === "medium" ||
                  currentQ.difficulty === "hard"
                    ? "text-black fill-black"
                    : "text-gray-500 fill-gray-500"
                }`}
              />
              <StarIcon
                className={`w-4 h-4 sm:w-6 sm:h-6 ${
                  currentQ.difficulty === "hard"
                    ? "text-black fill-black"
                    : "text-gray-500 fill-gray-500"
                }`}
              />
            </div>
            <span className="mt-10 text-base sm:text-xl">{currentQ.question}</span>

            <Choice
              choices={choices}
              isAnswerd={isAnswerd}
              handleAnswer={handleAnswer}
              selectedChoice={selectedChoice}
            />
            {isAnswerd && (
              <h1 className="text-center text-base sm:text-2xl m-3 sm:mt-10">{answerFlag}</h1>
            )}
            {isAnswerd && currentQCount === totalQ ? (
              <div className="mt-7 flex justify-center ">
                <Button btnAction={handleResult} btnName="See Result" />
              </div>
            ) : (
              <>
                {isAnswerd && (
                  <div className="sm:mt-7 flex justify-center ">
                    <Button btnAction={handleNextQ} btnName="Next Question" />
                  </div>
                )}
              </>
            )}
            <ProgressBar
              currentScore={currentScore}
              maxScore={maxScore}
              minScore={minScore}
            />
          </div>
        </div>
      )}
    </div>
  );
}
