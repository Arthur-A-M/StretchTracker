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
      gap: spacing.md,
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.md,
      paddingBottom: spacing.md,
      backgroundColor: isDark ? 'rgba(22,42,48,0.95)' : 'rgba(255,255,255,0.88)',
      borderBottomWidth: 1,
      borderBottomColor: palette.border,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
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
    title: {
      color: palette.text,
      fontSize: 30,
      fontWeight: '300',
    },
    content: {
      padding: spacing.lg,
      gap: spacing.md,
      paddingBottom: spacing.xxl,
    },
    infoText: {
      color: palette.textMuted,
      fontSize: 15,
      textAlign: 'center',
      paddingVertical: spacing.xl,
    },
    emptyState: {
      alignItems: 'center',
      paddingVertical: spacing.xxl,
    },
    emptyTitle: {
      color: palette.textMuted,
      fontSize: 16,
      marginBottom: spacing.xs,
    },
    emptyDescription: {
      color: palette.textMuted,
      fontSize: 14,
    },
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      overflow: 'hidden',
      borderRadius: radius.md,
      backgroundColor: palette.surface,
      borderWidth: 1,
      borderColor: palette.border,
      ...shadows.card,
    },
    dragHandle: {
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.lg,
    },
    dragHandleText: {
      color: palette.textMuted,
      fontSize: 18,
      letterSpacing: -1,
    },
    cardImage: {
      width: 80,
      height: 80,
      backgroundColor: palette.surfaceMuted,
    },
    cardImagePlaceholder: {
      width: 80,
      height: 80,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: palette.surfaceMuted,
    },
    cardImagePlaceholderIcon: {
      fontSize: 24,
      color: palette.textMuted,
    },
    cardContent: {
      flex: 1,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
    },
    index: {
      color: palette.textMuted,
      fontSize: 12,
      marginBottom: 4,
    },
    cardTitle: {
      color: palette.text,
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 4,
    },
    cardMeta: {
      color: palette.textMuted,
      fontSize: 13,
      lineHeight: 18,
    },
    actions: {
      gap: spacing.xs,
      paddingHorizontal: spacing.sm,
    },
    actionButton: {
      paddingVertical: 6,
      paddingHorizontal: spacing.sm,
    },
    editAction: {
      color: palette.teal,
      fontSize: 13,
      fontWeight: '700',
    },
    deleteAction: {
      color: palette.danger,
      fontSize: 13,
      fontWeight: '700',
    },
  });
}
