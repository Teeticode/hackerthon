import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Input, InputProps } from "@rneui/themed";
import { Platform } from "react-native";
import Colors from "../../constants/Colors";
import { verticalScale } from "react-native-size-matters";
import { scale } from "../../constants/Scaler";

interface ElevateInputProps extends InputProps {}

const ElevateInput: React.FC<ElevateInputProps> = ({
  style,
  inputContainerStyle,
  inputStyle,
  containerStyle,
  ...rest
}) => {
  return (
    <Input
      {...rest}
      inputStyle={[styles.inputStyle, inputStyle]}
      containerStyle={[styles.containerStyle, containerStyle]}
      labelStyle={styles.labelStyle}
    />
  );
};

export default ElevateInput;

const styles = StyleSheet.create({
  inputStyle: {
    fontFamily: "Nunito_400Regular",
    fontSize: scale(16),
    marginBottom: scale(10),
    // lineHeight:scale(4)
  },
  containerStyle: {},
  labelStyle: {
    fontFamily: "Roboto_400Regular",
    fontSize: scale(12),
    color: Colors.theme.inputLabel,

    marginBottom: verticalScale(5),
  },
});
