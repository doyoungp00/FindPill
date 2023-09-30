import { View, Text, TouchableOpacity } from "react-native";
import styles from "./textbutton.styles";

const GenericButton = ({ text, color, onPress }) => {
  return (
    <TouchableOpacity style={styles.container(color)} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default GenericButton;
