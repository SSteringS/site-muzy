---
task_id: FE-10
title: "/profissionais — listagem de teamMembers do Sanity"
sprint: "02-design-system-e-ui"
status: planejamento
tipo: feature
agente: frontend
origin: backlog
tempo_estimado: "2-3h"
fluxos_qa:
  - "visitante acessa /profissionais e vê lista de profissionais com nome, cargo e mini-bio"
  - "visitante acessa /profissionais com teamMembers sem foto e vê avatar placeholder adequado"
  - "visitante acessa /profissionais em mobile (375px) e vê cards em coluna única, sem overflow"
  - "visitante acessa /profissionais sem nenhum teamMember cadastrado e vê estado vazio adequado"
---

## Contexto

A Clínica Muzy é multidisciplinar — a equipe de profissionais é parte central da proposta
de valor. Esta task cria a rota `/profissionais` consumindo o schema `teamMember` já
existente no Sanity (criado em FE-02).

A query `getAllTeamMembers` já existe em `lib/sanity.queries.ts`.

O dataset está vazio para `teamMember` — o agente deve implementar com estado vazio gracioso
e instruir o humano a popular o Sanity Studio antes do QA.

## Padrão de componente

| Componente | Tipo | Justificativa |
|---|---|---|
| `app/profissionais/page.tsx` | Server Component | Fetch de dados + renderização — sem interatividade |
| `components/profissionais/TeamMemberCard.tsx` | Server Component | Recebe dados como props, sem estado |

## Critérios de aceite

- [ ] CA-01: Rota `app/profissionais/page.tsx` existe e é acessível em `/profissionais`.
- [ ] CA-02: Página busca todos os `teamMember` via `getAllTeamMembers()` de
  `lib/sanity.queries.ts`, ordenados por campo `order` (asc).
- [ ] CA-03: `export const revalidate = 300` declarado na rota (consistente com demais rotas
  de conteúdo).
- [ ] CA-04: `generateMetadata()` implementado — `<title>` = "Profissionais | Clínica Muzy".
- [ ] CA-05: Cada profissional é renderizado como `TeamMemberCard` com:
  - Foto via `next/image` + `urlFor()` de `lib/sanity.image.ts` (se disponível)
  - Avatar placeholder (círculo com inicial do nome) se foto ausente
  - Nome (`name`) em destaque
  - Cargo (`role`) em texto secundário
  - Mini-bio (`shortBio`) se disponível
- [ ] CA-06: Grid responsivo:
  - 1 coluna em mobile (`< md`)
  - 2 colunas em tablet (`md`)
  - 3 colunas em desktop (`lg+`)
- [ ] CA-07: Imagens carregadas via `next/image` com `width` e `height` explícitos (ou `fill`
  com container de tamanho definido). `alt` = nome do profissional.
- [ ] CA-08: Estado vazio (sem teamMembers): mensagem "Em breve mais informações sobre nossa
  equipe." em vez de grid vazio.
- [ ] CA-09: Hero de página com título "Nossa Equipe" e subtítulo "Conheça os profissionais
  da Clínica Muzy", no padrão navy/branco de FE-09.
- [ ] CA-10: Em viewport 375px, cards sem overflow horizontal.
- [ ] CA-11: Nenhum erro de TypeScript. Tipo explícito para `TeamMember` (derivado da query
  ou declarado em `lib/sanity.queries.ts`).

## Escopo — o que está DENTRO

- `app/profissionais/page.tsx` — nova rota
- `components/profissionais/TeamMemberCard.tsx` — card de profissional
- `generateMetadata`, `revalidate`, estado vazio
- Avatar placeholder via CSS (inicial do nome, fundo navy, texto branco)

## Fora de escopo

- Página de detalhe individual do profissional (`/profissionais/[slug]`) — Sprint 03+
- Filtro por especialidade
- Links para currículo / redes sociais do profissional
- Foto em formato ampliado (lightbox)

## Dependências

| Dependência | Tipo | Status |
|---|---|---|
| FE-08 mergeada em develop (design tokens, Header, Footer) | task anterior | pendente |
| Schema `teamMember` existente no Sanity (FE-02) | task anterior | ✅ ok |
| Query `getAllTeamMembers` em `lib/sanity.queries.ts` (FE-03) | task anterior | ✅ ok |
| `remotePatterns` para `cdn.sanity.io` em `next.config.ts` (FE-01/FE-03) | task anterior | ✅ ok |
| `teamMember` documents populados no Sanity | conteúdo / humano | ⚠️ dataset vazio — popular antes do QA |

## Riscos

| Risco | Mitigação |
|---|---|
| Dataset vazio — QA sem dados reais | Planner instrui humano a cadastrar ao menos 1 profissional no Sanity Studio antes de iniciar QA. Agente implementa com estado vazio gracioso (CA-08). |
| `urlFor()` com `photo` ausente lança exceção | Guard: verificar `photo && photo.asset` antes de chamar `urlFor()`. Renderizar avatar placeholder se não houver foto. |
| `next/image` com imagens do Sanity CDN sem width/height explícito | Usar `fill` com container `relative` de tamanho definido (ex: `aspect-square`), ou extrair dimensões da resposta do Sanity |

## Branch

`feature/FE-10-profissionais` a partir de `develop` (após merge de FE-08)

## Coordenação

- Iniciar somente após FE-08 mergeada em `develop`.
- Pode ser executada em paralelo com FE-09 e FE-11.
- Antes do QA: humano cadastra ao menos 1 profissional no Sanity Studio em
  `https://sss-site-muzy.netlify.app/studio`.
- Ao concluir, notificar Planner.

## Definição de pronto

`docs/runbooks/PRE-MERGE-CHECKLIST.md`
