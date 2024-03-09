import { StyleSheet } from "react-native";
import { Text, TextProps } from "../Themed";
import { scale } from "../../constants/Scaler";
import Colors from "../../constants/Colors";

interface P1Props extends TextProps {
  light?: boolean;
}

export function P1(props: P1Props) {
  return (
    <Text
      {...props}
      style={[
        props.style,
        styles.container,
        {
          color: props.light ? Colors.dark.text : undefined,
        },
      ]}
    />
  );
}

export default P1;

const styles = StyleSheet.create({
  container: {
    fontFamily: "Nunito_400Regular",
    fontSize: scale(16),
    color: Colors.light.text,
  },
});
