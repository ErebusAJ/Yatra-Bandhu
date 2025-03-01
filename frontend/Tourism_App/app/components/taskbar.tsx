import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import { usePathname, useRouter } from "expo-router";

const { width } = Dimensions.get("window");

const Taskbar = () => {
  const router = useRouter();
  const pathname = usePathname(); // Get the current route

  const tabs = [
    { name: "home", icon: "home", route: "/homepage" },
    { name: "Connect", icon: "user-plus", route: "/connectMenu" },
    { name: "AI Planner", icon: "route", route: "/planner" },
    { name: "Social", icon: "icons", route: "/socials" },
    { name: "chat", icon: "comments", route: "/chat" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.taskbar}>
        {tabs.map((tab, index) => {
          const isActive = pathname === tab.route; // Check if the current route matches the tab's route

          return (
            <TouchableOpacity
              key={index}
              style={[styles.taskbarItem, isActive && styles.floatingItem]}
              onPress={() => router.push(tab.route)}
            >
              <View
                style={[styles.iconContainer, isActive && styles.floatingIcon]}
              >
                <Icon
                  name={tab.icon}
                  size={20}
                  color={isActive ? "#fff" : "#a7bcb9"}
                />
              </View>
              <Text style={[styles.taskbarText, isActive && styles.activeText]}>
                {tab.name.charAt(0).toUpperCase() + tab.name.slice(1)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignItems: "center",
  },
  taskbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "rgb(5, 10, 59)",
    width: "100%",
    paddingVertical: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    height: 70,
  },
  taskbarItem: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  floatingItem: {
    position: "relative",
    top: -15,
  },
  floatingIcon: {
    backgroundColor: "#ffa952",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  taskbarText: {
    color: "#a7bcb9",
    fontSize: 12,
    marginTop: 5,
  },
  activeText: {
    color: "#ffa952",
  },
});

export default Taskbar;
