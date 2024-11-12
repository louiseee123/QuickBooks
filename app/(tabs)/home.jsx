import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, Pressable, ScrollView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Get the current date in the desired format
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const day = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <View>
          <Pressable onPress={toggleDropdown} style={styles.welcomeContainer}>
            <Text style={styles.welcomeMessage}>Hello, Louise</Text>
            <MaterialIcons name={dropdownVisible ? "arrow-drop-up" : "arrow-drop-down"} size={24} color="#fff" />
          </Pressable>
          {dropdownVisible && (
            <View style={styles.dropdown}>
              <Pressable onPress={() => router.push('/profile')}>
                <Text style={styles.dropdownItem}>Profile</Text>
              </Pressable>
              <Pressable onPress={() => router.push('/credit')}>
                <Text style={styles.dropdownItem}>Check Credit</Text>
              </Pressable>
              <Pressable onPress={() => router.push('/history')}>
                <Text style={styles.dropdownItem}></Text>
              </Pressable>
              <Pressable onPress={() => router.push('/')}>
                <Text style={styles.dropdownItem}>Logout</Text>
              </Pressable>
              
            </View>
          )}
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.day}>{day}</Text>
        </View>
      </View>

      {/* Logo */}
      <Image style={styles.logo} source={require("..//..//assets/icons/logos.png")} />

      <Text style={styles.title}>Welcome to QuickBooks</Text>
      <Text style={styles.description}>CCTC's Official Library App</Text>

      {/* No Books Due Today Section */}
      <View style={styles.dueContainer}>
        <Image style={styles.dueImage} source={require("..//..//assets/icons/due.png")} />
        <Text style={styles.dueText}>No books due today!</Text>
      </View>

      {/* Categories Section */}
      <View style={styles.categoriesContainer}>
      
        <Text style={styles.categoriesTitle}> <Image style={styles.categoryImage} source={require("..//..//assets/icons/new.png")} />
        Discover something NEW!</Text>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.categoriesList}>
            <Pressable onPress={() => router.push('/category1')}>
              <Text style={styles.categoryItem}>Fiction</Text>
            </Pressable>
            <Pressable onPress={() => router.push('/category2')}>
              <Text style={styles.categoryItem}>History</Text>
            </Pressable>
            <Pressable onPress={() => router.push('/category3')}>
              <Text style={styles.categoryItem}>Biographies</Text>
            </Pressable>
            <Pressable onPress={() => router.push('/category4')}>
              <Text style={styles.categoryItem}>English</Text>
            </Pressable>
            <Pressable onPress={() => router.push('/category4')}>
              <Text style={styles.categoryItem}>Technology</Text>
            </Pressable>
            <Pressable onPress={() => router.push('/category4')}>
              <Text style={styles.categoryItem}>Science</Text>
            </Pressable>
            <Pressable onPress={() => router.push('/category4')}>
              <Text style={styles.categoryItem}>Encyclopedias</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>

      {/* Trending Books Section */}
      <View style={styles.booksContainer}>
        <Text style={styles.hotTitle}>
          <Image source={require("..//..//assets/images/fire.png")} style={styles.hotIcon} />
          What's HOT in BSIT
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.bookList}>
            {/* Replace with actual book images */}
            <Image style={styles.book} source={require("..//..//assets/images/book1.png")} />
            <Image style={styles.book} source={require("..//..//assets/images/book2.png")} />
            <Image style={styles.book} source={require("..//..//assets/images/book3.png")} />
            <Image style={styles.book} source={require("..//..//assets/images/book4.png")} />
          </View>
        </ScrollView>
      </View>

      {/* Events Section */}
      <View style={styles.eventsContainer}>
        <Text style={styles.eventsTitle}>
          <Image source={require("..//..//assets/images/intrams.png")} style={styles.eventImage} />
          Intramurals 2024
        </Text>
        <Text style={styles.eventDate}>October 10-12, 2024</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#007BB5',
    padding: 20,
    paddingTop: 30, // Increased top padding for better spacing
},

navbar: {
    width: '100%',
    backgroundColor: '#005B8C',
    borderRadius: 15, // Slightly rounded corners for a softer look
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000', // Shadow color for depth
    shadowOffset: { width: 0, height: 3 }, // Shadow offset for a more pronounced effect
    shadowOpacity: 0.2, // Slight opacity for shadow
    shadowRadius: 5, // Blur radius for shadow
    elevation: 5, // Elevation for Android
},

welcomeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10, // Added bottom margin for spacing
},

