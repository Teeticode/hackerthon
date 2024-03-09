// Tabs.tsx

import React from "react";
import { View, Text, Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { moderateScale, verticalScale } from "react-native-size-matters";
import MainText from "./MainText";

interface TabProps {
  label: string;
  index: number;
  onPress: (index: number) => void;
  isActive: boolean;
}

const Tab: React.FC<TabProps> = ({ label, index, onPress, isActive }) => {
  const springConfig = {
    damping: 10,
    stiffness: 100,
  };

  const scale = useSharedValue(1);

  scale.value = withSpring(isActive ? 1.2 : 1, springConfig);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      backgroundColor: isActive ? "white" : "transparent",
      borderRadius: isActive ? 30 : 0, // Adjust the border radius as needed
    };
  });

  return (
    <Pressable
      onPress={() => onPress(index)}
      android_ripple={{ color: "lightgrey" }}
    >
      <Animated.View
        style={[
          {
            padding: moderateScale(10),
            marginHorizontal: moderateScale(23),
            width: moderateScale(94),
            height: verticalScale(30),
            alignItems: "center",
          },
          animatedStyle,
        ]}
      >
        <MainText
          size={moderateScale(10)}
          fontWeight="bold"
          color={isActive ? "black" : "grey"}
        >
          {label}
        </MainText>
      </Animated.View>
    </Pressable>
  );
};

interface TabsProps {
  tabs: string[];
  activeTab: number;
  onChange: (index: number) => void;
}

const MainTabs: React.FC<TabsProps> = ({ tabs, activeTab, onChange }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "#F3F3F3",
        borderRadius: moderateScale(20),
        padding: moderateScale(10),
      }}
    >
      {tabs.map((label, index) => (
        <Tab
          key={index}
          label={label}
          index={index}
          onPress={onChange}
          isActive={index === activeTab}
        />
      ))}
    </View>
  );
};

export default MainTabs;
