---
task_id: FE-11
title: "Home (/) — hero e seções institucionais"
sprint: "02-design-system-e-ui"
status: planejamento
tipo: feature
agente: frontend
origin: backlog
tempo_estimado: "3-4h"
fluxos_qa:
  - "visitante acessa / e vê hero com título da clínica e slogan 'Performance com Saúde'"
  - "visitante acessa / e vê seção de destaques (diferenciais ou sobre) com conteúdo do Sanity"
  - "visitante acessa / e vê CTA para /artigos e /profissionais"
  - "visitante acessa / em mobile (375px) e o hero e as seções são legíveis sem overflow"
---

## Contexto

A home (`/`) está atualmente com o placeholder do `create-next-app` (conteúdo genérico do
Next.js). Esta task substitui o placeholder pela home real da Clínica Muzy.

A home consome o schema `institutionalSection` do Sanity — seções editáveis identificadas
por `key` (ex: `"hero"`, `"sobre-clinica"`, `"diferenciais"`). O agente deve implementar
a página de forma que funcione **mesmo com o dataset vazio** (fallbacks para cada seção),
pois o conteúdo real no Sanity virá gradualmente.

O protótipo definitivo da agência não chegou — o layout desta task é funcional e coerente
com a paleta aprovada, mas pode ser refinado na Sprint 03 quando o design chegar.

## Padrão de componente

| Componente | Tipo | Justificativa |
|---|---|---|
| `app/page.tsx` | Server Component | Fetch de dados do Sanity + renderização; sem interatividade |
| `components/home/HeroSection.tsx` | Server Component | Recebe dados como props; sem estado |
| `components/home/InstitutionalSection.tsx` | Server Component | Recebe dados como props; sem estado |
| `components/home/CTASection.tsx` | Server Component | Links estáticos; sem estado |

## Critérios de aceite

- [ ] CA-01: `app/page.tsx` substitui o placeholder do `create-next-app`. Nenhum conteúdo
  genérico do Next.js visível.
- [ ] CA-02: `export const revalidate = 300` declarado na rota.
- [ ] CA-03: `generateMetadata()` implementado — `<title>` = "Clínica Muzy | Performance com Saúde".
- [ ] CA-04: **Hero section** renderizada com:
  - Fundo navy (`--color-brand-900`) ou imagem de fundo escura
  - Nome "Clínica Muzy" em destaque (fonte grande, branca)
  - Slogan "Performance com Saúde" em subtítulo (branco, levemente menor)
  - Botão CTA "Conheça nossa equipe" → `/profissionais`
  - Se `institutionalSection` com `key: "hero"` existir no Sanity, usar `heading` e `body`
    do documento; caso contrário, usar fallback hardcoded
- [ ] CA-05: **Seção institucional** ("Sobre a Clínica" ou "Diferenciais") renderizada:
  - Buscar `institutionalSection` com `key: "sobre-clinica"` no Sanity
  - Se existir: renderizar `heading` + `body`
  - Se não existir: renderizar placeholder elegante ("Em breve mais informações sobre a clínica.")
- [ ] CA-06: **Seção de links** para o restante do site:
  - Card "Artigos" → `/artigos` com breve descrição
  - Card "Profissionais" → `/profissionais` com breve descrição
  - Layout 2 colunas em desktop, 1 coluna em mobile
- [ ] CA-07: Sem informações de contato hardcoded — se quiser exibir contato, buscar de
  `siteSettings` (já disponível em `app/layout.tsx` ou via nova query).
- [ ] CA-08: Em viewport 375px, hero e seções sem overflow horizontal. CTA visível sem
  necessidade de scroll lateral.
- [ ] CA-09: Nenhum erro de TypeScript. Tipos explícitos para `InstitutionalSection`.
- [ ] CA-10: Rota `/` no Netlify (produção) renderiza a nova home após merge e deploy.

## Escopo — o que está DENTRO

- `app/page.tsx` — substitui placeholder
- `components/home/HeroSection.tsx`
- `components/home/InstitutionalSection.tsx`
- `components/home/CTASection.tsx`
- Query nova em `lib/sanity.queries.ts` para buscar `institutionalSection` por `key`:
  `getInstitutionalSection(key: string)`
- Fallbacks para todas as seções (dataset pode estar vazio)

## Fora de escopo

- Galeria de fotos da clínica (aguarda imagens reais da agência)
- Seção de depoimentos / testemunhos
- Formulário de contato (fora do escopo do MVP — LGPD)
- Integração com mapa (Google Maps)
- Slider / carousel de imagens
- Seção de artigos em destaque na home (Sprint 03+)

## Dependências

| Dependência | Tipo | Status |
|---|---|---|
| FE-08 mergeada em develop (design tokens, Header, Footer) | task anterior | pendente |
| Schema `institutionalSection` existente no Sanity (FE-02) | task anterior | ✅ ok |
| `siteSettings` com dados reais (FE-05) | task anterior | ✅ ok |
| Documents `institutionalSection` com `key: "hero"` e `key: "sobre-clinica"` | conteúdo / humano | ⚠️ dataset vazio — popular antes do QA para ver conteúdo real |

## Riscos

| Risco | Mitigação |
|---|---|
| Dataset vazio — home aparece só com fallbacks | CA-04 a CA-06 especificam fallbacks claros. QA valida que fallbacks são elegantes. Humano pode popular depois. |
| Layout rígido para o design da agência | Usar componentes genéricos parametrizados. Quando o protótipo chegar, refinamento é cirúrgico, não reescrita. |
| Query `getInstitutionalSection` busca por `key` — colisão de nomes futura | Documentar no próprio arquivo `sanity.queries.ts` os keys reservados: `"hero"`, `"sobre-clinica"`, `"diferenciais"`. |

## Branch

`feature/FE-11-home` a partir de `develop` (após merge de FE-08)

## Coordenação

- Iniciar somente após FE-08 mergeada em `develop`.
- Pode ser executada em paralelo com FE-09 e FE-10.
- Antes do QA com conteúdo real: humano popula no Sanity Studio:
  1. `institutionalSection` com `key: "hero"` (heading + body)
  2. `institutionalSection` com `key: "sobre-clinica"` (heading + body)
- QA mínimo (sem conteúdo Sanity) valida fallbacks e layout — CA-01 a CA-10 devem passar
  mesmo com dataset vazio.
- Ao concluir, notificar Planner — esta é a última task da Sprint 02.

## Definição de pronto

`docs/runbooks/PRE-MERGE-CHECKLIST.md`
