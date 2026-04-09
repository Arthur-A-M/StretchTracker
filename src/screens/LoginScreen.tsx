import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppButton } from '../components/AppButton';
import { t } from '../i18n';
import { RootStackParamList } from '../navigation/routes';
import { usePalette } from '../state/PreferencesContext';
import { Palette, shadows } from '../theme/palette';
import { radius, spacing } from '../theme/spacing';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const canLogin = email.trim().length > 0 && password.trim().length > 0;
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
            <Text style={styles.title}>{t('common.appName')}</Text>
            <Text style={styles.subtitle}>{t('login.tagline')}</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>{t('login.emailLabel')}</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={setEmail}
                placeholder={t('login.emailPlaceholder')}
                placeholderTextColor={palette.textMuted}
                style={styles.input}
                textContentType="emailAddress"
                value={email}
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>{t('login.passwordLabel')}</Text>
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

            <AppButton label={t('login.loginButton')} onPress={handleLogin} disabled={!canLogin} />

            <Pressable style={styles.linkButton}>
              <Text style={styles.linkText}>{t('login.createAccount')}</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function makeStyles(palette: Palette) {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: palette.background,
    },
    keyboardView: {
      flex: 1,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: spacing.xl,
      paddingVertical: spacing.xl,
      gap: spacing.xl,
    },
    brandBlock: {
      alignItems: 'center',
      gap: spacing.sm,
    },
    icon: {
      fontSize: 54,
    },
    title: {
      color: palette.text,
      fontSize: 34,
      fontWeight: '300',
      letterSpacing: 0.8,
    },
    subtitle: {
      color: palette.textMuted,
      fontSize: 16,
    },
    card: {
      borderRadius: radius.lg,
      backgroundColor: palette.surface,
      borderWidth: 1,
      borderColor: palette.border,
      padding: spacing.lg,
      gap: spacing.lg,
      ...shadows.card,
    },
    fieldGroup: {
      gap: spacing.xs,
    },
    label: {
      color: palette.text,
      fontSize: 14,
      fontWeight: '600',
    },
    input: {
      minHeight: 54,
      borderRadius: radius.md,
      borderWidth: 1,
      borderColor: palette.border,
      backgroundColor: palette.surface,
      paddingHorizontal: spacing.md,
      color: palette.text,
      fontSize: 16,
    },
    linkButton: {
      alignSelf: 'center',
    },
    linkText: {
      color: palette.teal,
      fontSize: 14,
      fontWeight: '600',
    },
  });
}
