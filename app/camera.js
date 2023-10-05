import { useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import { Camera, CameraType } from "expo-camera";
import { Stack, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextButton } from "../components";
import { withDecay } from "react-native-reanimated";
import styles from "./camera.styles";
import { IconButton } from "../components";
import { COLORS, icons } from "../constants";

export default function Page() {
  const router = useRouter();

  // Set up camera
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef(null);

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

  // Function to generate a formatted timestamp
  function getFormattedTimestamp() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    return `${year}${month}${day}_${hours}${minutes}${seconds}`;
  }

  // Function to take a picture and save it with a formatted filename
  async function takePicture() {
    if (cameraRef.current) {
      try {
        const { uri } = await cameraRef.current.takePictureAsync();
        console.log("Picture taken. URI:", uri);

        // Generate a formatted timestamp
        const timestamp = getFormattedTimestamp();

        // Create the filename with the timestamp
        const filename = `FindPill_${timestamp}.png`;

        // Rename temp photo
        const finalUri = `${FileSystem.documentDirectory}/Pictures/FindPill/${filename}`;
        await FileSystem.moveAsync({
          from: uri,
          to: finalUri,
        });

        // Save the picture to the pictures folder with the specified filename
        const asset = await MediaLibrary.createAssetAsync(finalUri, filename);
        console.log("Picture saved to media library. Asset:", asset);
      } catch (error) {
        console.error("Error taking or saving the picture:", error);
      }
    }
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
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        {/* Camera switch button */}
        <IconButton
          icon={icons.cameraswitch}
          onPress={toggleCameraType}
          width="15%"
          color={COLORS.gray2 + "e0"}
          accessibilityLabel="카메라 전환"
        />
      </Camera>
      {/* Take picture button */}
      <View style={styles.buttonContainer}>
        <IconButton
          icon={icons.cameracircle}
          width="30%"
          color="transparent"
          onPress={takePicture}
          accessibilityLabel="사진 촬영"
        />
      </View>
    </SafeAreaView>
  );
}
