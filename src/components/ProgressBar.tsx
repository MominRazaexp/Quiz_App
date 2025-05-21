import React from "react";
import { ProgressInterface } from "@/Interface/interface";

export default function ProgressBar({
  currentScore,
  maxScore,
  minScore,
}: ProgressInterface) {
  return (
    <div className="mt-6 sm:mt-16 flex flex-col">
      <div className="flex justify-between">
        <div>Score:{currentScore}%</div>
        <div>Max Score:{maxScore}%</div>
      </div>
      <div className="relative border-black border-2 rounded-md h-5 sm:h-10 overflow-hidden">
        <div
          style={{ width: `${minScore}%` }}
          className="z-30 absolute  h-full bg-black"
        ></div>
        <div
          style={{ width: `${currentScore}%` }}
          className="z-20 absolute  h-full bg-gray-500"
        ></div>
        <div
          style={{ width: `${maxScore}%` }}
          className="absolude h-full bg-gray-300"
        ></div>
      </div>
    </div>
  );
}
