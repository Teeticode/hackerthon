import Colors from "../../constants/Colors";
import { scale } from "../../constants/Scaler";
import { Text, TextProps } from "../Themed";
import { StyleSheet } from "react-native";

const TitlePrimary = (props: TextProps) => {
  return <Text {...props} style={[props.style, styles.container]} />;
};

const styles = StyleSheet.create({
  container: {
    color: Colors.theme.primary,
    textAlign: "center",
    fontFamily: "Roboto_700Bold",
    fontSize: scale(28),
    letterSpacing: scale(1.2),
  },
});

export default TitlePrimary;
