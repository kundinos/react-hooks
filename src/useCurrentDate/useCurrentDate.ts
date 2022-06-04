import { useEffect, useState } from 'react';

import { useInterval } from '../useInterval';

export type UseCurrentDatePeriod = 'millisecond' | 'second' | 'minute' | 'hour' | 'day' | number;

export interface UseCurrentDateOptions {
  every?: UseCurrentDatePeriod;
}

export type UseCurrentDate = (options?: UseCurrentDateOptions) => Date;

function getDelay(period: UseCurrentDatePeriod): number {
  if (typeof period === 'number') return period;

  const millisecond = 1;
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const periods = { millisecond, second, minute, hour, day };

  return periods[period];
}

/**
 * Returns a stateful current date, that will update every specified period
 *
 * @param options.every The period updating the date. Possible values: millisecond, second (by default), minute, hour, day or custom number of milliseconds
 *
 * @see http://www.kundinos.ru/docs/react-hooks/hooks/use-current-date
 */
export const useCurrentDate: UseCurrentDate = (options = {}) => {
  const period = options.every || 'second';
  const [date, setDate] = useState(new Date());
  const [delay, setDelay] = useState(getDelay(period));

  useInterval(() => {
    setDate(new Date());
  }, delay);

  useEffect(() => {
    setDelay(getDelay(period));
  }, [period]);

  return date;
};
