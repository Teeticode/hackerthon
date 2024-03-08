import { AntDesign } from "@expo/vector-icons";
import {
  View,
  StyleProp,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import { scale } from "../../constants/Scaler";
import { router } from "expo-router";
import MainButton from "./MainButton";
import Colors from "../../constants/Colors";

type Props = {
  title?: string;
  navigation?: () => void;
  style?: StyleProp<any>;
};
const BackButton = (props: Props) => {
  const { title, navigation, style } = props;
  return (
    <MainButton
      height={scale(40)}
      width={scale(60)}
      color="#422F59"
      onPress={() => {
        navigation?.();
      }}
    >
      <AntDesign name="arrowleft" size={scale(22)} color="white" />
    </MainButton>
  );
};
export default BackButton;
const styles = StyleSheet.create({
  btn: {
    width: scale(60),
    height: scale(40),
    backgroundColor: "#422F59",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: scale(20),
  },
  title: {
    color: "#1E1E1E",
    fontFamily: "Roboto_400Regular",
    fontSize: scale(18),
    marginLeft: "10%",
  },
  btnWrapper: {
    alignSelf: "flex-start",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
});
