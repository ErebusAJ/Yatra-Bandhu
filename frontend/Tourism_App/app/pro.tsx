import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const plans = {
  free: {
    title: "Travel Buddy MINI",
    price: "Free",
    description: "50k+ Satisfied Users",
    details: [
      "For the GenZ & GenA Traveller",
      "Filter & Find Your Ideal Travel Partner",
      "Effortlessly filter and discover your perfect travel companion among a diverse array of adventurers",
      "AI Buddy - Unlock the boundless potential of your travels with our AI Buddy, effortlessly generating limitless itineraries tailored to your preferences and desires.",
      "INR 500 Discount on Group & Customized Trips",
      "Check Your Profile Visitors",
    ],
  },
  monthly: {
    title: "Travel Buddy PRO",
    price: "₹180/month",
    description: "Best for frequent travelers",
    details: [
      "Zero Convenience Fees On Flights",
      "Flat 25% Off On Global Calling Cards",
      "Chat Unlimited with fellow travelers",
      "Exclusive Perks & Discounts",
      "Effortless Travel with Visa & Check-In Support",
      "Welcome on Arrival in Local Tradition",
    ],
  },
  yearly: {
    title: "Travel Buddy SUPER",
    price: "₹600/year",
    description: "Save more with yearly plan",
    details: [
      "All Monthly Benefits",
      "Additional VIP Lounge Access",
      "Personalized Trip Recommendations",
      "Priority Customer Support",
    ],
  },
};

export default function SubscriptionScreen() {
  const [selectedPlan, setSelectedPlan] = useState("free");
  const fadeAnim = new Animated.Value(1);

  const switchPlan = (plan) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setSelectedPlan(plan);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <LinearGradient colors={["#FFF3B0", "#FFD700"]} style={styles.container}>
      <Text style={styles.heading}>YATRABANDHU MEMBERSHIP CLUB</Text>

      {/* Tab Switcher */}
      <View style={styles.toggleContainer}>
        {Object.keys(plans).map((plan) => (
          <TouchableOpacity
            key={plan}
            style={[
              styles.toggleButton,
              selectedPlan === plan && styles.selectedButton,
            ]}
            onPress={() => switchPlan(plan)}
          >
            <Text
              style={[
                styles.toggleText,
                selectedPlan === plan && styles.selectedText,
              ]}
            >
              {plan.charAt(0).toUpperCase() + plan.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Subscription Card */}
      <Animated.View style={[styles.planCard, { opacity: fadeAnim }]}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.planTitle}>{plans[selectedPlan].title}</Text>
          <Text style={styles.planPrice}>{plans[selectedPlan].price}</Text>
          <Text style={styles.planDescription}>
            {plans[selectedPlan].description}
          </Text>
          <TouchableOpacity style={styles.buyButton}>
            <Text style={styles.buyText}>BUY NOW</Text>
          </TouchableOpacity>
          {plans[selectedPlan].details.map((detail, index) => (
            <Text key={index} style={styles.planDetail}>{`• ${detail}`}</Text>
          ))}
        </ScrollView>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 15,
    textAlign: "center",
  },
  toggleContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 25,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  toggleButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  selectedButton: {
    backgroundColor: "#FFD700",
  },
  toggleText: {
    fontSize: 14,
    color: "#888",
  },
  selectedText: {
    color: "#000",
    fontWeight: "bold",
  },
  planCard: {
    width: "100%",
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
});
