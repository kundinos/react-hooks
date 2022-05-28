import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { useWindowResize } from './useWindowResize';

test('Must correctly call the listener', () => {
  const listener = jest.fn();

  const Component = () => {
    useWindowResize(listener);

    return <div />;
  };

  render(<Component />);

  fireEvent(window, new Event('resize'));
  expect(listener.mock.calls.length).toBe(1);

  fireEvent.load(window);
  expect(listener.mock.calls.length).toBe(1);
});

test('Must delete the listener when unmounting', () => {
  const listener = jest.fn();

  const Component = () => {
    useWindowResize(listener);

    return <div />;
  };

  const { unmount } = render(<Component />);

  fireEvent(window, new Event('resize'));
  unmount();
  fireEvent(window, new Event('resize'));

  expect(listener.mock.calls.length).toBe(1);
});

test('Should be call listener when use options.initial', () => {
  const listener = jest.fn();

  const Component = () => {
    useWindowResize(listener, { initial: true });

    return <div />;
  };

  expect(listener.mock.calls.length).toBe(0);

  render(<Component />);
  expect(listener.mock.calls.length).toBe(1);

  fireEvent(window, new Event('resize'));
  expect(listener.mock.calls.length).toBe(2);
});
