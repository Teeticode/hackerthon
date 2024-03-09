import { StyleSheet } from "react-native";
import { Text, TextProps } from "../Themed";
import { scale } from "../../constants/Scaler";
import Colors from "../../constants/Colors";

interface DynamicLinkProps extends TextProps {
  link?: boolean;
  notUnderlined?: boolean;
}

export function DynamicLink(props: DynamicLinkProps) {
  return (
    <Text
      {...props}
      style={[
        props.style,
        {
          textDecorationLine: props.notUnderlined ? "none" : "underline",

          color: props.link ? Colors.theme.primary : undefined,
        },
        styles.container,
      ]}
    />
  );
}

export default DynamicLink;

const styles = StyleSheet.create({
  container: {
    fontFamily: "Nunito_400Regular",
    fontSize: scale(16),
    marginTop: scale(20),
  },
});
