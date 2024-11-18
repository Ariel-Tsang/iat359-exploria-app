import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { firebase_auth } from "./src/firebaseConfig";
import SignInScreen from "./src/screens/SignInScreen";
import DashboardScreen from "./src/screens/DashboardScreen";
import WeatherScreen from "./src/screens/WeatherScreen";
import NewsScreen from "./src/screens/NewsScreen";
import ItineraryScreen from "./src/screens/ItineraryScreen";
import JournalScreen from "./src/screens/JournalScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const Stack = createNativeStackNavigator(); //new user or user not logged in
  // const DashboardStack = createNativeStackNavigator();

  // function DashboardLayout() {
  //   return (
  //     <DashboardStack.Navigator>
  //       <DashboardStack.Screen
  //         name="Dashboard"
  //         component={DashboardScreen}
  //       />
  //     </DashboardStack.Navigator>
  //   );
  // }

  function DashboardLayout() {
    return (
      <Tab.Navigator initialRouteName="Dashboard">
        <Tab.Screen name="Weather" component={WeatherScreen} options={{ headerShown: false }} />
        <Tab.Screen name="News" component={NewsScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Itinerary" component={ItineraryScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Journal" component={JournalScreen} options={{ headerShown: false }} />
      </Tab.Navigator>
    );
  }

  useEffect(() => {
    onAuthStateChanged(firebase_auth, (user) => {
      console.log("user", user.email);
      setUser(user);
    });
  }, []);

  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SignIn">
          {user ? (
             <Stack.Screen
               name="DashboardLayout"
               component={DashboardLayout}
               options={{ headerShown: false }}
             />
           ) : (
             <Stack.Screen name="Sign In" component={SignInScreen} options={{ headerShown: false }} />
           )}
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
