import { create } from "zustand";

type UserState = {
  token: string
  userEmail: string
  login: (token: string, userEmail: string) => void
  logout: () => void
}

export const useUserStore = create<UserState>()((set) => ({
  token: "",
  userEmail: "",
  login: (token: string, userEmail: string) => set({ token, userEmail }),
  logout: () => set({ token: "", userEmail: "" }),
}))
