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
  gradientButton: {
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    padding: SIZES.small,
    borderRadius: SIZES.medium,
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
    margin: SIZES.small,
  },
  buttonText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.large,
    textAlign: "center",
    color: COLORS.lightWhite,
  },
});

export default styles;
