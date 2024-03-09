import { Platform, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Text, View } from "../Themed";
import Row from "./Row";
import lightenColor from "../../constants/functions/lightenColor";
import Colors from "../../constants/Colors";
import { scale } from "../../constants/Scaler";
import ImageIcon from "./ImageIcon";

type Props = {
  title: string;
  callBack: () => void;
  field: string;
  width?: number;
};

const DropDownButton = (props: Props) => {
  return (
    <TouchableOpacity onPress={() => props.callBack()}>
      <Text
        style={[
          styles.field,
          {
            width: props.width,
          },
        ]}
      >
        {props.field}
      </Text>
      <Row style={styles.container}>
        <Text style={styles.title}>{props.title}</Text>
        <ImageIcon
          source={require("../../assets/icons/chevron-up-down.png")}
          size={scale(20)}
        />
      </Row>
    </TouchableOpacity>
  );
};

export default DropDownButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: lightenColor(Colors.theme.primaryGrey, 0.7),
    paddingHorizontal: scale(10),
    borderRadius: scale(10),
    alignItems: "center",
    height: scale(40),
    marginVertical: scale(5),
  },
  title: {
    fontFamily: "Nunito_400Regular",
    fontSize: scale(18),
  },
  field: {
    fontFamily: "Nunito_300Light_Italic",
    fontSize: scale(18),
    fontStyle: Platform.OS == "android" ? "italic" : undefined,
    fontWeight: Platform.OS == "android" ? "100" : undefined,
    color: lightenColor(Colors.theme.primaryGrey, 0.3),
  },
});
