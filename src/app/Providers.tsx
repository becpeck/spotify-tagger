"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Provider as JotaiProvider } from "jotai";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark">
      <JotaiProvider>
        {children}
      </JotaiProvider>
    </NextThemesProvider>
  );
}
