import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

const EditProfileView = () => {
  const profile = {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "", // New field
    aadhar: "", // New field
    avatar: "https://example.com/jane-doe-avatar.png",
  };

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [aadhar, setAadhar] = useState(profile.aadhar);
  const [avatar, setAvatar] = useState(profile.avatar);

  const handleSubmit = () => {
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

    // Submit data
    console.log({ name, email, phone, aadhar, avatar });
  };

  return (
    <LinearGradient
      colors={["#fff", "rgba(250, 177, 114, 0.71)"]}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={{
              uri: "https://www.bootdey.com/img/Content/avatar/avatar3.png",
            }}
          />
          <TouchableOpacity
            style={styles.changeAvatarButton}
            onPress={() => {
              /* open image picker */
            }}
          >
            <Text style={styles.changeAvatarButtonText}>Change Avatar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Name"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Email"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Phone Number"
            keyboardType="numeric"
            maxLength={10}
            value={phone}
            onChangeText={setPhone}
          />

          <Text style={styles.label}>Aadhar Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Aadhar Number"
            keyboardType="numeric"
            maxLength={12}
            value={aadhar}
            onChangeText={setAadhar}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/profile")}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    width: "80%",
  },
  label: {
    marginTop: 20,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
    backgroundColor: "#fff",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#ffa952",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    width: "50%",
    justifyContent: "center",
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  avatarContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  changeAvatarButton: {
    marginTop: 10,
  },
  changeAvatarButtonText: {
    color: "#1E90FF",
    fontSize: 18,
  },
});

export default EditProfileView;
