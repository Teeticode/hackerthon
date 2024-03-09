import React from "react";
import { StyleSheet } from "react-native";
import { View, ViewProps } from "../Themed";

const Row: React.FC<ViewProps> = ({ style, ...rest }) => {
  return <View style={[styles.row, style]} {...rest} />;
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default Row;
