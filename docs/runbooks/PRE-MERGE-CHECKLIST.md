# PRE-MERGE CHECKLIST — Site Clínica Muzy

Execute este checklist antes de abrir PR de `feature/*` → `develop`.
O implementador é responsável por garantir todos os itens antes de solicitar revisão.

---

## Checklist obrigatório

### Build e qualidade

- [ ] TypeScript compila sem erro: `npx tsc --noEmit` (na raiz do projeto)
- [ ] ESLint sem erro: `npm run lint`
- [ ] Build de produção sem erro: `npm run build`
- [ ] Sem `any` explícito novo no diff (exceção: com comentário justificando)
- [ ] Sem `console.log` em código de produção

### Variáveis de ambiente

- [ ] Toda nova variável de ambiente está documentada em `env.example` (chave sem valor)
- [ ] Nenhum token/secret commitado no código ou em arquivos rastreados pelo Git

### Git

- [ ] 1 commit atômico no padrão `feat(TASK-ID): descrição curta`
- [ ] Branch parte de `develop` (não de `main`)
- [ ] Nenhum arquivo indevido no commit (`.env.local`, `node_modules/`, etc.)

### Critérios de aceite

- [ ] Todos os CAs do plano da task estão satisfeitos
- [ ] Verificado manualmente em `localhost` (ou Netlify preview)
- [ ] Mobile verificado: viewport 375px mínimo no DevTools

---

## Checklist do Reviewer

Após PR aberto, o Reviewer independente verifica:

- [ ] CAs do plano satisfeitos (leu o plano, não só o diff)
- [ ] Sem violação de território (frontend não toca `docs/`, planner não toca `app/`)
- [ ] TypeScript sem supressão indevida
- [ ] Revalidação: se a task cria nova rota de conteúdo, o `revalidatePath` cobre a rota

---

## Testes

MVP sem testes automatizados. QA é manual (ver fluxos_qa no plano da task).
Se o agente QA for acionado, a Seção 7 do status report deve estar preenchida antes do merge.
