import React, { useState } from 'react';
import { useRouter } from 'expo-router'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  TextInput,
  ScrollView,
  SafeAreaView,
  Animated,
} from 'react-native';

const Profile = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [userName, setUserName] = useState('John Louise Bergabena');
  const [userEmail, setUserEmail] = useState('johnlouisebergs123@gmail.com');
  const [userID, setUserID] = useState('BSIT123456');
  const [userCourse, setUserCourse] = useState('BSIT');
  const [userYear, setUserYear] = useState('3rd Year');
  const [userGender, setUserGender] = useState('Male');
  const [userLocation, setUserLocation] = useState('Toledo City, Cebu');
  const [modalHeight] = useState(new Animated.Value(0));

  const handleEditProfile = () => {
    setModalVisible(true);
    animateModal(300); // Open modal animation
  };

  const handleSaveProfile = () => {
    setModalVisible(false);
    animateModal(0); // Close modal animation
    Alert.alert('Profile Updated', 'Your profile details have been updated successfully.');
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const closeSidebar = () => {
    setSidebarVisible(false);
  };

  const animateModal = (toValue) => {
    Animated.timing(modalHeight, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Hamburger Menu */}
      <TouchableOpacity style={styles.hamburgerButton} onPress={toggleSidebar}>
        <Text style={styles.hamburgerIcon}>☰</Text>
      </TouchableOpacity>

      {/* Sidebar Menu */}
      {sidebarVisible && (
  <Animated.View style={[styles.sidebar, { opacity: sidebarVisible ? 1 : 0 }]}>
    <TouchableOpacity style={styles.sidebarOption} onPress={closeSidebar}>
      <Text style={styles.sidebarText}>Close Menu</Text>
    </TouchableOpacity>
    
    {/* Navigate to History */}
    <TouchableOpacity
            style={styles.sidebarOption}
            onPress={() => router.push('/History')}  // Replace with router.push
          >
            <Text style={styles.sidebarText}>History</Text>
          </TouchableOpacity>


    <TouchableOpacity style={styles.sidebarOption} onPress={() => navigation.navigate('Credits')}>
      <Text style={styles.sidebarText}>Credits</Text>
    </TouchableOpacity>
    
    <TouchableOpacity style={styles.sidebarOption} onPress={() => navigation.navigate('Profile')}>
      <Text style={styles.sidebarText}>Manage Profile</Text>
    </TouchableOpacity>
  </Animated.View>
)}


      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileHeader}>
          <Image
            source={require('../../assets/icons/lou.png')}
            style={styles.profilePicture}
          />
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userEmail}>{userEmail}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Profile Details</Text>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Student ID:</Text>
            <Text style={styles.infoValue}>{userID}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Course:</Text>
            <Text style={styles.infoValue}>{userCourse}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Year Level:</Text>
            <Text style={styles.infoValue}>{userYear}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Gender:</Text>
            <Text style={styles.infoValue}>{userGender}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Joined:</Text>
            <Text style={styles.infoValue}>September 2021</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Location:</Text>
            <Text style={styles.infoValue}>{userLocation}</Text>
          </View>
        </View>
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Edit Profile Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <Animated.View style={[styles.modalView, { height: modalHeight }]}>
              <Text style={styles.modalTitle}>Edit Profile</Text>
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={userName}
                onChangeText={setUserName}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={userEmail}
                onChangeText={setUserEmail}
                keyboardType="email-address"
              />
              <View style={styles.modalButtonsContainer}>
                <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
                  <Text style={styles.saveButtonText}>Save Changes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.buttonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20, // Increased padding for better spacing
    backgroundColor: '#e0f7fa', // Light background for a fresh feel
    borderRadius: 10, // Slight rounding of corners for a softer look
    elevation: 5, // Added elevation for depth (Android)
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },


  hamburgerButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 100,
    padding: 10, // Added padding for better touch target
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Slightly transparent white background for visibility
    borderRadius: 25, // Rounded corners for a softer look
    elevation: 4, // Shadow for depth (Android)
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
},

hamburgerIcon: {
    fontSize: 30,
    color: '#007BB5', // Consistent with your app theme
},

sidebar: {
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100%',
  width: '75%', // Slightly increased width for better accessibility
  backgroundColor: '#ffffff',
  borderRightWidth: 1, // Adding a right border for definition
  borderRightColor: '#007BB5', // Color matches the theme
  shadowColor: '#000', // Change shadow color for more contrast
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 6, // Slightly increased radius for a softer shadow
  elevation: 5, // Increased elevation for more depth
  padding: 20,
  zIndex: 99,
  borderTopLeftRadius: 20, // Rounded top corners for a softer look
  borderBottomLeftRadius: 20, // Rounded bottom corners for a cohesive design
},

sidebarOption: {
  marginBottom: 20, // Space between options
  paddingVertical: 10, // Added vertical padding for better touch area
  borderRadius: 8, // Softer edges for modern design
  backgroundColor: '#f1f1f1', // Light background for better contrast
  elevation: 2, // Shadow effect for depth
},

sidebarText: {
  fontSize: 20,
  color: '#007bb2', // Maintain brand color
  fontWeight: '600', // Slightly bolder for better visibility
  textAlign: 'left', // Left align for better readability
  paddingHorizontal: 15, // Horizontal padding for better spacing
},

