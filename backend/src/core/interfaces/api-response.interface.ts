export interface IApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  timestamp?: string;
}

export interface IApiErrorResponse {
  success: false;
  statusCode: number;
  message: string;
  errors: any[];
  timestamp: string;
  path: string;
}
