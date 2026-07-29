import { useEffect, useMemo, useRef, useState } from "react";
import { Bell, Command, Menu, Search } from "lucide-react";
import { ThemeToggle } from "../theme-toggle";
import type { WorkspaceTopbarProps } from "./types";

export function WorkspaceTopbar({ notificationCount, onMenuToggle, searchItems = [], userInitial, userName }: WorkspaceTopbarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const searchResults = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return [];
    }

    return searchItems.filter((item) =>
      [item.label, item.description, item.category, ...(item.keywords ?? [])]
        .filter(Boolean)
        .some((value) => value?.toLowerCase().includes(normalizedQuery)),
    );
  }, [searchItems, searchQuery]);

  useEffect(() => {
    function handleShortcut(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchInputRef.current?.focus();
        setIsSearchOpen(true);
      }

      if (event.key === "Escape") {
        setIsSearchOpen(false);
        searchInputRef.current?.blur();
      }
    }

    window.addEventListener("keydown", handleShortcut);

    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  function handleResultClick(label: string) {
    setSearchQuery(label);
    setIsSearchOpen(false);
    searchInputRef.current?.blur();
  }

  return (
    <header className="sticky top-0 z-10 flex min-h-[82px] items-center justify-between gap-4 border-b border-border bg-background/95 px-5 backdrop-blur dark:border-white/10 dark:bg-[#09090b]/95 sm:px-8 lg:px-6">
      <button
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground dark:border-white/10 dark:bg-[#111114] dark:text-[#a2a8b8] dark:hover:bg-white/5 dark:hover:text-white lg:hidden"
        type="button"
        aria-label="Open sidebar menu"
        onClick={onMenuToggle}
      >
        <Menu size={21} aria-hidden="true" />
      </button>

      <div className="relative w-full max-w-[480px]">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground dark:text-[#8d92a3]" size={20} aria-hidden="true" />
        <input
          ref={searchInputRef}
          aria-label="Search anything"
          className="h-11 w-full rounded-xl border border-input bg-card px-12 text-base text-foreground outline-none placeholder:text-muted-foreground focus:border-primary dark:border-white/10 dark:bg-[#111114] dark:text-white dark:placeholder:text-[#8d92a3] dark:focus:border-[#7161ff]"
          placeholder="Search anything..."
          value={searchQuery}
          onBlur={() => window.setTimeout(() => setIsSearchOpen(false), 120)}
          onChange={(event) => setSearchQuery(event.target.value)}
          onFocus={() => setIsSearchOpen(true)}
        />
        <div className="absolute right-3 top-1/2 hidden -translate-y-1/2 items-center gap-1 rounded-md border border-border bg-muted px-2 py-1 text-xs text-muted-foreground dark:border-white/10 dark:bg-white/5 dark:text-[#9ca3af] sm:flex">
          <Command size={13} aria-hidden="true" />K
        </div>

        {isSearchOpen ? (
          <div className="absolute left-0 right-0 top-[52px] z-20 overflow-hidden rounded-lg border border-border bg-card shadow-xl dark:border-white/10 dark:bg-[#111114]">
            {!searchQuery.trim() ? (
              <p className="px-4 py-3 text-sm text-muted-foreground dark:text-[#9ca3af]">Type to search dashboard content.</p>
            ) : searchResults.length ? (
              <div className="p-1.5">
                {searchResults.map((item) => {
                  return (
                    <button
                      key={`${item.category}-${item.label}`}
                      className="flex w-full flex-col gap-1 rounded-md px-3 py-2 text-left transition-colors hover:bg-muted dark:hover:bg-white/5"
                      type="button"
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => handleResultClick(item.label)}
                    >
                      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground dark:text-[#8b91a3]">{item.category}</span>
                      <span className="text-sm font-semibold text-foreground dark:text-white">{item.label}</span>
                      {item.description ? <span className="text-sm text-muted-foreground dark:text-[#9ca3af]">{item.description}</span> : null}
                    </button>
                  );
                })}
              </div>
            ) : (
              <p className="px-4 py-3 text-sm text-muted-foreground dark:text-[#9ca3af]">No results found.</p>
            )}
          </div>
        ) : null}
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
