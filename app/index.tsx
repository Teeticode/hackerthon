import checkBiometricHardware from "@/constants/functions/checkBiometricHardware";
import userStore from "@/store/user.store";
import { Redirect, router } from "expo-router";
import React, { useEffect } from "react";

/* 
    This route is used for authentication purposes.
    It is the first route that is rendered when the app is opened because it is the first index page in the app stack.
    The recommended way to perform authentication is at: https://docs.expo.dev/router/reference/authentication/ but there is a bug
    in that approach that is reported here: https://github.com/expo/expo/issues/26411 so we are using this approach instead.
*/

export default function AuthManager() {
  const { onboarded, user, canAccessDashboard, hasEnabledBiometrics } =
    userStore((state) => state);

  useEffect(() => {
    checkBiometricHardware();
  }, []);

  //   if (user && canAccessDashboard) {
  //     if (!hasEnabledBiometrics && !onboarded)
  //       return <Redirect href={"/auth/sign-in/biometrics-setup"} />;
  //     else return <Redirect href={"/protected-routes/dashboard/"} />;
  //   } else
  if (!onboarded) return <Redirect href={"/(auth)/onboarding/"} />;
  else return <Redirect href={"/(auth)/sign-in/"} />;
}
