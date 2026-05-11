export type ApiResponse<TData> = {
  data: TData;
  message?: string;
};

export type ApiErrorBody = {
  message: string;
  code?: string;
  details?: unknown;
};

export type ApiErrorResponse = {
  status: number;
  error: ApiErrorBody;
};

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
