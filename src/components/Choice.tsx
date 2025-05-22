import React, { useEffect, useState } from "react";
import { ChoiceInterface } from "../Interface/interface";

function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function Choice({
  choices,
  isAnswered,
  handleAnswer,
  selectedChoice,
}: ChoiceInterface) {
  const [shuffledChoices, setShuffledChoices] = useState<string[]>(
    shuffleArray(choices)
  );
  useEffect(() => {
    setShuffledChoices(shuffleArray(choices));
  }, [choices]);

  return (
    <div className="flex flex-wrap justify-center sm:justify-between mt-5">
      {shuffledChoices.map((choice, index) => {
        return (
          <div
            key={index}
            onClick={() => {
              if (!isAnswered) {
                handleAnswer(choice);
              }
            }}
            className={`${
              isAnswered ? "cursor-not-allowed" : "cursor-pointer"
            } text-center w-[70%] px-2 py-1 sm:w-[48%] sm:px-5 text-xs sm:text-base sm:py-2 mb-2 sm:mb-4 rounded-md 
              ${
                isAnswered && selectedChoice === choice
                  ? "bg-black text-white"
                  : isAnswered && selectedChoice !== choice
                  ? "opacity-50"
                  : "bg-gray-400"
              }
              border-black border-2 `}
          >
            {choice}
          </div>
        );
      })}
    </div>
  );
}
