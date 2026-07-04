import Link from "next/link";
import { requireUser } from "@/lib/auth";

const TIPS = [
  "Type in the box and hit Add — no forms, no friction.",
  "Double-click any to-do to rename it.",
  "Check it off when it's done. Uncheck to bring it back.",
];

export default async function WelcomePage() {
  const user = await requireUser();

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-8 p-8">
      <div className="w-full max-w-sm flex flex-col gap-6 text-center">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Welcome to paper{user.email ? `, ${user.email.split("@")[0]}` : ""}
          </h1>
          <p className="mt-1 text-sm text-black/60 dark:text-white/60">
            Here&apos;s everything you need to know.
          </p>
        </div>

        <ul className="flex flex-col gap-3 text-left">
          {TIPS.map((tip) => (
            <li
              key={tip}
              className="rounded-md border border-black/10 dark:border-white/10 px-3 py-2 text-sm"
            >
              {tip}
            </li>
          ))}
        </ul>

        <div className="flex flex-col items-center gap-2">
          <Link
            href="/upgrade"
            className="w-full rounded-md bg-foreground text-background px-4 py-2.5 text-sm font-medium"
          >
            Continue
          </Link>
          <Link
            href="/app"
            className="text-xs text-black/50 dark:text-white/50 underline underline-offset-2"
          >
            Skip, take me to my to-dos
          </Link>
        </div>
      </div>
    </main>
  );
}
