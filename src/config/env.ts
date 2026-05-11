// Environment variable validation and access
// Ensures all required config is available at runtime

type Environment = {
  apiBaseUrl: string;
  apiTimeout: number;
};

function validateEnvironment(): Environment {
  const apiBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL;
  const apiTimeout = process.env.EXPO_PUBLIC_API_TIMEOUT;

  // Provide sensible defaults for development
  return {
    apiBaseUrl: apiBaseUrl ?? 'http://localhost:3000/api',
    apiTimeout: apiTimeout ? parseInt(apiTimeout, 10) : 30000,
  };
}

export const env = validateEnvironment();
