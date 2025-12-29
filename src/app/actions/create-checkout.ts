"use server"

import { auth } from "@/auth"
import Stripe from "stripe"
import { headers } from "next/headers"

export async function createCheckout() {
  const session = await auth()

  if (!session?.user?.id || !session?.user?.email) {
    return { error: "Não autorizado" }
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-12-18.acacia", 
    typescript: true,
  })

  const headersList = await headers()
  const origin = headersList.get("origin") || "https://linkhub-gamma.vercel.app"

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
  } catch (error) {
    console.error("Stripe Error:", error)
    return { error: "Erro ao criar checkout" }
  }
}