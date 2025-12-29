"use server"

import { auth } from "@/auth"
import Stripe from "stripe"
import { headers } from "next/headers"

export async function createCheckout() {
  const session = await auth()

  if (!session?.user?.id || !session?.user?.email) {
    return { error: "Não autorizado" }
  }

  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_PRICE_ID) {
    return { error: "Erro de Configuração" }
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    typescript: true,
  })

  const headersList = await headers()
  const origin = headersList.get("origin") || "http://localhost:3000"

  try {
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: session.user.email,
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      success_url: `${origin}/dashboard`,
      cancel_url: `${origin}/dashboard`,
      metadata: {
        userId: session.user.id,
      },
    })

    return { url: checkoutSession.url }

  } catch (error: any) {
    return { error: `Erro Stripe: ${error.message}` }
  }
}