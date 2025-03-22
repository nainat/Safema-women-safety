import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";

const ProfileScreen = () => {
  const router = useRouter();
  const [name, setName] = useState("Naina Thippani");
  const [email, setEmail] = useState("naina.thippani@gmail.com");
  const [phone, setPhone] = useState("+91 8519838150");
  const [profileImage, setProfileImage] = useState(null);

  // Handle Image Selection
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleEditProfile = () => {
    Alert.alert("Edit Profile", "This feature will be available soon!");
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Yes", onPress: () => router.push("/login") },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Profile Picture */}
      <TouchableOpacity onPress={pickImage}>
        <Image source={profileImage ? { uri: profileImage } : require("../../assets/images/women-icon.png")} style={styles.profileImage} />
      </TouchableOpacity>
      <Text style={styles.changePhotoText}>Change Profile Picture</Text>

      {/* User Details */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />

        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={email} editable={false} />

        <Text style={styles.label}>Phone</Text>
        <TextInput style={styles.input} value={phone} onChangeText={setPhone} />
      </View>

      {/* Buttons */}
      <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", padding: 20, backgroundColor: "#fff" },
  profileImage: { width: 120, height: 120, borderRadius: 60, marginTop: 30, borderWidth: 2, borderColor: "#ff0090" },
  changePhotoText: { color: "#ff0090", marginTop: 10, fontSize: 14 },
  infoContainer: { width: "100%", marginTop: 20 },
  label: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  input: { borderWidth: 1, borderColor: "#ddd", padding: 10, borderRadius: 8, marginBottom: 15 },
  editButton: { backgroundColor: "#ff0090", padding: 15, borderRadius: 10, width: "100%", alignItems: "center", marginTop: 10 },
  logoutButton: { backgroundColor: "#333", padding: 15, borderRadius: 10, width: "100%", alignItems: "center", marginTop: 10 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default ProfileScreen;
