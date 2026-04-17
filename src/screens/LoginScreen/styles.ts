import { StyleSheet } from 'react-native';

import { Palette, shadows } from '../../theme/palette';
import { radius, spacing } from '../../theme/spacing';

export function makeStyles(palette: Palette) {
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
    inputError: {
      borderColor: palette.danger,
    },
    errorText: {
      color: palette.danger,
      fontSize: 13,
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
