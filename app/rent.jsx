import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Rent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rent a Book</Text>
      <Text style={styles.description}>Choose a book to rent.</Text>
      {/* Add your rental logic or UI here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e6f2ff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#004d99',
  },
  description: {
    fontSize: 16,
    color: '#333',
  },
});

export default Rent;
