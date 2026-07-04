"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { getAppUrl, getStripe, isBillingConfigured } from "@/lib/billing";

export async function startCheckout() {
  const user = await requireUser();
  if (!isBillingConfigured()) {
    throw new Error("Billing is not configured yet.");
  }

  const stripe = getStripe();
  const appUrl = getAppUrl();

  let customerId = user.stripeCustomerId;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: { userId: user.id },
    });
    const { count } = await prisma.user.updateMany({
      where: { id: user.id, stripeCustomerId: null },
      data: { stripeCustomerId: customer.id },
    });
    if (count > 0) {
      customerId = customer.id;
    } else {
      // Another concurrent checkout already won the race and set a customer id.
      const existing = await prisma.user.findUniqueOrThrow({
        where: { id: user.id },
      });
      customerId = existing.stripeCustomerId!;
    }
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    line_items: [{ price: process.env.STRIPE_PRICE_ID!, quantity: 1 }],
    success_url: `${appUrl}/app?upgraded=1`,
    cancel_url: `${appUrl}/upgrade`,
    client_reference_id: user.id,
  });

  if (!session.url) throw new Error("Stripe did not return a checkout URL.");
  redirect(session.url);
}

export async function openBillingPortal() {
  const user = await requireUser();
  if (!isBillingConfigured() || !user.stripeCustomerId) {
    throw new Error("No billing account found for this user.");
  }

  const stripe = getStripe();
  const session = await stripe.billingPortal.sessions.create({
    customer: user.stripeCustomerId,
    return_url: `${getAppUrl()}/app`,
  });

  redirect(session.url);
}
