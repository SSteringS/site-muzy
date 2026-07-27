---
task_id: FE-04
title: "Implementar webhook de revalidação on-demand"
sprint: "01-setup-e-cms"
status: planejamento
tipo: feature
agente: frontend
origin: backlog
fluxos_qa: ["editor publica artigo no Sanity Studio e o site atualiza em menos de 30 segundos sem nenhuma ação manual"]
---

## Contexto

Implementar a revalidação on-demand descrita no ADR 0002. Quando um editor publicar conteúdo no
Sanity Studio, o Sanity dispara um webhook para o endpoint `/api/revalidate` do Next.js, que
invalida o cache da rota afetada imediatamente.

Esta task é a que fecha a promessa central do produto: autonomia editorial real.

Referência: `docs/decisions/0002-revalidacao-webhook-sanity.md`

## Critérios de aceite

- [ ] CA-01: `app/api/revalidate/route.ts` aceita `POST` e valida `Authorization: Bearer <REVALIDATION_SECRET>`. Retorna `401` para requests sem o header correto.
- [ ] CA-02: O endpoint chama `revalidatePath('/artigos')` e `revalidatePath('/artigos/' + slug)` quando o tipo de documento é `post`.
- [ ] CA-03: `export const revalidate = 300` declarado em `app/artigos/page.tsx` e `app/artigos/[slug]/page.tsx` (fallback de 5 minutos).
- [ ] CA-04: Webhook configurado no painel do Sanity (`sanity.io/manage → API → Webhooks`): URL `https://<netlify-url>/api/revalidate`, evento `publish`, header `Authorization: Bearer <secret>`.
- [ ] CA-05: `REVALIDATION_SECRET` configurado como variável de ambiente no Netlify.
- [ ] CA-06: Teste end-to-end: publicar artigo no Sanity Studio → página `/artigos` no Netlify atualiza em menos de 30 segundos — sem rebuild, sem ação manual.

## Escopo — o que está DENTRO

- `app/api/revalidate/route.ts` — endpoint Route Handler
- Validação do `REVALIDATION_SECRET` via header `Authorization: Bearer`
- `revalidatePath` para rotas de artigo
- Fallback `export const revalidate = 300` nas rotas de conteúdo
- Configuração do webhook no painel do Sanity (passo documentado — o agente guia o humano)
- Configuração da variável `REVALIDATION_SECRET` no Netlify

## Fora de escopo

- Revalidação de páginas institucionais (home, sobre) — entra quando essas páginas existirem (Sprint 02)
- Logs ou monitoring do webhook (backlog de workflow, se necessário)

## Dependências

| Dependência | Tipo | Status |
|---|---|---|
| FE-01 (projeto + Netlify configurado) | task anterior | planejamento |
| FE-02 (projeto Sanity criado) | task anterior | planejamento |
| URL de produção do Netlify | resultado de FE-01 | planejamento |
| `SANITY_API_TOKEN` com permissão de webhook | resultado de FE-03 | planejamento |

## Riscos

| Risco | Mitigação |
|---|---|
| Sanity webhook no plano Free tem limite de requisições | Verificar limites do plano Free antes de configurar — o volume esperado (edições manuais) é baixo, sem risco prático |
| Netlify Functions tem timeout de 10s por padrão | O `revalidatePath` é síncrono e rápido (< 1s) — sem risco |
| Secret vazado em log do Netlify | Garantir que o secret nunca seja logado no endpoint — não fazer `console.log(req.headers)` |

## Branch

`feature/FE-04-webhook-revalidacao` a partir de `develop`

## Coordenação

Esta task pode ser implementada em paralelo com FE-03 (não dependem uma da outra tecnicamente,
mas ambas dependem de FE-01 e FE-02 estarem mergeadas).

O fluxo_qa desta task requer acesso ao Sanity Studio e ao Netlify — o Reviewer deve executar
o teste de ponta a ponta após o merge em develop.

## Definição de pronto

`docs/runbooks/PRE-MERGE-CHECKLIST.md`
