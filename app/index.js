// Import standard React components
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Image,
  useColorScheme,
} from "react-native";
import { useState } from "react";
import { Stack, useRouter } from "expo-router";

// Import custom styles and components
import styles from "./index.styles";
import { COLORS, icons, SIZES } from "../constants";
import { MainMenuButton } from "../components";
import { app } from "../firebaseConfig";

const Home = () => {
  const router = useRouter();

  // Detect dark mode
  const colorScheme = useColorScheme();

  // Ensure Firebase is loaded
  app;

  return (
    <ScrollView style={styles.mainMenuContainer}>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
        {/* Title logo and text */}
        <View style={styles.logoContainer}>
          <Image source={icons.title} style={styles.titleImage} />
        </View>
        <Text style={styles.headerText}>알약 검색</Text>

        {/* Menu buttons */}
        <View style={styles.buttonContainer}>
          <MainMenuButton
            text={"카메라 촬영"}
            color={COLORS.secondary}
            icon={icons.camera}
            route="/camera"
          />
          <MainMenuButton
            text={"디바이스 촬영"}
            color={COLORS.secondary}
            icon={icons.device}
            route="/device"
          />
        </View>
        <View style={styles.buttonContainer}>
          <MainMenuButton
            text={"검색"}
            color={COLORS.secondary}
            icon={icons.search}
            route="/search"
          />
          <MainMenuButton
            text={"설정"}
            color={COLORS.buttonSecondary}
            icon={icons.settings}
            route="/settings"
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Home;
