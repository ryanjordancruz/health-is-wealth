import "server-only";
import Stripe from "stripe";

// Lazily initialized so the app can build/start without Stripe keys
// configured yet — the error only surfaces when a checkout/webhook route is
// actually hit, not at module import time.
let stripeClient: Stripe | undefined;

function getStripeClient(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not set.");
  }
  if (!stripeClient) {
    stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return stripeClient;
}

export const stripe = new Proxy({} as Stripe, {
  get(_target, property) {
    return getStripeClient()[property as keyof Stripe];
  },
});
