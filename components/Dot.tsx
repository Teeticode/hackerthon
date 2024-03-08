import { View, Text } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { moderateScale } from "react-native-size-matters";

type Props = {
  size: number;
  color?: string;
};

const Dot = (props: Props) => {
  return (
    <Entypo
      style={{
        alignSelf: "center",
      }}
      name="dot-single"
      size={props.size ?? moderateScale(20)}
      color={props.color ?? Colors.theme.primaryOrange}
    />
  );
};

export default Dot;
