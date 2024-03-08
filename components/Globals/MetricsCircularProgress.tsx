import { View, Text } from "react-native";
import React from "react";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { moderateScale } from "react-native-size-matters";
import MainText from "./MainText";
import Colors from "../../constants/Colors";

type Props = {
  fillValue: number;
  size: number;
  tintColor?: string;
  backgroundColor?: string;
  percentage?: boolean;
  width: number;
};

const MetricsCircularProgress = (props: Props) => {
  return (
    <AnimatedCircularProgress
      size={moderateScale(props.size)}
      width={moderateScale(props.width)}
      fill={props.fillValue}
      rotation={20}
      children={(fill) => (
        <MainText size={moderateScale(20)} fontWeight="bold">
          {Math.floor(fill)}{" "}
          {props.percentage && <MainText size={moderateScale(10)}>%</MainText>}
        </MainText>
      )}
      tintColor={props.tintColor ?? Colors.theme.primaryOrange}
      backgroundColor={props.backgroundColor ?? Colors.theme.primary}
    />
  );
};

export default MetricsCircularProgress;
