import React from "react";
import MainModal from "./MainModal";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Platform } from "react-native";

type Props = {
  visible: boolean;
  onRequestClose: () => void;
  value: Date;
  onChange: (date: Date) => void;
  minimumDate?: Date;
  maximumDate?: Date;
  cannotSelectWeekend?: boolean;
};

const MainDateTimePicker = (props: Props) => {
  return (
    <>
      {Platform.OS == "ios" ? (
        <MainModal
          visible={props.visible}
          onRequestClose={props.onRequestClose}
        >
          <DateTimePicker
            minimumDate={props.minimumDate}
            maximumDate={props.maximumDate}
            value={new Date(props?.value ? props.value : new Date())}
            mode={"date"}
            display="inline"
            onChange={(date) => {
              props.onChange(
                date?.nativeEvent?.timestamp
                  ? new Date(date?.nativeEvent?.timestamp)
                  : new Date()
              );
            }}
          />
        </MainModal>
      ) : props.visible ? (
        <DateTimePicker
          minimumDate={props.minimumDate}
          maximumDate={props.maximumDate}
          value={new Date(props?.value ? props.value : new Date())}
          collapsable
          mode={"date"}
          display="inline"
          onChange={(date) => {
            props.onChange(
              date?.nativeEvent?.timestamp
                ? new Date(date?.nativeEvent?.timestamp)
                : new Date()
            );
          }}
        />
      ) : null}
    </>
  );
};

export default MainDateTimePicker;
