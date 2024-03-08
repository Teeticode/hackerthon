// secureStore.ts
import * as SecureStore from "expo-secure-store";

const ONBOARDING_KEY = "onboardingStatus";

export const setOnboardingStatus = async () => {
  try {
    await SecureStore.setItemAsync(ONBOARDING_KEY, "completed");
  } catch (error) {
    console.error("Error setting onboarding status:", error);
  }
};

export const getOnboardingStatus = async () => {
  try {
    const status = await SecureStore.getItemAsync(ONBOARDING_KEY);
    return status === "completed";
  } catch (error) {
    console.error("Error getting onboarding status:", error);
    return false;
  }
};
