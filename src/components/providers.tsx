import { PortalHost } from "@rn-primitives/portal";
import { QueryClientProvider } from "@tanstack/react-query";
import type React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  initialWindowMetrics,
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import { queryClient } from "@/lib/react-query";
import { toastConfig } from "@/lib/toast";
// import { ThemeProvider } from "@/styles/theme-provider";

// import { KeyboardAvoidingView } from "./keyboard-avoiding-view";

export function Providers({ children }: React.PropsWithChildren) {
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <QueryClientProvider client={queryClient}>
          {/* <ThemeProvider> */}
          {/* <KeyboardAvoidingView className="flex-1 bg-background"> */}
          {children}

          <PortalHost />
          <ToastProvider />
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

function ToastProvider() {
  const insets = useSafeAreaInsets();

  return <Toast config={toastConfig} topOffset={insets.top + 24} />;
}
