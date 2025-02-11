import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";

const GetStartedScreen = ({ navigation }) => {
  const videoRef = useRef(null);

  const [fontsLoaded] = useFonts({
    "Montserrat-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-Medium": require("../assets/fonts/Montserrat-Medium.ttf"),
  });

  const handleGetStarted = () => {
    console.log("Get Started button clicked!");
    navigation.navigate("sign-in");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../assets/images/getStarted.png")}
        style={styles.base}
      />
      <Image
        source={require("../assets/images/icon.png")}
        style={styles.logo}
      />
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>A New Way To Travel</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
          <LinearGradient
            colors={["#fdb44b", "#fdb44b"]}
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
  logo: {
    position: "absolute",
    top: 123,
    left: 57,
    height: 330,
    width: 330,
    zIndex: 2,
    alignItems: "center",
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
    color: "#000",
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
    fontSize: 30,
    color: "#000",
    fontWeight: "400",
    textAlign: "center",
  },
});

export default GetStartedScreen;
