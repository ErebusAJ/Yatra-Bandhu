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
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { router } from "expo-router";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!fullName || !email || !age || !phone || !password) {
      alert("Please fill in all fields!");
      return;
    }

    // ✅ Prepare request body with proper formatting
    const requestBody = {
      name: fullName.trim(),
      email: email.trim(),
      age: Number(age), // Convert age to a number
      phone_no: phone.trim(),
      password: password.trim(),
    };

    console.log("🔹 Sending Request Body:", JSON.stringify(requestBody));

    try {
      const response = await fetch(
        "https://yatra-bandhu-aj.onrender.com/v1/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      const responseText = await response.text();
      console.log("🔹 Raw Response:", responseText);

      let data;
      try {
        data = JSON.parse(responseText);
        console.log("🔹 Parsed JSON Response:", data);
      } catch (error) {
        console.error("🔴 JSON Parse Error:", error);
        data = { message: "Invalid JSON response from server" };
      }

      if (response.ok) {
        alert("✅ Registration successful!");
        router.push("/sign-in");
      } else {
        alert(`⚠️ Registration failed: ${data.message || "Please try again."}`);
      }
    } catch (error) {
      console.error("🔴 Network Error:", error);
      alert("⚠️ Something went wrong. Please try again later.");
    }
  };

  return (
    <LinearGradient
      colors={["#113f67", "#113f67", "#fdb44b"]}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/images/icon_white.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <BlurView intensity={100} style={styles.blurContainer}>
          <View style={styles.formContainer}>
            <Text style={styles.registerTitle}>Join the Journey🛫</Text>

            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={fullName}
              onChangeText={setFullName}
              placeholderTextColor="#fff"
            />

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
              placeholder="Age"
              value={age}
              onChangeText={setAge}
              placeholderTextColor="#fff"
              keyboardType="numeric"
            />

            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={phone}
              onChangeText={setPhone}
              placeholderTextColor="#fff"
              keyboardType="phone-pad"
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="#fff"
              secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <LinearGradient
                colors={["#113f67", "#fdb44b"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Register</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </BlurView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  logoContainer: {
    position: "absolute",
    top: "7%",
    left: "50%",
    transform: [{ translateX: -100 }],
    alignItems: "center",
    zIndex: 3,
  },
  logo: { width: 200, height: 200 },
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
  registerTitle: {
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
});

export default Register;
