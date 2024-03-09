import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Page from "@/components/Globals/Page";
import SignInMainContainer from "@/Screens/auth/signin/SignInMainContainer";
import {
  Directions,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import { router } from "expo-router";
import { runOnJS } from "react-native-reanimated";

type Props = {};

const SignIn = (props: Props) => {
  const handleBack = () => {
    router.back();
  };

  const swipeBack = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onEnd((e) => {
      runOnJS(handleBack)();
    });

  return (
    <GestureDetector gesture={swipeBack}>
      <Page headerComponent={true}>
        <SignInMainContainer />
      </Page>
    </GestureDetector>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
