import { StyleSheet } from "react-native";
import { Text, TextProps } from "../Themed";
import { scale } from "../../constants/Scaler";

export function Desc1(props: TextProps) {
  return <Text {...props} style={[props.style, styles.container]} />;
}

export default Desc1;

const styles = StyleSheet.create({
  container: {
    fontFamily: "Nunito_300Light",
    fontSize: scale(15),
    color: "black",
  },
});
