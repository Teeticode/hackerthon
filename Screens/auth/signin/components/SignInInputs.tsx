import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Box from "@/components/Globals/Box";
import HackerthonInput from "@/components2/Globals/HackerthonInput";
import MainIcon from "@/components/Globals/MainIcon";
import { moderateScale } from "react-native-size-matters";

type Props = {};

const SignInInputs = (props: Props) => {
  return (
    <Box>
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
        password={true}
        placeholder="Password"
      />
    </Box>
  );
};

export default SignInInputs;

const styles = StyleSheet.create({});
