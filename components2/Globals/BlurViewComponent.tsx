import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import { ScreenHeight, ScreenWidth } from "@rneui/base";

type Props = {};

const BlurViewComponent = (props: Props) => {
  return <BlurView style={styles.blurView} tint="default" intensity={20} />;
};

export default BlurViewComponent;

const styles = StyleSheet.create({
  blurView: {
    width: ScreenWidth,
    height: ScreenHeight,
    justifyContent: "center",
    alignItems: "center",
  },
});
