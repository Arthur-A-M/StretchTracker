import * as React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppButton } from '../components/AppButton';
import { StretchEditorModal } from '../features/routine/StretchEditorModal';
import { useRoutine } from '../features/routine/RoutineContext';
import { Stretch } from '../features/routine/types';
import { RootStackParamList } from '../navigation/routes';
import { usePalette, usePreferences } from '../state/PreferencesContext';
import { Palette, shadows } from '../theme/palette';
import { radius, spacing } from '../theme/spacing';

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
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => navigation.navigate('Home')} style={styles.backButton}>
            <Text style={styles.backButtonText}>‹</Text>
          </Pressable>
          <Text style={styles.title}>{tRoutine('edit.title')}</Text>
        </View>

        <AppButton label={tRoutine('edit.addNewStretch')} onPress={handleAddNew} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {isLoading ? (
          <Text style={styles.infoText}>{tRoutine('edit.loadingStretches')}</Text>
        ) : stretches.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>{tRoutine('edit.emptyTitle')}</Text>
            <Text style={styles.emptyDescription}>{tRoutine('edit.emptyDescription')}</Text>
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

function makeStyles(palette: Palette, isDark: boolean) {
  return StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.background,
  },
  header: {
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    backgroundColor: isDark ? 'rgba(22,42,48,0.95)' : 'rgba(255,255,255,0.88)',
    borderBottomWidth: 1,
    borderBottomColor: palette.border,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    color: palette.text,
    fontSize: 32,
    lineHeight: 32,
  },
  title: {
    color: palette.text,
    fontSize: 30,
    fontWeight: '300',
  },
  content: {
    padding: spacing.lg,
    gap: spacing.md,
    paddingBottom: spacing.xxl,
  },
  infoText: {
    color: palette.textMuted,
    fontSize: 15,
    textAlign: 'center',
    paddingVertical: spacing.xl,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyTitle: {
    color: palette.textMuted,
    fontSize: 16,
    marginBottom: spacing.xs,
  },
  emptyDescription: {
    color: palette.textMuted,
    fontSize: 14,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: radius.md,
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.border,
    ...shadows.card,
  },
  dragHandle: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.lg,
  },
  dragHandleText: {
    color: palette.textMuted,
    fontSize: 18,
    letterSpacing: -1,
  },
  cardImage: {
    width: 80,
    height: 80,
    backgroundColor: palette.surfaceMuted,
  },
  cardImagePlaceholder: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.surfaceMuted,
  },
  cardImagePlaceholderIcon: {
    fontSize: 24,
    color: palette.textMuted,
  },
  cardContent: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  index: {
    color: palette.textMuted,
    fontSize: 12,
    marginBottom: 4,
  },
  cardTitle: {
    color: palette.text,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardMeta: {
    color: palette.textMuted,
    fontSize: 13,
    lineHeight: 18,
  },
  actions: {
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: spacing.sm,
  },
  editAction: {
    color: palette.teal,
    fontSize: 13,
    fontWeight: '700',
  },
  deleteAction: {
    color: palette.danger,
    fontSize: 13,
    fontWeight: '700',
  },
  });
}