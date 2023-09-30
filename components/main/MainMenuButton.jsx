import { View, Text, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import styles from "./mainmenubutton.styles";
import { icons } from "../../constants";

// Function for opening new pages
const navigateTo = (route) => {
  const router = useRouter();
  router.push(route);
};

const MainMenuButton = ({ text, color, icon, route }) => {
  return (
    <TouchableOpacity
      style={styles.container(color)}
      onPress={() => navigateTo(route)}
    >
      <View style={styles.logoContainer}>
        <Image source={icon ? icon : icons.search} style={styles.logoImage} />
      </View>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default MainMenuButton;
