import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { createCheckout } from "@/app/actions/create-checkout"

export default async function UpgradePage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/login?callbackUrl=/upgrade")
  }

  const result = await createCheckout()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const url = (result as any)?.url

  if (url) {
    redirect(url)
  }

  redirect("/dashboard")
}