import { StyleSheet, Text, View, useColorScheme } from "react-native";
import React, { ReactNode } from "react";
import { Overlay } from "@rneui/themed";
import Box from "./Box";
import MainText from "./MainText";
import { BlurView } from "expo-blur";
import { ScreenHeight, ScreenWidth, color } from "@rneui/base";
import Colors from "@/constants/Colors";
import { moderateScale } from "react-native-size-matters";
import MainButton from "@/components2/Globals/MainButton";
import MainIcon from "./MainIcon";

type Props = {
  height: any;
  width: any;
  children: ReactNode;
  visible: boolean;
  setVisible?: any;
  backDrop: boolean;
};

const HackerthonModal = ({
  width,
  height,
  children,
  visible,
  setVisible,
  backDrop,
}: Props) => {
  const colorScheme = useColorScheme();
  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={() => {
        setVisible(false);
        console.log("back");
      }}
      overlayStyle={{ backgroundColor: "transparent" }}
    >
      <BlurView
        style={styles.blurView}
        tint="dark"
        intensity={50} // has to be hex with opacity
      >
        <Box
          color={
            colorScheme === "dark" ? Colors.theme.modalBgDark : "lightgray"
          }
          width={width}
          height={height}
          radius={10}
          align="center"
          pa={moderateScale(20)}
        >
          <Box position="absolute" right={0} pa={moderateScale(10)}>
            <MainButton onPress={() => setVisible(false)} color="transparent">
              <MainIcon
                source="AntDesign"
                size={moderateScale(20)}
                name="closecircle"
              />
            </MainButton>
          </Box>
          {children}
        </Box>
      </BlurView>
    </Overlay>
  );
};

export default HackerthonModal;

const styles = StyleSheet.create({
  blurView: {
    width: ScreenWidth,
    height: ScreenHeight,
    justifyContent: "center",
    alignItems: "center",
  },
});
