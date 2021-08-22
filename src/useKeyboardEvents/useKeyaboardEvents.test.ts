import { fireEvent } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import useKeyboardEvents from './useKeyboardEvents';

describe('Must correctly call the listeners', () => {
  test('onKeyDown', () => {
    const onKeyDown = jest.fn();
    const eventOpts = { key: 'd', code: 'KeyD' };

    renderHook(() => useKeyboardEvents({ onKeyDown }));

    expect(onKeyDown.mock.calls.length).toBe(0);

    fireEvent.keyDown(window, eventOpts);
    expect(onKeyDown.mock.calls.length).toBe(1);

    fireEvent.keyDown(window, eventOpts);
    expect(onKeyDown.mock.calls.length).toBe(2);
  });

  test('onKeyPress', () => {
    const onKeyPress = jest.fn();
    const eventOpts = { key: 'p', code: 'KeyP' };

    renderHook(() => useKeyboardEvents({ onKeyPress }));

    expect(onKeyPress.mock.calls.length).toBe(0);

    fireEvent.keyPress(window, eventOpts);
    expect(onKeyPress.mock.calls.length).toBe(1);

    fireEvent.keyPress(window, eventOpts);
    expect(onKeyPress.mock.calls.length).toBe(2);
  });

  test('onKeyUp', () => {
    const onKeyUp = jest.fn();
    const eventOpts = { key: 'u', code: 'KeyU' };

    renderHook(() => useKeyboardEvents({ onKeyUp }));

    expect(onKeyUp.mock.calls.length).toBe(0);

    fireEvent.keyUp(window, eventOpts);
    expect(onKeyUp.mock.calls.length).toBe(1);

    fireEvent.keyUp(window, eventOpts);
    expect(onKeyUp.mock.calls.length).toBe(2);
  });

  test('onArrowUp', () => {
    const onArrowUp = jest.fn();
    const eventOpts = { key: 'ArrowUp', code: 'ArrowUp' };

    renderHook(() => useKeyboardEvents({ onArrowUp }));

    expect(onArrowUp.mock.calls.length).toBe(0);

    fireEvent.keyDown(window, eventOpts);
    expect(onArrowUp.mock.calls.length).toBe(1);

    fireEvent.keyDown(window, eventOpts);
    expect(onArrowUp.mock.calls.length).toBe(2);
  });

  test('onArrowRight', () => {
    const onArrowRight = jest.fn();
    const eventOpts = { key: 'ArrowRight', code: 'ArrowRight' };

    renderHook(() => useKeyboardEvents({ onArrowRight }));

    expect(onArrowRight.mock.calls.length).toBe(0);

    fireEvent.keyDown(window, eventOpts);
    expect(onArrowRight.mock.calls.length).toBe(1);

    fireEvent.keyDown(window, eventOpts);
    expect(onArrowRight.mock.calls.length).toBe(2);
  });

  test('onArrowDown', () => {
    const onArrowDown = jest.fn();
    const eventOpts = { key: 'ArrowDown', code: 'ArrowDown' };

    renderHook(() => useKeyboardEvents({ onArrowDown }));

    expect(onArrowDown.mock.calls.length).toBe(0);

    fireEvent.keyDown(window, eventOpts);
    expect(onArrowDown.mock.calls.length).toBe(1);

    fireEvent.keyDown(window, eventOpts);
    expect(onArrowDown.mock.calls.length).toBe(2);
  });

  test('onArrowLeft', () => {
    const onArrowLeft = jest.fn();
    const eventOpts = { key: 'ArrowLeft', code: 'ArrowLeft' };

    renderHook(() => useKeyboardEvents({ onArrowLeft }));

    expect(onArrowLeft.mock.calls.length).toBe(0);

    fireEvent.keyDown(window, eventOpts);
    expect(onArrowLeft.mock.calls.length).toBe(1);

    fireEvent.keyDown(window, eventOpts);
    expect(onArrowLeft.mock.calls.length).toBe(2);
  });

  test('onSpace', () => {
    const onSpace = jest.fn();
    const eventOpts = { code: 'Space' };

    renderHook(() => useKeyboardEvents({ onSpace }));

    expect(onSpace.mock.calls.length).toBe(0);

    fireEvent.keyDown(window, eventOpts);
    expect(onSpace.mock.calls.length).toBe(1);

    fireEvent.keyDown(window, eventOpts);
    expect(onSpace.mock.calls.length).toBe(2);
  });

  test('onEscape', () => {
    const onEscape = jest.fn();
    const eventOpts = { key: 'Escape', code: 'Escape' };

    renderHook(() => useKeyboardEvents({ onEscape }));

    expect(onEscape.mock.calls.length).toBe(0);

    fireEvent.keyDown(window, eventOpts);
    expect(onEscape.mock.calls.length).toBe(1);

    fireEvent.keyDown(window, eventOpts);
    expect(onEscape.mock.calls.length).toBe(2);
  });
});
