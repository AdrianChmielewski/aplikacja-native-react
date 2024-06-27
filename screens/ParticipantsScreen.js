import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, FlatList } from 'react-native';

const colors = {
  primary: '#3498db',
  secondary: '#2ecc71',
  background: '#ecf0f1',
  lightBackground: '#bdc3c7',
};

const MemberManagementScreen = () => {
  const [members, setMembers] = useState([]);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleSave = () => {
    if (!name || !surname || !email) {
      Alert.alert('Błąd', 'Wszystkie pola muszą być wypełnione');
      return;
    }

    const newMember = { name, surname, email };

    if (editIndex !== null) {
      const updatedMembers = [...members];
      updatedMembers[editIndex] = newMember;
      setMembers(updatedMembers);
      setEditIndex(null);
    } else {
      setMembers([...members, newMember]);
    }

    setName('');
    setSurname('');
    setEmail('');
    Alert.alert('Sukces', 'Członek został zapisany');
  };

  const handleCancel = () => {
    setName('');
    setSurname('');
    setEmail('');
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    const member = members[index];
    setName(member.name);
    setSurname(member.surname);
    setEmail(member.email);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedMembers = members.filter((_, i) => i !== index);
    setMembers(updatedMembers);
    Alert.alert('Sukces', 'Członek został usunięty');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Zarządzanie Członkami</Text>
      <TextInput
        style={styles.input}
        placeholder="Imię"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Nazwisko"
        value={surname}
        onChangeText={setSurname}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <View style={styles.buttonContainer}>
        <Button title="Anuluj" onPress={handleCancel} color={colors.primary} />
        <Button title="Zapisz" onPress={handleSave} color={colors.secondary} />
      </View>
      <FlatList
        data={members}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.memberItem}>
            <Text style={styles.memberText}>{item.name} {item.surname} ({item.email})</Text>
            <View style={styles.memberActions}>
              <Button title="Edytuj" onPress={() => handleEdit(index)} color={colors.primary} />
              <Button title="Usuń" onPress={() => handleDelete(index)} color={colors.secondary} />
            </View>
          </View>
        )}
      />
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
    marginBottom: 20,
  },
  memberItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightBackground,
  },
  memberText: {
    fontSize: 16,
    color: colors.primary,
  },
  memberActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default MemberManagementScreen;
