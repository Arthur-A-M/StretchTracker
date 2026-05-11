import axios from 'axios';

import { ApiErrorBody } from './types';

export class AppApiError extends Error {
  status?: number;
  code?: string;
  details?: unknown;

  constructor(message: string, status?: number, code?: string, details?: unknown) {
    super(message);
    this.name = 'AppApiError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export function toAppApiError(error: unknown): AppApiError {
  if (error instanceof AppApiError) {
    return error;
  }

  if (axios.isAxiosError(error)) {
    const responseStatus = error.response?.status;
    const responseData = error.response?.data as Partial<ApiErrorBody> | undefined;

    return new AppApiError(
      responseData?.message ?? error.message ?? 'Request failed',
      responseStatus,
      responseData?.code,
      responseData?.details
    );
  }

  if (error instanceof Error) {
    return new AppApiError(error.message);
  }

  return new AppApiError('Unknown API error');
}

export function isAuthError(error: unknown): boolean {
  const apiError = toAppApiError(error);
  return apiError.status === 401 || apiError.status === 403;
}

export function isNetworkError(error: unknown): boolean {
  if (!axios.isAxiosError(error)) {
    return false;
  }

  return !error.response;
}
