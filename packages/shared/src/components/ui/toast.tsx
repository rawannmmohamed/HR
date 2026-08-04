import { CheckCircle2, Info, X, XCircle } from "lucide-react";
import { cn } from "../../lib/utils";

export type ToastVariant = "success" | "error" | "info";

export type ToastMessage = {
  id: string;
  description?: string;
  title: string;
  variant: ToastVariant;
};

type ToastViewportProps = {
  onDismiss: (id: string) => void;
  toasts: ToastMessage[];
};

const toastIcons = {
  error: XCircle,
  info: Info,
  success: CheckCircle2,
} as const;

export function ToastViewport({ onDismiss, toasts }: ToastViewportProps) {
  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex w-[min(420px,calc(100vw-40px))] flex-col gap-3" aria-live="polite" aria-relevant="additions">
      {toasts.map((toast) => {
        const Icon = toastIcons[toast.variant];

        return (
          <div
            key={toast.id}
            className={cn(
              "rounded-lg border bg-card p-4 text-sm shadow-xl dark:bg-[#141417]",
              toast.variant === "success" && "border-primary/30",
              toast.variant === "error" && "border-destructive/30 dark:border-red-400/20",
              toast.variant === "info" && "border-border dark:border-white/10",
            )}
            role={toast.variant === "error" ? "alert" : "status"}
          >
            <div className="flex items-start gap-3">
              <Icon
                className={cn(
                  "mt-0.5 shrink-0",
                  toast.variant === "success" && "text-primary",
                  toast.variant === "error" && "text-destructive",
                  toast.variant === "info" && "text-muted-foreground",
                )}
                size={18}
                aria-hidden="true"
              />
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-foreground dark:text-white">{toast.title}</p>
                {toast.description ? <p className="mt-1 leading-5 text-muted-foreground dark:text-[#9ca3af]">{toast.description}</p> : null}
              </div>
              <button
                className="shrink-0 text-muted-foreground transition-colors hover:text-foreground dark:text-[#9ca3af] dark:hover:text-white"
                type="button"
                aria-label="Dismiss message"
                onClick={() => onDismiss(toast.id)}
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
