import { AxiosError } from "axios";
import { ApiError } from "../api";

export type QueryToastMessage = {
  description?: string;
  title: string;
};

type ResponseBody = {
  detail?: string;
  errors?: Record<string, string[]>;
  message?: string;
  title?: string;
};

const statusMessages: Record<number, QueryToastMessage> = {
  0: {
    title: "Connection problem",
    description: "We could not reach the server. Check your connection and try again.",
  },
  400: {
    title: "Check the information",
    description: "Some information looks invalid. Please review it and try again.",
  },
  401: {
    title: "Session expired",
    description: "Please sign in again to continue.",
  },
  403: {
    title: "Access denied",
    description: "Your account does not have permission to perform this action.",
  },
  404: {
    title: "Not found",
    description: "We could not find the requested information.",
  },
  409: {
    title: "Conflict",
    description: "This information was changed elsewhere. Refresh and try again.",
  },
  422: {
    title: "Validation failed",
    description: "Please review the highlighted information and try again.",
  },
  429: {
    title: "Too many requests",
    description: "Please wait a moment before trying again.",
  },
  500: {
    title: "Server error",
    description: "Something went wrong on our side. Please try again shortly.",
  },
};

export function getErrorToastMessage(error: unknown): QueryToastMessage {
  if (error instanceof ApiError) {
    const responseMessage = getResponseMessage(error.data);
    return getStatusMessage(error.status, responseMessage ?? error.message);
  }

  if (error instanceof AxiosError) {
    const responseMessage = getResponseMessage(error.response?.data);
    return getStatusMessage(error.response?.status ?? 0, responseMessage ?? error.message);
  }

  if (error instanceof Error) {
    return {
      title: "Something went wrong",
      description: error.message,
    };
  }

  return {
    title: "Something went wrong",
    description: "Please try again.",
  };
}

function getStatusMessage(status: number, fallback?: string): QueryToastMessage {
  const trimmedFallback = fallback?.trim();

  if (statusMessages[status]) {
    return {
      title: statusMessages[status].title,
      description: trimmedFallback || statusMessages[status].description,
    };
  }

  if (status >= 500) {
    return {
      title: statusMessages[500].title,
      description: trimmedFallback || statusMessages[500].description,
    };
  }

  return {
    title: "Request failed",
    description: trimmedFallback || "Please try again.",
  };
}

function getResponseMessage(data: unknown) {
  if (!data || typeof data !== "object") {
    return undefined;
  }

  const body = data as ResponseBody;

  if (body.detail) {
    return body.detail;
  }

  if (body.message) {
    return body.message;
  }

  if (body.title) {
    return body.title;
  }

  const firstError = Object.values(body.errors ?? {})[0]?.[0];
  return firstError;
}
