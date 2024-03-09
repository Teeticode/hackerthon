import { StyleSheet } from "react-native";
import { Text, TextProps } from "../Themed";
import { scale } from "../../constants/Scaler";

interface H1Props extends TextProps {
  color?: string;
}
export function H1(props: H1Props) {
  return (
    <Text
      {...props}
      style={[
        props.style,
        styles.container,
        {
          color: props.color,
        },
      ]}
    />
  );
}

export default H1;

const styles = StyleSheet.create({
  container: {
    fontFamily: "Nunito_700Bold",
    fontSize: scale(14),
    color: "black",
  },
});
