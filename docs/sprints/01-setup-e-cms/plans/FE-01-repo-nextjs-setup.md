---
task_id: FE-01
title: "Criar repositório e inicializar projeto Next.js"
sprint: "01-setup-e-cms"
status: planejamento
tipo: chore
agente: frontend
origin: backlog
fluxos_qa: []
---

## Contexto

Ponto de partida do projeto: criar o repositório GitHub, inicializar o projeto Next.js com a stack
definida (TypeScript, Tailwind CSS, App Router) e conectar ao Netlify para deploy contínuo.
Ao final desta task, o dev deve conseguir fazer push e ver o deploy automático funcionando — mesmo
que o site mostre apenas a página padrão do Next.js.

Esta task não implementa nenhuma feature de produto. É a fundação que todas as outras tasks
dependem.

## Critérios de aceite

- [ ] CA-01: Repositório `site-muzy` criado no GitHub, branch `main` e `develop` configuradas.
- [ ] CA-02: `npx create-next-app@latest` executado com flags: TypeScript, Tailwind CSS, App Router, `src/` directory desativado, import alias `@/*`.
- [ ] CA-03: `tsconfig.json` com `"strict": true` habilitado.
- [ ] CA-04: `npm run build` roda sem erro a partir da raiz do projeto.
- [ ] CA-05: `npm run lint` roda sem erro.
- [ ] CA-06: `env.example` commitado na raiz com as 4 chaves documentadas (sem valores): `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_TOKEN`, `REVALIDATION_SECRET`.
- [ ] CA-07: `.gitignore` inclui `.env.local` e `node_modules/`.
- [ ] CA-08: Projeto conectado ao Netlify (site criado, deploy da branch `main` configurado). URL de preview do Netlify acessível (ex: `site-muzy.netlify.app`).
- [ ] CA-09: Pacotes do Sanity instalados: `next-sanity`, `@sanity/image-url`.

## Escopo — o que está DENTRO

- Criar repositório no GitHub
- `create-next-app` com as flags corretas
- Instalar pacotes do Sanity (`next-sanity`, `@sanity/image-url`)
- Configurar Netlify (criar site, conectar ao repositório, configurar branch `main`)
- Criar `env.example`
- Ajustar `tsconfig.json` para strict mode

## Fora de escopo

- Configuração do Sanity Studio (FE-02)
- Qualquer página de conteúdo (FE-06)
- Variáveis de ambiente reais no Netlify (FE-02 e FE-04 configuram os valores)
- Qualquer componente de UI

## Dependências

| Dependência | Tipo | Status |
|---|---|---|
| Conta no GitHub | externo (humano) | necessita verificar |
| Conta no Netlify | externo (humano) | necessita verificar |
| Node.js 20 LTS instalado | externo (ambiente) | necessita verificar |

> Pré-requisito humano: verificar se conta do GitHub e do Netlify existem antes de despachar esta task.

## Riscos

| Risco | Mitigação |
|---|---|
| `create-next-app` muda as flags de CLI entre versões | Usar `npx create-next-app@latest` sem version pinning — aceitar a versão mais recente; verificar as flags disponíveis na instalação |
| Netlify: nome de site `site-muzy` pode estar ocupado | Usar `clinicamuzy` ou outro nome disponível — não afeta o domínio final |

## Branch

`feature/FE-01-repo-nextjs-setup` a partir de `develop`

> Nota: como esta é a task inicial, `develop` precisa existir antes. Criar `develop` a partir de `main` logo após criar o repositório.

## Coordenação

Esta task desbloqueia FE-03, FE-04 e FE-06. Avisar o Planner quando concluída para atualizar STATE.md.

## Definição de pronto

`docs/runbooks/PRE-MERGE-CHECKLIST.md`
