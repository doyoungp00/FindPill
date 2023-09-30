import { View, Text, TouchableOpacity } from "react-native";
import { Stack, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { GenericButton } from "../components";
import styles from "./search.styles";

export default function Page() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Stack.Screen options={{ headerShadowVisible: false, title: "설정" }} />
        <Text style={styles.text}>설정</Text>
      </View>
    </SafeAreaView>
  );
}
