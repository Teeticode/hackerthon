import { StyleSheet } from "react-native";
import { Text, TextProps } from "../Themed";
import { scale } from "../../constants/Scaler";
import Colors from "../../constants/Colors";

interface P1Props extends TextProps {
  light?: boolean;
}

export function Heading4(props: P1Props) {
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

export default Heading4;

const styles = StyleSheet.create({
  container: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: scale(16),
    color: Colors.light.text,
  },
});
