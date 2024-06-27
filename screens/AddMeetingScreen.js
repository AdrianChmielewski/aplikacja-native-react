import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { CheckBox } from 'react-native-elements';
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated';

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
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [title, setTitle] = useState(businessTitles[0]);
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleAddMeeting = () => {
    if (!title || selectedParticipants.length === 0) {
      Alert.alert('Błąd', 'Wszystkie pola muszą być wypełnione');
      return;
    }

    Alert.alert('Sukces', 'Spotkanie zostało dodane');
    navigation.goBack();
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(false);
    setTime(currentTime);
  };

  const toggleParticipant = (participant) => {
    if (selectedParticipants.includes(participant)) {
      setSelectedParticipants(selectedParticipants.filter(item => item !== participant));
    } else {
      setSelectedParticipants([...selectedParticipants, participant]);
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
