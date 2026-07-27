---
adr: "0001"
title: "Stack: Next.js + Sanity + Tailwind CSS + Netlify"
status: Accepted
date: 2026-07-26
deciders: [humano, planner]
supersedes: ~
superseded_by: ~
---

# ADR 0001 — Stack: Next.js + Sanity + Tailwind CSS + Netlify

## Contexto

O projeto precisa de um site institucional com CMS que permita que pessoas não técnicas (médicos,
equipe de marketing) editem conteúdo sem depender de um desenvolvedor. O time é formado por um único
desenvolvedor (perfil backend/Java, aprendendo frontend). Orçamento: zero (fase informal).

Restrições:
- Custo: apenas planos gratuitos enquanto o projeto não virar contrato pago.
- Autonomia editorial: editores devem conseguir publicar artigo, trocar foto e editar texto sem
  nenhum conhecimento técnico.
- Manutenibilidade: alterações de conteúdo nunca devem exigir deploy de código.
- Curva de aprendizado: stack deve ter boa documentação e comunidade ativa.

## Opções consideradas

### Opção A — Next.js + Sanity + Tailwind + Netlify (escolhida)

**Pontos fortes:**
- Sanity tem painel de edição (Studio) excelente para não-técnicos, com papéis de acesso granulares.
- Next.js App Router tem suporte nativo a Server Components e ISR — ideal para site de conteúdo.
- Netlify plano Free sem restrição de uso comercial (diferente da Vercel).
- Tailwind CSS sem componentes prontos: flexível para receber qualquer design da agência.
- Toda a stack tem plano gratuito suficiente para o MVP.

**Pontos fracos:**
- Curva de aprendizado do Sanity para o dev (mitigado: é objetivo declarado do projeto).
- Webhook de revalidação adiciona complexidade operacional (coberto pelo ADR 0002).

### Opção B — WordPress (headless ou clássico)

**Pontos fortes:**
- Ecossistema maduro, cliente provável já conhece.

**Pontos fracos:**
- Hospedagem PHP/MySQL tem custo. WP Engine, Kinsta e similares não têm plano free adequado.
- Segurança: WordPress é alvo frequente de ataques; exige manutenção ativa de plugins.
- Headless WordPress (WPGraphQL) adiciona complexidade sem vantagem real neste escopo.

### Opção C — Vercel + Next.js

**Pontos fortes:**
- Integração nativa com Next.js.

**Pontos fracos:**
- Plano Hobby da Vercel proibido para uso comercial por ToS (verificado em 27/07/2026).
- Plano Pro: US$20/mês — incompatível com orçamento zero da fase atual.

### Opção D — Astro + Netlify (sem CMS)

**Pontos fortes:**
- Performance excelente, zero JS por padrão.

**Pontos fracos:**
- Sem CMS = editores não conseguem editar conteúdo sem dev. Contradiz o objetivo central do projeto.

## Decisão

Escolhemos a **Opção A** (Next.js + Sanity + Tailwind + Netlify) porque é a única combinação que
satisfaz simultaneamente: custo zero, autonomia editorial real e stack madura com boa documentação.

Por que não as alternativas:
- WordPress rejeitado: custo e risco de segurança.
- Vercel rejeitada: ToS comercial no plano free.
- Astro sem CMS rejeitado: não resolve o problema central (autonomia editorial).

## Consequências

**Positivas:**
- Editores publicam conteúdo sem depender do dev após o onboarding.
- Deploy contínuo via Git push no Netlify — zero operação manual.
- Custo zero sustentável enquanto o tráfego for baixo.

**Negativas / trade-offs aceitos:**
- Webhook de revalidação precisa ser configurado e mantido (ADR 0002).
- Se o projeto crescer (tráfego alto, features complexas), pode ser necessário migrar para plano pago do Sanity ou Netlify.
- Dev precisa aprender Sanity — aceito como objetivo do projeto.

## Revisão

Reavaliar quando:
- O projeto virar contrato pago (pode justificar plano pago do Sanity ou Netlify).
- O tráfego ultrapassar os limites do plano Free do Sanity (200k API req/mês) ou Netlify (100GB/mês).
- O cliente solicitar funcionalidades que exijam backend próprio (ex.: agendamento, área do paciente).
