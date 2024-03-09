import {
  ColorSchemeName,
  Platform,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from "react-native";
import React, { useState } from "react";
import Box from "@/components/Globals/Box";
import MainText from "@/components2/Globals/MainText";
import { SafeAreaView } from "react-native-safe-area-context";
import ReusableOnboarding from "@/Screens/auth/ReusableOnboarding";
import { ScreenHeight, ScreenWidth, color } from "@rneui/base";
import MainIcon from "@/components/Globals/MainIcon";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { router } from "expo-router";
import MainButton from "@/components/Globals/MainButton";
import { MYfonts } from "@/components2/Typography/Fonts";
import Colors from "@/constants/Colors";
import {
  Directions,
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  BounceInRight,
  BounceOutLeft,
  FadeIn,
  FadeOut,
  runOnJS,
} from "react-native-reanimated";

type Props = {};
const onboarding = [
  {
    title: "Track All Your Classes Easily",
    description: "know what unit your doing, the location and a time",
    icon: (
      <MainIcon
        size={moderateScale(100)}
        source="MaterialIcons"
        name="manage-history"
        color="#FF6369"
      />
    ),
  },
  {
    title: "Get All Your Resources At One Place",
    description:
      "Never lose your learning material, just log in easily and download for later",
    icon: (
      <MainIcon
        size={moderateScale(100)}
        source="FontAwesome5"
        name="tools"
        color="#FF6369"
      />
    ),
  },
  {
    title: "Enjoy School Life, With Comrade App",
    description: "We provide more services for the student to benefit from",
    icon: (
      <MainIcon
        size={moderateScale(100)}
        source="MaterialCommunityIcons"
        name="party-popper"
        color="#FF6369"
      />
    ),
  },
];
const Onboarding = (props: Props) => {
  const colorScheme = useColorScheme();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex === onboarding?.length - 1) {
      router.push("/(auth)/sign-in/");
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };
  const onBack = () => {
    const isFirstScreen = currentIndex === 0;
    if (isFirstScreen) {
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };
  const fling = Gesture.Fling()
    .direction(Directions.LEFT)

    .onEnd((event) => {
      runOnJS(handleNext)();
    });
  const swipeBack = Gesture.Fling()
    .direction(Directions.RIGHT)

    .onEnd((event) => {
      runOnJS(onBack)();
    });
  const swipes = Gesture.Simultaneous(swipeBack, fling);
  return (
    <>
      <GestureHandlerRootView>
        <GestureDetector gesture={swipes}>
          <Box
            width={ScreenWidth}
            pa={moderateScale(5)}
            height={ScreenHeight}
            py={verticalScale(50)}
          >
            <StepIndicator
              currentIndex={currentIndex}
              colorScheme={colorScheme}
            />
            <Animated.View key={currentIndex} entering={BounceInRight}>
              <Box
                align="center"
                justify="center"
                width={ScreenWidth}
                height={ScreenHeight}
              >
                <ReusableOnboarding
                  Icon={onboarding[currentIndex].icon}
                  title={onboarding[currentIndex].title}
                  description={onboarding[currentIndex].description}
                />
              </Box>
            </Animated.View>
            <Box
              bottom={20}
              width={"100%"}
              position="absolute"
              direction="row"
              align="center"
              pa={moderateScale(5)}
              justify="space-between"
            >
              {onboarding?.length - 1 === currentIndex ? (
                <></>
              ) : (
                <MainButton
                  onPress={() => {
                    router.push("/(auth)/sign-in/");
                  }}
                  width={"20%"}
                  color="transparent"
                >
                  <MainText fontFamily={MYfonts.Nunito_700Bold}>Skip</MainText>
                </MainButton>
              )}
              <MainButton
                width={onboarding?.length - 1 !== currentIndex ? "70%" : "100%"}
                color={colorScheme === "dark" ? "#302E38" : "lightgray"}
                // borderWidth={moderateScale(2)}
                // borderColor={Colors.theme.primary}
                onPress={handleNext}
                pa={moderateScale(5)}
                radius={moderateScale(60)}
                height={verticalScale(50)}
              >
                <MainText fontFamily={MYfonts.Nunito_700Bold}>
                  {onboarding?.length - 1 !== currentIndex
                    ? "Next"
                    : "Continue"}
                </MainText>
              </MainButton>
            </Box>
          </Box>
        </GestureDetector>
      </GestureHandlerRootView>
    </>
  );
};

export default Onboarding;

const styles = StyleSheet.create({});

type stepProps = {
  colorScheme: ColorSchemeName;
  currentIndex: number;
};
const StepIndicator = ({ colorScheme, currentIndex }: stepProps) => {
  return (
    <Box direction="row" width={"100%"} pa={moderateScale(4)}>
      {onboarding.map((step, index) => (
        <Box
          color={index === currentIndex ? "#FF6369" : "lightgray"}
          width={"30%"}
          height={verticalScale(6)}
          ma={moderateScale(5)}
          key={index}
          radius={moderateScale(4)}
        />
      ))}

      {/* <Box
        color={colorScheme === "dark" ? "white" : "lightgray"}
        width={"30%"}
        height={verticalScale(8)}
        ma={moderateScale(5)}
      /> */}
    </Box>
  );
};
