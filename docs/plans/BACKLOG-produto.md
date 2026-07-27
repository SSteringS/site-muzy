# BACKLOG — Produto (Site Clínica Muzy)

_Última atualização: 2026-07-26_

Épicos ordenados por dependência. Status: **liberado** (pode começar) | **bloqueado** (aguarda externo).
Fonte: `docs/site-muzy-project-brief.md` §9.

---

## Épico 1 — Setup de infraestrutura — LIBERADO

Objetivo: repositório, Next.js, Sanity, Netlify e webhook operacionais.

| Task | Título | Sprint | Status |
|---|---|---|---|
| FE-01 | Criar repositório e inicializar projeto Next.js | 01 | planejamento |
| FE-02 | Configurar Sanity — projeto, dataset e schemas | 01 | planejamento |
| FE-03 | Integrar Next.js com Sanity (GROQ client + queries) | 01 | planejamento |
| FE-04 | Implementar webhook de revalidação on-demand | 01 | planejamento |

---

## Épico 2 — Modelagem e povoamento de conteúdo — LIBERADO

Objetivo: schemas validados e conteúdo real no dataset.

| Task | Título | Sprint | Status |
|---|---|---|---|
| FE-02 | (schemas — compartilhado com Épico 1) | 01 | planejamento |
| FE-05 | Popular siteSettings com conteúdo real | 01 | planejamento |

Critério de aceite do épico: Editor consegue criar artigo de teste e ver conteúdo estruturado no dataset.

---

## Épico 3 — Componentes de UI institucionais — BLOQUEADO

**Bloqueio:** protótipo de design não chegou da Agência Muzy.

Escopo (quando desbloqueado):
- Layout base, header/nav, footer
- Hero section
- Página "sobre a clínica" / "sobre o médico"

Critério de aceite: páginas batem visualmente com o protótipo fornecido.

---

## Épico 4 — Blog (/artigos) — PARCIALMENTE LIBERADO

Estrutura e lógica de dados podem ser construídas sem design final.
Estilo final depende do Épico 3.

| Task | Título | Sprint | Status |
|---|---|---|---|
| FE-06 | /artigos — listagem e detalhe (sem estilo final) | 01 | planejamento |
| FE-?? | /artigos com design final aplicado | Sprint 02 | backlog |

---

## Épico 5 — Gestão de profissionais — PARCIALMENTE LIBERADO

Lógica (schema + query): liberada.
Estilo da página de listagem: bloqueado (aguarda Épico 3).

| Task | Título | Sprint | Status |
|---|---|---|---|
| FE-?? | Página /profissionais — listagem com dados | Sprint 02 | backlog |

---

## Épico 6 — Deploy e corte de DNS — BLOQUEADO

**Bloqueio:** confirmação do dono/registrador do domínio `clinicamuzy.com.br`.

Escopo (quando desbloqueado):
- Apontar domínio para Netlify
- Certificado HTTPS via Netlify
- Manter site antigo no ar até o corte ser validado

---

## Épico 7 — Onboarding dos editores — BLOQUEADO

**Bloqueio:** depende de Épicos 1 e 2 completos.

Escopo:
- Treinar médicos e equipe de marketing no Sanity Studio
- Documentar: como publicar artigo, trocar foto, editar contato

---

## Épico 8 — QA e lançamento — BLOQUEADO

**Bloqueio:** depende de todos os épicos anteriores.

Escopo:
- Testar fluxo ponta a ponta com usuário não técnico real
- Verificação mobile em dispositivo real
- Checklist pré-lançamento

---

## Tasks sem épico definido (candidatas a futuras sprints)

| Candidata | Descrição | Prioridade |
|---|---|---|
| SEO avançado | `og:image` dinâmica por artigo, sitemap.xml, robots.txt | média |
| Analytics | Google Analytics ou Plausible (custo zero) | baixa |
| Formulário de contato | Se cliente solicitar — reabre análise LGPD | baixa / condicional |
| Página 404 customizada | UX mínima para rotas inexistentes | baixa |
| Favicon e meta tags globais | Identidade visual básica | alta (junto com Épico 3) |
