// Import standard React components
import { useState, useRef, useEffect } from "react";
import { View, Text } from "react-native";
import { Camera, CameraType, ImageType } from "expo-camera";
import { Stack, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

// Import custom styles and components
import styles from "./device.styles";
import { COLORS, icons } from "../constants";
import { TextButton, IconButton } from "../components";

export default function Page() {
  const router = useRouter();

  // Set up camera
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef(null);

  // UUID setup
  const [UUID, setUUID] = useState("");

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
        <TextButton text={"권한 부여하기"} onPress={requestPermission} />
      </View>
    );
  }

  // Function to switch between front & back camera
  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  // Function to read QR codes
  function readQR(scanningResult) {
    console.log("Read QR code value " + scanningResult.data);
    let arr = String(scanningResult.data).split(":");
    if (arr.length < 3 || arr[0] != "FindPill" || arr[1] != "device") return;

    router.push(`/analysis-results/${arr[2]}`);
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header settings */}
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          title: "카메라 촬영",
        }}
      />
      {/* Camera */}
      <Camera
        style={styles.camera}
        type={type}
        ref={cameraRef}
        onBarCodeScanned={(scanningResult) => readQR(scanningResult)}
      >
        {/* Camera switch button */}
        <IconButton
          icon={icons.cameraswitch}
          onPress={toggleCameraType}
          width="15%"
          color={COLORS.gray2 + "e0"}
          accessibilityLabel="카메라 전환"
        />
      </Camera>
    </SafeAreaView>
  );
}
