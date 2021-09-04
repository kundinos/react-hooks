export type UseFetchResult = {
  loading: boolean;
  response: Response;
  error: unknown;
  repeat: () => void;
};

export type UseFetch = (input: RequestInfo, init?: RequestInit) => UseFetchResult;
