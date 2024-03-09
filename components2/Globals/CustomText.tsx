import { StyleSheet, Text, TextProps, TextStyle, View } from "react-native";
import React from "react";

interface CustomText extends TextStyle, TextProps {}

type Props = {};

const CustomText = (props: CustomText) => {
  return <Text {...props} />;
};

export default CustomText;

const styles = StyleSheet.create({});
