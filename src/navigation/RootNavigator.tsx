import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ConfigurationScreen } from '../screens/ConfigurationScreen';
import { EditRoutineScreen } from '../screens/EditRoutineScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { SplashScreen } from '../screens/SplashScreen';
import { WorkoutScreen } from '../screens/WorkoutScreen';
import { usePalette } from '../state/PreferencesContext';
import { RootStackParamList } from './routes';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const palette = usePalette();

  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: palette.background,
        },
        headerTintColor: palette.text,
        headerTitleStyle: {
          fontWeight: '700',
        },
        contentStyle: {
          backgroundColor: palette.background,
        },
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="EditRoutine" component={EditRoutineScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Workout" component={WorkoutScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Configuration" component={ConfigurationScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}