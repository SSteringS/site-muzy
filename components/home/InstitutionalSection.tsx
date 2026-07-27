type InstitutionalSectionProps = {
  /** Título da seção. Fallback aplicado na página antes de passar a prop. */
  heading: string
  /**
   * Corpo de texto (Sanity type: 'text' — string simples, pode ter quebras de linha).
   * Se null: exibe placeholder elegante.
   */
  body: string | null
  /**
   * Variante visual da seção.
   * - 'light' (default): fundo warm-100, texto navy/muted
   * - 'dark': fundo navy (bg-brand-900), texto branco
   */
  variant?: 'light' | 'dark'
}

/**
 * Seção institucional com fundo configurável via `variant`.
 * -mx-4 quebra o padding horizontal do container para largura total.
 * Server Component — sem estado.
 */
export function InstitutionalSection({
  heading,
  body,
  variant = 'light',
}: InstitutionalSectionProps) {
  const isDark = variant === 'dark'

  return (
    <div className={`-mx-4 px-8 py-16 ${isDark ? 'bg-brand-900' : 'bg-warm-100'}`}>
      <div className="mx-auto max-w-2xl text-center">
        <h2
          className={`text-2xl font-bold md:text-3xl ${
            isDark ? 'text-white' : 'text-brand-900'
          }`}
        >
          {heading}
        </h2>

        {body ? (
          <p
            className={`mt-4 whitespace-pre-line leading-relaxed ${
              isDark ? 'text-white opacity-70' : 'text-text-muted'
            }`}
          >
            {body}
          </p>
        ) : (
          <p
            className={`mt-4 italic ${
              isDark ? 'text-white opacity-70' : 'text-text-muted'
            }`}
          >
            Em breve mais informações sobre a clínica.
          </p>
        )}
      </div>
    </div>
  )
}
