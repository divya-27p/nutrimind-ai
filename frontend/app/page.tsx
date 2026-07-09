import { Camera, Brain, Activity, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#07130f] text-white">
      <section className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 text-center">
        <div className="mb-6 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-300">
          AI Nutrition + Metabolic Health Platform
        </div>

        <h1 className="max-w-5xl text-5xl font-bold tracking-tight md:text-7xl">
          Understand your food.
          <span className="block text-emerald-300">
            Transform your health.
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-white/70">
          NutriMind AI analyzes meals from photos, estimates nutrition, and
          explains how every bite affects your body, goals, and long-term
          metabolic health.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <button className="flex items-center justify-center gap-2 rounded-full bg-emerald-400 px-8 py-4 font-semibold text-black transition hover:bg-emerald-300">
            Analyze your meal
            <ArrowRight size={18} />
          </button>

          <button className="rounded-full border border-white/20 px-8 py-4 font-semibold text-white transition hover:bg-white/10">
            View demo dashboard
          </button>
        </div>

        <div className="mt-16 grid w-full max-w-4xl gap-6 md:grid-cols-3">
          <FeatureCard
            icon={<Camera />}
            title="Photo Food Analysis"
            desc="Upload any meal photo and get instant food detection."
          />

          <FeatureCard
            icon={<Brain />}
            title="AI Health Reasoning"
            desc="Understand macros, ingredients, and meal quality."
          />

          <FeatureCard
            icon={<Activity />}
            title="Goal-Based Insights"
            desc="Know whether a meal supports fat loss, muscle gain, or maintenance."
          />
        </div>
      </section>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-left backdrop-blur">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/20 text-emerald-300">
        {icon}
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-white/60">{desc}</p>
    </div>
  );
}