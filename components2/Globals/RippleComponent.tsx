import React, { useRef, useEffect } from "react";
import { StyleSheet, Animated, Easing } from "react-native";
import { scale } from "../../constants/Scaler";

const Ripple = ({
  borderRadius,
  borderColor,
}: {
  borderRadius: number;
  borderColor: string;
}) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const startRippleAnimation = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.2,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 0,
        useNativeDriver: false,
      }),
    ]).start(() => {
      startRippleAnimation(); // Restart the animation
    });
  };

  useEffect(() => {
    startRippleAnimation();
  }, []);

  return (
    <Animated.View
      style={[
        styles.ripple,
        {
          borderRadius: scale(borderRadius) / 2,
          borderColor: borderColor,
        },
        { transform: [{ scale: scaleValue }] },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  ripple: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderWidth: 1,
  },
});

export default Ripple;
