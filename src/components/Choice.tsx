import React from "react";
import { ChoiceInterface } from "../Interface/interface";

export default function Choice({
  choices,
  isAnswerd,
  handleAnswer,
  selectedChoice,
}: ChoiceInterface) {
  return (
    <div className="flex flex-wrap justify-center sm:justify-between mt-5">
      {choices.map((choice, index) => {
        return (
          <div
            key={index}
            onClick={() => {
              if (!isAnswerd) {
                handleAnswer(choice);
              }
            }}
            className={`${
              isAnswerd ? "cursor-not-allowed" : "cursor-pointer"
            } text-center w-[70%] px-2 py-1 sm:w-[48%] sm:px-5 text-xs sm:text-base sm:py-2 mb-2 sm:mb-4 rounded-md 
                  ${
                    isAnswerd && selectedChoice === choice
                      ? "bg-black text-white"
                      : isAnswerd && selectedChoice !== choice
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
