import { InputProps } from "@rneui/base";
import { Input } from "@rneui/themed";
import { StyleSheet } from "react-native";
interface PaymentInputProps extends InputProps {}
export const PaymentInput: React.FC<PaymentInputProps> = ({
  style,
  inputContainerStyle,
  inputStyle,
  ...rest
}) => {
  return (
    <Input
      {...rest}
      style={[style, styles.container]}
      inputContainerStyle={[inputContainerStyle, styles.container]}
      inputStyle={[inputStyle, styles.input]}
    />
  );
};
export default PaymentInput;

const styles = StyleSheet.create({
  container: {},
  inputText: {},
  input: {},
});
