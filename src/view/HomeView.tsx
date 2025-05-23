"use client";
import { ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import { useUser } from "@/context/userContext";

export default function HomeView() {
  
  const router = useRouter();
  const {name , setName} = useUser();

  const handleStartQuiz = (): void => {
    if (name.trim() === "") {
      alert("Please enter your name before starting the quiz.");
      return;
    }
    router.push("/questions");
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4 ">
      <div className="flex flex-col justify-center items-center w-full max-w-md p-6 rounded-lg drop-shadow-lg shadow-2xl border-gray-200 border-2">
        <h1 className="m-5 text-md sm:text-xl font-medium">
          Welcome to our Quiz App
        </h1>
        <input
          className="w-full p-2 rounded mb-6 placeholder-gray-500 text-gray-700 border-gray-200 border-2"
          type="text"
          placeholder="Enter Your Name"
          value={name}
          onChange={handleInputChange}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
              handleStartQuiz();
            }
          }}
        />
        <Button btnAction={handleStartQuiz} btnName="Start Quiz" />
      </div>
    </div>
  );
}
