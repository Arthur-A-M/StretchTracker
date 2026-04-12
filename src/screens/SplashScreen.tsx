import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RootStackParamList } from '../navigation/routes';
import { usePalette } from '../state/PreferencesContext';
import { Palette } from '../theme/palette';
import { spacing } from '../theme/spacing';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export function SplashScreen({ navigation }: Props) {
  const { t } = useTranslation('common');
  const palette = usePalette();
  const styles = makeStyles(palette);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.icon}>🧘</Text>
        <Text style={styles.title}>{t('appName')}</Text>
        <ActivityIndicator size="large" color={palette.teal} />
      </View>
    </SafeAreaView>
  );
}

function makeStyles(palette: Palette) {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: palette.background,
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.xl,
      padding: spacing.xl,
    },
    icon: {
      fontSize: 64,
    },
    title: {
      color: palette.text,
      fontSize: 38,
      fontWeight: '300',
      letterSpacing: 1,
    },
  });
}
