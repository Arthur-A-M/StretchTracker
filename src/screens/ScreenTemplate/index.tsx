import { ReactNode } from 'react';
import { Text, View } from 'react-native';

import { AppButton } from '../../components/AppButton';
import { AppScreen } from '../../components/AppScreen';
import { styles } from './styles';

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
