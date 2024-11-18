import React from "react";
import { View, StyleSheet, Text, SafeAreaView, Image} from "react-native";

const Article = (props) => {

  const publishedDate = new Date(props.pubDate); // Convert string to Date object
  const month = (publishedDate.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
  const day = publishedDate.getDate().toString().padStart(2, "0");
  const hours = publishedDate.getHours().toString().padStart(2, "0");
  const minutes = publishedDate.getMinutes().toString().padStart(2, "0");

  const formattedDate = `${month}-${day} ${hours}:${minutes}`;

  return(
    <SafeAreaView style={styles.container}>
      {/* Image (shows only when there is an image) */}
      {props.image_url ? (
        <Image source={{
          uri: props.image_url
        }}
        style={styles.image}
        />
      ) : (
        null
      )}

      <View style={styles.section}>
        {/* title */}
        <Text style={styles.title}>{props.title}</Text> 

        {/* description */}
        <Text style={styles.description}>{props.description}</Text> 

        <View style={styles.data}>
          {/* source */}
          <Text style={styles.source}>Source: {props.source_name}</Text> 
          {/* <Text style={styles.author}>By: {props.author}</Text>  */}
          <Text style={styles.date}>{formattedDate}</Text> 
        </View>

      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 340,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#2482E6",
    borderRadius: 20,
    marginTop: 16,
  },
  image:{
    height: 200,
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title:{
    fontSize: 18,
    fontWeight: "bold",
    padding: 10,
  },
  description:{
    fontSize: 14,
    padding: 10,
    paddingTop: 0,
  },
  data:{
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    paddingTop: 0,
  },
  heading:{

  },
  author:{
      fontWeight: "bold",
      fontSize: 16
  },
  date:{
      fontWeight: "bold",
      color: "gray",
      fontSize: 16
  },
  source:{
      color: "gray",
      fontWeight: "bold",
      fontSize: 16
  },
});


export default Article;