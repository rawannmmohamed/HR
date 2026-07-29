import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { cn } from "../../lib/utils";
import type { WorkspaceSidebarProps } from "./types";
import { WorkspaceBrandMark } from "./workspace-brand-mark";

export function WorkspaceSidebar({
  activeItem,
  isCollapsed,
  navItems,
  onCollapseToggle,
  onNavChange,
  subtitle,
  title,
  variant = "desktop",
}: WorkspaceSidebarProps) {
  const isMobile = variant === "mobile";

  return (
    <aside
      className={cn(
        "min-h-screen flex-col border-r border-border bg-card dark:border-white/10 dark:bg-[#111114]",
        isMobile ? "fixed inset-y-0 left-0 z-40 flex w-[300px] max-w-[86vw] shadow-2xl lg:hidden" : "hidden lg:flex",
      )}
    >
      <div className={cn("flex items-center gap-3 pb-8 pt-7", isCollapsed ? "justify-center px-0" : "px-7")}>
        <WorkspaceBrandMark />
        <div className={cn(isCollapsed && "sr-only")}>
          <p className="font-semibold text-foreground dark:text-white">{title}</p>
          <p className="text-sm text-muted-foreground dark:text-[#9ca3af]">{subtitle}</p>
        </div>
      </div>

      <nav className="flex-1 px-4" aria-label={`${title} navigation`}>
        <p className={cn("px-2 pb-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground dark:text-[#737789]", isCollapsed && "sr-only")}>Main</p>
        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.label === activeItem;

            return (
              <button
                key={item.label}
                className={cn(
                  "flex h-11 w-full items-center rounded-lg text-left text-base font-medium transition-colors",
                  isCollapsed ? "justify-center px-0" : "gap-3 px-4",
                  isActive
                    ? "bg-primary/10 text-primary dark:bg-[#241f55] dark:text-white"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground dark:text-[#b7bdd0] dark:hover:bg-white/5 dark:hover:text-white",
                )}
                type="button"
                title={isCollapsed ? item.label : undefined}
                onClick={() => onNavChange?.(item.label)}
              >
                <Icon className={isActive ? "text-primary dark:text-[#7667ff]" : "text-muted-foreground dark:text-[#8b91a3]"} size={20} aria-hidden="true" />
                <span className={cn("min-w-0 flex-1", isCollapsed && "sr-only")}>{item.label}</span>
                {item.badge ? <span className={cn("rounded-full bg-[#2f2a88] px-2 py-0.5 text-xs font-semibold text-white", isCollapsed && "sr-only")}>{item.badge}</span> : null}
              </button>
            );
          })}
        </div>
      </nav>

      <button
        className={cn(
          "flex h-[76px] items-center border-t border-border text-left text-muted-foreground transition-colors hover:bg-muted hover:text-foreground dark:border-white/10 dark:text-[#b7bdd0] dark:hover:bg-white/5 dark:hover:text-white",
          isCollapsed ? "justify-center px-0" : "gap-3 px-8",
        )}
        type="button"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        title={isCollapsed ? "Expand sidebar" : undefined}
        onClick={onCollapseToggle}
      >
        {isCollapsed ? <PanelLeftOpen size={20} aria-hidden="true" /> : <PanelLeftClose size={20} aria-hidden="true" />}
        <span className={cn(isCollapsed && "sr-only")}>{isMobile ? "Close menu" : "Collapse"}</span>
      </button>
    </aside>
  );
}
