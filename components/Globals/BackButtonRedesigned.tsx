import { AntDesign, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
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
const BackButtonRedesigned = (props: Props) => {
  const { title, navigation, style } = props;
  return (
    <MainButton
      height={scale(35)}
      width={scale(63)}
      color={Colors.theme.light}
      onPress={() => {
        router?.back();
      }}
    >
      <FontAwesome
        name="long-arrow-left"
        size={scale(25)}
        color={Colors.theme.primary}
      />
    </MainButton>
  );
};
export default BackButtonRedesigned;
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
