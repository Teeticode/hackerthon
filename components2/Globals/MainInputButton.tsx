import React, { ReactNode } from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  ViewStyle,
} from "react-native";
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import Box, { AnimatedBox, BoxProps } from "./Box";
import Icon, { IconProps } from "./Icon";
import MainText, { MainTextProps } from "./MainText";
import Colors from "../../constants/Colors";
import { moderateScale } from "react-native-size-matters";

const MainInputButton = (props: MainInputButtonProps) => {
  const {
    color = `${Colors.theme.input}`,
    icon,
    labelProps: { ...labelProps } = {
      color: Colors.theme.text,
    },
    labelTitle,
    borderColor = Colors.theme.inputBorder,
    label,
    loading = false,
    onPress,
    type = "primary",
    disabled = false,
    wrapperProps,
    radius = 4,
    size = "md",
    children,
    ...outerWrapperProps
  } = props;

  const sizeStyles = getButtonStyles(size);

  const scaleValue = useSharedValue(1);

  const animatedButtonStyle = useAnimatedStyle(
    () =>
      ({
        transform: [{ scale: scaleValue.value }],
      } as any)
  );

  const handlePressIn = () => {
    if (!disabled && !loading) scaleValue.value = withSpring(0.9);
  };

  const handlePressOut = () => {
    if (!disabled && !loading) scaleValue.value = withSpring(1);
  };

  const iconColor = () => {
    if (icon?.color) return icon.color;
    if (type === "primary") {
      return "white";
    }
    if (type === "primary-outlined") {
      return Colors.theme.primary;
    }
    if (type === "secondary-outlined") {
      return Colors.theme.primaryDark;
    }
    if (type === "secondary") {
      return Colors.theme.primaryDark;
    }
  };

  const labelColor = () => {
    if (type === "primary") {
      return "white";
    }
    if (type === "primary-outlined") {
      return Colors.theme.primary;
    }
    if (type === "secondary-outlined") {
      return Colors.theme.primaryDark;
    }
    if (type === "secondary") {
      return Colors.theme.light;
    }
    if (type === "primary-orange") {
      return Colors.theme.primaryDark;
    }
    if (type === "primary-orange-outlined") {
      return Colors.theme.primaryDark;
    }
  };

  const buttonColors = () => {
    if (color) {
      return { background: color, border: "transparent" };
    }
    if (type === "primary") {
      return { background: Colors.theme.primary, border: "transparent" };
    }
    if (type === "primary-outlined") {
      return { background: "transparent", border: Colors.theme.primary };
    }
    if (type === "surface") {
      return { background: Colors.theme.surface, border: "transparent" };
    }
    if (type === "secondary-outlined") {
      return { background: "transparent", border: Colors.theme.primaryDark };
    }
    if (type === "secondary") {
      return { background: Colors.theme.primaryDark, border: "transparent" };
    }
    return { background: "transparent", border: "transparent" };
  };

  function iconGapBasedOnSize() {
    if (size === "xxxs") return 2;
    if (size === "xxs") return 4;
    if (size === "xs") return 6;
    if (size === "sm") return 8;
    if (size === "md") return 10;
    if (size === "lg") return 12;
    if (size === "xl") return 14;
    if (size === "xxl") return 16;
    if (size === "xxxl") return 18;
  }

  const ButtonIcon = ({ icon }: { icon: IconProps }) => (
    <Icon size={icon.size ? icon.size : size} color={iconColor()} {...icon} />
  );

  return (
    <Box>
      {labelTitle && (
        <MainText
          mb={8}
          size={"sm"}
          color={Colors.theme.inputLabel}
          fontWeight="light"
          {...labelProps}
        >
          {labelTitle}
        </MainText>
      )}
      <AnimatedBox
        style={animatedButtonStyle}
        radius={radius}
        color={buttonColors()?.background}
        borderColor={Colors.theme.inputBorder}
        borderWidth={type.includes("outlined") ? 1 : 0}
        align="center"
        justify="center"
        {...outerWrapperProps}
        opacity={disabled ? 0.7 : 1}
      >
        <Pressable
          style={{
            width: "100%",
            alignItems: outerWrapperProps.align || "center",
            justifyContent: outerWrapperProps.justify || "center",
            paddingVertical: children ? 0 : sizeStyles.paddingVertical,
            paddingHorizontal: children ? 0 : sizeStyles.paddingHorizontal,
            borderRadius: radius,
          }}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={() => {
            if (onPress) onPress();
          }}
          disabled={disabled || loading}
        >
          {children ? (
            <>
              {loading && (
                <ActivityIndicator size={"small"} color={labelColor()} />
              )}
              {children}
            </>
          ) : (
            <Box
              gap={icon ? (icon.gap ? icon.gap : iconGapBasedOnSize()) : 0}
              radius={40}
              direction={outerWrapperProps.direction || "row"}
              align="center"
              justify="center"
              width={"100%"}
              {...wrapperProps}
            >
              {loading && (
                <ActivityIndicator size={"small"} color={labelColor()} />
              )}
              {loading === false && (
                <>
                  {icon && icon.position !== "append" && (
                    <ButtonIcon icon={icon} />
                  )}
                  <MainText
                    color={labelColor()}
                    size={size}
                    fontWeight="semibold"
                    {...labelProps}
                  >
                    {label}
                  </MainText>
                  {icon && icon.position === "append" && (
                    <ButtonIcon icon={icon} />
                  )}
                </>
              )}
            </Box>
          )}
        </Pressable>
      </AnimatedBox>
    </Box>
  );
};

