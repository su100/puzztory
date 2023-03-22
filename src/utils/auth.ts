import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
  accessToken: string;
  isLoggedIn: boolean;
  login: (accessToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<State>()(
  persist(
    (set, get) => ({
      accessToken: '',
      isLoggedIn: false,
      login: (accessToken: string) =>
        set((s) => ({ ...s, accessToken, isLoggedIn: true })),
      logout: () => set((s) => ({ ...s, accessToken: '', isLoggedIn: false })),
    }),
    {
      name: 'AuthStorage',
    },
  ),
);
