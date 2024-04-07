import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function HomeLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "home",
          }}
        />
        <Stack.Screen
          name="modal"
          options={{
            presentation: "modal",
          }}
        />
      </Stack>
    </>
  );
}
