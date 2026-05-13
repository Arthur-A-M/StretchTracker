import { AuthCredentials, AuthSession, AuthUser } from '../../features/auth/types';
import { API_ENDPOINTS } from '../../config/constants';
import { httpClient } from '../httpClient';

// TODO: Implement real login endpoint when backend API exists.
// Expected request: POST /auth/login with { email, password }
// Expected response: { token: { accessToken, refreshToken?, expiresAt? }, user?: { id, email, name? } }
export async function login(credentials: AuthCredentials): Promise<AuthSession> {
  try {
    // Placeholder: replace with actual httpClient.post call when API is ready
    console.warn('login() is not implemented yet. Endpoint:', API_ENDPOINTS.auth.login);
    throw new Error('Auth service not yet implemented');
  } catch (error) {
    throw error;
  }
}

// TODO: Implement real register endpoint when backend API exists.
// Expected request: POST /auth/register with { email, password }
// Expected response: { token: { accessToken, refreshToken?, expiresAt? }, user?: { id, email, name? } }
export async function register(credentials: AuthCredentials): Promise<AuthSession> {
  try {
    // Placeholder: replace with actual httpClient.post call when API is ready
    console.warn('register() is not implemented yet. Endpoint:', API_ENDPOINTS.auth.register);
    throw new Error('Auth service not yet implemented');
  } catch (error) {
    throw error;
  }
}

// TODO: Implement real logout endpoint when backend API exists.
// Expected request: POST /auth/logout
// Expected response: { success: true }
export async function logout(): Promise<void> {
  try {
    // Placeholder: replace with actual httpClient.post call when API is ready
    console.warn('logout() is not implemented yet. Endpoint:', API_ENDPOINTS.auth.logout);
  } catch (error) {
    console.error('Error during logout:', error);
  }
}

// TODO: Implement real token refresh endpoint when backend API exists.
// Expected request: POST /auth/refresh with { refreshToken }
// Expected response: { token: { accessToken, refreshToken?, expiresAt? } }
export async function refreshAuthToken(refreshToken: string): Promise<string> {
  try {
    // Placeholder: replace with actual httpClient.post call when API is ready
    console.warn('refreshAuthToken() is not implemented yet. Endpoint:', API_ENDPOINTS.auth.refresh);
    throw new Error('Token refresh not yet implemented');
  } catch (error) {
    throw error;
  }
}
