import type { SiteSettings } from '@/lib/sanity.queries'

type FooterProps = {
  settings: SiteSettings | null
}

/** Footer global — dados de contato recebidos como props do layout (sem fetch próprio). */
export function Footer({ settings }: FooterProps) {
  return (
    <footer className="bg-warm-100 border-t border-border">
      <div className="mx-auto max-w-[1200px] px-4 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:justify-between">
          {/* Identidade */}
          <div>
            <p className="text-lg font-bold text-brand-900">Clínica Muzy</p>
            <p className="mt-1 text-sm text-text-muted">Medicina esportiva e saúde</p>
          </div>

          {/* Contato */}
          <div className="flex flex-col gap-2 text-sm text-text-muted">
            {settings?.phone && (
              <p>
                <span className="font-medium text-text-primary">Telefone: </span>
                {settings.phone}
              </p>
            )}
            {settings?.email && (
              <p>
                <span className="font-medium text-text-primary">E-mail: </span>
                <a
                  href={`mailto:${settings.email}`}
                  className="hover:underline"
                >
                  {settings.email}
                </a>
              </p>
            )}
            {settings?.address && (
              <p>
                <span className="font-medium text-text-primary">Endereço: </span>
                {settings.address}
              </p>
            )}
            {settings?.businessHours && (
              <p>
                <span className="font-medium text-text-primary">Horário: </span>
                {settings.businessHours}
              </p>
            )}
            {!settings && (
              <p className="italic">Informações de contato não configuradas.</p>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
