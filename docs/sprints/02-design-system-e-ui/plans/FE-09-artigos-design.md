---
task_id: FE-09
title: "/artigos com design real — listagem e detalhe estilizados"
sprint: "02-design-system-e-ui"
status: planejamento
tipo: feature
agente: frontend
origin: backlog
tempo_estimado: "2-3h"
fluxos_qa:
  - "visitante acessa /artigos e vê grid de cards com título, data e autor — layout limpo e responsivo"
  - "visitante acessa /artigos em mobile (375px) e vê cards em coluna única, sem overflow"
  - "visitante clica em artigo e vê página de detalhe com tipografia legível, título em destaque, data e autor"
  - "visitante vê /artigos sem artigos publicados e recebe mensagem de estado vazio adequada"
---

## Contexto

As rotas `/artigos` e `/artigos/[slug]` existem desde a Sprint 01 (FE-06) mas com estilo
mínimo (HTML semântico + Tailwind utilitário básico). Esta task aplica o design system
aprovado em FE-08 — cards, tipografia de artigo, layout de página.

O conteúdo (dados do Sanity) já funciona. Esta task não toca lógica de dados — apenas
aplica design às páginas existentes.

## Padrão de componente

| Componente | Tipo | Justificativa |
|---|---|---|
| `app/artigos/page.tsx` | Server Component | Já é Server Component — mantém; sem interatividade |
| `app/artigos/[slug]/page.tsx` | Server Component | Já é Server Component — mantém |
| `components/artigos/ArticleCard.tsx` | Server Component | Recebe dados como props, sem estado |
| `components/artigos/ArticleHeader.tsx` | Server Component | Título + meta do artigo, sem estado |

## Critérios de aceite

- [ ] CA-01: `/artigos` renderiza um hero de página com título "Artigos" e subtítulo opcional,
  usando `bg-[--color-brand-900]` (navy) e texto branco.
- [ ] CA-02: Lista de artigos renderizada como grid responsivo:
  - 1 coluna em mobile (< `md`)
  - 2 colunas em tablet (`md`)
  - 3 colunas em desktop (`lg+`)
- [ ] CA-03: Cada artigo é representado por um componente `ArticleCard` que mostra:
  título (link para `/artigos/[slug]`), data formatada em pt-BR (ex: "15 de julho de 2026"),
  nome do autor (se disponível). Card com `bg-[--color-surface]` e borda sutil.
- [ ] CA-04: Estado vazio (sem artigos publicados): mensagem "Nenhum artigo publicado ainda."
  em vez de grid vazio.
- [ ] CA-05: `/artigos/[slug]` tem hero com título do artigo em destaque sobre fundo navy,
  data e nome do autor abaixo do título.
- [ ] CA-06: Corpo do artigo (PortableText) tem tipografia legível:
  - `prose` do Tailwind Typography OU estilos manuais equivalentes
  - Parágrafos com `leading-relaxed` e tamanho adequado (mínimo 16px / `text-base`)
  - Headings com hierarquia visual clara (`h2`, `h3` maiores e em negrito)
- [ ] CA-07: Link "← Voltar para artigos" no topo da página de detalhe.
- [ ] CA-08: Em viewport 375px, texto do artigo não tem overflow horizontal. Imagens (se
  houver) respeitam largura do container.
- [ ] CA-09: `generateMetadata` continua funcionando — `<title>` correto em ambas as rotas.
- [ ] CA-10: Nenhum erro de TypeScript novo. Nenhum `any` explícito.

## Escopo — o que está DENTRO

- Refatoração visual de `app/artigos/page.tsx`
- Refatoração visual de `app/artigos/[slug]/page.tsx`
- Novo componente `components/artigos/ArticleCard.tsx`
- Tipografia de artigo (PortableText) com estilo adequado
- Estado vazio para lista de artigos
- Hero de página (navy/branco) para ambas as rotas

## Fora de escopo

- Imagem de capa (`coverImage`) em destaque no card ou no topo do detalhe — campo existe no
  schema mas aguarda imagens reais da clínica; não renderizar por ora para evitar `alt` vazio
  ou imagem genérica
- Paginação de artigos
- Tags / categorias
- Tempo de leitura estimado
- Compartilhamento social
- Comentários

## Dependências

| Dependência | Tipo | Status |
|---|---|---|
| FE-08 mergeada em develop (design tokens, Header, Footer) | task anterior | pendente |
| `/artigos` e `/artigos/[slug]` existentes (FE-06) | task anterior | ✅ ok |
| Artigo de teste no Sanity (criado em FE-02) | conteúdo | ✅ ok |

## Riscos

| Risco | Mitigação |
|---|---|
| `@tailwindcss/typography` (plugin `prose`) não está instalado no projeto | Verificar `package.json` antes de usar `prose`. Se não instalado, implementar estilos de tipografia manualmente via `@layer components` no CSS — não instalar novo pacote sem confirmar com humano |
| PortableText com tipos de bloco personalizados sem renderer específico | Inspecionar os posts de teste para ver quais tipos de bloco existem; criar renderer básico para `normal`, `h2`, `h3`, `strong`, `em`, `a` |

## Branch

`feature/FE-09-artigos-design` a partir de `develop` (após merge de FE-08)

## Coordenação

- Iniciar somente após FE-08 mergeada em `develop`.
- Pode ser executada em paralelo com FE-10 e FE-11 se o agente tiver capacidade.
- Ao concluir, notificar Planner para atualizar estado da sprint.

## Definição de pronto

`docs/runbooks/PRE-MERGE-CHECKLIST.md`
