---
task_id: FE-03
title: "Integrar Next.js com Sanity (GROQ client + queries tipadas)"
sprint: "01-setup-e-cms"
estado: concluido
data_conclusao: 2026-07-27
branch: feature/FE-03-integracao-nextjs-sanity
pr_url: ~
agente: frontend
---

## Resumo do que foi implementado

Camada de dados completa conectando Next.js ao Sanity via GROQ.
Dois clientes distintos: público (CDN em produção, fresh em dev) e autenticado (server-only,
para webhook e drafts). Queries GROQ com projeções explícitas — sem overfetch.
Tipos TypeScript declarados explicitamente para todos os retornos.
Página `/artigos` renderiza dados reais do Sanity como Server Component com `revalidate=300`.

## Arquivos principais criados/modificados

| Arquivo | Tipo de mudança |
|---|---|
| `lib/sanity.client.ts` | criado — cliente público, `useCdn` por ambiente |
| `lib/sanity.server.ts` | criado — cliente autenticado, server-only |
| `lib/sanity.image.ts` | criado — `urlFor()` via `@sanity/image-url` v2 |
| `lib/sanity.queries.ts` | criado — 4 queries tipadas + tipos TypeScript |
| `app/artigos/page.tsx` | criado — Server Component, lista artigos reais |

## Desvios do plano

**`SanityImageSource` do caminho correto para v2:**
A importação `@sanity/image-url/lib/types/types` não existe na v2 do pacote —
o tipo é exportado diretamente de `@sanity/image-url`. Ajuste feito durante o desenvolvimento
(o TypeScript apontou o erro antes do commit).

Nenhum outro desvio.

## Pontos de atenção para o Reviewer

- `sanity.server.ts`: sem `import 'server-only'` (pacote não instalado). Proteção é por
  convenção + o fato de `SANITY_API_TOKEN` não ter prefixo `NEXT_PUBLIC_` (Next.js não
  inclui em bundle client). Considerar instalar `server-only` em sprint futura.
- `useCdn: process.env.NODE_ENV === 'production'` — evita dados stale em dev.
- Todos os tipos de retorno são explícitos (CA-05 satisfeito): sem `any`, sem inferência
  implícita nas funções fetch.
- `app/artigos/page.tsx` é Server Component puro: sem `"use client"`, busca dados
  diretamente em `getAllPosts()`.
- `revalidate = 300` como fallback — FE-04 adicionará revalidação on-demand por webhook.

---

## Seção 7 — Avaliação QA

**Status:** não aplicável — `fluxos_qa: []` no plano da task.

**Fluxos executados:** nenhum (CA-07 requer `npm run dev` local — validação humana pendente).
