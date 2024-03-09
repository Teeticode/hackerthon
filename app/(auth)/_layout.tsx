import { Stack } from "expo-router";

const LayoutStack = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
};

const LayoutRoot = () => {
  return <LayoutStack />;
};

export default LayoutRoot;
