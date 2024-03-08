import React, { ReactNode } from "react";

import Box, { BoxProps } from "./Box";
import Colors from "../../constants/Colors";
import lightenColor from "../../constants/functions/lightenColor";
import MainText from "./MainText";
import { moderateScale } from "react-native-size-matters";
import SkeletonBox from "./SkeletonBox";

export default function ActionsCard({
  props,
  title,
  loading,
  children,
}: {
  props?: BoxProps;
  title: string;
  loading?: boolean;
  children: ReactNode;
}) {
  return (
    <Box
      color={lightenColor(Colors.theme.yellowBg, 0)}
      pa={20}
      // height={253}
      // width={327}
      radius={24}
      block
      align="center"
      {...props}
    >
      {loading ? (
        <SkeletonBox
          height={moderateScale(18)}
          radius={moderateScale(12)}
          width={moderateScale(130)}
        />
      ) : (
        <MainText
          color={Colors.theme.actionsCardTitle}
          size={moderateScale(18)}
          align="center"
          fontWeight="regular"
        >
          {title}
        </MainText>
      )}
      {children}
    </Box>
  );
}
