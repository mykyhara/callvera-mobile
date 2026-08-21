import { ValueOf } from "@/types/utils";

export const ALL_FRANCHISES = "all-franchises" as const;
export const ALL_LOCATIONS = "all-locations" as const;

export const Direction = {
  INBOUND: "inbound",
  OUTBOUND: "outbound",
  ALL: "all",
} as const;
export type DirectionType = ValueOf<typeof Direction>;
