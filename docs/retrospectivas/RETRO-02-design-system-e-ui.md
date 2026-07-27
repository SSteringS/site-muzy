# Retrospectiva — Sprint 02: Design System e UI

_Data: 2026-07-27 | Participantes: humano, planner, agente frontend_

---

## §1 Resumo numérico

| Métrica | Valor |
|---|---|
| Duração | 1 dia (2026-07-27) |
| Tasks planejadas | 4 (FE-08 a FE-11) |
| Tasks entregues | 4 |
| PRs rejeitados pelo Reviewer | 0 |
| Desvios de plano registrados | 4 (route group, sintaxe Tailwind, negative margins, tipo de `photo`) |
| Bugs encontrados pós-implementação em produção | 0 |
| Tasks com QA bloqueado durante sprint | 2 (FE-10 e FE-11 — aguardavam conteúdo no Sanity) |
| Tempo total de implementação (soma dos status reports) | ~4h15min (FE-08: 2h · FE-09: 1h · FE-10: 30min · FE-11: 45min) |

---

## §2 O que funcionou

**Tabela "O que JÁ EXISTE" nos dispatches eliminoua fase de reconhecimento.**
Na Sprint 01 o agente frontend vasculhava o repositório antes de escrever qualquer linha para descobrir o que estava disponível. Na Sprint 02, os dispatches chegaram com lista explícita de arquivos existentes, caminhos e o que não deveria ser tocado — o agente foi direto à implementação. Sinal: zero arquivo tocado fora do escopo.

**"Fora de escopo" explícito nos planos evitou decisões arbitrárias.**
A lista negativa em cada plano (sem paginação, sem lightbox, sem formulário de contato) poupou o agente de decisões que geralmente surgem quando o escopo não é dito claramente. O agente sabia exatamente onde parar.

**Tabela de versões instaladas nos dispatches evitou bugs de API.**
Saber `@sanity/image-url: 2.x`, `@portabletext/react: 7.x` antes de começar evitou o tipo de bug de sub-path import que custou tempo na Sprint 01. Nenhum PR precisou de hotfix por versão errada.

**DEPLOY-CHECKLIST.md funcionou: zero bugs de configuração em produção.**
O runbook criado como ação de kaizen da Sprint 01 foi executado antes do QA e o deploy subiu sem incidente. Sprint 01 teve webhook 401 descoberto só no QA; Sprint 02 não teve nenhum equivalente.

**Tasks paralelas aceleraram a sprint.**
FE-09, FE-10 e FE-11 foram executadas simultaneamente após merge de FE-08. A sprint inteira — planejamento + implementação + PR + deploy — aconteceu em 1 dia.

---

## §3 O que machucou

**Sintaxe `bg-[--color-brand-900]` incorreta no plano gerou fix em cascata.**
O plano de FE-08 (e os dispatches de FE-09/10/11) especificavam `bg-[--color-brand-900]` como forma de usar tokens do `@theme` no Tailwind v4. Na prática, essa sintaxe de CSS variable arbitrária não aplica `background-color` de forma confiável quando o token vem do bloco `@theme` — classes geradas (`bg-brand-900`) funcionam; CSS var arbitrária, não. O resultado foi um header branco, descoberto só na primeira execução de `npm run dev`, forçando diagnóstico visual + correção em 7 arquivos. O agente corrigiu silenciosamente nos três PRs seguintes, sem feedback loop para o Planner — os dispatches de FE-09/10/11 continuaram com a sintaxe errada.
_Causa-raiz: Tailwind v4 é novo e a documentação oficial apresenta as duas formas como equivalentes. A diferença de comportamento não foi validada antes de entrar no plano._

**CA "hero fullwidth" sem documentar a técnica — cada task decidiu sozinha.**
Os CAs de FE-09, FE-10 e FE-11 pediam "hero com fundo navy ocupando a largura da página", mas o container de `app/(site)/layout.tsx` tem `max-w-[1200px] px-4`. O plano não mencionava como romper o container — o agente descobriu a técnica de negative margins (`-mx-4 -mt-10`) em FE-09 e a replicou silenciosamente nas tasks seguintes. Cada task fez a mesma descoberta sem referência canônica.
_Causa-raiz: padrão arquitetural derivado de uma decisão de layout (FE-08) não foi documentado para consumo das tasks subsequentes._

