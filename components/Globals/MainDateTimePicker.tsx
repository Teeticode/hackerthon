import { View, Text } from "react-native";
import React from "react";
import MainModal from "./MainModal";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Platform } from "react-native";
import { CustomFlashMessage } from "./CustomFlashMessage";
import MainButton from "./MainButton";

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
          <MainButton mt={20}>
            <DateTimePicker
              minimumDate={props.minimumDate}
              maximumDate={props.maximumDate}
              value={new Date(props?.value ? props.value : new Date())}
              mode={"date"}
              display="calendar"
              onChange={(date) => {
                if (props.cannotSelectWeekend) {
                  const dateValue = new Date(date.nativeEvent?.timestamp ?? "");
                  if (dateValue.getDay() == 0 || dateValue.getDay() == 6) {
                    CustomFlashMessage(
                      "You cannot select a weekend",
                      "warning"
                    );
                    return false;
                  } else
                    props.onChange(
                      date?.nativeEvent?.timestamp
                        ? new Date(date?.nativeEvent?.timestamp)
                        : new Date()
                    );
                } else
                  props.onChange(
                    date?.nativeEvent?.timestamp
                      ? new Date(date?.nativeEvent?.timestamp)
                      : new Date()
                  );
              }}
            />
          </MainButton>
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
            if (props.cannotSelectWeekend) {
              const dateValue = new Date(date.nativeEvent?.timestamp ?? "");
              if (dateValue.getDay() == 0 || dateValue.getDay() == 6) {
                CustomFlashMessage("You cannot select a weekend", "warning");
                return false;
              } else
                props.onChange(
                  date?.nativeEvent?.timestamp
                    ? new Date(date?.nativeEvent?.timestamp)
                    : new Date()
                );
            } else
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
