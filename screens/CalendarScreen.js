// CalendarScreen.js
import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Button } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated';
import { NotesContext } from '../context/NotesContext'; // Adjust import path as necessary

const colors = {
  primary: '#3498db',
  secondary: '#2ecc71',
  background: '#ecf0f1',
  lightBackground: '#bdc3c7',
};

const CalendarScreen = ({ navigation }) => {
  const { notes } = useContext(NotesContext);
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const renderNotes = (day) => {
    const dateString = day.dateString;
    setSelectedDate(dateString);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedDate(null);
  };

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
          onDayPress={(day) => renderNotes(day)}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Notatki na dzień {selectedDate}</Text>
              <ScrollView style={styles.scrollView}>
                {selectedDate && notes[selectedDate] ? (
                  notes[selectedDate].map((note, index) => (
                    <View key={index} style={styles.note}>
                      <Text style={styles.noteTitle}>{note.title}</Text>
                      <Text>{note.content}</Text>
                      {note.image && <Image source={{ uri: note.image }} style={styles.noteImage} />}
                    </View>
                  ))
                ) : (
                  <Text>Brak notatek na ten dzień.</Text>
                )}
              </ScrollView>
              <Button title="Zamknij" onPress={closeModal} />
            </View>
          </View>
        </Modal>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Participants')}>
          <Text style={styles.buttonText}>Zarządzanie Uczestnikami</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Notes')}>
          <Text style={styles.buttonText}>Tworzenie Notatek</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddMeeting')}>
          <Text style={styles.buttonText}>Dodaj Spotkanie</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Wyloguj</Text>
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
  note: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: colors.lightBackground,
    borderRadius: 5,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  noteImage: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: colors.primary,
  },
  scrollView: {
    width: '100%',
  },
});

CalendarScreen.navigationOptions = {
  headerShown: false,
};

export default CalendarScreen;
