import React from "react";
import { StarIcon } from "@/icon";
import { RatingInterface } from "../Interface/interface";

export default function Rating({ difficulty }: RatingInterface) {
  let filledCount: number;

  switch (difficulty) {
    case "easy":
      filledCount = 1;
      break;
    case "medium":
      filledCount = 2;
      break;
    case "hard":
      filledCount = 3;
      break;
    default:
      filledCount = 0;
  }

  return Array.from({ length: 3 }, (_, index) => (
    <StarIcon
      key={index}
      className={
        index < filledCount
          ? "w-3 h-3 sm:w-6 sm:h-6 text-black fill-black"
          : "w-3 h-3 sm:w-6 sm:h-6 text-gray-400 fill-gray-400"
      }
    />
  ));
}
