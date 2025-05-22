import { Star } from "lucide-react";
import { StarIconInterface } from "./Interface/interface";

export const StarIcon = ({ className }: StarIconInterface): JSX.Element => (
  <Star
    className={`w-4 h-4 sm:w-6 sm:h-6 ${
      className ?? "text-gray-500 fill-gray-500"
    }`}
  />
);
