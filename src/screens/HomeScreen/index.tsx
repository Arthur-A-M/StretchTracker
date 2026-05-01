import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useIsFocused } from '@react-navigation/native';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppButton } from '../../components/AppButton';
import { useRoutine } from '../../features/routine/RoutineContext';
import { RootStackParamList } from '../../navigation/routes';
import { usePalette, usePreferences } from '../../state/PreferencesContext';
import { makeStyles } from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomeScreen({ navigation }: Props) {
  const { t: tHome } = useTranslation('home');
  const { t: tCommon } = useTranslation('common');
  const { t: tSettings } = useTranslation('settings');
  const { isLoading, stretches } = useRoutine();
  const isFocused = useIsFocused();
  const { theme } = usePreferences();
  const palette = usePalette();
  const isDark = theme === 'dark';
  const styles = makeStyles(palette, isDark);

  const totalDuration = stretches.reduce((total, stretch) => {
    const stretchTime = stretch.duration * stretch.sets;
    const restTime = stretch.restTime * (stretch.sets - 1);
    return total + stretchTime + restTime;
  }, 0);

  useEffect(() => {
    if (!isFocused || isLoading || stretches.length > 0) {
      return;
    }

    navigation.navigate('EditRoutine');
  }, [isFocused, isLoading, navigation, stretches.length]);

  function formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    }

    return `${remainingSeconds}s`;
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>{tHome('title')}</Text>
          <Text style={styles.headerMeta}>
            {isLoading
              ? tCommon('loadingRoutine')
              : tHome('routineSummary', {
                  count: stretches.length,
                  duration: formatTime(totalDuration),
                })}
          </Text>
        </View>
        <View style={styles.headerRight}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={tSettings('title')}
            onPress={() => navigation.navigate('Configuration')}
            style={styles.settingsButton}
          >
            <Text style={styles.settingsIcon}>⚙</Text>
          </Pressable>
          <Text style={styles.headerIcon}>🧘</Text>
        </View>
      </View>

      <View style={styles.headerActions}>
        <View style={styles.primaryAction}>
          <AppButton
            label={tHome('startRoutine')}
            onPress={() => navigation.navigate('Workout')}
            disabled={isLoading || stretches.length === 0}
          />
        </View>
        <View style={styles.secondaryAction}>
          <AppButton
            label={tCommon('edit')}
            onPress={() => navigation.navigate('EditRoutine')}
            variant="secondary"
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {!isLoading && stretches.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>{tHome('emptyTitle')}</Text>
            <Text style={styles.emptyDescription}>
              {tHome('emptyDescription')}
            </Text>
            <AppButton
              label={tHome('emptyAction')}
              onPress={() => navigation.navigate('EditRoutine')}
              variant="secondary"
            />
          </View>
        ) : (
          stretches.map((stretch, index) => (
            <View key={stretch.id} style={styles.card}>
              {stretch.image ? (
                <Image source={{ uri: stretch.image }} style={styles.cardImage} />
              ) : (
                <View style={styles.cardImagePlaceholder}>
                  <Text style={styles.cardImagePlaceholderIcon}>🧘</Text>
                </View>
              )}
              <View style={styles.cardBody}>
                <View style={styles.cardHeader}>
                  <View>
                    <Text style={styles.cardIndex}>#{index + 1}</Text>
                    <Text style={styles.cardTitle}>{stretch.name}</Text>
                  </View>
                </View>
                <View style={styles.metricsRow}>
                  <Text style={styles.metricText}>{tHome('metricDuration', { value: stretch.duration })}</Text>
                  <Text style={styles.metricText}>{tHome('metricSets', { value: stretch.sets })}</Text>
                  <Text style={styles.metricSubtle}>{tHome('metricRest', { value: stretch.restTime })}</Text>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
