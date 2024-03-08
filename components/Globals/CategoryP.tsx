import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { Entypo } from "@expo/vector-icons";
import ImageIcon from "./ImageIcon";
import CategoryModal from "./CategoryModal";
import { useState } from "react";
import CategoryPeriod from "./CategoryPeriod";

type Props = {
  categoryDesc?: string;
  categoryTitle?: string;
  icon: any;
  color?: string;
  period?: string;
  category?: string;
  setCategory?: any;
  setPeriod?: any;
};
const CategoryP = (props: Props) => {
  const {
    categoryDesc,
    categoryTitle,
    icon,
    color,
    period,
    category,
    setCategory,
    setPeriod,
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
    <TouchableOpacity onPress={() => setVisible(true)} style={styles.container}>
      <View style={styles.leftContainer}>
        <View
          style={[
            styles.iconWrapper,
            {
              backgroundColor: color,
            },
          ]}
        >
          <ImageIcon source={icon} size={moderateScale(20)} />
        </View>
        <CategoryPeriod
          visible={visible}
          setVisible={setVisible}
          setCategory={setCategory}
          period={period}
          setPeriod={setPeriod}
        />
        <View style={{ marginLeft: "12%" }}>
          <Text style={styles.descText}>{categoryDesc}</Text>
          <Text style={styles.title}>{period} Months</Text>
        </View>
      </View>
      {!period && (
        <Entypo name="chevron-small-down" size={scale(20)} color="black" />
      )}
    </TouchableOpacity>
  );
};
export default CategoryP;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    marginTop: "1%",
    marginHorizontal: "5%",
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
});
