import React from "react";
import { ButtonInterface } from "@/Interface/interface";


export default function Button({ btnName, btnAction }: ButtonInterface) {
  return (
    <button
      onClick={btnAction}
      className=" text-sm sm:text-lg bg-blue-500 text-white rounded-md px-2 py-1"
    >
      {btnName}
    </button>
  );
}
