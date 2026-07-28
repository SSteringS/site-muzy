---
ultimo_deploy: 2026-07-27
ultimo_review: 2026-07-27
tasks_incluidas: [FE-01, FE-02, FE-03, FE-04, FE-05, FE-06, FE-07]
---

# Estado atual — produção

O que está rodando em `https://sss-site-muzy.netlify.app`.
Equivalente ao `estado-atual-dev.md` — Sprint 01 completa em produção.

---

## URLs

| Ambiente | URL |
|---|---|
| Site | https://sss-site-muzy.netlify.app |
| Studio (produção) | https://sss-site-muzy.netlify.app/studio |
| Admin Netlify | https://app.netlify.com/projects/sss-site-muzy |
| Repositório | https://github.com/SSteringS/site-muzy |
| Sanity Project | z38d0iih / dataset: production |

---

## Stack em produção

| Camada | Versão |
|---|---|
| Next.js | 16.x (App Router) |
| TypeScript | 5.x (strict) |
| Tailwind CSS | 4.x (config via CSS) |
| next-sanity | 13.x |
| @sanity/image-url | 2.x |
| @portabletext/react | 7.x |
| Node.js (Netlify) | 24.x |

---

## Rotas disponíveis

| Rota | Status | Notas |
|---|---|---|
| `/artigos` | ✅ | Lista artigos publicados, revalidate=300 + webhook |
| `/artigos/[slug]` | ✅ | Artigo completo com PortableText, revalidate=300 + webhook |
| `/studio` | ✅ | Sanity Studio — autenticação Sanity necessária |
| `/api/revalidate` | ✅ | Webhook endpoint — valida Bearer token |
| `/` | ⚠️ | Placeholder do create-next-app — Sprint 02 |

---

## Integrações ativas

| Integração | Status | Detalhe |
|---|---|---|
| Netlify CI/CD | ✅ | Push em `main` → deploy automático |
| Sanity webhook | ✅ | Publica no Studio → site atualiza em < 30s |
| Sanity Studio (CORS) | ✅ | URL de produção registrada no projeto Sanity |

---

## Conteúdo no dataset

| Schema | Estado |
|---|---|
| `siteSettings` | ✅ populado com dados reais (telefone, e-mail, endereço, CNPJ, horário) |
| `post` | artigo de teste criado — conteúdo real ainda não publicado |
| `teamMember` | vazio — Sprint 02 |
| `institutionalSection` | vazio — aguarda design da agência |

---

## Defasagem em relação a develop

Nenhuma — develop e produção estão sincronizados (Sprint 01 completa).

---

## Bloqueios para próxima sprint

| Bloqueio | Impacto |
|---|---|
| Protótipo de design não chegou da agência | Bloqueia Sprint 02 (componentes UI, home, sobre, profissionais) |
| Handles Instagram/Facebook não confirmados | `siteSettings.instagramUrl` e `facebookUrl` vazios |
| Dono do domínio não confirmado | Bloqueia corte de DNS para `clinicamuzy.com.br` |
