import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import TravelCard from "./components/connect-cards";
import { SafeAreaView } from "react-native-safe-area-context";
import Taskbar from "./components/taskbar";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons
import { useNavigation } from "@react-navigation/native"; // Import navigation
import { router } from "expo-router";

const Connect = () => {
  const navigation = useNavigation(); // Initialize navigation

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Text style={styles.heading}>🌍 Connect</Text>
        <Text style={styles.subheading}>
          Meet like-minded travelers and explore together!
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Travel Cards */}
        <TravelCard
          image="https://i0.wp.com/lahimalaya.com/wp-content/uploads/2019/08/Ladakh-trip.jpg?w=960&ssl=1"
          title="LADAKH"
          profileImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGs1Q_VAfNSuIECx_R2za8uPIClzncMiDN4Q&s"
          name="Jessie"
          description="Starting in Leh with visits to Shanti Stupa, Leh Palace, and bustling markets for acclimatization..."
          tripDates="March 25,2025-March 30,2025"
          groupSize="2/6"
          profiles={[
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww",
          ]}
        />

        <TravelCard
          image="https://a.travel-assets.com/findyours-php/viewfinder/images/res70/64000/64898-Argentina.jpg"
          title="ARGENTINA"
          profileImage="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww"
          name="Andrew"
          description="Argentina, the second-largest country in South America, is known for its rich culture, diverse landscapes..."
          tripDates="April 05,2025-April 12,2025"
          groupSize="2/3"
          profiles={[
            "https://img.freepik.com/free-photo/portrait-african-american-guy-wearing-grey-hoodie-smiling_482257-111149.jpg",
          ]}
        />

        <TravelCard
          image="https://tripgala.com/wp-content/uploads/2023/08/mt-fuji-1024x597.jpg"
          title="JAPAN"
          profileImage="https://i.pinimg.com/236x/04/bd/b7/04bdb72cc2ef2d0a2cdda2114339f1b4.jpg"
          name="Joseph"
          description="Japan, an island nation in East Asia, is a fascinating blend of ancient traditions and modern innovation..."
          tripDates="March 06,2025-March 18,2025"
          groupSize="4/5"
          profiles={[
            "https://media.istockphoto.com/id/2148975617/photo/woman-jumping-high-after-successful-job-interview.jpg?s=612x612&w=0&k=20&c=puWecKm9APpx7QYJmjHEySQVZM38wRDEQQvSZaCeL30=",
          ]}
        />

        <TravelCard
          image="https://tripgala.com/wp-content/uploads/2023/08/lake-geneva-1024x597.jpg"
          title="SWITZERLAND"
          profileImage="https://preview.redd.it/39sunkhvpw341.jpg?width=1080&crop=smart&auto=webp&s=a242c79f04cdd51b412da50c51b9378f95a549fe"
          name="Kelly"
          description="Switzerland, nestled in the heart of Europe, is renowned for its breathtaking Alps, picturesque lakes..."
          tripDates="May 25,2025-June 07,2025"
          groupSize="1/4"
          profiles={[
            "https://t3.ftcdn.net/jpg/06/78/09/78/360_F_678097871_G7OpoHQmiZTj4bHB7YW2HoH1syWfCbB9.jpg",
          ]}
        />
      </ScrollView>

      {/* Floating Plus Button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => router.push("/createPlan")}
      >
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>

      {/* Fixed Taskbar at the Bottom */}
      <View style={styles.taskbarContainer}>
        <Taskbar />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    alignItems: "center",
    paddingVertical: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
  },
  subheading: {
    fontSize: 16,
    color: "gray",
    marginBottom: 10,
    textAlign: "center",
  },
  scrollContainer: {
    paddingBottom: 100, // Space for Taskbar + Floating Button
  },
  taskbarContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    elevation: 5,
  },
  floatingButton: {
    position: "absolute",
    bottom: 90, // Adjust above Taskbar
    right: 20,
    backgroundColor: "#007AFF",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5, // For Android shadow
  },
});

export default Connect;
