import { Star } from "lucide-react";
import {StarIconInterface} from "./Interface/interface"


export const StarIcon = ({ className }: StarIconInterface) => (
    <Star className = { className ?? '' }/>
)