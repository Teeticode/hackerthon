import { ReactNode, useState } from "react";
import MainText, { MainTextProps } from "./MainText";
import { Pressable, TextInput, TextInputProps } from "react-native";
import { Feather } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import Box, { BoxProps } from "./Box";
import MainIconButton from "./MainIconButton";
import MainModal from "./MainModal";
import { FlashList } from "@shopify/flash-list";
import { TouchableOpacity } from "react-native-gesture-handler";
// import { countries } from "../../constants/countries";

import { useTheme } from "@react-navigation/native";
import { ScreenHeight } from "@rneui/base";
import { moderateScale } from "react-native-size-matters";

export default function MainTextInput({
  wrapper,
  errorMessage,
  errors,
  leftSlot,
  leftSlotProps,
  rightSlot,
  rightSlotProps,
  dense,
  label,
  labelProps,
  size = "md",
  ...input
}: MainTextInputProps) {
  const sizeStyles = getTextStyles(size);

  return (
    <Box>
      {label && (
        <MainText
          mb={8}
          size={"sm"}
          color={Colors.theme.inputLabel}
          fontWeight="light"
          {...labelProps}
        >
          {label}
        </MainText>
      )}
      <>
        <Box
          radius={wrapper?.radius || moderateScale(4)}
          borderWidth={1}
          direction="row"
          justify="flex-start"
          {...wrapper}
        >
          {leftSlot && (
            <Box
              pl={sizeStyles.paddingHorizontal / 2}
              align="center"
              justify="center"
              {...leftSlotProps}
            >
              {leftSlot}
            </Box>
          )}

          <TextInput
            style={{
              flexGrow: 1,
              paddingLeft: leftSlot
                ? sizeStyles.paddingHorizontal / 4
                : sizeStyles.paddingHorizontal,
              paddingVertical: sizeStyles.paddingVertical,
              fontFamily: "Mulish",
              fontSize: sizeStyles.fontSize,
              color: Colors.theme.text,
              minWidth: input.placeholder?.length
                ? input.placeholder.length * moderateScale(10)
                : moderateScale(100),
            }}
            placeholderTextColor={Colors.theme.primary}
            {...input}
          />
          {rightSlot && (
            <Box
              pr={sizeStyles.paddingHorizontal / 2}
              align="center"
              justify="center"
              {...rightSlotProps}
            >
              {rightSlot}
            </Box>
          )}
        </Box>

        {errorMessage && (
          <MainText color={Colors.theme.danger} size={moderateScale(12)}>
            {errorMessage}
          </MainText>
        )}
        {errors && errorMessage?.length && (
          <Box block>
            {errors.map((err) => (
              <MainText key={err} color={Colors.theme.danger} size={12}>
                {err}
              </MainText>
            ))}
          </Box>
        )}
      </>
    </Box>
  );
}

export function MainEmailInput(props: MainTextInputProps) {
  return (
    <MainTextInput
      placeholder="Email"
      keyboardType="email-address"
      rightSlot={<Feather name="mail" size={18} color={Colors.theme.text} />}
      {...props}
    />
  );
}
// export type Country = (typeof countries)[0];

// // export function CountryModal({
// //   onSelect,
// //   close,
// //   disableCityFetch,
// //   visible,
// // }: {
// //   onSelect: (value: Country) => void;
// //   close: () => void;
// //   disableCityFetch: boolean;
// //   visible: boolean;
// // }) {
// //   const [filteredCountries, setFilteredCountries] =
// //     useState<Country[]>(countries);

// //   const theme = useTheme();

// //   function filterCountries(query: string) {
// //     const found = countries.filter((country) =>
// //       country.name.toLowerCase().includes(query.toLowerCase())
// //     );
// //     setFilteredCountries(found);
// //   }

// //   return (
// //     <MainModal
// //       position="bottom"
// //       visible={visible}
// //       transparent
// //       onRequestClose={close}
// //     >
// //       <Box gap={10} block height={ScreenHeight - 100}>
// //         <MainTextInput
// //           wrapper={{
// //             mt: moderateScale(20),
// //             radius: moderateScale(10),
// //           }}
// //           placeholder="Search Country"
// //           leftSlot={
// //             <Feather
// //               name="search"
// //               size={moderateScale(16)}
// //               color={Colors.theme.text}
// //             />
// //           }
// //           onChangeText={(value) => {
// //             filterCountries(value);
// //           }}
// //         />
// //         <Box block flex={1}>
// //           <FlashList
// //             estimatedItemSize={100}
// //             data={filteredCountries}
// //             renderItem={({ item: country }) => {
// //               return (
// //                 <TouchableOpacity
// //                   onPress={() => {
// //                     onSelect(country);
// //                     // if (!disableCityFetch) {
// //                     // 	dispatch(getCities({ country_id: country.id }));
// //                     // }
// //                   }}
// //                 >
// //                   <Box key={country.id} direction="row" block pa={20} gap={10}>
// //                     <CountryFlag isoCode={country.short_code} size={20} />
// //                     <MainText>{country.name}</MainText>
// //                     <MainText style={{ opacity: 0.6 }}>
// //                       +{country.phone_code}
// //                     </MainText>
// //                   </Box>
// //                 </TouchableOpacity>
// //               );
// //             }}
// //           />
// //         </Box>
// //       </Box>
// //     </MainModal>
// //   );
// // }

