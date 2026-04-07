import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../navigation/routes';
import { ScreenTemplate } from './ScreenTemplate';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export function SplashScreen({ navigation }: Props) {
  return (
    <ScreenTemplate
      eyebrow="Step One"
      title="App shell is ready"
      description="This screen confirms the Expo app now has the same route map as the design model, even before the real UI is ported."
      bullets={[
        'Root navigation is wired for the five model screens.',
        'Theme tokens and reusable layout components are in place.',
        'Later steps can replace these placeholders without changing the app structure.',
      ]}
      actions={[
        { label: 'Go to login placeholder', onPress: () => navigation.navigate('Login') },
      ]}
    />
  );
}