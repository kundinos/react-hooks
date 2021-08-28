export type UseDatePeriod = 'millisecond' | 'second' | 'minute' | 'hour' | 'day' | number;

export interface UseDateOptions {
  every: UseDatePeriod;
}

/**
 * Returns a stateful current date, that will update every specified period
 *
 * @param options.every The period updating the date. Possible values: millisecond, second (by default), minute, hour, day or custom number of milliseconds
 *
 * @see https://kundinos.ru/react-hooks/useDate
 */
export type UseDate = (options?: UseDateOptions) => Date;
