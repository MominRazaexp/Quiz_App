export interface currentQInterface {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface StarIconInterface {
  className?: string;
}

export interface QuizStatusInterface {
  isAnswered: boolean;
  isShowingResult: boolean;
}

export interface QuestionProgressInterface {
  currentQCount: number;
  totalQ: number;
}

export interface ScoreStatsInterface {
  currentScore: number;
  maxScore: number;
  minScore: number;
}

export interface RatingInterface {
  difficulty: string;
}

export interface ButtonInterface {
  btnName: string;
  btnAction: () => void;
}

export interface ChoiceInterface {
  choices: string[];
  isAnswered: boolean;
  selectedChoice: string;
  handleAnswer: (value: string) => void;
}

export interface ProgressInterface {
  currentScore: number;
  maxScore: number;
  minScore: number;
}

export interface ResultInterface {
  totalQ: number;
  corrected: number;
  handleReStartQuiz: () => void;
  handleStartQuiz: () => void;
}
