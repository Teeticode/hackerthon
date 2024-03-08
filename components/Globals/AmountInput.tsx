import { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import putComma from "./putComma";

type Props = {
  amount?: string;
};
const AmountInput = (props: Props) => {
  const [showText, setShowText] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setShowText((showText) => !showText);
    }, 850);
    return () => {
      clearInterval(interval);
    };
  }, []);
  const { amount } = props;
  return (
    <View style={styles.InputWrapper}>
      <Text style={styles.label}>Enter amount</Text>
      <View style={styles.amountWrapper}>
        <Text style={styles.currency}>KSH</Text>
        <Text
          style={{ fontSize: verticalScale(40), fontFamily: "Roboto_100Thin" }}
        >
          {showText === true ? "|" : " "}
        </Text>
        <Text style={styles.amount}>{putComma(`${amount}`)}.00</Text>
      </View>
    </View>
  );
};

export default AmountInput;

const styles = StyleSheet.create({
  InputWrapper: {
    alignItems: "center",
    marginHorizontal: verticalScale(30),
    justifyContent: "center",
    marginVertical: scale(20),
    marginBottom: verticalScale(20),
    overflowX: "hidden",
  },
  amountWrapper: {
    flexDirection: "row",
    width: "100%",
    height: verticalScale(50),
    alignItems: "center",
  },
  label: {
    color: "#A9A9A9",
    fontSize: verticalScale(10),
    fontFamily: "Roboto_400Regular",
    alignSelf: "flex-start",
  },
  currency: {
    color: "#283B51",
    marginRight: scale(10),
    fontSize: verticalScale(12),
    alignSelf: "flex-end",
  },
  amount: {
    color: "#283B51",
    marginRight: moderateScale(10),
    fontSize: verticalScale(30),
    fontFamily: "Roboto_400Regular",
    alignSelf: "flex-end",
  },
});
