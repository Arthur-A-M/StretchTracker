import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text } from 'react-native';

import { RootStackParamList } from '../navigation/routes';
import { palette } from '../theme/palette';
import { ScreenTemplate } from './ScreenTemplate';

type Props = NativeStackScreenProps<RootStackParamList, 'Workout'>;

export function WorkoutScreen({ navigation }: Props) {
  return (
    <ScreenTemplate
      eyebrow="Placeholder"
      title="Workout engine scaffold"
      description="The final step-one route reserves space for the countdown flow, progress state, and completion logic that will be ported next."
      bullets={[
        'The model app timer logic will live on this screen.',
        'The route is intentionally separate from editing and home state.',
        'This keeps the eventual workout state machine isolated and easier to test.',
      ]}
      actions={[
        { label: 'Back to home', onPress: () => navigation.navigate('Home') },
      ]}
      footer={<Text style={styles.footer}>Foundation complete: screen flow is wired, feature logic still pending.</Text>}
    />
  );
}

const styles = StyleSheet.create({
  footer: {
    color: palette.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
});