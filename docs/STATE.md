# STATE — Site Clínica Muzy

_Última atualização: 2026-07-26_

---

## Sprint corrente

_(nenhuma sprint ativa — Sprint 02 fechada em 2026-07-27, aguardando protótipo da agência para Sprint 03)_

---

## Sprint 01 — Setup e CMS — **FECHADA** em 2026-07-27

Objetivo: infraestrutura completamente operacional — repositório, Next.js, Sanity, Netlify, integração GROQ, webhook de revalidação e /artigos funcional com dados reais.

---

## Tasks — Sprint 01

| Task | Título | Status | Agente |
|---|---|---|---|
| FE-01 | Criar repositório e inicializar projeto Next.js | **concluido** | humano |
| FE-02 | Configurar Sanity — projeto, dataset e schemas | **concluido** | frontend |
| FE-03 | Integrar Next.js com Sanity (GROQ client + queries) | **concluido** | frontend |
| FE-04 | Implementar webhook de revalidação on-demand | **concluido** ¹ | frontend |
| FE-05 | Popular siteSettings com conteúdo real | **concluido** | humano |
| FE-06 | Implementar /artigos — listagem e detalhe | **concluido** ¹ | frontend |
| FE-07 | Fix: basePath ausente no sanity.config.ts | **concluido** | frontend |

¹ QA validado em 2026-07-27 — webhook funcionando end-to-end após configuração do header `Authorization` no Sanity.

---

## Bloqueios ativos

| Bloqueio | Impacto | Owner | Desde |
|---|---|---|---|
| Protótipo de design não chegou da agência | Bloqueia Épico 3 (UI com design final) e Épico 5 (estilo da lista de profissionais) | Agência Muzy | 2026-07-26 |
| Dono/registrador do domínio não confirmado | Bloqueia Épico 6 (corte de DNS) | Cliente | 2026-07-26 |
| Handles Instagram/Facebook não confirmados | Campo `siteSettings.socialLinks` parcialmente incompleto | Agência Muzy | 2026-07-26 |

---

## Tasks — Sprint 02

| Task | Título | Status | Agente |
|---|---|---|---|
| FE-08 | Design system base — tokens, layout global, Header, Footer | **concluido** | frontend |
| FE-09 | /artigos com design real — listagem e detalhe estilizados | **concluido** | frontend |
| FE-10 | /profissionais — listagem de teamMembers do Sanity | **concluido** | frontend |
| FE-11 | Home (/) — hero e seções institucionais | **concluido** | frontend |

---

## Sprints futuras (rascunho)

| Sprint | Objetivo | Desbloqueio necessário |
|---|---|---|
| Sprint 03 | Blog completo com design final + refinamento UI | Protótipo da agência |
| Sprint 04 | Deploy e corte de DNS | Confirmação do dono do domínio |
| Sprint 05 | Onboarding dos editores | Sprints 01–03 |

---

## Histórico de sprints

| Sprint | Período | Status |
|---|---|---|
| Sprint 01 — Setup e CMS | 2026-07-26 → 2026-07-27 | ✅ fechada |
| Sprint 02 — Design System e UI | 2026-07-27 → 2026-07-27 | ✅ fechada |
