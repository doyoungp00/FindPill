// Import modules
import { View, Text, TouchableOpacity } from "react-native";
import { Stack, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

// Import components
import { TextButton } from "../components";

// Import styles
import styles from "./device.styles";
import { COLORS } from "../constants";

export default function Page() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      <Stack.Screen
        options={{ headerShadowVisible: false, title: "디바이스로 촬영" }}
      />
      <Text style={styles.text}>디바이스에 알약을 넣고 버튼을 누르세요.</Text>
      <LinearGradient
        colors={[COLORS.secondary, COLORS.tertiary]}
        style={styles.gradientButton}
        start={[0.53, 0]}
      >
        <Text style={styles.buttonText}>촬영 시작</Text>
      </LinearGradient>
    </SafeAreaView>
  );
}
