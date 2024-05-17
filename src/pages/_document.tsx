import { Html, Head, Main, NextScript } from "next/document";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Main />
        </ThemeProvider>
        <NextScript />
      </body>
    </Html>
  );
}
