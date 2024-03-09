import React, { useEffect, useState } from "react";
import { BlurView } from "expo-blur";
import { ScreenHeight, ScreenWidth } from "@rneui/base";
import { Card, Overlay } from "@rneui/themed";
import Loader from "./Loader";
import { StyleSheet } from "react-native";
import { scale } from "../../constants/Scaler";
import P1 from "../Typography/P1";
import Heading1 from "../Typography/Heading1";
import Heading3 from "../Typography/Heading3";
import { MainStyles } from "../../styles/Main";
import Desc1 from "../Typography/Desc1";
import DescExpress from "../Typography/DescExpress";
import DashBoardCarddesc from "../Typography/DashBoardCarddesc";
import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import ImageIcon from "./ImageIcon";
import { View } from "react-native";
import FastImage from "react-native-fast-image";
type Props = {
  open: boolean;
  title?: string;
  description?: string;
  success?: boolean;
  timeout?: number;
  payment?: boolean;
};

const MessageOverlay = (props: Props) => {
  const [dynamicOpen, setDynamicOpen] = useState(props.open);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDynamicOpen(false);
    }, props.timeout ?? 1200);

    return () => {
      clearTimeout(timer);
      setDynamicOpen(false);
      props.open = false;
    };
  }, []);
  useEffect(() => {
    if (props.open === true) {
      setDynamicOpen(true);
    } else {
      setDynamicOpen(false);
    }
    return () => {
      setDynamicOpen(false);
      props.open = false;
    };
  }, []);

  return (
    <Overlay
      isVisible={dynamicOpen}
      overlayStyle={{
        backgroundColor: "transparent",
      }}
    >
      <BlurView style={styles.blurView} tint="default" intensity={20}>
        <Card containerStyle={styles.card}>
          <View style={styles.innerCardWrapper}>
            <AntDesign
              style={MainStyles.selfAlignEnd}
              name="close"
              size={scale(25)}
              onPress={() => setDynamicOpen(false)}
              color={Colors.light.text}
            />

            <View>
              {props?.payment === true && (
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  {/* <FastImage
                    source={require("../../assets/gifs/confetti2.gif")}
                    style={{
                      width: scale(70),
                      height: scale(70),
                      transform: [
                        {
                          rotate: "-20deg",
                        },
                      ],
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                  <FastImage
                    source={require("../../assets/gifs/confetti2.gif")}
                    style={{
                      width: scale(70),
                      height: scale(70),
                      transform: [
                        {
                          rotate: "289deg",
                        },
                      ],
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                  /> */}
                </View>
              )}
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                {props.success ? (
                  <ImageIcon
                    style={[
                      MainStyles.selfAlignCenter,
                      { alignSelf: "center" },
                    ]}
                    source={require("../../assets/icons/check-circle_colored.jpg")}
                    size={scale(55)}
                  />
                ) : (
                  <Feather name="x-circle" size={scale(55)} color="#E63946" />
                )}
              </View>
              <Heading1
                style={[MainStyles.selfAlignCenter, { marginTop: scale(10) }]}
              >
                {props.title}
              </Heading1>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <P1
                  style={[
                    MainStyles.selfAlignCenter,
                    {
                      alignItems: "center",
                      textAlign: "center",
                      marginTop: scale(4),
                      fontSize: scale(14),
                      flexWrap: "wrap",
                    },
                  ]}
                >
                  {props.description}
                </P1>
              </View>
            </View>
          </View>
        </Card>
      </BlurView>
    </Overlay>
  );
};

export default MessageOverlay;
const styles = StyleSheet.create({
  card: {
    borderRadius: scale(20),
    height: scale(290),
    width: scale(250),
    alignItems: "center",
    justifyContent: "center",
  },
  innerCardWrapper: {
    margin: scale(10),
    width: scale(220),
    height: "100%",
    padding: scale(5),
  },
  blurView: {
    width: ScreenWidth,
    height: ScreenHeight,
    justifyContent: "center",
    alignItems: "center",
  },
});
