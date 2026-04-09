import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { AppButton } from '../../components/AppButton';
import { t } from '../../i18n';
import { usePalette, usePreferences } from '../../state/PreferencesContext';
import { Palette, shadows } from '../../theme/palette';
import { radius, spacing } from '../../theme/spacing';
import { Stretch } from './types';

type StretchDraft = Omit<Stretch, 'id'>;

type StretchEditorModalProps = {
  visible: boolean;
  stretch: Stretch | null;
  onClose: () => void;
  onSave: (draft: StretchDraft, stretchId?: string) => void;
};

export function StretchEditorModal({ visible, stretch, onClose, onSave }: StretchEditorModalProps) {
  const { theme } = usePreferences();
  const palette = usePalette();
  const isDark = theme === 'dark';
  const styles = makeStyles(palette, isDark);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [duration, setDuration] = useState(30);
  const [sets, setSets] = useState(2);
  const [restTime, setRestTime] = useState(10);

  useEffect(() => {
    if (!visible) {
      return;
    }

    if (stretch) {
      setName(stretch.name);
      setImage(stretch.image);
      setDuration(stretch.duration);
      setSets(stretch.sets);
      setRestTime(stretch.restTime);
      return;
    }

    setName('');
    setImage('');
    setDuration(30);
    setSets(2);
    setRestTime(10);
  }, [stretch, visible]);

  async function handlePickImage() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(t('stretchEditor.permissionTitle'), t('stretchEditor.permissionMessage'));
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
      base64: true,
    });

    if (result.canceled) {
      return;
    }

    const asset = result.assets[0];

    if (asset.base64) {
      const mimeType = asset.mimeType ?? 'image/jpeg';
      setImage(`data:${mimeType};base64,${asset.base64}`);
      return;
    }

    if (asset.uri) {
      setImage(asset.uri);
    }
  }

  function adjustValue(currentValue: number, delta: number, min: number, max: number, setter: (value: number) => void) {
    const nextValue = Math.min(max, Math.max(min, currentValue + delta));
    setter(nextValue);
  }

  function handleSubmit() {
    if (!name.trim() || !image) {
      return;
    }

    onSave(
      {
        name: name.trim(),
        image,
        duration,
        sets,
        restTime,
      },
      stretch?.id,
    );
  }

  return (
    <Modal animationType="slide" presentationStyle="pageSheet" transparent visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <Text style={styles.title}>{stretch ? t('stretchEditor.titleEdit') : t('stretchEditor.titleAdd')}</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>{t('common.close')}</Text>
            </Pressable>
          </View>

          <ScrollView contentContainerStyle={styles.content}>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>{t('stretchEditor.nameLabel')}</Text>
              <TextInput
                onChangeText={setName}
                placeholder={t('stretchEditor.namePlaceholder')}
                placeholderTextColor={palette.textMuted}
                style={styles.input}
                value={name}
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>{t('stretchEditor.imageLabel')}</Text>
              <View style={styles.imagePickerBox}>
                {image ? (
                  <>
                    <Image source={{ uri: image }} style={styles.previewImage} />
                    <View style={styles.imageActions}>
                      <AppButton label={t('stretchEditor.changeImage')} onPress={() => void handlePickImage()} variant="secondary" />
                      <AppButton label={t('stretchEditor.removeImage')} onPress={() => setImage('')} variant="secondary" />
                    </View>
                  </>
                ) : (
                  <Pressable onPress={() => void handlePickImage()} style={styles.imagePlaceholder}>
                    <Text style={styles.imagePlaceholderIcon}>⬆</Text>
                    <Text style={styles.imagePlaceholderText}>{t('stretchEditor.uploadPrompt')}</Text>
                  </Pressable>
                )}
              </View>
            </View>

            <NumberField
              label={t('stretchEditor.durationLabel')}
              suffix={t('stretchEditor.durationSuffix')}
              value={duration}
              onDecrement={() => adjustValue(duration, -5, 10, 300, setDuration)}
              onIncrement={() => adjustValue(duration, 5, 10, 300, setDuration)}
              styles={styles}
            />

            <NumberField
              label={t('stretchEditor.setsLabel')}
              suffix={t('stretchEditor.setsSuffix')}
              value={sets}
              onDecrement={() => adjustValue(sets, -1, 1, 10, setSets)}
              onIncrement={() => adjustValue(sets, 1, 1, 10, setSets)}
              styles={styles}
            />

            <NumberField
              label={t('stretchEditor.restTimeLabel')}
              suffix={t('stretchEditor.restTimeSuffix')}
              value={restTime}
              onDecrement={() => adjustValue(restTime, -5, 0, 120, setRestTime)}
              onIncrement={() => adjustValue(restTime, 5, 0, 120, setRestTime)}
              styles={styles}
            />

            <View style={styles.footerActions}>
              <View style={styles.footerButton}>
                <AppButton label={t('common.cancel')} onPress={onClose} variant="secondary" />
              </View>
              <View style={styles.footerButton}>
                <AppButton label={t('common.save')} onPress={handleSubmit} disabled={!name.trim() || !image} />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

type NumberFieldProps = {
  label: string;
  value: number;
  suffix: string;
  onDecrement: () => void;
  onIncrement: () => void;
  styles: ReturnType<typeof makeStyles>;
};

function NumberField({ label, value, suffix, onDecrement, onIncrement, styles }: NumberFieldProps) {
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.stepperRow}>
        <Pressable onPress={onDecrement} style={styles.stepperButton}>
          <Text style={styles.stepperButtonText}>-</Text>
        </Pressable>
        <View style={styles.stepperValueBox}>
          <Text style={styles.stepperValue}>{value}</Text>
          <Text style={styles.stepperSuffix}>{suffix}</Text>
        </View>
        <Pressable onPress={onIncrement} style={styles.stepperButton}>
          <Text style={styles.stepperButtonText}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}

