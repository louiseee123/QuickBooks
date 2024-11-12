import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Pressable, StyleSheet, Image, ScrollView, Dimensions, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../app/components/custombutton';

const { width, height } = Dimensions.get('window');
const particles = Array.from({ length: 10 });

export default function IndexScreen() {
  const router = useRouter();
  const [activeSlide, setActiveSlide] = useState(0);

  const animations = particles.map(() => ({
    x: new Animated.Value(Math.random() * width),
    y: new Animated.Value(Math.random() * height),
    opacity: new Animated.Value(0.2 + Math.random() * 1),
    scale: new Animated.Value(1 + Math.random() * 5),
  }));

  useEffect(() => {
    particles.forEach((_, i) => {
      startFloatingAnimation(animations[i]);
    });
  }, []);

  const startFloatingAnimation = (anim) => {
    anim.y.setValue(-100); // Start slightly off-screen above
    anim.x.setValue(Math.random() * width * 1.5 - width * 0.25); // Allows some particles to start off-screen left/right
    anim.opacity.setValue(0.2 + Math.random() * 0.5); // Slightly more transparency
    anim.scale.setValue(2 + Math.random() * 3); // Increase particle size range
  
    Animated.parallel([
      Animated.timing(anim.y, {
        toValue: height + 100, // Move further down off-screen
        duration: 20000 + Math.random() * 5000, // Slower for more floating effect
        useNativeDriver: true,
      }),
      Animated.timing(anim.opacity, {
        toValue: 0, // Fade out gradually
        duration: 20000 + Math.random() * 5000,
        useNativeDriver: true,
      }),
      Animated.timing(anim.scale, {
        toValue: 1 + Math.random() * 3, // Keep the particles large as they float
        duration: 20000 + Math.random() * 5000,
        useNativeDriver: true,
      }),
    ]).start(() => startFloatingAnimation(anim)); // Loop the animation
  };

  const dotAnimations = useRef([0, 1, 2].map(() => ({
    scale: new Animated.Value(1),
    opacity: new Animated.Value(0.5),
  }))).current;

  const animateDot = (index) => {
    dotAnimations.forEach((anim, i) => {
      Animated.timing(anim.scale, {
        toValue: i === index ? 1.5 : 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      Animated.timing(anim.opacity, {
        toValue: i === index ? 1 : 0.5,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  useEffect(() => {
    animateDot(activeSlide);
  }, [activeSlide]);

  const handleScroll = (event) => {
    const slideIndex = Math.floor(event.nativeEvent.contentOffset.x / width);
    setActiveSlide(slideIndex);
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

      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View style={styles.slide}>
          <Image style={styles.logo} source={require("../assets/icons/logos.png")} />
          <Text style={styles.welcomeText}>Welcome to QuickBooks</Text>
          <Text style={styles.description}>CCTC's Official Library App</Text>
          <Text style={styles.description}>
            We're excited to help you book and manage your service appointments with ease.
          </Text>
        </View>

        <View style={styles.slide}>
          <Image style={styles.useCaseImage} source={require("../assets/images/appointment.png")} />
          <Text style={styles.header}>Make Appointments Easier</Text>
          <Text style={styles.useCaseText}>
            Making appointments for borrowing books much more efficient!
          </Text>
        </View>

        <View style={styles.slide}>
          <Image style={styles.useCaseImage} source={require("../assets/images/fun.png")} />
          <Text style={styles.header}>Learning Made Fun</Text>
          <Text style={styles.useCaseText}>
            Making learning and reading books more fun and easy!
          </Text>
        </View>
      </ScrollView>

      <View style={styles.dotContainer}>
        {[0, 1, 2].map((_, index) => (
          <Animated.View
            key={index}
            style={[
              styles.dot,
              {
                transform: [{ scale: dotAnimations[index].scale }],
                opacity: dotAnimations[index].opacity,
              },
            ]}
          />
        ))}
      </View>

      <Button title="Login" onPress={() => router.push('/auth/login')} />

      <Pressable onPress={() => router.push('/auth/signup')}>
        <Text style={styles.createAccount}>Create an account</Text>
      </Pressable>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#fff',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  useCaseImage: {
    width: 240,
    height: 240,
    marginBottom: 10,
    borderRadius: 12,
  },
  useCaseText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 24,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 8,
    backgroundColor: '#fff',
  },
  createAccount: {
    fontSize: 18,
    color: '#fff',
    textDecorationLine: 'underline',
    marginVertical: 15,
    textAlign: 'center',
  },
  particle: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
});
