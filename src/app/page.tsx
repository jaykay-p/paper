import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

const FEATURES = [
  {
    title: "Add a to-do in seconds",
    body: "No setup, no clutter. Type it, hit enter, done.",
  },
  {
    title: "Edit and check off inline",
    body: "Double-click to rename, one click to complete. Nothing gets in your way.",
  },
  {
    title: "Yours, and only yours",
    body: "Every account is private. Log in from anywhere to pick up where you left off.",
  },
];

export default async function LandingPage() {
  const user = await getCurrentUser();
  if (user) redirect("/app");

  return (
    <main className="flex flex-1 flex-col items-center">
      <section className="flex w-full max-w-2xl flex-1 flex-col items-center justify-center gap-6 p-8 text-center">
        <h1 className="text-5xl font-semibold tracking-tight">paper</h1>
        <p className="max-w-md text-lg text-black/60 dark:text-white/60">
          The simple, fast to-do app. No noise, no busywork &mdash; just a
          list that gets out of your way.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/signup"
            className="rounded-md bg-foreground text-background px-5 py-2.5 text-sm font-medium"
          >
            Sign up free
          </Link>
          <Link
            href="/login"
            className="rounded-md border border-black/10 dark:border-white/20 px-5 py-2.5 text-sm font-medium"
          >
            Log in
          </Link>
        </div>
      </section>

      <section className="w-full max-w-3xl px-8 pb-16">
        <div className="grid gap-6 sm:grid-cols-3">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="flex flex-col gap-1.5">
              <h2 className="text-sm font-semibold">{feature.title}</h2>
              <p className="text-sm text-black/60 dark:text-white/60">
                {feature.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full max-w-2xl border-t border-black/10 dark:border-white/10 px-8 py-10 text-center">
        <p className="text-sm text-black/60 dark:text-white/60">
          Free to start.{" "}
          <Link href="/upgrade" className="underline underline-offset-2">
            See paper Pro
          </Link>{" "}
          when you outgrow the free plan.
        </p>
      </section>
    </main>
  );
}
