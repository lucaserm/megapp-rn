import { Text as RNText, type TextProps } from "react-native";

import { cn } from "@/lib/utils";

export function Text({ className, ...props }: TextProps) {
  return (
    <RNText
      className={cn("font-regular leading-relaxed text-foreground", className)}
      {...props}
    />
  );
}

export function H1({ className, ...props }: TextProps) {
  return (
    <RNText
      className={cn("font-b text-2xl leading-tight text-foreground", className)}
      {...props}
    />
  );
}