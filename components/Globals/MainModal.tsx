import { AnimatePresence, MotiView } from "moti";
import React, { ReactNode, useEffect } from "react";
import { Modal, ModalBaseProps, Platform, Pressable } from "react-native";
import { ScreenWidth, ScreenHeight as sHeight } from "@rneui/base";
import Box, { BoxProps } from "./Box";
import MainButton from "./MainButton";
import MainText from "./MainText";
import Colors from "../../constants/Colors";
import { Overlay } from "@rneui/themed";
import * as Device from "expo-device";
export default function MainModal({
  visible = false,
  containerProps,
  onRequestClose,
  position = "center",
  scrollable,
  title,
  children,
  leftChild,
  hideCloseButton = false,
  bgColor = "white",
  backDropClose,
  ...modalProps
}: MainModalProps) {
  const CloseButton = () => (
    <Pressable
      style={{ width: "100%", flex: 1 }}
      onPress={onRequestClose}
    ></Pressable>
  );

  useEffect(() => {
    console.log(Device.platformApiLevel);
  }, []);

  return (
    <>
      {visible && (
        <Overlay
          fullScreen
          {...modalProps}
          isVisible={visible}
          backdropStyle={{}}
          overlayStyle={{
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
          onRequestClose={onRequestClose}
          onBackdropPress={() => backDropClose?.()}
        >
          {Device.platformApiLevel! < 29 || !Device.platformApiLevel ? (
            <Box
              height={"100%"}
              width={"100%"}
              block
              justify={
                position === "center"
                  ? "center"
                  : position === "top"
                  ? "flex-start"
                  : "flex-end"
              }
              align={"center"}
              pa={position === "center" ? 10 : 0}
            >
              {position === "center" && <CloseButton />}
              {position === "bottom" && <CloseButton />}
              <AnimatePresence>
                <MotiView
                  from={{
                    transform: [
                      { translateY: position === "top" ? -100 : 100 },
                      { scale: position === "center" ? 0.6 : 1 },
                    ],
                    opacity: 0,
                  }}
                  animate={{
                    transform: [{ translateY: 0 }, { scale: 1 }],
                    opacity: 1,
                  }}
                  transition={{ type: "timing", duration: 200 }}
                  style={{ width: "100%", alignItems: "center" }}
                >
                  <Box
                    color={"white"}
                    pt={leftChild || title ? 15 : 0}
                    radiusBottom={
                      position === "top" || position === "center" ? 30 : 0
                    }
                    radiusTop={
                      position === "bottom" || position === "center" ? 30 : 0
                    }
                    block
                    position="relative"
                  >
                    {(leftChild || title) && (
                      <Box
                        direction="row"
                        block
                        justify="space-between"
                        align="center"
                      >
                        <Box flex={0.5}>{leftChild && leftChild}</Box>
                        <Box flex={1}>
                          <MainText fontWeight="bold" align="center">
                            {title || ""}
                          </MainText>
                        </Box>
                        <Box flex={0.5} align="flex-end"></Box>
                      </Box>
                    )}
                    {hideCloseButton == false && (
                      <MainButton
                        icon={{
                          name: "x",
                        }}
                        onPress={() => onRequestClose()}
                        size="sm"
                        type="text"
                        style={{
                          position: "absolute",
                          top: 5,
                          right: 0,
                          zIndex: 10,
                        }}
                      />
                    )}
                    <Box
                      style={{ maxHeight: sHeight - 120 }}
                      pa={20}
                      {...containerProps}
                    >
                      {children}
                    </Box>
                  </Box>
                </MotiView>
              </AnimatePresence>
              {position === "top" && <CloseButton />}
              {position === "center" && <CloseButton />}
            </Box>
          ) : (
            <Box
              height={"100%"}
              width={"100%"}
              block
              justify={
                position === "center"
                  ? "center"
                  : position === "top"
                  ? "flex-start"
                  : "flex-end"
              }
              align={"center"}
              pa={position === "center" ? 10 : 0}
            >
              <Box
                color={bgColor}
                pt={leftChild || title ? 15 : 0}
                radiusBottom={
                  position === "top" || position === "center" ? 30 : 0
                }
                radiusTop={
                  position === "bottom" || position === "center" ? 30 : 0
                }
                block
                position="relative"
              >
                {(leftChild || title) && (
                  <Box
                    direction="row"
                    block
                    justify="space-between"
                    align="center"
                  >
                    <Box flex={0.5}>{leftChild && leftChild}</Box>
                    <Box flex={1}>
                      <MainText fontWeight="bold" align="center">
                        {title || ""}
                      </MainText>
                    </Box>
                    <Box flex={0.5} align="flex-end"></Box>
                  </Box>
                )}
                {hideCloseButton == false && (
                  <MainButton
                    icon={{
                      name: "x",
                    }}
                    onPress={() => onRequestClose()}
                    size="sm"
                    type="text"
                    style={{
                      position: "absolute",
                      top: 5,
                      right: 0,
                      zIndex: 10,
                    }}
                  />
                )}
                <Box
                  style={{ maxHeight: sHeight - 120 }}
                  pa={20}
                  {...containerProps}
                >
                  {children}
                </Box>
              </Box>
            </Box>
          )}
        </Overlay>
      )}
    </>
  );
}

export interface MainModalProps extends ModalBaseProps {
  containerProps?: Omit<BoxProps, "children">;
  children?: ReactNode;
  position?: "top" | "center" | "bottom";
  scrollable?: boolean;
  title?: string;
  leftChild?: ReactNode;
  hideCloseButton?: boolean;
  bgColor?: string;
  backDropClose?: () => void;
}
