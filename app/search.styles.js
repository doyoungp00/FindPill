import { StyleSheet } from "react-native";
import { COLORS, FONT, SHADOWS, SIZES } from "../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center", // Center horizontally
  },
  text: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xxLarge,
    color: COLORS.indigo,
    textAlign: "center",
    paddingBottom: SIZES.large,
    marginBottom: SIZES.large,
  },
});

export default styles;
