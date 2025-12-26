import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Link from "next/link" // <--- Importante importar isso
import { ArrowRight, CheckCircle2, Share2, BarChart3, Globe } from "lucide-react"

export default async function Home() {
  const session = await auth()

  if (session?.user) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Share2 className="text-white h-5 w-5" />
            </div>
            <span className="text-xl font-bold text-gray-900">LinkHub</span>
          </div>
          
          <nav className="hidden md:flex gap-6">
            <a href="#funcionalidades" className="text-sm font-medium text-gray-600 hover:text-blue-600">Funcionalidades</a>
            <a href="#precos" className="text-sm font-medium text-gray-600 hover:text-blue-600">Preços</a>
          </nav>

          {/* Botão Entrar agora leva para /login */}
          <Link 
            href="/login"
            className="rounded-full bg-gray-900 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
          >
            Entrar
          </Link>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-6xl px-4 py-20 text-center lg:py-32">
          <h1 className="mx-auto max-w-4xl text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl mb-6">
            Todos os seus links em <span className="text-blue-600">um único lugar.</span>
          </h1>
          
          <p className="mx-auto max-w-2xl text-lg text-gray-600 mb-10">
            Crie uma página personalizada para compartilhar seu Instagram, TikTok, WhatsApp e muito mais. 
            Simples, rápido e com visual profissional.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            {/* Botão Principal agora leva para /login */}
            <Link 
              href="/login"
              className="flex items-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-lg font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-blue-700"
            >
              Criar meu LinkHub Grátis
              <ArrowRight className="h-5 w-5" />
            </Link>
            
            <p className="text-sm text-gray-500 mt-4 sm:mt-0">
              Não precisa de cartão de crédito
            </p>
          </div>
        </section>

        {/* ... (O resto da página continua igual: Cards, Footer, etc) ... */}
        {/* Mantenha o resto do código da seção de features e footer aqui embaixo */}
        <section className="bg-gray-50 py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid gap-12 lg:grid-cols-3">
              <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                  <Globe className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">Link Personalizado</h3>
                <p className="text-gray-600">Garanta seu endereço único (ex: linkhub.com/voce) para usar na bio das redes sociais.</p>
              </div>

              <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">Analytics em Tempo Real</h3>
                <p className="text-gray-600">Saiba exatamente quantos cliques cada link recebeu e descubra o que seu público mais gosta.</p>
              </div>

               <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-600">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">Totalmente Gerenciável</h3>
                <p className="text-gray-600">Adicione, remova e reordene seus links arrastando e soltando. Tudo pelo painel.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-white py-12">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <p className="text-gray-500">© 2025 LinkHub. Feito com ❤️ por João Andreotti.</p>
        </div>
      </footer>
    </div>
  )
}