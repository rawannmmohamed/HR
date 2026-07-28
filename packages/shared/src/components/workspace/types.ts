import type { ElementType, ReactNode } from "react";

export type WorkspaceNavItem = {
  label: string;
  icon: ElementType;
  badge?: string;
};

export type WorkspaceShellProps = {
  activeItem: string;
  children: ReactNode;
  navItems: WorkspaceNavItem[];
  notificationCount: number;
  onNavChange?: (label: string) => void;
  subtitle: string;
  title: string;
  userInitial: string;
  userName: string;
};

export type WorkspaceSidebarProps = Pick<WorkspaceShellProps, "activeItem" | "navItems" | "onNavChange" | "subtitle" | "title">;

export type WorkspaceTopbarProps = Pick<WorkspaceShellProps, "notificationCount" | "userInitial" | "userName">;

export type WorkspaceHeroProps = {
  action?: ReactNode;
  dateLabel: string;
  title: string;
};
