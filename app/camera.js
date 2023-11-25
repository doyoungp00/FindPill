// Import standard React components
import { useState, useRef, useEffect } from "react";
import { View, Text, Modal, ActivityIndicator } from "react-native";
import * as FileSystem from "expo-file-system";
import { Camera, CameraType, ImageType } from "expo-camera";
import { Stack, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import uuid from "react-native-uuid";
import { decode } from "base-64";

if (typeof global.atob === "undefined") {
  global.atob = (a) => Buffer.from(a, "base64").toString("binary");
}

// Import custom styles and components
import styles from "./camera.styles";
import { TextButton } from "../components";
import { IconButton } from "../components";
import { COLORS, icons } from "../constants";

// Import Firebase storage components
import { app, storage } from "../firebaseConfig";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { getDatabase, ref as rtdbRef, set } from "firebase/database";

export default function Page() {
  const router = useRouter();

  // Set up camera
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef(null);
  // Picture uploading state
  const [isUploading, setIsUploading] = useState(false);

  // UUID setup
  const [UUID, setUUID] = useState(uuid.v4());

  // Image urls
  const [downloadURLs, setDownloadURLs] = useState([]);

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
    if (cameraRef.current && !isUploading) {
      try {
        // Block user interaction
        setIsUploading(true);

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
                  // Get the download URL of the uploaded file
                  return getDownloadURL(storageRef);
                })
                .then((downloadURL) => {
                  console.log("Picture uploaded. URL:", downloadURL);

                  // Update the downloadURLs state, add new url to array
                  setDownloadURLs((prevURLs) => [...prevURLs, downloadURL]);
                })
                .then(() => {
                  // Delete local copy of the image
                  FileSystem.deleteAsync(uri);

                  // Unblock user input
                  setIsUploading(false);
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

  // Function to upload image URLs to Realtime Database
  async function submitPictures() {
    // Update the Realtime Database node with the download URLs
    set(rtdbRef(getDatabase(), `requests/${UUID}`), {
      images: downloadURLs,
    });

    console.log("Pictures submitted to Realtime Database");

    // Clear downloadURLs array after submitting
    setDownloadURLs([]);

    // Open new page with UUID
    router.push(`/analysis-results/${UUID}`);
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
        ratio="1:1"
        zoom={0.35}
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

      {/* Spacing between camera view and buttons */}
      <View style={{ flex: 1 }} />

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

      <View style={styles.buttonContainer}>
        <TextButton
          accessibilityLabel="사진 제출"
          onPress={submitPictures}
          text="사진 제출"
          color={COLORS.emphasis}
        />
      </View>

      {/* Loading overlay */}
      <Modal transparent={true} animationType="slide" visible={isUploading}>
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color={COLORS.emphasis} />
          <Text style={styles.uploadText}>업로드 중입니다...</Text>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
