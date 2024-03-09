import React from "react";
import { StyleSheet } from "react-native";
import { View, ViewProps } from "../Themed";
import { MainStyles } from "../../styles/Main";

const HalfWidthRow: React.FC<ViewProps> = ({ style, ...rest }) => {
  return <View style={[styles.row, MainStyles.halfWidth, style]} {...rest} />;
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default HalfWidthRow;
