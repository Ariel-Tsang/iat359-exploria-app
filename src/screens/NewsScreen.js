import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View, FlatList } from "react-native";
import * as Location from "expo-location"; // Expo location package
import Article from '../components/Article';
import CountryFilter from '../components/CountryFilter';

export function useLatestNews() { 
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [country, setCountry] = useState("us"); // Default to US

  // Fetch user's location and country
  const fetchLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // Reverse geocoding to get country
      const geoResponse = await fetch(
        `https://geocode.xyz/${latitude},${longitude}?geoit=json`
      );
      const geoData = await geoResponse.json();

      if (geoData && geoData.country) {
        setCountry(geoData.prov.toLowerCase()); // Update country based on location
      } else {
        setError("Failed to fetch location-based country");
      }
    } catch (err) {
      setError(err.message || "Failed to fetch location");
    }
  };

  // Fetch news data from News API
  const fetchNews = async () => {
    
    try {
      const response = await fetch(
        // "https://newsapi.org/v2/top-headlines?country=us&apiKey=e3d1ec5d2d474e98acd82fc08c673847");
        `https://newsdata.io/api/1/latest?apikey=pub_58744968840f1fffed6005e953162d4f1667f&country=${country}&category=entertainment,environment,health,lifestyle,tourism`);
        console.log(country);

      const data = await response.json();

      if (response.ok) {
        setArticles(data.results);
      } else {
        setError("Failed to fetch news");
      }
    } catch (err) {
      setError(err.message || "Failed to fetch news");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // fetch user's location only when initializing the app
  useEffect(() => {
    fetchLocation();
  }, []);

  useEffect(() => {
    const init = async () => {
      await fetchNews();
    };
    init();
  }, [country]); // Re-fetch when the country changes

  return { articles, loading, refreshing, setRefreshing, error, country, setCountry, fetchNews };
}

export default function NewsScreen({ navigation, route }) {
  const { articles, loading, refreshing, setRefreshing, error, country, setCountry, fetchNews } = useLatestNews();

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  const handleRefresh = () => {
    setRefreshing(true);
    fetchNews();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>News</Text>
        <CountryFilter style={styles.dropdown} setSelectedValue={setCountry} />
      </View>
      <View style={styles.flatlistContainer}>
        <FlatList
          data={articles}
          renderItem={({item}) =>
            <Article
              image_url={item.image_url !== null ? item.image_url : null} // shows only when there is an image
              // image_url = {item.image_url}
              title = {item.title}
              description = {item.description}
              // author = {item.author}
              pubDate = {item.pubDate}
              source_name = {item.source_name}
            />}
          keyExtractor = {(item) => item.title}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 24,
    paddingTop: 80,
  },
  header:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title:{
    fontSize: 32,
    fontFamily: "Futura-bold",
    color: "#2482E6",
    margin: 6,
  },
  flatlistContainer: {
    alignItems: "center",
  }
});
