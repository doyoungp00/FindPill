import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./mainmenubutton.styles";
import { icons } from "../../constants";

const MainMenuButton = ({ text, color, icon }) => {
  return (
    <TouchableOpacity style={styles.container(color)}>
      <View style={styles.logoContainer}>
        <Image source={icon ? icon : icons.search} style={styles.logoImage} />
      </View>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default MainMenuButton;
