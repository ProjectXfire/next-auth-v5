export interface IResponse<T> {
  error: null | string;
  success: null | string;
  data: T;
}
