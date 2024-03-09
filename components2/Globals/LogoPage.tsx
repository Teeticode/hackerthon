import {
  router,
  usePathname,
  useRouter,
  useUnstableGlobalHref,
} from "expo-router";
import React, {
  ReactNode,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { DimensionValue, Easing, Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenHeight as sWidth } from "@rneui/base";
import Box, { BoxProps } from "./Box";
import BackButton from "./BackButton";
import MainText from "./MainText";
import Colors from "../../constants/Colors";
import { moderateScale, verticalScale } from "react-native-size-matters";
import Spacer from "./Spacer";
import ImageWrapper from "./ImageWrapper";
import MainIconButton from "./MainIconButton";
import MainButton from "./MainButton";
import {
  AnimatedCircularProgress,
  CircularProgress,
} from "react-native-circular-progress";
import { Circle } from "react-native-svg";
import doesCharacterExist from "../../constants/functions/doesCharacterExist";
import { FlatList } from "react-native-gesture-handler";

const LogoPage = forwardRef(
  (
    {
      children,
      scrollable = false,
      scrollableWithFlat = false,
      ...props
    }: LogoPageProps,
    ref
  ) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const handleToggleDrawer = () => {
      setIsDrawerOpen(!isDrawerOpen);
    };

    const handleCloseDrawer = () => {
      setIsDrawerOpen(false);
    };

    const path = usePathname();

    const scrollRef = React.useRef<ScrollView>(null);
    const progressRef = React.useRef<AnimatedCircularProgress>(null);

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
    const numbersInPath = path.match(/\d+/g) || [];

    // Check if the numbers 1, 2, 3, 4, or 5 are in the pathname
    const fillValue = numbersInPath.includes("2")
      ? 40
      : numbersInPath.includes("3")
      ? 60
      : numbersInPath.includes("4")
      ? 80
      : numbersInPath.includes("5")
      ? 100
      : 20;
    const fillFractionValue = numbersInPath.includes("2")
      ? 2
      : numbersInPath.includes("3")
      ? 3
      : numbersInPath.includes("4")
      ? 4
      : numbersInPath.includes("5")
      ? 5
      : 1;

    return (
      <SafeAreaView
        style={{
          backgroundColor: Colors.theme.primaryBackground,
        }}
      >
        {scrollable ? (
          <ScrollView
            contentContainerStyle={{ paddingBottom: props.paddingB ?? 20 }}
          >
            <Box width={"100%"} pr={15} justify="space-between" direction="row">
              <ImageWrapper
                mt={moderateScale(18)}
                ml={moderateScale(16)}
                source={require("../../assets/utils/sacco-logo-tagline-dark.png")}
                height={verticalScale(50)}
                width={moderateScale(163)}
              />
              {props.shouldShowProgress !== false && (
                <Box>
                  <CircularProgress
                    size={moderateScale(120)}
                    width={moderateScale(15)}
                    fill={fillValue}
                    rotation={moderateScale(18)}
                    children={() => (
                      <MainText size={moderateScale(22)}>
                        {fillFractionValue}/5
                      </MainText>
                    )}
                    renderCap={({ center }) => (
                      <Circle
                        cx={center.x}
                        cy={center.y}
                        r="10"
                        fill={Colors.theme.primaryRed}
                      />
                    )}
                    tintColor={Colors.theme.primaryRed}
                    backgroundColor={Colors.theme.primary}
                  />
                </Box>
              )}
            </Box>

            <Box
              radiusTop={props.description ? moderateScale(20) : undefined}
              mt={props.description ? verticalScale(43) : undefined}
              color={props.description ? Colors.theme.light : undefined}
            >
              {!props.disableHeader && (
                <>
                  {props.headerComponent ? (
                    props.headerComponent
                  ) : (
                    <Box
                      block
                      color={Colors.theme.primaryBackground}
                      style={{ minHeight: verticalScale(60) }}
                      justify="space-between"
                      direction="row"
                      align="center"
                      px={5}
                    >
                      {!props.header?.disableBackButton ? (
                        <Box ml={moderateScale(26)} align="flex-start">
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
              {props.description && (
                <Box mt={moderateScale(30)} mx={moderateScale(16)}>
                  <MainText
                    color={Colors.theme.primary}
                    fontWeight="regular"
                    size={moderateScale(24)}
                  >
                    {props.description.title}
                  </MainText>
                  <MainText
                    mt={verticalScale(10)}
                    fontWeight="regular"
                    size={moderateScale(16)}
                  >
                    {props.description.description}
                  </MainText>
                </Box>
              )}
              {scrollable ? (
                <ScrollView
                  contentContainerStyle={{
                    paddingBottom: props.paddingB ?? 20,
                  }}
                >
                  <Box
                    width={sWidth}
                    flex={1}
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
                  pb={50}
                  style={{ minHeight: "100%" }}
                  {...props}
                >
                  {children}
                </Box>
              )}
            </Box>
          </ScrollView>
        ) : scrollableWithFlat ? (
          <FlatList
            data={[1]}
            renderItem={() => (
              <Box>
                <Box
                  width={"100%"}
                  pr={15}
                  justify="space-between"
                  direction="row"
                >
                  <ImageWrapper
                    mt={moderateScale(18)}
                    ml={moderateScale(16)}
                    source={require("../../assets/utils/sacco-logo-tagline-dark.png")}
                    height={verticalScale(50)}
                    width={moderateScale(163)}
                  />
                  {props.shouldShowProgress !== false && (
                    <Box>
                      <CircularProgress
                        size={moderateScale(120)}
                        width={moderateScale(15)}
                        fill={fillValue}
                        rotation={moderateScale(18)}
                        children={() => (
                          <MainText size={moderateScale(22)}>
                            {fillFractionValue}/5
                          </MainText>
                        )}
                        renderCap={({ center }) => (
                          <Circle
                            cx={center.x}
                            cy={center.y}
                            r="10"
                            fill={Colors.theme.primaryRed}
                          />
                        )}
                        tintColor={Colors.theme.primaryRed}
                        backgroundColor={Colors.theme.primary}
                      />
                    </Box>
                  )}
                </Box>

                <Box
                  radiusTop={props.description ? moderateScale(20) : undefined}
                  mt={props.description ? verticalScale(43) : undefined}
                  color={props.description ? Colors.theme.light : undefined}
                >
                  {!props.disableHeader && (
                    <>
                      {props.headerComponent ? (
                        props.headerComponent
                      ) : (
                        <Box
                          block
                          color={Colors.theme.primaryBackground}
                          style={{ minHeight: verticalScale(60) }}
                          justify="space-between"
                          direction="row"
                          align="center"
                          px={5}
                        >
                          {!props.header?.disableBackButton ? (
                            <Box ml={moderateScale(26)} align="flex-start">
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
                            <MainText
                              fontWeight="regular"
                              size={moderateScale(20)}
                            >
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
                  {props.description && (
                    <Box mt={moderateScale(30)} mx={moderateScale(16)}>
                      <MainText
                        color={Colors.theme.primary}
                        fontWeight="regular"
                        size={moderateScale(24)}
                      >
                        {props.description.title}
                      </MainText>
                      <MainText
                        mt={verticalScale(10)}
                        fontWeight="regular"
                        size={moderateScale(16)}
                      >
                        {props.description.description}
                      </MainText>
                    </Box>
                  )}
                  {scrollable ? (
                    <ScrollView
                      contentContainerStyle={{
                        paddingBottom: props.paddingB ?? 20,
                      }}
                    >
                      <Box
                        width={sWidth}
                        flex={1}
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
                      pb={50}
                      style={{ minHeight: "100%" }}
                      {...props}
                    >
                      {children}
                    </Box>
                  )}
                </Box>
              </Box>
            )}
            keyExtractor={() => "1"}
          />
        ) : (
          <Box>
            <Box width={"100%"} pr={15} justify="space-between" direction="row">
              <ImageWrapper
                mt={moderateScale(18)}
                ml={moderateScale(16)}
                source={require("../../assets/utils/sacco-logo-tagline-dark.png")}
                height={verticalScale(50)}
                width={moderateScale(163)}
              />
              {props.shouldShowProgress !== false && (
                <Box>
                  <CircularProgress
                    size={moderateScale(120)}
                    width={moderateScale(15)}
                    fill={fillValue}
                    rotation={moderateScale(18)}
                    children={() => (
                      <MainText size={moderateScale(22)}>
                        {fillFractionValue}/5
                      </MainText>
                    )}
                    renderCap={({ center }) => (
                      <Circle
                        cx={center.x}
                        cy={center.y}
                        r="10"
                        fill={Colors.theme.primaryRed}
                      />
                    )}
                    tintColor={Colors.theme.primaryRed}
                    backgroundColor={Colors.theme.primary}
                  />
                </Box>
              )}
            </Box>

            <Box
              radiusTop={props.description ? moderateScale(20) : undefined}
              mt={props.description ? verticalScale(43) : undefined}
              color={props.description ? Colors.theme.light : undefined}
            >
              {!props.disableHeader && (
                <>
                  {props.headerComponent ? (
                    props.headerComponent
                  ) : (
                    <Box
                      block
                      color={Colors.theme.primaryBackground}
                      style={{ minHeight: verticalScale(60) }}
                      justify="space-between"
                      direction="row"
                      align="center"
                      px={5}
                    >
                      {!props.header?.disableBackButton ? (
                        <Box ml={moderateScale(26)} align="flex-start">
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
              {props.description && (
                <Box mt={moderateScale(30)} mx={moderateScale(16)}>
                  <MainText
                    color={Colors.theme.primary}
                    fontWeight="regular"
                    size={moderateScale(24)}
                  >
                    {props.description.title}
                  </MainText>
                  <MainText
                    mt={verticalScale(10)}
                    fontWeight="regular"
                    size={moderateScale(16)}
                  >
                    {props.description.description}
                  </MainText>
                </Box>
              )}
              {scrollable ? (
                <ScrollView
                  contentContainerStyle={{
                    paddingBottom: props.paddingB ?? 20,
                  }}
                >
                  <Box
                    width={sWidth}
                    flex={1}
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
                  pb={50}
                  style={{ minHeight: "100%" }}
                  {...props}
                >
                  {children}
                </Box>
              )}
            </Box>
          </Box>
        )}
      </SafeAreaView>
    );
  }
);

export default LogoPage;

interface LogoPageProps extends BoxProps {
  children: ReactNode;
  scrollable?: boolean;
  scrollableWithFlat?: boolean;
  headerComponent?: ReactNode;
  header?: {
    title: string;
    disableBackButton?: boolean;
    rightComponent?: ReactNode;
  };
  paddingB?: DimensionValue;
  disableHeader?: boolean;
  description?: {
    title?: string;
    description?: string;
  };
  shouldShowProgress?: false;
}
