# 🔗 LinkHub

> Uma plataforma SaaS completa para gerenciamento de links (estilo Linktree), desenvolvida com as tecnologias mais modernas.

<img width="1635" height="943" alt="site15" src="https://github.com/user-attachments/assets/3898c6b0-80fe-4b71-b5dd-ee6c245c3881" />


## 🌐 Demonstração Ao Vivo
Acesse o projeto rodando em produção:
👉 **[https://linkhub-gamma.vercel.app/](https://linkhub-gamma.vercel.app/)**

---

## 🛠 Tecnologias Utilizadas

Este projeto foi construído para simular um ambiente real de produção, utilizando:

- **Framework:** [Next.js](https://nextjs.org/) (App Router & Server Components)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Banco de Dados:** PostgreSQL (via Prisma ORM)
- **Autenticação:** NextAuth (Google & Email)
- **Pagamentos:** Stripe (Checkout & Webhooks)
- **Upload:** Vercel Blob
- **UX:** Drag-and-Drop (@hello-pangea/dnd)

---

## 🚀 Funcionalidades Principais

- **🔐 Autenticação Segura:** Login social (Google) e via credenciais.
- **💳 Assinatura PRO (SaaS):** Integração completa com **Stripe**. O sistema utiliza **Webhooks** para ouvir a confirmação de pagamento e liberar o acesso PRO automaticamente no banco de dados.
- **🔄 Drag-and-Drop:** Reordenação intuitiva dos links apenas arrastando e soltando.
- **📱 Perfil Público:** Cada usuário tem uma URL única (`/seu-nome`) otimizada para mobile.
- **⚡ Server Actions:** Toda a mutação de dados (criar, editar, deletar links) roda diretamente no servidor, garantindo segurança e performance.
- **📈 Analytics Simples:** Contagem de cliques em cada link.

---

## ⚠️ Nota sobre Pagamentos

O projeto está configurado no **Modo de Teste** do Stripe.
Você pode simular uma assinatura PRO utilizando os dados de teste padrão do Stripe (ex: cartão 4242...), sem nenhuma cobrança real no seu cartão.

---

## 💻 Como rodar localmente

1. **Clone o repositório:**
```bash
git clone [https://github.com/JoaoAndreotti90/linkhub.git](https://github.com/JoaoAndreotti90/linkhub.git)
cd linkhub
