import Stripe from "stripe";
import type { UserModel } from "@/generated/prisma/models";

export const FREE_TODO_LIMIT = 5;

let stripeClient: Stripe | null = null;

export function getStripe(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY is not configured.");
  }
  if (!stripeClient) {
    stripeClient = new Stripe(secretKey);
  }
  return stripeClient;
}

export function isBillingConfigured(): boolean {
  return Boolean(
    process.env.STRIPE_SECRET_KEY &&
      process.env.STRIPE_PRICE_ID &&
      process.env.STRIPE_WEBHOOK_SECRET &&
      process.env.APP_URL,
  );
}

const ACTIVE_STATUSES = new Set(["active", "trialing"]);

export function isPro(user: Pick<UserModel, "subscriptionStatus">): boolean {
  return Boolean(
    user.subscriptionStatus && ACTIVE_STATUSES.has(user.subscriptionStatus),
  );
}

export function getAppUrl(): string {
  return process.env.APP_URL ?? "http://localhost:3000";
}