welcomeMessage: {
    fontSize: 28, // Increased font size for more impact
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: '#000', // Shadow color for text
    textShadowOffset: { width: 1, height: 1 }, // Shadow offset for text
    textShadowRadius: 4, // Blur radius for text shadow
},

  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 8,
    position: 'absolute',
    right: 250,
    top: 40,
    elevation: 5,
    padding: 10,
    width: 140,
  },
  dropdownItem: {
    fontSize: 16,
    padding: 10,
    color: '#007BB5',
  },
  dateContainer: {
    bottom:55,
    alignItems: 'flex-end', // Align items to the right
    marginBottom: 30, // Changed from bottom to margin for better spacing
    paddingVertical: 10, // Added vertical padding for spacing
},

date: {
    fontSize: 24, // Increased font size for better visibility
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: '#000', // Adding shadow for depth
    textShadowOffset: { width: 1, height: 1 }, // Shadow offset for text
    textShadowRadius: 3, // Blur radius for shadow
},

day: {
    fontSize: 20,
    color: '#fff',
    textShadowColor: '#000', // Adding shadow for depth
    textShadowOffset: { width: 1, height: 1 }, // Shadow offset for text
    textShadowRadius: 3, // Blur radius for shadow
},

logo: {
  width: 120,
  height: 120,
  marginBottom: 20,
  borderRadius: 60, // Circular logo
  borderWidth: 4, // Slightly increased border width for more impact
  borderColor: '#fff', // White border for contrast
  shadowColor: '#000', // Shadow color for depth
  shadowOffset: { width: 0, height: 4 }, // Shadow offset
  shadowOpacity: 0.3, // Shadow opacity
  shadowRadius: 6, // Blur radius for shadow
  elevation: 5, // Elevation for Android
},

title: {
  fontSize: 30, // Increased font size for prominence
  fontWeight: 'bold',
  color: '#fff',
  textAlign: 'center',
  marginVertical: 10,
  textShadowColor: '#000', // Adding shadow for depth
  textShadowOffset: { width: 1, height: 1 }, // Shadow offset for text
  textShadowRadius: 4, // Blur radius for shadow
},

description: {
  fontSize: 18, // Increased font size for readability
  color: '#fff',
  textAlign: 'center',
  marginBottom: 40,
  paddingHorizontal: 20,
  lineHeight: 24, // Increased line height for better readability
  textShadowColor: '#000', // Adding shadow for depth
  textShadowOffset: { width: 1, height: 1 }, // Shadow offset for text
  textShadowRadius: 3, // Blur radius for shadow
},

dueContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#ffffff', // Maintain a clean background
  borderRadius: 12, // Slightly more rounded corners for a modern look
  padding: 15,
  marginBottom: 20,
  elevation: 4, // Reduced elevation for a subtler shadow effect
  shadowColor: '#000', // Adding shadow for depth
  shadowOffset: { width: 0, height: 2 }, // Shadow offset
  shadowOpacity: 0.1, // Shadow opacity
  shadowRadius: 4, // Blur radius for shadow
},

dueImage: {
  width: 50, // Slightly larger image for better visibility
  height: 50, // Slightly larger image for better visibility
  marginRight: 15,
  borderRadius: 10, // Rounded corners for the image
  shadowColor: '#000', // Adding shadow for depth
  shadowOffset: { width: 0, height: 2 }, // Shadow offset
  shadowOpacity: 0.2, // Shadow opacity
  shadowRadius: 3, // Blur radius for shadow
},

dueText: {
  fontSize: 20, // Increased font size for better readability
  color: '#007BB5', // Keep the theme color
  fontWeight: 'bold',
  textShadowColor: '#ddd', // Adding subtle text shadow for depth
  textShadowOffset: { width: 1, height: 1 }, // Shadow offset
  textShadowRadius: 1, // Blur radius for shadow
},

