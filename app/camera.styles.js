import { StyleSheet } from "react-native";
import { COLORS, FONT, SHADOWS, SIZES } from "../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center", // Center horizontally
  },
  camera: {
    width: "100%",
    aspectRatio: "3/4",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  text: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xxLarge,
    color: COLORS.indigo,
    textAlign: "center",
    paddingBottom: SIZES.large,
    marginBottom: SIZES.large,
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
    padding: SIZES.medium,
    alignContent: "center",
    alignItems: "center",
  },
});

export default styles;
