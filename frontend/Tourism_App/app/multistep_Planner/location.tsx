import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

const GOOGLE_PLACES_API_KEY = "AIzaSyBjsWF9l6uYggQbjvzA0hdR5pijpPcyXhM";

const popularDestinations = [
  {
    name: "Jaipur",
    country: "India",
    image:
      "https://s7ap1.scene7.com/is/image/incredibleindia/hawa-mahal-jaipur-rajasthan-city-1-hero?qlt=82&ts=1726660605161",
  },
  {
    name: "Cabo San Lucas",
    country: "Mexico",
    image:
      "https://i0.wp.com/fishingbooker-prod-blog-backup.s3.amazonaws.com/blog/media/2021/08/14142753/El-Arco.jpg?resize=1024%2C683&ssl=1",
  },
  {
    name: "Istanbul",
    country: "Turkey",
    image:
      "https://quiltripping.com/wp-content/uploads/2021/03/DSC_0745-2-scaled.jpg",
  },
  {
    name: "Gulmarg",
    country: "India",
    image:
      "https://cliffhangersindia.com/wp-content/uploads/2024/04/firdous-parray-AeKPKlAvK8k-unsplash-scaled.jpg.webp",
  },
  {
    name: "Santorini",
    country: "Greece",
    image:
      "https://al24news.com/wp-content/uploads/2025/02/GettyImages-1336913670.jpg",
  },
  {
    name: "Kyoto",
    country: "Japan",
    image:
      "https://boutiquejapan.com/wp-content/uploads/2019/07/yasaka-pagoda-higashiyama-kyoto-japan.jpg",
  },
  {
    name: "Machu Picchu",
    country: "Peru",
    image:
      "https://i.natgeofe.com/n/819ea774-aa80-435e-af5a-ae56efee7ce3/92491_4x3.jpg",
  },
  {
    name: "Bora Bora",
    country: "French Polynesia",
    image:
      "https://cloudfront-us-east-1.images.arcpublishing.com/tgam/PBQ5QSJ3N5FDDKMN7INV3NYO7Q.jpg",
  },
];

interface LocationStepProps {
  onLocationChange: (location: string) => void;
}

const LocationStep: React.FC<LocationStepProps> = ({ onLocationChange }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [randomDestinations, setRandomDestinations] = useState<
    { name: string; country: string; image: string }[]
  >([]);

  // Shuffle the popular destinations randomly on mount
  useEffect(() => {
    setRandomDestinations(
      popularDestinations.sort(() => 0.5 - Math.random()).slice(0, 4)
    );
  }, []);

  // Fetch places from Google API
  const fetchLocations = async (input: string) => {
    if (!input) {
      setSuggestions([]);
      return;
    }
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&types=(cities)&key=${GOOGLE_PLACES_API_KEY}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.predictions) {
        setSuggestions(data.predictions.map((place: any) => place.description));
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  // Called whenever the user selects a location (either from search or popular card)
  const handleSelectLocation = (locationName: string) => {
    setQuery(locationName);
    onLocationChange(locationName); // <-- Update parent state
    setSuggestions([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Which place is next on your bucket list?</Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Choose a city or town"
          value={query}
          onChangeText={(text) => {
            setQuery(text);
            onLocationChange(text); // update parent as user types
            fetchLocations(text);
          }}
        />
        {suggestions.length > 0 && (
          <FlatList
            data={suggestions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.suggestionItem}
                onPress={() => handleSelectLocation(item)}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>

      {/* Popular Destinations */}
      <Text style={styles.subtitle}>
        Or get started with a popular destination
      </Text>
      <FlatList
        data={randomDestinations}
        numColumns={2}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => handleSelectLocation(item.name)}
          >
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{item.name.toUpperCase()}</Text>
            <Text style={styles.cardSubtitle}>{item.country}</Text>
          </TouchableOpacity>
        )}
      />

      {/* No Next Button here! The parent handles the next button. */}
    </View>
  );
};

export default LocationStep;

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  searchContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  searchInput: { height: 40, borderBottomWidth: 1, paddingLeft: 10 },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    backgroundColor: "#fff",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
    marginBottom: 30,
  },
  card: {
    flex: 1,
    alignItems: "center",
    margin: 5,
    padding: 10,
    backgroundColor: "rgba(252, 244, 237, 0.75)",
    borderRadius: 10,
  },
  cardImage: { width: 100, height: 100, borderRadius: 10 },
  cardTitle: { fontWeight: "bold", marginTop: 5 },
  cardSubtitle: { fontSize: 12, color: "gray" },
});
