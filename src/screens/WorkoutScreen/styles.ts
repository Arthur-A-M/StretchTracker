import { StyleSheet } from 'react-native';

import { Palette, shadows } from '../../theme/palette';
import { radius, spacing } from '../../theme/spacing';

export function makeStyles(palette: Palette, isDark: boolean) {
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
    imagePlaceholder: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: palette.surfaceMuted,
    },
    imagePlaceholderIcon: {
      fontSize: 40,
      color: palette.textMuted,
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
