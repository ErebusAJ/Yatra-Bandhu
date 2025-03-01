import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

const GetStartedScreen = () => {
  const [fontsLoaded] = useFonts({
    "Montserrat-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-Medium": require("../assets/fonts/Montserrat-Medium.ttf"),
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Background Image */}
      <Image
        source={require("../assets/images/bg5-start.jpg")}
        style={styles.base}
      />

      {/* Overlay */}
      <View style={styles.overlay} />

      {/* Logo */}
      <Image
        source={require("../assets/images/icon_white.png")}
        style={styles.logo}
      />

      {/* Subtitle */}
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>A New Way To Travel</Text>
      </View>

      {/* Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/sign-in")}
        >
          <LinearGradient
            colors={["#fdb44b", "#113f67"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    position: "relative",
  },
  base: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  logo: {
    position: "absolute",
    top: "6%",
    height: 200,
    width: 200,
    zIndex: 2,
    alignItems: "center",
    alignSelf: "center",
    left: "27%",
  },
  subtitleContainer: {
    position: "absolute",
    bottom: "14%",
    alignItems: "center",
    zIndex: 2,
  },
  subtitle: {
    fontSize: 32,
    fontWeight: "400",
    color: "#fff", // White color for better contrast
    marginBottom: 0,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    width: "95%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 25,
    color: "#fff",
    fontWeight: "500",
    textAlign: "center",
  },
});

export default GetStartedScreen;
