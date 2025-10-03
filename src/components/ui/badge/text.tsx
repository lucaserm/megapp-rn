import { cva } from "class-variance-authority";
import type { TextProps } from "react-native";

import { Text } from "../text";
import { type BadgeSize, type BadgeVariant, useBadgeContext } from "./context";

export const badgeTextVariants = cva("text-foreground text-center font-b", {
  variants: {
    variant: {
      primary: "text-primary-foreground",
      outline: "",
      destructive: "text-destructive-foreground",
    } satisfies Record<BadgeVariant, string>,
    size: {
      xs: "text-xs",
      sm: "text-sm",
      base: "",
    } satisfies Record<BadgeSize, string>,
  },
  defaultVariants: {
    variant: "primary",
    size: "base",
  },
});

export function BadgeText({ className, ...props }: TextProps) {
  const { size, variant } = useBadgeContext();

  return (
    <Text
      className={badgeTextVariants({ size, variant, className })}
      {...props}
    />
  );
}
