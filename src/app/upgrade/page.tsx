import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { createCheckout } from "@/app/actions/create-checkout"

export default async function UpgradePage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/login?callbackUrl=/upgrade")
  }

  const result = await createCheckout()

  if (result?.url) {
    redirect(result.url)
  }

  redirect("/dashboard")
}