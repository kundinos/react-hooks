export type UseCurrentDatePeriod = 'millisecond' | 'second' | 'minute' | 'hour' | 'day' | number;

export interface UseCurrentDateOptions {
  every: UseCurrentDatePeriod;
}

export type UseCurrentDate = (options?: UseCurrentDateOptions) => Date;
