import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Speech from "expo-speech";
import { db } from "../firebaseConfig";  // Import Firestore
import { collection, addDoc } from "firebase/firestore";

export const LaborProfile = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [skill, setSkill] = useState("");
  const [experience, setExperience] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");

  const pickImage = async () => {
    Speech.speak("कृपया अपनी तस्वीर अपलोड करें।", { language: "hi-IN" });
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!name || !skill || !experience || !phone || !address || !state || !district) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    try {
      await addDoc(collection(db, "labour"), {
        name,
        skill,
        experience,
        phone,
        address,
        state,
        district,
        image: image || "No Image",
        createdAt: new Date(),
      });

      Speech.speak("आपकी प्रोफाइल सफलतापूर्वक जमा हो गई है।", { language: "hi-IN" });
      Alert.alert("Success", "Profile Submitted Successfully!", [
        {
          text: "OK",
          onPress: () => {
            setName("");
            setSkill("");
            setExperience("");
            setPhone("");
            setAddress("");
            setState("");
            setDistrict("");
            setImage(null);
          },
        },
      ]);
    } catch (error) {
      console.error("Error saving profile:", error);
      Alert.alert("Error", "Failed to save profile.");
    }
  };

  const handleFocus = (text) => {
    Speech.speak(text, { language: "hi-IN" });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Labor Profile Form</Text>

      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.profileImage} />
        ) : (
          <Text style={styles.imageText}>Upload Image</Text>
        )}
      </TouchableOpacity>

      <View style={styles.form}>
        <TextInput placeholder="Your Name" style={styles.input} value={name} onChangeText={setName} onFocus={() => handleFocus("कृपया अपना नाम भरें।")} />
        <TextInput placeholder="Your Skill (e.g., Mason, Painter)" style={styles.input} value={skill} onChangeText={setSkill} onFocus={() => handleFocus("अपनी कुशलता दर्ज करें, जैसे मिस्त्री या चित्रकार।")} />
        <TextInput placeholder="Experience (in years)" style={styles.input} keyboardType="numeric" value={experience} onChangeText={setExperience} onFocus={() => handleFocus("अपना अनुभव वर्षों में दर्ज करें।")} />
        <TextInput placeholder="Phone Number" style={styles.input} keyboardType="phone-pad" value={phone} onChangeText={setPhone} onFocus={() => handleFocus("अपना फ़ोन नंबर दर्ज करें।")} />
        <TextInput placeholder="Address" style={styles.input} value={address} onChangeText={setAddress} onFocus={() => handleFocus("अपना पता भरें।")} />
        <TextInput placeholder="State" style={styles.input} value={state} onChangeText={setState} onFocus={() => handleFocus("अपना राज्य दर्ज करें।")} />
        <TextInput placeholder="District" style={styles.input} value={district} onChangeText={setDistrict} onFocus={() => handleFocus("अपना जिला दर्ज करें।")} />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#FFFFFF", padding: 20 },
  title: { fontSize: 26, fontWeight: "bold", color: "#D4AF37", marginBottom: 20 },
  imagePicker: { width: 130, height: 130, borderRadius: 65, backgroundColor: "#FFF8DC", justifyContent: "center", alignItems: "center", marginBottom: 15, borderWidth: 1, borderColor: "#D4AF37" },
  profileImage: { width: 130, height: 130, borderRadius: 65 },
  imageText: { color: "#D4AF37", fontWeight: "bold" },
  form: { width: "100%", paddingHorizontal: 10 },
  input: { backgroundColor: "#FFF", borderWidth: 1, borderColor: "#D4AF37", padding: 14, marginBottom: 12, borderRadius: 10, fontSize: 17, elevation: 2 },
  submitButton: { backgroundColor: "#D4AF37",width: "100%", paddingVertical: 14, paddingHorizontal: 30, borderRadius: 10, marginTop: 15, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 5 },
  submitText: { fontSize: 18, fontWeight: "bold", color: "#FFF", textAlign: "center" },
});

export default LaborProfile;
