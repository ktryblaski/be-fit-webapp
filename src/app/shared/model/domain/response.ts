export interface ApiResponse<T> {
  data: T;
  error: string;
}

export function mapResponse<T>(response: ApiResponse<T>): T {
  return response.data
}
