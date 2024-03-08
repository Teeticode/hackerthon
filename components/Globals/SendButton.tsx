import { Ionicons } from "@expo/vector-icons";
import { ScreenHeight } from "@rneui/base";
import { router } from "expo-router";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import MainButton, { MainButtonProps } from "./MainButton";
import Colors from "../../constants/Colors";
import { BoxProps } from "./Box";
import { ThemedButtonProps } from "./MainButtonIcon";

type Props = {
  style?: any;
  onPress?: any;
  boxProps?: BoxProps;
  buttonProps?: MainButtonProps;
};
const SendButton = (props: Props) => {
  const { style, onPress } = props;
  return (
    <MainButton
      onPress={() => onPress()}
      {...props.boxProps}
      {...props.buttonProps}
      alignSelf="center"
      type="primary"
      width={"90%"}
      label={"Send Request"}
      radius={scale(12)}
      color={Colors.theme.primaryOrange}
      height={ScreenHeight * 0.08}
      icon={{
        name: "send-sharp",
        source: "Ionicons",
        position: "append",
        size: moderateScale(18),
        color: "white",
      }}
    />
    // <TouchableOpacity
    //   onPress={() => {
    //     onPress();
    //   }}
    //   style={[{ ...style }, styles.btn]}
    // >
    //   <View
    //     style={{
    //       flexDirection: "row",
    //       alignItems: "center",
    //       justifyContent: "center",
    //     }}
    //   >
    //     <Text style={styles.btnText}>send </Text>
    //     <Ionicons
    //       name="send-sharp"
    //       style={{ alignSelf: "center" }}
    //       size={moderateScale(18)}
    //       color="white"
    //     />
    //   </View>
    // </TouchableOpacity>
  );
};

export default SendButton;

const styles = StyleSheet.create({
  btn: {
    width: "90%",
    backgroundColor: "#FF800B",
    borderRadius: scale(12),
    height: ScreenHeight * 0.08,
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  btnText: {
    color: "white",
    fontSize: ScreenHeight * 0.03,
    marginBottom: "6%",
    marginRight: "6%",
  },
});
