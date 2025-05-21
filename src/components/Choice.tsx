import React from 'react'

type ChoiceProps = {
 choices: string[];
 isAnswerd: boolean;
 selectedChoice:string;
  handleAnswer : (value:string) => void;
};

export default function Choice({choices ,isAnswerd , handleAnswer , selectedChoice}:ChoiceProps) {
  return (
    <div className="flex flex-wrap justify-between mt-5">
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
                        } text-center w-[48%] px-5 py-2 mb-4 rounded-md 
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
  )
}
