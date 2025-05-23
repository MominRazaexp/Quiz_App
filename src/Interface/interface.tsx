export interface currentQuestionInterface {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
}

export interface QuizStatusInterface {
  isAnswered: boolean;
  isShowingResult: boolean;
}

export interface QuestionProgressInterface {
  currentQuestionCount: number;
  totalQuestion: number;
}

export interface ScoreStatsInterface {
  currentScore: number;
  maxScore: number;
  minScore: number;
}

export interface StarIconInterface {
  className?: string;
}

export interface ButtonInterface {
  btnName: string;
  btnAction: () => void;
}

export interface ChoiceInterface extends Pick<QuizStatusInterface,"isAnswered"> {
  choices: string[];
  selectedChoice: string;
  handleAnswer: (value: string) => void;
}

export interface ResultInterface extends Pick<QuestionProgressInterface,'totalQuestion'> {
  corrected: number;
  handleReStartQuiz: () => void;
  handleStartQuiz: () => void;
}
export interface RatingInterface {
  difficulty: string;
}
export interface UserContextInterface {
  name: string;
  setName: (name: string) => void;
}

export interface BarInterface extends Pick<StarIconInterface,'className'> {
  score: number;    
}