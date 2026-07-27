import Link from 'next/link'

type HeroSectionProps = {
  /** Título principal. Fallback: "Clínica Muzy". */
  heading: string
  /** Slogan / subtítulo. Fallback: "Performance com Saúde". */
  body: string
}

/**
 * Hero da home — fundo navy, título, slogan e CTA para /profissionais.
 * -mx-4 e -mt-10 quebram o padding do container (site)/layout.tsx para
 * que o hero ocupe a largura total do container de 1200px.
 * Server Component — sem estado.
 */
export function HeroSection({ heading, body }: HeroSectionProps) {
  return (
    <div className="-mx-4 -mt-10 bg-brand-900 px-8 py-24 text-white">
      <div className="mx-auto max-w-2xl text-center">
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
