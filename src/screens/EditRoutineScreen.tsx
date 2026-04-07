import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../navigation/routes';
import { ScreenTemplate } from './ScreenTemplate';

type Props = NativeStackScreenProps<RootStackParamList, 'EditRoutine'>;

export function EditRoutineScreen({ navigation }: Props) {
  return (
    <ScreenTemplate
      eyebrow="Placeholder"
      title="Routine editor scaffold"
      description="The editor route is registered now, so the later form, modal, and persistence work can plug into a stable screen contract."
      bullets={[
        'This is where stretch CRUD will be rebuilt for mobile.',
        'Navigation from the main screen is already connected.',
        'The structure supports adding native modal flows in the next steps.',
      ]}
      actions={[
        { label: 'Return to home', onPress: () => navigation.navigate('Home') },
        { label: 'Jump to workout placeholder', onPress: () => navigation.navigate('Workout'), variant: 'secondary' },
      ]}
    />
  );
}