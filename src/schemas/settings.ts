import { z } from "zod";

export const themeNameSchema = z.enum(["light", "dark"]);

export const settingsV0 = z.object({
  interface: z.object({
    theme: themeNameSchema,
  }),
});

export type ThemeNameSchema = z.infer<typeof themeNameSchema>;

export type SettingsV0 = z.infer<typeof settingsV0>;
