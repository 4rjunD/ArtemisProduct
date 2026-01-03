"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {
  ArtemisIQProfile,
  GameSession,
  createDefaultProfile,
  updateProfile
} from "@/lib/artemis-iq";

interface MetricsContextType {
  profile: ArtemisIQProfile;
  isLoading: boolean;
  addSession: (session: Omit<GameSession, "id" | "completedAt">) => void;
  resetProfile: () => void;
}

const MetricsContext = createContext<MetricsContextType | undefined>(undefined);

const STORAGE_KEY = "artemis-iq-profile";

export function MetricsProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<ArtemisIQProfile>(createDefaultProfile());
  const [isLoading, setIsLoading] = useState(true);

  // Load profile from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setProfile(parsed);
      }
    } catch (error) {
      console.error("Failed to load ArtemisIQ profile:", error);
    }
    setIsLoading(false);
  }, []);

  // Save profile to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      } catch (error) {
        console.error("Failed to save ArtemisIQ profile:", error);
      }
    }
  }, [profile, isLoading]);

  const addSession = (sessionData: Omit<GameSession, "id" | "completedAt">) => {
    const session: GameSession = {
      ...sessionData,
      id: `session-${Date.now()}`,
      completedAt: new Date().toISOString()
    };

    setProfile(prev => updateProfile(prev, session));
  };

  const resetProfile = () => {
    setProfile(createDefaultProfile());
  };

  return (
    <MetricsContext.Provider value={{ profile, isLoading, addSession, resetProfile }}>
      {children}
    </MetricsContext.Provider>
  );
}

export function useMetrics() {
  const context = useContext(MetricsContext);
  if (context === undefined) {
    throw new Error("useMetrics must be used within a MetricsProvider");
  }
  return context;
}
