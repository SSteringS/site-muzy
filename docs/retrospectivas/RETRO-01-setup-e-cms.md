# Retrospectiva — Sprint 01: Setup e CMS

_Data: 2026-07-27 | Participantes: humano, planner, agente frontend_

---

## §1 Resumo numérico

| Métrica | Valor |
|---|---|
| Duração | 2 dias (2026-07-26 → 2026-07-27) |
| Tasks planejadas | 6 (FE-01 a FE-06) |
| Tasks entregues | 7 (+ FE-07 emergencial) |
| PRs rejeitados pelo Reviewer | 0 |
| Desvios de plano registrados | 3 (split layout/page, versões de pacotes, Tailwind 4) |
| Bugs encontrados pós-implementação | 2 (basePath ausente → FE-07; webhook 401 → config manual) |
| Tasks com QA bloqueado durante sprint | 2 (FE-04 e FE-06 — aguardavam prod) |

---

## §2 O que funcionou

**Dispatches com contexto específico de versão e de arquivos já existentes.**
O agente frontend apontou explicitamente que bullets como "versão instalada é next-sanity@13, não @9" e "arquivo X já existe, não recriar" eliminaram verificações exploratórias antes de escrever código. Sinal: nenhum PR de FE-03 a FE-07 tocou arquivo que não deveria.

**ADR 0002 como referência viva durante a implementação.**
O frontend agent usou o ADR para entender o porquê da estratégia de revalidação, não só o como. Resultado: o endpoint `/api/revalidate` saiu com todos os edge cases cobertos (body malformado, secret ausente, tipo de documento sem slug) — decisões que o plano não prescrevia linha a linha.

**Stack desconhecida funcionou melhor do que o esperado.**
Humano não conhecia Sanity nem Netlify antes desta sprint. Ambos operacionais em 2 dias sem incidente de infraestrutura. A escolha de planos gratuitos com boa documentação (ADR 0001) se provou acertada.

**Planos com specs de campo completas evitaram lacunas.**
`docs/architecture/especificacao-tecnica.md` com todos os campos de cada schema evitou que o frontend agent tivesse que inferir estrutura de dados. Nenhuma task reportou lacuna de requisito.

**Fluxo dispatch → implementação → PR sem fricção.**
Do ponto de vista do humano, o ciclo funcionou como planejado — sem necessidade de interromper o agente para esclarecer requisitos no meio da execução.

---

## §3 O que machucou

**Spec com versões desatualizadas desde o início.**
A `especificacao-tecnica.md` foi escrita antes do projeto existir, com versões estimadas (next-sanity@9, @sanity/image-url@1, Tailwind 3). O `create-next-app` instalou versões mais novas. O agente frontend descobriu as divergências de API inspecionando `node_modules` antes de cada implementação — em FE-03, o caminho de tipo `@sanity/image-url/lib/types/types` não existia na v2, só detectado pelo TypeScript em runtime.
_Causa-raiz: spec foi escrita no planejamento, não após o setup. O correto é atualizar a spec assim que FE-01 completa e as versões reais são conhecidas._

**Plano do Studio sem considerar a boundary Server→Client do App Router.**
O plano de FE-02 previa um único `page.tsx` para o Studio. A combinação de duas restrições independentes — `sanity.config.ts` contém funções (exige `"use client"`) e `metadata`/`viewport` são ignorados em Client Components (exige Server Component separado) — forçou um diagnóstico antes de escrever qualquer linha. Virou split `layout.tsx` + `page.tsx`, com justificativa documentada no status report.
_Causa-raiz: plano escrito sem considerar o comportamento específico do App Router com configs que contêm funções. Na Sprint 02, com componentes interativos, essa distinção vai aparecer em toda task de UI._

**Configuração manual do webhook sem verificação de conclusão.**
O status report de FE-04 documentou os 3 passos manuais necessários (token Sanity, webhook, env vars Netlify). O header `Authorization` foi configurado no Netlify mas não no webhook do Sanity — descoberto só no QA pós-deploy via logs de 401. Gerou um ciclo de debug que poderia ter sido evitado.
_Causa-raiz: passos manuais ficaram no status report mas não havia checklist de "validar antes de considerar QA pronto"._

**Ausência de métricas de desempenho.**
O humano apontou que não temos baseline para medir performance do processo — tempo por task, número de tentativas por PR, tempo de diagnóstico vs implementação. Com dados só desta sprint, não dá para saber se estamos melhorando.
_Causa-raiz: primeiro sprint do projeto, nenhum baseline estabelecido. É esperado._

---

## §4 Ações

| Ação | Dono | Sprint alvo | Critério de feito |
|---|---|---|---|
| Atualizar `especificacao-tecnica.md` com versões reais após FE-01 — antes de escrever planos das tasks seguintes | Planner | Sprint 02 (abertura) | Versões na spec batem com `package.json` |
| Incluir campo "Padrão de componente" (Server / Client / split — com justificativa) nos planos de task de UI da Sprint 02 | Planner | Sprint 02 | Todos os planos de UI têm o campo preenchido |
| Criar `docs/runbooks/DEPLOY-CHECKLIST.md` — checklist de verificação pós-deploy que inclui validar passos manuais antes de iniciar QA | Planner | Sprint 02 | Runbook existe e é referenciado nos planos de tasks com passos manuais |
| Registrar tempo por task nos próximos status reports (campo `tempo_estimado` vs `tempo_real`) para construir baseline | Planner | Sprint 02 | Próximos 3 status reports têm o campo preenchido |

---

## §5 Tópicos para o backlog de workflow

- **`server-only` package não instalado** — `lib/sanity.server.ts` protegido por convenção, não por enforcement do compilador. Baixo risco agora, vale endereçar antes de crescer o projeto.
- **Node.js 20.15.0 abaixo do mínimo** — next-sanity@13 pede ≥20.19.0. Funciona com warnings; atualizar o ambiente local e definir `NODE_VERSION` no Netlify.
- **Padrão Server/Client Component** — transformar em seção fixa do template de plano para tasks de UI, não só uma ação pontual desta retro.
