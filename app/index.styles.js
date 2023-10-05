import { StyleSheet } from "react-native";
import { COLORS, FONT, SHADOWS, SIZES } from "../constants";

const styles = StyleSheet.create({
  mainMenuContainer: (colorScheme) => ({
    flex: 1,
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    backgroundColor: colorScheme === "dark" ? COLORS.gray2 : COLORS.lightWhite,
  }),
  logoContainer: {
    width: "25%",
    aspectRatio: 0.95,
    alignItems: "center",
    marginTop: "20%",
  },
  titleImage: {
    alignContent: "center",
    width: "100%",
    height: "100%",
  },
  headerText: {
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
