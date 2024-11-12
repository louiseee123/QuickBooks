import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For the question mark icon

// Sample event data for October
const eventData = [
  { date: '2024-10-01', event: "Teacher's Day", taps: [true, true, false, false] },
  { date: '2024-10-05', event: "Foundation Day", taps: [true, true, true, false] },
  { date: '2024-10-07', event: "Seminar", taps: [true, false, true, true] },
  { date: '2024-10-10', event: "Christmas Program", taps: [null, null, null, null] }, // Future event
  { date: '2024-10-12', event: "Sports Fest", taps: [true, true, false, false] },
  { date: '2024-10-15', event: "Student Orientation", taps: [false, false, true, true] },
  { date: '2024-10-20', event: "Cultural Event", taps: [null, null, null, null] }, // Future event
  { date: '2024-10-25', event: "Alumni Meet", taps: [true, false, true, true] },
  { date: '2024-10-30', event: "Halloween Party", taps: [null, null, null, null] }, // Future event
];

const Credits = () => {
  const [credits, setCredits] = useState(10); // Sample credit value
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false); // For the credit system popup

  // Update credits based on taps
  useEffect(() => {
    let totalCredits = 0;
    eventData.forEach(event => {
      totalCredits += event.taps.filter(tap => tap === true).length; // 1 credit per tap
    });
    setCredits(totalCredits);
  }, []);

  // Function to open the popup for an event
  const openEventModal = (event) => {
    setSelectedEvent(event);
    setModalVisible(true);
  };

  // Function to open the credit system info
  const openInfoModal = () => {
    setInfoVisible(true);
  };

  // Function to render the calendar days for October
  const renderCalendar = () => {
    const daysInOctober = 31;
    const daysArray = [];
    const startDay = 2; // Assuming October starts on a Tuesday (index 2)
    const today = new Date().getDate(); // Get the current day of the month

    // Add empty slots for days before October starts
    for (let i = 0; i < startDay; i++) {
      daysArray.push(<View key={`empty-${i}`} style={styles.emptyDayBox}></View>);
    }

    for (let day = 1; day <= daysInOctober; day++) {
      const event = eventData.find(e => new Date(e.date).getDate() === day);
      const isSunday = new Date(2024, 9, day).getDay() === 0; // Check if Sunday
      const isFutureEvent = event && new Date(event.date).getDate() > today; // Check if the event is in the future

      daysArray.push(
        <TouchableOpacity
          key={day}
          style={[
            styles.dayBox,
            isSunday ? styles.sundayBox : null,
            event ? (isFutureEvent ? styles.futureEvent : styles.attended) : null,
          ]}
          onPress={() => event && openEventModal(event)}
        >
          <Text style={styles.dayText}>{day}</Text>
        </TouchableOpacity>
      );
    }

    // Ensure the last row is correctly filled
    const emptyDaysNeeded = (7 - (daysArray.length % 7)) % 7;
    for (let i = 0; i < emptyDaysNeeded; i++) {
      daysArray.push(<View key={`empty-end-${i}`} style={styles.emptyDayBox}></View>);
    }

    return (
      <View style={styles.calendarGrid}>
        {daysArray}
      </View>
    );
  };

  // Render popup content for the selected event
  const renderPopup = () => {
    if (!selectedEvent) return null;

    return (
      <View style={styles.popupContainer}>
        <Text style={styles.popupTitle}>{selectedEvent.event}</Text>
        <View style={styles.tapContainer}>
          {['Morning In', 'Morning Out', 'Afternoon In', 'Afternoon Out'].map((label, index) => (
            <View key={index} style={styles.tapRow}>
              <Text style={styles.tapLabel}>{label}:</Text>
              <View
                style={[
                  styles.tapCircle,
                  selectedEvent.taps[index] === true
                    ? styles.greenCircle
                    : selectedEvent.taps[index] === false
                    ? styles.redCircle
                    : styles.grayCircle,
                ]}
              />
            </View>
          ))}
        </View>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setModalVisible(false)}
        >
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Render the credit system info popup
  const renderInfoPopup = () => (
    <Modal transparent={true} visible={infoVisible} animationType="slide">
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <Text style={styles.popupTitle}>How the Credit System Works</Text>
          <Text style={styles.infoText}>
            Each event has 4 required taps (Morning In/Out and Afternoon In/Out). Each successful tap gives you 1 credit.
            If your credits fall below 10, your borrowing privileges will be temporarily revoked until you gain enough credits by attending future events.
          </Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setInfoVisible(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Profile Picture */}
      <View style={styles.profileContainer}>
        <Image source={require('..//assets/icons/lou.png')} style={styles.profileImage} />
        <Text style={styles.profileName}>Louise</Text>
        {/* Question mark for credit system info - Moved to the far right */}
        <TouchableOpacity onPress={openInfoModal} style={styles.questionMark}>
          <Ionicons name="ios-help-circle-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Top section for credits */}
      <View style={[styles.creditContainer, credits < 10 && styles.lowCredit]}>
        <Text style={styles.creditText}>Your Credits: {credits}</Text>
        {credits < 10 && (
          <Text style={styles.warningText}>
            Your borrowing privileges are temporarily revoked until you gain enough credits.
          </Text>
        )}
      </View>

      {/* Calendar section for October */}
      <View style={styles.calendarContainer}>
        <Text style={styles.calendarTitle}>October 2024 Event Calendar</Text>
        {renderCalendar()}
      </View>

      {/* Modal for event taps */}
      <Modal transparent={true} visible={modalVisible} animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>{renderPopup()}</View>
        </View>
      </Modal>

      {/* Credit system info popup */}
      {renderInfoPopup()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#007BB5', // Updated background color
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'space-between', // To position name and question mark at the ends
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2, // Add this line for the outline
    borderColor: '#fff', // Choose your desired color for the outline
},

profileName: {
  right:-10,
  fontSize: 22,
  fontWeight: 'bold',
  color: '#fff',
  flex: 1, // Take available space, pushing the question mark to the right
},
questionMark: {
  marginLeft: 'auto', // Move to the far right
  backgroundColor: 'rgba(255, 204, 0, 0.9)', // Semi-transparent yellow for visibility
  padding: 8, // Slightly reduced padding for a more compact look
  borderRadius: 15, // Rounded corners for a softer look
  borderWidth: 2, // Add a defined border
  borderColor: '#FFA500', // A more vibrant orange for contrast
  shadowColor: '#000', // Shadow color
  shadowOffset: { width: 0, height: 4 }, // Shadow offset
  shadowOpacity: 0.5, // Slight opacity for depth
  shadowRadius: 6, // Blur radius for shadow
  elevation: 5, // Elevation for Android
  width: 35, // Fixed width for consistency
  height: 35, // Fixed height for consistency
  justifyContent: 'center', // Center the content
  alignItems: 'center', // Center the content
},

  creditContainer: {
    padding: 20,
    backgroundColor: '#87CEEB',
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 }, // Increased shadow offset for a more prominent shadow
    shadowOpacity: 0.3, // Slightly increased opacity
    shadowRadius: 6, // Increased radius for a softer shadow
    elevation: 6, // Increased elevation for Android
    borderWidth: 1, // Add a border width
    borderColor: '#00BFFF', // Border color for better definition
    borderStyle: 'solid', // Solid border style
    overflow: 'hidden', // Ensures rounded corners apply to shadow
},

  lowCredit: {
    backgroundColor: '#FF6347', // Red for low credits
  },
  creditText: {
    fontSize: 26,
    color: '#fff',
    textAlign: 'center',
  },
  warningText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
  },
  calendarContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center', // Center the content
  },
  calendarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center', // Center the grid
  },
  dayBox: {
    width: '13%', // 7 columns (100 / 7 = ~14.3)
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyDayBox: {
    width: '13%',
    height: 50,
  },
  sundayBox: {
    backgroundColor: '#f0f0f0', // Different color for Sundays
  },
  attended: {
    backgroundColor: '#90EE90', // Light green for attended events
  },
  futureEvent: {
    backgroundColor: '#FFFF00', // Yellow for future events
  },
  dayText: {
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  popupContainer: {
    alignItems: 'center',
  },
  popupTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  tapContainer: {
    marginVertical: 10,
  },
  tapRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tapLabel: {
    marginRight: 10,
  },
  tapCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginLeft: 5,
  },
  greenCircle: {
    backgroundColor: 'green',
  },
  redCircle: {
    backgroundColor: 'red',
  },
  grayCircle: {
    backgroundColor: 'gray',
  },
  closeButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#007BB5',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
  },
  infoText: {
    marginVertical: 10,
    textAlign: 'center',
  },
});

export default Credits;
