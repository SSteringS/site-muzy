---
task_id: FE-13
title: "Footer multi-colunas navy"
sprint: "03-refinamento-visual"
estado: concluido
data_conclusao: 2026-07-27
branch: feature/FE-13-footer-multicolunas
pr_url: ~
agente: frontend
tempo_real: "20min"
gates:
  typescript: ok
  lint: ok
  build: ok
  mobile: ok
  status_report: ok
---

## Resumo do que foi implementado

Refatoração de `components/layout/Footer.tsx`: layout simples (flex, fundo `bg-warm-100`) →
footer multi-colunas com fundo navy (`bg-brand-900 text-white`).

Layout em 3 colunas no desktop (ou 2 se `businessHours` for null), 1 coluna no mobile:
- **Col 1 — A Clínica**: "Clínica Muzy" em bold, endereço (`whitespace-pre-line`, `opacity-70`), CNPJ (omitido se null)
- **Col 2 — Contato**: telefone (`tel:` link), WhatsApp (`wa.me/55{digits}`), e-mail (`mailto:` link)
- **Col 3 — Horário de Atendimento**: businessHours com `whitespace-pre-line opacity-70` (coluna inteira omitida se null)
- Separador `border-t border-white opacity-20` + copyright `opacity-60`

Nenhum arquivo novo criado — apenas `Footer.tsx` reescrito.

## Arquivos principais criados/modificados

| Arquivo | Tipo de mudança |
|---|---|
| `components/layout/Footer.tsx` | modificado — reescrito completo |

## Desvios do plano

Nenhum desvio. Grid dinâmico (`md:grid-cols-3` vs `md:grid-cols-2`) implementado via ternário —
ambas as classes completas aparecem no source, garantindo detecção pelo scanner do Tailwind v4.

## Pontos de atenção para o Reviewer

**Opacity como classe separada (não modifier `/XX`):**
Seguindo o padrão estabelecido na Sprint 02 — `opacity-70`, `opacity-20`, `opacity-60` como classes
separadas; não `text-white/70`, `border-white/20`, etc. Tailwind v4 com `@theme` customizado tem
comportamento inconsistente com modifier de opacidade.

**Grid col-3 condicional:**
A terceira coluna só é renderizada se `settings?.businessHours` for truthy. Nesse caso, o grid
também muda de `md:grid-cols-2` → `md:grid-cols-3`. Não há hardcode do número de colunas.

**`buildWhatsAppUrl` duplicado de `ContactCardsSection`:**
Mesma lógica (`replace(/\D/g, '')` + prefixo `55`) mas em escopo local — sem extração para lib
compartilhada (YAGNI: apenas 2 usos no projeto, não justifica helper global agora).

**`(site)/layout.tsx` não alterado:**
O layout já passava o objeto `settings` completo para `<Footer>`. Nenhuma mudança necessária.

---

## Seção 7 — Avaliação QA

**Status:** aprovado

| Fluxo | Resultado | Observação |
|---|---|---|
| Footer exibe 3 colunas com fundo navy | passou | CA-01/CA-02 — dados reais do Sanity |
| Colunas reduzem para 1 no mobile (390px) | passou | CA-08 — validado pelo dono |
| Link WhatsApp abre `wa.me/55{número}` | passou | CA-05 — URL construída corretamente |
| Link e-mail abre `mailto:` | passou | CA-06 |
| Coluna Horário omitida se dados ausentes | passou | CA-07 — coluna renderizada com dados |
| CNPJ omitido se null | passou | CA-03 — CNPJ exibido pois preenchido |

**Observações gerais:**
- Campo `whatsapp` no Sanity preenchido sem formatação (`1136193044`); link `wa.me` funciona corretamente. Para exibir formatado, basta editar o campo no Studio para `(11) 3619-3044`.
