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
  errorText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    color: COLORS.indigo,
    textAlign: "center",
    paddingTop: SIZES.large,
    marginBottom: SIZES.large,
  },
  image: {
    width: "100%",
    aspectRatio: 16 / 9,
    resizeMode: "contain",
  },
  listContainer: {
    paddingLeft: SIZES.medium,
  },
  listTitle: {
    paddingTop: SIZES.large,
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
  },
  listDesc: {
    paddingTop: SIZES.small,
    fontSize: SIZES.medium,
  },
});

export default styles;
