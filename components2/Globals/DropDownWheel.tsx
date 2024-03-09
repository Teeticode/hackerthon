import { StyleSheet, Platform } from "react-native";
import React from "react";
import { Button, Overlay } from "@rneui/themed";
import { DatePicker, Picker } from "react-native-wheel-pick";
import { AntDesign } from "@expo/vector-icons";
import MainModal from "../Globals/MainModal";
import MainButton from "../Globals/MainButton";
import Spacer from "../Globals/Spacer";
import { moderateScale, scale } from "react-native-size-matters";
import Row from "./Row";
import Colors from "../../constants/Colors";

type Props = {
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T = string | React.ChangeEvent<any>>(
      field: T
    ): T extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  field: string;
  onClose: () => void;
  isVisible: boolean;
  pickerData:
    | string[]
    | number[]
    | {
        label: string;
        value: string | number;
      }[];
  defaultValue: string;
  selectedValue: string;
  values?: any;
  date?: boolean;
  placeholder?: string;
};

const DropDownOverlayWheel = ({
  handleChange,
  field,
  onClose,
  isVisible,
  pickerData,
  selectedValue,
  placeholder,
  date,
  values,
}: Props) => {
  return (
    <MainModal
      visible={isVisible}
      onRequestClose={() => onClose()}
      position="bottom"
      containerProps={{ align: "center" }}
    >
      {!date ? (
        <Picker
          value={selectedValue}
          style={{
            backgroundColor: "white",
            width: scale(300),
            height: scale(215),
          }}
          selectedValue={selectedValue}
          pickerData={[`Choose ${field}`, ...pickerData]}
          onValueChange={(value: string) => {
            handleChange({
              target: {
                name: field,
                value: value,
              },
            });
          }}
        />
      ) : (
        <DatePicker
          style={{ height: scale(215), width: scale(300) }}
          date={
            new Date(
              values
                ? values[field].length > 0
                  ? values[field]
                  : "1999-07-27T00:00:00.000Z"
                : placeholder || "1999-07-27T00:00:00.000Z"
            )
          } // Optional prop - default is Today
          onDateChange={(date: string) => {
            handleChange({
              target: {
                name: "date",
                value: date,
              },
            });
          }}
        />
      )}
      {/* <Row>
        <Button title="Confirm" onPress={() => onClose()} />
        <Button
          title="Cancel"
          onPress={() => {
            onClose();
            handleChange({
              target: {
                name: field,
                value: "",
              },
            });
          }}
        />
      </Row> */}
      <Row>
        <MainButton
          label="Cancel"
          color={Colors.theme.error}
          onPress={() => {
            onClose();
            handleChange({
              target: {
                name: field,
                value: "",
              },
            });
          }}
        />

        <MainButton
          onPress={() => {
            onClose();
          }}
          color={Colors.theme.primaryBackground}
          // icon={{
          //   name: "check",
          //   size: scale(20),
          //   position: "append",
          //   color: Colors.theme.light,
          //   source: "AntDesign",
          // }}
          label="Confirm"
        />
      </Row>
    </MainModal>
  );
};

export default DropDownOverlayWheel;
