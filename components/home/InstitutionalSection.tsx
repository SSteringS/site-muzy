type InstitutionalSectionProps = {
  /** Título da seção. Fallback aplicado na página antes de passar a prop. */
  heading: string
  /**
   * Corpo de texto (Sanity type: 'text' — string simples, pode ter quebras de linha).
   * Se null: exibe placeholder elegante.
   */
  body: string | null
}

/**
 * Seção institucional com fundo warm-100.
 * Consome dados do schema institutionalSection (key "sobre-clinica").
 * -mx-4 quebra o padding horizontal do container para largura total.
 * Server Component — sem estado.
 */
export function InstitutionalSection({ heading, body }: InstitutionalSectionProps) {
  return (
    <div className="-mx-4 bg-warm-100 px-8 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-bold text-brand-900 md:text-3xl">{heading}</h2>

        {body ? (
          <p className="mt-4 whitespace-pre-line leading-relaxed text-text-muted">
            {body}
          </p>
        ) : (
          <p className="mt-4 italic text-text-muted">
            Em breve mais informações sobre a clínica.
          </p>
        )}
      </div>
    </div>
  )
}
