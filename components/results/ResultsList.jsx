import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, ActivityIndicator } from "react-native";
import { COLORS } from "../../constants";

function ResultsList({ data, isLoading, error }) {
  if (isLoading) {
    return <ActivityIndicator size="large" color={COLORS.primary} />;
  }

  if (error) {
    return <Text>결과를 불러오지 못했습니다.</Text>;
  }

  return (
    <FlatList
      data={data?.rss?.channel?.item}
      keyExtractor={(item) => item.title[0]}
      renderItem={({ item }) => (
        <View>
          <Image source={{ uri: item.thumbnail[0] }} />
          <Text>{item.title[0]}</Text>
          {/* Add other card details here */}
        </View>
      )}
    />
  );
}

export default ResultsList;
