// Import standard React components
import React, { useEffect, useState } from "react";
import { Stack, useRouter, useGlobalSearchParams } from "expo-router";
import { Text, SafeAreaView } from "react-native";

// Import custom styles and components
import { COLORS, icons, SIZES } from "../../constants";
import styles from "./results.styles";
import { useFetch } from "../../data";
import { ResultsList } from "../../components";

const DisplayResults = () => {
  const params = useGlobalSearchParams(); // Get id (query) of this page
  const router = useRouter();

  // Call hook using id of this page (query)
  const { data, isLoading, error, refetch } = useFetch(params.id);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{ headerShadowVisible: false, title: "검색 결과" }}
      />

      <ResultsList
        data={data}
        isLoading={isLoading}
        error={error}
        style={styles.list}
      />
    </SafeAreaView>
  );
};

export default DisplayResults;
