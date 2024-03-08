import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import MainModal from "./MainModal";
import { Calendar, CalendarProps } from "react-native-calendars";
import MainButton from "./MainButton";
import Colors from "../../constants/Colors";
import { verticalScale } from "react-native-size-matters";
import MainText from "./MainText";
import Box from "./Box";

type Props = {
  visible: boolean;
  close: () => void;
  onDateChanged: (date: Date | string) => void;
  callToAction: () => void;
  label?: string;
  CalendarProps?: CalendarProps;
};

const RangeDatePicker = (props: Props) => {
  const [selected, setSelected] = useState("");

  return (
    <MainModal
      position="bottom"
      onRequestClose={props.close}
      hideCloseButton={selected ? true : false}
      visible={props.visible}
    >
      <Box align="center" width={"100%"}>
        <MainText fontWeight="bold" color={Colors.theme.primaryOrange}>
          {props.label}
        </MainText>
      </Box>
      <Calendar
        onDayPress={(day) => {
          props.onDateChanged(day.dateString);
          setSelected(day.dateString);
        }}
        {...props.CalendarProps}
        markedDates={{
          [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: Colors.theme.primaryOrange,
          },
        }}
      />

      <MainButton
        onPress={() => props.callToAction()}
        disabled={!selected.length}
        color={Colors.theme.primaryOrange}
        height={verticalScale(55)}
        label={"CONTINUE"}
      />
    </MainModal>
  );
};

export default RangeDatePicker;
