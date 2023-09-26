import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Image,
} from "react-native";
import { useState } from "react";
import { Stack, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

import { COLORS, icons, SIZES } from "../constants";
import { MainMenuButton } from "../components";
import styles from "./index.styles";

const Home = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <View style={{ flex: 1 }}>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
        />

        <View style={styles.mainMenuContainer}>
          <View style={styles.logoContainer}>
            <Image source={icons.title} style={styles.titleImage} />
          </View>
          <Text style={styles.headerText}>알약 검색</Text>
          <View style={styles.buttonContainer}>
            <MainMenuButton text={"카메라 촬영"} icon={icons.camera} />
            <MainMenuButton text={"디바이스 촬영"} icon={icons.device} />
          </View>
          <View style={styles.buttonContainer}>
            <MainMenuButton text={"검색"} />
            <MainMenuButton
              text={"설정"}
              color={COLORS.buttonSecondary}
              icon={icons.settings}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
