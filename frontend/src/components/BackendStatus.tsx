"use client";

import { useEffect, useState } from "react";
import { getBackendHealth } from "@/lib/api";

type ConnectionStatus = "checking" | "connected" | "failed";

export function BackendStatus() {
  const [status, setStatus] = useState<ConnectionStatus>("checking");

  useEffect(() => {
    async function checkBackend() {
      try {
        const result = await getBackendHealth();

        setStatus(result.status === "healthy" ? "connected" : "failed");
      } catch (error) {
        console.error("Backend connection failed:", error);
        setStatus("failed");
      }
    }

    checkBackend();
  }, []);

  if (status === "checking") {
    return (
      <p className="text-sm text-ink-300">
        Checking backend connection...
      </p>
    );
  }

  if (status === "failed") {
    return (
      <p className="text-sm text-coral-400">
        Backend is not connected.
      </p>
    );
  }

  return (
    <p className="text-sm text-emerald-400">
      Backend connected successfully.
    </p>
  );
}