export function ThemedPasswordInput(props: MainTextInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <MainTextInput
      placeholder="Password"
      {...props}
      secureTextEntry={!showPassword}
      rightSlot={
        <Pressable onPress={() => setShowPassword((value) => !value)}>
          <Feather
            name={showPassword ? "eye-off" : "eye"}
            size={20}
            color={Colors.theme.text}
          />
        </Pressable>
      }
    />
  );
}

export function ThemedSearchInput(props: ThemedSearchInputProps) {
  const [value, setValue] = useState(props.value || "");

  return (
    <MainTextInput
      placeholder="Search"
      value={value}
      {...props}
      onChangeText={(value) => {
        setValue(value);
        if (props.onChangeText) props.onChangeText(value);
      }}
      rightSlot={
        <MainIconButton
          icon={{ name: "x" }}
          onPress={() => {
            setValue("");
            if (props.clear) props.clear();
          }}
        />
      }
    />
  );
}
const getTextStyles = (size: InputSize): InputStyles => {
  let styles: InputStyles = {
    paddingVertical: 14,
    paddingHorizontal: 18,
    fontSize: 16,
  };

  switch (size) {
    case "xxxs":
      styles = {
        paddingVertical: 6,
        paddingHorizontal: 10,
        fontSize: 6,
      };
      break;
    case "xxs":
      styles = {
        paddingVertical: 2,
        paddingHorizontal: 12,
        fontSize: 8,
      };
      break;
    case "xs":
      styles = {
        paddingVertical: 0,
        paddingHorizontal: 14,
        fontSize: 10,
      };
      break;
    case "sm":
      styles = {
        paddingVertical: 12,
        paddingHorizontal: 16,
        fontSize: 12,
      };
      break;
    case "md":
      styles = {
        paddingVertical: 14,
        paddingHorizontal: 18,
        fontSize: 14,
      };
      break;
    case "lg":
      styles = {
        paddingVertical: 16,
        paddingHorizontal: 20,
        fontSize: 16,
      };
      break;
    case "xl":
      styles = {
        paddingVertical: 18,
        paddingHorizontal: 22,
        fontSize: 18,
      };
      break;
    case "xxl":
      styles = {
        paddingVertical: 20,
        paddingHorizontal: 24,
        fontSize: 20,
      };
      break;
    case "xxxl":
      styles = {
        paddingVertical: 22,
        paddingHorizontal: 26,
        fontSize: 22,
      };
      break;
    default:
      // Default values already set
      break;
  }

  return styles;
};

type InputSize =
  | "xxxs"
  | "xxs"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "xxl"
  | "xxxl";

interface InputStyles {
  paddingVertical: number;
  paddingHorizontal: number;
  fontSize: number;
}

interface MainTextInputProps extends TextInputProps {
  wrapper?: Omit<BoxProps, "children">;
  errorMessage?: string | null | undefined;
  errors?: string[];
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
  leftSlotProps?: SlotProps;
  rightSlotProps?: SlotProps;
  label?: string;
  labelProps?: MainTextProps;
  dense?: boolean;
  radius?: number;
  size?: InputSize;
}

type _BoxProps = Omit<BoxProps, "children">;

interface SlotProps extends _BoxProps {
  spacing?: number;
}

interface ThemedTextInputProps extends TextInputProps {
  wrapper?: Omit<BoxProps, "children">;
  errorMessage?: string | null | undefined;
  errors?: string[];
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
  leftSlotProps?: SlotProps;
  rightSlotProps?: SlotProps;
  label?: string;
  labelProps?: MainTextProps;
  dense?: boolean;
  size?: InputSize;
}

interface ThemedPhoneNumberInputProps extends ThemedTextInputProps {
  onInput?: (value: string) => void;
  selectedPhone?: {
    phoneCode: string;
    cellphone: string;
  };
}

interface ThemedSearchInputProps extends ThemedTextInputProps {
  onInput?: (value: string) => void;
  clear?: () => void;
}
