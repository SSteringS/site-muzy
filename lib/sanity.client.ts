import { createClient } from 'next-sanity'

/**
 * Cliente público para leitura de conteúdo publicado.
 * - useCdn: true em produção (dados do CDN — eventual consistency, muito mais rápido)
 * - useCdn: false em desenvolvimento (dados sempre frescos do API)
 * Não contém token — seguro para uso em Server Components e Client Components.
 */
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2025-01-01',
  useCdn: process.env.NODE_ENV === 'production',
})
