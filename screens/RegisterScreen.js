import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const colors = {
  primary: '#3498db',
  secondary: '#2ecc71',
  background: '#ecf0f1',
  lightBackground: '#bdc3c7',
};

const RegisterScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  const handleRegister = () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      Alert.alert('Błąd', 'Proszę wypełnić wszystkie pola');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Błąd', 'Hasła muszą być takie same');
      return;
    }
    // Replace with real registration logic
    Alert.alert('Sukces', 'Konto zostało utworzone');
    navigation.navigate('Login');
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
});

RegisterScreen.navigationOptions = {
  headerShown: false,
};

export default RegisterScreen;
