import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Alert } from "react-native";
import * as Location from "expo-location";
import { WebView } from "react-native-webview";
import { Audio } from "expo-av";

const EmergencyScreen = () => {
  const [location, setLocation] = useState(null);
  const [safePlaces, setSafePlaces] = useState([]);
  const webViewRef = useRef(null);
  const alarmSound = useRef(new Audio.Sound());

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location access is needed.");
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();

    (async () => {
      await alarmSound.current.loadAsync(require("./alarm.mp3"));
    })();
  }, []);

  useEffect(() => {
    const fetchSafePlaces = async () => {
      if (!location) return;
      const query = `[out:json]; node(around:5000, ${location.latitude}, ${location.longitude})["amenity"]; out;`;

      try {
        const response = await fetch(`https://overpass-api.de/api/interpreter?data=${query}`);
        const data = await response.json();
        const places = data.elements.map((el) => ({
          id: el.id,
          latitude: el.lat,
          longitude: el.lon,
        }));
        setSafePlaces(places);
      } catch (error) {
        console.error("Error fetching safe places:", error);
      }
    };

    fetchSafePlaces();
  }, [location]);

  const sendAlert = () => {
    Alert.alert("Emergency Alert", "Your contacts have been notified!");
  };

  const playAlarm = async () => {
    await alarmSound.current.replayAsync();
  };

  const getMapHtml = () => {
    if (!location) return "<h2>Loading Map...</h2>";

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
        <style>
          #map { height: 100vh; width: 100vw; }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          var map = L.map('map').setView([${location.latitude}, ${location.longitude}], 14);

          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
          }).addTo(map);

          L.marker([${location.latitude}, ${location.longitude}]).addTo(map)
            .bindPopup("You are here")
            .openPopup();

          ${safePlaces.map(place => `
            L.marker([${place.latitude}, ${place.longitude}], {icon: L.divIcon({
              className: 'custom-icon',
              html: '🔴',
              iconSize: [20, 20]
            })}).addTo(map)
              .bindPopup("Safe Place");
          `).join("")}
        </script>
      </body>
      </html>
    `;
  };

  return (
    <View style={styles.container}>
      <WebView ref={webViewRef} originWhitelist={["*"]} source={{ html: getMapHtml() }} style={styles.map} />

      <TouchableOpacity style={styles.alertButton} onPress={sendAlert}>
        <Text style={styles.buttonText}>🚨 Alert</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.alarmButton} onPress={playAlarm}>
        <Text style={styles.buttonText}>🔊 Alarm</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  alertButton: { position: "absolute", bottom: 30, left: 20, backgroundColor: "#ff4d4d", padding: 15, borderRadius: 50 },
  alarmButton: { position: "absolute", bottom: 30, right: 20, backgroundColor: "#ffcc00", padding: 15, borderRadius: 50 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default EmergencyScreen;
