import { COLORS, FONT, SHADOWS, SIZES } from "../../constants";
import { StyleSheet } from "react-native";

const styles = {
  container: {
    width: "100%", // Take the full width
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.medium, // Rounded corners
    marginVertical: SIZES.small / 2,
  },
  thumbnail: {
    width: "100%", // Take the full width
    borderTopLeftRadius: SIZES.medium,
    borderTopRightRadius: SIZES.medium,
    aspectRatio: 16 / 9,
  },
  title: {
    marginHorizontal: SIZES.large,
    marginVertical: SIZES.medium,
    fontSize: SIZES.large,
    fontWeight: "bold",
    color: COLORS.white,
  },
  description: {
    marginHorizontal: SIZES.large,
    marginVertical: SIZES.medium,
    color: COLORS.white,
  },
};

export default styles;
