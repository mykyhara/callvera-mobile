import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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

type PlainObject = Record<string | number, unknown>;

export function shallowEqual(objA: PlainObject, objB: PlainObject): boolean {
  if (objA === objB) return true;

  if (objA == null || objB == null) return false;

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  return keysA.every((key) => objA[key] === objB[key]);
}
