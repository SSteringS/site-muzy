import type { Metadata } from 'next'

import { getInstitutionalSection, getSiteSettings } from '@/lib/sanity.queries'
import { HeroSection } from '@/components/home/HeroSection'
import { ContactCardsSection } from '@/components/home/ContactCardsSection'
import { InstitutionalSection } from '@/components/home/InstitutionalSection'
import { CTASection } from '@/components/home/CTASection'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Clínica Muzy | Performance com Saúde',
}

/**
 * Home da Clínica Muzy.
 * Busca seções institucionais e siteSettings em paralelo.
 * getSiteSettings() é deduplicado pelo Next.js (já chamado em (site)/layout.tsx).
 */
export default async function HomePage() {
  const [heroData, sobreData, settings] = await Promise.all([
    getInstitutionalSection('hero'),
    getInstitutionalSection('sobre-clinica'),
    getSiteSettings(),
  ])

  return (
    <>
      {/* 1. Hero — navy sólido; backgroundImageUrl pronto para imagem futura do Sanity */}
      <HeroSection
        heading={heroData?.heading ?? 'Clínica Muzy'}
        body={heroData?.body ?? 'Performance com Saúde'}
        backgroundImageUrl={heroData?.backgroundImageUrl}
      />

      {/* 2. Cards de contato — dados de siteSettings */}
      <ContactCardsSection
        phone={settings?.phone ?? null}
        whatsapp={settings?.whatsapp ?? null}
        businessHours={settings?.businessHours ?? null}
        address={settings?.address ?? null}
      />

      {/* 3. Seção "Sobre a Clínica" — variante navy escuro */}
      <InstitutionalSection
        heading={sobreData?.heading ?? 'Sobre a Clínica'}
        body={sobreData?.body ?? null}
        variant="dark"
      />

      {/* 4. Links para /artigos e /profissionais */}
      <CTASection />
    </>
  )
}
