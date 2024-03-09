import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Pressable } from "react-native";
import Box from "./Box";
import Row from "./Row";
import MainText from "./MainText";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { AnimatePresence, MotiView } from "moti";
import { MYfonts } from "../Typography/Fonts";
import { ScreenWidth } from "@rneui/base";

type Props = {
  text?: string;
};

const Explainer = ({ text }: Props) => {
  const [open, setOpen] = useState(false);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(-100);
  useEffect(() => {
    setOffsetY(-100);
  }, []);
  return (
    <AnimatePresence>
      <MotiView
        from={{
          transform: [
            { translateX: offsetX },
            { translateY: offsetY },
            { scale: 0 },
          ],
          opacity: 0,
        }}
        animate={{
          transform: open
            ? [{ translateY: 0 }, { translateX: 0 }, { scale: 1 }]
            : [{ translateY: 0 }, { translateX: 0 }, { scale: 1 }],
          opacity: 1,
        }}
        transition={{ type: "timing", duration: 200 }}
      >
        <Pressable
          onPress={() => setOpen(!open)}
          style={[
            styles.container,
            open
              ? {
                  height: verticalScale(120),
                }
              : {
                  height: verticalScale(60),
                },
            { width: ScreenWidth * 0.9 },
          ]}
        >
          <Box px={moderateScale(20)} mt={0} py={moderateScale(20)}>
            <Row style={{ backgroundColor: "transparent" }}>
              <MainText
                fontFamily={MYfonts.Nunito_400Regular}
                size={moderateScale(14)}
                color={"rgba(0, 0, 0, 0.60)"}
              >
                How does it work?
              </MainText>
              {open ? (
                <Entypo name="chevron-up" size={24} color="#6200EE" />
              ) : (
                <Entypo name="chevron-down" size={24} color="#6200EE" />
              )}
            </Row>

            {open && (
              <Box mt={verticalScale(10)}>
                <MotiView
                  from={{
                    transform: [
                      { translateX: offsetX },
                      { translateY: offsetY },
                      { scale: 0 },
                    ],
                    opacity: 0,
                  }}
                  animate={{
                    transform: open
                      ? [{ translateY: 0 }, { translateX: 0 }, { scale: 1 }]
                      : [{ translateY: 0 }, { translateX: 0 }, { scale: 0 }],
                    opacity: 1,
                  }}
                  transition={{ type: "timing", duration: 300 }}
                >
                  <MainText
                    style={{
                      color: "#999",
                      fontFamily: MYfonts.Nunito_500Medium,
                    }}
                    size={moderateScale(13)}
                  >
                    {text}
                  </MainText>
                </MotiView>
              </Box>
            )}
          </Box>
        </Pressable>
      </MotiView>
    </AnimatePresence>
  );
};

export default Explainer;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#F3F0FF",
    borderRadius: moderateScale(5),
  },
});
