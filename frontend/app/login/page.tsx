"use client";

import { useState, type InputHTMLAttributes, type ButtonHTMLAttributes } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

/* ------------------------------------------------------------------ */
/*  Reusable UI primitives                                             */
/* ------------------------------------------------------------------ */

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-[13px] font-medium tracking-wide text-emerald-100/70"
    >
      {children}
    </label>
  );
}

interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "id"> {
  id: string;
  label: string;
  icon: React.ReactNode;
}


function TextField({ label, icon, id, ...props }: TextFieldProps) {
  return (
    <div>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <div className="group relative flex items-center rounded-xl border border-emerald-400/15 bg-black/20 transition-colors focus-within:border-emerald-400/50 focus-within:bg-black/30">
        <span className="pointer-events-none absolute left-4 text-emerald-400/50 transition-colors group-focus-within:text-emerald-400">
          {icon}
        </span>
        <input
          id={id}
          className="w-full rounded-xl bg-transparent py-3.5 pl-11 pr-4 text-[15px] text-emerald-50 placeholder:text-emerald-100/25 outline-none disabled:opacity-50"
          {...props}
        />
      </div>
    </div>
  );
}

function PasswordField({
  label,
  id,
  value,
  onChange,
  disabled,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <FieldLabel htmlFor={id}>{label}</FieldLabel>
        <Link
          href="/forgot-password"
          className="text-[13px] font-medium text-emerald-400/80 transition-colors hover:text-emerald-300"
        >
          Forgot?
        </Link>
      </div>
      <div className="group relative flex items-center rounded-xl border border-emerald-400/15 bg-black/20 transition-colors focus-within:border-emerald-400/50 focus-within:bg-black/30">
        <span className="pointer-events-none absolute left-4 text-emerald-400/50 transition-colors group-focus-within:text-emerald-400">
          <LockIcon />
        </span>
        <input
          id={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="••••••••"
          autoComplete="current-password"
          disabled={disabled}
          required
          className="w-full rounded-xl bg-transparent py-3.5 pl-11 pr-11 text-[15px] text-emerald-50 placeholder:text-emerald-100/25 outline-none disabled:opacity-50"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          disabled={disabled}
          className="absolute right-3.5 text-emerald-100/40 transition-colors hover:text-emerald-300 disabled:opacity-50"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>
    </div>
  );
}

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

function PrimaryButton({ loading, children, ...props }: PrimaryButtonProps) {
  return (
    <button
      className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 py-3.5 text-[15px] font-semibold text-emerald-950 shadow-[0_0_0_1px_rgba(52,211,153,0.3),0_8px_24px_-8px_rgba(16,185,129,0.6)] transition-transform duration-200 hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <>
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-950/30 border-t-emerald-950" />
          Signing in…
        </>
      ) : (
        children
      )}
    </button>
  );
}

