export type AuthCredentials = {
  email: string;
  password: string;
};

export type AuthToken = {
  accessToken: string;
  refreshToken?: string;
  expiresAt?: string;
};

export type AuthUser = {
  id: string;
  email: string;
  name?: string;
};

export type AuthSession = {
  token: AuthToken;
  user?: AuthUser;
};

export enum AuthErrorCode {
  InvalidCredentials = 'INVALID_CREDENTIALS',
  SessionExpired = 'SESSION_EXPIRED',
  NetworkUnavailable = 'NETWORK_UNAVAILABLE',
  NotImplemented = 'NOT_IMPLEMENTED',
  Unknown = 'UNKNOWN',
}
