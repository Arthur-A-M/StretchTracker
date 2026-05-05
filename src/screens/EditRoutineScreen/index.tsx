import * as React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { Alert, Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppButton } from '../../components/AppButton';
import { StretchEditorModal } from '../../features/routine/StretchEditorModal';
import { useRoutine } from '../../features/routine/RoutineContext';
import { Stretch } from '../../features/routine/types';
import { RootStackParamList } from '../../navigation/routes';
import { usePalette, usePreferences } from '../../state/PreferencesContext';
import { makeStyles } from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'EditRoutine'>;

export function EditRoutineScreen({ navigation }: Props) {
  const { t: tRoutine } = useTranslation('routine');
  const { t: tCommon } = useTranslation('common');
  const { stretches, isLoading, createStretch, updateStretch, removeStretch } = useRoutine();
  const { theme } = usePreferences();
  const palette = usePalette();
  const isDark = theme === 'dark';
  const styles = makeStyles(palette, isDark);
  const [editingStretch, setEditingStretch] = React.useState<Stretch | null>(null);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const shouldShowHeader = isLoading || stretches.length > 0;

  function handleAddNew() {
    setEditingStretch(null);
    setIsModalVisible(true);
  }

  function handleEdit(stretch: Stretch) {
    setEditingStretch(stretch);
    setIsModalVisible(true);
  }

  function handleSave(
    draft: Omit<Stretch, 'id'>,
    stretchId?: string,
  ) {
    if (stretchId) {
      updateStretch(stretchId, draft);
    } else {
      createStretch(draft);
    }

    setEditingStretch(null);
    setIsModalVisible(false);
  }

  function handleCloseModal() {
    setEditingStretch(null);
    setIsModalVisible(false);
  }

  function handleDelete(stretchId: string) {
    Alert.alert(tRoutine('edit.deleteConfirmTitle'), tRoutine('edit.deleteConfirmMessage'), [
      { text: tCommon('cancel'), style: 'cancel' },
      {
        text: tCommon('delete'),
        style: 'destructive',
        onPress: () => removeStretch(stretchId),
      },
    ]);
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {shouldShowHeader ? (
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <Pressable onPress={() => navigation.navigate('Home')} style={styles.backButton}>
              <Text style={styles.backButtonText}>‹</Text>
            </Pressable>
            <Text style={styles.title}>{tRoutine('edit.title')}</Text>
          </View>

          <AppButton label={tRoutine('edit.addNewStretch')} onPress={handleAddNew} />
        </View>
      ) : null}

      <ScrollView contentContainerStyle={styles.content}>
        {isLoading ? (
          <Text style={styles.infoText}>{tRoutine('edit.loadingStretches')}</Text>
        ) : stretches.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>{tRoutine('edit.emptyTitle')}</Text>
            <Text style={styles.emptyDescription}>{tRoutine('edit.emptyDescription')}</Text>
            <AppButton label={tRoutine('edit.addNewStretch')} onPress={handleAddNew} />
          </View>
        ) : (
          stretches.map((stretch, index) => (
            <View key={stretch.id} style={styles.card}>
              <View style={styles.dragHandle}>
                <Text style={styles.dragHandleText}>⋮⋮</Text>
              </View>
              {stretch.image ? (
                <Image source={{ uri: stretch.image }} style={styles.cardImage} />
              ) : (
                <View style={styles.cardImagePlaceholder}>
                  <Text style={styles.cardImagePlaceholderIcon}>🧘</Text>
                </View>
              )}
              <View style={styles.cardContent}>
                <Text style={styles.index}>#{index + 1}</Text>
                <Text style={styles.cardTitle}>{stretch.name}</Text>
                <Text style={styles.cardMeta}>
                  {tRoutine('edit.cardMeta', {
                    duration: stretch.duration,
                    sets: stretch.sets,
                    restTime: stretch.restTime,
                  })}
                </Text>
              </View>
              <View style={styles.actions}>
                <Pressable onPress={() => handleEdit(stretch)} style={styles.actionButton}>
                  <Text style={styles.editAction}>{tRoutine('edit.editAction')}</Text>
                </Pressable>
                <Pressable onPress={() => handleDelete(stretch.id)} style={styles.actionButton}>
                  <Text style={styles.deleteAction}>{tRoutine('edit.deleteAction')}</Text>
                </Pressable>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      <StretchEditorModal
        visible={isModalVisible}
        stretch={editingStretch}
        onClose={handleCloseModal}
        onSave={handleSave}
      />
    </SafeAreaView>
  );
}
