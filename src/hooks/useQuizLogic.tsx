import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import questions from "../data/questions.json";
import { currentQuestionInterface } from "@/Interface/interface";
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

  const [questionProgress, setQuestionProgress] =
    useState<QuestionProgressInterface>({
      currentQuestionCount: 1,
      totalQuestion: 0,
    });
  const [quizStatus, setQuizStatus] = useState<QuizStatusInterface>({
    isAnswered: false,
    isShowingResult: false,
  });
  const [currentQuestion, setCurrentQuestion] = useState<currentQuestionInterface>({
    category: "",
    type: "",
    difficulty: "",
    question: "",
    correctAnswer: "",
    incorrectAnswers: [],
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
        if (questionProgress.currentQuestionCount === questionProgress.totalQuestion) {
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
  }, [questionProgress.currentQuestionCount, questionProgress.totalQuestion]);

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
        currentQuestionCount: 1,
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
      (questionProgress.currentQuestionCount / formatedQuestions.length) * 100
    );
  };

  const handleAnswer = (choice: string) => {
    setSelectedChoice(choice);
    if (currentQuestion.correctAnswer === choice) {
      setCorrected(corrected + 1);
      setAnswerFlag("Correct!");
      setScoreStats(() => {
        return {
          currentScore: Math.floor(((corrected + 1) / (attempted + 1)) * 100),
          maxScore: Math.floor(
            ((corrected + 1 + (questionProgress.totalQuestion - (attempted + 1))) /
              questionProgress.totalQuestion) *
              100
          ),
          minScore: Math.floor(
            ((corrected + 1) / questionProgress.totalQuestion) * 100
          ),
        };
      });
    } else {
      setAnswerFlag("Sorry!");
      setScoreStats(() => {
        return {
          currentScore: Math.floor((corrected / (attempted + 1)) * 100),
          maxScore: Math.floor(
            ((corrected + (questionProgress.totalQuestion - (attempted + 1))) /
              questionProgress.totalQuestion) *
              100
          ),
          minScore: Math.floor((corrected / questionProgress.totalQuestion) * 100),
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
      correctAnswer: decodeText(q.correct_answer),
      incorrectAnswers: q.incorrect_answers.map(decodeText),
    };
  });

  const handleNextQ = () => {
    setProgress(
      ((questionProgress.currentQuestionCount + 1) / questionProgress.totalQuestion) * 100
    );
    setQuizStatus((prev) => {
      return { ...prev, isAnswered: false };
    });
    setAnswerFlag("");
    setQuestionProgress((prev) => {
      return {
        ...prev,
        currentQuestionCount: prev.currentQuestionCount + 1,
      };
    });
  };

  useEffect(() => {
    setQuestionProgress((prev) => {
      return {
        ...prev,
        totalQuestion: formatedQuestions.length,
      };
    });
    setProgress(
      (questionProgress.currentQuestionCount / formatedQuestions.length) * 100
    );

    setScoreStats((prev) => {
      return {
        ...prev,
        maxScore: 100,
      };
    });
  }, []);

  useEffect(() => {
    setCurrentQuestion(formatedQuestions[questionProgress.currentQuestionCount - 1]);
    const incChoices: string[] = [
      ...formatedQuestions[questionProgress.currentQuestionCount - 1]
        .incorrectAnswers,
    ];
    incChoices.push(
      formatedQuestions[questionProgress.currentQuestionCount - 1].correctAnswer
    );
    const choices: string[] = incChoices;
    setChoices(choices);
  }, [questionProgress.currentQuestionCount]);

  return {
    corrected,
    currentQuestion,
    choices,
    selectedChoice,
    answerFlag,
    scoreStats,
    progress,
    quizStatus,
    questionProgress,
    handleAnswer,
    handleNextQ,
    handleStartQuiz,
    handleReStartQuiz,
    handleResult,
  };
}
