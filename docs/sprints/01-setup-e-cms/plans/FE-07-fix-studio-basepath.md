---
task_id: FE-07
title: "Fix: adicionar basePath ao sanity.config.ts"
sprint: "01-setup-e-cms"
status: planejamento
tipo: fix
agente: frontend
origin: emergencial
fluxos_qa: []
---

## Contexto

Ao abrir `http://localhost:3000/studio`, o Sanity Studio exibe "tool not found: studio" no centro
da tela. O Studio não consegue rotear corretamente porque o `defineConfig` em
`sanity/sanity.config.ts` não tem a propriedade `basePath` definida.

Quando o Studio é embutido no Next.js, ele precisa saber em qual prefixo de URL está montado.
Sem `basePath: '/studio'`, o Sanity tenta rotear a partir da raiz e não encontra as ferramentas
registradas (ex: `structureTool`) porque o path não bate.

Descoberto durante testes manuais da FE-02 em 2026-07-27.

## Critérios de aceite

- [ ] CA-01: `sanity/sanity.config.ts` contém `basePath: '/studio'` no objeto passado para `defineConfig`.
- [ ] CA-02: `npm run dev` + navegar para `http://localhost:3000/studio` → Studio carrega sem erro "tool not found".
- [ ] CA-03: Menu lateral do Studio exibe todos os schemas: Artigos, Membros da Equipe, Seções Institucionais e Configurações do Site.
- [ ] CA-04: `npm run build` e `npm run lint` continuam passando sem erro.

## Escopo — o que está DENTRO

- Adicionar `basePath: '/studio'` ao `defineConfig` em `sanity/sanity.config.ts`

## Fora de escopo

- Qualquer outra alteração na configuração do Studio ou nos schemas

## Dependências

Nenhuma.

## Riscos

Nenhum — mudança de uma linha em arquivo de configuração, sem impacto em outros módulos.

## Branch

`fix/FE-07-studio-basepath` a partir de `develop`

## Coordenação

Fix independente — pode ser executado em paralelo com FE-06 ou antes.
Ao concluir, avisar o Planner para atualizar STATE.md.

## Definição de pronto

`docs/runbooks/PRE-MERGE-CHECKLIST.md`
