import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Platform, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated';

const colors = {
  primary: '#3498db',
  secondary: '#2ecc71',
  background: '#ecf0f1',
  lightBackground: '#bdc3c7',
};

const NotesScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [image, setImage] = useState(null);

  const handleSave = () => {
    if (!title || !content) {
      Alert.alert('Błąd', 'Wszystkie pola muszą być wypełnione');
      return;
    }

    Alert.alert('Sukces', 'Notatka została zapisana');
    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View entering={SlideInRight} exiting={SlideOutLeft}>
        <Text style={styles.title}>Tworzenie Notatek</Text>
        <TextInput
          style={styles.input}
          placeholder="Tytuł Notatki"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.textArea}
          placeholder="Treść Notatki"
          value={content}
          onChangeText={setContent}
          multiline={true}
          numberOfLines={10}
        />
        <Button title="Wybierz Datę" onPress={() => setShow(true)} color={colors.secondary} />
        <Text style={styles.dateText}>Wybrana Data: {date.toLocaleDateString()}</Text>
        {show && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}
        <Button title="Dodaj Zdjęcie" onPress={pickImage} color={colors.secondary} />
        {image && <Image source={{ uri: image }} style={styles.image} />}
        <View style={styles.buttonContainer}>
          <Button title="Anuluj" onPress={handleCancel} color={colors.primary} />
          <Button title="Zapisz" onPress={handleSave} color={colors.primary} />
        </View>
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
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: colors.lightBackground,
    borderRadius: 5,
    marginBottom: 10,
  },
  textArea: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: colors.lightBackground,
    borderRadius: 5,
    marginBottom: 10,
    height: 150,
  },
  dateText: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: 'center',
    color: colors.primary,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: 10,
  },
});

NotesScreen.navigationOptions = {
  headerShown: false,
};

export default NotesScreen;
