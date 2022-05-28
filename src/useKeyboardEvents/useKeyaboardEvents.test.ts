import { fireEvent } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { useKeyboardEvents } from './useKeyboardEvents';

describe('Must correctly call the listeners', () => {
  test('onKeyDown', () => {
    const onKeyDown = jest.fn();
    const eventOpts = { key: 'd', code: 'KeyD' };

    renderHook(() => useKeyboardEvents({ onKeyDown }));

    expect(onKeyDown).toHaveBeenCalledTimes(0);

    fireEvent.keyDown(window, eventOpts);
    expect(onKeyDown).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(window, eventOpts);
    expect(onKeyDown).toHaveBeenCalledTimes(2);
  });

  test('onKeyPress', () => {
    const onKeyPress = jest.fn();
    const eventOpts = { key: 'p', code: 'KeyP' };

    renderHook(() => useKeyboardEvents({ onKeyPress }));

    expect(onKeyPress).toHaveBeenCalledTimes(0);

    fireEvent.keyPress(window, eventOpts);
    expect(onKeyPress).toHaveBeenCalledTimes(1);

    fireEvent.keyPress(window, eventOpts);
    expect(onKeyPress).toHaveBeenCalledTimes(2);
  });

  test('onKeyUp', () => {
    const onKeyUp = jest.fn();
    const eventOpts = { key: 'u', code: 'KeyU' };

    renderHook(() => useKeyboardEvents({ onKeyUp }));

    expect(onKeyUp).toHaveBeenCalledTimes(0);

    fireEvent.keyUp(window, eventOpts);
    expect(onKeyUp).toHaveBeenCalledTimes(1);

    fireEvent.keyUp(window, eventOpts);
    expect(onKeyUp).toHaveBeenCalledTimes(2);
  });

  test('onArrowUp', () => {
    const onArrowUp = jest.fn();
    const eventOpts = { key: 'ArrowUp', code: 'ArrowUp' };

    renderHook(() => useKeyboardEvents({ onArrowUp }));

    expect(onArrowUp).toHaveBeenCalledTimes(0);

    fireEvent.keyDown(window, eventOpts);
    expect(onArrowUp).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(window, eventOpts);
    expect(onArrowUp).toHaveBeenCalledTimes(2);
  });

  test('onArrowRight', () => {
    const onArrowRight = jest.fn();
    const eventOpts = { key: 'ArrowRight', code: 'ArrowRight' };

    renderHook(() => useKeyboardEvents({ onArrowRight }));

    expect(onArrowRight).toHaveBeenCalledTimes(0);

    fireEvent.keyDown(window, eventOpts);
    expect(onArrowRight).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(window, eventOpts);
    expect(onArrowRight).toHaveBeenCalledTimes(2);
  });

  test('onArrowDown', () => {
    const onArrowDown = jest.fn();
    const eventOpts = { key: 'ArrowDown', code: 'ArrowDown' };

    renderHook(() => useKeyboardEvents({ onArrowDown }));

    expect(onArrowDown).toHaveBeenCalledTimes(0);

    fireEvent.keyDown(window, eventOpts);
    expect(onArrowDown).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(window, eventOpts);
    expect(onArrowDown).toHaveBeenCalledTimes(2);
  });

  test('onArrowLeft', () => {
    const onArrowLeft = jest.fn();
    const eventOpts = { key: 'ArrowLeft', code: 'ArrowLeft' };

    renderHook(() => useKeyboardEvents({ onArrowLeft }));

    expect(onArrowLeft).toHaveBeenCalledTimes(0);

    fireEvent.keyDown(window, eventOpts);
    expect(onArrowLeft).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(window, eventOpts);
    expect(onArrowLeft).toHaveBeenCalledTimes(2);
  });

  test('onUp', () => {
    const onUp = jest.fn();
    const eventArrowOpts = { key: 'ArrowUp', code: 'ArrowUp' };
    const eventSymbolOpts = { code: 'KeyW' };

    renderHook(() => useKeyboardEvents({ onUp }));

    expect(onUp).toHaveBeenCalledTimes(0);

    fireEvent.keyDown(window, eventArrowOpts);
    expect(onUp).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(window, eventSymbolOpts);
    expect(onUp).toHaveBeenCalledTimes(2);
  });

  test('onRight', () => {
    const onRight = jest.fn();
    const eventArrowOpts = { key: 'ArrowRight', code: 'ArrowRight' };
    const eventSymbolOpts = { code: 'KeyD' };

    renderHook(() => useKeyboardEvents({ onRight }));

    expect(onRight).toHaveBeenCalledTimes(0);

    fireEvent.keyDown(window, eventArrowOpts);
    expect(onRight).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(window, eventSymbolOpts);
    expect(onRight).toHaveBeenCalledTimes(2);
  });

  test('onDown', () => {
    const onDown = jest.fn();
    const eventArrowOpts = { key: 'ArrowDown', code: 'ArrowDown' };
    const eventSymbolOpts = { code: 'KeyS' };

    renderHook(() => useKeyboardEvents({ onDown }));

    expect(onDown).toHaveBeenCalledTimes(0);

    fireEvent.keyDown(window, eventArrowOpts);
    expect(onDown).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(window, eventSymbolOpts);
    expect(onDown).toHaveBeenCalledTimes(2);
  });

  test('onLeft', () => {
    const onLeft = jest.fn();
    const eventArrowOpts = { key: 'ArrowLeft', code: 'ArrowLeft' };
    const eventSymbolOpts = { code: 'KeyA' };

    renderHook(() => useKeyboardEvents({ onLeft }));

    expect(onLeft).toHaveBeenCalledTimes(0);

    fireEvent.keyDown(window, eventArrowOpts);
    expect(onLeft).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(window, eventSymbolOpts);
    expect(onLeft).toHaveBeenCalledTimes(2);
  });

  test('onSpace', () => {
    const onSpace = jest.fn();
    const eventOpts = { code: 'Space' };

    renderHook(() => useKeyboardEvents({ onSpace }));

    expect(onSpace).toHaveBeenCalledTimes(0);

    fireEvent.keyDown(window, eventOpts);
    expect(onSpace).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(window, eventOpts);
    expect(onSpace).toHaveBeenCalledTimes(2);
  });

  test('onEscape', () => {
    const onEscape = jest.fn();
    const eventOpts = { key: 'Escape', code: 'Escape' };

    renderHook(() => useKeyboardEvents({ onEscape }));

    expect(onEscape).toHaveBeenCalledTimes(0);

    fireEvent.keyDown(window, eventOpts);
    expect(onEscape).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(window, eventOpts);
    expect(onEscape).toHaveBeenCalledTimes(2);
  });

  test('onTab', () => {
    const onTab = jest.fn();
    const eventOpts = { key: 'Tab', code: 'Tab' };

    renderHook(() => useKeyboardEvents({ onTab }));

    expect(onTab).toHaveBeenCalledTimes(0);

    fireEvent.keyDown(window, eventOpts);
    expect(onTab).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(window, eventOpts);
    expect(onTab).toHaveBeenCalledTimes(2);
  });
});
