import { StyleSheet } from 'react-native';

import { Palette } from '../../theme/palette';
import { radius, spacing } from '../../theme/spacing';

export function makeStyles(palette: Palette) {
  return StyleSheet.create({
    base: {
      minHeight: 52,
      borderRadius: radius.pill,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: spacing.lg,
    },
    primary: {
      backgroundColor: palette.teal,
    },
    secondary: {
      backgroundColor: palette.surface,
      borderWidth: 1,
      borderColor: palette.border,
    },
    pressed: {
      opacity: 0.88,
    },
    disabled: {
      opacity: 0.5,
    },
    label: {
      fontSize: 16,
      fontWeight: '700',
    },
    primaryLabel: {
      color: palette.surface,
    },
    secondaryLabel: {
      color: palette.text,
    },
  });
}
