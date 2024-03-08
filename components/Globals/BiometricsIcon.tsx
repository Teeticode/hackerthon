import { View, Text } from "react-native";
import React from "react";
import useAuthStore from "../../services/stores/auth";
import MainIcon from "./MainIcon";
import Colors from "../../constants/Colors";

type Props = {
  size: number;
  color?: string;
};

const BiometricsIcon = (props: Props) => {
  const { biometricsDetails } = useAuthStore();
  return (
    <MainIcon
      name={
        biometricsDetails?.biometricType == "Face ID"
          ? "face-recognition"
          : "fingerprint"
      }
      size={props.size}
      source={
        biometricsDetails?.biometricType == "Face ID"
          ? "MaterialCommunityIcons"
          : "Entypo"
      }
      color={props.color || Colors.theme.primary}
    />
  );
};

export default BiometricsIcon;
