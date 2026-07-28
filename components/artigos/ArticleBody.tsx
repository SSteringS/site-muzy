import { PortableText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import type { PortableTextComponents } from '@portabletext/react'

type ArticleBodyProps = {
  value: PortableTextBlock[]
}

/**
 * Componentes de tipografia para o PortableText.
 * Implementados manualmente pois @tailwindcss/typography não está instalado.
 * Cobre: normal, h2, h3, blockquote, strong, em, link.
 */
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-4 text-base leading-relaxed text-text-primary">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mb-4 mt-8 text-2xl font-bold text-brand-900">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-6 text-xl font-semibold text-brand-900">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-brand-50 pl-4 italic text-text-muted">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic">{children}</em>
    ),
    link: ({ value, children }) => {
      const href = typeof value?.href === 'string' ? value.href : '#'
      const opensInNewTab = value?.blank === true
      return (
        <a
          href={href}
          target={opensInNewTab ? '_blank' : undefined}
          rel={opensInNewTab ? 'noopener noreferrer' : undefined}
          className="text-brand-700 underline hover:text-brand-900"
        >
          {children}
        </a>
      )
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 list-disc pl-6 text-text-primary">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 list-decimal pl-6 text-text-primary">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="mb-1 leading-relaxed">{children}</li>
    ),
    number: ({ children }) => (
      <li className="mb-1 leading-relaxed">{children}</li>
    ),
  },
}

/**
 * Renderiza o corpo de um artigo (PortableText) com tipografia estilizada.
 * Substitui a abordagem anterior de estilos inline no wrapper div.
 * Server Component — sem estado.
 */
export function ArticleBody({ value }: ArticleBodyProps) {
  return (
    <div>
      <PortableText value={value} components={components} />
    </div>
  )
}
