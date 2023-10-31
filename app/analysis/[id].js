// Import standard React components
import React, { useEffect, useState } from "react";
import { Stack, useRouter, useGlobalSearchParams } from "expo-router";
import { Text, SafeAreaView, FlatList } from "react-native";

// Import custom styles and components
import styles from "./analysis.styles";
import { COLORS, icons, SIZES } from "../../constants";
import { ResultsList } from "../../components";

// Import Firebase components
import { ref, onValue, getDatabase } from "firebase/database";

const DisplayAnalysis = () => {
  const UUID = useGlobalSearchParams(); // Get id (uuid) of this page
  const router = useRouter();
  const [results, setResults] = useState([]);

  // Subscribe on load, unsubscribe on discard
  useEffect(() => {
    const resultsRef = ref(getDatabase(), `requests/${UUID.id}/results`);

    // Subscribe to results node under given UUID
    const unsubscribe = onValue(resultsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        // Assuming data is an array of results
        if (Array.isArray(data)) {
          setResults(data);
        }
      }
    });

    // Unsubscribe from the Firebase reference when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{ headerShadowVisible: false, title: "식별 결과" }}
      />
      <FlatList
        data={results}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.resultItem}>
            <Image source={{ uri: item.imageUrl }} style={styles.resultImage} />
            <Text style={styles.resultTitle}>{item.title}</Text>
            <Text style={styles.resultDescription}>{item.description}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default DisplayAnalysis;
