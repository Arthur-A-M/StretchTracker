import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppButton } from '../components/AppButton';
import { useRoutine } from '../features/routine/RoutineContext';
import { t } from '../i18n';
import { RootStackParamList } from '../navigation/routes';
import { usePalette, usePreferences } from '../state/PreferencesContext';
import { Palette, shadows } from '../theme/palette';
import { radius, spacing } from '../theme/spacing';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomeScreen({ navigation }: Props) {
  const { isLoading, stretches } = useRoutine();
  const { theme } = usePreferences();
  const palette = usePalette();
  const isDark = theme === 'dark';
  const styles = makeStyles(palette, isDark);

  const totalDuration = stretches.reduce((total, stretch) => {
    const stretchTime = stretch.duration * stretch.sets;
    const restTime = stretch.restTime * (stretch.sets - 1);
    return total + stretchTime + restTime;
  }, 0);

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
          <Text style={styles.headerTitle}>{t('home.title')}</Text>
          <Text style={styles.headerMeta}>
            {isLoading
              ? t('common.loadingRoutine')
              : t('home.routineSummary', {
                  count: stretches.length,
                  duration: formatTime(totalDuration),
                })}
          </Text>
        </View>
        <View style={styles.headerRight}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t('configuration.title')}
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
            label={t('home.startRoutine')}
            onPress={() => navigation.navigate('Workout')}
            disabled={isLoading || stretches.length === 0}
          />
        </View>
        <View style={styles.secondaryAction}>
          <AppButton
            label={t('common.edit')}
            onPress={() => navigation.navigate('EditRoutine')}
            variant="secondary"
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {!isLoading && stretches.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>{t('home.emptyTitle')}</Text>
            <Text style={styles.emptyDescription}>
              {t('home.emptyDescription')}
            </Text>
            <AppButton
              label={t('home.emptyAction')}
              onPress={() => navigation.navigate('EditRoutine')}
              variant="secondary"
            />
          </View>
        ) : (
          stretches.map((stretch, index) => (
            <View key={stretch.id} style={styles.card}>
              <Image source={{ uri: stretch.image }} style={styles.cardImage} />
              <View style={styles.cardBody}>
                <View style={styles.cardHeader}>
                  <View>
                    <Text style={styles.cardIndex}>#{index + 1}</Text>
                    <Text style={styles.cardTitle}>{stretch.name}</Text>
                  </View>
                </View>
                <View style={styles.metricsRow}>
                  <Text style={styles.metricText}>{t('home.metricDuration', { value: stretch.duration })}</Text>
                  <Text style={styles.metricText}>{t('home.metricSets', { value: stretch.sets })}</Text>
                  <Text style={styles.metricSubtle}>{t('home.metricRest', { value: stretch.restTime })}</Text>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function makeStyles(palette: Palette, isDark: boolean) {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: palette.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.md,
      paddingBottom: spacing.md,
      backgroundColor: isDark ? 'rgba(22,42,48,0.95)' : 'rgba(255,255,255,0.88)',
      borderBottomWidth: 1,
      borderBottomColor: palette.border,
    },
    headerTitle: {
      color: palette.text,
      fontSize: 30,
      fontWeight: '300',
    },
    headerMeta: {
      marginTop: 4,
      color: palette.textMuted,
      fontSize: 14,
    },
    headerRight: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
    },
    settingsButton: {
      width: 36,
      height: 36,
      alignItems: 'center',
      justifyContent: 'center',
    },
    settingsIcon: {
      color: palette.textMuted,
      fontSize: 22,
    },
    headerIcon: {
      fontSize: 32,
    },
    headerActions: {
      flexDirection: 'row',
      gap: spacing.sm,
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.md,
    },
    primaryAction: {
      flex: 1,
    },
    secondaryAction: {
      width: 110,
    },
    scrollContent: {
      padding: spacing.lg,
      gap: spacing.md,
      paddingBottom: spacing.xxl,
    },
    emptyState: {
      borderRadius: radius.lg,
      backgroundColor: palette.surface,
      borderWidth: 1,
      borderColor: palette.border,
      padding: spacing.xl,
      gap: spacing.md,
      alignItems: 'center',
      ...shadows.card,
    },
    emptyTitle: {
      color: palette.text,
      fontSize: 20,
      fontWeight: '700',
      textAlign: 'center',
    },
    emptyDescription: {
      color: palette.textMuted,
      fontSize: 15,
      lineHeight: 22,
      textAlign: 'center',
    },
    card: {
      flexDirection: 'row',
      overflow: 'hidden',
      borderRadius: radius.md,
      backgroundColor: palette.surface,
      borderWidth: 1,
      borderColor: palette.border,
      ...shadows.card,
    },
    cardImage: {
      width: 96,
      height: 96,
      backgroundColor: palette.surfaceMuted,
    },
    cardBody: {
      flex: 1,
      padding: spacing.md,
      justifyContent: 'space-between',
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    cardIndex: {
      color: palette.textMuted,
      fontSize: 12,
      marginBottom: 4,
    },
    cardTitle: {
      color: palette.text,
      fontSize: 17,
      fontWeight: '600',
    },
    metricsRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: spacing.sm,
    },
    metricText: {
      color: palette.tealDark,
      fontSize: 13,
    },
    metricSubtle: {
      color: palette.textMuted,
      fontSize: 12,
    },
  });
}
