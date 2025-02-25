import { router } from "expo-router";
import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Taskbar from "./components/taskbar";

const userName = "Aryan";
const windowWidth = Dimensions.get("window").width;

const topDeals = [
  {
    id: "1",
    title: "Paris Getaway",
    price: "$999",
    image: require("../assets/images/paris.jpg"),
  },
  {
    id: "2",
    title: "Bali Adventure",
    price: "$799",
    image: require("../assets/images/bali.jpg"),
  },
  {
    id: "3",
    title: "Swiss Alps Tour",
    price: "$1,299",
    image: require("../assets/images/swiss.jpeg"),
  },
  {
    id: "4",
    title: "Charming Rome",
    price: "$1,499",
    image: require("../assets/images/rome.jpeg"),
  },
  {
    id: "5",
    title: "Habibi Dubai",
    price: "$1,099",
    image: require("../assets/images/dubai.jpeg"),
  },
  {
    id: "6",
    title: "Classic Spain",
    price: "$1,899",
    image: require("../assets/images/spain.jpg"),
  },
];

const recommendedPlaces = [
  {
    id: "r1",
    title: "Maldives Island Retreat",
    description: "Perfect for a romantic getaway",
    price: "$2,499",
    rating: "4.8",
    duration: "7 days",
    image: require("../assets/images/maldives.jpg"),
  },
  {
    id: "r2",
    title: "Tokyo City Explorer",
    description: "Experience Japanese culture",
    price: "$1,899",
    rating: "4.7",
    duration: "5 days",
    image: require("../assets/images/tokyo.jpeg"),
  },
  {
    id: "r3",
    title: "Greek Islands Cruise",
    description: "Island hopping adventure",
    price: "$2,299",
    rating: "4.9",
    duration: "10 days",
    image: require("../assets/images/greece.jpg"),
  },
];

const HomeScreen = ({ navigation }) => {
  const CARD_WIDTH = windowWidth - 40;

  const renderRecommendedItem = ({ item, index }) => (
    <TouchableOpacity
      style={[
        styles.recommendedCard,
        {
          width: CARD_WIDTH,
          marginLeft: index === 0 ? 20 : 0,
        },
      ]}
    >
      <Image source={item.image} style={styles.recommendedImage} />
      <View style={styles.recommendedContent}>
        <View style={styles.recommendedHeader}>
          <Text style={styles.recommendedTitle}>{item.title}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>★ {item.rating}</Text>
          </View>
        </View>
        <Text style={styles.recommendedDescription}>{item.description}</Text>
        <View style={styles.recommendedFooter}>
          <Text style={styles.recommendedPrice}>{item.price}</Text>
          <Text style={styles.recommendedDuration}>{item.duration}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.greetingContainer}>
        <View style={styles.greetingLeft}>
          <Text style={styles.welcomeText}>Hi, {userName} 👋</Text>
          <Text style={styles.subques}>
            Excited to embark on a new adventure?
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Image
            source={require("../assets/images/rank_profile.png")}
            style={styles.profileIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      <View style={styles.popularcont}>
        <View style={styles.popular}>
          <Text style={styles.sectionTitle}>Popular Destinations</Text>
          <Text style={styles.seeall}>View all</Text>
        </View>

        <FlatList
          horizontal
          data={topDeals}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.popularList}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.dealCard}>
              <Image source={item.image} style={styles.dealImage} />
              <View style={styles.textOverlay}>
                <Text style={styles.dealTitle}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={styles.recommendedSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recommended For You</Text>
          <Text style={styles.seeall}>View all</Text>
        </View>
        <FlatList
          horizontal
          data={recommendedPlaces}
          renderItem={renderRecommendedItem}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH + 20}
          snapToAlignment="start"
          decelerationRate="fast"
          pagingEnabled={true}
        />
      </View>
      <Taskbar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  greetingContainer: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  greetingLeft: {
    flex: 1,
  },
  popular: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 15,
  },
  popularList: {
    paddingLeft: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
  },
  seeall: {
    color: "rgb(0, 118, 203)",
  },
  popularcont: {},
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
  },
  subques: {
    fontSize: 15,
    color: "#000",
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#ffa952",
    marginVertical: 10,
    width: "100%",
    marginTop: -20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  dealCard: {
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    overflow: "hidden",
    marginRight: 15,
    width: 150,
    height: 200,
    alignItems: "center",
    position: "relative",
  },
  dealImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  textOverlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingVertical: 8,
    paddingHorizontal: 5,
    alignItems: "center",
  },
  dealTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#fff",
  },
  recommendedSection: {
    marginTop: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 15,
  },
  recommendedCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginRight: 20,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: "hidden",
  },
  recommendedImage: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  recommendedContent: {
    padding: 15,
  },
  recommendedHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  recommendedTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    flex: 1,
  },
  ratingContainer: {
    backgroundColor: "#fdb44b",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    color: "#fff",
    fontWeight: "600",
  },
  recommendedDescription: {
    color: "#666",
    marginTop: 8,
    fontSize: 14,
  },
  recommendedFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  recommendedPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fdb44b",
  },
  recommendedDuration: {
    color: "#666",
    fontSize: 14,
  },
});

export default HomeScreen;
