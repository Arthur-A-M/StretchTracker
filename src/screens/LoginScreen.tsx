import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../navigation/routes';
import { ScreenTemplate } from './ScreenTemplate';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
  return (
    <ScreenTemplate
      eyebrow="Placeholder"
      title="Login screen scaffold"
      description="This will become the model site login layout in step three. Right now it exists so navigation, headers, and flow are stable."
      bullets={[
        'Screen registration and typing are complete.',
        'This route sits in the same order as the model flow.',
        'The real form and validation logic will be added later.',
      ]}
      actions={[
        { label: 'Continue to home placeholder', onPress: () => navigation.navigate('Home') },
        { label: 'Back to splash', onPress: () => navigation.goBack(), variant: 'secondary' },
      ]}
    />
  );
}