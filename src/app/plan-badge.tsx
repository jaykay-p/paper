"use client";

import { useTransition } from "react";
import { openBillingPortal, startCheckout } from "./billing/actions";

export function PlanBadge({
  isPro,
  billingConfigured,
}: {
  isPro: boolean;
  billingConfigured: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  if (isPro) {
    return (
      <div className="flex items-center gap-2 text-sm">
        <span className="rounded-full bg-black/10 dark:bg-white/10 px-2 py-0.5 text-xs font-medium">
          Pro
        </span>
        <button
          type="button"
          disabled={isPending}
          onClick={() => startTransition(() => openBillingPortal())}
          className="underline underline-offset-2 disabled:opacity-60"
        >
          Manage billing
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="rounded-full bg-black/10 dark:bg-white/10 px-2 py-0.5 text-xs font-medium">
        Free
      </span>
      {billingConfigured ? (
        <button
          type="button"
          disabled={isPending}
          onClick={() => startTransition(() => startCheckout())}
          className="underline underline-offset-2 disabled:opacity-60"
        >
          Upgrade to Pro
        </button>
      ) : null}
    </div>
  );
}
