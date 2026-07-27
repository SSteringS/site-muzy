---
task_id: FE-05
title: "Popular siteSettings com conteúdo real"
sprint: "01-setup-e-cms"
status: planejamento
tipo: chore
agente: humano
origin: backlog
fluxos_qa: []
---

## Contexto

Task editorial — não envolve código. O humano (dev ou cliente) loga no Sanity Studio e preenche
o documento `siteSettings` com o conteúdo real já disponível (extraído da página temporária do
site em 27/07/2026).

Conteúdo disponível em: `docs/site-muzy-project-brief.md` §6.

Esta task garante que as queries de `siteSettings` retornam dados reais desde o início,
evitando placeholder/dado fake em desenvolvimento.

## Critérios de aceite

- [ ] CA-01: Documento `siteSettings` criado no Sanity Studio com: telefone `(11) 3619-3044`, e-mail `contato@clinicamuzy.com.br`, endereço completo, CNPJ `11.844.219/0001-93`, horários (seg-qui 09:00–18:30, sex 09:00–17:30).
- [ ] CA-02: Logo uploadada no campo `logo` (URL: `https://www.clinicamuzy.com.br/imagens/logo_muzy.png` — baixar e fazer upload, não usar URL externa diretamente).
- [ ] CA-03: Campos `instagramUrl` e `facebookUrl` preenchidos ou marcados como pendentes (confirmar handles com a agência).
- [ ] CA-04: Query `getSiteSettings()` retorna os dados corretos (verificar via `http://localhost:3000/api/sanity-test` ou console do Next.js).

## Como executar (passo a passo para o humano)

1. Acessar `http://localhost:3000/studio` (ou o Studio do Netlify se FE-01 e FE-02 estiverem no ar)
2. Fazer login com a conta Sanity de Administrator
3. Navegar para "Site Settings" no menu lateral
4. Preencher os campos com os dados da seção 6 do brief
5. Clicar em "Publish"

## Fora de escopo

- Qualquer alteração de código
- Populamento de `teamMember` (Épico 5 — Sprint 02)
- Populamento de `institutionalSection` (Épico 3 — aguarda design)
- Populamento de artigos reais (editorial ongoing após onboarding)

## Dependências

| Dependência | Tipo | Status |
|---|---|---|
| FE-02 (schemas criados) | task anterior | planejamento |
| FE-03 (Studio acessível em /studio) | task anterior | planejamento |
| Handles Instagram/Facebook confirmados | externo (agência) | pendente |

## Branch

Não se aplica — task sem código.

## Coordenação

Task sem bloqueio de outras tasks (FE-06 não depende de siteSettings estar populado).
Pode ser executada a qualquer momento após FE-02 e FE-03 estarem mergeadas.

## Definição de pronto

`docs/runbooks/PRE-MERGE-CHECKLIST.md` — não aplicável para tasks editoriais sem código.
Pronto quando CA-01 a CA-04 verificados no Studio.
