import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ProgressBarAndroid } from 'react-native';

const History = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([
    {
      id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      dateBorrowed: '2024-09-15',
      returnDate: '2024-10-01', // Reserved
      status: 'Reserved',
      progress: .2, // 70% progress for illustration
    },
    {
      id: 2,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      dateBorrowed: '2024-08-12',
      returnDate: '2024-08-28', // Returned
      status: 'Returned',
      progress: 1,
    },
    {
      id: 3,
      title: '1984',
      author: 'George Orwell',
      dateBorrowed: '2024-07-01',
      returnDate: '2024-07-15', // Overdue
      status: 'Overdue',
      progress: 1,
    },
    {
      id: 4,
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      dateBorrowed: '2024-09-05',
      returnDate: '2024-09-20', // Returned
      status: 'Returned',
      progress: 1,
    },
    {
      id: 5,
      title: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
      dateBorrowed: '2024-09-25',
      returnDate: '2024-10-10', // Still borrowed
      status: 'Borrowed',
      progress: 1,
    },
  ]);

  const handleBorrowAgain = (book) => {
    console.log(`Borrowed Again: ${book.title}`);
    // Here you would add the logic to handle borrowing the book again
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Borrowing History</Text>
      {borrowedBooks.length > 0 ? (
        borrowedBooks.map((book) => (
          <View key={book.id} style={styles.bookContainer}>
            <Text style={styles.title}>{book.title}</Text>
            <Text style={styles.author}>by {book.author}</Text>
            <Text style={styles.dates}>Borrowed: {book.dateBorrowed}</Text>
            <Text style={styles.dates}>Returned: {book.returnDate}</Text>
            <Text style={styles.status}>Status: {book.status}</Text>

            {book.title === 'The Great Gatsby' && (
              <View style={styles.progressContainer}>
                <Text style={styles.progressText}>Borrowing in Progress...</Text>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${book.progress * 100}%` }]} />
                </View>
              </View>
            )} 
            {book.title === 'To Kill a Mockingbird' && (
                <View style={styles.progressContainer}>
                  <Text style={styles.progressText}>Returned</Text>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${book.progress * 100}%` }]} />
                  </View>
                </View>
              )}
               {book.title === '1984' && (
                <View style={styles.progressContainer}>
                  <Text style={styles.progressText}>Returned</Text>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${book.progress * 100}%` }]} />
                  </View>
                </View>
              )}
               {book.title === 'Pride and Prejudice' && (
                <View style={styles.progressContainer}>
                  <Text style={styles.progressText}>Returned</Text>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${book.progress * 100}%` }]} />
                  </View>
                </View>
              )}
               {book.title === 'The Catcher in the Rye' && (
                <View style={styles.progressContainer}>
                  <Text style={styles.progressText}>Returned</Text>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${book.progress * 100}%` }]} />
                  </View>
                </View>
              )}

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleBorrowAgain(book)}
              disabled={book.status === 'Reserved'} // Disable if the book is reserved
            >
              <Text style={styles.buttonText}>
                {book.status === 'Reserved' ? 'Cannot Borrow Again' : 'Borrow Again'}
              </Text>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text style={styles.noHistory}>You haven't borrowed any books yet.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#007BB5', // Matches background color of the app
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  bookContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007BB5',
  },
  author: {
    fontSize: 16,
    color: '#333',
  },
  dates: {
    fontSize: 14,
    color: '#666',
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'orange', // Use a distinct color for status
  },
  button: {
    marginTop: 10,
    backgroundColor: '#007BB5',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  noHistory: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginTop: 50,
  },
  progressContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  progressText: {
    color: '#333',
    fontSize: 14,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#eee',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 5,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007BB5',
  },
});

export default History;
