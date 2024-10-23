//zustand
import { create } from 'zustand';

interface IUserType {
  userType: String;
  setUserType: (userType: String) => void;
}
export const userTypeStore = create<IUserType>((set) => ({
  userType: 'employer',
  setUserType: (userType) => set((state) => ({ ...state, userType })),
}));

export default userTypeStore;
