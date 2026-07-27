import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'

import { getAllPosts, getPostBySlug } from '@/lib/sanity.queries'
import { ArticleBody } from '@/components/artigos/ArticleBody'

export const revalidate = 300

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({ slug: post.slug.current }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: 'Artigo não encontrado — Clínica Muzy' }
  return { title: `${post.title} — Clínica Muzy` }
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export default async function ArtigoPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) notFound()

  return (
    <>
      {/*
       * Hero do artigo — fundo navy com título e metadados.
       * -mx-4 e -mt-10 quebram o padding do container em (site)/layout.tsx.
       */}
      <div className="-mx-4 -mt-10 mb-10 bg-brand-900 px-8 py-14 text-white">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/artigos"
            className="mb-6 inline-block text-sm text-brand-50 opacity-80 hover:opacity-100 hover:underline"
          >
            ← Voltar para artigos
          </Link>

          <h1 className="text-3xl font-bold leading-tight md:text-4xl">
            {post.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-brand-50 opacity-80">
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>

            {post.author && (
              <>
                <span aria-hidden="true">·</span>
                <span>{post.author.name}</span>
                {post.author.role && (
                  <span>({post.author.role})</span>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Corpo do artigo — largura máxima de leitura */}
      <div className="mx-auto max-w-3xl">
        {post.body ? (
          <ArticleBody value={post.body} />
        ) : (
          <p className="italic text-text-muted">Este artigo ainda não tem conteúdo.</p>
        )}
      </div>
    </>
  )
}
