import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppButton } from '../components/AppButton';
import { useRoutine } from '../features/routine/RoutineContext';
import { RootStackParamList } from '../navigation/routes';
import { usePalette, usePreferences } from '../state/PreferencesContext';
import { Palette, shadows } from '../theme/palette';
import { radius, spacing } from '../theme/spacing';

type WorkoutState = 'stretching' | 'resting' | 'complete';

type Props = NativeStackScreenProps<RootStackParamList, 'Workout'>;

export function WorkoutScreen({ navigation }: Props) {
  const { t: tWorkout } = useTranslation('workout');
  const { t: tCommon } = useTranslation('common');
  const { stretches, isLoading } = useRoutine();
  const { theme } = usePreferences();
  const palette = usePalette();
  const isDark = theme === 'dark';
  const styles = makeStyles(palette, isDark);
  const [currentStretchIndex, setCurrentStretchIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [state, setState] = useState<WorkoutState>('stretching');
  const [isPaused, setIsPaused] = useState(false);
  const [isTimerReady, setIsTimerReady] = useState(false);

  const currentStretch = stretches[currentStretchIndex];
  const isLastStretch = currentStretchIndex === stretches.length - 1;
  const isLastSet = currentSet === currentStretch?.sets;

  useEffect(() => {
    if (!currentStretch) {
      return;
    }

    setTimeRemaining(currentStretch.duration);
    setState('stretching');
    setCurrentSet(1);
    setIsPaused(false);
    setIsTimerReady(true);
  }, [currentStretchIndex, currentStretch]);

  useEffect(() => {
    if (isPaused || !currentStretch || state === 'complete' || !isTimerReady) {
      return;
    }

    if (timeRemaining <= 0) {
      if (state === 'stretching') {
        if (isLastSet) {
          if (isLastStretch) {
            setState('complete');
          } else {
            setCurrentStretchIndex((previousIndex) => previousIndex + 1);
          }
        } else {
          setState('resting');
          setTimeRemaining(currentStretch.restTime);
        }
      } else if (state === 'resting') {
        setCurrentSet((previousSet) => previousSet + 1);
        setState('stretching');
        setTimeRemaining(currentStretch.duration);
      }

      return;
    }

    const interval = setInterval(() => {
      setTimeRemaining((previousTime) => previousTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [currentStretch, isLastSet, isLastStretch, isPaused, isTimerReady, state, timeRemaining]);

  const totalProgress = useMemo(() => {
    if (!currentStretch || stretches.length === 0) {
      return 0;
    }

    return (currentStretchIndex * 100 + ((currentSet - 1) / currentStretch.sets) * 100) / stretches.length;
  }, [currentSet, currentStretch, currentStretchIndex, stretches.length]);

  function handleSkip() {
    if (!currentStretch) {
      return;
    }

    if (isLastStretch && isLastSet) {
      setState('complete');
      return;
    }

    if (isLastSet) {
      setCurrentStretchIndex((previousIndex) => previousIndex + 1);
      return;
    }

    setCurrentSet((previousSet) => previousSet + 1);
    setState('stretching');
    setTimeRemaining(currentStretch.duration);
  }

  function handleFinish() {
    setCurrentStretchIndex(0);
    setCurrentSet(1);
    setTimeRemaining(0);
    setState('stretching');
    setIsPaused(false);
    setIsTimerReady(false);
    navigation.navigate('Home');
  }

  if (isLoading) {
    return (
      <SafeAreaView style={styles.centeredScreen}>
        <Text style={styles.emptyTitle}>{tCommon('loadingRoutine')}</Text>
      </SafeAreaView>
    );
  }

  if (!currentStretch || stretches.length === 0) {
    return (
      <SafeAreaView style={styles.centeredScreen}>
        <Text style={styles.emptyTitle}>{tWorkout('noStretches')}</Text>
        <View style={styles.emptyAction}>
          <AppButton label={tWorkout('goHome')} onPress={() => navigation.navigate('Home')} variant="secondary" />
        </View>
      </SafeAreaView>
    );
  }

  if (state === 'complete') {
    return (
      <SafeAreaView style={styles.completeScreen}>
        <View style={styles.completeCard}>
          <Text style={styles.completeIcon}>✓</Text>
          <Text style={styles.completeTitle}>{tWorkout('completeTitle')}</Text>
          <Text style={styles.completeDescription}>{tWorkout('completeDescription')}</Text>
          <View style={styles.completeAction}>
            <AppButton label={tWorkout('finish')} onPress={handleFinish} />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => navigation.navigate('Home')} style={styles.backButton}>
            <Text style={styles.backButtonText}>‹</Text>
          </Pressable>
          <Text style={styles.stepCount}>
            {currentStretchIndex + 1} / {stretches.length}
          </Text>
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${Math.min(100, Math.max(0, totalProgress))}%` }]} />
        </View>
      </View>

      <View style={styles.mainContent}>
        <View style={styles.imageWrap}>
          <Image source={{ uri: currentStretch.image }} style={styles.image} />
          <View style={styles.modeBadge}>
            <Text style={styles.modeBadgeText}>{state === 'stretching' ? tWorkout('stretchMode') : tWorkout('restMode')}</Text>
          </View>
        </View>

        <View style={styles.body}>
          <Text style={styles.name}>{currentStretch.name}</Text>
          <Text style={styles.setLabel}>
            {tWorkout('setLabel', { current: currentSet, total: currentStretch.sets })}
          </Text>

          <View style={styles.timerWrap}>
            <Text style={styles.timerValue}>{timeRemaining}</Text>
            <Text style={styles.timerUnit}>{tWorkout('timerUnit')}</Text>
          </View>

          <View style={styles.controls}>
            <Pressable onPress={() => setIsPaused((previousValue) => !previousValue)} style={styles.pauseButton}>
              <Text style={styles.pauseButtonText}>{isPaused ? tWorkout('play') : tWorkout('pause')}</Text>
            </Pressable>
            <View style={styles.skipButtonWrap}>
              <AppButton label={tWorkout('skip')} onPress={handleSkip} variant="secondary" />
            </View>
          </View>

          {!isLastStretch && isLastSet ? (
            <View style={styles.nextUpWrap}>
              <Text style={styles.nextUpLabel}>{tWorkout('nextUp')}</Text>
              <Text style={styles.nextUpName}>{stretches[currentStretchIndex + 1].name}</Text>
            </View>
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
}

function makeStyles(palette: Palette, isDark: boolean) {
  return StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.background,
  },
  centeredScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    backgroundColor: palette.background,
  },
  emptyTitle: {
    color: palette.textMuted,
    fontSize: 18,
    marginBottom: spacing.md,
  },
  emptyAction: {
    width: 180,
  },
  completeScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    backgroundColor: isDark ? palette.background : '#EFFBF9',
  },
  completeCard: {
    width: '100%',
    borderRadius: radius.lg,
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.border,
    padding: spacing.xl,
    alignItems: 'center',
    gap: spacing.md,
    ...shadows.card,
  },
  completeIcon: {
    color: palette.teal,
    fontSize: 72,
    lineHeight: 72,
    fontWeight: '700',
  },
  completeTitle: {
    color: palette.text,
    fontSize: 34,
    fontWeight: '300',
  },
  completeDescription: {
    color: palette.textMuted,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  completeAction: {
    width: '100%',
    marginTop: spacing.sm,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
    backgroundColor: isDark ? 'rgba(22,42,48,0.95)' : 'rgba(255,255,255,0.88)',
    borderBottomWidth: 1,
    borderBottomColor: palette.border,
    gap: spacing.sm,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    color: palette.text,
    fontSize: 32,
    lineHeight: 32,
  },
  stepCount: {
    color: palette.textMuted,
    fontSize: 14,
  },
  progressTrack: {
    height: 8,
    borderRadius: radius.pill,
    backgroundColor: palette.surfaceMuted,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: palette.teal,
    borderRadius: radius.pill,
  },
  mainContent: {
    flex: 1,
  },
  imageWrap: {
    position: 'relative',
    height: 260,
    backgroundColor: palette.surfaceMuted,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  modeBadge: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    borderRadius: radius.pill,
    backgroundColor: isDark ? 'rgba(22,42,48,0.92)' : 'rgba(255,255,255,0.92)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  modeBadgeText: {
    color: palette.text,
    fontSize: 14,
    fontWeight: '600',
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },
  name: {
    color: palette.text,
    fontSize: 30,
    fontWeight: '300',
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  setLabel: {
    color: palette.textMuted,
    fontSize: 16,
    marginBottom: spacing.xl,
  },
  timerWrap: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  timerValue: {
    color: palette.text,
    fontSize: 88,
    fontWeight: '300',
    lineHeight: 92,
  },
  timerUnit: {
    color: palette.textMuted,
    fontSize: 16,
    marginTop: spacing.xs,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  pauseButton: {
    width: 90,
    height: 64,
    borderRadius: radius.pill,
    borderWidth: 2,
    borderColor: palette.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.surface,
  },
  pauseButtonText: {
    color: palette.text,
    fontSize: 16,
    fontWeight: '700',
  },
  skipButtonWrap: {
    width: 120,
  },
  nextUpWrap: {
    marginTop: spacing.xl,
    alignItems: 'center',
    gap: spacing.xs,
  },
  nextUpLabel: {
    color: palette.textMuted,
    fontSize: 14,
  },
  nextUpName: {
    color: palette.tealDark,
    fontSize: 16,
    fontWeight: '500',
  },
  });
}