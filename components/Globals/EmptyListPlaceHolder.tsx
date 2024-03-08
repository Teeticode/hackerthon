import { StyleSheet } from "react-native";
import React from "react";
import { moderateScale } from "react-native-size-matters";
import FastImage from "react-native-fast-image";
import Transparent from "./Transparent";
import { Text, View } from "../Themed";
import MainText from "./MainText";
import Colors from "../../constants/Colors";
import Box from "./Box";

type Props = {
  title: string;
};

const EmptyListPlaceHolder = (props: Props) => {
  return (
    <Box align="center">
      <FastImage
        source={require("../../assets/utils/request_advance.png")}
        style={{
          width: moderateScale(132),
          height: moderateScale(100),
          borderRadius: moderateScale(50),
          marginHorizontal: moderateScale(10),
          marginVertical: moderateScale(10),
        }}
        resizeMode="contain"
      />
      <MainText
        size={moderateScale(12)}
        fontWeight="regular"
        color={Colors.theme.lighterTitle}
        style={styles.title}
      >
        {props.title}
      </MainText>
    </Box>
  );
};

export default EmptyListPlaceHolder;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  title: {
    fontSize: moderateScale(12),
  },
});
