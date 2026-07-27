# DEPLOY-CHECKLIST — Verificação pós-deploy antes do QA

_Criado: 2026-07-27 | Origem: Retro Sprint 01 — webhook 401 descoberto só no QA_

Este checklist deve ser executado **após cada deploy em produção** e **antes** de marcar
uma task como pronta para QA. O objetivo é pegar erros de configuração manual antes
que o Reviewer ou o humano iniciem a validação.

---

## 1. Verificar que o deploy completou

- [ ] Netlify dashboard mostra status `Published` (não `Failed` nem `Building`)
- [ ] URL do deploy é produção — não um deploy preview (verificar que a URL é
  `https://sss-site-muzy.netlify.app` e não `https://deploy-preview-*.netlify.app`)
- [ ] Confirmar que o commit correto está em produção: branch `main` no GitHub tem o
  commit do PR mergeado

## 2. Verificar variáveis de ambiente (se a task adicionou variáveis novas)

- [ ] Acessar Netlify → Site → Environment Variables
- [ ] Confirmar que **todas** as variáveis novas da task estão cadastradas
- [ ] Confirmar que os valores não estão em branco ou incorretos
- [ ] Se variável nova foi adicionada: **trigger de redeploy necessário** após cadastrar
  (Netlify não aplica automaticamente novas env vars em deploys já concluídos)

## 3. Verificar integrações com serviços externos (se a task usou integrações)

### Webhook Sanity → `/api/revalidate`

- [ ] Acessar [manage.sanity.io](https://manage.sanity.io) → projeto `z38d0iih` → API → Webhooks
- [ ] Confirmar que o webhook existe e está **ativo** (não disabled)
- [ ] Confirmar que a URL aponta para produção: `https://sss-site-muzy.netlify.app/api/revalidate`
- [ ] Confirmar que o header `Authorization: Bearer <REVALIDATION_SECRET>` está configurado
  no webhook (não apenas no Netlify)
- [ ] Testar o webhook manualmente: publicar (ou republicar) um artigo no Studio e aguardar
  o log de delivery no Sanity — deve retornar `200`

### Sanity Studio (CORS)

- [ ] Se a task alterou o Studio ou adicionou nova URL de deploy: confirmar que a URL está
  registrada em manage.sanity.io → projeto → API → CORS Origins

## 4. Smoke test das rotas afetadas pela task

Execute os itens abaixo no **site de produção** (não localhost):

- [ ] Acessar a rota principal modificada pela task — página carrega sem erro 500
- [ ] Verificar o `<title>` da página no HTML (View Source ou DevTools) — não deve ser
  `undefined` nem estar em branco
- [ ] Em mobile (DevTools → 375px), verificar que não há overflow horizontal
- [ ] Se a task adicionou nova rota: confirmar que rota não retorna 404

## 5. Verificações específicas por tipo de task

### Task com busca de dados do Sanity

- [ ] Dados aparecem na página (não tela em branco / estado vazio inesperado)
- [ ] Se dados estão em branco: verificar se o documento existe no Sanity Studio em produção
  (dataset `production`, não local)

### Task com `next/image` + Sanity CDN

- [ ] Imagens carregam sem erro 400/403
- [ ] `remotePatterns` em `next.config.ts` inclui `cdn.sanity.io`

### Task com passos manuais documentados no status report

- [ ] Reler a seção "Passos manuais" do status report da task
- [ ] Confirmar que **todos** os passos foram executados antes de iniciar QA
- [ ] Anotar no status report: "Passos manuais confirmados em [data]"

---

## Quando este checklist falha

Se algum item falha, **não marcar a task como pronta para QA**.

1. Corrigir o problema de configuração
2. Se o problema exigiu novo deploy: executar o checklist novamente do início
3. Registrar o problema e a correção no status report da task (campo "Impedimentos")

---

## Referências

- Runbook de merge: `docs/runbooks/PRE-MERGE-CHECKLIST.md`
- Webhook Sanity: `docs/decisions/0002-revalidacao-webhook-sanity.md`
- Netlify admin: https://app.netlify.com/projects/sss-site-muzy
- Sanity admin: https://manage.sanity.io (projeto `z38d0iih`)
