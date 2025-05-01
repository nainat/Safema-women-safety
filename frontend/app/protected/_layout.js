// import { Tabs } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";

// export default function ProtectedLayout() {
//   return (
//     <Tabs screenOptions={{ headerShown: false }}>
//       <Tabs.Screen name="home" options={{ tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} /> }} />
//       <Tabs.Screen name="news" options={{ tabBarIcon: ({ color }) => <Ionicons name="newspaper" size={24} color={color} /> }} />
//       <Tabs.Screen name="emergency" options={{ tabBarIcon: ({ color }) => <Ionicons name="alert-circle" size={24} color={color} /> }} />
//       <Tabs.Screen name="community" options={{ tabBarIcon: ({ color }) => <Ionicons name="people" size={24} color={color} /> }} />
//       <Tabs.Screen name="settings" options={{ tabBarIcon: ({ color }) => <Ionicons name="settings" size={24} color={color} /> }} />
//     </Tabs>
//   );
// }

import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function ProtectedLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen 
        name="home" 
        options={{ tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} /> }} 
      />
      <Tabs.Screen 
        name="news" 
        options={{ tabBarIcon: ({ color }) => <Ionicons name="newspaper" size={24} color={color} /> }} 
      />
      <Tabs.Screen 
        name="emergency" 
        options={{ tabBarIcon: ({ color }) => <Ionicons name="alert-circle" size={24} color={color} /> }} 
      />
      <Tabs.Screen 
        name="community" 
        options={{ tabBarIcon: ({ color }) => <Ionicons name="people" size={24} color={color} /> }} 
      />
      {/* <Tabs.Screen 
        name="setups" 
        options={{ tabBarIcon: ({ color }) => <Ionicons name="git-network-outline" size={24} color={color} /> }} 
      /> */}
      <Tabs.Screen 
        name="settings" 
        options={{ tabBarIcon: ({ color }) => <Ionicons name="settings" size={24} color={color} /> }} 
      />
      {/* Hide Profile */}
      <Tabs.Screen name="profile" options={{ href: null }} />
      {/* Hide Profile */}
      <Tabs.Screen name="setup" options={{ href: null }} />
      {/* Hide Profile */}
      <Tabs.Screen name="alerts" options={{ href: null }} />
    </Tabs>
  );
}
