import { Stack } from "expo-router";
import { RootSiblingParent } from "react-native-root-siblings";

export default function RootLayout() {
  return (
    <RootSiblingParent>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="AddNote" options={{ headerShown: false }} />
        <Stack.Screen name="ViewNote" options={{ headerShown: false }} />
      </Stack>
    </RootSiblingParent>
  );
}
