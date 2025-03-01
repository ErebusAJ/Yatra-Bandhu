import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import Taskbar from "./components/taskbar";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = ({ navigation }) => {
  const [profileImage, setProfileImage] = useState(
    require("../assets/images/default-avatar.png")
  );
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        console.log("Retrieved Token:", token); // ✅ Debug log

        if (!token) {
          console.log("No token found. Redirecting to login...");
          navigation.replace("SignIn");
          return;
        }

        const response = await fetch(
          "https://yatra-bandhu-aj.onrender.com/auth/user",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        console.log("API Response:", data); // ✅ Debugging API response

        if (response.ok) {
          // ✅ Extract only valid fields
          setUser({
            name: data.Name || "N/A",
            email: data.Email || "N/A",
            phone: data.PhoneNumber || "N/A",
            age: data.Age || "N/A",
            accessLevel: data.AccessLevel?.String || "N/A",
            verified: data.VerifiedStatus?.Bool ? "Verified" : "Not Verified",
          });
        } else {
          console.error("Error fetching user:", data.message);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const toggleNotifications = () => setIsNotificationsEnabled((prev) => !prev);
  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  const handleLogout = async () => {
    try {
      console.log("🚪 Logging out...");

      // Clear stored token
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");

      // Navigate to the SignIn screen
      router.replace("/sign-in"); // ✅ Redirect to login screen (Expo Router)

      console.log("✅ Successfully logged out.");
    } catch (error) {
      console.error("❌ Logout Error:", error);
    }
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
    <LinearGradient colors={["#113f67", "#79c2d0", "#fff"]} style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#113f67" />
        ) : user ? (
          <>
            <View style={styles.profileImageContainer}>
              <Image source={profileImage} style={styles.profileImage} />
              <Text style={styles.username}>{user.name}</Text>
              <Text style={styles.email}>{user.email}</Text>
              <Text style={styles.phone}>{user.phone || "N/A"}</Text>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => router.push("/profile-edit")}
              >
                <LinearGradient
                  colors={["#113f67", "#79c2d0"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Edit Profile</Text>
                </LinearGradient>
              </TouchableOpacity>

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
              </View>
            </View>

            {/* Logout Button */}
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={{ color: "#113f67", fontSize: 18 }}>
            Failed to load user data
          </Text>
        )}
      </SafeAreaView>

      {/* Taskbar at the bottom */}
      <Taskbar />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
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
    borderColor: "#113f67",
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    color: "#113f67",
  },
  email: {
    fontSize: 16,
    color: "#113f67",
    marginTop: 5,
  },
  phone: {
    fontSize: 16,
    color: "#113f67",
    marginTop: 5,
  },
  buttonContainer: {
    marginTop: 30,
    width: "80%",
    flexGrow: 1,
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
    fontWeight: "500",
  },
  settingsContainer: {
    width: "100%",
    marginBottom: 20,
  },
  settingsRowTransparent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(0, 9, 106, 0.23)",
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
    backgroundColor: "rgba(0, 9, 106, 0.23)",
    width: "100%",
    marginBottom: 10,
  },
  settingsText: {
    fontSize: 18,
    color: "#333",
    fontWeight: "bold",
  },
  logoutButton: {
    position: "absolute",
    bottom: 80,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(181, 16, 16, 0.8)",
    width: "50%",
    borderWidth: 2,
    borderColor: "#be3144",
    alignSelf: "center",
  },
  logoutText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Profile;
