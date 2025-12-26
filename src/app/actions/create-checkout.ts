"use server"

import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Stripe from "stripe"

export async function createCheckout() {
  const session = await auth()

  if (!session?.user?.id) {
    return { error: "Não autorizado" }
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-12-18.acacia", // Usa a versão mais recente
  })

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    client_reference_id: session.user.id, // O segredo: guarda o ID do usuário no pagamento
    customer_email: session.user.email || "",
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID,
        quantity: 1,
      },
    ],
    success_url: "http://localhost:3000/dashboard?success=true",
    cancel_url: "http://localhost:3000/dashboard?canceled=true",
  })

  if (!checkoutSession.url) {
    return { error: "Erro ao criar checkout" }
  }

  redirect(checkoutSession.url)
}