import React, { useState } from 'react';
import { View, Text, Image, Pressable, Modal, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

const Gatsby = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [loadingAvailability, setLoadingAvailability] = useState(false);
    const [loadingCheckout, setLoadingCheckout] = useState(false);
    const router = useRouter();

    const handleCheckAvailability = async () => {
        setLoadingAvailability(true); // Start loading for availability check
        // Simulate a network request for checking availability
        setTimeout(() => {
            setLoadingAvailability(false); // Stop loading after check
            setModalVisible(true); // Show modal when availability is checked
        }, 2000); // Simulated delay of 2 seconds
    };

    const handleRent = async () => {
        setLoadingCheckout(true); // Start loading for checkout
        // Simulate a network request for proceeding to checkout
        setTimeout(() => {
            setLoadingCheckout(false); // Stop loading after checkout process
            setModalVisible(false); // Close the modal
            router.push('/checkout'); // Navigate to checkout
        }, 2000); // Simulated delay of 2 seconds
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Image source={require('..//assets/images/gatsby.png')} style={styles.bookImage} />
                <Text style={styles.title}>The Great Gatsby</Text>
                <Text style={styles.author}>by F. Scott Fitzgerald</Text>
                <Text style={styles.publication}>Published: 1925</Text>
                <Text style={styles.synopsis}>
                    Set in the Roaring Twenties, *The Great Gatsby* is a story of the enigmatic Jay Gatsby as he pursues wealth, love, and 
                    the American Dream, all centered around his obsession with Daisy Buchanan.
                </Text>
            </ScrollView>

            <Pressable style={styles.checkButton} onPress={handleCheckAvailability}>
                <Text style={styles.buttonText}>Check Availability</Text>
            </Pressable>

            {/* Modal for Availability Check */}
            <Modal
                transparent={true}
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)} // Close modal on back button press
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {loadingAvailability ? (
                            <View style={styles.loadingContainer}>
                                <ActivityIndicator size="large" color="#007BB5" />
                                <Text style={styles.modalText}>Checking availability...</Text>
                            </View>
                        ) : (
                            <>
                                <Text style={styles.modalText}>Book is Available. Rent now?</Text>
                                <Pressable style={styles.rentButton} onPress={handleRent}>
                                    {loadingCheckout ? (
                                        <ActivityIndicator size="small" color="#fff" />
                                    ) : (
                                        <Text style={styles.buttonText}>Rent</Text>
                                    )}
                                </Pressable>
                                <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
                                    <Text style={styles.buttonText}>Close</Text>
                                </Pressable>
                            </>
                        )}
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#007BB5',
    },
    contentContainer: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bookImage: {
        width: 250,
        height: 350,
        resizeMode: 'contain',
        marginBottom: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#fff',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#ffffff',
        marginBottom: 8,
    },
    author: {
        fontSize: 20,
        textAlign: 'center',
        color: '#f1f1f1',
        marginBottom: 5,
        fontWeight: '600',
    },
    publication: {
        fontSize: 16,
        textAlign: 'center',
        color: '#cccccc',
        marginBottom: 20,
        fontStyle: 'italic',
    },
    synopsis: {
        fontSize: 18,
        color: '#e0e0e0',
        textAlign: 'justify',
        paddingHorizontal: 20,
        marginBottom: 30,
        lineHeight: 24,
        textAlign: 'center',
    },
    checkButton: {
        backgroundColor: '#28a745',
        borderColor: '#ffffff',
        borderWidth: 2,
        borderRadius: 30,
        paddingVertical: 12,
        paddingHorizontal: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        bottom:40,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 24,
        alignItems: 'center',
    },
    loadingContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    rentButton: {
        backgroundColor: '#007BB5',
        paddingVertical: 12,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
        marginVertical: 5,
    },
    closeButton: {
        backgroundColor: '#ff5252',
        paddingVertical: 12,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
        marginVertical: 5,
    },
});

export default Gatsby;
