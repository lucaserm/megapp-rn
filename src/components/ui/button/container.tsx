import { cva } from "class-variance-authority";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  TouchableOpacity,
  type TouchableOpacityProps,
  View,
} from "react-native";

import { cn } from "@/lib/utils";

import { themes } from "@/styles/themes";
import { Colors } from "@/types/theme";
import { getThemeColor } from "@/utils/get-theme-color";
import { ButtonProvider, type ButtonSize, type ButtonVariant } from "./context";

type Color = keyof Colors | (string & {});

const variants = cva(
  "flex-row items-center justify-center gap-2 rounded-md disabled:brightness-50 mb-1",
  {
    variants: {
      variant: {
        normal: "bg-background border-fancy border-border",
        accent: "",
        primary: "bg-primary",
        destructive: "bg-destructive",
        link: "",
      },
      size: {
        custom: "",
        xs: "h-7 px-3 mb-0.5",
        sm: "h-9 px-3",
        base: "h-12 px-5 py-3",
        lg: "h-14 px-5 py-3",
        icon: "aspect-square h-12",
      },
    },
    defaultVariants: {
      size: "base",
      variant: "normal",
    },
  }
);

const shadowVariants = cva("absolute inset-0 rounded-md top-1", {
  variants: {
    variant: {
      normal: "bg-background",
      primary: "bg-primary",
      destructive: "bg-destructive",
      link: "",
    },
    size: {
      custom: "",
      xs: "top-0.5",
      sm: "",
      base: "",
      icon: "",
    },
    defaultVariants: {
      variant: "normal",
    },
  },
});

export interface ButtonContainerProps extends TouchableOpacityProps {
  contentContainerClassName?: string;
  color?: Color | [Color, Color];
  as?: React.FunctionComponent<TouchableOpacityProps>;
  variant?: ButtonVariant;
  size?: ButtonSize;
  ref?: React.Ref<View>;
}

export function ButtonContainer({
  variant = "normal",
  size = "base",
  contentContainerClassName,
  children,
  style,
  color = "transparent",
  ref,
  ...props
}: ButtonContainerProps) {
  const { colors, scheme } = themes["dark"];

  return (
    <ButtonProvider variant={variant} size={size}>
      <TouchableOpacity
        onPressIn={(event) => {
          if (variant === "link") {
            return;
          }

          props.onPressIn?.(event);
        }}
        onPressOut={(event) => {
          if (variant === "link") {
            return;
          }

          props.onPressOut?.(event);
        }}
        activeOpacity={variant === "link" ? 0.7 : 1}
        {...props}
        className={cn("max-w-xl", props.className)}
        ref={ref}
      >
        <LinearGradient
          pointerEvents="none"
          colors={[
            getThemeColor(colors, Array.isArray(color) ? color[0] : color),
            getThemeColor(colors, Array.isArray(color) ? color[1] : color),
          ]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          className={shadowVariants({ variant, size })}
          style={{ filter: [{ brightness: scheme === "dark" ? 0.5 : 0.8 }] }}
        />
        <TouchableOpacity
          className={variants({
            variant,
            size,
            className: contentContainerClassName,
          })}
          style={[
            {
              filter: [{ brightness: props.disabled ? 0.8 : 1 }],
            },
            style,
          ]}
        >
          {children}
        </TouchableOpacity>
      </TouchableOpacity>
    </ButtonProvider>
  );
}
