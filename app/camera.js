// Import standard React components
import { useState, useRef } from "react";
import { View, Text } from "react-native";
import * as FileSystem from "expo-file-system";
import { Camera, CameraType, ImageType } from "expo-camera";
import { Stack, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import uuid from "react-native-uuid";
import { app, storage } from "../firebaseConfig";
import { decode } from "base-64";

if (typeof global.atob === "undefined") {
  global.atob = (a) => Buffer.from(a, "base64").toString("binary");
}

// Import custom styles and components
import styles from "./camera.styles";
import { TextButton } from "../components";
import { IconButton } from "../components";
import { COLORS, icons } from "../constants";

// Import firebase storage and RTDB
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytes,
  uploadString,
} from "firebase/storage";

export default function Page() {
  const router = useRouter();

  // Set up camera
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef(null);

  // UUID setup
  const [UUID, setUUID] = useState(uuid.v4());
  storage;

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

  // Function to create a File object from a local image file URI
  async function createFileObjectFromURI(uri) {
    try {
      // Fetch the file using the URI
      const response = await fetch(uri);

      // Get the blob data from the response
      const blob = await response.blob();

      // Extract the filename from the URI
      const filename = uri.substring(uri.lastIndexOf("/") + 1);

      // Create a new File object
      const file = new File([blob], filename, { type: blob.type });

      return file;
    } catch (error) {
      console.error("Error creating File object:", error);
      return null;
    }
  }

  // Function to take a picture and save it with a formatted filename
  async function takePicture() {
    if (cameraRef.current) {
      try {
        // Take and save picture
        const picture = await cameraRef.current.takePictureAsync();

        // Get uri and filename of the picture
        const { uri } = picture;

        // Create a reference to Firebase Storage with the specified path
        const storageRef = ref(
          getStorage(),
          `camera_image/${UUID}/FindPill_${getFormattedTimestamp()}.jpg`
        );

        // Set content type
        const metadata = {
          contentType: "image/jpeg",
        };

        // Create File object from uri
        createFileObjectFromURI(uri)
          .then((file) => {
            if (file) {
              // Upload the File object to Firebase Storage
              uploadBytes(storageRef, file, metadata)
                .then((snapshot) => {
                  // Handle the upload completion here

                  // Get the download URL of the uploaded file
                  return getDownloadURL(storageRef);
                })
                .then((downloadURL) => {
                  console.log("Picture uploaded. URL:", downloadURL);
                })
                .then(() => {
                  // Delete local copy of the image
                  FileSystem.deleteAsync(uri);
                })
                .catch((error) => {
                  console.error(error);
                });
            }
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (error) {
        console.error(error);
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
