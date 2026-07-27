# Sprint 03 — Refinamento Visual

_Período: a definir_
_Status: planejamento_

---

## Objetivo

Aproximar o layout da home do padrão visual do site temporário (clinicamuzy.com.br),
especificamente a diagramação institucional: cards de contato abaixo do hero, seção
"Sobre" com fundo escuro e footer multi-coluna com todos os dados da clínica.

Referência visual: `docs/images/sitetemp1.png` e `docs/images/sitetemp2.png`.

**Critério de done da sprint:** a home tem, nesta ordem, hero → cards de contato
(Atendimento / Horário / Localização) → seção "Sobre" em fundo navy → CTAs. O footer
exibe endereço, telefone/WhatsApp, e-mail, horário e CNPJ em colunas.

---

## Escopo — tasks

| Task | Título | Status | Bloqueia |
|---|---|---|---|
| FE-12 | Home — cards de contato e seção "Sobre" redesenhada | planejamento | — |
| FE-13 | Footer multi-coluna com todos os dados da clínica | planejamento | — |

FE-12 e FE-13 são independentes — podem ser executadas em paralelo.

---

## O que o site temporário tem que serve de referência

| Elemento | No temp site | Nosso plano |
|---|---|---|
| Cards abaixo do hero | Atendimento (WhatsApp), Página Temporária, Horário de Contato | Atendimento (phone + WhatsApp), Horário de Funcionamento, Localização |
| Seção de texto principal | Fundo navy escuro, texto branco centralizado, largura total ("Comunicado") | Seção "Sobre a Clínica" com fundo `--color-brand-900`, texto branco, centered |
| Footer | 4 colunas: WhatsApp, Informações, texto, Contato (endereço + CNPJ + telefone + e-mail) | 3 colunas: endereço + CNPJ, contato (telefone + WhatsApp + e-mail), horário |
| Hero | Foto de consultório como background-image | Navy sólido agora; estrutura preparada para receber imagem via Sanity |

---

## Dados disponíveis em `siteSettings` para esta sprint

| Campo | Valor real |
|---|---|
| `phone` | (11) 3619-3044 |
| `whatsapp` | (11) 3619-3044 |
| `email` | contato@clinicamuzy.com.br |
| `address` | Av. Marquês de São Vicente, 2219, 11º andar, conj. 1102, São Paulo - SP |
| `cnpj` | 11.844.219/0001-93 |
| `businessHours` | Seg-Qui: 09:00–18:30 · Sex: 09:00–17:30 · Sáb-Dom: Fechado |

Todos já populados no dataset Sanity production desde FE-05.

---

## Fora de escopo desta sprint

- Foto real de background no hero (aguarda imagens da clínica/agência)
- Animações e transições
- Página /sobre dedicada (Sprint futura)
- Qualquer alteração em /artigos ou /profissionais

---

## Bloqueios ativos

Nenhum — sprint independente de protótipo da agência e de domínio.

---

## Estrutura de pastas da sprint

```
docs/sprints/03-refinamento-visual/
├── README.md
├── plans/
│   ├── FE-12-home-cards-sobre.md
│   └── FE-13-footer-multicolunas.md
└── status/
```
