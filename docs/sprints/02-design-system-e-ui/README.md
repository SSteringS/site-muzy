# Sprint 02 — Design System e UI

_Período: 2026-07-27 → 2026-07-27_
_Status: **implementação concluída — QA visual pendente**_

---

## Objetivo

Estabelecer o design system da Clínica Muzy e aplicar identidade visual em todas as rotas
existentes e novas. Ao final da sprint, o site terá aparência profissional e coerente com a
marca — sem depender do protótipo da agência (identidade derivada de pesquisa de brand).

**Critério de done da sprint:** visitante acessa qualquer rota do site (`/`, `/artigos`,
`/artigos/[slug]`, `/profissionais`) e vê layout com Header, Footer e design consistente
com a paleta navy + neutros aprovada.

---

## Escopo — tasks

| Task | Título | Status | Bloqueia |
|---|---|---|---|
| FE-08 | Design system base — tokens, layout global, Header, Footer | **concluido** | FE-09, FE-10, FE-11 |
| FE-09 | /artigos com design real — listagem e detalhe estilizados | **concluido** | — |
| FE-10 | /profissionais — listagem de teamMembers do Sanity | **concluido** | — |
| FE-11 | Home (/) — hero e seções institucionais | **concluido** | — |

---

## Dependências entre tasks

```
FE-08 ──┬──→ FE-09
         ├──→ FE-10
         └──→ FE-11
```

FE-08 é o prerequisito de todas. FE-09, FE-10 e FE-11 podem ser executadas em paralelo
após FE-08 mergeada em develop.

---

## Design tokens aprovados

Paleta derivada de pesquisa de brand (clinicamuzy.com.br + @clinicamuzy Instagram).
Aprovada pelo humano em 2026-07-27.

```css
@theme {
  /* Marca — navy escuro como cor primária */
  --color-brand-900:    #1A2B3C;
  --color-brand-700:    #243B55;
  --color-brand-50:     #F0F4F8;

  /* Neutros quentes */
  --color-surface:      #FFFFFF;
  --color-background:   #FAFAF8;
  --color-warm-100:     #F5F0EB;
  --color-border:       #E4E0DC;

  /* Texto */
  --color-text-primary: #1A2B3C;
  --color-text-muted:   #6B7280;

  /* Tipografia */
  --font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
}
```

---

## Fora de escopo desta sprint

- Animações e transições elaboradas (aguarda protótipo da agência)
- Página `/sobre` com layout de seção com foto da clínica (aguarda design + imagens reais)
- Página `/artigos/[slug]` com imagem de capa em destaque full-width (aguarda imagens reais)
- Tags / categorias de artigos
- Busca de artigos
- Página 404 customizada
- OG image / social cards
- Onboarding dos editores (Sprint 05)
- Corte de DNS (Sprint 04)

---

## Kaizen Sprint 01 — ações integradas nesta sprint

| Ação retro | Como integrado |
|---|---|
| Atualizar `especificacao-tecnica.md` com versões reais | ✅ Feito na abertura da sprint (antes dos planos) |
| Campo "Padrão de componente" nos planos de UI | ✅ Todos os planos FE-08 a FE-11 têm seção `## Padrão de componente` |
| Criar `DEPLOY-CHECKLIST.md` | ✅ `docs/runbooks/DEPLOY-CHECKLIST.md` criado nesta abertura |
| `tempo_estimado` nos planos → `tempo_real` nos status reports | ✅ Campo no frontmatter dos planos |

---

## Bloqueios ativos

| Bloqueio | Impacto | Owner |
|---|---|---|
| Protótipo de design da agência não chegou | FE-11 (home) depende de content no Sanity — humano precisa popular institutionalSection | Agência / Humano |
| Handles Instagram/Facebook não confirmados | siteSettings.instagramUrl e facebookUrl vazios no Footer | Agência Muzy |

---

## Fluxo de trabalho

1. Planner despacha task → agente `frontend` implementa em `feature/<TASK-ID>-<slug>` a partir de `develop`
2. Frontend abre PR para `develop`
3. Frontend executa `docs/runbooks/PRE-MERGE-CHECKLIST.md` antes de solicitar revisão
4. Reviewer revisa e aprova
5. Humano faz merge em `develop`
6. Planner atualiza status desta tabela

---

## Estrutura de pastas da sprint

```
docs/sprints/02-design-system-e-ui/
├── README.md          ← este arquivo
├── plans/
│   ├── FE-08-design-system-base.md
│   ├── FE-09-artigos-design.md
│   ├── FE-10-profissionais.md
│   └── FE-11-home.md
├── status/            ← preenchido após conclusão de cada task
└── avaliacoes/        ← avaliações QA (se acionadas)
```
