import {
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from "react-native";
import React, { useState } from "react";
import { TextInputProps } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import Colors from "@/constants/Colors";
import { ScreenWidth, color } from "@rneui/base";
import { MYfonts } from "../Typography/Fonts";

import Box from "./Box";
import MainIcon from "@/components/Globals/MainIcon";
import MainButton from "@/components/Globals/MainButton";

interface inputProps extends TextInputProps {
  Icon?: React.ReactElement;
  password?: boolean;
}
type Props = {};

const HackerthonInput = ({ Icon, password, ...props }: inputProps) => {
  const colorScheme = useColorScheme();
  const [securePsd, setSecurePsd] = useState(false);
  const [focused, setFocused] = useState(false);
  return (
    <Box
      radius={moderateScale(10)}
      color={colorScheme === "dark" ? Colors.theme.input : "lightgray"}
      mt={verticalScale(10)}
      align="center"
      justify="space-between"
    >
      <Box
        align="center"
        justify="center"
        position="absolute"
        height={"100%"}
        width={ScreenWidth * 0.12}
        style={{ left: 0, zIndex: 50 }}
      >
        {Icon}
      </Box>
      <Box width={"70%"}>
        <TextInput
          {...props}
          onFocus={(e) => {
            console.log("focused");
            setFocused(true);
          }}
          cursorColor={Colors.theme.primary}
          placeholderTextColor={
            colorScheme === "dark" ? "lightgray" : Colors.theme.input
          }
          secureTextEntry={securePsd}
          style={[
            styles.input,
            colorScheme === "dark"
              ? { color: Colors.dark.text }
              : { color: Colors.theme.input },
          ]}
        />
      </Box>
      {password && (
        <MainButton
          align="center"
          justify="center"
          position="absolute"
          color="transparent"
          height={"100%"}
          width={ScreenWidth * 0.12}
          style={{ right: 0, zIndex: 60 }}
          onPress={() => {
            setSecurePsd(!securePsd);
          }}
        >
          {securePsd ? (
            <MainIcon source="Ionicons" name="eye" size={moderateScale(25)} />
          ) : (
            <MainIcon
              source="MaterialCommunityIcons"
              name="eye-off"
              size={moderateScale(25)}
            />
          )}
        </MainButton>
      )}
    </Box>
  );
};

export default HackerthonInput;

const styles = StyleSheet.create({
  input: {
    height: verticalScale(60),
    padding: moderateScale(10),
    fontSize: moderateScale(16),
    width: ScreenWidth * 0.8,
    fontFamily: MYfonts.Nunito_500Medium,
    borderRadius: moderateScale(10),
    marginLeft: -moderateScale(10),
  },
});
