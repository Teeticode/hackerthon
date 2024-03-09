import AsyncStorage from "expo-secure-store";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandStorage } from "../utils/Storage";

// // TODO: Add user type
// type User = LoginSuccessResponse["data"];

interface UserStore {
  onboarded: boolean;
  setOnboarded: (onboarded: boolean) => void;
  user: any

  accessTipsActivated?: boolean;
  setAccessTipsActivated?: (accessTipsActivated: boolean) => void;
  canAccessDashboard: boolean;
  biometricsDetails: {
    isBiometricAvailable: boolean;
    biometricType: "Face ID" | "Touch ID";
  } | null;
  setBiometricsDetails: (biometricsDetails: {
    isBiometricAvailable: boolean;
    biometricType: string | number;
  }) => void;
  hasEnabledBiometrics: boolean;
  setHasEnabledBiometrics: (hasEnabledBiometrics: boolean) => void;
  setCanAccessDashboard: (canAccessDashboard: boolean) => void;
  setUserUser: (user: any) => void;
  getUser: () => any;
  tokens: {
    accessToken: string;
    refreshToken: string;
  } | null;
  setTokens: ({
    accessToken,
    refreshToken,
  }: {
    accessToken: string;
    refreshToken: string;
  }) => void;
  getTokens: () => { accessToken: string; refreshToken: string };
  logout: () => void;
}

export const userStore = create(
  persist<UserStore>(
    (set, get) => ({
      canAccessDashboard: false,
      setCanAccessDashboard: (canAccessDashboard: boolean) => {
        set({ canAccessDashboard });
      },
      onboarded: false,
      setOnboarded: (onboarded: boolean) => {
        set({ onboarded });
      },
      user: null,
      setUserUser: (user: any) => {
        set({ user: user });
      },
      getUser: () => {
        return get().user as any;
      },
      tokens: null,
      setTokens: ({ accessToken, refreshToken }) => {
        set({ tokens: { accessToken, refreshToken } });
      },
      getTokens: () => {
        return get().tokens as { accessToken: string; refreshToken: string };
      },
      accessTipsActivated: false,
      hasEnabledBiometrics: false,
      biometricsDetails: null,
      setBiometricsDetails(biometricsDetails) {
        set({ biometricsDetails });
      },
      setHasEnabledBiometrics: (hasEnabledBiometrics: boolean) => {
        set({ hasEnabledBiometrics });
      },
      setAccessTipsActivated: (accessTipsActivated: boolean) => {
        set({ accessTipsActivated });
      },
      logout: () => {
        set({ tokens: null, user: null });
      },
    }),
    {
      name: "user",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);

export default userStore;