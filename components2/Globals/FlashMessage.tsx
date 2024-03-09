import { MessageType, showMessage } from "react-native-flash-message";
import { scale } from "../../constants/Scaler";
import Colors from "../../constants/Colors";

export const FlashMessage = (
  message: string,
  type: MessageType | undefined,
  description?: string | undefined,
  duration?: number | undefined
) =>
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
      borderRadius: scale(10),
      marginTop: scale(50),
      padding: scale(10),
    },
    titleStyle: {
      color: Colors.dark.text,
      fontFamily: "Nunito_500Medium",
      marginHorizontal: scale(10),
    },
  });
