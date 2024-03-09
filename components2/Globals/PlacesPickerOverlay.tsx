import { View, Text } from "react-native";
import React from "react";
import Box from "./Box";
import {
  GooglePlaceData,
  GooglePlacesAutocomplete,
} from "react-native-google-places-autocomplete";
import { ScreenHeight, ScreenWidth } from "@rneui/base";
import MainModal from "./MainModal";
import Colors from "@/constants/Colors";

type Props = {
  visible: boolean;
  close: () => void;
  onChange: (data: GooglePlaceData["description"]) => void;
};

const PlacesPickerOverlay = (props: Props) => {
  return (
    <MainModal visible={props.visible} onRequestClose={props.close}>
      <Box
        height={ScreenHeight * 0.7}
        py={20}
        color={Colors.theme.primaryBackground}
        px={20}
        width={ScreenWidth}
      >
        <Box
          height={ScreenHeight * 0.6}
          pr={-20}
          width={ScreenWidth}
          radius={20}
          color={"transparent"}
        >
          <GooglePlacesAutocomplete
            listViewDisplayed={false}
            placeholder="Search"
            keepResultsAfterBlur
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true

              // JSON.parse(params?.data);
              props.onChange(data.description);
              props.close();
            }}
            query={{
              key: `AIzaSyCHHzlPfuUD6JyzylB84QHbeoe6iVIgrxA`,
              language: "en",
            }}
            styles={{
              container: {
                height: ScreenHeight * 0.6,
              },
              textInputContainer: {
                width: "100%",
              },
              description: {
                fontWeight: "bold",
              },
            }}
            keyboardShouldPersistTaps="always"
            fetchDetails={true}
          />
        </Box>
      </Box>
    </MainModal>
  );
};

export default PlacesPickerOverlay;
