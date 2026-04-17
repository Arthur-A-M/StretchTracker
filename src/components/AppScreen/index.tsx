import { PropsWithChildren } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { usePalette } from '../../state/PreferencesContext';
import { makeStyles } from './styles';

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
