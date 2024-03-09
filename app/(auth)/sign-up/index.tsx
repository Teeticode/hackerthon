import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Box from "@/components/Globals/Box";
import MainText from "@/components2/Globals/MainText";
import { SafeAreaView } from "react-native-safe-area-context";
import Page from "@/components/Globals/Page";
import {
  Directions,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import { router } from "expo-router";
import SignUpMainContainer from "@/Screens/auth/signup/SignUpMainContainer";

type Props = {};

const SignUp = (props: Props) => {
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
        <SignUpMainContainer />
      </Page>
    </GestureDetector>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
