export interface ApiResponse<T> {
  value: T | null;
  succeeded: boolean;
  message: string;
  statusCode: number;
}

export interface PaginatedResponse<T> {
  items: T;
  totalItems: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}