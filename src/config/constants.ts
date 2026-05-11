// API endpoint constants
// TODO: Update these when backend endpoints are finalized

export const API_ENDPOINTS = {
  // Authentication
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
  },

  // Routines
  routines: {
    list: '/routines',
    create: '/routines',
    get: (id: string) => `/routines/${id}`,
    update: (id: string) => `/routines/${id}`,
    delete: (id: string) => `/routines/${id}`,
  },
} as const;

// HTTP status codes and error handling
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

// Retry and timeout configuration
export const REQUEST_CONFIG = {
  MAX_RETRIES: 3,
  RETRY_DELAY_MS: 1000,
  RETRY_BACKOFF_MULTIPLIER: 2,
  REQUEST_TIMEOUT_MS: 30000,
} as const;
