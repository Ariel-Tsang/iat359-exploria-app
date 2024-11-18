import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

export default function WeatherWidget() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [weather, setWeather] = useState({});

  const forecastEndpoint = (params) => 
    `https://api.weatherapi.com/v1/forecast.json?key=569e9878da7f4546b62234324241711&q=${params.cityName}&days=${params.days}&aqi=no&alerts=no`;

  const fetchAPI = async (endpoint) => {
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      if (!response.ok) {
        setError(data.error?.message || "Failed to fetch data");
      }
      return data;
    } catch (e) {
      setError(e.message || "Failed to fetch weather");
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherForecast = (params) =>{
    return fetchAPI(forecastEndpoint(params));
  }

  const fetchInitialWeatherData = async () => {
    setLoading(true);
    try {
      const data = await fetchWeatherForecast({
        cityName: "Vancouver",
        days: '7',
      });
      setWeather(data);
    } catch (e) {
      console.error('Error fetching initial weather data: ', e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialWeatherData();
  }, []);

  const { current, location } = weather;

  const weatherImages = {
    'Partly cloudy': require('../../assets/partlycloudy.png'),
    'Partly Cloudy ': require('../../assets/partlycloudy.png'),
    'Moderate rain': require('../../assets/moderaterain.png'),
    'Patchy rain nearby': require('../../assets/moderaterain.png'),
    'Sunny': require('../../assets/sunny.png'),
    'Clear': require('../../assets/sunny.png'),
    'Overcast': require('../../assets/cloud.png'),
    'Cloudy': require('../../assets/cloud.png'),
    'Light rain': require('../../assets/moderaterain.png'),
    'Moderate rain at times': require('../../assets/moderaterain.png'),
    'Heavy rain': require('../../assets/heavyrain.png'),
    'Heavy rain at times': require('../../assets/heavyrain.png'),
    'Moderate or heavy freezing rain': require('../../assets/heavyrain.png'),
    'Moderate or heavy rain shower': require('../../assets/heavyrain.png'),
    'Moderate or heavy rain with thunder': require('../../assets/heavyrain.png'),
    'Other': require('../../assets/moderaterain.png'),
  }

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  return (
    <View style={styles.weatherWidget}>

      <View style={styles.statsContainer}>
        <View>
          {/* location */}
          <Text style={styles.forecastCity}>
            {location?.name}, <Text style={styles.forecastCountry}>{location?.country}</Text>
          </Text>

          <View style={styles.weatherContainer}>
            {/* weather image */}
            <Image style={styles.weatherImage} source={weatherImages[current?.condition?.text]} />

            {/* degree celcius */}
            <View>
              <Text style={styles.temperature}>{current?.temp_c}&#176;C</Text>
              <Text style={styles.weatherCondition}>{current?.condition?.text}</Text>
            </View>
          </View>
        </View>
      
        {/* other stats */}
        <View style={styles.otherStatsContainers}>
            <View style={styles.otherStatsContainer}>
              <Image style={styles.otherStatsImage} source={require('../../assets/wind.png')} />
              <Text style={styles.otherStats}>{current?.wind_kph}km</Text>
            </View>
            <View style={styles.otherStatsContainer}>
              <Image style={styles.otherStatsImageDrop} source={require('../../assets/drop.png')} />
              <Text style={styles.otherStats}>{current?.humidity}%</Text>
            </View>
            <View style={styles.otherStatsContainer}>
              <Image style={styles.otherStatsImage} source={require('../../assets/sun.png')} />
              <Text style={styles.otherStats}>{weather?.forecast?.forecastday[0]?.astro?.sunrise}</Text>
            </View>
          </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  statsContainer: {
    flexDirection: "row",
    gap: 60,
  },
  weatherWidget: {
    backgroundColor: "#ffffff",
    padding: 10,
    alignItems: "left",
    borderStyle: "solid",
    borderWidth: 1.5,
    borderColor: "#2482E6",
    borderRadius: 12,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // shadowRadius: 4,
  },
  forecastCity: {
    fontSize: 14,
    fontWeight: "600",
  },
  forecastCountry: {
    fontSize: 14,
    fontWeight: "400",
    color: "#555",
    marginTop: 6,
  },
  weatherContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    margin: 6,
    marginTop: 12,
    marginBottom: 0,
  },
  weatherImage: {
    width: 50,
    height: 50,
  },
  temperature: {
    fontSize: 20,
    fontWeight: "bold",
  },
  weatherCondition: {
    fontSize: 12,
    fontWeight: "500",
    color: "#666",
  },
  otherStatsContainers: {
    justifyContent: "space-around",
    width: "100%",
    marginHorizontal: 20,
  },
  otherStatsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  otherStatsImage: {
    width: 16,
    height: 16,
  },
  otherStatsImageDrop: {
    width: 12,
    height: 16,
  },
  otherStats: {
    fontSize: 12,
    fontWeight: "400",
    marginLeft: 8,
  },
});