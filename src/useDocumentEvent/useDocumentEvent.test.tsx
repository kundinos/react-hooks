import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import useDocumentEvent from './useDocumentEvent';

test('Must correctly call the listener', () => {
  const listener = jest.fn();

  const Component = () => {
    useDocumentEvent('load', listener);

    return <div />;
  };

  render(<Component />);

  fireEvent.load(document);
  expect(listener.mock.calls.length).toBe(1);

  fireEvent.load(document);
  expect(listener.mock.calls.length).toBe(2);
});

test('Must delete the listener when unmounting', () => {
  const listener = jest.fn();

  const Component = () => {
    useDocumentEvent('load', listener);

    return <div />;
  };

  const { unmount } = render(<Component />);

  fireEvent.load(document);
  expect(listener.mock.calls.length).toBe(1);

  unmount();
  fireEvent.load(document);
  expect(listener.mock.calls.length).toBe(1);
});
