import {
  Animated,
  Easing,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { ScreenHeight, ScreenWidth } from "@rneui/base";
import MainModal from "./MainModal";
import Box from "./Box";
import MainButton from "./MainButton";
import { createNumberArray } from "../../utils/array.utils";
import {
  getDaysInMonth,
  getYear18YearsAgo,
  getYearYearsAgo,
  monthsWithNames,
} from "../../utils/date.utils";
import { animateLayout } from "../../utils/animation.utils";

type Props = {};

function DatePickerModal({
  onSelect,
  close,
  visible,
}: {
  onSelect: (value: Date) => void;
  close: () => void;
  visible: boolean;
}) {
  const maxYear = getYearYearsAgo(0);
  const minimumYear = getYearYearsAgo(0);
  const [year, setYear] = useState(minimumYear);

  const [month, setMonth] = useState<(typeof monthsWithNames)[0] | null>(null);

  const [day, setDay] = useState<number | null>(null);

  const translateY = useRef(new Animated.Value(0)).current;
  const translateYInterpolated = translateY.interpolate({
    inputRange: [0, 1],
    outputRange: [ScreenHeight - 100, 0], // Translate along the Y-axis by 100 units
  });

  const animate = () => {
    Animated.timing(translateY, {
      toValue: 1,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animate();
  }, []);

  const scrollViewRef = useRef<ScrollView>(null);
  const [step, setStep] = useState(1);
  const [totalWidth, setTotalWidth] = useState(ScreenWidth);

  const scrollNext = () => {
    setStep((curr) => curr + 1);
  };
  const scrollPrev = () => {
    setStep((curr) => curr - 1);
  };

  return (
    <MainModal
      visible={visible}
      transparent
      onRequestClose={close}
      position="bottom"
    >
      <Box height={ScreenHeight - 100} block>
        {year && (
          <Box block align="center" py={10}>
            <MainButton
              icon={{
                name: step === 1 ? "calendar" : "chevron-left",
                gap: 1,
              }}
              label={`${day || ""} ${month?.name || ""} ${year || ""}`}
              wrapperProps={{ justify: "space-between" }}
              onPress={() => scrollPrev()}
              disabled={step === 1 ? true : false}
              size="sm"
            />
          </Box>
        )}
        <Box block flex={1}>
          {step === 1 && (
            <ScrollView
              style={{ maxWidth: ScreenWidth - 40 }}
              contentContainerStyle={{
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-evenly",
                gap: 10,
              }}
            >
              {/* TODO: Allow Mni and Max Adjustment */}
              {createNumberArray(minimumYear, maxYear)
                .sort((a, b) => b - a)
                .map((_year) => (
                  <MainButton
                    key={_year}
                    label={_year}
                    type={year === _year ? "primary" : "primary-outlined"}
                    onPress={() => {
                      animateLayout();
                      setYear(_year);
                      scrollNext();
                    }}
                    size="xs"
                  />
                ))}
            </ScrollView>
          )}

          {step === 2 && (
            <Box
              direction="row"
              px={10}
              gap={20}
              justify="space-between"
              wrap="wrap"
              width={ScreenWidth - 20}
            >
              {year && (
                <>
                  {monthsWithNames.map((_month) => (
                    <MainButton
                      key={_month?.month}
                      label={_month.name}
                      type={
                        month?.name === _month.name
                          ? "primary"
                          : "primary-outlined"
                      }
                      size="xs"
                      width={80}
                      onPress={() => {
                        animateLayout();
                        setMonth(_month);
                        scrollNext();
                      }}
                    />
                  ))}
                </>
              )}
            </Box>
          )}

          {step === 3 && (
            <Box
              direction="row"
              gap={20}
              wrap="wrap"
              justify="flex-start"
              width={ScreenWidth - 20}
            >
              {year && month && (
                <>
                  {getDaysInMonth(year, month.month).map((_day) => (
                    <MainButton
                      key={_day}
                      label={_day}
                      type={day === _day ? "primary" : "primary-outlined"}
                      size="xs"
                      width={70}
                      onPress={() => {
                        animateLayout();
                        setDay(_day);
                      }}
                    />
                  ))}
                </>
              )}
            </Box>
          )}
          {year && month && day && (
            <Box pa={20}>
              <MainButton
                label={"Done"}
                block
                type="primary"
                onPress={() => {
                  let dateObj = new Date(year, month.month, day);
                  onSelect(dateObj);
                  close();
                }}
              />
            </Box>
          )}
        </Box>
      </Box>
    </MainModal>
  );
}

export default DatePickerModal;

const styles = StyleSheet.create({});
