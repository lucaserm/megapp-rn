import { ThemeNameSchema } from "@/schemas/settings";
import { darkTheme } from "@/styles/themes/dark";
import { lightTheme } from "@/styles/themes/light";
import { Theme } from "@/types/theme";

export const themes: Record<ThemeNameSchema, Theme> = {
  dark: darkTheme,
  light: lightTheme,
};
