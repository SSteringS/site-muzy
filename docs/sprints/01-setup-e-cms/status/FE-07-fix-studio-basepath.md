---
task_id: FE-07
title: "Fix: adicionar basePath ao sanity.config.ts"
sprint: "01-setup-e-cms"
estado: concluido
data_conclusao: 2026-07-27
branch: fix/FE-07-studio-basepath
pr_url: ~
agente: frontend
---

## Resumo do que foi implementado

Uma linha adicionada: `basePath: '/studio'` no `defineConfig` de `sanity/sanity.config.ts`.
Sem esse campo, o Sanity Studio tenta rotear ferramentas a partir da raiz (`/`) em vez
de `/studio`, resultando em "tool not found: studio".

## Arquivos principais criados/modificados

| Arquivo | Tipo de mudança |
|---|---|
| `sanity/sanity.config.ts` | modificado — `basePath: '/studio'` adicionado |

## Desvios do plano

Nenhum.

## Pontos de atenção para o Reviewer

- CA-02 e CA-03 requerem validação manual: `npm run dev` → `localhost:3000/studio` → Studio
  deve carregar sem "tool not found" e exibir os 4 schemas no menu lateral.
- CA-04: build e lint passando ✅ (confirmado).

---

## Seção 7 — Avaliação QA

**Status:** não aplicável — `fluxos_qa: []` no plano da task.

**Validação manual necessária (CA-02/CA-03):** `npm run dev` e abrir `localhost:3000/studio`.
