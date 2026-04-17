import { StyleSheet } from 'react-native';

import { Palette, shadows } from '../../theme/palette';
import { radius, spacing } from '../../theme/spacing';

export function makeStyles(palette: Palette) {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: palette.background,
    },
    header: {
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.md,
      paddingBottom: spacing.md,
      backgroundColor: palette.surface,
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
    sectionLabel: {
      color: palette.tealDark,
      fontSize: 13,
      fontWeight: '700',
      letterSpacing: 1,
      textTransform: 'uppercase',
    },
    optionRow: {
      flexDirection: 'row',
      gap: spacing.sm,
    },
    optionButton: {
      flex: 1,
    },
  });
}
