import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

const EditProfileView = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [profileImage, setProfileImage] = useState(
    "https://www.bootdey.com/img/Content/avatar/avatar3.png"
  );

  // Fetch existing user details
  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Alert.alert("Error", "User not authenticated!");
        router.replace("/sign-in");
        return;
      }

      try {
        const response = await fetch(
          "https://yatra-bandhu-aj.onrender.com/auth/user",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        if (response.ok) {
          setName(data.Name || "");
          setPhone(data.PhoneNumber || "");
          if (data.ProfileImage) setProfileImage(data.ProfileImage);
        } else {
          console.error("Error fetching user:", data);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  // Change Profile Image
  const handleChangeProfileImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  // Update Profile
  const handleUpdate = async () => {
    if (!/^\d{10}$/.test(phone)) {
      Alert.alert(
        "Invalid Phone",
        "Please enter a valid 10-digit phone number."
      );
      return;
    }

    if (!/^\d{12}$/.test(aadhar)) {
      Alert.alert("Invalid Aadhar", "Aadhar number must be exactly 12 digits.");
      return;
    }

    const token = await AsyncStorage.getItem("token");
    if (!token) {
      Alert.alert("Error", "User not authenticated!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://yatra-bandhu-aj.onrender.com/auth/user",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            old_password: oldPassword,
            new_password: newPassword,
            phone_no: phone,
            profile_image: profileImage,
          }),
        }
      );

      if (response.status === 204) {
        Alert.alert("Success", "Profile updated successfully!");
        router.push("/profile");
      } else {
        const data = await response.json();
        Alert.alert("Update Failed", data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  // Delete Account
  const handleDeleteAccount = async () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete your account? This action is irreversible.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            const token = await AsyncStorage.getItem("token");
            if (!token) {
              Alert.alert("Error", "User not authenticated!");
              return;
            }

            try {
              const response = await fetch(
                "https://yatra-bandhu-aj.onrender.com/auth/user",
                {
                  method: "DELETE",
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                }
              );

              if (response.status === 204) {
                Alert.alert(
                  "Account Deleted",
                  "Your account has been deleted."
                );
                await AsyncStorage.removeItem("token");
                router.replace("/sign-in");
              } else {
                const data = await response.json();
                Alert.alert("Deletion Failed", data.message || "Try again.");
              }
            } catch (error) {
              console.error("Error deleting account:", error);
              Alert.alert("Error", "Failed to delete account.");
            }
          },
        },
      ]
    );
  };

  return (
    <LinearGradient colors={["#113f67", "#79c2d0", "#fff"]} style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <TouchableOpacity onPress={handleChangeProfileImage}>
            <Image style={styles.avatar} source={{ uri: profileImage }} />
          </TouchableOpacity>
          <Text style={styles.changeImageText}>Change Profile Picture</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Name</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} />

          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            maxLength={10}
            value={phone}
            onChangeText={setPhone}
          />

          <Text style={styles.label}>Aadhar Number</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            maxLength={12}
            value={aadhar}
            onChangeText={setAadhar}
          />

          <Text style={styles.label}>Old Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            placeholder="Enter Old Password"
            value={oldPassword}
            onChangeText={setOldPassword}
          />

          <Text style={styles.label}>New Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            placeholder="Enter New Password"
            value={newPassword}
            onChangeText={setNewPassword}
          />

          <TouchableOpacity onPress={handleUpdate} disabled={loading}>
            <LinearGradient
              colors={["#113f67", "#79c2d0"]}
              style={styles.button}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Update Profile</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleDeleteAccount}
            style={styles.deleteButton}
          >
            <Text style={styles.deleteButtonText}>Delete Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  form: { width: "80%" },
  label: { marginTop: 20, fontSize: 16 },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
  },
  button: {
    marginTop: 20,
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 18 },
  deleteButton: {
    marginTop: 20,
    backgroundColor: "rgba(181, 16, 16, 0.8)",
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: "center",
  },
  deleteButtonText: { color: "#fff", fontSize: 16 },
  avatarContainer: { alignItems: "center", marginBottom: 10 },
  avatar: { width: 100, height: 100, borderRadius: 50 },
  changeImageText: { color: "#113f67", marginTop: 5 },
});

export default EditProfileView;
