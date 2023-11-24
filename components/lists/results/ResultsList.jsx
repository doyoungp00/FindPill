// Import standard React components
import React from "react";
import {
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

// Import custom styles and components
import { COLORS } from "../../../constants";
import styles from "./resultslist.styles";
import { router } from "expo-router";

function ResultsList({ data, isLoading, error }) {
  // Return loading indicator if data is still loading / is empty
  if (isLoading || !data || data.length == 0) {
    return <ActivityIndicator size="large" color={COLORS.primary} />;
  }

  // Return in case of error
  if (error) {
    return <Text style={styles.errorText}>결과를 불러오지 못했습니다.</Text>;
  }

  return (
    // Create card list from API data, open browser on press
    <FlatList
      data={data}
      keyExtractor={(item) => item.품목일련번호.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.container}
          onPress={() => {
            router.push(`/pill-details/${item.품목일련번호}`);
          }}
          accessibilityLabel={`${item.품목명 || ""} 
          ${item.업체명 ? `업체명: ${item.업체명}. ` : ""} 
          ${item.성상 ? `성상: ${item.성상}. ` : ""} 
          ${item.의약품제형 ? `의약품제형: ${item.의약품제형}. ` : ""}`}
        >
          {item.큰제품이미지 ? (
            <Image
              source={{ uri: item.큰제품이미지 }}
              style={styles.thumbnail}
            />
          ) : null}

          <Text style={styles.title}>{item.품목명.split("(").join("\n(")}</Text>
          <Text style={styles.description}>
            {item.업체명 ? `업체명: ${item.업체명}` : ""}
            {item.성상 ? `\n성상: ${item.성상}` : ""}
            {item.의약품제형 ? `\n의약품제형: ${item.의약품제형}` : ""}
          </Text>
          {/* Add other card details here */}
        </TouchableOpacity>
      )}
    />
  );
}

export default ResultsList;
