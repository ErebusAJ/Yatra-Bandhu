import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Taskbar from "./components/taskbar";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import axios from "axios";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    // Sample data - replace with actual API call
    {
      id: "1",
      type: "groupInvite",
      sender: {
        id: "user123",
        name: "Jessie",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGs1Q_VAfNSuIECx_R2za8uPIClzncMiDN4Q&s",
      },
      tripInfo: {
        title: "LADAKH",
        dates: "March 25, 2025 - March 30, 2025",
      },
      timestamp: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
      read: false,
    },
    {
      id: "2",
      type: "groupAccepted",
      sender: {
        id: "user456",
        name: "Andrew",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww",
      },
      tripInfo: {
        title: "ARGENTINA",
        groupId: "group789",
        dates: "April 05, 2025 - April 12, 2025",
      },
      timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      read: true,
    },
    {
      id: "3",
      type: "newMember",
      sender: {
        id: "user789",
        name: "Kelly",
        image:
          "https://preview.redd.it/39sunkhvpw341.jpg?width=1080&crop=smart&auto=webp&s=a242c79f04cdd51b412da50c51b9378f95a549fe",
      },
      tripInfo: {
        title: "SWITZERLAND",
        groupId: "group101",
        dates: "May 25, 2025 - June 07, 2025",
      },
      timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      read: false,
    },
  ]);

  // In a real app, you would fetch notifications from your API
  useEffect(() => {
    // Sample API call to fetch notifications
    // const fetchNotifications = async () => {
    //   try {
    //     const response = await axios.get('/notifications', {
    //       headers: { Authorization: `Bearer ${yourAuthToken}` }
    //     });
    //     setNotifications(response.data);
    //   } catch (error) {
    //     console.error('Failed to fetch notifications:', error);
    //   }
    // };
    // fetchNotifications();
  }, []);

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInSeconds = Math.floor((now - notificationTime) / 1000);

    if (diffInSeconds < 60) {
      return "just now";
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days > 1 ? "s" : ""} ago`;
    }
  };

  const handleNotificationPress = (notification) => {
    // Mark notification as read
    setNotifications(
      notifications.map((n) =>
        n.id === notification.id ? { ...n, read: true } : n
      )
    );

    // Navigate based on notification type
    if (notification.type === "groupInvite") {
      // Show accept/decline options or navigate to trip details
      // For now, just navigate to Connect screen
      router.push("/connectMenu");
    } else if (
      notification.type === "groupAccepted" ||
      notification.type === "newMember"
    ) {
      // Navigate to the chat group
      router.push({
        pathname: "/chatGroup",
        params: { groupId: notification.tripInfo.groupId },
      });
    }
  };

  const handleAccept = async (notification) => {
    try {
      // Call API to accept invitation
      // const response = await axios.post(
      //   `/travel-group/${notification.tripInfo.groupId}/member/${userID}`,
      //   {},
      //   { headers: { Authorization: `Bearer ${yourAuthToken}` } }
      // );

      // Mark notification as read and update status
      setNotifications(
        notifications.map((n) =>
          n.id === notification.id
            ? { ...n, read: true, status: "accepted" }
            : n
        )
      );

      // Navigate to chat group
      router.push({
        pathname: "/chatGroup",
        params: { groupId: notification.tripInfo.groupId || "newGroup" },
      });
    } catch (error) {
      console.error("Error accepting invitation:", error);
    }
  };

  const handleDecline = async (notification) => {
    try {
      // In a real app, you might want to call an API to decline the invitation
      // For now, just remove the notification
      setNotifications(notifications.filter((n) => n.id !== notification.id));
    } catch (error) {
      console.error("Error declining invitation:", error);
    }
  };

  const renderNotificationItem = ({ item }) => {
    const isUnread = !item.read;

    return (
      <TouchableOpacity
        style={[styles.notificationItem, isUnread && styles.unreadNotification]}
        onPress={() => handleNotificationPress(item)}
      >
        <Image
          source={{ uri: item.sender.image }}
          style={styles.profileImage}
        />
        <View style={styles.notificationContent}>
          <View style={styles.notificationHeader}>
            <Text style={styles.notificationTitle}>
              {item.sender.name}{" "}
              {item.type === "groupInvite"
                ? "invited you to join"
                : item.type === "groupAccepted"
                ? "accepted your request"
                : "joined your group"}
            </Text>
            <Text style={styles.timeAgo}>{formatTimeAgo(item.timestamp)}</Text>
          </View>

          <Text style={styles.tripTitle}>{item.tripInfo.title}</Text>
          <Text style={styles.tripDates}>{item.tripInfo.dates}</Text>

          {item.type === "groupInvite" && !item.status && (
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={[styles.actionButton, styles.acceptButton]}
                onPress={() => handleAccept(item)}
              >
                <Text style={styles.acceptButtonText}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.declineButton]}
                onPress={() => handleDecline(item)}
              >
                <Text style={styles.declineButtonText}>Decline</Text>
              </TouchableOpacity>
            </View>
          )}

          {item.status === "accepted" && (
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Accepted</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Text style={styles.heading}>🔔 Notifications</Text>
        <Text style={styles.subheading}>
          Stay updated with your travel connections
        </Text>
      </View>

      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          renderItem={renderNotificationItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="notifications-off-outline" size={64} color="#ccc" />
          <Text style={styles.emptyText}>No notifications yet</Text>
          <Text style={styles.emptySubText}>
            When you connect with travelers, your notifications will appear here
          </Text>
        </View>
      )}

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
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 100, // Space for Taskbar
  },
  notificationItem: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "white",
    marginBottom: 8,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  unreadNotification: {
    backgroundColor: "#f0f8ff", // Light blue background for unread notifications
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  notificationTitle: {
    fontWeight: "600",
    fontSize: 16,
    flex: 1,
  },
  timeAgo: {
    color: "#888",
    fontSize: 12,
  },
  tripTitle: {
    fontWeight: "bold",
    color: "#007AFF",
    marginVertical: 4,
  },
  tripDates: {
    color: "#666",
    fontSize: 13,
    marginBottom: 8,
  },
  actionButtons: {
    flexDirection: "row",
    marginTop: 8,
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
    minWidth: 100,
    alignItems: "center",
  },
  acceptButton: {
    backgroundColor: "#007AFF",
  },
  declineButton: {
    backgroundColor: "#f8f8f8",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  acceptButtonText: {
    color: "white",
    fontWeight: "600",
  },
  declineButtonText: {
    color: "#666",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "#E0F7FA",
    borderRadius: 12,
    alignSelf: "flex-start",
    marginTop: 4,
  },
  statusText: {
    color: "#00838F",
    fontSize: 12,
    fontWeight: "500",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 100,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 16,
    color: "#666",
  },
  emptySubText: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    marginTop: 8,
    paddingHorizontal: 40,
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
});

export default Notifications;
