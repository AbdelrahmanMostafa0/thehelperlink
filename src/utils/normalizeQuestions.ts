import { IQuiz } from '@src/@types/quiz';

export const normalizeQuestions = (questions: IQuiz[], locale: string): IQuiz[] => {
  if (locale === 'en') return questions;
  return questions.map((question) => {
    const localizedQuestion = question.localizations?.find(
      (localization) => localization.locale === locale
    );
    return {
      ...question,
      question: localizedQuestion?.question || question.question,
      predefinedAnswers: localizedQuestion?.predefinedAnswers || question.predefinedAnswers,
    };
  });
};
