export type ValueOf<T extends Record<string | number, any>> = T[keyof T];

export interface FilterOption<T> {
  label: string;
  value: T;
}

export interface DateRange {
  startDate: string | null;
  endDate: string | null;
}

export type SetStateHandler<TValue> = React.Dispatch<
  React.SetStateAction<TValue>
>;

export type UpdateObjectHandler<T extends Record<string, any>> = <
  TKey extends keyof T,
>(
  key: TKey,
  value: T[TKey],
) => void;
