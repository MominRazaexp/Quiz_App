import React from "react";
import { ScoreStatsInterface } from "@/Interface/interface";
import Bar from "./Bar";

export default function ProgressBar({
  currentScore,
  maxScore,
  minScore,
}: ScoreStatsInterface) {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <div>Score:{currentScore}%</div>
        <div>Max Score:{maxScore}%</div>
      </div>
      <div className="relative border-black border-2 rounded-md h-5 sm:h-10 overflow-hidden">
        <Bar score={minScore} className={"z-30 absolute  h-full bg-black"} />
        <Bar
          score={currentScore}
          className={"z-20 absolute  h-full bg-gray-500"}
        />
        <Bar score={maxScore} className={"absolute h-full bg-gray-300"} />
      </div>
    </div>
  );
}
