import type { Metadata } from 'next'

import { getInstitutionalSection } from '@/lib/sanity.queries'
import { HeroSection } from '@/components/home/HeroSection'
import { InstitutionalSection } from '@/components/home/InstitutionalSection'
import { CTASection } from '@/components/home/CTASection'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Clínica Muzy | Performance com Saúde',
}

/**
 * Home da Clínica Muzy.
 * Busca seções do Sanity (institutionalSection) e aplica fallbacks
 * quando o dataset estiver vazio — a página funciona sem conteúdo configurado.
 */
export default async function HomePage() {
  // Fetches paralelos — Next.js deduplicará se reutilizados em outro lugar
  const [heroData, sobreData] = await Promise.all([
    getInstitutionalSection('hero'),
    getInstitutionalSection('sobre-clinica'),
  ])

  return (
    <>
      <HeroSection
        heading={heroData?.heading ?? 'Clínica Muzy'}
        body={heroData?.body ?? 'Performance com Saúde'}
      />

      <InstitutionalSection
        heading={sobreData?.heading ?? 'Sobre a Clínica'}
        body={sobreData?.body ?? null}
      />

      <CTASection />
    </>
  )
}
