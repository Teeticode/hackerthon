import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
} from "react-native";
import Colors from "../../constants/Colors";
import { scale } from "../../constants/Scaler";

type Props = {
  callBack?: () => void;
  title?: string;
};
const OnboardingBtn = (props: Props) => {
  const { callBack, title } = props;
  return (
    <TouchableOpacity style={styles.btn} onPress={callBack}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default OnboardingBtn;
const styles = StyleSheet.create({
  btn: {
    width: "70%",
    height: "40%",
    backgroundColor: "rgba(151, 71, 255, 0.10)",
    borderRadius: scale(10),
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#9747FF",
    textAlign: "center",
    fontSize: scale(14),
    fontFamily: "Roboto_400Regular",
  },
});
