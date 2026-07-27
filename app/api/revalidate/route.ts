import { revalidatePath } from 'next/cache'

/**
 * Verifica se um valor desconhecido é um objeto simples (Record).
 * Usado para validar o body do webhook sem recorrer a type assertions (`as`).
 */
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/**
 * POST /api/revalidate
 *
 * Endpoint de revalidação on-demand (ADR 0002).
 * Recebe webhook do Sanity quando um documento é publicado e invalida
 * o cache das rotas afetadas via `revalidatePath`.
 *
 * Segurança: valida `Authorization: Bearer <REVALIDATION_SECRET>` antes
 * de qualquer operação. Secret nunca é logado.
 */
export async function POST(req: Request) {
  // ── 1. Autenticação ────────────────────────────────────────────────────────
  const authHeader = req.headers.get('authorization')
  const secret = process.env.REVALIDATION_SECRET

  // Rejeita se o secret não estiver configurado OU se o header não bater.
  // Comparação estrita previne timing attacks básicos (ambos devem ser strings).
  if (!secret || authHeader !== `Bearer ${secret}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // ── 2. Parse do body ───────────────────────────────────────────────────────
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  if (!isRecord(body)) {
    return Response.json({ error: 'Body must be a JSON object' }, { status: 400 })
  }

  // ── 3. Extração de campos — com validação, sem type assertions ─────────────
  const docType = typeof body._type === 'string' ? body._type : null

  // Sanity envia slug como { _type: 'slug', current: 'meu-slug' }
  const slugField = isRecord(body.slug) ? body.slug : null
  const slug = typeof slugField?.current === 'string' ? slugField.current : null

  // ── 4. Revalidação por tipo de documento ───────────────────────────────────
  if (docType === 'post') {
    // Revalida a listagem sempre que qualquer artigo mudar
    revalidatePath('/artigos')
    // Revalida a página específica do artigo (se o slug estiver disponível)
    if (slug) {
      revalidatePath(`/artigos/${slug}`)
    }
  } else {
    // siteSettings, teamMember, institutionalSection — fallback seguro: revalida home
    // Rotas institucionais serão adicionadas quando as páginas existirem (Sprint 02)
    revalidatePath('/')
  }

  return Response.json({ revalidated: true, type: docType, slug })
}
