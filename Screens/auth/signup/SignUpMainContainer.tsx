import { StyleSheet, Text, View, useColorScheme } from "react-native";
import React, { useState } from "react";
import Box from "@/components/Globals/Box";
import MainText from "@/components2/Globals/MainText";
import { MYfonts } from "@/components2/Typography/Fonts";
import { moderateScale, verticalScale } from "react-native-size-matters";
import KeyboardBox from "@/components/Globals/KeyboardBox";
import HackerthonInput from "@/components2/Globals/HackerthonInput";
import MainIcon from "@/components/Globals/MainIcon";
import MainButton from "@/components/Globals/MainButton";
import Colors from "@/constants/Colors";
import Animated, {
  FadeInLeft,
  FadeInRight,
  FadeInUp,
} from "react-native-reanimated";
import StudentInputs from "./components/StudentInputs";
import LecturerInputs from "./components/LecturerInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { router } from "expo-router";
type Props = {};

const SignUpMainContainer = (props: Props) => {
  const [tab, setTab] = useState(0);
  const colorScheme = useColorScheme();
  return (
    <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
      <Animated.View entering={FadeInLeft}>
        <Box pa={moderateScale(10)}>
          <Box width={"100%"} mt={verticalScale(40)}>
            <MainText
              fontFamily={MYfonts.Nunito_800ExtraBold}
              size={moderateScale(30)}
              align="center"
            >
              Create Your Account
            </MainText>
          </Box>
          <Box
            align="center"
            mt={verticalScale(40)}
            direction="row"
            justify="space-evenly"
          >
            <MainButton
              color={tab === 0 ? Colors.theme.primary : "transparent"}
              pa={moderateScale(8)}
              width={"40%"}
              onPress={() => {
                setTab(0);
              }}
            >
              <MainText fontFamily={MYfonts.Nunito_400Regular}>
                Student
              </MainText>
            </MainButton>
            <MainButton
              color={tab === 1 ? Colors.theme.primary : "transparent"}
              pa={moderateScale(8)}
              width={"40%"}
              onPress={() => {
                setTab(1);
              }}
            >
              <MainText>Lecturer</MainText>
            </MainButton>
          </Box>
          <Box mt={verticalScale(20)}>
            {tab === 0 ? (
              <Animated.View entering={FadeInLeft} key={tab}>
                <StudentInputs />
              </Animated.View>
            ) : (
              <Animated.View entering={FadeInRight} key={tab}>
                <LecturerInputs />
              </Animated.View>
            )}
          </Box>
          <MainButton
            radius={moderateScale(10)}
            mt={verticalScale(18)}
            pa={moderateScale(18)}
          >
            <MainText
              color={colorScheme === "dark" ? Colors.dark.text : "white"}
              fontFamily={MYfonts.Nunito_700Bold}
            >
              Register
            </MainText>
          </MainButton>
          <Box align="center" justify="center" mt={verticalScale(10)}>
            <MainButton
              onPress={() => router.push("/(auth)/sign-in/")}
              color="transparent"
            >
              <MainText fontFamily={MYfonts.Nunito_300Light}>
                Already Have an Account?{" "}
                <MainText
                  fontFamily={MYfonts.Nunito_700Bold}
                  color={Colors.theme.primary}
                >
                  Sign In
                </MainText>
              </MainText>
            </MainButton>
          </Box>
        </Box>
      </Animated.View>
    </KeyboardAwareScrollView>
  );
};

export default SignUpMainContainer;

const styles = StyleSheet.create({});
