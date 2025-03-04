import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage"; // ✅ Import AsyncStorage

const API_BASE_URL = "https://yatra-bandhu-aj.onrender.com/v1"; // ✅ Replace with actual API URL

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Function to handle login
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password!");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
        }),
      });

      const responseText = await response.text();
      console.log("Raw Response:", responseText);

      let data;
      try {
        data = JSON.parse(responseText);
        console.log("Parsed JSON Response:", data);
      } catch (jsonError) {
        console.error("JSON Parse Error:", jsonError);
        Alert.alert("Error", "Unexpected response from the server.");
        return;
      }

      if (response.ok) {
        const userName = data.user?.username || "User";
        const token = data.token; // 🔥 Extract token

        if (token) {
          await AsyncStorage.setItem("token", data.token);
          console.log("Token saved:", data.token); // ✅ Debugging: Check if token is stored
        }

        await AsyncStorage.setItem("userName", userName); // ✅ Store username
        Alert.alert("Success", `Welcome, ${userName}!`);
        router.push("/homepage");
      } else {
        Alert.alert("Error", data.message || "Invalid credentials!");
      }
    } catch (error) {
      console.error("Network Error:", error);
      Alert.alert("Error", "Network error. Please try again later.");
    }
  };

  return (
    <LinearGradient colors={["#113f67", "#79c2d0", "#fff"]} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/images/icon_white.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <BlurView intensity={100} style={styles.blurContainer}>
          <View style={styles.formContainer}>
            <Text style={styles.loginTitle}>Welcome Back, Traveler!</Text>

            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              placeholderTextColor="#fff"
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="#fff"
              secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <LinearGradient
                colors={["#113f67", "#79c2d0"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Login</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/register")}>
              <Text style={styles.registerLink}>
                Don't have an account? Register
              </Text>
            </TouchableOpacity>
          </View>
        </BlurView>

        <Image
          source={require("../assets/images/login-loon.png")}
          style={styles.loon}
          resizeMode="contain"
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    position: "absolute",
    top: "7%",
    left: "50%",
    transform: [{ translateX: -100 }],
    alignItems: "center",
    zIndex: 3,
  },
  logo: {
    width: 200,
    height: 200,
  },
  blurContainer: {
    position: "absolute",
    top: "35%",
    left: "10%",
    right: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    width: "100%",
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 15,
    alignItems: "center",
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 30,
  },
  input: {
    height: 50,
    width: "100%",
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    color: "#fff",
    fontSize: 18,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "500",
    textAlign: "center",
  },
  registerLink: {
    fontSize: 16,
    color: "#fff",
    marginTop: 10,
    textDecorationLine: "underline",
  },
  loon: {
    top: "75%",
    alignSelf: "center",
    alignItems: "center",
    height: 200,
    marginRight: 90,
  },
});

export default SignIn;
