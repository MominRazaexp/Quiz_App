import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import questions from "../data/questions.json";
import { currentQInterface } from "@/Interface/interface";
import {
  QuizStatusInterface,
  QuestionProgressInterface,
  ScoreStatsInterface,
} from "../Interface/interface";

export default function useQuizLogic() {
  const router = useRouter();
  const [choices, setChoices] = useState<string[]>([]);
  const [progress, setProgress] = useState<number>(0);
  const [attempted, setAttempted] = useState<number>(0);
  const [corrected, setCorrected] = useState<number>(0);
  const [selectedChoice, setSelectedChoice] = useState<string>("");
  const [answerFlag, setAnswerFlag] = useState<string>("");
  const isAnsweredRef = useRef(false);
  const [scoreStats, setScoreStats] = useState<ScoreStatsInterface>({
    currentScore: 0,
    maxScore: 0,
    minScore: 0,
  });
  const [QuestionProgress, setQuestionProgress] =
    useState<QuestionProgressInterface>({
      currentQCount: 1,
      totalQ: 0,
    });
  const [quizStatus, setQuizStatus] = useState<QuizStatusInterface>({
    isAnswered: false,
    isShowingResult: false,
  });
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
    setQuizStatus((prev) => {
      return { ...prev, isShowingResult: true };
    });
  };

  const handleStartQuiz = (): void => {
    router.push("/");
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && isAnsweredRef.current) {
        if (QuestionProgress.currentQCount === QuestionProgress.totalQ) {
          handleResult();
        } else {
          handleNextQ();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [QuestionProgress.currentQCount, QuestionProgress.totalQ]);

  useEffect(() => {
    isAnsweredRef.current = quizStatus.isAnswered;
  }, [quizStatus.isAnswered]);

  const handleReStartQuiz = (): void => {
    setQuizStatus((prev) => {
      return { ...prev, isAnswered: false };
    });
    setQuestionProgress((prev) => {
      return {
        ...prev,
        currentQCount: 1,
      };
    });
    setScoreStats(() => {
      return {
        currentScore: 0,
        minScore: 0,
        maxScore: 100,
      };
    });
    setAttempted(0);
    setCorrected(0);
    setQuizStatus((prev) => {
      return { ...prev, isShowingResult: false };
    });
    setProgress(
      (QuestionProgress.currentQCount / formatedQuestions.length) * 100
    );
  };

  const handleAnswer = (choice: string) => {
    setSelectedChoice(choice);
    if (currentQ.correct_answer === choice) {
      setCorrected(corrected + 1);
      setAnswerFlag("Correct!");
      setScoreStats(() => {
        return {
          currentScore: Math.floor(((corrected + 1) / (attempted + 1)) * 100),
          maxScore: Math.floor(
            ((corrected + 1 + (QuestionProgress.totalQ - (attempted + 1))) /
              QuestionProgress.totalQ) *
              100
          ),
          minScore: Math.floor(
            ((corrected + 1) / QuestionProgress.totalQ) * 100
          ),
        };
      });
    } else {
      setAnswerFlag("Sorry!");
      setScoreStats(() => {
        return {
          currentScore: Math.floor((corrected / (attempted + 1)) * 100),
          maxScore: Math.floor(
            ((corrected + (QuestionProgress.totalQ - (attempted + 1))) /
              QuestionProgress.totalQ) *
              100
          ),
          minScore: Math.floor((corrected / QuestionProgress.totalQ) * 100),
        };
      });
    }

    setAttempted(attempted + 1);
    setQuizStatus((prev) => {
      return { ...prev, isAnswered: true };
    });
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
    setProgress(
      ((QuestionProgress.currentQCount + 1) / QuestionProgress.totalQ) * 100
    );
    setQuizStatus((prev) => {
      return { ...prev, isAnswered: false };
    });
    setAnswerFlag("");
    setQuestionProgress((prev) => {
      return {
        ...prev,
        currentQCount: prev.currentQCount + 1,
      };
    });
  };

  useEffect(() => {
    setQuestionProgress((prev) => {
      return {
        ...prev,
        totalQ: formatedQuestions.length,
      };
    });
    setProgress(
      (QuestionProgress.currentQCount / formatedQuestions.length) * 100
    );

    setScoreStats((prev) => {
      return {
        ...prev,
        maxScore: 100,
      };
    });
  }, []);

  useEffect(() => {
    setCurrentQ(formatedQuestions[QuestionProgress.currentQCount - 1]);
    const incChoices: string[] = [
      ...formatedQuestions[QuestionProgress.currentQCount - 1]
        .incorrect_answers,
    ];
    incChoices.push(
      formatedQuestions[QuestionProgress.currentQCount - 1].correct_answer
    );
    const choices: string[] = incChoices;
    setChoices(choices);
  }, [QuestionProgress.currentQCount]);

  return {
    corrected,
    currentQ,
    choices,
    selectedChoice,
    answerFlag,
    scoreStats,
    progress,
    quizStatus,
    QuestionProgress,
    handleAnswer,
    handleNextQ,
    handleStartQuiz,
    handleReStartQuiz,
    handleResult,
  };
}
