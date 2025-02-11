import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/MaterialIcons";
const Profile = ({ navigation }) => {
  const [profileImage, setProfileImage] = useState(
    require("../assets/images/default-avatar.png")
  );
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleNotifications = () => setIsNotificationsEnabled((prev) => !prev);
  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  const handleEditProfile = () => {
    console.log("Edit Profile Clicked!");
    navigation.navigate("EditProfile"); // Navigate to Edit Profile screen
  };

  const handleLogout = () => {
    console.log("Logout Clicked!");
    navigation.navigate("SignIn"); // Navigate to Sign In screen
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage({ uri: result.assets[0].uri });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../assets/images/orange2bg.jpg")}
        style={styles.backgroundImage}
      />

      {/* Profile Image */}
      <View style={styles.profileImageContainer}>
        <TouchableOpacity onPress={pickImage} style={{ position: "relative" }}>
          <Image source={profileImage} style={styles.profileImage} />
          <View style={styles.editIconContainer}>
            <Icon name="edit" size={20} color="#fff" />
          </View>
        </TouchableOpacity>
        <Text style={styles.username}>John Doe</Text>
        <Text style={styles.email}>johndoe@example.com</Text>
        <Text style={styles.phone}>+1 234 567 890</Text>
      </View>

      {/* Buttons & Settings */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
          <LinearGradient
            colors={["#fdb44b", "#fdb44b"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Edit Profile</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Settings Section */}
        <View style={styles.settingsContainer}>
          <View style={styles.settingsRowTransparent}>
            <Text style={styles.settingsText}>Enable Notifications</Text>
            <Switch
              value={isNotificationsEnabled}
              onValueChange={toggleNotifications}
            />
          </View>

          <View style={styles.settingsRowTransparent}>
            <Text style={styles.settingsText}>Dark Mode</Text>
            <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
          </View>

          <TouchableOpacity style={styles.settingsButton}>
            <Text style={styles.settingsText}>Privacy & Security</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingsButton}>
            <Text style={styles.settingsText}>Language</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingsButton}>
            <Text style={styles.settingsText}>Help & Support</Text>
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  backgroundImage: {
    position: "absolute",
    width: "120%",
    height: "120%",
  },
  profileImageContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#ffa952",
  },
  editIconContainer: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "#000",
    borderRadius: 15,
    padding: 5,
  },
  editIcon: {
    position: "absolute",
    bottom: 5,
    right: 5,
    width: 20,
    height: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    color: "#333",
  },
  email: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
  phone: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
  buttonContainer: {
    marginTop: 30,
    width: "80%",
  },
  button: {
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  settingsContainer: {
    width: "100%",
    marginBottom: 20,
  },
  settingsRowTransparent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    width: "100%",
    marginBottom: 10,
  },
  settingsButton: {
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    width: "100%",
    marginBottom: 10,
  },
  settingsText: {
    fontSize: 18,
    color: "#333",
    fontWeight: "bold",
  },
  logoutButton: {
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    backgroundColor: "rgba(181, 16, 16, 0.25)",
    width: "100%",
    borderWidth: 3,
    borderColor: "#be3144",
  },
  logoutText: {
    fontSize: 18,
    color: "#be3144",
    fontWeight: "bold",
  },
});

export default Profile;
