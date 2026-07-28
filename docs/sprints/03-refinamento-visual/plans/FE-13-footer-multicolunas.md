---
task_id: FE-13
title: "Footer multi-coluna com todos os dados da clínica"
sprint: "03-refinamento-visual"
status: planejamento
tipo: feature
agente: frontend
origin: backlog
tempo_estimado: "1-2h"
fluxos_qa:
  - "visitante acessa qualquer rota e vê footer com 3 colunas: endereço/CNPJ, contato (telefone + WhatsApp + e-mail), horário de funcionamento"
  - "visitante acessa / em mobile (375px) e vê colunas do footer empilhadas verticalmente, sem overflow"
  - "visitante clica no e-mail do footer e abre cliente de e-mail com endereço pré-preenchido"
---

## Contexto

O footer atual da Clínica Muzy é simples — renderiza nome, telefone, e-mail e endereço em
um layout básico. O site temporário (referência: `docs/images/sitetemp2.png`) tem um footer
multi-coluna com fundo navy escuro e todos os dados da clínica organizados em colunas distintas.

Esta task eleva o footer para o padrão visual do temp site: fundo navy, 3 colunas, dados
completos lidos do Sanity `siteSettings`.

## Padrão de componente

| Componente | Tipo | Justificativa |
|---|---|---|
| `components/layout/Footer.tsx` | **MODIFICAR** — Server Component | Recebe siteSettings como props (já feito); sem interatividade |

## Critérios de aceite

- [ ] CA-01: Footer tem fundo `--color-brand-900` (navy escuro), texto branco.
- [ ] CA-02: Footer organizado em **3 colunas** em desktop (`grid-cols-3`):
  - **Coluna 1 — A Clínica:** nome "Clínica Muzy" em destaque, endereço completo
    (`siteSettings.address`), CNPJ (`siteSettings.cnpj`).
  - **Coluna 2 — Contato:** telefone (`siteSettings.phone`) com ícone/label "Telefone",
    WhatsApp (`siteSettings.whatsapp`) como link `wa.me/` com label "WhatsApp",
    e-mail (`siteSettings.email`) como `mailto:` link.
  - **Coluna 3 — Horário de Atendimento:** conteúdo de `siteSettings.businessHours`
    com `whitespace-pre-line`.
- [ ] CA-03: Em mobile (< `md`), colunas empilhadas verticalmente (`grid-cols-1`).
- [ ] CA-04: Linha inferior (copyright): `© {ano} Clínica Muzy · Todos os direitos reservados`
  com ano dinâmico via `new Date().getFullYear()`.
- [ ] CA-05: Campos opcionais com fallback gracioso:
  - `cnpj` ausente → omitir a linha do CNPJ
  - `whatsapp` ausente → omitir link WhatsApp (usar só telefone)
  - `businessHours` ausente → omitir Coluna 3
- [ ] CA-06: Links de e-mail (`mailto:`) e WhatsApp (`wa.me/`) funcionais.
  WhatsApp: número sem formatação (só dígitos + DDI 55).
- [ ] CA-07: Texto secundário (endereço, CNPJ, horário) usa `text-white/70` ou
  `opacity-70` para hierarquia visual em relação aos labels das colunas.
- [ ] CA-08: Em mobile (375px), sem overflow horizontal. Padding lateral adequado.
- [ ] CA-09: Nenhum erro TypeScript. Props de `Footer` têm tipo correto (derivado
  do retorno de `getSiteSettings` ou interface local).

## Escopo — o que está DENTRO

- `components/layout/Footer.tsx` — refatoração completa do layout
- Grid 3 colunas com dados de `siteSettings`
- Linha de copyright com ano dinâmico

## Fora de escopo

- Links de redes sociais (Instagram/Facebook ainda não confirmados — campo de `siteSettings`
  está vazio; omitir graciosamente)
- Logo no footer (aguarda imagem real)
- Mapa ou qualquer embed externo
- Qualquer outro componente além do Footer

## Dependências

| Dependência | Tipo | Status |
|---|---|---|
| `components/layout/Footer.tsx` existente (FE-08) | task anterior | ✅ ok |
| `app/(site)/layout.tsx` já faz fetch de `siteSettings` e passa ao Footer | FE-08 | ✅ ok |
| `siteSettings` populado com address, cnpj, phone, whatsapp, email, businessHours | FE-05 | ✅ ok — dados reais |

## Riscos

| Risco | Mitigação |
|---|---|
| `text-white/70` (opacity modifier) inconsistente no Tailwind v4 — aprendizado da Sprint 02 | Usar `text-white opacity-70` **em elemento separado**, não como modificador de cor. Alternativa: `className="text-white"` com `style={{ opacity: 0.7 }}` |
| Número WhatsApp com formatação no Sanity | Construir URL `wa.me/` removendo caracteres não-numéricos e prefixando com `55` |

## Branch

`feature/FE-13-footer-multicolunas` a partir de `develop`

## Coordenação

- Pode ser executada em paralelo com FE-12.
- Ao concluir e mergear, notificar Planner — esta é a última task da Sprint 03.

## Definição de pronto

`docs/runbooks/PRE-MERGE-CHECKLIST.md`
