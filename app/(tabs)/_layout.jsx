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
  const bgColor = focused ? 'rgba(255, 255, 255, 0.8)' : 'transparent'; // Background color for focused state

  // Scale the icon when focused
  React.useEffect(() => {
    Animated.spring(scaleValue, {
      toValue: focused ? 1.4 : 1, // Scale up the icon on focus
      useNativeDriver: true,
      bounciness: 10,
    }).start();
  }, [focused]);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.tabIconContainer, { backgroundColor: bgColor }]}>
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
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
    backgroundColor: 'linear-gradient(90deg, #007BB5, #005BB5)', // Gradient background
    height: 70,
    borderTopWidth: 1,
    borderTopColor: '#004B9A',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
    borderRadius: 25, // Slightly round the corners for a softer look
    overflow: 'hidden',
    position: 'absolute', // Fix positioning to avoid overlapping issues
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20, // Add padding for more spacing
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingVertical: 10,
    borderRadius: 50, // Make circular for better aesthetics
    marginHorizontal: 12, // Add margin for spacing between icons
    height: 50, // Ensure enough height for the circle
    width: 50, // Ensure enough width for the circle
    backgroundColor: 'transparent',
    elevation: 5, // Add slight shadow for depth
  },
  icon: {
    width: 30,
    height: 30,
  },
});
