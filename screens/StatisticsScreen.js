import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const colors = {
  primary: '#3498db',
  secondary: '#2ecc71',
  background: '#ecf0f1',
  lightBackground: '#bdc3c7',
};

const StatisticsScreen = ({ navigation }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [meetingType, setMeetingType] = useState('');

  const handleFilter = () => {
    // Logika filtrowania spotkań
  };

  const onStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartPicker(false);
    setStartDate(currentDate);
  };

  const onEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndPicker(false);
    setEndDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Analiza Statystyk</Text>
      <View style={styles.statSection}>
        <Text style={styles.statText}>Liczba Spotkań: 12</Text>
        <Text style={styles.statText}>Średnia Długość: 1h 30min</Text>
        <Text style={styles.statText}>Frekwencja Uczestników:</Text>
        <Text style={styles.statText}>[Wykres słupkowy]</Text>
        <Text style={styles.statText}>Tematy Spotkań:</Text>
        <Text style={styles.statText}>[Wykres kołowy]</Text>
      </View>
      <View style={styles.filterSection}>
        <Button title="Wybierz Datę Początkową" onPress={() => setShowStartPicker(true)} color={colors.primary} />
        {showStartPicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display="default"
            onChange={onStartDateChange}
          />
        )}
        <Text style={styles.dateText}>Data Początkowa: {startDate.toLocaleDateString()}</Text>
        <Button title="Wybierz Datę Końcową" onPress={() => setShowEndPicker(true)} color={colors.primary} />
        {showEndPicker && (
          <DateTimePicker
            value={endDate}
            mode="date"
            display="default"
            onChange={onEndDateChange}
          />
        )}
        <Text style={styles.dateText}>Data Końcowa: {endDate.toLocaleDateString()}</Text>
        <TextInput
          style={styles.input}
          placeholder="Typ Spotkania"
          value={meetingType}
          onChangeText={setMeetingType}
        />
        <Button title="Filtruj" onPress={handleFilter} color={colors.primary} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Powrót" onPress={() => navigation.goBack()} color={colors.primary} />
      </View>
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
  statSection: {
    marginBottom: 20,
  },
  statText: {
    fontSize: 16,
    marginBottom: 10,
    color: colors.primary,
  },
  filterSection: {
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  dateText: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: 'center',
    color: colors.primary,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

StatisticsScreen.navigationOptions = {
  headerShown: false,
};

export default StatisticsScreen;
