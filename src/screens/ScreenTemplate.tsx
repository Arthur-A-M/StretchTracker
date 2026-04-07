import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppButton } from '../components/AppButton';
import { AppScreen } from '../components/AppScreen';
import { palette } from '../theme/palette';
import { spacing } from '../theme/spacing';

type Action = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
};

type ScreenTemplateProps = {
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  actions: Action[];
  footer?: ReactNode;
};

export function ScreenTemplate({
  eyebrow,
  title,
  description,
  bullets,
  actions,
  footer,
}: ScreenTemplateProps) {
  return (
    <AppScreen eyebrow={eyebrow} title={title} description={description}>
      <View style={styles.list}>
        {bullets.map((bullet) => (
          <View key={bullet} style={styles.listItem}>
            <View style={styles.dot} />
            <Text style={styles.listText}>{bullet}</Text>
          </View>
        ))}
      </View>
      <View style={styles.actions}>
        {actions.map((action) => (
          <AppButton
            key={action.label}
            label={action.label}
            onPress={action.onPress}
            variant={action.variant}
          />
        ))}
      </View>
      {footer}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
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