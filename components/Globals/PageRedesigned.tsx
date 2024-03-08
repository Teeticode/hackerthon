import { router, usePathname } from "expo-router";
import React, {
  ReactNode,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Platform, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenHeight as sWidth } from "@rneui/base";
import Box, { BoxProps } from "./Box";
import MainText from "./MainText";
import Colors from "../../constants/Colors";
import { moderateScale } from "react-native-size-matters";
import Spacer from "./Spacer";
import BackButtonRedesigned from "./BackButtonRedesigned";

const PageRedesigned = forwardRef(
  ({ children, scrollable = false, ...props }: PageRedesignedProps, ref) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const handleToggleDrawer = () => {
      setIsDrawerOpen(!isDrawerOpen);
    };

    const handleCloseDrawer = () => {
      setIsDrawerOpen(false);
    };

    const path = usePathname();

    useEffect(() => {
      console.log("PageRedesigned Rendered: ", props.header?.title);
    }, []);

    const scrollRef = React.useRef<ScrollView>(null);

    function scrollToTop() {
      scrollRef.current?.scrollTo({ y: 0, animated: true });
    }

    function scrollToBottom() {
      scrollRef.current?.scrollToEnd({ animated: true });
    }

    useImperativeHandle(ref, () => ({
      scrollToTop,
      scrollToBottom,
    }));

    return (
      <SafeAreaView
        style={{
          backgroundColor: props.bgColor || Colors.theme.primaryBgRedesigned,
        }}
      >
        {!props.disableHeader && !path.includes("auth") && (
          <>
            {props.headerComponent ? (
              props.headerComponent
            ) : (
              <Box
                block
                style={{ minHeight: 60 }}
                justify="space-between"
                direction="row"
                align="center"
              >
                {!props.header?.disableBackButton ? (
                  <Box ml={26} align="flex-start">
                    <BackButtonRedesigned navigation={() => router.back()} />
                  </Box>
                ) : (
                  <Box align="flex-end">
                    {props.header?.rightComponent
                      ? props.header?.rightComponent
                      : null}
                  </Box>
                )}
                <Spacer width={30} />
                <Box direction="row" pr={moderateScale(20)} align="center">
                  <MainText
                    color={Colors.theme.surfacePage}
                    fontFamily="Roboto_700Bold"
                    size={moderateScale(18)}
                  >
                    {props.header?.title || ""}
                  </MainText>
                  <Spacer width={moderateScale(10)} />
                  <Box
                    radius={moderateScale(10)}
                    width={moderateScale(21)}
                    height={moderateScale(10)}
                    color={Colors.theme.light}
                  />
                </Box>

                {/* <Box align="flex-end">
									{props.header?.rightComponent ? (
										props.header?.rightComponent
									) : (
										<ThemedIconButton
											icon={{ name: "menu" }}
											onPress={handleToggleDrawer}
										/>
									)}
								</Box> */}
              </Box>
            )}
          </>
        )}
        {scrollable ? (
          <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
            <Box
              width={sWidth}
              flex={1}
              color={Colors.theme.lightBackground}
              pb={50}
              pt={20}
              height={"100%"}
              {...props}
            >
              {children}
            </Box>
          </ScrollView>
        ) : (
          <Box
            pt={20}
            width={sWidth}
            color={Colors.theme.lightBackground}
            pb={50}
            style={{ minHeight: "100%" }}
            {...props}
          >
            {children}
          </Box>
        )}
      </SafeAreaView>
    );
  }
);

export default PageRedesigned;

interface PageRedesignedProps extends BoxProps {
  children: ReactNode;
  scrollable?: boolean;
  headerComponent?: ReactNode;
  bgColor?: string;
  header?: {
    title: string;
    disableBackButton?: boolean;
    rightComponent?: ReactNode;
  };
  disableHeader?: boolean;
}
