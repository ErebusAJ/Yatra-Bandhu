import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { BlurView } from "expo-blur"; // Add this for blur effect

const tripOptions = [
  {
    type: "Solo Trip",
    image: {
      uri: "https://aradhyatours.com/wp-content/uploads/2020/10/Optimized-dhruvi-solo-travel-1.jpg",
    },
  },
  {
    type: "Partner Trip",
    image: {
      uri: "https://www.treebo.com/blog/wp-content/uploads/2018/02/Couples-Featured-Image.jpg",
    },
  },
  {
    type: "Friends Trip",
    image: {
      uri: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJpZW5kcyUyMHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D",
    },
  },
  {
    type: "Family Trip",
    image: {
      uri: "https://cdn2.psychologytoday.com/assets/styles/manual_crop_1_91_1_1528x800/public/field_blog_entry_images/2019-08/familyvacation.jpg?itok=ShVoL6qY",
    },
  },
];

const TripPlanningScreen = ({ onTripSelect }) => {
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [travelingWithPet, setTravelingWithPet] = useState(null);

  const handleTripSelection = (tripType) => {
    setSelectedTrip(tripType);
    onTripSelect({ kind_of_trip: tripType, travelingWithPet });
  };

  const handlePetSelection = (petStatus) => {
    setTravelingWithPet(petStatus);
    onTripSelect({ kind_of_trip: selectedTrip, travelingWithPet: petStatus });
  };

  return (
    <View style={styles.container}>
      {/* Trip Type Selection */}
      <Text style={styles.question}>
        What’s your travel style for this trip?
      </Text>
      <View style={styles.optionsContainer}>
        {tripOptions.map((trip) => (
          <TouchableOpacity
            key={trip.type}
            style={[
              styles.card,
              selectedTrip === trip.type ? styles.selectedCard : null,
            ]}
            onPress={() => handleTripSelection(trip.type)}
          >
            <ImageBackground source={trip.image} style={styles.image}>
              <BlurView intensity={30} style={styles.overlay}>
                <Text
                  style={[
                    styles.optionText,
                    selectedTrip === trip.type ? styles.selectedText : null,
                  ]}
                >
                  {trip.type}
                </Text>
              </BlurView>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </View>

      {/* Pet Travel Selection */}
      <Text style={styles.question}>Are you traveling with a pet?</Text>
      <View style={styles.petContainer}>
        {["Yes", "No"].map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.petButton,
              travelingWithPet === option ? styles.selectedOption : null,
            ]}
            onPress={() => handlePetSelection(option)}
          >
            <Text
              style={[
                styles.optionText,
                travelingWithPet === option ? styles.selectedText : null,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default TripPlanningScreen;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
  },
  card: {
    width: 160,
    height: 140,
    borderRadius: 12,
    overflow: "hidden",
    margin: 10,
    elevation: 4, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  selectedCard: {
    borderColor: "#ffa952",
    borderWidth: 3,
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 10,
    alignItems: "center",
  },
  optionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  selectedText: {
    color: "#ffa952",
  },
  petContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 0,
  },
  petButton: {
    backgroundColor: "#ddd",
    padding: 15,
    margin: 10,
    borderRadius: 10,
    minWidth: 100,
    alignItems: "center",
  },
  selectedOption: {
    backgroundColor: "#fff",
    borderWidth: 3,
    borderColor: "#ffa952",
  },
});
