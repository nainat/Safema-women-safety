// import { View, Text } from 'react-native';

// export default function EmergencyScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Emergency Screen</Text>
//     </View>
//   );
// }


import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { MapView } from "expo-maps";
import * as Location from "expo-location";
import * as Linking from "expo-linking";
import { Ionicons } from "@expo/vector-icons";

const EmergencyScreen = () => {
    const [location, setLocation] = useState(null);

    useEffect(() => {
        getLocation();
    }, []);

    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("Permission Denied", "Allow location access to use this feature.");
            return;
        }

        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation({
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
        });
    };

    const sendEmergencySMS = () => {
        if (!location) {
            Alert.alert("Location Error", "Location not available. Try again.");
            return;
        }
        const message = `🚨 Emergency Alert! I need help. My location: https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
        const smsLink = `sms:?&body=${encodeURIComponent(message)}`;
        Linking.openURL(smsLink).catch(() => Alert.alert("Failed", "Could not send SMS."));
    };

    const notifyNearbyUsers = () => {
        Alert.alert("Distress Signal", "Nearby users have been notified!");
    };

    const safePlaces = [
        { id: 1, name: "Police Station", latitude: 28.6139, longitude: 77.2090 },
        { id: 2, name: "Hospital", latitude: 28.6100, longitude: 77.2000 },
    ];

    return (
        <View style={styles.container}>
            {location ? (
                <MapView style={styles.map} defaultCamera={{ center: location, zoom: 15 }}>
                    {/* User Location Marker */}
                    <View style={{ position: "absolute", left: location.latitude, top: location.longitude }}>
                        <Ionicons name="location" size={30} color="red" />
                    </View>

                    {/* Safe Places */}
                    {safePlaces.map((place) => (
                        <View key={place.id} style={{ position: "absolute", left: place.latitude, top: place.longitude }}>
                            <Ionicons name="shield" size={24} color="pink" />
                        </View>
                    ))}
                </MapView>
            ) : (
                <Text style={styles.loadingText}>Fetching location...</Text>
            )}

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.emergencyButton} onPress={sendEmergencySMS}>
                    <Ionicons name="call" size={24} color="white" />
                    <Text style={styles.buttonText}>Emergency SMS</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.distressButton} onPress={notifyNearbyUsers}>
                    <Ionicons name="alert" size={24} color="white" />
                    <Text style={styles.buttonText}>Distress Signal</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    map: { flex: 1 },
    loadingText: { textAlign: "center", marginTop: 20, fontSize: 16, color: "gray" },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        position: "absolute",
        bottom: 20,
        width: "100%",
        paddingHorizontal: 20,
    },
    emergencyButton: {
        backgroundColor: "#ff2e79",
        padding: 15,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 10,
    },
    distressButton: {
        backgroundColor: "#ff5733",
        padding: 15,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 10,
    },
    buttonText: { color: "white", fontSize: 14, marginLeft: 8 },
});

export default EmergencyScreen;
