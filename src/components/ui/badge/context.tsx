import React, { createContext } from "react";

export type BadgeVariant = "primary" | "outline" | "destructive";
export type BadgeSize = "xs" | "sm" | "base";

interface BadgeContextValue {
  variant: BadgeVariant;
  size: BadgeSize;
}

export const BadgeContext = createContext<BadgeContextValue | null>(null);

export function BadgeProvider({
  children,
  size = "base",
  variant = "primary",
}: BadgeContextValue & React.PropsWithChildren) {
  return <BadgeContext value={{ size, variant }}>{children}</BadgeContext>;
}

export function useBadgeContext() {
  const context = React.useContext(BadgeContext);

  if (!context) {
    throw new Error("useBadgeContext must be used within a BadgeProvider");
  }

  return context;
}
