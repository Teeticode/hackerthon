import { useEffect, useState } from "react";
import MainButton from "./MainButton";
import MainModal from "./MainModal";
import MainTextInput from "./MainTextInput";
import { Feather } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import Box from "./Box";
import { ThemedButtonProps } from "./MainButtonIcon";
import { ScreenHeight } from "@rneui/base";
import Colors from "../../constants/Colors";

type Obj = { [key: string]: any }; // Define a general object type

type KeysUnion<T extends Obj[]> = T extends Array<infer U> ? keyof U : never; // Extract keys union from array of objects

interface MainOptionsPickerProps<T extends Obj[]> extends ThemedButtonProps {
  options: T;
  labelProperty: KeysUnion<T>;
  enableSearch?: boolean;
  selected?: T[number] | null;
  onInput?: (selectedOption: T[number]) => void;
}
export function MainOptionsPicker<T extends Obj[]>(
  props: MainOptionsPickerProps<T>
) {
  const [selectedOption, setSelectedOption] = useState<
    Record<string, any> | null | undefined
  >(props.selected as any);
  const [showOptionPicker, setShowOptionPicker] = useState(false);

  const [filteredOptions, setFilteredOptions] = useState<T[number][]>(
    props.options
  );

  function filterOptions(query: string) {
    const found = props.options.filter((option) =>
      option[props.labelProperty]
        .toString()
        .toLowerCase()
        .includes(query.toLowerCase())
    );
    setFilteredOptions(found);
  }

  useEffect(() => {
    setSelectedOption(props.selected);
    filterOptions("");
  }, [props.selected]);

  return (
    <>
      <MainButton
        {...props}
        label={
          selectedOption
            ? selectedOption[props.labelProperty].toString()
            : props.label
            ? props.label
            : "Select"
        }
        icon={{ name: "chevron-down", position: "append" }}
        onPress={() => setShowOptionPicker(true)}
        type={selectedOption ? "secondary" : "surface"}
      />

      <MainModal
        position="bottom"
        visible={showOptionPicker}
        containerProps={{
          height: Math.min(props.options.length * 50, ScreenHeight - 100),
          radiusTop: 20,
          pa: 10,
        }}
        onRequestClose={() => setShowOptionPicker(false)}
        title={`Select ${props.label}`}
      >
        {props.enableSearch && (
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
        <FlashList
          estimatedItemSize={100}
          data={filteredOptions}
          renderItem={({ item: option }) => {
            return (
              <Box align="flex-start" key={option[props.labelProperty]} block>
                <MainButton
                  label={option[props.labelProperty]}
                  type={selectedOption === option ? "secondary" : "text"}
                  size="sm"
                  onPress={() => {
                    if (props.onInput) props.onInput(option);
                    setSelectedOption(option);
                    setShowOptionPicker(false);
                  }}
                  width={"100%"}
                  wrapperProps={{ justify: "flex-start" }}
                  radius={15}
                />
              </Box>
            );
          }}
        />
      </MainModal>
    </>
  );
}
