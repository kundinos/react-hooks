export type UseDatePeriod = 'millisecond' | 'second' | 'minute' | 'hour' | 'day' | number;

export interface UseDateOptions {
  every: UseDatePeriod;
}

export type UseDate = (opts?: UseDateOptions) => Date;
