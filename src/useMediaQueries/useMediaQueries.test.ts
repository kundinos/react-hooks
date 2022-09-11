import { renderHook } from '@testing-library/react-hooks';
import * as MockMediaQueries from '@kundinos/mock-media-queries';

import { useMediaQueries } from './useMediaQueries';

beforeAll(() => {
  MockMediaQueries.startMock();
});

afterAll(() => {
  MockMediaQueries.cleanup();
});

describe('Base behavior', () => {
  test('Should be defined', () => {
    expect(useMediaQueries).toBeDefined();
  });

  test('Should be render w/o errors', () => {
    const { result } = renderHook(() =>
      useMediaQueries({
        '(prefers-color-scheme: dark)': jest.fn,
      }),
    );

    expect(result.error).toBeUndefined();
  });
});

describe('onChange', () => {
  test('Should not call onChange without event', () => {
    const onChange = jest.fn();

    renderHook(() => {
      useMediaQueries({
        '(prefers-color-scheme: dark)': onChange,
      });
    });

    expect(onChange).toHaveBeenCalledTimes(0);
  });

  test('Should call callback when media query matches', () => {
    const onChangeColorScheme = jest.fn();
    const onChangeMaxWidth = jest.fn();
    const medias = ['(prefers-color-scheme: dark)', '(max-width: 1024px)'];

    renderHook(() => {
      useMediaQueries({
        [medias[0]]: onChangeColorScheme,
        [medias[1]]: onChangeMaxWidth,
      });
    });

    MockMediaQueries.fireEvent({ media: medias[0], matches: true });
    expect(onChangeColorScheme).toHaveBeenCalledTimes(1);
    expect(onChangeMaxWidth).toHaveBeenCalledTimes(0);
    expect(onChangeColorScheme).toHaveBeenCalledWith({
      matches: true,
      media: medias[0],
      type: 'change',
    });

    MockMediaQueries.fireEvent({ media: medias[1], matches: false });
    expect(onChangeColorScheme).toHaveBeenCalledTimes(1);
    expect(onChangeMaxWidth).toHaveBeenCalledTimes(1);
    expect(onChangeMaxWidth).toHaveBeenCalledWith({
      matches: false,
      media: medias[1],
      type: 'change',
    });
  });

  test('Should not call callback when matches different media query', () => {
    const onChange = jest.fn();

    renderHook(() => useMediaQueries({ '(prefers-color-scheme: dark)': onChange }));

    MockMediaQueries.fireEvent({ media: '(prefers-color-scheme: light)', matches: true });
    expect(onChange).toHaveBeenCalledTimes(0);
  });
});

describe('Cleanup', () => {
  test('Should correct remove one listener', () => {
    const onChange = jest.fn();
    const { unmount } = renderHook(() => {
      useMediaQueries({ '(prefers-color-scheme: dark)': onChange });
    });

    expect(Object.keys(MockMediaQueries.getListeners()).length).toBe(1);

    unmount();
    expect(Object.keys(MockMediaQueries.getListeners()).length).toBe(0);
  });

  test('Should correct remove several listeners', () => {
    const onChangeColorScheme = jest.fn();
    const onChangeMaxWidth = jest.fn();
    const { unmount } = renderHook(() => {
      useMediaQueries({
        '(prefers-color-scheme: dark)': onChangeColorScheme,
        '(max-width: 100px)': onChangeMaxWidth,
      });
    });

    expect(Object.keys(MockMediaQueries.getListeners()).length).toBe(2);

    unmount();
    expect(Object.keys(MockMediaQueries.getListeners()).length).toBe(0);
  });
});
