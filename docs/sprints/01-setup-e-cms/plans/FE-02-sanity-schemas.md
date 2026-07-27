---
task_id: FE-02
title: "Configurar Sanity — projeto, dataset e schemas"
sprint: "01-setup-e-cms"
status: planejamento
tipo: feature
agente: frontend
origin: backlog
fluxos_qa: []
---

## Contexto

Criar o projeto no Sanity Cloud, configurar o dataset de produção e implementar os 4 schemas de
conteúdo definidos na especificação técnica. Ao final desta task, o Sanity Studio deve estar
acessível em `/studio` no projeto local e um Editor deve conseguir criar um artigo de teste.

Specs de schemas: `docs/architecture/especificacao-tecnica.md` §Schemas Sanity.

## Critérios de aceite

- [ ] CA-01: Projeto criado no Sanity Cloud (painel em `sanity.io/manage`). Project ID disponível.
- [ ] CA-02: Dataset `production` configurado.
- [ ] CA-03: Schema `post` implementado em `sanity/schemaTypes/post.ts` com todos os campos da spec: `title`, `slug` (auto-gerado), `author` (ref → teamMember), `coverImage` (hotspot), `body` (PortableText), `publishedAt`.
- [ ] CA-04: Schema `teamMember` implementado com: `name`, `photo` (hotspot), `role`, `shortBio`, `order`.
- [ ] CA-05: Schema `institutionalSection` implementado com: `key`, `heading`, `body`, `backgroundImage`.
- [ ] CA-06: Schema `siteSettings` implementado como **singleton** com: `logo`, `phone`, `whatsapp`, `email`, `address`, `cnpj`, `businessHours`, `instagramUrl`, `facebookUrl`.
- [ ] CA-07: Sanity Studio acessível em `http://localhost:3000/studio` com todos os schemas visíveis no menu lateral.
- [ ] CA-08: É possível criar um artigo de teste (title + slug) no Studio sem erro.
- [ ] CA-09: `NEXT_PUBLIC_SANITY_PROJECT_ID` e `NEXT_PUBLIC_SANITY_DATASET` preenchidos no `.env.local` local.

## Escopo — o que está DENTRO

- Criar projeto no Sanity Cloud e configurar dataset
- Implementar os 4 schemas em `sanity/schemaTypes/`
- Configurar `sanity/sanity.config.ts` com `projectId`, `dataset`, lista de schemas
- Registrar rota `/studio` no Next.js (`app/studio/[[...tool]]/page.tsx`)
- Configurar `siteSettings` como singleton (com action customizada no Studio para garantir documento único)

## Fora de escopo

- Popular o `siteSettings` com conteúdo real (FE-05)
- Configurar token de API para o Next.js (FE-03)
- Convite de editores (Épico 7 — onboarding)

## Dependências

| Dependência | Tipo | Status |
|---|---|---|
| FE-01 (projeto Next.js criado) | task anterior | planejamento |
| Conta no Sanity Cloud (`sanity.io`) | externo (humano) | necessita criar |

> Pré-requisito humano: criar conta em `sanity.io` antes de despachar esta task.

## Riscos

| Risco | Mitigação |
|---|---|
| Singleton para `siteSettings` requer configuração especial no Studio | Usar `__experimental_actions` ou o padrão de singleton documentado em `next-sanity` — verificar a versão atual do pacote antes de implementar |
| Conflito de versão entre `next-sanity` e `@sanity/client` | Deixar `next-sanity` gerenciar as dependências do Sanity — não instalar `@sanity/client` separadamente |

## Branch

`feature/FE-02-sanity-schemas` a partir de `develop`

> Pode rodar em paralelo com FE-01 se o dev quiser, mas o merge de FE-02 depende de FE-01 estar mergeada em develop primeiro.

## Coordenação

Esta task desbloqueia FE-03, FE-04 e FE-05.
Ao concluir, notificar o Planner para atualizar STATE.md.

## Definição de pronto

`docs/runbooks/PRE-MERGE-CHECKLIST.md`
