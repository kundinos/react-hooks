import fetchMock from 'jest-fetch-mock';
import { act, renderHook } from '@testing-library/react-hooks';

import useFetch from '../useFetch';

describe('Fetching data', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test('Must return a correct JSON response', async () => {
    const trulyResponse = { success: 1 };

    fetchMock.mockResponseOnce(JSON.stringify(trulyResponse));

    let result;
    let waitForNextUpdate;
    act(() => {
      const useFetchRender = renderHook(() => useFetch('/'));

      result = useFetchRender.result;
      waitForNextUpdate = useFetchRender.waitForNextUpdate;
    });

    await waitForNextUpdate();

    const response = await result.current.response.json();

    expect(response).toStrictEqual(trulyResponse);
  });

  test('Must return a correct text response', async () => {
    const trulyResponse = 'Success!';

    fetchMock.mockResponseOnce(trulyResponse);

    let result;
    let waitForNextUpdate;
    act(() => {
      const useFetchRender = renderHook(() => useFetch('/'));

      result = useFetchRender.result;
      waitForNextUpdate = useFetchRender.waitForNextUpdate;
    });

    await waitForNextUpdate();

    const response = await result.current.response.text();

    expect(response).toStrictEqual(trulyResponse);
  });

  test('Must have the correct status', async () => {
    fetchMock.mockResponseOnce('Success!');

    let result;
    let waitForNextUpdate;
    act(() => {
      const useFetchRender = renderHook(() => useFetch('/'));

      result = useFetchRender.result;
      waitForNextUpdate = useFetchRender.waitForNextUpdate;
    });

    expect(result.current.loading).toBeTruthy();
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
  });
});

describe('Repeating the request', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test('Must correctly call the repeated request', async () => {
    fetchMock.mockResponses('The first answer', 'The second answer');

    let result;
    let waitForNextUpdate;
    act(() => {
      const useFetchRender = renderHook(() => useFetch('/'));

      result = useFetchRender.result;
      waitForNextUpdate = useFetchRender.waitForNextUpdate;
    });

    await waitForNextUpdate();
    const firstResponse = await result.current.response.text();
    expect(firstResponse).toStrictEqual('The first answer');

    act(() => {
      result.current.repeat();
    });

    await waitForNextUpdate();
    const secondResponse = await result.current.response.text();
    expect(secondResponse).toStrictEqual('The second answer');
  });

  test('Must have the correct status', async () => {
    fetchMock.mockResponses('1', '2');

    let result;
    let waitForNextUpdate;
    act(() => {
      const useFetchRender = renderHook(() => useFetch('/'));

      result = useFetchRender.result;
      waitForNextUpdate = useFetchRender.waitForNextUpdate;
    });

    expect(result.current.loading).toBeTruthy();

    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();

    act(() => {
      result.current.repeat();
    });
    expect(result.current.loading).toBeTruthy();

    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
  });
});

describe('Throwing the error', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test('Must return the error for failed request', async () => {
    const trulyResponse = new Error('Error message');

    fetchMock.mockReject(trulyResponse);

    let result;
    let waitForNextUpdate;
    act(() => {
      const useFetchRender = renderHook(() => useFetch('/'));

      result = useFetchRender.result;
      waitForNextUpdate = useFetchRender.waitForNextUpdate;
    });

    await waitForNextUpdate();
    const error = await result.current.error;
    expect(error).toStrictEqual(trulyResponse);
  });

  test('Must have the correct status', async () => {
    fetchMock.mockReject(new Error('Error message'));

    let result;
    let waitForNextUpdate;
    act(() => {
      const useFetchRender = renderHook(() => useFetch('/'));

      result = useFetchRender.result;
      waitForNextUpdate = useFetchRender.waitForNextUpdate;
    });

    expect(result.current.loading).toBeTruthy();
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
  });
});
