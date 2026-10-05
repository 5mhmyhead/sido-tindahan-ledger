import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Linking, Pressable, StyleSheet, Text } from "react-native";

export function StorePhoto() {
  const [photo, setPhoto] = useState("");
  const [denied, setDenied] = useState(false);
  
  async function take() {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    setDenied(!granted);
    if (!granted) return;
  
    const result = await ImagePicker.launchCameraAsync();
    if (!result.canceled) setPhoto(result.assets[0].uri);
  }

  return (
    <>
      <Pressable
        onPress={take}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Take a store photo</Text>
      </Pressable>
      {photo !== "" && (
        <Image 
          source={{ uri: photo }} 
          style={{ height: 220, borderRadius: 12, marginBottom: 12 }} 
        />
      )}
      {denied && (
        <Text style={styles.errorText}>Camera is off for this app.</Text>
      )}
      
      {denied && (
        <Pressable
          onPress={() => Linking.openSettings()}
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: pressed ? "#1c1c1e" : "#2c2c2e" }
          ]}
        >
          <Text style={styles.buttonText}>Open settings</Text>
        </Pressable>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007AFF",
  },
  buttonText: {
    color: "#fff",
  },
  errorText: {
    fontSize: 14,
    color: "#ff3b30",
    textAlign: "center",
    marginVertical: 8,
  }
});