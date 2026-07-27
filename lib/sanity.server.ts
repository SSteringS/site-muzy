import { createClient } from 'next-sanity'

/**
 * Cliente autenticado para operações que requerem token.
 * USO EXCLUSIVO EM SERVIDOR: nunca importar em Client Components ("use client").
 * - Usado pelo webhook de revalidação (FE-04) e futuros previews de rascunho.
 * - useCdn: false — sempre busca dados frescos (bypass do CDN).
 * - SANITY_API_TOKEN nunca é exposta ao browser (variável sem prefixo NEXT_PUBLIC_).
 */
export const serverClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2025-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})
