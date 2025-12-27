"use server"

import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Stripe from "stripe"

export async function createCheckout() {
  const session = await auth()

  if (!session?.user?.id) {
    return { error: "Não autorizado" }
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return { error: "Erro de configuração: Chave Stripe ausente" }
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-12-18.acacia", // Versão estável atual, ou remova essa linha
    typescript: true,
  })

  // Define a URL base (Localhost ou Vercel)
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

  try {
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      client_reference_id: session.user.id,
      customer_email: session.user.email || undefined,
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/dashboard?success=true`,
      cancel_url: `${baseUrl}/dashboard?canceled=true`,
    })

    if (!checkoutSession.url) {
      return { error: "Erro ao gerar link de pagamento" }
    }

    redirect(checkoutSession.url)
    
  } catch (error) {
    console.error("Erro Stripe:", error)
    return { error: "Erro ao conectar com o Stripe" }
  }
}