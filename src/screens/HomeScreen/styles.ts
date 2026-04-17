import { StyleSheet } from 'react-native';

import { Palette, shadows } from '../../theme/palette';
import { radius, spacing } from '../../theme/spacing';

export function makeStyles(palette: Palette, isDark: boolean) {
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
    cardImagePlaceholder: {
      width: 96,
      height: 96,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: palette.surfaceMuted,
    },
    cardImagePlaceholderIcon: {
      fontSize: 28,
      color: palette.textMuted,
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
