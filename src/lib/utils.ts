import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { MAX_PAGE_SIZE } from "@/constants/page";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isAuthError(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const status = (error as { status?: number }).status;
  if (status === 401 || status === 403) return true;
  const code = (error as { code?: string }).code;
  return !!code;
}

export function formatCreatedAt(createdAt: string | null): string {
  if (!createdAt) return "Unknown";
  const date = new Date(createdAt);
  if (Number.isNaN(date.getTime())) return "Unknown";
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

type PlainObject = Record<string | number, unknown>;

export function shallowEqual(objA: PlainObject, objB: PlainObject): boolean {
  if (objA === objB) return true;

  if (objA == null || objB == null) return false;

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  return keysA.every((key) => objA[key] === objB[key]);
}

export function clampPageSize(pageSize: number): number {
  return Math.min(Math.max(1, pageSize), MAX_PAGE_SIZE);
}
