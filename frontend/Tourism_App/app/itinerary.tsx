import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { format, differenceInDays, addDays } from "date-fns";
import { useLocalSearchParams } from "expo-router";
import { router } from "expo-router";
const ItineraryScreen = () => {
  const {
    location = "Jaipur",
    startDate = "2025-03-01",
    endDate = "2025-03-05",
  } = useLocalSearchParams();

  const [description, setDescription] = useState("");
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setDescription(
        `${location} is a beautiful place known for its rich history, vibrant culture, and stunning landmarks.`
      );

      setHotels([
        {
          id: 1,
          name: "Hotel Royal",
          address: "Main Street, Jaipur",
          image:
            "https://pix10.agoda.net/hotelImages/864222/-1/d4352559f78f6590ee58f3a22f3f9335.jpg?ce=0&s=702x392",
        },
        {
          id: 2,
          name: "Luxury Stay",
          address: "City Center, Jaipur",
          image:
            "https://pix10.agoda.net/hotelImages/4990501/-1/48a2893d7015f49fff96953cb7cefd2d.jpg?ca=17&ce=1&s=702x392",
        },
        {
          id: 3,
          name: "Cozy Inn",
          address: "Near Fort, Jaipur",
          image:
            "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/eb/8b/9c/swimming-pool.jpg?w=900&h=500&s=1",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, [location]);

  const renderItinerary = () => {
    if (!startDate || !endDate) return null;
    const daysCount =
      differenceInDays(new Date(endDate), new Date(startDate)) + 1;

    return Array.from({ length: daysCount }).map((_, index) => {
      const currentDate = addDays(new Date(startDate), index);
      return (
        <View key={index} style={styles.dayContainer}>
          <Text style={styles.dayTitle}>
            Day {index + 1} - {format(currentDate, "MMMM d, yyyy")}
          </Text>
          <Text style={styles.dayDescription}>
            Plan your activities for this day...
          </Text>
          <View style={styles.separator} />
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.title}>{location}</Text>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => router.push("/homepage")}
        >
          <Text style={styles.closeButtonText}>✖</Text>
        </TouchableOpacity>

        {loading ? (
          <ActivityIndicator size="large" color="#ffa952" />
        ) : (
          <>
            <Text style={styles.description}>{description}</Text>
            <Text style={styles.sectionTitle}>Places to Stay</Text>

            {hotels.length === 0 ? (
              <Text style={styles.noHotelsText}>No hotels available.</Text>
            ) : (
              <FlatList
                data={hotels}
                horizontal
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.hotelCard}>
                    <Image
                      source={{ uri: item.image }}
                      style={styles.hotelImage}
                    />
                    <View style={styles.hotelInfo}>
                      <Text style={styles.hotelName}>{item.name}</Text>
                      <Text style={styles.hotelAddress}>{item.address}</Text>
                    </View>
                  </TouchableOpacity>
                )}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.flatListContainer}
              />
            )}

            <Text style={styles.sectionTitle}>Your Itinerary</Text>
            {renderItinerary()}
          </>
        )}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ItineraryScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContainer: { flex: 1, padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", textAlign: "center" },
  description: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },
  closeButton: {
    position: "absolute",
    flex: 1,
    alignItems: "flex-end",
    alignSelf: "flex-end",
  },
  closeButtonText: {
    color: "#000",
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20,
  },
  noHotelsText: {
    textAlign: "center",
    color: "#777",
    fontSize: 16,
    marginBottom: 10,
  },
  flatListContainer: { paddingHorizontal: 10, paddingBottom: 10 },
  hotelCard: {
    width: 180,
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    padding: 10,
    marginRight: 10,
    alignItems: "center",
  },
  hotelImage: { width: "100%", height: 120, borderRadius: 8, marginBottom: 5 },
  hotelInfo: { alignItems: "center" },
  hotelName: { fontSize: 16, fontWeight: "bold", textAlign: "center" },
  hotelAddress: { fontSize: 14, color: "#777", textAlign: "center" },
  dayContainer: {
    marginVertical: 15,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#fff9f2",
    borderLeftWidth: 5,
    borderColor: "#ffa952",
  },
  dayTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 5 },
  dayDescription: { fontSize: 16, color: "#555" },
  separator: { height: 1, backgroundColor: "#ddd", marginVertical: 10 },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 15,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#ffa952",
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
