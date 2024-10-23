import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface INotification {
  shouldUpdate: boolean;
  setShouldUpdate: (shouldUpdate: boolean) => void;
}

const useNotification = create<INotification>()(
  devtools(
    (set) => ({
      shouldUpdate: false,
      setShouldUpdate: (shouldUpdate: boolean) => set((state) => ({ shouldUpdate: shouldUpdate })),
    }),
    {
      name: 'notification-storage',
    }
  )
);

export { useNotification };
