import Link from 'next/link'

type HeroSectionProps = {
  /** Título principal. Fallback: "Clínica Muzy". */
  heading: string
  /** Slogan / subtítulo. Fallback: "Performance com Saúde". */
  body: string
  /**
   * URL de imagem de fundo vinda do Sanity (já resolvida pelo GROQ).
   * Se presente: imagem com overlay navy semi-transparente para legibilidade.
   * Se ausente: fundo navy sólido (comportamento atual).
   */
  backgroundImageUrl?: string | null
}

/**
 * Hero da home — fundo navy (sólido ou com imagem de fundo futura).
 * -mx-4 e -mt-10 quebram o padding do container (site)/layout.tsx.
 * Server Component — sem estado.
 */
export function HeroSection({ heading, body, backgroundImageUrl }: HeroSectionProps) {
  const hasImage = Boolean(backgroundImageUrl)

  return (
    <div
      className={`relative -mx-4 -mt-10 px-8 py-24 text-white${hasImage ? '' : ' bg-brand-900'}`}
      style={
        hasImage
          ? {
              backgroundImage: `url(${backgroundImageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : undefined
      }
    >
      {/* Overlay escuro — só renderizado quando há imagem de fundo */}
      {hasImage && (
        <div className="absolute inset-0 bg-brand-900 opacity-80" />
      )}

      {/* Conteúdo — z-10 para aparecer acima do overlay */}
      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold leading-tight md:text-5xl">{heading}</h1>

        <p className="mt-4 text-lg text-brand-50 opacity-90 md:text-xl">{body}</p>

        <div className="mt-10">
          <Link
            href="/profissionais"
            className="inline-block rounded-lg bg-white px-8 py-3 font-semibold text-brand-900 shadow transition-opacity hover:opacity-90"
          >
            Conheça nossa equipe
          </Link>
        </div>
      </div>
    </div>
  )
}
