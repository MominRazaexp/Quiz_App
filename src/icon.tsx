import { Star } from "lucide-react";
import { StarIconInterface } from "./Interface/interface";

export const StarIcon = ({ className }: StarIconInterface): JSX.Element => (
  <Star className={`${className ?? "text-gray-500 fill-gray-500"}`} />
);
