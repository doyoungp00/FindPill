import { COLORS, FONT, SHADOWS, SIZES } from "../../../constants";
import { StyleSheet } from "react-native";

const styles = {
  errorText: {
    color: COLORS.secondary,
    textAlign: "center",
    fontSize: SIZES.large,
  },
  container: {
    width: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.medium,
    marginVertical: SIZES.small / 2,
  },
  thumbnail: {
    width: "100%",
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
    marginBottom: SIZES.medium,
    color: COLORS.white,
  },
};

export default styles;
