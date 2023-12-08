import { StyleSheet } from "react-native";
import { COLORS, FONT, SHADOWS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
    padding: SIZES.small,
  },
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
