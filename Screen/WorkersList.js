import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from "react-native";

const workersData = {
  Carpenters: [
    { id: "1", name: "Rajesh Sharma", age: 40, experience: "15 years",phoneNumber: "+91 9876543210", location: "Delhi", charge: "₹800/day", image: "https://randomuser.me/api/portraits/men/11.jpg", skills: ["Furniture Making", "Wood Carving"], rating: 4.5, projects: [
        { title: "Modular Kitchen", image: "https://i.pinimg.com/474x/8a/18/a6/8a18a6d1db8802c9c623a908a28979b2.jpg" },
        { title: "Custom Wardrobe", image: "https://via.placeholder.com/100" },
      ], availability: "Available", specialization: "Modular Furniture", certifications: "Certified Carpenter" },
    { id: "2", name: "Amit Verma", age: 35, experience: "12 years",phoneNumber: "+91 9876543210", location: "Mumbai", charge: "₹700/day", image: "https://randomuser.me/api/portraits/men/12.jpg", skills: ["Wooden Flooring", "Cabinet Design"], rating: 4.2, projects: [
        { title: "Office Desk", image: "https://via.placeholder.com/100" },
        { title: "Bookshelf", image: "https://via.placeholder.com/100" },
      ], availability: "Available", specialization: "Custom Carpentry", certifications: "Woodworking Expert" },
  ],
  Electricians: [
    { id: "3", name: "Suresh Kumar", age: 38, experience: "14 years",phoneNumber: "+91 9876543210", location: "Bangalore", charge: "₹750/day", image: "https://randomuser.me/api/portraits/men/13.jpg", skills: ["Wiring", "Circuit Repair"], rating: 4.6, projects: [
        { title: "Home Wiring", image: "https://via.placeholder.com/100" },
        { title: "Industrial Setup", image: "https://via.placeholder.com/100" },
      ], availability: "Available", specialization: "Residential & Commercial Wiring", certifications: "Certified Electrician" }
  ],
  Plumbers: [
    { id: "4", name: "Rahul Singh", age: 42, experience: "18 years",phoneNumber: "+91 9876543210", phoneNumber: "+91 9876543210", location: "Chennai", charge: "₹800/day", image: "https://randomuser.me/api/portraits/men/14.jpg", skills: ["Pipe Fitting", "Leak Repair"], rating: 4.7, projects: [
        { title: "Bathroom Renovation", image: "https://via.placeholder.com/100" },
        { title: "Kitchen Plumbing", image: "https://via.placeholder.com/100" },
      ], availability: "Available", specialization: "Residential Plumbing", certifications: "Licensed Plumber" }
  ],
  Painters: [
    { id: "5", name: "Anil Mehta", age: 45, experience: "20 years",phoneNumber: "+91 9876543210", location: "Kolkata", charge: "₹850/day", image: "https://randomuser.me/api/portraits/men/15.jpg", skills: ["Wall Painting", "Decorative Finishing"], rating: 4.8, projects: [
        { title: "House Painting", image: "https://via.placeholder.com/100" },
        { title: "Office Painting", image: "https://via.placeholder.com/100" },
      ], availability: "Available", specialization: "Interior & Exterior Painting", certifications: "Certified Painter" }
  ],
  Masons: [
    { id: "6", name: "Vikram Yadav", age: 50, experience: "25 years",phoneNumber: "+91 9876543210", location: "Hyderabad", charge: "₹900/day", image: "https://randomuser.me/api/portraits/men/16.jpg", skills: ["Bricklaying", "Concrete Work"], rating: 4.9, projects: [
        { title: "Building Foundation", image: "https://via.placeholder.com/100" },
        { title: "Wall Construction", image: "https://via.placeholder.com/100" },
      ], availability: "Available", specialization: "Structural Masonry", certifications: "Master Mason" }
  ],
  Welders: [
    { id: "7", name: "Prakash Rao", age: 37, experience: "16 years", phoneNumber: "+91 9876543210",location: "Pune", charge: "₹750/day", image: "https://randomuser.me/api/portraits/men/17.jpg", skills: ["Arc Welding", "Metal Fabrication"], rating: 4.7, projects: [
        { title: "Gate Welding", image: "https://via.placeholder.com/100" },
        { title: "Metal Sculpture", image: "https://via.placeholder.com/100" },
      ], availability: "Available", specialization: "Industrial Welding", certifications: "Certified Welder" }
  ],
  Gardeners: [
    { id: "8", name: "Sunil Reddy", age: 41, experience: "18 years",phoneNumber: "+91 9876543210", location: "Jaipur", charge: "₹700/day", image: "https://randomuser.me/api/portraits/men/18.jpg", skills: ["Landscaping", "Hedge Trimming"], rating: 4.6, projects: [
        { title: "Garden Design", image: "https://via.placeholder.com/100" },
        { title: "Tree Planting", image: "https://via.placeholder.com/100" },
      ], availability: "Available", specialization: "Organic Gardening", certifications: "Certified Horticulturist" }
  ],
  Mechanics: [
    { id: "9", name: "Ramesh Patil", age: 39, experience: "17 years",phoneNumber: "+91 9876543210", location: "Lucknow", charge: "₹800/day", image: "https://randomuser.me/api/portraits/men/19.jpg", skills: ["Engine Repair", "Brake Service"], rating: 4.7, projects: [
        { title: "Car Engine Overhaul", image: "https://via.placeholder.com/100" },~
        { title: "Motorbike Tuning", image: "https://via.placeholder.com/100" },
      ], availability: "Available", specialization: "Automobile Mechanic", certifications: "Certified Mechanic" }
  ],
  




  Roofers: [
    { id: "10", name: "Ravi Kapoor", age: 45, experience: "20 years", phoneNumber: "+91 9876543210", location: "Delhi", charge: "₹900/day", image: "https://randomuser.me/api/portraits/men/20.jpg", skills: ["Shingle Installation", "Waterproofing"], rating: 4.8, projects: [
        { title: "Residential Roofing", image: "https://via.placeholder.com/100" },
        { title: "Commercial Roofing", image: "https://via.placeholder.com/100" },
      ], availability: "Available", specialization: "Tile & Metal Roofing", certifications: "Certified Roofer" },
  ],
  TileFitters: [
    { id: "11", name: "Sandeep Malhotra", age: 40, experience: "18 years", phoneNumber: "+91 9876543210", location: "Mumbai", charge: "₹850/day", image: "https://randomuser.me/api/portraits/men/21.jpg", skills: ["Floor Tiling", "Wall Tiling"], rating: 4.7, projects: [
        { title: "Kitchen Tiling", image: "https://via.placeholder.com/100" },
        { title: "Bathroom Tiling", image: "https://via.placeholder.com/100" },
      ], availability: "Available", specialization: "Ceramic & Marble Tiling", certifications: "Professional Tile Installer" },
  ],
  HVAC: [
    { id: "12", name: "Arun Joshi", age: 38, experience: "15 years", phoneNumber: "+91 9876543210", location: "Bangalore", charge: "₹1000/day", image: "https://randomuser.me/api/portraits/men/22.jpg", skills: ["AC Repair", "Heating Systems"], rating: 4.6, projects: [
        { title: "Central AC Installation", image: "https://via.placeholder.com/100" },
        { title: "Duct Cleaning", image: "https://via.placeholder.com/100" },
      ], availability: "Available", specialization: "HVAC Systems", certifications: "Certified HVAC Technician" },
  ],
  Plasterers: [
    { id: "13", name: "Manoj Tiwari", age: 42, experience: "17 years", phoneNumber: "+91 9876543210", location: "Chennai", charge: "₹750/day", image: "https://randomuser.me/api/portraits/men/23.jpg", skills: ["Wall Plastering", "Ceiling Plastering"], rating: 4.5, projects: [
        { title: "Interior Plastering", image: "https://via.placeholder.com/100" },
        { title: "Exterior Finishing", image: "https://via.placeholder.com/100" },
      ], availability: "Available", specialization: "Gypsum & Cement Plastering", certifications: "Licensed Plasterer" },
  ],
  Scaffolders: [
    { id: "14", name: "Rajiv Bansal", age: 39, experience: "16 years", phoneNumber: "+91 9876543210", location: "Pune", charge: "₹850/day", image: "https://randomuser.me/api/portraits/men/24.jpg", skills: ["Scaffold Assembly", "Safety Inspection"], rating: 4.8, projects: [
        { title: "High-Rise Construction", image: "https://via.placeholder.com/100" },
        { title: "Bridge Repair", image: "https://via.placeholder.com/100" },
      ], availability: "Available", specialization: "Industrial & Residential Scaffolding", certifications: "Certified Scaffolder" },
  ],
  GlassFitters: [
    { id: "15", name: "Vikas Mehta", age: 37, experience: "14 years", phoneNumber: "+91 9876543210", location: "Jaipur", charge: "₹900/day", image: "https://randomuser.me/api/portraits/men/25.jpg", skills: ["Glass Cutting", "Window Installation"], rating: 4.7, projects: [
        { title: "Storefront Glass Installation", image: "https://via.placeholder.com/100" },
        { title: "Glass Partition Setup", image: "https://via.placeholder.com/100" },
      ], availability: "Available", specialization: "Residential & Commercial Glass Fitting", certifications: "Certified Glass Technician" },
  ],
};

