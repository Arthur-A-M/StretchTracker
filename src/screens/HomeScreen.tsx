import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../navigation/routes';
import { ScreenTemplate } from './ScreenTemplate';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomeScreen({ navigation }: Props) {
  return (
    <ScreenTemplate
      eyebrow="Placeholder"
      title="Home screen scaffold"
      description="This foundation screen reserves the main routine overview route and establishes the shared visual container for the later port."
      bullets={[
        'Primary user flow already reaches the main app area.',
        'Reusable cards, spacing, and button styles are available.',
        'Routine summary content will replace this copy in the next implementation step.',
      ]}
      actions={[
        { label: 'Open edit placeholder', onPress: () => navigation.navigate('EditRoutine') },
        { label: 'Open workout placeholder', onPress: () => navigation.navigate('Workout'), variant: 'secondary' },
      ]}
    />
  );
}