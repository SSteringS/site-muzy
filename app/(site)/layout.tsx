import { getSiteSettings } from '@/lib/sanity.queries'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

/**
 * Layout das rotas públicas do site (/, /artigos, /profissionais, etc.).
 * Isolado em route group (site) para que /studio NÃO herde Header e Footer.
 * Busca siteSettings uma vez aqui e passa para o Footer via props.
 */
export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await getSiteSettings()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-[1200px] px-4 py-10">
          {children}
        </div>
      </main>
      <Footer settings={settings} />
    </div>
  )
}
