import { Feather } from "@expo/vector-icons";
import React, { ReactNode, useEffect, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { animateLayout } from "../../utils/animation.utils";
import Box, { AnimatedBox, BoxProps } from "./Box";
import MainText, { MainTextProps } from "./MainText";
import { ScreenHeight } from "@rneui/base";
import Colors from "../../constants/Colors";

const ExpansionPanel = ({
  title,
  scrollable = false,
  expanded = false,
  expandedHeight = ScreenHeight / 2,
  enableBackground = false,
  headerProps,
  bodyProps,
  wrapperProps,
  titleProps,
  titlePrefix,
  children,
}: {
  title: string;
  scrollable?: boolean;
  expanded?: boolean;
  expandedHeight?: number;
  enableBackground?: boolean;
  headerProps?: Omit<BoxProps, "children">;
  wrapperProps?: Omit<BoxProps, "children">;
  bodyProps?: Omit<BoxProps, "children">;
  titleProps?: Omit<MainTextProps, "children">;
  titlePrefix?: ReactNode;
  children: ReactNode;
}) => {
  const [isExpanded, setIsExpanded] = useState(expanded);
  const expandedValue = useSharedValue(expanded ? 1 : 0);

  useEffect(() => {
    expandedValue.value = expanded ? 1 : 0;
  }, [expanded, expandedValue]);

  const toggleExpand = () => {
    animateLayout();
    expandedValue.value = expandedValue.value === 0 ? 1 : 0;
    setIsExpanded((prev) => !prev);
  };

  const panelHeight = useAnimatedStyle(() => {
    return {
      height: scrollable
        ? withTiming(
            interpolate(expandedValue.value, [0, 1], [0, expandedHeight]),
            {
              duration: 300, // 1 second duration
              easing: Easing.inOut(Easing.ease),
            }
          )
        : "auto",
      maxHeight: withTiming(
        interpolate(expandedValue.value, [0, 1], [0, expandedHeight]),
        {
          duration: 300, // 1 second duration
          easing: Easing.inOut(Easing.ease),
        }
      ),
    };
  });

  return (
    <Box
      block
      overflow="hidden"
      {...wrapperProps}
      color={
        expandedValue.value && enableBackground
          ? Colors.theme.surfaceLight
          : "transparent"
      }
      radius={20}
    >
      <TouchableOpacity onPress={toggleExpand}>
        <Box
          py={15}
          px={expandedValue.value && enableBackground ? 15 : 10}
          align="center"
          justify="space-between"
          direction="row"
          color={
            expandedValue.value && enableBackground
              ? Colors.theme.text
              : "transparent"
          }
          {...headerProps}
        >
          <Box direction="row" align="center" justify="center" gap={10}>
            {titlePrefix && titlePrefix}
            <MainText
              fontWeight={expandedValue.value ? "bold" : "regular"}
              color={
                expandedValue.value && enableBackground
                  ? Colors.theme.background
                  : Colors.theme.text
              }
              {...titleProps}
            >
              {title}
            </MainText>
          </Box>
          <Feather
            name={isExpanded ? "chevron-up" : "chevron-right"}
            size={16}
            color={
              expandedValue.value && enableBackground
                ? Colors.theme.background
                : Colors.theme.text
            }
          />
        </Box>
      </TouchableOpacity>
      <AnimatedBox style={[panelHeight, { overflow: "hidden" }]}>
        {scrollable && (
          <ScrollView
            style={{ flex: 1, height: expandedHeight }}
            nestedScrollEnabled
          >
            <Box
              px={expandedValue.value && enableBackground ? 20 : 10}
              {...bodyProps}
              block
            >
              {children}
            </Box>
          </ScrollView>
        )}
        {!scrollable && (
          <Box
            px={expandedValue.value && enableBackground ? 20 : 10}
            {...bodyProps}
          >
            {children}
          </Box>
        )}
      </AnimatedBox>
    </Box>
  );
};

export default ExpansionPanel;
