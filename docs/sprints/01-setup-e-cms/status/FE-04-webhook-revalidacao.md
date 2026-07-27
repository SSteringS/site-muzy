---
task_id: FE-04
title: "Implementar webhook de revalidação on-demand"
sprint: "01-setup-e-cms"
estado: concluido
data_conclusao: 2026-07-27
branch: feature/FE-04-webhook-revalidacao
pr_url: ~
agente: frontend
---

## Resumo do que foi implementado

Endpoint `POST /api/revalidate` conforme ADR 0002.
Valida `Authorization: Bearer <REVALIDATION_SECRET>` antes de qualquer operação.
Extrai `_type` e `slug.current` do payload do Sanity via type guards (sem `as`).
Revalida `/artigos` + `/artigos/<slug>` para documentos `post`; `/` para demais tipos.
Secret nunca logado. Body parse protegido por `try/catch`.

## Arquivos principais criados/modificados

| Arquivo | Tipo de mudança |
|---|---|
| `app/api/revalidate/route.ts` | criado — Route Handler POST |

## Desvios do plano

**CA-03 parcialmente satisfeito:**
`revalidate = 300` está em `app/artigos/page.tsx` (FE-03). A rota `app/artigos/[slug]/page.tsx`
ainda não existe — será criada em FE-06. O `revalidatePath('/artigos/<slug>')` no endpoint
já funciona para quando a rota existir.

Nenhum outro desvio.

## Pontos de atenção para o Reviewer

- `isRecord()` type guard valida o body antes de qualquer acesso — nenhum `as` sem validação.
- Condição `!secret || authHeader !== ...`: rejeita se `REVALIDATION_SECRET` não estiver
  configurada (fail-safe — não abre acesso irrestrito por env ausente).
- `docType === null` (body sem `_type`) cai no `else` → `revalidatePath('/')` — comportamento
  seguro e previsível.
- `slug` opcional em posts: revalida `/artigos` mesmo sem slug; `/artigos/<slug>` só se presente.

## Passos manuais necessários após o merge (documentado para o humano)

### 1. Gerar token de API no Sanity
`sanity.io/manage` → projeto `z38d0iih` → **API → Tokens → Add API token**
- Nome sugerido: `site-muzy-webhook`
- Tipo: **Editor** (read + write — necessário para o webhook)
- Copiar o token gerado (aparece uma única vez)

### 2. Configurar webhook no Sanity
`sanity.io/manage` → projeto `z38d0iih` → **API → Webhooks → Create webhook**
- **Name:** Site Muzy — Revalidate
- **URL:** `https://sss-site-muzy.netlify.app/api/revalidate`
- **Trigger on:** ✅ Publish
- **Filter:** (deixar vazio — todos os tipos)
- **HTTP Headers:**
  - Key: `Authorization`
  - Value: `Bearer <seu-REVALIDATION_SECRET>`
- Salvar

### 3. Configurar variáveis de ambiente no Netlify
`app.netlify.com/projects/sss-site-muzy` → **Site configuration → Environment variables**
- `REVALIDATION_SECRET` = (string aleatória segura — ex: `openssl rand -hex 32`)
- `SANITY_API_TOKEN` = (token gerado no passo 1)
- Fazer **redeploy** após salvar as variáveis

---

## Seção 7 — Avaliação QA

**Status:** pendente — `fluxos_qa` requer ambiente de produção (Netlify + Sanity webhook configurados).

**Fluxos a executar (pós-configuração manual):**

| Fluxo | Resultado | Observação |
|---|---|---|
| Editor publica artigo → site atualiza em < 30s | pendente | requer passos manuais acima |
| POST sem Authorization → retorna 401 | pendente | pode testar com `curl` após deploy |
| POST com secret inválido → retorna 401 | pendente | idem |
| POST com body malformado → retorna 400 | pendente | idem |
