import { StyleSheet } from "react-native";
import { Text, TextProps } from "../Themed";
import { scale } from "../../constants/Scaler";
import Colors from "../../constants/Colors";

interface DashBoardCarddescType extends TextProps {
  italized?: boolean;
  color?: string;
}
export function DashBoardCarddesc(props: DashBoardCarddescType) {
  return (
    <Text
      {...props}
      style={[
        props.style,
        {
          color: props.color,
          fontFamily: props.italized
            ? "Nunito_500Medium_Italic"
            : "Nunito_600SemiBold",
        },
        styles.dashbaordCardDesc,
      ]}
    />
  );
}

export default DashBoardCarddesc;

const styles = StyleSheet.create({
  dashbaordCardDesc: {
    fontSize: scale(14),
    fontFamily: "Nunito_600SemiBold_Italic",
  },
});
