// Import standard React components
import React from "react";
import {
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
} from "react-native";

// Import custom styles and components
import { COLORS } from "../../../constants";
import styles from "./resultslist.styles";
import { router } from "expo-router";

// Regex for removing HTML tags from string
function removeHtmlTags(input) {
  return input.replace(/<.*?>/g, "");
}

function ResultsList({ data, isLoading, error }) {
  // Return loading indicator if data is still loading / is empty
  if (isLoading || !data || data.length == 0) {
    return <ActivityIndicator size="large" color={COLORS.emphasis} />;
  }

  // Return in case of error
  if (error) {
    return <Text style={styles.errorText}>결과를 불러오지 못했습니다.</Text>;
  }

  // // Modify the item titles to remove HTML tags
  // const modifiedData = data.rss.channel[0].item.map((item) => ({
  //   ...item,
  //   title: [removeHtmlTags(item.title[0])],
  //   description: [removeHtmlTags(item.description[0])],
  // }));

  // console.log("Result Data:", JSON.stringify(data.rss.channel[0].item, null, 2));

  return (
    // Create card list from API data, open browser on press
    <FlatList
      data={data}
      keyExtractor={(item) => item.품목일련번호}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.container}
          onPress={() => {
            router.push(`/details/${item.품목일련번호}`);
          }}
          accessibilityLabel={`${item.품목명 || ""} ${item.업체명 || ""} ${
            item.성상 || ""
          } ${item.의약품제형 || ""}`}
        >
          {item.thumbnail[0] ? (
            <Image
              source={{ uri: item.큰제품이미지 }}
              style={styles.thumbnail}
            />
          ) : null}

          <Text style={styles.title}>{item.품목명}</Text>
          <Text style={styles.description}>
            {`${item.업체명 || ""}\n${item.성상 || ""}\n${
              item.의약품제형 || ""
            }`}
          </Text>
          {/* Add other card details here */}
        </TouchableOpacity>
      )}
    />
  );
}

export default ResultsList;
