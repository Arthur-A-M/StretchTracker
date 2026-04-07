import AsyncStorage from '@react-native-async-storage/async-storage';

import { defaultStretches } from './defaults';
import { Stretch } from './types';

const STORAGE_KEY = 'stretchflow_routine';

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

    return parsedValue as Stretch[];
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