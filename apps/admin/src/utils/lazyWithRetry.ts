import { lazy as reactLazy } from "react";
import type { ComponentType } from "react";

export function lazy<TModule extends { default: ComponentType<unknown> }>(factory: () => Promise<TModule>) {
  return reactLazy(factory);
}
