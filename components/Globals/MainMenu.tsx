import ActionSheet, { SheetProps } from "react-native-actions-sheet";
import Box from "./Box";
import { FlatList } from "react-native";
import MainButton from "./MainButton";
import { useEffect, useState } from "react";
import MainTextInput from "./MainTextInput";
import { Feather } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { MenuOptionsProps } from "./sheets";
import MainText from "./MainText";

function MainMenu(props: SheetProps<"main-menu">) {
  const [showOptionPicker, setShowOptionPicker] = useState(false);
  const [selectedOption, setSelectedOption] = useState<
    MenuOptionsProps["options"][0] | undefined
  >(undefined);

  const [filteredOptions, setFilteredOptions] = useState<
    MenuOptionsProps["options"] | undefined
  >(props.payload?.options);

  function filterOptions(query: string) {
    const found = props.payload?.options.filter((option) => {
      return option.label
        .toString()
        .toLowerCase()
        .includes(query.toLowerCase());
    });
    setFilteredOptions(found);
  }

  // useEffect(() => {
  //   filterOptions("");
  // }, [props.selected]);
  useEffect(() => {
    filterOptions("");
  }, [props?.payload?.options]);

  return (
    <ActionSheet>
      <Box ma={10} align="center">
        {props.payload?.enabledSearch && (
          <MainTextInput
            placeholder="Search"
            leftSlot={
              <Feather name="search" size={16} color={Colors.theme.text} />
            }
            onChangeText={(value) => {
              filterOptions(value);
            }}
          />
        )}
        <MainText align="center" color={Colors.theme.lightDescription}>
          {props?.payload?.labelProperty
            ? ` ${props.payload.labelProperty}`
            : "Select Option"}
        </MainText>
        <FlatList
          data={filteredOptions}
          renderItem={({ item: option }) => {
            return (
              <MainButton
                label={option.label}
                labelProps={{
                  color: option.color,
                }}
                type={selectedOption === option ? "secondary" : "text"}
                size="lg"
                onPress={() => {
                  setSelectedOption(option);
                  setShowOptionPicker(false);
                  option?.onPress();
                }}
                width={"100%"}
                radius={15}
              />
            );
          }}
        />
      </Box>
    </ActionSheet>
  );
}

export default MainMenu;
