import { StyleSheet, Platform } from "react-native";
import React from "react";
import { Overlay } from "@rneui/themed";
import { DatePicker, Picker } from "react-native-wheel-pick";
import { scale } from "../../constants/Scaler";
import MainModal from "./MainModal";

type Props = {
  handleChange?: {
    (e: React.ChangeEvent<any>): void;
    <T = string | React.ChangeEvent<any>>(
      field: T
    ): T extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  field?: string;
  onClose: () => void;
  isVisible: boolean;
  pickerData?: string[];
  defaultValue?: string;
  selectedValue?: string;
  position: "bottom" | "center" | "top";
  values?: any;
  date?: boolean;
  minDate:string ,
  maxDate:string,
  placeholder?: string | null;
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
  position,
  minDate,
  maxDate
}: Props) => {
  return (
    <MainModal
      position={position}
      visible={isVisible}
      onRequestClose={() => onClose()}
    >
      {!date ? (
        <Picker
          style={{
            backgroundColor: "white",
            width: scale(300),
            height: scale(215),
          }}
          selectedValue={selectedValue}
          pickerData={[`Choose ${field}`, ...(pickerData ?? [])]}
          onValueChange={(value: string) => {
            handleChange?.({
              target: {
                name: field,
                value: value,
              },
            });
          }}
        />
      ) : (
        <DatePicker
          style={{
            height: scale(215),
            width: scale(300),
            
            backgroundColor: "transparent",
          }}
          // date={
          //   new Date(
          //     values
          //       ? values[field ?? ""].length > 0
          //         ? values[field ?? ""]
          //         : "1999-07-27T00:00:00.000Z"
          //       : placeholder || "1999-07-27T00:00:00.000Z"
          //   )
          // } // Optional prop - default is Today
          minimumDate={new Date(minDate)}
          maximumDate={new Date(maxDate)}
          onDateChange={(date: string) => {
            console.log(field);
            handleChange?.({
              target: {
                name: field,
                value: date,
              },
            });
          }}
        />
      )}
      {/* <CleanRow>
        <PayecardActionButton title="Confirm" onPress={() => onClose()} />
        <PayecardActionButton
          RevertedColor
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
      </CleanRow> */}
    </MainModal>
  );
};

export default DropDownOverlayWheel;
