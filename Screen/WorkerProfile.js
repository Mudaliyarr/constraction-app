import React, { useState } from "react";
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, ScrollView, Platform } from "react-native";

export const WorkerProfile = ({ route, navigation }) => {
  const { worker } = route.params;
  const [showPhoneNumber, setShowPhoneNumber] = useState(false); // State to toggle phone number visibility

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Worker Image */}
      <Image source={{ uri: worker.image }} style={styles.workerImage} />

      {/* Worker Details Table */}
      <View style={styles.detailsTable}>
        <DetailRow label="Name" value={worker.name} />
        <DetailRow label="Age" value={worker.age} />
        <DetailRow label="Experience" value={worker.experience} />
        <DetailRow label="Location" value={worker.location} />
        <DetailRow label="Charge" value={`${worker.charge} `} />
        <DetailRow label="Availability" value={worker.availability ? "Available" : "Not Available"} />
        <DetailRow label="Specialization" value={worker.specialization} />
        <DetailRow label="Certifications" value={worker.certifications || "None"} />
        <DetailRow label="Phone Number" value={showPhoneNumber ? worker.phone : "Hidden for Privacy"} />
      </View>

      {/* Button to Show Contact */}
      <TouchableOpacity
        style={styles.showContactButton}
        onPress={() => setShowPhoneNumber(true)}
      >
      
      </TouchableOpacity>

      {/* Skills Section */}
      <Text style={styles.sectionTitle}>Skills</Text>
      <View style={styles.skillsContainer}>
        {worker?.skills?.length ? (
          worker.skills.map((skill, index) => (
            <Text key={index} style={styles.skillBadge}>{skill}</Text>
          ))
        ) : (
          <Text style={styles.noDataText}>No skills available</Text>
        )}
      </View>

      {/* Rating Section */}
      <Text style={styles.sectionTitle}>Rating</Text>
      <Text style={styles.rating}>⭐ {worker.rating} / 5</Text>

      {/* Projects Section */}
      <Text style={styles.sectionTitle}>Projects</Text>
      {worker?.projects?.length ? (
        <FlatList
          data={worker.projects}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.projectsList}
          renderItem={({ item }) => (
            <View style={styles.projectCard}>
              <Image source={{ uri: item.image }} style={styles.projectImage} />
              <Text style={styles.projectTitle}>{item.title}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noDataText}>No projects available</Text>
      )}

      {/* Hire Button */}
      <TouchableOpacity
        style={styles.hireButton}
        onPress={() => navigation.navigate("HireForm", { worker, phoneNumber: worker.phone })}
      >
        <Text style={styles.hireButtonText}>Hire Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Reusable Detail Row Component
const DetailRow = React.memo(({ label, value }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
));

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    paddingTop: Platform.OS === "ios" ? 50 : 30,
  },
  workerImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: "#D4A017",
  },
  detailsTable: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    backgroundColor: "#fff",
    elevation: 4,
    overflow: "hidden",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  detailValue: {
    fontSize: 16,
    color: "#555",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    color: "#D4A017",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 10,
  },
  skillBadge: {
    backgroundColor: "#D4A017",
    color: "#fff",
    padding: 8,
    margin: 5,
    borderRadius: 10,
    fontSize: 14,
    fontWeight: "bold",
  },
  noDataText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 5,
  },
  rating: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  projectsList: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  projectCard: {
    alignItems: "center",
    marginRight: 15,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    elevation: 4,
    marginBottom: 20,
  },
  projectImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  projectTitle: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
    textAlign: "center",
    fontWeight: "bold",
  },
  hireButton: {
    backgroundColor: "#D4A017",
    padding: 15,
    marginTop: 20,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    elevation: 4,
  },
  hireButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
 
  showContactText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default WorkerProfile;

