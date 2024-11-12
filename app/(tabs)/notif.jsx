import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Modal, TouchableOpacity } from 'react-native';

// Sample notifications data with read status
const notifications = [
  { id: '1', message: 'Your book request has been approved.', details: 'Your book request for "The Great Gatsby" has been approved and is now available for pick up.', read: false },
  { id: '2', message: 'New books have been added to the library.', details: 'Check out the new arrivals in the library this week!', read: false },
  { id: '3', message: 'Your overdue book has been returned.', details: 'The overdue book "1984" has been successfully returned.', read: true },
  { id: '4', message: 'Library maintenance will occur tomorrow.', details: 'The library will be closed for maintenance from 8 AM to 12 PM.', read: true },
  { id: '5', message: 'You have a new message from the library staff.', details: 'Please check your messages for important information regarding your account.', read: false },
];

const Notif = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  // Separate notifications into unread and read
  const unreadNotifications = notifications.filter(notification => !notification.read);
  const readNotifications = notifications.filter(notification => notification.read);

  const renderNotificationItem = ({ item }) => (
    <TouchableOpacity
      style={styles.notificationItem}
      onPress={() => {
        setSelectedNotification(item);
        setModalVisible(true);
      }}
    >
      <Text style={styles.notificationText}>{item.message}</Text>
    </TouchableOpacity>
  );

  const closeModal = () => {
    setModalVisible(false);
    setSelectedNotification(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifications</Text>

      {/* Unread Notifications Section */}
      <Text style={styles.subHeader}>Unread Notifications</Text>
      <FlatList
        data={unreadNotifications}
        renderItem={renderNotificationItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.notificationList}
        ListEmptyComponent={<Text style={styles.emptyText}>No unread notifications.</Text>} // Show when there are no unread notifications
      />

      {/* Read Notifications Section */}
      <Text style={styles.subHeader}>Read Notifications</Text>
      <FlatList
        data={readNotifications}
        renderItem={renderNotificationItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.notificationList}
        ListEmptyComponent={<Text style={styles.emptyText}>No read notifications.</Text>} // Show when there are no read notifications
      />

      {/* Modal for displaying notification details */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Notification Details</Text>
            <Text style={styles.modalText}>{selectedNotification?.details}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#e0f7fa',
    borderRadius: 12,
    shadowColor: '#004d40',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 5,
  },
  header: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#007bb2',
    marginBottom: 30,
    textAlign: 'center',
    textShadowColor: '#b3e5fc',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  subHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bb2',
    marginBottom: 10,
    marginTop: 20,
  },
  notificationList: {
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  notificationItem: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    shadowColor: '#004d40',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
    borderLeftWidth: 6,
    borderLeftColor: '#007bb2',
  },
  notificationText: {
    fontSize: 18,
    color: '#0d47a1',
    lineHeight: 26,
    fontWeight: '500',
    marginVertical: 4,
    textShadowColor: '#b3e5fc',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
    marginVertical: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalView: {
    width: '90%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 6,
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#007bb2',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 18,
    color: '#004d40',
    marginBottom: 24,
    lineHeight: 24,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#007bb2',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#004d40',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  closeButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Notif;
