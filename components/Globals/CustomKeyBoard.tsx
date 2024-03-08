import { Feather } from "@expo/vector-icons";
import {
  View,
  StyleSheet,
  useWindowDimensions,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import SendButton from "./SendButton";
import { useEffect, useState } from "react";
import ImageIcon from "./ImageIcon";
import Category from "./Category";
import { ScreenHeight, ScreenWidth } from "@rneui/base";
type Props = {
  amount?: string;
  setAmount: (amount: string) => void;
  limit: number;
  categoryDesc?: string;
  categoryTitle?: string;
  icon?: string;
  color?: string;
  period?: boolean;
  setSuccess?: any;
};
const CustomKeyBoard = (props: Props) => {
  const { width } = useWindowDimensions();
  const {
    amount,
    setAmount,
    limit,
    categoryDesc,
    categoryTitle,
    icon,
    color,
    period,
    setSuccess,
  } = props;
  const [amountArr, setAmountArr] = useState<Array<any>>([]);
  useEffect(() => {
    console.log(limit);
    if (parseInt(amountArr?.join("")) < limit) {
      setAmount(amountArr.join(""));
    }
  }, [amountArr]);

  const handleSetAmount = (val: any) => {
    if (amountArr.length > 1) {
      const num = parseInt(amountArr.join(""));

      console.log(num);
      if (num < limit && amountArr.length < `${limit}`.split("").length - 1) {
        setAmountArr((prev) => [...prev, val]);
      }
    } else {
      setAmountArr((prev) => [...prev, val]);
    }
  };
  return (
    <View style={{ top: "4%" }}>
      <Category
        icon={icon ?? ""}
        categoryDesc={categoryDesc}
        categoryTitle={categoryTitle}
        period={period}
        color={color}
      />
      <View style={[styles.container, { width: width }]}>
        <KeyboardAvoidingView style={styles.innerContainer}>
          <TextInput
            placeholder="Add reason... (Optional)"
            style={styles.input}
          />
          <ImageIcon
            source={require("../../assets/icons/edit.png")}
            size={moderateScale(18)}
          />
        </KeyboardAvoidingView>
        <View style={styles.keyboard}>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => {
                handleSetAmount(1);
              }}
              style={styles.num}
            >
              <Text style={styles.numText}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleSetAmount(2);
              }}
              style={styles.num}
            >
              <Text style={styles.numText}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleSetAmount(3);
              }}
              style={styles.num}
            >
              <Text style={styles.numText}>3</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => {
                handleSetAmount(4);
              }}
              style={styles.num}
            >
              <Text style={styles.numText}>4</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleSetAmount(5);
              }}
              style={styles.num}
            >
              <Text style={styles.numText}>5</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleSetAmount(6);
              }}
              style={styles.num}
            >
              <Text style={styles.numText}>6</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => {
                handleSetAmount(7);
              }}
              style={styles.num}
            >
              <Text style={styles.numText}>7</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleSetAmount(8);
              }}
              style={styles.num}
            >
              <Text style={styles.numText}>8</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleSetAmount(9);
              }}
              style={styles.num}
            >
              <Text style={styles.numText}>9</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => {
                handleSetAmount(",");
              }}
              style={styles.num}
            >
              <Text style={styles.numText}>,</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleSetAmount(0);
              }}
              style={styles.num}
            >
              <Text style={styles.numText}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                console.log(amountArr);
                amountArr?.pop();
                setAmount(amountArr.join(""));
              }}
              style={styles.num}
            >
              <Text style={styles.numText}>
                <Feather name="delete" size={verticalScale(20)} />
              </Text>
            </TouchableOpacity>
          </View>
          <SendButton
            onPress={setSuccess}
            style={{ marginTop: ScreenHeight * 0.04 }}
          />
        </View>
      </View>
    </View>
  );
};
export default CustomKeyBoard;
const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#EFEFEF",
    bottom: 0,
    top: "2%",
    borderRadius: scale(40),
  },
  input: {
    width: "60%",
  },
  innerContainer: {
    margin: "4%",
    flexDirection: "row",
    justifyContent: "space-between",
    height: "5%",
    alignItems: "center",
  },
  keyboard: {
    height: "100%",
    backgroundColor: "white",
    borderRadius: scale(40),
    bottom: 0,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
    marginTop: ScreenHeight * 0.03,
  },
  num: {
    width: ScreenWidth * 0.3,
    alignItems: "center",
    justifyContent: "center",
    height: ScreenHeight * 0.04,
  },
  numText: {
    color: "#283B51",
    fontFamily: "Roboto_500Medium",
    fontSize: verticalScale(20),
  },
});
