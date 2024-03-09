import { CameraCapturedPicture } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { ReactNode, useState } from "react";
import { Image } from "react-native";

import { animateLayout } from "../../utils/animation.utils";
import Box, { BoxProps } from "./Box";
import Camerax from "./Camerax";
import MainButton from "./MainButton";
import MainText from "./MainText";
import Colors from "../../constants/Colors";
import { AnimatePresence, MotiView } from "moti";

export default function ImagePickerBox({
  label,
  onSelect,
  disableCamera = false,
  disableGallery = false,
  children,
  buttonWrapperProps,
  wrapperProps,
}: ImagePickerBoxProps) {
  const [openCamera, setOpenCamera] = useState(false);
  const [picture, setPicture] = useState<ImageBoxImage | null>(null);

  const pickImageAsync = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        animateLayout();
        setPicture(result.assets[0]);
        onSelect(result.assets[0]);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const animate={
    opacity: openCamera? 0 : 1,
    scale: openCamera? 0.8 : 1,
  }

  return (
    

<AnimatePresence>
              <MotiView
                from={{
                  scale: 0.2,
                  
                  opacity: 0,
                }}
                animate={animate}
                transition={{ type: "timing", duration: 800 }}
                style={{ width: "100%", }}
              >
      <Box
        color={Colors.theme.surface}
        pa={20}
        radius={30}
        gap={10}
        {...wrapperProps}
      >
        <MainText size={12}>{label}</MainText>
        <Box
          block
          height={picture ? 150 : 0}
          color={"rgba(0,0,0, 0.04)"}
          radius={20}
          overflow="hidden"
        >
          {picture && (
            <Image source={{ uri: picture?.uri }} style={{ flex: 1 }} />
          )}
        </Box>
        {children}
        <Box
          direction="row"
          gap={10}
          block
          justify={disableCamera || disableGallery ? "center" : "space-between"}
          {...buttonWrapperProps}
        >
          {!disableCamera && (
            <MainButton
              type="secondary-outlined"
              label={"Use Camera"}
              borderWidth={0.5}
              size="xs"
              onPress={() => setOpenCamera(true)}
            />
          )}
          {!disableGallery && (
            <MainButton
              type="secondary-outlined"
              label={"Use Gallery"}
              borderWidth={0.5}
              size="xs"
              onPress={pickImageAsync}
            />
          )}
        </Box>
      </Box>
      {openCamera && (
        <Camerax
          close={() => setOpenCamera(false)}
          setPicture={(pic) => {
            animateLayout();
            setPicture(pic);
            setOpenCamera(false);
            onSelect(pic);
          }}
        />
      )}
      </MotiView>
      </AnimatePresence>
    
  );
}

interface ImagePickerBoxProps extends BoxProps {
  label: string;
  onSelect: (image: ImageBoxImage) => void;
  disableCamera?: boolean;
  disableGallery?: boolean;
  buttonWrapperProps?: BoxProps;
  wrapperProps?: BoxProps;
  children?: ReactNode;
}

export type ImageBoxImage =
  | CameraCapturedPicture
  | ImagePicker.ImagePickerAsset;
