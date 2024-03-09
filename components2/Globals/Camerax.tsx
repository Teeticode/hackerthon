import { Camera, CameraCapturedPicture, CameraType } from "expo-camera";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import { Modal, Pressable, StyleSheet } from "react-native";

import Box from "./Box";
import { ThemedIconButton } from "./MainButton";
import { ScreenHeight, ScreenWidth } from "@rneui/base";

export default function Camerax({
  close,
  setPicture,
}: {
  close: () => void;
  setPicture: (pic: CameraCapturedPicture) => void;
}) {
  let cameraRef = useRef<Camera | null>(null);

  const [type, setType] = useState(CameraType.back);
  const [ratio, setRatio] = useState("16:9");

  const [hasCameraPermission, setHasCameraPermission] = useState<
    boolean | undefined
  >();

  function flipCamera() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  async function takePicture() {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    let picture = await cameraRef.current?.takePictureAsync(options);
    if (picture) {
      setPicture(picture);
    }
  }

  async function requestCameraPermission() {
    const result = await Camera.requestCameraPermissionsAsync();
    setHasCameraPermission(result.status === "granted");
  }

  useEffect(() => {
    requestCameraPermission();
  }, []);

  return (
    <Modal onRequestClose={close}>
      <Box height={ScreenHeight}>
        <StatusBar style="auto" />
        <Box height={ScreenHeight - 42} width={ScreenWidth}>
          <Camera
            ref={cameraRef}
            ratio="16:9"
            type={type}
            style={styles.camera}
          >
            <Box align="center" justify="space-between" flex={1} block pa={20}>
              <Box block direction="row" justify="space-between">
                <ThemedIconButton
                  icon={{ name: "chevron-left", color: "black" }}
                  background="white"
                  size={50}
                  onPress={close}
                />
                <ThemedIconButton
                  icon={{
                    source: "MaterialCommunityIcons",
                    name: "camera-flip-outline",
                    color: "black",
                  }}
                  background="white"
                  size={50}
                  onPress={flipCamera}
                />
              </Box>
              <Pressable onPress={takePicture} style={styles.cameraBt} />
            </Box>
          </Camera>
        </Box>
      </Box>
    </Modal>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  cameraBt: {
    height: 80,
    width: 80,
    backgroundColor: "white",
    borderRadius: 50,
  },
});
