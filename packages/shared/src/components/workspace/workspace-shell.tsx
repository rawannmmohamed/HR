import { useState } from "react";
import { cn } from "../../lib/utils";
import { WorkspaceSidebar } from "./workspace-sidebar";
import { WorkspaceTopbar } from "./workspace-topbar";
import type { WorkspaceShellProps } from "./types";

export function WorkspaceShell({
  activeItem,
  children,
  navItems,
  notificationCount,
  onNavChange,
  searchItems,
  subtitle,
  title,
  userInitial,
  userName,
}: WorkspaceShellProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  function handleMobileNavChange(label: string) {
    onNavChange?.(label);
    setIsMobileSidebarOpen(false);
  }

  return (
    <main className="min-h-screen bg-background text-foreground dark:bg-[#09090b] dark:text-white">
      {isMobileSidebarOpen ? (
        <div className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden" aria-hidden="true" onClick={() => setIsMobileSidebarOpen(false)} />
      ) : null}
      {isMobileSidebarOpen ? (
        <WorkspaceSidebar
          activeItem={activeItem}
          isCollapsed={false}
          navItems={navItems}
          onCollapseToggle={() => setIsMobileSidebarOpen(false)}
          onNavChange={handleMobileNavChange}
          subtitle={subtitle}
          title={title}
          variant="mobile"
        />
      ) : null}

      <div className={cn("grid min-h-screen transition-[grid-template-columns] duration-200", isSidebarCollapsed ? "lg:grid-cols-[96px_1fr]" : "lg:grid-cols-[300px_1fr]")}>
        <WorkspaceSidebar
          activeItem={activeItem}
          isCollapsed={isSidebarCollapsed}
          navItems={navItems}
          onCollapseToggle={() => setIsSidebarCollapsed((currentValue) => !currentValue)}
          onNavChange={onNavChange}
          subtitle={subtitle}
          title={title}
        />

        <section className="min-w-0 border-l border-border dark:border-white/10">
          <WorkspaceTopbar
            notificationCount={notificationCount}
            onMenuToggle={() => setIsMobileSidebarOpen(true)}
            searchItems={searchItems}
            userInitial={userInitial}
            userName={userName}
          />
          <div className="mx-auto flex max-w-[1480px] flex-col gap-9 px-5 py-10 sm:px-8 lg:px-20">{children}</div>
        </section>
      </div>
    </main>
  );
}