**Dispatch de FE-10 com tipo de `photo` incorreto.**
O dispatch dizia para usar `urlFor(source).width(400)` com guard `photo && photo.asset`. Mas a query `getAllTeamMembers` já resolve `"photo": photo.asset->url` — o campo retorna `string | null`, não `SanityImageSource`. O agente identificou a contradição e corrigiu, mas a inconsistência entre o que o dispatch afirmava e o estado real do código gerou tempo de diagnóstico desnecessário.
_Causa-raiz: o Planner descreveu o tipo de `photo` com base na estrutura do schema Sanity, não no tipo real retornado pela query GROQ._

**CA de dependência estrutural (route group) ausente no plano de FE-08.**
O plano afirmava incorretamente que "o root layout Next.js não se aplica ao Studio — Next.js App Router segmenta por pasta". Isso é falso: o root layout aplica-se a todas as rotas. O agente precisou criar o route group `app/(site)/` para isolar o Studio — solução correta, mas não prevista. O CA pedia o resultado ("Studio sem Header/Footer") sem reconhecer a dependência estrutural necessária para alcançá-lo.
_Causa-raiz: plano escrito com premissa incorreta sobre o comportamento do App Router — mesmo padrão da Sprint 01 com Server/Client boundary._

**Cache do `.next/types/` persiste entre branches no Next.js 16.**
Após criar a branch FE-11 a partir de `develop` (que ainda não tinha `/profissionais`), `npx tsc --noEmit` reclamou de uma type declaration de `/profissionais` que estava no cache de uma build anterior. Solução: `rm -rf .next`. Silencioso para diagnosticar na primeira ocorrência.

---

## §4 Ações

| Ação | Dono | Sprint alvo | Critério de feito |
|---|---|---|---|
| Documentar sintaxe correta do Tailwind v4 para tokens `@theme` em `docs/aprendizado/tailwind-v4-tokens.md` e atualizar `estado-atual-dev.md` com nota | Planner | Sprint 03 abertura | Arquivo existe; `estado-atual-dev.md` menciona `bg-brand-900` (não `bg-[--color-brand-900]`) |
| Documentar padrão "hero fullwidth" em `docs/architecture/estado-atual-dev.md` (seção Padrões de Layout) e referenciar nos planos de UI | Planner | Sprint 03 abertura | Padrão documentado com código exato; planos de Sprint 03 referenciam |
| Incluir tipo de retorno real das queries no dispatch quando referenciando query existente | Planner | Sprint 03 | Todos os dispatches que referenciam queries GROQ têm o tipo de retorno explícito |
| Separar CAs de tasks de UI em duas categorias: "validável sem dados Sanity" e "requer dados no Studio" | Planner | Sprint 03 | Planos de Sprint 03 com CAs rotulados |
| Registrar `.next/types/` cache issue em `docs/aprendizado/` | Planner | Sprint 03 abertura | Arquivo com causa + solução (`rm -rf .next`) |

---

## §5 Tópicos para o backlog de workflow

- **Tailwind v4 — sintaxe de token `@theme` validada antes de ir ao plano**: lição aplicável a qualquer plano que especifique classes Tailwind customizadas. Vale virar critério de escrita de plano.
- **Padrão de hero fullwidth**: solução de negative margins para romper container — documentar uma vez, referenciar sempre. Provável que apareça em toda task de UI com seções de fundo colorido.
- **Tipo de retorno das queries GROQ no dispatch**: quando a query resolve campos (ex.: `"photo": photo.asset->url`), o tipo na camada TypeScript é diferente do schema Sanity. Dispatch deve refletir o tipo real, não o schema.
- **Diagramação da home**: humano quer aproximar o layout da home ao site temporário atual (clinicamuzy.com.br) em questão de estrutura de seções. Tema para Sprint 03 quando o protótipo da agência chegar ou como refinamento autônomo.
