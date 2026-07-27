---
task_id: FE-12
title: "Home — cards de contato e seção 'Sobre' redesenhada"
sprint: "03-refinamento-visual"
status: planejamento
tipo: feature
agente: frontend
origin: backlog
tempo_estimado: "2-3h"
fluxos_qa:
  - "visitante acessa / e vê, abaixo do hero, três cards: Atendimento (telefone + link WhatsApp), Horário de Funcionamento (tabela de dias/horas), Localização (endereço)"
  - "visitante acessa / e vê seção 'Sobre a Clínica' com fundo navy escuro e texto branco centralizado"
  - "visitante clica no link WhatsApp do card de Atendimento e abre whatsapp.com com o número correto"
  - "visitante acessa / em mobile (375px) — cards em coluna única, sem overflow horizontal"
---

## Contexto

O site temporário da Clínica Muzy (clinicamuzy.com.br, referência em `docs/images/sitetemp1.png`
e `docs/images/sitetemp2.png`) tem uma diagramação institucional específica que serve de
referência para este projeto enquanto o protótipo definitivo da agência não chega.

O layout do temp site tem:
1. Três cards abaixo do hero com dados de contato/horário
2. Uma seção de texto com **fundo navy escuro e texto branco** (chamada "Comunicado" no temp)

A home atual tem a seção "Sobre a Clínica" com fundo `--color-warm-100` (claro).
Esta task redesenha essa seção para fundo escuro e adiciona os três cards de contato.

## Padrão de componente

| Componente | Tipo | Justificativa |
|---|---|---|
| `app/(site)/page.tsx` | Server Component | Fetch adicional de siteSettings — sem interatividade |
| `components/home/ContactCardsSection.tsx` | **CRIAR** — Server Component | Recebe siteSettings como props; sem estado |
| `components/home/InstitutionalSection.tsx` | **MODIFICAR** — Server Component | Adicionar variante `dark` (fundo navy, texto branco) |
| `components/home/HeroSection.tsx` | **MODIFICAR** — Server Component | Suporte opcional a `backgroundImageUrl` |

## Nova estrutura da home (ordem visual de cima para baixo)

```
1. HeroSection          ← existente (com suporte a backgroundImage futuro)
2. ContactCardsSection  ← NOVO — 3 cards com dados de siteSettings
3. InstitutionalSection ← existente, mas com variante dark (navy + texto branco)
4. CTASection           ← existente (links para /artigos e /profissionais)
```

## Critérios de aceite

- [ ] CA-01: `ContactCardsSection` renderiza **3 cards** lado a lado (desktop) / em coluna (mobile):
  - **Card 1 — Atendimento:** ícone ou emoji de telefone, telefone formatado `(11) 3619-3044`,
    link WhatsApp: `https://wa.me/5511361930444` abrindo em `target="_blank"`,
    botão com texto "Falar no WhatsApp" em fundo verde (`#25D366` ou similar).
  - **Card 2 — Horário de Funcionamento:** tabela ou lista de dias com horas:
    Seg–Qui 09:00–18:30 · Sex 09:00–17:30 · Sáb–Dom Fechado. Dados lidos de
    `siteSettings.businessHours` — se campo for uma string multi-linha, usar
    `whitespace-pre-line` para preservar quebras.
  - **Card 3 — Localização:** endereço completo lido de `siteSettings.address`,
    sem hardcode.
- [ ] CA-02: Cards têm fundo `--color-surface` (#FFFFFF), borda `--color-border`,
  sombra sutil (`shadow-sm` ou equivalente), padding adequado.
- [ ] CA-03: Grid responsivo — `grid-cols-1 sm:grid-cols-3` (1 coluna mobile, 3 desktop).
- [ ] CA-04: `InstitutionalSection` recebe prop `variant: 'light' | 'dark'`.
  - `variant: 'dark'` → `bg-[--color-brand-900]`, texto `text-white`, heading e body brancos,
    largura total (negative margins para romper o container, padrão de FE-09).
  - `variant: 'light'` → comportamento atual (fundo `--color-warm-100`).
- [ ] CA-05: `app/(site)/page.tsx` passa `variant="dark"` para a seção "sobre-clinica".
- [ ] CA-06: `HeroSection` aceita prop opcional `backgroundImageUrl?: string`.
  - Se presente: imagem como `background-image` com overlay escuro semi-transparente
    para legibilidade do texto.
  - Se ausente: comportamento atual (fundo navy sólido `--color-brand-900`). Nenhuma
    mudança visual se não houver imagem.
- [ ] CA-07: `app/(site)/page.tsx` busca `siteSettings` via `getSiteSettings()` de
  `lib/sanity.queries.ts` e passa os campos necessários para `ContactCardsSection`.
  Next.js deduplica o fetch (já feito em `(site)/layout.tsx`).
- [ ] CA-08: Link WhatsApp usa número sem formatação: `wa.me/5511361930444`
  (remover parênteses, espaços e hífen do número `(11) 3619-3044`).
- [ ] CA-09: Em mobile (375px), cards em coluna única, textos legíveis, sem overflow.
- [ ] CA-10: Nenhum erro TypeScript. Campos opcionais de `siteSettings` (ex: `whatsapp`)
  têm fallback gracioso se `null`.

## Escopo — o que está DENTRO

- `components/home/ContactCardsSection.tsx` — componente novo
- `components/home/InstitutionalSection.tsx` — adicionar prop `variant`
- `components/home/HeroSection.tsx` — adicionar suporte a `backgroundImageUrl`
- `app/(site)/page.tsx` — integrar `ContactCardsSection`, ajustar ordem e props

## Fora de escopo

- Foto real de background no hero (sem imagens disponíveis — estrutura preparada,
  visual inalterado enquanto não há imagem)
- Mapa do Google Maps integrado no card de Localização
- QR Code para WhatsApp
- Qualquer alteração em /artigos, /profissionais ou no Footer

## Dependências

| Dependência | Tipo | Status |
|---|---|---|
| `app/(site)/page.tsx` existente (FE-11) | task anterior | ✅ ok |
| `getSiteSettings()` em `lib/sanity.queries.ts` | task anterior | ✅ ok |
| `siteSettings` populado com phone, address, businessHours, whatsapp | FE-05 | ✅ ok — dados reais |
| `components/home/` existente (HeroSection, InstitutionalSection, CTASection) | FE-11 | ✅ ok |

## Riscos

| Risco | Mitigação |
|---|---|
| `siteSettings.businessHours` é texto livre — formato pode variar | Renderizar com `whitespace-pre-line`; não tentar parsear programaticamente |
| `siteSettings.whatsapp` pode ser `null` | CA-10: fallback para `phone` se `whatsapp` for nulo |
| Número WhatsApp com formatação — wa.me exige só dígitos | CA-08: construir URL removendo caracteres não-numéricos do número |
| Variant `dark` + negative margins — manter consistência com FE-09 | Documentado: usar `-mx-4` para romper container; padrão estabelecido em FE-09 |

## Branch

`feature/FE-12-home-cards-sobre` a partir de `develop`

## Coordenação

- Pode ser executada em paralelo com FE-13.
- Ao concluir e mergear, notificar Planner.

## Definição de pronto

`docs/runbooks/PRE-MERGE-CHECKLIST.md`
