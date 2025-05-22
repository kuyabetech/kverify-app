import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { loginSuccess } from '../slices/userSlice';
import { useRouter } from 'expo-router';

const API_URL = 'http://192.168.43.110:4000'; // Update if backend runs elsewhere

export default function LoginScreen() {
  const [matric, setMatric] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API_URL}/auth`, { matric, password });
      dispatch(loginSuccess(res.data));
      // Navigate to dashboard or home after successful login
      router.replace('/');
    } catch (err) {
      Alert.alert('Login Failed', 'Invalid credentials');
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f3f4f6', // bg-gray-100
        paddingHorizontal: 16,
      }}
    >
      <View
        style={{
          width: '100%',
          maxWidth: 400,
          backgroundColor: '#fff',
          borderRadius: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 4,
          padding: 24,
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 24, color: '#065f46', padding: 24 }}>
          KSUSTADOCS Login
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: '#d1d5db',
            width: '100%',
            marginBottom: 16,
            padding: 8,
            borderRadius: 8,
          }}
          placeholder="Matric Number"
          value={matric}
          onChangeText={setMatric}
          autoCapitalize="none"
          keyboardType="default"
          accessibilityLabel="Matric Number"
          returnKeyType="next"
        />
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: '#d1d5db',
            width: '100%',
            marginBottom: 16,
            padding: 8,
            borderRadius: 8,
          }}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          accessibilityLabel="Password"
          returnKeyType="done"
        />
        <Button title="Login" color="#006747" onPress={handleLogin} />
      </View>
    </View>
  );
}
