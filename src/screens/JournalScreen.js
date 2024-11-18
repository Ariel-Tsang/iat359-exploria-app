import React, { useState } from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useCameraPermissions } from 'expo-camera';
import { Camera, CameraType } from 'expo-camera/legacy';

export default function JournalScreen() {
  const [image, setImage] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  // const [cameraType, setCameraType] = useState('back'); // Use strings 'back' and 'front'
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setCameraType((prevType) => (prevType === 'back' ? 'front' : 'back'));
  };

  function toggleCameraView() {
    setShowCamera(current => !current);
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result.uri);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Button
          title={showCamera ? 'Hide Camera' : 'Show Camera'}
          onPress={() => setShowCamera((prev) => !prev)}
        />
        {showCamera && (
          <Camera style={styles.camera} type={cameraType}>
            <View style={styles.buttonContainer}>
              {/* <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                <Text style={styles.text}>Flip Camera</Text>
              </TouchableOpacity> */}
            </View>
          </Camera>
        )}
      </View>
      <View style={styles.imageContainer}>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image && // Conditional rendering check:
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"white",
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
