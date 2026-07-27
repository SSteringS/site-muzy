---
task_id: FE-06
title: "Implementar /artigos — listagem e detalhe"
sprint: "01-setup-e-cms"
status: planejamento
tipo: feature
agente: frontend
origin: backlog
fluxos_qa:
  - "visitante acessa /artigos e vê lista de artigos publicados com título, data e link"
  - "visitante clica em um artigo e vê o conteúdo completo com título, data, autor e corpo do texto"
---

## Contexto

Implementar a estrutura de rotas do blog (`/artigos` e `/artigos/[slug]`) consumindo dados reais
do Sanity. O design final não chegou ainda — as páginas ficam sem estilo (apenas HTML semântico
e Tailwind utilitário mínimo). O objetivo desta task é provar que a stack funciona de ponta a
ponta: Sanity → GROQ → Next.js → Netlify → visitante.

O estilo final será aplicado na Sprint 02, quando o protótipo da agência chegar.

## Critérios de aceite

- [ ] CA-01: `app/artigos/page.tsx` — renderiza lista de todos os posts publicados ordenados por `publishedAt` desc. Cada item mostra: título, data formatada (ex: "15 de julho de 2026"), nome do autor.
- [ ] CA-02: Cada item da lista é um link para `/artigos/[slug]`.
- [ ] CA-03: `app/artigos/[slug]/page.tsx` — renderiza o artigo completo: título, data, autor, corpo do texto via `PortableText`.
- [ ] CA-04: `generateStaticParams()` implementado em `/artigos/[slug]/page.tsx` para geração estática dos slugs conhecidos.
- [ ] CA-05: `generateMetadata()` implementado em ambas as rotas — título e descrição básicos (suficientes para não ter `<title>undefined</title>` no HTML).
- [ ] CA-06: `export const revalidate = 300` declarado em ambas as rotas (fallback do webhook de FE-04).
- [ ] CA-07: Acessar `/artigos` no Netlify (não só localhost) mostra a lista corretamente.
- [ ] CA-08: Acessar `/artigos/[slug-do-artigo-de-teste]` no Netlify mostra o artigo de teste criado em FE-02.
- [ ] CA-09: Nenhum erro de TypeScript novo. Sem `any`. Tipos gerados ou declarados para `Post` e `PostDetail`.
- [ ] CA-10: Em viewport 375px (mobile), as páginas são legíveis (sem overflow horizontal).

## Escopo — o que está DENTRO

- `app/artigos/page.tsx` — listagem
- `app/artigos/[slug]/page.tsx` — detalhe
- Componente `PortableText` para renderizar body do artigo (usar `@portabletext/react`)
- `generateStaticParams`, `generateMetadata` em ambas as rotas
- Tipos TypeScript `Post` e `PostDetail`
- Estilo mínimo com Tailwind (tipografia legível, sem layout elaborado)

## Fora de escopo

- Design visual final (Sprint 02)
- Imagem de capa do artigo renderizada (pode ter o campo mas não precisa de estilo/layout definido)
- Paginação da listagem (backlog — quando o volume de artigos justificar)
- Tags / categorias de artigos (não está nos schemas atuais)
- Busca de artigos (fora do escopo do MVP)

## Dependências

| Dependência | Tipo | Status |
|---|---|---|
| FE-03 (GROQ client + query `getAllPosts` e `getPostBySlug`) | task anterior | planejamento |
| FE-02 (schemas + artigo de teste criado) | task anterior | planejamento |
| `@portabletext/react` instalado | pacote npm | instalar nesta task |

## Riscos

| Risco | Mitigação |
|---|---|
| `generateStaticParams` retorna array vazio se não há posts no Sanity | Garantir que o artigo de teste de FE-02 existe antes de validar CA-07 e CA-08 |
| `PortableText` renderiza HTML custom sem sanitização | O conteúdo vem de editores autenticados (sem input de visitante) — risco baixo; sem necessidade de sanitização adicional neste estágio |
| Slug com caracteres especiais quebra rota | Configurar o campo `slug` no schema Sanity para aceitar apenas caracteres URL-safe (validação no schema de FE-02) |

## Branch

`feature/FE-06-artigos-listagem-detalhe` a partir de `develop`

## Coordenação

Esta é a última task da Sprint 01.
Ao concluir, a sprint está pronta para fechamento. Notificar Planner para:
1. Atualizar STATE.md (todas as tasks → concluído)
2. Avaliar abertura da Sprint 02 (aguarda protótipo da agência)

## Definição de pronto

`docs/runbooks/PRE-MERGE-CHECKLIST.md`
