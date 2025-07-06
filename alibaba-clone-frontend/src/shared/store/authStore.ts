import { AuthResponseDto } from "../models/authentication/AuthResponseDto";
import { create } from "zustand";

interface User {
  phoneNumber: string;
  roles: string[];
}

interface AuthSate {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
  login: (response: AuthResponseDto) => void;
  logout: () => void;
  setToken: (token: string) => void;
}

export const useAuthStore = create<AuthSate>((set) => ({
  isLoggedIn: false,
  user: null,
  token: null,

  login: (response) =>
    set(() => ({
      token: response.token,
      user: {
        phoneNumber: response.phoneNumber,
        roles: response.roles,
      },
      isLoggedIn: true,
    })),

  logout: () =>
    set(() => ({
      token: null,
      user: null,
      isLoggedIn: false,
    })),

  setToken: (token) =>
    set((state) => ({
      token: token,
      isLoggedIn: !!token,
      user: state.user,
    })),
}));
