"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try {
      const supabase = createClient();

      const { error: resetError } =
        await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });

      if (resetError) {
        setError(resetError.message);
        return;
      }

      setMessage("Password reset link sent. Check your email.");
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
          Forgot password
        </h1>

        <p className="mt-2 text-sm text-ink-300">
          Enter your email and we&apos;ll send you a password reset link.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
            disabled={loading}
            className="h-11 w-full rounded-xl border border-ink-600 bg-ink-800 px-4 text-ink-50 outline-none focus:border-emerald-400 disabled:opacity-60"
          />

          {error && (
            <p className="text-sm text-coral-400" role="alert">
              {error}
            </p>
          )}

          {message && (
            <p className="text-sm text-emerald-400" role="status">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="h-11 w-full rounded-xl bg-emerald-500 font-medium text-ink-950 disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send reset link"}
          </button>
        </form>

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