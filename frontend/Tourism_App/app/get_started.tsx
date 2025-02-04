import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import { useFonts } from "expo-font";

const GetStarted = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    (async () => {
      if (videoRef.current) {
        await videoRef.current.playAsync();
      }
    })();
  }, []);

  const handleGetStarted = () => {
    console.log("Get Started button clicked!");
    // Add navigation or action here
  };

  return (
    <SafeAreaView style={styles.container}>
      <Video
        ref={videoRef}
        source={require("../assets/videos/getStarted.mp4")}
        style={styles.video}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        isLooping
        isMuted
      />

      <Text style={styles.title}>YatraBandhu</Text>

      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>A New Way To Travel</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
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
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  absolute: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  title: {
    fontSize: 46,
    fontWeight: "bold",
    color: "#fff",
    position: "absolute",
    top: 120,
    fontFamily: "Rubik-Bold",
    zIndex: 2,
  },
  subtitleContainer: {
    position: "absolute",
    bottom: "25%",
    alignItems: "center",
    zIndex: 2,
  },
  subtitle: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 20,
  },
  buttonContainer: {
    position: "absolute",
    bottom: "-180%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  button: {
    backgroundColor: "#0066cc",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: "100%",
  },
  buttonText: {
    fontSize: 25,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default GetStarted;
