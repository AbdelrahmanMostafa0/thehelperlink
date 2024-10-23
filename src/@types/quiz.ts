export interface IQuiz {
  id: number;
  question: string;
  predefinedAnswers: string[];
  answers: {
    id?: number;
    answer: string;
  }[];
  localizations?: {
    id: number;
    question: string;
    predefinedAnswers: string[];
    locale: string;
  }[];
}
