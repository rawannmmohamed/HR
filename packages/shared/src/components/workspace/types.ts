import type { ElementType, ReactNode } from "react";

export type WorkspaceNavItem = {
  label: string;
  icon: ElementType;
  badge?: string;
};

export type WorkspaceSearchItem = {
  category: string;
  description?: string;
  keywords?: string[];
  label: string;
};

export type WorkspaceShellProps = {
  activeItem: string;
  children: ReactNode;
  navItems: WorkspaceNavItem[];
  notificationCount: number;
  onLogout?: () => void;
  onNavChange?: (label: string) => void;
  searchItems?: WorkspaceSearchItem[];
  subtitle: string;
  title: string;
  userInitial: string;
  userName: string;
};

export type WorkspaceSidebarProps = Pick<WorkspaceShellProps, "activeItem" | "navItems" | "onNavChange" | "subtitle" | "title"> & {
  isCollapsed: boolean;
  onCollapseToggle: () => void;
  variant?: "desktop" | "mobile";
};

export type WorkspaceTopbarProps = Pick<WorkspaceShellProps, "notificationCount" | "onLogout" | "searchItems" | "userInitial" | "userName"> & {
  onMenuToggle: () => void;
};

export type WorkspaceHeroProps = {
  action?: ReactNode;
  dateLabel: string;
  title: string;
};
