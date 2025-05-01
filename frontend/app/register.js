import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";
import Svg, { Path } from "react-native-svg";

const RegisterScreen = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      setLoading(true);
      const response = await axios.post('http://192.168.0.149:5000/api/auth/register', {
        name,
        username,
        email,
        password,
      });

      if (response.status === 201) {
        console.log('Registration successful');
        Alert.alert("Success", "Account created successfully!");
        router.push('/login'); // Redirect to login after registering
      }
    } catch (error) {
      console.error('Registration Error:', error);
      Alert.alert("Registration Failed", "Something went wrong. Try again.");
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

      {/* Register Form at Bottom Left */}
      <View style={styles.bottomLeftContainer}>
        <Text style={styles.title}>Register</Text>

        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          placeholderTextColor="#999"
          value={username}
          onChangeText={setUsername}
        />

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

        {/* Register Button with Login Text on the Left */}
        <View style={styles.buttonContainer}>
          {/* Already Have an Account - Navigate to Login */}
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={styles.loginText}>Already have an account?  </Text>
            <Text style={styles.loginText}>Login</Text>

          </TouchableOpacity>

          {/* Register Button */}
          <TouchableOpacity style={styles.registerButton} onPress={handleRegister} disabled={loading}>
            <Text style={styles.registerButtonText}>{loading ? "Registering..." : "Register"}</Text>
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
    fontWeight: "bold",
    color: "#fff",
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
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Align buttons left and right
    marginTop: 20,
  },
  registerButton: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignItems: "center",
  },
  registerButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#E91E63",
  },
  loginText: {
    fontSize: 16,
    color: "#fff",
    textDecorationLine: "underline",
  },
});

export default RegisterScreen;