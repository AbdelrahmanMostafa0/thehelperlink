import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// types
import { IUser } from '@src/@types/user';

interface UserState {
  userState: IUser | null;
  changeUserState: (userInfo: IUser) => void;
  logoutUser: () => void;
}

const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        userState: null,
        changeUserState: (userInfo: IUser) => set((state) => ({ userState: userInfo })),
        logoutUser: () => set((state) => ({ userState: null })),
      }),
      {
        name: 'user-storage',
      }
    )
  )
);

export { useUserStore };
