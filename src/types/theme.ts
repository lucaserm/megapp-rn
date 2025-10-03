export type Theme = {
  name: string;
  prettyName: string;
  minVipLevel?: number | null;
  isNew?: boolean;
  scheme: "dark" | "light";
  colors: Colors;
};

export type Colors = {
  background: string;
  foreground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  success: string;
  successForeground: string;
  info: string;
  infoForeground: string;
  warning: string;
  warningForeground: string;
  streak: string;
  streakSecondary: string;
  streakForeground: string;
  streakMutedForeground: string;
  border: string;
  input: string;
};
