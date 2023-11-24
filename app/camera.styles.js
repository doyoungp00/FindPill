import { StyleSheet } from "react-native";
import { COLORS, FONT, SHADOWS, SIZES } from "../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center", // Center horizontally
  },
  camera: {
    width: "100%",
    aspectRatio: "1/1",
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
    alignContent: "center",
    alignItems: "center",
    marginBottom: SIZES.large,
  },
});

export default styles;
