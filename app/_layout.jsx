import { View, Text, Animated, TouchableOpacity } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { Stack, SplashScreen } from 'expo-router';
import { useFonts } from 'expo-font';

SplashScreen.preventAutoHideAsync();

const MainLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Roboto-Black": require("../assets/fonts/Roboto-Black.ttf"),
    "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Thin": require("../assets/fonts/Roboto-Thin.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf")
  });
  
  useEffect(() => {
    if (error) throw error;
  
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);
  
  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <Stack>
      {/* Stack screen with header hidden */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="auth/login" options={{ headerShown: false }} />
      <Stack.Screen name="auth/signup" options={{ headerShown: false }} />
      <Stack.Screen name="gatsby" options={{ headerShown: false }} />
      <Stack.Screen name="checkout" options={{ headerShown: false }} />
      <Stack.Screen name="history" options={{ headerShown: false }} />
      <Stack.Screen name="credit" options={{ headerShown: false }} />
      <Stack.Screen name="rent" options={{ headerShown: false }} />
      <Stack.Screen name="mock" options={{ headerShown: false }} />
    </Stack>
    
    
  );
};

const renderBookItem = ({ item }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <TouchableOpacity style={styles.bookItem} onPress={() => handlePress(item)}>
        <Text style={styles.bookTitle}>{item.title}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = {
  bookItem: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
};

export default MainLayout;
