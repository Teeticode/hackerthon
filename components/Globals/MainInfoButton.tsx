import Box, { BoxProps } from "./Box";
import MainText, { MainTextProps } from "./MainText";
import Colors from "../../constants/Colors";
import MainIconButton from "./MainIconButton";
import { moderateScale } from "react-native-size-matters";
import MainButton from "./MainButton";

export default function MainInfoButton({
  action,
  label,
  labelProps,
  wrapperProps,
  icon,
}: MainInfoButtonProps) {
  return (
    <MainButton onPress={() => action()} type="text">
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
        <MainIconButton
          source="AntDesign"
          name="arrowright"
          onPress={() => action()}
          size={moderateScale(20)}
          color={Colors.theme.primary}
        />
      </Box>
    </MainButton>
  );
}

interface MainInfoButtonProps {
  action: () => void;
  label?: string;
  icon?: React.ReactNode;
  labelProps?: MainTextProps;
  wrapperProps?: BoxProps;
}
