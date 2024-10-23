import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// types
import { IQuiz } from '@src/@types/quiz';

interface QuizState {
  quizesList: IQuiz[];
  setQuizesList: (list: IQuiz[]) => void;
  stage: number;
  incrementStage: () => void;
  decrementStage: () => void;
  resetStage: () => void;
  isSubmitted: boolean;
  setIsSubmitted: (val: boolean) => void;
}

const useQuizesStore = create<QuizState>()(
  devtools(
    persist(
      (set) => ({
        quizesList: [],
        setQuizesList: (list: IQuiz[]) => set((state) => ({ quizesList: list })),
        stage: 0,
        incrementStage: () => set((state) => ({ stage: state.stage + 1 })),
        decrementStage: () => set((state) => ({ stage: state.stage - 1 })),
        resetStage: () => set((_) => ({ stage: 0 })),
        isSubmitted: false,
        setIsSubmitted: (val: boolean) => set((_) => ({ isSubmitted: val })),
      }),
      {
        name: 'quiz-storage',
      }
    )
  )
);

export { useQuizesStore };
