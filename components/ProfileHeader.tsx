import { Colors } from "@/utils/constants";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageSourcePropType,
} from "react-native";

interface ProfileHeaderProps {
  name: string;
  email: string;
  image: string;
}
const ProfileHeader = ({ name, email, image }: ProfileHeaderProps) => {
  return (
    <View style={styles.profileContainer}>
      <View style={styles.profileHeader}>
        <Image
          source={{
            uri: image,
          }}
          style={styles.avatarContainer}
        />
        <View>
          <Text style={styles.profileName}>{name}</Text>
          <Text style={styles.profileEmail}>{email}</Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  profileContainer: {
    width: "100%",
    padding: 16,
    borderRadius: 16,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: Colors.DESTRUCTIVE_BUTTON_TEXT,
  },
  profileName: {
    color: Colors.PRIMARY,
    fontSize: 20,
    fontWeight: "bold",
  },
  profileEmail: {
    fontSize: 16,
  },
});
