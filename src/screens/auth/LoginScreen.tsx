import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';

import React, { useEffect, useState } from 'react';
import { colors } from '@theme/colors';
import backgroundImg from '../../assets/background.png';
import * as Google from 'expo-auth-session/providers/google';
import { ANDROID_CLIENT_ID, IOS_CLIENT_ID } from '@env';
export function LoginScreen() {
  const [loading, setLoading] = useState(false);

  const [_, response, googleSignIn] = Google.useAuthRequest({
    androidClientId: ANDROID_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    scopes: ['profile', 'email'],
  });

  function handleSignIn() {
    setLoading(true);
    googleSignIn().then((res) => {
      if (res.type !== 'success') {
        setLoading(false);
      }
    });
  }

  useEffect(() => {
    if (response?.type === 'success') {
      console.log(response.authentication?.idToken);
      setLoading(false);
    }
  }, [response]);

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
              <View></View>
              <View style={{ marginBottom: 32 }}>
                <Text className="text-primary text-center text-2xl font-bold">
                  Ignite Fleet
                </Text>
                <Text className="text-secondary text-center">
                  Gestão de uso de veiculos
                </Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={{ paddingHorizontal: 40, marginBottom: 40 }}>
          <TouchableOpacity
            className="flex items-center justify-center h-12 bg-white rounded-lg"
            onPress={handleSignIn}
          >
            <Text style={{ color: colors.primary, fontWeight: '700' }}>
              {loading ? <ActivityIndicator color={'#ffffff'} /> : 'Entrar'}
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}
