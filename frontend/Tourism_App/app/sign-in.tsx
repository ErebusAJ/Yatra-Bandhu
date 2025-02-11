import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ResizeMode } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Login button clicked!");
  };

  const handleGoogleLogin = () => {
    console.log("Google Sign-In clicked!");
  };

  const handleRegisterLink = () => {
    console.log("Navigate to Register screen");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image
        source={require("../assets/images/orangebg.jpg")}
        style={styles.bgImage}
        resizeMode={ResizeMode.COVER}
      />

      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/images/icon.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <BlurView intensity={100} style={styles.blurContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.loginTitle}>Login</Text>

          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={(text) => setUsername(text)}
            placeholderTextColor="#fff"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholderTextColor="#fff"
            secureTextEntry
          />

          <Text style={styles.orText}>Or sign in with</Text>

          <TouchableOpacity
            style={styles.googleButton}
            onPress={handleGoogleLogin}
          >
            <Image
              source={require("../assets/images/google_icon.png")}
              style={styles.googleIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <LinearGradient
              colors={["#fdb44b", "#fdb44b"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Login</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleRegisterLink}>
            <Text style={styles.registerLink}>
              Don't have an account? Register
            </Text>
          </TouchableOpacity>
        </View>
      </BlurView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
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
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 15,
    alignItems: "center",
  },
  loginTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
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
  orText: {
    fontSize: 18,
    color: "#fff",
    marginVertical: 10,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginBottom: 15,
    width: "50%",
    justifyContent: "center",
  },
  googleIcon: {
    width: 25,
    height: 25,
    borderRadius: 100,
  },
  googleText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
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
    fontWeight: "400",
    textAlign: "center",
  },
  registerLink: {
    fontSize: 16,
    color: "#fff",
    marginTop: 10,
    textDecorationLine: "underline",
  },
});

export default SignIn;
