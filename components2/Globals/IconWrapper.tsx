import React from "react";
import { Pressable, StyleSheet, TouchableOpacity } from "react-native";
import { View, ViewProps } from "../Themed";
import { scale } from "../../constants/Scaler";
interface IconWrapperProps extends ViewProps {
  backgroundColor: string;
  size: number;
  callBack?: () => void;
  disabled?: boolean;
}
const IconWrapper: React.FC<IconWrapperProps> = ({
  backgroundColor,
  size,
  style,
  disabled,
  callBack,
  ...rest
}) => {
  return (
    <TouchableOpacity disabled={disabled} onPress={() => callBack?.()}>
      <View
        style={[
          styles.container,
          {
            width: scale(size),
            height: scale(size),
            backgroundColor: backgroundColor,
            borderRadius: scale(size / 2),
          },
          style,
        ]}
        {...rest}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default IconWrapper;
