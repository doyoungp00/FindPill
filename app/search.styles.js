import { StyleSheet } from "react-native";
import { COLORS, FONT, SHADOWS, SIZES } from "../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center", // Center horizontally
    backgroundColor: COLORS.lightWhite,
  },
  text: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xxLarge,
    color: COLORS.indigo,
    textAlign: "center",
    paddingBottom: SIZES.large,
    marginBottom: SIZES.large,
  },
  input: {
    flexGrow: 1,
    height: 60,
    borderWidth: 1.5,
    borderColor: COLORS.gray,
    borderRadius: SIZES.medium,
    padding: SIZES.medium,
    marginTop: SIZES.small,
    marginLeft: SIZES.small,
    backgroundColor: COLORS.gray2 + "60",
  },
});

export default styles;
