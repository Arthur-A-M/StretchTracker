import * as SecureStore from 'expo-secure-store';

import { AuthSession, AuthToken } from './types';

const AUTH_TOKEN_KEY = 'stretchtracker_auth_token';
const AUTH_SESSION_KEY = 'stretchtracker_auth_session';

export async function saveAuthToken(token: AuthToken): Promise<void> {
  try {
    await SecureStore.setItemAsync(AUTH_TOKEN_KEY, JSON.stringify(token));
  } catch (error) {
    console.error('Error saving auth token:', error);
  }
}

export async function getAuthToken(): Promise<AuthToken | null> {
  try {
    const value = await SecureStore.getItemAsync(AUTH_TOKEN_KEY);

    if (!value) {
      return null;
    }

    return JSON.parse(value) as AuthToken;
  } catch (error) {
    console.error('Error loading auth token:', error);
    return null;
  }
}

export async function clearAuthToken(): Promise<void> {
  try {
    await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
  } catch (error) {
    console.error('Error clearing auth token:', error);
  }
}

export async function saveAuthSession(session: AuthSession): Promise<void> {
  try {
    await Promise.all([
      saveAuthToken(session.token),
      SecureStore.setItemAsync(AUTH_SESSION_KEY, JSON.stringify(session)),
    ]);
  } catch (error) {
    console.error('Error saving auth session:', error);
  }
}

export async function getAuthSession(): Promise<AuthSession | null> {
  try {
    const value = await SecureStore.getItemAsync(AUTH_SESSION_KEY);

    if (!value) {
      const token = await getAuthToken();
      return token ? { token } : null;
    }

    return JSON.parse(value) as AuthSession;
  } catch (error) {
    console.error('Error loading auth session:', error);
    return null;
  }
}

export async function clearAuthSession(): Promise<void> {
  try {
    await Promise.all([
      clearAuthToken(),
      SecureStore.deleteItemAsync(AUTH_SESSION_KEY),
    ]);
  } catch (error) {
    console.error('Error clearing auth session:', error);
  }
}
