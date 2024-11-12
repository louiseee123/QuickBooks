// LoginScreen.jsx
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, Modal, Pressable, Dimensions, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import LoginForm from '../components/loginform';

const { width, height } = Dimensions.get('window');
const particles = Array.from({ length: 10 });

export default function LoginScreen() {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const animations = particles.map(() => ({
    x: new Animated.Value(Math.random() * width),
    y: new Animated.Value(Math.random() * height),
    opacity: new Animated.Value(0.2 + Math.random() * 1),
    scale: new Animated.Value(1 + Math.random() * 5),
  }));

  useEffect(() => {
    animations.forEach((anim) => {
      startFloatingAnimation(anim);
    });
  }, []);

  const startFloatingAnimation = (anim) => {
    anim.y.setValue(-100);
    anim.x.setValue(Math.random() * width * 1.5 - width * 0.25);
    anim.opacity.setValue(0.1 + Math.random() * 0.3);
    anim.scale.setValue(2 + Math.random() * 3);
  
    Animated.parallel([
      Animated.timing(anim.y, {
        toValue: height + 100,
        duration: 20000 + Math.random() * 5000,
        useNativeDriver: true,
      }),
      Animated.timing(anim.opacity, {
        toValue: 0,
        duration: 20000 + Math.random() * 5000,
        useNativeDriver: true,
      }),
      Animated.timing(anim.scale, {
        toValue: 1 + Math.random() * 3,
        duration: 20000 + Math.random() * 5000,
        useNativeDriver: true,
      }),
    ]).start(() => startFloatingAnimation(anim));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleGoogleSignIn = () => {
    setAlertMessage("You have successfully signed in with Google.");
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    router.push('/home');
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = () => {
    setEmailError('');
    setPasswordError('');

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      return;
    }

    router.push('/home');
  };

  return (
    <LinearGradient colors={['#003366', '#007BB5', '#0099CC']} style={styles.container}>
      {animations.map((anim, index) => (
        <Animated.View
          key={index}
          style={[
            styles.particle,
            {
              transform: [
                { translateX: anim.x },
                { translateY: anim.y },
                { scale: anim.scale },
              ],
              opacity: anim.opacity,
            },
          ]}
        />
      ))}

      <View style={styles.topContainer}>
        <Image style={styles.logo} source={require("../../assets/icons/logos.png")} />
        <Text style={styles.welcomeText}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>
      </View>

      <LoginForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        emailError={emailError}
        passwordError={passwordError}
        handleLogin={handleLogin}
        handleGoogleSignIn={handleGoogleSignIn}
        togglePasswordVisibility={togglePasswordVisibility}
        passwordVisible={passwordVisible}
      />

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.alertText}>{alertMessage}</Text>
            <Pressable style={styles.okButton} onPress={closeModal}>
              <Text style={styles.okButtonText}>OK</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  particle: {
    position: 'absolute',
    width: 10,
    height: 10,
    backgroundColor: '#fff',
    opacity: 0.7,
    borderRadius: 5,
  },
  topContainer: {
    alignItems: 'center',
    marginBottom: 30,
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
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#FFFFFF',
    fontSize: 16,
    opacity: 0.8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    alignItems: 'center',
  },
  alertText: {
    color: '#333',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  okButton: {
    backgroundColor: '#4169E1',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  okButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});
