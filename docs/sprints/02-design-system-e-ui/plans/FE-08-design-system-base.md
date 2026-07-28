---
task_id: FE-08
title: "Design system base — tokens, layout global, Header, Footer"
sprint: "02-design-system-e-ui"
status: planejamento
tipo: feature
agente: frontend
origin: backlog
tempo_estimado: "3-4h"
fluxos_qa:
  - "visitante acessa qualquer rota e vê Header com logo 'Muzy', navegação e visual navy/neutro"
  - "visitante acessa qualquer rota em mobile (375px) e vê menu hamburguer funcional"
  - "visitante acessa qualquer rota e vê Footer com telefone, e-mail, endereço e horário reais"
  - "em viewport 1280px, o conteúdo não ultrapassa 1200px de largura (container centralizado)"
---

## Contexto

Fundação visual da Sprint 02. Esta task estabelece os design tokens, o layout global e os
componentes estruturais (Header e Footer) que todas as outras tasks da sprint vão consumir.

Sem FE-08, as tasks FE-09 a FE-11 não têm base de design para implementar.

A paleta de cores e tipografia foram derivadas de pesquisa de brand (site + Instagram
@clinicamuzy + @paulomuzy) e aprovadas pelo humano em 2026-07-27. Ver
`docs/sprints/02-design-system-e-ui/README.md` para o bloco `@theme` completo.

## Padrão de componente

| Componente | Tipo | Justificativa |
|---|---|---|
| `app/layout.tsx` | Server Component | Layout raiz do App Router — sem interatividade |
| `components/layout/Header.tsx` | Server Component | Markup estático de navegação — sem estado |
| `components/layout/MobileMenuToggle.tsx` | **Client Component** (`"use client"`) | Controla `isOpen` do menu hamburguer — precisa de `useState` |
| `components/layout/Footer.tsx` | Server Component | Dados de contato passados como props — sem interatividade |

**Nota sobre Footer:** `app/layout.tsx` busca `siteSettings` do Sanity e passa como props
para `<Footer>`. O Footer não faz fetch próprio — recebe os dados já resolvidos.

## Critérios de aceite

- [ ] CA-01: `app/globals.css` contém bloco `@theme` com os tokens de cor e tipografia
  aprovados (navy `#1A2B3C`, background `#FAFAF8`, surface `#FFFFFF`, warm-100 `#F5F0EB`,
  text-primary `#1A2B3C`, text-muted `#6B7280`).
- [ ] CA-02: `app/layout.tsx` importa `Inter` via `next/font/google` e aplica `className` no
  elemento `<html>` (ou `<body>`). Sem carregamento de fonte via `<link>` manual.
- [ ] CA-03: `<body>` tem `bg-[--color-background]` e `text-[--color-text-primary]` aplicados.
- [ ] CA-04: `components/layout/Header.tsx` renderiza: logo textual "Muzy" (link para `/`),
  links de navegação (`/`, `/artigos`, `/profissionais`) e um `MobileMenuToggle` para
  viewports < `md`.
- [ ] CA-05: `components/layout/MobileMenuToggle.tsx` tem `"use client"`, controla `isOpen`
  com `useState`, e alterna visibilidade do menu de navegação mobile.
- [ ] CA-06: Em desktop (`md+`), menu de navegação é horizontal e visível. Em mobile (`< md`),
  o menu hamburguer expande/colapsa a navegação.
- [ ] CA-07: `components/layout/Footer.tsx` renderiza: nome da clínica, telefone, e-mail,
  endereço, horário de funcionamento. Dados lidos de `siteSettings` via props.
- [ ] CA-08: `app/layout.tsx` chama `getSiteSettings()` de `lib/sanity.queries.ts` e passa
  resultado como props para `<Footer>`. Nenhum dado de contato está hardcoded.
- [ ] CA-09: Header e Footer aparecem em **todas** as rotas existentes (`/artigos`,
  `/artigos/[slug]`) — exceto `/studio` (Studio não usa o layout global).
- [ ] CA-10: Container de conteúdo centralizado (`max-w-[1200px] mx-auto px-4`) aplicado
  dentro do `<main>` do layout.
- [ ] CA-11: Sem erros de TypeScript. Tipo explícito para as props de `<Footer>` (usar o
  tipo de retorno de `getSiteSettings` ou definir interface local).
- [ ] CA-12: Em viewport 375px, sem overflow horizontal na página.

## Escopo — o que está DENTRO

- `app/globals.css`: bloco `@theme` com design tokens
- `app/layout.tsx`: Inter font, siteSettings fetch, `<Header>` + `<Footer>` incluídos,
  container `<main>`
- `components/layout/Header.tsx`: navegação desktop + mobile
- `components/layout/MobileMenuToggle.tsx`: toggle com estado (Client Component)
- `components/layout/Footer.tsx`: dados de contato da clínica
- Exclusão do Studio do layout global (o Studio usa seu próprio layout em
  `app/studio/[[...tool]]/layout.tsx` — não incluir `<Header>` / `<Footer>` lá)

## Fora de escopo

- Logo como imagem (`siteSettings.logo`) — usar texto "Muzy" por enquanto (imagem real chega
  quando a agência enviar o arquivo)
- Links de redes sociais no Footer (Instagram/Facebook ainda não confirmados)
- Animações de hover, transições de página
- Breadcrumbs
- Qualquer componente que não seja Header ou Footer

## Dependências

| Dependência | Tipo | Status |
|---|---|---|
| Design tokens aprovados (navy + neutros) | decisão humano | ✅ ok |
| `lib/sanity.queries.ts` — query `getSiteSettings` existente | task anterior (FE-03) | ✅ ok |
| `siteSettings` populado no Sanity com dados reais | FE-05 (humano) | ✅ ok — telefone, e-mail, endereço, horário preenchidos |

## Riscos

| Risco | Mitigação |
|---|---|
| `getSiteSettings()` retorna `null` se o documento não existir no Sanity | Footer deve renderizar graciosamente com fallback (ex: `phone ?? 'Não informado'`) |
| Studio em `/studio` herdar Header/Footer do layout raiz | Studio usa layout próprio em `app/studio/[[...tool]]/layout.tsx` — o layout raiz **não** se aplica (Next.js App Router segmenta por pasta). Confirmar que `app/layout.tsx` não quebra o Studio. |
| Tailwind 4 — custom properties CSS com `var(--color-brand-900)` vs sintaxe Tailwind | Em Tailwind 4, variáveis do `@theme` são acessíveis via `bg-[--color-brand-900]` ou diretamente como `bg-brand-900` se mapeadas no @theme. Confirmar a sintaxe correta antes de escrever os componentes. |

## Branch

`feature/FE-08-design-system-base` a partir de `develop`

## Coordenação

- Quando FE-08 for mergeada em `develop`, notificar Planner.
- FE-09, FE-10 e FE-11 dependem desta task — podem ser iniciadas em paralelo após merge.
- Planner atualiza o README da sprint com status.

## Definição de pronto

`docs/runbooks/PRE-MERGE-CHECKLIST.md`
