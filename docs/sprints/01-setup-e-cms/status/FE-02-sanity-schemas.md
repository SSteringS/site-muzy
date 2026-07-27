---
task_id: FE-02
title: "Configurar Sanity — projeto, dataset e schemas"
sprint: "01-setup-e-cms"
estado: concluido
data_conclusao: 2026-07-27
branch: feature/FE-02-sanity-schemas
pr_url: ~
agente: frontend
---

## Resumo do que foi implementado

Schemas Sanity implementados com `defineType`/`defineField` (Sanity v6 / next-sanity v13).
`siteSettings` configurado como singleton via `structureTool` com estrutura customizada,
`document.newDocumentOptions` e `document.actions` — padrão oficial Sanity v3.
Rota `/studio` adicionada com split em dois arquivos: `layout.tsx` exporta
`metadata`/`viewport` (Server Component) e `page.tsx` usa `"use client"` para carregar o Studio
(necessário porque `sanity.config.ts` contém funções não-serializáveis através da boundary
Server→Client).

## Arquivos principais criados/modificados

| Arquivo | Tipo de mudança |
|---|---|
| `sanity/schemaTypes/post.ts` | criado |
| `sanity/schemaTypes/teamMember.ts` | criado |
| `sanity/schemaTypes/institutionalSection.ts` | criado |
| `sanity/schemaTypes/siteSettings.ts` | criado |
| `sanity/schemaTypes/index.ts` | criado |
| `sanity/sanity.config.ts` | criado |
| `app/studio/[[...tool]]/page.tsx` | criado |
| `app/studio/[[...tool]]/layout.tsx` | criado |
| `next.config.ts` | modificado — `remotePatterns` para `cdn.sanity.io` |

## Desvios do plano

**Split layout/page para o Studio:**
O plano mencionava um único `page.tsx`. Foi necessário criar também um `layout.tsx`
porque `metadata` e `viewport` são ignorados por Next.js em Client Components —
e o `page.tsx` precisa ser `"use client"` pois `sanity.config.ts` contém callbacks
(funções) que não cruzam a boundary Server→Client.

**`next-sanity` v13 / Sanity v6 (vs. spec v9/v6):**
Versões já instaladas na FE-01. A API de `defineType`/`defineField` e `structureTool`
é compatível com a spec. Desvio de versão já documentado na memória do agente.

## Pontos de atenção para o Reviewer

- Padrão singleton: verificar se `SINGLETON_TYPES` em `sanity.config.ts` cobre adequadamente
  as três restrições (newDocumentOptions, actions/duplicate, structureTool custom).
- `page.tsx` usa `'use client'` com justificativa em comentário — correto por design.
- `layout.tsx` exporta apenas `metadata`/`viewport` — garante `robots: noindex` na rota `/studio`.
- `next.config.ts`: `remotePatterns` adicionado para CDN Sanity (necessário para FE-03+).
- `.env.local` criado localmente (gitignored) com `NEXT_PUBLIC_SANITY_PROJECT_ID=z38d0iih`.

---

## Seção 7 — Avaliação QA

_(Preenchida pelo agente QA após execução dos fluxos_qa. Deixar em branco se QA não foi acionado.)_

**Status:** não aplicável — `fluxos_qa: []` no plano da task.

**Fluxos executados:** nenhum (QA manual pendente: CA-07 e CA-08 requerem `npm run dev` local
com conta Sanity autenticada no browser — ação humana necessária).
