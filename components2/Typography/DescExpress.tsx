import { StyleSheet } from "react-native";
import { Text, TextProps } from "../Themed";
import { scale } from "../../constants/Scaler";

export function DescExpress(props: TextProps) {
  return <Text {...props} style={[props.style, styles.container]} />;
}

export default DescExpress;

const styles = StyleSheet.create({
  container: {
    fontFamily: "Nunito_600SemiBold_Italic",
    fontSize: scale(16),
    color:'black'
  },
});
