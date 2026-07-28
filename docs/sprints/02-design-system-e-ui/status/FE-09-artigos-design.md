---
task_id: FE-09
title: "/artigos com design real — listagem e detalhe estilizados"
sprint: "02-design-system-e-ui"
estado: concluido
data_conclusao: 2026-07-27
branch: feature/FE-09-artigos-design
pr_url: ~
agente: frontend
tempo_real: "1h"
gates:
  typescript: ok
  lint: ok
  build: ok
  mobile: pendente
  status_report: ok
---

## Resumo do que foi implementado

Design real aplicado às páginas `/artigos` e `/artigos/[slug]`.
Criados dois novos componentes em `components/artigos/`:
- `ArticleCard` — card com borda, sombra, título linkado e metadados
- `ArticleBody` — tipografia PortableText manual (sem `@tailwindcss/typography`)

Hero navy (`bg-brand-900`) com técnica `-mx-4 -mt-10` para romper o padding do container
`(site)/layout.tsx` e ocupar a largura total do container de 1200px.

## Arquivos criados/modificados

| Arquivo | Tipo de mudança |
|---|---|
| `components/artigos/ArticleCard.tsx` | criado — card de artigo |
| `components/artigos/ArticleBody.tsx` | criado — PortableText com tipografia |
| `app/(site)/artigos/page.tsx` | refatorado — hero + grid responsivo |
| `app/(site)/artigos/[slug]/page.tsx` | refatorado — hero + ArticleBody |

## Decisões técnicas

**Tipografia manual em vez de `@tailwindcss/typography`:**
O plugin não está instalado. Implementados custom components para PortableText cobrindo
`normal`, `h2`, `h3`, `blockquote`, `ul`, `ol`, `strong`, `em`, `link`. Os renderers
são tipados via `PortableTextComponents` do `@portabletext/react`. Nenhum `any` explícito.

**Hero com negative margins:**
O container em `(site)/layout.tsx` tem `px-4 py-10`. Usando `-mx-4 -mt-10` nas páginas,
o hero rompe esse padding e ocupa a largura total do container (1200px max). Técnica
padrão para full-width sections sem reestruturar o layout. Desvio benéfico — não listado
no plano mas necessário para o CA-01 funcionar dentro da estrutura de layout existente.

**`opacity-80` em vez de `/80` modifier:**
Para evitar dependência de `color-mix()` no opacity modifier do Tailwind v4 (comportamento
verificado como inconsistente na task FE-08), os textos de opacidade reduzida no hero usam
a classe `opacity-80` do Tailwind em vez da sintaxe de modificador `/80`.

## Critérios de aceite — auto-avaliação

| CA | Status | Observação |
|---|---|---|
| CA-01: hero navy em /artigos | ✅ | `-mx-4 -mt-10 bg-brand-900` |
| CA-02: grid 1/2/3 colunas | ✅ | `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` |
| CA-03: ArticleCard com título, data, autor | ✅ | Card com border, shadow, link |
| CA-04: estado vazio | ✅ | Mensagem "Nenhum artigo publicado ainda." |
| CA-05: hero navy em /artigos/[slug] | ✅ | Mesmo padrão de negative margins |
| CA-06: tipografia legível | ✅ | ArticleBody com renderers por bloco |
| CA-07: link "← Voltar para artigos" | ✅ | No hero do detalhe |
| CA-08: mobile 375px sem overflow | pendente | Requer validação manual |
| CA-09: generateMetadata funcionando | ✅ | Build gerou os slugs dos artigos de teste |
| CA-10: sem TypeScript novo / sem `any` | ✅ | `npx tsc --noEmit` limpo |

## Seção 7 — Avaliação QA

**Status:** pendente — requer `npm run dev` e validação visual (mobile + desktop).

**Fluxos a executar:**

| Fluxo | Resultado | Observação |
|---|---|---|
| Visitante vê /artigos com hero navy e grid de cards | pendente | CA-01/CA-02/CA-03 |
| Mobile 375px — cards em coluna única, sem overflow | pendente | CA-02/CA-08 |
| Visitante clica em artigo e vê hero com título + tipografia | pendente | CA-05/CA-06/CA-07 |
| /artigos sem artigos → mensagem de estado vazio | pendente | CA-04 |
