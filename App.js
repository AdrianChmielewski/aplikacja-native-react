import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { View, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AddMeetingScreen from './screens/AddMeetingScreen';
import CalendarScreen from './screens/CalendarScreen';
import LoginScreen from './screens/LoginScreen';
import NotesScreen from './screens/NotesScreen';
import ParticipantsScreen from './screens/ParticipantsScreen';
import RegisterScreen from './screens/RegisterScreen';
import StatisticsScreen from './screens/StatisticsScreen';

const Stack = createStackNavigator();

const CustomHeader = () => {
  return (
    <LinearGradient
      colors={['#74ebd5', '#ACB6E5']} 
      style={styles.headerContainer}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}></Text>
      </View>
    </LinearGradient>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: () => <CustomHeader />,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Calendar" component={CalendarScreen} />
        <Stack.Screen name="AddMeeting" component={AddMeetingScreen} />
        <Stack.Screen name="Notes" component={NotesScreen} />
        <Stack.Screen name="Participants" component={ParticipantsScreen} />
        <Stack.Screen name="Statistics" component={StatisticsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  header: {
    height: '100%',
    width: '100%',
    backgroundColor: 'transparent',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;
