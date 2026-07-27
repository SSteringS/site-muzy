import Link from 'next/link'

import type { PostSummary } from '@/lib/sanity.queries'

type ArticleCardProps = {
  post: PostSummary
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

/**
 * Card de artigo para a listagem de /artigos.
 * Server Component — recebe dados como props, sem estado.
 */
export function ArticleCard({ post }: ArticleCardProps) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-border bg-surface p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex-1">
        <Link href={`/artigos/${post.slug.current}`} className="group">
          <h2 className="text-lg font-semibold leading-snug text-brand-900 group-hover:underline">
            {post.title}
          </h2>
        </Link>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-text-muted">
        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>

        {post.author && (
          <>
            <span aria-hidden="true">·</span>
            <span>{post.author.name}</span>
          </>
        )}
      </div>
    </article>
  )
}
