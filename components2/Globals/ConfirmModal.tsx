import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MainModal from "./MainModal";
import Box from "./Box";
import MainText from "./MainText";
import Row from "./Row";
import MainButton from "./MainButton";
import Colors from "@/constants/Colors";
import { moderateScale } from "react-native-size-matters";
import { AntDesign } from "@expo/vector-icons";
import MainIcon from "./MainIcon";

type Props = {
  onClose: () => void;
  visible: boolean;
  description?: string;
  action: () => void;
  title?: string;
};

const ConfirmModal = (props: Props) => {
  return (
    <MainModal visible={props.visible} onRequestClose={() => props.onClose()}>
      <Box gap={16} py={10} align="center">
        <MainIcon
          name="alert-triangle"
          size={moderateScale(40)}
          color={Colors.theme.danger}
        />
        <MainText color={Colors.theme.text} fontFamily="Nunito_700Bold">
          {props.title ?? "Are you sure?"}
        </MainText>
        <MainText color={Colors.theme.inputBorder} fontWeight="bold">
          {props.description ?? "The itme selected will be deleted"}
        </MainText>

        <MainButton
          width={"100%"}
          labelProps={{ color: Colors.theme.danger, fontWeight: "bold" }}
          type="primary-outlined"
          borderColor={Colors.theme.danger}
          onPress={() => {
            props.onClose();
          }}
          radius={10}
          mr={moderateScale(10)}
          label="Cancel"
        />
        <MainButton
          width={"100%"}
          color={Colors.theme.danger}
          type="primary"
          onPress={() => {
            props.onClose();
          }}
          radius={10}
          label={"Yes, Delete"}
        />
      </Box>
    </MainModal>
  );
};

export default ConfirmModal;

const styles = StyleSheet.create({});
