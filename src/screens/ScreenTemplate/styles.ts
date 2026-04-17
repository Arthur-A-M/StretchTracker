import { StyleSheet } from 'react-native';

import { palette } from '../../theme/palette';
import { spacing } from '../../theme/spacing';

export const styles = StyleSheet.create({
  list: {
    gap: spacing.sm,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: palette.teal,
    marginTop: 8,
  },
  listText: {
    flex: 1,
    color: palette.text,
    fontSize: 15,
    lineHeight: 22,
  },
  actions: {
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
});
