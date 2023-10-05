import { StyleSheet } from "react-native";
import { COLORS, FONT, SHADOWS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: (color) => ({
    alignItems: "center",
    width: "45%",
    maxWidth: 200,
    aspectRatio: 1,
    padding: SIZES.medium,
    backgroundColor: color ? color : COLORS.primary,
    borderRadius: SIZES.medium,
    justifyContent: "space-between",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
    fontFamily: FONT.regular,
    marginLeft: SIZES.medium,
    marginRight: SIZES.medium,
    flexDirection: "column",
  }),
  logoContainer: {
    alignItems: "center",
    width: "70%",
    aspectRatio: 1,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    marginBottom: SIZES.small,
  },
  logoImage: {
    width: "100%",
    height: "100%",
  },
  text: {
    fontFamily: FONT.regular,
    fontSize: SIZES.large,
    color: COLORS.lightWhite,
    textAlign: "center",
  },
});

export default styles;
