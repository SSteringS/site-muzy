---
adr: "0002"
title: "Revalidação de conteúdo: webhook on-demand vs ISR com TTL"
status: Accepted
date: 2026-07-26
deciders: [humano, planner]
supersedes: ~
superseded_by: ~
---

# ADR 0002 — Revalidação de conteúdo: webhook on-demand

## Contexto

Next.js gera páginas de conteúdo estaticamente para máxima performance. Quando um editor publica
ou atualiza conteúdo no Sanity Studio, o site precisa refletir a mudança. O problema central:
editores são pessoas não técnicas que esperam que "publicar = aparecer no site imediatamente".

A promessa do produto é autonomia editorial. Se um editor publicar e o site demorar minutos para
atualizar (sem nenhum feedback visual), ele vai achar que o sistema quebrou e vai chamar o dev —
destruindo exatamente o objetivo do projeto.

## Opções consideradas

### Opção A — ISR (Incremental Static Regeneration) com TTL fixo

`export const revalidate = 60` — Next.js regenera a página em background após 60 segundos.

**Pontos fortes:**
- Configuração trivial: uma linha de código por arquivo de rota.
- Zero infraestrutura adicional — sem webhook, sem endpoint extra.
- Nunca falha por problema externo (rede, Sanity webhook down).

**Pontos fracos:**
- Editor publica e pode esperar até 60s+ (só revalida quando alguém visita a página).
- Em site com baixo tráfego, pode ser muito mais que 60s na prática.
- Sem feedback para o editor — ele não sabe quando o site atualizou.

### Opção B — Webhook + on-demand revalidation (escolhida)

Sanity dispara `POST /api/revalidate` → Next.js invalida o cache da rota imediatamente via
`revalidatePath`.

**Pontos fortes:**
- Editor publica → site atualiza em segundos.
- Padrão recomendado pelo Sanity e pela Vercel/Netlify para este caso de uso.
- Granular: invalida só a rota afetada, não todo o site.

**Pontos fracos:**
- Requer configuração do webhook no painel do Sanity e variável de ambiente `REVALIDATION_SECRET`.
- Se o endpoint `/api/revalidate` estiver down, publicações não refletem imediatamente.
  (Mitigado com TTL fallback de 5 minutos.)

### Opção C — Decidir depois (ISR agora, webhook depois)

**Pontos fracos:**
- Editores onboardados com ISR criam expectativa errada.
- Migrar para webhook depois é trabalho extra e cria confusão ("por que às vezes demora?").

## Decisão

Escolhemos a **Opção B** (webhook on-demand) com fallback ISR de 300s.

Implementação:

```typescript
// app/api/revalidate/route.ts
export async function POST(req: Request) {
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.REVALIDATION_SECRET}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { type, slug } = await req.json()
  if (type === 'post') revalidatePath(`/artigos/${slug}`)
  revalidatePath('/artigos')
  return Response.json({ revalidated: true, type, slug })
}

// em cada page.tsx de conteúdo dinâmico
export const revalidate = 300  // fallback: 5 min
```

Por que não as alternativas:
- ISR puro (Opção A) compromete a promessa de autonomia editorial — editores não técnicos não
  entendem "pode demorar 1 minuto" e vão perceber como falha do sistema.
- Decidir depois (Opção C) cria retrabalho e experiência inconsistente.

## Consequências

**Positivas:**
- Experiência de edição previsível: publicar = aparece.
- Implementação cobre `post` e qualquer outro tipo de conteúdo que precise de revalidação.

**Negativas / trade-offs aceitos:**
- Mais peças para monitorar: webhook no Sanity + endpoint no Next.js + secret no Netlify.
- Se o Netlify tiver um deployment parcialmente down, o webhook pode não ser processado.
  Fallback de 300s cobre o caso mais crítico.

## Revisão

Reavaliar se:
- O Sanity mudar a forma como webhooks funcionam no plano Free.
- Netlify Functions forem usadas para outras finalidades (pode criar conflito de execução).
- O número de rotas de conteúdo crescer muito (pode precisar de lógica de revalidação mais seletiva).