categoriesContainer: {
  width: '100%',
  backgroundColor: '#ffffff', // Clean white background for clarity
  borderRadius: 12, // Slightly increased border radius for a modern look
  padding: 20, // Increased padding for more breathing space
  elevation: 6, // Slightly increased elevation for depth
  marginBottom: 20,
  shadowColor: '#000', // Adding shadow for depth
  shadowOffset: { width: 0, height: 2 }, // Shadow offset
  shadowOpacity: 0.1, // Shadow opacity
  shadowRadius: 4, // Blur radius for shadow
},
categoriesTitle: {
  fontSize: 26, // Slightly larger font size for emphasis
  fontWeight: 'bold',
  color: '#007BB5',
  marginBottom: 12, // Increased margin for better spacing
  textAlign: 'left',
  textShadowColor: '#ddd', // Adding shadow for depth
  textShadowOffset: { width: 1, height: 1 }, // Shadow offset
  textShadowRadius: 1, // Blur radius for shadow
},
categoriesList: {
  flexDirection: 'row',
  flexWrap: 'wrap', // Allow categories to wrap to the next line
  justifyContent: 'flex-start', // Align items to the left
},
categoryItem: {
  fontSize: 18, // Increased font size for better readability
  color: '#007BB5',
  padding: 12, // Increased padding for comfort
  marginHorizontal: 8, // Increased margin for spacing
  borderWidth: 1,
  borderColor: '#007BB5',
  borderRadius: 8, // More rounded corners for a modern look
  backgroundColor: '#f0f8ff', // Light background color for contrast
  textAlign: 'center', // Center the text within the item
  shadowColor: '#000', // Adding shadow for depth
  shadowOffset: { width: 0, height: 1 }, // Shadow offset
  shadowOpacity: 0.2, // Shadow opacity
  shadowRadius: 3, // Blur radius for shadow
},

booksContainer: {
  width: '100%',
  backgroundColor: '#ffffff', // Clean white background for clarity
  borderRadius: 12, // Slightly increased border radius for a modern look
  padding: 20, // Increased padding for more breathing space
  elevation: 6, // Slightly increased elevation for depth
  marginBottom: 20,
  shadowColor: '#000', // Adding shadow for depth
  shadowOffset: { width: 0, height: 2 }, // Shadow offset
  shadowOpacity: 0.1, // Shadow opacity
  shadowRadius: 4, // Blur radius for shadow
},
hotTitle: {
  fontSize: 26, // Slightly larger font size for emphasis
  fontWeight: 'bold',
  color: '#007BB5',
  marginBottom: 12, // Increased margin for better spacing
  textAlign: 'left',
  flexDirection: 'row',
  alignItems: 'center',
  paddingBottom: 5, // Adding padding at the bottom for separation
  borderBottomWidth: 2, // Adding a border at the bottom for distinction
  borderBottomColor: '#007BB5', // Color of the border
},
hotIcon: {
  width: 36, // Slightly larger icon for better visibility
  height: 36, // Slightly larger height
  marginRight: 12, // Increased margin for better spacing
},
bookList: {
  flexDirection: 'row',
  flexWrap: 'wrap', // Allow books to wrap to the next line if necessary
  justifyContent: 'flex-start', // Align items to the left
},
book: {
  width: 110, // Slightly increased width for better presentation
  height: 160, // Slightly increased height
  marginHorizontal: 10,
  borderRadius: 8, // Rounded corners for a softer look
  overflow: 'hidden', // Prevent overflow of content
  shadowColor: '#000', // Adding shadow for depth
  shadowOffset: { width: 0, height: 2 }, // Shadow offset
  shadowOpacity: 0.2, // Shadow opacity
  shadowRadius: 3, // Blur radius for shadow
},

eventsContainer: {
  width: '100%',
  backgroundColor: '#ffffff', // Clean white background for clarity
  borderRadius: 12, // Slightly increased border radius for a modern look
  padding: 20, // Increased padding for more breathing space
  elevation: 6, // Slightly increased elevation for depth
  marginBottom: 20,
  shadowColor: '#000', // Adding shadow for depth
  shadowOffset: { width: 0, height: 2 }, // Shadow offset
  shadowOpacity: 0.1, // Shadow opacity
  shadowRadius: 4, // Blur radius for shadow
},
eventsTitle: {
  fontSize: 26, // Slightly larger font size for emphasis
  fontWeight: 'bold',
  color: '#007BB5',
  marginBottom: 8, // Increased margin for better spacing
  textAlign: 'left',
  flexDirection: 'row',
  alignItems: 'center',
  borderBottomWidth: 2, // Adding a border at the bottom for distinction
  borderBottomColor: '#007BB5', // Color of the border
  paddingBottom: 5, // Padding at the bottom for separation
},
eventDate: {
  fontSize: 18, // Increased font size for better readability
  color: '#007BB5',
  marginTop: 5, // Added margin for separation from the title
},
eventImage: {
  width: 36, // Slightly larger width for better visibility
  height: 36, // Slightly larger height
  marginRight: 12, // Increased margin for better spacing
},
categoryImage: {
  width: 36, // Slightly larger width for better visibility
  height: 36, // Slightly larger height
  marginRight: 12, // Increased margin for better spacing
},

});

