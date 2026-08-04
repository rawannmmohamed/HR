export type QueryMessageMeta = {
  errorMessage?: string;
  successMessage?: string;
  suppressGlobalError?: boolean;
};

export function getQueryMessageMeta(meta: unknown): QueryMessageMeta {
  if (!meta || typeof meta !== "object") {
    return {};
  }

  return meta as QueryMessageMeta;
}
