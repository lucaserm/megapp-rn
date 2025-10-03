import React from "react";
import { View, type ViewProps } from "react-native";

import { cn } from "@/lib/utils";

export const LayoutContainer = React.forwardRef<View, ViewProps>(
  ({ className, ...props }, ref) => {
    return (
      <View
        className={cn("flex-1 bg-background", className)}
        {...props}
        ref={ref}
      />
    );
  }
);
LayoutContainer.displayName = "LayoutContainer";
