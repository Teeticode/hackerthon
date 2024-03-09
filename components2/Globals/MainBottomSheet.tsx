import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import React, { useCallback, useMemo, useRef, Ref } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { moderateScale } from "react-native-size-matters";
import Animated from "react-native-reanimated";
type Props = {
  sheetRef?: Ref<BottomSheetMethods>;
  snapPoints?: string[];
  index?: number;
  handleIndicatorStyle?: object;
  backgroundStyle?: object;
  style?: StyleProp<
    Animated.AnimateStyle<
      Omit<
        ViewStyle,
        | "left"
        | "right"
        | "position"
        | "top"
        | "bottom"
        | "opacity"
        | "flexDirection"
        | "transform"
      >
    >
  >;
  children: React.ReactNode;
};

const MainBottomSheet = ({
  sheetRef: propSheetRef,
  snapPoints = ["50%", "70%"],
  index = -1,
  handleIndicatorStyle = { width: moderateScale(66) },
  backgroundStyle = { backgroundColor: "#D3EFF1" },
  style = { justifyContent: "flex-start" },
  children,
}: Props) => {
  const sheetRef = useRef<BottomSheetMethods | null>(null);

  const handleSheetChange = useCallback((currentIndex: number) => {
    // Handle sheet change if needed
  }, []);

  const localSheetRef = propSheetRef || sheetRef;

  // Conditionally render BottomSheet based on whether sheetRef is provided
  const renderBottomSheet = useMemo(
    () => (
      <BottomSheet
        ref={localSheetRef}
        index={index}
        enablePanDownToClose={true}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
        handleIndicatorStyle={handleIndicatorStyle}
        backgroundStyle={backgroundStyle}
        style={style}
      >
        {children}
      </BottomSheet>
    ),
    [
      localSheetRef,
      index,
      snapPoints,
      handleSheetChange,
      handleIndicatorStyle,
      backgroundStyle,
      style,
      children,
    ]
  );

  return renderBottomSheet;
};

export default MainBottomSheet;
