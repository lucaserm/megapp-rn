import * as Slot from "@rn-primitives/slot";
import type { SlottableViewProps } from "@rn-primitives/types";
import { cva, type VariantProps } from "class-variance-authority";
import { View } from "react-native";

import { cn } from "@/lib/utils";
import { sizing } from "@/styles/sizing";

import { BadgeProvider, type BadgeSize, type BadgeVariant } from "./context";

export const badgeContainerVariants = cva(
  "items-center justify-center rounded-full border-border flex-row",
  {
    variants: {
      variant: {
        primary: "border-0 bg-primary",
        outline: "",
        destructive: "border-destructive bg-destructive",
      } satisfies Record<BadgeVariant, string>,
      size: {
        xs: "px-2 py-0.5",
        sm: "px-2 py-1",
        base: "px-2.5 py-1",
      } satisfies Record<BadgeSize, string>,
    },
    defaultVariants: {
      variant: "primary",
      size: "base",
    },
  }
);

export type BadgeProps = SlottableViewProps &
  VariantProps<typeof badgeContainerVariants>;

export function BadgeContainer({
  className,
  style,
  variant = "primary",
  size = "base",
  asChild,
  ...props
}: BadgeProps) {
  const Component = asChild ? Slot.View : View;

  return (
    <BadgeProvider size={size ?? "base"} variant={variant ?? "primary"}>
      <Component
        className={cn(badgeContainerVariants({ variant, size }), className)}
        style={[variant !== "primary" && { borderWidth: sizing.fancy }, style]}
        {...props}
      />
    </BadgeProvider>
  );
}
