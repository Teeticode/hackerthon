import {
  View,
  Text,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import MainModal from "./MainModal";
import {
  GooglePlacesAutocomplete,
  GooglePlaceDetail,
  Geometry,
} from "react-native-google-places-autocomplete";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { ScreenHeight, ScreenWidth } from "@rneui/base";
import Colors from "@/constants/Colors";
import Box from "./Box";
import MainButton from "./MainButton";
import MainText from "./MainText";
import Mapview from "react-native-maps";
import MainIconButton from "./MainIconButton";
import { useFocusEffect } from "expo-router";
import { AnimatePresence, MotiView } from "moti";
import MainBottomSheet from "./MainBottomSheet";
import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

type Props = {
  isVisible: boolean;
  onClose: () => void;
  onChange: (value: GooglePlaceDetail | null) => void;
  placesRef?: React.RefObject<BottomSheetMethods>;
};

const MainPlacesPicker = (props: Props) => {
  const [displayMapView, setDisplayMapView] = useState(false);
  const [geometry, setGeometry] = useState<Geometry | undefined | null>(null);
  const [location, setLocation] = useState<GooglePlaceDetail | null>(null);
  const degreesToRadians = (angle: any) => {
    return angle * (Math.PI / 180);
  };
  const KMToLongitudes = (km: any, atLatitude: any) => {
    return (km * 0.0089831) / Math.cos(degreesToRadians(atLatitude));
  };
  // useFocusEffect(
  //   React.useCallback(() => {
  //     if (props.isVisible) {
  //       setDisplayMapView(false);
  //     } else {
  //       setDisplayMapView(true);
  //     }
  //   }, [props.isVisible])
  // );
  const sheetRef = props.placesRef || React.useRef<BottomSheet>(null);
  return (
    <MainModal
      visible={props.isVisible}
      onRequestClose={() => props?.onClose()}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Box height={ScreenHeight * 0.7} px={20} width={ScreenWidth}>
          <Box pt={20} align="center" color={Colors.theme.light}>
            {!displayMapView ? (
              <Box
                height={ScreenHeight * 0.6}
                pr={-20}
                width={ScreenWidth}
                radius={20}
                color={"transparent"}
              >
                <GooglePlacesAutocomplete
                  placeholder="Search"
                  onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    console.log(data, details);
                  }}
                  query={{
                    key: `AIzaSyCHHzlPfuUD6JyzylB84QHbeoe6iVIgrxA`,
                    language: "en",
                  }}
                  styles={{
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
            ) : (
              <AnimatePresence>
                <MotiView
                  from={{
                    transform: [{ translateY: 90 }, { scale: 1 }],
                    opacity: 0,
                  }}
                  animate={{
                    transform: [{ translateY: 0 }, { scale: 1 }],
                    opacity: 1,
                  }}
                  transition={{ type: "timing", duration: 500 }}
                  style={{
                    width: "100%",
                    height: ScreenHeight * 0.7,
                    alignItems: "center",
                  }}
                >
                  <Mapview
                    style={{
                      width: "100%",
                      height: "90%",
                    }}
                    initialRegion={{
                      latitude: geometry?.location.lat ?? -1.2920659,
                      longitude: geometry?.location.lng ?? 36.8219462,
                      latitudeDelta: 0.1,
                      longitudeDelta: KMToLongitudes(
                        1.0,
                        geometry?.location.lat
                      ),
                    }}
                  >
                    <MainText size={moderateScale(15)} my={10}>
                      {location?.formatted_address}
                    </MainText>
                  </Mapview>
                </MotiView>
              </AnimatePresence>
            )}
          </Box>

          <MainBottomSheet
            sheetRef={sheetRef}
            index={-1}
            snapPoints={["50%", "80%"]}
          >
            <Box pt={20} align="center" color={Colors.theme.light}>
              {!displayMapView ? (
                <Box
                  height={ScreenHeight * 0.6}
                  pr={-20}
                  width={ScreenWidth}
                  radius={20}
                  color={"transparent"}
                >
                  {/* <GooglePlacesAutocomplete
                    listLoaderComponent={
                      <ActivityIndicator
                        size={"large"}
                        color={Colors.theme.primary}
                      />
                    }
                    placeholder="Search for Location"
                    onPress={(data, details = null) => {
                      // 'details' is provided when fetchDetails = true
                      // props.onChange(details);
                      setGeometry(details?.geometry);
                      console.log(details?.geometry, "info");
                      setLocation(details);
                      setDisplayMapView(true);
                    }}
                    query={{
                      key: `AIzaSyCHHzlPfuUD6JyzylB84QHbeoe6iVIgrxA`,
                      language: "en",
                    }}
                    textInputProps={{
                      placeholderTextColor: "#FFF",
                      leftIcon: { type: "font-awesome", name: "chevron-left" },
                    }}
                    onFail={(error) => console.log(error)}
                    enablePoweredByContainer={false}
                    styles={{
                      container: {
                        // width: "100%",
                        // height: "100%",
                        // alignSelf: "center",
                        // alignItems: "center",
                      },
                      textInput: {
                        backgroundColor: Colors.theme.primary,
                        color: "#FFF",
                        fontSize: moderateScale(15),
                        width: ScreenWidth * 0.9,
                        height: moderateScale(60),
                        padding: moderateScale(20),
                        borderRadius: moderateScale(20),
                        alignItems: "center",
                      },
                    }}
                    fetchDetails={true}
                    suppressDefaultStyles={true}
                    isRowScrollable={true}
                    renderRow={(rowData, index) => {
                      const title = rowData?.structured_formatting?.main_text;
                      const address =
                        rowData?.structured_formatting?.secondary_text;
                      return (
                        <MainButton
                          my={10}
                          onPress={() => console.log(rowData)}
                          type="surface"
                        >
                          <Box
                            borderWidth={1}
                            radius={10}
                            px={10}
                            direction="row"
                            justify="center"
                            align="center"
                            width={"100%"}
                            borderColor={Colors.theme.primary}
                          >
                            <MainIconButton
                              icon={{
                                name: "location-pin",
                                source: "Entypo",
                                size: moderateScale(12),
                                color: Colors.theme.primary,
                              }}
                            />
                            <MainText
                              size={moderateScale(12)}
                              color={Colors.theme.inputLabel}
                              mx={10}
                            >
                              {title}
                            </MainText>
                            <MainText
                              fontWeight="bold"
                              style={{ fontSize: 14 }}
                              color={Colors.theme.inputLabel}
                            >
                              {address}
                            </MainText>
                          </Box>
                        </MainButton>
                      );
                    }}
                  /> */}

                  <GooglePlacesAutocomplete
                    placeholder="Search"
                    onPress={(data, details = null) => {
                      // 'details' is provided when fetchDetails = true
                      console.log(data, details);
                    }}
                    query={{
                      key: `AIzaSyCHHzlPfuUD6JyzylB84QHbeoe6iVIgrxA`,
                      language: "en",
                    }}
                    styles={{
                      textInputContainer: {
                        width: "100%",
                      },
                      description: {
                        fontWeight: "bold",
                      },
                    }}
                    fetchDetails={true}
                  />
                </Box>
              ) : (
                <AnimatePresence>
                  <MotiView
                    from={{
                      transform: [{ translateY: 90 }, { scale: 1 }],
                      opacity: 0,
                    }}
                    animate={{
                      transform: [{ translateY: 0 }, { scale: 1 }],
                      opacity: 1,
                    }}
                    transition={{ type: "timing", duration: 500 }}
                    style={{
                      width: "100%",
                      height: ScreenHeight * 0.7,
                      alignItems: "center",
                    }}
                  >
                    <Mapview
                      style={{
                        width: "100%",
                        height: "90%",
                      }}
                      initialRegion={{
                        latitude: geometry?.location.lat ?? -1.2920659,
                        longitude: geometry?.location.lng ?? 36.8219462,
                        latitudeDelta: 0.1,
                        longitudeDelta: KMToLongitudes(
                          1.0,
                          geometry?.location.lat
                        ),
                      }}
                    >
                      <MainText size={moderateScale(15)} my={10}>
                        {location?.formatted_address}
                      </MainText>
                    </Mapview>
                  </MotiView>
                </AnimatePresence>
              )}
            </Box>
          </MainBottomSheet>
        </Box>
      </TouchableWithoutFeedback>
    </MainModal>
  );
};

export default MainPlacesPicker;
