import type { SiteSettings } from '@/lib/sanity.queries'

type FooterProps = {
  settings: SiteSettings | null
}

/**
 * Constrói a URL do WhatsApp removendo formatação do número.
 * Usa `whatsapp` se disponível, senão `phone`.
 * Prefixo 55 (Brasil) + dígitos sem pontuação.
 */
function buildWhatsAppUrl(
  whatsapp: string | null,
  phone: string | null,
): string | null {
  const raw = whatsapp ?? phone
  if (!raw) return null
  const digits = raw.replace(/\D/g, '')
  return `https://wa.me/55${digits}`
}

/**
 * Footer global multi-colunas — fundo navy escuro (bg-brand-900).
 * Col 1: identidade + endereço + CNPJ
 * Col 2: contato (tel, WhatsApp, e-mail)
 * Col 3: horário de atendimento (omitida se businessHours for null)
 * Dados recebidos como props de (site)/layout.tsx — sem fetch próprio.
 * Server Component — sem estado.
 */
export function Footer({ settings }: FooterProps) {
  const waUrl = buildWhatsAppUrl(settings?.whatsapp ?? null, settings?.phone ?? null)
  const hasBusinessHours = Boolean(settings?.businessHours)

  return (
    <footer className="bg-brand-900 text-white">
      <div className="mx-auto max-w-[1200px] px-4 py-12">
        <div
          className={`grid grid-cols-1 gap-10 ${
            hasBusinessHours ? 'md:grid-cols-3' : 'md:grid-cols-2'
          }`}
        >
          {/* Col 1 — A Clínica */}
          <div>
            <p className="text-base font-bold">Clínica Muzy</p>

            {settings?.address && (
              <p className="mt-3 whitespace-pre-line text-sm leading-relaxed opacity-70">
                {settings.address}
              </p>
            )}

            {settings?.cnpj && (
              <p className="mt-3 text-sm opacity-70">
                CNPJ: {settings.cnpj}
              </p>
            )}
          </div>

          {/* Col 2 — Contato */}
          <div>
            <p className="text-base font-bold">Contato</p>

            <div className="mt-3 flex flex-col gap-2 text-sm">
              {settings?.phone && (
                <p>
                  <span className="opacity-70">Telefone: </span>
                  <a
                    href={`tel:${settings.phone.replace(/\D/g, '')}`}
                    className="hover:underline"
                  >
                    {settings.phone}
                  </a>
                </p>
              )}

              {waUrl && (
                <p>
                  <span className="opacity-70">WhatsApp: </span>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {settings?.whatsapp ?? settings?.phone}
                  </a>
                </p>
              )}

              {settings?.email && (
                <p>
                  <span className="opacity-70">E-mail: </span>
                  <a href={`mailto:${settings.email}`} className="hover:underline">
                    {settings.email}
                  </a>
                </p>
              )}

              {!settings?.phone && !settings?.email && !waUrl && (
                <p className="italic opacity-70">
                  Informações de contato não configuradas.
                </p>
              )}
            </div>
          </div>

          {/* Col 3 — Horário de Atendimento (omitida se não houver dados) */}
          {hasBusinessHours && (
            <div>
              <p className="text-base font-bold">Horário de Atendimento</p>

              <p className="mt-3 whitespace-pre-line text-sm leading-relaxed opacity-70">
                {settings?.businessHours}
              </p>
            </div>
          )}
        </div>

        {/* Separador — opacity-20 aplicado ao elemento (não modifier /20 — Tailwind v4) */}
        <div className="mt-10 border-t border-white opacity-20" />

        {/* Copyright */}
        <p className="mt-6 text-center text-sm opacity-60">
          © {new Date().getFullYear()} Clínica Muzy · Todos os direitos reservados
        </p>
      </div>
    </footer>
  )
}
