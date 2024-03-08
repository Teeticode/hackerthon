import { ScreenHeight } from "@rneui/base";
import { View } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import LottieView from "lottie-react-native";

const LoadingAnimation = () => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        height: ScreenHeight,
      }}
    >
      <LottieView
        source={require("../../assets/animation/elevate.json")}
        loop={true}
        style={{ width: moderateScale(50), height: verticalScale(50) }}
        speed={1.5}
        autoPlay={true}
      />
    </View>
  );
};

export default LoadingAnimation;
