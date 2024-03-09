import { Platform, StyleSheet, Text, View, useColorScheme } from "react-native";
import React from "react";
import Box from "@/components/Globals/Box";
import { MYfonts } from "@/components2/Typography/Fonts";
import MainText from "@/components2/Globals/MainText";
import { moderateScale, verticalScale } from "react-native-size-matters";
import MainButton from "@/components/Globals/MainButton";
import { color } from "@rneui/base";
import Colors from "@/constants/Colors";

type Props = {
  title: string;
  description: string;
  Icon: React.ReactElement;
  onPress?: () => void;
};

const ReusableOnboarding = ({ title, description, Icon, onPress }: Props) => {
  const colorScheme = useColorScheme();
  return (
    <Box align="center" pa={moderateScale(10)} height={"80%"} width={"100%"}>
      <Box position="absolute" top={verticalScale(20)}>
        {Icon}
      </Box>
      <Box position="absolute" bottom={verticalScale(120)}>
        <MainText
          letterSpacing={1.3}
          size={moderateScale(40)}
          fontFamily={MYfonts.Nunito_700Bold}
        >
          {title}
        </MainText>
        <MainText
          mt={verticalScale(20)}
          letterSpacing={0.5}
          fontFamily={MYfonts.Nunito_300Light}
        >
          {description}
        </MainText>
      </Box>
    </Box>
  );
};

export default ReusableOnboarding;

const styles = StyleSheet.create({});
