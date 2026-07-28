---
ultimo_review: 2026-07-27
tasks_incluidas: [FE-01, FE-02, FE-03, FE-04, FE-06, FE-07, FE-08, FE-09, FE-10, FE-11]
---

# Estado atual — branch develop

O que efetivamente existe em `develop` agora. Difere da `especificacao-tecnica.md` em versões e detalhes de implementação — este arquivo é a fonte de verdade do que está rodando.

---

## Infraestrutura

| Item | Estado | Detalhe |
|---|---|---|
| Repositório GitHub | ✅ ativo | https://github.com/SSteringS/site-muzy |
| Deploy Netlify | ✅ ativo | https://sss-site-muzy.netlify.app |
| CI/CD | ✅ configurado | push em `main` → deploy automático; `netlify.toml` no repo |
| Sanity Project | ✅ criado | Project ID: `z38d0iih`, dataset: `production` |
| Sanity Studio | ✅ embutido | `/studio` no Next.js (layout.tsx + page.tsx) |

---

## Stack real instalada

| Camada | Versão planejada (spec) | Versão real (instalada) | Impacto |
|---|---|---|---|
| Next.js | 15.x | **16.x** (create-next-app@16.2.12) | Nenhum — API compatível |
| TypeScript | 5.x | 5.x | OK |
| Tailwind CSS | 3.x | **4.x** | ⚠️ Ver nota abaixo |
| next-sanity | 9.x | **13.x** | API compatível, imports podem diferir |
| @sanity/image-url | 1.x | **2.x** | API compatível |
| Node.js (ambiente dev) | 20 LTS | 20.15.0 | ⚠️ next-sanity@13 pede ≥20.19.0 — warnings, funciona |

### ⚠️ Tailwind CSS 4 — mudança comportamental importante

Tailwind 4 **não usa `tailwind.config.ts`**. A configuração é feita via CSS:

```css
/* app/globals.css */
@import "tailwindcss";
/* customizações via @theme, @layer, etc. */
```

Impacto nas tasks futuras:
- Não criar `tailwind.config.ts` — não existe na v4.
- Customizações de tema (cores, fontes, breakpoints) vão em `globals.css` via `@theme`.
- Extensões de classes customizadas: usar `@layer components` ou `@layer utilities` no CSS.

---

## Schemas Sanity implementados

| Schema | Singleton? | Arquivo | Status |
|---|---|---|---|
| `post` | não | `sanity/schemaTypes/post.ts` | ✅ |
| `teamMember` | não | `sanity/schemaTypes/teamMember.ts` | ✅ |
| `institutionalSection` | não | `sanity/schemaTypes/institutionalSection.ts` | ✅ |
| `siteSettings` | **sim** | `sanity/schemaTypes/siteSettings.ts` | ✅ |

Singleton implementado via `structureTool` customizado + `document.newDocumentOptions` + `document.actions` — padrão oficial Sanity v3.

---

## Arquivos relevantes criados

```
app/
├── layout.tsx              ← layout raiz (Inter font, minimal — sem Header/Footer)
├── globals.css             ← Tailwind 4 via @import + @theme com design tokens
├── favicon.ico
├── (site)/                 ← route group — rotas públicas com Header/Footer
│   ├── layout.tsx          ← busca siteSettings → <Header> + <main> + <Footer>
│   ├── page.tsx            ← home real — hero + seções institucionais + CTA (FE-11)
│   ├── artigos/
│   │   ├── page.tsx        ← listagem com hero navy + grid de ArticleCards (FE-09)
│   │   └── [slug]/
│   │       └── page.tsx    ← artigo com hero + ArticleBody tipografado (FE-09)
│   └── profissionais/
│       └── page.tsx        ← listagem de TeamMemberCards do Sanity (FE-10)
└── studio/
    └── [[...tool]]/
        ├── layout.tsx      ← metadata + robots:noindex (Server Component)
        └── page.tsx        ← Studio loader ("use client") — sem Header/Footer
components/
├── layout/
│   ├── Header.tsx          ← Server Component — nav desktop + logo "Muzy"
│   ├── MobileMenuToggle.tsx← Client Component ("use client") — toggle hamburguer
│   ├── Footer.tsx          ← Server Component — dados de contato do Sanity
│   └── nav-links.ts        ← links de navegação compartilhados
├── artigos/
│   ├── ArticleCard.tsx     ← card de artigo (título, data, autor, link)
│   └── ArticleBody.tsx     ← PortableText com renderers tipados (sem @tailwindcss/typography)
├── profissionais/
│   └── TeamMemberCard.tsx  ← card de profissional (foto/avatar, nome, cargo, bio)
└── home/
    ├── HeroSection.tsx     ← hero navy com heading, body e CTA
    ├── InstitutionalSection.tsx ← seção warm-100 com heading e body
    └── CTASection.tsx      ← grid de 2 cards linkando /artigos e /profissionais
sanity/
├── sanity.config.ts        ← estrutura + singleton config + basePath: '/studio'
└── schemaTypes/
    ├── index.ts
    ├── post.ts
    ├── teamMember.ts
    ├── institutionalSection.ts
    └── siteSettings.ts
next.config.ts              ← remotePatterns cdn.sanity.io adicionado
env.example                 ← 4 chaves documentadas
netlify.toml                ← build config
```

### ⚠️ Route group `(site)` — decisão arquitetural FE-08

