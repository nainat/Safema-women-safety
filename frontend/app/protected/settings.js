import React, { useState, useEffect } from "react";
import { View, Text, Switch, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const Settings = () => {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [locationTracking, setLocationTracking] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      const savedDarkMode = await AsyncStorage.getItem("darkMode");
      const savedNotifications = await AsyncStorage.getItem("notifications");
      const savedLocationTracking = await AsyncStorage.getItem("locationTracking");
      if (savedDarkMode !== null) setIsDarkMode(JSON.parse(savedDarkMode));
      if (savedNotifications !== null) setNotifications(JSON.parse(savedNotifications));
      if (savedLocationTracking !== null) setLocationTracking(JSON.parse(savedLocationTracking));
    };
    loadSettings();
  }, []);

  const toggleDarkMode = async (value) => {
    setIsDarkMode(value);
    await AsyncStorage.setItem("darkMode", JSON.stringify(value));
  };

  const toggleNotifications = async (value) => {
    setNotifications(value);
    await AsyncStorage.setItem("notifications", JSON.stringify(value));
  };

  const toggleLocationTracking = async (value) => {
    setLocationTracking(value);
    await AsyncStorage.setItem("locationTracking", JSON.stringify(value));
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      router.replace("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <LinearGradient colors={isDarkMode ? ["#333", "#111"] : ["#ff0090", "#fc73c0"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={[styles.card, isDarkMode && styles.darkCard]}>
          <Text style={[styles.title, isDarkMode && styles.darkText]}>Settings</Text>

          <TouchableOpacity style={styles.optionButton} onPress={() => router.push("./profile")}> 
            <Ionicons name="person" size={24} color={isDarkMode ? "#fff" : "#333"} />
            <Text style={[styles.optionText, isDarkMode && styles.darkText]}>Profile</Text>
          </TouchableOpacity>

          <View style={styles.optionRow}>
            <Ionicons name="moon" size={24} color={isDarkMode ? "#fff" : "#333"} />
            <Text style={[styles.optionText, isDarkMode && styles.darkText]}>Dark Mode</Text>
            <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
          </View>

          <View style={styles.optionRow}>
            <Ionicons name="notifications" size={24} color={isDarkMode ? "#fff" : "#333"} />
            <Text style={[styles.optionText, isDarkMode && styles.darkText]}>Notifications</Text>
            <Switch value={notifications} onValueChange={toggleNotifications} />
          </View>

          <View style={styles.optionRow}>
            <Ionicons name="location" size={24} color={isDarkMode ? "#fff" : "#333"} />
            <Text style={[styles.optionText, isDarkMode && styles.darkText]}>Location Tracking</Text>
            <Switch value={locationTracking} onValueChange={toggleLocationTracking} />
          </View>

          <TouchableOpacity style={styles.optionButton}>
            <Ionicons name="language" size={24} color={isDarkMode ? "#fff" : "#333"} />
            <Text style={[styles.optionText, isDarkMode && styles.darkText]}>Language</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionButton}>
            <Ionicons name="lock-closed" size={24} color={isDarkMode ? "#fff" : "#333"} />
            <Text style={[styles.optionText, isDarkMode && styles.darkText]}>Privacy & Security</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionButton}>
            <Ionicons name="help-circle" size={24} color={isDarkMode ? "#fff" : "#333"} />
            <Text style={[styles.optionText, isDarkMode && styles.darkText]}>Help & Support</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out" size={24} color="#fff" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    width: "85%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  darkCard: {
    backgroundColor: "#222",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  darkText: {
    color: "#fff",
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  optionText: {
    fontSize: 18,
    color: "#333",
    flex: 1,
    marginLeft: 10,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ff4d4d",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
    width: "100%",
    justifyContent: "center",
  },
  logoutText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default Settings;
