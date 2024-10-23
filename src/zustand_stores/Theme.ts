import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export type ThemeState = {
  showWelcomePage: boolean;
  setShowWelcomePage: (arg: boolean) => void;
};

const useThemeStore = create<ThemeState>()((set) => ({
  showWelcomePage: true,
  setShowWelcomePage: (arg: boolean) => set(() => ({ showWelcomePage: arg })),
}));

export { useThemeStore };
