import React, { useState } from 'react'; // Importowanie funkcji useState z React do zarządzania stanem komponentu.
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native'; // Importowanie komponentów z React Native.
import { useNavigation } from '@react-navigation/native'; // Importowanie hooka useNavigation do nawigacji.
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'; // Importowanie animacji z react-native-reanimated.

const colors = {
  primary: '#3498db',
  secondary: '#2ecc71',
  background: '#ecf0f1',
  lightBackground: '#bdc3c7',
};

const RegisterScreen = () => {
  const [firstName, setFirstName] = useState(''); // Inicjalizacja stanu imienia.
  const [lastName, setLastName] = useState(''); // Inicjalizacja stanu nazwiska.
  const [email, setEmail] = useState(''); // Inicjalizacja stanu email.
  const [password, setPassword] = useState(''); // Inicjalizacja stanu hasła.
  const [confirmPassword, setConfirmPassword] = useState(''); // Inicjalizacja stanu potwierdzenia hasła.
  const [emailError, setEmailError] = useState(''); // Inicjalizacja stanu błędu walidacji emaila.
  const navigation = useNavigation(); // Hook do nawigacji.

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleRegister = () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      Alert.alert('Błąd', 'Proszę wypełnić wszystkie pola'); // Wyświetlanie alertu w przypadku niewypełnionych pól.
      return;
    }
    if (!validateEmail(email)) {
      setEmailError('Proszę wprowadzić prawidłowy adres e-mail'); // Ustawianie błędu walidacji emaila.
      return;
    } else {
      setEmailError(''); // Resetowanie błędu walidacji emaila.
    }
    if (password !== confirmPassword) {
      Alert.alert('Błąd', 'Hasła muszą być takie same'); // Wyświetlanie alertu w przypadku niezgodności haseł.
      return;
    }
    // Replace with real registration logic
    Alert.alert('Sukces', 'Konto zostało utworzone'); // Wyświetlanie alertu sukcesu.
    navigation.navigate('Login'); // Nawigacja do ekranu logowania.
  };

  return (
    <View style={styles.container}>
      <Animated.View entering={FadeIn} exiting={FadeOut}>
        <Text style={styles.title}>Rejestracja</Text>
        <TextInput
          style={styles.input}
          placeholder="Imię"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Nazwisko"
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="Hasło"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Potwierdź Hasło"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <Button title="Utwórz konto" onPress={handleRegister} color={colors.primary} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

RegisterScreen.navigationOptions = {
  headerShown: false,
};

export default RegisterScreen;
