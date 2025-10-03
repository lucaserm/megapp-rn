import {
  SafeAreaView,
  type SafeAreaViewProps,
} from "react-native-safe-area-context";

import { cn } from "@/lib/utils";

interface LayoutScreenProps extends SafeAreaViewProps {
  /**
   * When `edges` is not provided, this prop disables all safe area insets.
   * This is useful when the header is used inside a screen that already has
   * safe area insets applied, e.g. `Layout.Screen`.
   *
   * @default false
   */
  safe?: boolean;
  /**
   * Disables the bottom safe area inset if `edges` is not provided.
   */
  hasBottomTabs?: boolean;
}

export function LayoutScreen({
  className,
  safe = false,
  hasBottomTabs = false,
  edges = safe ? [] : hasBottomTabs ? ["left", "top", "right"] : undefined,
  ...props
}: LayoutScreenProps) {
  return (
    <SafeAreaView
      className={cn("flex-1 bg-background", className)}
      edges={edges}
      {...props}
    />
  );
}
