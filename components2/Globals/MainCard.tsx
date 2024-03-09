import React, { ReactNode } from "react";

import Box, { BoxProps } from "./Box";
import Colors from "../../constants/Colors";
export default function MainCard({
  props,
  children,
}: {
  props?: BoxProps;
  children: ReactNode;
}) {
  return (
    <Box color={Colors.theme.surface} pa={20} radius={30} block {...props}>
      {children}
    </Box>
  );
}
