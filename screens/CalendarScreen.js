import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated';

const colors = {
  primary: '#3498db',
  secondary: '#2ecc71',
  background: '#ecf0f1',
  lightBackground: '#bdc3c7',
};

const CalendarScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Animated.View entering={SlideInRight} exiting={SlideOutLeft}>
        <Text style={styles.title}>Kalendarz Spotkań</Text>
        <Calendar
          theme={{
            backgroundColor: colors.background,
            calendarBackground: colors.background,
            textSectionTitleColor: colors.primary,
            selectedDayBackgroundColor: colors.secondary,
            selectedDayTextColor: '#ffffff',
            todayTextColor: colors.secondary,
            dayTextColor: colors.primary,
            textDisabledColor: colors.lightBackground,
            monthTextColor: colors.primary,
            indicatorColor: colors.primary,
            arrowColor: colors.secondary,
          }}
          onDayPress={(day) => {
            console.log('selected day', day);
          }}
        />
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Participants')}>
          <Text style={styles.buttonText}>Zarządzanie Uczestnikami</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Notes')}>
          <Text style={styles.buttonText}>Tworzenie Notatek</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Statistics')}>
          <Text style={styles.buttonText}>Analiza Statystyk</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddMeeting')}>
          <Text style={styles.buttonText}>Dodaj Spotkanie</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: colors.primary,
  },
  button: {
    marginTop: 20,
    padding: 15,
    backgroundColor: colors.secondary,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.background,
    fontSize: 16,
  },
});

CalendarScreen.navigationOptions = {
  headerShown: false,
};

export default CalendarScreen;
