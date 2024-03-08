import React from "react";
import Box from "./Box";
import MainButton from "./MainButton";
import MainIcon from "./MainIcon";
import MainText, { MainTextProps } from "./MainText";

export default function MainSectionButton({
  onPress,
  title,
  invertButton,
  titleProps,
  description,
  descriptionProps,
  rightText,
  rightComponent,
}: MainSectionButtonProps) {
  return (
    <MainButton
      type="text"
      onPress={() => {
        onPress();
      }}
    >
      <Box block gap={5}>
        <Box
          block
          gap={10}
          direction="row"
          align="center"
          justify="space-between"
        >
          <MainText fontWeight="bold" {...titleProps}>
            {title}
          </MainText>
          {rightComponent ? (
            rightComponent
          ) : (
            <>
              {rightText ? (
                <Box gap={10} direction="row" align="center">
                  <MainText size={"sm"}>{rightText}</MainText>
                  <MainIcon name="chevron-right" />
                </Box>
              ) : (
                <Box>
                  {invertButton ? (
                    <MainIcon name="chevron-down" />
                  ) : (
                    <MainIcon name="chevron-right" />
                  )}
                </Box>
              )}
            </>
          )}
        </Box>
        {description && (
          <MainText size={"sm"} fontWeight="light" {...descriptionProps}>
            {description}
          </MainText>
        )}
      </Box>
    </MainButton>
  );
}

interface MainSectionButtonProps {
  onPress: () => void;
  title: string;
  titleProps?: MainTextProps;
  description?: string;
  descriptionProps?: MainTextProps;
  rightText?: string;
  invertButton?: boolean;
  rightComponent?: React.ReactNode;
}
