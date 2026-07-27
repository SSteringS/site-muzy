# Sprint 01 — Setup e CMS

_Período: a definir_
_Status: em execução_

---

## Objetivo

Ambiente completamente operacional: repositório no GitHub, projeto Next.js com TypeScript rodando
localmente, Sanity configurado com schemas e conteúdo real, pipeline de deploy automático no Netlify,
integração GROQ funcionando, webhook de revalidação validado end-to-end e rota /artigos acessível.

**Critério de done da sprint:** o dev abre qualquer artigo no Sanity Studio, publica, e em menos de
30 segundos a mudança aparece em `clinicamuzy.netlify.app/artigos/[slug]` sem nenhuma ação manual.

---

## Escopo — tasks

| Task | Título | Status | Bloqueia |
|---|---|---|---|
| FE-01 | Criar repositório e inicializar projeto Next.js | planejamento | FE-03, FE-04, FE-06 |
| FE-02 | Configurar Sanity — projeto, dataset e schemas | planejamento | FE-03, FE-04, FE-05 |
| FE-03 | Integrar Next.js com Sanity (GROQ client + queries) | planejamento | FE-06 |
| FE-04 | Implementar webhook de revalidação on-demand | planejamento | — |
| FE-05 | Popular siteSettings com conteúdo real | planejamento | — |
| FE-06 | Implementar /artigos — listagem e detalhe | planejamento | — |

---

## Dependências entre tasks

```
FE-01 ─┬─→ FE-03 ─→ FE-06
        └─→ FE-04

FE-02 ─┬─→ FE-03
        ├─→ FE-04
        └─→ FE-05

FE-03 ─→ FE-06
```

Ordem sugerida de execução: FE-01 → FE-02 → FE-03 → FE-04 → FE-05 → FE-06.
FE-01 e FE-02 podem ser executadas em paralelo (não dependem uma da outra).

---

## Fora de escopo desta sprint

- Design visual / componentes com estilo final (aguarda protótipo da agência → Sprint 02)
- Página home, sobre, profissionais (aguarda design → Sprint 02)
- Página de 404, favicon, og:image (Sprint 02+)
- Onboarding dos editores (Sprint 05)
- Corte de DNS (Sprint 04)

---

## Bloqueios ativos

Nenhum bloqueio interno. Bloqueios externos (design, DNS) não afetam esta sprint.

---

## Fluxo de trabalho

1. Planner despacha a task → agente `frontend` implementa em branch `feature/<TASK-ID>-<slug>`
2. Frontend abre PR para `develop`
3. Frontend executa `docs/runbooks/PRE-MERGE-CHECKLIST.md` antes de solicitar revisão
4. Reviewer revisa e aprova
5. Humano faz merge em `develop`
6. Planner atualiza status desta tabela

---

## Estrutura de pastas da sprint

```
docs/sprints/01-setup-e-cms/
├── README.md          ← este arquivo
├── plans/             ← planos de task (escritos antes da execução)
│   ├── FE-01-repo-nextjs-setup.md
│   ├── FE-02-sanity-schemas.md
│   ├── FE-03-integracao-nextjs-sanity.md
│   ├── FE-04-webhook-revalidacao.md
│   ├── FE-05-populate-sitesettings.md
│   └── FE-06-artigos-listagem-detalhe.md
├── status/            ← status reports (escritos após conclusão de cada task)
└── avaliacoes/        ← avaliações QA (se acionadas)
```
