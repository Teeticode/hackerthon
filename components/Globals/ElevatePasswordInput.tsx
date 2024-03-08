import { View, Text, StyleSheet, useColorScheme } from "react-native";
import React, { useState } from "react";
import { Input, InputProps } from "@rneui/themed";
import { scale } from "../../constants/Scaler";
import { Platform } from "react-native";
import { Entypo, Feather } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import ElevateInput from "./ElevateInput";
import MainIconButton from "./MainIconButton";

interface ElevateInputProps extends InputProps {}
const ElevatePasswordInput: React.FC<ElevateInputProps> = ({ ...rest }) => {
  const [secured, setSecured] = useState<boolean>(true);
  const colorScheme = useColorScheme();

  return (
    <ElevateInput
      rightIcon={
        <MainIconButton
          source="Feather"
          name={secured ? "eye" : "eye-off"}
          size={scale(25)}
          onPress={() => setSecured(!secured)}
          color={Colors.theme.primary}
        />
      }
      placeholder={secured ? "*****" : "PasswordExample"}
      secureTextEntry={secured}
      {...rest}
    />
  );
};

export default ElevatePasswordInput;

const styles = StyleSheet.create({});
