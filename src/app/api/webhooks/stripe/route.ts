import { headers } from "next/headers"
import Stripe from "stripe"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
})

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get("Stripe-Signature") as string
  
  // A chave secreta do webhook (vamos pegar no painel do Stripe já já)
  const secret = process.env.STRIPE_WEBHOOK_SECRET!

  if (!secret || !signature) {
    return new NextResponse("Erro de configuração do Webhook", { status: 400 })
  }

  let event: Stripe.Event

  try {
    // Verifica se o aviso veio mesmo do Stripe e não de um hacker
    event = stripe.webhooks.constructEvent(body, signature, secret)
  } catch (error) {
    console.error("Erro na assinatura do Webhook", error)
    return new NextResponse("Webhook Error", { status: 400 })
  }

  // Se o evento for "Pagamento Completado"
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session
    
    // Pegamos o ID do usuário que enviamos lá no checkout
    if (session.client_reference_id) {
        await prisma.user.update({
            where: { id: session.client_reference_id },
            data: { 
                plan: "PRO",
                stripeCustomerId: session.customer as string 
            }
        })
        console.log(`Usuário ${session.client_reference_id} virou PRO!`)
    }
  }

  return new NextResponse(null, { status: 200 })
}