// MainIconButton.tsx

import React from "react";
import {
  View,
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
} from "react-native";
import {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  FontAwesome5,
  Fontisto,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
  Zocial,
} from "@expo/vector-icons";

type IconSource =
  | "AntDesign"
  | "Entypo"
  | "EvilIcons"
  | "Feather"
  | "FontAwesome"
  | "FontAwesome5"
  | "Fontisto"
  | "Foundation"
  | "Ionicons"
  | "MaterialCommunityIcons"
  | "MaterialIcons"
  | "Octicons"
  | "SimpleLineIcons"
  | "Zocial";

export interface MainIconButtonProps {
  name: string;
  size:
    | number
    | "xxxs"
    | "xxs"
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "xxl"
    | "xxxl";
  color: string;
  source?: IconSource;
  onPress: () => void;
}

const iconSizes = {
  xxxs: 10,
  xxs: 12,
  xs: 14,
  sm: 16,
  md: 18,
  lg: 20,
  xl: 22,
  xxl: 24,
  xxxl: 26,
};

const getIconComponent = (
  name: string,
  size: MainIconButtonProps["size"],
  color: string,
  source?: IconSource
) => {
  switch (source) {
    case "AntDesign":
      return (
        <AntDesign
          name={name as keyof typeof AntDesign.glyphMap}
          size={getSizeValue(size)}
          color={color}
        />
      );
    case "Entypo":
      return (
        <Entypo
          name={name as keyof typeof Entypo.glyphMap}
          size={getSizeValue(size)}
          color={color}
        />
      );
    case "EvilIcons":
      return (
        <EvilIcons
          name={name as keyof typeof EvilIcons.glyphMap}
          size={getSizeValue(size)}
          color={color}
        />
      );
    case "FontAwesome":
      return (
        <FontAwesome
          name={name as keyof typeof FontAwesome.glyphMap}
          size={getSizeValue(size)}
          color={color}
        />
      );
    case "FontAwesome5":
      return (
        <FontAwesome5
          name={name as keyof typeof FontAwesome5.glyphMap}
          size={getSizeValue(size)}
          color={color}
        />
      );
    case "Fontisto":
      return (
        <Fontisto
          name={name as keyof typeof Fontisto.glyphMap}
          size={getSizeValue(size)}
          color={color}
        />
      );
    case "Foundation":
      return (
        <Foundation
          name={name as keyof typeof Foundation.glyphMap}
          size={getSizeValue(size)}
          color={color}
        />
      );
    case "Ionicons":
      return (
        <Ionicons
          name={name as keyof typeof Ionicons.glyphMap}
          size={getSizeValue(size)}
          color={color}
        />
      );
    case "MaterialCommunityIcons":
      return (
        <MaterialCommunityIcons
          name={name as keyof typeof MaterialCommunityIcons.glyphMap}
          size={getSizeValue(size)}
          color={color}
        />
      );
    case "MaterialIcons":
      return (
        <MaterialIcons
          name={name as keyof typeof MaterialIcons.glyphMap}
          size={getSizeValue(size)}
          color={color}
        />
      );
    case "Octicons":
      return (
        <Octicons
          name={name as keyof typeof Octicons.glyphMap}
          size={getSizeValue(size)}
          color={color}
        />
      );
    case "SimpleLineIcons":
      return (
        <SimpleLineIcons
          name={name as keyof typeof SimpleLineIcons.glyphMap}
          size={getSizeValue(size)}
          color={color}
        />
      );
    case "Zocial":
      return (
        <Zocial
          name={name as keyof typeof Zocial.glyphMap}
          size={getSizeValue(size)}
          color={color}
        />
      );
    default:
      // Default to Feather icon if source is not provided or invalid
      return (
        <Feather
          name={name as keyof typeof Feather.glyphMap}
          size={getSizeValue(size)}
          color={color}
        />
      );
  }
};

const getSizeValue = (size: MainIconButtonProps["size"]) => {
  return typeof size === "string" ? iconSizes[size] : size;
};

const MainIconButton: React.FC<MainIconButtonProps> = ({
  name,
  size,
  color,
  source,
  onPress,
}) => {
  const scaleValue = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.8,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const animatedStyle = {
    transform: [{ scale: scaleValue }],
  };

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={[styles.container, animatedStyle]}>
        {getIconComponent(name, size, color, source)}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MainIconButton;
