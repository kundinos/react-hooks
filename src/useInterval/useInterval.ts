import React, { useState, useEffect, useRef } from 'react';

export type UseIntervalCallback = () => void;

export default (callback: UseIntervalCallback, delay: number) => {
  const refCallback = useRef<UseIntervalCallback>();

  useEffect(() => {
    refCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      refCallback.current();
    }

    if (delay !== null) {
      const intervalId = setInterval(tick, delay);

      return () => clearInterval(intervalId);
    }
  }, [delay]);
};
