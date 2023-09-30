import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./iconbutton.styles";
import { icons } from "../../constants";

const IconButton = ({ width, icon, color, onPress }) => {
  return (
    <TouchableOpacity style={styles.container(width, color)} onPress={onPress}>
      <Image source={icon ? icon : icons.search} style={styles.iconImage} />
    </TouchableOpacity>
  );
};

export default IconButton;
