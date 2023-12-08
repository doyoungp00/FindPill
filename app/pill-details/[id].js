// Import standard React components
import React, { useEffect, useState } from "react";
import { Stack, useRouter, useGlobalSearchParams } from "expo-router";
import {
  Text,
  SafeAreaView,
  Image,
  ActivityIndicator,
  View,
} from "react-native";

// Import custom styles and components
import { COLORS, icons, SIZES } from "../../constants";
import styles from "./pill-details.styles";
import { useFetch } from "../../data";
import { ScrollView } from "react-native-gesture-handler";

const DisplayDetails = () => {
  const params = useGlobalSearchParams(); // Get id (품목일련번호) of this page
  const router = useRouter();

  // Call hook using id of this page (품목일련번호)
  const { data, isLoading, error, refetch } = useFetch(
    "/getItemDetail",
    params.id
  );

  if (isLoading || data.length <= 0) {
    return (
      <View style={{ paddingTop: SIZES.large }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>잠시만 기다려 주세요...</Text>
      </View>
    );
  } else if (error) {
    return (
      <Text style={styles.errorText}>
        오류가 발생했습니다.
        {"\n"}
        {error.message}
      </Text>
    );
  } else {
    // Render list item text only if available
    const renderListItem = (title, desc) => {
      // console.log(`${title}:${desc}`);

      // Do not render anything if the description is missing or empty
      if (!desc) return null;

      desc = desc.toString().trim();
      if (desc.startsWith("효능효과") || desc.startsWith("용법용량"))
        desc = desc.substring(4);
      if (desc.startsWith("사용상의주의사항")) desc = desc.substring(8);

      return (
        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>{`${title}`}</Text>
          <Text style={styles.listDesc}>{`${desc.toString().trim()}`}</Text>
        </View>
      );
    };

    let details = data[0];
    console.log(JSON.stringify(details, null, 2));

    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen
          options={{ headerShadowVisible: false, title: "상세정보" }}
        />
        <ScrollView>
          <Image source={{ uri: details.큰제품이미지 }} style={styles.image} />

          {/* Display Text Information */}
          {renderListItem("품목명", details.품목명)}
          {renderListItem("업체명", details.업체명)}
          {renderListItem("의약품제형", details.의약품제형)}
          {renderListItem("성상", details.성상)}
          {renderListItem("효능효과", details.효능효과)}
          {renderListItem("용법용량", details.용법용량)}
          {renderListItem("저장방법", details.저장방법)}
          {renderListItem("유효기간", details.유효기간)}
          {renderListItem("전문일반", details.전문일반)}
          {renderListItem("원료성분", details.원료성분)}
          {renderListItem("주의사항", details.주의사항)}

          {/* View for bottom margin */}
          <View style={{ height: SIZES.xxLarge }}></View>
        </ScrollView>
      </SafeAreaView>
    );
  }
};

export default DisplayDetails;
