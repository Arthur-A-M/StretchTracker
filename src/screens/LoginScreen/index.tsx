import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView, Platform, Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppButton } from '../../components/AppButton';
import { RootStackParamList } from '../../navigation/routes';
import { usePalette } from '../../state/PreferencesContext';
import { makeStyles } from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const EMAIL_FORMAT_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginScreen({ navigation }: Props) {
  const { t: tAuth } = useTranslation('auth');
  const { t: tCommon } = useTranslation('common');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const trimmedEmail = email.trim();
  const isEmailValid = EMAIL_FORMAT_REGEX.test(trimmedEmail);
  const showEmailError = trimmedEmail.length > 0 && !isEmailValid;
  const canLogin = isEmailValid && password.trim().length > 0;
  const palette = usePalette();
  const styles = makeStyles(palette);

  function handleLogin() {
    if (!canLogin) {
      return;
    }

    navigation.replace('Home');
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <View style={styles.container}>
          <View style={styles.brandBlock}>
            <Text style={styles.icon}>🧘</Text>
            <Text style={styles.title}>{tCommon('appName')}</Text>
            <Text style={styles.subtitle}>{tAuth('tagline')}</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>{tAuth('emailLabel')}</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={setEmail}
                placeholder={tAuth('emailPlaceholder')}
                placeholderTextColor={palette.textMuted}
                style={[styles.input, showEmailError && styles.inputError]}
                textContentType="emailAddress"
                value={email}
              />
              {showEmailError ? <Text style={styles.errorText}>{tAuth('invalidEmail')}</Text> : null}
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>{tAuth('passwordLabel')}</Text>
              <TextInput
                onChangeText={setPassword}
                placeholder="••••••••"
                placeholderTextColor={palette.textMuted}
                secureTextEntry
                style={styles.input}
                textContentType="password"
                value={password}
              />
            </View>

            <AppButton label={tAuth('loginButton')} onPress={handleLogin} disabled={!canLogin} />

            <Pressable style={styles.linkButton}>
              <Text style={styles.linkText}>{tAuth('createAccount')}</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
