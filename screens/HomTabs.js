import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';

// Screen Comps
import Home from './Home';
import Listings from './Listings';
import Profile from './Profile';

const Tab = createBottomTabNavigator();

const HomTabs = () => {
  return (
    // <NavigationContainer>
      <Tab.Navigator 
      screenOptions={{
        tabBarActiveTintColor: '#9586E3',
        headerShown: false,
        // tabBarStyle: 
      }}>
        <Tab.Screen name="Home" component={Home} options={{
          // title: 'Home',
          tabBarIcon: () => <FontAwesomeIcon icon={faHome} className=" text-gray-200" />,
          
        }} />
        <Tab.Screen name="Listings" component={Listings}  options={{
          // title: 'Home',
          tabBarIcon: () => <FontAwesomeIcon icon={faList} />,
          
        }} />
        <Tab.Screen name="Profile" component={Profile}  options={{
          // title: 'Home',
          tabBarIcon: () => <FontAwesomeIcon icon={faUser} />,
          
        }} />
      </Tab.Navigator>
  )
}

export default HomTabs