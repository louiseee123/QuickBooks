  import React, { useState, useRef } from 'react';
  import { Text, View, Pressable, StyleSheet, Image, TextInput, Modal, Dimensions } from 'react-native';
  import { useRouter } from 'expo-router';
  import { LinearGradient } from 'expo-linear-gradient';
  import { Picker } from '@react-native-picker/picker';
  import { client, databases, databaseId, firstname, lastname, gender, yearlevel, course, email, password } from '../src/appwrite'; // Adjust the path if necessary

  

  const { width } = Dimensions.get('window');

  export default function SignUpScreen() {
    const router = useRouter();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');
    const [yearLevel, setYearLevel] = useState('');
    const [course, setCourse] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const emailInputRef = useRef(null);

    const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
    };

    const handleSignUp = async (userData) => {
      console.log('Field IDs:', {
        firstnameFieldID,
        lastnameFieldID,
        genderFieldID,
        yearlevelFieldID,
        emailFieldID,
        passwordFieldID,
        courseFieldID
      });
      console.log('User Data:', userData);
    
      try {
        const response = await databases.createDocument(
          databaseId,
          '672324310013a37e1906',
          'unique()',
          {
            [firstnameFieldID]: userData.firstname,
            [lastnameFieldID]: userData.lastname,
            [genderFieldID]: userData.gender,
            [yearlevelFieldID]: userData.yearlevel,
            [emailFieldID]: userData.email,
            [passwordFieldID]: userData.password,
            [courseFieldID]: userData.course,
          }
        );
    
        console.log('User registered successfully:', response);
      } catch (error) {
        console.error('Error registering user:', error);
      }
    };
    
  
    const closeModal = () => {
      setModalVisible(false);
      router.push('/auth/login'); // Redirect to login after signing up
    };
    
    return (
      <LinearGradient colors={['#003366', '#007BB5', '#0099CC']} style={styles.container}>
        <View style={styles.topContainer}>
          <Image style={styles.logo} source={require("../../assets/icons/logos.png")} />
          <Text style={styles.welcomeText}>Create Account</Text>
          <Text style={styles.description}>Please fill in the details to sign up</Text>
        </View>

        <View style={styles.formContainer}>
          <TextInput 
            style={styles.input} 
            placeholder="First Name" 
            value={firstName} 
            onChangeText={setFirstName} 
          />
          <TextInput 
            style={styles.input} 
            placeholder="Last Name" 
            value={lastName} 
            onChangeText={setLastName} 
          />
          <TextInput 
            ref={emailInputRef}
            style={styles.input} 
            placeholder="Email" 
            value={email} 
            onChangeText={setEmail} 
          />
          <View style={styles.passwordContainer}>
            <TextInput 
              style={styles.passwordInput} 
              placeholder="Password" 
              secureTextEntry={!passwordVisible} 
              value={password} 
              onChangeText={setPassword} 
            />
            <Pressable onPress={togglePasswordVisibility} style={styles.passwordToggleContainer}>
              <Image 
                style={styles.passwordToggle} 
                source={passwordVisible 
                  ? require("../../assets/icons/show.png") 
                  : require("../../assets/icons/hide.png")} 
              />
            </Pressable>
          </View>

          <Text style={styles.label}>Gender:</Text>
          <View style={styles.genderContainer}>
            <View style={styles.genderOptions}>
              <Pressable onPress={() => setGender('Male')} style={[styles.genderButton, gender === 'Male' && styles.selectedGender]}>
                <Text>Male</Text>
              </Pressable>
              <Pressable onPress={() => setGender('Female')} style={[styles.genderButton, gender === 'Female' && styles.selectedGender]}>
                <Text>Female</Text>
              </Pressable>
              <Pressable onPress={() => setGender('Other')} style={[styles.genderButton, gender === 'Other' && styles.selectedGender]}>
                <Text>Other</Text>
              </Pressable>
            </View>
          </View>

          <Text style={styles.label}>Year Level:</Text>
          <Picker
            selectedValue={yearLevel}
            style={styles.picker}
            onValueChange={(itemValue) => setYearLevel(itemValue)}
          >
            <Picker.Item label="Select Year Level" value="" />
            <Picker.Item label="1st Year" value="1st Year" />
            <Picker.Item label="2nd Year" value="2nd Year" />
            <Picker.Item label="3rd Year" value="3rd Year" />
            <Picker.Item label="4th Year" value="4th Year" />
          </Picker>

          <Text style={styles.label}>Course:</Text>
          <Picker
            selectedValue={course}
            style={styles.picker}
            onValueChange={(itemValue) => setCourse(itemValue)}
          >
            <Picker.Item label="Select Course" value="" />
            <Picker.Item label="Secondary Education" value="Computer Science" />
            <Picker.Item label="Information Technology" value="Information Technology" />
            <Picker.Item label="Hospitality Management" value="Business Administration" />
            <Picker.Item label="Primary Education" value="Engineering" />
          </Picker>

          <Pressable style={styles.signUpButton} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </Pressable>
          <Pressable onPress={() => router.push('/auth/login')}>
            <Text style={styles.createAccount}>Already have an account? Log in</Text>
          </Pressable>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>{alertMessage}</Text>
              <Pressable style={styles.modalButton} onPress={closeModal}>
                <Text style={styles.modalButtonText}>OK</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </LinearGradient>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    topContainer: {
      alignItems: 'center',
      marginBottom: 20,
    },
    logo: {
      width: 120,           // Increased the width
  height: 120,          // Increased the height
  marginBottom: 15,
  borderRadius: 60,     // Keep this to maintain circular shape
  borderWidth: 3,       // Added borderWidth for the outline
  borderColor: '#fff',
    },
    welcomeText: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
    description: {
      fontSize: 16,
      color: '#FFFFFF',
      textAlign: 'center',
    },
    formContainer: {
      width: '90%',
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      padding: 20,
      borderRadius: 15,
      borderWidth: 1,
      borderColor: '#FFFFFF',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 10,
      alignItems: 'center',
      maxHeight: 550, // Set a max height for the container
    },
    input: {
      width: '100%',
      height: 40,
      borderColor: '#FFFFFF',
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 15,
      backgroundColor: '#fff',
      marginBottom: 10,
    },
    passwordContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      position: 'relative',
    },
    passwordInput: {
      flex: 1,
      height: 40,
      borderColor: '#FFFFFF',
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 15,
      backgroundColor: '#fff',
      marginBottom: 5,
    },
    passwordToggleContainer: {
      position: 'absolute',
      right: 15,
      top: -5,
      height: '100%',
      justifyContent: 'center',
    },
    passwordToggle: {
      width: 30,
      height: 30,
    },
    genderContainer: {
      marginBottom: 5,
      width: '100%',
    },
    genderOptions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    genderButton: {
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 15,
      marginRight: 10,
      flex: 1,
      alignItems: 'center',
    },
    selectedGender: {
      backgroundColor: '#007BB5',
      borderWidthL:2,
    },
    label: {
      color: '#FFFFFF',
      marginBottom: 5,
      alignSelf: 'flex-start',
      width: '100%',
    },
    picker: {
      width: '100%',
      height: 50,
      borderColor: '#FFFFFF',
      borderWidth: 1,
      borderRadius: 10,
      backgroundColor: '#fff',
      marginBottom: 5,
    },
    signUpButton: {
      backgroundColor: '#007BB5',
      paddingVertical: 9,
      paddingHorizontal: 30,
      marginTop: 10,
      width: '100%',
      borderWidth: 2,
    borderRadius: 20,
    borderColor: '#FFFFFF',
    height: 50,
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
      textAlign: 'center',
    },
    createAccount: {
      color: '#FFFFFF',
      marginTop: 10,
      textAlign: 'center',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
      width: '80%',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    modalButton: {
      backgroundColor: '#007BB5',
      borderRadius: 5,
      padding: 10,
    },
    modalButtonText: {
      color: '#FFFFFF',
    },
  });
