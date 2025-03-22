import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function SetupScreen() {
  const router = useRouter();

  return (
    <ScrollView style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>Set Up Your Device</Text>
      
      {/* Step 1: Enable Location */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Step 1: Enable Location</Text>
        <Text>Go to your phone settings and allow location access for SAFEMA.</Text>
      </View>

      {/* Step 2: Connect Bluetooth Button */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Step 2: Connect Bluetooth Button</Text>
        <Text>Ensure Bluetooth is on and pair your SOS button from Bluetooth settings.</Text>
      </View>
      {/* Step 3: Test the Button */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Step 3: Allow app permissions</Text>
        <Text>Give access to safema app to access  to contacts, phone, SMS, Bluetooth Button.</Text>
      </View>

      {/* Step 4: Test the Button */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Step 4: Test the Button</Text>
        <Text>Press once to send location, twice to call emergency contacts,three times for emergency calls to Police and She-Teams, and long press for siren.</Text>
      </View>

      {/* Instructions Image After Step 4 */}
      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <Image
          source={require("../../assets/images/instructions.png")}
          style={{ width: "100%", height: 250, resizeMode: "contain" }}
        />
      </View>


      {/* Back Button */}
      <TouchableOpacity
        onPress={() => router.back()}
        style={{ backgroundColor: "#ff0090", padding: 15, borderRadius: 10, alignItems: "center" }}
      >
        <Text style={{ color: "white", fontSize: 16 }}>Back to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
