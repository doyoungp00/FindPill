import { StyleSheet } from "react-native";
import { COLORS, FONT, SHADOWS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: (color) => ({
    alignItems: "center",
    width: "80%",
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
  text: {
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    color: COLORS.lightWhite,
    textAlign: "center",
  },
});

export default styles;