scrollContainer: {
  flexGrow: 1,
  paddingBottom: 20, // Added padding to prevent content from touching the bottom
},

profileHeader: {
  alignItems: 'center',
  marginBottom: 24,
  paddingVertical: 20,
  borderBottomWidth: 2,
  borderBottomColor: '#007bb2',
  backgroundColor: '#ffffff', // Ensures header stands out
  borderTopLeftRadius: 10, // Softens the top left corner
  borderTopRightRadius: 10, // Softens the top right corner
  elevation: 4, // Adds shadow for depth on Android
  shadowColor: '#000', // Shadow color for iOS
  shadowOffset: { width: 0, height: 2 }, // Shadow offset
  shadowOpacity: 0.3, // Shadow opacity
  shadowRadius: 4, // Shadow radius
},

  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#007bb2',
    marginBottom: 16,
    shadowColor: '#004d40',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  userName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#007bb2',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1, // Adds spacing between letters for a cleaner look
    textAlign: 'center', // Center aligns the text for better symmetry
},

userEmail: {
    fontSize: 16,
    color: '#01579b',
    marginBottom: 16,
    textAlign: 'center', // Center aligns the email for consistency
    fontStyle: 'italic', // Italicizes the email for a distinct look
},

infoContainer: {
  backgroundColor: '#ffffff',
  padding: 16,
  borderRadius: 12,
  marginBottom: 24,
  shadowColor: '#004d40',
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.3,
  shadowRadius: 6,
  elevation: 4,
  borderWidth: 1, // Adds a subtle border for better definition
  borderColor: '#e0e0e0', // Light border color to enhance separation
},

infoTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#007bb2',
  marginBottom: 12,
  textAlign: 'left', // Align text to the left for consistency
},

infoItem: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 12,
  paddingVertical: 8, // Adds vertical padding for a better touch area
  borderBottomWidth: 1, // Adds a bottom border for separation between items
  borderBottomColor: '#e0e0e0', // Light border for separation
},

infoLabel: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#007bb2',
},

infoValue: {
  fontSize: 16,
  color: '#004d40',
  textAlign: 'right', // Right-aligns the value for a cleaner look
},

actionsContainer: {
  alignItems: 'center',
  marginTop: 20, // Added top margin for spacing from other elements
},

button: {
  backgroundColor: '#007bb2',
  paddingVertical: 12,
  paddingHorizontal: 20,
  borderRadius: 10,
  shadowColor: '#004d40',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 4,
  elevation: 4,
  width: '100%', // Full-width button for better usability
  alignItems: 'center', // Center text horizontally
  justifyContent: 'center', // Center text vertically
  borderWidth: 1, // Optional: adds a border for better definition
  borderColor: '#005f8f', // Optional: darker border color for contrast
  transition: 'background-color 0.3s', // Smooth background transition on hover (if applicable)
  marginTop:20,
  bottom:50,
},

buttonText: {
  fontSize: 16,
  color: '#ffffff', // White text for better contrast
  fontWeight: 'bold', // Make the text more prominent
},

modalContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.7)', // Darkened background for better contrast
},

modalView: {
  width: '85%', // Slightly wider for better content display
  backgroundColor: '#ffffff',
  borderRadius: 12,
  padding: 20,
  shadowColor: '#004d40',
  shadowOffset: { width: 0, height: 4 }, // Increased shadow depth for a pronounced effect
  shadowOpacity: 0.3,
  shadowRadius: 6, // Softer shadow for a more subtle look
  elevation: 5, // Increased elevation for more prominence on Android
},

modalTitle: {
  fontSize: 26, // Slightly larger for better visibility
  fontWeight: 'bold',
  color: '#007bb2',
  marginBottom: 15, // Reduced margin for better spacing
  textAlign: 'center',
},

input: {
  height: 50,
  borderColor: '#007bb2',
  borderWidth: 1,
  borderRadius: 10, // Softer corners for a modern look
  paddingHorizontal: 15, // Increased padding for a more comfortable touch area
  marginBottom: 20,
  backgroundColor: '#f1f9ff', // Light background for better visibility
},

modalButtonsContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 15, // Added margin for better separation from input field
},

saveButton: {
  backgroundColor: '#007bb2',
  paddingVertical: 12,
  paddingHorizontal: 20,
  borderRadius: 10,
  shadowColor: '#004d40',
  shadowOffset: { width: 0, height: 3 }, // Increased shadow depth
  shadowOpacity: 0.4, // Slightly stronger shadow
  shadowRadius: 6, // Softer shadow
  elevation: 5, // Increased elevation for prominence
  width: '48%', // Set width to fit well with close button
},

saveButtonText: {
  color: '#ffffff',
  fontSize: 16,
  textAlign: 'center',
  fontWeight: 'bold', // Make text more prominent
},

closeButton: {
  backgroundColor: '#e57373',
  paddingVertical: 12,
  paddingHorizontal: 20,
  borderRadius: 10,
  shadowColor: '#004d40',
  shadowOffset: { width: 0, height: 3 }, // Increased shadow depth
  shadowOpacity: 0.4, // Slightly stronger shadow
  shadowRadius: 6, // Softer shadow
  elevation: 5, // Increased elevation for prominence
  width: '48%', // Set width to fit well with save button
},

});

export default Profile;

