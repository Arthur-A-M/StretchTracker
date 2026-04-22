import AsyncStorage from '@react-native-async-storage/async-storage';

import { defaultStretches } from './defaults';
import { Stretch } from './types';

const STORAGE_KEY = 'stretchflow_routine';

const LEGACY_MOCK_STRETCHES: ReadonlyArray<Pick<Stretch, 'id' | 'name' | 'duration' | 'sets' | 'restTime'>> = [
  { id: '1', name: 'Neck Rolls', duration: 30, sets: 2, restTime: 10 },
  { id: '2', name: 'Shoulder Stretch', duration: 20, sets: 3, restTime: 10 },
  { id: '3', name: 'Hamstring Stretch', duration: 30, sets: 2, restTime: 15 },
  { id: '4', name: 'Quad Stretch', duration: 25, sets: 2, restTime: 10 },
];

function isLegacyMockRoutine(stretches: Stretch[]): boolean {
  if (stretches.length !== LEGACY_MOCK_STRETCHES.length) {
    return false;
  }

  return stretches.every((stretch, index) => {
    const expected = LEGACY_MOCK_STRETCHES[index];

    return (
      stretch.id === expected.id &&
      stretch.name === expected.name &&
      stretch.duration === expected.duration &&
      stretch.sets === expected.sets &&
      stretch.restTime === expected.restTime
    );
  });
}

export async function getStoredStretches(): Promise<Stretch[]> {
  try {
    const storedValue = await AsyncStorage.getItem(STORAGE_KEY);

    if (!storedValue) {
      return defaultStretches;
    }

    const parsedValue = JSON.parse(storedValue) as unknown;

    if (!Array.isArray(parsedValue)) {
      return defaultStretches;
    }

    const storedStretches = parsedValue as Stretch[];

    if (isLegacyMockRoutine(storedStretches)) {
      return defaultStretches;
    }

    return storedStretches;
  } catch (error) {
    console.error('Error loading stretches:', error);
    return defaultStretches;
  }
}

export async function saveStoredStretches(stretches: Stretch[]): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(stretches));
  } catch (error) {
    console.error('Error saving stretches:', error);
  }
}

export function generateStretchId(): string {
  return Date.now().toString() + Math.random().toString(36).substring(2, 9);
}