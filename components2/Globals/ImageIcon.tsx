import React from "react";
import { GestureResponderEvent, Pressable, StyleProp } from "react-native";
import FastImage, { ImageStyle, Source } from "react-native-fast-image";

interface ImageIconProps {
  source: Source;
  size: number;
  style?: StyleProp<ImageStyle>;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  resizeMode?: "contain" | "cover" | "stretch" | "center";
}

const ImageIcon: React.FC<ImageIconProps> = ({
  source,
  size,
  style,
  resizeMode,
  onPress,
}) => {
  const imageStyle = {
    width: size,
    height: size,
    style: style,
  };

  return (
    <Pressable onPress={onPress}>
      <FastImage
        source={source}
        style={imageStyle}
        resizeMode={resizeMode || "cover"}
      />
    </Pressable>
  );
};

export default ImageIcon;
