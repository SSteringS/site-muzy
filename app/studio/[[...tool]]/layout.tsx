/**
 * Layout do Sanity Studio.
 * Exporta metadata e viewport do next-sanity aqui (Server Component),
 * pois a page.tsx usa "use client" e Next.js ignora exports de metadata de Client Components.
 */
export { metadata, viewport } from 'next-sanity/studio'

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
