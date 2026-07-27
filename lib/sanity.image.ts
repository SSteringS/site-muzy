import { createImageUrlBuilder } from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'

/**
 * Builder de URLs para imagens do Sanity.
 * Configurado com projectId e dataset para montar a URL correta no CDN.
 */
const imageBuilder = createImageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? '',
})

/**
 * Converte uma referência de imagem do Sanity em um builder de URL.
 *
 * @example
 * urlFor(post.coverImage).width(800).url()
 * // → 'https://cdn.sanity.io/images/z38d0iih/production/abc123-800x600.jpg'
 */
export function urlFor(source: SanityImageSource) {
  return imageBuilder.image(source)
}
