import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ProfileStack from "./StackProfile";
import Icon from "react-native-vector-icons/FontAwesome5";

const TravelCard = ({
  image,
  title,
  profileImage,
  name,
  description,
  tripDates,
  groupSize,
  profiles,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  // Function to show alert and close modal
  const handleConnectPress = () => {
    Alert.alert("Request Sent", "Your request has been sent successfully!", [
      { text: "OK", onPress: () => setModalVisible(false) }, // Close modal on OK press
    ]);
  };

  return (
    <>
      {/* Travel Card */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => setModalVisible(true)}
      >
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.overlay} />
        <Text style={styles.title}>{title}</Text>
        <View style={styles.profileContainer}>
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
          <Text style={styles.name}>{name}</Text>
        </View>
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalBackground}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            {/* Close Button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="chevron-down" size={30} color="black" />
            </TouchableOpacity>

            {/* Title */}
            <Text style={styles.modalTitle}>{title}</Text>

            {/* Image */}
            <View style={styles.imageContainer}>
              <Image source={{ uri: image }} style={styles.modalImage} />
              {/* ProfileStack Positioned on Image */}
              <View style={styles.profileStackContainer}>
                <ProfileStack profiles={profiles} />
              </View>
            </View>

            {/* User Info + Group Size */}
            <View style={styles.userInfo}>
              <View>
                <Text style={styles.userName}>Posted by: {name}</Text>
                <Text style={styles.groupSize}>Group Size: {groupSize}</Text>
              </View>
              <Text style={styles.tripDates}>{tripDates}</Text>
            </View>

            {/* Description */}
            <ScrollView style={styles.descriptionContainer}>
              <Text style={styles.modalDescription}>{description}</Text>
            </ScrollView>

            {/* Connect Button */}
            <TouchableOpacity
              style={styles.connectButton}
              onPress={handleConnectPress}
            >
              <View style={styles.connectButtonContent}>
                <Text style={styles.connectButtonText}>Connect</Text>
                <Icon
                  name="user-plus"
                  size={16}
                  color="#fff"
                  style={styles.iconStyle}
                />
              </View>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

// Styles
const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    overflow: "hidden",
    width: "90%",
    height: 190,
    marginVertical: 10,
    alignSelf: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  title: {
    position: "absolute",
    top: "35%",
    alignSelf: "center",
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.82)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  profileContainer: {
    position: "absolute",
    bottom: 10,
    left: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 8,
    borderRadius: 20,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  name: {
    color: "white",
    fontSize: 16,
  },

  /* Modal Styles */
  modalBackground: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    height: "87%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    alignSelf: "center",
    zIndex: 1,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
  },
  modalImage: {
    width: "100%",
    height: 200,
    borderRadius: 15,
  },
  profileStackContainer: {
    position: "absolute",
    bottom: 25,
    left: 10,
  },
  userInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    paddingHorizontal: 10,
    width: "100%",
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  groupSize: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 3,
  },
  tripDates: {
    fontSize: 14,
    color: "#ffa952",
    fontWeight: "bold",
    marginRight: 3,
  },
  descriptionContainer: {
    flex: 1,
    marginBottom: 15,
  },
  modalDescription: {
    fontSize: 16,
    color: "gray",
    textAlign: "justify",
    paddingBottom: 80,
  },
  connectButtonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  connectButton: {
    backgroundColor: "#ffa952",
    padding: 14,
    borderRadius: 10,
    width: "50%",
    alignItems: "center",
    position: "absolute",
    alignSelf: "center",
    bottom: 5,
  },
  connectButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 8, // Added spacing between text and icon
  },
  iconStyle: {
    marginLeft: 5, // Ensures spacing between text and icon
  },
});

export default TravelCard;
