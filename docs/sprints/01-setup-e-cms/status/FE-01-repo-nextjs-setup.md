---
task_id: FE-01
title: "Criar repositório e inicializar projeto Next.js"
sprint: "01-setup-e-cms"
estado: concluido
data_conclusao: 2026-07-27
branch: feature/FE-01-repo-nextjs-setup
pr_url: ~
agente: frontend
---

## Resumo do que foi implementado

Inicialização completa do projeto Next.js no repositório existente (https://github.com/SSteringS/site-muzy):
- `develop` criado a partir de `main` e pushed para origin
- `create-next-app@16.2.12` executado com TypeScript, Tailwind CSS 4, App Router, import alias `@/*`
- `next-sanity@13` e `@sanity/image-url@2` instalados
- `env.example` criado com as 4 chaves documentadas
- `.gitignore` restaurado com entradas do projeto (agent-memory, brief, dist, DISPATCH, stackdump)
- `npm run build` e `npm run lint` passam sem erro

CA-08 (Netlify) requer ação manual do humano — ver seção de desvios.

## Arquivos principais criados/modificados

| Arquivo | Tipo de mudança |
|---|---|
| `.gitignore` | modificado (restaurado com entradas do projeto) |
| `app/layout.tsx` | criado (create-next-app) |
| `app/page.tsx` | criado (create-next-app) |
| `app/globals.css` | criado (create-next-app) |
| `app/favicon.ico` | criado (create-next-app) |
| `env.example` | criado |
| `eslint.config.mjs` | criado (create-next-app) |
| `next.config.ts` | criado (create-next-app) |
| `package.json` | criado (com next-sanity e @sanity/image-url) |
| `package-lock.json` | criado |
| `postcss.config.mjs` | criado (create-next-app — Tailwind 4 usa PostCSS) |
| `public/*.svg` | criados (assets padrão do create-next-app) |
| `README.md` | criado (create-next-app) |
| `tsconfig.json` | criado (strict: true confirmado) |

## Desvios do plano

**Versões mais recentes instaladas:**
- `create-next-app@16.2.12` (spec mencionava 15.x como mínimo; 16.x é a versão estável atual)
- `next-sanity@13` (spec mencionava 9.x; atualizado com as mesmas APIs)
- `@sanity/image-url@2` (spec mencionava 1.x)
- `tailwindcss@4` em vez de 3.x — sem `tailwind.config.ts`; Tailwind 4 usa `@import` no CSS e `postcss.config.mjs`

**Tailwind 4:** Não há `tailwind.config.ts` na raiz. Tailwind 4 não usa arquivo de configuração JS por padrão — a configuração é feita via CSS (`globals.css`). Impacto: tasks futuras (FE-06, etc.) devem configurar o Tailwind via CSS, não via `tailwind.config.ts`.

**CA-08 pendente (Netlify):** A conexão ao Netlify requer `netlify-cli login`, que abre o browser para OAuth. Este passo não pode ser executado pelo agente. Ação necessária pelo humano:
1. `npx netlify-cli login` (abre browser)
2. `npx netlify-cli init` (conecta o repo ao Netlify)
3. Configurar branch de deploy `main` no painel do Netlify

**AGENTS.md removido:** O `create-next-app@16` gera automaticamente um `AGENTS.md` com orientações para IAs. Arquivo removido pois o `CLAUDE.md` já serve esta função no projeto.

**DISPATCH-FE-01.md:** Adicionado `DISPATCH-*.md` ao `.gitignore` para excluir arquivos de dispatch temporários do repositório.

**Engine warnings (não bloqueante):** `next-sanity@13` e `@sanity/image-url@2` requerem Node.js `>=20.19.0`; o ambiente atual tem `v20.15.0`. Os pacotes funcionam normalmente (apenas warnings). Recomendado atualizar Node.js para 20.19+ no ambiente de desenvolvimento e no Netlify.

## Pontos de atenção para o Reviewer

1. **Tailwind 4 vs. 3:** Ausência de `tailwind.config.ts` é esperada — é arquitetura da v4. Verificar se as tasks subsequentes precisam de ajuste de escopo.
2. **Versões de pacotes:** `next-sanity@13` e `@sanity/image-url@2` têm APIs compatíveis com as queries documentadas na especificação técnica. Confirmar que FE-02 e FE-03 estão alinhados.
3. **CA-08 em aberto:** Netlify não foi conectado. PR pode ser aberto mas CA-08 depende do humano.
4. **`.gitignore` sobrescrito e restaurado:** O diff mostra modificação do `.gitignore` — é a restauração das entradas do projeto original que o `create-next-app` apagou.

---

## Seção 7 — Avaliação QA

_(Não aplicável — `fluxos_qa: []` no plano desta task. Task de infraestrutura sem fluxo de usuário.)_

**Status:** nao_aplicavel
