import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { View, ViewProps as ThemedViewProps } from "../Themed";
import Transparent from "../Globals/Transparent";

interface RowProps extends ThemedViewProps {
  fullWidth?: boolean;
  pr?: number;
  px?: number;
  py?: number;
  pl?: number;
  mt?: number;
  mr?: number;
  mb?: number;
  ml?: number;
  mx?: number;
}

const Row: React.FC<RowProps> = ({
  style,
  fullWidth,
  pr,
  px,
  py,
  pl,
  mt,
  mr,
  mb,
  ml,
  mx,
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
    marginVertical: mx,
    width: fullWidth ? "100%" : "auto",
  };

  return <Transparent style={[styles.row, customStyle, style]} {...rest} />;
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default Row;
