import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Modal, Pressable } from 'react-native';
import { useRouter } from 'expo-router';  // Import useRouter for navigation

// Expanded list of books with descriptions
const initialBooks = [
  { id: '1', title: 'The Great Gatsby', description: 'A classic novel set in the Jazz Age, exploring themes of wealth and social change.' },
  { id: '2', title: 'To Kill a Mockingbird', description: 'A Pulitzer Prize-winning novel about racial injustice in the Deep South.' },
  { id: '3', title: '1984', description: 'A dystopian novel about a totalitarian regime that uses surveillance to control its citizens.' },
  { id: '4', title: 'Pride and Prejudice', description: 'A romantic novel that critiques the British landed gentry at the end of the 18th century.' },
  { id: '5', title: 'The Catcher in the Rye', description: 'A novel about a young man’s experiences in New York City and his struggle with identity and belonging.' },
  { id: '6', title: 'Moby Dick', description: 'An epic tale of a sea captain’s obsessive quest to kill a giant white whale.' },
  { id: '7', title: 'The Hobbit', description: 'A fantasy novel about a hobbit’s adventurous journey to help reclaim a stolen treasure.' },
  { id: '8', title: 'War and Peace', description: 'A historical novel that follows the lives of several families during the Napoleonic era.' },
  { id: '9', title: 'Jane Eyre', description: 'A novel that tells the story of a young orphaned girl who overcomes hardship and finds love.' },
  { id: '10', title: 'The Lord of the Rings', description: 'An epic fantasy trilogy about the battle between good and evil in a mythical world.' },
  { id: '11', title: 'Brave New World', description: 'A dystopian novel set in a futuristic world characterized by technological advancements and social stratification.' },
  { id: '12', title: 'Fahrenheit 451', description: 'A novel that presents a future society where books are banned and "firemen" burn any that are found.' },
  { id: '13', title: 'The Picture of Dorian Gray', description: 'A story about a young man who remains eternally youthful while a portrait of him ages, reflecting his moral decay.' },
  { id: '14', title: 'The Alchemist', description: 'A philosophical book that follows a shepherd\'s journey to realize his personal legend and fulfill his dreams.' },
  { id: '15', title: 'The Fault in Our Stars', description: 'A novel about two teenagers who meet in a cancer support group and develop a deep bond.' },
  { id: '16', title: 'Little Women', description: 'A coming-of-age story about the lives of the four March sisters as they navigate love, loss, and ambition.' },
  { id: '17', title: 'The Chronicles of Narnia', description: 'A series of seven fantasy novels that follow the adventures of children in the magical land of Narnia.' },
  { id: '18', title: 'The Kite Runner', description: 'A story of friendship and redemption set against the backdrop of a changing Afghanistan.' },
  { id: '19', title: 'Catch-22', description: 'A satirical novel set during World War II that explores the absurdity of war through the experiences of a U.S. Army Air Forces B-25 bombardier.' },
  { id: '20', title: 'The Bell Jar', description: 'A semi-autobiographical novel that follows a young woman’s descent into mental illness and her journey toward recovery.' },
  // Add more books if necessary
];

