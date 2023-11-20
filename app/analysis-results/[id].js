// Import standard React components
import React, { useEffect, useState } from "react";
import { Stack, useRouter, useGlobalSearchParams } from "expo-router";
import { Text, SafeAreaView, FlatList } from "react-native";

// Import custom styles and components
import styles from "./analysis-results.styles";
import { COLORS, icons, SIZES } from "../../constants";
import { ResultsList } from "../../components";

// Import Firebase components
import { ref, getDatabase, onChildAdded } from "firebase/database";

const DisplayAnalysis = () => {
  const UUID = useGlobalSearchParams(); // Get id (uuid) of this page
  const router = useRouter();
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Subscribe on load, unsubscribe on discard
  useEffect(() => {
    const resultsRef = ref(getDatabase(), `requests/${UUID.id}/result`);

    // Subscribe to results node under given UUID
    // Triggered if analysis results are inserted into node
    const unsubscribe = onChildAdded(resultsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();

        if (data && typeof data == "object") {
          // Convert object into array
          const resultArray = Object.entries(data).map(([key, value]) => ({
            key,
            description: value.description,
            imageUrl: value.imageUrl,
          }));
          setResults(resultArray);
          setIsLoading(false); // Loading done
        }
      } else {
        setResults([]);
        setIsLoading(true);
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
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View style={styles.resultItem}>
            <Image source={{ uri: item.imageUrl }} style={styles.resultImage} />
            <Text style={styles.resultTitle}>{item.key}</Text>
            <Text style={styles.resultDescription}>{item.description}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default DisplayAnalysis;
