import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import NewsScreen from '../screens/NewsScreen';
import EmergencyScreen from '../screens/EmergencyScreen';
import CommunityScreen from '../screens/CommunityScreen';
import SettingScreen from '../screens/SettingScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} /> }}
      />
      <Tab.Screen
        name="News"
        component={NewsScreen}
        options={{ tabBarIcon: ({ color, size }) => <Ionicons name="newspaper" size={size} color={color} /> }}
      />
      <Tab.Screen
        name="Emergency"
        component={EmergencyScreen}
        options={{ tabBarIcon: ({ color, size }) => <Ionicons name="warning" size={size} color={color} /> }}
      />
      <Tab.Screen
        name="Community"
        component={CommunityScreen}
        options={{ tabBarIcon: ({ color, size }) => <Ionicons name="people" size={size} color={color} /> }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingScreen}
        options={{ tabBarIcon: ({ color, size }) => <Ionicons name="settings" size={size} color={color} /> }}
      />
    </Tab.Navigator>
  );
}