const Books = () => {
  const router = useRouter();  // Use the useRouter hook from Expo Router
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState(initialBooks);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredBooks = initialBooks.filter(book =>
      book.title.toLowerCase().includes(query.toLowerCase())
    );
    setBooks(filteredBooks);
  };

  const handlePress = (book) => {
    setSelectedBook(book);
  };

  const handleRent = () => {
    if (selectedBook) {
      if (selectedBook.title === 'The Great Gatsby') {
        router.push('/gatsby');  // Direct to gatsby.jsx
      } else if (selectedBook.title === 'Moby Dick') {
        router.push('/moby');    // Direct to moby.jsx
      } else if (selectedBook.title === 'To Kill a Mockingbird') {
        router.push('/mock');    // Direct to mock.jsx
      } else {
        router.push('/rent');    // Direct to rent.jsx for all other books
      }
    }
    setSelectedBook(null);  // Close the modal after navigating
  };

  const renderBookItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.bookItem} 
      onPress={() => handlePress(item)}
    >
      <Text style={styles.bookTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Explore Our Collection</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for a book..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={books}
        renderItem={renderBookItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.bookList}
      />
      
      {/* Modal for book details */}
      {selectedBook && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={!!selectedBook}
          onRequestClose={() => setSelectedBook(null)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedBook.title}</Text>
              <Text style={styles.modalDescription}>{selectedBook.description}</Text>
              <View style={styles.buttonContainer}>
                <Pressable style={styles.rentButton} onPress={handleRent}>
                  <Text style={styles.buttonText}>Rent</Text>
                </Pressable>
              </View>
              <Pressable style={styles.backButton} onPress={() => setSelectedBook(null)}>
                <Text style={styles.buttonText}>Back</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20, // Maintain padding for a clean layout
    backgroundColor: '#007BB5', // Main background color
    justifyContent: 'flex-start', // Align items to the top
    alignItems: 'stretch', // Allow items to stretch across the full width
  },
  header: {
    fontSize: 36, // Increased font size for better visibility
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 25, // Increased margin for more space below the header
    textAlign: 'center',
    textShadowColor: '#000', // Adding shadow for depth
    textShadowOffset: { width: 1, height: 1 }, // Shadow offset
    textShadowRadius: 5, // Blur radius for shadow
  },

  searchBar: {
    height: 50, // Slightly increased height for a more spacious feel
    borderColor: '#99c2ff', // Light blue border
    borderWidth: 2,
    borderRadius: 25, // Increased border radius for a softer look
    paddingHorizontal: 16,
    marginBottom: 24,
    backgroundColor: '#ffffff', // White background for contrast
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 4, // Blur radius for shadow
    elevation: 5, // Elevation for Android
  },

  bookList: {
    paddingBottom: 20,
    paddingHorizontal: 16, // Added horizontal padding for better alignment
},
bookItem: {
    padding: 20, // Increased padding for a more spacious feel
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    borderLeftWidth: 8,
    borderLeftColor: '#80bfff',
    shadowColor: '#000', // Shadow color for depth
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.2, // Slight shadow opacity for subtle depth
    shadowRadius: 4, // Blur radius for shadow
    elevation: 3, // Elevation for Android
},
bookTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#004d99',
    marginBottom: 4, // Added margin below for spacing from other elements
    textAlign: 'left', // Ensures text alignment is consistent
},

modalContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.7)', // Darker overlay for better visibility
},
modalContent: {
  width: 320,
  padding: 20,
  backgroundColor: '#ffffff',
  borderRadius: 15, // Slightly increased radius for softer corners
  alignItems: 'center',
  shadowColor: '#000', // Shadow color for depth
  shadowOffset: { width: 0, height: 2 }, // Shadow offset
  shadowOpacity: 0.3, // Increased opacity for a more pronounced shadow
  shadowRadius: 6, // Blur radius for shadow
  elevation: 5, // Elevation for Android
},
modalTitle: {
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 5,
  color: '#007BB5', // Color to match your theme
},
modalDescription: {
  marginBottom: 20,
  textAlign: 'center',
  fontSize: 16, // Slightly increased font size for better readability
  color: '#555', // A softer color for description text
},

buttonContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  marginTop: 20, // Added margin for better separation from other elements
},
rentButton: {
  backgroundColor: '#80bfff',
  paddingVertical: 14, // Slightly larger for better touch area
  borderRadius: 12, // Softer edges for a modern look
  marginBottom: 10,
  width: '48%', // Adjusted width for better spacing
  alignItems: 'center',
  elevation: 5, // Increased elevation for a more pronounced shadow
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 }, // Slightly deeper shadow
  shadowOpacity: 0.2,
  shadowRadius: 6,
  borderWidth: 1, // Added border for better definition
  borderColor: '#007BB5', // Border color matching theme
  left:70,
},
backButton: {
  backgroundColor: '#f2f2f2',
  paddingVertical: 14, // Consistent padding with the rent button
  borderRadius: 12, // Softer edges for a modern look
  marginBottom: 10,
  width: '48%', // Adjusted width for better spacing
  alignItems: 'center',
  elevation: 5, // Increased elevation for a more pronounced shadow
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 }, // Slightly deeper shadow
  shadowOpacity: 0.2,
  shadowRadius: 6,
  borderWidth: 1, // Added border for better definition
  borderColor: '#80bfff', // Border color to distinguish from background
},
buttonText: {
  fontSize: 18, // Slightly larger for improved readability
  color: '#004d99',
  fontWeight: 'bold', // Emphasized text
  textAlign: 'center', // Ensure text is centered
},

});

export default Books;
