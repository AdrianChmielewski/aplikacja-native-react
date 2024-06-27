import React, { useState } from 'react'; // Importowanie funkcji useState z React do zarządzania stanem komponentu.
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native'; // Importowanie komponentów z React Native.
import DateTimePicker from '@react-native-community/datetimepicker'; // Importowanie komponentu do wyboru daty i czasu.
import { Picker } from '@react-native-picker/picker'; // Importowanie komponentu Picker.
import { CheckBox } from 'react-native-elements'; // Importowanie komponentu CheckBox.
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated'; // Importowanie animacji z react-native-reanimated.

const colors = {
  primary: '#3498db',
  secondary: '#2ecc71',
  background: '#ecf0f1',
  lightBackground: '#bdc3c7',
};

const businessTitles = [
  'Spotkanie strategiczne',
  'Spotkanie z klientem',
  'Prezentacja produktu',
  'Warsztaty',
  'Szkolenie',
  'Spotkanie zespołowe',
  'Spotkanie projektowe',
  'Burza mózgów',
  'Spotkanie operacyjne',
  'Spotkanie zarządu'
];

const participantsFromDB = [
  'Jan Kowalski',
  'Anna Nowak',
  'Piotr Zieliński',
  'Marta Kwiatkowska',
  'Tomasz Nowicki'
];

const AddMeetingScreen = ({ navigation }) => {
  const [date, setDate] = useState(new Date()); // Inicjalizacja stanu daty.
  const [time, setTime] = useState(new Date()); // Inicjalizacja stanu czasu.
  const [title, setTitle] = useState(businessTitles[0]); // Inicjalizacja stanu tytułu spotkania.
  const [selectedParticipants, setSelectedParticipants] = useState([]); // Inicjalizacja stanu wybranych uczestników.
  const [showDatePicker, setShowDatePicker] = useState(false); // Inicjalizacja stanu widoczności DatePicker.
  const [showTimePicker, setShowTimePicker] = useState(false); // Inicjalizacja stanu widoczności TimePicker.

  const handleAddMeeting = () => {
    if (!title || selectedParticipants.length === 0) {
      Alert.alert('Błąd', 'Wszystkie pola muszą być wypełnione'); // Wyświetlanie alertu w przypadku niewypełnionych pól.
      return;
    }

    Alert.alert('Sukces', 'Spotkanie zostało dodane'); // Wyświetlanie alertu sukcesu.
    navigation.goBack(); // Powrót do poprzedniego ekranu.
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false); // Ukrywanie DatePicker.
    setDate(currentDate); // Aktualizacja daty.
  };

  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(false); // Ukrywanie TimePicker.
    setTime(currentTime); // Aktualizacja czasu.
  };

  const toggleParticipant = (participant) => {
    if (selectedParticipants.includes(participant)) {
      setSelectedParticipants(selectedParticipants.filter(item => item !== participant)); // Usuwanie uczestnika z listy wybranych.
    } else {
      setSelectedParticipants([...selectedParticipants, participant]); // Dodawanie uczestnika do listy wybranych.
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Animated.View entering={SlideInRight} exiting={SlideOutLeft}>
        <Text style={styles.title}>Dodawanie Spotkań</Text>
        <Button title="Wybierz Datę" onPress={() => setShowDatePicker(true)} color={colors.secondary} />
        <Text style={styles.dateText}>Data: {date.toLocaleDateString()}</Text>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}
        <Button title="Wybierz Godzinę" onPress={() => setShowTimePicker(true)} color={colors.secondary} />
        <Text style={styles.dateText}>Godzina: {time.toLocaleTimeString()}</Text>
        {showTimePicker && (
          <DateTimePicker
            value={time}
            mode="time"
            display="default"
            onChange={onTimeChange}
          />
        )}
        <Text style={styles.label}>Tytuł Spotkania</Text>
        <Picker
          selectedValue={title}
          onValueChange={(itemValue) => setTitle(itemValue)}
          style={styles.picker}
        >
          {businessTitles.map((title, index) => (
            <Picker.Item key={index} label={title} value={title} />
          ))}
        </Picker>
        <Text style={styles.label}>Uczestnicy</Text>
        {participantsFromDB.map((participant, index) => (
          <CheckBox
            key={index}
            title={participant}
            checked={selectedParticipants.includes(participant)}
            onPress={() => toggleParticipant(participant)}
            checkedColor={colors.secondary}
          />
        ))}
        <Button title="Dodaj Spotkanie" onPress={handleAddMeeting} color={colors.primary} />
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: colors.primary,
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
    color: colors.primary,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 10,
  },
  dateText: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: 'center',
    color: colors.primary,
  },
});

AddMeetingScreen.navigationOptions = {
  headerShown: false,
};

export default AddMeetingScreen;
