import { View, ScrollView, SafeAreaView, StyleSheet } from "react-native";
import { useState } from "react";
import { Stack, useRouter } from "expo-router";

import { COLORS, icons, SIZES } from "../constants";
import { MainMenuButton } from "../components";
import styles from "./index.styles";

const Home = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerText}>필 통</View>
        <View style={styles.buttonContainer}>
          <MainMenuButton />
          <MainMenuButton />
        </View>
        <View style={styles.buttonContainer}>
          <MainMenuButton />
          <MainMenuButton />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
