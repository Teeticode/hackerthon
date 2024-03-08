import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import ImageIcon from "./ImageIcon";
import CategoryModal from "./CategoryModal";
import { useState } from "react";
import Colors from "../../constants/Colors";
import { Card } from "@rneui/themed";
import MainIconButton from "./MainIconButton";

type Props = {
  categoryDesc?: string;
  categoryTitle?: string;
  icon: any;
  color?: string;
  period?: boolean;
  category?: string;
  setCategory?: any;
};
const Category = (props: Props) => {
  const {
    categoryDesc,
    categoryTitle,
    icon,
    color,
    period,
    category,
    setCategory,
  } = props;
  const options = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ];
  const placeholder = {
    label: "Select an option...",
    value: null,
  };
  const [visible, setVisible] = useState(false);

  return (
    <View style={{ zIndex: 20 }}>
      <TouchableOpacity
        onPress={() => setVisible(!visible)}
        style={[styles.container]}
      >
        <View style={styles.leftContainer}>
          <View
            style={[
              styles.iconWrapper,
              {
                backgroundColor: color,
              },
            ]}
          >
            {category !== "" ? (
              <MainIconButton
                name={
                  category == "Medical"
                    ? "hand-holding-medical"
                    : category == "Utilities"
                    ? "hand-holding-usd"
                    : category == "Emergency"
                    ? "dangerous"
                    : category == "General"
                    ? "auto-fix-normal"
                    : "general"
                }
                size={scale(20)}
                onPress={() => setVisible(!visible)}
                color={Colors.theme.primaryOrange}
                source={
                  category == "Medical" ||
                  category == "Utilities" ||
                  category === ""
                    ? "FontAwesome5"
                    : category == "Emergency" || category == "General"
                    ? "MaterialIcons"
                    : "FontAwesome5"
                }
              />
            ) : (
              <MaterialIcons
                name="category"
                size={moderateScale(24)}
                color={Colors.theme.primaryOrange}
              />
            )}
          </View>
          {/* <CategoryModal
          visible={visible}
          setVisible={setVisible}
          setCategory={setCategory}
        /> */}

          <View style={{ marginLeft: "12%" }}>
            <Text
              style={[
                styles.descText,
                category === "" && {
                  marginTop: moderateScale(20),
                  color: Colors.theme.secondary,
                  fontWeight: "700",
                },
              ]}
            >
              {categoryDesc}
            </Text>
            <Text style={styles.title}>{category}</Text>
          </View>
        </View>
        {!period && (
          <Entypo name="chevron-small-down" size={scale(20)} color="black" />
        )}
      </TouchableOpacity>
      {visible && (
        <View style={styles.dropdown}>
          <Pressable
            onPress={() => {
              setCategory("Medical");
              setVisible(false);
            }}
            style={[styles.card, { marginBottom: moderateScale(10) }]}
          >
            <Text>Medical</Text>
          </Pressable>
          <Card.Divider color="#D7D7D7" />
          <Pressable
            onPress={() => {
              setCategory("General");
              setVisible(false);
            }}
            style={styles.card}
          >
            <Text>General</Text>
          </Pressable>
          <Card.Divider color="#D7D7D7" />

          <Pressable
            onPress={() => {
              setCategory("Emergency");
              setVisible(false);
            }}
            style={styles.card}
          >
            <Text>Emergency</Text>
          </Pressable>
          <Card.Divider color="#D7D7D7" />

          <Pressable
            onPress={() => {
              setCategory("Utilities");
              setVisible(false);
            }}
            style={styles.card}
          >
            <Text>Utilities</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};
export default Category;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    height: moderateScale(60),
    marginHorizontal: "5%",
    zIndex: 10,
    borderWidth: moderateScale(0.4),
    borderColor: Colors.theme.primary,
    padding: moderateScale(10),
    borderRadius: moderateScale(5),
  },
  iconWrapper: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(8),
    justifyContent: "center",
    alignItems: "center",
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  descText: {
    color: "#94A0B4",
    fontFamily: "Roboto_400Regular",
    fontSize: verticalScale(12),
  },
  title: {
    color: "#000",
    fontFamily: "Roboto_400Regular",
    fontSize: verticalScale(16),
  },
  dropdown: {
    top: verticalScale(10),
    marginBottom: 2,
    width: "90%",
    backgroundColor: Colors.theme.lighterBg,
    alignSelf: "center",
    padding: moderateScale(10),
    borderRadius: moderateScale(10),
  },
  card: {
    padding: moderateScale(10),
  },
});
