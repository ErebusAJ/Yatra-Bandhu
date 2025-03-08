import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  FlatList,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";

const { width } = Dimensions.get("window");

const ChatScreen = () => {
  const messagesData = [
    {
      id: 1,
      sent: true,
      userName: "You",
      msg: "Heyyy",
      image: "https://www.bootdey.com/img/Content/avatar/avatar1.png",
    },
    {
      id: 2,
      sent: true,
      userName: "You",
      msg: "wassup",
      image: "https://www.bootdey.com/img/Content/avatar/avatar1.png",
    },
    {
      id: 3,
      sent: true,
      userName: "You",
      msg: "All set for Ladakh??",
      image: "https://www.bootdey.com/img/Content/avatar/avatar1.png",
    },
    {
      id: 4,
      sent: false,
      userName: "Rahul",
      msg: "Hii,doing great",
      image: "https://www.bootdey.com/img/Content/avatar/avatar6.png",
    },
    {
      id: 5,
      sent: false,
      userName: "Rahul",
      msg: "Yupp preps are going on",
      image: "https://www.bootdey.com/img/Content/avatar/avatar6.png",
    },
  ];

  const [messages, setMessages] = useState(messagesData);
  const [newMessage, setNewMessage] = useState("");

  const send = () => {
    if (newMessage.trim().length > 0) {
      const messagesList = [
        ...messages,
        {
          id: Date.now(),
          sent: true,
          userName: "Aryan", // Current user name (Replace with actual user)
          msg: newMessage,
          image: "https://www.bootdey.com/img/Content/avatar/avatar1.png",
        },
      ];
      setMessages(messagesList);
      setNewMessage("");
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={item.sent ? styles.rightMsg : styles.eachMsg}>
        {!item.sent && (
          <Image source={{ uri: item.image }} style={styles.userPic} />
        )}
        <View style={item.sent ? styles.rightBlock : styles.msgBlock}>
          <Text style={styles.userName}>{item.userName}</Text>
          <Text style={item.sent ? styles.rightTxt : styles.msgTxt}>
            {item.msg}
          </Text>
        </View>
        {item.sent && (
          <Image source={{ uri: item.image }} style={styles.userPic} />
        )}
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.chatTitle}>Ladakh Trip</Text>
      </View>

      {/* Chat Messages */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboard}
      >
        <FlatList
          style={styles.list}
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
        {/* Input Box */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            placeholderTextColor="#696969"
            onChangeText={setNewMessage}
            value={newMessage}
            onSubmitEditing={send}
            returnKeyType="send"
          />
          <TouchableOpacity onPress={send} style={styles.sendButton}>
            <Ionicons name="send" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

// ✅ Styles
const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
  },
  header: {
    height: 65,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#075e54",
  },
  chatTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderColor: "#ddd",
    borderRadius: 30, // Rounded edges
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3, // For Android shadow
  },
  input: {
    flex: 1,
    height: 45,
    borderRadius: 25,
    paddingHorizontal: 15,
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
    marginRight: 10, // Space before send button
  },
  sendButton: {
    backgroundColor: "#075e54",
    borderRadius: 25,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  eachMsg: {
    flexDirection: "row",
    alignItems: "flex-start",
    margin: 5,
  },
  rightMsg: {
    flexDirection: "row",
    alignItems: "flex-start",
    margin: 5,
    alignSelf: "flex-end",
  },
  userPic: {
    height: 40,
    width: 40,
    margin: 5,
    borderRadius: 20,
  },
  msgBlock: {
    maxWidth: 250,
    borderRadius: 5,
    backgroundColor: "#ffffff",
    padding: 10,
    marginLeft: 5,
  },
  rightBlock: {
    maxWidth: 250,
    borderRadius: 5,
    backgroundColor: "#97c163",
    padding: 10,
    marginRight: 5,
  },
  userName: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 2,
  },
  msgTxt: {
    fontSize: 15,
    color: "#555",
  },
  rightTxt: {
    fontSize: 15,
    color: "#202020",
  },
});

export default ChatScreen;
