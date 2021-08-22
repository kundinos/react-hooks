export type UseFetchResult = {
  loading: boolean;
  response: Response;
  error: unknown;
  repeat: () => void;
};

/**
 * Allows to execute a fetch request
 */
export type UseFetch = (input: RequestInfo, init?: RequestInit) => UseFetchResult;
