import { useEffect, useState } from 'react';

import useInterval from '../useInterval';
import { UseCurrentDate, UseCurrentDatePeriod } from './typings';

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

const useCurrentDate: UseCurrentDate = (options) => {
  const period = options?.every || 'second';
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

export default useCurrentDate;
