import React, { useState } from 'react';
import { View, Text, Image, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated';

const colors = {
  primary: '#3498db',
  secondary: '#2ecc71',
  background: '#ffffff', // Zmiana koloru tła na biały
  lightBackground: '#bdc3c7',
};

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Błąd', 'Proszę wypełnić wszystkie pola');
      return;
    }
    navigation.navigate('Calendar');
  };

  return (
    <View style={styles.container}>
      <Animated.View entering={SlideInRight} exiting={SlideOutLeft} style={styles.animatedContainer}>
        <Image source={require('../assets/images/logo.png')} style={styles.logo} />
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
        <Button title="Zaloguj się" onPress={handleLogin} color={colors.primary} />
        <Button title="Zarejestruj się" onPress={() => navigation.navigate('Register')} color={colors.secondary} />
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
  animatedContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 250, // Zwiększenie szerokości
    height: 250, // Zwiększenie wysokości
    resizeMode: 'contain',
    marginBottom: 30, // Większa przestrzeń poniżej logo
    marginTop: -20, // Przesunięcie logo minimalnie do góry
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

LoginScreen.navigationOptions = {
  headerShown: false,
};

export default LoginScreen;
