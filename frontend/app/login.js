import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";
import Svg, { Path } from "react-native-svg";

const LoginScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post('http://192.168.229.32:5000/api/auth/login', {
        email,
        password,
      });

      if (response.status === 200) {
        console.log('Login successful');
        router.push('/protected/home');
      }
    } catch (error) {
      console.error('Login Error:', error);
      Alert.alert("Login Failed", "Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Background Waves */}
      <Svg style={styles.svg} viewBox="0 0 375 812" preserveAspectRatio="xMidYMid slice">
        <Path fill="#F8BFCF" d="M0 0h375v812H0z" />
        <Path fill="#7B1E3E" d="M0 200c60 50 150 50 220 0s160-50 220 0v612H0z" />
        <Path fill="#E91E63" d="M0 300c80 50 200 50 300 0s160-50 220 0v512H0z" />
      </Svg>

      {/* Login Form at Bottom Left */}
      <View style={styles.bottomLeftContainer}>
        <Text style={styles.title}>Login</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {/* Register & Login Button Row */}
        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={() => router.push('/register')}>
            <Text style={styles.registerText}>New Here? Register</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('./')}>
            <Text style={styles.registerText}>Get Started</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
            <Text style={styles.loginButtonText}>{loading ? "Logging in..." : "Login"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8BFCF",
    position: "relative",
  },
  svg: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  bottomLeftContainer: {
    position: "absolute",
    bottom: 50,
    left: 20,
    width: "80%",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: "#000",
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  registerText: {
    fontSize: 14,
    color: "#fff",
    textDecorationLine: "underline",
  },
  loginButton: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignItems: "center",
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#E91E63",
  },
});

export default LoginScreen;