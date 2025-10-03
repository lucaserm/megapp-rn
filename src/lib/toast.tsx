import { CheckIcon, InfoIcon, XIcon } from "lucide-react-native";
import type React from "react";
import { useWindowDimensions, View } from "react-native";
import type {
  ToastConfig,
  ToastConfigParams,
} from "react-native-toast-message";

import { Text } from "@/components/ui/text";

export const toastConfig = {
  error: ErrorToast,
  success: SuccessToast,
  info: InfoToast,
} satisfies ToastConfig;

interface ToastProps {
  icon?: React.ComponentType;
}

function BaseToast({
  text1,
  text2,
  props: { icon: Icon },
}: ToastConfigParams<ToastProps>) {
  "use no memo"; // eslint-disable-line

  const { width } = useWindowDimensions();

  return (
    <View
      className="flex-row items-center gap-3 rounded-lg border-fancy border-border bg-background p-4"
      style={{ maxWidth: width - 32 }}
    >
      {Icon && <Icon />}
      <View className="shrink gap-1">
        {!!text1 && (
          <Text className="font-b leading-none" numberOfLines={1}>
            {text1}
          </Text>
        )}
        {!!text2 && (
          <Text
            className="text-sm leading-none text-muted-foreground"
            numberOfLines={1}
          >
            {text2}
          </Text>
        )}
      </View>
    </View>
  );
}

function SuccessToast({
  props: { ...customProps },
  ...props
}: ToastConfigParams<ToastProps>) {
  "use no memo"; // eslint-disable-line

  return (
    <BaseToast
      {...props}
      props={{
        icon: () => (
          <View className="size-6 items-center justify-center rounded-full bg-success">
            <CheckIcon className="size-4 text-success-foreground" />
          </View>
        ),
        ...customProps,
      }}
    />
  );
}

function ErrorToast({
  props: { ...customProps },
  ...props
}: ToastConfigParams<ToastProps>) {
  "use no memo"; // eslint-disable-line

  return (
    <BaseToast
      {...props}
      props={{
        icon: () => (
          <View className="size-6 items-center justify-center rounded-full bg-destructive">
            <XIcon className="size-4 text-destructive-foreground" />
          </View>
        ),
        ...customProps,
      }}
    />
  );
}

function InfoToast({
  props: { ...customProps },
  ...props
}: ToastConfigParams<ToastProps>) {
  "use no memo"; // eslint-disable-line

  return (
    <BaseToast
      {...props}
      props={{
        icon: () => (
          <View className="size-6 items-center justify-center rounded-full bg-info">
            <InfoIcon className="size-4 text-info-foreground" />
          </View>
        ),
        ...customProps,
      }}
    />
  );
}
