# Especificação Técnica — Site Clínica Muzy

_Última atualização: 2026-07-26_
_Derivada de: `docs/site-muzy-project-brief.md` + ADRs 0001 e 0002_

---

## Visão geral

```
[Sanity Studio /studio]  ← médicos e equipe de marketing editam aqui
        |
        | GROQ API
        v
[Next.js (App Router)]  ←→  [/api/revalidate]  ← webhook do Sanity
        |
        | deploy via Git
        v
[Netlify CDN]  →  visitante
```

---

## Stack e versões-alvo

| Pacote | Versão mínima | Notas |
|---|---|---|
| Node.js | 20 LTS | Netlify suporta 20 LTS |
| Next.js | 15.x | App Router obrigatório |
| TypeScript | 5.x | `strict: true` |
| Tailwind CSS | 3.x | Sem PostCSS extra além do padrão |
| `next-sanity` | 9.x | Inclui Sanity Studio embutido |
| `@sanity/client` | 6.x | Incluído via `next-sanity` |
| `@sanity/image-url` | 1.x | Transformação de imagens |

---

## Estrutura de pastas (Next.js)

```
/                           ← raiz do repositório
├── app/
│   ├── layout.tsx          ← layout global (fonte, metadata base)
│   ├── page.tsx            ← home (/)
│   ├── artigos/
│   │   ├── page.tsx        ← listagem (/artigos)
│   │   └── [slug]/
│   │       └── page.tsx    ← artigo individual (/artigos/[slug])
│   ├── studio/
│   │   └── [[...tool]]/
│   │       └── page.tsx    ← Sanity Studio embutido (/studio)
│   └── api/
│       └── revalidate/
│           └── route.ts    ← webhook endpoint
├── components/             ← componentes React reutilizáveis
├── lib/
│   ├── sanity.client.ts    ← configuração do cliente Sanity
│   ├── sanity.queries.ts   ← queries GROQ tipadas
│   └── sanity.image.ts     ← helper urlFor() para imagens
├── sanity/
│   ├── schemaTypes/        ← schemas de conteúdo
│   │   ├── post.ts
│   │   ├── teamMember.ts
│   │   ├── institutionalSection.ts
│   │   └── siteSettings.ts
│   └── sanity.config.ts    ← configuração do Studio
├── public/                 ← assets estáticos
├── env.example             ← variáveis de ambiente (sem valores)
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## Schemas Sanity

### `post` (Artigo)

| Campo | Tipo Sanity | Obrigatório | Notas |
|---|---|---|---|
| `title` | string | sim | — |
| `slug` | slug | sim | gerado automaticamente de `title` |
| `author` | reference → `teamMember` | não | — |
| `coverImage` | image | não | com `hotspot: true` |
| `body` | array (block) | não | rich text (PortableText) |
| `publishedAt` | datetime | sim | — |

### `teamMember` (Profissional)

| Campo | Tipo Sanity | Obrigatório | Notas |
|---|---|---|---|
| `name` | string | sim | — |
| `photo` | image | não | com `hotspot: true` |
| `role` | string | não | cargo / especialidade |
| `shortBio` | text | não | máx. 300 caracteres |
| `order` | number | não | para ordenação na listagem |

> Nota: schema nomeado `teamMember` (não `doctor`) para cobrir médicos e outros profissionais.

### `institutionalSection` (Seção institucional)

| Campo | Tipo Sanity | Obrigatório | Notas |
|---|---|---|---|
| `key` | string | sim | identificador único: "hero", "sobre-clinica", etc. |
| `heading` | string | não | título da seção |
| `body` | text | não | texto da seção |
| `backgroundImage` | image | não | imagem de fundo/destaque |

### `siteSettings` (singleton)

| Campo | Tipo Sanity | Obrigatório | Notas |
|---|---|---|---|
| `logo` | image | não | — |
| `phone` | string | não | "(11) 3619-3044" |
| `whatsapp` | string | não | número com DDD |
| `email` | string | não | "contato@clinicamuzy.com.br" |
| `address` | text | não | endereço completo |
| `cnpj` | string | não | — |
| `businessHours` | text | não | horários de funcionamento |
| `instagramUrl` | url | não | — |
| `facebookUrl` | url | não | — |

Conteúdo inicial disponível em: `docs/site-muzy-project-brief.md` §6.

---

## Queries GROQ — referência

```groq
// Todos os posts publicados (listagem)
*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id, title, slug, publishedAt,
  "author": author->{ name, "photo": photo.asset->url }
}

// Post por slug (detalhe)
*[_type == "post" && slug.current == $slug][0] {
  _id, title, publishedAt, body,
  "author": author->{ name, role, "photo": photo.asset->url },
  "coverImage": coverImage.asset->url
}

// siteSettings (singleton)
*[_type == "siteSettings"][0] {
  phone, whatsapp, email, address, cnpj, businessHours,
  instagramUrl, facebookUrl,
  "logoUrl": logo.asset->url
}

// Todos os teamMembers
*[_type == "teamMember"] | order(order asc) {
  _id, name, role, shortBio,
  "photo": photo.asset->url
}
```

---

## Variáveis de ambiente

```bash
# env.example
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=
REVALIDATION_SECRET=
```

---

## Papéis de acesso no Sanity

| Papel | Quem | Permissões |
|---|---|---|
| Administrator | Dev | Tudo: schemas, datasets, configurações |
| Editor | Médicos, equipe de marketing | Criar/editar/publicar conteúdo; sem acesso a schema ou infra |

---

## Decisões técnicas referenciadas

- Stack: [ADR 0001](../decisions/0001-stack-nextjs-sanity-netlify.md)
- Revalidação: [ADR 0002](../decisions/0002-revalidacao-webhook-sanity.md)
