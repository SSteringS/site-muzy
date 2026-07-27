---
task_id: FE-08
title: "Design system base — tokens, layout global, Header, Footer"
sprint: "02-design-system-e-ui"
estado: concluido
data_conclusao: 2026-07-27
branch: feature/FE-08-design-system-base
pr_url: ~
agente: frontend
tempo_real: "2h"
---

## Resumo do que foi implementado

Fundação visual da Sprint 02 completa.
Design tokens em `@theme` (Tailwind v4), layout global com Inter font, Header navy com
hamburguer responsivo e Footer com dados reais do Sanity. Route group `(site)` criado para
isolar Header/Footer das rotas do Studio — solução necessária pois root layout Next.js
aplica-se a todas as rotas, incluindo `/studio`.

## Arquivos principais criados/modificados

| Arquivo | Tipo de mudança |
|---|---|
| `app/globals.css` | modificado — `@theme` com tokens aprovados, removidas variáveis Geist/dark |
| `app/layout.tsx` | modificado — Inter font, minimal sem Header/Footer |
| `app/(site)/layout.tsx` | criado — route group, Header + container + Footer |
| `app/(site)/page.tsx` | criado — placeholder home (conteúdo em FE-11) |
| `app/(site)/artigos/page.tsx` | movido de `app/artigos/` + design tokens aplicados |
| `app/(site)/artigos/[slug]/page.tsx` | movido de `app/artigos/[slug]/` + design tokens |
| `components/layout/Header.tsx` | criado — Server Component |
| `components/layout/MobileMenuToggle.tsx` | criado — Client Component |
| `components/layout/Footer.tsx` | criado — Server Component |
| `components/layout/nav-links.ts` | criado — links compartilhados |

## Desvios do plano

**Route group `(site)` não mencionado no plano:**
O plano afirmava "o layout raiz não se aplica ao Studio — Next.js App Router segmenta por pasta".
Isso está incorreto: root layout aplica-se a TODAS as rotas. Para isolar Header/Footer do
Studio, foi necessário criar `app/(site)/` como route group. Isso exigiu mover as páginas
existentes, mas não muda nenhuma URL. O Studio continua sem Header/Footer. Desvio benéfico.

**`inter.className` sem `variable` prop:**
O CA-02 pedia Inter com `className` no html/body — implementado em `<body>`. Não foi usado
`variable: '--font-sans'` para evitar conflito com o token `--font-sans` do `@theme`.

## Pontos de atenção para o Reviewer

- Route group `(site)`: confirmar que `/studio` não exibe Header/Footer (main no `npm run dev`).
- `bg-[--color-background]` e `text-[--color-text-primary]`: sintaxe de CSS var arbitrária do
  Tailwind v4 — sem `tailwind.config.ts`, os tokens são acessados assim.
- Footer: renderiza graciosamente se `settings === null` (mensagem de fallback).
- `MobileMenuToggle`: `position: absolute` no menu expandido — confirmar que não gera overflow
  horizontal em mobile (375px).
- `app/(site)/layout.tsx` busca `getSiteSettings()` — uma fetch por request de página, cacheada
  pelo Next.js. Não há double-fetch.

---

## Seção 7 — Avaliação QA

**Status:** pendente — requer `npm run dev` e validação visual (mobile + desktop).

**Fluxos a executar:**

| Fluxo | Resultado | Observação |
|---|---|---|
| Qualquer rota mostra Header navy com logo "Muzy" | pendente | CA-04 |
| Mobile 375px — hamburguer abre/fecha menu | pendente | CA-05/CA-06 |
| Footer mostra dados reais de contato | pendente | CA-07/CA-08 |
| /studio não exibe Header/Footer | pendente | CA-09 |
| Desktop 1280px — conteúdo ≤ 1200px de largura | pendente | CA-10 |
