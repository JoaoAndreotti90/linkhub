import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Share2, BarChart3, Globe, Check } from "lucide-react"

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
            <Link href="#funcionalidades" className="text-sm font-medium text-gray-600 hover:text-blue-600">Funcionalidades</Link>
            <Link href="#precos" className="text-sm font-medium text-gray-600 hover:text-blue-600">Preços</Link>
          </nav>

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

        <section id="funcionalidades" className="bg-gray-50 py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Tudo o que você precisa</h2>
              <p className="text-gray-600">Ferramentas poderosas para crescer sua audiência.</p>
            </div>

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

        <section id="precos" className="py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Planos simples e transparentes</h2>
              <p className="text-gray-600">Comece grátis e evolua conforme você cresce.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-center">
              <div className="bg-white p-8 rounded-3xl border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900">Gratuito</h3>
                <div className="text-4xl font-bold mt-4 mb-2">R$ 0 <span className="text-lg font-normal text-gray-500">/mês</span></div>
                <p className="text-gray-600 mb-8">Para quem está começando agora.</p>
                
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-gray-700">
                    <Check className="h-5 w-5 text-green-500" /> Links Ilimitados
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <Check className="h-5 w-5 text-green-500" /> Analytics Básico
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <Check className="h-5 w-5 text-green-500" /> Temas Padrão
                  </li>
                </ul>

                <Link href="/login" className="block w-full py-3 px-6 rounded-xl bg-gray-100 text-gray-900 font-bold text-center hover:bg-gray-200 transition-colors">
                  Começar Grátis
                </Link>
              </div>

              <div className="relative bg-gray-900 p-8 rounded-3xl border border-gray-800 text-white shadow-2xl scale-105">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                  Mais Popular
                </div>
                
                <h3 className="text-2xl font-bold">PRO</h3>
                <div className="text-4xl font-bold mt-4 mb-2">R$ 19,90 <span className="text-lg font-normal text-gray-400">/mês</span></div>
                <p className="text-gray-400 mb-8">Para criadores e profissionais.</p>
                
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-blue-400" /> <strong>Tudo do Grátis</strong>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-blue-400" /> Analytics Avançado
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-blue-400" /> Sem marca d'água
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-blue-400" /> Suporte Prioritário
                  </li>
                </ul>

                <Link href="/login" className="block w-full py-3 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-center hover:opacity-90 transition-opacity">
                  Virar PRO
                </Link>
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