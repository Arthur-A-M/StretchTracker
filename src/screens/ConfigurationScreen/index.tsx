import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppButton } from '../../components/AppButton';
import { RootStackParamList } from '../../navigation/routes';
import { usePalette, usePreferences } from '../../state/PreferencesContext';
import { makeStyles } from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Configuration'>;

export function ConfigurationScreen({ navigation }: Props) {
  const { t } = useTranslation('settings');
  const { theme, language, setTheme, setLanguage } = usePreferences();
  const palette = usePalette();
  const styles = makeStyles(palette);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => navigation.navigate('Home')} style={styles.backButton}>
            <Text style={styles.backButtonText}>‹</Text>
          </Pressable>
          <Text style={styles.title}>{t('title')}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.sectionLabel}>{t('themeSection')}</Text>
          <View style={styles.optionRow}>
            <View style={styles.optionButton}>
              <AppButton
                label={t('lightMode')}
                onPress={() => setTheme('light')}
                variant={theme === 'light' ? 'primary' : 'secondary'}
              />
            </View>
            <View style={styles.optionButton}>
              <AppButton
                label={t('darkMode')}
                onPress={() => setTheme('dark')}
                variant={theme === 'dark' ? 'primary' : 'secondary'}
              />
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionLabel}>{t('languageSection')}</Text>
          <View style={styles.optionRow}>
            <View style={styles.optionButton}>
              <AppButton
                label={t('english')}
                onPress={() => setLanguage('en')}
                variant={language === 'en' ? 'primary' : 'secondary'}
              />
            </View>
            <View style={styles.optionButton}>
              <AppButton
                label={t('portuguese')}
                onPress={() => setLanguage('pt-BR')}
                variant={language === 'pt-BR' ? 'primary' : 'secondary'}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
