import {
  View,
  Text,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';

import React, { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@theme/colors';
import { formStyles, typography } from '@theme/globalStyles';
import Logo from '../../../assets/icon.png';
import { useLogin } from '@hooks/useLogin';
import backgroundImg from '../../assets/background.png';
export function LoginScreen() {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const { mutate, isLoading } = useLogin();

  function handleLogin() {
    if (!email || !password) {
      return Alert.alert('Preencha todos os campos');
    }
    mutate({ email, password });
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <ImageBackground source={backgroundImg} className="flex-1">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{ flex: 1, justifyContent: 'center', marginVertical: 32 }}
          >
            <View style={{ paddingHorizontal: 40 }}>
              <View>
              </View>
              <View style={{ marginBottom: 32 }}>
                <Text className='text-primary text-center text-2xl font-bold'>Ignite Fleet</Text>
                <Text className='text-secondary text-center'>
                  Gestão de uso de veiculos
                </Text>
              </View>
              <View style={formStyles.compactInputWrapper}>
                <FontAwesome
                  name="user"
                  size={24}
                  color={colors.primaryBlack}
                />
                <TextInput
                  style={formStyles.compactInput}
                  onChangeText={onChangeEmail}
                  keyboardType="email-address"
                  placeholder="E-mail"
                  value={email}
                />
              </View>

              <View style={{ marginTop: 8, marginBottom: 32 }}>
                <View style={formStyles.compactInputWrapper}>
                  <FontAwesome
                    name="lock"
                    size={24}
                    color={colors.primaryBlack}
                  />
                  <TextInput
                    style={formStyles.compactInput}
                    onChangeText={onChangePassword}
                    secureTextEntry={true}
                    maxLength={6}
                    value={password}
                    placeholder="Senha"
                  />
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={{ paddingHorizontal: 40, marginBottom: 40 }}>
          <TouchableOpacity
            className="flex items-center justify-center h-12 bg-white rounded-lg"
            onPress={handleLogin}
          >
            <Text style={{ color: colors.primary, fontWeight: '700' }}>
              {isLoading ? <ActivityIndicator color={'#ffffff'} /> : 'Entrar'}
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}
