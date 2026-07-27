---
task_id: FE-11
title: "Home (/) — hero e seções institucionais"
sprint: "02-design-system-e-ui"
estado: concluido
data_conclusao: 2026-07-27
branch: feature/FE-11-home
pr_url: ~
agente: frontend
tempo_real: "45min"
gates:
  typescript: ok
  lint: ok
  build: ok
  mobile: pendente
  status_report: ok
---

## Resumo do que foi implementado

Placeholder da home substituído pela home real da Clínica Muzy.
Três componentes novos em `components/home/` + query nova em `lib/sanity.queries.ts`.
A página funciona com fallbacks elegantes quando o dataset `institutionalSection` está vazio.

## Arquivos criados/modificados

| Arquivo | Tipo |
|---|---|
| `lib/sanity.queries.ts` | modificado — tipo `InstitutionalSectionData` + função `getInstitutionalSection(key)` |
| `app/(site)/page.tsx` | substituído — home real com Promise.all e fallbacks |
| `components/home/HeroSection.tsx` | criado — hero navy, título, slogan, CTA |
| `components/home/InstitutionalSection.tsx` | criado — seção warm-100, heading, body |
| `components/home/CTASection.tsx` | criado — grid 2 cards para /artigos e /profissionais |

## Decisões técnicas

**Tipo `InstitutionalSectionData` (não `InstitutionalSection`):**
Nomeado com sufixo `Data` para evitar conflito com o componente
`components/home/InstitutionalSection` — ambos seriam importados na mesma página.

**`Promise.all` para as duas queries:**
As duas chamadas `getInstitutionalSection('hero')` e `getInstitutionalSection('sobre-clinica')`
são independentes, logo executadas em paralelo. Next.js também deduplicaria chamadas
idênticas via cache se repetidas em outros lugares.

**`whitespace-pre-line` no body:**
O campo `body` do schema `institutionalSection` é `type: 'text'` (string simples, não
PortableText). Texto com múltiplas linhas viria com `\n`. `whitespace-pre-line` preserva
as quebras de linha sem exigir parsing adicional.

**Fallback para body `null`:**
Se o documento existir no Sanity mas `body` estiver vazio, o componente exibe
"Em breve mais informações sobre a clínica." em itálico — estado elegante.

## Critérios de aceite — auto-avaliação

| CA | Status | Observação |
|---|---|---|
| CA-01: placeholder removido | ✅ | page.tsx inteiramente substituído |
| CA-02: revalidate = 300 | ✅ | Confirmado no build (5m) |
| CA-03: generateMetadata — title correto | ✅ | "Clínica Muzy \| Performance com Saúde" |
| CA-04: hero com heading, body e CTA | ✅ | Fallbacks: "Clínica Muzy" / "Performance com Saúde" |
| CA-05: seção "Sobre" com fallback | ✅ | Fallback heading + placeholder de body |
| CA-06: CTA /artigos e /profissionais | ✅ | Grid 1/2 colunas, cards com descrição |
| CA-07: sem contato hardcoded | ✅ | Nenhum telefone/email na home |
| CA-08: mobile 375px sem overflow | pendente | Requer validação manual |
| CA-09: TypeScript limpo, tipos explícitos | ✅ | `InstitutionalSectionData` definido |
| CA-10: deploy no Netlify | pendente | Depende de merge + deploy manual |

## Pré-requisito de QA com conteúdo real

Popular no Sanity Studio:
1. `institutionalSection` com `key: "hero"` (heading + body)
2. `institutionalSection` com `key: "sobre-clinica"` (heading + body)

Sem dados: fallbacks visíveis — hero mostra "Clínica Muzy / Performance com Saúde"
e seção "Sobre" mostra "Em breve mais informações sobre a clínica."

## Seção 7 — Avaliação QA

**Status:** pendente — requer `npm run dev` e validação visual.

| Fluxo | Resultado | Observação |
|---|---|---|
| / mostra hero navy com "Clínica Muzy" e "Performance com Saúde" | pendente | CA-04 (fallback) |
| Seção "Sobre a Clínica" visível abaixo do hero | pendente | CA-05 (fallback) |
| Cards "Artigos" e "Profissionais" visíveis | pendente | CA-06 |
| Botão "Conheça nossa equipe" leva a /profissionais | pendente | CA-04 |
| Mobile 375px — hero e seções sem overflow | pendente | CA-08 |