function AlertBanner({
  variant,
  children,
}: {
  variant: "error" | "success";
  children: React.ReactNode;
}) {
  const isError = variant === "error";
  return (
    <div
      role={isError ? "alert" : "status"}
      className={`mb-5 flex items-start gap-2.5 rounded-xl border px-4 py-3 text-[13.5px] ${
        isError
          ? "border-red-400/25 bg-red-500/10 text-red-300"
          : "border-emerald-400/25 bg-emerald-500/10 text-emerald-300"
      }`}
    >
      <span className="mt-0.5 shrink-0">
        {isError ? <AlertIcon /> : <CheckIcon />}
      </span>
      <span>{children}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Icons                                                               */
/* ------------------------------------------------------------------ */

function MailIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2.5" y="4.5" width="19" height="15" rx="3" />
      <path d="M3 6.5l9 6.5 9-6.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="4" y="10.5" width="16" height="10" rx="2.5" />
      <path d="M7.5 10.5V7.5a4.5 4.5 0 0 1 9 0v3" strokeLinecap="round" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M1.5 12S5 5 12 5s10.5 7 10.5 7-3.5 7-10.5 7S1.5 12 1.5 12z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 3l18 18" strokeLinecap="round" />
      <path
        d="M10.6 5.2A10.9 10.9 0 0 1 12 5c7 0 10.5 7 10.5 7a17.6 17.6 0 0 1-3.1 4.1M6.2 6.9C3.4 8.7 1.5 12 1.5 12s3.5 7 10.5 7a10.4 10.4 0 0 0 4.4-.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9.9 10a3 3 0 0 0 4.1 4.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9.5" />
      <path d="M12 8v5" strokeLinecap="round" />
      <circle cx="12" cy="16.2" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9.5" />
      <path d="M8 12.5l2.5 2.5L16 9.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path
        fill="#EA4335"
        d="M12 10.2v3.9h5.5c-.24 1.4-1.7 4.1-5.5 4.1-3.3 0-6-2.7-6-6.2s2.7-6.2 6-6.2c1.9 0 3.15.8 3.88 1.5l2.65-2.55C16.9 3.1 14.7 2.1 12 2.1 6.98 2.1 2.9 6.2 2.9 11.2S6.98 20.3 12 20.3c6.9 0 9.4-4.85 9.4-7.35 0-.5-.05-.87-.12-1.25H12z"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Signature ambient background                                       */
/* ------------------------------------------------------------------ */

function MetabolicField() {
  const nodes = [
    { x: 60, y: 90 }, { x: 180, y: 40 }, { x: 320, y: 120 }, { x: 460, y: 60 },
    { x: 560, y: 160 }, { x: 90, y: 260 }, { x: 250, y: 300 }, { x: 420, y: 260 },
    { x: 540, y: 340 }, { x: 150, y: 420 }, { x: 350, y: 440 }, { x: 500, y: 480 },
  ];
  const edges = [
    [0, 1], [1, 2], [2, 3], [3, 4], [1, 5], [5, 6], [6, 7], [7, 4],
    [6, 9], [9, 10], [10, 11], [7, 8], [2, 6],
  ];

  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-[0.35]"
      viewBox="0 0 600 500"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="url(#lineGrad)"
          strokeWidth="1"
        />
      ))}
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={i % 3 === 0 ? 2.5 : 1.5}
          fill="#34D399"
          className="animate-pulse"
          style={{ animationDelay: `${i * 0.4}s`, animationDuration: "3.5s" }}
        />
      ))}
      <defs>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function BrandMark() {
  return (
    <div className="mb-8 flex flex-col items-center">
      <div className="relative mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400/20 to-teal-500/10 ring-1 ring-emerald-400/30">
        <div className="absolute inset-0 rounded-2xl bg-emerald-400/20 blur-xl" />
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="relative">
          <path
            d="M12 21s-7-4.5-9.5-9C.5 7.5 3 3.5 7 4c2.4.3 4 2 5 3.5C13 6 14.6 4.3 17 4c4-.5 6.5 3.5 4.5 8-2.5 4.5-9.5 9-9.5 9z"
            fill="url(#leafGrad)"
          />
          <path d="M12 21V10" stroke="#052e21" strokeWidth="1.2" strokeLinecap="round" />
          <defs>
            <linearGradient id="leafGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6EE7B7" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <h1 className="text-[22px] font-semibold tracking-tight text-emerald-50">
        NutriMind <span className="text-emerald-400">AI</span>
      </h1>
      <p className="mt-1.5 text-[13.5px] text-emerald-100/40">
        Sign in to continue your metabolic journey
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message ?? "Unable to sign in. Please check your credentials.");
      setLoading(false);
      return;
    }

    setSuccess("Signed in successfully. Redirecting…");
    router.push("/dashboard");
    router.refresh();
  }

  async function handleGoogleLogin() {
    setError(null);
    setSuccess(null);
    setGoogleLoading(true);

    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
      },
    });

    if (oauthError) {
      setError(oauthError.message ?? "Unable to sign in with Google.");
      setGoogleLoading(false);
    }
    // On success, Supabase redirects away from this page automatically.
  }

  const disabled = loading || googleLoading;

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#040f0b] px-4 py-12">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(16,185,129,0.18),transparent)]" />
        <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[380px] w-[380px] rounded-full bg-teal-400/10 blur-[100px]" />
        <MetabolicField />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(4,15,11,0.6)_75%,#040f0b)]" />
      </div>

      {/* Card */}
      <div className="relative w-full max-w-[420px]">
        <div className="absolute -inset-px rounded-[28px] bg-gradient-to-b from-emerald-400/20 via-emerald-400/5 to-transparent" />
        <div className="relative rounded-[28px] border border-white/[0.06] bg-white/[0.04] p-8 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-2xl sm:p-10">
          <BrandMark />

          {error && <AlertBanner variant="error">{error}</AlertBanner>}
          {success && <AlertBanner variant="success">{success}</AlertBanner>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <TextField
              id="email"
              label="Email"
              icon={<MailIcon />}
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={disabled}
              required
            />

            <PasswordField
              id="password"
              label="Password"
              value={password}
              onChange={setPassword}
              disabled={disabled}
            />

            <PrimaryButton type="submit" loading={loading} disabled={googleLoading}>
              Log In
            </PrimaryButton>
          </form>

          <div className="my-7 flex items-center gap-3">
            <span className="h-px flex-1 bg-white/[0.08]" />
            <span className="text-[12px] uppercase tracking-wider text-emerald-100/30">or</span>
            <span className="h-px flex-1 bg-white/[0.08]" />
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={disabled}
            className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] py-3 text-[14px] font-medium text-emerald-50/80 transition-colors hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {googleLoading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-100/20 border-t-emerald-100/80" />
                Connecting…
              </>
            ) : (
              <>
                <GoogleIcon />
                Continue with Google
              </>
            )}
          </button>

          <p className="mt-8 text-center text-[13.5px] text-emerald-100/50">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-emerald-400 transition-colors hover:text-emerald-300"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}