function makeStyles(palette: Palette, isDark: boolean) {
  return StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: isDark ? 'rgba(0,0,0,0.5)' : 'rgba(20, 50, 58, 0.28)',
  },
  sheet: {
    maxHeight: '92%',
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    backgroundColor: palette.surface,
    ...shadows.card,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: palette.border,
  },
  title: {
    color: palette.text,
    fontSize: 24,
    fontWeight: '300',
  },
  closeButton: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  closeButtonText: {
    color: palette.teal,
    fontSize: 14,
    fontWeight: '700',
  },
  content: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  fieldGroup: {
    gap: spacing.sm,
  },
  label: {
    color: palette.text,
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    minHeight: 54,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: palette.surface,
    paddingHorizontal: spacing.md,
    color: palette.text,
    fontSize: 16,
  },
  imagePickerBox: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: palette.border,
    borderRadius: radius.md,
    padding: spacing.md,
    backgroundColor: palette.surface,
    gap: spacing.md,
  },
  previewImage: {
    width: '100%',
    height: 180,
    borderRadius: radius.md,
    backgroundColor: palette.surfaceMuted,
  },
  imageActions: {
    gap: spacing.sm,
  },
  imagePlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
    gap: spacing.sm,
  },
  imagePlaceholderIcon: {
    color: palette.textMuted,
    fontSize: 32,
  },
  imagePlaceholderText: {
    color: palette.textMuted,
    fontSize: 14,
  },
  stepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  stepperButton: {
    width: 48,
    height: 48,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: palette.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.surface,
  },
  stepperButtonText: {
    color: palette.text,
    fontSize: 24,
    lineHeight: 24,
  },
  stepperValueBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  stepperValue: {
    color: palette.text,
    fontSize: 30,
    fontWeight: '300',
  },
  stepperSuffix: {
    color: palette.textMuted,
    fontSize: 14,
  },
  footerActions: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingTop: spacing.sm,
  },
  footerButton: {
    flex: 1,
  },
  });
}