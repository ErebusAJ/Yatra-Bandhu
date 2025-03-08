import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ProfileStack = ({ profiles }) => {
  return (
    <View style={styles.container}>
      {/* Render overlapping profile images */}
      {profiles.map((profile, index) => (
        <Image
          key={index}
          source={{ uri: profile }}
          style={[styles.profileImage, { left: index * 20 }]}
        />
      ))}

      {/* "Eye" Icon with Text */}
      <View style={[styles.viewingContainer, { left: profiles.length * 20 }]}>
        <Ionicons name="eye" size={20} color="white" />
        <Text style={styles.viewingText}>are currently viewing</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    bottom: "13%",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "white",
    position: "absolute",
  },
  viewingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.54)",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 10,
    position: "absolute",
  },
  viewingText: {
    color: "white",
    marginLeft: 5,
    fontSize: 14,
  },
});

export default ProfileStack;
