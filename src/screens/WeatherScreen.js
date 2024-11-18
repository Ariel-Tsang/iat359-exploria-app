import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, RefreshControl } from "react-native";
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { MapPinIcon, CalendarDaysIcon } from 'react-native-heroicons/solid'
import { SafeAreaView } from "react-native-safe-area-context";

export default function WeatherScreen() {
  const [loading, setLoading] = useState(true);
  // const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [weather, setWeather] = useState({});

  const forecastEndpoint = (params) => `https://api.weatherapi.com/v1/forecast.json?key=569e9878da7f4546b62234324241711&q=${params.cityName}&days=${params.days}&aqi=no&alerts=no`
  const locationsEndpoint = (params) => `https://api.weatherapi.com/v1/search.json?key=569e9878da7f4546b62234324241711&q=${params.cityName}`

  const fetchAPI = async (endpoint) => {
    try {
      const response = await fetch(endpoint);
      const data = await response.json();

      if (!response.ok) {
        setError(data.error?.message || "Failed to fetch data");
        // throw new Error(data.error?.message || "Failed to fetch data");
      }
      return data;
    } catch (e) {
      setError(err.message || "Failed to fetch weather");
    } finally {
      setLoading(false);
      // setRefreshing(false);
    }
  };
  
  const fetchWeatherForecast = (params) =>{
    return fetchAPI(forecastEndpoint(params));
  }
  
  const fetchLocations = (params) =>{
    return fetchAPI(locationsEndpoint(params));
  }

  const handleLocation = (loc) =>{
    setLocations([]);
    toggleSearch(false);
    setLoading(true);
    fetchWeatherForecast({
      cityName: loc.name,
      days: '7'
    }).then(data=>{
      setWeather(data);
      setLoading(false);
    })
  }

  const handleSearch = (value) =>{
    if(value.length > 2) {
      fetchLocations({cityName: value}).then((data) => {
        setLocations(data);
      })
    }
  }

  // const handleRefresh = () => {
  //   setRefreshing(true);
  //   fetchWeatherForecast();
  // };

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

  useEffect(()=>{
    fetchInitialWeatherData();
  },[]);

  const {current, location} = weather;

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

  return (
    <View style={styles.container}>
      {/* <Image blurRadius={70} style={styles.bgImage} source={require('../../assets/bg.png')}/> */}
      <View style={styles.searchBarContainer} >
        <View style={styles.searchBar} >
          <TextInput 
            style={styles.input}
            placeholder="Search"
            onChangeText={handleSearch}
          />
        </View>
        <TouchableOpacity
          style={styles.searchButton}
          onPress={()=> toggleSearch(!showSearch)}
        >
          <MagnifyingGlassIcon size="32" color="white"/>
        </TouchableOpacity>
      </View>
      {
        locations.length>0 && showSearch? (
          <View style={styles.locationButtonsContainer}>
            {
              locations.map((loc, index)=>{
                return (
                  <TouchableOpacity
                    style={styles.locationButtons}
                    key={index}
                    onPress={()=> handleLocation(loc)}
                  >
                    <MapPinIcon size="32" color="#2482E6" />
                    <Text style={styles.locationButtonsText}>{loc?.name}, {loc?.country}</Text>
                  </TouchableOpacity>
                )
              })
            }
          </View>
        ): null
      }
      {/* forecast section */}
      <View style={styles.forecastContainer}>
        {/* location */}
        <Text style={styles.forecastCity}>
          {location?.name}, 
          <Text style={styles.forecastCountry}>
            {" " + location?.country} 
          </Text>
        </Text>

        {/* weather image */}
        <View>
          <Image
            style={styles.curretWeatherImage}
            
            source={weatherImages[current?.condition?.text]} />
        </View>

        {/* degree celcius */}
        <View style={styles.degreeContainer}>
          <Text style={styles.degree}>{current?.temp_c}&#176;</Text>
          <Text style={styles.weatherText}>{current?.condition?.text}</Text>
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

        {/* forecast for upcoming days */}
        <View>
          <View style={styles.upcomingForecastContainer}>
            <CalendarDaysIcon size="22" color="black" />
              <Text style={styles.upcomingForecastHeader}>Daily forecast</Text>
          </View>
          <ScrollView
            horizontal
            style={styles.upcomingForecastScrollView}
            showsHorizontalScrollIndicator={false}
          >
            {
              weather?.forecast?.forecastday?.map((item, index)=>{
                let date = new Date(item.date);
                let options = {weekday: 'long'};
                let dayName = date.toLocaleDateString('en-US', options);
                dayName = dayName.split(',')[0];

                return (
                  <View 
                    style={styles.upcomingForecast}
                    key={index}
                  >
                    <Image style={styles.upcomingForecastImage} source={weatherImages[item?.day?.condition?.text]} />
                    <Text style={styles.days}>{dayName}</Text>
                    <Text style={styles.degrees}>{item?.day?.avgtemp_c}&#176;</Text>
                  </View>
                )
              })
            }
            </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    paddingTop: 60,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    zIndex: 1,
    gap: 5,
  },
  searchBar: {
    backgroundColor: "#f9f9f9",
    width: "85%",
    height: 45,
    borderWidth: 1.5,
    borderColor: "#2482E6",
    borderRadius: 6,
  },
  input: {
    flex: 1,
    paddingLeft: 6,
    color: "black",
  },
  searchButton: {
    backgroundColor: "#2482E6",
    borderRadius: 6,
    padding: 6,
    margin: 0,
  },
  locationButtonsContainer: {
    position: "absolute",
    width: "85%",
    backgroundColor: "white",
    top: 105,
    left: 25,
    justifyContent: "center",
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 6,
    zIndex: 1,
  },
  locationButtons: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    marginBottom: 4,
  },
  locationButtonsText: {
    fontSize: 16,
    color: "black",
    marginLeft: 8,
  },
  forecastContainer: {
    flex: 1,
    marginTop: 20,
  },
  forecastCity: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
  },
  forecastCountry: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  curretWeatherImage: {
    width: 160,
    height: 160,
    alignSelf: "center",
    marginVertical: 30,
  },
  degreeContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  degree: {
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
  },
  weatherText: {
    fontSize: 18,
    textAlign: "center",
    color: "black",
  },
  otherStatsContainers: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 20,
  },
  otherStatsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  otherStatsImage: {
    width: 20,
    height: 20,
  },
  otherStatsImageDrop: {
    width: 16,
    height: 22,
  },
  otherStats: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 5,
  },
  upcomingForecastContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 10,
  },
  upcomingForecastHeader: {
    fontSize: 16,
    marginLeft: 5,
    fontWeight: "bold",
  },
  upcomingForecastScrollView: {
    paddingVertical: 10,
  },
  upcomingForecast: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 120,
    borderWidth: 2,
    borderColor: "#2482E6",
    borderRadius: 16,
    paddingVertical: 8,
    // backgroundColor: "#f9f9f9",
    marginRight: 10,
  },
  upcomingForecastImage: {
    width: 50,
    height: 50,
    marginBottom: 8,
  },
  days: {
    fontSize: 14,
    fontWeight: "600",
  },
  degrees: {
    fontSize: 18,
    fontWeight: "600",
  },
});

// Resources: https://www.youtube.com/watch?v=953vyZMO4cM&ab_channel=CodeWithNomi