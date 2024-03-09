import { StyleSheet, Text, View, useColorScheme } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Box from "@/components/Globals/Box";
import MainText from "@/components2/Globals/MainText";
import { MYfonts } from "@/components2/Typography/Fonts";
import { moderateScale, verticalScale } from "react-native-size-matters";
import KeyboardBox from "@/components/Globals/KeyboardBox";
import HackerthonInput from "@/components2/Globals/HackerthonInput";
import MainIcon from "@/components/Globals/MainIcon";
import MainButton from "@/components/Globals/MainButton";
import Colors from "@/constants/Colors";
import OtpInputs from "react-native-otp-inputs";
import * as ExpoClipboard from "expo-clipboard";

import OTptextInput from "react-native-otp-textinput";
const Clipboard = {
  setString: ExpoClipboard.setStringAsync,
  getString: ExpoClipboard.getStringAsync,
};
import Animated, {
  FadeInLeft,
  FadeInRight,
  FadeInUp,
} from "react-native-reanimated";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SignInInputs from "./components/SignInInputs";
import { router, useFocusEffect } from "expo-router";
import HackerthonModal from "@/components/Globals/HackerthonModal";
import { ScreenWidth } from "@rneui/base";

type Props = {};

const SignInMainContainer = (props: Props) => {
  const [tab, setTab] = useState(0);
  const colorScheme = useColorScheme();
  const [time, setTime] = useState("20");
  const [visible, setVisble] = useState(true);
  useEffect(() => {
    let timer = 30;
    const timeCounter = setInterval(() => {
      timer = timer > 0 ? timer - 1 : 0;
      setTime(`${timer}`);
    }, 1000);
    if (timer <= 0) {
      clearInterval(timeCounter);
    }

    return () => clearInterval(timeCounter);
  }, []);
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
              Login To Your Account
            </MainText>
          </Box>

          <Box mt={verticalScale(20)}>
            <SignInInputs />
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
              Login
            </MainText>
          </MainButton>
          <Box align="center" justify="center" mt={verticalScale(10)}>
            <MainButton
              onPress={() => {
                router.push("/(auth)/sign-up/");
              }}
              color="transparent"
            >
              <MainText fontFamily={MYfonts.Nunito_300Light}>
                Dont Have an Account?{" "}
                <MainText
                  fontFamily={MYfonts.Nunito_700Bold}
                  color={Colors.theme.primary}
                >
                  Sign Up
                </MainText>
              </MainText>
            </MainButton>
          </Box>
          <HackerthonModal
            visible={visible}
            setVisible={setVisble}
            backDrop={true}
            width={"80%"}
            height={"55%"}
          >
            <Box align="center">
              <MainText
                size={moderateScale(20)}
                fontFamily={MYfonts.Nunito_700Bold}
              >
                Verify Email Address
              </MainText>
              <MainText
                align="center"
                size={moderateScale(13)}
                mt={moderateScale(10)}
                fontFamily={MYfonts.Nunito_200ExtraLight}
              >
                We Have Sent Code To Your Phone Number
              </MainText>
              <MainText
                size={moderateScale(15)}
                fontFamily={MYfonts.Nunito_300Light}
                mt={moderateScale(20)}
              >
                karani****@gmail.com
              </MainText>
              <Box mt={verticalScale(30)}>
                <OTptextInput
                  //   onCodeFilled={(text) =>
                  //     callApi(get_card_otp, "POST", {
                  //       data: { verification_code: text, card_id },
                  //     })
                  //   }
                  handleTextChange={(text: string) => {
                    // console.log(params);
                    if (text.length == 4) {
                      // submitOtpMutation.mutate(text);
                    }
                  }}
                  tintColor={Colors.theme.primary}
                  autoFocus
                  inputCount={4}
                  textInputStyle={{
                    width: 50,
                    height: 50,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: "lightgray",
                    color:
                      colorScheme === "dark"
                        ? Colors.dark.text
                        : Colors.light.text,
                    borderBottomWidth: 1,
                  }}
                  // containerStyle={styles.otp}
                  // textInputStyle={styles.otpInput}
                />
              </Box>
              <MainButton
                mt={verticalScale(30)}
                pa={moderateScale(10)}
                width={ScreenWidth * 0.6}
                radius={5}
              >
                <MainText
                  color={colorScheme === "dark" ? Colors.dark.text : "white"}
                >
                  Verify
                </MainText>
              </MainButton>
              <Box
                mt={verticalScale(10)}
                align="center"
                width={ScreenWidth * 7}
              >
                <MainText fontFamily={MYfonts.Nunito_500Medium}>
                  Didn't receive code?
                </MainText>
                <Box
                  direction="row"
                  justify="center"
                  align="center"
                  width={"100%"}
                  mt={verticalScale(5)}
                >
                  <MainButton align="center" color="transparent">
                    <MainText
                      color={
                        parseInt(time) === 0 ? Colors.theme.primary : "gray"
                      }
                      fontFamily={MYfonts.Nunito_700Bold}
                    >
                      Resend{" "}
                    </MainText>
                  </MainButton>
                  <MainText
                    fontFamily={MYfonts.Nunito_500Medium}
                    align="center"
                  >
                    in {parseInt(time) <= 10 ? `0${time}` : time}s
                  </MainText>
                </Box>
              </Box>
            </Box>
          </HackerthonModal>
        </Box>
      </Animated.View>
    </KeyboardAwareScrollView>
  );
};

export default SignInMainContainer;

const styles = StyleSheet.create({});
