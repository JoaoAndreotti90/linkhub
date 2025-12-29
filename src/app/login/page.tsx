import { EmailLoginForm } from "@/components/email-login-form"
import Link from "next/link"
import { GoogleButton } from "@/components/google-button"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg border border-gray-100">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Bem-vindo</h1>
          <p className="text-sm text-gray-600 mt-2">Acesse sua conta para continuar</p>
        </div>

        <GoogleButton />

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">ou continue com email</span>
          </div>
        </div>

        <EmailLoginForm />

        <p className="mt-6 text-center text-sm text-gray-600">
          Não tem uma conta?{" "}
          <Link href="/register" className="font-medium text-blue-600 hover:underline">
            Crie agora
          </Link>
        </p>
      </div>
    </div>
  )
}