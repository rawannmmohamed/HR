import { Bell, Command, Search } from "lucide-react";
import { ThemeToggle } from "../theme-toggle";
import type { WorkspaceTopbarProps } from "./types";

export function WorkspaceTopbar({ notificationCount, userInitial, userName }: WorkspaceTopbarProps) {
  return (
    <header className="sticky top-0 z-10 flex min-h-[82px] items-center justify-between gap-4 border-b border-border bg-background/95 px-5 backdrop-blur dark:border-white/10 dark:bg-[#09090b]/95 sm:px-8 lg:px-6">
      <div className="relative w-full max-w-[480px]">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground dark:text-[#8d92a3]" size={20} aria-hidden="true" />
        <input
          aria-label="Search anything"
          className="h-11 w-full rounded-xl border border-input bg-card px-12 text-base text-foreground outline-none placeholder:text-muted-foreground focus:border-primary dark:border-white/10 dark:bg-[#111114] dark:text-white dark:placeholder:text-[#8d92a3] dark:focus:border-[#7161ff]"
          placeholder="Search anything..."
        />
        <div className="absolute right-3 top-1/2 hidden -translate-y-1/2 items-center gap-1 rounded-md border border-border bg-muted px-2 py-1 text-xs text-muted-foreground dark:border-white/10 dark:bg-white/5 dark:text-[#9ca3af] sm:flex">
          <Command size={13} aria-hidden="true" />K
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-4">
        <ThemeToggle />
        <button className="relative text-muted-foreground dark:text-[#a2a8b8]" type="button" aria-label="Open notifications">
          <Bell size={21} aria-hidden="true" />
          <span className="absolute -right-2 -top-2 rounded-full bg-[#6c5cff] px-1.5 text-xs font-bold text-white">{notificationCount}</span>
        </button>
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f4b6a6] text-sm font-bold text-[#3a1710]">{userInitial}</div>
          <p className="hidden font-semibold text-foreground dark:text-white sm:block">{userName}</p>
        </div>
      </div>
    </header>
  );
}
