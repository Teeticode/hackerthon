import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { View, ViewProps as ThemedViewProps } from "../Themed";

interface ViewProps extends ThemedViewProps {
  pr?: number;
  px?: number;
  py?: number;
  pl?: number;
  mt?: number;
  mr?: number;
  mb?: number;
  ml?: number;
}

const Transparent: React.FC<ViewProps> = ({
  style,
  pr,
  px,
  py,
  pl,
  mt,
  mr,
  mb,
  ml,
  ...rest
}) => {
  const customStyle: ViewStyle = {
    paddingRight: pr,
    paddingLeft: pl || px,
    paddingTop: py,
    paddingBottom: py || px,
    marginTop: mt,
    marginRight: mr,
    marginBottom: mb,
    marginLeft: ml,
  };

  return <View style={[styles.container, customStyle, style]} {...rest} />;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
  },
});

export default Transparent;
