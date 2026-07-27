# BACKLOG — Evolução de Workflow

_Última atualização: 2026-07-27_

Items de processo, ferramentas e infraestrutura de desenvolvimento.
Não são features de produto — são melhorias no próprio workflow de desenvolvimento.

---

## Itens ativos

| # | Problema | Hipótese de melhoria | Prioridade | Sprint alvo |
|---|---|---|---|---|
| 5 | `server-only` não instalado — proteção por convenção apenas | Instalar pacote e adicionar `import 'server-only'` em `lib/sanity.server.ts` | baixa | Sprint 03 |
| 6 | Node.js 20.15.0 abaixo do mínimo do next-sanity@13 | Atualizar Node local + `NODE_VERSION=20.19` no Netlify | baixa | Sprint 03 |
| 7 | Sintaxe de token Tailwind v4 incorreta nos planos (`bg-[--color-brand-900]` → `bg-brand-900`) causou fix em 7 arquivos e cascata nos dispatches | Documentar sintaxe correta em `docs/aprendizado/` + validar classes Tailwind antes de incluir em plano | alta | Sprint 03 abertura |
| 8 | Padrão "hero fullwidth" (negative margins) descoberto e replicado silenciosamente por 3 tasks sem referência canônica | Documentar padrão em `estado-atual-dev.md` e referenciar nos planos de UI | alta | Sprint 03 abertura |
| 9 | Dispatch com tipo incorreto de campo GROQ — `photo` descrito como `SanityImageSource` mas query retorna `string \| null` | Incluir tipo de retorno real das queries no dispatch (não o tipo do schema Sanity) | média | Sprint 03 |
| 10 | CAs de UI sem separação entre "validável sem dados Sanity" e "requer dados no Studio" — checklist de PR fica desonesto | Rotular CAs com `[sem dados]` / `[requer dados Sanity]` nos planos de UI | média | Sprint 03 |
| 11 | `.next/types/` cache do Next.js 16 persiste entre branches — `npx tsc --noEmit` falha com erros de tipo de branches anteriores | Documentar em `docs/aprendizado/` com solução `rm -rf .next` | baixa | Sprint 03 abertura |

---

## Itens concluídos

| # | Problema | Solução aplicada | Sprint | Data |
|---|---|---|---|---|
| 1 | Spec com versões desatualizadas gera investigação manual | `especificacao-tecnica.md` atualizado com versões reais antes dos planos da Sprint 02 | Sprint 02 abertura | 2026-07-27 |
| 2 | Padrão Server/Client Component não estava nos planos | Seção `## Padrão de componente` adicionada ao template e a todos os planos FE-08 a FE-11 | Sprint 02 abertura | 2026-07-27 |
| 3 | Passos manuais pós-deploy sem checklist de verificação | `docs/runbooks/DEPLOY-CHECKLIST.md` criado e referenciado nos planos com passos manuais | Sprint 02 abertura | 2026-07-27 |
| 4 | Sem métricas de tempo por task | Campo `tempo_estimado` adicionado ao frontmatter do template e de todos os planos da Sprint 02; agente preenche `tempo_real` no status report | Sprint 02 abertura | 2026-07-27 |

---

## Como usar este backlog

Quando identificar um problema recorrente no processo (ex.: checklist manual repetitivo, etapa confusa no fluxo de PR, decisão que se repete sem ADR), registrar aqui com:

- **Problema:** o que está doendo
- **Hipótese de melhoria:** o que poderia resolver
- **Prioridade:** alta / média / baixa
- **Sprint kaizen alvo:** quando atacar

---

## Critério de kaizen (ADR 0015)

Abrir sprint kaizen quando ≥2 das condições batem:
- ≥3 items neste backlog com prioridade alta
- A retro gerou ≥2 ações de workflow sem sprint-alvo definida
- Um impedimento recorrente foi identificado
- Humano sinalizou que quer atacar processo antes de produto
