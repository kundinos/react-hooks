import { useCallback, useEffect, useState } from 'react';

type UseFetchResult = {
  loading: boolean;
  response: Response;
  error: unknown;
  repeat: () => void;
};

type UseFetch = (input: RequestInfo, init?: RequestInit) => UseFetchResult;

const useFetch: UseFetch = (input, init) => {
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState<Response>(null);
  const [error, setError] = useState<unknown>(null);
  const [counter, setCounter] = useState(1);

  const repeat = useCallback(() => {
    setCounter((prev) => prev + 1);
  }, []);

  useEffect(() => {
    async function load() {
      setLoading(true);

      try {
        const response = await fetch(input, init);

        setResponse(response);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [counter]);

  return {
    loading,
    response,
    error,
    repeat,
  };
};

export default useFetch;
