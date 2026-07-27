---
task_id: FE-06
title: "Implementar /artigos — listagem e detalhe"
sprint: "01-setup-e-cms"
estado: concluido
data_conclusao: 2026-07-27
branch: feature/FE-06-artigos-listagem-detalhe
pr_url: ~
agente: frontend
---

## Resumo do que foi implementado

Rota `/artigos/[slug]` criada com geração estática (`generateStaticParams`), metadata dinâmica
(`generateMetadata`) e renderização de rich text via `PortableText`.
`@portabletext/react` instalado como dependência direta (era transitivo via `next-sanity`).
`revalidate = 300` declarado — completa o CA-03 da FE-04.
Build confirmou `generateStaticParams` funcionando: artigo de teste do FE-02 pré-gerado como
`/artigos/artigo-de-teste` com `revalidate: 5m`.

A listagem (`app/artigos/page.tsx`) não foi modificada — já satisfazia CA-01 e CA-02 desde FE-03.

## Arquivos principais criados/modificados

| Arquivo | Tipo de mudança |
|---|---|
| `app/artigos/[slug]/page.tsx` | criado — detalhe do artigo |
| `package.json` | modificado — `@portabletext/react ^7.0.1` adicionado |
| `package-lock.json` | modificado — lockfile atualizado |

## Desvios do plano

**`PostSummary` em vez de `Post`:**
O plano menciona tipo `Post` mas FE-03 implementou `PostSummary` (mais descritivo). Ambos
`PostSummary` e `PostDetail` estão tipados e exportados em `lib/sanity.queries.ts`.
Nenhuma mudança de nome — consistência com FE-03 é prioritária.

**`export const metadata` na listagem (não `generateMetadata()`):**
O plano pede `generateMetadata()` em ambas as rotas. Para a listagem (`/artigos`), o título
não depende de dados dinâmicos, então `export const metadata = { title: '...' }` é a forma
correta no Next.js — equivalente ao `generateMetadata` estático. Apenas a rota `[slug]`
precisa de `generateMetadata()` (função), pois o título varia por artigo.

## Pontos de atenção para o Reviewer

- `params: Promise<{ slug: string }>` — padrão Next.js 15+/16. `await params` antes de usar.
- `notFound()` para slug inexistente — 404 nativo do Next.js.
- `dynamicParams` não declarado explicitamente — padrão `true` no Next.js 16: slugs não
  pré-gerados são server-rendered on demand (correto para novos artigos entre revalidações).
- Wrapper do PortableText usa `space-y-4 leading-relaxed` — estilo mínimo para legibilidade.
  Design final na Sprint 02.
- Mobile CA-10: `max-w-3xl px-4` + `flex-wrap` no cabeçalho do artigo — sem overflow horizontal.

---

## Seção 7 — Avaliação QA

**Status:** pendente — requer deploy no Netlify (decisão: opção B, deploy após FE-05 + FE-06).

**Fluxos a executar pós-deploy:**

| Fluxo | Resultado | Observação |
|---|---|---|
| Visitante acessa /artigos e vê lista com título, data, link | pendente | CA-07 |
| Visitante clica no artigo e vê título, data, autor, corpo | pendente | CA-08 |
