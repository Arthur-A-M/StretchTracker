import { StyleSheet } from 'react-native';

import { Palette, shadows } from '../../theme/palette';
import { radius, spacing } from '../../theme/spacing';

export function makeStyles(palette: Palette) {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: palette.background,
    },
    content: {
      flexGrow: 1,
      padding: spacing.lg,
      gap: spacing.lg,
      justifyContent: 'center',
    },
    hero: {
      gap: spacing.sm,
    },
    eyebrow: {
      color: palette.tealDark,
      fontSize: 13,
      fontWeight: '700',
      letterSpacing: 1,
      textTransform: 'uppercase',
    },
    title: {
      color: palette.text,
      fontSize: 34,
      fontWeight: '800',
      lineHeight: 40,
    },
    description: {
      color: palette.textMuted,
      fontSize: 16,
      lineHeight: 24,
    },
    card: {
      borderRadius: radius.lg,
      backgroundColor: palette.surface,
      borderWidth: 1,
      borderColor: palette.border,
      padding: spacing.lg,
      gap: spacing.md,
      ...shadows.card,
    },
  });
}
