import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  Animated,
} from "react-native";
import { useRouter } from "expo-router"; // Import useRouter
import LocationStep from "./multistep_Planner/location";
import DateStep from "./multistep_Planner/date";
import TripPlanningScreen from "./multistep_Planner/kindOfTrip";
import InterestSelection from "./multistep_Planner/interest";
import { Image } from "expo-image";
const loadingMessages = [
  "Working on it...",
  "Almost there...",
  "Finalizing your itinerary...",
];

const MultiStepForm = () => {
  const router = useRouter(); // Get router instance
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const spinAnim = useRef(new Animated.Value(0)).current;

  const [formData, setFormData] = useState({
    location: "",
    date: "",
    kind_of_trip: "",
    travelingWithPet: "",
    interests: [],
  });

  useEffect(() => {
    if (loading) {
      const messageInterval = setInterval(() => {
        setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
      }, 1500);

      Animated.loop(
        Animated.timing(spinAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        })
      ).start();

      return () => clearInterval(messageInterval);
    }
  }, [loading]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    setLoading(true);

    setTimeout(() => {
      console.log("Final Data Sent to ML Model:", formData);
      setLoading(false);
      router.push({ pathname: "/itinerary", params: formData }); // Navigate to itinerary page with data
    }, 3000);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <LocationStep
            onLocationChange={(loc) => handleInputChange("location", loc)}
          />
        );
      case 2:
        return (
          <DateStep
            onDateChange={(start, end) =>
              handleInputChange("date", `${start} to ${end}`)
            }
          />
        );
      case 3:
        return (
          <TripPlanningScreen
            onTripSelect={(data) =>
              setFormData((prev) => ({ ...prev, ...data }))
            }
          />
        );
      case 4:
        return (
          <InterestSelection
            onInterestChange={(interests) =>
              handleInputChange("interests", interests)
            }
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loaderContainer}>
          {/* GIF Loader */}
          <Image
            source={require("../assets/images/loading2.gif")} // Replace with the actual path to your GIF
            style={styles.loaderGif}
          />

          {/* Loading Message */}
          <Text style={styles.loaderMessage}>
            {loadingMessages[messageIndex]}
          </Text>

          {/* Travel Quote */}
          <Text style={styles.loaderQuote}>
            “Once a year, go someplace you’ve never been before” ✈️
          </Text>
        </View>
      ) : (
        <>
          {renderStepContent()}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.button} onPress={handleNext}>
              <Text style={styles.buttonText}>
                {step < 4 ? "Next" : "Submit"}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default MultiStepForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  loaderContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  circularLoader: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 6,
    borderColor: "#ffa952",
    borderTopColor: "transparent",
    marginBottom: 20,
  },
  loaderGif: {
    width: 300, // Adjust size as needed
    height: 300, // Adjust size as needed
    marginBottom: 20,
  },
  loaderMessage: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffa952",
    marginBottom: 10,
  },
  loaderQuote: {
    fontSize: 16,
    color: "#333",
    fontStyle: "italic",
    textAlign: "center",
    width: "80%",
  },
  footer: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#ffa952",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: 200,
    bottom: 35,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
