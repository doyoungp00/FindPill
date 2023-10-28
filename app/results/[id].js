// Import standard React components
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
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

  const [searchResult, setSearchResult] = useState([]);
  const [searchLoader, setSearchLoader] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [page, setPage] = useState(1);

  // Call hook using id of this page (query)
  const { data, isLoading, error, refetch } = useFetch(params.id);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{ headerShadowVisible: false, title: "검색 결과" }}
      />

      <ResultsList data={data} isLoading={isLoading} error={error} />
    </SafeAreaView>
  );
};

export default DisplayResults;
