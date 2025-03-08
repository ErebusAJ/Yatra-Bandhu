import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import Taskbar from "./components/taskbar";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

const Profile = ({ navigation }) => {
  const [profileImage, setProfileImage] = useState(
    require("../assets/images/default-avatar.png")
  );
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
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
        if (response.ok) {
          setUser({
            name: data.Name || "N/A",
            email: data.Email || "N/A",
          });
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserDetails();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    router.replace("/sign-in");
  };

  const buttons = [
    { text: "Edit Profile", icon: "create-outline", route: "/profile-edit" },
    { text: "Show History", icon: "time-outline", route: "/" },
    { text: "Notifications", icon: "notifications-outline" },
    { text: "Privacy & Security", icon: "lock-closed-outline" },
    { text: "Language", icon: "globe-outline" },
  ];

  return (
    <LinearGradient colors={["#fff", "#79c2d0", "#113f67"]} style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#113f67" />
        ) : user ? (
          <>
            <View style={styles.profileImageContainer}>
              <Image source={profileImage} style={styles.profileImage} />
              <Text style={styles.username}>{user.name}</Text>
              <Text style={styles.email}>{user.email}</Text>
            </View>

            <View style={styles.buttonContainer}>
              {buttons.map((btn, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.button}
                  onPress={() => btn.route && router.push(btn.route)}
                >
                  <View style={styles.buttonContent}>
                    <Text style={styles.buttonText}>{btn.text}</Text>
                    <Text style={styles.divider}>|</Text>
                    <Ionicons name={btn.icon} size={20} color="#fff" />
                  </View>
                </TouchableOpacity>
              ))}
            </View>

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
  buttonContainer: {
    marginTop: 30,
    width: "80%",
    top: 8,
  },
  button: {
    backgroundColor: "#113f67",
    borderRadius: 25,
    marginBottom: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 5,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "400",
    flex: 1,
    textAlign: "left",
  },
  divider: {
    color: "#fff",
    fontSize: 18,
    paddingHorizontal: 10,
  },
  logoutButton: {
    position: "absolute",
    bottom: 80,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    width: "50%",
    backgroundColor: "rgba(181, 16, 16, 0.8)",
    borderWidth: 2,
    borderColor: "#be3144",
  },
  logoutText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Profile;
