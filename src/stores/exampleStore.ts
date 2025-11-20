import { create } from 'zustand';

interface ExampleState {
  count: number;
  user: {
    name: string;
    email: string;
  } | null;
  increase: () => void;
  decrease: () => void;
  setUser: (user: { name: string; email: string }) => void;
  clearUser: () => void;
}

export const useExampleStore = create<ExampleState>((set) => ({
  count: 0,
  user: null,
  increase: () => set((state) => ({ count: state.count + 1 })),
  decrease: () => set((state) => ({ count: state.count - 1 })),
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