export default MainInputButton;

export function SectionButton(props: MainInputButtonProps) {
  return (
    <MainInputButton
      px={0}
      radius={moderateScale(30)}
      icon={{
        name: "chevron-right",
        size: 24,
        position: "append",
        color: Colors.theme.surface,
      }}
      wrapperProps={{ justify: "space-between" }}
      height={60}
      color={Colors.theme.surface}
      {...props}
      labelProps={{
        size: 14,
        color: Colors.theme.surface,
        ...props.labelProps,
      }}
    />
  );
}

export function ThemedIconButton({
  type = "text",
  icon,
  size = 40,
  height,
  width,
  background,
  radius = 60,
  ...pressableProps
}: IconButtonProps) {
  const buttonColors = () => {
    if (background) {
      return { background, border: "transparent" };
    }
    if (type === "primary") {
      return { background: Colors.theme.stroke, border: "transparent" };
    }
    if (type === "primary-outlined") {
      return { background: "transparent", border: Colors.theme.stroke };
    }
    if (type === "secondary-outlined") {
      return { background: "transparent", border: Colors.theme.text };
    }
    if (type === "secondary") {
      return { background: Colors.theme.text, border: "transparent" };
    }
    return { background: "transparent", border: "transparent" };
  };

  const iconColor = () => {
    if (icon?.color) return icon.color;
    if (type === "primary") {
      return "white";
    }
    if (type === "primary-outlined" || type === "secondary-outlined") {
      return Colors.theme.text;
    }
    if (type === "secondary") {
      return Colors.dark.background;
    }
  };

  return (
    <Pressable
      {...pressableProps}
      style={{
        backgroundColor: buttonColors().background,
        borderColor: buttonColors().border,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        height: height ? height : size,
        width: width ? width : size,
        borderRadius: radius,
      }}
      android_ripple={{
        borderless: true,
      }}
    >
      <Icon {...icon} color={iconColor()} />
    </Pressable>
  );
}

export function ThemedToggleButton(props: ToggleButtonProps) {
  return (
    <MainInputButton
      type={props.active ? "primary-outlined" : "text"}
      borderWidth={2}
      {...props}
    />
  );
}

type BoxWrapper = Omit<BoxProps, "children">;
export interface MainInputButtonProps extends BoxWrapper {
  color?: string;
  label?: string | number;
  labelTitle?: string | number;
  labelProps?: Omit<MainTextProps, "children">;
  loading?: boolean;
  onPress?: () => void;
  icon?: ButtonIconProps;
  type?:
    | "text"
    | "secondary"
    | "surface"
    | "primary"
    | "primary-outlined"
    | "secondary-outlined"
    | "primary-orange"
    | "primary-orange-outlined";
  disabled?: boolean;
  wrapperProps?: BoxWrapper;
  size?: ButtonSize;
  radius?: ViewStyle["borderRadius"];
  children?: ReactNode;
}

interface ButtonIconProps extends IconProps {
  position?: "append" | "prepend";
  gap?: number;
}

interface IconButtonProps extends PressableProps {
  type?:
    | "text"
    | "secondary"
    | "primary"
    | "primary-outlined"
    | "secondary-outlined"
    | "primary-orange"
    | "primary-orange-outlined";

  icon: ButtonIconProps;
  size?: number;
  height?: number;
  width?: number;
  background?: string;
  radius?: number;
}

interface ToggleButtonProps extends MainInputButtonProps {
  active?: boolean;
}

type ButtonSize =
  | "xxxs"
  | "xxs"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "xxl"
  | "xxxl";

interface ButtonStyles {
  paddingVertical: number;
  paddingHorizontal: number;
}

const getButtonStyles = (size: ButtonSize): ButtonStyles => {
  let styles: ButtonStyles = {
    paddingVertical: 14,
    paddingHorizontal: 18,
  };

  switch (size) {
    case "xxxs":
      styles = {
        paddingVertical: 6,
        paddingHorizontal: 10,
      };
      break;
    case "xxs":
      styles = {
        paddingVertical: 8,
        paddingHorizontal: 12,
      };
      break;
    case "xs":
      styles = {
        paddingVertical: 10,
        paddingHorizontal: 14,
      };
      break;
    case "sm":
      styles = {
        paddingVertical: 12,
        paddingHorizontal: 16,
      };
      break;
    case "md":
      styles = {
        paddingVertical: 14,
        paddingHorizontal: 18,
      };
      break;
    case "lg":
      styles = {
        paddingVertical: 16,
        paddingHorizontal: 20,
      };
      break;
    case "xl":
      styles = {
        paddingVertical: 18,
        paddingHorizontal: 22,
      };
      break;
    case "xxl":
      styles = {
        paddingVertical: 20,
        paddingHorizontal: 24,
      };
      break;
    case "xxxl":
      styles = {
        paddingVertical: 22,
        paddingHorizontal: 26,
      };
      break;
    default:
      // Default values already set
      break;
  }

  return styles;
};
