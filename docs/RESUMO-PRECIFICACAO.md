# Resumo do Projeto — Site Clínica Muzy
## Para fins de precificação profissional

_Gerado em 2026-07-27_

---

## O que é o projeto

Reconstrução completa do site institucional da **Clínica Muzy** (Dr. Paulo Muzy, medicina
esportiva, São Paulo). O site anterior era uma página estática hardcoded na AWS, sem painel
administrativo — qualquer alteração exigia um desenvolvedor mexendo no código-fonte.

**Objetivo entregue:** site com CMS headless que permite que médicos e equipe de marketing
publiquem artigos, atualizem profissionais e editem textos institucionais sem depender de
desenvolvedor, com deploy contínuo via Git.

---

## Stack técnica

| Camada | Tecnologia | Complexidade |
|---|---|---|
| Frontend | Next.js 16 (App Router), TypeScript strict | Alta |
| Estilo | Tailwind CSS 4 (configuração via CSS — sem tailwind.config.ts) | Média |
| CMS | Sanity v3 (Studio embutido na aplicação) | Alta |
| Banco de dados | Sanity Content Lake (cloud, GROQ API) | Média |
| Hospedagem | Netlify (CI/CD via GitHub) | Baixa |
| Repositório | GitHub público | Baixa |

**Nota sobre o App Router do Next.js 16:** exige domínio de Server Components, Client
Components, route groups, layouts aninhados, generateStaticParams, generateMetadata e
revalidação incremental — padrão mais complexo que o Pages Router anterior.

---

## O que foi entregue (entregas completas até 2026-07-27)

### Infraestrutura e setup (Sprint 01)

| Entregável | Detalhe |
|---|---|
| Repositório e projeto Next.js | TypeScript strict, Tailwind 4, App Router, estrutura de pastas |
| Projeto Sanity | Dataset production, papéis de acesso (Editor / Administrator), Studio embutido em `/studio` |
| 4 schemas de conteúdo | `post` (artigos), `teamMember` (profissionais), `institutionalSection` (seções editáveis), `siteSettings` (singleton com todos os dados da clínica) |
| Camada de dados | 3 clientes Sanity (público, autenticado, CDN de imagens), 5+ queries GROQ tipadas |
| Webhook de revalidação | Endpoint seguro `/api/revalidate` com autenticação Bearer, integrado ao Sanity — conteúdo publicado aparece no site em < 30 segundos |
| CI/CD | Push em `main` → deploy automático no Netlify |
| Conteúdo real | `siteSettings` populado com telefone, e-mail, endereço, CNPJ, horário real da clínica |

### Design system e páginas (Sprint 02)

| Entregável | Detalhe |
|---|---|
| Design system | Tokens de cor (navy + neutros quentes) e tipografia (Inter) via Tailwind 4 `@theme` |
| Layout global | Route group `(site)`, Header responsivo (desktop + mobile hamburguer), Footer |
| Home `/` | Hero, seção institucional do CMS, CTAs |
| Blog `/artigos` | Listagem com grid responsivo, cards estilizados, estado vazio |
| Artigo `/artigos/[slug]` | Geração estática, metadata dinâmica, tipografia PortableText sem plugin externo |
| Profissionais `/profissionais` | Listagem com foto/avatar, cargo, bio — dados do Sanity |
| Sanity Studio | Funcional em produção (`/studio`), acesso protegido por autenticação Sanity |

### Refinamento visual em andamento (Sprint 03 — não concluída)

| Task | Status |
|---|---|
| Cards de contato na home (Atendimento, Horário, Localização) + seção "Sobre" dark | em execução |
| Footer multi-coluna com todos os dados da clínica | planejado |

---

## Estimativas de tempo por fase

### Sprint 01 — Setup e CMS

| Task | Responsável | Tempo estimado |
|---|---|---|
| FE-01: Criar repo + inicializar Next.js | Humano | ~1h |
| FE-02: Configurar Sanity — schemas, Studio, singleton | Agente frontend | ~2–3h |
| FE-03: Camada de dados GROQ + clientes Sanity | Agente frontend | ~2h |
| FE-04: Webhook de revalidação on-demand | Agente frontend | ~1–2h |
| FE-05: Popular siteSettings com dados reais | Humano | ~30min |
| FE-06: /artigos — listagem e detalhe | Agente frontend | ~1–2h |
| FE-07: Fix basePath do Sanity Studio (emergencial) | Agente frontend | ~30min |
| **Total Sprint 01** | | **~8–11h de desenvolvimento** |