O root `app/layout.tsx` do Next.js aplica-se a **todas** as rotas, incluindo `/studio`.
Para evitar que o Studio exibisse Header/Footer, foi criado o route group `app/(site)/`.

- Rotas dentro de `(site)/`: herdam `app/(site)/layout.tsx` → têm Header e Footer
- Rotas fora de `(site)/` (Studio): usam apenas `app/layout.tsx` (minimal) + layout próprio
- URLs **não mudam** — route groups não afetam a URL (`(site)` é invisível na rota)

### Design system — tokens (FE-08)

Paleta derivada de pesquisa de brand, aprovada pelo humano em 2026-07-27:

```css
/* app/globals.css */
@theme {
  --color-brand-900:    #1A2B3C;  /* navy — cor primária */
  --color-brand-700:    #243B55;  /* hover */
  --color-brand-50:     #F0F4F8;  /* fundo azulado sutil */
  --color-surface:      #FFFFFF;
  --color-background:   #FAFAF8;  /* off-white quente */
  --color-warm-100:     #F5F0EB;
  --color-border:       #E4E0DC;
  --color-text-primary: #1A2B3C;
  --color-text-muted:   #6B7280;
  --font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
}
```

Uso nos componentes (Tailwind 4 — sem tailwind.config.ts):
`bg-[--color-background]`, `text-[--color-text-primary]`, `border-[--color-border]`, etc.

---

## Camada de dados (FE-03)

```
lib/
├── sanity.client.ts    ← cliente público (useCdn em prod, fresh em dev)
├── sanity.server.ts    ← cliente autenticado (SANITY_API_TOKEN, server-only por convenção)
├── sanity.image.ts     ← urlFor() via @sanity/image-url v2
└── sanity.queries.ts   ← 4 queries GROQ tipadas: getAllPosts, getPostBySlug,
                           getSiteSettings, getAllTeamMembers
app/
└── artigos/
    └── page.tsx        ← Server Component, lista artigos reais, revalidate=300
```

**Nota:** `server-only` (pacote npm) não instalado — proteção do `sanity.server.ts` é por convenção + ausência de prefixo `NEXT_PUBLIC_` no token.

---

## Rotas disponíveis em develop

| Rota | Status | Notas |
|---|---|---|
| `/` | ✅ | Home com hero navy, seção "Sobre", CTAs para /artigos e /profissionais |
| `/artigos` | ✅ | Hero navy + grid de cards (1/2/3 colunas) + estado vazio |
| `/artigos/[slug]` | ✅ | Hero com título + ArticleBody tipografado com PortableText |
| `/profissionais` | ✅ | Hero navy + grid de TeamMemberCards + estado vazio |
| `/studio` | ✅ | Sanity Studio — sem Header/Footer |
| `/api/revalidate` | ✅ | Webhook endpoint |

## O que ainda NÃO existe em develop

| O que falta | Observação |
|---|---|
| Conteúdo real em `institutionalSection` (hero, sobre-clinica) | Humano deve popular no Sanity Studio |
| Conteúdo real em `teamMember` | Humano deve popular no Sanity Studio |
| QA visual mobile (375px) confirmado | Pendente em FE-09, FE-10, FE-11 |

---

## Notas técnicas de implementação (Sprint 02)

**Hero com negative margins (FE-09/FE-10/FE-11):**
O container em `app/(site)/layout.tsx` tem padding (`px-4 py-10`). As páginas usam
`-mx-4 -mt-10` no hero para romper esse padding e ocupar a largura total do container (1200px).
Padrão adotado em todas as páginas da Sprint 02.

**PortableText sem `@tailwindcss/typography` (FE-09):**
Plugin não instalado. `ArticleBody.tsx` implementa renderers manuais tipados via
`PortableTextComponents` para: `normal`, `h2`, `h3`, `blockquote`, `ul`, `ol`,
`strong`, `em`, `link`. Sem `any` explícito.

**`photo` como string em `teamMember` (FE-10):**
A query `getAllTeamMembers` resolve `"photo": photo.asset->url` — retorna string, não
`SanityImageSource`. Logo `urlFor()` não é usado; a URL vai direto ao `next/image`.
Guard: `if (member.photo)` antes de renderizar. Imagem com `fill` em container
`relative h-24 w-24 rounded-full object-cover`.

**`Promise.all` para queries paralelas na home (FE-11):**
`getInstitutionalSection('hero')` e `getInstitutionalSection('sobre-clinica')` são
executadas em paralelo. Tipo nomeado `InstitutionalSectionData` (evita conflito com
componente `InstitutionalSection`). Campo `body` é texto simples com `whitespace-pre-line`.

**`opacity-80` em vez de modificador `/80` (FE-09):**
Sintaxe `bg-brand-900/80` tem comportamento inconsistente no Tailwind v4 com CSS custom
properties. Usar `opacity-80` como classe separada é mais seguro.

---

## Pendências técnicas abertas

| Pendência | Severidade | Ação |
|---|---|---|
| Node.js 20.15.0 (pede ≥20.19.0) | baixa — warnings apenas | Atualizar Node.js no ambiente dev e configurar no Netlify (`NODE_VERSION=20.19`) — backlog Sprint 03 |
| `server-only` não instalado em `lib/sanity.server.ts` | baixa — convenção apenas | Instalar pacote — backlog Sprint 03 |
