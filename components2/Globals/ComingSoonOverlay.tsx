import { StyleSheet } from "react-native";
import React, { Ref, useCallback, useEffect, useMemo, useRef } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import FastImage from "react-native-fast-image";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { Text, View } from "../Themed";
import AuthButton from "../../Screens/auth/Components/AuthButton";
import Colors from "../../constants/Colors";
import { FlashMessage } from "./FlashMessage";
import useFetch from "../../hooks/useFetch";
import { notifications_reservations_waitlist } from "../../redux/features/services/dashboard";

type Props = {
  sheetRef: Ref<BottomSheetMethods>;
};

const ComingSoonOverlay = ({ sheetRef }: Props) => {
  const snapPoints = useMemo(() => ["50%", "70%"], []);
  const handleSheetChange = useCallback((index: number) => {}, []);

  const { data, error, isLoading, callApi } =
    useFetch<NotificationsReservationsWaitlist>();

  useEffect(() => {
    if (data) {
      FlashMessage(data.msg, "success");
    } else if (error) {
      FlashMessage(
        "Error",
        "danger",
        "An error occured while trying to send the waitlist Info, Please try again"
      );
    }

    return () => {};
  }, [data, error, isLoading]);

  return (
    <BottomSheet
      ref={sheetRef}
      index={-1}
      enablePanDownToClose={true}
      snapPoints={snapPoints}
      onChange={handleSheetChange}
      handleIndicatorStyle={{
        width: moderateScale(66),
      }}
      backgroundStyle={{
        backgroundColor: "#D3EFF1",
      }}
      style={{
        justifyContent: "flex-start",
      }}
    >
      <FastImage
        source={require("../../assets/utils/coming-soon.png")}
        style={{
          width: "100%",
          height: verticalScale(270),
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
      <View style={styles.infoWrapper}>
        <Text style={[styles.infoTitle, styles.spacing]}>Coming Soon!</Text>
        <AuthButton
          disabled={isLoading}
          loading={isLoading}
          onPress={() => callApi(notifications_reservations_waitlist)}
          buttonStyle={[
            {
              width: moderateScale(311),
              height: verticalScale(40),
              alignSelf: "center",
            },
            styles.spacing,
          ]}
          color={Colors.theme.primary}
          title={<Text style={styles.notifyTitle}>Click to get Notified</Text>}
        />
        <Text style={styles.infoDescription}>
          Efficiently make reservations in restaurants anywhere across the
          country!
        </Text>
      </View>
    </BottomSheet>
  );
};

export default ComingSoonOverlay;

const styles = StyleSheet.create({
  infoWrapper: {
    width: "100%",
    flex: 1,
    alignItems: "center",
  },
  infoTitle: {
    fontFamily: "Nunito_800ExtraBold",
    fontSize: moderateScale(20),
    color: "black",
  },
  infoDescription: {
    fontFamily: "Nunito_400Regular",
    fontSize: moderateScale(16),
    textAlign: "center",
    color: "black",
  },
  notifyTitle: {
    fontFamily: "Nunito_700Bold",
    fontSize: moderateScale(16),
    color: "white",
  },
  spacing: {
    marginVertical: verticalScale(10),
  },
});
