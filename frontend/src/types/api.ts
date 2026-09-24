export interface SubscribeResponse {
  message: string;
}

export interface ApiErrorBody {
  message: string | string[];
  statusCode?: number;
  error?: string;
}
