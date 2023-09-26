import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./mainmenubutton.styles";
import { icons } from "../../constants";

const MainMenuButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.logoContainer}>
        <Image source={icons.search} style={styles.logoImage} />
      </View>
      <Text style={styles.text}>Test Button</Text>
    </TouchableOpacity>
  );
};

export default MainMenuButton;
