import { PropsWithChildren } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { usePalette } from '../state/PreferencesContext';
import { Palette, shadows } from '../theme/palette';
import { radius, spacing } from '../theme/spacing';

type AppScreenProps = PropsWithChildren<{
  eyebrow: string;
  title: string;
  description: string;
}>;

export function AppScreen({ eyebrow, title, description, children }: AppScreenProps) {
  const palette = usePalette();
  const styles = makeStyles(palette);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.content} bounces={false}>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>{eyebrow}</Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <View style={styles.card}>{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
}

function makeStyles(palette: Palette) {
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
