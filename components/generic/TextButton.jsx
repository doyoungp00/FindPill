import { View, Text, TouchableOpacity } from "react-native";
import styles from "./textbutton.styles";

const TextButton = ({ text, color, onPress, accessibilityLabel }) => {
  return (
    <TouchableOpacity
      style={styles.container(color)}
      onPress={onPress}
      accessibilityLabel={accessibilityLabel}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default TextButton;
