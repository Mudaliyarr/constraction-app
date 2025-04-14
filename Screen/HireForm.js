import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { db, auth } from "../firebaseConfig";
import { doc, updateDoc, arrayUnion, getDoc, serverTimestamp } from "firebase/firestore";

export const HireForm = ({ route }) => {
  const { worker } = route.params;
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const navigation = useNavigation();

  if (!worker) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Worker details not available</Text>
      </View>
    );
  }

  const handleConfirmHire = async () => {
    if (!paymentMethod) {
      Alert.alert("Error", "Please select a payment method.");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      Alert.alert("Error", "You need to be logged in to hire a worker.");
      return;
    }

    setLoading(true);

    try {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        Alert.alert("Error", "User data not found.");
        return;
      }

      const hiredWorker = {
        id: worker.id ?? "",
        name: worker.name ?? "Unknown",
        location: worker.location ?? "Unknown",
        charge: worker.charge ?? 0,
        experience: worker.experience ?? "Unknown",
        availability: worker.availability ?? "Unknown",
        skills: Array.isArray(worker.skills) ? worker.skills : [],
        phone: worker.phoneNumber ?? "No Phone Provided",
        image: worker.image ?? "",
        paymentMethod,
        hiredAt: `${selectedDate.toDateString()} ${selectedTime.toLocaleTimeString()}`, // ✅ Date & Time stored together
      };

      await updateDoc(userRef, {
        hiredWorkers: arrayUnion(hiredWorker),
        lastHiredAt: serverTimestamp(),
      });

      Alert.alert("Success", "Hired Successfully!");
      navigation.goBack();
    } catch (error) {
      console.error("Error hiring worker:", error);
      Alert.alert("Error", `Failed to hire worker. ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (event, date) => {
    if (date) {
      setSelectedDate(date);
    }
    setShowDatePicker(false);
  };

  const handleTimeChange = (event, time) => {
    if (time) {
      setSelectedTime(time);
    }
    setShowTimePicker(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Hire {worker.name}</Text>
      <Image source={{ uri: worker.image || "https://via.placeholder.com/150" }} style={styles.workerImage} />
      <View style={styles.detailsContainer}>
        <Text style={styles.detailText}><Text style={styles.bold}>Name:</Text> {worker.name}</Text>
        <Text style={styles.detailText}><Text style={styles.bold}>Location:</Text> {worker.location}</Text>
        <Text style={styles.detailText}><Text style={styles.bold}>Charge:</Text> {worker.charge} / day</Text>
        <Text style={styles.detailText}><Text style={styles.bold}>Experience:</Text> {worker.experience}</Text>
        <Text style={styles.detailText}><Text style={styles.bold}>Availability:</Text> {worker.availability}</Text>
        <Text style={styles.detailText}><Text style={styles.bold}>Skills:</Text> {Array.isArray(worker.skills) ? worker.skills.join(", ") : "N/A"}</Text>
      </View>

      {/* 📆 Date Picker */}
      <View style={styles.datePickerContainer}>
        <Text style={styles.paymentTitle}>Select Hiring Date:</Text>
        <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
          <Text style={styles.paymentText}>{selectedDate.toDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display={Platform.OS === "ios" ? "inline" : "calendar"}
            onChange={handleDateChange}
          />
        )}
      </View>

      {/* ⏰ Time Picker */}
      <View style={styles.datePickerContainer}>
        <Text style={styles.paymentTitle}>Select Hiring Time:</Text>
        <TouchableOpacity style={styles.dateButton} onPress={() => setShowTimePicker(true)}>
          <Text style={styles.paymentText}>{selectedTime.toLocaleTimeString()}</Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            value={selectedTime}
            mode="time"
            display="clock"
            onChange={handleTimeChange}
          />
        )}
      </View>

      {/* 💰 Payment Method */}
      <View style={styles.paymentContainer}>
        <Text style={styles.paymentTitle}>Select Payment Method:</Text>
        <TouchableOpacity style={styles.paymentOption} onPress={() => Alert.alert("Coming Soon", "Online payment will be available soon.")}>
          <Text style={styles.paymentText}>Online Payment</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.paymentOption, paymentMethod === "Cash" && styles.selectedOption]}
          onPress={() => setPaymentMethod("Cash")}
        >
          <Text style={styles.paymentText}>Cash Payment</Text>
        </TouchableOpacity>
      </View>

      {/* ✅ Confirm Button */}
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmHire} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.confirmButtonText}>Confirm Hire</Text>}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10, alignItems: "center", backgroundColor: "#F5F5F5", paddingTop: 50 },
  title: { fontSize: 26, fontWeight: "bold", color: "#D4A017", marginBottom: 20 },
  workerImage: { width: 150, height: 150, borderRadius: 75, marginBottom: 20, borderWidth: 2, borderColor: "#D4A017", elevation: 5 },
  detailsContainer: { backgroundColor: "#fff", padding: 20, borderRadius: 10, width: "100%", elevation: 5 },
  detailText: { fontSize: 18, color: "#444", marginBottom: 10 },
  bold: { fontWeight: "bold" },
  datePickerContainer: { marginTop: 20, width: "100%", alignItems: "center" },
  dateButton: { backgroundColor: "#fff", padding: 15, borderRadius: 10, width: "90%", alignItems: "center", marginBottom: 10, borderWidth: 1, borderColor: "#D4A017", elevation: 3 },
  paymentContainer: { marginTop: 20, width: "100%", alignItems: "center" },
  paymentTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 15 },
  paymentOption: { backgroundColor: "#fff", padding: 15, borderRadius: 10, width: "90%", alignItems: "center", marginBottom: 10, borderWidth: 1, borderColor: "#D4A017", elevation: 3 },
  selectedOption: { backgroundColor: "#D4A017" },
  paymentText: { fontSize: 16, fontWeight: "bold", color: "#444" },
  confirmButton: { backgroundColor: "#D4A017", padding: 15, borderRadius: 10, width: "100%", alignItems: "center", marginTop: 20, elevation: 3 },
  confirmButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});

export default HireForm;
