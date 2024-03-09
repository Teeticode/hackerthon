import { router, usePathname } from "expo-router";
import React, {
  ReactNode,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenHeight as sWidth } from "@rneui/base";
import Box, { BoxProps } from "./Box";
import BackButton from "./BackButton";
import MainText from "./MainText";
import Colors from "../../constants/Colors";
import { moderateScale } from "react-native-size-matters";
import Spacer from "./Spacer";
import { StatusBar } from "expo-status-bar";

const Page = forwardRef(
  ({ children, scrollable = false, ...props }: PageProps, ref) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const handleToggleDrawer = () => {
      setIsDrawerOpen(!isDrawerOpen);
    };

    const handleCloseDrawer = () => {
      setIsDrawerOpen(false);
    };

    const path = usePathname();

    useEffect(() => {
      console.log("Page Rendered: ", props.header?.title);
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
      <SafeAreaView>
        <StatusBar backgroundColor="white" />
        {!props.disableHeader && !path.includes("auth") && (
          <>
            {props.headerComponent ? (
              props.headerComponent
            ) : (
              <Box
                block
                color={props.color || Colors.theme.primaryBackground}
                style={{ minHeight: 60 }}
                justify="space-between"
                direction="row"
                align="center"
                px={5}
              >
                {!props.header?.disableBackButton ? (
                  <Box ml={26} align="flex-start">
                    <BackButton navigation={() => router.back()} />
                  </Box>
                ) : (
                  <Box align="flex-end">
                    {props.header?.rightComponent
                      ? props.header?.rightComponent
                      : null}
                  </Box>
                )}
                <Spacer width={30} />
                <Box flex={1} align="flex-start">
                  <MainText fontWeight="regular" size={moderateScale(20)}>
                    {props.header?.title || ""}
                  </MainText>
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
              color={Colors.theme.primaryBackground}
              pb={50}
              height={"100%"}
              {...props}
            >
              {children}
            </Box>
          </ScrollView>
        ) : (
          <Box
            width={sWidth}
            color={Colors.theme.primaryBackground}
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

export default Page;

interface PageProps extends BoxProps {
  children: ReactNode;
  scrollable?: boolean;
  headerComponent?: ReactNode;
  header?: {
    title: string;
    disableBackButton?: boolean;
    rightComponent?: ReactNode;
  };
  disableHeader?: boolean;
}
