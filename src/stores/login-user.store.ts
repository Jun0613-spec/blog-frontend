import { create } from "zustand";

export default interface User {
  email: string;
  userName: string;
  profileImage: string | null;
}

interface LoginUserStore {
  loginUser: User | null;
  setLoginUser: (loginUser: User) => void;
  resetLoginUser: () => void;
  updateLoginUser: (update: User) => void;
}

export const useLoginUserStore = create<LoginUserStore>((set) => ({
  loginUser: null,
  setLoginUser: (loginUser) => set((state) => ({ ...state, loginUser })),
  resetLoginUser: () => set((state) => ({ ...state, loginUser: null })),
  updateLoginUser: (update) =>
    set((state) => ({
      ...state,
      loginUser: state.loginUser ? { ...state.loginUser, ...update } : null,
    })),
}));
