import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const fullName =
    typeof user.user_metadata?.full_name === "string"
      ? user.user_metadata.full_name
      : "User";

  return (
    <main className="min-h-screen bg-ink-950 px-6 py-10 text-ink-100">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm text-emerald-400">NutriMind AI</p>

        <h1 className="mt-2 text-3xl font-semibold">
          Welcome, {fullName}
        </h1>

        <p className="mt-2 text-ink-300">
          You are signed in as {user.email}.
        </p>

        <div className="mt-10 rounded-2xl border border-ink-700 bg-ink-900 p-6">
          <h2 className="text-xl font-semibold">Dashboard</h2>

          <p className="mt-2 text-ink-300">
            Your meal tracking and nutrition insights will appear here.
          </p>
        </div>
      </div>
    </main>
  );
}