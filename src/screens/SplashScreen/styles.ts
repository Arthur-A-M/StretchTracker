import { StyleSheet } from 'react-native';

import { Palette } from '../../theme/palette';
import { spacing } from '../../theme/spacing';

export function makeStyles(palette: Palette) {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: palette.background,
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.xl,
      padding: spacing.xl,
    },
    icon: {
      fontSize: 64,
    },
    title: {
      color: palette.text,
      fontSize: 38,
      fontWeight: '300',
      letterSpacing: 1,
    },
  });
}
