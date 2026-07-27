---
task_id: FE-12
title: "Home — cards de contato e seção 'Sobre' redesenhada"
sprint: "03-refinamento-visual"
estado: concluido
data_conclusao: 2026-07-27
branch: feature/FE-12-home-cards-sobre
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

Três melhorias na home (`/`):
1. `ContactCardsSection` — três cards com dados reais de `siteSettings` (Atendimento, Horário, Localização)
2. `InstitutionalSection` — nova prop `variant='dark'` transforma a seção "Sobre" em fundo navy escuro
3. `HeroSection` — prop `backgroundImageUrl?` prepara a infraestrutura para imagem de fundo futura

## Arquivos criados/modificados

| Arquivo | Tipo |
|---|---|
| `components/home/ContactCardsSection.tsx` | criado — 3 cards de contato |
| `components/home/InstitutionalSection.tsx` | modificado — prop `variant` adicionada |
| `components/home/HeroSection.tsx` | modificado — prop `backgroundImageUrl?` + overlay |
| `app/(site)/page.tsx` | modificado — nova ordem, novo fetch, novas props |

## Decisões técnicas

**`buildWhatsAppUrl` com `replace(/\D/g, '')`:**
O campo `phone` tem formatação `(11) 3619-3044`. A URL `wa.me` exige apenas dígitos.
`replace(/\D/g, '')` remove todos os não-dígitos; prefixo `55` adiciona o DDI do Brasil.
Usa `whatsapp` se disponível no `siteSettings`, senão cai em `phone`.

**`opacity-80` no overlay do HeroSection (não `bg-brand-900/80`):**
Aprendizado da Sprint 02: modifier de opacidade é inconsistente com tokens `@theme` no Tailwind v4.
O overlay é um `<div>` separado com `bg-brand-900 opacity-80`. O conteúdo recebe `relative z-10`
para aparecer acima do overlay no stacking context.

**`opacity-70` como classe separada no variant dark (não `text-white/70`):**
Mesma razão — modifier inconsistente. `text-white opacity-70` aplica `opacity: 0.7`
ao elemento, comportamento previsível e bem suportado.

**`getSiteSettings()` em `page.tsx` — sem double-fetch real:**
`(site)/layout.tsx` também chama `getSiteSettings()`. No Next.js, fetches com os mesmos
argumentos são deduplicados dentro do mesmo request via cache. O `Promise.all` na página
inclui os três fetches em paralelo.

## Critérios de aceite — auto-avaliação

| CA | Status | Observação |
|---|---|---|
| CA-01: 3 cards com dados de siteSettings | ✅ | Atendimento, Horário, Localização |
| CA-02: cards com surface/border/shadow | ✅ | `bg-surface border-border shadow-sm` |
| CA-03: grid sm:grid-cols-3 | ✅ | 1 col mobile, 3 cols sm+ |
| CA-04: InstitutionalSection variant light/dark | ✅ | Ambas implementadas |
| CA-05: page.tsx passa variant="dark" | ✅ | Confirmado |
| CA-06: HeroSection aceita backgroundImageUrl | ✅ | Overlay + z-10 no conteúdo |
| CA-07: page.tsx busca siteSettings | ✅ | Promise.all com 3 fetches paralelos |
| CA-08: WhatsApp URL sem formatação + prefixo 55 | ✅ | `replace(/\D/g, '')` |
| CA-09: mobile 375px sem overflow | pendente | Requer validação manual |
| CA-10: TypeScript limpo, sem any | ✅ | `npx tsc --noEmit` limpo |

## Seção 7 — Avaliação QA

**Status:** pendente — requer `npm run dev` e validação visual.

| Fluxo | Resultado | Observação |
|---|---|---|
| 3 cards visíveis abaixo do hero | pendente | CA-01/CA-02 |
| Botão WhatsApp abre wa.me com número correto | pendente | CA-08 |
| Seção "Sobre" com fundo navy e texto branco | pendente | CA-04/CA-05 |
| Mobile 375px — cards em coluna única | pendente | CA-03/CA-09 |
