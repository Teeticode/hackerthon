import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Box from "@/components/Globals/Box";
import HackerthonInput from "@/components2/Globals/HackerthonInput";
import MainIcon from "@/components/Globals/MainIcon";
import { moderateScale } from "react-native-size-matters";

type Props = {};

const StudentInputs = (props: Props) => {
  return (
    <Box>
      <HackerthonInput
        Icon={
          <MainIcon size={moderateScale(18)} source="AntDesign" name="user" />
        }
        placeholder="Full Name"
      />
      <HackerthonInput
        Icon={
          <MainIcon
            size={moderateScale(18)}
            source="MaterialCommunityIcons"
            name="email-outline"
          />
        }
        placeholder="Enter Your Email"
      />
      <HackerthonInput
        Icon={
          <MainIcon
            size={moderateScale(20)}
            source="MaterialIcons"
            name="lock-outline"
          />
        }
        placeholder="Password"
      />
      <HackerthonInput
        Icon={
          <MainIcon
            size={moderateScale(20)}
            source="MaterialIcons"
            name="lock-outline"
          />
        }
        placeholder="Registration Number"
      />
    </Box>
  );
};

export default StudentInputs;

const styles = StyleSheet.create({});
