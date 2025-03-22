import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { useState } from "react";

export default function AlertsScreen() {
  // Dummy alerts data
  const allAlerts = [
    { id: 1, user: "Aisha", location: "Hyderabad", time: "10:30 AM", message: "Feeling unsafe near XYZ street." },
    { id: 2, user: "Priya", location: "Mumbai", time: "12:45 PM", message: "A suspicious person is following me." },
    { id: 3, user: "Riya", location: "Bangalore", time: "2:15 PM", message: "Streetlight off, area too dark!" },
    { id: 4, user: "Rahul", location: "Chennai", time: "3:40 PM", message: "Crowd gathering, possible danger ahead." },
    { id: 5, user: "Sneha", location: "Hyderabad", time: "5:20 PM", message: "Stranger behaving aggressively near metro station." },
    { id: 6, user: "Amit", location: "Mumbai", time: "6:30 PM", message: "Suspicious vehicle parked near school area." },
    { id: 7, user: "Neha", location: "Chennai", time: "8:10 PM", message: "Someone is following me, feeling unsafe!" },
    { id: 8, user: "Vikram", location: "Hyderabad", time: "9:00 PM", message: "Group of unknown people creating nuisance." },
  ];

  const [alerts, setAlerts] = useState(allAlerts);
  const [alertMessage, setAlertMessage] = useState(""); // Store user input
  const [selectedLocation, setSelectedLocation] = useState("All"); // Filter state

  // Function to send alert with custom message
  const sendAlert = () => {
    if (!alertMessage.trim()) return; // Don't send empty messages

    const newAlert = {
      id: alerts.length + 1,
      user: "You",
      location: "Your Location",
      time: new Date().toLocaleTimeString(),
      message: alertMessage,
    };

    setAlerts([newAlert, ...alerts]); // Add new alert at the top
    setAlertMessage(""); // Clear input after sending
  };

  // Function to filter alerts based on location
  const filteredAlerts = selectedLocation === "All"
    ? alerts
    : alerts.filter(alert => alert.location === selectedLocation);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>📢 Safety Alerts</Text>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        {["All", "Hyderabad", "Mumbai", "Chennai"].map((city) => (
          <TouchableOpacity
            key={city}
            style={[styles.filterButton, selectedLocation === city && styles.activeFilter]}
            onPress={() => setSelectedLocation(city)}
          >
            <Text style={[styles.filterText, selectedLocation === city && styles.activeFilterText]}>
              {city}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Alerts List */}
      <ScrollView style={styles.alertList}>
        {filteredAlerts.length > 0 ? (
          filteredAlerts.map((alert) => (
            <View key={alert.id} style={styles.alertBox}>
              <Text style={styles.user}>{alert.user} - {alert.location}</Text>
              <Text style={styles.time}>{alert.time}</Text>
              <Text style={styles.message}>{alert.message}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noAlerts}>🚫 No alerts found for {selectedLocation}</Text>
        )}
      </ScrollView>

      {/* Text Input for Custom Alert */}
      <TextInput
        style={styles.input}
        placeholder="Type your alert message..."
        value={alertMessage}
        onChangeText={setAlertMessage}
      />

      {/* Send Alert Button */}
      <TouchableOpacity style={styles.alertButton} onPress={sendAlert}>
        <Text style={styles.alertButtonText}>🚨 Send Alert</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  heading: { fontSize: 24, fontWeight: "bold", marginBottom: 10, textAlign: "center", color: "#333" },
  
  filterContainer: { flexDirection: "row", justifyContent: "space-around", marginBottom: 10 },
  filterButton: { paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20, borderWidth: 1, borderColor: "#ff0090" },
  activeFilter: { backgroundColor: "#ff0090" },
  filterText: { fontSize: 14, color: "#ff0090", fontWeight: "bold" },
  activeFilterText: { color: "#fff" },

  alertList: { marginBottom: 15 },
  alertBox: { backgroundColor: "#ffebf0", padding: 15, borderRadius: 10, marginBottom: 10 },
  user: { fontWeight: "bold", fontSize: 16, color: "#333" },
  time: { fontSize: 12, color: "gray", marginBottom: 5 },
  message: { fontSize: 14, color: "#555" },
  noAlerts: { textAlign: "center", fontSize: 16, color: "gray", marginTop: 20 },

  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 10, padding: 12, fontSize: 16, marginBottom: 10 },
  alertButton: { backgroundColor: "#ff0090", padding: 15, borderRadius: 10, alignItems: "center", marginTop: 10 },
  alertButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});
