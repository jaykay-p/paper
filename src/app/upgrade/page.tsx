import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";

const PRO_FEATURES = [
  "Unlimited to-dos",
  "Priority support",
  "Early access to new features",
];

export default async function UpgradePage() {
  const user = await getCurrentUser();

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-8 p-8">
      <div className="w-full max-w-sm flex flex-col gap-6 text-center">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            paper Pro
          </h1>
          <p className="mt-1 text-sm text-black/60 dark:text-white/60">
            Free is free forever. Upgrade when you want more.
          </p>
        </div>

        <div className="rounded-lg border border-black/10 dark:border-white/15 p-5 flex flex-col gap-4">
          <div>
            <p className="text-3xl font-semibold">
              $6<span className="text-base font-normal text-black/50 dark:text-white/50">/mo</span>
            </p>
          </div>
          <ul className="flex flex-col gap-2 text-left text-sm">
            {PRO_FEATURES.map((feature) => (
              <li key={feature} className="flex items-center gap-2">
                <span aria-hidden className="text-green-600 dark:text-green-400">
                  &#10003;
                </span>
                {feature}
              </li>
            ))}
          </ul>

          {user ? (
            <Link
              href="/app?upgraded=1"
              className="rounded-md bg-foreground text-background px-4 py-2.5 text-sm font-medium"
            >
              Upgrade to Pro
            </Link>
          ) : (
            <Link
              href="/signup"
              className="rounded-md bg-foreground text-background px-4 py-2.5 text-sm font-medium"
            >
              Sign up to get started
            </Link>
          )}
        </div>

        <Link
          href={user ? "/app" : "/"}
          className="text-xs text-black/50 dark:text-white/50 underline underline-offset-2"
        >
          Not now
        </Link>
      </div>
    </main>
  );
}
