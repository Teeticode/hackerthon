import { Pressable, PressableProps } from "react-native";
import Icon, { IconProps } from "./Icon";
import Colors from "../../constants/Colors";
import MainIcon from "./MainIcon";

export default function MainIconButton({
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
      return Colors.theme.secondary;
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
      <MainIcon {...icon} color={iconColor()} />
    </Pressable>
  );
}

interface IconButtonProps extends PressableProps {
  type?:
    | "text"
    | "secondary"
    | "primary"
    | "primary-outlined"
    | "secondary-outlined";

  icon: ButtonIconProps;
  size?: number;
  height?: number;
  width?: number;
  background?: string;
  radius?: number;
}

interface ButtonIconProps extends IconProps {
  position?: "append" | "prepend";
  gap?: number;
}
