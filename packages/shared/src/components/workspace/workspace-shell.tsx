import { WorkspaceSidebar } from "./workspace-sidebar";
import { WorkspaceTopbar } from "./workspace-topbar";
import type { WorkspaceShellProps } from "./types";

export function WorkspaceShell({
  activeItem,
  children,
  navItems,
  notificationCount,
  onNavChange,
  subtitle,
  title,
  userInitial,
  userName,
}: WorkspaceShellProps) {
  return (
    <main className="min-h-screen bg-background text-foreground dark:bg-[#09090b] dark:text-white">
      <div className="grid min-h-screen lg:grid-cols-[300px_1fr]">
        <WorkspaceSidebar activeItem={activeItem} navItems={navItems} onNavChange={onNavChange} subtitle={subtitle} title={title} />

        <section className="min-w-0 border-l border-border dark:border-white/10">
          <WorkspaceTopbar notificationCount={notificationCount} userInitial={userInitial} userName={userName} />
          <div className="mx-auto flex max-w-[1480px] flex-col gap-9 px-5 py-10 sm:px-8 lg:px-20">{children}</div>
        </section>
      </div>
    </main>
  );
}
