# CLAUDE.md — Site Clínica Muzy

Regras globais. Todo agente lê antes de agir. Papel-específico está em `.claude/agents/<papel>.md`.

---

## Projeto

Site institucional da **Clínica Muzy** (Dr. Paulo Muzy, medicina esportiva).
CMS headless com Sanity, frontend Next.js (TypeScript), deploy contínuo no Netlify.
Fase atual: favor informal (orçamento zero) — prioridade a planos gratuitos.

Referência completa de produto: `docs/site-muzy-project-brief.md`

---

## Stack

| Camada | Tecnologia | Plano |
|---|---|---|
| Frontend | Next.js 15+ (App Router), TypeScript | — |
| Estilo | Tailwind CSS | — |
| CMS | Sanity v3 (Studio embutido em `/studio`) | Free |
| Hosting | Netlify | Free |
| Repositório | GitHub | Free |

---

## Territórios dos agentes

| Pasta / arquivo | Agente responsável | Regra |
|---|---|---|
| `app/` | Frontend | Não tocar (outros agentes) |
| `components/` | Frontend | Não tocar |
| `lib/` | Frontend | Não tocar |
| `sanity/` | Frontend | Schemas Sanity — não tocar |
| `public/` | Frontend | Não tocar |
| `*.config.*` (next, tailwind, ts, eslint) | Frontend | Não tocar |
| `package.json`, `package-lock.json` | Frontend | Não tocar |
| `docs/` | Planner | Arquiteto pode escrever em `docs/decisions/` e `docs/architecture/` |
| `docs/decisions/` | Planner (propõe) + Arquiteto (propõe) | Status sempre `Proposed` — humano homologa |
| `CLAUDE.md` | Planner | Planner propõe; humano homologa alterações |
| `.claude/` | Engenheiro de IA | Não tocar (outros agentes) |

---

## Convenções TypeScript / Next.js

- **TypeScript strict** — `strict: true` no `tsconfig.json`. Sem `any` explícito. `@ts-ignore` só com comentário justificando.
- **Server Components por padrão.** `"use client"` só quando há interatividade ou hooks de browser — declarar o motivo em comentário.
- **Imagens Sanity**: `next/image` + `@sanity/image-url` para imagens vindas do Sanity. Nunca URL crua sem transformação.
- **Dados do Sanity**: sempre via GROQ tipado (queries em `lib/sanity.queries.ts`). Sem acesso direto ao `client` fora da camada `lib/`.
- Sem `console.log` em código de produção.

## Variáveis de ambiente

| Variável | Tipo | Onde usar |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | pública | cliente + servidor |
| `NEXT_PUBLIC_SANITY_DATASET` | pública | cliente + servidor |
| `SANITY_API_TOKEN` | **secreta** | somente servidor (`lib/sanity.server.ts`) |
| `REVALIDATION_SECRET` | **secreta** | somente `app/api/revalidate/route.ts` |

- `.env.local` nunca commitado — está no `.gitignore`.
- `env.example` commitado com chaves mas sem valores reais.

---

## Roteamento do site

| Rota | Conteúdo | Status |
|---|---|---|
| `/` | Home institucional | depende do design (Épico 3) |
| `/artigos` | Listagem de artigos | parcialmente liberado (FE-06) |
| `/artigos/[slug]` | Artigo individual | parcialmente liberado (FE-06) |
| `/studio` | Sanity Studio (auth do Sanity) | liberado |

---

## Revalidação de conteúdo (ADR 0002)

Estratégia: **Webhook + on-demand revalidation**.

1. Editor publica no Sanity Studio → Sanity dispara `POST /api/revalidate`
2. Endpoint valida `Authorization: Bearer <REVALIDATION_SECRET>`
3. Chama `revalidatePath` para a rota afetada
4. Fallback: `export const revalidate = 300` nas rotas de conteúdo (5 min)

---

## Sanity — schemas

| Schema | Finalidade | Singleton? |
|---|---|---|
| `post` | Artigos do blog | não |
| `teamMember` | Profissionais da clínica | não |
| `institutionalSection` | Seções institucionais editáveis (hero, sobre, etc.) | não |
| `siteSettings` | Contatos, logo, redes sociais, horário | **sim** |

Papéis de acesso no Sanity: `Editor` (médicos e marketing) · `Administrator` (dev).

---

## Git e branches

- `main` → produção (deploy automático no Netlify)
- `develop` → integração
- `feature/<TASK-ID>-<slug>` a partir de `develop`
- 1 commit atômico por task
- Conventional commits: `feat:`, `fix:`, `chore:`, `docs:`
- Exemplo: `feat(FE-01): inicializa projeto Next.js com TypeScript e Tailwind`

---

## Testes

MVP sem testes automatizados. QA é manual.
Reavaliar após estabilização do design (pós-Épico 3, quando o protótipo da agência chegar).

---

## LGPD

MVP sem coleta de dado de paciente. Sem formulário de agendamento nem campo de saúde.
Se o escopo mudar → reabre análise de conformidade antes de implementar.

---

## Definição de pronto

`docs/runbooks/PRE-MERGE-CHECKLIST.md`

---

## Documentação canônica

| Tipo | Destino |
|---|---|
| Decisão arquitetural | `docs/decisions/<NNNN>-<slug>.md` (ADR, status `Proposed`) |
| Conceito técnico / aprendizado | `docs/aprendizado/` |
| Regra operacional | `CLAUDE.md` (este arquivo) |
| Estado do projeto | `docs/STATE.md` |
| Especificação técnica detalhada | `docs/architecture/especificacao-tecnica.md` |