export const WorkersList = ({ route, navigation }) => {
  const { category } = route.params;
  const workers = workersData[category] || [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category} Available</Text>
      <FlatList
        data={workers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.workerCard}
            onPress={() =>
              navigation.navigate("WorkerProfile", {
                worker: item, // Phone number is passed but not displayed
              })
            }
          >
            <Image source={{ uri: item.image }} style={styles.workerImage} />
            <View style={styles.workerDetails}>
              <Text style={styles.workerName}>{item.name}</Text>
              <Text style={styles.workerInfo}>Age: {item.age}</Text>
              <Text style={styles.workerLocation}>State: {item.location}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff", paddingTop: 50 },
  title: { fontSize: 22, fontWeight: "bold", color: "#D4A017", marginBottom: 15, textAlign: "center" },
  workerCard: { 
    flexDirection: "row", 
    alignItems: "center", 
    padding: 20, 
    borderWidth: 1, 
    borderColor: "#D4A017", 
    borderRadius: 10, 
    marginBottom: 10, 
    backgroundColor: "#FAF3E0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  workerImage: { width: 70, height: 70, borderRadius: 35, marginRight: 15 },
  workerDetails: { flex: 1 },
  workerName: { fontSize: 18, fontWeight: "bold", color: "#333" },
  workerInfo: { fontSize: 14, color: "#555" },
  workerLocation: { fontSize: 14, color: "#888" },
});
export default WorkersList;
