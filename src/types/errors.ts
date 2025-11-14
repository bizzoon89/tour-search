export type ErrorResponse = {
  error: true;
  code: number;
  message: string;
  waitUntil?: string;
};
