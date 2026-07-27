type ContactCardsSectionProps = {
  phone: string | null
  whatsapp: string | null
  businessHours: string | null
  address: string | null
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
 * Três cards de contato abaixo do hero:
 * Atendimento (telefone + botão WhatsApp), Horário de Funcionamento, Localização.
 * Dados lidos de siteSettings — sem hardcode.
 * Server Component — sem estado.
 */
export function ContactCardsSection({
  phone,
  whatsapp,
  businessHours,
  address,
}: ContactCardsSectionProps) {
  const waUrl = buildWhatsAppUrl(whatsapp, phone)

  return (
    <section className="py-10">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">

        {/* Card 1 — Atendimento */}
        <div className="flex flex-col rounded-lg border border-border bg-surface p-6 shadow-sm">
          <h3 className="mb-3 text-base font-semibold text-brand-900">
            Atendimento
          </h3>

          <p className="text-sm text-text-muted">
            {phone ?? '–'}
          </p>

          {waUrl && (
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block self-start rounded-lg px-4 py-2 text-sm font-semibold text-white"
              style={{ backgroundColor: '#25D366' }}
            >
              Falar no WhatsApp
            </a>
          )}
        </div>

        {/* Card 2 — Horário de Funcionamento */}
        <div className="rounded-lg border border-border bg-surface p-6 shadow-sm">
          <h3 className="mb-3 text-base font-semibold text-brand-900">
            Horário de Funcionamento
          </h3>

          {businessHours ? (
            <p className="whitespace-pre-line text-sm leading-relaxed text-text-muted">
              {businessHours}
            </p>
          ) : (
            <p className="text-sm text-text-muted">Consulte-nos</p>
          )}
        </div>

        {/* Card 3 — Localização */}
        <div className="rounded-lg border border-border bg-surface p-6 shadow-sm">
          <h3 className="mb-3 text-base font-semibold text-brand-900">
            Localização
          </h3>

          {address ? (
            <p className="whitespace-pre-line text-sm leading-relaxed text-text-muted">
              {address}
            </p>
          ) : (
            <p className="text-sm text-text-muted">São Paulo – SP</p>
          )}
        </div>

      </div>
    </section>
  )
}
