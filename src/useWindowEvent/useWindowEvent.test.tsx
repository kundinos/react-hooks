import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import useWindowEvent from './useWindowEvent';

test('Must correctly call the listener', () => {
  const listener = jest.fn();

  const Component = () => {
    useWindowEvent('load', listener);

    return <div />;
  };

  render(<Component />);

  fireEvent.load(window);
  expect(listener.mock.calls.length).toBe(1);

  fireEvent.load(window);
  expect(listener.mock.calls.length).toBe(2);
});

test('Must delete the listener when unmounting', () => {
  const listener = jest.fn();

  const Component = () => {
    useWindowEvent('load', listener);

    return <div />;
  };

  const { unmount } = render(<Component />);

  fireEvent.load(window);
  unmount();
  fireEvent.load(window);

  expect(listener.mock.calls.length).toBe(1);
});
