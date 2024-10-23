import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ICandidateSelection {
  candidatesList: number[]; // helper IDs
  changeCandidatesList: (list: number[]) => void;
  isReadyToSend: boolean;
  setIsReadyToSend: (isReady: boolean) => void;
}

const useCandidateSelection = create<ICandidateSelection>()(
  devtools(
    (set) => ({
      candidatesList: [],
      changeCandidatesList: (list: number[]) => set((_) => ({ candidatesList: list })),
      isReadyToSend: false,
      setIsReadyToSend: (isReady: boolean) => set((_) => ({ isReadyToSend: isReady })),
    }),
    {
      name: 'candidate-selection-storage',
    }
  )
);

export { useCandidateSelection };
