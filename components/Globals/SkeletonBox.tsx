import { ReactNode } from "react";
import { DimensionValue, FlexStyle, ViewStyle } from "react-native";
import { SkeletonProps, Skeleton } from "@rneui/base";

export default function SkeletonBox({
  SkeletonProps,
  style,
  children,
  block = false,
  direction = "column",
  gap,
  alignSelf,
  align,
  justify,
  borderWidth = 0,
  px,
  py,
  pa,
  mx,
  my,
  ma,
  pt,
  pb,
  pl,
  pr,
  mt,
  mb,
  ml,
  mr,
  width,
  height = "auto",
  color = "transparent",
  radius = 0,
  radiusTop,
  radiusBottom,
  flex,
  wrap,
  position,
  overflow,
  animated = false,
  opacity = 1,
}: BoxProps) {
  return (
    <Skeleton
      style={{
        flexDirection: direction,
        flexWrap: wrap,
        alignSelf,
        gap,
        alignItems: align,
        justifyContent: justify,
        width: width ? width : block ? "100%" : "auto",
        height: height,
        padding: pa,
        paddingHorizontal: px,
        paddingVertical: py,
        paddingLeft: pl,
        paddingRight: pr,
        paddingTop: pt,
        paddingBottom: pb,
        margin: ma,
        marginHorizontal: ma ? ma : mx,
        marginVertical: ma ? ma : my,
        marginLeft: ml,
        marginRight: mr,
        marginTop: mt,
        marginBottom: mb,
        backgroundColor: color,
        borderRadius: radius,
        borderWidth,
        maxWidth: "100%",
        opacity,
        flex,
        position,
        borderTopLeftRadius: radiusTop || radius,
        borderTopRightRadius: radiusTop || radius,
        borderBottomLeftRadius: radiusBottom || radius,
        borderBottomRightRadius: radiusBottom || radius,
        overflow,
        ...style,
      }}
      {...SkeletonProps}
      skeletonStyle={{
        borderRadius: radius,
      }}
    >
      {children}
    </Skeleton>
  );
}

export interface BoxProps {
  children?: ReactNode;
  block?: boolean;
  direction?: FlexStyle["flexDirection"];
  gap?: FlexStyle["gap"];
  align?: FlexStyle["alignItems"];
  alignSelf?: FlexStyle["alignSelf"];
  justify?: FlexStyle["justifyContent"];
  px?: DimensionValue;
  py?: DimensionValue;
  pa?: DimensionValue;
  mx?: DimensionValue;
  my?: DimensionValue;
  ma?: DimensionValue;
  pt?: DimensionValue;
  pb?: DimensionValue;
  pl?: DimensionValue;
  pr?: DimensionValue;
  mt?: DimensionValue;
  mb?: DimensionValue;
  ml?: DimensionValue;
  mr?: DimensionValue;
  borderWidth?: ViewStyle["borderWidth"];
  width?: ViewStyle["width"];
  height?: ViewStyle["height"];
  color?: ViewStyle["backgroundColor"];
  radius?: ViewStyle["borderRadius"];
  wrap?: FlexStyle["flexWrap"];
  opacity?: ViewStyle["opacity"];
  flex?: FlexStyle["flex"];
  position?: ViewStyle["position"];
  radiusTop?: number;
  radiusBottom?: number;
  animated?: boolean;
  overflow?: ViewStyle["overflow"];
  SkeletonProps?: Omit<SkeletonProps, "style">;
  style?: ViewStyle;
}
