import React, { ReactNode } from "react";
import { Text, TextProps, TextStyle } from "react-native";
import Colors from "../../constants/Colors";
import { moderateScale } from "react-native-size-matters";

const MainText = ({
  pr,
  py,
  px,
  mr,
  mb,
  ml,
  mt,
  pb,
  pt,
  pl,
  mx,
  my,

  style,
  size = "md",
  color,
  weight = "normal",
  fontWeight,
  align = "auto",
  lineHeight,
  textDecorationLine,
  textDecorationColor,
  textDecorationStyle,
  textTransform,
  fontStyle,
  textShadowOffset,
  textShadowRadius,
  textShadowColor,
  includeFontPadding,
  fontFamily = "Roboto",
  fontVariant,
  letterSpacing,
  maxWidth,
  darkModeColor,
  icon,
  textProps,
  children,
}: MainTextProps) => {
  const textSize = () => {
    if (typeof size === "string") {
      const foundSize = textSizes.find((options) => options.size === size);
      if (!foundSize)
        return textSizes.find((options) => options.size === "md")!.value;
      return foundSize.value;
    } else {
      return size;
    }
  };

  return (
    <Text
      style={{
        marginLeft: ml,
        marginRight: mr,
        marginTop: mt,
        marginBottom: mb,
        paddingLeft: pl,
        paddingRight: pr,
        paddingTop: pt,
        paddingBottom: pb,
        marginVertical: my,
        marginHorizontal: mx,

        color: color
          ? color
          : darkModeColor
          ? darkModeColor
          : Colors.light.text,
        fontSize: textSize(),
        fontWeight: weight,
        width: "auto",
        textAlign: align,
        lineHeight,
        textDecorationLine,
        textDecorationColor,
        textDecorationStyle,
        textTransform,
        fontStyle,
        textShadowOffset,
        textShadowRadius,
        textShadowColor,
        includeFontPadding,
        fontFamily: fontWeight
          ? mapFontweightToFontFamily(fontWeight)
          : fontFamily,
        fontVariant,
        letterSpacing,
        maxWidth,
        ...style,
      }}
      {...textProps}
    >
      {children}
    </Text>
  );
};

export default MainText;

function mapFontweightToFontFamily(weight: FontWeight, fontPrefix = "Roboto_") {
  switch (weight) {
    case "extralight":
      return `${fontPrefix}100Thin`;
    case "extralightItalic":
      return `${fontPrefix}100Thin_Italic`;
    case "light":
      return `${fontPrefix}300Light`;
    case "lightItalic":
      return `${fontPrefix}300Light_Italic`;
    case "regular":
      return `${fontPrefix}400Regular`;
    case "regularItalic":
      return `${fontPrefix}400Regular_Italic`;
    case "semibold":
      return `${fontPrefix}500Medium`;
    case "semiboldItalic":
      return `${fontPrefix}500Medium_Italic`;
    case "bold":
      return `${fontPrefix}700Bold`;
    case "boldItalic":
      return `${fontPrefix}700Bold_Italic`;
    case "extrabold":
      return `${fontPrefix}ExtraBold`;
    case "black":
      return `${fontPrefix}900Black`;
    case "blackItalic":
      return `${fontPrefix}900Black_Italic`;
    default:
      return `${fontPrefix}`;
  }
}

const textSizes = [
  { size: "xxxs", value: moderateScale(8) },
  { size: "xxs", value: moderateScale(10) },
  { size: "xs", value: moderateScale(12) },
  { size: "sm", value: moderateScale(14) },
  { size: "md", value: moderateScale(16) },
  { size: "lg", value: moderateScale(18) },
  { size: "xl", value: moderateScale(20) },
  { size: "xxl", value: moderateScale(24) },
  { size: "xxxl", value: moderateScale(28) },
] as const;

type TextSize = (typeof textSizes)[number]["size"];

export interface MainTextProps {
  px?: number;
  py?: number;
  mx?: number;
  my?: number;
  pb?: number;
  pl?: number;
  pr?: number;
  pt?: number;
  mt?: number;
  mr?: number;
  mb?: number;
  ml?: number;

  color?: TextStyle["color"];
  style?: TextStyle;
  size?: TextStyle["fontSize"] | TextSize;
  weight?: TextStyle["fontWeight"];
  align?: TextStyle["textAlign"];
  lineHeight?: TextStyle["lineHeight"];
  textDecorationLine?: TextStyle["textDecorationLine"];
  textDecorationStyle?: TextStyle["textDecorationStyle"];
  textDecorationColor?: TextStyle["textDecorationColor"];
  textTransform?: TextStyle["textTransform"];
  fontStyle?: TextStyle["fontStyle"];
  textShadowOffset?: TextStyle["textShadowOffset"];
  textShadowRadius?: TextStyle["textShadowRadius"];
  textShadowColor?: TextStyle["textShadowColor"];
  includeFontPadding?: TextStyle["includeFontPadding"];
  fontFamily?: TextStyle["fontFamily"];
  fontVariant?: TextStyle["fontVariant"];
  letterSpacing?: TextStyle["letterSpacing"];
  fontWeight?: FontWeight;
  darkModeColor?: TextStyle["color"];
  maxWidth?: TextStyle["maxWidth"];
  icon?: {
    name: any;
    position?: "append" | "prepend";
    size?: number;
    color?: string;
    gap?: number;
  };
  textProps?: TextProps;
  children: ReactNode;
}

type FontWeight =
  | "extralight"
  | "light"
  | "regular"
  | "semibold"
  | "extrabold"
  | "bold"
  | "black"
  | "extralightItalic"
  | "italic"
  | "lightItalic"
  | "regularItalic"
  | "semiboldItalic"
  | "boldItalic"
  | "blackItalic";
