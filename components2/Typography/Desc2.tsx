import { StyleSheet } from "react-native";
import { Text, TextProps } from "../Themed";
import { scale } from "../../constants/Scaler";

export function Desc2(props: TextProps) {
  return <Text {...props} style={[props.style, styles.container]} />;
}

export default Desc2;

const styles = StyleSheet.create({
  container: {
    fontFamily: "Nunito_500Medium",
    fontSize: scale(15),
    color:'black',
    alignItems:'center',
    textAlign:'center',
    marginBottom:scale(15)
  },
});
