import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { ScreenWidth } from "@rneui/base";

type Props = {};

const AnimatedSplashScreen = (props: Props) => {
  return (
    <ImageBackground
      style={styles.container}
      source={require("../../assets/images/splash.png")}
      resizeMode="cover"
    >
      <LottieView
        style={{
          width: "55%",
          height: "70%",
          alignSelf: "stretch",
        }}
        source={require("../../assets/animation/splash.json")}
        autoPlay
        loop
      />
    </ImageBackground>
  );
};

export default AnimatedSplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
