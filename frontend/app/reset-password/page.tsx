"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);

  useEffect(() => {
    async function prepareRecoverySession() {
      const code = searchParams.get("code");

      if (!code) {
        setError("The password-reset link is invalid or missing.");
        return;
      }

      const supabase = createClient();

      const { error: exchangeError } =
        await supabase.auth.exchangeCodeForSession(code);

      if (exchangeError) {
        setError(
          "The password-reset link is invalid or expired. Request a new link."
        );
        return;
      }

      setSessionReady(true);
    }

    prepareRecoverySession();
  }, [searchParams]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setMessage("");

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();

      const { error: updateError } = await supabase.auth.updateUser({
        password,
      });

      if (updateError) {
        setError(updateError.message);
        return;
      }

      setMessage("Password updated successfully. Redirecting to login...");

      await supabase.auth.signOut();

      window.setTimeout(() => {
        router.push("/login?passwordUpdated=true");
      }, 1200);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink-950 px-4">
      <div className="w-full max-w-md rounded-2xl border border-ink-700 bg-ink-900 p-8">
        <h1 className="text-2xl font-semibold text-ink-50">
          Create a new password
        </h1>

        <p className="mt-2 text-sm text-ink-300">
          Enter a new password for your NutriMind account.
        </p>

        {error && (
          <p className="mt-5 text-sm text-coral-400" role="alert">
            {error}
          </p>
        )}

        {message && (
          <p className="mt-5 text-sm text-emerald-400" role="status">
            {message}
          </p>
        )}

        {sessionReady && (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input
              type="password"
              placeholder="New password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="new-password"
              required
              disabled={loading}
              className="h-11 w-full rounded-xl border border-ink-600 bg-ink-800 px-4 text-ink-50 outline-none focus:border-emerald-400 disabled:opacity-60"
            />

            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              autoComplete="new-password"
              required
              disabled={loading}
              className="h-11 w-full rounded-xl border border-ink-600 bg-ink-800 px-4 text-ink-50 outline-none focus:border-emerald-400 disabled:opacity-60"
            />

            <button
              type="submit"
              disabled={loading}
              className="h-11 w-full rounded-xl bg-emerald-500 font-medium text-ink-950 disabled:opacity-60"
            >
              {loading ? "Updating..." : "Update password"}
            </button>
          </form>
        )}

        <Link
          href="/login"
          className="mt-6 block text-center text-sm text-emerald-400"
        >
          Back to login
        </Link>
      </div>
    </main>
  );
}