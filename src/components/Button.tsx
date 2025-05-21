import React from "react";

type ButtonProps = {
  btnName: string;
  btnAction: () => void;
};

export default function Button({ btnName, btnAction }: ButtonProps) {
  return (
    <button
      onClick={btnAction}
      className=" text-lg bg-blue-500 text-white rounded-md px-2 py-1"
    >
      {btnName}
    </button>
  );
}
