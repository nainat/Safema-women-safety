import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";

const LoginScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    try {
      const response = await axios.post("http://192.168.X.X:5000/api/auth/login", {
        email,
        password,
      });

      Alert.alert("Success", "Login successful!");
      console.log("User Data:", response.data);

      // ✅ Corrected navigation
      router.replace("/");

    } catch (error) {
      Alert.alert("Error", error.response?.data?.error || "Login failed.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topWave} />
      <View style={styles.middleWave} />

      <View style={styles.content}>
        <Text style={styles.title}>Login</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#fff"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#fff"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* ✅ Added onPress for forgot password */}
        <TouchableOpacity onPress={() => Alert.alert("Reset Password", "Feature coming soon!")}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/screens/RegisterScreen")}>
          <Text style={styles.registerText}>New Here? Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff2e79",
    justifyContent: "center",
    alignItems: "center",
  },
  topWave: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "40%",
    backgroundColor: "#fbc7d4",
    borderBottomLeftRadius: 200,
    borderBottomRightRadius: 200,
  },
  middleWave: {
    position: "absolute",
    top: "20%",
    width: "100%",
    height: "30%",
    backgroundColor: "#8a1f3c",
    borderBottomLeftRadius: 200,
    borderBottomRightRadius: 200,
  },
  content: {
    width: "80%",
    marginTop: 100,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "#fff",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 15,
    color: "#fff",
  },
  forgotPassword: {
    color: "#fff",
    textAlign: "right",
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  loginText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  registerText: {
    color: "#fff",
    textAlign: "center",
    marginTop: 15,
  },
});

export default LoginScreen;
