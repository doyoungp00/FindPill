import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { Stack, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { GenericButton } from "../components";
import { withDecay } from "react-native-reanimated";
import styles from "./camera.styles";
import { IconButton } from "../components";
import { COLORS, icons } from "../constants";

export default function Page() {
  const router = useRouter();

  // Set up camera
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          카메라를 사용하기 위해 권한이 필요합니다.
        </Text>
        <GenericButton text={"권한 부여하기"} onPress={requestPermission} />
      </View>
    );
  }

  // Function to switch between front & back camera
  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          title: "카메라 촬영",
        }}
      />
      <Camera style={styles.camera} type={type}>
        <IconButton
          icon={icons.cameraswitch}
          onPress={toggleCameraType}
          width="20%"
          color={COLORS.lightWhite}
        />
      </Camera>
      <View style={styles.buttonContainer}>
        <IconButton icon={icons.cameracircle} width="30%" color="transparent" />
      </View>
    </SafeAreaView>
  );
}
