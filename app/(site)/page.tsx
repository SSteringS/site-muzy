/** Página inicial — conteúdo real implementado em FE-11 (Sprint 02). */
export const metadata = {
  title: 'Clínica Muzy — Medicina Esportiva',
}

export default function HomePage() {
  return (
    <div className="py-12 text-center">
      <h1 className="text-4xl font-bold text-brand-900">
        Clínica Muzy
      </h1>
      <p className="mt-4 text-lg text-text-muted">
        Medicina esportiva e saúde com o Dr. Paulo Muzy.
      </p>
    </div>
  )
}
