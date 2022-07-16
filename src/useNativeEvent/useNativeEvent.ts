import { MutableRefObject, RefObject, useCallback, useEffect, useRef } from 'react';

import { isRef } from '../utils';

type TargetElement = Element | HTMLElement | Document | Window;

type Options = boolean | UseNativeEventOptions;

type EmptyRecord = Record<string, never>;

interface EventItem {
  elem: TargetElement;
  listener: EventListener;
}

type Store = {
  current: Record<string, Record<string, EventItem[]>> | EmptyRecord;
};

export interface UseNativeEventOptions extends AddEventListenerOptions {
  initial?: boolean;
}

export type UseNativeEvent = (
  target: TargetElement | RefObject<TargetElement> | MutableRefObject<TargetElement>,
  type: string,
  listener: EventListener,
  options?: Options,
) => void;

export const store: Store = { current: {} };

/**
 * Simplifies the subscribing to events on any HTML element or React ref. Deletes the subscription after unmount component
 *
 * @see http://www.kundinos.ru/docs/react-hooks/hooks/use-native-event
 */
export const useNativeEvent: UseNativeEvent = (target, type, listener, inputOptions) => {
  const isInited = useRef(false);
  const options = useRef(inputOptions);

  const getInitTarget = useCallback(() => {
    return isRef(target)
      ? (target as MutableRefObject<TargetElement>).current
      : (target as TargetElement);
  }, [target]);

  const getFinalTarget = useCallback(() => {
    return getInitTarget() === window ? window : document;
  }, [getInitTarget]);

  const getKey = useCallback((elem: TargetElement) => {
    return elem === window ? 'window' : 'document';
  }, []);

  const handleEvent = useCallback(
    (e) => {
      const key = getKey(e.target);
      const listeners = store.current[key][e.type];

      listeners.forEach((obj) => {
        if (key === 'document' && obj.elem === document) {
          obj.listener(e);
          return;
        }

        if (obj.elem === e.target) {
          obj.listener(e);
        }
      });
    },
    [getKey],
  );

  const addEventListener = useCallback(() => {
    const initTarget = getInitTarget();
    const finalTarget = getFinalTarget();
    const key = getKey(finalTarget);

    if (!store.current[key]) store.current[key] = {};
    if (!store.current[key][type]) store.current[key][type] = [];

    const eventsMap = store.current[key];

    eventsMap[type].push({ elem: initTarget, listener });

    if (eventsMap[type].length === 1) {
      finalTarget.addEventListener(type, handleEvent, options.current);
    }
  }, [getFinalTarget, getInitTarget, getKey, handleEvent, listener, type]);

  const removeEventListener = useCallback(() => {
    const initTarget = getInitTarget();
    const finalTarget = getFinalTarget();
    const key = getKey(finalTarget);
    const eventsMap = store.current[key];

    // Remove the inner listener
    if (eventsMap && eventsMap[type] && eventsMap[type].length > 0) {
      store.current[key][type] = eventsMap[type].filter((obj) => {
        return initTarget !== null && obj.elem !== initTarget;
      });
    }

    // Remove the native listener if don't have inner listeners
    if (!eventsMap || !eventsMap[type] || eventsMap[type].length === 0) {
      finalTarget.removeEventListener(type, handleEvent);
    }
  }, [getFinalTarget, getInitTarget, getKey, handleEvent, type]);

  // Emit the initial event if specified options.initial
  useEffect(() => {
    const initTarget = getInitTarget();

    if (isInited.current) return;
    if (typeof options.current === 'object' && options.current.initial) {
      isInited.current = true;
      listener.bind(initTarget, null)();
    }
  }, [getInitTarget, listener, options]);

  // Add event listeners
  useEffect(() => {
    addEventListener();

    return removeEventListener;
  }, [addEventListener, removeEventListener]);
};
