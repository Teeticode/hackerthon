import React from "react";
import { BlurView } from "expo-blur";
import { ScreenHeight, ScreenWidth } from "@rneui/base";
import { Card, Overlay } from "@rneui/themed";
import Loader from "./Loader";
import { StyleSheet } from "react-native";
import { scale } from "../../constants/Scaler";
import P1 from "../Typography/P1";
type Props = {
  open: boolean;
  description?: string;
};

const LoaderOverlay = (props: Props) => {
  return (
    <Overlay
      isVisible={props.open}
      overlayStyle={{
        backgroundColor: "transparent",
      }}
    >
      <BlurView style={styles.blurView} tint="default" intensity={20}>
        <Loader size={70} />
      </BlurView>
    </Overlay>
  );
};

export default LoaderOverlay;
const styles = StyleSheet.create({
  card: {
    borderRadius: scale(20),
    height: scale(300),
    width: scale(300),
    alignItems: "center",
    justifyContent: "center",
  },
  blurView: {
    width: ScreenWidth,
    height: ScreenHeight,
    justifyContent: "center",
    alignItems: "center",
  },
});