### Sprint 02 — Design System e UI

| Task | Responsável | Tempo real (status report) |
|---|---|---|
| FE-08: Design system, layout, Header, Footer | Agente frontend | **2h** |
| FE-09: /artigos com design real | Agente frontend | **1h** |
| FE-10: /profissionais | Agente frontend | **30min** |
| FE-11: Home (/) | Agente frontend | **45min** |
| **Total Sprint 02** | | **~4h15min de desenvolvimento** |

### Sprint 03 — Refinamento Visual (em andamento)

| Task | Responsável | Tempo estimado |
|---|---|---|
| FE-12: Cards de contato + seção "Sobre" dark | Agente frontend | 2–3h |
| FE-13: Footer multi-coluna | Agente frontend | 1–2h |
| **Total Sprint 03 (estimado)** | | **~3–5h de desenvolvimento** |

### Total acumulado estimado
**~15–20h de desenvolvimento técnico** para o que foi entregue até agora + Sprint 03.

---

## Complexidade técnica — fatores relevantes para precificação

**Alta complexidade:**
- Next.js App Router com route groups, layouts aninhados, Server/Client Component boundary
- Sanity CMS com schema customizado, singleton, Studio embutido na aplicação
- Webhook de revalidação incremental (ISR + on-demand) — integração Sanity → Netlify com autenticação
- TypeScript strict em todo o projeto (sem `any`, tipos explícitos para todas as queries GROQ)
- Tailwind CSS 4 (versão mais recente, comportamentos diferentes do v3 — zero documentação de projeto anterior para referir)

**Média complexidade:**
- PortableText com renderers customizados (sem plugin de tipografia)
- Geração estática com `generateStaticParams` + revalidação incremental
- CI/CD Netlify com configuração de variáveis de ambiente seguras

**Decisões arquiteturais documentadas:**
- 2 ADRs formais (stack, revalidação)
- `estado-atual-dev.md` e `estado-atual-prod.md` como fontes de verdade
- Planos de task, status reports e retrospectivas por sprint

---

## O que ainda não foi feito (escopo restante para MVP completo)

| Item | Bloqueia | Estimativa |
|---|---|---|
| Design final alinhado ao protótipo da agência | Aguarda agência | 8–16h |
| Página `/sobre` dedicada com layout completo | Aguarda design | 3–5h |
| Logo real como imagem (hoje é texto "Muzy") | Aguarda arquivo da agência | 1h |
| Links de redes sociais (Instagram, Facebook) | Handles a confirmar | 1h |
| Página 404 customizada | — | 1–2h |
| OG image / social cards para SEO | Aguarda assets | 2–4h |
| Corte de DNS (`clinicamuzy.com.br` → Netlify) | Aguarda confirmação do dono do domínio | 1h |
| Onboarding dos editores (treinamento no Studio) | Aguarda sprint anterior | 2–4h presenciais |
| QA com usuário não-técnico real | Aguarda sprint anterior | 2–4h |

**Estimativa restante para MVP completo:** ~20–40h adicionais (a maior parte dependente do protótipo da agência).

---

## Contexto comercial

- Fase atual: favor informal, sem contrato nem prazo
- Hospedagem: R$0/mês (Netlify free + Sanity free)
- Domínio: a confirmar (aguarda cliente)
- Se virar contrato: hospedagem permanece R$0 enquanto dentro dos limites free tier
- Repositório: público no GitHub (sem dados sensíveis de paciente — LGPD simplificada)

---

## Contexto pessoal do desenvolvedor

Desenvolvedor com perfil backend/Java, utilizou o projeto também como aprendizado prático
de Next.js e Sanity. O tempo real de desenvolvimento inclui curva de aprendizado com as
tecnologias, o que reduz o tempo estimado em projetos futuros similares.
