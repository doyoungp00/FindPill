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

import { COLORS, icons, SIZES } from "../constants";
import { MainMenuButton } from "../components";
import styles from "./index.styles";

const Home = () => {
  const router = useRouter();

  // Detect dark mode
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      {/* Main Menu */}
      <ScrollView contentContainerStyle={styles.mainMenuContainer(colorScheme)}>
        {/* Title logo and text */}
        <View style={styles.logoContainer}>
          <Image source={icons.title} style={styles.titleImage} />
        </View>
        <Text style={styles.headerText}>알약 검색</Text>

        {/* Menu buttons */}
        <View style={styles.buttonContainer}>
          <MainMenuButton
            text={"카메라 촬영"}
            icon={icons.camera}
            route="/camera"
          />
          <MainMenuButton
            text={"디바이스 촬영"}
            icon={icons.device}
            route="/device"
          />
        </View>
        <View style={styles.buttonContainer}>
          <MainMenuButton text={"검색"} icon={icons.search} route="/search" />
          <MainMenuButton
            text={"설정"}
            color={COLORS.buttonSecondary}
            icon={icons.settings}
            route="/settings"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
