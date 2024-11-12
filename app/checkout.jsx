import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, ActivityIndicator, ScrollView, Modal, TextInput } from 'react-native';
import { useRouter } from 'expo-router';

const Checkout = () => {
    const [loadingCheckout, setLoadingCheckout] = useState(false);
    const [receiptVisible, setReceiptVisible] = useState(false);
    const [pickupDate, setPickupDate] = useState('');
    const [outrageousDateVisible, setOutrageousDateVisible] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false); // Disable button state
    const router = useRouter();

    const formatDate = (date) => {
        const digits = date.replace(/\D/g, '');

        if (digits.length <= 4) return digits; // Year
        if (digits.length <= 6) return `${digits.slice(0, 4)}-${digits.slice(4)}`; // Year-Month
        return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6, 8)}`; // Year-Month-Day
    };

    const handleDateChange = (text) => {
        const formattedDate = formatDate(text);
        setPickupDate(formattedDate);
    };

    const isOutrageousDate = (date) => {
        const currentDate = new Date();
        const selectedDate = new Date(date);
        // Check if the date is more than 10 years in the future or in the past
        return (selectedDate > new Date(currentDate.getFullYear() + 10, currentDate.getMonth(), currentDate.getDate()) ||
                selectedDate < new Date(currentDate.getFullYear() - 10, currentDate.getMonth(), currentDate.getDate()));
    };

    const handleConfirmRent = async () => {
        if (isOutrageousDate(pickupDate)) {
            setOutrageousDateVisible(true);
            return;
        }

        setLoadingCheckout(true);
        setButtonDisabled(true); // Disable the button to prevent multiple clicks
        setTimeout(() => {
            setLoadingCheckout(false);
            setReceiptVisible(true);
        }, 2000); // Simulated delay of 2 seconds
    };

    const handleCancel = () => {
        router.back();
    };

    const handleCloseReceipt = () => {
        setReceiptVisible(false);
        router.push('/');
    };

    const handleCloseOutrageousPopup = () => {
        setOutrageousDateVisible(false);
        router.push('/'); // Redirect to home after pressing OK
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Checkout</Text>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.summaryContainer}>
                    <Text style={styles.summaryText}>You are about to rent:</Text>
                    <Text style={styles.bookTitle}>The Great Gatsby</Text>
                    <Text style={styles.author}>by F. Scott Fitzgerald</Text>
                </View>

                <View style={styles.detailsContainer}>
                    <Text style={styles.detailsTitle}>Rental Details</Text>
                    <Text style={styles.detailsText}>Pick-up Date:</Text>
                    <TextInput
                        style={styles.dateInput}
                        placeholder="YYYY-MM-DD"
                        value={pickupDate}
                        onChangeText={handleDateChange}
                        maxLength={10} // Restrict input length to 10 characters
                    />
                    <Text style={styles.detailsText}>Return Date: {pickupDate ? new Date(new Date(pickupDate).getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString() : ''}</Text>
                </View>
                
                <View style={styles.confirmationContainer}>
                    <Text style={styles.confirmationText}>Please confirm your rental.</Text>
                </View>
            </ScrollView>

            {loadingCheckout ? (
                <ActivityIndicator size="large" color="#007BB5" style={styles.loadingIndicator} />
            ) : (
                <View style={styles.buttonContainer}>
                    <Pressable
                        style={[styles.confirmButton, buttonDisabled && styles.disabledButton]} // Apply disabled style
                        onPress={handleConfirmRent}
                        disabled={buttonDisabled} // Disable button if clicked
                    >
                        <Text style={styles.buttonText}>Confirm Rent</Text>
                    </Pressable>
                    <Pressable style={styles.cancelButton} onPress={handleCancel}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </Pressable>
                </View>
            )}

            {/* Receipt Modal */}
            <Modal
                visible={receiptVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={handleCloseReceipt}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.receiptContainer}>
                        <Text style={styles.receiptTitle}>Receipt</Text>
                        <Text style={styles.receiptText}>Book Title: The Great Gatsby</Text>
                        <Text style={styles.receiptText}>Pick-up Date: {pickupDate}</Text>
                        <Text style={styles.receiptText}>Return Date: {pickupDate ? new Date(new Date(pickupDate).getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString() : ''}</Text>
                        <Pressable style={styles.closeButton} onPress={handleCloseReceipt}>
                            <Text style={styles.buttonText}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            {/* Outrageous Date Popup */}
            <Modal
                visible={outrageousDateVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={handleCloseOutrageousPopup}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.receiptContainer}>
                        <Text style={styles.receiptTitle}>Invalid Date</Text>
                        <Text style={styles.receiptText}>That won't work, please try again.</Text>
                        <Text style={styles.receiptText}>Please present your school ID.</Text> {/* Message about ID */}
                        <Pressable style={styles.closeButton} onPress={handleCloseOutrageousPopup}>
                            <Text style={styles.buttonText}>OK</Text>
                        </Pressable>
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
        padding: 20,
    },
    title: {
        fontSize: 28,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 30,
    },
    summaryContainer: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        width: '100%',
        marginBottom: 15,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
    },
    summaryText: {
        fontSize: 20,
        color: '#333',
        marginBottom: 10,
    },
    bookTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    author: {
        fontSize: 18,
        color: '#666',
        marginBottom: 10,
    },
    detailsContainer: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        width: '100%',
        marginBottom: 15,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
    },
    detailsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    detailsText: {
        fontSize: 16,
        color: '#666',
        marginBottom: 5,
    },
    dateInput: {
        backgroundColor: '#f0f0f0',
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginVertical: 5,
        fontSize: 16,
        width: '100%',
    },
    confirmationContainer: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        width: '100%',
        marginBottom: 15,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        alignItems: 'center',
    },
    confirmationText: {
        fontSize: 18,
        color: '#333',
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    confirmButton: {
        backgroundColor: '#ff6f61',
        padding: 15,
        borderRadius: 30,
        width: '48%',
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#ff6f61',
        padding: 15,
        borderRadius: 30,
        width: '48%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    loadingIndicator: {
        marginTop: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    receiptContainer: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        width: '80%',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
    },
    receiptTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    receiptText: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
        textAlign: 'center',
    },
    closeButton: {
        backgroundColor: '#007BB5',
        padding: 10,
        borderRadius: 30,
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
    },
    disabledButton: {
        backgroundColor: '#ccc', // Style for disabled button
    },
});

export default Checkout;
