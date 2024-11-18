import React, { useEffect, useState } from "react";
import { ActivityIndicator, Button, StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { firebase_auth } from "../firebaseConfig";
import WeatherWidget from "../components/WeatherWidget";
import { useLatestNews } from "../screens/NewsScreen";
import { useNavigation } from '@react-navigation/native';

export default function DashboardScreen() {
  const navigation = useNavigation(); // Hook to access navigation
  const { articles, loading } = useLatestNews();

  const firstArticle = articles[0];

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!firstArticle) {
    return (
      <View style={styles.widget}>
        <Text>No news available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.flexContainer}>
        <Text style={styles.header}>Hello,</Text>
        <Button onPress={() => firebase_auth.signOut()} title="Sign Out" />
      </View>

      <Text style={styles.subheading}>Today's Weather</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Weather')}
      >
        <WeatherWidget />
      </TouchableOpacity>
      
      <Text style={styles.subheading}>Today's News</Text>
      {/* <NewsWidget article={article} /> */}
      <TouchableOpacity
        style={styles.widget}
        onPress={() => navigation.navigate('News')}
      >
        {firstArticle.image_url ? (
          <Image source={{ uri: firstArticle.image_url }} style={styles.image} />
        ) : null}
        <Text style={styles.articleTitle} numberOfLines={2} ellipsizeMode="tail">
          {firstArticle.title}
        </Text>
      </TouchableOpacity>

      <View style={styles.flexContainer}>
        <Text style={styles.subheading}>Itinerary</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Itinerary')}
        >
          <Text style={styles.seeMoreLink}>See more</Text>
        </TouchableOpacity>
        
      </View>

      <View style={styles.itineraryContainer}>
        <Text style={styles.itineraryHeader}>Trip to Osaka</Text>
        <Text style={styles.itineraryText}>May 10 to May 15</Text>
      </View>

      <View style={styles.addTripContainer}>
        <Text style={styles.addTripText}>+ Add a new trip</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    // justifyContent: "center",
    // alignItems: "center",
    justifyContent: 'top',
    padding: 20,
    paddingTop: 60,
  },
  header: {
    fontSize: 30,
    fontFamily: "Futura-bold",
    color: "#2482E6",
    textAlign: "left",
    margin: 6,
    marginBottom: 20,
  },
  subheading: {
    fontSize: 16,
    fontFamily: "Futura",
    textAlign: "left",
    marginTop: 20,
    marginBottom: 10,
  },
  widget: {
    borderStyle: "solid",
    borderWidth: 1.5,
    borderColor: "#2482E6",
    borderRadius: 12,
  },
  articleTitle: {
    fontSize: 12,
    fontWeight: "bold",
    padding: 6,
  },
  image:{
    height: 100,
    width: "100%",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  buttonContainer: {
    margin: 10,
    justifyContent: "center",
  },
  pressable: {
    backgroundColor: "#2482E6",
    width: 150,
    height: 40,
    padding: 8,
    borderRadius: 20,
    marginTop: 30,
    margin: "auto",
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "Futura",
    color: "white",
    textAlign: "center",
  },
  flexContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  seeMoreLink: {
    fontSize: 14,
    fontFamily: "Futura",
    color: "#2482E6",
    marginTop: 12,
  },
  itineraryContainer: {
    borderStyle: "solid",
    borderWidth: 1.5,
    borderColor: "#2482E6",
    borderRadius: 12,
    justifyContent: "center",
    padding: 12,
  },
  itineraryHeader: {
    fontSize: 16,
    fontFamily: "Futura",
    fontWeight: "semibold",
    color: "black",
    textAlign: "left",
    paddingBottom: 6,
  },
  itineraryText: {
    fontSize: 12,
    fontFamily: "Futura",
    textAlign: "left",
  },
  addTripContainer: {
    height: 70,
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: "#cfcfcf",
    borderRadius: 12,
    justifyContent: "center",
    padding: 12,
    marginTop: 12,
  },
  addTripText: {
    fontSize: 14,
    // fontFamily: "Futura",
    color: "#929292",
    textAlign: "center",
    padding: 2,
  }
});