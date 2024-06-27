import { Stack } from "expo-router";
import { ModalPortal } from "react-native-modals";
export default function Layout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="homescreen" options={{ headerShown: false }} />
        <Stack.Screen name="journal" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="create" options={{ headerShown: false }} />
        <Stack.Screen name="report" options={{ headerShown: false }} />
      </Stack>
      <ModalPortal />
    </>
  );
}
