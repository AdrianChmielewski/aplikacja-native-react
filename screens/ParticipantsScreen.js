import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated';

const colors = {
  primary: '#3498db',
  secondary: '#2ecc71',
  background: '#ecf0f1',
  lightBackground: '#bdc3c7',
};

const ParticipantsScreen = () => {
  const [participants, setParticipants] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentParticipant, setCurrentParticipant] = useState({ firstName: '', lastName: '', email: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddParticipant = () => {
    setParticipants([...participants, currentParticipant]);
    setCurrentParticipant({ firstName: '', lastName: '', email: '' });
    setModalVisible(false);
  };

  const handleEditParticipant = () => {
    const updatedParticipants = participants.map((participant, index) => {
      if (index === editingIndex) {
        return currentParticipant;
      }
      return participant;
    });
    setParticipants(updatedParticipants);
    setCurrentParticipant({ firstName: '', lastName: '', email: '' });
    setModalVisible(false);
    setIsEditing(false);
  };

  const handleDeleteParticipant = (index) => {
    const updatedParticipants = participants.filter((_, i) => i !== index);
    setParticipants(updatedParticipants);
  };

  const openEditModal = (participant, index) => {
    setCurrentParticipant(participant);
    setEditingIndex(index);
    setIsEditing(true);
    setModalVisible(true);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.participant}>
      <Text>{`${item.firstName} ${item.lastName} (${item.email})`}</Text>
      <View style={styles.icons}>
        <TouchableOpacity onPress={() => openEditModal(item, index)}>
          <Ionicons name="pencil" size={24} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteParticipant(index)}>
          <Ionicons name="trash" size={24} color={colors.secondary} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Animated.View entering={SlideInRight} exiting={SlideOutLeft}>
        <Text style={styles.title}>Zarządzanie Uczestnikami</Text>
        <FlatList
          data={participants}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
        />
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.addButtonText}>Dodaj Uczestnika</Text>
        </TouchableOpacity>
      </Animated.View>

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.input}
            placeholder="Imię"
            value={currentParticipant.firstName}
            onChangeText={(text) => setCurrentParticipant({ ...currentParticipant, firstName: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Nazwisko"
            value={currentParticipant.lastName}
            onChangeText={(text) => setCurrentParticipant({ ...currentParticipant, lastName: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            value={currentParticipant.email}
            onChangeText={(text) => setCurrentParticipant({ ...currentParticipant, email: text })}
          />
          <View style={styles.buttonContainer}>
            <Button title="Anuluj" onPress={() => setModalVisible(false)} color={colors.primary} />
            <Button
              title="Zapisz"
              onPress={isEditing ? handleEditParticipant : handleAddParticipant}
              color={colors.primary}
            />
          </View>
        </View>
      </Modal>
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
  participant: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightBackground,
  },
  icons: {
    flexDirection: 'row',
    gap: 10,
  },
  addButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: colors.secondary,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: colors.background,
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: colors.background,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: colors.lightBackground,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

ParticipantsScreen.navigationOptions = {
  headerShown: false,
};

export default ParticipantsScreen;
