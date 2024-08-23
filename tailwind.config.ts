import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // from create-t3
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      
      // shadcn-ui
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },

      // grid layouts
      gridTemplateColumns: {
        "playlist-sm": "[first numStart] auto [numEnd titleStart] 2fr [titleEnd savedStart] auto [savedEnd durationStart] auto [durationEnd actionsStart] auto [actionsEnd last]",
        "playlist-md": "[first numStart] auto [numEnd titleStart] 2fr [titleEnd artistStart] 1.5fr [artistEnd savedStart] auto [savedEnd durationStart] auto [durationEnd actionsStart] auto [actionsEnd last]",
        "playlist-lg": "[first numStart] auto [numEnd titleStart] 2fr [titleEnd artistStart] 1.5fr [artistEnd albumStart] 1.5fr [albumEnd savedStart] auto [savedEnd durationStart] auto [durationEnd actionsStart] auto [actionsEnd last]",
        "playlist-xl": "[first numStart] auto [numEnd titleStart] 2fr [titleEnd artistStart] 1.5fr [artistEnd albumStart] 1.5fr [albumEnd dateStart] auto [dateEnd savedStart] auto [savedEnd durationStart] auto [durationEnd actionsStart] auto [actionsEnd last]",
      },
      gridColumn: {
        "row": "first / last",

        "num": "numStart / numEnd",
        "title": "titleStart / titleEnd",
        "artist": "artistStart / artistEnd",
        "album": "albumStart / albumEnd",
        "date": "dateStart / dateEnd",
        "saved": "savedStart / savedEnd",
        "duration": "durationStart / durationEnd",
        "actions": "actionsStart / actionsEnd",
      }
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/container-queries"),
  ],
} satisfies Config;
