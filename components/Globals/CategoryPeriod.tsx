import {
  View,
  Text,
  Modal,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { ScreenHeight, ScreenWidth } from "@rneui/base";
import Colors from "../../constants/Colors";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "react-native-wheel-pick";

type Props = {
  visible?: boolean;
  setVisible?: any;
  setCategory?: any;
  period?: string;
  setPeriod?: any;
};
const months = ["1", "2", "3"];

const CategoryModal = (props: Props) => {
  const { visible, setVisible, setCategory, period, setPeriod } = props;
  return (
    <Modal visible={visible} transparent={true}>
      <View
        style={{
          width: ScreenWidth,
          height: ScreenHeight,
          backgroundColor: Colors.theme.transparent,
          alignSelf: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.container}>
          <Picker
            value={period}
            style={{
              backgroundColor: "white",
              width: scale(300),
              height: scale(215),
            }}
            selectedValue={period}
            pickerData={[`Choose Period`, ...months]}
            onValueChange={(value: string) => {
              setPeriod(value);
              setVisible(false);
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default CategoryModal;

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        shadowColor: "#F2E0F2",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
      },
      android: {
        elevation: 5,
      },
    }),
    width: "80%",
    height: "30%",
    backgroundColor: "white",
    borderRadius: moderateScale(20),
    justifyContent: "center",
  },
  card: {
    width: "100%",
    height: verticalScale(40),
    backgroundColor: Colors.theme.primaryLightBg,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: verticalScale(10),
    borderRadius: moderateScale(10),
  },
  cardTxt: {
    color: Colors.theme.primary,
  },
});
