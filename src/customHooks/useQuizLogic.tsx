import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import questions from "../data/questions.json";
import { currentQInterface } from "@/Interface/interface";

export default function useQuizLogic() {
  const router = useRouter();
  const [isAnswerd, setIsAnswerd] = useState<boolean>(false);
  const [isShowingResult, setIsShowingResult] = useState<boolean>(false);
  const [totalQ, setTotalQ] = useState<number>(0);
  const [choices, setChoices] = useState<string[]>([]);
  const [currentQCount, setCurrentQCount] = useState<number>(1);
  const [progress, setProgress] = useState<number>(0);
  const [currentScore, setCurrentScore] = useState<number>(0);
  const [attempted, setAttempted] = useState<number>(0);
  const [corrected, setCorrected] = useState<number>(0);
  const [maxScore, setMaxScore] = useState<number>(0);
  const [minScore, setMinScore] = useState<number>(0);
  const [selectedChoice, setSelectedChoice] = useState<string>("");
  const [answerFlag, setAnswerFlag] = useState<string>("");
  const [currentQ, setCurrentQ] = useState<currentQInterface>({
    category: "",
    type: "",
    difficulty: "",
    question: "",
    correct_answer: "",
    incorrect_answers: [],
  });

  const decodeText = (text: string) => {
    return decodeURIComponent(text);
  };

  const handleResult = () => {
    setIsShowingResult(true);
  };

  const handleStartQuiz = (): void => {
    router.push("/");
  };

  const handleReStartQuiz = (): void => {
    setIsAnswerd(false);
    setCurrentQCount(1);
    setCurrentScore(0);
    setAttempted(0);
    setCorrected(0);
    setMinScore(0);
    setIsShowingResult(false);
    setProgress((currentQCount / formatedQuestions.length) * 100);
    setMaxScore(100);
  };

  const handleAnswer = (choice: string) => {
    setSelectedChoice(choice);
    if (currentQ.correct_answer === choice) {
      setCorrected(corrected + 1);
      setAnswerFlag("Correct!");
      setCurrentScore(Math.floor(((corrected + 1) / (attempted + 1)) * 100));
      setMaxScore(
        Math.floor(
          ((corrected + 1 + (totalQ - (attempted + 1))) / totalQ) * 100
        )
      );
      setMinScore(Math.floor(((corrected + 1) / totalQ) * 100));
    } else {
      setAnswerFlag("Sorry!");
      setCurrentScore(Math.floor((corrected / (attempted + 1)) * 100));
      setMaxScore(
        Math.floor(((corrected + (totalQ - (attempted + 1))) / totalQ) * 100)
      );
      setMinScore(Math.floor((corrected / totalQ) * 100));
    }

    setAttempted(attempted + 1);
    setIsAnswerd(true);
  };

  const formatedQuestions = questions.map((q) => {
    return {
      ...q,
      category: decodeText(q.category),
      question: decodeText(q.question),
      correct_answer: decodeText(q.correct_answer),
      incorrect_answers: q.incorrect_answers.map(decodeText),
    };
  });

  const handleNextQ = () => {
    setProgress(((currentQCount + 1) / totalQ) * 100);
    setIsAnswerd(false);
    setAnswerFlag("");
    setCurrentQCount(currentQCount + 1);
  };

  useEffect(() => {
    setTotalQ(formatedQuestions.length);
    setProgress((currentQCount / formatedQuestions.length) * 100);
    setMaxScore(100);
  }, []);

  useEffect(() => {
    setCurrentQ(formatedQuestions[currentQCount - 1]);
    const incChoices: string[] = [
      ...formatedQuestions[currentQCount - 1].incorrect_answers,
    ];
    incChoices.push(formatedQuestions[currentQCount - 1].correct_answer);
    const choices: string[] = incChoices;
    setChoices(choices);
  }, [currentQCount]);

  return {
    totalQ,
    corrected,
    currentQ,
    currentQCount,
    choices,
    selectedChoice,
    answerFlag,
    isAnswerd,
    isShowingResult,
    currentScore,
    maxScore,
    minScore,
    progress,
    handleAnswer,
    handleNextQ,
    handleStartQuiz,
    handleReStartQuiz,
    handleResult,
  };
}
