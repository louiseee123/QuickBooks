// app/components/Button.jsx

import React from 'react';
import { StyleSheet } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

const Button = ({ onPress, title, style, textStyle, disabled }) => {
  return (
    <LinearGradient
      colors={disabled ? ['#AFAFAF', '#B0B0B0'] : ['#6A5ACD', '#4169E1']} // Gradient colors
      style={styles.buttonContainer}
    >
      <PaperButton
        mode="contained"
        onPress={onPress}
        style={[styles.button, style]}
        disabled={disabled}
        labelStyle={[styles.buttonText, textStyle]}
      >
        {title}
      </PaperButton>
    </LinearGradient>
  );
};



const styles = StyleSheet.create({
    buttonContainer: {
      borderRadius: 30,
      overflow: 'hidden', // Ensures the gradient does not exceed button boundaries
      elevation: 4, // Adds a shadow effect for Android
      shadowColor: '#000', // iOS shadow color
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3, // iOS shadow opacity
      shadowRadius: 4, // iOS shadow blur radius
      borderWidth: 2, // Adds border width
      borderColor: '#005F8C', // Border color
      backdropFilter: 'blur(10px)', // Blur effect
    },
    button: {
      borderRadius: 30,
      paddingVertical: 12, // Adjusted for better touch targets
      paddingHorizontal: 24, // Adjusted for better touch targets
      width: '100%', // Makes the button take the full width of the parent
      alignItems: 'center', // Centers the text within the button
      backgroundColor: 'transparent', // Make sure PaperButton background is transparent
    },
    buttonText: {
      fontSize: 18, // Increased font size for better readability
      fontWeight: 'bold',
      color: '#fff', // Ensures text is always white for contrast
    },
    disabled: {
      opacity: 0.6, // Slightly more opaque for the disabled state
    },
  });
  
  export default Button;
