import { Switch } from "react-native";
import Box, { BoxProps } from "./Box";
import MainText, { MainTextProps } from "./MainText";
import Colors from "../../constants/Colors";

export default function MainSwitchButton({
  value,
  onValueChange,
  label,
  labelProps,
  wrapperProps,
  icon,
}: SwitchButtonProps) {
  return (
    <Box
      block
      gap={10}
      justify="space-between"
      direction="row"
      align="center"
      {...wrapperProps}
    >
      <Box direction="row" align="center">
        {icon && <Box mx={10}>{icon}</Box>}
        {label && (
          <MainText fontWeight="bold" {...labelProps}>
            {label}
          </MainText>
        )}
      </Box>
      <Switch
        trackColor={{ false: Colors.theme.surface, true: Colors.theme.primary }}
        thumbColor={Colors.theme.surface}
        ios_backgroundColor={Colors.theme.surface}
        style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
        value={value}
        onValueChange={onValueChange}
      />
    </Box>
  );
}

interface SwitchButtonProps {
  value: boolean;
  onValueChange: () => void;
  label?: string;
  icon?: React.ReactNode;
  labelProps?: MainTextProps;
  wrapperProps?: BoxProps;
}
