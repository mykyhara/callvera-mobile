export type ValueOf<T extends Record<string | number, any>> = T[keyof T];

export interface FilterOption<T> {
  label: string;
  value: T;
}
