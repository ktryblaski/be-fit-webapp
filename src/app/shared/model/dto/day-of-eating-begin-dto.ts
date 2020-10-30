export enum DayOfEatingBeginOrigin {
  NEW,
  AS_COPY,
}

export interface DayOfEatingBeginDTO {
  origin: DayOfEatingBeginOrigin;
  originDayId: number | null;
}
