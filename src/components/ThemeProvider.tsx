'use client';

import { ThemeProvider as NextThemesProvider } from "next-themes";
import * as React from "react";

// Suppress the React 19 "Encountered a script tag" warning in development
// which is triggered by next-themes injecting a script to prevent FOUC.
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  const orig = console.error;
  console.error = (...args: any[]) => {
    if (typeof args[0] === "string" && args[0].includes("Encountered a script tag")) {
      return;
    }
    orig.apply(console, args);
  };
}

// We disable typescript checking on ThemeProviderProps temporarily if type definitions fail to resolve perfectly
export function ThemeProvider({ children, ...props }: any) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
