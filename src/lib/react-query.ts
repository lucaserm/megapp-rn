import NetInfo from "@react-native-community/netinfo";
import { onlineManager, QueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";

onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected);
  });
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 30, // 30 minutes
      refetchOnMount: false,
      retry: (failureCount, error) => {
        if (isAxiosError(error) && error.response?.status === 500) {
          return false;
        }

        if (failureCount >= 3) {
          return false;
        }

        return true;
      },
    },
  },
});
