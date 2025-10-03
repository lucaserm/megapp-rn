import type React from "react";
import { createContext, useContext } from "react";

export type ButtonVariant = "normal" | "primary" | "destructive" | "link";
export type ButtonSize = "custom" | "xs" | "sm" | "base" | "icon";

interface ButtonContextValue {
  variant: ButtonVariant;
  size: ButtonSize;
}

interface ButtonProviderProps
  extends ButtonContextValue,
    React.PropsWithChildren {}

export const ButtonContext = createContext({} as ButtonContextValue);

export function useButton() {
  const context = useContext(ButtonContext);

  if (!context) {
    throw new Error("useButton must be used within a ButtonProvider");
  }

  return context;
}

export function ButtonProvider({ children, ...props }: ButtonProviderProps) {
  return <ButtonContext value={props}>{children}</ButtonContext>;
}
