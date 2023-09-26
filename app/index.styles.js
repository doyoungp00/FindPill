import { StyleSheet } from "react-native";
import { COLORS, FONT, SHADOWS, SIZES } from "../constants";

const styles = StyleSheet.create({
  headerText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xxLarge,
    textAlign: "center",
    padding: SIZES.medium,
  },
  buttonContainer: {
    justifyContent: "center",
    flexDirection: "row",
    padding: SIZES.medium,
    alignContent: "center",
    alignItems: "center",
  },
});

export default styles;
