import type { Config } from "tailwindcss";

import { fontFamily } from "./src/styles/font-family";
import { sizing } from "./src/styles/sizing";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily,
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          foreground: "hsl(var(--info-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        streak: {
          DEFAULT: "hsl(var(--streak))",
          secondary: "hsl(var(--streak-secondary))",
          foreground: "hsl(var(--streak-foreground))",
          "muted-foreground": "hsl(var(--streak-muted-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
      },
      spacing: {
        container: "16px",
        content: "16px",
      },
      width: {
        fancy: `${sizing.fancy}px`,
      },
      height: {
        fancy: `${sizing.fancy}px`,
      },
      borderWidth: {
        fancy: `${sizing.fancy}px`,
      },
    },
  },
  plugins: [],
} satisfies Config;
