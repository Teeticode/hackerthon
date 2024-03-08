// IconWrapper.tsx

import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { moderateScale } from "react-native-size-matters";

interface IconWrapperProps {
  color: string;
  radius: number;
  style?: StyleProp<ViewStyle>; // Additional styles for the wrapper
  children: React.ReactNode; // The icon component passed as a child
}

const IconWrapper: React.FC<IconWrapperProps> = ({
  color,
  radius,
  style,
  children,
}) => {
  const wrapperStyle = {
    backgroundColor: color,
    borderRadius: radius,
  };

  return (
    <View style={[styles.container, wrapperStyle, style]}>{children}</View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(12),
    justifyContent: "center",
    alignItems: "center",
  },
});

export default IconWrapper;
