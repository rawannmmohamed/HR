import type { CurrentUser } from "../types";

export function getAuthUserDisplayName(user: CurrentUser | null, fallback: string) {
  return user?.displayName?.trim() || user?.email || fallback;
}

export function getAuthUserInitial(user: CurrentUser | null, fallback: string) {
  const displayName = getAuthUserDisplayName(user, fallback).trim();
  return displayName.charAt(0).toUpperCase() || fallback.charAt(0).toUpperCase();
}
