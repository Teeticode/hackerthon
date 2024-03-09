import { StyleSheet } from "react-native";
import { Text, TextProps } from "../Themed";
import { scale } from "../../constants/Scaler";
import Colors from "../../constants/Colors";
import { moderateScale } from "react-native-size-matters";

export function SmallLink(props: TextProps) {
  return <Text {...props} style={[props.style, styles.container]} />;
}

export default SmallLink;

const styles = StyleSheet.create({
  container: {
    fontFamily: "Nunito_400Regular",
    fontSize: moderateScale(18),
    textDecorationLine: "underline",
    color: Colors.theme.primary,
  },
});
