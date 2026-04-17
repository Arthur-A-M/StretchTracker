import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';

import { AppButton } from '../../../components/AppButton';
import { usePalette, usePreferences } from '../../../state/PreferencesContext';
import { Stretch } from '../types';
import { makeStyles } from './styles';

type StretchDraft = Omit<Stretch, 'id'>;

type StretchEditorModalProps = {
  visible: boolean;
  stretch: Stretch | null;
  onClose: () => void;
  onSave: (draft: StretchDraft, stretchId?: string) => void;
};

export function StretchEditorModal({ visible, stretch, onClose, onSave }: StretchEditorModalProps) {
  const { t: tRoutine } = useTranslation('routine');
  const { t: tCommon } = useTranslation('common');
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
      setImage(stretch.image ?? '');
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
      Alert.alert(tRoutine('modal.permissionTitle'), tRoutine('modal.permissionMessage'));
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
    if (!name.trim()) {
      return;
    }

    onSave(
      {
        name: name.trim(),
        image: image.trim() || undefined,
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
            <Text style={styles.title}>{stretch ? tRoutine('modal.titleEdit') : tRoutine('modal.titleAdd')}</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>{tCommon('close')}</Text>
            </Pressable>
          </View>

          <ScrollView contentContainerStyle={styles.content}>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>{tRoutine('modal.nameLabel')}</Text>
              <TextInput
                onChangeText={setName}
                placeholder={tRoutine('modal.namePlaceholder')}
                placeholderTextColor={palette.textMuted}
                style={styles.input}
                value={name}
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>{tRoutine('modal.imageLabel')}</Text>
              <View style={styles.imagePickerBox}>
                {image ? (
                  <>
                    <Image source={{ uri: image }} style={styles.previewImage} />
                    <View style={styles.imageActions}>
                      <AppButton label={tRoutine('modal.changeImage')} onPress={() => void handlePickImage()} variant="secondary" />
                      <AppButton label={tRoutine('modal.removeImage')} onPress={() => setImage('')} variant="secondary" />
                    </View>
                  </>
                ) : (
                  <Pressable onPress={() => void handlePickImage()} style={styles.imagePlaceholder}>
                    <Text style={styles.imagePlaceholderIcon}>⬆</Text>
                    <Text style={styles.imagePlaceholderText}>{tRoutine('modal.uploadPrompt')}</Text>
                  </Pressable>
                )}
              </View>
            </View>

            <NumberField
              label={tRoutine('modal.durationLabel')}
              suffix={tRoutine('modal.durationSuffix')}
              value={duration}
              onDecrement={() => adjustValue(duration, -5, 10, 300, setDuration)}
              onIncrement={() => adjustValue(duration, 5, 10, 300, setDuration)}
              styles={styles}
            />

            <NumberField
              label={tRoutine('modal.setsLabel')}
              suffix={tRoutine('modal.setsSuffix')}
              value={sets}
              onDecrement={() => adjustValue(sets, -1, 1, 10, setSets)}
              onIncrement={() => adjustValue(sets, 1, 1, 10, setSets)}
              styles={styles}
            />

            <NumberField
              label={tRoutine('modal.restTimeLabel')}
              suffix={tRoutine('modal.restTimeSuffix')}
              value={restTime}
              onDecrement={() => adjustValue(restTime, -5, 0, 120, setRestTime)}
              onIncrement={() => adjustValue(restTime, 5, 0, 120, setRestTime)}
              styles={styles}
            />

            <View style={styles.footerActions}>
              <View style={styles.footerButton}>
                <AppButton label={tCommon('cancel')} onPress={onClose} variant="secondary" />
              </View>
              <View style={styles.footerButton}>
                <AppButton label={tCommon('save')} onPress={handleSubmit} disabled={!name.trim()} />
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
