"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { MetricsProvider } from "./metrics-provider";

interface Props {
  children: ReactNode;
}

export function AuthSessionProvider({ children }: Props) {
  return (
    <SessionProvider>
      <MetricsProvider>{children}</MetricsProvider>
    </SessionProvider>
  );
}
