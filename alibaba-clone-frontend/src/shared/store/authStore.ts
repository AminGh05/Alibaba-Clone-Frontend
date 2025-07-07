import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { AuthResponseDto } from "@/shared/models/authentication/AuthResponseDto";

interface AuthState {
  user: AuthResponseDto | null;
  login: (user: AuthResponseDto) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (user: AuthResponseDto) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: "auth-storage", // storage key in localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);
