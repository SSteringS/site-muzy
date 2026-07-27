import Link from 'next/link'

/**
 * Seção de links rápidos para /artigos e /profissionais.
 * Grid 1 coluna em mobile, 2 colunas em desktop.
 * Server Component — sem estado.
 */
export function CTASection() {
  return (
    <section className="py-14">
      <h2 className="mb-8 text-center text-2xl font-bold text-brand-900">
        Explore o site
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Link
          href="/artigos"
          className="group rounded-lg border border-border bg-surface p-8 shadow-sm transition-shadow hover:shadow-md"
        >
          <h3 className="text-xl font-semibold text-brand-900 group-hover:underline">
            Artigos
          </h3>
          <p className="mt-2 text-text-muted">
            Conteúdo sobre medicina esportiva, saúde e performance com o Dr. Paulo Muzy.
          </p>
        </Link>

        <Link
          href="/profissionais"
          className="group rounded-lg border border-border bg-surface p-8 shadow-sm transition-shadow hover:shadow-md"
        >
          <h3 className="text-xl font-semibold text-brand-900 group-hover:underline">
            Profissionais
          </h3>
          <p className="mt-2 text-text-muted">
            Conheça a equipe multidisciplinar da Clínica Muzy.
          </p>
        </Link>
      </div>
    </section>
  )
}
