import { createJSONStorage, persist, StateStorage } from 'zustand/middleware';
import { appStorage } from './storage';
import { create, StateCreator } from 'zustand';
import { User } from './user.type';

export type AuthState = {
  isAuthenticated: boolean;
  hasOnboarded: boolean;
};

export type UserState = {
  user: User | null;
};

export type AuthActions = {
  setIsAuthenticatedState: (isAuthenticated: boolean) => void;
  setOnboardState: (hasOnboarded: boolean) => void;
};

export type UserActions = {
  setUser: (user: User) => void;
  updateUser: (user: User) => void;
  removeUser: () => void;
};

const authStorage: StateStorage = {
  getItem: name => {
    const value = appStorage.getItem(name);
    return value ? JSON.parse(value) : 'false';
  },
  setItem: (name, value) => {
    appStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: name => {
    appStorage.removeItem(name);
  },
};

type CombinedState = AuthState & AuthActions & UserState & UserActions;

const initializer: StateCreator<CombinedState> = set => ({
  hasOnboarded: false,
  isAuthenticated: false,
  setOnboardState: (hasOnboarded: boolean) => set({ hasOnboarded }),
  setIsAuthenticatedState: (isAuthenticated: boolean) =>
    set({ isAuthenticated }),
  user: null,
  setUser: (user: User) => set({ user }),
  updateUser: (user: User) => set({ user }),
  removeUser: () => set({ user: null }),
});

const persistedAuthState = persist<CombinedState>(initializer, {
  name: 'commerce-auth',
  storage: createJSONStorage(() => authStorage),
});

export const useCommerceAuthState = create<
  CombinedState,
  [['zustand/persist', AuthState & AuthActions]]
>(persistedAuthState);
