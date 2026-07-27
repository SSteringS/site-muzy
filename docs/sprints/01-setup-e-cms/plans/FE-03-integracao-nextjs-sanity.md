---
task_id: FE-03
title: "Integrar Next.js com Sanity (GROQ client + queries tipadas)"
sprint: "01-setup-e-cms"
status: planejamento
tipo: feature
agente: frontend
origin: backlog
fluxos_qa: []
---

## Contexto

Criar a camada de dados que conecta o Next.js ao Sanity. Esta task implementa o cliente GROQ,
as queries tipadas e os helpers de imagem — a fundação que todas as páginas de conteúdo vão usar.

Ao final, a rota `/artigos` deve renderizar dados reais do Sanity (mesmo sem estilo final),
provando que a integração está funcionando end-to-end.

Specs de referência: `docs/architecture/especificacao-tecnica.md` §Queries GROQ.

## Critérios de aceite

- [ ] CA-01: `lib/sanity.client.ts` exporta um client configurado com `projectId`, `dataset`, `apiVersion` e `useCdn: true` para leitura pública.
- [ ] CA-02: `lib/sanity.server.ts` exporta um client com `token: process.env.SANITY_API_TOKEN` para operações autenticadas (usado pelo webhook e futuros drafts).
- [ ] CA-03: `lib/sanity.queries.ts` contém queries GROQ tipadas para: `getAllPosts`, `getPostBySlug`, `getSiteSettings`, `getAllTeamMembers`.
- [ ] CA-04: `lib/sanity.image.ts` exporta função `urlFor(source)` usando `@sanity/image-url` — helper central para todas as imagens vindas do Sanity.
- [ ] CA-05: TypeScript: todos os tipos de retorno das queries explicitamente declarados (sem `any`).
- [ ] CA-06: `app/artigos/page.tsx` chama `getAllPosts()` e renderiza uma lista com título, data e link de cada artigo — conteúdo real do Sanity, sem estilo final.
- [ ] CA-07: Acessar `http://localhost:3000/artigos` mostra a lista (pode ter apenas o artigo de teste criado em FE-02).
- [ ] CA-08: `SANITY_API_TOKEN` documentado em `env.example` e configurado no `.env.local` local.

## Escopo — o que está DENTRO

- `lib/sanity.client.ts` — cliente público (CDN, sem token)
- `lib/sanity.server.ts` — cliente autenticado (com token, só servidor)
- `lib/sanity.queries.ts` — queries GROQ com tipos TypeScript
- `lib/sanity.image.ts` — helper `urlFor()`
- `app/artigos/page.tsx` — page component simples para validar integração (sem estilo)

## Fora de escopo

- Estilo visual das páginas (FE-06 + Sprint 02)
- Página individual do artigo `/artigos/[slug]` (FE-06)
- Webhook de revalidação (FE-04)
- Queries para `institutionalSection` (serão adicionadas em Sprint 02 quando as páginas institucionais forem criadas)

## Dependências

| Dependência | Tipo | Status |
|---|---|---|
| FE-01 (projeto Next.js) | task anterior | planejamento |
| FE-02 (schemas no Sanity + project ID) | task anterior | planejamento |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` disponível | resultado de FE-02 | planejamento |
| `SANITY_API_TOKEN` gerado no Sanity | externo (humano gera no painel) | necessita gerar |

> O token de API é gerado no painel do Sanity (`sanity.io/manage → API → Tokens`).
> Tipo: Editor (read + write) — necessário para o webhook de revalidação em FE-04.

## Riscos

| Risco | Mitigação |
|---|---|
| `useCdn: true` pode servir dados desatualizados em desenvolvimento | Usar `useCdn: false` no client de desenvolvimento (checar se `next-sanity` já faz isso por padrão com `NODE_ENV`) |
| Query GROQ muito ampla busca campos desnecessários (overfetch) | Projeções explícitas em cada query — nunca `*[_type == "post"]` sem projeção |

## Branch

`feature/FE-03-integracao-nextjs-sanity` a partir de `develop`

## Coordenação

Esta task desbloqueia FE-06.
Ao concluir, notificar o Planner para atualizar STATE.md.

## Definição de pronto

`docs/runbooks/PRE-MERGE-CHECKLIST.md`
