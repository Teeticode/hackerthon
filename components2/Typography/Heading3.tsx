import { StyleSheet } from "react-native";
import { Text, TextProps } from "../Themed";
import { scale } from "../../constants/Scaler";

export function Heading3(props: TextProps) {
  return <Text {...props} style={[props.style, styles.container]} />;
}

export default Heading3;

const styles = StyleSheet.create({
  container: {
    fontFamily: "Nunito_400Regular",
    fontSize: scale(18),
    color: "black",
    marginBottom: scale(10),
  },
});
