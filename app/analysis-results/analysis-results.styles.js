import { StyleSheet } from "react-native";
import { COLORS, FONT, SHADOWS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  loadingText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    color: COLORS.indigo,
    textAlign: "center",
    paddingTop: SIZES.large,
    marginBottom: SIZES.large,
  },
});

export default styles;
