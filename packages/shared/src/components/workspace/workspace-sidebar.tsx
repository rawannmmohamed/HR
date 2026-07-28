import { PanelLeftClose } from "lucide-react";
import { cn } from "../../lib/utils";
import type { WorkspaceSidebarProps } from "./types";

export function WorkspaceSidebar({ activeItem, navItems, onNavChange, subtitle, title }: WorkspaceSidebarProps) {
  return (
    <aside className="hidden min-h-screen flex-col border-r border-border bg-card lg:flex dark:border-white/10 dark:bg-[#111114]">
      <div className="flex items-center gap-3 px-7 pb-8 pt-7">
        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#1712ff] text-xl font-bold text-white">3</div>
        <div>
          <p className="font-semibold text-foreground dark:text-white">{title}</p>
          <p className="text-sm text-muted-foreground dark:text-[#9ca3af]">{subtitle}</p>
        </div>
      </div>

      <nav className="flex-1 px-4" aria-label={`${title} navigation`}>
        <p className="px-2 pb-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground dark:text-[#737789]">Main</p>
        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.label === activeItem;

            return (
              <button
                key={item.label}
                className={cn(
                  "flex h-11 w-full items-center gap-3 rounded-lg px-4 text-left text-base font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary dark:bg-[#241f55] dark:text-white"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground dark:text-[#b7bdd0] dark:hover:bg-white/5 dark:hover:text-white",
                )}
                type="button"
                onClick={() => onNavChange?.(item.label)}
              >
                <Icon className={isActive ? "text-primary dark:text-[#7667ff]" : "text-muted-foreground dark:text-[#8b91a3]"} size={20} aria-hidden="true" />
                <span className="min-w-0 flex-1">{item.label}</span>
                {item.badge ? <span className="rounded-full bg-[#2f2a88] px-2 py-0.5 text-xs font-semibold text-white">{item.badge}</span> : null}
              </button>
            );
          })}
        </div>
      </nav>

      <button className="flex h-[76px] items-center gap-3 border-t border-border px-8 text-left text-muted-foreground dark:border-white/10 dark:text-[#b7bdd0]" type="button">
        <PanelLeftClose size={20} aria-hidden="true" />
        Collapse
      </button>
    </aside>
  );
}
