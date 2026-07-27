# Templates — Guia de uso

## Quando usar cada template

| Situação | Template | Destino |
|---|---|---|
| Planejar uma task de implementação | `_TEMPLATE-plano.md` | `docs/sprints/<NN>/plans/<TASK-ID>-<slug>.md` |
| Registrar uma decisão arquitetural | `_TEMPLATE-adr.md` | `docs/decisions/<NNNN>-<slug>.md` |
| Reportar status de task concluída | `_TEMPLATE-status.md` | `docs/sprints/<NN>/status/<TASK-ID>-<slug>.md` |

## Regras inegociáveis

- **Plano:** template obrigatório. Campos nunca omitidos. `fluxos_qa: []` explícito se não há fluxo de usuário verificável.
- **ADR:** status inicial sempre `Proposed`. Humano aceita — planner nunca homologa a própria decisão.
- **Status report:** escrito pelo agente após PR aprovado pelo Reviewer. Inclui Seção 7 se QA foi acionado.

## Numeração de ADRs

Sequencial com 4 dígitos: `0001`, `0002`, ...
Verificar o maior número existente em `docs/decisions/` antes de criar.

## Nomenclatura de tasks

Prefixo por papel executor:
- `FE-NN` — Frontend
- `DOC-NN` — Documental / planner
- `INFRA-NN` — Infraestrutura sem código de produto
