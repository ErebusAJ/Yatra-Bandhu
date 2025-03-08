import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const interestsList = [
  "Unmissable Spots",

  "Secret Spots",
  "Foodie Heaven",

  "Spa Retreats",
  "Excursions & Activities",
  "Historic Landmarks",
  "Art Galleries",
  "Shopper’s Paradise",
  "Breathtaking Landscapes",

  "Instagrammable Locations",
  "Nightlife and Entertainment",
  "Adventure and Sports",
];

const InterestSelection = ({ onInterestChange }) => {
  const [selectedInterests, setSelectedInterests] = useState([]);

  const toggleInterest = (interest) => {
    const isSelected = selectedInterests.includes(interest);
    const updatedSelection = isSelected
      ? selectedInterests.filter((item) => item !== interest)
      : [...selectedInterests, interest];

    setSelectedInterests(updatedSelection);
    onInterestChange(updatedSelection);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>What’s your travel vibe?</Text>
      <FlatList
        data={interestsList}
        keyExtractor={(item, index) => `${index}-${item}`} // Use index to maintain order
        numColumns={2}
        columnWrapperStyle={styles.row}
        extraData={selectedInterests} // Ensure re-rendering doesn't affect order
        renderItem={({ item }) => {
          const isSelected = selectedInterests.includes(item);
          return (
            <TouchableOpacity
              style={[
                styles.interestButton,
                isSelected && styles.selectedInterest,
              ]}
              onPress={() => toggleInterest(item)}
            >
              {isSelected && (
                <MaterialIcons
                  name="check"
                  size={16}
                  color="#ffa952"
                  style={styles.icon}
                />
              )}
              <Text
                style={[styles.interestText, isSelected && styles.selectedText]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default InterestSelection;

// 🌟 STYLES 🌟
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  question: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  flatListContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexWrap: "wrap",
    justifyContent: "center",
  },
  interestButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 6,
    borderRadius: 20,
  },
  selectedInterest: {
    backgroundColor: "rgba(255, 229, 201, 0.36)",
    borderWidth: 3,
    borderColor: "#ffa952",
  },
  interestText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  selectedText: {
    color: "#000",
  },
  icon: {
    marginRight: 6,
  },
});
