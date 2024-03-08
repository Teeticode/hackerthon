import { StyleSheet, Platform } from "react-native";
import React from "react";
import { Button, Overlay } from "@rneui/themed";
import { DatePicker, Picker } from "react-native-wheel-pick";
import { scale } from "../../constants/Scaler";
import Row from "../Row";
import Colors from "../../constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import MainModal, { MainModalProps } from "../Globals/MainModal";
import MainButton from "../Globals/MainButton";
import Spacer from "../Globals/Spacer";
import { moderateScale } from "react-native-size-matters";

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
  position?: MainModalProps["position"];
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
  position = "bottom",
}: Props) => {
  return (
    <MainModal
      visible={isVisible}
      onRequestClose={() => onClose()}
      position={position}
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
      <Row fullWidth>
        <MainButton
          label="Cancel"
          radius={10}
          type="primary-outlined"
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
          radius={10}
          color={Colors.theme.primaryBgRedesigned}
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
