import { StyleSheet } from "react-native";
import { COLORS, FONT, SHADOWS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: (width, color) => ({
    alignItems: "center",
    justifyContent: "center",
    width: width ? width : "50%",
    padding: SIZES.small,
    backgroundColor: color ? color : COLORS.primary,
    borderRadius: SIZES.medium,
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
    aspectRatio: 1,
    margin: SIZES.small,
  }),
  iconImage: {
    width: "100%",
    height: "100%",
  },
});

export default styles;
