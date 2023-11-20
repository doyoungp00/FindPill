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
import { ResultsList } from "../../components";
import { ScrollView } from "react-native-gesture-handler";

const DisplayDetails = () => {
  const params = useGlobalSearchParams(); // Get id (품목일련번호) of this page
  const router = useRouter();

  // Call hook using id of this page (품목일련번호)
  const { data, isLoading, error, refetch } = useFetch(
    "/getItemDetail",
    params.id
  );

  if (isLoading) {
    return (
      <View style={{ paddingTop: SIZES.large }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>잠시만 기다려 주세요...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <Text style={styles.errorText}>
        오류가 발생했습니다.
        {"\n"}
        {error.message}
      </Text>
    );
  }

  // Render list item text only if available
  const renderListItem = (title, desc) => {
    if (!desc) {
      return null; // Do not render anything if the value is missing or empty
    }

    return (
      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>{`${title}`}</Text>
        <Text style={styles.listDesc}>{`${desc.toString().trim()}`}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{ headerShadowVisible: false, title: "상세정보" }}
      />
      <ScrollView>
        <Image source={{ uri: data.큰제품이미지 }} style={styles.image} />

        {/* Display Text Information */}
        {renderListItem("품목명", data.품목명)}
        {renderListItem("업체명", data.업체명)}
        {renderListItem("의약품제형", data.의약품제형)}
        {renderListItem("성상", data.성상)}
        {renderListItem("용법용량", data.용법용량)}
        {renderListItem("저장방법", data.저장방법)}
        {renderListItem("유효기간", data.유효기간)}
        {renderListItem("전문일반", data.전문일반)}

        {/* View for bottom margin */}
        <View style={{ height: SIZES.xxLarge }}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DisplayDetails;
