import React from 'react';
import { StyleSheet, View, Image, Animated, TouchableWithoutFeedback } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { icons } from '../../assets/constants'; // Your icon set
import HomeScreen from './home';
import ProfileScreen from './profile';
import BooksScreen from './books';
import NotifScreen from './notif';

const Tab = createBottomTabNavigator();

const TabIcon = ({ icon, iconFocused, focused, onPress }) => {
  const scaleValue = React.useRef(new Animated.Value(1)).current;
  const elevationValue = React.useRef(new Animated.Value(0)).current;
  const bgColor = focused ? '#80C0E0' : '#004B9A'; // Solid colors for background

  // Scale and elevation animation when focused
  React.useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleValue, {
        toValue: focused ? 1.3 : 1, // Scale up the icon on focus
        useNativeDriver: true,
        bounciness: 10,
      }),
      Animated.timing(elevationValue, {
        toValue: focused ? 10 : 0, // Elevate icon on focus
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [focused]);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.tabIconContainer, { backgroundColor: bgColor }]}>
        <Animated.View style={{ 
          transform: [{ scale: scaleValue }], 
          elevation: elevationValue 
        }}>
          <Image
            source={focused ? iconFocused : icon}
            resizeMode="contain"
            style={styles.icon}
          />
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const TabLayout = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // Hide the header globally
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false, // Hide the label under the icons
        tabBarItemStyle: { flex: 1, justifyContent: 'center' }, // Center tab icons
      }}
    >
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          headerShown: false, // Ensure no header on this screen
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={icons.home}
              iconFocused={icons.home2}
              focused={focused}
              onPress={() => console.log('Home Pressed')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="books"
        component={BooksScreen}
        options={{
          headerShown: false, // Ensure no header on this screen
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={icons.books}
              iconFocused={icons.books2}
              focused={focused}
              onPress={() => console.log('Books Pressed')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          headerShown: false, // Ensure no header on this screen
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={icons.profile}
              iconFocused={icons.profile2}
              focused={focused}
              onPress={() => console.log('Profile Pressed')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="notif"
        component={NotifScreen}
        options={{
          headerShown: false, // Ensure no header on this screen
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={icons.notif}
              iconFocused={icons.notif2}
              focused={focused}
              onPress={() => console.log('Notifications Pressed')}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabLayout;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#007BB5', // Solid blue background for the tab bar
    height: 70,
    borderTopWidth: 1,
    borderTopColor: '#004B9A',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    position: 'absolute',
    bottom: 0, // Anchored to the bottom of the screen
    left: 0,   // Full width alignment
    right: 0,  // Full width alignment
    paddingHorizontal: 0,
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 30, // Reduced border-radius for a flatter look
    marginHorizontal: 10,
    height: 50,
    width: 50,
    elevation: 5,
  },
  icon: {
    width: 28,
    height: 28,
  },
});
