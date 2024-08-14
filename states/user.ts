import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserState = {
  token: string
  userEmail: string
  login: (token: string, userEmail: string) => void
  logout: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
    token: "",
    userEmail: "",
    login: (token: string, userEmail: string) => set({ token, userEmail }),
    logout: () => set({ token: "", userEmail: "" }),
  }),
  { name: "user", getStorage: () => sessionStorage })
)
