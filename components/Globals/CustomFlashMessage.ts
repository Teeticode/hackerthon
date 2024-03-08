import { MessageType, showMessage } from "react-native-flash-message";
import Colors from "../../constants/Colors";
import { moderateScale } from "react-native-size-matters";
import {
  lightHapticFeedback,
  notifyHapticFeedback,
} from "../../Screens/protected/Tabs/Notifications/utils/haptics";

export const CustomFlashMessage = (
  message: string,
  type: MessageType | undefined,
  duration?: number,
  description?: string | undefined
) => {
  notifyHapticFeedback(
    type == "danger"
      ? "Error"
      : type == "warning"
      ? "Warning"
      : type == "info"
      ? "Success"
      : "Success"
  );
  showMessage({
    message: message,
    type: type,
    icon: type,
    description: description,
    duration: duration ? duration : 3000,
    floating: true,
    position: "top",
    animated: true,
    style: {
      borderRadius: moderateScale(20),
      marginTop: moderateScale(50),
      padding: moderateScale(10),
    },
    titleStyle: {
      color: Colors.dark.text,
      fontFamily: "Roboto_500Medium",
      marginHorizontal: moderateScale(10),
    },
  });
};
