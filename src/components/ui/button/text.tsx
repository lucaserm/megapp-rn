import { cva } from "class-variance-authority";
import type { TextProps } from "react-native";

import { Text } from "../text";
import { type ButtonVariant, useButton } from "./context";

const variants = cva("text-base", {
  variants: {
    variant: {
      normal: "text-foreground",
      primary: "text-primary-foreground text-lg",
      destructive: "text-destructive-foreground",
      link: "underline text-primary",
    } satisfies Record<ButtonVariant, string>,
    size: {
      custom: "font-b",
      xs: "text-xs font-semibold",
      sm: "font-b text-sm",
      base: "font-b",
      icon: "text-center text-xl",
    },
  },
  defaultVariants: {
    variant: "normal",
    size: "base",
  },
});

export function ButtonText({ className, ...props }: TextProps) {
  const { size, variant } = useButton();

  return <Text className={variants({ size, variant, className })} {...props} />;
}
