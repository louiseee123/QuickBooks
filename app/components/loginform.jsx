import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';  // Make sure to import useRouter here

export default function LoginForm({ 
  email, 
  setEmail, 
  password, 
  setPassword, 
  emailError, 
  passwordError, 
  handleLogin, 
  handleGoogleSignIn,
  togglePasswordVisibility,
  passwordVisible 
}) {
  const emailInputRef = useRef(null);
  const router = useRouter();  // Initialize useRouter hook here

  useEffect(() => {
    emailInputRef.current.focus();
  }, []);

  return (
    <View style={styles.formContainer}>
      <TextInput 
        ref={emailInputRef}
        style={styles.input} 
        placeholder="Email" 
        value={email} 
        onChangeText={(text) => {
          setEmail(text);
        }} 
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <View style={styles.passwordContainer}>
        <TextInput 
          style={styles.passwordInput} 
          placeholder="Password" 
          secureTextEntry={!passwordVisible} 
          value={password} 
          onChangeText={(text) => {
            setPassword(text);
          }} 
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
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

      <View style={styles.buttonContainer}>
        <Pressable style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Sign In</Text>
        </Pressable>
        <Pressable style={styles.googleButton} onPress={handleGoogleSignIn}>
          <Image 
            style={styles.googleIcon} 
            source={require("../../assets/icons/google.png")} 
          />
        </Pressable>
      </View>

      {/* Correcting the text rendering */}
      <Pressable onPress={() => router.push('/auth/signup')}>
        <Text style={styles.createAccount}>Create an Account</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
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
  },
  input: {
    width: '100%',
    height: 50,
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
    height: 50,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#4169E1',
    borderColor: '#FFFFFF',
    borderWidth: 2,
    borderRadius: 20,
    paddingVertical: 15,
    flex: 0.8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    borderColor: '#007BB5',
    borderWidth: 1,
    padding: 15,
    flex: 0.2,
    justifyContent: 'center',
  },
  googleIcon: {
    width: 24,
    height: 24,
    left: 20,
  },
  createAccount: {
    color: '#FFFFFF',
    fontSize: 16,
    textDecorationLine: 'underline',
    left: 110,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
});
