"use client";
import Button from "@/components/Button";
import ResultCard from "@/components/ResultCard";
import Choice from "@/components/Choice";
import ProgressBar from "@/components/ProgressBar";
import useQuizLogic from "@/hooks/useQuizLogic";
import Rating from "@/components/Rating";
import Bar from "@/components/Bar";

export default function QuestionsView() {
 
  const {
    questionProgress,
    currentQuestion,
    corrected,
    choices,
    selectedChoice,
    answerFlag,
    quizStatus,
    scoreStats,
    progress,
    handleAnswer,
    handleNextQ,
    handleStartQuiz,
    handleReStartQuiz,
    handleResult,
  } = useQuizLogic();

  return (
    <div className="flex justify-center items-center w-full min-h-screen sm:px-4">
      {quizStatus.isShowingResult ? (
        <ResultCard
          totalQuestion={questionProgress.totalQuestion}
          corrected={corrected}
          handleReStartQuiz={handleReStartQuiz}
          handleStartQuiz={handleStartQuiz}
        />
      ) : (
        <div className="bg-white rounded-lg sm:px-4 sm:py-6 flex flex-col  text-black w-full max-w-3xl pb-4  sm:shadow-2xl sm:border-gray-200 sm:border-2">
          <Bar score={progress} className={'bg-gray-500 absolute top-0 sm:relative sm:mt-1  h-3'}/>
          
          <div className="flex flex-col px-4 sm:px-10">
            <h1 className="text-xl sm:text-2xl md:text-3xl  mt-10">{`Question
             ${questionProgress.currentQuestionCount} of ${questionProgress.totalQuestion}`}</h1>
            <span className=" text-gray-400">{currentQuestion.category}</span>
            <div className=" flex">
              <Rating difficulty={currentQuestion.difficulty} />
            </div>
            <span className="mt-10 text-base sm:text-xl">
              {currentQuestion.question}
            </span>

            <Choice
              choices={choices}
              isAnswered={quizStatus.isAnswered}
              handleAnswer={handleAnswer}
              selectedChoice={selectedChoice}
            />
            {quizStatus.isAnswered && (
              <h1 className="text-center text-base sm:text-2xl m-4 ">
                {answerFlag}
              </h1>
            )}
            {quizStatus.isAnswered &&
            questionProgress.currentQuestionCount === questionProgress.totalQuestion ? (
              <div className=" flex justify-center m-4  ">
                <Button btnAction={handleResult} btnName="See Result" />
              </div>
            ) : (
             
                quizStatus.isAnswered && (
                  <div className=" flex justify-center m-4 ">
                    <Button btnAction={handleNextQ} btnName="Next Question" />
                  </div>
                )
              
            )}
            <ProgressBar
              currentScore={scoreStats.currentScore}
              maxScore={scoreStats.maxScore}
              minScore={scoreStats.minScore}
            />
          </div>
        </div>
      )}
    </div>
  );
}
