import { StyleSheet } from 'react-native';

import { Palette, shadows } from '../../../theme/palette';
import { radius, spacing } from '../../../theme/spacing';

export function makeStyles(palette: Palette, isDark: boolean) {
  return StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: isDark ? 'rgba(0,0,0,0.5)' : 'rgba(20, 50, 58, 0.28)',
    },
    sheet: {
      maxHeight: '92%',
      borderTopLeftRadius: radius.lg,
      borderTopRightRadius: radius.lg,
      backgroundColor: palette.surface,
      ...shadows.card,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: palette.border,
    },
    title: {
      color: palette.text,
      fontSize: 24,
      fontWeight: '300',
    },
    closeButton: {
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.sm,
    },
    closeButtonText: {
      color: palette.teal,
      fontSize: 14,
      fontWeight: '700',
    },
    content: {
      padding: spacing.lg,
      gap: spacing.lg,
    },
    fieldGroup: {
      gap: spacing.sm,
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
    imagePickerBox: {
      borderWidth: 2,
      borderStyle: 'dashed',
      borderColor: palette.border,
      borderRadius: radius.md,
      padding: spacing.md,
      backgroundColor: palette.surface,
      gap: spacing.md,
    },
    previewImage: {
      width: '100%',
      height: 180,
      borderRadius: radius.md,
      backgroundColor: palette.surfaceMuted,
    },
    imageActions: {
      gap: spacing.sm,
    },
    imagePlaceholder: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: spacing.xl,
      gap: spacing.sm,
    },
    imagePlaceholderIcon: {
      color: palette.textMuted,
      fontSize: 32,
    },
    imagePlaceholderText: {
      color: palette.textMuted,
      fontSize: 14,
    },
    stepperRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
    },
    stepperButton: {
      width: 48,
      height: 48,
      borderRadius: radius.pill,
      borderWidth: 1,
      borderColor: palette.border,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: palette.surface,
    },
    stepperButtonText: {
      color: palette.text,
      fontSize: 24,
      lineHeight: 24,
    },
    stepperValueBox: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 48,
    },
    stepperValue: {
      color: palette.text,
      fontSize: 30,
      fontWeight: '300',
    },
    stepperSuffix: {
      color: palette.textMuted,
      fontSize: 14,
    },
    footerActions: {
      flexDirection: 'row',
      gap: spacing.sm,
      paddingTop: spacing.sm,
    },
    footerButton: {
      flex: 1,
    },
  });
}
