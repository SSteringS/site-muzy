---
task_id: TASK-NN
title: "Título da task"
sprint: "NN-slug-da-sprint"
status: planejamento
# planejamento | em_execucao | revisao | concluido | parqueado
tipo: feature
# feature | fix | chore | docs | refactor
agente: frontend
# frontend | planner | arquiteto
origin: backlog
# backlog | kaizen | emergencial | humano
tempo_estimado: ""
# estimativa de esforço (ex: "2-3h", "meio dia"). Preenchida pelo Planner.
# Agente preenche tempo_real no status report.
fluxos_qa: []
# Lista de fluxos para o agente QA verificar após implementação.
# [] explícito se a task for documental, infra sem UI, ou sem fluxo de usuário verificável.
# Exemplo: ["visitante acessa /artigos e vê lista de posts", "editor publica e site atualiza"]
---

## Contexto

_Por que esta task existe? Qual problema de negócio ou técnico ela resolve?
Referenciar o épico ou história de usuário do brief quando aplicável._

## Padrão de componente

_Obrigatório para tasks de UI. Omitir (ou marcar N/A) apenas em tasks sem componentes React._

| Componente | Tipo | Justificativa |
|---|---|---|
| `components/Exemplo.tsx` | Server Component / Client Component (`"use client"`) | motivo da escolha |

## Critérios de aceite

_O que o Reviewer independente vai checar — sem precisar falar com o implementador._
_Cada critério deve ser verificável lendo o diff + rodando o projeto._

- [ ] CA-01: ...
- [ ] CA-02: ...

## Escopo — o que está DENTRO

- ...

## Fora de escopo

_Explícito para evitar gold-plating._

- ...

## Dependências

| Dependência | Tipo | Status |
|---|---|---|
| ... | task anterior / decisão / externo | ok / pendente |

## Riscos

_Riscos específicos desta task — não genéricos. Cada risco tem mitigação concreta._

| Risco | Mitigação |
|---|---|
| ... | ... |

## Branch

`feature/<TASK-ID>-<slug>` a partir de `develop`

## Coordenação

_Quem precisa ser notificado quando esta task completa?
Qual task é desbloqueada por esta?_

## Definição de pronto

`docs/runbooks/PRE-MERGE-CHECKLIST.md`
