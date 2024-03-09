import { StyleSheet } from "react-native";
import { Text, TextProps } from "../Themed";
import { scale } from "../../constants/Scaler";

export function Heading1(props: TextProps) {
  return <Text {...props} style={[props.style, styles.container]} />;
}

export default Heading1;

const styles = StyleSheet.create({
  container: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: scale(24),
    color: "black",
  },
});
