import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { useState } from "react";
import useFetch from "../data/hook/useFetch";
import { Stack, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextButton, IconButton } from "../components";
import styles from "./search.styles";
import { icons } from "../constants";
import ResultsList from "../components";

export default function Page() {
  const router = useRouter();

  // Search field text
  const [query, updateQuery] = useState("");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SafeAreaView style={styles.container}>
        <Stack.Screen options={{ headerShadowVisible: false, title: "검색" }} />
        {/* Search input group */}
        <View style={{ flexDirection: "row" }}>
          <TextInput
            onChangeText={(text) => updateQuery(text.toString())} // Update query text
            placeholder="찾고 싶은 알약 이름을 이곳에 입력하세요"
            style={styles.input}
          />
          <IconButton
            icon={icons.search}
            accessibilityLabel="검색 시작"
            width={60}
            onPress={() => router.push(`/results/${query}`)} // Initiate the search on a new page
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
