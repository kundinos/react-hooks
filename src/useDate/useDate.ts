import { useEffect, useState } from 'react';

import useInterval from '../useInterval';

export type UseDatePeriod = 'millisecond' | 'second' | 'minute' | 'hour' | 'day' | number;

export interface UseDateOptions {
  every: UseDatePeriod;
}

export type UseDate = (opts?: UseDateOptions) => Date;

function getDelay(period: UseDatePeriod): number {
  if (typeof period === 'number') return period;

  const millisecond = 1;
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const periods = { millisecond, second, minute, hour, day };

  return periods[period];
}

const useDate: UseDate = (opts) => {
  const period = opts?.every || 'second';
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

export default useDate;
