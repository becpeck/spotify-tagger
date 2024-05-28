"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { Provider as JotaiProvider } from "jotai";

export function Providers({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark">
      <JotaiProvider>
        {children}
      </JotaiProvider>
    </NextThemesProvider>
  );
}
