import { View, Text, TouchableOpacity } from "react-native";
import { Stack, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextButton } from "../components";

export default function Page() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      <Stack.Screen
        options={{ headerShadowVisible: false, title: "디바이스로 촬영" }}
      />
      <TextButton text={"촬영 시작"} />
    </SafeAreaView>
  );
}
