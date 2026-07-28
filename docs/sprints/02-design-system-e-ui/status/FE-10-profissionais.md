---
task_id: FE-10
title: "/profissionais — listagem de teamMembers do Sanity"
sprint: "02-design-system-e-ui"
estado: concluido
data_conclusao: 2026-07-27
branch: feature/FE-10-profissionais
pr_url: ~
agente: frontend
tempo_real: "30min"
gates:
  typescript: ok
  lint: ok
  build: ok
  mobile: pendente
  status_report: ok
---

## Resumo do que foi implementado

Nova rota `/profissionais` consumindo o schema `teamMember` do Sanity.
Dois arquivos criados:
- `components/profissionais/TeamMemberCard.tsx` — card com foto/avatar e informações
- `app/(site)/profissionais/page.tsx` — rota com hero navy, grid e estado vazio

Dataset `teamMember` está vazio em produção — estado vazio exibe mensagem
"Em breve mais informações sobre nossa equipe." O humano deve popular o Sanity Studio
antes do QA visual.

## Arquivos criados

| Arquivo | Tipo |
|---|---|
| `app/(site)/profissionais/page.tsx` | criado — nova rota |
| `components/profissionais/TeamMemberCard.tsx` | criado — card de profissional |

## Decisão técnica

**`photo` como string, não SanityImageSource:**
A query GROQ em `getAllTeamMembers` resolve `"photo": photo.asset->url` — o campo
retorna uma URL string, não um objeto de imagem do Sanity. Por isso não é possível
(nem necessário) usar `urlFor()`. A imagem é passada diretamente ao `next/image`,
que aceita URLs do CDN `cdn.sanity.io` (domínio já em `remotePatterns` no `next.config.ts`).
Guard é simplesmente `if (member.photo)` — checagem de null/undefined na string.

**`next/image` com `fill` e container `relative h-24 w-24`:**
Usar `fill` com container de tamanho fixo (`h-24 w-24 = 96x96px`) e `object-cover`
garante que imagens de qualquer proporção sejam exibidas corretamente no avatar circular.
`sizes="96px"` instrui o browser a não carregar resoluções desnecessárias.

## Critérios de aceite — auto-avaliação

| CA | Status | Observação |
|---|---|---|
| CA-01: rota /profissionais existe | ✅ | Confirmado no build output |
| CA-02: busca via getAllTeamMembers() | ✅ | Import direto da lib |
| CA-03: revalidate = 300 | ✅ | `export const revalidate = 300` |
| CA-04: generateMetadata — title correto | ✅ | "Profissionais \| Clínica Muzy" |
| CA-05: TeamMemberCard com foto/placeholder/nome/cargo/bio | ✅ | Implementado |
| CA-06: grid 1/2/3 colunas | ✅ | `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` |
| CA-07: next/image com alt=nome | ✅ | `alt={member.name}` |
| CA-08: estado vazio gracioso | ✅ | Mensagem "Em breve mais informações..." |
| CA-09: hero navy com título "Nossa Equipe" | ✅ | Mesmo padrão de FE-09 |
| CA-10: mobile 375px sem overflow | pendente | Requer validação manual com dados reais |
| CA-11: sem TypeScript novo / sem any | ✅ | `npx tsc --noEmit` limpo |

## Pré-requisito de QA

O humano deve cadastrar ao menos 1 profissional no Sanity Studio em `/studio` antes
de validar os CAs visuais (CA-05, CA-06, CA-07, CA-10). Sem dados, apenas o estado
vazio e o hero são visíveis.

## Seção 7 — Avaliação QA

**Status:** bloqueado — dataset `teamMember` vazio; aguarda população pelo humano.

**Fluxos a executar (após popular dados):**

| Fluxo | Resultado | Observação |
|---|---|---|
| Visitante vê /profissionais com hero navy e grid de cards | pendente | CA-09/CA-05/CA-06 |
| Card sem foto exibe avatar placeholder (inicial + fundo navy) | pendente | CA-05 |
| Mobile 375px — cards em coluna única, sem overflow | pendente | CA-10 |
| /profissionais sem membros → mensagem de estado vazio | pendente | CA-08 |
