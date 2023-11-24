// Import standard React components
import React, { useEffect, useState } from "react";
import { Stack, useRouter, useGlobalSearchParams } from "expo-router";
import { Text, SafeAreaView, View, ActivityIndicator } from "react-native";

// Import custom styles and components
import styles from "./analysis-results.styles";
import { COLORS, icons, SIZES } from "../../constants";
import { ResultsList } from "../../components";

// Import Firebase components
import { ref, getDatabase, onChildAdded, remove } from "firebase/database";

const DisplayAnalysis = () => {
  const UUID = useGlobalSearchParams(); // Get id (uuid) of this page
  const router = useRouter();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Subscribe on load, unsubscribe on discard
  useEffect(() => {
    const resultsRef = ref(getDatabase(), `requests/${UUID.id}/results`);

    // Subscribe to results node under given UUID
    // Triggered if analysis results are inserted into node
    const unsubscribe = onChildAdded(resultsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();

        if (data && typeof data == "object") {
          // Convert object into array
          const resultArray = Object.entries(data).map(([key, value]) => ({
            key,
            품목일련번호: value.품목일련번호,
            큰제품이미지: value.큰제품이미지,
            품목명: value.품목명,
            업체명: value.업체명,
            성상: value.성상,
            의약품제형: value.의약품제형,
          }));
          setData(resultArray);
          setIsLoading(false); // Loading done

          // Session over, cleanup this node
          remove(ref(getDatabase()), `requests/${UUID.id}/results`);
        }
      } else {
        setData([]);
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

      {/* Conditional rendering for loading wheel */}
      {isLoading ? (
        <View style={{ paddingTop: SIZES.large }}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>잠시만 기다려 주세요...</Text>
        </View>
      ) : (
        <ResultsList
          data={data}
          isLoading={isLoading}
          error={null}
          style={styles.list}
        />
      )}
    </SafeAreaView>
  );
};

export default DisplayAnalysis;
