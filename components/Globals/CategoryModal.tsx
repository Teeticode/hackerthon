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
import { moderateScale, verticalScale } from "react-native-size-matters";
import { Ionicons } from "@expo/vector-icons";
import { Overlay } from "@rneui/themed";

type Props = {
  visible?: boolean;
  setVisible?: any;
  setCategory?: any;
};

const CategoryModal = (props: Props) => {
  const { visible, setVisible, setCategory } = props;
  return (
    <Overlay
      onRequestClose={() => setVisible(false)}
      isVisible={visible ?? false}
      onBackdropPress={() => setVisible(false)}
      overlayStyle={{
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
      }}
    >
      <View
        style={{
          width: ScreenWidth * 0.8,
          height: ScreenHeight * 0.3,
          backgroundColor: Colors.theme.transparent,
          alignSelf: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.container}>
          <View
            style={{
              marginHorizontal: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setCategory("Medical");
                setVisible(false);
              }}
              style={styles.card}
            >
              <Text style={styles.cardTxt}>Medical</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setCategory("Operation");
                setVisible(false);
              }}
              style={styles.card}
            >
              <Text style={styles.cardTxt}>Operation</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Overlay>
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
    width: "100%",
    height: "100%",
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
