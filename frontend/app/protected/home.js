import { 
  View, Text, TextInput, Image, ScrollView, TouchableOpacity, Switch, StyleSheet, Linking, Platform
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, FontAwesome, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Share } from "react-native";
import * as Location from "expo-location";
const requestLocationPermission = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    alert("Location permission is required for safety tracking.");
    return false;
  }
  return true;
};
const enableLocation = async () => {
  const permissionGranted = await requestLocationPermission();
  if (permissionGranted) {
    const location = await Location.getCurrentPositionAsync({});
    console.log("User's location:", location);
    setIsLocationEnabled(true);
  } else {
    setIsLocationEnabled(false);
  }
};
export default function HomeScreen() {
  const router = useRouter();
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);
  const [isButtonConnected, setIsButtonConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showMessages, setShowMessages] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Location permission is required for safety tracking.");
      return false;
    }
    return true;
  };

  // Start location tracking
  const startLocationTracking = async () => {
    const permissionGranted = await requestLocationPermission();
    if (!permissionGranted) {
      setIsLocationEnabled(false);
      return;
    }

    const subscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 5000, // Updates every 5 seconds
        distanceInterval: 10, // Updates if user moves 10 meters
      },
      (location) => {
        console.log("Updated location:", location);
      }
    );

    setLocationSubscription(subscription);
    setIsLocationEnabled(true);
  };

  // Stop location tracking
  const stopLocationTracking = () => {
    if (locationSubscription) {
      locationSubscription.remove();
      setLocationSubscription(null);
    }
    setIsLocationEnabled(false);
  };
  const shareApp = async () => {
    try {
      await Share.share({
        message: "Join me on SAFEMA! Download it now for safety & emergency support: https://safema-app.com/download",
      });
    } catch (error) {
      alert("Error sharing the app: " + error.message);
    }
  };

  const getStartedStyle = {
    backgroundColor: "#fe47ad",
    padding: 15,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center"
  };
  
  const settingBox = {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    width: "48%",
    alignItems: "center"
  };
  
  const buttonStyle = {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    width: "48%",
    alignItems: "center",
    marginVertical: 5
  };
  
  const resources = [
    { title: "Self Defense", image: require("../../assets/images/self-defense.jpg"), url: "https://www.youtube.com/watch?v=KVpxP3ZZtAc&pp=ygUWc2VsZiBkZWZlbnNlIGZvciB3b21lbtIHCQlPCQGHKiGM7w%3D%3D" },
    { title: "12 Tips in Times of Danger", image: require("../../assets/images/tips.jpg"), url: "https://timesofindia.indiatimes.com/blogs/the-next-step/safety-tips-for-women/" },
    { title: "Cyber Protection Help", image: require("../../assets/images/cyber.jpg"), url: "https://cybercrime.gov.in/Webform/Accept.aspx" },
    { title: "How to Be Safe at Night", image: require("../../assets/images/night.jpg"), url: "https://legalhelpnri.com/safety-of-women-in-india-at-night/" },
  ];
  const dummyMessages = [
    { id: 1, text: "Are you safe?", location: "Hyderabad" },
    { id: 2, text: "Need help?", location: "Mumbai" },
    { id: 3, text: "Emergency alert!", location: "Chennai" },
  ];

  const dummyNotifications = [
    { id: 1, text: "New safety tip available", location: "Hyderabad" },
    { id: 2, text: "Stay alert in your area", location: "Mumbai" },
    { id: 3, text: "Women safety event nearby", location: "Chennai" },
  ];

  const handleMessagesClick = () => {
    if (showMessages) {
      setShowMessages(false); // Hide messages if already visible
    } else {
      setMessages(dummyMessages);
      setShowMessages(true); // Show messages when clicked
    }
  };
  
  const handleNotificationsClick = () => {
    if (showNotifications) {
      setShowNotifications(false); // Hide notifications if already visible
    } else {
      setNotifications(dummyNotifications);
      setShowNotifications(true); // Show notifications when clicked
    }
  };

  const openCallHistory = () => Linking.openURL("tel:*#07#"); // Opens call history
  const openMessageHistory = () => Linking.openURL("sms:"); // Opens messaging app
  const openAlertHistory = () => alert("Opening Alert History..."); // Replace with actual alert history
  const handleBluetoothToggle = (value) => {
    setIsButtonConnected(value);
    if (value) {
      if (Platform.OS === "android") {
        Linking.openSettings(); // Opens settings (Bluetooth settings may vary)
      } else if (Platform.OS === "ios") {
        Linking.openURL("App-Prefs:Bluetooth"); // Opens Bluetooth settings on iOS
      }
    }
  };
  return (
    <LinearGradient colors={["#fff", "#fc73c0"]} style={{ flex: 1, padding: 20 }}>
      
      {/* ScrollView for entire content */}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        
        {/* Header */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>WELCOME</Text>
          <View style={{ flexDirection: "row", gap: 15 }}>
             <TouchableOpacity onPress={handleMessagesClick}>
            <Feather name="message-circle" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNotificationsClick}>
            <Ionicons name="notifications-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("./profile")}>
            <FontAwesome name="user-circle" size={24} color="black" />
          </TouchableOpacity>
          </View>
        </View>
{/* Messages Section */}
{showMessages && messages.length > 0 && (
  <View style={{ marginTop: 10, backgroundColor: "#fff", padding: 10, borderRadius: 10 }}>
    <Text style={{ fontSize: 16, fontWeight: "bold" }}>Messages</Text>
    {messages.map((msg) => (
      <Text key={msg.id}>📍 {msg.location}: {msg.text}</Text>
    ))}
  </View>
)}

{/* Notifications Section */}
{showNotifications && notifications.length > 0 && (
  <View style={{ marginTop: 10, backgroundColor: "#fff", padding: 10, borderRadius: 10 }}>
    <Text style={{ fontSize: 16, fontWeight: "bold" }}>Notifications</Text>
    {notifications.map((notif) => (
      <Text key={notif.id}>🔔 {notif.location}: {notif.text}</Text>
    ))}
  </View>
)}

        {/* Search Bar */}
        <View style={{ flexDirection: "row", backgroundColor: "#fff", padding: 10, borderRadius: 50, marginBottom: 10 }}>
          <Ionicons name="search" size={20} color="gray" />
          <TextInput placeholder="Search for resources, news, etc" style={{ flex: 0, marginLeft: 10 }} />
        </View>

        {/* Get Started Section */}
        <TouchableOpacity style={getStartedStyle} onPress={() => router.push("/protected/setup")}>
        <Image source={require("../../assets/images/women-icon.png")} style={{ width: 80, height: 80, marginRight: 10 }} />
        <View>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>   Get Started with SAFEMA!</Text>
            <Text>    Click here for instructions</Text>
          </View>
        </TouchableOpacity>

        {/* Location & Button Setup */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
          {/* Location Tracking */}
          <View style={settingBox}>
            <Text style={{ fontWeight: "bold" }}>Set location to always</Text>
            <Text style={{ fontSize: 12, color: "gray" }}>Activate location tracking for safety</Text>
            <Switch
    value={isLocationEnabled}
    onValueChange={(value) => {
      if (value) {
        enableLocation();
      } else {
        setIsLocationEnabled(false);
      }
    }}
  />
          </View>

          {/* Connect to Button */}
          <View style={settingBox}>
            <Text style={{ fontWeight: "bold", color: "black" }}>Connect to Button</Text>
            <Text style={{ fontSize: 12, color: "gray" }}>Connect to wearable bluetooth button.</Text>

            <Switch value={isButtonConnected} onValueChange={handleBluetoothToggle} />          </View>
        </View>

        {/* History Section */}
        <View style={styles.container}>
          {/* Call History */}
          <TouchableOpacity style={styles.historyButton} onPress={openCallHistory}>
            <View style={styles.iconContainer}>
              <Image source={require("../../assets/images/call-icon.png")} style={styles.icon} />
            </View>
            <Text style={styles.text}>Call History</Text>
          </TouchableOpacity>

          {/* Message History */}
          <TouchableOpacity style={styles.historyButton} onPress={openMessageHistory}>
            <View style={styles.iconContainer}>
              <Image source={require("../../assets/images/message-icon.png")} style={styles.icon} />
            </View>
            <Text style={styles.text}>Message History</Text>
          </TouchableOpacity>

          {/* Alert History */}
          <TouchableOpacity style={styles.historyButton} onPress={openAlertHistory}>
            <View style={styles.iconContainer}>
              <Image source={require("../../assets/images/alert-icon.png")} style={styles.icon} />
            </View>
            <Text style={styles.text}>Alert History</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Access */}
        <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 20 }}>Quick Access</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginTop: 10 }}>
          
        <TouchableOpacity style={buttonStyle} onPress={shareApp}>
            <Text>Add Close Friends/Family</Text>
          </TouchableOpacity>
                    <TouchableOpacity style={buttonStyle}  onPress={() => router.push("/protected/emergency")}><Text>Look for Safe Spots</Text></TouchableOpacity>
                    <TouchableOpacity style={buttonStyle} onPress={() => router.push("/protected/alerts")}>
                    <Text>Latest Alerts</Text></TouchableOpacity>
          <TouchableOpacity style={buttonStyle} onPress={() => Linking.openURL("content://contacts/contacts")}>
  <Text>Emergency Contacts</Text>
</TouchableOpacity>
        </View>

       {/* Useful Resources (Scrollable) */}
       <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 20 }}>Useful Resources</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
          {resources.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              onPress={() => Linking.openURL(item.url)}  // ✅ Directly call Linking.openURL
              style={{ marginRight: 10, position: "relative" }}
            >
              <Image source={item.image} style={{ width: 150, height: 150, borderRadius: 10 }} />
              <Text style={styles.overlayText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 20,
  },
  historyButton: {
    alignItems: "center",
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  icon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  text: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  overlayText: {
    position: "absolute",
    top: 10,
    left: 10,
    right: 10,
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 5,
    borderRadius: 5,
    textAlign: "center",
  },
});
