import { StyleSheet } from "react-native";
import { COLORS, FONT, SHADOWS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "40%",
    aspectRatio: 1,
    padding: SIZES.xLarge,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.medium,
    justifyContent: "space-between",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
    fontFamily: FONT.regular,
    marginLeft: SIZES.large,
    marginRight: SIZES.large,
  },
  logoContainer: {
    alignItems: "center",
    width: "80%",
    aspectRatio: 1,
    borderRadius: SIZES.medium,
    justifyContent: "center",
  },
  logoImage: {
    width: "100%",
    height: "100%",
  },
  text: {
    fontFamily: FONT.regular,
    fontSize: SIZES.xxLarge,
    color: COLORS.lightWhite,
  },
});

export default styles;
