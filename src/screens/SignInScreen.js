import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import React, { useState } from "react";
import { Button, Pressable, StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import { Link } from '@react-navigation/native';
import { firebase_auth } from "../firebaseConfig";

export default function SignInScreen() {
  // State variables to track email and password inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // our authentication, initialized in the beginning
  const auth = firebase_auth;

  const handleSignUp = async () => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response);
      alert("Sign up success. User: " + email + " signed up.");
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  const handleLogIn = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      //console.log(response);
      alert("User: " + email + " signed in");
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  const GradientText = (props) => {
    return (
      <MaskedView maskElement={<Text {...props} />}>
        <LinearGradient
          colors={['#2482E6', '#6F00FF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text {...props} style={[props.style, { opacity: 0 }]} />
        </LinearGradient>
      </MaskedView>
    );
  };

  return (
    <View style={styles.container}>

      <GradientText style={styles.header}>Exploria</GradientText>


      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      <View style={styles.buttonContainer}>
        <LinearGradient colors={['#2482E6', '#6F00FF']} style={styles.pressable}>
          <TouchableOpacity onPress={handleLogIn}><Text style={styles.buttonText}>Log in</Text></TouchableOpacity>
        </LinearGradient>
      </View>

      <View style={styles.signupContainer}>
        <Text style={styles.text}>New to Exploria?</Text>
        <Link to={{ screen: "SignInScreen" }} onPress={handleSignUp} style={styles.link}>Sign up</Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "white",
    padding: 24,
    paddingTop: 180,
  },
  header: {
    fontSize: 60,
    fontFamily: "Futura-bold",
    color: "#6F00FF",
    textAlign: "center",
    marginBottom: 60,
  },
  label: {
    fontSize: 16,
    fontFamily: "Futura",
    marginTop: 12,
    marginBottom: 8,
  },
  input: {
    fontSize: 14,
    fontFamily: "Futura",
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  buttonContainer: {
    margin: 10,
    justifyContent: "center",
  },
  pressable: {
    backgroundColor: "#6F00FF",
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
  signupContainer: {
    flexDirection: 'row',
    textAlign: "center",
    margin: "auto",
    marginTop: 0,
  },
  text: {
    fontSize: 14,
    fontFamily: "Futura",
    color: "black",
  },
  link: {
    fontSize: 14,
    fontFamily: "Futura",
    color: "#2482E6",
    marginLeft: 8,
  },
});
