import React from "react";
import { StyleSheet } from "react-native";
import { View, ViewProps } from "../Themed";

const Transparent: React.FC<ViewProps> = ({ style, ...rest }) => {
  return <View style={[styles.container, style]} {...rest} />;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
  },
});

export default Transparent;
