import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import Svg, { Path } from "react-native-svg";

export default function IndexPage() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Background Waves */}
      <Svg style={styles.svg} viewBox="0 0 375 812" preserveAspectRatio="xMidYMid slice">
        <Path fill="#F8BFCF" d="M0 0h375v812H0z" />
        <Path fill="#7B1E3E" d="M0 200c60 50 150 50 220 0s160-50 220 0v612H0z" />
        <Path fill="#E91E63" d="M0 300c80 50 200 50 300 0s160-50 220 0v512H0z" />
      </Svg>

      {/* Logo Container */}
      <View style={styles.logoContainer}>
        <Image source={require("../assets/images/splash-icon.png")} style={styles.logo} />
        <Text style={styles.welcomeText}>Welcome to Safema</Text>
      </View>

      {/* Catchy Tagline */}
      <Text style={styles.tagline}>Empowering Women, Ensuring Safety</Text>
      <Text style={styles.supportText}>Comprehensive Care, Safety & Support – All in One Place</Text>

      {/* Get Started + Login Button */}
      <View style={styles.startContainer}>
        <Text style={styles.getStartedText}>Get started with Safema</Text>
        <TouchableOpacity style={styles.loginButton} onPress={() => router.push("/login")}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>

      {/* Or + Register Now + Register Button */}
      <View style={styles.registerSection}>
        <Text style={styles.orText}>Or</Text>
        <TouchableOpacity style={styles.registerButton} onPress={() => router.push("/register")}>
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center",
    position: "relative",
    backgroundColor: "#F8BFCF", // Light pink fallback
  },
  svg: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  logoContainer: { alignItems: "center", marginBottom: 80, },
  logo: { width: 300, height: 300, resizeMode: "contain" },
  welcomeText: { 
    fontSize: 28, 
    fontWeight: "bold", 
    color: "#fff" ,
    marginTop:10,
  },
  tagline: { 
    fontSize: 22, 
    fontWeight: "700", 
    color: "#fff", 
    textAlign: "center", 
    marginTop: -5, 
    marginBottom: 20, 
  },
  startContainer: { flexDirection: "row", alignItems: "center", marginTop: 30 },
  getStartedText: { fontSize: 20, fontWeight: "600", color: "#fff", marginRight: 15 },
  loginButton: { backgroundColor: "#fff", paddingVertical: 12, paddingHorizontal: 30, borderRadius: 10 },
  loginButtonText: { fontSize: 20, fontWeight: "bold", color: "#ff758c" },
  registerSection: { flexDirection: "row", alignItems: "center", marginTop: 20 },
  orText: { fontSize: 18, fontWeight: "600", color: "#fff", marginRight: 10 },
  registerButton: { 
    backgroundColor: "transparent", 
    borderWidth: 2, 
    borderColor: "#fff", 
    paddingVertical: 12, 
    paddingHorizontal: 30, 
    borderRadius: 10 
  },
  registerButtonText: { fontSize: 20, fontWeight: "bold", color: "#fff" },
  supportText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  
});